# Journal

## 2026-07-03 - TASKS-SHELL-01

- Remplacement de la page shell generique `/tasks` par une surface mobile-first dediee aux taches.
- Le shell presente les statuts, priorites, rattachements optionnels et limites avant actions serveur.
- Aucune lecture Prisma, aucun formulaire actif, aucune action serveur, aucun CRUD, aucune notification, aucune recurrence, aucune analyse IA et aucune prescription sanitaire n'ont ete ajoutes.

## 2026-07-03 - TASKS-01

- Ajout du modele executable minimal des taches avec `Task`, statuts et priorites.
- Les liens vers rucher, ruche, colonie, visite, createur et assignee restent optionnels.
- Ajout de types TypeScript domaine et de helpers purs pour les statuts.
- Aucun ecran, formulaire actif, action serveur, API publique, CRUD, notification, recurrence, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-03 - VISITS-01

- Ajout du modele executable minimal des visites avec `Visit` et `VisitObservation`.
- Ajout des statuts de visite et categories d'observation simples.
- Ajout de types TypeScript domaine et de helpers purs pour les statuts.
- Aucun ecran, formulaire actif, action serveur, API publique, CRUD, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-02 - VISITS-00

- Cadrage documentaire du futur modele visites.
- Decision: une visite doit rester une observation courte avec actions realisees et suites a prevoir, sans formulaire lourd.
- Definition des statuts cibles, categories d'observations, permissions et liens optionnels avec taches, sanitaire, materiel et transhumance.
- Aucun schema Prisma, aucune migration, aucune action serveur, aucun formulaire actif, aucune API publique, aucune analyse IA et aucune prescription sanitaire n'ont ete ajoutes.

## 2026-07-02 - VISITS-SHELL-01

- Remplacement de la page shell generique `/visits` par une surface mobile-first dediee au parcours de visite.
- Le shell presente les etapes preparer, observer, intervenir et suivre, ainsi que les futures informations a garder courtes sur mobile.
- Ajout de `docs/visits.md` pour cadrer le futur module visites et ses limites.
- Aucun schema Prisma, aucune migration, aucune action serveur, aucun formulaire actif, aucune API publique, aucune analyse IA et aucune prescription sanitaire n'ont ete ajoutes.

## 2026-07-02 - DATA-LIFECYCLE-00

- Cadrage documentaire du cycle de vie des donnees: archivage, conservation, restauration et suppression controlee.
- Decision confirmee: privilegier statuts metier et `archivedAt` avant toute suppression dure.
- Identification des donnees sensibles: localisation, sanitaire, documents, contacts, photos/videos futures, capteurs futurs et journal d'activite metier.
- Aucun schema Prisma, aucune migration, aucun job, aucune API, aucune interface, aucun export, aucune suppression effective, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-02 - ADMIN-DATA-OVERVIEW-01

- Ajout d'une lecture des volumes de donnees par organisation dans `/admin`.
- Les compteurs couvrent membres, modules, ruchers, ruches, colonies, materiel et transhumance.
- Les modules desactives sont signales sans suppression de donnees.
- La vue reste strictement en lecture seule: aucun export, aucune suppression, aucune correction automatique, aucune API publique, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-02 - ADMIN-SHELL-01

- Ajout de la route shell `/admin` pour preparer le centre d'administration d'organisation.
- Ajout d'une surface statique avec cartes Organisation, Membres, Modules, Donnees, Securite et Journal.
- Ajout d'une entree desktop conditionnee aux permissions admin existantes et d'un lien catalogue, sans ajout dans la bottom nav mobile.
- Aucun CRUD, API, persistance, authentification reelle, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-02 - AUDIT-LOG-00

- Cadrage documentaire du futur journal d'activite metier.
- Distinction explicite entre journal metier, audits techniques, scans de secrets, CI, logs Docker et historique Git.
- Definition des actions candidates, donnees minimales, donnees a ne jamais journaliser, niveaux d'importance et surfaces futures.
- Aucun schema Prisma, route, API, UI, export, moteur de recherche, authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-02 - ADMIN-00

- Cadrage documentaire du futur centre d'administration d'organisation.
- Decision: l'administration complete les modules `organizations`, `users_roles` et `modules` sans les dupliquer.
- Clarification des futures surfaces: organisation, membres, roles, modules, donnees, securite, journal et archivage.
- Confirmation que l'administration plateforme reste un futur lointain dependant d'une authentification reelle.
- Aucun code applicatif, route, Prisma, Docker, dependance, authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-02 - DOCS-ARCHITECTURE-SYNC-01

