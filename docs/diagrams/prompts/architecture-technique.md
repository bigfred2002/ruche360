# Prompt Archify - Architecture Technique

Utilise Archify pour creer un diagramme d'architecture technique de Rucher360.

Contexte:

- Application Next.js App Router.
- TypeScript et Tailwind CSS.
- Prisma pour l'acces PostgreSQL.
- Docker Compose obligatoire pour le developpement.
- Service `app` pour Next.js.
- Service `db` pour PostgreSQL.
- Volumes Docker: `node_modules`, `pnpm_store`, `postgres_data`.
- Les commandes Node, pnpm, Prisma et Next.js passent par Docker Compose.
- GitHub Actions execute la CI Docker-first.
- Un runner GitHub local Docker existe pour validations manuelles de code de confiance uniquement.
- Le depot est public et protege par un hook pre-push, `make security-scan`, `make secrets-scan` et Gitleaks.

Elements a dessiner:

- Developpeur.
- GitHub repository public.
- Branche `codex/*`.
- Pull Request.
- GitHub Actions CI.
- Runner local Docker manuel.
- Docker Compose.
- Service `app`.
- Service `db`.
- Prisma Client.
- PostgreSQL.
- Hook pre-push et scans de secrets.

Mettre en evidence:

- aucune installation Node/pnpm/Prisma requise sur le Mac;
- le runner local ne s'execute pas sur les Pull Requests publiques non relues;
- les secrets restent hors Git;
- les validations passent avant merge.

Contraintes de sortie:

- Ne pas afficher de nom de machine, chemin local, token ou secret.
- Ne pas afficher de donnees reelles.
- Distinguer CI GitHub standard et runner local manuel.
