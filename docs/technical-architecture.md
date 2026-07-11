# Architecture Technique

## Position actuelle

Le dépôt contient un socle Next.js App Router, TypeScript, Tailwind CSS, Docker Compose, Prisma, PostgreSQL et un shell applicatif mobile-first. Les lots data et métier déjà intégrés posent un modèle multi-organisation, un seed de développement fictif, les modèles ruchers/ruches/colonies, matériel et transhumance.

## Contraintes structurantes

- Développement containerisé avec Docker Compose.
- Ne pas supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur la machine hôte.
- Les commandes projet futures doivent être documentées sous forme `docker compose ...`.
- Les commandes pnpm doivent passer par `docker compose run --rm app pnpm ...`.
- `node_modules` doit rester dans un volume Docker.
- Les secrets locaux vivent dans `.env`, jamais dans Git.
- `.env.example` sert de contrat minimal non secret.

## Architecture cible pressentie

L'architecture cible devra rester modulaire:

- application web;
- base de données relationnelle;
- stockage documentaire;
- système de rôles et permissions;
- activation de modules par organisation et utilisateur;
- jobs ou traitements asynchrones uniquement quand un lot dédié les introduit.

La logique produit transversale est detaillee dans [Architecture Logique de Rucher360](application-architecture.md). La cartographie des modules est detaillee dans [Cartographie des Modules et Fonctions](module-function-map.md).

Diagrammes complementaires:

- [Architecture technique Docker-first](diagrams/svg/architecture-technique.svg)
- [Workflow agentique de micro-lot](diagrams/svg/workflow-agentique.svg)

## Docker Compose

Le fichier `docker-compose.yml` définit:

- `app`: service prévu pour Next.js, construit depuis `Dockerfile.dev`;
- `db`: PostgreSQL 16 Alpine;
- `node_modules`: volume Docker pour les dépendances Node;
- `pnpm_store`: volume Docker pour le store pnpm;
- `postgres_data`: volume persistant PostgreSQL.

Tant que `package.json` n'existe pas, le service `app` ne force aucune initialisation et reste en attente.

## Images Docker

`Dockerfile.dev` sert au développement. Il active Corepack, expose le port 3000 et lance `pnpm dev`.

`Dockerfile` prépare une image de production future pour l'application Next.js.

## Exploitation et hebergement

Le developpement reste local et Docker-first. La beta privee pourra etre
hebergee sur un Synology compatible Container Manager; une cible VPS europeenne
est prevue lorsque la disponibilite et le nombre d'organisations l'exigeront.
Dans les deux cas, PostgreSQL reste sur un reseau prive et les sauvegardes
chiffrees sont conservees hors de l'hote. Le cadrage et les lots ulterieurs
sont decrits dans [Hebergement](deployment-home.md).

`DEPLOY-PROD-ARCHITECTURE-00` precise l'architecture cible de production:
un seul point d'entree HTTPS public, application Docker isolee, PostgreSQL prive,
secrets injectes hors Git et sauvegardes chiffrees hors hote. Le detail est
documente dans [Architecture De Production](deployment-production.md).

`BACKUP-RESTORE-00` cadre la strategie initiale de sauvegarde et restauration:
dump logique PostgreSQL chiffre hors hote pour la beta privee, restauration
testee, puis evolution future vers sauvegardes physiques et PITR si les
objectifs RPO/RTO l'exigent. Le detail est documente dans
[Sauvegarde Et Restauration](backup-restore.md).

## Commandes prévues

```bash
docker compose build app
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
docker compose run --rm app pnpm seed:dev
```

## Modules désactivés

Les modules connectés et IA doivent être représentés comme capacités prévues mais désactivées. Ils ne doivent pas appeler de fournisseur externe, de modèle IA, de caméra, de capteur ou de service météo dans le périmètre initial.

## Sécurité et confidentialité

- Les données de rucher peuvent être sensibles, notamment la localisation.
- Les rôles doivent limiter l'accès par organisation.
- Les documents peuvent contenir des informations personnelles ou sanitaires.
- Les futures fonctionnalités GPS, caméra et IA devront avoir un cadrage spécifique avant activation.

## Validation future

Les tests et validations doivent s'exécuter dans Docker Compose. Les commandes de référence sont documentées dans `README.md`, `AGENTS.md` et les lots concernés.

## Stratégie data

Le schéma exécutable démarre par les organisations, utilisateurs, adhésions, rôles, permissions et modules activables. Les entités rucher, ruche, colonie, matériel et transhumance disposent maintenant d'un socle exécutable. Les visites, tâches, sanitaire détaillé, récoltes, documents, IA et IoT restent différés jusqu'aux lots dédiés.
