"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/supabase/errors";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormBanner } from "./FormBanner";
import { GoogleAuthButton } from "./GoogleAuthButton";

interface FieldErrors {
  email?: string;
  password?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginForm({ initialError }: { initialError?: string | null }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(
    initialError ?? null,
  );
  const [loading, setLoading] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!EMAIL_PATTERN.test(email)) {
      errors.email = "Podaj poprawny adres email.";
    }
    if (!password) {
      errors.password = "Podaj hasło.";
    }
    return errors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setLoading(false);
      setFormError(getAuthErrorMessage(error));
      return;
    }

    router.push("/app");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormBanner variant="error" message={formError} />

      <GoogleAuthButton />

      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        lub zaloguj się emailem
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <FormField
        id="email"
        label="Adres e-mail"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />
      <div>
        <FormField
          id="password"
          label="Hasło"
          type="password"
          autoComplete="current-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          error={fieldErrors.password}
        />
        <div className="mt-1.5 text-right">
          <Link
            href="/forgot-password"
            className="text-sm font-medium text-emerald-600 hover:text-emerald-500"
          >
            Nie pamiętasz hasła?
          </Link>
        </div>
      </div>

      <SubmitButton loading={loading} loadingText="Logowanie…">
        Zaloguj się
      </SubmitButton>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Nie masz konta?{" "}
        <Link
          href="/signup"
          className="font-medium text-emerald-600 hover:text-emerald-500"
        >
          Zarejestruj się
        </Link>
      </p>
    </form>
  );
}
