# Modules Dynamiques

## Objectif

Rucher360 doit permettre d'activer ou de masquer des fonctions par organisation et par utilisateur sans remettre les donnees a zero. Une fonction desactivee ne doit plus etre visible ni executable, mais ses donnees doivent rester conservees pour une future reactivation.

Cette strategie prepare les futurs profils utilisateurs configurables, l'administration des modules et les modules autonomes.

## Couches d'activation

L'acces a une fonction repose sur quatre couches:

1. catalogue produit: le module existe dans Rucher360;
2. activation organisation: l'organisation active ou desactive le module;
3. activation membre: l'adhesion utilisateur-organisation rend le module visible ou non;
4. permissions: le role autorise les actions dans le module.

Regle cible:

```text
canAccessFeature =
  moduleExists &&
  organizationModuleEnabled &&
  membershipModuleEnabled &&
  userHasRequiredPermission
```

Un module desactive masque les surfaces et bloque les actions. Il ne supprime jamais les donnees.

## Niveau organisation

Une organisation definit les modules disponibles pour son espace de travail. C'est le niveau qui porte les donnees metier et les choix collectifs.

Exemples:

- une association active ruchers, visites, materiel et base de connaissance;
- une petite exploitation garde seulement ruchers, ruches, visites et taches;
- les modules IA et connectes restent desactives tant qu'un lot dedie ne les active pas.

## Niveau adhesion

Le choix par utilisateur doit etre rattache a l'adhesion entre un utilisateur et une organisation. Un meme utilisateur peut donc avoir des modules visibles differents selon l'organisation.

Le modele cible est `MembershipModulePreference`. Il doit etre prefere a une preference globale utilisateur pour piloter les acces metier.

## Permissions

Les permissions restent la derniere barriere. Un module visible ne suffit pas a autoriser une action.

Exemple:

- un membre peut voir le module `Ruchers`;
- son role donne `apiaries.read`;
- il peut consulter les ruchers mais pas les modifier sans `apiaries.write`.

## Registry applicative

Une registry TypeScript devra devenir la source applicative unique pour l'interface:

- code du module;
- libelle;
- categorie;
- route principale;
- permissions requises;
- visibilite navigation;
- etat: actif, desactive ou a venir.

La navigation, le cockpit, les routes et les futurs ecrans de profil devront s'appuyer sur cette registry plutot que sur des listes dispersees.

## Conservation des donnees

La desactivation d'un module ne doit jamais:

- supprimer ses tables;
- supprimer les enregistrements metier;
- effacer l'historique;
- retirer les pieces jointes ou notes liees.

Elle doit seulement:

- masquer les entrees de navigation;
- bloquer les actions;
- empecher les traitements automatiques;
- afficher un etat clair si un lien vers le module existe encore.

## Modules autonomes

Les modules doivent rester autonomes autant que possible. Les liens inter-modules sont autorises, mais ils doivent rester optionnels.

Exemples:

- `materiel` peut exister sans `visites`;
- `visites` peut referencer du materiel plus tard, sans l'exiger;
- `transhumance` peut s'appuyer sur ruchers et ruches, sans deplacer le concept de rucher;
- `health` peut creer des taches, mais ne doit pas prescrire automatiquement.

## Hors perimetre de ce cadrage

Ce lot ne cree pas:

- migration Prisma;
- interface de gestion;
- formulaire de profil;
- CRUD de modules;
- activation IA ou IoT;
- suppression automatique de donnees.

## Lots suivants

- `MODULES-DYNAMIC-01`: ajouter `MembershipModulePreference` et les helpers purs de calcul des modules effectifs.
- `MODULES-REGISTRY-01`: creer la registry TypeScript des modules et preparer navigation/cockpit dynamiques.
- `USER-PROFILE-MODULES-01`: ajouter le choix de modules dans la creation ou modification d'un membre.
- `MODULE-ADMIN-01`: administrer les modules d'une organisation.
