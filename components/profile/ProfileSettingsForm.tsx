"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import {
  PSEUDONYM_FORMAT_MESSAGE,
  PSEUDONYM_TAKEN_MESSAGE,
  validatePseudonym,
} from "@/lib/profiles";
import { createClient } from "@/lib/supabase/client";

const UNIQUE_VIOLATION = "23505";
const CHECK_VIOLATION = "23514";

export function ProfileSettingsForm({
  userId,
  currentPseudonym,
}: {
  userId: string;
  currentPseudonym: string;
}) {
  const router = useRouter();
  const [pseudonym, setPseudonym] = useState(currentPseudonym);
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setSuccessMessage(null);
    setFormError(null);

    const trimmed = pseudonym.trim();
    const validationError = validatePseudonym(trimmed);
    if (validationError) {
      setFieldError(validationError);
      return;
    }
    setFieldError(undefined);

    if (trimmed === currentPseudonym) {
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error } = await supabase
      .from("profiles")
      .update({ display_name: trimmed })
      .eq("id", userId);
    setLoading(false);

    if (error) {
      if (error.code === UNIQUE_VIOLATION) {
        setFieldError(PSEUDONYM_TAKEN_MESSAGE);
        return;
      }
      if (error.code === CHECK_VIOLATION) {
        setFieldError(PSEUDONYM_FORMAT_MESSAGE);
        return;
      }
      setFormError("Nie udało się zapisać zmian. Spróbuj ponownie.");
      return;
    }

    setSuccessMessage("Pseudonim zaktualizowany.");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-4">
      <FormBanner variant="error" message={formError} />
      <FormBanner variant="success" message={successMessage} />

      <FormField
        id="pseudonym"
        label="Pseudonim trenera"
        type="text"
        autoComplete="username"
        value={pseudonym}
        onChange={(e) => {
          setPseudonym(e.target.value);
          setSuccessMessage(null);
        }}
        error={fieldError}
      />
      <p className="-mt-2.5 text-xs text-neutral-500 dark:text-neutral-500">
        Widoczny dla innych trenerów przy Twoich ćwiczeniach. 3–20 znaków:
        litery, cyfry, „_” lub „-”.
      </p>

      <SubmitButton loading={loading} loadingText="Zapisywanie…">
        Zapisz zmiany
      </SubmitButton>
    </form>
  );
}
