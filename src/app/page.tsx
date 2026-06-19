const readinessItems = [
  "Next.js App Router",
  "TypeScript strict",
  "Tailwind CSS",
  "Docker Compose"
];

export default function Home() {
  return (
    <main className="min-h-screen bg-[#f7f8f4] text-[#1f2a24]">
      <section className="mx-auto flex min-h-screen w-full max-w-6xl flex-col justify-between px-6 py-8 sm:px-8 lg:px-10">
        <header className="flex items-center justify-between border-b border-[#d9dfd2] pb-5">
          <div>
            <p className="text-sm font-medium uppercase tracking-[0.12em] text-[#60705f]">
              Socle applicatif
            </p>
            <h1 className="mt-2 text-3xl font-semibold sm:text-4xl">
              Rucher360
            </h1>
          </div>
          <div className="hidden rounded-full border border-[#c7d2bf] px-4 py-2 text-sm font-medium text-[#3f553f] sm:block">
            Docker-first
          </div>
        </header>

        <div className="grid gap-8 py-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="max-w-2xl text-xl leading-8 text-[#334033]">
              Une base Next.js sobre pour construire progressivement une
              application apicole modulaire, multi-utilisateurs et lisible sur
              le terrain.
            </p>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[#5d685b]">
              Ce lot pose uniquement le socle technique et visuel. Les modules
              métier, l&apos;authentification, Prisma, l&apos;IA et l&apos;IoT restent hors
              périmètre.
            </p>
          </div>

          <div className="border-l-4 border-[#d2a23a] bg-white px-5 py-5 shadow-sm">
            <h2 className="text-base font-semibold text-[#263326]">
              Prêt pour les prochains lots
            </h2>
            <ul className="mt-4 space-y-3 text-sm text-[#536052]">
              {readinessItems.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <span className="h-2 w-2 rounded-full bg-[#d2a23a]" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer className="border-t border-[#d9dfd2] pt-5 text-sm text-[#687466]">
          Commandes projet via Docker Compose uniquement.
        </footer>
      </section>
    </main>
  );
}
