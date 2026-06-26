# Journal

## 2026-06-26 - SECURITY-DEPENDENCIES-01

- Traitement des deux vulnerabilites moderees detectees par `pnpm audit --prod`.
- Ajout d'overrides pnpm workspace pour forcer `@hono/node-server` en `1.19.13` et `postcss` en `8.5.15`.
- Regeneration du lockfile via Docker Compose uniquement.
- `pnpm audit --prod` ne signale plus de vulnerabilite connue apres correction.
- Aucune dependance directe, fonctionnalite metier, authentification, Prisma supplementaire, IA ou IoT actif n'a ete ajoute.

## 2026-06-26 - SECURITY-DEPENDENCIES-00

- Preparation d'un lot securite dedie aux dependances et alertes.
- Ajout d'une configuration Dependabot hebdomadaire pour npm, GitHub Actions et Docker.
- Ajout de `docs/security-dependencies.md` pour cadrer le traitement des alertes, les validations obligatoires et les limites de merge.
- Les corrections de versions sont volontairement differees vers `SECURITY-DEPENDENCIES-01` afin de garder ce lot preparatoire lisible.
- Aucune dependance, fonctionnalite metier, authentification, IA, IoT ou modification Docker runtime n'a ete ajoutee.

## 2026-06-26 - DYNAMIC-UI-ANALYSIS

- Ajout d'une analyse des lots dynamiques UI/applicatifs dans `docs/todo.md`.
- Proposition d'une sequence sans Figma: shell dynamique, navigation depuis registry, profils simules, etats reutilisables, workflows responsive, motion accessible, design tokens, catalogue modules et onboarding amateur.
- Confirmation que ces lots doivent rester sans Prisma supplementaire, CRUD metier, auth reelle, IA active, IoT actif ou appel API externe tant qu'ils ne sont pas explicitement dedies.

## 2026-06-21 - MODULES-REGISTRY-01

- Ajout d'une registry TypeScript des modules applicatifs dans `src/features/rbac`.
- Chaque entree de registry porte route cible, permissions requises, disponibilite et surfaces de navigation.
- Ajout de helpers purs pour filtrer les modules visibles selon modules effectifs, permissions et surface.
- La navigation et le cockpit ne sont pas encore branches sur cette registry.
- Aucun ecran, aucune route applicative, aucun CRUD, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-06-21 - MODULES-DYNAMIC-01

- Ajout du modele Prisma `MembershipModulePreference` pour porter la visibilite des modules au niveau de l'adhesion utilisateur-organisation.
- Generation d'une migration PostgreSQL dediee via Docker Compose.
- Ajout de helpers purs pour calculer les modules effectifs a partir des modules d'organisation et des preferences d'adhesion.
- Conservation de `UserModulePreference` pour eviter une suppression de schema dans ce lot.
- Aucune interface de gestion, aucune route, aucun CRUD, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-06-21 - ARCHITECTURE-DOCS-00

- Ajout d'une architecture logique transversale de Rucher360: moteurs organisation, modules, permissions, metier et gouvernance.
- Ajout d'une cartographie des modules et fonctions pour clarifier responsabilites, statuts et limites.
- Ajout d'un guide de gouvernance des lots et sprints avec cycle recommande, definition of done et validations.
- Raccordement du README, de l'architecture technique, du backlog, du contexte et de la todo.
- Aucun code applicatif, aucune migration, aucune dependance, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-06-21 - MODULES-DYNAMIC-00

- Cadrage documentaire des modules dynamiques avec quatre couches: catalogue produit, activation organisation, visibilite par adhesion et permissions.
- Decision de conserver les donnees quand un module est desactive: seules les surfaces et actions sont masquees ou bloquees.
- Cadrage de `MembershipModulePreference` comme modele cible pour eviter des preferences de modules globales a l'utilisateur.
- Cadrage d'une future registry applicative des modules pour alimenter navigation, cockpit et routes.
- Confirmation que le partage initial d'un rucher passe par l'organisation, les roles et les permissions.
- Cadrage du partage fin par rucher comme module optionnel futur, non implemente tant que le besoin n'est pas confirme.
- Cadrage de la transhumance comme mouvement de ruches ou lots de ruches entre sites, sans deplacer le concept de rucher.
- Aucun code metier, aucune migration, aucune interface de gestion, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-06-20 - EQUIPMENT-00

- Cadrage documentaire du futur module `Materiel`.
- Retenue d'une approche hybride: quantites pour consommables, items individuels pour equipements durables ou partages.
- Identification des categories: materiel de ruche, outils terrain, protections, nourrissement et sanitaire, recolte, transport, stockage et nettoyage.
- Definition d'une navigation cible sans ajout direct dans la bottom nav mobile initiale.
- Ajout de la sequence de lots `EQUIPMENT-01`, `EQUIPMENT-SHELL-01` et `EQUIPMENT-CRUD-01`.
- Achats, fournisseurs, prix, amortissements, comptabilite, destruction reglementaire complexe, IA, IoT et prescription sanitaire automatique restent hors perimetre.
- Aucun code metier, aucune migration, aucune route et aucun CRUD n'ont ete ajoutes.

## 2026-06-20 - APIARY-01

- Ajout des modèles Prisma `Apiary`, `Hive` et `Colony`.
- Ajout d'une migration PostgreSQL pour les ruchers, ruches et colonies.
- Ajout de types domaine simples et helpers de statut pour le périmètre apicole de base.
- Aucun CRUD, aucune API, aucun écran métier, aucune visite, tâche, sanitaire, IA ou IoT actif n'ont été ajoutés.

## 2026-06-20 - RBAC-01

- Ajout d'un catalogue TypeScript des permissions, rôles initiaux et modules activables.
- Ajout de helpers purs pour vérifier permissions et modules activés.
- Les modules connectés et IA restent présents uniquement comme références désactivées par défaut.
- Aucune interface de gestion, aucune API et aucune activation IA/IoT n'ont été ajoutées.

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
