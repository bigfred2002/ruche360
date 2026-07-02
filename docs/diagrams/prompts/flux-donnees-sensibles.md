# Prompt Archify - Flux De Donnees Sensibles

Utilise Archify pour creer un diagramme de flux de donnees sensibles dans Rucher360.

Objectif:

Montrer quelles donnees doivent rester protegees et quelles frontieres controlent leur acces.

Sources de donnees:

- Organisation.
- Utilisateur et adhesion.
- Ruchers.
- Ruches et colonies.
- Materiel.
- Transhumance.
- Contacts utiles.
- Documents.
- Donnees sanitaires.
- Futures donnees GPS, camera, capteurs et IA, mais desactivees.

Donnees sensibles a marquer:

- localisation de rucher;
- contacts personnels;
- documents;
- observations sanitaires;
- historique de mouvements;
- roles et permissions;
- futures images ou donnees capteurs.

Frontieres a dessiner:

- Organisation comme frontiere principale.
- Role et permission comme barriere d'action.
- Module active ou desactive comme barriere de visibilite.
- Scans de secrets comme barriere depot public.
- Runner local comme zone de confiance manuelle.

Regles:

- Un module desactive ne supprime pas ses donnees.
- Les exports locaux ne doivent pas etre commités.
- Les futures IA/IoT restent inactives jusqu'a lot dedie.
- Les donnees publiques de documentation doivent rester fictives.

Contraintes de sortie:

- Ne pas inclure de vraies coordonnees.
- Ne pas inclure de noms, emails ou telephones reels.
- Ne pas inclure de secret ou chemin local.
- Faire ressortir les zones sensibles visuellement.