- Synchronisation documentaire apres les lots data, materiel, transhumance et Archify.
- Mise a jour du README pour refleter Prisma, les modeles executables et les formulaires de developpement.
- Alignement de l'architecture technique, de l'architecture logique, de la cartographie des modules et du modele de donnees avec l'etat courant.
- Aucun code applicatif, Docker, Prisma, dependance, authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-02 - ARCHIFY-DIAGRAMS-01

- Ajout des premiers SVG stables de documentation visuelle dans `docs/diagrams/svg/`.
- Diagrammes couverts: architecture logique, architecture technique Docker-first, workflow agentique, flux de donnees sensibles et cycle de vie transhumance.
- Les exports sont relies depuis les documents Markdown concernes et restent complementaires a la documentation textuelle.
- Aucun export HTML, PNG temporaire, code applicatif, Docker, Prisma, dependance, authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-02 - ARCHIFY-DOCS-00

- Cadrage d'Archify comme documentation visuelle complementaire, sans dependance applicative.
- Ajout de `docs/diagrams/README.md` pour definir workflow, confidentialite, exports et criteres de qualite.
- Ajout de prompts sources pour architecture logique, architecture technique, workflow agentique, flux de donnees sensibles et cycle de vie transhumance.
- Decision: versionner les prompts et futurs SVG stables, mais garder les HTML generes hors commit par defaut.
- Aucun code applicatif, Docker, Prisma, dependance, authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-01 - TRANSHUMANCE-FORMS-SHELL-01

- Branchement de `/transhumance` en lecture sur les mouvements Prisma via la session de developpement.
- Ajout de formulaires serveur de developpement pour creer un mouvement, ajouter des ruches et changer le statut.
- Les formulaires utilisent uniquement les ruchers et ruches fictifs du seed local.
- La finalisation d'un mouvement passe par les actions serveur existantes et met a jour l'emplacement courant des ruches.
- Aucun formulaire public, API externe, authentification reelle, GPS actif, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-01 - TRANSHUMANCE-ACTIONS-01

- Ajout d'un contexte d'action transhumance avec controle module `transhumance` et permissions `transhumance.read`, `transhumance.write` et `transhumance.manage`.
- Ajout de validations serveur pour statut, motif, dates, textes optionnels et liste de ruches.
- Ajout des commandes serveur pour lister les mouvements, creer un mouvement, ajouter des ruches et changer le statut.
- Quand un mouvement passe a `COMPLETED`, l'emplacement courant des ruches concernees est mis a jour vers le rucher destination sans supprimer l'historique.
- Aucun formulaire public, API externe, authentification reelle, GPS actif, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-01 - ADMIN-BACKLOG-01

- Preparation documentaire du backlog d'administration sans implementation applicative.
- Decision: commencer par un centre d'administration d'organisation, pas par un back-office plateforme global.
- Clarification de la non-redondance: `MODULE-ADMIN-01` reste limite a l'administration des modules d'une organisation.
- Distinction entre l'audit securite/dependances existant et le futur journal d'activite metier.
- Aucun code applicatif, Prisma, Docker, dependance, authentification, IA active ou IoT actif n'a ete modifie.

## 2026-07-01 - TRANSHUMANCE-SHELL-01

- Ajout de la route `/transhumance` avec un shell mobile-first pour visualiser les mouvements de ruches entre ruchers.
- Activation de la transhumance dans la registry pour la navigation desktop et le catalogue, sans ajout dans la bottom nav mobile.
- Le shell reutilise les helpers purs d'emplacement courant sur des donnees fictives et rappelle que le rucher reste un site fixe.
- Aucun CRUD, formulaire actif, API, GPS actif, authentification reelle, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-01 - EQUIPMENT-FORMS-ACTIVE-01

- Activation de formulaires serveur de developpement dans `/equipment` pour creer un type, un stock et un item materiel.
- Les formulaires reutilisent la session de developpement, les permissions `equipment.write`/`equipment.manage` et les commandes serveur existantes.
- La page `/equipment` est revalidee apres mutation pour afficher l'inventaire mis a jour.
- Aucun achat, fournisseur, prix, suppression, API publique, authentification reelle, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-07-01 - EQUIPMENT-LIVE-INVENTORY-01

- Branchement de `/equipment` en lecture seule sur l'inventaire Prisma via la session de developpement.
- L'ecran affiche les stocks, items, statuts et groupes issus du seed local quand PostgreSQL est pret.
- Un fallback visuel reste disponible si la base locale n'est pas encore seedee.
- Aucun formulaire actif, API publique, authentification reelle, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-06-29 - DATA-SEED-DEV-01

