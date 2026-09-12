# Site vitrine V-Clean Habitat

Le site public, en ligne sur <https://v-clean-habitat.fr> et servi par Netlify.

Du HTML statique, sans framework ni étape de compilation : les fichiers de ce
dossier sont exactement ce que reçoit le visiteur. Pour travailler dessus, il
suffit d'ouvrir `index.html` dans un navigateur.

| Fichier | Rôle |
|---|---|
| `index.html` | La page d'accueil, tout y est : styles, scripts, contenu |
| `galerie.html` | Les photos avant / après |
| `mentions-legales.html` | Mentions légales |
| `confidentialite.html` | Politique de confidentialité (RGPD) |
| `*.jpg` | Les photos, référencées par leur nom depuis les pages |

## Publication

Netlify publie la racine de ce dépôt. Les liens `.html` y sont servis sans
extension (`galerie.html` devient `/galerie`) : c'est Netlify qui s'en charge,
il n'y a rien à changer dans le code.

## À ne pas confondre

L'outil de gestion (devis, factures, planning) est un projet séparé :
`~/Desktop/vclean-habitat`. Les deux n'ont aucun code en commun.
