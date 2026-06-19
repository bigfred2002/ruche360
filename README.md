# Rucher360

Rucher360 est une application apicole modulaire multi-utilisateurs, pensée pour des organisations apicoles qui souhaitent suivre leurs ruchers, ruches, colonies, visites, tâches, documents et connaissances métier dans un cadre simple, extensible et sobre.

Ce dépôt est préparé pour un développement agentique par micro-lots avec Codex, GitHub et Docker Compose.

## Statut du dépôt

Lot courant: `REPO-INIT-01`

Ce lot ne développe pas l'application. Il installe uniquement le cadre documentaire et les conventions de travail.

## Principes de développement

- Développement containerisé avec Docker Compose.
- Ne jamais supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur le Mac.
- Exécuter les commandes projet dans les conteneurs lorsque l'application existera.
- Travailler par micro-lots courts, traçables et revus en Pull Request.
- Ne jamais committer directement sur `main`.
- Conserver les modules connectés et IA prévus désactivés tant qu'un lot dédié ne les active pas explicitement.

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

L'application n'est pas encore scaffoldée. Quand elle le sera, le démarrage devra passer par Docker Compose, par exemple:

```bash
docker compose up --build
```

Les commandes locales directes comme `pnpm install`, `npx prisma` ou `npx playwright` ne doivent pas être utilisées comme prérequis sur la machine hôte.
