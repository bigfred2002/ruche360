# Journal

## 2026-07-12 - TASK-FOLLOWUP-FROM-VISIT-01

- Ajout d'un formulaire explicite de creation de tache de suivi depuis la fiche visite.
- La tache reprend le contexte visite et ruche quand ils existent, mais reste une action volontaire de l'utilisateur.
- Aucun automatisme de creation, notification, calendrier, prescription sanitaire, schema Prisma, migration, dependance, auth reelle, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-12 - VISIT-QUICK-ENTRY-01

- Simplification du formulaire de creation de visite autour de la ruche, de l'objectif, de l'observation courte et de la suite a prevoir.
- Les champs statut, date, meteo et force colonie passent en details optionnels replies.
- Les formulaires observation et statut restent disponibles comme actions secondaires de developpement.
- Aucun schema Prisma, migration, dependance, authentification reelle, API publique, IA active, IoT actif ou prescription sanitaire n'a ete ajoute.

## 2026-07-12 - FIELD-ACTION-SHORTCUTS-01

- Ajout d'une zone d'acces rapides dans le cockpit vers ruchers/ruches, visites, taches et materiel.
- Les raccourcis sont de simples liens vers les routes existantes, avec cibles tactiles confortables et libelles explicites.
- Aucun formulaire nouveau, mutation, schema Prisma, migration, dependance, authentification reelle, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-12 - FIELD-DASHBOARD-FOCUS-01

- Recentrage de `/` sur un cockpit terrain court: ruches actives, visites ouvertes, taches ouvertes et materiel a nettoyer.
- Branchement en lecture sur les actions serveur existantes et la session de developpement, sans mutation supplementaire.
- Les modules secondaires, workflows de conception et modules futurs restent accessibles mais ne dominent plus le premier ecran.
- Aucun schema Prisma, migration, dependance, authentification reelle, API publique, IA active, IoT actif, GPS actif ou module metier nouveau n'a ete ajoute.

## 2026-07-12 - TASK-DETAIL-SHELL-01

- Ajout d'une lecture de detail tache via le contrat `ApplicationSession`.
- Ajout de la route `/tasks/[taskId]` pour consulter titre, description, statut, priorite, echeance, assignation et contexte en lecture seule.
- La liste `/tasks` pointe maintenant vers la fiche de chaque tache.
- Aucun formulaire supplementaire, notification, recurrence, calendrier, schema Prisma, migration, dependance, authentification reelle, API publique, IA active, IoT actif ou prescription sanitaire n'a ete ajoute.

## 2026-07-12 - VISIT-DETAIL-SHELL-01

- Ajout d'une lecture de detail visite via le contrat `ApplicationSession`.
- Ajout de la route `/visits/[visitId]` pour consulter objectif, statut, date, contexte, observations et suites en lecture seule.
- La liste `/visits` pointe maintenant vers la fiche de chaque visite.
- Aucun formulaire supplementaire, edition, creation automatique de tache, schema Prisma, migration, dependance, authentification reelle, API publique, IA active, IoT actif ou prescription sanitaire n'a ete ajoute.

## 2026-07-11 - APIARY-DETAIL-SHELL-01

- Ajout des lectures de detail rucher et ruche via le contrat `ApplicationSession`.
- Ajout des routes `/apiaries/[apiaryId]` et `/hives/[hiveId]` pour consulter le contexte terrain en lecture seule.
- La liste `/apiaries` pointe maintenant vers la fiche rucher, qui pointe elle-même vers les fiches ruches.
- Aucun formulaire supplementaire, edition, suppression, carte, GPS, partage fin, schema Prisma, migration, dependance, authentification reelle, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - CLASSIC-JOURNEY-REAL-01

- Branchement de `/journey` sur les lectures existantes de ruches, visites, taches et materiel via la session de developpement.
- Ajout d'un resume de readiness: ruches actives, visites ouvertes, taches a suivre et materiel disponible ou stocke.
- Le parcours oriente vers `/apiaries` si aucune ruche active n'existe, puis vers `/visits` quand le contexte est pret.
- Aucun formulaire, mutation, schema Prisma, migration, dependance, authentification reelle, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - TASKS-REAL-FLOW-01

