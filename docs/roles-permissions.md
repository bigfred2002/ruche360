# Rôles et Permissions

## Principes

Les permissions doivent être explicites, auditables et liées à une organisation. Un utilisateur peut avoir des rôles différents selon les organisations.

Les modules activés déterminent les surfaces disponibles. Les permissions déterminent les actions autorisées.

L'acces cible combine quatre conditions: module existant, module active pour l'organisation, module visible pour l'adhesion utilisateur-organisation et permission suffisante.

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

## Permissions futures à cadrer

| Permission | Description |
| --- | --- |
| `apiary_access.read` | Consulter les futures règles d'accès par rucher. |
| `apiary_access.write` | Donner ou retirer l'accès d'un membre à un rucher précis. |
| `apiary_access.manage` | Administrer le futur module de partage fin par rucher. |
| `transhumance.read` | Consulter les mouvements de ruches. |
| `transhumance.write` | Créer et modifier les mouvements de ruches. |
| `transhumance.manage` | Administrer les annulations, corrections et finalisations de mouvements. |

## Garde-fous

- Les permissions liées à un module désactivé ne donnent aucun accès visible.
- Les modules masques pour une adhesion ne doivent pas etre visibles pour ce membre.
- La desactivation d'un module ne supprime pas ses donnees.
- Le partage fin par rucher doit rester optionnel et ne remplace pas les roles d'organisation.
- La transhumance ne doit pas contourner les droits de lecture et d'ecriture sur ruchers et ruches.
- Les actions sanitaires ne valent pas prescription automatique.
- Les données connectées ou IA restent inactives tant que les modules correspondants sont désactivés.

## Décision RBAC-01

`RBAC-01` ajoute un catalogue TypeScript des rôles, permissions et modules. Ce catalogue est statique et ne crée pas encore de gestion applicative des rôles.

Fichiers principaux:

- `src/features/rbac/permissions.ts`;
- `src/features/rbac/roles.ts`;
- `src/features/rbac/modules.ts`;
- `src/features/rbac/access.ts`.

Les modules connectés et IA sont présents dans le catalogue avec `defaultEnabled: false`. Ils ne déclenchent aucun traitement actif.
