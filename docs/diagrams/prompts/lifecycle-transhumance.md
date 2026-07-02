# Prompt Archify - Cycle De Vie Transhumance

Utilise Archify pour creer un diagramme lifecycle du module transhumance de Rucher360.

Concepts:

- Un rucher est un site fixe.
- Une ruche est mobile.
- La transhumance est un mouvement d'une ou plusieurs ruches entre deux ruchers.
- L'historique des mouvements est conserve.
- L'emplacement courant d'une ruche est mis a jour quand le mouvement est termine.
- Aucun GPS actif, IoT actif ou calcul automatique d'itineraire n'est active.

Etats du mouvement:

- `PLANNED`: mouvement prevu.
- `IN_PROGRESS`: mouvement en cours.
- `COMPLETED`: mouvement termine.
- `CANCELLED`: mouvement annule.

Transitions:

- creation du mouvement vers `PLANNED`;
- depart terrain vers `IN_PROGRESS`;
- confirmation d'arrivee vers `COMPLETED`;
- annulation depuis `PLANNED` ou `IN_PROGRESS` vers `CANCELLED`;
- `COMPLETED` et `CANCELLED` sont terminaux.

Effets a montrer:

- `PLANNED` ne change pas l'emplacement courant.
- `IN_PROGRESS` ne change pas encore l'emplacement courant.
- `COMPLETED` met a jour `Hive.apiaryId` vers le rucher destination.
- `CANCELLED` conserve la trace mais ne change pas l'emplacement courant.

Permissions:

- `transhumance.read`: consulter.
- `transhumance.write`: creer, ajouter des ruches, passer en cours ou terminer.
- `transhumance.manage`: annuler ou corriger.

Contraintes de sortie:

- Utiliser uniquement des noms fictifs: `Rucher ecole`, `Rucher des coteaux`, `DEV-RU-001`.
- Ne pas utiliser de coordonnees GPS.
- Ne pas representer de suivi temps reel.
