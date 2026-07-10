import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { LoginForm } from "@/components/auth/LoginForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zaloguj się — Coach Zone",
};

const QUERY_ERROR_MESSAGES: Record<string, string> = {
  confirmation_failed:
    "Ten link potwierdzający jest nieprawidłowy albo wygasł. Spróbuj się zalogować albo zarejestruj się ponownie, aby otrzymać nowy.",
  oauth_failed: "Logowanie przez Google nie powiodło się. Spróbuj ponownie.",
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
      title="Witaj ponownie"
      subtitle="Zaloguj się, aby zaplanować kolejny trening."
    >
      <LoginForm initialError={initialError} />
    </AuthShell>
  );
}
