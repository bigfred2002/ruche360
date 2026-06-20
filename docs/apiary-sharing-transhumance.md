# Partage de Rucher et Transhumance

## Objectif

Ce document cadre deux evolutions metier sans les implementer:

- le partage d'un rucher entre plusieurs utilisateurs;
- la transhumance comme mouvement de ruches ou lots de ruches entre sites.

Ces fonctions doivent rester modulaires et ne pas complexifier les petits usages.

## Partage initial d'un rucher

Le partage initial se fait au niveau de l'organisation:

- un rucher appartient a une organisation;
- plusieurs utilisateurs peuvent appartenir a cette organisation;
- leurs roles et permissions determinent ce qu'ils peuvent voir ou modifier.

Ce modele couvre deja les besoins simples:

- exploitation avec plusieurs intervenants;
- association avec plusieurs membres;
- collectif local partageant un espace de travail.

## Partage fin par rucher

Le partage fin par rucher ne doit pas etre implemente tant que le besoin n'est pas confirme.

Un futur module `apiary_access` pourra etre cadre pour:

- donner acces a un rucher precis;
- limiter la visibilite par membre;
- definir un role local eventuel sur un rucher;
- accueillir un intervenant externe sans ouvrir toute l'organisation.

Ce module devra rester optionnel.

## Principe de transhumance

Un rucher represente un site ou emplacement apicole. Il ne doit pas etre traite comme un objet qui se deplace.

La transhumance doit etre modelisee comme un mouvement de ruches ou de lots de ruches entre sites:

- `Apiary`: site apicole;
- `Hive`: contenant mobile;
- mouvement: evenement historique entre deux sites.

Cette approche permet de connaitre l'emplacement courant d'une ruche tout en conservant son historique.

## Donnees cible d'un mouvement

Un futur mouvement de ruche devra pouvoir porter:

- organisation;
- ruche ou groupe de ruches;
- rucher source;
- rucher destination;
- date de depart;
- date d'arrivee optionnelle;
- motif: miellee, pollinisation, hivernage, urgence, sanitaire ou autre;
- statut: prevu, en cours, termine ou annule;
- notes;
- auteur.

## UX cible

La transhumance doit rester courte et terrain:

1. choisir les ruches concernees;
2. choisir le rucher destination;
3. renseigner date, motif et note;
4. confirmer le mouvement;
5. voir l'historique depuis une ruche ou un rucher.

Le flux ne doit pas devenir une logistique complete de transport.

## Limites

Ne pas ajouter dans le premier lot:

- gestion de vehicules;
- planning avance de transport;
- couts de transport;
- contrats de pollinisation;
- geolocalisation temps reel;
- IoT actif;
- partage public de localisation.

Les coordonnees de ruchers restent sensibles et doivent etre minimisee dans l'interface.

## Lots suivants

- `APIARY-ACCESS-00`: cadrer le partage fin par rucher si le besoin est confirme.
- `TRANSHUMANCE-00`: cadrer en detail l'UX et les statuts de transhumance.
- `HIVE-MOVEMENTS-01`: ajouter le modele executable des mouvements de ruches.
