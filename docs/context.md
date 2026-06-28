# Contexte

## Etat courant

Le dépôt Rucher360 est initialisé sur GitHub et préparé pour un développement agentique. Le lot `DATA-01` initialise Prisma sur un schéma minimal non métier.

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
- `AUTH-01` pose les conventions TypeScript comptes, organisations et adhésions sans activer d'authentification réelle.
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
- Les visites, tâches, sanitaire, récoltes, documents, IA et IoT restent conceptuels jusqu'aux lots dédiés.
- Le runner GitHub local Docker est préparé comme outil DevSecOps manuel, sans secret versionné et sans déclenchement automatique sur PR publique.

## Points ouverts

- Choix du système d'authentification.
- Choix du stockage documentaire.
- Niveau de détail de la localisation des ruchers.
- Politique de conservation des données sanitaires.
- Stratégie d'archivage des entités métier.
- Niveau exact de personnalisation du futur catalogue materiel par organisation.
- Moment opportun pour introduire un partage fin par rucher.
- Niveau de detail du futur historique de transhumance.

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
```

Commandes applicatives:

```bash
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```
