# Prompt Archify - Workflow Agentique

Utilise Archify pour creer un diagramme workflow du cycle de developpement agentique Rucher360.

Flux a representer:

1. Lire `README.md`, `AGENTS.md`, `docs/context.md`, `docs/todo.md` et le lot demande.
2. Verifier `git status --short --branch`.
3. Synchroniser `main`.
4. Creer une branche `codex/<lot>`.
5. Modifier uniquement les fichiers du perimetre.
6. Mettre a jour la documentation et `docs/journal.md`.
7. Executer les validations Docker-first.
8. Executer `make security-scan` et `make secrets-scan`.
9. Pousser la branche avec le hook pre-push actif.
10. Ouvrir une Pull Request draft.
11. Passer en Ready for review quand les validations sont conformes.
12. Attendre la CI verte.
13. Squash merge dans `main`.
14. Synchroniser `main`.

Branches d'erreur a montrer:

- CI echoue: arreter, diagnostiquer, corriger dans le meme lot.
- Secret detecte: ne pas pousser, retirer la donnee, relancer les scans.
- Conflit complexe: arreter et produire un rapport.
- Scope trop large: decouper en nouveau lot.

Contraintes:

- Ne jamais committer directement sur `main`.
- Ne jamais executer `pnpm`, `node`, `npx` ou `prisma` directement sur le Mac.
- Ne pas exposer de secret ou donnee personnelle.
- Diagramme adapte a une revue d'equipe.
