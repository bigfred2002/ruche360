# UX-DENSITY-01 - Allègement du cockpit

## Diagnostic global

Le cockpit respectait la modularité produit, mais il exposait trop de surfaces de
démonstration au même niveau: modules, profils simulés, préférences membres,
états dynamiques et workflows. Selon Bastien & Scapin, le guidage restait
présent, mais la charge de travail augmentait inutilement pour une page d'accueil
terrain.

La décision retenue est de conserver l'information utile sans tout afficher
d'emblée.

## Desktop vs mobile

Sur mobile, le premier parcours doit rester court: identité du contexte,
priorités, modules visibles et accès aux sections secondaires. Les blocs longs
passent donc en sections repliables avec des zones tactiles hautes.

Sur desktop, les sections repliables restent accessibles dans le flux principal,
mais la sidebar conserve les informations complémentaires de catalogue et de
preview visuelle.

## Plan d'action appliqué

- Remonter les modules visibles avant les contenus de démonstration.
- Replier les contextes simulés dans une section progressive.
- Replier les préférences membres et états UI dans une section progressive.
- Replier les workflows responsive dans une section progressive.
- Conserver les textes explicatifs, mais hors de la lecture immédiate.
- Garder des cibles de résumé confortables avec `min-h-16`.

## Règles sources

- Critères de Bastien & Scapin: réduire la charge de travail et renforcer le
  guidage.
- Loi de Hick: limiter les choix simultanément visibles.
- Loi de Miller: grouper les informations secondaires.
- Material Design 3 et Apple HIG: conserver des zones tactiles confortables.
- WCAG 2.2: préserver le focus visible et ne pas masquer l'information
  indispensable derrière une interaction ambiguë.

## Limites

Ce lot ne crée aucune logique métier et ne retire aucun module. Les sections
repliables utilisent le comportement natif HTML `details` / `summary`; elles ne
remplacent pas un futur système d'aide ou de préférences utilisateur.
