# Notes Audio De Visite

## Objectif

`VISIT-AUDIO-00` cadre une future capacite de prise de note audio pendant une
visite de ruche, sans l'implementer.

L'objectif est de faciliter les manipulations terrain: l'apiculteur peut garder
les mains libres, enregistrer une observation courte, puis relire ou transformer
cette note apres la visite.

Cette capacite doit rester une extension optionnelle du module `visits`, pas un
module IA autonome ni une source automatique de decision.

## Decision Produit

La posture retenue est **local-first avec consentement explicite**.

Principe cible:

```text
note audio = aide terrain + brouillon de visite + validation humaine
```

L'audio ne doit jamais creer automatiquement:

- diagnostic sanitaire;
- prescription;
- tache;
- observation definitive;
- action metier;
- export ou partage.

La transcription et l'aide IA sont interessantes, mais elles doivent rester des
lots separes, desactives par defaut et toujours soumises a validation humaine.

## Positionnement Modulaire

La capacite cible est `visit_audio_notes`.

Elle depend fonctionnellement de `visits`, mais doit rester activable
separement:

- l'organisation active ou desactive `visit_audio_notes`;
- l'adhesion membre peut masquer cette capacite;
- les permissions de visite restent necessaires;
- les donnees audio existantes sont conservees si le module est desactive.

Permissions futures possibles:

- `visit_audio_notes.read`;
- `visit_audio_notes.write`;
- `visit_audio_notes.manage`, seulement si la conservation ou suppression audio
  demande une administration dediee.

## Parcours Cibles

### Pendant La Visite

Le parcours mobile doit rester tres court:

1. ouvrir une visite ou une ruche active;
2. appuyer sur un gros bouton micro;
3. parler librement ou dicter une observation courte;
4. mettre en pause ou reprendre;
5. sauvegarder la note comme brouillon rattache a la visite.

L'interface doit indiquer clairement:

- si l'enregistrement est actif;
- si le micro est refuse ou indisponible;
- si la note est sauvegardee;
- que l'audio n'est pas encore analyse.

### Apres La Visite

La saisie apres coup doit etre prevue des le cadrage.

Parcours cible:

1. relire l'audio depuis la fiche visite;
2. ajouter ou corriger une note texte;
3. lancer une transcription a la demande si le module de transcription est
   active;
4. relire et corriger la transcription;
5. transformer volontairement une partie en observation ou suite a prevoir.

Cette approche evite de forcer la saisie detaillee au rucher tout en gardant un
historique exploitable.

## Trois Niveaux A Separer

### Audio Brut

Capture et stockage d'un fichier audio rattache a une visite.

Contraintes:

- consentement micro explicite;
- statut de sauvegarde visible;
- conservation controlee;
- pas de traitement automatique;
- pas d'appel externe dans le premier lot executable.

### Transcription

Transformation de l'audio en texte, uniquement a la demande.

Contraintes:

- resultat en brouillon;
- correction utilisateur obligatoire avant usage metier;
- conservation du lien avec la note audio source;
- langues et qualite a cadrer;
- cout et confidentialite a expliciter si un service externe est utilise.

### Aide IA

Suggestion de structuration depuis une transcription validee.

Contraintes:

- jamais de diagnostic ou prescription;
- jamais de creation automatique de tache ou observation;
- proposition lisible et editable;
- confirmation explicite avant tout enregistrement metier;
- module IA desactive par defaut.

## UX Et Accessibilite

Mobile terrain:

- un bouton micro principal, avec cible tactile confortable;
- libelles courts;
- feedback immediat: enregistrement, pause, sauvegarde, erreur;
- reprise possible apres interruption;
- aucune densite de formulaire pendant la manipulation.

Desktop:

- relecture audio;
- correction de transcription;
- decoupage volontaire en observations;
- comparaison audio, texte et visite.

Accessibilite:

- la transcription doit aider la relecture, mais ne doit pas devenir le seul
  moyen d'acceder a l'information;
- les etats audio ne doivent pas etre communiques uniquement par la couleur;
- les controles doivent rester utilisables au clavier sur desktop;
- les erreurs micro doivent etre explicites.

## Donnees Sensibles

Une note audio peut contenir:

- localisation de rucher;
- informations sanitaires;
- noms de personnes;
- habitudes de passage;
- commentaires personnels;
- informations commerciales ou associatives.

Regles cible:

- ne pas exposer l'audio dans les exports larges par defaut;
- eviter de recopier le contenu audio dans le journal d'activite;
- privilegier un resume d'action dans l'audit metier;
- documenter les durees de conservation avant toute suppression automatique;
- ne jamais envoyer d'audio a un service externe sans activation explicite.

## References Techniques

Pour une application web, la capture audio peut s'appuyer plus tard sur:

- `MediaRecorder`;
- `MediaStream Recording API`;
- stockage applicatif controle par Rucher360.

La reconnaissance vocale navigateur native doit rester prudente:

- `SpeechRecognition` n'est pas une base universelle fiable;
- la disponibilite varie selon navigateur et plateforme;
- une transcription robuste demandera probablement un service dedie ou un
  moteur local a cadrer separement.

References:

- MDN MediaRecorder: https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
- MDN MediaStream Recording API: https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API
- MDN SpeechRecognition: https://developer.mozilla.org/en-US/docs/Web/API/SpeechRecognition
- W3C Web Speech API: https://webaudio.github.io/web-speech-api/

## Lots Suivants Possibles

1. `VISIT-AUDIO-01`
   - ajouter le modele minimal de piece audio liee a une visite;
   - aucun enregistrement navigateur;
   - aucune transcription.

2. `VISIT-AUDIO-SHELL-01`
   - preparer une interface statique mobile-first de capture et relecture;
   - afficher la capacite comme optionnelle;
   - aucun acces micro reel.

3. `VISIT-AUDIO-CAPTURE-01`
   - activer la capture audio navigateur;
   - stocker localement ou cote serveur Rucher360;
   - aucun traitement IA.

4. `VISIT-TRANSCRIPTION-00`
   - cadrer transcription, cout, langues, confidentialite et conservation;
   - choisir moteur local ou service externe;
   - aucun code.

5. `VISIT-TRANSCRIPTION-01`
   - transcription a la demande;
   - resultat en brouillon a valider;
   - aucune observation definitive automatique.

6. `VISIT-AI-ASSIST-00`
   - cadrer l'aide IA de structuration de visite;
   - definir les garde-fous et limites;
   - garder l'IA desactivee.

## Hors Perimetre

`VISIT-AUDIO-00` ne cree pas:

- schema Prisma;
- migration;
- route;
- composant;
- enregistrement micro;
- stockage de fichier;
- transcription;
- IA active;
- API externe;
- diagnostic sanitaire;
- prescription;
- tache automatique;
- export audio.
