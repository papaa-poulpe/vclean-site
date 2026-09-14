// Met à jour la note et le nombre d'avis Google affichés sur le site.
// Lancé chaque jour par .github/workflows/avis-google.yml.
//
// Variables d'environnement :
//   GOOGLE_PLACES_API_KEY  clé de l'API Places (New)
//   GOOGLE_PLACE_ID        identifiant de la fiche Google Business Profile

import { readFile, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

const PAGE = new URL("../index.html", import.meta.url);

export function appliquer(html, note, nombre) {
  const noteFr = note.toFixed(1).replace(".", ",");
  const pleines = Math.round(note);
  const etoiles = "★".repeat(pleines) + "☆".repeat(5 - pleines);
  const parfait = note >= 5 ? " · note parfaite" : "";

  const remplacer = (cle, valeur) => {
    const re = new RegExp(`(<(\\w+)[^>]*data-avis="${cle}"[^>]*>)[^<]*(</\\2>)`, "g");
    const trouve = html.match(re);
    if (!trouve) throw new Error(`Balise data-avis="${cle}" introuvable dans index.html`);
    html = html.replace(re, `$1${valeur}$3`);
  };

  remplacer("note", noteFr);
  remplacer("nombre", String(nombre));
  remplacer("etoiles", etoiles);
  remplacer("parfait", parfait);

  const jsonLd = /"aggregateRating":\{[^}]*\}/;
  if (!jsonLd.test(html)) throw new Error("aggregateRating introuvable dans les données structurées");
  html = html.replace(
    jsonLd,
    `"aggregateRating":{"@type":"AggregateRating","ratingValue":"${note.toFixed(1)}","reviewCount":"${nombre}"}`
  );
  return html;
}

async function lireAvisGoogle(cle, placeId) {
  const rep = await fetch(`https://places.googleapis.com/v1/places/${placeId}`, {
    headers: { "X-Goog-Api-Key": cle, "X-Goog-FieldMask": "rating,userRatingCount" },
  });
  if (!rep.ok) throw new Error(`API Places : ${rep.status} ${await rep.text()}`);
  const { rating, userRatingCount } = await rep.json();
  // Garde-fou : une réponse vide ne doit jamais effacer les chiffres du site.
  if (typeof rating !== "number" || typeof userRatingCount !== "number" || userRatingCount < 1) {
    throw new Error(`Réponse inattendue de l'API : ${JSON.stringify({ rating, userRatingCount })}`);
  }
  return { note: rating, nombre: userRatingCount };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const { GOOGLE_PLACES_API_KEY: cle, GOOGLE_PLACE_ID: placeId } = process.env;
  if (!cle || !placeId) {
    console.log("::warning::Secrets GOOGLE_PLACES_API_KEY / GOOGLE_PLACE_ID absents, mise à jour ignorée.");
    process.exit(0);
  }
  const { note, nombre } = await lireAvisGoogle(cle, placeId);
  const avant = await readFile(PAGE, "utf8");
  const apres = appliquer(avant, note, nombre);
  if (apres === avant) {
    console.log(`Rien à changer : ${note}/5 sur ${nombre} avis.`);
  } else {
    await writeFile(PAGE, apres);
    console.log(`Mis à jour : ${note}/5 sur ${nombre} avis.`);
  }
}
