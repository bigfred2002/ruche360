# Ruchers Et Ruches

## Objectif

Le module ruchers/ruches porte le premier niveau terrain de Rucher360:

- un rucher represente un site apicole;
- une ruche represente un contenant mobile;
- une colonie represente le vivant suivi dans une ruche.

`APIARY-FORMS-01` ajoute les premieres actions serveur de creation de rucher
et de ruche, sans creer de partage fin, de carte, de geolocalisation precise
ou de suppression.

## Etat Actuel

La route `/apiaries` lit les ruchers et ruches de l'organisation active via le
contrat `ApplicationSession`.

En attendant l'authentification web reelle, la page utilise la session de
developpement pour tester:

- creation d'un rucher;
- creation d'une ruche active, stockee ou en maintenance;
- rattachement optionnel d'une ruche a un rucher;
- lecture des compteurs simples par rucher.

## Regles Produit

- Les coordonnees exactes ne sont pas saisies dans ce lot.
- Une ruche peut etre au stock ou en maintenance sans rucher courant.
- Une ruche active rattachee a un rucher devient le point d'entree privilegie
  des visites.
- La colonie reste separee dans le modele, mais le parcours courant evite de la
  demander explicitement a l'utilisateur.

## Hors Perimetre

Ce lot ne cree pas:

- modification de rucher;
- archivage ou suppression;
- carte;
- GPS;
- partage fin par rucher;
- creation de colonie depuis le formulaire;
- import massif;
- authentification reelle;
- API publique;
- IA ou IoT actif.

## Lots Suivants

1. `AUTH-CUTOVER-ACTIONS-01`
   - remplacer la session de developpement par la session authentifiee.

2. `APIARY-EDIT-01`
   - modifier rucher et ruche, sans suppression dure.

3. `COLONIES-LIGHT-FLOW-01`
   - gerer les cas simples de colonie active, perte et remplacement.
