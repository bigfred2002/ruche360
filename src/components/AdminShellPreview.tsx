import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

const adminCards = [
  {
    detail: "Profil, statut et paramètres généraux de l'espace apicole.",
    label: "Organisation",
    metric: "1 espace",
    permission: "organization.manage",
  },
  {
    detail: "Membres, adhésions, rôles et accès par organisation.",
    label: "Membres",
    metric: "À cadrer",
    permission: "users.manage",
  },
  {
    detail: "Modules actifs, visibilité par adhésion et fonctions masquées.",
    label: "Modules",
    metric: "Actifs / prévus",
    permission: "modules.manage",
  },
  {
    detail: "Compteurs futurs par module: ruchers, ruches, matériel et transhumance.",
    label: "Données",
    metric: "Lecture seule",
    permission: "admin.data.read futur",
  },
  {
    detail: "Rappels de confidentialité, dépendances, runner local et contrôles pre-push.",
    label: "Sécurité",
    metric: "Garde-fous",
    permission: "organization.manage",
  },
  {
    detail: "Journal d'activité métier prévu, distinct des audits techniques.",
    label: "Journal",
    metric: "À venir",
    permission: "admin.audit.read futur",
  },
] as const;

const governanceRules = [
  "Administration d'organisation d'abord, pas de plateforme globale.",
  "Archivage et statuts avant suppression dure.",
  "Aucun module désactivé ne perd ses données.",
  "Aucune action admin ne contourne les permissions métier.",
];

export function AdminShellPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/admin");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Shell admin" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Administration</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Centre d&apos;organisation
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Première surface de lecture pour cadrer l&apos;administration
                  d&apos;une organisation: membres, rôles, modules, données,
                  sécurité, journal et archivage. Aucun réglage réel,
                  formulaire ou suppression n&apos;est actif.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Position
                </p>
                <p className="mt-3 text-3xl font-black">Secondaire</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Visible en desktop et catalogue, volontairement absent de la
                  navigation basse mobile.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {adminCards.map((card) => (
              <article
                className="motion-card surface-panel rounded-2xl p-5"
                key={card.label}
              >
                <div className="flex items-start justify-between gap-3">
                  <span className="grid size-11 place-items-center rounded-2xl bg-slate-100 text-xs font-black text-slate-800 ring-1 ring-slate-200">
                    {card.label.slice(0, 2)}
                  </span>
                  <StatusBadge label={card.metric} tone="soon" />
                </div>
                <p className="section-kicker mt-5">{card.permission}</p>
                <h2 className="mt-2 text-lg font-black text-slate-950">
                  {card.label}
                </h2>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {card.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <div className="surface-panel rounded-3xl p-5 sm:p-6">
              <p className="section-kicker">Gouvernance</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Règles à préserver
              </h2>
              <div className="mt-5 grid gap-3 sm:grid-cols-2">
                {governanceRules.map((rule) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-cream-50 p-4"
                    key={rule}
                  >
                    <StatusBadge label="Cadré" tone="active" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {rule}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Limites</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Pas un back-office global
              </h2>
              <p className="mt-3 text-sm leading-6 text-field-muted">
                Cette surface prépare l&apos;administration d&apos;une
                organisation. L&apos;administration plateforme reste un futur
                lointain dépendant d&apos;une authentification réelle et de
                rôles dédiés.
              </p>
            </aside>
          </section>

          <StatePanel
            detail="Le shell /admin prépare la navigation et les conventions visuelles. Les compteurs, le journal, les exports et les actions d'administration arriveront dans des lots dédiés."
            kind="coming-soon"
            label="Sans CRUD"
            title="Administration cadrée, actions non actives"
          />
        </div>
      </div>
    </AppShell>
  );
}
