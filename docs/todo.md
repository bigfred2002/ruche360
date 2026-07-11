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

- [x] `DEV-SERVER-01`: stabiliser le serveur dev Docker apres le panic Turbopack local et retrouver un HTTP 200.
- [x] Reconciler la todo avec les lots deja termines dans `TODO-CLEANUP-01`.
- [x] Confirmer que `EQUIPMENT-00`, `MODULES-DYNAMIC-00`, `ARCHITECTURE-DOCS-00`, `MODULES-DYNAMIC-01` et `MODULES-REGISTRY-01` sont termines.
- [x] Revoir le runner local Docker dans `SECURITY-RUNNER-01`.
- [x] Cadrer le partage fin par rucher dans `APIARY-ACCESS-00` si le besoin est confirme.
- [x] Cadrer la transhumance dans `TRANSHUMANCE-00` avant d'implementer les mouvements de ruches.
- [x] Ajouter le module, les permissions et le modele minimal du materiel dans `EQUIPMENT-01`.
- [x] `DEPLOY-HOME-00`: cadrer l'hebergement local, beta Synology, bascule VPS et prerequis de confidentialite, sans deploiement actif.
- [x] `AGENT-WORKFLOW-COMMIT-GUARD-01`: renforcer les consignes pour imposer commit, push, PR et merge/arbitrage avant d'enchainer un nouveau lot.

### Analyse lots dynamiques UI/applicatifs

- [x] `UX-RULES-SKILLS-01`: formaliser le référentiel UX, les skills d'audit et les règles agentiques avant les lots UX.
- [x] `UX-DENSITY-01`: alléger le cockpit et les premières sections mobiles sans changer les modules ni les données.
- [x] `UX-MODULE-PAGES-01`: harmoniser les pages module avec un gabarit plus progressif et moins répétitif.
- [x] `UX-COPY-01`: raccourcir les textes UI et déplacer les explications longues vers la documentation.
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
- [x] Ajouter un seed de développement fictif et idempotent.
- [x] Préparer un runner GitHub local Docker pour validations DevSecOps manuelles.
- [x] Poser les conventions comptes, organisations et adhésions.
- [x] Poser le contrat de session applicative sans auth réelle.
- [x] Ajouter une session de développement fictive sans secret.
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
- [x] Raccorder les actions serveur materiel au scope de session applicative.
- [x] Ajouter une preview de formulaires materiel non operationnels.
- [x] Brancher l'inventaire materiel en lecture seule sur le seed de developpement.
- [x] Activer des formulaires serveur de developpement pour le materiel.
- [x] Ajouter les preferences de modules par adhesion.
- [x] Creer la registry applicative des modules.
- [x] Ajouter le choix de modules dans les profils membres.
- [x] Cadrer le partage fin par rucher si le besoin est confirme.
- [x] Cadrer les mouvements de ruches dans `TRANSHUMANCE-00`.
- [x] Implementer les mouvements de ruches dans `HIVE-MOVEMENTS-01`.
- [x] Ajouter un shell transhumance dans `TRANSHUMANCE-SHELL-01`.
- [x] Preparer le backlog admin sans implementation dans `ADMIN-BACKLOG-01`.
- [x] Ajouter les actions serveur minimales de transhumance dans `TRANSHUMANCE-ACTIONS-01`.
- [x] Ajouter les formulaires de developpement transhumance dans `TRANSHUMANCE-FORMS-SHELL-01`.
- [x] Cadrer Archify comme documentation visuelle complementaire dans `ARCHIFY-DOCS-00`.

### Documentation visuelle

- [x] `ARCHIFY-DOCS-00`: cadrer l'usage d'Archify sans dependance applicative.
- [x] `ARCHIFY-DIAGRAMS-01`: generer les premiers SVG stables depuis les prompts versionnes.
- [x] `DOCS-ARCHITECTURE-SYNC-01`: verifier la synchronisation entre diagrammes, architecture et modules.

### Backlog administration et gouvernance

