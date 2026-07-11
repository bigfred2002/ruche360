# AUTH-PROVIDER-DECISION-01 - Fournisseur D'Authentification

## Objectif

Choisir le fournisseur d'authentification initial de Rucher360 sans l'integrer
dans le code, sans ajouter de dependance, sans creer de secret et sans modifier
le schema Prisma.

Ce lot prepare `AUTH-SESSION-WEB-01`, `AUTH-ONBOARDING-REAL-01`,
`INVITATIONS-01` et les futurs deploiements beta.

## Decision Retenue

Rucher360 retient une federation OpenID Connect avec Google comme fournisseur
initial pour la beta privee.

Raisons:

- experience utilisateur simple pour un premier cercle de testeurs;
- fournisseur OIDC largement disponible;
- gestion externe du mot de passe et de la verification email;
- reduction du risque d'un systeme maison de mots de passe;
- compatibilite avec une future session serveur applicative.

La decision reste reversible: l'application doit conserver une couche interne
`Account` / `User` / `Membership` qui ne depend pas directement de Google.
Google sert a verifier l'identite, pas a porter les permissions metier.

## Portee Du Fournisseur

Google OIDC doit uniquement fournir:

- identite verifiee;
- identifiant externe stable du fournisseur;
- email verifie si disponible;
- informations minimales de profil si necessaires a l'affichage.

Google ne doit pas fournir:

- roles Rucher360;
- organisations;
- permissions;
- modules actifs;
- donnees apicoles;
- stockage documentaire;
- acces Google Drive ou autre API Google par defaut.

Scopes initiaux cibles:

```text
openid
email
profile
```

Tout scope supplementaire devra faire l'objet d'un lot dedie.

## Flux Cible

Le flux cible est Authorization Code avec PKCE, puis session applicative serveur.

Etapes:

1. L'utilisateur demande a se connecter.
2. Rucher360 genere `state`, `nonce` et les donnees PKCE.
3. L'utilisateur est redirige vers le fournisseur OIDC.
4. Le fournisseur renvoie un code vers une URL de callback autorisee.
5. Le serveur echange le code contre des jetons.
6. Le serveur valide l'ID token: issuer, audience, expiration, nonce et email
   verifie si requis.
7. Rucher360 cree ou retrouve le compte interne.
8. Rucher360 cree une session serveur opaque dans un cookie `HttpOnly`,
   `Secure` en production et `SameSite=Lax`.
9. Les actions serveur recalculent organisation active, adhesion, modules et
   permissions depuis la base, jamais depuis le fournisseur seul.

## Environnements Separes

Les clients OAuth/OIDC doivent etre separes:

| Environnement | URL cible | Client OAuth |
| --- | --- | --- |
| Local | `http://localhost:3000` | client local dedie |
| Beta privee | domaine HTTPS beta | client beta dedie |
| Production | domaine HTTPS production | client production dedie |

Regles:

- un secret par environnement;
- URI de redirection exactes et distinctes;
- aucun secret dans Git;
- aucun secret dans `.env.example`;
- consent screen adapte a l'environnement;
- domaines sans information personnelle.

## Variables Attendues Sans Valeur Reelle

Noms indicatifs pour les lots futurs:

```text
AUTH_PROVIDER=google
AUTH_TRUSTED_ISSUER
AUTH_CLIENT_ID
AUTH_CLIENT_SECRET
AUTH_REDIRECT_URI
SESSION_SECRET
```

Ces variables ne doivent pas etre ajoutees avec des valeurs reelles dans le
depot. Le lot d'integration pourra documenter des exemples non secrets si
necessaire.

## Donnees Internes

La base Rucher360 doit rester source de verite pour:

- utilisateur interne;
- statut du compte;
- organisations;
- adhesions;
- roles;
- permissions;
- modules visibles.

Le fournisseur OIDC donne une preuve d'identite. Il ne decide jamais qu'un
utilisateur peut voir un rucher, modifier une visite ou administrer une
organisation.

## Securite

Regles cible:

- utiliser une bibliotheque OIDC mature lors de l'integration;
- ne jamais stocker les jetons dans `localStorage` ou `sessionStorage`;
- ne jamais journaliser code, ID token, access token, refresh token, cookie ou
  client secret;
- verifier `state` pour prevenir les attaques CSRF;
- verifier `nonce` pour prevenir les relectures;
- verifier `issuer`, `audience`, `expiration` et signature de l'ID token;
- limiter les messages d'erreur pour ne pas confirmer l'existence d'un compte;
- prevoir reauthentification ou second facteur pour les actions sensibles
  futures.

## Onboarding Produit

Deux parcours restent retenus:

### Apiculteur Individuel

1. Connexion Google.
2. Creation ou recuperation du compte interne.
3. Creation guidee d'une organisation personnelle.
4. Adhesion `OWNER`.
5. Choix des modules utiles.
6. Arrivee dans le cockpit.

### Membre Invite

1. Reception d'une invitation limitee.
2. Connexion Google.
3. Verification que l'email ou le compte correspond a l'invitation.
4. Creation ou activation de l'adhesion.
5. Acces a l'organisation avec roles, modules et permissions definis par
   l'organisation.

## Risques Et Limites

- Certains utilisateurs peuvent ne pas vouloir utiliser Google.
- La beta depend de la disponibilite du fournisseur.
- Le consentement et la configuration Google Cloud doivent etre maintenus.
- Un futur public professionnel peut exiger un autre fournisseur OIDC.
- Le lien email ne suffit pas pour autoriser l'acces: l'invitation et
  l'adhesion restent obligatoires.

Mitigation:

- conserver une couche interne fournisseur-agnostique;
- ne pas modeler les permissions sur les groupes Google;
- garder un champ fournisseur externe distinct de l'identite interne;
- reserver l'ajout d'un second fournisseur a un lot ulterieur.

## Hors Perimetre

Ce lot ne cree pas:

- dependance d'authentification;
- route de login;
- callback OAuth;
- cookie;
- secret;
- client Google;
- compte Google Cloud;
- migration Prisma;
- UI de connexion;
- email d'invitation;
- MFA;
- API publique;
- integration Google Drive;
- IA ou IoT actif.

## Lots Suivants

1. `AUTH-SESSION-WEB-01`
   - integrer le fournisseur choisi et creer la session serveur.

2. `AUTH-ONBOARDING-REAL-01`
   - creer l'organisation personnelle et l'adhesion proprietaire.

3. `INVITATIONS-01`
   - ajouter les invitations d'organisation.

4. `AUTH-CUTOVER-ACTIONS-01`
   - remplacer progressivement la session de developpement dans les actions
     metier.

## References

- [Google - OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect)
- [OpenID Connect Core 1.0](https://openid.net/specs/openid-connect-core-1_0.html)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
- [OWASP Session Management Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Session_Management_Cheat_Sheet.html)