- Branchement de `/tasks` sur la liste des ruches actives de l'organisation via les actions ruchers existantes.
- Le formulaire de creation de tache ne contient plus de ruches codees en dur et conserve l'option "Aucune ruche" pour les actions generales.
- Le serveur continue de deriver le rucher et la colonie active lorsqu'une ruche est selectionnee.
- Aucun schema Prisma, migration, dependance, authentification reelle, API publique, notification, calendrier, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - VISITS-REAL-FLOW-01

- Branchement de `/visits` sur la liste des ruches de l'organisation active via les actions ruchers existantes.
- Le formulaire de creation de visite propose maintenant les ruches actives creees ou lues dans `/apiaries`, au lieu d'options codees en dur.
- La creation de visite reste centree sur une ruche active; rucher et colonie active sont toujours derives cote serveur.
- Aucun schema Prisma, migration, dependance, authentification reelle, API publique, prescription sanitaire, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - APIARY-FORMS-01

- Ajout des actions serveur ruchers/ruches basees sur le contrat `ApplicationSession`: lecture, creation de rucher et creation de ruche.
- Branchement de `/apiaries` sur la lecture Prisma et sur des formulaires serveur de developpement pour creer un site apicole et une ruche.
- Conservation d'une UX volontairement simple: pas de coordonnees GPS, pas de carte, pas de partage fin, pas de suppression et pas de creation de colonie dans ce lot.
- Aucun schema Prisma, migration, dependance, authentification reelle, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - AUTH-PROVIDER-DECISION-01

- Decision: Google OIDC est retenu comme fournisseur initial pour la beta privee, avec clients separes local, beta et production.
- Confirmation que Google verifie l'identite uniquement; les organisations, adhesions, roles, permissions et modules restent portes par Rucher360.
- Cadrage du flux Authorization Code avec PKCE, session serveur opaque et scopes initiaux `openid`, `email`, `profile`.
- Aucun fournisseur configure, compte Google Cloud, dependance, route, cookie, secret, migration Prisma, UI de connexion, API publique, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - BACKUP-RESTORE-00

- Cadrage de la strategie de sauvegarde PostgreSQL: dump logique quotidien chiffre, copie hors hote, retention cible et restauration testee.
- Definition d'une checklist de restauration sur base separee et d'objectifs beta initiaux: RPO 24 heures, RTO de quelques heures.
- Clarification de l'evolution future vers sauvegarde physique, archivage WAL et PITR si le volume ou le niveau de service l'exige.
- Aucun script, job, secret, cle, dump, Docker, schema Prisma, route applicative, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - DEPLOY-PROD-ARCHITECTURE-00

- Cadrage de l'architecture de production Docker-first: un seul point d'entree HTTPS public, application isolee, PostgreSQL prive et sauvegardes chiffrees hors hote.
- Decision: tunnel sortant recommande pour une beta privee a domicile si l'ouverture de ports est indesirable; reverse proxy recommande pour VPS et possible sur Synology maitrise.
- Documentation des variables attendues sans valeur reelle et de la separation local, beta et production.
- Aucun deploiement, domaine, certificat, tunnel, Docker, secret, schema Prisma, code applicatif, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - PLATFORM-ADMIN-00

- Cadrage de l'administration plateforme comme sujet futur d'exploitation technique, distinct de l'administration d'organisation `/admin`.
- Clarification des prealables: authentification reelle, roles plateforme, sauvegardes, journaux fiables et architecture d'hebergement validee.
- Exclusion explicite de la lecture libre des donnees metier, du contournement des permissions, des exports globaux et de toute activation IA, IoT, GPS ou camera.
- Aucun code applicatif, route, permission, role, schema Prisma, dependance, Docker, secret, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-11 - AGENT-WORKFLOW-COMMIT-GUARD-01

