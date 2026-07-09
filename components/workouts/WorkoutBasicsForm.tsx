"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { createClient } from "@/lib/supabase/client";
import type { Workout } from "@/lib/supabase/types";

type WorkoutBasicsFormProps =
  | { mode: "create"; userId: string }
  | {
      mode: "edit";
      workout: Workout;
      onSaved: (workout: Workout) => void;
      onCancel: () => void;
    };

interface FieldErrors {
  title?: string;
}

const labelClasses = "block text-sm font-medium";

function fieldClasses() {
  return "w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:bg-neutral-900 border-neutral-300 dark:border-neutral-700";
}

export function WorkoutBasicsForm(props: WorkoutBasicsFormProps) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.workout : null;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [teamName, setTeamName] = useState(initial?.team_name ?? "");
  const [scheduledFor, setScheduledFor] = useState(
    initial?.scheduled_for ?? "",
  );
  const [notes, setNotes] = useState(initial?.notes ?? "");

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    if (!title.trim()) {
      setFieldErrors({ title: "Podaj nazwę treningu." });
      return;
    }
    setFieldErrors({});

    setLoading(true);
    const supabase = createClient();

    const payload = {
      title: title.trim(),
      team_name: teamName.trim() || null,
      scheduled_for: scheduledFor || null,
      notes: notes.trim() || null,
    };

    if (props.mode === "create") {
      const { data, error } = await supabase
        .from("workouts")
        .insert({ ...payload, owner_id: props.userId })
        .select("id")
        .single();

      setLoading(false);
      if (error || !data) {
        setFormError("Nie udało się utworzyć treningu. Spróbuj ponownie.");
        return;
      }
      router.push(`/app/workouts/${data.id}`);
      router.refresh();
      return;
    }

    const { data, error } = await supabase
      .from("workouts")
      .update(payload)
      .eq("id", props.workout.id)
      .select("*")
      .single();

    setLoading(false);
    if (error || !data) {
      setFormError("Nie udało się zapisać zmian. Spróbuj ponownie.");
      return;
    }
    props.onSaved(data);
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormBanner variant="error" message={formError} />

      <FormField
        id="title"
        label="Nazwa treningu"
        type="text"
        placeholder="np. Trening przedmeczowy"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={fieldErrors.title}
      />

      <FormField
        id="teamName"
        label="Drużyna (opcjonalnie)"
        type="text"
        placeholder="np. Orlik U15"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
      />

      <FormField
        id="scheduledFor"
        label="Data treningu (opcjonalnie)"
        type="date"
        value={scheduledFor}
        onChange={(e) => setScheduledFor(e.target.value)}
      />

      <div>
        <label htmlFor="notes" className={labelClasses}>
          Notatki (opcjonalnie)
        </label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={3}
          className={`mt-1.5 ${fieldClasses()}`}
        />
      </div>

      <div className="flex items-center gap-3">
        <div className="flex-1">
          <SubmitButton loading={loading} loadingText="Zapisywanie…">
            {props.mode === "create" ? "Utwórz trening" : "Zapisz zmiany"}
          </SubmitButton>
        </div>
        {props.mode === "edit" && (
          <button
            type="button"
            onClick={props.onCancel}
            disabled={loading}
            className="shrink-0 rounded-full border border-neutral-300 px-4 py-2.5 text-sm font-medium transition-colors hover:bg-neutral-50 disabled:cursor-not-allowed disabled:opacity-60 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Anuluj
          </button>
        )}
      </div>
    </form>
  );
}
