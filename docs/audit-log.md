# Journal D'Activite Metier

## Objectif

`AUDIT-LOG-00` cadre le futur journal d'activite metier de Rucher360 sans l'implementer.

Ce journal doit aider une organisation a comprendre les actions importantes realisees dans son espace: qui a change quoi, quand, dans quel module et avec quel niveau d'impact.

Il ne remplace pas les journaux techniques, les scans de securite ou l'historique Git.

## Distinction Avec Les Audits Techniques

Le journal d'activite metier est different de:

- `make security-scan`;
- `make secrets-scan`;
- `pnpm audit --prod`;
- GitHub Actions;
- logs Docker;
- logs Next.js;
- historique Git;
- traces de debug locales.

Les audits techniques protegent le depot et la chaine de livraison. Le journal metier explique les actions fonctionnelles dans une organisation.

## Principes

- Toute entree appartient a une organisation.
- Une entree doit etre lisible par un humain.
- Une entree ne doit jamais contenir de secret.
- Une entree doit minimiser les donnees personnelles.
- Une entree doit referencer les objets metier sans dupliquer tout leur contenu.
- Une entree doit survivre a la desactivation d'un module.
- Une entree doit pouvoir etre consultee plus tard depuis l'administration.

## Actions Candidates

Actions transverses:

- creation, modification ou archivage d'une organisation;
- invitation ou retrait d'un membre;
- changement de role;
- activation ou desactivation d'un module;
- changement de visibilite module pour une adhesion;
- export futur de donnees;
- restauration ou archivage important.

Actions apicoles candidates:

- creation ou archivage d'un rucher;
- creation, deplacement ou archivage d'une ruche;
- changement important sur une colonie;
- creation ou finalisation d'une visite future;
- creation ou cloture d'une tache future;
- creation ou modification d'une observation sanitaire importante;
- creation, ajustement ou retrait d'un stock materiel;
- changement de statut d'un item materiel;
- creation, finalisation ou annulation d'un mouvement de transhumance.

## Donnees A Ne Pas Journaliser

Ne jamais stocker dans le journal:

- mot de passe;
- token;
- cle API;
- secret;
- contenu complet de document;
- dump;
- coordonnees GPS precises si un libelle suffit;
- telephone ou email si non necessaire;
- note sanitaire longue si un resume d'action suffit;
- image ou donnees brutes capteur.

Le journal doit indiquer qu'une action a eu lieu, pas recopier toutes les donnees sensibles.

## Donnees Cibles D'Une Entree

Structure conceptuelle:

- organisation;
- auteur ou adhesion auteur;
- module;
- type d'action;
- cible metier;
- libelle court;
- niveau d'importance;
- date;
- resume;
- metadata minimale non sensible.

Exemples de libelles:

- `Module materiel active`;
- `Role membre modifie`;
- `Mouvement de transhumance termine`;
- `Stock de cadres ajuste`;
- `Rucher archive`.

## Niveaux D'Importance

Niveaux proposes:

- `INFO`: action ordinaire;
- `IMPORTANT`: changement structurant;
- `SENSITIVE`: action touchant donnees sensibles;
- `SECURITY`: action d'acces, role, permission ou module.

Ces niveaux servent a filtrer l'administration. Ils ne remplacent pas les permissions.

## Consultation Future

Surface cible:

```text
/admin/journal
```

Au depart, la consultation doit etre:

- en lecture seule;
- filtree par organisation;
- filtree par module;
- filtree par importance;
- paginee;
- reservee aux permissions d'administration.

La bottom nav mobile ne doit pas afficher ce journal. Il doit rester une surface d'administration.

## Retention Et Archivage

La retention exacte devra etre cadree dans `DATA-LIFECYCLE-00`.

Hypotheses:

- conserver les evenements structurants plus longtemps que les evenements ordinaires;
- permettre un filtrage par periode;
- eviter les suppressions rapides;
- privilegier conservation controlee et export futur encadre;
- ne jamais utiliser le journal comme sauvegarde complete des donnees metier.

## Hors Perimetre

`AUDIT-LOG-00` ne cree pas:

- schema Prisma;
- table d'audit;
- migration;
- API;
- route `/admin/journal`;
- UI;
- export;
- moteur de recherche;
- stockage de logs techniques;
- surveillance temps reel;
- IA de detection;
- alerte automatique;
- integration externe.

## Lots Suivants

1. `AUDIT-LOG-01`
   - modele Prisma minimal du journal metier;
   - aucun ecran complet.

2. `AUDIT-LOG-SHELL-01`
   - route shell d'administration en lecture seule ou preview;
   - filtres statiques ou simples.

3. `AUDIT-LOG-EVENTS-01`
   - emission d'evenements depuis modules deja actifs;
   - materiel, transhumance, modules et roles en priorite.

4. `DATA-LIFECYCLE-00`
   - retention, archivage, restauration et suppression controlee.

## Regles De Coherence

- Ne pas journaliser trop tot chaque micro-champ.
- Ne pas stocker de secrets ou contenus complets sensibles.
- Ne pas utiliser le journal pour contourner les droits.
- Ne pas creer un audit global plateforme avant l'authentification reelle.
- Ne pas confondre journal metier et scans DevSecOps.