- Renforcement des consignes agentiques: un lot doit etre committe, pousse, controle en PR et merge ou arbitre avant de demarrer le suivant.
- Ajout explicite de l'interdiction d'empiler plusieurs lots non mergés sur une meme branche ou une chaine de branches, sauf demande explicite.
- Ajout de la resynchronisation obligatoire de `main` apres squash merge avant de creer la branche suivante.
- Aucun code applicatif, dependance, Docker, schema Prisma, secret, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-10 - TASKS-HIVE-FIRST-01

- La creation de tache de developpement demande une ruche optionnelle, sans selection distincte de rucher, colonie ou assignation.
- Lorsqu'une ruche active est choisie, le service derive son rucher et sa colonie active dans la meme organisation.
- Une tache generale reste possible sans ruche, notamment pour le materiel ou la preparation terrain.
- Aucun schema Prisma, dependance, authentification reelle, API publique, IA ou IoT n'a ete ajoute.

## 2026-07-10 - VISITS-HIVE-FIRST-01

- La creation de visite de developpement demande desormais une seule ruche active.
- Le service derive son rucher et sa colonie active dans la meme organisation, tout en conservant les liens separes dans l'historique.
- La selection explicite de colonie est retiree du parcours courant et reservee aux futurs cas avances.
- Aucun schema Prisma, dependance, authentification reelle, API publique, IA ou IoT n'a ete ajoute.

## 2026-07-10 - DEPLOY-HOME-00

- Cadrage documentaire de l'hebergement: developpement Docker local, beta privee sur Synology compatible Container Manager, puis VPS europeen lorsque l'ouverture et la disponibilite l'exigent.
- Definition des prerequis avant exposition: HTTPS, PostgreSQL non public, sauvegardes chiffrees hors hote, restauration testee, supervision et mises a jour.
- Le Raspberry Pi reste adapte au developpement ou a la demonstration; le cloud gratuit est reserve a une demonstration temporaire.
- Aucun deploiement, domaine, tunnel, secret, Docker, schema Prisma, dependance ou code applicatif n'a ete ajoute.

## 2026-07-10 - CLASSIC-JOURNEY-UX-01

- Simplification de `/journey`: demarrage direct par la visite, tache comme suite, materiel optionnel et suppression de l'etape de contexte statique du chemin principal.
- Repli des limites de developpement et raccourcissement de l'entree cockpit vers la preparation de visite.
- Regles appliquees: guidage et reduction de charge (Bastien et Scapin), choix limite (Hick), action principale visible (Fitts) et divulgation progressive.
- Aucun modele, mutation, authentification, API publique, dependance, IA ou IoT n'a ete ajoute.

## 2026-07-10 - CLASSIC-JOURNEY-01

- Ajout de la route `/journey` pour tester un parcours classique: contexte rucher, visite, tache et materiel.
- Ajout d'une entree depuis le cockpit et de liens vers les ecrans et formulaires de developpement existants.
- Le parcours utilise uniquement le seed et la session de developpement; aucune nouvelle mutation, authentification, API publique, schema Prisma, IA ou IoT n'a ete ajoute.

## 2026-07-10 - AUTH-REAL-00

- Cadrage de l'authentification reelle: fournisseur OIDC, session serveur, cookie securise, organisations personnelles et invitations.
- Definition d'une sequence de lots pour choisir le fournisseur, integrer la session web, onboarder un proprietaire, inviter des membres et remplacer progressivement les fixtures.
- Aucun code applicatif, dependance, schema Prisma, route, cookie, secret, fournisseur configure, IA active ou IoT actif n'a ete ajoute.

## 2026-07-09 - EQUIPMENT-UX-FLOW-01

- Ajout d'une surface "Caisse de visite" sur `/equipment` pour préparer le matériel terrain.
- Mise en avant compacte des points de maintenance et conservation d'un repere de stock simple.
- Aucun achat, fournisseur, prix, stock avance, modele, action serveur, API ou auth n'a ete ajoute.

## 2026-07-09 - TASKS-UX-FLOW-01