- [x] `ADMIN-00`: cadrer le centre d'administration d'organisation, sans code.
- [x] `ADMIN-SHELL-01`: ajouter un shell `/admin` desktop/catalogue uniquement, sans CRUD.
- [x] `ADMIN-DATA-OVERVIEW-01`: afficher les volumes de donnees par organisation en lecture seule.
- [x] `AUDIT-LOG-00`: cadrer le journal d'activite metier, distinct de l'audit dependances.
- [x] `AUDIT-LOG-01`: ajouter le modele executable minimal du journal d'activite metier.
- [x] `AUDIT-LOG-SHELL-01`: ajouter un shell statique `/admin/journal`, sans lecture reelle.
- [x] `DATA-LIFECYCLE-00`: cadrer archivage, conservation et suppression controlee.
- [x] `TOOLING-DEPENDENCIES-01`: mettre a jour le gestionnaire pnpm declare et la regle de commit par lot, sans changer les dependances applicatives.
- [x] `PLATFORM-ADMIN-00`: cadrer plus tard l'administration plateforme, reservee a l'exploitation technique.

### Backlog exploitation et hebergement

- [x] `DEPLOY-HOME-00`: choisir une trajectoire Docker-first locale, beta Synology et VPS europeen, sans exposition publique.
- [x] `DEPLOY-PROD-ARCHITECTURE-00`: definir l'architecture de production, le point d'entree HTTPS et les configurations attendues, sans secret reel.
- [x] `BACKUP-RESTORE-00`: cadrer sauvegarde, chiffrement, retention et restauration PostgreSQL avant toute beta publique.
- [ ] `DEPLOY-SYNOLOGY-01`: mettre en oeuvre une beta privee seulement apres validation de l'architecture, des sauvegardes et de l'authentification.
- [ ] `DEPLOY-VPS-00`: cadrer la migration vers un VPS europeen et le retour arriere avant ouverture large.

### Backlog terrain

- [x] `VISITS-UX-FLOW-01`: rendre la page visites plus orientee sortie terrain, sans modifier les actions ni les donnees.
- [x] `VISITS-HIVE-FIRST-01`: simplifier la creation de visite autour d'une ruche active et deriver le rucher et la colonie active.
- [x] `TASKS-UX-FLOW-01`: rendre la page taches plus orientee triage terrain, sans notification ni calendrier.
- [x] `TASKS-HIVE-FIRST-01`: simplifier la creation de tache autour d'une ruche optionnelle et deriver son contexte actif.
- [x] `EQUIPMENT-UX-FLOW-01`: rendre la page materiel plus orientee preparation et maintenance, sans achat ni stock avance.
- [x] `CLASSIC-JOURNEY-01`: relier les ecrans de developpement dans un essai terrain guide, sans ajouter de logique metier ou de donnee.
- [x] `CLASSIC-JOURNEY-UX-01`: reduire le parcours de demonstration a visite, tache et materiel optionnel, avec divulgation progressive des limites.
- [x] `VISITS-SHELL-01`: remplacer `/visits` par un shell mobile-first dedie aux visites, sans CRUD.
- [x] `VISITS-00`: cadrer le modele visite avant schema executable.
- [x] `VISITS-01`: ajouter le modele Prisma minimal des visites, sans CRUD complet.
- [x] `VISITS-ACTIONS-01`: ajouter les actions serveur minimales des visites, sans formulaire actif.
- [x] `VISITS-FORMS-SHELL-01`: brancher `/visits` sur la lecture Prisma et des formulaires serveur de developpement.
- [x] `TASKS-01`: ajouter le modele minimal des taches et preparer le lien avec les visites.
- [x] `TASKS-SHELL-01`: ajouter un shell mobile-first statique pour les taches, sans CRUD.
- [x] `TASKS-ACTIONS-01`: ajouter les actions serveur minimales des taches, sans notification ni recurrence.
- [x] `TASKS-FORMS-SHELL-01`: brancher `/tasks` sur la lecture Prisma et des formulaires serveur de developpement.

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

## EQUIPMENT-ACTION-CONTEXT-01

