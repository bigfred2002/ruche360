import type { EquipmentInventorySnapshot } from "@/features/equipment/service";
import type {
  EquipmentItemStatus,
  EquipmentItemSummary,
  EquipmentTrackingMode,
} from "@/features/equipment/types";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { EquipmentFormsPreview } from "./EquipmentFormsPreview";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";

type EquipmentInventoryPreviewProps = {
  inventory: EquipmentInventorySnapshot | null;
};

type InventoryGroup = {
  category: string;
  examples: string;
  mode: string;
  location: string;
  status: string;
};

const fallbackSummaryCards = [
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

const fallbackInventoryGroups: InventoryGroup[] = [
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

const fallbackMaintenanceItems = [
  "Enfumoir à vider et brosser",
  "Combinaison à laver",
  "Maturateur à contrôler",
];

export function EquipmentInventoryPreview({ inventory }: EquipmentInventoryPreviewProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/equipment");
  const hasLiveInventory = Boolean(inventory);
  const typeById = new Map(inventory?.types.map((type) => [type.id, type]) ?? []);
  const summaryCards = inventory ? createLiveSummaryCards(inventory) : fallbackSummaryCards;
  const inventoryGroups = inventory
    ? createLiveGroups(inventory)
    : fallbackInventoryGroups;
  const maintenanceItems = inventory
    ? createLiveMaintenanceItems(inventory, typeById)
    : fallbackMaintenanceItems;

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge
              label={hasLiveInventory ? "Lecture Prisma active" : "Seed local attendu"}
              tone={hasLiveInventory ? "active" : "soon"}
            />
            <div className="mt-5 grid gap-6 lg:grid-cols-[1fr_20rem] lg:items-end">
              <div>
                <p className="section-kicker">Module matériel</p>
                <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
                  Matériel
                </h1>
                <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
                  Vue d&apos;inventaire mobile-first alimentée par le seed de
                  développement quand la base locale est prête. Les écritures
                  restent cadrées: les formulaires affichent les futurs
                  branchements sans déclencher d&apos;action métier.
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
                  <StatusBadge label={hasLiveInventory ? "Live" : "Preview"} tone={card.tone} />
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

          {inventory ? (
            <section className="surface-panel rounded-3xl p-5 sm:p-6">
              <div className="flex flex-wrap items-end justify-between gap-4">
                <div>
                  <p className="section-kicker">Inventaire seedé</p>
                  <h2 className="mt-2 text-2xl font-black text-slate-950">
                    Données de démonstration lues depuis PostgreSQL
                  </h2>
                </div>
                <StatusBadge label={`${inventory.types.length} types`} tone="preview" />
              </div>
              <div className="mt-5 grid gap-3 lg:grid-cols-2">
                {inventory.stocks.map((stock) => {
                  const type = typeById.get(stock.equipmentTypeId);

                  return (
                    <article
                      className="rounded-2xl border border-cream-300 bg-white p-4"
                      key={stock.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase text-amber-800">
                            {type?.category ?? "Stock"}
                          </p>
                          <h3 className="mt-2 text-lg font-black text-slate-950">
                            {type?.name ?? stock.equipmentTypeId}
                          </h3>
                        </div>
                        <StatusBadge label="Quantité" tone="preview" />
                      </div>
                      <p className="mt-4 text-3xl font-black text-slate-950">
                        {formatQuantity(stock.quantity)} {stock.unit}
                      </p>
                      <p className="mt-2 text-sm font-bold text-field-muted">
                        {stock.locationLabel ?? "Emplacement non précisé"}
                      </p>
                    </article>
                  );
                })}
                {inventory.items.map((item) => {
                  const type = typeById.get(item.equipmentTypeId);

                  return (
                    <article
                      className="rounded-2xl border border-cream-300 bg-white p-4"
                      key={item.id}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-xs font-black uppercase text-amber-800">
                            {type?.category ?? "Item"}
                          </p>
                          <h3 className="mt-2 text-lg font-black text-slate-950">
                            {item.fieldIdentifier}
                          </h3>
                        </div>
                        <StatusBadge
                          label={labelForItemStatus(item.status)}
                          tone={toneForItemStatus(item)}
                        />
                      </div>
                      <p className="mt-3 text-sm leading-6 text-field-muted">
                        {type?.name ?? item.equipmentTypeId}
                      </p>
                      <p className="mt-2 text-sm font-bold text-slate-800">
                        {item.locationLabel ?? "Emplacement non précisé"}
                      </p>
                    </article>
                  );
                })}
              </div>
            </section>
          ) : null}

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
                    <StatusBadge label="À suivre" tone="soon" />
                    <p className="mt-3 text-sm font-bold leading-6 text-slate-800">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </aside>
          </section>

          <EquipmentFormsPreview />

          <StatePanel
            detail="Les données affichées peuvent venir du seed local, mais les mutations restent indisponibles dans ce lot. La prochaine étape sera d'activer des formulaires serveur limités et explicites."
            kind="coming-soon"
            label="Lecture seule"
            title="Inventaire vivant, actions encore protégées"
          />
        </div>
      </div>
    </AppShell>
  );
}

function createLiveSummaryCards(inventory: EquipmentInventorySnapshot) {
  const availableItems = inventory.items.filter((item) => item.status === "AVAILABLE").length;
  const toCleanItems = inventory.items.filter((item) => item.status === "TO_CLEAN").length;
  const maintenanceItemsCount = inventory.items.filter(
    (item) => item.status === "MAINTENANCE",
  ).length;
  const totalStockQuantity = inventory.stocks.reduce((total, stock) => total + stock.quantity, 0);

  return [
    {
      label: "Disponible",
      value: String(availableItems + Math.round(totalStockQuantity)),
      detail: "Items disponibles et quantités consommables issues du seed dev",
      tone: "active" as const,
    },
    {
      label: "À nettoyer",
      value: String(toCleanItems),
      detail: "Matériel individuel marqué à nettoyer",
      tone: "amber" as const,
    },
    {
      label: "Maintenance",
      value: String(maintenanceItemsCount),
      detail: "Éléments individuels à réparer ou contrôler",
      tone: "alert" as const,
    },
  ];
}

function createLiveGroups(inventory: EquipmentInventorySnapshot): InventoryGroup[] {
  const categories = new Map<
    string,
    { modes: Set<string>; examples: string[]; locations: Set<string> }
  >();

  for (const type of inventory.types) {
    const group =
      categories.get(type.category) ??
      {
        modes: new Set<string>(),
        examples: [],
        locations: new Set<string>(),
      };

    group.modes.add(labelForTrackingMode(type.trackingMode));
    group.examples.push(type.name);
    categories.set(type.category, group);
  }

  for (const stock of inventory.stocks) {
    const type = inventory.types.find((candidate) => candidate.id === stock.equipmentTypeId);
    const group = type ? categories.get(type.category) : null;

    if (stock.locationLabel) {
      group?.locations.add(stock.locationLabel);
    }
  }

  for (const item of inventory.items) {
    const type = inventory.types.find((candidate) => candidate.id === item.equipmentTypeId);
    const group = type ? categories.get(type.category) : null;

    if (item.locationLabel) {
      group?.locations.add(item.locationLabel);
    }
  }

  return Array.from(categories, ([category, group]) => ({
    category,
    examples: group.examples.join(", "),
    mode: Array.from(group.modes).join(" + "),
    location: Array.from(group.locations).join(", ") || "Emplacement non précisé",
    status: "Seed dev",
  }));
}

function createLiveMaintenanceItems(
  inventory: EquipmentInventorySnapshot,
  typeById: Map<string, EquipmentInventorySnapshot["types"][number]>,
) {
  const items = inventory.items
    .filter((item) => item.status === "TO_CLEAN" || item.status === "MAINTENANCE")
    .map((item) => {
      const type = typeById.get(item.equipmentTypeId);

      return `${item.fieldIdentifier} - ${type?.name ?? "Matériel"} (${labelForItemStatus(item.status)})`;
    });

  return items.length > 0 ? items : ["Aucun point de maintenance dans le seed actuel"];
}

function formatQuantity(quantity: number) {
  return new Intl.NumberFormat("fr-FR", {
    maximumFractionDigits: 2,
  }).format(quantity);
}

function labelForTrackingMode(mode: EquipmentTrackingMode) {
  if (mode === "INDIVIDUAL") {
    return "Individuel";
  }

  if (mode === "HYBRID") {
    return "Hybride";
  }

  return "Quantité";
}

function labelForItemStatus(status: EquipmentItemStatus) {
  const labels = {
    AVAILABLE: "Disponible",
    IN_USE: "En tournée",
    TO_CLEAN: "À nettoyer",
    MAINTENANCE: "Maintenance",
    RETIRED: "Retiré",
    LOST: "Perdu",
  } satisfies Record<EquipmentItemStatus, string>;

  return labels[status];
}

function toneForItemStatus(item: EquipmentItemSummary) {
  if (item.status === "AVAILABLE" || item.status === "IN_USE") {
    return "active";
  }

  if (item.status === "TO_CLEAN") {
    return "amber";
  }

  if (item.status === "MAINTENANCE" || item.status === "LOST") {
    return "alert";
  }

  return "muted";
}
