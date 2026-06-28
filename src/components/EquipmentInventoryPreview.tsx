import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

const summaryCards = [
  {
    label: "Disponible",
    value: "126",
    detail: "Cadres, hausses, protections et outils prêts",
    tone: "active" as const,
  },
  {
    label: "À nettoyer",
    value: "18",
    detail: "Matériel à revoir après visite ou récolte",
    tone: "amber" as const,
  },
  {
    label: "Maintenance",
    value: "4",
    detail: "Éléments à réparer ou contrôler",
    tone: "alert" as const,
  },
];

const inventoryGroups = [
  {
    category: "Consommables",
    examples: "Cadres, cire, pots, nourrissement",
    mode: "Quantité",
    location: "Local miellerie",
    status: "Suivi simple",
  },
  {
    category: "Outils terrain",
    examples: "Enfumoir, lève-cadres, caisse de visite",
    mode: "Individuel",
    location: "Caisse tournée",
    status: "Prêt",
  },
  {
    category: "Récolte",
    examples: "Extracteur, maturateur, seaux, filtres",
    mode: "Hybride",
    location: "Zone extraction",
    status: "À planifier",
  },
  {
    category: "Protection",
    examples: "Combinaisons, voiles, gants, bottes",
    mode: "Individuel",
    location: "Vestiaire",
    status: "À contrôler",
  },
];

const visualFilters = ["Tous", "Disponible", "À nettoyer", "Maintenance", "Rucher"];

const maintenanceItems = [
  "Enfumoir à vider et brosser",
  "Combinaison à laver",
  "Maturateur à contrôler",
];

export function EquipmentInventoryPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/equipment");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Inventaire statique" tone="preview" />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Module matériel</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Matériel
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Vue d&apos;inventaire mobile-first pour cadrer le futur suivi du
                  matériel apicole. Les cartes sont statiques: aucune création,
                  modification, réservation ou décrément de stock n&apos;est actif.
                </p>
              </div>
              <div className="rounded-3xl bg-gradient-amber p-5 text-white shadow-amber">
                <p className="text-sm font-bold uppercase tracking-wide text-amber-100">
                  Principe
                </p>
                <p className="mt-3 text-3xl font-black">Sobre</p>
                <p className="mt-2 text-sm leading-6 text-amber-50">
                  Quantités pour consommables, items pour matériel durable.
                </p>
              </div>
            </div>
          </section>

          <section className="grid gap-4 md:grid-cols-3">
            {summaryCards.map((card) => (
              <article className="surface-panel rounded-2xl p-5" key={card.label}>
                <div className="flex items-start justify-between gap-3">
                  <p className="text-sm font-black uppercase text-slate-650">
                    {card.label}
                  </p>
                  <StatusBadge label="Preview" tone={card.tone} />
                </div>
                <p className="mt-4 text-4xl font-black text-slate-950">
                  {card.value}
                </p>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {card.detail}
                </p>
              </article>
            ))}
          </section>

          <section className="surface-panel rounded-3xl p-5 sm:p-6">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p className="section-kicker">Filtres visuels</p>
                <h2 className="mt-2 text-2xl font-black text-slate-950">
                  Lire vite sans lancer d&apos;action
                </h2>
              </div>
              <StatusBadge label="Non fonctionnel" tone="soon" />
            </div>
            <div className="mt-5 flex flex-wrap gap-2">
              {visualFilters.map((filter, index) => (
                <span
                  className={`rounded-full border px-4 py-2 text-sm font-black ${
                    index === 0
                      ? "border-amber-200 bg-amber-100 text-amber-950"
                      : "border-cream-300 bg-white text-slate-700"
                  }`}
                  key={filter}
                >
                  {filter}
                </span>
              ))}
            </div>
          </section>

          <section className="grid gap-4 lg:grid-cols-[1fr_20rem]">
            <div className="grid gap-4 md:grid-cols-2">
              {inventoryGroups.map((group) => (
                <article
                  className="motion-card surface-panel rounded-2xl p-5"
                  key={group.category}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="section-kicker">{group.mode}</p>
                      <h3 className="mt-2 text-xl font-black text-slate-950">
                        {group.category}
                      </h3>
                    </div>
                    <StatusBadge label={group.status} tone="preview" />
                  </div>
                  <p className="mt-3 text-sm leading-6 text-field-muted">
                    {group.examples}
                  </p>
                  <div className="mt-4 rounded-2xl border border-cream-300 bg-cream-50 p-3">
                    <p className="text-xs font-black uppercase text-amber-800">
                      Emplacement indicatif
                    </p>
                    <p className="mt-1 text-sm font-bold text-slate-800">
                      {group.location}
                    </p>
                  </div>
                </article>
              ))}
            </div>

            <aside className="surface-muted rounded-3xl p-5">
              <p className="section-kicker">Maintenance</p>
              <h2 className="mt-2 text-2xl font-black text-slate-950">
                Points à revoir
              </h2>
              <div className="mt-5 space-y-3">
                {maintenanceItems.map((item) => (
                  <div
                    className="rounded-2xl border border-cream-300 bg-white p-4"
                    key={item}
                  >
                    <StatusBadge label="À venir" tone="soon" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <StatePanel
            detail="Le futur CRUD ajoutera création, ajustement de quantité, changement de statut et déplacement simple. Rien de cela n'est actif dans cette page."
            kind="coming-soon"
            label="Shell seulement"
            title="Inventaire prêt pour le prochain lot"
          />
        </div>
      </div>
    </AppShell>
  );
}
