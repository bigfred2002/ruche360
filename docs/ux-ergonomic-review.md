# Analyse ergonomique du shell Rucher360

## Constat

Les pages actuelles sont cohérentes avec une application modulaire, mais elles
présentent beaucoup d'informations simultanément. C'est utile pour cadrer le
produit en phase de construction, mais trop dense pour un usage terrain réel,
surtout sur mobile et en extérieur.

La surcharge vient principalement de quatre points:

- beaucoup de cartes de prévisualisation affichées dès le premier niveau;
- plusieurs messages de garde-fous répétés sur chaque page;
- des sections "preview", "à venir" ou "sans CRUD" visibles comme contenu
  principal;
- peu de hiérarchie entre action immédiate, information utile et cadrage futur.

## Lecture ergonomique

Pour un apiculteur sur le terrain, la priorité doit être:

1. voir rapidement l'état utile;
2. accéder à l'action ou au détail attendu;
3. comprendre les alertes;
4. retrouver les modules secondaires sans encombrer l'écran principal.

Le shell actuel répond bien au besoin de documentation produit, mais il doit
évoluer vers une interface plus progressive:

- cockpit plus court;
- pages module avec un résumé en haut, puis détails repliables ou secondaires;
- futures fonctionnalités placées dans le catalogue modules, pas dans chaque
  page métier;
- garde-fous visibles en bas de page ou dans des états dédiés, pas répétés dans
  le flux principal;
- images utilisées comme respiration visuelle, pas comme section supplémentaire.

## Recommandations

### Mobile

- Limiter le premier écran à un titre, un statut, 1 à 3 indicateurs et une
  action ou entrée principale.
- Garder la navigation basse pour les modules terrain prioritaires uniquement.
- Reporter les explications longues sous le contenu principal.
- Eviter les grilles de plus de deux cartes avant le premier scroll.

### Desktop

- Utiliser la sidebar comme repère permanent, pas comme catalogue complet.
- Regrouper les informations secondaires dans une colonne latérale.
- Réserver les cartes nombreuses aux écrans de consultation ou d'administration.
- Introduire des vues compactes pour les listes futures.

### Contenu

- Remplacer les textes de précaution répétés par des labels courts:
  `Preview`, `Dev`, `Lecture seule`, `À venir`.
- Conserver le détail dans la documentation ou dans une aide secondaire.
- Utiliser des titres orientés utilisateur plutôt que des titres de lot.

## Lots conseillés

### UX-DENSITY-01

- alléger le cockpit;
- réduire le nombre de cartes visibles avant le premier scroll;
- déplacer les modules secondaires vers `/modules`;
- conserver les mêmes données statiques.

### UX-MODULE-PAGES-01

- harmoniser les pages module autour d'un gabarit plus lisible:
  résumé, indicateurs, contenu principal, garde-fous secondaires;
- réduire la répétition des sections dynamiques sur toutes les pages.

### UX-COPY-01

- raccourcir les textes UI;
- remplacer les explications techniques par des libellés terrain;
- garder les détails dans la documentation.

## Prompts utiles si de nouvelles images manquent

### Empty state terrain

Image horizontale 16:9 pour application web apicole moderne, scène lumineuse et
minimaliste avec une ruche en bois au loin, carnet fermé, espace vide au centre
pour interface, palette miel, sauge, ardoise et crème, style photographique doux,
aucun texte, aucun logo, aucune personne identifiable.

### Vue mobile légère

Image verticale 4:5 pour fond de carte mobile, apiculteur non identifiable de
dos près d'un rucher calme, lumière du matin, beaucoup d'espace négatif,
végétation mellifère, ambiance moderne et sobre, aucun texte, aucun logo,
contraste lisible pour superposer une interface.

### Administration sobre

Image 4:3 d'un bureau apicole propre avec dossiers, carnet, cadre de ruche et
échantillons neutres, ambiance organisation et gouvernance, palette crème,
sauge, miel et ardoise, style réaliste haut de gamme, aucun texte lisible,
aucune donnée personnelle.

## Décision

Ne pas refondre l'interface dans le lot d'assets. Les images sont intégrées
comme respiration visuelle, puis la densité sera traitée dans des lots UX dédiés
pour éviter un mélange entre décoration, navigation et logique métier.
