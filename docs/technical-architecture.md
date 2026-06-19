# Architecture Technique

## Position actuelle

Le dépôt n'est pas encore scaffoldé. Le lot `REPO-INIT-01` prépare les conventions sans choisir ni installer de dépendances applicatives.

## Contraintes structurantes

- Développement containerisé avec Docker Compose.
- Ne pas supposer que Node.js, pnpm, Prisma ou Playwright sont installés sur la machine hôte.
- Les commandes projet futures doivent être documentées sous forme `docker compose ...`.
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

## Docker Compose

Un futur lot devra créer le fichier `docker-compose.yml` avec au minimum:

- un service applicatif;
- un service base de données;
- des volumes de développement;
- des variables d'environnement cohérentes avec `.env.example`.

Ce lot ne crée pas encore Docker Compose afin d'éviter de figer une stack applicative avant décision.

## Modules désactivés

Les modules connectés et IA doivent être représentés comme capacités prévues mais désactivées. Ils ne doivent pas appeler de fournisseur externe, de modèle IA, de caméra, de capteur ou de service météo dans le périmètre initial.

## Sécurité et confidentialité

- Les données de rucher peuvent être sensibles, notamment la localisation.
- Les rôles doivent limiter l'accès par organisation.
- Les documents peuvent contenir des informations personnelles ou sanitaires.
- Les futures fonctionnalités GPS, caméra et IA devront avoir un cadrage spécifique avant activation.

## Validation future

Les tests futurs devront s'exécuter dans Docker Compose. Les commandes de validation seront documentées dans `README.md` ou dans les lots concernés lorsqu'une stack technique sera ajoutée.
