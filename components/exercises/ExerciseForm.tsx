"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent, type KeyboardEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import { DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from "@/lib/exercises";
import { createClient } from "@/lib/supabase/client";
import type { Category, Difficulty, Exercise } from "@/lib/supabase/types";

type ExerciseFormProps =
  | { mode: "create"; categories: Category[]; userId: string }
  | { mode: "edit"; categories: Category[]; exercise: Exercise };

interface FieldErrors {
  title?: string;
  category?: string;
  steps?: string;
  duration?: string;
  mediaUrl?: string;
}

const labelClasses = "block text-sm font-medium";

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:bg-neutral-900 ${
    hasError
      ? "border-red-400 dark:border-red-500"
      : "border-neutral-300 dark:border-neutral-700"
  }`;
}

function isValidUrl(value: string): boolean {
  try {
    const url = new URL(value);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

export function ExerciseForm(props: ExerciseFormProps) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.exercise : null;

  const [title, setTitle] = useState(initial?.title ?? "");
  const [categoryId, setCategoryId] = useState<number | "">(
    initial?.category_id ?? "",
  );
  const [description, setDescription] = useState(initial?.description ?? "");
  const [steps, setSteps] = useState<string[]>(
    initial?.steps && initial.steps.length > 0 ? initial.steps : [""],
  );
  const [durationMin, setDurationMin] = useState(
    initial?.duration_min ? String(initial.duration_min) : "",
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(
    initial?.difficulty ?? 3,
  );
  const [equipment, setEquipment] = useState<string[]>(
    initial?.equipment ?? [],
  );
  const [equipmentInput, setEquipmentInput] = useState("");
  const [mediaUrl, setMediaUrl] = useState(initial?.media_url ?? "");
  const [isPublic, setIsPublic] = useState(initial?.is_public ?? true);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!title.trim()) errors.title = "Podaj nazwę ćwiczenia.";
    if (!categoryId) errors.category = "Wybierz kategorię.";
    if (steps.every((step) => !step.trim())) {
      errors.steps = "Dodaj co najmniej jeden krok.";
    }
    if (durationMin.trim()) {
      const value = Number(durationMin);
      if (!Number.isInteger(value) || value <= 0) {
        errors.duration =
          "Podaj czas w minutach (liczba całkowita większa od zera).";
      }
    }
    if (mediaUrl.trim() && !isValidUrl(mediaUrl.trim())) {
      errors.mediaUrl =
        "Podaj poprawny adres URL (zaczynający się od http:// lub https://).";
    }
    return errors;
  }

  function updateStep(index: number, value: string) {
    setSteps((prev) => prev.map((step, i) => (i === index ? value : step)));
  }

  function removeStep(index: number) {
    setSteps((prev) => prev.filter((_, i) => i !== index));
  }

  function handleStepKeyDown(
    event: KeyboardEvent<HTMLInputElement>,
    index: number,
  ) {
    if (event.key !== "Enter") return;
    event.preventDefault();
    if (index === steps.length - 1) {
      setSteps((prev) => [...prev, ""]);
    }
  }

  function addEquipmentTag() {
    const value = equipmentInput.trim();
    if (value && !equipment.includes(value)) {
      setEquipment((prev) => [...prev, value]);
    }
    setEquipmentInput("");
  }

  function handleEquipmentKeyDown(event: KeyboardEvent<HTMLInputElement>) {
    if (event.key === "Enter" || event.key === ",") {
      event.preventDefault();
      addEquipmentTag();
    }
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setLoading(true);
    const supabase = createClient();

    const payload = {
      title: title.trim(),
      category_id: categoryId as number,
      description: description.trim() || null,
      steps: steps.map((step) => step.trim()).filter(Boolean),
      duration_min: durationMin.trim() ? Number(durationMin) : null,
      difficulty,
      equipment,
      media_url: mediaUrl.trim() || null,
      is_public: isPublic,
    };

    if (props.mode === "create") {
      const { data, error } = await supabase
        .from("exercises")
        .insert({ ...payload, author_id: props.userId })
        .select("id")
        .single();

      setLoading(false);
      if (error || !data) {
        setFormError("Nie udało się zapisać ćwiczenia. Spróbuj ponownie.");
        return;
      }
      router.push(`/app/exercises/${data.id}`);
      router.refresh();
      return;
    }

    const { error } = await supabase
      .from("exercises")
      .update(payload)
      .eq("id", props.exercise.id);

    setLoading(false);
    if (error) {
      setFormError("Nie udało się zapisać zmian. Spróbuj ponownie.");
      return;
    }
    router.push(`/app/exercises/${props.exercise.id}`);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormBanner variant="error" message={formError} />

      <FormField
        id="title"
        label="Nazwa ćwiczenia"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        error={fieldErrors.title}
      />

      <div>
        <label htmlFor="category" className={labelClasses}>
          Kategoria
        </label>
        <select
          id="category"
          value={categoryId}
          onChange={(e) =>
            setCategoryId(e.target.value ? Number(e.target.value) : "")
          }
          className={`mt-1.5 ${fieldClasses(Boolean(fieldErrors.category))}`}
        >
          <option value="">Wybierz kategorię…</option>
          {props.categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name_pl}
            </option>
          ))}
        </select>
        {fieldErrors.category && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.category}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="description" className={labelClasses}>
          Opis
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className={`mt-1.5 ${fieldClasses()}`}
        />
      </div>

      <div>
        <span className={labelClasses}>Kroki</span>
        <div className="mt-1.5 space-y-2">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-2">
              <input
                type="text"
                value={step}
                onChange={(e) => updateStep(index, e.target.value)}
                onKeyDown={(e) => handleStepKeyDown(e, index)}
                placeholder={`Krok ${index + 1}`}
                aria-label={`Krok ${index + 1}`}
                className={fieldClasses(Boolean(fieldErrors.steps))}
              />
              <button
                type="button"
                onClick={() => removeStep(index)}
                aria-label="Usuń krok"
                className="shrink-0 rounded-lg border border-neutral-300 px-3 text-sm text-neutral-500 transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
              >
                ×
              </button>
            </div>
          ))}
        </div>
        <button
          type="button"
          onClick={() => setSteps((prev) => [...prev, ""])}
          className="mt-2 text-sm font-medium text-emerald-600 hover:text-emerald-500"
        >
          + Dodaj krok
        </button>
        {fieldErrors.steps && (
          <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
            {fieldErrors.steps}
          </p>
        )}
      </div>

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="duration"
          label="Czas trwania (min)"
          type="number"
          min={1}
          value={durationMin}
          onChange={(e) => setDurationMin(e.target.value)}
          error={fieldErrors.duration}
        />

        <div>
          <label htmlFor="difficulty" className={labelClasses}>
            Poziom trudności
          </label>
          <select
            id="difficulty"
            value={difficulty}
            onChange={(e) =>
              setDifficulty(Number(e.target.value) as Difficulty)
            }
            className={`mt-1.5 ${fieldClasses()}`}
          >
            {DIFFICULTY_OPTIONS.map((d) => (
              <option key={d} value={d}>
                {d} – {DIFFICULTY_LABELS[d]}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="equipment" className={labelClasses}>
          Sprzęt
        </label>
        <div className="mt-1.5 flex gap-2">
          <input
            id="equipment"
            type="text"
            value={equipmentInput}
            onChange={(e) => setEquipmentInput(e.target.value)}
            onKeyDown={handleEquipmentKeyDown}
            placeholder="np. piłki, pachołki…"
            className={fieldClasses()}
          />
          <button
            type="button"
            onClick={addEquipmentTag}
            className="shrink-0 rounded-lg border border-neutral-300 px-4 text-sm font-medium transition-colors hover:bg-neutral-50 dark:border-neutral-700 dark:hover:bg-neutral-900"
          >
            Dodaj
          </button>
        </div>
        {equipment.length > 0 && (
          <div className="mt-2 flex flex-wrap gap-2">
            {equipment.map((item) => (
              <span
                key={item}
                className="inline-flex items-center gap-1.5 rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-medium text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300"
              >
                {item}
                <button
                  type="button"
                  onClick={() =>
                    setEquipment((prev) => prev.filter((i) => i !== item))
                  }
                  aria-label={`Usuń ${item}`}
                  className="text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-100"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <FormField
        id="mediaUrl"
        label="Link do materiału (opcjonalnie)"
        type="url"
        placeholder="https://youtube.com/…"
        value={mediaUrl}
        onChange={(e) => setMediaUrl(e.target.value)}
        error={fieldErrors.mediaUrl}
      />

      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={isPublic}
          onChange={(e) => setIsPublic(e.target.checked)}
          className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-600/50 dark:border-neutral-700"
        />
        Widoczne publicznie dla innych trenerów
      </label>

      <SubmitButton loading={loading} loadingText="Zapisywanie…">
        {props.mode === "create" ? "Dodaj ćwiczenie" : "Zapisz zmiany"}
      </SubmitButton>
    </form>
  );
}
