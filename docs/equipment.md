# Module Materiel

## Objectif

Le module `Materiel` doit aider une organisation apicole a savoir quel materiel est disponible, ou il se trouve et dans quel etat il est, sans transformer Rucher360 en ERP de stock, achat ou comptabilite.

Le module est concu comme une capacite apicole activable par organisation. Il doit rester utile sur le terrain, lisible sur mobile et raccordable plus tard aux ruchers, visites, taches, recoltes et suivis sanitaires.

## Materiel a couvrir

Les categories initiales doivent rester proches des usages apicoles courants:

- materiel de ruche: corps, hausses, cadres, cires, couvre-cadres, planchers, reducteurs d'entree, nourrisseurs;
- outils terrain: enfumoir, leve-cadres, brosse, pince a cadre, caisse de visite;
- protection: vareuse, combinaison, voile, gants, bottes;
- nourrissement et sanitaire: nourrisseurs, contenants, consommables, traitements references sans prescription automatique;
- recolte: extracteur, couteau ou fourchette a desoperculer, maturateur, seaux alimentaires, filtres, pots;
- transport, stockage et nettoyage: sangles, caisses, bacs, produits de nettoyage ou de desinfection.

Ce cadrage s'appuie sur les references metier suivantes:

- [MAAREC / University of Delaware](https://canr.udel.edu/maarec/beekeeping-equipment/): composants de ruche, protections, enfumoir, leve-cadres et equipements de recolte;
- [University of Georgia Bee Program](https://bees.caes.uga.edu/beekeeping-resources/getting-started-topics/getting-started-beekeeping-equipment.html): enfumoir, leve-cadres, voile, gants et nourrisseurs;
- [Arkansas Extension](https://www.uaex.uada.edu/farm-ranch/special-programs/beekeeping/uabeeblog/posts/uncapping-honey.aspx): extraction du miel, desoperculation et reutilisation des cadres;
- [Honey Bee Health Coalition](https://honeybeehealthcoalition.org/wp-content/uploads/2019/01/HBHC_Hive_BMPs_v1.0_reduced.pdf): nettoyage ou desinfection des outils, gants et enfumoirs entre ruchers ou inspections.

## Niveau de suivi

Le suivi retenu est hybride:

- les consommables ou elements nombreux sont suivis en quantite;
- les equipements durables, couteux ou partages sont suivis individuellement;
- certains types peuvent accepter les deux modes selon l'organisation.

Exemples:

| Type | Mode recommande |
| --- | --- |
| Cadres, cire, pots, consommables | Quantite |
| Extracteur, enfumoir, combinaison, caisse de visite | Individuel |
| Nourrisseurs, hausses, bacs | Hybride selon usage |

## Statuts simples

Les statuts doivent rester operationnels:

- disponible;
- en usage;
- a nettoyer;
- en maintenance;
- retire du service;
- perdu.

Un statut `retire du service` suffit au depart. Aucune gestion de destruction reglementaire complexe n'est creee dans le premier perimetre.

## Architecture cible

Le module doit etre isole dans un domaine dedie:

- catalogue module: `equipment`;
- permissions cible: `equipment.read`, `equipment.write`, puis `equipment.manage` si une administration du catalogue est necessaire;
- dossier cible: `src/features/equipment`;
- modele data cible: types de materiel, stock en quantite, items individuels, evenements legers.

Relations minimales:

- tout materiel appartient a une organisation;
- un emplacement peut etre libre ou lie optionnellement a un rucher;
- aucun lien obligatoire avec ruche ou colonie au depart.

Relations futures possibles:

- visite vers materiel utilise;
- tache vers materiel necessaire;
- recolte vers materiel d'extraction;
- rucher vers materiel stocke sur site;
- sanitaire vers materiel a nettoyer ou desinfecter.

## Navigation cible

Le module ne doit pas alourdir la navigation mobile.

Approche recommandee:

- carte `Materiel` dans le cockpit;
- entree dans l'ecran ou la zone `Modules`;
- lien secondaire dans la sidebar desktop si l'espace le permet;
- resume `Materiel sur place` dans le detail d'un rucher plus tard;
- checklist materiel dans une visite ou une tache seulement dans un lot ulterieur.

Ecrans envisages:

- `/equipment`: inventaire general;
- `/equipment/items`: materiel individuel;
- `/equipment/stock`: consommables;
- `/equipment/maintenance`: nettoyage et reparation;
- `/equipment/types`: catalogue de types;
- preparation de visite uniquement plus tard.

## Hors perimetre initial

Le module ne doit pas introduire:

- achats;
- fournisseurs;
- prix;
- amortissement;
- comptabilite;
- marketplace;
- destruction reglementaire complexe;
- IoT actif;
- IA active;
- prescription sanitaire automatique;
- etiquetage public ou commercial.

Un futur QR code interne peut etre etudie separement, sans le confondre avec un module d'etiquetage produit.

## Sequence de lots

### EQUIPMENT-00

- Cadrer le module dans la documentation.
- Identifier les categories, limites, risques UX et lots suivants.
- Ne pas creer de code metier, migration, route ou CRUD.

### EQUIPMENT-01

- Ajouter le module `equipment` au catalogue modulaire.
- Ajouter les permissions dediees.
- Ajouter le modele de donnees minimal.
- Ne pas creer d'interface CRUD complete.

### EQUIPMENT-SHELL-01

- Ajouter un ecran inventaire mobile-first.
- Ajouter des cartes et filtres statiques ou semi-statiques.
- Garder les actions non operationnelles tant que le CRUD n'existe pas.

### EQUIPMENT-CRUD-01

- Ajouter les actions serveur securisees par organisation et permissions.
- Permettre creation et modification minimale.
- Permettre ajustement de quantite, changement de statut et deplacement simple.

## Critere de reussite produit

Le module est reussi s'il aide l'apiculteur a preparer et suivre son materiel sans creer une charge de saisie disproportionnee. Le produit doit privilegier statut, quantite, emplacement, note et historique leger plutot qu'une gestion commerciale complete.
