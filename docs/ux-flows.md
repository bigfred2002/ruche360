# Flux UX

## Principes

Les flux doivent être courts, lisibles sur mobile et adaptés au terrain. Une action fréquente ne doit pas nécessiter de traverser plusieurs écrans de configuration.

## Flux initial: rejoindre une organisation

1. L'utilisateur reçoit une invitation.
2. Il crée ou confirme son compte.
3. Il rejoint l'organisation avec un rôle.
4. Il voit uniquement les modules activés pour son organisation et son compte.

## Flux futur: choisir les modules d'un membre

1. Un administrateur choisit une organisation.
2. Il invite ou modifie un membre.
3. Il selectionne un role.
4. Il choisit les modules visibles parmi les modules actives pour l'organisation.
5. L'application masque les modules non visibles pour cette adhesion.
6. Les donnees des modules masques restent conservees.

## Flux initial: consulter un rucher

1. L'utilisateur ouvre la liste des ruchers.
2. Il sélectionne un rucher.
3. Il consulte les ruches, tâches ouvertes, dernières visites et alertes sanitaires.

Le partage initial d'un rucher passe par l'organisation, les roles et les permissions. Un partage fin par rucher sera etudie separement si le besoin est confirme.

## Flux initial: saisir une visite

1. L'utilisateur choisit un rucher.
2. Il sélectionne une ruche ou une colonie si nécessaire.
3. Il saisit observations, actions et suites à prévoir.
4. Il crée des tâches depuis la visite si besoin.
5. La visite est datée et attribuée.

## Flux futur: transhumance

1. L'utilisateur ouvre le module transhumance ou une liste de ruches.
2. Il choisit les ruches a deplacer.
3. Il choisit le rucher destination.
4. Il renseigne date, motif et note.
5. Il confirme le mouvement.
6. L'historique conserve les anciennes localisations.

## Flux initial: suivre varroa

1. L'utilisateur ouvre une ruche ou une colonie.
2. Il ajoute un comptage varroa manuel.
3. Il renseigne méthode, résultat et notes.
4. Il peut créer une tâche de suivi.

## Flux initial: signaler frelon

1. L'utilisateur choisit un rucher.
2. Il signale la pression observée.
3. Il note les actions réalisées.
4. Il peut créer une tâche ou une alerte interne.

## Flux initial: gérer la connaissance

1. Un utilisateur autorisé crée un article.
2. Il le classe par thème.
3. Les autres utilisateurs le consultent selon leurs permissions.

## Flux initial: documents

1. Un utilisateur autorisé ajoute un document.
2. Il le rattache à une organisation ou une entité métier.
3. Les utilisateurs autorisés le consultent.

## Flux futur: consulter le materiel

1. L'utilisateur ouvre le cockpit ou la zone modules.
2. Il accede au module `Materiel` sans surcharge de la navigation basse mobile.
3. Il consulte l'inventaire par categorie, statut ou emplacement.
4. Il distingue les consommables suivis en quantite du materiel durable suivi individuellement.
5. Il repere rapidement le materiel disponible, a nettoyer, en maintenance ou retire du service.

## Flux futur: preparer une intervention

1. L'utilisateur ouvre une visite ou une tache.
2. Il consulte une checklist materiel proposee par le module, si celui-ci est active.
3. Il confirme ou ajuste manuellement le materiel a emporter.
4. Aucune reservation automatique ou obligation de stock n'est appliquee au premier niveau.

## Flux désactivés

Les flux suivants ne doivent pas être actifs au lancement:

- import automatique IoT;
- analyse IA de visite;
- reconnaissance d'espèce;
- comptage varroa par image;
- prescription sanitaire automatique;
- paiement ou marketplace.
- achats, fournisseurs, comptabilite ou destruction reglementaire complexe du materiel.
- partage public de localisation de rucher;
- geolocalisation temps reel de transhumance.
