import Link from "next/link";

const steps = [
  {
    number: "1",
    title: "Zbuduj bibliotekę ćwiczeń",
    description:
      "Dodaj ćwiczenia do swojej biblioteki raz — pogrupowane według kategorii i poziomu trudności — i korzystaj z nich w każdym kolejnym treningu.",
  },
  {
    number: "2",
    title: "Zbuduj trening",
    description:
      "Wybieraj ćwiczenia z biblioteki i układaj je w plan dopasowany do dzisiejszych zajęć, w dowolnej kolejności.",
  },
  {
    number: "3",
    title: "Eksportuj i udostępniaj",
    description:
      "Zamień dowolny trening w czytelny PDF i udostępnij go zawodnikom albo sztabowi jednym kliknięciem.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <header className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">Coach Zone</span>
        <Link
          href="/login"
          className="rounded-full bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
        >
          Zaloguj się
        </Link>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-6 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
          <h1 className="text-4xl font-bold tracking-tight sm:text-6xl">
            Coach Zone
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-neutral-600 sm:text-xl dark:text-neutral-400">
            Twórz treningi z biblioteki ćwiczeń, eksportuj je do PDF i
            udostępniaj swojej drużynie w kilka minut.
          </p>
          <div className="mt-10 flex justify-center">
            <Link
              href="/login"
              className="rounded-full bg-emerald-600 px-6 py-3 text-base font-medium text-white transition-colors hover:bg-emerald-500"
            >
              Zaloguj się
            </Link>
          </div>
        </section>

        <section className="border-t border-neutral-200 dark:border-neutral-800">
          <div className="mx-auto max-w-6xl px-6 py-16 sm:py-24">
            <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
              Jak to działa
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
