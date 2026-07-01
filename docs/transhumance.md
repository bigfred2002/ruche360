# Transhumance

## Objectif

Ce document cadre le futur module `transhumance`.

La transhumance dans Rucher360 doit etre modelisee comme un mouvement de ruches ou de lots de ruches entre ruchers.

Un rucher represente un site apicole. Il ne doit pas etre deplace.

## Principes Metier

- `Apiary` est un emplacement ou site apicole.
- `Hive` est un contenant mobile.
- Un mouvement relie une ou plusieurs ruches a un rucher source et un rucher destination.
- L'historique des mouvements est conserve.
- L'emplacement courant d'une ruche est une consequence du dernier mouvement termine, pas une donnee ecrasee sans trace.

Cette approche evite de perdre l'historique des sites et permet de comprendre ou se trouvait une ruche a une date donnee.

## Cas D'Usage Cibles

Le module doit couvrir:

- deplacer quelques ruches vers un site de miellee;
- preparer une operation de pollinisation;
- enregistrer un hivernage sur un autre site;
- tracer un deplacement sanitaire ou d'urgence;
- consulter l'historique d'une ruche ou d'un rucher.

Il ne doit pas devenir une application de logistique transport.

## Statuts

Statuts cibles d'un mouvement:

| Statut | Description |
| --- | --- |
| `planned` | Le mouvement est prevu mais pas encore realise. |
| `in_progress` | Les ruches sont en cours de deplacement. |
| `completed` | Les ruches sont arrivees sur le site destination. |
| `cancelled` | Le mouvement a ete annule sans effet courant. |

Un mouvement annule doit rester consultable pour conserver la trace de la decision.

## Motifs

Motifs cibles:

- miellee;
- pollinisation;
- hivernage;
- urgence;
- sanitaire;
- renforcement ou regroupement;
- autre.

Le motif reste informatif. Il ne declenche aucune prescription sanitaire, aucun calcul de rentabilite et aucun suivi contractuel.

## Modele Conceptuel

### HiveMovement

Champs conceptuels:

- organisation;
- rucher source;
- rucher destination;
- date de depart;
- date d'arrivee optionnelle;
- statut;
- motif;
- notes;
- auteur;
- dates de creation et mise a jour.

### HiveMovementItem

Champs conceptuels:

- mouvement;
- ruche;
- commentaire optionnel;
- statut optionnel si une ruche ne suit pas le mouvement global.

Le detail par ruche doit rester simple. Les lots de ruches peuvent etre representes par plusieurs `HiveMovementItem` plutot que par une logistique avancee.

## Effets Cibles

Quand un mouvement passe a `completed`, l'emplacement courant des ruches concernees pourra etre mis a jour vers le rucher destination.

Cette mise a jour ne doit jamais supprimer l'historique. Les anciennes localisations restent consultables via les mouvements.

Un mouvement `planned` ou `cancelled` ne doit pas changer l'emplacement courant.

## UX Cible

Flux mobile-first:

1. ouvrir le module transhumance ou selectionner des ruches depuis un rucher;
2. choisir les ruches concernees;
3. choisir le rucher destination;
4. renseigner date, motif et note courte;
5. enregistrer comme prevu ou terminer directement;
6. consulter l'historique depuis une ruche ou un rucher.

La navigation basse mobile ne doit pas etre surchargee. L'entree peut rester dans le catalogue modules, le detail d'un rucher ou une action secondaire sur une liste de ruches.

## Impacts Sur Les Ecrans

Ecrans futurs concernes:

- liste des mouvements;
- detail d'un mouvement;
- detail d'une ruche: historique de localisation;
- detail d'un rucher: ruches arrivees, parties ou prevues;
- cockpit: signal discret si un mouvement est prevu prochainement.

Ecrans non concernes au premier niveau:

- cartes temps reel;
- suivi GPS actif;
- gestion de vehicules;
- planning complet de transport;
- contrats de pollinisation.

## Permissions Futures

Permissions conceptuelles:

| Permission | Description |
| --- | --- |
| `transhumance.read` | Consulter les mouvements de ruches. |
| `transhumance.write` | Creer ou modifier les mouvements de ruches. |
| `transhumance.manage` | Administrer les statuts, annulations et corrections. |

Ces permissions ne remplacent pas `hives.read`, `hives.write` ou `apiaries.read`. Elles s'ajoutent au module `transhumance`.

## Limites

Ne pas introduire dans les premiers lots:

- geolocalisation temps reel;
- GPS actif;
- IoT actif;
- calcul automatique d'itineraire;
- vehicules et chauffeurs;
- couts de transport;
- contrats de pollinisation;
- cartographie publique;
- partage public de localisation;
- automatisation IA.

Les coordonnees de ruchers restent sensibles et doivent etre affichees avec prudence.

## Sequence De Lots

1. `TRANSHUMANCE-00`
   - cadrage documentaire;
   - aucun schema, route, ecran ou CRUD.

2. `HIVE-MOVEMENTS-01`
   - modele executable des mouvements de ruches;
   - helpers purs pour l'emplacement courant;
   - aucune logistique avancee.

3. `TRANSHUMANCE-SHELL-01`
   - ecrans statiques ou semi-statiques;
   - parcours mobile-first sans action lourde.

4. `TRANSHUMANCE-CRUD-01`
   - creation, modification, annulation et finalisation des mouvements;
   - mise a jour controlee de l'emplacement courant.

## Decision `HIVE-MOVEMENTS-01`

`HIVE-MOVEMENTS-01` ajoute le socle executable de la transhumance:

- module `transhumance` dans le catalogue RBAC, desactive par defaut;
- permissions `transhumance.read`, `transhumance.write` et `transhumance.manage`;
- modeles Prisma `HiveMovement` et `HiveMovementItem`;
- enums de statuts et motifs;
- helpers purs pour determiner l'emplacement courant d'une ruche a partir des mouvements termines.

`TRANSHUMANCE-SHELL-01` ajoute ensuite une route shell `/transhumance` pour presenter le workflow cible. Le module reste volontairement sans formulaire actif, action serveur, API, GPS actif, IA active ou IoT actif.

Un mouvement `COMPLETED` peut servir de source pour deduire l'emplacement courant. Les mouvements `PLANNED`, `IN_PROGRESS` et `CANCELLED` ne changent pas l'emplacement courant.

## Decision

La transhumance est un module apicole autonome et optionnel. Elle trace les mouvements de ruches entre sites sans transformer Rucher360 en outil de transport.
