# Contexte

## Etat courant

Le dépôt Rucher360 dispose d'un socle Next.js Docker-first, d'un schéma Prisma multi-organisation, d'un seed de développement fictif, de modules RBAC, de shells UI, de premières actions serveur de développement pour matériel et transhumance, et d'une documentation visuelle complémentaire.

## Décisions actées

- Le produit est une application apicole modulaire multi-utilisateurs.
- Le développement doit être containerisé avec Docker Compose.
- La machine hôte ne doit pas être considérée comme équipée de Node.js, pnpm, Prisma ou Playwright.
- Les commandes pnpm passent par le service Docker Compose `app`.
- PostgreSQL est fourni par le service Docker Compose `db`.
- `node_modules` vit dans un volume Docker dédié.
- Le socle applicatif utilise Next.js App Router, TypeScript strict et Tailwind CSS.
- L'interface initiale est volontairement simple et ne contient aucun module métier.
- Le shell applicatif utilise une navigation basse mobile, des repères desktop simples et des cartes statiques.
- Les cartes de cockpit et de modules sont des surfaces de présentation sans formulaire, CRUD, appel API ou logique métier.
- L'itération Stitch de `DESIGN-SHELL-01` enrichit uniquement le rendu visuel: sidebar desktop, topbar décorative, fond à motif discret, cartes plus colorées et badges de statut.
- Les exports Stitch restent des références locales non intégrées au code de production et ne doivent pas être commités.
- Les modules connectés sont prévus mais désactivés: balance, météo, caméra, capteurs, GPS.
- Les modules IA sont prévus mais désactivés: analyse de visite, assistant connaissance, reconnaissance d'espèce, comptage varroa.
- Les fonctions étiquetage, marketplace, paiement, comptabilité complète, IoT actif, IA automatique et prescription sanitaire automatique sont hors périmètre initial.
- `DATA-00` limite le futur premier schéma exécutable au socle organisations, utilisateurs, adhésions, rôles, permissions et modules.
- `DATA-01` crée le schéma Prisma et la migration initiale pour ce socle minimal.
- `DATA-SEED-DEV-01` ajoute un seed local idempotent et fictif pour l'organisation de développement, les modules, permissions, ruchers, ruches, colonies et le matériel.
- `DATA-SEED-DEV-01` ajoute aussi l'adapter PostgreSQL Prisma necessaire au runtime Prisma 7, sans introduire de service externe.
- `AUTH-01` pose les conventions TypeScript comptes, organisations et adhésions sans activer d'authentification réelle.
- `AUTH-SESSION-01` ajoute un contrat TypeScript de session applicative et de scope actif, sans Auth.js, cookie, page de connexion, API d'authentification ou secret.
- `AUTH-DEV-SESSION-01` ajoute une session de développement déterministe et fictive pour brancher les prochains écrans sans secret, cookie, Auth.js ou utilisateur réel.
- `AUTH-REAL-00` cadre l'authentification réelle autour d'une identité OIDC, d'une session serveur, d'organisations personnelles ou rejointes par invitation, sans implementation ni secret.
- `DEPLOY-HOME-00` retient le Synology pour une beta privee a domicile, un VPS europeen pour une ouverture plus large, et reserve le Raspberry Pi au developpement ou a la demonstration. Toute exposition future impose HTTPS, une base non publique et des sauvegardes chiffrees hors hote.
- `CLASSIC-JOURNEY-01` ajoute une route de demonstration qui relie cockpit, contexte rucher, visite, tache et materiel via les ecrans et donnees de developpement deja disponibles, sans nouvelle mutation ni authentification reelle.
- `CLASSIC-JOURNEY-UX-01` simplifie ce parcours: la visite devient l'entree principale, la tache est une suite et le materiel reste optionnel; les limites de developpement sont repliees.
- `VISITS-HIVE-FIRST-01` adopte la ruche comme point d'entree de visite: le rucher et la colonie active sont derives cote serveur pour les visites de terrain courantes.
- `TASKS-HIVE-FIRST-01` simplifie les taches terrain: une ruche optionnelle derive le rucher et la colonie active, tandis qu'une tache generale reste sans contexte apicole.
- `AGENT-WORKFLOW-COMMIT-GUARD-01` renforce la regle de flux: un lot doit etre committe, pousse, controle en PR et merge ou arbitre avant de demarrer le lot suivant.
- `PLATFORM-ADMIN-00` reserve l'administration plateforme a l'exploitation technique future, separee de l'administration d'organisation et dependante d'une authentification reelle, de roles plateforme et d'une architecture d'hebergement validee.
- `DEPLOY-PROD-ARCHITECTURE-00` retient une architecture de production Docker-first avec un seul point d'entree HTTPS, PostgreSQL prive, secrets hors Git, sauvegardes chiffrees hors hote et choix tunnel/reverse proxy selon beta Synology ou VPS.
- `BACKUP-RESTORE-00` retient une sauvegarde logique PostgreSQL quotidienne chiffree et conservee hors hote pour la beta privee, avec restauration testee comme condition de validite et evolution future vers PITR si les objectifs RPO/RTO l'exigent.
- `AUTH-PROVIDER-DECISION-01` retient Google OIDC comme fournisseur initial de beta privee, avec clients separes local/beta/production et une identite interne Rucher360 qui reste source de verite pour organisations, adhesions, roles, permissions et modules.
- `APIARY-FORMS-01` ajoute les actions serveur et formulaires de developpement pour creer un rucher et une ruche via le contrat `ApplicationSession`, sans carte, GPS, suppression, partage fin ou authentification reelle.
- `RBAC-01` pose un catalogue statique des rôles, permissions et modules, sans interface de gestion et sans activation IA/IoT.
- `APIARY-01` ajoute les modèles exécutables ruchers, ruches et colonies, sans CRUD ni écran métier.
- `EQUIPMENT-00` cadre le futur module materiel comme inventaire leger hybride, sans code metier, migration, CRUD, achats, fournisseurs, comptabilite, IA ou IoT actif.
- `MODULES-DYNAMIC-00` cadre les modules dynamiques par organisation et adhesion, la conservation des donnees lors d'une desactivation, le partage initial des ruchers par organisation et la transhumance comme mouvement de ruches entre sites.
- `ARCHITECTURE-DOCS-00` ajoute une lecture transversale de l'architecture logique, de la cartographie fonctionnelle par module et de la gouvernance des lots/sprints.
- `SECURITY-DEPENDENCIES-00` prepare le traitement des alertes de securite et dependances avec Dependabot, sans changer les versions applicatives.
- `MODULES-NAVIGATION-01` branche la navigation mobile/desktop et les cartes du cockpit sur la registry de modules, avec un profil de démonstration statique et sans route métier active. Les modules futurs restent dans la registry mais ne sont pas listés directement dans le cockpit.
- `USER-CONTEXT-SHELL-01` ajoute des profils de démonstration statiques pour tester les variations de cockpit selon type d'organisation, rôle, modules et permissions, sans auth, session, API ni persistance.
- `USER-PROFILE-MODULES-01` ajoute une prévisualisation statique du futur choix de modules par adhésion membre: organisation active, visibilité membre et permissions sont affichées sans formulaire fonctionnel, API, session ou persistance.
- `DYNAMIC-STATES-01` ajoute une bibliothèque UI statique d'états réutilisables: vide, chargement, sans permission, module désactivé, fonction à venir et alerte, sans API, session, CRUD ou logique métier active.
- `RESPONSIVE-WORKFLOWS-01` ajoute une prévisualisation statique des parcours mobile-first futurs pour rucher, visite, modules et organisation, sans route active, formulaire, API, session ou persistance.
- `APP-NAVIGATION-ROUTES-01` active les liens de navigation vers des pages shell statiques pour les modules principaux. Ces pages évitent les 404 mais ne contiennent aucun CRUD, formulaire fonctionnel, API, session ou donnée dynamique.
- `ACCESSIBLE-MOTION-01` centralise des micro-transitions sobres pour cartes et navigation, avec respect de `prefers-reduced-motion` et focus visible, sans logique applicative.
- `DESIGN-TOKENS-01` ajoute des classes sémantiques de surfaces, texte secondaire et titres de section pour stabiliser le langage visuel sans changer le comportement applicatif.
- `MODULES-CATALOG-SHELL-01` remplace la page `/modules` générique par un catalogue statique distinguant modules actifs, sans permission, désactivés et à venir, sans activation fonctionnelle.
- `PROFILE-ONBOARDING-SHELL-01` ajoute une route `/onboarding` statique pour préparer le parcours d'accueil d'un apiculteur amateur, sans compte réel, auth, API, session ou persistance.
- `ERROR-PAGES-01` ajoute des pages d'erreur personnalisées pour 404, erreur runtime, 403, 500 et 503, avec une touche d'humour légère et sans logique métier.
- `DESIGN-DYNAMIC-SHELL-01` enrichit le cockpit avec une surface statique de rythme de saison et des signaux visuels de lecture terrain, sans Figma, sans dépendance, sans route active et sans logique métier.
- `SECURITY-CI-01` ajoute un audit des dépendances de production dans la CI via Docker Compose et expose la même validation avec `make audit-prod`.
- `SECURITY-SECRETS-01` ajoute un scan Gitleaks containerisé et pinne l'image par digest pour renforcer la détection de secrets sans installation locale.
- `TODO-CLEANUP-01` reconcilie la todo avec les lots deja termines et remet en avant les prochains lots reels sans changer le code.
- `SECURITY-RUNNER-01` confirme que le runner GitHub local Docker reste manuel, documente les risques du socket Docker et l'aligne avec les contrôles sécurité actuels.
- `APIARY-ACCESS-00` cadre le partage fin par rucher comme module optionnel `apiary_access`, sans remplacer le partage organisationnel par defaut.
- `TRANSHUMANCE-00` cadre la transhumance comme module optionnel de mouvements de ruches entre ruchers, sans deplacer le rucher lui-meme.
- `EQUIPMENT-01` ajoute le module, les permissions, les types domaine et le schema minimal du materiel, sans ecran d'inventaire ni CRUD complet.
- `EQUIPMENT-SHELL-01` ajoute la route `/equipment` et une interface statique d'inventaire materiel mobile-first, sans formulaire ni action métier.
- `EQUIPMENT-CRUD-01` ajoute les commandes serveur minimales du materiel avec contexte organisation/permissions explicite: types, stocks, items, ajustements, statuts, deplacements et evenements legers. L'ecran reste non branche a des formulaires reels tant que l'authentification n'existe pas.
- `EQUIPMENT-ACTION-CONTEXT-01` raccorde les commandes serveur materiel au contrat `ApplicationSession` via un scope actif, sans session navigateur, formulaire public, cookie, JWT ou API d'authentification.
- `EQUIPMENT-FORMS-SHELL-01` ajoute dans `/equipment` une preview de formulaires materiel basee sur la session de developpement, avec champs et actions desactives et aucune ecriture en base.
- `HIVE-MOVEMENTS-01` ajoute le module `transhumance`, ses permissions, les modeles executables de mouvements de ruches et des helpers purs d'emplacement courant, sans ecran, CRUD, GPS, IA ou IoT actif.
- `EQUIPMENT-LIVE-INVENTORY-01` branche `/equipment` en lecture seule sur le seed de developpement via Prisma et la session de developpement, sans mutation ni formulaire actif.
- `EQUIPMENT-FORMS-ACTIVE-01` active des formulaires serveur de developpement pour creer des types, stocks et items materiel via la session de developpement, sans API publique ni authentification reelle.
- `TRANSHUMANCE-SHELL-01` ajoute la route `/transhumance` et un shell statique pour lire le workflow de mouvements de ruches, sans CRUD, GPS actif, API ou logistique lourde.
- `ADMIN-BACKLOG-01` prepare le backlog d'un centre d'administration d'organisation, distinct d'un futur back-office plateforme et sans implementation.
- `TRANSHUMANCE-ACTIONS-01` ajoute les actions serveur minimales de transhumance: lecture, creation, ajout de ruches et changement de statut. La finalisation d'un mouvement met a jour l'emplacement courant des ruches sans effacer l'historique.
- `TRANSHUMANCE-FORMS-SHELL-01` branche `/transhumance` sur la lecture Prisma et ajoute des formulaires serveur de developpement bases sur les donnees fictives du seed, sans API publique ni authentification reelle.
- `ARCHIFY-DOCS-00` cadre Archify comme documentation visuelle complementaire: prompts sources versionnes, exports SVG futurs et aucune dependance applicative.
- `ARCHIFY-DIAGRAMS-01` ajoute les premiers SVG de documentation visuelle: architecture logique, architecture technique, workflow agentique, flux de donnees sensibles et cycle transhumance.
- `DOCS-ARCHITECTURE-SYNC-01` realigne README, architecture, cartographie des modules, modele de donnees, todo, contexte et journal apres les lots data, materiel, transhumance et Archify.
- `UX-RULES-SKILLS-01` formalise le référentiel ergonomique et les skills `AUDIT_INTERFACE`, `RESPONSIVE_ADAPTATION` et `ACCESSIBILITY_CHECK` avant les lots UX applicatifs.
- `VISUAL-ASSETS-01` ajoute des visuels apicoles generes comme habillage statique du shell et documente que la densite des pages doit etre traitee par des lots UX dedies, sans melanger assets, navigation et logique metier.
- `ADMIN-00` cadre le futur centre d'administration d'organisation: membres, roles, modules, volumes de donnees, securite, archivage et journal d'activite metier, sans implementation.
- `AUDIT-LOG-00` cadre le futur journal d'activite metier, distinct des audits techniques et des scans de securite.
- `AUDIT-LOG-01` ajoute le modele executable minimal du journal d'activite metier avec `ActivityLogEntry`, importance, cible referencee et metadata minimale non sensible. Aucun ecran, route, emission automatique d'evenements ou export n'est ajoute.
- `AUDIT-LOG-SHELL-01` ajoute `/admin/journal` comme shell statique de consultation future, sans lecture Prisma, pagination, export ou emission automatique d'evenements.
- `TOOLING-DEPENDENCIES-01` met a jour le gestionnaire pnpm declare vers `11.9.0` et rend explicite la regle d'un commit distinct apres chaque lot, sans changer les dependances applicatives.
- `ADMIN-SHELL-01` ajoute la route shell `/admin` et une entree de catalogue/desktop pour l'administration d'organisation, sans CRUD, API, auth reelle ou action active.
- `VISITS-SHELL-01` remplace `/visits` par un shell mobile-first dedie aux visites: preparer, observer, intervenir et suivre, sans schema Prisma, formulaire actif, CRUD, IA ou prescription sanitaire.
- `VISITS-00` cadre le futur modele visite: observation courte, actions realisees, suites a prevoir, statuts simples et liens optionnels avec taches, sanitaire, materiel et transhumance.
- `DATA-LIFECYCLE-00` cadre l'archivage, la conservation, la restauration et la suppression controlee. L'archivage et les statuts metier priment sur la suppression dure, surtout pour localisation, sanitaire, contacts, documents et historique.
- `ADMIN-DATA-OVERVIEW-01` branche `/admin` sur des compteurs par organisation en lecture seule: membres, modules, ruchers, ruches, colonies, materiel et transhumance. Aucun export, suppression, correction automatique, API publique, IA ou IoT actif n'est ajoute.
- `VISITS-01` ajoute le modele executable minimal des visites avec `Visit`, `VisitObservation`, statuts et categories d'observation, sans CRUD, action serveur, formulaire actif, IA ou prescription sanitaire.
- `VISITS-ACTIONS-01` ajoute les actions serveur minimales des visites: lecture, creation de visite, changement de statut et ajout d'observation courte. Aucun formulaire actif, API publique, IA, prescription sanitaire ou creation automatique de tache n'est ajoute.
- `VISITS-FORMS-SHELL-01` branche `/visits` en lecture sur Prisma via la session de developpement et ajoute des formulaires serveur de developpement pour creer une visite, ajouter une observation et changer un statut, sans auth reelle, API publique, IA ou prescription sanitaire.
- `TASKS-01` ajoute le modele executable minimal des taches avec statut, priorite, echeance et liens optionnels vers rucher, ruche, colonie, visite et adhesions, sans ecran, CRUD, notification ou automatisation.
- `TASKS-SHELL-01` remplace `/tasks` par un shell mobile-first statique pour visualiser statuts, priorites et rattachements optionnels, sans lecture Prisma, formulaire actif, action serveur, notification ou recurrence.
- `TASKS-ACTIONS-01` ajoute les actions serveur minimales des taches: lecture, creation, changement de statut et assignation simple, sans formulaire actif, notification, recurrence, calendrier, IA ou prescription sanitaire.
- `TASKS-FORMS-SHELL-01` branche `/tasks` en lecture sur Prisma via la session de developpement et ajoute des formulaires serveur de developpement pour creer une tache, changer un statut et assigner simplement, sans auth reelle, API publique, notification, recurrence ou calendrier.
- `DEV-SERVER-01` force le serveur de developpement Docker sur `next dev --webpack` apres un panic Turbopack local sur `globals.css`; le build production reste valide via `next build`.
- `UX-DENSITY-01` allege le cockpit en remontant les modules visibles et en repliant les contenus de demonstration longs, sans supprimer d'information ni ajouter de logique metier.
- `UX-MODULE-PAGES-01` harmonise les pages module generiques avec un gabarit plus court et progressif: statut, resume, trois reperes et references UX repliees.
- `UX-COPY-01` raccourcit les textes visibles des pages specialisees et garde les explications longues dans la documentation.
- `VISITS-UX-FLOW-01` oriente `/visits` vers la preparation terrain avec une prochaine sortie lisible, un rythme court et les details de conception repliees.
- `TASKS-UX-FLOW-01` oriente `/tasks` vers le triage terrain avec une tache prioritaire, trois gestes simples et les details de conception replies.
- `EQUIPMENT-UX-FLOW-01` oriente `/equipment` vers la preparation de caisse terrain et les points de maintenance, sans achats, prix ou stock avance.
- L'administration cible d'abord l'organisation: membres, roles, modules, volumes de donnees, securite, archivage et journal d'activite metier.
- L'archivage, les statuts et la conservation controlee priment sur la suppression dure des donnees metier.
- Les visites, tâches, sanitaire, récoltes, documents, IA et IoT restent conceptuels jusqu'aux lots dédiés.
- Le runner GitHub local Docker est préparé comme outil DevSecOps manuel, sans secret versionné et sans déclenchement automatique sur PR publique.

