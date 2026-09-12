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

Tout part de GitHub : `papaa-poulpe/vclean-site`. Netlify surveille la branche
`main` et republie le site à chaque `git push`, en une minute environ. Il n'y a
plus rien à déposer à la main.

```bash
git add -A
git commit -m "Ce que j'ai changé"
git push
```

`netlify.toml` décrit la publication : racine du dépôt, aucune compilation, et
les liens `.html` servis sans extension (`galerie.html` devient `/galerie`).

## À ne pas confondre

L'outil de gestion (devis, factures, planning) est un projet séparé :
`~/Desktop/vclean-habitat`. Les deux n'ont aucun code en commun.