- Ajout d'une surface "À traiter d'abord" sur `/tasks` pour mieux guider le triage terrain.
- Ajout d'un rappel compact des trois gestes: prioriser, rattacher, cloturer.
- Repli des statuts, contextes optionnels et limites pour reduire la densite de la page.
- Aucun calendrier, notification, automatisation, modele, action serveur, API ou auth n'a ete ajoute.

## 2026-07-09 - VISITS-UX-FLOW-01

- Ajout d'une surface "Prochaine sortie" sur `/visits` pour prioriser la preparation terrain.
- Remplacement des cartes de workflow visibles par un rythme compact en quatre etapes.
- Repli des champs futurs et des limites pour reduire la densite de la page.
- Aucun modele, action serveur, API, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-09 - UX-COPY-01

- Raccourcissement des textes visibles dans les pages visites, taches, materiel, transhumance, admin, modules et onboarding.
- Ajout de `docs/ux-copy-review.md` pour conserver le diagnostic et les règles éditoriales.
- Les garde-fous restent visibles, mais sous forme de phrases plus courtes.
- Aucun flux, aucune action serveur, aucune donnee, aucune dependance, aucun Docker, aucun Prisma, aucune auth, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-09 - UX-MODULE-PAGES-01

- Harmonisation du gabarit `ShellRoutePage` pour les pages module generiques.
- Reduction des textes repetitifs, limitation a trois reperes visibles et passage des references UX en section repliable.
- Ajout de `docs/ux-module-pages-review.md` pour tracer le diagnostic ergonomique.
- Aucun module metier, aucune donnee, aucune dependance, aucun Docker, aucun Prisma, aucune auth, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-09 - UX-DENSITY-01

- Allègement du cockpit en priorisant le contexte actif, les priorités terrain et les modules visibles.
- Passage des profils simulés, préférences membres, états UI et workflows responsive dans des sections repliables natives.
- Ajout de `docs/ux-density-review.md` pour tracer le diagnostic ergonomique et les règles utilisées.
- Aucun module métier, aucune donnée, aucune dépendance, aucun Prisma, aucune auth, aucune IA active et aucun IoT actif n'ont été ajoutés.

## 2026-07-09 - DEV-SERVER-01

- Stabilisation du serveur de developpement Docker en forcant `next dev --webpack`.
- Le correctif cible un panic Turbopack local observe sur `src/app/globals.css` pendant la validation HTTP de `main`.
- Le build de production reste controle par `next build`.
- Aucun module metier, aucune dependance, aucun Prisma, aucune auth, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-05 - UX-RULES-SKILLS-01

- Ajout du référentiel `docs/ux-rules-skills.md` pour cadrer les lots UX Rucher360.
- Ajout du prompt réutilisable `prompts/ux-audit-agent.md`.
- Mise à jour de `AGENTS.md` avec le workflow UX avant toute modification d'interface.
- Mise à jour de `DESIGN.md`, `docs/context.md` et `docs/todo.md`.
- Aucun code applicatif, aucune dépendance, aucun Docker, aucune auth, aucun Prisma, aucune IA active et aucun IoT actif n'ont été ajoutés.

## 2026-07-05 - VISUAL-ASSETS-01 iteration ergonomie

- Ajout de quatre visuels complementaires pour gouvernance, parcours, onboarding leger et maintenance materiel.
- Integration des nouveaux assets dans `/admin`, les parcours responsive, `/onboarding` et `/equipment`.
- Ajout de `docs/ux-ergonomic-review.md` pour analyser la surcharge d'information et proposer des lots UX dedies.
- Ajout dans la todo des lots `UX-DENSITY-01`, `UX-MODULE-PAGES-01` et `UX-COPY-01`.
- Aucun module metier, aucune dependance, aucun Docker, aucune auth, aucun Prisma, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-04 - VISUAL-ASSETS-01

