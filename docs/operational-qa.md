# QA opérationnelle terrain

Ce document sert de grille courte pour valider que Rucher360 reste utilisable sur
un parcours apicole classique pendant les micro-lots fonctionnels.

## Objectif

Valider les cinq flux terrain actuellement branchés en développement:

- ruchers et ruches;
- visites;
- tâches;
- matériel;
- transhumance.

La QA opérationnelle ne remplace pas les tests techniques. Elle vérifie que les
écrans restent cohérents, lisibles et reliés entre eux pour un usage terrain
simple.

## Parcours cible

1. Préparer le contexte avec un rucher et une ruche active.
2. Ouvrir ou créer une visite depuis une ruche.
3. Ajouter une observation courte si nécessaire.
4. Créer volontairement une tâche de suivi depuis la visite ou la page tâches.
5. Vérifier le matériel seulement si la sortie le demande.
6. Ouvrir la transhumance seulement si un déplacement de ruches est prévu.

Le parcours reste volontairement sobre: pas de diagnostic automatique, pas de
GPS actif, pas de notification, pas de calendrier lourd et pas de suppression de
données.

## Commandes locales

Toutes les commandes applicatives restent Docker-first.

```bash
make seed-dev
docker compose up -d app
curl -I http://localhost:3000/
curl -I http://localhost:3000/journey
curl -I http://localhost:3000/apiaries
curl -I http://localhost:3000/visits
curl -I http://localhost:3000/tasks
curl -I http://localhost:3000/equipment
curl -I http://localhost:3000/transhumance
```

Pour un lot applicatif, conserver aussi les validations de référence:

```bash
git diff --check
docker compose config
docker compose run --rm app pnpm lint
docker compose run --rm app pnpm build
make security-scan
make secrets-scan
```

## Points de contrôle UX

- Mobile: la prochaine action doit être visible rapidement, sans scroll
  horizontal.
- Mobile: les formulaires de développement longs doivent rester repliés quand
  ils ne sont pas nécessaires.
- Desktop: les listes peuvent être plus denses, mais doivent garder une
  prochaine action lisible.
- Les pages vides doivent guider vers la première action utile.
- Les modules optionnels ou non utilisés ne doivent pas donner l'impression
  d'être obligatoires.
- La transhumance doit rester un suivi manuel de mouvements de ruches, sans GPS
  actif.
- Le matériel doit rester un appui terrain, pas une gestion commerciale.

## Grille visuelle mobile et desktop

### Mobile 390px

- La navigation basse reste visible et ne masque pas l'action principale.
- Le titre, les badges et les boutons tiennent dans leur surface.
- Les commandes, URLs et libellés longs se replient sans provoquer de scroll
  horizontal.
- Les informations de debug, limites et QA avancée restent repliées.
- La première action utile apparaît avant les listes détaillées.

### Desktop 1280px

- La sidebar reste disponible sans concurrencer le contenu principal.
- Les cartes utilisent l'espace horizontal sans créer de lignes trop longues.
- Les actions principales sont visibles au survol et accessibles au clavier.
- Les modules optionnels ou futurs restent secondaires.
- Les listes denses restent scannables par section, statut et prochaine action.

### Critères ergonomiques appliqués

- Guidage: chaque écran terrain doit indiquer la prochaine action possible.
- Charge de travail: les détails de développement et la QA avancée restent
  repliés.
- Contrôle utilisateur: aucune donnée n'est créée automatiquement depuis une
  carte, un badge ou un scénario de test.
- Cohérence: mobile et desktop utilisent les mêmes statuts et les mêmes limites
  produit.

## Scénarios manuels recommandés

Après `make seed-dev`, la base locale contient volontairement plusieurs cas
fictifs:

- une ruche active avec visite en cours et observation courte;
- une ruche faible avec visite planifiée et tâche urgente;
- une ruche au stock et une ruche en maintenance, toutes deux sans colonie;
- du matériel disponible, à nettoyer et en maintenance;
- un mouvement de transhumance manuel en cours, sans GPS actif.

### Premier rucher

- Démarrer avec peu ou pas de données.
- Créer un rucher, puis une ruche active.
- Vérifier que le cockpit, `/journey` et `/apiaries` guident vers la prochaine
  action sans afficher une impasse.
- Résultat attendu: le parcours commence par le contexte terrain, pas par une
  saisie de visite isolée.

### Première visite

- Ouvrir `/visits`.
- Choisir une ruche active.
- Saisir un objectif court et une observation simple.
- Vérifier que le rucher et la colonie active restent dérivés du contexte ruche.
- Résultat attendu: la visite reste courte, claire et orientée terrain.

### Suite à traiter

- Ouvrir une fiche visite.
- Créer une tâche de suivi uniquement depuis l'action volontaire.
- Vérifier que la tâche garde le lien vers la visite ou la ruche quand le
  contexte existe.
- Résultat attendu: aucune tâche n'est générée automatiquement.

### Caisse de visite

- Ouvrir `/equipment`.
- Vérifier les items disponibles, à nettoyer ou en maintenance.
- Contrôler que le matériel reste présenté comme un appui terrain.
- Résultat attendu: pas d'achat, de prix, de fournisseur ou de comptabilité.

### Déplacement simple

- Ouvrir `/transhumance`.
- Préparer ou relire un mouvement de ruches.
- Vérifier que la clôture du mouvement reste explicite.
- Résultat attendu: le rucher ne se déplace pas; seules les ruches portent
  l'historique de mouvement, sans GPS actif.

## Critères d'échec bloquants

- Un écran suggère une IA, un GPS, un IoT ou une prescription sanitaire active.
- Une action crée une donnée sans geste volontaire explicite.
- Un module futur ou optionnel apparaît comme obligatoire dans le parcours
  terrain.
- Une page mobile introduit un scroll horizontal ou cache l'action principale.
- Les données fictives ressemblent à des données personnelles ou réelles.

## Limites connues

- La session utilisée reste une session de développement fictive.
- Les données proviennent du seed local ou des formulaires de développement.
- Il n'y a pas encore d'authentification réelle.
- Les permissions et modules dynamiques sont cadrés, mais ne pilotent pas encore
  toute l'expérience utilisateur réelle.
