"use client";

import { useState, type FormEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { createClient } from "@/lib/supabase/client";

interface FieldErrors {
  name?: string;
  shortName?: string;
}

// Mirrors the DB check (char_length(short_name) between 2 and 6) - the DB
// is the source of truth, this is only a fast client-side check.
const SHORT_NAME_PATTERN = /^.{2,6}$/;

export function CreateTeamForm({
  userId,
  onCreated,
}: {
  userId: string;
  onCreated: () => void;
}) {
  const [name, setName] = useState("");
  const [shortName, setShortName] = useState("");
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Podaj pełną nazwę drużyny.";
    if (!SHORT_NAME_PATTERN.test(shortName.trim())) {
      errors.shortName = "Skrót musi mieć 2–6 znaków.";
    }
    return errors;
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSaving(true);
    const supabase = createClient();
    // Only teams gets an insert - a trigger (add_team_creator_as_head_coach)
    // makes the caller the team's head coach automatically.
    const { error } = await supabase.from("teams").insert({
      name: name.trim(),
      short_name: shortName.trim(),
      created_by: userId,
    });

    setSaving(false);
    if (error) {
      setFormError("Nie udało się utworzyć drużyny. Spróbuj ponownie.");
      return;
    }
    onCreated();
  }

  return (
    <div>
      <h2 className="text-xl font-semibold tracking-tight">Załóż drużynę</h2>
      <p className="mt-1 text-sm text-neutral-600 dark:text-neutral-400">
        Zostaniesz automatycznie head coachem. Będziesz mógł zapraszać
        asystentów i dzielić się z nimi biblioteką ćwiczeń oraz planami
        treningowymi.
      </p>
      <form onSubmit={handleSubmit} noValidate className="mt-6 space-y-5">
        <FormBanner variant="error" message={formError} />

        <FormField
          id="team-name"
          label="Pełna nazwa drużyny"
          type="text"
          placeholder="np. Husaria Szczecin — Seniorzy"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={fieldErrors.name}
        />

        <div>
          <FormField
            id="team-short-name"
            label="Skrót (2–6 znaków)"
            type="text"
            placeholder="np. HUS SR"
            maxLength={6}
            value={shortName}
            onChange={(e) => setShortName(e.target.value.toUpperCase())}
            error={fieldErrors.shortName}
          />
          <p className="mt-1.5 text-xs text-neutral-500 dark:text-neutral-500">
            Skrót używany tam, gdzie nie ma miejsca na pełną nazwę — tak jak
            transmisje skracają nazwy klubów.
          </p>
        </div>

        <SubmitButton loading={saving} loadingText="Tworzenie…">
          Utwórz drużynę
        </SubmitButton>
      </form>
    </div>
  );
}
