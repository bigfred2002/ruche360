# Documentation Visuelle Avec Archify

## Objectif

Archify est utilise comme documentation complementaire pour produire des diagrammes lisibles de Rucher360: architecture, workflows, flux de donnees et cycles de vie.

La source de verite reste la documentation Markdown du depot. Les diagrammes servent a faciliter la lecture, les revues de lots et l'alignement produit/technique.

Reference externe: <https://github.com/tt-a1i/archify>

## Position Retenue

- Ne pas ajouter Archify comme dependance applicative.
- Ne pas ajouter Archify dans Docker Compose.
- Versionner les prompts sources dans `docs/diagrams/prompts/`.
- Versionner plus tard uniquement les exports legers utiles, de preference SVG, dans `docs/diagrams/svg/`.
- Garder les HTML generes hors commit par defaut, sauf decision explicite dans un lot dedie.

Cette approche garde Rucher360 sobre: Archify aide a documenter, mais ne devient pas un moteur du produit.

## Diagrammes Prioritaires

1. Architecture logique de Rucher360.
2. Architecture technique Docker-first.
3. Workflow agentique de micro-lot.
4. Flux de donnees sensibles.
5. Cycle de vie d'une transhumance.

## Regles De Confidentialite

Le depot est public. Les prompts et exports ne doivent jamais contenir:

- adresse reelle de rucher;
- coordonnees GPS reelles;
- nom, email, telephone ou contact reel;
- chemin local personnel;
- token, cle, mot de passe ou secret;
- capture d'ecran avec donnees locales;
- dump de base de donnees.

Utiliser uniquement des noms fictifs comme `Rucher ecole`, `Organisation de developpement` ou `DEV-RU-001`.

Avant tout push:

```bash
make security-scan
make secrets-scan
```

## Workflow Recommande

1. Ouvrir le prompt voulu dans `docs/diagrams/prompts/`.
2. Le donner a un agent disposant du skill Archify.
3. Generer le diagramme HTML localement.
4. Exporter en SVG si le diagramme doit etre versionne.
5. Relire le SVG avant commit pour verifier l'absence de donnees sensibles.
6. Ajouter le lien vers le SVG depuis la doc concernee uniquement si le diagramme est stable.

## Emplacement Des Exports

Les futurs exports versionnes doivent etre ranges ainsi:

```text
docs/diagrams/svg/
```

Les exports de travail, HTML ou PNG temporaires doivent rester locaux et non commités. Si un dossier de travail devient necessaire, l'ajouter au `.gitignore` dans un lot dedie.

## Criteres De Qualite

Un diagramme Archify accepte doit:

- expliquer une decision ou un flux plus vite que le texte seul;
- rester comprehensible sans lire tout le backlog;
- utiliser des libelles courts;
- montrer les frontieres sensibles quand elles existent;
- distinguer actif, developpement, prevu et desactive;
- rester coherent avec `docs/application-architecture.md`, `docs/module-function-map.md` et `docs/context.md`.

## Lots Futurs

- `ARCHIFY-DIAGRAMS-01`: generer et versionner les premiers SVG stables.
- `ARCHIFY-DIAGRAMS-REVIEW-01`: relire les diagrammes apres activation de l'authentification reelle.
- `DOCS-ARCHITECTURE-SYNC-01`: verifier que les diagrammes restent synchronises avec les modules actifs.
