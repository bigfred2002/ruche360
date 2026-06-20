# Journal

## 2026-06-20 - AUTH-01

- Ajout d'une couche domaine TypeScript pour comptes utilisateurs, organisations et adhésions.
- Ajout de helpers purs pour normaliser un email et vérifier un accès organisationnel actif.
- Documentation du périmètre `AUTH-01` dans `docs/auth.md`.
- Aucun Auth.js, aucune session, aucune page de connexion, aucun mot de passe et aucune API d'authentification n'ont été ajoutés.

## 2026-06-20 - DEVSECOPS-RUNNER-01

- Ajout d'un runner GitHub Actions local dans Docker pour validations DevSecOps manuelles.
- Ajout de `Dockerfile.github-runner`, `docker-compose.runner.yml`, `runner.env.example` et du script d'entrée du runner.
- Ajout du workflow manuel `.github/workflows/local-runner-validation.yml`.
- Le jeton d'enregistrement GitHub reste dans `runner.env`, fichier local ignoré par Git.
- Le runner local n'est pas déclenché automatiquement sur les Pull Requests publiques.
- Le montage du socket Docker est documenté comme point de vigilance de sécurité.

## 2026-06-20 - README-PRODUCT-OVERVIEW-01

- Restructuration du README pour présenter d'abord l'application Rucher360, ses fonctions prévues et son état réel.
- Clarification des modules actifs attendus, des modules IA/IoT prévus mais désactivés et des hors périmètres initiaux.
- Conservation des commandes Docker Compose, de la sécurité pre-push et de la documentation agentique.

## 2026-06-20 - DATA-01

- Ajout de Prisma et `@prisma/client` via Docker Compose uniquement.
- Création du schéma Prisma minimal pour organisations, utilisateurs, adhésions, rôles, permissions et modules activables.
- Création d'une migration initiale PostgreSQL.
- Ajustement du contrôle pre-push pour autoriser uniquement les migrations Prisma générées.
- Aucun modèle rucher, ruche, colonie, visite, tâche, sanitaire, IA ou IoT actif n'a été ajouté.
- Aucun écran, CRUD ou appel API applicatif n'a été créé.

## 2026-06-20 - DATA-00

- Cadrage documentaire de la stratégie data avant initialisation Prisma.
- Définition du futur socle exécutable minimal: organisation, utilisateur, adhésion, rôles, permissions et modules activables.
- Confirmation que les entités rucher, ruche, colonie, visite, tâche, sanitaire, documents et connaissances restent conceptuelles jusqu'aux lots dédiés.
- Aucun dossier `prisma/`, aucune migration, aucun client Prisma et aucune dépendance n'ont été ajoutés.

## 2026-06-20 - CI-BASE-01

- Ajout du workflow GitHub Actions `.github/workflows/ci.yml`.
- La CI exécute `make security-scan`, `docker compose config`, `pnpm install`, `pnpm lint` et `pnpm build` via Docker Compose.
- Les permissions du workflow sont limitées à `contents: read`.
- La CI doit être rendue obligatoire dans la protection de branche `main`.

## 2026-06-20 - SECURITY-PRE-PUSH-01

- Ajout d'un contrôle de confidentialité avant push pour tenir compte du passage du dépôt en public.
- Ajout du hook versionné `.githooks/pre-push`, activable via `make install-security-hooks`.
- Le hook bloque les exports locaux Stitch, les fichiers `.env` non exemple, clés, dumps, motifs de secrets et données personnelles courantes.
- Ajout de `stitch_exports/` dans `.gitignore` pour éviter l'ajout accidentel des exports locaux.
- Ce garde-fou ne remplace pas une revue humaine, mais réduit le risque de fuite lors des pushes.

## 2026-06-19 - DESIGN-SHELL-01

- Création d'un shell applicatif mobile-first statique pour Rucher360.
- Ajout de composants UI simples: `AppShell`, `BottomNavigation`, `DashboardCard`, `ModuleCard` et `StatusBadge`.
- Ajout d'une page d'accueil type cockpit avec cartes de synthèse et modules optionnels désactivés.
- Formalisation des conventions visuelles appliquées dans `DESIGN.md`.
- Validations exécutées via Docker Compose: `lint`, `build`, démarrage `app` et vérification HTTP.
- Aucun module métier, aucune authentification, aucune configuration Prisma, aucune IA active et aucun IoT actif n'ont été ajoutés.

### Itération Stitch sur la PR #4

- Exports analysés: `stitch_exports/input/mobile-v1.zip` et `stitch_exports/input/desktop-v1.zip`, extraits localement dans `stitch_exports/reference/`.
- Écrans mobile identifiés: cockpit, liste des ruchers, fiche rucher, liste des ruches, fiche ruche, nouvelle visite, sanitaire varroa, base de connaissance, contacts utiles, profil organisation, gestion des modules.
- Écrans desktop identifiés: cockpit, liste des ruchers, fiche rucher, liste des ruches, fiche ruche, nouvelle visite, sanitaire varroa, base de connaissance, contacts utiles, profil organisation, gestion des modules.
- Éléments visuels retenus: palette ambre/crème/sauge/forêt/ardoise, navigation basse à cinq entrées, sidebar desktop, topbar décorative, cartes tactiles, badges colorés, fond discret à motif et grille cockpit plus confortable.
- Éléments non repris: HTML/CSS Stitch généré, images de démonstration, formulaires, boutons d'activation, recherche fonctionnelle, routes métier, modules IA/IoT actifs et tout appel API.

## 2026-06-19 - APP-INIT-01

- Initialisation du socle Next.js avec App Router.
- Ajout de TypeScript strict, Tailwind CSS et ESLint.
- Ajout d'une page d'accueil sobre alignée avec les principes de `DESIGN.md`.
- Installation des dépendances via Docker Compose uniquement.
- Aucun module métier, aucune authentification et aucune configuration Prisma n'ont été ajoutés.

## 2026-06-19 - DOCKER-DEV-01

- Ajout d'un environnement Docker Compose de développement avec services `app` et `db`.
- Ajout d'un volume Docker pour `node_modules` et d'un volume pnpm dédié.
- Ajout de `Dockerfile.dev`, `Dockerfile`, `.dockerignore` et `Makefile`.
- Mise à jour de `.env.example` avec les variables PostgreSQL et port applicatif.
- Documentation des commandes pnpm exclusivement via Docker Compose.
- Aucun scaffold Next.js ni fonctionnalité métier n'a été ajouté.

## 2026-06-19 - REPO-INIT-01

- Initialisation du cadre documentaire Rucher360.
- Ajout des règles agentiques dans `AGENTS.md`.
- Définition du périmètre initial et des hors périmètres.
- Documentation des modules actifs, prévus désactivés et hors périmètre.
- Ajout d'un modèle de données conceptuel sans création de schéma Prisma.
- Ajout d'une architecture technique cible sans dépendance ni scaffold applicatif.
- Préparation du backlog de micro-lots.
