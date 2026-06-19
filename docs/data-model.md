# Modèle de Données Conceptuel

Ce document décrit les entités métier sans imposer encore de schéma Prisma ou SQL.

## Entités principales

### Organization

Organisation apicole propriétaire d'un espace de travail.

Champs conceptuels:

- identifiant;
- nom;
- type;
- statut;
- paramètres;
- dates de création et mise à jour.

### User

Personne pouvant accéder au produit.

Champs conceptuels:

- identifiant;
- nom;
- email;
- statut;
- préférences;
- dates de création et mise à jour.

### Membership

Lien entre un utilisateur et une organisation.

Champs conceptuels:

- organisation;
- utilisateur;
- rôle;
- modules utilisateur activés;
- statut d'invitation.

### Role et Permission

Définissent les droits applicables dans une organisation.

### Module

Fonctionnalité activable ou désactivable.

Champs conceptuels:

- code;
- nom;
- catégorie;
- état par défaut;
- niveau d'activation.

### Apiary

Rucher ou site apicole.

Champs conceptuels:

- organisation;
- nom;
- description;
- localisation descriptive;
- coordonnées optionnelles;
- notes d'accès;
- statut.

### Hive

Matériel ruche identifié.

Champs conceptuels:

- organisation;
- rucher courant;
- identifiant terrain;
- type;
- configuration basse consommation;
- statut matériel;
- notes.

### Colony

Colonie vivante suivie dans le temps.

Champs conceptuels:

- organisation;
- ruche courante;
- origine;
- reine connue ou inconnue;
- état;
- force estimée;
- notes.

### Visit

Passage terrain avec observations et interventions.

Champs conceptuels:

- organisation;
- rucher;
- ruche optionnelle;
- colonie optionnelle;
- date;
- auteur;
- météo saisie manuellement optionnelle;
- observations;
- actions réalisées;
- suites à prévoir.

### Task

Action planifiée ou assignée.

Champs conceptuels:

- organisation;
- titre;
- description;
- cible métier;
- responsable;
- échéance;
- priorité;
- statut.

### HealthObservation

Observation sanitaire.

Champs conceptuels:

- organisation;
- cible métier;
- type;
- gravité;
- description;
- action effectuée;
- auteur;
- date.

### VarroaRecord

Suivi varroa dédié.

Champs conceptuels:

- organisation;
- ruche ou colonie;
- date;
- méthode de comptage;
- résultat;
- traitement éventuel;
- notes.

### HornetRecord

Signalement frelon.

Champs conceptuels:

- organisation;
- rucher;
- date;
- pression observée;
- action réalisée;
- notes.

### KnowledgeArticle

Contenu de connaissance interne.

### Contact

Contact utile pour l'organisation.

### Document

Fichier ou référence documentaire.

### Harvest

Récolte simple.

Champs conceptuels:

- organisation;
- date;
- rucher optionnel;
- ruche optionnelle;
- quantité;
- unité;
- type;
- notes.

## Relations clés

- Une organisation possède ses ruchers, ruches, colonies, visites, tâches, documents, contacts et articles.
- Un utilisateur accède à une organisation via une adhésion.
- Une ruche peut changer de rucher.
- Une colonie peut changer de ruche.
- Une visite peut concerner un rucher entier, une ruche ou une colonie.
- Une tâche peut cibler plusieurs types d'entités métier.

## Décision initiale

Le modèle reste conceptuel dans ce lot. Aucun dossier `prisma/`, migration ou client de base de données n'est créé.
