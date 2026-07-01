# Cartographie des Modules et Fonctions

## Objectif

Ce document aide a comprendre les fonctions de Rucher360 par module. Il sert aussi de guide pour ranger une nouvelle fonctionnalite au bon endroit et eviter les modules trop gros ou trop dependants.

## Statuts

- `Socle`: necessaire au fonctionnement general.
- `Initial`: prevu dans le produit apicole de base.
- `A cadrer`: besoin identifie, implementation differree.
- `Desactive`: capacite prevue mais inactive tant qu'un lot dedie ne l'active pas.
- `Hors perimetre`: ne doit pas etre prepare comme fonction initiale.

## Modules socle

| Module | Statut | Responsabilite | Donnees principales | Points de vigilance |
| --- | --- | --- | --- | --- |
| Organisations | Socle | Espaces de travail apicoles | `Organization` | Toute donnee metier doit rester rattachee a une organisation. |
| Utilisateurs et adhesions | Socle | Comptes et acces organisationnels | `User`, `Membership` | Un utilisateur peut avoir plusieurs organisations. |
| Roles et permissions | Socle | Actions autorisees | `Role`, `Permission`, `RolePermission` | Une permission ne contourne jamais un module desactive. |
| Modules | Socle | Activation des fonctions | `ModuleDefinition`, `OrganizationModule`, futur `MembershipModulePreference` | Desactiver masque et bloque, sans supprimer. |

## Administration et gouvernance

L'administration doit rester une surface transverse d'organisation, pas un module metier apicole concurrent.

| Surface | Statut | Responsabilite | Donnees principales | Points de vigilance |
| --- | --- | --- | --- | --- |
| Centre d'administration organisation | A cadrer | Superviser membres, roles, modules, volumes de donnees, securite et archivage | Donnees existantes par organisation | Completer `organizations`, `users_roles` et `modules` sans les dupliquer. |
| Journal d'activite metier | A cadrer | Tracer les actions importantes de l'organisation | Modele cible a definir | Distinct de l'audit dependances et sans stockage de secrets. |
| Cycle de vie des donnees | A cadrer | Archiver, conserver et restaurer selon les modules | `archivedAt`, statuts et historiques | Eviter la suppression dure et proteger localisation, sanitaire, contacts et documents. |
| Administration plateforme | A cadrer | Exploitation technique globale future | Roles plateforme cibles | Separee des organisations apicoles et dependante d'une authentification reelle. |

## Modules apicoles initiaux

| Module | Statut | Responsabilite | Donnees principales | Liens optionnels |
| --- | --- | --- | --- | --- |
| Ruchers | Initial | Sites apicoles et acces terrain | `Apiary` | Ruches, visites, taches, documents, materiel. |
| Ruches | Initial | Contenants mobiles identifies | `Hive` | Rucher courant, colonie, transhumance. |
| Colonies | Initial | Vivant suivi dans le temps | `Colony` | Ruche courante, visites, sanitaire. |
| Visites | Initial | Observations et interventions | `Visit` cible | Rucher, ruche, colonie, taches, materiel. |
| Taches | Initial | Actions a planifier et suivre | `Task` cible | Toute entite metier selon besoin. |
| Sanitaire | Initial | Observations sanitaires simples | `HealthObservation` cible | Ruches, colonies, taches. |
| Varroa | Initial | Suivi dedie du varroa | `VarroaRecord` cible | Sanitaire, visites, taches. |
| Frelon | Initial | Signalements et pression frelon | `HornetRecord` cible | Ruchers, taches. |
| Recoltes simples | Initial | Quantites recoltees et notes | `Harvest` cible | Rucher, ruche, materiel de recolte. |

## Modules support

| Module | Statut | Responsabilite | Donnees principales | Points de vigilance |
| --- | --- | --- | --- | --- |
| Base de connaissance | Initial | Fiches et procedures internes | `KnowledgeArticle` cible | Assistant IA desactive. |
| Contacts utiles | Initial | Interlocuteurs internes et externes | `Contact` cible | Donnees personnelles a minimiser. |
| Documents | Initial | Pieces jointes et references | `Document` cible | Stockage et confidentialite a cadrer. |
| Configuration basse consommation | Initial | Preparation de ruches sobres | Configuration cible | Aucun IoT actif. |

## Modules apicoles a cadrer

| Module | Statut | Responsabilite | Pourquoi differer |
| --- | --- | --- | --- |
| Materiel | A cadrer | Inventaire leger, emplacements, statuts | Eviter de creer un ERP achats/stock trop tot. |
| Transhumance | A cadrer | Mouvements de ruches entre sites | Necessite historique clair sans deplacer le rucher. |
| Partage fin par rucher | A cadrer | Acces a certains ruchers uniquement | Le partage organisationnel suffit d'abord. |

## Modules connectes desactives

| Module | Statut | Raison de desactivation |
| --- | --- | --- |
| Balance connectee | Desactive | Necessite protocole IoT, energie, stockage et validation. |
| Meteo de rucher | Desactive | Necessite choix fournisseur, couts et politique donnees. |
| Camera | Desactive | Necessite cadrage images, confidentialite, energie et stockage. |
| Capteurs | Desactive | Necessite protocole materiel. |
| GPS | Desactive | Necessite precision, confidentialite et securite de localisation. |

## Modules IA desactives

| Module | Statut | Raison de desactivation |
| --- | --- | --- |
| Analyse de visite | Desactive | Aucun traitement automatique sans garde-fous. |
| Assistant connaissance | Desactive | Sources, responsabilite et hallucinations a cadrer. |
| Reconnaissance d'espece | Desactive | Validation image et jeu de donnees requis. |
| Comptage varroa | Desactive | Risque sanitaire et responsabilite metier. |

## Hors perimetre initial

| Fonction | Raison |
| --- | --- |
| Etiquetage commercial | Hors cible initiale. |
| Marketplace | Introduit paiement, moderation et contrats. |
| Paiement | Besoin produit et legal separe. |
| Comptabilite complete | Trop large pour le coeur apicole initial. |
| Prescription sanitaire automatique | Risque metier et responsabilite. |

## Regle pour classer une nouvelle fonction

Avant d'ajouter une fonction, repondre a ces questions:

1. Quelle organisation possede la donnee?
2. Quel module est proprietaire?
3. Le module doit-il etre activable?
4. Quelle permission lit ou modifie la donnee?
5. La fonction garde-t-elle ses donnees si le module est desactive?
6. Existe-t-il un lien avec un autre module, et ce lien peut-il rester optionnel?
7. Quel hors perimetre doit etre documente pour eviter le glissement?

Si une fonction touche plusieurs modules, elle doit devenir un lot de cadrage avant le code.
