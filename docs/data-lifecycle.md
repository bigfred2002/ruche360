# Cycle De Vie Des Donnees

## Objectif

`DATA-LIFECYCLE-00` cadre l'archivage, la conservation, la restauration et la
suppression controlee dans Rucher360 sans creer de schema, migration, job,
route, API ou interface.

L'objectif est d'eviter les suppressions rapides dans une application qui va
produire beaucoup de donnees terrain, parfois sensibles: localisations de
ruchers, observations sanitaires, contacts, documents, historique de
transhumance et journal d'activite metier.

## Decision Principale

Rucher360 privilegie l'archivage et les statuts metier avant toute suppression
dure.

Regle cible:

```text
donnee inactive = statut metier ou archivedAt
donnee supprimee = exception encadree, journalisee et irreversible
```

Une donnee archivee ne doit plus encombrer les vues courantes, mais elle peut
rester consultable par les membres autorises depuis des surfaces dediees.

## Principes

- Toute donnee metier reste rattachee a une organisation.
- La desactivation d'un module masque les ecrans et bloque les actions, mais ne
  supprime jamais ses donnees.
- Les entites operationnelles doivent preferer `archivedAt` ou un statut
  explicite a une suppression dure.
- La restauration doit etre possible pour les entites archivees quand cela a du
  sens.
- Les actions sensibles devront etre tracees dans le futur journal d'activite
  metier.
- Les exports futurs devront respecter les permissions et minimiser les donnees
  sensibles.
- Les donnees personnelles et les donnees de localisation doivent rester
  minimales.

## Categories De Donnees

### Donnees D'Organisation

Exemples:

- organisation;
- membres;
- roles;
- permissions;
- modules actives.

Regle cible:

- privilegier suspension, desactivation ou archivage;
- eviter de supprimer un role ou une adhesion si l'historique en depend;
- journaliser les changements de role, module et acces.

### Donnees Apicoles Courantes

Exemples:

- ruchers;
- ruches;
- colonies;
- visites futures;
- taches futures;
- recoltes futures.

Regle cible:

- masquer les entites archivees des listes courantes;
- conserver l'historique utile aux decisions terrain;
- ne pas effacer l'historique d'une ruche ou d'une colonie lors d'un changement
  de statut.

### Donnees Sensibles

Exemples:

- localisation exacte de ruchers;
- observations sanitaires;
- documents importes;
- contacts personnels;
- photos ou videos futures;
- donnees de capteurs futures.

Regle cible:

- minimiser la precision affichee quand elle n'est pas necessaire;
- reserver la consultation aux permissions adaptees;
- eviter les exports larges par defaut;
- definir des regles de conservation avant toute purge.

### Donnees De Journal D'Activite

Exemples:

- changement de role;
- activation ou desactivation de module;
- archivage d'une donnee;
- creation ou finalisation d'un mouvement de transhumance;
- changement important sur du materiel.

Regle cible:

- le journal trace l'action, pas le contenu complet;
- ne jamais stocker secret, token, document complet ou note sensible longue;
- conserver les evenements structurants plus longtemps que les evenements
  ordinaires.

## Etats Cibles

Etats generiques a privilegier:

- actif;
- suspendu ou en pause;
- archive;
- restaure;
- supprime de maniere controlee.

Les noms exacts peuvent rester propres a chaque domaine, par exemple
`ACTIVE`, `PAUSED`, `ARCHIVED`, `RETIRED`, `LOST` ou `COMPLETED`.

## Consultation Des Archives

Les archives ne doivent pas etre dans le chemin principal mobile-first.

Surfaces futures possibles:

- filtre "inclure archives" dans une liste admin;
- carte "Archives" dans `/admin`;
- detail d'entite accessible depuis un historique;
- lecture seule par periode ou par module.

La consultation doit rester permissionnee et explicite pour eviter d'exposer des
donnees anciennes ou sensibles.

## Restauration

La restauration doit etre prevue seulement pour les donnees archivees, pas pour
les suppressions dures.

Regles cible:

- restaurer dans la meme organisation;
- verifier que les relations necessaires existent encore;
- journaliser l'action;
- ne pas restaurer automatiquement les enfants sans decision explicite.

## Suppression Dure

La suppression dure doit rester exceptionnelle.

Cas possibles:

- erreur de saisie recente et sans dependance;
- demande explicite encadree;
- exigence legale ou contractuelle future;
- nettoyage de donnees de developpement fictives.

Avant toute suppression dure, un futur lot devra definir:

- permissions requises;
- confirmation utilisateur;
- impact sur les relations;
- journalisation minimale;
- effet sur exports et sauvegardes;
- delai ou possibilite d'annulation si necessaire.

## Impacts Par Module

| Module | Strategie cible |
| --- | --- |
| Organisations | Suspension ou archivage avant suppression. |
| Membres | Suspension ou retrait d'acces, historique conserve. |
| Modules | Desactivation sans suppression des donnees. |
| Ruchers | Archivage, localisation sensible minimisee. |
| Ruches | Statut metier et historique conserve. |
| Colonies | Statut metier, pertes conservees pour historique. |
| Materiel | Statuts `RETIRED`, `LOST`, `MAINTENANCE` avant suppression. |
| Transhumance | Historique conserve, mouvements termines non effaces. |
| Visites futures | Archivage ou annulation, pas de prescription automatique. |
| Sanitaire futur | Conservation prudente, donnees sensibles minimisees. |
| Documents futurs | Regles dediees avant stockage et suppression. |
| Contacts futurs | Minimisation et permissions fortes. |

## Hors Perimetre

`DATA-LIFECYCLE-00` ne cree pas:

- migration;
- modele Prisma;
- champ `archivedAt` supplementaire;
- job de purge;
- API;
- interface d'administration;
- export;
- suppression effective;
- restauration effective;
- IA active;
- IoT actif.

## Lots Suivants Possibles

1. `DATA-LIFECYCLE-01`
   - appliquer les conventions manquantes aux modeles qui en ont besoin;
   - aucun ecran de purge.

2. `ARCHIVE-SHELL-01`
   - surface admin de consultation des archives en lecture seule;
   - aucun restore/delete actif.

3. `AUDIT-LOG-01`
   - modele minimal du journal d'activite metier.

4. `DELETE-GUARDRAILS-01`
   - cadrage ou implementation tres limitee des confirmations de suppression;
   - seulement apres validation produit.
