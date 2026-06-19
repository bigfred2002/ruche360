# Contexte

## Etat courant

Le dépôt Rucher360 est initialisé sur GitHub et préparé pour un développement agentique. Le lot `REPO-INIT-01` établit la documentation de référence sans développer l'application.

## Décisions actées

- Le produit est une application apicole modulaire multi-utilisateurs.
- Le développement doit être containerisé avec Docker Compose.
- La machine hôte ne doit pas être considérée comme équipée de Node.js, pnpm, Prisma ou Playwright.
- Les modules connectés sont prévus mais désactivés: balance, météo, caméra, capteurs, GPS.
- Les modules IA sont prévus mais désactivés: analyse de visite, assistant connaissance, reconnaissance d'espèce, comptage varroa.
- Les fonctions étiquetage, marketplace, paiement, comptabilité complète, IoT actif, IA automatique et prescription sanitaire automatique sont hors périmètre initial.

## Points ouverts

- Choix de la stack applicative.
- Choix du système d'authentification.
- Choix du stockage documentaire.
- Niveau de détail de la localisation des ruchers.
- Politique de conservation des données sanitaires.

## Commandes utiles actuelles

```bash
git status --short --branch
git diff --check
```

Les commandes applicatives seront ajoutées quand Docker Compose et la stack seront créés.
