# Module Visites

## Objectif

`VISITS-SHELL-01` prepare le futur module de visites sans creer de modele
Prisma, formulaire actif, CRUD ou automatisation.

`VISITS-00` ajoute le cadrage detaille du futur modele visite et de ses limites,
toujours sans code executable.

Une visite doit rester une action terrain rapide: observer, noter, relier les
suites a prevoir et garder une trace lisible pour l'organisation.

## Decision Produit

La visite est le carnet de terrain central de Rucher360, mais elle ne doit pas
devenir un formulaire lourd.

Principe cible:

```text
visite = observation courte + actions realisees + suites a prevoir
```

Les liens avec taches, sanitaire, materiel et transhumance doivent rester
progressifs et optionnels.

## Parcours Cible

Le parcours cible reste mobile-first:

1. choisir une ruche active;
2. deduire son rucher et sa colonie active lorsqu'elle existe;
3. noter les observations essentielles;
4. indiquer les actions realisees;
5. creer ou preparer des taches de suivi dans un lot ulterieur;
6. relire l'historique sans perdre le contexte terrain.

## Informations Futures

Champs candidats:

- rucher;
- ruche;
- colonie;
- auteur ou adhesion auteur;
- date de visite;
- statut;
- objectif;
- conditions observees;
- force de colonie;
- ponte;
- reserves;
- comportement;
- observations sanitaires;
- actions realisees;
- materiel utilise, optionnel;
- notes courtes;
- suites a prevoir.

Ces champs ne sont pas implementes dans ce lot. Ils servent a guider les futurs
lots de modele et d'interface.

## Statuts Cibles

Statuts simples proposes:

- `DRAFT`: brouillon local ou preparation;
- `PLANNED`: visite prevue;
- `IN_PROGRESS`: saisie en cours;
- `COMPLETED`: visite terminee;
- `CANCELLED`: visite annulee;
- `ARCHIVED`: visite masquee des vues courantes.

Le statut `COMPLETED` ne doit pas déclencher automatiquement de diagnostic,
prescription ou traitement.

## Types D'Observation

Les observations doivent rester courtes et exploitables sur mobile.

Categories candidates:

- colonie: force, ponte, reine, comportement;
- reserves: miel, pollen, nourrissement;
- ruche: etat materiel, place disponible, humidite visible;
- sanitaire: signe observable, varroa manuel, pression frelon;
- action: ajout, retrait, nourrissement, controle, nettoyage;
- suite: tache, prochaine visite, point d'attention.

Ces categories ne deviennent pas toutes des tables au premier lot executable.
Le futur modele devra rester sobre.

## Relations Futures

Relations a prevoir progressivement:

- visite vers rucher;
- visite vers ruche ou colonie;
- visite vers taches;
- visite vers observations sanitaires;
- visite vers materiel utilise, optionnellement;
- visite vers mouvements de transhumance seulement si le besoin terrain est
  confirme.

Les relations doivent rester optionnelles autant que possible pour eviter de
ralentir la saisie. Pour le parcours terrain courant, la ruche est le point
d'entree: le rucher et la colonie active sont derives. La selection explicite
d'une colonie est reservee a de futurs cas avances (division, remplacement,
reunion ou historique).

## Permissions Cibles

Permissions deja prevues:

- `visits.read`;
- `visits.write`.

Permission future possible, seulement si necessaire:

- `visits.manage`.

Lecture et ecriture doivent respecter l'organisation active, les modules
actives et les permissions de l'adhesion.

## UX Cible

La saisie doit etre mobile-first:

- peu de champs obligatoires;
- une ruche active comme seul choix terrain initial;
- rucher et colonie active derives sans les afficher comme choix courants;
- libelles terrain courts;
- possibilite d'enregistrer une note minimale;
- actions frequentes accessibles sans parcourir l'administration;
- consultation de l'historique depuis rucher, ruche ou colonie.

La bottom nav peut exposer `Visites`, mais les reglages avances doivent rester
hors du parcours terrain.

## Donnees Sensibles

Les visites peuvent contenir des informations sensibles:

- localisation indirecte via le rucher;
- observations sanitaires;
- notes personnelles;
- futures photos;
- actions pouvant engager une responsabilite.

Le futur modele devra eviter de recopier des donnees sensibles inutiles dans les
journaux ou exports.

## Archivage

