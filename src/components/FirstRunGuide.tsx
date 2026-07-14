import Link from "next/link";

import { StatusBadge } from "./StatusBadge";

type FirstRunGuideProps = {
  activeApiaryCount: number;
  activeHiveCount: number;
  activeMovementCount?: number;
  compact?: boolean;
  equipmentReadyCount?: number;
  openTaskCount?: number;
  openVisitCount?: number;
};

type FirstRunStep = {
  detail: string;
  done: boolean;
  href: string;
  label: string;
  optional?: boolean;
};

export function FirstRunGuide({
  activeApiaryCount,
  activeHiveCount,
  activeMovementCount = 0,
  compact = false,
  equipmentReadyCount = 0,
  openTaskCount = 0,
  openVisitCount = 0,
}: FirstRunGuideProps) {
  const steps: FirstRunStep[] = [
    {
      detail: "Un site suffit pour rattacher les ruches.",
      done: activeApiaryCount > 0,
      href: "/apiaries",
      label: "Créer le premier rucher",
    },
    {
      detail: "Une ruche active devient le point d'entrée des visites.",
      done: activeHiveCount > 0,
      href: "/apiaries",
      label: "Ajouter une ruche active",
    },
    {
      detail: "Noter une observation courte depuis la ruche.",
      done: openVisitCount > 0,
      href: "/visits",
      label: "Faire la première visite",
    },
    {
      detail: "Créer seulement une suite utile après la visite.",
      done: openTaskCount > 0,
      href: "/tasks",
      label: "Ajouter une tâche si besoin",
    },
    {
      detail: "Matériel et transhumance restent optionnels au démarrage.",
      done: equipmentReadyCount > 0 || activeMovementCount > 0,
      href: equipmentReadyCount > 0 ? "/equipment" : "/transhumance",
      label: "Vérifier les options terrain",
      optional: true,
    },
  ];
  const requiredSteps = steps.filter((step) => !step.optional);
  const completedRequiredSteps = requiredSteps.filter((step) => step.done).length;
  const nextStep = requiredSteps.find((step) => !step.done) ?? steps[4];

  return (
    <section className="rounded-3xl border border-amber-200 bg-amber-50 p-4 shadow-field sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-black uppercase tracking-wide text-amber-800">
            Premier démarrage
          </p>
          <h2 className="mt-1 text-2xl font-black leading-tight text-slate-950">
            {completedRequiredSteps === requiredSteps.length
              ? "Le parcours de base est prêt"
              : "Commencer sans se disperser"}
          </h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-700">
            Le chemin minimal reste rucher, ruche active, visite courte, puis
            tâche seulement si une suite est nécessaire.
          </p>
        </div>
        <StatusBadge
          label={`${completedRequiredSteps}/${requiredSteps.length}`}
          tone={completedRequiredSteps === requiredSteps.length ? "active" : "amber"}
        />
      </div>

      <div className={`mt-4 grid gap-3 ${compact ? "" : "lg:grid-cols-5"}`}>
        {steps.map((step, index) => (
          <Link
            className="motion-card rounded-2xl border border-amber-200 bg-white p-4 transition hover:border-amber-300 hover:bg-cream-50 focus-ring"
            href={step.href}
            key={step.label}
          >
            <span
              className={`grid size-9 place-items-center rounded-xl text-xs font-black ${
                step.done
                  ? "bg-sage-100 text-forest-900"
                  : step.optional
                    ? "bg-slate-100 text-slate-700"
                    : "bg-amber-100 text-amber-900"
              }`}
            >
              {step.done ? "OK" : `0${index + 1}`}
            </span>
            <span className="mt-3 block text-sm font-black text-slate-950">
              {step.label}
            </span>
            <span className="mt-1 block text-xs font-bold leading-5 text-slate-650">
              {step.detail}
            </span>
          </Link>
        ))}
      </div>

      <Link
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-2xl bg-forest-900 px-4 text-sm font-black text-white transition hover:bg-forest-800 focus-ring"
        href={nextStep.href}
      >
        {nextStep.label}
      </Link>
    </section>
  );
}
