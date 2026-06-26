import type { NavigationItem } from "./modulePresentation";

type BottomNavigationProps = {
  items: NavigationItem[];
};

export function BottomNavigation({ items }: BottomNavigationProps) {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-cream-300 bg-white/95 px-2 pb-3 pt-2 shadow-nav backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-5 gap-1">
        {items.slice(0, 5).map((item) => (
          <li key={item.label}>
            <a
              className={`flex min-h-16 flex-col items-center justify-center gap-1 rounded-2xl text-[10px] font-black uppercase tracking-wide transition-smooth ${
                item.active
                  ? "bg-amber-400 text-slate-950 shadow-amber"
                  : "text-slate-700"
              }`}
              href={item.href}
              title={item.route ? `Route prévue: ${item.route}` : item.label}
            >
              <span className="grid h-7 w-7 place-items-center rounded-xl border border-current text-[10px]">
                {item.marker}
              </span>
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