- [x] Ajouter un helper de conversion `ApplicationSession` vers `EquipmentActionContext`.
- [x] Ajouter des wrappers serveur materiel acceptant une session applicative typée.
- [x] Bloquer les actions si aucune organisation active n'est disponible.
- [x] Conserver les verifications module `equipment` et permissions existantes.
- [x] Ne pas ajouter de session navigateur, Auth.js, cookie, JWT, page de connexion, formulaire CRUD public ou secret.

## EQUIPMENT-FORMS-SHELL-01

- [x] Ajouter une zone de formulaires materiel dans `/equipment`.
- [x] Afficher les futurs formulaires: type, stock et item individuel.
- [x] Lire les droits depuis la session de developpement.
- [x] Garder champs et actions desactives.
- [x] Ne pas ecrire en base, ne pas ajouter d'API, ne pas ajouter Auth.js, cookie, JWT ou secret.

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

## AUTH-DEV-SESSION-01

- [x] Ajouter une session de développement déterministe.
- [x] Utiliser uniquement des identifiants fictifs et non personnels.
- [x] Activer les modules utiles au cockpit et au matériel.
- [x] Donner les permissions nécessaires aux lots UI de développement.
- [x] Ne pas ajouter secret, token, mot de passe, cookie, Auth.js, page de connexion ou utilisateur réel.
- [x] Ne pas ajouter Auth.js, cookie, JWT, page de connexion, API d'authentification, secret ou stockage de mot de passe.

## AUTH-REAL-00

- [x] Cadrer le parcours d'un apiculteur proprietaire et celui d'un membre invite.
- [x] Retenir une identite OIDC, une session serveur et un cookie securise comme cible.
- [x] Documenter les regles de confidentialite, de reauthentification et de minimisation.
- [x] Definir la sequence `AUTH-PROVIDER-DECISION-01`, `AUTH-SESSION-WEB-01`, `AUTH-ONBOARDING-REAL-01`, `INVITATIONS-01`, `MODULE-ADMIN-01` et `AUTH-CUTOVER-ACTIONS-01`.
- [x] Ne pas ajouter de dependance, schema, route, secret, fournisseur ou auth reelle.

## DEPLOY-HOME-00

- [x] Comparer cloud gratuit, Raspberry Pi, Synology et VPS europeen.
- [x] Retenir Synology pour une beta privee et VPS europeen pour une ouverture large.
- [x] Documenter HTTPS, isolation PostgreSQL, sauvegardes chiffrees, supervision et restauration.
- [x] Cadrer les dependencies avec l'authentification OIDC future.
- [x] Ne creer aucun deploiement, domaine, tunnel, secret, configuration Docker ou compte externe.

## DATA-SEED-DEV-01

- [x] Ajouter un script de seed de développement idempotent.
- [x] Créer uniquement des données fictives et non personnelles.
- [x] Aligner les identifiants avec la session de développement.
- [x] Initialiser organisation, utilisateur fictif, adhésion, modules, permissions, ruchers, ruches, colonies et matériel.
- [x] Ajouter une commande Docker-first `make seed-dev`.
- [x] Ne pas ajouter de secret, dump, vraie donnée personnelle, IA active ou IoT actif.

## EQUIPMENT-LIVE-INVENTORY-01

- [x] Charger l'inventaire materiel depuis Prisma avec la session de developpement.
- [x] Afficher les stocks, items, statuts et groupes issus du seed local.
- [x] Garder un fallback visuel si la base n'est pas encore seedee.
- [x] Conserver les formulaires en lecture seule et sans mutation.
- [x] Ne pas ajouter d'API publique, auth reelle, secret, IA active ou IoT actif.

## EQUIPMENT-FORMS-ACTIVE-01

- [x] Ajouter des server actions de developpement pour creer un type, un stock et un item materiel.
- [x] Brancher les formulaires `/equipment` sur les actions existantes et les permissions de la session de developpement.
- [x] Revalider `/equipment` apres mutation pour afficher l'inventaire mis a jour.
- [x] Garder les formulaires simples: pas d'achat, fournisseur, prix, suppression ou comptabilite.
- [x] Ne pas ajouter d'API publique, auth reelle, secret, IA active ou IoT actif.

## TRANSHUMANCE-SHELL-01

