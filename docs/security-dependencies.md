# Sécurité Et Dépendances

## Objectif

Ce document cadre le traitement des alertes de sécurité et des mises à jour de dépendances pour Rucher360.

Le dépôt est public. Les corrections doivent donc protéger à la fois:

- la confidentialité: aucun secret, donnée personnelle, export local ou fichier d'environnement ne doit être publié;
- la chaîne de développement: les validations passent par Docker Compose et la CI;
- la stabilité produit: une mise à jour de dépendance ne doit pas introduire de fonctionnalité métier ni modifier le périmètre.

## Périmètre Du Lot `SECURITY-DEPENDENCIES-00`

Ce lot prépare le traitement sécurité sans corriger les versions applicatives.

Inclus:

- configuration Dependabot pour `npm`, GitHub Actions et Docker;
- procédure de revue des alertes;
- règles de décision pour grouper ou isoler une mise à jour;
- commandes de validation obligatoires;
- documentation des risques et prochaines étapes.

Exclus:

- montée de version manuelle des dépendances;
- ajout de nouvelle dépendance;
- refonte Docker;
- changement fonctionnel applicatif;
- auth, Prisma supplémentaire, module métier, IA ou IoT actif.

## Sources D'Alertes

Les alertes à surveiller sont:

- GitHub Dependabot alerts;
- Pull Requests Dependabot;
- résultat de `make security-scan`;
- CI GitHub Actions `Validate Docker app`;
- revue humaine des fichiers publics avant merge.

Dependabot est configuré pour ouvrir des PR hebdomadaires sur:

- les dépendances npm/pnpm du projet;
- les actions GitHub;
- les images Docker déclarées dans les Dockerfiles du dépôt.

## Règles De Traitement

Une alerte critique ou haute doit être traitée dans un lot dédié prioritaire.

Une alerte modérée peut être groupée avec des mises à jour proches si:

- le groupe reste cohérent, par exemple Next, React, Prisma ou outillage;
- les validations Docker passent;
- la PR reste lisible et réversible.

Une mise à jour majeure doit être isolée si elle touche:

- Next.js;
- React;
- Prisma;
- TypeScript;
- ESLint;
- l'image Node;
- PostgreSQL;
- GitHub Actions ou le runner local.

Une mise à jour ne doit jamais être mergée si:

- elle échoue en CI;
- elle modifie le périmètre produit;
- elle introduit une dépendance non justifiée;
- elle contourne Docker Compose;
- elle expose un secret, une donnée personnelle ou un export local.

## Workflow Recommandé

1. Créer ou utiliser une PR Dependabot dédiée.
2. Lire l'alerte et identifier le composant touché.
3. Vérifier le changelog du composant si la mise à jour est majeure ou sensible.
4. Confirmer que la PR ne contient que les fichiers attendus.
5. Exécuter les validations locales via Docker Compose.
6. Laisser la CI GitHub passer.
7. Squash merge uniquement si la PR est claire, verte et limitée.
8. Documenter les décisions dans `docs/journal.md` si la mise à jour a un impact architectural.

## Validations Obligatoires

Pour une PR de sécurité ou dépendances:

```bash
git diff --check
make security-scan
docker compose config
docker compose run --rm app pnpm install
docker compose run --rm app pnpm prisma validate
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
```

Les commandes Node, pnpm, Prisma ou Next.js restent interdites directement sur le Mac.

## Confidentialité

Avant chaque push:

```bash
make install-security-hooks
make security-scan
```

Le hook local bloque notamment:

- fichiers `.env` non exemple;
- clés privées;
- dumps ou bases locales;
- exports Stitch;
- motifs de tokens ou mots de passe;
- emails ou numéros de téléphone détectés dans les changements poussés.

Ce contrôle est un garde-fou. Il ne remplace pas une revue humaine.

## Backlog Sécurité Proposé

### `SECURITY-DEPENDENCIES-01`

Traiter les alertes Dependabot ouvertes.

Objectif:

- identifier les vulnérabilités exactes;
- appliquer les mises à jour minimales;
- garder des PR petites et validées par Docker/CI.

### `SECURITY-CI-01`

Durcir la CI sans alourdir le développement.

Pistes:

- rendre `Validate Docker app` obligatoire sur `main`;
- ajouter un contrôle de lockfile si nécessaire;
- ajouter une étape d'audit uniquement si elle fonctionne de manière fiable via Docker Compose.

### `SECURITY-SECRETS-01`

Renforcer la détection de secrets.

Pistes:

- évaluer un outil dédié type Gitleaks ou TruffleHog;
- décider s'il doit tourner en local, en CI, ou les deux;
- éviter les faux positifs qui bloqueraient les lots normaux.

### `SECURITY-RUNNER-01`

Revoir le runner GitHub local.

Pistes:

- confirmer qu'il reste manuel;
- documenter la rotation du token d'enregistrement;
- vérifier les risques liés au socket Docker;
- éviter toute exécution automatique sur PR publique non relue.

## Définition De Done

Un lot sécurité est terminé quand:

- les fichiers modifiés sont strictement dans son périmètre;
- aucun secret ou donnée personnelle n'est détecté;
- les validations Docker passent;
- la CI GitHub est verte;
- les décisions sont documentées;
- la PR reste lisible et mergée par squash.
