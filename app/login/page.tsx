import Link from "next/link";

export default function LoginPlaceholder() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-neutral-900 dark:bg-neutral-950 dark:text-neutral-100">
      <h1 className="text-2xl font-semibold tracking-tight">
        Login is coming soon
      </h1>
      <p className="mt-3 max-w-sm text-neutral-600 dark:text-neutral-400">
        Authentication lands in Round 2. For now, this is just a placeholder for
        the &ldquo;Log in&rdquo; button.
      </p>
      <Link
        href="/"
        className="mt-8 rounded-full bg-emerald-600 px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-emerald-500"
      >
        Back to home
      </Link>
    </div>
  );
}
