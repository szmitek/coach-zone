"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/supabase/errors";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormBanner } from "./FormBanner";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    if (!EMAIL_PATTERN.test(email)) {
      setFieldError("Podaj poprawny adres email.");
      return;
    }
    setFieldError(undefined);

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    setLoading(false);

    if (error) {
      setFormError(getAuthErrorMessage(error));
      return;
    }

    // Supabase never reveals whether the email is registered, so we always
    // show the same generic confirmation regardless of the outcome.
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="space-y-4 text-center">
        <FormBanner
          variant="success"
          message="Jeśli konto z tym adresem email istnieje, wysłaliśmy na nie link do zresetowania hasła."
        />
        <Link
          href="/login"
          className="inline-block text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          Powrót do logowania
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormBanner variant="error" message={formError} />

      <FormField
        id="email"
        label="Adres e-mail"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldError}
      />

      <SubmitButton loading={loading} loadingText="Wysyłanie linku…">
        Wyślij link
      </SubmitButton>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Pamiętasz hasło?{" "}
        <Link
          href="/login"
          className="font-medium text-emerald-600 hover:text-emerald-500"
        >
          Zaloguj się
        </Link>
      </p>
    </form>
  );
}
