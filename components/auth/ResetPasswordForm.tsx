"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { createClient } from "@/lib/supabase/client";
import { getAuthErrorMessage } from "@/lib/supabase/errors";
import { FormField } from "./FormField";
import { SubmitButton } from "./SubmitButton";
import { FormBanner } from "./FormBanner";

interface FieldErrors {
  password?: string;
  confirmPassword?: string;
}

export function ResetPasswordForm() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
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
    const { error } = await supabase.auth.updateUser({ password });

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

      <FormField
        id="password"
        label="Nowe hasło"
        type="password"
        autoComplete="new-password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        error={fieldErrors.password}
      />
      <FormField
        id="confirmPassword"
        label="Powtórz nowe hasło"
        type="password"
        autoComplete="new-password"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
        error={fieldErrors.confirmPassword}
      />

      <SubmitButton loading={loading} loadingText="Zapisywanie…">
        Zapisz nowe hasło
      </SubmitButton>
    </form>
  );
}
