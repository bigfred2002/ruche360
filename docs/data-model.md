# Modèle de Données

Ce document décrit les entités métier et prépare leur passage progressif vers un schéma exécutable. La stratégie de cadrage est détaillée dans [Stratégie Data](data-strategy.md).

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

### EquipmentType

Type de materiel apicole.

Champs conceptuels:

- organisation optionnelle pour les types personnalises;
- code ou nom;
- categorie;
- mode de suivi: quantite, individuel ou hybride;
- unite par defaut;
- etat actif ou archive.

### EquipmentStock

Quantite disponible pour un type de materiel.

Champs conceptuels:

- organisation;
- type de materiel;
- quantite;
- unite;
- emplacement;
- rucher optionnel;
- notes.

### EquipmentItem

Materiel durable ou couteux suivi individuellement.

Champs conceptuels:

- organisation;
- type de materiel;
- nom ou identifiant terrain;
- statut;
- emplacement;
- rucher optionnel;
- notes.

### EquipmentEvent

Evenement leger de suivi du materiel.

Champs conceptuels:

- organisation;
- type de materiel;
- item optionnel;
- quantite optionnelle;
- type d'evenement;
- emplacement source optionnel;
- emplacement cible optionnel;
- auteur optionnel;
- date;
- note.

## Relations clés

- Une organisation possède ses ruchers, ruches, colonies, visites, tâches, documents, contacts et articles.
- Un utilisateur accède à une organisation via une adhésion.
- Une ruche peut changer de rucher.
- Une colonie peut changer de ruche.
- Une visite peut concerner un rucher entier, une ruche ou une colonie.
- Une tâche peut cibler plusieurs types d'entités métier.
- Le materiel appartient a une organisation et peut etre localise librement ou rattache optionnellement a un rucher.
- Le materiel ne doit pas etre rattache obligatoirement a une ruche ou une colonie au premier lot executable.

## Décision initiale

`DATA-00` garde le modèle au niveau documentaire. Aucun dossier `prisma/`, migration ou client de base de données n'est créé dans ce lot.

Le premier lot exécutable `DATA-01` devra se limiter au socle organisation, utilisateur, adhésion, rôles, permissions et activation de modules. Les entités apicoles opérationnelles restent différées.

## Décision DATA-01

`DATA-01` initialise Prisma avec un schéma minimal et une migration initiale. Le schéma exécutable couvre seulement:

- `Organization`;
- `User`;
- `Membership`;
- `Role`;
- `Permission`;
- `RolePermission`;
- `ModuleDefinition`;
- `OrganizationModule`;
- `UserModulePreference`.

Les modèles rucher, ruche, colonie, visite, tâche, sanitaire, documents, contacts, récoltes, IA et IoT restent hors schéma exécutable.

## Décision APIARY-01

`APIARY-01` ajoute les premiers modèles apicoles exécutables:

- `Apiary`: rucher ou site apicole rattaché à une organisation;
- `Hive`: matériel ruche identifié, éventuellement rattaché à un rucher;
- `Colony`: colonie vivante, éventuellement rattachée à une ruche.

Le modèle conserve la séparation entre le contenant (`Hive`) et le vivant (`Colony`). Les visites, tâches, sanitaire, documents, contacts, récoltes, IA et IoT restent hors schéma exécutable.

## Decision EQUIPMENT-00

`EQUIPMENT-00` cadre le futur module materiel sans modifier le schema executable. Le futur modele devra rester separe des ruches et des colonies pour eviter de transformer chaque element materiel en entite lourde.

Le suivi cible est hybride:

- quantites pour les consommables et elements nombreux;
- items individuels pour le materiel durable, couteux ou partage;
- evenements legers pour deplacement, nettoyage, maintenance, ajustement ou retrait du service.

Les achats, fournisseurs, prix, amortissements, comptabilite, destruction reglementaire complexe, IA et IoT restent hors perimetre.
