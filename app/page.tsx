import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Build your exercise library",
    description:
      "Add drills once, organized by sport, position, and category, and reuse them in every training session you plan.",
  },
  {
    number: "2",
    title: "Assemble a session",
    description:
      "Pull exercises from your library into a session plan tailored to today's practice, in whatever order works for your team.",
  },
  {
    number: "3",
    title: "Export and share",
    description:
      "Turn any session into a clean PDF and share it with players or coaching staff in one click.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">Coach Zone</span>
        <Link
          href="/login"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Log in
        </Link>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Coach Zone
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl dark:text-neutral-400">
            Build training sessions from a reusable exercise library, export
            them to PDF, and share them with your team in minutes.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Log in
            </Link>
          </div>
        </section>

        <section className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              How it works
            </h2>
            <div className="mt-12 grid gap-10 sm:grid-cols-3 sm:gap-8">
              {steps.map((step) => (
                <div key={step.number} className="text-center sm:text-left">
                  <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white sm:mx-0">
                    {step.number}
                  </div>
                  <h3 className="mt-4 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-neutral-600 dark:text-neutral-400">
                    {step.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-200 px-6 py-8 text-center text-sm text-neutral-500 dark:border-neutral-800">
        &copy; {new Date().getFullYear()} Coach Zone
      </footer>
    </div>
  );
}