- Ajout de neuf images apicoles generees pour decorer le cockpit et les pages shell.
- Creation d'un registre TypeScript `visualAssets` et d'un composant `DecorativeImage` reutilisable.
- Integration visuelle sur le cockpit, ruchers, ruches, visites, taches, sanitaire, connaissance, materiel et transhumance.
- Ajout d'un manifeste local des assets dans `public/images/rucher360/README.md`.
- Aucun module metier, aucune dependance, aucun appel API, aucune authentification, aucun Prisma, aucune IA active et aucun IoT actif n'ont ete ajoutes.

## 2026-07-04 - TASKS-FORMS-SHELL-01

- Branchement de `/tasks` en lecture sur Prisma via la session de developpement.
- Ajout de formulaires serveur de developpement pour creer une tache, changer un statut et assigner simplement.
- Les formulaires utilisent les ruchers, ruches, colonies et adhesion fictifs du seed local.
- Aucun compte reel, API publique, notification, recurrence, calendrier, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-04 - TASKS-ACTIONS-01

- Ajout d'un contexte d'action taches base sur l'organisation active, les modules actives et les permissions `tasks.read` / `tasks.write`.
- Ajout des commandes serveur minimales pour lister les taches, creer une tache, changer son statut et assigner simplement un membre.
- Les rattachements rucher, ruche, colonie, visite et adhesion assignee restent optionnels et verifies dans l'organisation active.
- Aucun formulaire actif, API publique, notification, recurrence, calendrier, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-04 - VISITS-FORMS-SHELL-01

- Branchement de `/visits` en lecture sur Prisma via la session de developpement.
- Ajout de formulaires serveur de developpement pour creer une visite, ajouter une observation courte et changer un statut.
- Les formulaires utilisent les ruchers, ruches et colonies fictifs du seed local.
- Aucun compte reel, API publique, creation automatique de tache, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-04 - VISITS-ACTIONS-01

- Ajout d'un contexte d'action visites base sur l'organisation active, les modules actives et les permissions `visits.read` / `visits.write`.
- Ajout des commandes serveur minimales pour lister les visites, creer une visite, changer son statut et ajouter une observation courte.
- Les rattachements rucher, ruche et colonie restent optionnels et verifies dans l'organisation active.
- Aucun formulaire actif, API publique, lecture dans `/visits`, creation automatique de tache, analyse IA ou prescription sanitaire n'a ete ajoute.

## 2026-07-04 - TOOLING-DEPENDENCIES-01

- Mise a jour du gestionnaire pnpm declare de `11.8.0` vers `11.9.0`, sans ajout de dependance applicative.
- Execution de `pnpm install` uniquement via Docker Compose pour verifier l'outillage.
- Ajout dans `AGENTS.md` de la regle de commit distinct apres chaque lot termine.
- Aucun code metier, schema Prisma, Docker, secret, auth, IA active ou IoT actif n'a ete ajoute.

## 2026-07-03 - TASKS-SHELL-01

- Remplacement de la page shell generique `/tasks` par une surface mobile-first dediee aux taches.
- Le shell presente les statuts, priorites, rattachements optionnels et limites avant actions serveur.
- Aucune lecture Prisma, aucun formulaire actif, aucune action serveur, aucun CRUD, aucune notification, aucune recurrence, aucune analyse IA et aucune prescription sanitaire n'ont ete ajoutes.

## 2026-07-03 - AUDIT-LOG-SHELL-01

- Ajout de la route shell `/admin/journal` pour previsualiser la future consultation du journal d'activite metier.
- La page presente des filtres cibles, exemples statiques et garde-fous de minimisation des donnees.
- Aucune lecture Prisma, pagination, emission automatique d'evenements, action serveur, API publique, export, IA active ou IoT actif n'a ete ajoute.

## 2026-07-03 - AUDIT-LOG-01

- Ajout du modele executable minimal du journal d'activite metier avec `ActivityLogEntry`.
- Ajout de l'importance d'evenement, d'une cible referencee et d'une metadata minimale non sensible.
- Ajout de types TypeScript domaine et de helpers purs pour filtrer les cles metadata sensibles.
- Aucun ecran, route, action serveur, emission automatique d'evenements, export, API publique, IA active ou IoT actif n'a ete ajoute.

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
