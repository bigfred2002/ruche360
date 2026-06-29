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

- [x] Reconciler la todo avec les lots deja termines dans `TODO-CLEANUP-01`.
- [x] Confirmer que `EQUIPMENT-00`, `MODULES-DYNAMIC-00`, `ARCHITECTURE-DOCS-00`, `MODULES-DYNAMIC-01` et `MODULES-REGISTRY-01` sont termines.
- [x] Revoir le runner local Docker dans `SECURITY-RUNNER-01`.
- [x] Cadrer le partage fin par rucher dans `APIARY-ACCESS-00` si le besoin est confirme.
- [x] Cadrer la transhumance dans `TRANSHUMANCE-00` avant d'implementer les mouvements de ruches.
- [x] Ajouter le module, les permissions et le modele minimal du materiel dans `EQUIPMENT-01`.

### Analyse lots dynamiques UI/applicatifs

- [x] `APP-NAVIGATION-ROUTES-01`: activer la navigation vers des routes shell statiques, sans logique métier.
- [x] `DESIGN-DYNAMIC-SHELL-01`: rendre le shell plus vivant sans Figma, avec cockpit modernise, micro-interactions sobres, etats visuels et meilleure hierarchie mobile/desktop.
- [x] `MODULES-NAVIGATION-01`: brancher la navigation mobile/desktop et le cockpit sur la registry de modules, sans CRUD metier.
- [x] `USER-CONTEXT-SHELL-01`: simuler les profils amateur, association, exploitation professionnelle, lecteur et intervenant sanitaire pour tester les variations de cockpit.
- [x] `USER-PROFILE-MODULES-01`: prévisualiser le choix de modules par adhésion membre, sans formulaire fonctionnel ni persistance.
- [x] `DYNAMIC-STATES-01`: ajouter les composants d'etats reutilisables: vide, chargement, sans permission, module desactive, module a venir, alerte.
- [x] `RESPONSIVE-WORKFLOWS-01`: affiner les parcours mobile-first pour ruchers, visites, modules et profil organisation, sans formulaire fonctionnel.
- [x] `ACCESSIBLE-MOTION-01`: ajouter transitions et animations sobres compatibles `prefers-reduced-motion`.
- [x] `DESIGN-TOKENS-01`: consolider les tokens UI Tailwind: couleurs, espacements, surfaces, badges, focus et contrastes exterieur.
- [x] `MODULES-CATALOG-SHELL-01`: creer une page catalogue modules qui distingue actif, desactive, a venir et sans permission.
- [x] `PROFILE-ONBOARDING-SHELL-01`: preparer le parcours d'accueil d'un apiculteur amateur avec creation d'espace personnel simulee, sans auth reelle.
- [x] `ERROR-PAGES-01`: ajouter des pages d'erreur personnalisées pour les principaux codes d'erreur.
- [x] Garder hors perimetre de ces lots: Prisma supplementaire, CRUD metier, auth reelle, IA active, IoT actif, appel API externe et suppression de donnees.

- [x] Préparer le lot sécurité dépendances et alertes.
- [x] Traiter les alertes Dependabot ouvertes dans `SECURITY-DEPENDENCIES-01`.
- [x] Durcir la CI dans `SECURITY-CI-01` si un contrôle fiable peut être ajouté sans ralentir les micro-lots.
- [x] Évaluer un scanner de secrets dédié dans `SECURITY-SECRETS-01`.
- [x] Revoir le runner local Docker dans `SECURITY-RUNNER-01`.
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
- [x] Poser le contrat de session applicative sans auth réelle.
- [x] Poser le catalogue rôles, permissions et modules.
- [x] Produire une architecture logique transversale de l'application.
- [x] Produire une cartographie des modules et fonctions.
- [x] Produire une gouvernance des lots et sprints.
- [x] Cadrer les modules dynamiques par organisation et adhesion.
- [x] Ajouter les modèles exécutables ruchers, ruches et colonies.
- [x] Cadrer le futur module materiel apicole sans code metier.
- [x] Ajouter le module, les permissions et le modele minimal du materiel.
- [x] Ajouter un ecran inventaire materiel mobile-first.
- [x] Ajouter les actions serveur minimales du materiel.
- [x] Ajouter les preferences de modules par adhesion.
- [x] Creer la registry applicative des modules.
- [x] Ajouter le choix de modules dans les profils membres.
- [x] Cadrer le partage fin par rucher si le besoin est confirme.
- [x] Cadrer les mouvements de ruches dans `TRANSHUMANCE-00`.
- [x] Implementer les mouvements de ruches dans `HIVE-MOVEMENTS-01`.

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

## MODULES-NAVIGATION-01

