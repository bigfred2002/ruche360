# AUTH-REAL-00 - Cadrage de l'authentification reelle

## Objectif

Preparer l'authentification reelle de Rucher360 sans modifier le code, le
schema Prisma, les dependances ou les secrets. Ce cadrage remplace la session
de developpement uniquement dans les futurs lots d'execution.

## Decision produit

Rucher360 doit permettre deux entrees simples:

1. Un apiculteur amateur cree un compte verifie, puis son espace personnel.
   Cet espace devient une organisation dont il est le premier proprietaire.
2. Un membre rejoint une organisation existante uniquement par invitation. Son
   adhesion et ses permissions sont definies par cette organisation.

Un compte peut appartenir a plusieurs organisations. Il choisit une
organisation active apres connexion; les modules visibles et les permissions
sont toujours calcules dans ce contexte actif.

## Architecture cible

- Preferer un fournisseur d'identite gere, compatible OpenID Connect, plutot
  qu'un systeme maison de mots de passe.
- Utiliser le flux Authorization Code avec PKCE pour toute federation OIDC.
- Conserver une session applicative cote serveur, referencee par un identifiant
  opaque dans un cookie `HttpOnly`, `Secure` en production et `SameSite=Lax`.
- Ne jamais stocker un jeton, un identifiant de session ou un jeton de
  rafraichissement dans `localStorage` ou `sessionStorage`.
- Regenerer la session apres connexion, elevation de privilege, changement
  d'email ou recuperation de compte; l'invalider a la deconnexion et a
  expiration.
- Recalculer a chaque action serveur le scope actif: utilisateur, organisation,
  adhesion, modules effectifs et permissions. La session ne remplace jamais le
  controle d'autorisation.
- Garder la session de developpement strictement reservee aux environnements
  locaux et aux fixtures. Elle ne doit pas etre accessible en production.

## Donnees et confidentialite

La future identite applicative conserve uniquement les donnees minimales:

- identifiant interne aleatoire;
- email verifie si l'utilisateur choisit ce moyen de connexion;
- etat du compte;
- date de creation et dernier acces utile;
- identifiant externe pseudonyme si un fournisseur OIDC est utilise.

Ne pas journaliser les jetons, mots de passe, cookies, codes de connexion,
emails complets, adresses IP ou agents utilisateur dans les notes metier. Les
evenements de securite conservent une metadata minimisee et distincte du futur
journal d'activite metier.

## Parcours cible

### Premier apiculteur

1. Connexion ou inscription avec verification d'identite par le fournisseur.
2. Creation guidee d'une organisation personnelle.
3. Creation de l'adhesion `OWNER` active.
4. Activation des modules socle choisis pour l'organisation.
5. Arrivee dans le cockpit avec l'organisation personnelle active.

### Invitation

1. Un proprietaire ou administrateur cree une invitation limitee a son
   organisation.
2. Le destinataire se connecte ou cree son compte.
3. L'invitation est consommee une seule fois et cree ou active l'adhesion.
4. Les modules visibles proviennent des modules de l'organisation, des
   preferences de l'adhesion et des permissions du role.

La desactivation d'un module masque les surfaces et bloque les actions, mais ne
supprime jamais les donnees existantes.

## Securite et operations sensibles

- Messages de connexion, inscription et recuperation generiques pour ne pas
  confirmer l'existence d'un compte.
- Limitation de debit et journalisation des echecs d'authentification dans le
  futur fournisseur ou service dedie.
- Reauthentification ou second facteur a prevoir pour les changements de
  proprietaire, gestion d'administrateurs, export sensible et administration
  plateforme future.
- Ne jamais permettre a un compte utilisateur d'utiliser une identite interne,
  de service ou de base de donnees.
- Les secrets du fournisseur restent hors Git, dans l'environnement de
  deploiement. Aucun secret ne sera ajoute a `.env.example`.

## Lots suivants

1. `AUTH-PROVIDER-DECISION-01`
   - choisir le fournisseur OIDC et le mode de connexion initial;
   - valider hebergement, cout, RGPD, MFA, export et recuperation;
   - documenter les secrets attendus sans les creer ni les committer.

2. `AUTH-SESSION-WEB-01`
   - ajouter l'integration choisie, les routes de connexion/deconnexion et la
     session serveur;
   - remplacer la session de developpement uniquement dans les flux web
     concernes;
   - aucun branchement massif des actions metier dans le meme lot.

3. `AUTH-ONBOARDING-REAL-01`
   - creer l'organisation personnelle et l'adhesion proprietaire apres la
     premiere connexion;
   - ne pas creer de rucher ou de donnee apicole automatiquement.

4. `INVITATIONS-01`
   - ajouter les invitations d'organisation, leurs expirations et leur
     consommation unique.

5. `MODULE-ADMIN-01`
   - rendre operationnelle l'activation de modules par organisation et leur
     visibilite par adhesion, sans suppression de donnees.

6. `AUTH-CUTOVER-ACTIONS-01`
   - remplacer progressivement les fixtures de developpement dans les actions
     materiel, visites, taches et transhumance par le scope authentifie.

## Hors perimetre de AUTH-REAL-00

- aucune dependance d'authentification;
- aucun fournisseur configure;
- aucune route, cookie, JWT, mot de passe ou email;
- aucune migration Prisma;
- aucune cle, secret ou configuration de production;
- aucune modification des permissions, des modules ou des donnees metier.

## References

- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
- [OpenID Connect specifications](https://openid.net/developers/specs/)
