# Runner GitHub local Docker

Ce lot prépare un runner GitHub Actions auto-hébergé dans Docker pour exécuter des validations DevSecOps locales de Rucher360.

## Position de sécurité

Le dépôt est public. Un runner auto-hébergé ne doit pas exécuter automatiquement du code provenant de Pull Requests non fiables.

Le workflow local fourni est donc volontairement manuel avec `workflow_dispatch`. Il n'est pas branché sur `pull_request` et ne remplace pas la CI GitHub hébergée.

Le runner monte le socket Docker de la machine hôte. Cela permet d'exécuter `docker compose`, mais donne aussi aux jobs un contrôle élevé sur Docker local. Il doit être utilisé uniquement sur du code de confiance.

Références:

- GitHub documente l'ajout de runners auto-hébergés et précise que le jeton d'enregistrement est temporaire.
- GitHub recommande de limiter les runners auto-hébergés avec les dépôts publics, car une contribution externe peut exécuter du code dangereux si le workflow l'autorise.

## Fichiers

- `Dockerfile.github-runner`: image locale du runner GitHub Actions.
- `docker-compose.runner.yml`: service `github-runner` séparé du Compose applicatif.
- `runner.env.example`: modèle sans secret pour créer le fichier local `runner.env`.
- `.github/workflows/local-runner-validation.yml`: workflow manuel ciblant le runner local.

## Préparer le fichier local

Copier le modèle:

```bash
cp runner.env.example runner.env
```

Le fichier `runner.env` est ignoré par Git et ne doit jamais être commité.

Dans GitHub:

1. Ouvrir `Settings`.
2. Ouvrir `Actions` puis `Runners`.
3. Créer un nouveau runner auto-hébergé pour le dépôt.
4. Copier uniquement le jeton d'enregistrement temporaire.
5. Coller cette valeur dans `RUNNER_REGISTRATION` dans `runner.env`.

Le jeton expire rapidement. Si le démarrage échoue pour expiration, générer un nouveau jeton côté GitHub.

## Commandes

Valider la configuration:

```bash
make runner-config
```

Construire l'image:

```bash
make runner-build
```

Démarrer le runner:

```bash
make runner-up
```

Suivre les logs:

```bash
make runner-logs
```

Arrêter le runner:

```bash
make runner-down
```

## Workflow local

Le workflow `Local Runner Validation` s'exécute uniquement à la demande depuis l'onglet GitHub Actions.

Il lance:

- `make security-scan`;
- `docker compose config`;
- `docker compose run --rm app pnpm install`;
- `docker compose run --rm app pnpm lint`;
- `docker compose run --rm app pnpm build`.

## Règles d'usage

- Ne pas déclencher ce runner sur des Pull Requests externes non relues.
- Ne pas stocker le jeton GitHub dans le dépôt, dans le README ou dans les logs.
- Régénérer le jeton si une erreur d'enregistrement apparaît.
- Supprimer le runner côté GitHub si la machine locale n'est plus utilisée.
