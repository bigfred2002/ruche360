# Modules

## Principe

Rucher360 est modulaire. Un module peut être:

- disponible dans le produit;
- activé ou désactivé pour une organisation;
- activé ou désactivé pour un utilisateur selon ses droits;
- visible ou masqué dans l'interface.

Un module désactivé ne doit pas exécuter de traitement métier, exposer d'action opérationnelle ou suggérer une automatisation.

## Modules initiaux actifs

| Module | Niveau | Description |
| --- | --- | --- |
| Organisations | Organisation | Gestion des organisations apicoles. |
| Utilisateurs et rôles | Organisation | Invitations, rôles et permissions. |
| Ruchers | Organisation | Sites apicoles et localisation descriptive. |
| Ruches | Organisation | Matériel, identification et état. |
| Colonies | Organisation | Suivi du vivant indépendamment du matériel. |
| Visites | Organisation | Observations et interventions. |
| Tâches | Organisation et utilisateur | Actions à faire, planifier ou clôturer. |
| Sanitaire | Organisation | Observations sanitaires simples. |
| Varroa | Organisation | Comptages, traitements et suivi dédié. |
| Frelon | Organisation | Signalements, pression et actions. |
| Base de connaissance | Organisation | Articles, fiches et procédures internes. |
| Contacts | Organisation | Contacts utiles et partenaires. |
| Documents | Organisation | Fichiers et documents liés au métier. |
| Récoltes simples | Organisation | Suivi minimal des récoltes. |
| Configuration basse consommation | Organisation | Paramètres préparatoires pour ruches sobres. |

## Modules connectés prévus mais désactivés

| Module | Etat initial | Raison |
| --- | --- | --- |
| Balance | Désactivé | Nécessite un lot IoT dédié. |
| Météo | Désactivé | Nécessite choix fournisseur et règles de données. |
| Caméra | Désactivé | Nécessite cadrage stockage, confidentialité et énergie. |
| Capteurs | Désactivé | Nécessite protocole matériel. |
| GPS | Désactivé | Nécessite règles de précision et confidentialité. |

## Modules IA prévus mais désactivés

| Module | Etat initial | Raison |
| --- | --- | --- |
| Analyse de visite | Désactivé | Aucune automatisation IA dans le périmètre initial. |
| Assistant connaissance | Désactivé | Nécessite cadrage sources et garde-fous. |
| Reconnaissance d'espèce | Désactivé | Nécessite jeu de données et validation terrain. |
| Comptage varroa | Désactivé | Nécessite validation image et responsabilité métier. |

## Hors périmètre module

Les modules suivants ne doivent pas être préparés comme fonctionnalités initiales:

- étiquetage;
- achats et gestion fournisseurs;
- marketplace;
- paiement;
- comptabilité complète;
- IoT actif;
- IA automatique;
- prescription sanitaire automatique.

## Module materiel cadre

Le module `Materiel` est cadre pour un lot dedie, mais il n'est pas encore ajoute au catalogue executable. Il est prevu comme module apicole activable sans alourdir la navigation. Il couvrira l'inventaire terrain, les emplacements et les statuts simples du materiel. Il ne couvrira pas les achats, prix, amortissements, fournisseurs, destruction reglementaire complexe, IA, IoT ou prescription sanitaire automatique.

Le cadrage detaille est documente dans [Module Materiel](equipment.md).