- [x] Ajouter la route `/transhumance`.
- [x] Activer le module transhumance dans la registry pour desktop et catalogue, sans bottom nav mobile.
- [x] Afficher le workflow cible: mouvements planifies, termines, ruches concernees et checklist terrain.
- [x] Reutiliser les helpers purs d'emplacement courant sans lecture base ni GPS actif.
- [x] Ne pas ajouter de CRUD, formulaire actif, API, auth reelle, secret, IA active ou IoT actif.

## ADMIN-BACKLOG-01

- [x] Ajouter le backlog des futurs lots d'administration.
- [x] Confirmer que le centre d'administration cible l'organisation avant la plateforme.
- [x] Eviter la redondance avec `MODULE-ADMIN-01`, qui reste limite a l'administration des modules d'une organisation.
- [x] Distinguer l'audit dependances existant du futur journal d'activite metier.
- [x] Ne pas modifier le code applicatif, Prisma, Docker, les dependances, l'auth, l'IA ou l'IoT.

## TRANSHUMANCE-ACTIONS-01

- [x] Ajouter un contexte d'action transhumance base sur organisation, modules et permissions.
- [x] Ajouter les validations serveur pour statut, motif, dates et ruches concernees.
- [x] Ajouter les commandes serveur minimales: lister, creer, ajouter des ruches et changer de statut.
- [x] Mettre a jour l'emplacement courant des ruches uniquement quand un mouvement passe a `COMPLETED`.
- [x] Raccorder les actions au contrat `ApplicationSession` et a la session de developpement fictive.
- [x] Ne pas ajouter d'API publique, auth reelle, GPS actif, IA, IoT, route nouvelle ou dependance.

## TRANSHUMANCE-FORMS-SHELL-01

- [x] Brancher `/transhumance` en lecture sur les mouvements Prisma via la session de developpement.
- [x] Ajouter des formulaires serveur de developpement pour creer un mouvement, ajouter des ruches et changer le statut.
- [x] Utiliser uniquement les ruchers et ruches fictifs du seed local.
- [x] Afficher clairement que ces actions restent limitees au developpement.
- [x] Ne pas ajouter d'API publique, auth reelle, GPS actif, IA, IoT, dependance ou logistique avancee.

## ARCHIFY-DOCS-00

- [x] Documenter Archify comme outil complementaire de diagrammes.
- [x] Definir les regles de confidentialite pour prompts et exports.
- [x] Ajouter les prompts sources pour architecture logique, architecture technique, workflow agentique, flux sensibles et cycle transhumance.
- [x] Prevoir les exports SVG futurs sans versionner les HTML generes par defaut.
- [x] Ne pas ajouter de dependance, code applicatif, Docker, API, auth, IA ou IoT actif.

## ARCHIFY-DIAGRAMS-01

- [x] Ajouter les SVG stables pour architecture logique, architecture technique, workflow agentique, flux sensibles et cycle transhumance.
- [x] Relier les SVG depuis les documents Markdown concernes.
- [x] Garder les diagrammes comme documentation complementaire, non comme source de verite unique.
- [x] Ne pas versionner d'export HTML ou PNG temporaire.
- [x] Ne pas ajouter de dependance, code applicatif, Docker, API, auth, IA ou IoT actif.

## DOCS-ARCHITECTURE-SYNC-01

- [x] Mettre a jour README avec l'etat reel apres Prisma, materiel, transhumance et Archify.
- [x] Aligner `docs/technical-architecture.md` avec le socle applicatif existant.
- [x] Aligner `docs/application-architecture.md`, `docs/module-function-map.md` et `docs/data-model.md`.
- [x] Mettre a jour `docs/context.md`, `docs/todo.md` et `docs/journal.md`.
- [x] Ne pas modifier le code applicatif, Prisma, Docker, dependances, auth, IA ou IoT.

## ADMIN-00

- [x] Cadrer administration organisationnelle et administration plateforme.
- [x] Definir donnees sensibles, archivage, journal d'activite metier, exports et limites.
- [x] Confirmer que l'administration complete les modules `organizations`, `users_roles` et `modules` sans les dupliquer.
- [x] Clarifier que l'archivage et les statuts priment sur la suppression dure.
- [x] Ne pas creer de code applicatif, route, migration, CRUD, API, auth, IA ou IoT actif.

