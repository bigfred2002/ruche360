import Link from "next/link";

export function TopBar() {
  return (
    <header className="sticky top-0 z-10 border-b border-cream-300 bg-cream-100/90 backdrop-blur">
      <div className="mx-auto flex min-h-20 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link className="focus-ring flex items-center gap-3 rounded-2xl lg:hidden" href="/">
          <span className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-amber text-xs font-black text-white shadow-amber">
            R360
          </span>
          <span>
            <span className="block text-base font-black leading-5">
              Rucher360
            </span>
            <span className="block text-xs font-semibold text-slate-650">
              Cockpit apicole
            </span>
          </span>
        </Link>

        <div className="hidden min-h-14 w-full max-w-xl items-center rounded-full border border-cream-300 bg-white px-5 text-sm font-semibold text-slate-500 shadow-field lg:flex">
          Rechercher une ruche, un rucher...
        </div>

        <div className="ml-auto flex items-center gap-2">
          <span className="grid h-11 min-w-11 place-items-center rounded-2xl border border-cream-300 bg-white text-xs font-black text-slate-800 shadow-field">
            Al
          </span>
          <span className="grid h-11 min-w-11 place-items-center rounded-2xl border border-cream-300 bg-white text-xs font-black text-slate-800 shadow-field">
            Pr
          </span>
        </div>
      </div>
    </header>
  );
}
