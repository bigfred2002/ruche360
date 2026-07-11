# BACKUP-RESTORE-00 - Sauvegarde Et Restauration

## Objectif

Cadrer la sauvegarde, le chiffrement, la retention et la restauration
PostgreSQL de Rucher360 avant toute beta publique ou exposition externe.

Ce lot ne cree aucun script executable, aucun secret, aucun fichier `.env`,
aucun conteneur et aucun deploiement.

## Decision Retenue

Rucher360 doit commencer par une strategie simple et testable:

1. Sauvegarde logique quotidienne PostgreSQL pour la beta privee.
2. Chiffrement avant sortie de l'hote.
3. Conservation hors hote.
4. Test de restauration regulier.
5. Evolution future vers sauvegardes physiques et PITR si le volume ou le RPO
   l'exige.

La sauvegarde n'est consideree valide que si une restauration a ete testee.

## Principes

- PostgreSQL reste prive et non expose sur Internet.
- Les sauvegardes ne sont jamais commitees.
- Les dumps ne sont jamais stockes dans le depot public.
- Les sauvegardes sont chiffrees avant transfert hors hote.
- La cle de chiffrement publique peut etre referencee; les cles privees restent
  hors depot et hors logs.
- Les restaurations doivent etre testees dans un environnement separe.
- Les donnees restaurees ne doivent pas etre melangees avec le developpement
  local fictif sans decision explicite.

## Donnees A Sauvegarder

Minimum beta:

- base PostgreSQL applicative;
- roles PostgreSQL utiles si geres hors migration;
- configuration de schema via migrations versionnees;
- metadata d'exploitation non sensible;
- references des versions applicatives.

Hors sauvegarde applicative directe:

- secrets;
- tokens;
- cles privees;
- fichiers `.env`;
- logs contenant des donnees sensibles;
- exports locaux temporaires.

Les documents futurs devront avoir un plan de sauvegarde dedie si un stockage
fichier ou objet est introduit.

## Strategie Beta Privee

Pour une beta Synology ou VPS simple, la strategie cible est:

- dump logique quotidien avec un format restaurable par `pg_restore`;
- chiffrement du fichier de sauvegarde;
- copie hors hote;
- retention courte locale et retention plus longue hors hote;
- verification de presence et de taille;
- restauration testee sur une base separee.

Le format archive PostgreSQL custom ou directory est prefere au SQL texte pour
les sauvegardes applicatives, car il permet une restauration plus flexible via
`pg_restore`.

## Retention Cible

Retention initiale recommandee:

| Type | Conservation |
| --- | --- |
| Quotidienne | 7 a 14 jours |
| Hebdomadaire | 4 a 8 semaines |
| Mensuelle | 6 a 12 mois si donnees reelles |
| Test de restauration | au moins mensuel pendant beta |

Cette retention devra etre ajustee selon:

- volume de donnees;
- sensibilite des informations;
- cout de stockage;
- exigences utilisateur;
- obligations legales futures.

## Chiffrement

Regles:

- chiffrer avant transfert hors hote;
- utiliser une cle publique ou un recipient public pour chiffrer;
- conserver la cle privee hors depot, hors NAS expose et hors logs;
- documenter qui peut restaurer;
- tester la restauration avec la cle de decryptage stockee separement.

Le nom indicatif `BACKUP_ENCRYPTION_PUBLIC_KEY` peut etre utilise dans la
documentation d'environnement, sans valeur reelle.

## Restauration

Une restauration doit etre testee dans une base distincte.

Checklist minimale:

- recuperer la sauvegarde chiffree;
- dechiffrer dans un espace temporaire securise;
- restaurer vers une base vide separee;
- lancer les migrations ou controles de version attendus;
- verifier les tables principales;
- verifier quelques compteurs;
- verifier qu'aucun secret n'a ete restaure dans les logs;
- supprimer les fichiers temporaires dechiffres.

La restauration ne doit jamais ecraser une base de production sans procedure
explicite de retour arriere et validation humaine.

## RPO Et RTO

Definitions cibles:

- RPO: perte de donnees maximale acceptable.
- RTO: temps maximal acceptable pour retablir le service.

Objectif beta initial:

- RPO: 24 heures maximum avec sauvegarde quotidienne.
- RTO: quelques heures, selon acces a l'hote et disponibilite de la sauvegarde.

Si ces objectifs deviennent insuffisants, un lot futur devra cadrer:

- sauvegardes plus frequentes;
- archivage WAL;
- sauvegarde physique;
- PITR;
- supervision automatisee des echecs.

## Evolution PITR

PostgreSQL permet une restauration a un point dans le temps avec sauvegarde
physique et archivage continu des WAL.

Cette approche n'est pas le premier niveau de beta, mais elle devient pertinente
si:

- le volume rend les dumps trop longs;
- le RPO de 24 heures est trop large;
- plusieurs organisations utilisent la plateforme;
- une restauration fine apres erreur humaine devient necessaire.

Avant PITR, il faudra documenter:

- `archive_mode`;
- conservation des WAL;
- base backups;
- verification des backups;
- cout disque et reseau;
- procedure de restauration complete.

## Supervision Minimale

Alertes cibles:

- sauvegarde non produite;
- sauvegarde non transferee hors hote;
- taille anormale;
- echec de chiffrement;
- echec de restauration de test;
- espace disque bas;
- cle ou recipient de chiffrement non disponible;
- expiration certificat ou indisponibilite HTTP.

## Hors Perimetre

Ce lot ne cree pas:

- script de backup;
- job cron;
- conteneur supplementaire;
- fichier Compose de production;
- secret;
- cle de chiffrement;
- dump;
- donnees reelles;
- bucket cloud;
- NAS configure;
- modification Prisma;
- route applicative;
- export utilisateur.

## Lots Suivants

1. `AUTH-PROVIDER-DECISION-01`
   - choisir le fournisseur OIDC et separer local, beta et production.

2. `BACKUP-RESTORE-01`
   - ajouter scripts ou commandes de sauvegarde seulement apres validation de
     l'hebergement cible.

3. `DEPLOY-SYNOLOGY-01`
   - preparer la beta privee quand auth et sauvegarde sont cadrees.

4. `DEPLOY-VPS-00`
   - cadrer migration VPS, supervision et retour arriere.

## References

- [PostgreSQL - SQL Dump](https://www.postgresql.org/docs/current/backup-dump.html)
- [PostgreSQL - pg_dump](https://www.postgresql.org/docs/current/app-pgdump.html)
- [PostgreSQL - pg_restore](https://www.postgresql.org/docs/current/app-pgrestore.html)
- [PostgreSQL - Continuous Archiving and PITR](https://www.postgresql.org/docs/current/continuous-archiving.html)
- [PostgreSQL - pg_basebackup](https://www.postgresql.org/docs/current/app-pgbasebackup.html)
- [PostgreSQL - pg_verifybackup](https://www.postgresql.org/docs/current/app-pgverifybackup.html)
