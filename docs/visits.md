# Module Visites

## Objectif

`VISITS-SHELL-01` prepare le futur module de visites sans creer de modele
Prisma, formulaire actif, CRUD ou automatisation.

Une visite doit rester une action terrain rapide: observer, noter, relier les
suites a prevoir et garder une trace lisible pour l'organisation.

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
- date de visite;
- objectif;
- force de colonie;
- ponte;
- reserves;
- comportement;
- observations sanitaires;
- actions realisees;
- notes courtes;
- suites a prevoir.

Ces champs ne sont pas implementes dans ce lot. Ils servent a guider les futurs
lots de modele et d'interface.

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

## Hors Perimetre

`VISITS-SHELL-01` ne cree pas:

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
   - cadrage detaille du modele visite et de ses limites;
   - aucun code executable.

2. `VISITS-01`
   - modele Prisma minimal des visites;
   - aucun CRUD complet.

3. `VISITS-FORMS-SHELL-01`
   - formulaire de developpement non operationnel ou limite;
   - aucun automatisme sanitaire.

4. `TASKS-01`
   - modele minimal des taches;
   - lien futur avec visites.
