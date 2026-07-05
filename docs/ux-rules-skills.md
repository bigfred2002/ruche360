# Référentiel UX, UI et accessibilité Rucher360

## Objectif

Ce document transforme le prompt d'agent UX en règles opérationnelles pour les
lots Rucher360. Il sert de base avant les lots `UX-DENSITY-01`,
`UX-MODULE-PAGES-01`, `UX-COPY-01` et tout futur lot d'interface.

Il ne remplace pas les guides officiels. Il fixe une grille de décision stable,
adaptée à Rucher360: application apicole mobile-first, utilisable dehors, mais
avec des vues desktop plus denses pour préparer, administrer et analyser.

## Référentiels sources

- Apple Human Interface Guidelines: zones tactiles faciles à atteindre, boutons
  avec zone d'interaction d'au moins 44 x 44 pt.
- Material Design 3: composants adaptatifs, grilles flexibles, cibles tactiles
  recommandées à 48 x 48 dp.
- Microsoft Fluent 2: hiérarchie par surfaces, états de survol, focus clavier,
  couleurs sémantiques et tokens.
- WCAG 2.2: contraste texte minimum 4.5:1 au niveau AA, cible pointeur minimum
  24 x 24 CSS px au niveau AA, cible 44 x 44 CSS px au niveau AAA.
- RGAA 4.1 / 4.1.2: méthode française de vérification, basée sur WCAG 2.1 A et
  AA; RGAA 5 est annoncé mais ne doit pas suspendre les travaux d'accessibilité.
- Critères de Bastien & Scapin: guidage, charge de travail, contrôle explicite,
  adaptabilité, gestion des erreurs, homogénéité, signifiance, compatibilité.
- Lois UX: Fitts, Hick, Miller, proximité, Jakob, feedback immédiat.

Références utiles:

- Apple Human Interface Guidelines: https://developer.apple.com/design/human-interface-guidelines/
- Material Design 3: https://m3.material.io/
- Microsoft Fluent 2: https://fluent2.microsoft.design/
- WCAG 2.2: https://www.w3.org/TR/WCAG22/
- RGAA: https://accessibilite.numerique.gouv.fr/

## Skills agentiques

### AUDIT_INTERFACE

Utiliser ce skill quand un lot demande d'analyser un écran, un flux ou un extrait
de code UI.

Sortie attendue:

1. Diagnostic global selon Bastien & Scapin.
2. Spécificités mobile vs desktop.
3. Plan d'action concret.
4. Règles sources justifiant les décisions.

Points à contrôler:

- cible tactile et zones de clic;
- densité d'information;
- hiérarchie visuelle;
- charge de lecture;
- états hover, focus, disabled, loading, empty, error;
- cohérence avec modules activés/désactivés;
- absence d'illusion d'action quand une fonction reste statique.

### RESPONSIVE_ADAPTATION

Utiliser ce skill quand un écran desktop doit être adapté au mobile ou inversement.

Règles Rucher360:

- un tableau desktop devient sur mobile une liste de cartes compactes;
- les filtres avancés passent dans une surface secondaire ou repliable;
- les actions principales restent visibles et assez grandes;
- les actions dangereuses sont séparées, confirmées et jamais proches d'une
  action fréquente;
- la bottom nav mobile ne reçoit que les modules terrain prioritaires;
- la sidebar desktop peut porter plus de repères, mais pas devenir un catalogue
  complet.

### ACCESSIBILITY_CHECK

Utiliser ce skill pour tout composant ou écran modifié visuellement.

Contrôles minimaux:

- texte normal: contraste 4.5:1 minimum;
- grands titres: contraste 3:1 minimum, viser 4.5:1 quand possible;
- informations non textuelles utiles: contraste 3:1 minimum;
- action tactile mobile: viser 48 x 48 dp / px CSS, ne jamais descendre sous la
  cible utilisable sans justification;
- focus clavier visible;
- couleur jamais seule porteuse d'information;
- textes alternatifs utiles pour images informatives, alt vide pour images
  purement décoratives;
- respect de `prefers-reduced-motion`.

## Règles mobile

- Prioriser la consultation terrain: état, prochaine action, alerte.
- Limiter le premier écran à un titre, un résumé, 1 à 3 indicateurs et une
  action ou entrée principale.
- Garder les cartes nombreuses sous le premier scroll.
- Préférer des libellés courts et explicites aux textes longs.
- Eviter les tableaux larges, colonnes multiples et listes denses.
- Les boutons, liens, chips et icônes activables doivent être faciles à toucher.
- Une page de saisie terrain doit tolérer l'interruption, la reprise et la
  connectivité imparfaite.

## Règles desktop

- Exploiter l'espace pour comparer, filtrer et préparer.
- Ajouter des états de survol quand ils aident la compréhension.
- Prévoir un parcours clavier pour les futures vues de gestion.
- Autoriser une densité plus élevée, mais avec regroupements nets.
- Réserver les surfaces d'administration aux écrans secondaires.
- Utiliser la sidebar pour la navigation stable et les repères, pas pour tout
  exposer.

## Format de réponse obligatoire pour les audits UX

Quand un lot demande une analyse UX ou une recommandation ergonomique, répondre
avec cette structure:

1. Diagnostic global: respect des critères Bastien & Scapin.
2. Spécificités desktop vs mobile: ce qui fonctionne sur l'un et doit changer
   sur l'autre.
3. Plan d'action: corrections concrètes, mesurables et priorisées.
4. Règle source: guide, loi UX ou critère d'accessibilité associé.

## Application à Rucher360

### Cockpit

- Doit devenir une vue courte de pilotage, pas une vitrine de tout le produit.
- Les modules futurs restent dans `/modules`, sauf alerte ou activation réelle.
- Les cartes secondaires doivent être repliées, déplacées ou hiérarchisées.

### Pages module

- Structure cible:
  - résumé court;
  - indicateurs utiles;
  - liste ou contenu principal;
  - actions principales;
  - garde-fous et explications en bas ou dans l'aide.
- Eviter de répéter sur chaque page les mêmes textes "preview", "sans CRUD" ou
  "à venir"; utiliser plutôt des badges et états communs.

### Administration

- Desktop d'abord.
- Pas dans la bottom nav mobile par défaut.
- Densité plus forte acceptable si lecture, filtrage et export futur sont clairs.

### Terrain

- Mobile d'abord.
- Actions fréquentes accessibles sans précision excessive.
- Informations sanitaires et alertes visibles sans dramatiser.
- Aucune prescription automatique ne doit être suggérée par l'interface.

## Critères d'acceptation pour les lots UX

- Le lot indique explicitement les écrans touchés.
- Le lot liste les règles UX utilisées.
- Le lot ne mélange pas refonte UX, logique métier et changement de modèle de
  données.
- Le lot vérifie `git diff --check`.
- Pour un lot applicatif, le lot vérifie lint/build via Docker Compose.
- Les contrôles visuels doivent vérifier au moins mobile 390 px et desktop
  1280 px quand le rendu est modifié.

## Limites

- Ce référentiel est une grille de conception, pas un audit RGAA complet.
- Les ratios de contraste doivent être mesurés dès qu'un outil dédié est ajouté
  au projet.
- Les guides Apple, Material et Fluent peuvent diverger; en cas de conflit,
  Rucher360 privilégie l'usage réel: terrain mobile, lisibilité extérieure,
  contrôle utilisateur et absence d'ambiguïté métier.
