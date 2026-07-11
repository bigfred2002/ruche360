# DEPLOY-PROD-ARCHITECTURE-00 - Architecture De Production

## Objectif

Definir l'architecture cible de production de Rucher360 sans deployer
l'application, sans creer de domaine, sans modifier Docker et sans ajouter de
secret.

Ce document prepare les futurs lots `DEPLOY-SYNOLOGY-01`, `DEPLOY-VPS-00` et
`BACKUP-RESTORE-00`.

## Decision Retenue

Rucher360 doit garder une architecture Docker-first avec un seul point d'entree
public HTTPS et des services internes non exposes.

Deux profils sont retenus:

1. Beta privee a domicile sur Synology.
2. Production plus ouverte sur VPS europeen.

Le choix du point d'entree depend du contexte:

- beta a domicile: tunnel sortant recommande si l'ouverture de ports entrants
  sur la box est indesirable ou instable;
- beta a domicile avancee: reverse proxy possible si domaine, certificats,
  ports et supervision sont maitrises;
- VPS: reverse proxy classique recommande, avec IP publique stable et TLS
  automatise.

Dans tous les cas, PostgreSQL reste prive et n'est jamais publie sur Internet.

## Architecture Logique Cible

```text
Navigateur
  -> HTTPS public
  -> point d'entree: tunnel sortant ou reverse proxy
  -> service web Rucher360
  -> reseau Docker prive
  -> PostgreSQL prive
  -> volume persistant chiffre ou sauvegardable
  -> sauvegardes chiffrees hors hote
```

Seul le trafic HTTP(S) vers l'application doit etre exposé. Les ports internes
PostgreSQL, Docker, administration NAS, SSH et outils de supervision restent
restreints.

## Composants Cibles

### Application

- Image de production construite depuis le depot.
- Variables d'environnement injectees par l'environnement d'hebergement.
- Aucun secret dans Git, README, `.env.example`, logs ou captures.
- Un seul domaine public par environnement.

### Base De Donnees

- PostgreSQL sur reseau prive.
- Acces limite au service applicatif et aux jobs de sauvegarde.
- Pas de port PostgreSQL public.
- Sauvegardes chiffrees hors hote.
- Restauration testee avant beta externe.

### Point D'Entree HTTPS

Options possibles:

- tunnel sortant pour beta privee a domicile;
- reverse proxy Synology ou conteneur reverse proxy;
- reverse proxy VPS avec certificats automatiques.

Le point d'entree doit:

- forcer HTTPS;
- renouveler les certificats;
- limiter les chemins d'administration;
- ne pas exposer les services internes;
- produire des logs sans donnees metier sensibles.

## Variables Attendues Sans Valeur Reelle

Les futurs environnements devront fournir au minimum:

```text
DATABASE_URL
APP_URL
AUTH_TRUSTED_ISSUER
AUTH_CLIENT_ID
AUTH_CLIENT_SECRET
SESSION_SECRET
BACKUP_ENCRYPTION_PUBLIC_KEY
```

Ces noms sont indicatifs. Ils ne doivent pas etre ajoutes avec des valeurs
reelles dans le depot. `.env.example` peut seulement documenter des exemples
non secrets quand le lot d'authentification ou de deploiement l'exigera.

## Separations D'Environnements

Les environnements doivent rester separes:

- local developpement;
- beta privee;
- production.

Chaque environnement doit avoir:

- base de donnees separee;
- domaine ou URL separee;
- clients OAuth/OIDC separes;
- secrets separes;
- sauvegardes separees;
- donnees de demonstration separees des donnees reelles.

## Beta Synology

La beta Synology est adaptee pour un usage personnel ou un petit cercle de
testeurs connus.

Approche recommandee:

- Docker Compose ou projet Container Manager dedie;
- PostgreSQL non publie;
- tunnel sortant ou reverse proxy controle;
- sauvegarde chiffree quotidienne hors NAS;
- restauration testee;
- monitoring simple: HTTP, disque, certificats, sauvegardes et conteneurs.

Limites:

- disponibilite dependante du domicile;
- supervision plus manuelle;
- dependance au NAS, a la box et a l'alimentation;
- bascule plus difficile en cas d'incident.

## VPS Europeen

Le VPS europeen devient preferable lorsque plusieurs organisations utilisent
Rucher360 ou quand la disponibilite devient importante.

Approche recommandee:

- reverse proxy HTTPS sur le VPS;
- application et PostgreSQL isoles;
- pare-feu strict;
- sauvegardes chiffrees hors VPS;
- procedure de restauration;
- mises a jour planifiees;
- supervision minimale.

Le VPS ne supprime pas les obligations de sauvegarde. Il facilite surtout
l'exposition, l'acces reseau, la supervision et la continuite d'exploitation.

## Securite Et Confidentialite

Donnees sensibles candidates:

- localisation des ruchers;
- contacts;
- documents;
- notes sanitaires;
- photos ou videos futures;
- historiques de mouvements;
- logs d'administration.

Regles:

- minimiser les donnees dans les logs;
- ne jamais journaliser les secrets;
- ne pas exposer les identifiants techniques;
- chiffrer les sauvegardes;
- limiter les acces administrateur;
- separer exploitation technique et roles metier.

## Prerequis Avant Deploiement Reelle

Avant tout deploiement public ou beta externe:

- `BACKUP-RESTORE-00` doit cadrer sauvegarde, retention et restauration;
- l'authentification reelle doit etre decidee et configuree sans secret versionne;
- le point d'entree HTTPS doit etre choisi;
- la politique d'administration doit etre claire;
- la base PostgreSQL doit rester privee;
- une procedure de retour arriere doit exister;
- la protection de branche et la CI doivent rester actives.

## Hors Perimetre

Ce lot ne cree pas:

- domaine;
- certificat;
- tunnel;
- reverse proxy;
- fichier Compose de production;
- secret;
- compte cloud;
- modification Docker;
- route applicative;
- schema Prisma;
- code d'authentification;
- collecte de telemetrie;
- IA ou IoT actif.

## Lots Suivants

1. `BACKUP-RESTORE-00`
   - termine;
   - cadre sauvegardes PostgreSQL, chiffrement, retention et restauration.

2. `AUTH-PROVIDER-DECISION-01`
   - termine;
   - retient Google OIDC pour la beta privee et separe les clients par environnement.

3. `DEPLOY-SYNOLOGY-01`
   - preparer une beta privee Synology apres sauvegardes et auth.

4. `DEPLOY-VPS-00`
   - cadrer la migration VPS, supervision et retour arriere.
