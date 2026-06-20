# Todo

## REPO-INIT-01

- [x] Créer les fichiers documentaires de base.
- [x] Documenter le périmètre initial.
- [x] Documenter les hors périmètres.
- [x] Documenter les modules connectés et IA désactivés.
- [x] Ajouter `.gitignore`.
- [x] Ajouter `.env.example`.
- [x] Préparer la Pull Request.

## Prochains lots

- [x] Créer Docker Compose.
- [x] Définir les commandes de validation containerisées.
- [x] Scaffolder l'application dans un lot dédié.
- [x] Poser un shell applicatif mobile-first statique.
- [x] Ajouter un contrôle de confidentialité pre-push pour dépôt public.
- [x] Ajouter une CI Docker-first pour PR et `main`.
- [x] Cadrer la stratégie data avant Prisma.
- [x] Créer le modèle de données exécutable minimal.
- [x] Préparer un runner GitHub local Docker pour validations DevSecOps manuelles.
- [x] Poser les conventions comptes, organisations et adhésions.
- [x] Poser le catalogue rôles, permissions et modules.
- [x] Cadrer les modules dynamiques par organisation et adhesion.
- [x] Ajouter les modèles exécutables ruchers, ruches et colonies.
- [x] Cadrer le futur module materiel apicole sans code metier.
- [ ] Ajouter le module, les permissions et le modele minimal du materiel.
- [ ] Ajouter un ecran inventaire materiel mobile-first.
- [ ] Ajouter les actions serveur minimales du materiel.
- [ ] Ajouter les preferences de modules par adhesion.
- [ ] Creer la registry applicative des modules.
- [ ] Ajouter le choix de modules dans les profils membres.
- [ ] Cadrer le partage fin par rucher si le besoin est confirme.
- [ ] Cadrer puis implementer les mouvements de ruches.

## EQUIPMENT-00

- [x] Documenter les categories de materiel apicole ciblees.
- [x] Retenir un suivi hybride: quantites pour consommables, items individuels pour equipements durables.
- [x] Documenter les statuts simples du materiel.
- [x] Definir l'approche UX sans surcharge de navigation mobile.
- [x] Identifier les lots `EQUIPMENT-01`, `EQUIPMENT-SHELL-01` et `EQUIPMENT-CRUD-01`.
- [x] Exclure achats, fournisseurs, couts, comptabilite, destruction complexe, IA, IoT et prescription automatique.
- [x] Ne pas creer de code metier, migration, route ou CRUD.

## MODULES-DYNAMIC-00

- [x] Documenter les quatre couches: catalogue, organisation, adhesion, permissions.
- [x] Documenter que la desactivation d'un module conserve les donnees.
- [x] Cadrer `MembershipModulePreference` comme modele cible.
- [x] Cadrer la registry applicative des modules.
- [x] Cadrer le partage initial d'un rucher par organisation.
- [x] Cadrer la transhumance comme mouvement de ruches entre sites.
- [x] Ne pas creer de migration, interface, CRUD, IA ou IoT actif.

## APIARY-01

- [x] Ajouter `Apiary` dans Prisma.
- [x] Ajouter `Hive` dans Prisma.
- [x] Ajouter `Colony` dans Prisma.
- [x] Générer la migration PostgreSQL.
- [x] Ajouter des types domaine simples.
- [x] Ne pas créer de CRUD, d'API ou d'écran métier.

## RBAC-01

- [x] Ajouter le catalogue TypeScript des permissions.
- [x] Ajouter les rôles initiaux.
- [x] Ajouter le catalogue des modules activables.
- [x] Ajouter des helpers purs de vérification permission/module.
- [x] Garder les modules IA et connectés désactivés par défaut.
- [x] Ne pas créer d'interface de gestion des rôles.

## AUTH-01

- [x] Ajouter les types domaine utilisateur, organisation et adhésion.
- [x] Ajouter des helpers purs d'accès organisationnel.
- [x] Documenter le périmètre sans Auth.js, session, API ou mot de passe.
- [x] Ne pas ajouter de dépendance.
- [x] Ne pas créer d'authentification réelle.

## DEVSECOPS-RUNNER-01

- [x] Ajouter un Dockerfile dédié au runner GitHub local.
- [x] Ajouter un Compose séparé pour le runner.
- [x] Ajouter un modèle d'environnement sans secret.
- [x] Ajouter un workflow manuel ciblant le runner local.
- [x] Documenter les risques liés au dépôt public et au socket Docker.
- [x] Ne pas déclencher le runner local sur les Pull Requests publiques.

## DATA-00

- [x] Documenter les principes data multi-organisation.
- [x] Définir le socle minimal du futur `DATA-01`.
- [x] Différer les entités apicoles métier vers leurs lots dédiés.
- [x] Documenter les données sensibles.
- [x] Ne pas créer de dossier `prisma/`.
- [x] Ne pas ajouter de dépendance.

## DATA-01

- [x] Ajouter Prisma via Docker Compose.
- [x] Créer le schéma Prisma minimal.
- [x] Créer la migration initiale.
- [x] Limiter le schéma aux organisations, utilisateurs, rôles, permissions et modules.
- [x] Ne pas créer de modèle rucher, ruche, visite, sanitaire, IA ou IoT actif.

## SECURITY-PRE-PUSH-01

- [x] Ignorer explicitement les exports Stitch locaux.
- [x] Ajouter un hook `pre-push` versionné pour bloquer secrets, données personnelles et fichiers sensibles.
- [x] Ajouter une commande d'installation du hook local.
- [x] Documenter le contrôle de confidentialité.

## CI-BASE-01

- [x] Ajouter un workflow GitHub Actions.
- [x] Exécuter le scan de confidentialité en CI.
- [x] Valider Docker Compose en CI.
- [x] Exécuter lint et build via Docker Compose.
- [x] Documenter la CI comme contrôle à rendre obligatoire sur `main`.

## DOCKER-DEV-01

- [x] Ajouter `Dockerfile.dev`.
- [x] Ajouter `Dockerfile`.
- [x] Ajouter `docker-compose.yml`.
- [x] Ajouter `.dockerignore`.
- [x] Ajouter `Makefile`.
- [x] Mettre à jour `.env.example`.
- [x] Documenter les commandes pnpm via Docker Compose.
- [x] Documenter le cas où l'application Next.js n'existe pas encore.
- [x] Préparer la Pull Request.

## APP-INIT-01

- [x] Ajouter le socle Next.js App Router.
- [x] Activer TypeScript.
- [x] Activer Tailwind CSS.
- [x] Ajouter une interface d'accueil simple alignée avec `DESIGN.md`.
- [x] Ne pas ajouter de module métier.
- [x] Ne pas ajouter d'authentification.
- [x] Ne pas ajouter Prisma.
- [x] Lancer lint via Docker Compose.
- [x] Lancer build via Docker Compose.
- [x] Préparer la Pull Request.

## DESIGN-SHELL-01

- [x] Créer un shell responsive mobile-first.
- [x] Ajouter une navigation basse mobile.
- [x] Ajouter des repères de navigation desktop simples.
- [x] Créer des cartes de cockpit statiques.
- [x] Afficher les modules optionnels comme désactivés ou à venir.
- [x] Analyser les exports Stitch mobile et desktop.
- [x] Enrichir le shell avec une sidebar desktop et un rendu plus coloré.
- [x] Respecter `prefers-reduced-motion` pour les micro-animations.
- [x] Ne pas ajouter de module métier, authentification, Prisma, IA ou IoT actif.
- [x] Lancer les validations via Docker Compose.
- [x] Préparer la Pull Request draft.
