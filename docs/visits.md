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

1. choisir le rucher;
2. choisir une ruche ou une colonie si necessaire;
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
ralentir la saisie.

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

3. `VISITS-FORMS-SHELL-01`
   - formulaire de developpement non operationnel ou limite;
   - aucun automatisme sanitaire.

4. `TASKS-01`
   - modele minimal des taches;
   - lien futur avec visites.
