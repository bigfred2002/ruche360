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
- Créer un commit distinct après chaque lot terminé, avant d'enchaîner sur le lot suivant.
- Ne pas empiler plusieurs lots non mergés sur une même branche ou une chaîne de branches, sauf demande explicite.
- Après chaque lot applicatif ou documentaire, pousser la branche, ouvrir ou mettre à jour la PR, attendre la CI verte, puis merger ou demander l'arbitrage avant de démarrer le lot suivant.
- Après un squash merge, resynchroniser `main` localement avant de créer la branche du lot suivant.
- Avant tout push, vérifier que le hook local `pre-push` de confidentialité est installé avec `make install-security-hooks`.
- Ne jamais pousser d'exports locaux, secrets, fichiers `.env`, clés, dumps ou données personnelles.
- Les Pull Requests doivent conserver la CI verte avant merge.
- Le runner GitHub local Docker est réservé aux validations manuelles de code de confiance.
- Ne jamais brancher le runner local auto-hébergé sur des Pull Requests publiques non relues.

## Workflow agentique

1. Lire `README.md`, `docs/context.md`, `docs/todo.md` et le lot demandé.
2. Vérifier `git status --short --branch`.
3. Créer ou vérifier la branche du lot.
4. Limiter les changements au périmètre du lot.
5. Mettre à jour la documentation touchée par la décision.
6. Exécuter les validations pertinentes dans Docker lorsque disponibles.
7. Mettre à jour `docs/journal.md`.
8. Créer un commit dédié au lot terminé.
9. Exécuter `make security-scan` avant push.
10. Pousser la branche du lot.
11. Préparer ou mettre à jour une Pull Request.
12. Ne démarrer aucun autre lot tant que la PR courante n'est pas mergée, explicitement mise en attente ou arbitrée par l'utilisateur.

## Workflow UX et interface

Avant tout lot qui modifie l'interface, la navigation, les parcours, les textes
UI ou les états visuels:

- lire `DESIGN.md` et `docs/ux-rules-skills.md`;
- identifier les règles UX utilisées dans le résumé du lot;
- vérifier séparément le comportement mobile et desktop;
- préserver la modularité: un module désactivé ou à venir ne doit pas sembler
  opérationnel;
- ne pas mélanger refonte UX, logique métier, schéma de données et dépendances
  dans le même lot.

Pour une analyse UX, utiliser le format:

1. Diagnostic global.
2. Spécificités desktop vs mobile.
3. Plan d'action.
4. Règle source.

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

Pour tout lot applicatif ou outillage, les validations de référence sont:

- `make security-scan`;
- `docker compose config`;
- `docker compose run --rm app pnpm lint`;
- `docker compose run --rm app pnpm build`.

Pour le runner GitHub local:

- conserver le jeton d'enregistrement dans `runner.env` uniquement;
- ne jamais committer `runner.env`;
- utiliser `make runner-config`, `make runner-build` et `make runner-up`;
- garder le workflow local en déclenchement manuel.
