import type { NavigationItem } from "./modulePresentation";

type DesktopSidebarProps = {
  items: NavigationItem[];
};

export function DesktopSidebar({ items }: DesktopSidebarProps) {
  return (
    <aside className="fixed inset-y-0 left-0 z-20 hidden w-72 border-r border-cream-300 bg-cream-200/95 px-5 py-8 shadow-sidebar backdrop-blur lg:flex lg:flex-col">
      <a className="flex items-center gap-3" href="#cockpit">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-amber text-sm font-black text-white shadow-amber">
          R360
        </span>
        <span>
          <span className="block text-2xl font-black leading-7 text-amber-900">
            Rucher360
          </span>
          <span className="block text-sm font-semibold text-slate-650">
            Gestion apicole
          </span>
        </span>
      </a>

      <nav aria-label="Navigation desktop" className="mt-14">
        <ul className="space-y-3">
          {items.map((item) => (
            <li key={item.label}>
              <a
                className={`flex min-h-14 items-center gap-4 rounded-2xl px-4 text-sm font-black tracking-wide transition-smooth ${
                  item.active
                    ? "bg-amber-400 text-slate-950 shadow-amber"
                    : "text-slate-750 hover:bg-white hover:text-slate-950 hover:shadow-field"
                }`}
                href={item.href}
                title={item.route ? `Route prévue: ${item.route}` : item.label}
              >
                <span className="grid h-8 w-8 place-items-center rounded-xl border border-current text-[10px]">
                  {item.marker}
                </span>
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mt-auto rounded-2xl border border-cream-300 bg-white p-4 shadow-field">
        <p className="text-sm font-black text-slate-950">Jean Apiculteur</p>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-600">
          Espace preview
        </p>
      </div>
    </aside>
  );
}
