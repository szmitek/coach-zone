"use client";

import { useRouter } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import { AudienceSelector } from "@/components/AudienceSelector";
import { FormBanner } from "@/components/auth/FormBanner";
import { FormField } from "@/components/auth/FormField";
import { SubmitButton } from "@/components/auth/SubmitButton";
import type { TacticsBoardHandle } from "@/components/board/TacticsBoard";
import { TacticsBoardLoader } from "@/components/board/TacticsBoardLoader";
import { audienceEquals, defaultAudience, type Audience } from "@/lib/audience";
import type { BoardElement } from "@/lib/board/types";
import { pickDefaultSportId } from "@/lib/board/sports/registry";
import {
  DEFAULT_PLAY_FIELD_MODE,
  UNIT_LABELS,
  UNIT_OPTIONS,
} from "@/lib/plays";
import { createClient } from "@/lib/supabase/client";
import type { Json, Play, PlayUnit, Sport } from "@/lib/supabase/types";

type PlayFormProps =
  | {
      mode: "create";
      userId: string;
      teams: Array<{ id: string; name: string }>;
      sports: Sport[];
    }
  | {
      mode: "edit";
      play: Play;
      currentUserId: string;
      teams: Array<{ id: string; name: string }>;
      sports: Sport[];
    };

interface FieldErrors {
  name?: string;
  playNumber?: string;
}

const labelClasses = "block text-sm font-medium";

function fieldClasses(hasError?: boolean) {
  return `w-full rounded-lg border bg-white px-3 py-2 text-sm outline-none transition-colors focus:ring-2 focus:ring-emerald-600/50 dark:bg-neutral-900 ${
    hasError
      ? "border-red-400 dark:border-red-500"
      : "border-neutral-300 dark:border-neutral-700"
  }`;
}

function boardElementsOf(play: Play | null): BoardElement[] | undefined {
  return Array.isArray(play?.board_state)
    ? (play.board_state as unknown as BoardElement[])
    : undefined;
}

// Plays have no is_public column - only ever personal or team-owned - so
// this maps straight to team_id rather than reusing audienceToFields
// (which also writes exercises'/workouts' is_public). The "public" case is
// unreachable through the UI (AudienceSelector is rendered with
// showPublicOption={false} below) and falls back to personal defensively.
function teamIdForAudience(audience: Audience): string | null {
  return audience.kind === "team" ? audience.teamId : null;
}

function audienceOfPlay(play: Play): Audience {
  return play.team_id
    ? { kind: "team", teamId: play.team_id }
    : { kind: "personal" };
}

