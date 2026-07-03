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
- `ADMIN-00` cadre le futur centre d'administration d'organisation: membres, roles, modules, volumes de donnees, securite, archivage et journal d'activite metier, sans implementation.
- `AUDIT-LOG-00` cadre le futur journal d'activite metier, distinct des audits techniques et des scans de securite.
- `ADMIN-SHELL-01` ajoute la route shell `/admin` et une entree de catalogue/desktop pour l'administration d'organisation, sans CRUD, API, auth reelle ou action active.
- `VISITS-SHELL-01` remplace `/visits` par un shell mobile-first dedie aux visites: preparer, observer, intervenir et suivre, sans schema Prisma, formulaire actif, CRUD, IA ou prescription sanitaire.
- `DATA-LIFECYCLE-00` cadre l'archivage, la conservation, la restauration et la suppression controlee. L'archivage et les statuts metier priment sur la suppression dure, surtout pour localisation, sanitaire, contacts, documents et historique.
- `ADMIN-DATA-OVERVIEW-01` branche `/admin` sur des compteurs par organisation en lecture seule: membres, modules, ruchers, ruches, colonies, materiel et transhumance. Aucun export, suppression, correction automatique, API publique, IA ou IoT actif n'est ajoute.
- L'administration cible d'abord l'organisation: membres, roles, modules, volumes de donnees, securite, archivage et journal d'activite metier.
- L'archivage, les statuts et la conservation controlee priment sur la suppression dure des donnees metier.
- Les visites, tâches, sanitaire, récoltes, documents, IA et IoT restent conceptuels jusqu'aux lots dédiés.
- Le runner GitHub local Docker est préparé comme outil DevSecOps manuel, sans secret versionné et sans déclenchement automatique sur PR publique.

## Points ouverts

- Choix du système d'authentification.
- Choix du stockage documentaire.
- Niveau de détail de la localisation des ruchers.
- Politique de conservation des données sanitaires.
- Traduction executable future de la strategie d'archivage dans les modeles et interfaces dedies.
- Modele executable futur du journal d'activite metier dans `AUDIT-LOG-01`.
- Branchement futur des formulaires materiel sur une session authentifiee.
- Moment opportun pour introduire un partage fin par rucher.
- Branchement futur des formulaires transhumance sur une session authentifiee.
- Revue periodique des diagrammes Archify pour eviter la derive avec le code et les modules actifs.
- Cadrage du modele executable des visites dans `VISITS-00` ou `VISITS-01` avant toute saisie reelle.

## Commandes utiles actuelles

```bash
git status --short --branch
git diff --check
docker compose config
docker compose build app
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
