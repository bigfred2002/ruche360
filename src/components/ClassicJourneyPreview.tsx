import Link from "next/link";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatusBadge } from "./StatusBadge";

const journeySteps = [
  {
    detail:
      "Choisir le rucher fictif dans le formulaire, noter l'essentiel et faire évoluer le statut.",
    href: "/visits",
    label: "Préparer une visite",
    number: "01",
    title: "Préparer la sortie",
  },
  {
    detail:
      "Garder une seule suite visible, la prioriser puis la clôturer quand le terrain est traité.",
    href: "/tasks",
    label: "Voir les tâches",
    number: "02",
    title: "Suivre une action",
  },
  {
    detail:
      "Vérifier la caisse de visite et les éléments à nettoyer seulement lorsque c'est utile.",
    href: "/equipment",
    label: "Vérifier le matériel",
    number: "03",
    title: "Vérifier si nécessaire",
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
              Préparer une sortie
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              Commencer par la visite. Les tâches et le matériel restent à portée
              de main quand une suite est nécessaire.
            </p>
            <Link
              className="mt-6 inline-flex min-h-12 items-center justify-center rounded-2xl bg-forest-900 px-5 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
              href="/visits"
            >
              Commencer la visite
            </Link>
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
                      <div className="flex flex-wrap items-center gap-2">
                        <h2 className="text-xl font-black text-slate-950">{step.title}</h2>
                        {step.number === "03" ? (
                          <StatusBadge label="Optionnel" tone="soon" />
                        ) : null}
                      </div>
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

          <details className="surface-muted rounded-3xl">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 focus-ring sm:px-6 [&::-webkit-details-marker]:hidden">
              <span>
                <span className="section-kicker">Développement</span>
                <span className="mt-1 block text-base font-black text-slate-950">
                  Données fictives et limites du parcours
                </span>
              </span>
              <span className="inline-flex min-h-11 items-center rounded-full border border-cream-300 bg-white px-4 text-sm font-black text-slate-700">
                Voir
              </span>
            </summary>
            <div className="grid gap-3 border-t border-cream-300 px-5 py-5 md:grid-cols-3 sm:px-6">
              {guardrails.map((rule) => (
                <p
                  className="rounded-2xl border border-cream-300 bg-white p-4 text-sm font-bold leading-6 text-slate-800"
                  key={rule}
                >
                  {rule}
                </p>
              ))}
            </div>
          </details>
        </div>
      </div>
    </AppShell>
  );
}