export function PlayForm(props: PlayFormProps) {
  const router = useRouter();
  const initial = props.mode === "edit" ? props.play : null;

  const [name, setName] = useState(initial?.name ?? "");
  const [playNumber, setPlayNumber] = useState(
    initial?.play_number != null ? String(initial.play_number) : "",
  );
  const [unit, setUnit] = useState<PlayUnit>(initial?.unit ?? "offense");
  const [formation, setFormation] = useState(initial?.formation ?? "");
  const [notes, setNotes] = useState(initial?.notes ?? "");
  const [audience, setAudience] = useState<Audience>(() =>
    initial ? audienceOfPlay(initial) : defaultAudience(props.teams),
  );

  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [formError, setFormError] = useState<string | null>(null);
  const [savedNotice, setSavedNotice] = useState(false);
  const [saving, setSaving] = useState(false);

  const boardHandleRef = useRef<TacticsBoardHandle | null>(null);
  const initialBoardElements = useRef(boardElementsOf(initial)).current;
  const initialFieldModeId = useRef(
    initial?.board_field_mode ?? DEFAULT_PLAY_FIELD_MODE,
  ).current;
  // No sport picker in phase 1 - resolved the same way the board itself
  // defaults a sport, and fixed for the life of this form.
  const sportId = useRef(
    initial?.sport_id ?? pickDefaultSportId(props.sports),
  ).current;

  function validate(): FieldErrors {
    const errors: FieldErrors = {};
    if (!name.trim()) errors.name = "Podaj nazwę zagrywki.";
    if (playNumber.trim()) {
      const value = Number(playNumber);
      if (!Number.isInteger(value) || value <= 0) {
        errors.playNumber =
          "Podaj numer zagrywki (liczba całkowita większa od zera).";
      }
    }
    return errors;
  }

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setFormError(null);
    setSavedNotice(false);

    const errors = validate();
    setFieldErrors(errors);
    if (Object.keys(errors).length > 0) return;

    if (sportId === null) {
      setFormError(
        "Nie udało się ustalić dyscypliny. Odśwież stronę i spróbuj ponownie.",
      );
      return;
    }

    void save(sportId);
  }

  async function save(resolvedSportId: number) {
    setSaving(true);
    setFormError(null);

    const supabase = createClient();
    const board = boardHandleRef.current;
    const boardElements =
      board && !board.isEmpty() ? board.getElements() : null;
    const boardFieldMode =
      board && boardElements ? board.getFieldModeId() : null;

    const payload = {
      name: name.trim(),
      play_number: playNumber.trim() ? Number(playNumber) : null,
      unit,
      formation: formation.trim() || null,
      notes: notes.trim() || null,
      board_state: boardElements as unknown as Json,
      board_field_mode: boardFieldMode,
      sport_id: resolvedSportId,
      team_id: teamIdForAudience(audience),
    };

    if (props.mode === "create") {
      const { data, error } = await supabase
        .from("plays")
        .insert({
          ...payload,
          owner_id: props.userId,
          last_edited_by: props.userId,
        })
        .select("id")
        .single();

      setSaving(false);
      if (error || !data) {
        setFormError("Nie udało się zapisać zagrywki. Spróbuj ponownie.");
        return;
      }
      router.push(`/app/plays/${data.id}`);
      router.refresh();
      return;
    }

    const { error } = await supabase
      .from("plays")
      .update({ ...payload, last_edited_by: props.currentUserId })
      .eq("id", props.play.id);

    setSaving(false);
    if (error) {
      setFormError("Nie udało się zapisać zmian. Spróbuj ponownie.");
      return;
    }
    setSavedNotice(true);
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-5">
      <FormBanner variant="error" message={formError} />
      <FormBanner
        variant="success"
        message={savedNotice ? "Zapisano zmiany." : null}
      />

      <FormField
        id="name"
        label="Nazwa zagrywki"
        type="text"
        placeholder="np. Trips Right Slant"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
          setSavedNotice(false);
        }}
        error={fieldErrors.name}
      />

      <div className="grid grid-cols-2 gap-4">
        <FormField
          id="playNumber"
          label="Numer zagrywki"
          type="number"
          min={1}
          placeholder="nadany automatycznie"
          value={playNumber}
          onChange={(e) => {
            setPlayNumber(e.target.value);
            setSavedNotice(false);
          }}
          error={fieldErrors.playNumber}
        />

        <div>
          <label htmlFor="unit" className={labelClasses}>
            Jednostka
          </label>
          <select
            id="unit"
            value={unit}
            onChange={(e) => {
              setUnit(e.target.value as PlayUnit);
              setSavedNotice(false);
            }}
            className={`mt-1.5 ${fieldClasses()}`}
          >
            {UNIT_OPTIONS.map((option) => (
              <option key={option} value={option}>
                {UNIT_LABELS[option]}
              </option>
            ))}
          </select>
        </div>
      </div>
      {props.mode === "create" && (
        <p className="-mt-3 text-xs text-neutral-500 dark:text-neutral-500">
          Zostaw puste, żeby otrzymać kolejny wolny numer w tej puli — będzie go
          można zmienić w dowolnym momencie po zapisaniu.
        </p>
      )}

      <FormField
        id="formation"
        label="Formacja (opcjonalnie)"
        type="text"
        placeholder="np. Trips Right"
        value={formation}
        onChange={(e) => {
          setFormation(e.target.value);
          setSavedNotice(false);
        }}
      />

      <div>
        <span className={labelClasses}>Diagram (opcjonalnie)</span>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
          Domyślnie tablica pokazuje przybliżony fragment boiska wokół linii
          rozpoczęcia akcji — widok możesz zmienić. Zagrywkę można zapisać też
          bez rysunku, jako samą nazwę i notatki.
        </p>
        <div className="mt-3">
          <TacticsBoardLoader
            sports={props.sports}
            sportId={sportId}
            initialElements={initialBoardElements}
            initialFieldModeId={initialFieldModeId}
            handleRef={boardHandleRef}
          />
        </div>
      </div>

      <div>
        <label htmlFor="notes" className={labelClasses}>
          Notatki (opcjonalnie)
        </label>
        <p className="mt-1 text-sm text-neutral-500 dark:text-neutral-500">
          Odczyty i wskazówki do zagrywki. Rysunek nie przypisuje ról do
          konkretnych zawodników — każdy grający na danej pozycji musi znać
          każdą trasę, żeby móc zastąpić kolegę.
        </p>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => {
            setNotes(e.target.value);
            setSavedNotice(false);
          }}
          rows={4}
          className={`mt-1.5 ${fieldClasses()}`}
        />
      </div>

      <AudienceSelector
        legend="Dla kogo jest ta zagrywka?"
        teams={props.teams}
        value={audience}
        onChange={(next) => {
          setAudience(next);
          setSavedNotice(false);
        }}
        showPublicOption={false}
      />
      {props.mode === "edit" &&
        !audienceEquals(audience, audienceOfPlay(props.play)) && (
          <p className="-mt-3 text-xs text-amber-700 dark:text-amber-400">
            Zmiana zakresu przeniesie tę zagrywkę po zapisaniu — zniknie z
            poprzedniego miejsca.
          </p>
        )}

      <SubmitButton loading={saving} loadingText="Zapisywanie…">
        {props.mode === "create" ? "Utwórz zagrywkę" : "Zapisz zmiany"}
      </SubmitButton>
    </form>
  );
}
