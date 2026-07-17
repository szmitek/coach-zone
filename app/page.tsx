import type { Metadata } from "next";
import Link from "next/link";
import { LandingShowcaseLoader } from "@/components/showcase/ShowcaseLoader";

export const metadata: Metadata = {
  title: "Coach Zone — tablica taktyczna i treningi dla trenerów",
  description:
    "Zaplanuj trening, narysuj każdą akcję na tablicy taktycznej i udostępnij drużynie. Bezpłatnie.",
};

const features = [
  {
    number: "1",
    title: "Tablica taktyczna wielu sportów",
    description:
      "Koniec z Paintem. Rysuj akcje na prawdziwym boisku: futbol amerykański, koszykówka, siatkówka, piłka ręczna, piłka nożna.",
  },
  {
    number: "2",
    title: "Biblioteka ćwiczeń",
    description:
      "Twórz i przechowuj swoje ćwiczenia w jednym miejscu — pogrupowane, z poziomem trudności, gotowe do użycia w każdym kolejnym treningu.",
  },
  {
    number: "3",
    title: "Eksport do PDF",
    description:
      "Gotowy plan treningu w PDF, z polskimi znakami, do wydruku lub wysłania.",
  },
  {
    number: "4",
    title: "Udostępnianie",
    description: "Podeślij trening graczom i asystentom jednym linkiem.",
  },
];

export default function Home() {
  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="mx-auto flex max-w-6xl items-center justify-between px-5 py-5 sm:px-6 sm:py-6">
        <span className="text-sm font-semibold tracking-tight text-neutral-300">
          Coach Zone
        </span>
        <Link
          href="/login"
          className="text-sm text-neutral-400 transition-colors hover:text-white"
        >
          Zaloguj się
        </Link>
      </header>

      <main>
        <section className="mx-auto max-w-4xl px-5 pt-6 pb-4 text-center sm:px-6 sm:pt-10">
          <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Zaplanuj trening. Narysuj każdą akcję. Udostępnij drużynie.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base text-neutral-400 sm:text-lg">
            Jedna tablica taktyczna dla wielu sportów, biblioteka ćwiczeń i
            eksport do PDF — zamiast szukania drilli na YouTube i rysowania w
            Paincie.
          </p>
          <div className="mt-8 flex justify-center">
            <Link
              href="/signup"
              className="rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-500"
            >
              Zacznij za darmo
            </Link>
          </div>
        </section>

        <section className="px-4 py-6 sm:px-6 sm:py-10">
          <div className="mx-auto w-full max-w-3xl">
            <LandingShowcaseLoader className="aspect-[4/3] w-full sm:aspect-[16/9]" />
          </div>
        </section>

        <section className="border-t border-neutral-800">
          <div className="mx-auto max-w-6xl px-5 py-16 sm:px-6 sm:py-24">
            <div className="grid gap-10 sm:grid-cols-2 sm:gap-12">
              {features.map((feature) => (
                <div key={feature.number}>
                  <div className="flex h-9 w-9 items-center justify-center rounded-full bg-emerald-600 text-sm font-semibold text-white">
                    {feature.number}
                  </div>
                  <h2 className="mt-4 text-lg font-semibold tracking-tight">
                    {feature.title}
                  </h2>
                  <p className="mt-2 text-neutral-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-neutral-800">
          <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-6 sm:py-24">
            <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              Zacznij za darmo
            </h2>
            <p className="mt-3 text-neutral-400">
              Coach Zone jest bezpłatny dla trenerów — bez karty kredytowej.
            </p>
            <div className="mt-8 flex justify-center">
              <Link
                href="/signup"
                className="rounded-full bg-emerald-600 px-8 py-3 text-base font-semibold text-white transition-colors hover:bg-emerald-500"
              >
                Zacznij za darmo
              </Link>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-neutral-800 px-6 py-8 text-center text-sm text-neutral-500">
        &copy; {new Date().getFullYear()} Coach Zone
      </footer>
    </div>
  );
}
