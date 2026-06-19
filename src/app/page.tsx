import { AppShell } from "@/components/AppShell";
import { DashboardCard } from "@/components/DashboardCard";
import { ModuleCard } from "@/components/ModuleCard";

const dashboardCards = [
  {
    title: "Ruchers",
    metric: "12",
    detail: "Vue de synthèse pour les sites apicoles à venir.",
    status: "Aperçu"
  },
  {
    title: "Ruches",
    metric: "84",
    detail: "Représentation indicative du futur parc matériel.",
    status: "Aperçu"
  },
  {
    title: "Visites",
    metric: "7",
    detail: "Repère visuel pour les prochaines observations terrain.",
    status: "Aperçu"
  },
  {
    title: "Tâches",
    metric: "18",
    detail: "Aperçu non interactif des actions à préparer.",
    status: "Aperçu"
  }
];

const moduleCards = [
  {
    title: "Sanitaire",
    description:
      "Surface prévue pour les observations sanitaires simples, varroa et frelon."
  },
  {
    title: "Base de connaissance",
    description:
      "Point d'accès futur aux fiches internes, protocoles et notes d'organisation."
  },
  {
    title: "Contacts utiles",
    description:
      "Emplacement reserve aux contacts, partenaires et interlocuteurs de terrain."
  }
];

const futureModules = [
  {
    title: "IA",
    description:
      "Analyse de visite, assistant connaissance et reconnaissance restent inactifs."
  },
  {
    title: "Balance connectee",
    description:
      "Préparation visuelle uniquement, sans donnée capteur ni traitement IoT."
  },
  {
    title: "Météo de rucher",
    description:
      "Module futur sans fournisseur, appel externe ou données dynamiques."
  },
  {
    title: "Caméra",
    description:
      "Option prévue mais désactivée, sans stockage image ni flux vidéo."
  },
  {
    title: "Capteurs",
    description:
      "Espace reserve aux integrations materielles futures, sans protocole actif."
  }
];

export default function Home() {
  return (
    <AppShell>
      <section className="mx-auto grid w-full max-w-7xl gap-8 px-4 py-6 sm:px-6 lg:grid-cols-[1.1fr_0.9fr] lg:px-8 lg:py-10">
        <div className="rounded-lg border border-cream-300 bg-white p-5 shadow-field sm:p-6 lg:p-8">
          <p className="text-sm font-semibold uppercase text-olive-700">
            Shell applicatif
          </p>
          <h1 className="mt-3 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl">
            Rucher360
          </h1>
          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            Cockpit apicole modulaire pour suivre progressivement les
            organisations, les ruchers et les futures activations de modules.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <span className="rounded-lg bg-honey-100 px-4 py-3 text-sm font-semibold text-slate-950">
              Mobile
            </span>
            <span className="rounded-lg bg-olive-50 px-4 py-3 text-sm font-semibold text-olive-800">
              Modulaire
            </span>
            <span className="rounded-lg bg-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">
              Sobre
            </span>
          </div>
        </div>

        <aside className="rounded-lg border border-olive-200 bg-olive-900 p-5 text-white shadow-field sm:p-6">
          <p className="text-sm font-semibold text-honey-200">
            Lisible en extérieur
          </p>
          <h2 className="mt-3 text-2xl font-semibold">
            Vue rapide, décisions calmes.
          </h2>
          <p className="mt-4 text-sm leading-6 text-olive-50">
            Une première structure pour retrouver les priorités du rucher, les
            zones de suivi et les modules qui seront activés par prochains lots.
          </p>
        </aside>
      </section>

      <section className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {dashboardCards.map((card) => (
            <DashboardCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mb-4 flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase text-olive-700">
              Modules visibles
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Surfaces de navigation statiques
            </h2>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {moduleCards.map((card) => (
            <ModuleCard key={card.title} {...card} />
          ))}
        </div>
      </section>

      <section className="mx-auto mt-8 w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="rounded-lg border border-cream-300 bg-cream-200 p-4 sm:p-5">
          <div className="mb-4">
            <p className="text-sm font-semibold uppercase text-slate-600">
              Modules optionnels
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950">
              Prévus, désactivés
            </h2>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
            {futureModules.map((card) => (
              <ModuleCard
                key={card.title}
                {...card}
                disabled
                status="A venir"
              />
            ))}
          </div>
        </div>
      </section>
    </AppShell>
  );
}