- [x] Alimenter la navigation mobile depuis la registry de modules.
- [x] Alimenter la sidebar desktop depuis la registry de modules.
- [x] Alimenter les cartes du cockpit depuis la registry de modules.
- [x] Garder un profil de démonstration statique, sans session réelle ni API.
- [x] Garder les modules IA et connectés dans la registry sans les afficher directement dans le cockpit.
- [x] Ne pas créer de route métier, CRUD, auth, Prisma supplémentaire, IA active ou IoT actif.

## USER-CONTEXT-SHELL-01

- [x] Créer des profils de démonstration statiques: amateur, association, exploitation, lecture seule et intervenant sanitaire.
- [x] Varier les modules visibles, permissions, priorités et cartes de cockpit selon le profil actif.
- [x] Afficher une comparaison statique des profils sans sélecteur fonctionnel.
- [x] Garder les variations en mémoire locale de présentation, sans session, API ou persistance.
- [x] Ne pas créer d'auth, CRUD, route métier, Prisma supplémentaire, IA active ou IoT actif.

## USER-PROFILE-MODULES-01

- [x] Ajouter une prévisualisation statique du futur réglage de modules par adhésion membre.
- [x] Afficher les trois contraintes: module actif dans l'organisation, module visible pour le membre et permission disponible.
- [x] Rappeler que masquer un module ne supprime aucune donnée.
- [x] Garder IA, IoT et modules connectés hors du choix tant qu'ils ne sont pas activés par lot dédié.
- [x] Ne pas créer de formulaire fonctionnel, session, API, persistance, CRUD, auth ou Prisma supplémentaire.

## DYNAMIC-STATES-01

- [x] Ajouter un composant `StatePanel` réutilisable.
- [x] Ajouter les états vide, chargement, sans permission, module désactivé, fonction à venir et alerte.
- [x] Afficher une galerie statique dans le cockpit pour cadrer les futurs écrans.
- [x] Garder les états comme surfaces de présentation sans action fonctionnelle.
- [x] Ne pas créer de route, API, session, CRUD métier, auth, Prisma supplémentaire, IA active ou IoT actif.

## APP-NAVIGATION-ROUTES-01

- [x] Transformer les entrées de navigation en liens vers les routes prévues quand elles existent.
- [x] Ajouter des pages shell statiques pour les modules actifs principaux.
- [x] Ajouter une route `/modules` pour la navigation secondaire.
- [x] Garder les pages comme surfaces de préparation sans données dynamiques.
- [x] Ne pas créer de formulaire fonctionnel, CRUD métier, API, session, auth, Prisma supplémentaire, IA active ou IoT actif.

## ACCESSIBLE-MOTION-01

- [x] Centraliser les transitions sobres dans des classes CSS réutilisables.
- [x] Appliquer les transitions aux cartes et aux entrées de navigation.
- [x] Ajouter un focus visible cohérent pour les liens principaux.
- [x] Respecter `prefers-reduced-motion` en supprimant les déplacements au survol.
- [x] Ne pas ajouter de dépendance, logique métier, API, session, auth, Prisma supplémentaire, IA active ou IoT actif.

## DESIGN-TOKENS-01

- [x] Ajouter des classes sémantiques pour surfaces principales et secondaires.
- [x] Ajouter une classe de texte secondaire lisible.
- [x] Ajouter une classe commune pour les accroches de section.
- [x] Appliquer ces tokens à des composants existants sans refonte globale.
- [x] Ne pas modifier la logique, les routes, l'API, la session, Prisma, IA ou IoT.

## MODULES-CATALOG-SHELL-01

- [x] Remplacer `/modules` par un catalogue statique dédié.
- [x] Distinguer les statuts actif, sans permission, désactivé et à venir.
- [x] Utiliser la registry existante comme source de présentation.
- [x] Garder le catalogue sans bouton d'activation fonctionnel.
- [x] Ne pas créer d'API, session, persistance, CRUD métier, auth, Prisma supplémentaire, IA active ou IoT actif.

## PROFILE-ONBOARDING-SHELL-01

- [x] Ajouter une route `/onboarding` statique.
- [x] Préparer le parcours d'accueil d'un apiculteur amateur.
- [x] Présenter l'espace personnel simulé et les modules essentiels.
- [x] Relier le raccourci profil de la topbar vers ce parcours.
- [x] Ne pas créer de compte réel, auth, API, session, persistance, CRUD métier, Prisma supplémentaire, IA active ou IoT actif.

## ERROR-PAGES-01