## Points ouverts

- Choix de la bibliotheque OIDC concrete pour `AUTH-SESSION-WEB-01`.
- Validation operationnelle du point d'entree beta privee: tunnel sortant ou reverse proxy selon les contraintes reseau reelles.
- Choix d'une surface future d'administration plateforme, apres authentification reelle et roles plateforme.
- Choix du stockage documentaire.
- Niveau de détail de la localisation des ruchers.
- Politique de conservation des données sanitaires.
- Traduction executable future de la strategie d'archivage dans les modeles et interfaces dedies.
- Lecture Prisma, filtres fonctionnels et pagination du journal d'activite metier dans un futur lot dedie.
- Branchement futur des formulaires materiel sur une session authentifiee.
- Moment opportun pour introduire un partage fin par rucher.
- Branchement futur des formulaires transhumance sur une session authentifiee.
- Revue periodique des diagrammes Archify pour eviter la derive avec le code et les modules actifs.
- Futur branchement lecture ou formulaires visites apres validation du modele `VISITS-01`.

## Commandes utiles actuelles

```bash
git status --short --branch
git diff --check
docker compose config
docker compose build app
docker compose up -d app
make runner-config
make security-scan
make secrets-scan
make audit-prod
make seed-dev
```

Commandes applicatives:

```bash
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```
