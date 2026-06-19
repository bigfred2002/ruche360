import type { ReactNode } from "react";
import { BottomNavigation } from "./BottomNavigation";

type AppShellProps = {
  children: ReactNode;
};

const desktopNavItems = ["Accueil", "Modules", "Organisation"];

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="min-h-screen bg-cream-100 text-slate-950">
      <header className="sticky top-0 z-10 border-b border-cream-300 bg-cream-100/95 backdrop-blur">
        <div className="mx-auto flex min-h-16 w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
          <a className="flex items-center gap-3" href="#cockpit">
            <span className="grid h-10 w-10 place-items-center rounded-lg bg-honey-400 text-sm font-bold text-slate-950">
              R360
            </span>
            <span>
              <span className="block text-sm font-semibold leading-5">
                Rucher360
              </span>
              <span className="block text-xs text-slate-600">
                Cockpit apicole
              </span>
            </span>
          </a>

          <nav aria-label="Navigation secondaire" className="hidden md:block">
            <ul className="flex items-center gap-2">
              {desktopNavItems.map((item, index) => (
                <li key={item}>
                  <a
                    className={`rounded-lg px-3 py-2 text-sm font-semibold ${
                      index === 0
                        ? "bg-white text-slate-950 shadow-field"
                        : "text-slate-600 hover:bg-white hover:text-slate-950"
                    }`}
                    href="#cockpit"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      <main id="cockpit" className="pb-28 md:pb-12">
        {children}
      </main>

      <BottomNavigation />
    </div>
  );
}
