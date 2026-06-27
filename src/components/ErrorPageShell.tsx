import Link from "next/link";

import { AppShell } from "./AppShell";
import { createAppNavigation } from "./appNavigation";
import { StatusBadge } from "./StatusBadge";

type ErrorPageShellProps = {
  code: "403" | "404" | "500" | "503";
  currentPath?: string;
  detail: string;
  humor: string;
  title: string;
};

const codeTone = {
  "403": "amber",
  "404": "preview",
  "500": "alert",
  "503": "soon",
} as const;

export function ErrorPageShell({
  code,
  currentPath = "/",
  detail,
  humor,
  title,
}: ErrorPageShellProps) {
  const { desktopNavigationItems, mobileNavigationItems } =
    createAppNavigation(currentPath);

  return (
    <AppShell
      desktopNavigationItems={desktopNavigationItems}
      mobileNavigationItems={mobileNavigationItems}
    >
      <div className="mx-auto flex min-h-[calc(100vh-5rem)] w-full max-w-5xl items-center px-5 py-10 sm:px-6 lg:px-8">
        <section className="surface-panel w-full rounded-3xl p-6 text-center sm:p-10">
          <StatusBadge label={`Erreur ${code}`} tone={codeTone[code]} />
          <p className="mt-6 text-7xl font-black leading-none text-amber-900 sm:text-8xl">
            {code}
          </p>
          <h1 className="mt-5 text-3xl font-black leading-tight text-slate-950 sm:text-5xl">
            {title}
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-8 text-slate-700">
            {detail}
          </p>
          <p className="mx-auto mt-4 max-w-2xl rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm font-bold leading-6 text-amber-950">
            {humor}
          </p>
          <div className="mt-7 flex flex-wrap justify-center gap-3">
            <Link
              className="focus-ring motion-nav inline-flex min-h-12 items-center rounded-2xl bg-amber-400 px-5 text-sm font-black text-slate-950 shadow-amber"
              href="/"
            >
              Retour au cockpit
            </Link>
            <Link
              className="focus-ring motion-nav inline-flex min-h-12 items-center rounded-2xl border border-cream-300 bg-white px-5 text-sm font-black text-slate-750 shadow-field"
              href="/modules"
            >
              Voir les modules
            </Link>
          </div>
        </section>
      </div>
    </AppShell>
  );
}
