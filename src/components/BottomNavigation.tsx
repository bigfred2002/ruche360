const navigationItems = [
  { label: "Accueil", marker: "A" },
  { label: "Ruchers", marker: "R" },
  { label: "Visites", marker: "V" },
  { label: "Tâches", marker: "T" }
];

export function BottomNavigation() {
  return (
    <nav
      aria-label="Navigation principale"
      className="fixed inset-x-0 bottom-0 z-20 border-t border-cream-300 bg-white/95 px-3 pb-3 pt-2 shadow-nav backdrop-blur md:hidden"
    >
      <ul className="mx-auto grid max-w-md grid-cols-4 gap-1">
        {navigationItems.map((item, index) => (
          <li key={item.label}>
            <a
              className={`flex min-h-14 flex-col items-center justify-center gap-1 rounded-lg text-xs font-semibold ${
                index === 0
                  ? "bg-honey-100 text-slate-950"
                  : "text-slate-600"
              }`}
              href="#cockpit"
            >
              <span className="grid h-6 w-6 place-items-center rounded-full border border-current text-[11px]">
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
