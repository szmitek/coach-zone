// Kept in sync with the DB constraint in
// supabase/migrations/20260712100000_coach_pseudonyms.sql
// (profiles_display_name_format + the unique index on lower(display_name)).
// The DB is the source of truth; this is only a fast client-side check.
export const PSEUDONYM_PATTERN = /^[A-Za-z0-9_-]{3,20}$/;

export const PSEUDONYM_FORMAT_MESSAGE =
  "3–20 znaków: litery, cyfry, „_” lub „-”, bez spacji.";

export function validatePseudonym(value: string): string | undefined {
  const trimmed = value.trim();
  if (!trimmed) return "Podaj pseudonim trenera.";
  if (!PSEUDONYM_PATTERN.test(trimmed)) {
    return PSEUDONYM_FORMAT_MESSAGE;
  }
  return undefined;
}

export const PSEUDONYM_TAKEN_MESSAGE =
  "Ten pseudonim jest już zajęty. Wybierz inny.";
