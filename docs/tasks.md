# Module Taches

## Objectif

`TASKS-01` ajoute le modele executable minimal des taches sans creer d'ecran,
formulaire actif, action serveur, CRUD complet ou automatisation.

Une tache represente une action a faire dans une organisation apicole: preparer
une visite, revoir une ruche, nettoyer du materiel, suivre une observation ou
planifier une action terrain.

## Decision Produit

La tache doit rester legere et transversale.

Principe cible:

```text
tache = action courte + statut + priorite + lien optionnel avec le contexte
```

Elle ne doit pas devenir un outil de gestion de projet lourd.

## Modele Minimal

`TASKS-01` ajoute:

- `Task`;
- `TaskStatus`;
- `TaskPriority`;
- types TypeScript domaine;
- helpers purs de statut.

Relations optionnelles:

- rucher;
- ruche;
- colonie;
- visite;
- createur;
- personne assignee.

## Statuts Cibles

Statuts:

- `TODO`: a faire;
- `IN_PROGRESS`: en cours;
- `DONE`: terminee;
- `CANCELLED`: annulee;
- `ARCHIVED`: masquee des vues courantes.

## Priorites

Priorites:

- `LOW`;
- `NORMAL`;
- `HIGH`;
- `URGENT`.

La priorite aide a trier le terrain, mais ne doit pas declencher d'alerte
automatique dans ce lot.

## Relations Avec Les Visites

Une visite pourra creer ou afficher des taches de suivi plus tard, mais
`TASKS-01` ne cree aucune tache automatiquement.

Le lien `visitId` reste optionnel pour permettre des taches independantes:
preparation de materiel, controle de rucher, rappel sanitaire ou rangement.

## Donnees Sensibles

Une tache peut indirectement reveler:

- une localisation de rucher;
- une observation sanitaire;
- une action sensible;
- une information personnelle si le titre est trop descriptif.

Les futurs journaux et exports devront eviter de recopier les descriptions
completes quand un resume suffit.

## Hors Perimetre

`TASKS-01` ne cree pas:

- ecran;
- formulaire actif;
- action serveur;
- API publique;
- notifications;
- rappels automatiques;
- recurrence;
- assignation avancee;
- calendrier;
- analyse IA;
- prescription sanitaire.

## Lots Suivants Possibles

1. `TASKS-SHELL-01`
   - termine comme shell statique;
   - ecran mobile-first de lecture/preparation;
   - aucun CRUD complet.

2. `TASKS-ACTIONS-01`
   - actions serveur minimales;
   - creation, changement de statut, assignation simple.

3. `VISIT-TASKS-LINK-01`
   - afficher ou creer des taches depuis une visite;
   - pas d'automatisation lourde.

## TASKS-SHELL-01

`TASKS-SHELL-01` remplace la page shell generique `/tasks` par une surface
mobile-first dediee aux taches.

La page presente:

- les statuts principaux;
- le principe de priorite;
- les rattachements optionnels au contexte terrain;
- les limites avant actions serveur.

Elle ne lit pas encore la base, ne cree aucune tache, ne change aucun statut,
n'assigne personne et n'active aucune notification ou recurrence.

## TASKS-ACTIONS-01

`TASKS-ACTIONS-01` ajoute les commandes serveur minimales du module taches:

- lister les taches de l'organisation active;
- creer une tache courte;
- changer le statut d'une tache encore editable;
- assigner ou desassigner simplement une adhesion membre.

Les actions verifient le module `tasks`, les permissions `tasks.read` et
`tasks.write`, ainsi que l'appartenance optionnelle du rucher, de la ruche, de
la colonie, de la visite et de l'adhesion assignee a l'organisation active.

Ce lot ne branche pas encore `/tasks` sur Prisma, ne cree pas de formulaire
actif, n'ajoute aucune notification, recurrence, vue calendrier, analyse IA ou
prescription sanitaire.