## ADMIN-SHELL-01

- [x] Ajouter une route shell `/admin`.
- [x] Afficher des cartes statiques: Organisation, Membres, Modules, Donnees, Securite et Journal.
- [x] Rendre l'entree visible en desktop/catalogue uniquement, pas dans la bottom nav mobile.
- [x] Conditionner la surface desktop aux permissions admin deja existantes.
- [x] Ne pas creer de CRUD, API, persistance, auth reelle, secret, IA ou IoT actif.

## ADMIN-DATA-OVERVIEW-01

- [x] Afficher des compteurs par organisation en lecture seule.
- [x] Couvrir au minimum ruchers, ruches, colonies, materiel et transhumance.
- [x] Signaler les modules desactives sans supprimer leurs donnees.
- [x] Ne pas ajouter d'export, suppression, correction automatique, API publique, IA ou IoT actif.

## AUDIT-LOG-00

- [x] Cadrer le futur journal d'activite metier.
- [x] Distinguer ce journal de l'audit securite/dependances `pnpm audit --prod`.
- [x] Definir les actions candidates: creation, modification, archivage, changement de role et activation module.
- [x] Definir les donnees a ne jamais journaliser: secrets, tokens, dumps et contenus sensibles inutiles.
- [x] Ne pas creer de schema Prisma, route, API, CRUD, auth reelle, IA ou IoT actif.

## AUDIT-LOG-01

- [x] Ajouter le modele Prisma `ActivityLogEntry`.
- [x] Ajouter l'enum Prisma `ActivityLogImportance`.
- [x] Relier le journal a l'organisation et optionnellement a l'adhesion acteur.
- [x] Ajouter des types TypeScript domaine et helpers purs de filtrage metadata.
- [x] Ne pas creer de route, ecran, action serveur, emission automatique d'evenements, export, API publique, IA ou IoT actif.

## AUDIT-LOG-SHELL-01

- [x] Ajouter la route `/admin/journal`.
- [x] Afficher des filtres et exemples statiques d'entrees de journal.
- [x] Rappeler les garde-fous de minimisation et de confidentialite.
- [x] Ne pas lire Prisma, paginer, exporter, emettre des evenements, creer d'action serveur, API publique, IA ou IoT actif.

## DATA-LIFECYCLE-00

- [x] Cadrer archivage, conservation et suppression controlee.
- [x] Privilegier `archivedAt` et les statuts metier plutot que la suppression dure.
- [x] Definir les regles pour donnees sanitaires, contacts, documents et localisation de ruchers.
- [x] Cadrer la restauration ou consultation d'archives sans exposer de donnees sensibles.
- [x] Ne pas creer de migration, job automatique, purge, export, API, IA ou IoT actif.

## TOOLING-DEPENDENCIES-01

- [x] Mettre a jour `packageManager` vers `pnpm@11.9.0`.
- [x] Executer `pnpm install` uniquement via Docker Compose.
- [x] Documenter la regle de commit distinct apres chaque lot.
- [x] Ne pas ajouter, supprimer ou mettre a jour de dependance applicative.

## PLATFORM-ADMIN-00

- [ ] Cadrer l'administration plateforme comme futur lointain.
- [ ] La reserver a l'exploitation technique de Rucher360, separee des organisations apicoles.
- [ ] La conditionner a une authentification reelle et a des roles plateforme dedies.
- [ ] Exclure toute exposition aux utilisateurs apiculteurs ordinaires.
- [ ] Ne pas creer de route `/platform-admin`, schema, API, secret, IA ou IoT actif.

## VISITS-SHELL-01

- [x] Remplacer la page shell generique `/visits` par une surface dediee aux visites.
- [x] Cadrer le parcours mobile-first: preparer, observer, intervenir et suivre.
- [x] Afficher les futures informations de visite sans formulaire actif.
- [x] Documenter les limites dans `docs/visits.md`.
- [x] Ne pas creer de schema Prisma, migration, action serveur, API publique, CRUD, analyse IA, prescription sanitaire ou lien obligatoire avec materiel/transhumance.

