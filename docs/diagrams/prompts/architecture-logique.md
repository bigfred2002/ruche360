# Prompt Archify - Architecture Logique

Utilise Archify pour creer un diagramme d'architecture logique de Rucher360.

Contexte public et fictif uniquement:

- Rucher360 est une application apicole modulaire multi-utilisateurs.
- L'organisation est le conteneur principal des donnees.
- Un utilisateur accede a une organisation via une adhesion, appelee `Membership`.
- Les modules sont actives par organisation puis visibles ou masques par adhesion.
- Les permissions du role controlent les actions.
- Une fonction est accessible seulement si:
  `moduleExists && organizationModuleEnabled && membershipModuleEnabled && userHasRequiredPermission`.
- Desactiver un module masque les ecrans et bloque les actions, mais ne supprime jamais les donnees.

Elements a dessiner:

- Utilisateur.
- Membership organisation.
- Organisation.
- Catalogue modules.
- Modules organisation.
- Preferences modules par adhesion.
- Roles et permissions.
- Navigation et cockpit.
- Actions serveur.
- Modules metier: ruchers, ruches, colonies, materiel, transhumance.
- Donnees organisationnelles.
- Historique, statuts et archivage.

Mettre en evidence:

- la separation entre visibilite UI et autorisation d'action;
- la conservation des donnees quand un module est desactive;
- les modules IA et IoT comme prevus mais desactives;
- les donnees de localisation comme sensibles.

Contraintes de sortie:

- Ne pas utiliser de noms reels.
- Ne pas utiliser de coordonnees GPS.
- Ne pas mentionner de secret, token, chemin local ou email reel.
- Diagramme clair pour une revue de sprint.
