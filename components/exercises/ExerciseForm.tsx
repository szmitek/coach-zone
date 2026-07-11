"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent, type KeyboardEvent } from "react";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import type { TacticsBoardHandle } from "@/components/board/TacticsBoard";
import { TacticsBoardLoader } from "@/components/board/TacticsBoardLoader";
import { DIFFICULTY_LABELS, DIFFICULTY_OPTIONS } from "@/lib/exercises";
import type { BoardElement } from "@/lib/board/types";
import { createClient } from "@/lib/supabase/client";
import type {
  Category,
  Difficulty,
  Exercise,
  Json,
  Sport,
} from "@/lib/supabase/types";
import { SaveExerciseDialog } from "./SaveExerciseDialog";

interface ExerciseFormProps {
  categories: Category[];
  sports: Sport[];
  userId: string;
  /** Set when opened via "Duplikuj" on an existing exercise - prefills every field, including the board. */
  duplicateFrom?: Exercise | null;
}

interface FieldErrors {
  title?: string;
  category?: string;
  sport?: string;
  steps?: string;
  duration?: string;
}

const labelClasses = "block text-sm font-medium";

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:bg-neutral-900 ${
    hasError
      ? "border-red-400 dark:border-red-500"
      : "border-neutral-300 dark:border-neutral-700"
  }`;
}

function boardElementsOf(
  exercise: Exercise | null | undefined,
): BoardElement[] | undefined {
  return Array.isArray(exercise?.board_state)
    ? (exercise.board_state as unknown as BoardElement[])
    : undefined;
}

export function ExerciseForm({
  categories,
  sports,
  userId,
  duplicateFrom,
}: ExerciseFormProps) {
  const router = useRouter();

  const [title, setTitle] = useState(
    duplicateFrom ? `${duplicateFrom.title} (kopia)` : "",
  );
  const [categoryId, setCategoryId] = useState<number | "">(
    duplicateFrom?.category_id ?? "",
  );
  const [sportId, setSportId] = useState<number | "">(
    duplicateFrom?.sport_id ??
      sports.find((sport) => sport.slug === "football")?.id ??
      "",
  );
  const [description, setDescription] = useState(
    duplicateFrom?.description ?? "",
  );
  const [steps, setSteps] = useState<string[]>(
    duplicateFrom?.steps && duplicateFrom.steps.length > 0
      ? duplicateFrom.steps
      : [""],
  );
  const [durationMin, setDurationMin] = useState(
    duplicateFrom?.duration_min ? String(duplicateFrom.duration_min) : "",
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(
    duplicateFrom?.difficulty ?? 3,
  );
  const [equipment, setEquipment] = useState<string[]>(
    duplicateFrom?.equipment ?? [],
  );
  const [equipmentInput, setEquipmentInput] = useState("");
  const [keepPrivate, setKeepPrivate] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [saving, setSaving] = useState(false);

  const boardHandleRef = useRef<TacticsBoardHandle | null>(null);
  const initialBoardElements = useRef(boardElementsOf(duplicateFrom)).current;

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!title.trim()) errors.title = "Podaj nazwę ćwiczenia.";
    if (!categoryId) errors.category = "Wybierz kategorię.";
    if (!sportId) errors.sport = "Wybierz dyscyplinę.";
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

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setConfirmOpen(true);
  }

  async function handleConfirmSave() {
    setSaving(true);
    setFormError(null);

    const supabase = createClient();
    const board = boardHandleRef.current;
    const boardElements =
      board && !board.isEmpty() ? board.getElements() : null;

    let mediaUrl: string | null = null;
    if (board && boardElements) {
      const dataUrl = board.exportPng();
      if (dataUrl) {
        try {
          const blob = await (await fetch(dataUrl)).blob();
          const path = `${userId}/${crypto.randomUUID()}.png`;
          const { error: uploadError } = await supabase.storage
            .from("exercise-media")
            .upload(path, blob, { contentType: "image/png" });
          if (uploadError) throw uploadError;
          mediaUrl = supabase.storage.from("exercise-media").getPublicUrl(path)
            .data.publicUrl;
        } catch {
          setSaving(false);
          setConfirmOpen(false);
          setFormError(
            "Nie udało się zapisać diagramu z tablicy. Spróbuj ponownie.",
          );
          return;
        }
      }
    }

    const payload = {
      author_id: userId,
      title: title.trim(),
      category_id: categoryId as number,
      sport_id: sportId as number,
      description: description.trim() || null,
      steps: steps.map((step) => step.trim()).filter(Boolean),
      duration_min: durationMin.trim() ? Number(durationMin) : null,
      difficulty,
      equipment,
      media_url: mediaUrl,
      board_state: boardElements as unknown as Json,
      is_public: !keepPrivate,
    };

    const { data, error } = await supabase
      .from("exercises")
      .insert(payload)
      .select("id")
      .single();

    setSaving(false);
    setConfirmOpen(false);
    if (error || !data) {
      setFormError("Nie udało się zapisać ćwiczenia. Spróbuj ponownie.");
      return;
    }
    router.push(`/app/exercises/${data.id}`);
    router.refresh();
  }

  return (
    <>
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
          <label htmlFor="sport" className={labelClasses}>
            Dyscyplina
          </label>
          <select
            id="sport"
            value={sportId}
            onChange={(e) =>
              setSportId(e.target.value ? Number(e.target.value) : "")
            }
            className={`mt-1.5 ${fieldClasses(Boolean(fieldErrors.sport))}`}
          >
            <option value="">Wybierz dyscyplinę…</option>
            {sports.map((sport) => (
              <option key={sport.id} value={sport.id}>
                {sport.name_pl}
              </option>
            ))}
          </select>
          {fieldErrors.sport && (
            <p className="mt-1.5 text-sm text-red-600 dark:text-red-400">
              {fieldErrors.sport}
            </p>
          )}
        </div>

        <div>
          <span className={labelClasses}>Narysuj ćwiczenie (opcjonalnie)</span>
          <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
            Tablica użyje boiska dla wybranej dyscypliny. Rysunek zostanie
            zapisany razem z ćwiczeniem i będzie można go później edytować przez
            duplikowanie.
          </p>
          <div className="mt-3">
            <TacticsBoardLoader
              sports={sports}
              sportId={sportId === "" ? null : sportId}
              initialElements={initialBoardElements}
              handleRef={boardHandleRef}
            />
          </div>
        </div>

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
            {categories.map((category) => (
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

        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={keepPrivate}
            onChange={(e) => setKeepPrivate(e.target.checked)}
            className="h-4 w-4 rounded border-neutral-300 text-emerald-600 focus:ring-emerald-600/50 dark:border-neutral-700"
          />
          Zachowaj jako prywatne (nie udostępniaj innym trenerom)
        </label>

        <SubmitButton loading={saving} loadingText="Zapisywanie…">
          Dodaj ćwiczenie
        </SubmitButton>
      </form>

      {confirmOpen && (
        <SaveExerciseDialog
          isPublic={!keepPrivate}
          saving={saving}
          onConfirm={handleConfirmSave}
          onCancel={() => setConfirmOpen(false)}
        />
      )}
    </>
  );
}