- Ajout d'un seed de développement idempotent dans `prisma/seed-dev.mjs`.
- Le seed initialise des données fictives: organisation, utilisateur technique, adhésion, modules, permissions, ruchers, ruches, colonies et matériel.
- Ajout du script `pnpm seed:dev` et du raccourci Docker-first `make seed-dev`.
- Les identifiants sont alignés avec la session de développement et ne contiennent aucun secret, token, dump ou donnée personnelle réelle.

## 2026-06-29 - EQUIPMENT-FORMS-SHELL-01

- Ajout d'une preview de formulaires materiel dans `/equipment`.
- Les formulaires affichent les futurs branchements type, stock et item individuel.
- La preview lit les permissions de la session de developpement, mais les champs et actions restent desactives.
- Aucune mutation, ecriture en base, API, session navigateur, Auth.js, cookie, JWT, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-06-29 - AUTH-DEV-SESSION-01

- Ajout d'une session de développement déterministe dans `src/features/auth/dev-session.ts`.
- La fixture utilise des identifiants fictifs et l'identifiant réservé `dev-user.example.invalid`.
- Les modules et permissions nécessaires au cockpit et au matériel sont activés pour les prochains lots UI.
- Aucun secret, token, mot de passe, cookie, Auth.js, page de connexion, API d'authentification ou utilisateur réel n'a ete ajoute.

## 2026-06-29 - EQUIPMENT-ACTION-CONTEXT-01

- Ajout d'un pont entre `ApplicationSession` et `EquipmentActionContext`.
- Ajout de wrappers serveur materiel acceptant une session applicative typée et reutilisant les commandes existantes.
- Les actions restent bloquees sans organisation active et conservent les controles module `equipment` + permissions.
- Aucun Auth.js, cookie, JWT, page de connexion, formulaire CRUD public, API d'authentification, secret, IA active ou IoT actif n'a ete ajoute.

## 2026-06-29 - AUTH-SESSION-01

- Ajout d'un contrat TypeScript de session applicative dans `src/features/auth/session.ts`.
- Ajout de helpers purs pour calculer l'organisation active, le scope actif, les modules effectifs et les permissions effectives.
- Le scope de session expose `userId`, `organizationId`, `membershipId`, modules et permissions pour les futurs services métier.
- Aucun Auth.js, cookie, JWT, page de connexion, API d'authentification, secret ou stockage de mot de passe n'a ete ajoute.

## 2026-06-29 - EQUIPMENT-CRUD-01

- Ajout de commandes serveur minimales pour le module materiel: lecture d'inventaire, creation de types, creation et ajustement de stocks, creation d'items, changement de statut et deplacement simple.
- Ajout d'un controle d'acces explicite par contexte d'organisation, module `equipment` active et permissions `equipment.read`, `equipment.write` ou `equipment.manage`.
- Chaque creation ou modification operationnelle du materiel cree un evenement leger `EquipmentEvent`.
- L'ecran `/equipment` reste une preview non branchee a des formulaires reels tant que l'authentification et la session utilisateur ne sont pas disponibles.
- Aucun achat, fournisseur, prix, comptabilite, suppression dure, authentification, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - HIVE-MOVEMENTS-01

- Ajout du module `transhumance` au catalogue RBAC avec les permissions `transhumance.read`, `transhumance.write` et `transhumance.manage`.
- Ajout du schema Prisma minimal `HiveMovement` et `HiveMovementItem` pour historiser les mouvements de ruches entre ruchers.
- Ajout de types et helpers purs dans `src/features/hive-movements` pour deduire un emplacement courant depuis les mouvements termines.
- Le rucher reste un site fixe; seules les ruches sont mobiles.
- Aucun ecran, formulaire, CRUD, action serveur, API, GPS actif, authentification, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - EQUIPMENT-SHELL-01

- Ajout de la route `/equipment` avec une interface statique d'inventaire materiel mobile-first.
- Affichage de cartes de synthese, filtres visuels, categories, emplacements indicatifs et points de maintenance.
- Activation du module materiel dans la registry pour le catalogue et la navigation desktop, sans bottom nav mobile.
- Aucun formulaire, CRUD, action serveur, API, persistance, authentification, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - EQUIPMENT-01

