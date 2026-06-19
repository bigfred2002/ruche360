# AGENTS.md

## Mission du dépôt

Rucher360 est une application apicole modulaire multi-utilisateurs. Le dépôt doit rester lisible par des agents de développement: contexte clair, lots petits, décisions documentées et changements vérifiables.

## Règles impératives

- Ne pas développer l'application dans le lot `REPO-INIT-01`.
- Ne pas ajouter de dépendances sans lot explicitement dédié.
- Ne pas créer `app/`, `components/`, `lib/` ou `prisma/` sauf si ces dossiers existent déjà ou si un lot ultérieur le demande explicitement.
- Ne jamais supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur le Mac.
- Privilégier Docker Compose pour tout lancement, test, migration ou outil projet lorsque l'application existera.
- Exécuter les commandes pnpm uniquement via `docker compose run --rm app pnpm ...`.
- Ne jamais committer directement sur `main`.
- Créer une branche dédiée par lot, avec le préfixe `codex/` par défaut.

## Workflow agentique

1. Lire `README.md`, `docs/context.md`, `docs/todo.md` et le lot demandé.
2. Vérifier `git status --short --branch`.
3. Créer ou vérifier la branche du lot.
4. Limiter les changements au périmètre du lot.
5. Mettre à jour la documentation touchée par la décision.
6. Exécuter les validations pertinentes dans Docker lorsque disponibles.
7. Mettre à jour `docs/journal.md`.
8. Préparer une Pull Request.

## Style de travail

- Préférer des micro-lots livrables et faciles à relire.
- Documenter les décisions structurantes dans `docs/context.md` ou `docs/journal.md`.
- Conserver les noms métier en français dans la documentation.
- Eviter les abstractions techniques avant l'existence d'un besoin réel.
- Signaler explicitement les éléments désactivés ou hors périmètre.

## Validation attendue

Pour un lot documentaire, vérifier au minimum:

- la présence des fichiers demandés;
- l'absence de dossiers applicatifs interdits;
- l'absence de dépendances ajoutées;
- un `git diff --check` propre.

Pour un lot applicatif futur, définir les commandes Docker Compose de test dans le lot lui-même avant exécution.

Pour les lots Docker ou outillage:

- ne pas initialiser l'application hors périmètre;
- vérifier que `docker compose config` reste valide;
- documenter les commandes prévues si `package.json` n'existe pas encore.
