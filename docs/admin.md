# Administration D'Organisation

## Objectif

`ADMIN-00` cadre le futur centre d'administration de Rucher360 sans l'implementer.

L'administration doit aider une organisation apicole a comprendre et gouverner son espace: membres, roles, modules, volumes de donnees, securite, archivage et journal d'activite metier.

Elle ne doit pas devenir un gros back-office plateforme global ni un module metier apicole concurrent.

## Decision Principale

Rucher360 commence par une administration d'organisation.

Cela signifie:

- l'administration agit dans une organisation active;
- les donnees affichees restent rattachees a cette organisation;
- les permissions existantes limitent les actions;
- l'administration complete les modules `organizations`, `users_roles` et `modules`;
- l'administration plateforme reste un sujet futur separe.

## Administration Plateforme Future

`PLATFORM-ADMIN-00` cadre le sujet sans l'implementer.

L'administration plateforme concerne l'exploitation technique globale de
Rucher360, pas la gestion quotidienne d'une organisation apicole.

Elle pourra devenir utile seulement lorsque l'application aura:

- une authentification reelle;
- des roles plateforme distincts des roles d'organisation;
- plusieurs organisations actives;
- des sauvegardes et restaurations cadrees;
- des journaux d'activite et de securite suffisamment fiables;
- un mode d'hebergement cible valide.

Elle ne remplace pas `/admin`. Le centre `/admin` reste l'administration d'une
organisation active. Une future administration plateforme devra etre separee,
probablement sous une surface reservee a l'exploitation technique, par exemple
`/platform-admin` ou un outil d'exploitation non expose aux utilisateurs finaux.

### Responsabilites Possibles

Fonctions candidates, a garder hors perimetre tant qu'elles ne sont pas
necessaires:

- liste des organisations;
- etat global des volumes de donnees;
- etat des migrations et versions applicatives;
- supervision des sauvegardes;
- statut des jobs ou traitements futurs;
- revue de securite et des alertes techniques;
- gestion des incidents;
- support technique limite, avec minimisation des donnees visibles.

### Limites

Ne pas introduire dans l'administration plateforme:

- lecture libre des donnees metier d'une organisation;
- contournement des permissions d'organisation;
- modification directe des ruchers, ruches, visites, taches ou materiel;
- export global de donnees personnelles;
- suppression dure sans procedure d'archivage et de restauration;
- activation IA, IoT, GPS, camera ou capteurs;
- secret, token ou configuration de production versionnee.

### Dependances Avant Implementation

Avant tout lot executable, il faudra au minimum:

- choisir le fournisseur d'authentification reel;
- ajouter les roles plateforme dans un lot dedie;
- definir la politique d'acces support;
- cadrer les sauvegardes et restaurations;
- cadrer les logs techniques et metier;
- valider l'architecture d'hebergement.

## Responsabilites Cibles

Le centre d'administration d'organisation devra couvrir progressivement:

- profil et parametres de l'organisation;
- membres, adhesions, roles et permissions;
- modules actives par organisation et visibles par adhesion;
- volumes de donnees par module;
- etats d'archivage et conservation;
- securite applicative visible par l'organisation;
- journal d'activite metier;
- exports futurs controles.

## Surfaces Futures

Route cible:

```text
/admin
```

Cette route devra rester secondaire:

- visible en sidebar desktop et catalogue modules;
- absente de la bottom nav mobile au depart;
- accessible seulement aux membres disposant de permissions d'administration;
- lisible sur mobile, mais optimisee pour revue et configuration.

Cartes futures:

- Organisation;
- Membres;
- Roles et permissions;
- Modules;
- Donnees;
- Securite;
- Journal;
- Archivage.

## Permissions Cibles

Les permissions existantes couvrent deja une partie du besoin:

- `organization.manage`;
- `users.manage`;
- `roles.manage`;
- `modules.manage`.

Permissions futures possibles, a cadrer seulement si necessaire:

- `admin.read`;
- `admin.audit.read`;
- `admin.data.read`;
- `admin.lifecycle.manage`.

Ne pas ajouter ces permissions tant qu'un lot executable ne les justifie pas.

## Donnees Et Volumes

`ADMIN-DATA-OVERVIEW-01` ajoute la premiere vue data en lecture seule dans
`/admin`.

Compteurs utiles:

- membres;
- modules actives;
- ruchers;
- ruches;
- colonies;
- materiel;
- mouvements de transhumance;
- futurs documents;
- futures observations sanitaires.

Les compteurs doivent aider a piloter, pas a supprimer rapidement.

La vue actuelle lit uniquement les volumes de l'organisation active via la
session de developpement. Elle ne cree pas d'export, de suppression, de purge,
de correction automatique ou d'API publique.

## Archivage Et Suppression

L'administration doit privilegier:

- statuts metier;
- `archivedAt`;
- restauration future;
- conservation controlee;
- journalisation des actions importantes.

La suppression dure doit rester exceptionnelle et cadrée par lot dedie, surtout pour:

- localisation de ruchers;
- sanitaire;
- documents;
- contacts;
- historique de mouvements;
- roles et permissions.

Le cadrage detaille est documente dans [Cycle De Vie Des Donnees](data-lifecycle.md).

## Journal D'Activite Metier

Le journal d'activite metier est distinct de:

- `make security-scan`;
- `make secrets-scan`;
- `pnpm audit --prod`;
- GitHub Actions;
- logs techniques Docker ou Next.js.

Il doit tracer des evenements utiles a l'organisation, par exemple:

- changement de role;
- activation ou desactivation d'un module;
- archivage d'une donnee;
- creation ou finalisation d'un mouvement de transhumance;
- changement important sur le materiel;
- future action sanitaire importante.

Le detail exact est cadre dans [Journal D'Activite Metier](audit-log.md).

## Hors Perimetre

`ADMIN-00` ne cree pas:

- route `/admin`;
- composant UI;
- schema Prisma;
- migration;
- CRUD;
- API;
- authentification reelle;
- role plateforme;
- export de donnees;
- purge ou suppression automatique;
- IA active;
- IoT actif.

## Lots Suivants

1. `ADMIN-SHELL-01`
   - route shell `/admin`;
   - cartes statiques;
   - entree desktop et catalogue, sans bottom nav mobile;
   - aucun CRUD.

2. `ADMIN-DATA-OVERVIEW-01`
   - termine;
   - compteurs par organisation en lecture seule;
   - aucun export ou suppression.

3. `AUDIT-LOG-00`
   - cadrage du journal d'activite metier.

4. `DATA-LIFECYCLE-00`
   - cadrage archivage, conservation, restauration et suppression controlee.

5. `PLATFORM-ADMIN-00`
   - termine;
   - cadrage futur de l'exploitation technique globale;
   - aucune route, permission, role ou donnee plateforme n'est ajoutee.

## Regles De Coherence

- Ne pas dupliquer `organizations`, `users_roles` et `modules`.
- Ne pas ajouter l'administration dans la bottom nav mobile au depart.
- Ne pas utiliser l'administration pour contourner les permissions metier.
- Ne pas supprimer les donnees d'un module desactive.
- Ne pas exposer de donnees sensibles dans les exports ou captures.
- Ne pas activer IA, IoT, GPS ou traitements automatiques depuis l'administration sans lot dedie.
