# UX-MODULE-PAGES-01 - Harmonisation des pages module

## Diagnostic global

Les pages module génériques utilisaient un gabarit cohérent, mais trop bavard.
Chaque écran répétait les mêmes messages: écran shell, route active, contenu à
venir, workflows et états de démonstration. Le guidage était clair, mais la
charge de lecture dépassait le besoin réel d'une page module encore non
opérationnelle.

La décision retenue est de garder un gabarit stable, plus court et plus
progressif.

## Spécificités desktop vs mobile

Sur mobile, la page doit donner rapidement le nom du module, son statut et trois
repères maximum. Les références de conception passent sous un bloc repliable.

Sur desktop, le gabarit conserve une lecture plus large avec visuel et repères,
mais évite de transformer chaque module en page de documentation complète.

## Plan d'action appliqué

- Remplacer le badge unique "Écran shell" par deux badges plus explicites:
  "Module préparé" et "Lecture statique".
- Réduire le texte d'introduction pour éviter l'effet avertissement répété.
- Limiter les repères visibles à trois éléments.
- Rendre l'état du module plus discret et plus lisible.
- Replier les composants de conception `ResponsiveWorkflowsPreview` et
  `DynamicStatesPreview`.
- Conserver l'absence de bouton d'action pour ne pas suggérer un CRUD actif.

## Règles sources

- Bastien & Scapin: renforcer le guidage et réduire la charge de travail.
- Loi de Hick: limiter le nombre de choix et signaux visibles.
- Loi de Miller: grouper les contenus de support.
- Apple HIG / Material Design 3: préserver des zones tactiles confortables.
- WCAG 2.2: conserver le focus visible et ne pas porter l'information par la
  couleur seule.

## Écrans touchés

Le changement porte sur le composant `ShellRoutePage`, utilisé notamment par les
routes génériques ruchers, ruches, colonies, sanitaire, contacts, documents,
récoltes, organisation et sous-pages de santé.

Les pages déjà spécialisées comme visites, tâches, matériel, transhumance,
administration, modules et onboarding ne sont pas refondues dans ce lot.
