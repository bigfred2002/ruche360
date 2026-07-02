# Rucher360

Rucher360 est une application apicole modulaire multi-utilisateurs. Elle vise à aider un apiculteur, une association, une exploitation ou un collectif à piloter ses organisations, ruchers, ruches, colonies, visites, tâches, documents et connaissances dans une interface simple, mobile-first et extensible.

Le projet est développé par micro-lots avec Codex, GitHub et Docker Compose. Le dépôt est public: les secrets, données personnelles, exports locaux et fichiers d'environnement ne doivent jamais être commités.

## Fonctionnalités prévues

### Pilotage apicole

- Organisations apicoles multi-utilisateurs.
- Ruchers, ruches et colonies.
- Modèle exécutable séparant les sites apicoles, le matériel ruche et le vivant.
- Module matériel apicole prévu pour suivre consommables, équipements durables, emplacements et statuts simples sans gestion commerciale lourde.
- Commandes serveur minimales du module matériel préparées avec contrôle organisation/permissions, sans formulaire public tant que l'authentification réelle n'est pas disponible.
- Visites et observations terrain.
- Tâches à planifier, réaliser ou suivre.
- Récoltes simples.

### Suivi sanitaire

- Observations sanitaires.
- Suivi varroa.
- Suivi frelon.
- Historique des actions et notes métier.

### Travail collectif

- Utilisateurs, rôles et permissions.
- Modules activables par organisation et par utilisateur.
- Catalogue de rôles, permissions et modules posé pour cadrer les futurs accès.
- Stratégie de modules dynamiques prévue: activation par organisation, visibilité par adhésion et permissions par rôle.
- Contacts utiles: vétérinaires, techniciens sanitaires, fournisseurs, référents et partenaires.
- Documents liés aux organisations et futures entités métier.
- Conventions comptes, organisations et adhésions posées sans authentification active.

### Connaissance

- Base de connaissance interne.
- Fiches pratiques, procédures et notes.
- Assistant connaissance prévu mais désactivé tant qu'un lot IA dédié ne l'active pas.

### Modules optionnels prévus

Les modules connectés sont prévus mais désactivés:

- balance connectée;
- météo de rucher;
- caméra;
- capteurs;
- GPS.

Les modules IA sont prévus mais désactivés:

- analyse de visite;
- assistant connaissance;
- reconnaissance d'espèce;
- comptage varroa.

## Hors périmètre initial

- Etiquetage.
- Marketplace.
- Paiement.
- Comptabilité complète.
- IoT actif.
- IA automatique.
- Prescription sanitaire automatique.

## Etat du dépôt

Les lots déjà intégrés posent:

- le cadre documentaire produit et agentique;
- l'environnement Docker Compose de développement;
- le socle Next.js App Router, TypeScript et Tailwind CSS;
- un shell applicatif mobile-first statique;
- le contrôle de confidentialité pre-push;
- la CI Docker-first;
- la stratégie data préalable au schéma exécutable.

Le shell actuel est une interface statique de cockpit apicole. Il ne contient pas encore de CRUD métier, d'authentification, d'appel API applicatif, d'IA active ou d'IoT actif.

## Architecture de développement

- Application: Next.js App Router, TypeScript, Tailwind CSS.
- Conteneur applicatif: service Docker Compose `app`.
- Base de données locale: PostgreSQL via service Docker Compose `db`.
- Dépendances Node: volume Docker `node_modules`.
- Store pnpm: volume Docker `pnpm_store`.
- Commandes projet: uniquement via Docker Compose.

Ne jamais supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur la machine hôte.

## Démarrage local

Copier l'exemple d'environnement:

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

## Commandes utiles

Les commandes pnpm doivent toujours passer par Docker Compose:

```bash
docker compose run --rm app pnpm install
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
docker compose run --rm app pnpm seed:dev
```

Raccourcis Makefile:

```bash
make build
make up
make pnpm CMD="install"
make lint
make build-app
make seed-dev
make security-scan
```

Les commandes locales directes comme `pnpm install`, `node`, `npx prisma` ou `npx playwright` ne doivent pas être utilisées comme prérequis sur la machine hôte.

## Sécurité du dépôt public

Le dépôt contient un hook `pre-push` versionné dans `.githooks/pre-push`. Il bloque les chemins sensibles, les exports locaux Stitch, les fichiers d'environnement non exemple, les clés privées, les dumps et plusieurs motifs de secrets ou données personnelles.

Installer le hook local:

```bash
make install-security-hooks
```

Lancer le contrôle sans pousser:

```bash
make security-scan
```

Ce contrôle réduit le risque de fuite dans le dépôt public, mais ne remplace pas une revue humaine avant publication.

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

## Sécurité et dépendances

Dependabot est configuré pour surveiller les dépendances npm, GitHub Actions et Docker. Les alertes doivent être traitées par petits lots, avec validations Docker Compose et revue humaine avant merge.

Documentation:

- [Sécurité et dépendances](docs/security-dependencies.md)

## Runner GitHub local

Un runner GitHub Actions local peut être lancé dans Docker pour exécuter une chaîne DevSecOps manuelle sur la machine de développement.

Documentation:

- [Runner GitHub local Docker](docs/devsecops-runner.md)

Commandes:

```bash
make runner-config
make runner-build
make runner-up
make runner-logs
make runner-down
```

Le dépôt étant public, le workflow local est limité à `workflow_dispatch`. Ne pas déclencher ce runner automatiquement sur des Pull Requests externes non relues.

## Documentation principale

- [Instructions agentiques](AGENTS.md)
- [Design produit](DESIGN.md)
- [Périmètre produit](docs/product-scope.md)
- [Architecture logique](docs/application-architecture.md)
- [Cartographie modules et fonctions](docs/module-function-map.md)
- [Gouvernance lots et sprints](docs/sprint-governance.md)
- [Modules](docs/modules.md)
- [Module matériel](docs/equipment.md)
- [Modules dynamiques](docs/dynamic-modules.md)
- [Partage de rucher et transhumance](docs/apiary-sharing-transhumance.md)
- [Rôles et permissions](docs/roles-permissions.md)
- [Authentification et organisations](docs/auth.md)
- [Modèle de données](docs/data-model.md)
- [Architecture technique](docs/technical-architecture.md)
- [Documentation visuelle avec Archify](docs/diagrams/README.md)
- [Sécurité et dépendances](docs/security-dependencies.md)
- [Flux UX](docs/ux-flows.md)
- [Backlog agentique](docs/backlog-agentique.md)
- [Contexte courant](docs/context.md)
- [Todo](docs/todo.md)
- [Journal](docs/journal.md)
