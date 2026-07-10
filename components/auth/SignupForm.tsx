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
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function SignupForm() {
  const router = useRouter();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [confirmationSentTo, setConfirmationSentTo] = useState<string | null>(
    null,
  );

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!fullName.trim()) errors.fullName = "Podaj swoje imię i nazwisko.";
    if (!EMAIL_PATTERN.test(email)) {
      errors.email = "Podaj poprawny adres email.";
    }
    if (password.length < 6) {
      errors.password = "Hasło musi mieć co najmniej 6 znaków.";
    }
    if (confirmPassword !== password) {
      errors.confirmPassword = "Hasła nie są takie same.";
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
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: { full_name: fullName.trim() },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });
    setLoading(false);

    if (error) {
      setFormError(getAuthErrorMessage(error));
      return;
    }

    // Supabase returns a user with an empty identities array (no error) when
    // the email already belongs to a confirmed account - a deliberate
    // anti-enumeration behavior, not a real new signup.
    if (data.user && data.user.identities?.length === 0) {
      setFormError(
        "Konto z tym adresem email może już istnieć. Spróbuj się zalogować albo zresetować hasło.",
      );
      return;
    }

    if (data.session) {
      router.push("/app");
      router.refresh();
      return;
    }

    setConfirmationSentTo(email);
  }

  if (confirmationSentTo) {
    return (
      <div className="space-y-4 text-center">
        <FormBanner
          variant="success"
          message={`Wysłaliśmy link potwierdzający na adres ${confirmationSentTo}. Otwórz go, aby aktywować konto.`}
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

      <GoogleAuthButton />

      <div className="flex items-center gap-3 text-xs text-neutral-500 dark:text-neutral-500">
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
        lub zarejestruj się emailem
        <div className="h-px flex-1 bg-neutral-200 dark:bg-neutral-800" />
      </div>

      <FormField
        id="fullName"
        label="Imię i nazwisko"
        type="text"
        autoComplete="name"
        value={fullName}
        onChange={(e) => setFullName(e.target.value)}
        error={fieldErrors.fullName}
      />
      <FormField
        id="email"
        label="Adres e-mail"
        type="email"
        autoComplete="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        error={fieldErrors.email}
      />
      <FormField
        id="password"
        label="Hasło"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />
      <FormField
        id="confirmPassword"
        label="Powtórz hasło"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={fieldErrors.confirmPassword}
      />

      <SubmitButton loading={loading} loadingText="Tworzenie konta…">
        Utwórz konto
      </SubmitButton>

      <p className="text-center text-sm text-neutral-600 dark:text-neutral-400">
        Masz już konto?{" "}
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
