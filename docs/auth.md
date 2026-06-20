# Authentification et Organisations

`AUTH-01` pose les conventions du domaine identité sans activer de mécanisme d'authentification.

## Périmètre

- Représenter un compte utilisateur.
- Représenter une organisation active, suspendue ou archivée.
- Représenter une adhésion entre utilisateur et organisation.
- Fournir des helpers TypeScript purs pour vérifier un accès organisationnel actif.

## Hors périmètre

- Pas d'Auth.js.
- Pas de session.
- Pas de page de connexion.
- Pas de formulaire d'inscription.
- Pas d'API d'authentification.
- Pas d'envoi d'email.
- Pas de stockage de mot de passe.

## Règles de domaine

- Un utilisateur doit être `ACTIVE` pour être considéré utilisable par l'application.
- Une organisation doit être `ACTIVE` pour être accessible.
- Une adhésion doit être `ACTIVE` pour donner accès à une organisation.
- Les rôles et permissions détaillés restent couverts par `RBAC-01`.

## Fichiers

- `src/features/auth/types.ts`: types du domaine identité.
- `src/features/auth/access.ts`: helpers purs de normalisation et d'accès.
- `src/features/auth/index.ts`: point d'export interne.