- [x] Ajouter une page 404 personnalisée via `not-found.tsx`.
- [x] Ajouter une page d'erreur runtime via `error.tsx`.
- [x] Ajouter des routes statiques de prévisualisation pour 403, 500 et 503.
- [x] Ajouter une touche d'humour légère sur chaque page.
- [x] Ne pas créer d'API, session, persistance, CRUD métier, auth, Prisma supplémentaire, IA active ou IoT actif.

## DESIGN-DYNAMIC-SHELL-01

- [x] Ajouter une surface de cockpit plus vivante pour rythmer les usages terrain.
- [x] Présenter un tempo statique: observer, prioriser, noter et préparer.
- [x] Ajouter des signaux visuels sobres sans bouton fonctionnel.
- [x] Garder l'interface sans Figma, sans dépendance et sans intégration de maquette externe.
- [x] Ne pas créer de route, formulaire fonctionnel, API, session, persistance, CRUD métier, auth, Prisma supplémentaire, IA active ou IoT actif.

## RESPONSIVE-WORKFLOWS-01

- [x] Ajouter une prévisualisation statique des parcours mobile-first.
- [x] Cadrer les parcours rucher, visite, modules et profil organisation.
- [x] Afficher les étapes prévues sans créer de navigation réelle.
- [x] Rappeler que la bottom nav doit rester centrée sur les actions terrain.
- [x] Ne pas créer de route, formulaire fonctionnel, API, session, persistance, CRUD métier, auth, Prisma supplémentaire, IA active ou IoT actif.

## SECURITY-DEPENDENCIES-00

- [x] Ajouter une configuration Dependabot pour npm, GitHub Actions et Docker.
- [x] Documenter le workflow de traitement des alertes.
- [x] Documenter les validations obligatoires.
- [x] Documenter les règles de confidentialité avant push.
- [x] Préparer les lots `SECURITY-DEPENDENCIES-01`, `SECURITY-CI-01`, `SECURITY-SECRETS-01` et `SECURITY-RUNNER-01`.
- [x] Ne pas modifier les versions de dépendances dans ce lot.

## SECURITY-DEPENDENCIES-01

- [x] Identifier les vulnérabilités via `docker compose run --rm app pnpm audit --prod`.
- [x] Corriger `@hono/node-server` transitif via override pnpm vers `1.19.13`.
- [x] Corriger `postcss` transitif via override pnpm vers `8.5.15`.
- [x] Régénérer `pnpm-lock.yaml` via Docker Compose.
- [x] Vérifier que `pnpm audit --prod` ne signale plus de vulnérabilité connue.
- [x] Ne pas ajouter de dépendance directe, fonctionnalité métier, auth, Prisma supplémentaire, IA ou IoT actif.

## SECURITY-CI-01

- [x] Ajouter une étape CI `pnpm audit --prod` via Docker Compose.
- [x] Ajouter la cible `make audit-prod` pour lancer le même contrôle localement.
- [x] Garder l'audit après l'installation des dépendances et avant lint/build.
- [x] Documenter le contrôle dans `docs/security-dependencies.md`.
- [x] Ne pas ajouter de dépendance, secret, fonctionnalité métier, auth, Prisma supplémentaire, IA ou IoT actif.

## SECURITY-SECRETS-01

- [x] Ajouter une configuration Gitleaks dédiée au dépôt.
- [x] Ajouter `make secrets-scan` pour exécuter Gitleaks via Docker.
- [x] Ajouter le scan Gitleaks dans la CI.
- [x] Exclure les dossiers générés, caches de dépendances, exports locaux et `runner.env`.
- [x] Ne pas ajouter de secret, dépendance npm, fonctionnalité métier, auth, Prisma supplémentaire, IA ou IoT actif.

## SECURITY-RUNNER-01

- [x] Confirmer que le runner local reste déclenché manuellement par `workflow_dispatch`.
- [x] Documenter les risques liés au socket Docker local.
- [x] Documenter la rotation, le retrait et la non-publication du jeton d'enregistrement.
- [x] Aligner le workflow local avec `make security-scan`, `make secrets-scan`, `pnpm audit --prod`, lint et build.
- [x] Ne pas ajouter de secret, dépendance, fonctionnalité métier, auth, Prisma supplémentaire, IA ou IoT actif.

## APIARY-ACCESS-00

- [x] Documenter le module optionnel `apiary_access`.
- [x] Confirmer que le partage organisationnel reste le comportement par defaut.
- [x] Definir les cas d'usage justifiant un partage fin par rucher.
- [x] Cadrer les permissions, le modele conceptuel et l'UX cible.
- [x] Exclure partage public, acces anonyme, geolocalisation publique et duplication de ruchers.
- [x] Ne pas creer de schema Prisma, route, ecran, CRUD, auth, IA ou IoT actif.

