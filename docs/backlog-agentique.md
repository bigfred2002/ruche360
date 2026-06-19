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
| APIARY-01 | `codex/apiaries-hives-colonies` | Implémenter ruchers, ruches et colonies. |
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

## Format de lot recommandé

Chaque demande de lot devrait préciser:

- objectif;
- périmètre;
- hors périmètre;
- fichiers attendus;
- critères d'acceptation;
- commandes de validation Docker;
- consignes de Pull Request.
