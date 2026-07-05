import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { DecorativeImage } from "./DecorativeImage";
import { StatePanel } from "./StatePanel";
import { StatusBadge } from "./StatusBadge";
import { visualAssets } from "./visualAssets";

const onboardingSteps = [
  {
    detail: "Créer un espace personnel simulé pour un apiculteur amateur, sans compte réel ni mot de passe.",
    title: "Espace personnel",
  },
  {
    detail: "Démarrer avec ruchers, ruches, visites, tâches, sanitaire, connaissance et contacts utiles.",
    title: "Modules essentiels",
  },
  {
    detail: "Garder les options avancées hors du premier écran pour ne pas alourdir le démarrage.",
    title: "Navigation légère",
  },
  {
    detail: "Préparer plus tard les vraies données sans remettre à zéro le profil ou les modules choisis.",
    title: "Évolution progressive",
  },
];

export function ProfileOnboardingPreview() {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation("/onboarding");

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto w-full max-w-7xl px-5 py-6 sm:px-6 lg:px-8 lg:py-10">
        <div className="space-y-6">
          <section className="surface-panel rounded-3xl p-5 sm:p-7 lg:p-8">
            <StatusBadge label="Onboarding statique" tone="preview" />
            <p className="section-kicker mt-5">Apiculteur amateur</p>
            <h1 className="mt-2 text-4xl font-black leading-tight text-slate-950 sm:text-5xl">
              Préparer son espace Rucher360
            </h1>
            <p className="mt-3 max-w-3xl text-lg leading-8 text-slate-700">
              Ce parcours montre comment un apiculteur seul pourrait commencer
              simplement. Il ne crée aucun compte, aucune organisation réelle et
              aucune donnée persistée.
            </p>
            <DecorativeImage
              alt={visualAssets.heroLight.alt}
              aspect="wide"
              className="mt-6"
              priority
              src={visualAssets.heroLight.src}
            />
          </section>

          <section className="grid gap-4 md:grid-cols-2">
            {onboardingSteps.map((step, index) => (
              <article className="motion-card surface-panel rounded-2xl p-5" key={step.title}>
                <span className="grid size-9 place-items-center rounded-2xl bg-amber-50 text-sm font-black text-amber-900 ring-1 ring-amber-200">
                  {index + 1}
                </span>
                <h2 className="mt-4 text-xl font-black text-slate-950">
                  {step.title}
                </h2>
                <p className="mt-2 text-sm leading-6 text-field-muted">
                  {step.detail}
                </p>
              </article>
            ))}
          </section>

          <StatePanel
            detail="Le futur onboarding devra rester réversible: masquer ou ajouter des modules ne supprimera pas les données déjà créées."
            kind="empty"
            label="Simulation"
            title="Aucune donnée créée"
          />
        </div>
      </div>
    </AppShell>
  );
}
