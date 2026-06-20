# Rucher360

Rucher360 est une application apicole modulaire multi-utilisateurs, pensée pour des organisations apicoles qui souhaitent suivre leurs ruchers, ruches, colonies, visites, tâches, documents et connaissances métier dans un cadre simple, extensible et sobre.

Ce dépôt est préparé pour un développement agentique par micro-lots avec Codex, GitHub et Docker Compose.

## Statut du dépôt

Lot courant: `DESIGN-SHELL-01`

Ce lot pose un premier shell applicatif mobile-first statique. Il ne développe pas de fonctionnalité métier.

## Principes de développement

- Développement containerisé avec Docker Compose.
- Ne jamais supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur le Mac.
- Exécuter les commandes projet dans les conteneurs lorsque l'application existera.
- Travailler par micro-lots courts, traçables et revus en Pull Request.
- Ne jamais committer directement sur `main`.
- Conserver les modules connectés et IA prévus désactivés tant qu'un lot dédié ne les active pas explicitement.
- Le dépôt étant public, installer le hook de confidentialité local avant tout push.

## Documentation principale

- [Instructions agentiques](AGENTS.md)
- [Design produit](DESIGN.md)
- [Périmètre produit](docs/product-scope.md)
- [Modules](docs/modules.md)
- [Rôles et permissions](docs/roles-permissions.md)
- [Modèle de données](docs/data-model.md)
- [Architecture technique](docs/technical-architecture.md)
- [Flux UX](docs/ux-flows.md)
- [Backlog agentique](docs/backlog-agentique.md)
- [Contexte courant](docs/context.md)
- [Todo](docs/todo.md)
- [Journal](docs/journal.md)

## Périmètre initial

Le périmètre initial couvre:

- organisations apicoles;
- utilisateurs, rôles et permissions;
- modules activables par organisation et par utilisateur;
- ruchers, ruches, colonies, visites et tâches;
- suivi sanitaire, varroa et frelon;
- base de connaissance;
- contacts utiles;
- documents;
- récoltes simples;
- configuration de ruche basse consommation.

Les modules connectés prévus mais désactivés sont: balance, météo, caméra, capteurs et GPS.

Les modules IA prévus mais désactivés sont: analyse de visite, assistant connaissance, reconnaissance d'espèce et comptage varroa.

## Hors périmètre initial

- Etiquetage.
- Marketplace.
- Paiement.
- Comptabilité complète.
- IoT actif.
- IA automatique.
- Prescription sanitaire automatique.

## Démarrage développeur

L'application Next.js est scaffoldée avec App Router, TypeScript et Tailwind CSS. L'environnement Docker Compose évite toute dépendance à Node.js, pnpm, Prisma ou Playwright sur le Mac.

Copier l'exemple d'environnement local:

```bash
cp .env.example .env
```

Construire l'image de développement:

```bash
docker compose build app
```

Démarrer les services:

```bash
docker compose up --build
```

L'application est disponible sur `http://localhost:3000` quand le service `app` est démarré.

## Commandes pnpm

Les commandes pnpm doivent toujours passer par Docker Compose:

```bash
docker compose run --rm app pnpm install
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

Raccourcis Makefile:

```bash
make build
make up
make pnpm CMD="install"
make lint
make build-app
```

Les commandes locales directes comme `pnpm install`, `npx prisma` ou `npx playwright` ne doivent pas être utilisées comme prérequis sur la machine hôte.

## Sécurité avant push

Le dépôt contient un hook `pre-push` versionné dans `.githooks/pre-push`.
Il bloque les chemins sensibles, les exports locaux Stitch, les fichiers d'environnement non exemple, les clés privées, les dumps et plusieurs motifs de secrets ou données personnelles.

Activer le contrôle local:

```bash
make install-security-hooks
```

Lancer le contrôle sans pousser:

```bash
make security-scan
```

Ce contrôle réduit le risque de fuite dans le dépôt public, mais ne remplace pas une revue humaine avant publication.

## Services Docker

- `app`: service prévu pour Next.js, basé sur `Dockerfile.dev`.
- `db`: PostgreSQL 16 Alpine avec volume persistant.
- `node_modules`: volume Docker dédié pour éviter d'écrire les dépendances Node sur l'hôte.
- `pnpm_store`: volume Docker pour le store pnpm.

## Validations prévues

Quand l'application Next.js existera, les validations attendues seront:

```bash
docker compose build app
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

Pour ce lot, ces validations sont applicables et doivent être lancées depuis Docker Compose.

## Intégration continue

La CI GitHub Actions exécute les contrôles suivants sur les Pull Requests et les pushes vers `main`:

```bash
make security-scan
docker compose config
docker compose run --rm app pnpm install
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

Le workflow doit être rendu obligatoire dans la protection de branche `main` côté GitHub.
