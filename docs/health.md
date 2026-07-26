# Module Sanitaire

## Objectif

Le module sanitaire pose un suivi terrain sobre pour les observations de sante,
le varroa et le frelon. Il aide a conserver des faits observes, sans produire de
diagnostic automatique, de prescription ou d'alerte non validee.

`HEALTH-FOUNDATION-BUNDLE-01` regroupe le socle documentaire, le modele
executable minimal et les actions serveur minimales.

## Perimetre Actuel

Le lot ajoute trois familles de donnees:

- `HealthObservation`: observation sanitaire simple liee a une organisation;
- `VarroaRecord`: releve varroa manuel;
- `HornetRecord`: signalement de pression frelon.

Chaque entree reste rattachee a une organisation. Les liens vers rucher, ruche,
colonie, visite et auteur sont optionnels pour ne pas forcer un parcours terrain
trop lourd.

## Permissions

Les permissions existantes pilotent le module:

- `health.read`: consulter les observations et releves;
- `health.write`: creer des observations et releves.

Les modules `health`, `varroa` et `hornet` peuvent etre visibles separement dans
la registry, mais les actions serveur restent controlees par les permissions
sanitaires communes.

## Modele Minimal

### Observation Sanitaire

Une observation contient:

- categorie;
- gravite;
- date d'observation;
- libelle;
- notes optionnelles;
- contexte optionnel: rucher, ruche, colonie, visite.

La gravite sert au tri humain. Elle ne declenche aucune prescription ni tache.

### Releve Varroa

Un releve contient:

- methode de controle;
- date;
- nombre de varroas optionnel;
- taille d'echantillon optionnelle;
- taux optionnel saisi manuellement;
- notes optionnelles.

Le taux est une donnee saisie ou calculee par un futur lot explicite. Aucun seuil
automatique n'est actif dans ce socle.

### Signalement Frelon

Un signalement contient:

- pression observee;
- date;
- nombre observe optionnel;
- nombre de pieges optionnel;
- notes optionnelles;
- contexte rucher ou visite optionnel.

Le signalement reste informatif. Il ne cree pas d'alerte ou de plan d'action par
defaut.

## Actions Serveur

Les actions serveur minimales couvrent:

- lecture des observations sanitaires;
- lecture des releves varroa;
- lecture des signalements frelon;
- creation explicite d'une observation;
- creation explicite d'un releve varroa;
- creation explicite d'un signalement frelon.

Elles utilisent le contrat `ApplicationSession` et le scope actif de
l'organisation. Aucune API publique, session navigateur, authentification reelle
ou formulaire UI n'est ajoute dans ce lot.

## Limites

Le module ne fait pas:

- diagnostic sanitaire automatique;
- prescription;
- creation automatique de tache;
- notification;
- analyse IA;
- comptage image varroa;
- reconnaissance d'espece;
- appel a un service externe;
- IoT ou capteur actif.

## Seed De Developpement

Le seed local ajoute trois donnees fictives:

- une observation sanitaire de surveillance sur une visite ouverte;
- un releve varroa manuel;
- un signalement frelon de pression faible.

Ces donnees sont generiques et ne contiennent pas de personne reelle, localisation
precise ou secret.

## Lots Futurs

- `HEALTH-FORMS-SHELL-01`: brancher une interface de developpement en lecture et
  saisie explicite.
- `HEALTH-FIELD-LINKS-01`: afficher les signaux sanitaires utiles dans visites,
  ruches et cockpit sans surcharger.
- `HEALTH-STATUS-UX-01`: harmoniser badges, gravites et etats sans dramatiser.
- `VARROA-FOLLOWUP-01`: enrichir les releves varroa manuels, sans comptage IA.
- `HORNET-FOLLOWUP-01`: enrichir le suivi frelon, sans alerte automatique.
