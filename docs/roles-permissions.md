# Rôles et Permissions

## Principes

Les permissions doivent être explicites, auditables et liées à une organisation. Un utilisateur peut avoir des rôles différents selon les organisations.

Les modules activés déterminent les surfaces disponibles. Les permissions déterminent les actions autorisées.

## Rôles de départ

| Rôle | Description |
| --- | --- |
| Propriétaire | Contrôle complet de l'organisation, des utilisateurs, des modules et des données. |
| Administrateur | Gestion opérationnelle large, hors transfert de propriété. |
| Gestionnaire rucher | Gestion des ruchers, ruches, colonies, visites et tâches. |
| Intervenant | Saisie de visites, observations et tâches assignées. |
| Lecteur | Consultation sans modification. |
| Référent sanitaire | Accès renforcé aux suivis sanitaire, varroa et frelon. |

## Permissions conceptuelles

| Permission | Description |
| --- | --- |
| `organization.manage` | Modifier l'organisation et ses paramètres. |
| `users.manage` | Inviter, retirer et modifier les utilisateurs. |
| `roles.manage` | Attribuer les rôles. |
| `modules.manage` | Activer ou désactiver les modules. |
| `apiaries.read` | Consulter les ruchers. |
| `apiaries.write` | Créer et modifier les ruchers. |
| `hives.read` | Consulter les ruches. |
| `hives.write` | Créer et modifier les ruches. |
| `colonies.read` | Consulter les colonies. |
| `colonies.write` | Créer et modifier les colonies. |
| `visits.read` | Consulter les visites. |
| `visits.write` | Créer et modifier les visites. |
| `tasks.read` | Consulter les tâches. |
| `tasks.write` | Créer et modifier les tâches. |
| `health.read` | Consulter le sanitaire. |
| `health.write` | Créer et modifier les observations sanitaires. |
| `knowledge.read` | Consulter la base de connaissance. |
| `knowledge.write` | Créer et modifier les contenus de connaissance. |
| `documents.read` | Consulter les documents. |
| `documents.write` | Ajouter et modifier les documents. |
| `contacts.read` | Consulter les contacts. |
| `contacts.write` | Créer et modifier les contacts. |
| `harvests.read` | Consulter les récoltes. |
| `harvests.write` | Créer et modifier les récoltes. |

## Garde-fous

- Les permissions liées à un module désactivé ne donnent aucun accès visible.
- Les actions sanitaires ne valent pas prescription automatique.
- Les données connectées ou IA restent inactives tant que les modules correspondants sont désactivés.
