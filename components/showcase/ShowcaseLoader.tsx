"use client";

// Same reason as TacticsBoardLoader.tsx: react-konva touches canvas APIs at
// import time, so both showcase variants must load client-only and
// dynamically, never as part of the server render.
import dynamic from "next/dynamic";

export const OnboardingShowcaseLoader = dynamic(
  () => import("./OnboardingShowcase").then((mod) => mod.OnboardingShowcase),
  { ssr: false, loading: () => <ShowcaseLoadingFallback /> },
);

export const LandingShowcaseLoader = dynamic(
  () => import("./LandingShowcase").then((mod) => mod.LandingShowcase),
  { ssr: false, loading: () => <ShowcaseLoadingFallback /> },
);

function ShowcaseLoadingFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="h-8 w-8 animate-pulse rounded-full bg-emerald-600/40" />
    </div>
  );
}