## VISITS-00

- [x] Cadrer la visite comme observation courte, actions realisees et suites a prevoir.
- [x] Definir les statuts cibles: brouillon, prevue, en cours, terminee, annulee et archivee.
- [x] Cadrer les liens futurs avec taches, sanitaire, materiel et transhumance comme optionnels.
- [x] Documenter les donnees sensibles et la strategie d'archivage.
- [x] Ne pas creer de schema Prisma, migration, action serveur, formulaire actif, API publique, CRUD, IA ou prescription sanitaire.

## VISITS-01

- [x] Ajouter les enums Prisma de statut visite et categorie d'observation.
- [x] Ajouter les modeles Prisma `Visit` et `VisitObservation`.
- [x] Relier les visites a l'organisation, au rucher, a la ruche, a la colonie et a l'adhesion auteur de maniere optionnelle quand necessaire.
- [x] Ajouter des types TypeScript domaine et helpers purs.
- [x] Ne pas creer d'ecran, formulaire actif, action serveur, API publique, CRUD, analyse IA, prescription sanitaire ou creation automatique de tache.

## VISITS-ACTIONS-01

- [x] Ajouter un contexte d'action visites avec controle module `visits` et permissions `visits.read` / `visits.write`.
- [x] Ajouter les commandes serveur pour lister les visites, creer une visite, changer son statut et ajouter une observation courte.
- [x] Verifier les rattachements optionnels a l'organisation active: rucher, ruche et colonie.
- [x] Ne pas creer de formulaire actif, API publique, lecture dans `/visits`, creation automatique de tache, IA ou prescription sanitaire.

## VISITS-FORMS-SHELL-01

- [x] Brancher `/visits` en lecture Prisma via la session de developpement.
- [x] Ajouter des formulaires serveur de developpement pour creer une visite, ajouter une observation et changer un statut.
- [x] Limiter les choix aux ruchers, ruches et colonies fictifs du seed local.
- [x] Ne pas ajouter d'authentification reelle, API publique, creation automatique de tache, analyse IA ou prescription sanitaire.

## TASKS-01

- [x] Ajouter les enums Prisma de statut et priorite de tache.
- [x] Ajouter le modele Prisma `Task`.
- [x] Relier les taches a l'organisation, au rucher, a la ruche, a la colonie, a la visite et aux adhesions createur/assignee de maniere optionnelle quand necessaire.
- [x] Ajouter des types TypeScript domaine et helpers purs.
- [x] Ne pas creer d'ecran, formulaire actif, action serveur, API publique, CRUD, notification, recurrence, analyse IA ou prescription sanitaire.

## TASKS-SHELL-01

- [x] Remplacer la page shell generique `/tasks` par une surface dediee aux taches.
- [x] Afficher les statuts principaux, les priorites et les rattachements optionnels.
- [x] Rappeler les limites avant actions serveur.
- [x] Ne pas lire Prisma, creer de formulaire actif, action serveur, CRUD, notification, recurrence, analyse IA ou prescription sanitaire.

## TASKS-ACTIONS-01

- [x] Ajouter un contexte d'action taches avec controle module `tasks` et permissions `tasks.read` / `tasks.write`.
- [x] Ajouter les commandes serveur pour lister les taches, creer une tache, changer son statut et assigner simplement un membre.
- [x] Verifier les rattachements optionnels a l'organisation active: rucher, ruche, colonie, visite et adhesion assignee.
- [x] Ne pas creer de formulaire actif, API publique, notification, recurrence, calendrier, analyse IA ou prescription sanitaire.

## TASKS-FORMS-SHELL-01

- [x] Brancher `/tasks` en lecture Prisma via la session de developpement.
- [x] Ajouter des formulaires serveur de developpement pour creer une tache, changer un statut et assigner simplement.
- [x] Limiter les choix aux ruchers, ruches, colonies et adhesion fictifs du seed local.
- [x] Ne pas ajouter d'authentification reelle, API publique, notification, recurrence, calendrier, analyse IA ou prescription sanitaire.

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