Une visite terminee doit rester dans l'historique. Une visite archivee doit etre
masquee des vues courantes, mais consultable par les membres autorises.

La suppression dure doit rester exceptionnelle et suivre le cadrage
`DATA-LIFECYCLE-00`.

## Hors Perimetre

`VISITS-SHELL-01` et `VISITS-00` ne creent pas:

- schema Prisma;
- migration;
- action serveur;
- formulaire fonctionnel;
- API publique;
- workflow de validation sanitaire;
- analyse IA de visite;
- prescription automatique;
- lien obligatoire avec le materiel;
- lien obligatoire avec la transhumance.

## Lots Suivants Possibles

1. `VISITS-00`
   - termine comme cadrage documentaire;
   - cadrage detaille du modele visite et de ses limites;
   - aucun code executable.

2. `VISITS-01`
   - termine comme modele executable minimal;
   - modele Prisma minimal des visites;
   - aucun CRUD complet.

## VISITS-01

`VISITS-01` ajoute le modele executable minimal des visites:

- `Visit`;
- `VisitObservation`;
- statuts de visite;
- categories d'observation simples;
- types TypeScript domaine et helpers purs de statut.

Le modele garde les relations principales optionnelles quand c'est pertinent:
rucher, ruche, colonie et auteur. Cela permet de saisir plus tard une visite
rapide sans imposer toute la structure apicole a chaque note terrain.

Ce lot n'ajoute pas d'ecran, formulaire actif, action serveur, API publique,
analyse IA, prescription sanitaire, creation automatique de tache ou lien
obligatoire avec le materiel.

## VISITS-ACTIONS-01

`VISITS-ACTIONS-01` ajoute les commandes serveur minimales du module visites:

- lister les visites de l'organisation active;
- creer une visite en brouillon, prevue ou en cours;
- changer le statut d'une visite encore editable;
- ajouter une observation courte.

Les actions verifient le module `visits`, les permissions `visits.read` et
`visits.write`, ainsi que l'appartenance optionnelle du rucher, de la ruche et
de la colonie a l'organisation active.

Ce lot ne branche pas encore `/visits` sur Prisma, ne cree pas de formulaire
actif, ne cree aucune tache automatiquement et n'ajoute ni analyse IA ni
prescription sanitaire.

## VISITS-FORMS-SHELL-01

`VISITS-FORMS-SHELL-01` branche la page `/visits` sur la session de
developpement:

- lecture des visites depuis PostgreSQL avec Prisma;
- formulaire de creation de visite;
- formulaire d'ajout d'observation courte;
- formulaire de changement de statut.

Les formulaires restent limites au developpement local et aux donnees fictives
du seed. Ils n'introduisent pas d'authentification reelle, d'API publique, de
creation automatique de tache, de diagnostic sanitaire, d'analyse IA ou de
prescription.

## VISITS-REAL-FLOW-01

`VISITS-REAL-FLOW-01` rapproche le flux visites du parcours terrain reel:

- `/visits` charge les ruches de l'organisation active via le contrat
  `ApplicationSession`;
- le formulaire de creation de visite propose les ruches actives issues de
  `/apiaries`;
- une visite ne peut plus etre creee depuis l'interface si aucune ruche active
  n'est disponible;
- le rucher et la colonie active restent derives cote serveur depuis la ruche.

Le lot utilise encore la session de developpement tant que `AUTH-SESSION-WEB-01`
n'est pas implemente. Il ne cree pas d'authentification reelle, d'API publique,
de prescription sanitaire, d'analyse IA ou de creation automatique de tache.

## VISIT-DETAIL-SHELL-01

`VISIT-DETAIL-SHELL-01` ajoute une fiche de lecture `/visits/[visitId]`.

La fiche affiche:

- le statut et la date;
- l'objectif;
- le rucher, la ruche et la colonie lies quand ils existent;
- la meteo et les notes;
- les observations courtes;
- la suite prevue.

La fiche reste en lecture seule. Elle ne cree pas de tache, ne modifie pas la
visite, ne lance aucune analyse IA et ne produit aucune prescription sanitaire.

3. `VISITS-FORMS-SHELL-01`
   - termine comme formulaires serveur de developpement limites;
   - aucun automatisme sanitaire.

4. `TASKS-01`
   - modele minimal des taches;
   - lien futur avec visites.
