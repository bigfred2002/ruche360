# DESIGN.md

## Intention produit

Rucher360 doit aider des apiculteurs, associations, exploitations ou collectifs à suivre leurs ruches sans transformer le terrain en saisie administrative lourde.

L'interface doit être calme, lisible, efficace en mobilité et utilisable avec une connectivité imparfaite. Les écrans doivent privilégier la saisie rapide, la consultation claire et la continuité entre rucher, ruche, colonie, visite et tâche.

## Principes UX

- Terrain d'abord: les actions fréquentes doivent rester accessibles sur mobile.
- Sobriété: peu d'effets visuels, beaucoup de lisibilité.
- Modularité visible: un utilisateur ne voit que les modules activés pour son organisation et pour son compte.
- Historique clair: toute observation importante doit être datée, attribuée et reliée à une entité métier.
- Faible consommation: les fonctionnalités de configuration de ruche doivent tenir compte des contraintes énergie, réseau et matériel.

## Ton éditorial

- Français clair.
- Vocabulaire apicole précis mais pas jargonnant.
- Libellés courts dans l'interface.
- Aides contextuelles concises.

## Objets métier structurants

- Organisation.
- Utilisateur.
- Rôle.
- Permission.
- Module.
- Rucher.
- Ruche.
- Colonie.
- Visite.
- Tâche.
- Observation sanitaire.
- Suivi varroa.
- Signalement frelon.
- Récolte.
- Document.
- Contact.
- Article de connaissance.
- Configuration basse consommation.

## Contraintes visuelles futures

- Interface dense mais respirante.
- Cartes réservées aux éléments répétés ou aux panneaux réellement encadrés.
- Navigation prévisible.
- Etats vides utiles, sans discours marketing.
- Icônes pour les actions courantes quand une bibliothèque d'icônes sera choisie.

## Conventions appliquées dans DESIGN-SHELL-01

- Shell mobile-first avec navigation basse sur mobile et repères de navigation sobres sur desktop.
- Palette inspirée miel, végétal, ardoise et crème, avec contrastes lisibles en extérieur.
- Cartes arrondies réservées aux synthèses, modules visibles et modules optionnels.
- Badges d'état simples pour distinguer les surfaces statiques des modules à venir.
- Modules IA et connectés affichés comme prévus mais désactivés, sans action opérationnelle.

## Itération Stitch DESIGN-SHELL-01

- Références analysées: exports Stitch mobile `mobile-v1` et desktop `desktop-v1`.
- Palette renforcée: ambre primaire, crème anti-éblouissement, vert sauge, vert profond et ardoise.
- Desktop: sidebar gauche persistante, topbar avec recherche décorative et grille de cockpit plus large.
- Mobile: navigation basse à cinq entrées, cartes empilées, zones tactiles hautes et badges lisibles.
- Fond: motif très discret inspiré rayon/miel, sans asset externe ni image importée.
- Micro-animations: transitions de survol et élévation légère sur desktop, neutralisées via `prefers-reduced-motion`.
- Non repris: HTML/CSS Stitch généré, boutons d'activation, formulaires, routes métier, images de démonstration et modules actifs IA/IoT.
