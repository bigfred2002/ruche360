# Stratégie Data

## Objectif

`DATA-00` prépare le passage du modèle conceptuel vers un schéma exécutable sans créer encore de migration, client Prisma ou logique métier.

La donnée doit rester multi-organisation, lisible par les agents de développement et suffisamment prudente pour un produit apicole public et collaboratif.

## Principes

- Toute donnée métier appartient à une organisation.
- Les identifiants techniques sont opaques et non signifiants.
- Les libellés terrain restent distincts des identifiants techniques.
- Les informations sensibles de localisation, documents, contacts et sanitaire doivent être minimisées.
- Les modules connectés et IA restent représentés comme capacités désactivées, sans données automatiques.
- Les suppressions métier futures devront privilégier l'archivage ou les statuts plutôt que la suppression dure.

## Conventions futures

- Les modèles Prisma utiliseront des noms singuliers en anglais.
- Les libellés UI et documentation restent en français.
- Les champs temporels communs seront `createdAt`, `updatedAt` et, si nécessaire, `archivedAt`.
- Les relations critiques devront toujours être reliées à `organizationId`.
- Les enums devront rester explicites et documentées.
- Les données JSON seront réservées aux préférences ou configurations extensibles, pas aux relations structurantes.

## Socle minimal visé par DATA-01

Le premier schéma exécutable devra couvrir seulement:

- `Organization`;
- `User`;
- `Membership`;
- `Role`;
- `Permission`;
- `ModuleDefinition`;
- `OrganizationModule`;
- `UserModulePreference`.

Ce socle suffit à préparer les organisations, les droits et l'activation modulaire sans créer de CRUD métier apicole.

## Entités métier à différer

Les entités suivantes restent conceptuelles jusqu'à leurs lots dédiés:

- `Apiary`;
- `Hive`;
- `Colony`;
- `Visit`;
- `Task`;
- `HealthObservation`;
- `VarroaRecord`;
- `HornetRecord`;
- `KnowledgeArticle`;
- `Contact`;
- `Document`;
- `Harvest`;
- configuration de ruche basse consommation.

## Données sensibles

Les données suivantes devront recevoir une attention spécifique avant implémentation:

- coordonnées exactes de ruchers;
- contacts personnels;
- documents importés;
- observations sanitaires;
- photos ou vidéos;
- données de capteurs;
- informations produites par IA.

## Hors périmètre DATA-00

- Aucun dossier `prisma/`.
- Aucune migration.
- Aucun client Prisma.
- Aucune dépendance ajoutée.
- Aucun CRUD.
- Aucun appel base de données.