- Ajout du module `equipment` au catalogue RBAC avec les permissions `equipment.read`, `equipment.write` et `equipment.manage`.
- Ajout du schema Prisma minimal: `EquipmentType`, `EquipmentStock`, `EquipmentItem` et `EquipmentEvent`.
- Ajout de types domaine purs dans `src/features/equipment`.
- Le materiel reste rattache a une organisation, avec un lien optionnel vers un rucher et aucun lien obligatoire vers ruche ou colonie.
- Aucun ecran, formulaire, CRUD, action serveur, authentification, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - TRANSHUMANCE-00

- Ajout d'un cadrage dedie `docs/transhumance.md` pour le futur module optionnel `transhumance`.
- Confirmation que la transhumance deplace des ruches ou lots de ruches entre ruchers, sans deplacer le rucher comme site.
- Cadrage des statuts, motifs, modeles conceptuels `HiveMovement` et `HiveMovementItem`, UX cible et limites.
- Aucun schema Prisma, route, ecran, CRUD, authentification, GPS actif, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - APIARY-ACCESS-00

- Ajout d'un cadrage dedie `docs/apiary-access.md` pour le futur module optionnel `apiary_access`.
- Confirmation que le partage par organisation, roles et permissions reste le comportement par defaut.
- Cadrage des cas d'usage, permissions futures, modele conceptuel, UX cible et risques a eviter.
- Aucun schema Prisma, route, ecran, CRUD, authentification, IA active ou IoT actif n'a ete ajoute.

## 2026-06-28 - SECURITY-RUNNER-01

- Confirmation que le runner GitHub local Docker reste manuel via `workflow_dispatch`.
- Alignement du workflow local sur les contrôles actuels: confidentialité, Gitleaks, audit production, lint et build.
- Documentation renforcée sur le socket Docker, la rotation du jeton d'enregistrement, l'arrêt du runner et l'interdiction des PR publiques non relues.
- Aucun secret, dépendance, code métier, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-28 - TODO-CLEANUP-01

- Nettoyage du bloc `Point lots en cours` dans `docs/todo.md`.
- Reconciliation des lots conceptuels deja termines avec leurs sections detaillees.
- Remise en avant des prochains lots reels: `SECURITY-RUNNER-01`, `APIARY-ACCESS-00`, `TRANSHUMANCE-00` et `EQUIPMENT-01`.
- Aucun code applicatif, Prisma, Docker runtime, dependance, authentification, IA active ou IoT actif n'a ete modifie.

## 2026-06-28 - SECURITY-SECRETS-01

- Ajout d'une configuration `.gitleaks.toml` pour scanner les fichiers utiles du dépôt en excluant les artefacts générés et caches locaux.
- Ajout de `make secrets-scan`, exécuté via Docker avec une image Gitleaks pinnee par digest.
- Ajout du scan Gitleaks dans la CI après le contrôle de confidentialité maison.
- Le scan local ne détecte aucun secret sur l'arbre courant.
- Aucun secret, dépendance npm, fonctionnalité métier, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-28 - SECURITY-CI-01

- Ajout d'une étape CI `pnpm audit --prod` exécutée via Docker Compose après l'installation des dépendances.
- Ajout d'une cible `make audit-prod` pour lancer localement le même contrôle sans utiliser Node.js ou pnpm sur le Mac.
- Mise à jour de la documentation sécurité et de la todo pour intégrer ce contrôle dans la chaîne DevSecOps.
- Aucun secret, dépendance, fonctionnalité métier, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-28 - DESIGN-DYNAMIC-SHELL-01

- Ajout d'un composant `SeasonRhythmPreview` pour donner plus de rythme au cockpit sans Figma ni dépendance.
- Le cockpit présente désormais un tempo statique: observer, prioriser, noter et préparer.
- Ajout de signaux visuels pour cadrer une interface plus vivante, sans bouton fonctionnel ni action métier.
- Aucun formulaire, CRUD, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - ERROR-PAGES-01

- Ajout d'un composant commun `ErrorPageShell` pour les pages d'erreur.
- Activation d'une page 404 personnalisée via `not-found.tsx` et d'une page d'erreur runtime via `error.tsx`.
- Ajout de routes statiques `/errors/403`, `/errors/500` et `/errors/503` pour prévisualiser les principaux états d'erreur.
- Chaque page contient une touche d'humour légère et des liens de retour vers le cockpit et le catalogue modules.
- Aucun CRUD métier, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - PROFILE-ONBOARDING-SHELL-01

