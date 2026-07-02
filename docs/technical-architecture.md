# Architecture Technique

## Position actuelle

Le dépôt contient un socle Next.js App Router, TypeScript, Tailwind CSS, Docker Compose et un shell applicatif statique. `DATA-00` prépare la stratégie data sans créer encore de schéma Prisma exécutable.

## Contraintes structurantes

- Développement containerisé avec Docker Compose.
- Ne pas supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur la machine hôte.
- Les commandes projet futures doivent être documentées sous forme `docker compose ...`.
- Les commandes pnpm doivent passer par `docker compose run --rm app pnpm ...`.
- `node_modules` doit rester dans un volume Docker.
- Les secrets locaux vivent dans `.env`, jamais dans Git.
- `.env.example` sert de contrat minimal non secret.

## Architecture cible pressentie

L'architecture cible devra rester modulaire:

- application web;
- base de données relationnelle;
- stockage documentaire;
- système de rôles et permissions;
- activation de modules par organisation et utilisateur;
- jobs ou traitements asynchrones uniquement quand un lot dédié les introduit.

La logique produit transversale est detaillee dans [Architecture Logique de Rucher360](application-architecture.md). La cartographie des modules est detaillee dans [Cartographie des Modules et Fonctions](module-function-map.md).

Diagrammes complementaires:

- [Architecture technique Docker-first](diagrams/svg/architecture-technique.svg)
- [Workflow agentique de micro-lot](diagrams/svg/workflow-agentique.svg)

## Docker Compose

Le fichier `docker-compose.yml` définit:

- `app`: service prévu pour Next.js, construit depuis `Dockerfile.dev`;
- `db`: PostgreSQL 16 Alpine;
- `node_modules`: volume Docker pour les dépendances Node;
- `pnpm_store`: volume Docker pour le store pnpm;
- `postgres_data`: volume persistant PostgreSQL.

Tant que `package.json` n'existe pas, le service `app` ne force aucune initialisation et reste en attente.

## Images Docker

`Dockerfile.dev` sert au développement. Il active Corepack, expose le port 3000 et lance `pnpm dev` uniquement si `package.json` existe.

`Dockerfile` prépare une image de production future. En l'absence de `package.json`, le build reste un no-op documenté pour ne pas introduire de scaffold hors périmètre.

## Commandes prévues

```bash
docker compose build app
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

Les commandes `pnpm lint` et `pnpm build` seront applicables quand l'application Next.js existera.

## Modules désactivés

Les modules connectés et IA doivent être représentés comme capacités prévues mais désactivées. Ils ne doivent pas appeler de fournisseur externe, de modèle IA, de caméra, de capteur ou de service météo dans le périmètre initial.

## Sécurité et confidentialité

- Les données de rucher peuvent être sensibles, notamment la localisation.
- Les rôles doivent limiter l'accès par organisation.
- Les documents peuvent contenir des informations personnelles ou sanitaires.
- Les futures fonctionnalités GPS, caméra et IA devront avoir un cadrage spécifique avant activation.

## Validation future

Les tests futurs devront s'exécuter dans Docker Compose. Les commandes de validation seront documentées dans `README.md` ou dans les lots concernés lorsqu'une stack technique sera ajoutée.

## Stratégie data

Le premier schéma exécutable devra démarrer par les organisations, utilisateurs, adhésions, rôles, permissions et modules activables. Les entités rucher, ruche, colonie, visite, tâche et sanitaire restent différées jusqu'aux lots métier dédiés.
