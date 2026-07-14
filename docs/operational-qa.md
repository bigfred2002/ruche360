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

## Limites connues

- La session utilisée reste une session de développement fictive.
- Les données proviennent du seed local ou des formulaires de développement.
- Il n'y a pas encore d'authentification réelle.
- Les permissions et modules dynamiques sont cadrés, mais ne pilotent pas encore
  toute l'expérience utilisateur réelle.
