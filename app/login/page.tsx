import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Log in — Coach Zone",
};

const QUERY_ERROR_MESSAGES: Record<string, string> = {
  confirmation_failed:
    "That confirmation link is invalid or has expired. Try logging in, or sign up again to get a new one.",
  oauth_failed: "Google sign-in didn't complete. Please try again.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const { error } = await searchParams;
  const initialError = error ? QUERY_ERROR_MESSAGES[error] : undefined;

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Log in to plan your next training session."
    >
      <LoginForm initialError={initialError} />
    </AuthShell>
  );
}