- Ajout d'une route `/onboarding` pour préparer le parcours d'accueil d'un apiculteur amateur.
- Le parcours présente un espace personnel simulé, les modules essentiels et une évolution progressive.
- Le raccourci profil de la topbar pointe vers cette surface de préparation.
- Aucun compte réel, authentification, API, session, persistance, CRUD métier, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - MODULES-CATALOG-SHELL-01

- Remplacement de la page `/modules` générique par un catalogue statique alimenté par la registry.
- Les modules sont distingués entre actifs, sans permission, désactivés et à venir.
- Le catalogue clarifie les options sans créer d'activation fonctionnelle, d'API, de session ou de persistance.
- Aucun CRUD métier, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - DESIGN-TOKENS-01

- Ajout de classes sémantiques `surface-panel`, `surface-muted`, `surface-soft`, `text-field-muted` et `section-kicker`.
- Application des tokens à quelques surfaces structurantes pour préparer une cohérence UI plus durable.
- Le lot reste visuel: aucun comportement, route, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - ACCESSIBLE-MOTION-01

- Ajout de classes CSS réutilisables pour micro-transitions de cartes et navigation.
- Ajout d'un focus visible cohérent sur les liens principaux.
- Conservation et extension du respect de `prefers-reduced-motion` pour éviter les déplacements au survol.
- Aucun comportement métier, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-27 - APP-NAVIGATION-ROUTES-01

- Activation des liens de navigation vers les routes prévues par la registry.
- Ajout de pages shell statiques pour ruchers, ruches, colonies, visites, tâches, sanitaire, varroa, frelon, connaissance, contacts, documents, récoltes, organisation, membres et modules.
- Les pages shell évitent les 404 et affichent clairement leur statut de préparation.
- Aucun formulaire fonctionnel, CRUD métier, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-26 - RESPONSIVE-WORKFLOWS-01

- Ajout d'une prévisualisation statique des parcours mobile-first futurs pour rucher, visite, modules et organisation.
- Les étapes affichées cadrent les futurs écrans sans créer de route, navigation réelle, formulaire fonctionnel ou action métier.
- Confirmation que la bottom nav doit rester centrée sur les usages terrain, tandis que modules, réglages et options restent secondaires.
- Aucun CRUD métier, API, session, persistance, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-26 - DYNAMIC-STATES-01

- Ajout d'un composant `StatePanel` pour standardiser les états d'interface futurs.
- Ajout d'une galerie statique dans le cockpit couvrant: vide, chargement, sans permission, module désactivé, fonction à venir et alerte.
- Les états préparent les futurs écrans sans créer d'action fonctionnelle, route, API, session ou persistance.
- Aucun CRUD métier, authentification, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

## 2026-06-26 - USER-PROFILE-MODULES-01

- Ajout d'une prévisualisation statique des modules visibles pour un profil membre.
- Le panneau distingue module actif dans l'organisation, visibilité par adhésion et permissions disponibles.
- Les modules masqués sont présentés comme non visibles sans suppression de données.
- Les modules IA, IoT et connectés restent hors du choix membre tant qu'ils ne sont pas activés par un lot dédié.
- Aucun formulaire fonctionnel, session, API, persistance, CRUD métier, authentification ou Prisma supplémentaire n'a été ajouté.

## 2026-06-26 - USER-CONTEXT-SHELL-01

- Ajout de profils de démonstration statiques pour apiculteur amateur, association, exploitation professionnelle, lecture seule et intervenant sanitaire.
- Le cockpit utilise un profil actif de démonstration et varie ses modules, priorités, badges et cartes selon des modules et permissions simulés.
- Ajout d'une comparaison statique des profils pour vérifier les différences de navigation sans créer de sélecteur fonctionnel.
- Aucune authentification, session, API, persistance, route métier, CRUD, IA active ou IoT actif n'a été ajouté.

## 2026-06-26 - MODULES-NAVIGATION-01

- Branchement de la navigation mobile et desktop sur la registry TypeScript des modules.
- Ajout d'une couche de présentation statique pour projeter les modules en items de navigation, cartes de cockpit et cartes de modules.
- Le cockpit utilise désormais un profil de démonstration local avec modules et permissions simulés.
- Correction du helper `canDisplayModuleEntry` pour autoriser les modules actifs qui ne demandent aucune permission explicite.
- Les modules IA, IoT et connectés restent disponibles dans la registry mais ne sont pas affichés directement dans le cockpit pour préserver une navigation légère.
- Les liens restent des ancres internes et les routes indiquées restent des routes prévues: aucun écran métier, CRUD, auth, Prisma supplémentaire, IA active ou IoT actif n'a été ajouté.

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
