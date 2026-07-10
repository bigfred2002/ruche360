import Link from "next/link";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatusBadge } from "./StatusBadge";

const journeySteps = [
  {
    detail:
      "Repérer le rucher, la ruche et la colonie fictifs utilisés par les formulaires de développement.",
    href: "/apiaries",
    label: "Voir les ruchers",
    number: "01",
    title: "Choisir le contexte terrain",
  },
  {
    detail:
      "Préparer une visite, noter une observation courte puis faire évoluer son statut dans les données locales.",
    href: "/visits",
    label: "Préparer une visite",
    number: "02",
    title: "Passer au rucher",
  },
  {
    detail:
      "Créer une action liée au contexte, la prioriser puis la clôturer sans rappel automatique.",
    href: "/tasks",
    label: "Suivre les tâches",
    number: "03",
    title: "Garder une suite visible",
  },
  {
    detail:
      "Vérifier la caisse de visite et les éléments à nettoyer, sans achat ni gestion commerciale.",
    href: "/equipment",
    label: "Vérifier le matériel",
    number: "04",
    title: "Préparer la prochaine sortie",
  },
] as const;

const guardrails = [
  "Les données sont fictives et limitées à PostgreSQL local.",
  "La session de développement ne représente pas une connexion réelle.",
  "Aucune recommandation sanitaire, IA, IoT ou GPS n'est activée.",
] as const;

export function ClassicJourneyPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/journey");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-5xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <div className="flex flex-wrap gap-2">
              <StatusBadge label="Parcours de développement" tone="preview" />
              <StatusBadge label="Données fictives" tone="soon" />
            </div>
            <p className="section-kicker mt-5">Essai terrain</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Un parcours apicole simple
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              Suivre un rucher, préparer une visite, garder une tâche et vérifier
              la caisse de terrain. Chaque étape ouvre une surface déjà présente.
            </p>
            <div className="mt-6 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
              Avant l&apos;essai, initialiser les données locales avec <code>make seed-dev</code>.
            </div>
          </section>

          <ol className="grid gap-4">
            {journeySteps.map((step) => (
              <li className="surface-panel rounded-3xl p-5 sm:p-6" key={step.number}>
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-sage-100 text-sm font-black text-forest-900">
                      {step.number}
                    </span>
                    <div>
                      <h2 className="text-xl font-black text-slate-950">{step.title}</h2>
                      <p className="mt-2 max-w-2xl text-sm leading-6 text-field-muted">
                        {step.detail}
                      </p>
                    </div>
                  </div>
                  <Link
                    className="inline-flex min-h-12 items-center justify-center rounded-2xl bg-forest-900 px-5 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
                    href={step.href}
                  >
                    {step.label}
                  </Link>
                </div>
              </li>
            ))}
          </ol>

          <section className="surface-muted rounded-3xl p-5 sm:p-6">
            <p className="section-kicker">Limites volontaires</p>
            <h2 className="mt-2 text-2xl font-black text-slate-950">
              Un essai guidé, pas une production
            </h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {guardrails.map((rule) => (
                <p
                  className="rounded-2xl border border-cream-300 bg-white p-4 text-sm font-bold leading-6 text-slate-800"
                  key={rule}
                >
                  {rule}
                </p>
              ))}
            </div>
          </section>
        </div>
      </div>
    </AppShell>
  );
}
