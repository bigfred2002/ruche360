# Partage Fin Par Rucher

## Objectif

Ce document cadre le futur module optionnel `apiary_access`.

Le partage par defaut de Rucher360 reste organisationnel:

- un rucher appartient a une organisation;
- les membres de l'organisation y accedent selon leurs roles et permissions;
- les modules visibles dependent de l'organisation et de l'adhesion.

Le partage fin par rucher ne doit etre ajoute que si ce modele devient insuffisant.

## Cas D'Usage Cibles

Le module `apiary_access` devient utile pour:

- une association qui veut ouvrir seulement un rucher pedagogique a certains membres;
- un proprietaire qui veut donner acces a un intervenant sanitaire sur un site precis;
- un collectif qui partage plusieurs sites avec des groupes differents;
- une exploitation qui souhaite limiter la visibilite d'un saisonnier a une zone terrain.

Il ne doit pas etre active par defaut pour un apiculteur amateur seul, car il ajouterait une couche de gestion inutile.

## Regle Produit

La regle cible d'acces a un rucher devient:

```text
canAccessApiary =
  organizationAccessAllowed
  and apiaryModuleVisible
  and userHasApiaryPermission
  and (apiaryAccessModuleDisabled or memberHasApiaryAccess)
```

Si `apiary_access` est desactive, le comportement reste celui du socle: l'organisation, les roles et les permissions suffisent.

Si `apiary_access` est active, l'acces a un rucher peut etre limite par membre.

La desactivation du module `apiary_access` ne supprime aucune donnee. Elle retire seulement la restriction fine et revient au partage organisationnel.

## Permissions Futures

Permissions conceptuelles a cadrer plus tard:

| Permission | Description |
| --- | --- |
| `apiary_access.read` | Consulter les regles d'acces par rucher. |
| `apiary_access.write` | Ajouter ou retirer l'acces d'un membre a un rucher. |
| `apiary_access.manage` | Administrer le module et ses valeurs par defaut. |

Ces permissions ne remplacent pas `apiaries.read` ou `apiaries.write`. Elles ajoutent une restriction locale au-dessus des droits existants.

## Modele Conceptuel

Un futur modele minimal pourrait porter:

- organisation;
- rucher;
- adhesion membre;
- niveau local: lecture, intervention, gestion locale;
- statut: actif ou suspendu;
- dates de creation et mise a jour;
- auteur de la regle.

Ce modele ne doit pas porter de donnees de visite, de colonie ou de sanitaire. Il controle uniquement la visibilite et les actions sur un site.

## UX Cible

L'interface doit rester discrète:

1. un administrateur ouvre un rucher;
2. il accede a un onglet ou panneau secondaire `Acces`;
3. il ajoute un membre deja present dans l'organisation;
4. il choisit un niveau local simple;
5. l'application indique clairement que les donnees ne sont pas dupliquees.

Sur mobile, ce reglage ne doit pas etre dans la navigation basse. Il doit rester dans les details du rucher ou les reglages organisation.

## Impacts Sur Les Ecrans

Ecrans futurs concernes:

- detail d'un rucher: panneau secondaire `Acces`;
- liste des ruchers: affichage filtre selon les acces effectifs;
- profil membre: apercu des ruchers autorises si le module est actif;
- catalogue modules: statut actif ou desactive de `apiary_access`.

Ecrans non concernes au premier niveau:

- cockpit principal;
- navigation basse mobile;
- creation de visite;
- cartes publiques ou partage externe.

## Risques A Eviter

Ne pas introduire au premier niveau:

- partage public par lien;
- acces anonyme;
- geolocalisation publique;
- role local complexe par ruche ou colonie;
- duplication des ruchers entre organisations;
- workflow d'invitation externe separe de l'adhesion.

Les coordonnees de rucher sont sensibles. Le module doit limiter l'exposition des sites plutot que faciliter leur diffusion.

## Sequence De Lots

1. `APIARY-ACCESS-00`
   - cadrage documentaire;
   - aucun schema, route, ecran ou CRUD.

2. `APIARY-ACCESS-01`
   - ajout du module, des permissions et du modele minimal;
   - helpers purs d'acces effectif;
   - pas d'interface de gestion complete.

3. `APIARY-ACCESS-SHELL-01`
   - surface statique ou semi-statique dans le detail rucher et le profil membre;
   - pas encore de gestion fonctionnelle lourde.

4. `APIARY-ACCESS-CRUD-01`
   - gestion effective des acces par rucher;
   - audit minimal des modifications.

## Decision

Le partage fin par rucher doit rester optionnel. Le partage organisationnel reste le comportement par defaut et suffit pour les petits usages.
