# Contexte

## Etat courant

Le dépôt Rucher360 est initialisé sur GitHub et préparé pour un développement agentique. Le lot `DESIGN-SHELL-01` pose un premier shell applicatif mobile-first, statique et non métier.

## Décisions actées

- Le produit est une application apicole modulaire multi-utilisateurs.
- Le développement doit être containerisé avec Docker Compose.
- La machine hôte ne doit pas être considérée comme équipée de Node.js, pnpm, Prisma ou Playwright.
- Les commandes pnpm passent par le service Docker Compose `app`.
- PostgreSQL est fourni par le service Docker Compose `db`.
- `node_modules` vit dans un volume Docker dédié.
- Le socle applicatif utilise Next.js App Router, TypeScript strict et Tailwind CSS.
- L'interface initiale est volontairement simple et ne contient aucun module métier.
- Le shell applicatif utilise une navigation basse mobile, des repères desktop simples et des cartes statiques.
- Les cartes de cockpit et de modules sont des surfaces de présentation sans formulaire, CRUD, appel API ou logique métier.
- Les modules connectés sont prévus mais désactivés: balance, météo, caméra, capteurs, GPS.
- Les modules IA sont prévus mais désactivés: analyse de visite, assistant connaissance, reconnaissance d'espèce, comptage varroa.
- Les fonctions étiquetage, marketplace, paiement, comptabilité complète, IoT actif, IA automatique et prescription sanitaire automatique sont hors périmètre initial.

## Points ouverts

- Choix du système d'authentification.
- Choix du stockage documentaire.
- Niveau de détail de la localisation des ruchers.
- Politique de conservation des données sanitaires.

## Commandes utiles actuelles

```bash
git status --short --branch
git diff --check
docker compose config
docker compose build app
```

Commandes applicatives:

```bash
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```
