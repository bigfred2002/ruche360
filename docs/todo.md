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

### Point lots en cours

- [ ] Finaliser et merger `EQUIPMENT-00` pour cadrer le module materiel.
- [ ] Finaliser et merger `MODULES-DYNAMIC-00` / `ARCHITECTURE-DOCS-00` pour stabiliser la documentation d'architecture.
- [ ] Finaliser `MODULES-DYNAMIC-01` et `MODULES-REGISTRY-01` sur la branche `codex/modules-dynamic-registry-01`.

### Analyse lots dynamiques UI/applicatifs

- [ ] `DESIGN-DYNAMIC-SHELL-01`: rendre le shell plus vivant sans Figma, avec cockpit modernise, micro-interactions sobres, etats visuels et meilleure hierarchie mobile/desktop.
- [ ] `MODULES-NAVIGATION-01`: brancher la navigation mobile/desktop et le cockpit sur la registry de modules, sans CRUD metier.
- [ ] `USER-CONTEXT-SHELL-01`: simuler les profils amateur, association, exploitation professionnelle, lecteur et intervenant sanitaire pour tester les variations de cockpit.
- [ ] `DYNAMIC-STATES-01`: ajouter les composants d'etats reutilisables: vide, chargement, sans permission, module desactive, module a venir, alerte.
- [ ] `RESPONSIVE-WORKFLOWS-01`: affiner les parcours mobile-first pour ruchers, visites, modules et profil organisation, sans formulaire fonctionnel.
- [ ] `ACCESSIBLE-MOTION-01`: ajouter transitions et animations sobres compatibles `prefers-reduced-motion`.
- [ ] `DESIGN-TOKENS-01`: consolider les tokens UI Tailwind: couleurs, espacements, surfaces, badges, focus et contrastes exterieur.
- [ ] `MODULES-CATALOG-SHELL-01`: creer une page catalogue modules qui distingue actif, desactive, a venir et sans permission.
- [ ] `PROFILE-ONBOARDING-SHELL-01`: preparer le parcours d'accueil d'un apiculteur amateur avec creation d'espace personnel simulee, sans auth reelle.
- [ ] Garder hors perimetre de ces lots: Prisma supplementaire, CRUD metier, auth reelle, IA active, IoT actif, appel API externe et suppression de donnees.

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
- [x] Produire une architecture logique transversale de l'application.
- [x] Produire une cartographie des modules et fonctions.
- [x] Produire une gouvernance des lots et sprints.
- [x] Cadrer les modules dynamiques par organisation et adhesion.
- [x] Ajouter les modèles exécutables ruchers, ruches et colonies.
- [x] Cadrer le futur module materiel apicole sans code metier.
- [ ] Ajouter le module, les permissions et le modele minimal du materiel.
- [ ] Ajouter un ecran inventaire materiel mobile-first.
- [ ] Ajouter les actions serveur minimales du materiel.
- [x] Ajouter les preferences de modules par adhesion.
- [x] Creer la registry applicative des modules.
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

## MODULES-DYNAMIC-01

- [x] Ajouter `MembershipModulePreference` dans Prisma.
- [x] Generer la migration PostgreSQL correspondante.
- [x] Ajouter des helpers purs pour calculer les modules effectifs.
- [x] Garder `UserModulePreference` en place sans suppression risquee.
- [x] Ne pas creer d'interface de gestion, route ou CRUD.

## MODULES-REGISTRY-01

- [x] Creer une registry TypeScript des modules applicatifs.
- [x] Documenter pour chaque module route cible, permissions, disponibilite et surfaces de navigation.
- [x] Ajouter des helpers purs pour filtrer les modules visibles.
- [x] Exporter la registry depuis `src/features/rbac`.
- [x] Ne pas brancher encore la navigation ou le cockpit sur cette registry.

## ARCHITECTURE-DOCS-00

- [x] Documenter les moteurs logiques de l'application.
- [x] Documenter la regle centrale d'acces aux fonctions.
- [x] Cartographier les modules socle, apicoles, support, connectes et IA.
- [x] Documenter les regles de classement d'une nouvelle fonction.
- [x] Documenter le cycle de lot, les validations et la definition of done.
- [x] Ne pas ajouter de code applicatif, migration ou dependance.

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
