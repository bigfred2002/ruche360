# DEPLOY-HOME-00 - Cadrage de l'hebergement

## Objectif

Definir une trajectoire d'hebergement progressive pour Rucher360, sans publier
l'application, modifier Docker, creer de domaine, de tunnel, de secret ou de
configuration de production.

## Decision retenue

Rucher360 suit trois niveaux d'exploitation:

1. Le poste local Docker Compose reste l'environnement de developpement.
2. Un Synology compatible Container Manager est la cible privilegiee pour une
   beta privee a domicile.
3. Un VPS situe dans l'Union europeenne devient la cible recommandee lors de
   l'ouverture a des organisations externes ou quand la disponibilite et la
   continuite d'activite deviennent importantes.

Un Raspberry Pi est adapte a un environnement personnel, de demonstration ou
de validation technique. Il ne constitue pas la cible de production initiale
pour des donnees multi-utilisateurs: il ajoute des contraintes ARM64, de
stockage, de disponibilite et d'exploitation.

Le cloud gratuit peut servir a une demonstration temporaire. Il ne doit pas
etre la fondation de production: les quotas, conditions d'usage, disponibilite
et options de sauvegarde ne repondent pas seules aux besoins de l'application.

## Architecture cible de beta privee

```text
Utilisateurs
  -> domaine dedie et HTTPS
  -> point d'entree controle (reverse proxy ou tunnel sortant)
  -> application Rucher360 dans Docker Compose
  -> PostgreSQL sur le reseau Docker prive
  -> sauvegardes chiffrees hors du Synology
```

- Seul le service web est expose par le point d'entree choisi.
- PostgreSQL n'est jamais publie sur Internet et reste accessible uniquement
  depuis les services autorises du reseau Docker.
- Le point d'entree doit appliquer HTTPS et conserver les services internes
  inaccessibles directement depuis le reseau domestique.
- Un tunnel sortant peut eviter l'ouverture de ports entrants sur la box; il
  reste un composant d'exploitation a surveiller et ne remplace pas les
  sauvegardes.

## Prerequis avant exposition publique

- Un domaine dedie, sans information personnelle dans le sous-domaine.
- HTTPS valide et renouvellement automatise des certificats.
- Une configuration de production separee du Compose de developpement.
- Des secrets uniquement dans le gestionnaire de secrets ou les variables
  d'environnement du serveur; jamais dans Git, `.env.example` ou les logs.
- Une sauvegarde chiffree quotidienne de PostgreSQL, conservee hors du NAS.
- Un test de restauration documente et execute regulierement.
- Une supervision minimale: disponibilite HTTP, espace disque, expiration des
  certificats, sauvegarde en echec et etat des conteneurs.
- Les mises a jour de DSM, Docker, images et dependances planifiees.
- Un acces d'administration restreint, protege et separe des comptes metier.

Le RAID ou la redondance locale du NAS reduit le risque de panne de disque. Ce
n'est pas une sauvegarde: une erreur, un chiffrement malveillant ou une panne
du site peuvent affecter toutes les copies locales.

## Donnees et confidentialite

Les localisations de ruchers, observations sanitaires, documents et contacts
peuvent etre sensibles. La production devra appliquer les principes suivants:

- minimisation des donnees exposees dans les journaux techniques;
- chiffrement en transit avec HTTPS;
- sauvegardes chiffrees et acces limite a leurs operateurs;
- retention et archivage conformes a `docs/data-lifecycle.md`;
- aucun export de donnees de developpement ou de donnees personnelles dans le
  depot public.

L'authentification OIDC future necessitera une URL publique HTTPS stable pour
les URI de redirection. Les clients OAuth locaux, de beta et de production
restent separes. Les identifiants client et secrets associes ne sont jamais
partages entre ces environnements.

## Criteres de bascule vers un VPS

La beta Synology doit basculer vers un VPS europeen quand au moins une de ces
conditions est remplie:

- des organisations externes utilisent l'application regulierement;
- une indisponibilite domestique devient inacceptable;
- les sauvegardes et tests de restauration ne sont plus operes de maniere
  fiable;
- la connexion, l'alimentation ou les ressources du NAS sont insuffisantes;
- l'administration de la box, du tunnel et du NAS depasse le niveau
  d'exploitation souhaite.

Le VPS devra conserver les memes principes: application et PostgreSQL isoles,
sauvegardes hors serveur, HTTPS, supervision, mises a jour et procedure de
restauration.

## Lots ulterieurs

1. `DEPLOY-PROD-ARCHITECTURE-00`
   - definir le Compose de production, les reseaux, le point d'entree et les
     variables attendues sans secret reel;
   - choisir entre reverse proxy et tunnel sortant pour la beta Synology.

2. `BACKUP-RESTORE-00`
   - definir les sauvegardes PostgreSQL, le chiffrement, la retention et un
     exercice de restauration;
   - ne pas exporter de donnees reelles dans le depot.

3. `AUTH-PROVIDER-DECISION-01`
   - choisir le fournisseur OIDC et separer les clients local, beta et
     production;
   - depend d'un domaine public et d'une strategie HTTPS cibles.

4. `DEPLOY-SYNOLOGY-01`
   - appliquer la configuration de beta privee seulement apres revue des
     prerequis, des sauvegardes et de l'authentification;
   - aucun acces PostgreSQL public.

5. `DEPLOY-VPS-00`
   - cadrer la migration vers un VPS europeen et son plan de retour arriere.

## Hors perimetre

- aucun deploiement actif;
- aucun compte cloud, domaine, tunnel ou certificat cree;
- aucun fichier `.env`, secret, cle OAuth ou token;
- aucun changement Docker, schema Prisma, code applicatif ou dependance;
- aucune collecte de telemetrie, IA ou IoT actif.

## References

- [Synology Container Manager - Projets](https://kb.synology.com/fr-fr/DSM/help/ContainerManager/docker_project?version=7)
- [Docker - Images multi-plateformes](https://docs.docker.com/build/building/multi-platform/)
- [Cloudflare Tunnel](https://developers.cloudflare.com/cloudflare-one/networks/connectors/cloudflare-tunnel/)
- [Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)
