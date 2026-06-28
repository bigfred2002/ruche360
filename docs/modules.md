# Modules

## Principe

Rucher360 est modulaire. Un module peut être:

- disponible dans le produit;
- activé ou désactivé pour une organisation;
- activé ou désactivé pour un utilisateur selon ses droits;
- visible ou masqué dans l'interface.

Un module désactivé ne doit pas exécuter de traitement métier, exposer d'action opérationnelle ou suggérer une automatisation.

## Activation dynamique

L'activation cible d'une fonction repose sur quatre niveaux:

- le module existe dans le catalogue produit;
- l'organisation active ou desactive le module;
- l'adhesion utilisateur-organisation rend le module visible ou non pour un membre;
- les permissions du role autorisent les actions.

Desactiver un module masque ses surfaces et bloque ses actions, mais ne supprime jamais ses donnees.

Le cadrage detaille est documente dans [Modules Dynamiques](dynamic-modules.md).

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
| Matériel | Organisation | Socle executable d'inventaire materiel, sans ecran ni CRUD complet. |
| Configuration basse consommation | Organisation | Paramètres préparatoires pour ruches sobres. |

## Modules apicoles a cadrer

| Module | Etat initial | Raison |
| --- | --- | --- |
| Transhumance | Cadre, optionnel | Est modelisee comme mouvement de ruches entre sites sans deplacer le rucher. |
| Partage fin par rucher | Cadre, optionnel | Le partage initial passe deja par l'organisation; le module `apiary_access` ne sera utile que pour limiter certains sites a certains membres. |

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

## Module materiel

Le module `Materiel` est ajoute au catalogue executable dans `EQUIPMENT-01`. Il est prevu comme module apicole activable sans alourdir la navigation. Il couvre le socle de donnees pour l'inventaire terrain, les emplacements et les statuts simples du materiel. Il ne couvre pas les achats, prix, amortissements, fournisseurs, destruction reglementaire complexe, IA, IoT ou prescription sanitaire automatique.

Son ecran d'inventaire reste prevu dans `EQUIPMENT-SHELL-01`; aucune action CRUD complete n'est active dans `EQUIPMENT-01`.

Le cadrage detaille est documente dans [Module Materiel](equipment.md).

## Partage et transhumance

Le partage initial d'un rucher se fait par l'organisation, les roles et les permissions. Un partage fin par rucher pourra devenir un module optionnel si le besoin est confirme.

La transhumance ne doit pas deplacer le rucher lui-meme. Elle doit etre modelisee comme un mouvement de ruches ou de lots de ruches entre sites.

Le cadrage detaille est documente dans [Partage de Rucher et Transhumance](apiary-sharing-transhumance.md).
Le cadrage specialise du partage fin est documente dans [Partage Fin Par Rucher](apiary-access.md).
Le cadrage specialise de la transhumance est documente dans [Transhumance](transhumance.md).
