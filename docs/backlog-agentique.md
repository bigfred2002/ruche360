# Backlog Agentique

Ce backlog propose des micro-lots successifs. Chaque lot doit rester livrable en Pull Request.

## Lots proposés

| Lot | Branche proposée | Objectif |
| --- | --- | --- |
| REPO-INIT-01 | `codex/repo-init-01` | Préparer le dépôt documentaire et les règles agentiques. |
| STACK-01 | `codex/stack-docker-compose` | Choisir et scaffolder la stack applicative avec Docker Compose. |
| DATA-01 | `codex/data-model-prisma` | Créer le schéma de données initial et les migrations dans le conteneur. |
| AUTH-01 | `codex/auth-organizations` | Poser comptes, organisations et adhésions. |
| RBAC-01 | `codex/rbac-modules` | Implémenter rôles, permissions et activation de modules. |
| ARCHITECTURE-DOCS-00 | `codex/architecture-docs-00` | Produire la cartographie logique, modules et gouvernance sprints. |
| MODULES-DYNAMIC-00 | `codex/modules-dynamic-00` | Cadrer profils, modules dynamiques, partage et transhumance. |
| MODULES-DYNAMIC-01 | `codex/modules-dynamic-01` | Ajouter preferences de modules par adhesion et helpers de calcul. |
| MODULES-REGISTRY-01 | `codex/modules-registry-01` | Creer la registry applicative des modules. |
| USER-PROFILE-MODULES-01 | `codex/user-profile-modules-01` | Choisir les modules visibles lors de creation ou modification d'un membre. |
| APIARY-01 | `codex/apiaries-hives-colonies` | Implémenter ruchers, ruches et colonies. |
| EQUIPMENT-00 | `codex/equipment-00` | Cadrer le module materiel apicole sans code metier. |
| EQUIPMENT-01 | `codex/equipment-01` | Ajouter module, permissions et modele minimal du materiel. |
| EQUIPMENT-SHELL-01 | `codex/equipment-shell-01` | Ajouter un ecran inventaire mobile-first sans CRUD complet. |
| EQUIPMENT-CRUD-01 | `codex/equipment-crud-01` | Ajouter les actions serveur minimales du materiel. |
| APIARY-ACCESS-00 | `codex/apiary-access-00` | Cadrer le partage fin par rucher si le besoin est confirme. |
| TRANSHUMANCE-00 | `codex/transhumance-00` | Cadrer la transhumance comme mouvement de ruches entre sites. |
| HIVE-MOVEMENTS-01 | `codex/hive-movements-01` | Ajouter le modele executable des mouvements de ruches. |
| VISITS-01 | `codex/visits-tasks` | Implémenter visites et tâches. |
| HEALTH-01 | `codex/health-varroa-hornet` | Implémenter sanitaire, varroa et frelon. |
| CONTENT-01 | `codex/knowledge-contacts-documents` | Implémenter connaissance, contacts et documents. |
| HARVEST-01 | `codex/simple-harvests` | Implémenter les récoltes simples. |
| LOWPOWER-01 | `codex/low-power-config` | Implémenter la configuration basse consommation. |

## Lots à garder désactivés

Ces lots ne doivent pas être lancés avant validation produit et technique:

- `IOT-01`: balance, météo, caméra, capteurs, GPS;
- `AI-01`: analyse de visite, assistant connaissance, reconnaissance d'espèce, comptage varroa;
- `BILLING-01`: paiement;
- `MARKET-01`: marketplace;
- `ACCOUNTING-01`: comptabilité complète.
- `EQUIPMENT-PURCHASES-01`: achats, fournisseurs et couts du materiel, a cadrer seulement si le besoin devient prioritaire.

## Format de lot recommandé

Chaque demande de lot devrait préciser:

- objectif;
- périmètre;
- hors périmètre;
- fichiers attendus;
- critères d'acceptation;
- commandes de validation Docker;
- consignes de Pull Request.

La gouvernance detaillee des lots et sprints est documentee dans [Gouvernance des Lots et Sprints](sprint-governance.md).