## TRANSHUMANCE-00

- [x] Documenter la transhumance comme mouvement de ruches entre ruchers.
- [x] Confirmer qu'un rucher reste un site fixe et ne se deplace pas.
- [x] Cadrer statuts, motifs, modele conceptuel et effets sur l'emplacement courant.
- [x] Definir l'UX mobile-first cible sans logistique lourde.
- [x] Exclure GPS actif, logistique lourde, contrats, couts, IA active et IoT actif.
- [x] Exclure GPS actif, IoT, itineraire automatique, vehicules, couts et cartographie publique.
- [x] Ne pas creer de schema Prisma, route, ecran, CRUD, auth, IA ou IoT actif.

## HIVE-MOVEMENTS-01

- [x] Ajouter le module `transhumance` au catalogue RBAC, desactive par defaut.
- [x] Ajouter les permissions `transhumance.read`, `transhumance.write` et `transhumance.manage`.
- [x] Ajouter les modeles Prisma `HiveMovement` et `HiveMovementItem`.
- [x] Ajouter les statuts et motifs de mouvements de ruches.
- [x] Ajouter des helpers purs pour deduire l'emplacement courant depuis les mouvements termines.
- [x] Ne pas ajouter d'ecran, CRUD, action serveur, API, GPS actif, IA active ou IoT actif.

## EQUIPMENT-01

- [x] Ajouter le module `equipment` au catalogue RBAC.
- [x] Ajouter les permissions `equipment.read`, `equipment.write` et `equipment.manage`.
- [x] Ajouter les modeles Prisma `EquipmentType`, `EquipmentStock`, `EquipmentItem` et `EquipmentEvent`.
- [x] Ajouter des types domaine purs dans `src/features/equipment`.
- [x] Garder le lien au rucher optionnel et ne pas rattacher le materiel aux ruches ou colonies dans ce lot.
- [x] Ne pas creer d'ecran, formulaire, CRUD, action serveur, auth, IA ou IoT actif.

## EQUIPMENT-SHELL-01

- [x] Ajouter la route `/equipment`.
- [x] Ajouter une interface inventaire mobile-first statique.
- [x] Afficher cartes de synthese, filtres visuels, categories, statuts et maintenance.
- [x] Rendre le module visible dans la navigation desktop et le catalogue, sans bottom nav mobile.
- [x] Garder l'ecran sans formulaire operationnel dans ce lot.

## EQUIPMENT-CRUD-01

- [x] Ajouter des commandes serveur minimales pour le module materiel.
- [x] Exiger un contexte explicite d'organisation, de module active et de permissions.
- [x] Permettre creation de type materiel reservee a `equipment.manage`.
- [x] Permettre creation et ajustement de stock avec historique leger.
- [x] Permettre creation d'item individuel, changement de statut et deplacement simple.
- [x] Verifier que les types, stocks, items et ruchers manipules appartiennent a l'organisation cible.
- [x] Garder l'ecran `/equipment` sans formulaire operationnel tant que l'authentification reelle n'existe pas.
- [x] Ne pas ajouter achats, fournisseurs, prix, comptabilite, suppression dure, IA active ou IoT actif.
- [x] Ne pas creer de formulaire, CRUD, action serveur, API, persistance, auth, IA ou IoT actif.

## TODO-CLEANUP-01

- [x] Nettoyer les contradictions du bloc `Point lots en cours`.
- [x] Aligner les statuts des lots conceptuels deja termines avec leurs sections detaillees.
- [x] Remettre en avant les prochains lots reels: `SECURITY-RUNNER-01`, `APIARY-ACCESS-00`, `TRANSHUMANCE-00` et `EQUIPMENT-01`.
- [x] Conserver ce lot comme nettoyage documentaire uniquement.
- [x] Ne pas modifier le code applicatif, Prisma, Docker runtime, dependances, auth, IA ou IoT.

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

- [x] Poser les types utilisateur, organisation et adhésion.
- [x] Ajouter des helpers purs de normalisation et d'accès organisationnel.
- [x] Ne pas ajouter Auth.js, session, page de connexion, API d'authentification, email ou mot de passe.

## AUTH-SESSION-01

- [x] Ajouter un type de session applicative interne.
- [x] Déduire l'organisation active à partir d'un utilisateur actif et d'une adhésion active.
- [x] Calculer le scope actif: utilisateur, organisation, adhésion, modules effectifs et permissions.
- [x] Ajouter un helper de vérification module + permission depuis la session.
- [x] Ne pas ajouter Auth.js, cookie, JWT, page de connexion, API d'authentification, secret ou stockage de mot de passe.

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
