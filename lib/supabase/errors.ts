import { isAuthError } from "@supabase/supabase-js";

const MESSAGES_BY_CODE: Record<string, string> = {
  user_already_exists:
    "Konto z tym adresem email już istnieje. Spróbuj się zalogować.",
  email_exists:
    "Konto z tym adresem email już istnieje. Spróbuj się zalogować.",
  invalid_credentials: "Nieprawidłowy email lub hasło.",
  email_not_confirmed:
    "Potwierdź adres email, zanim się zalogujesz. Sprawdź skrzynkę — wysłaliśmy link potwierdzający.",
  email_address_invalid: "Podaj poprawny adres email.",
  email_address_not_authorized: "Ten adres email nie może się zarejestrować.",
  signup_disabled: "Rejestracja jest obecnie wyłączona.",
  user_banned: "To konto zostało zablokowane.",
  weak_password: "Hasło musi mieć co najmniej 6 znaków.",
  same_password: "Nowe hasło musi różnić się od obecnego.",
  over_email_send_rate_limit:
    "Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.",
  over_request_rate_limit:
    "Zbyt wiele prób. Odczekaj chwilę i spróbuj ponownie.",
  validation_failed: "Sprawdź formularz i spróbuj ponownie.",
  session_not_found: "Twoja sesja wygasła. Zaloguj się ponownie.",
  user_not_found: "Nieprawidłowy email lub hasło.",
};

// Fallback for responses that predate structured error codes, or that never
// carry one client-side (e.g. AuthRetryableFetchError from a network blip).
// Verified directly against the installed auth-js (2.110.1): every request
// sends the `X-Supabase-Api-Version: 2024-01-01` header, and handleError()
// in lib/fetch.js reads `code` straight from the JSON error body whenever
// the server echoes back that version or later - which a current hosted
// Supabase project always does. So invalid_credentials and
// email_not_confirmed both already arrive as populated error.code values
// via MESSAGES_BY_CODE above; this regex list is defense-in-depth only.
const MESSAGES_BY_TEXT: Array<[RegExp, string]> = [
  [/already registered/i, MESSAGES_BY_CODE.user_already_exists],
  [/invalid login credentials/i, MESSAGES_BY_CODE.invalid_credentials],
  [/email not confirmed/i, MESSAGES_BY_CODE.email_not_confirmed],
  [/password should be at least/i, MESSAGES_BY_CODE.weak_password],
  [/session missing/i, MESSAGES_BY_CODE.session_not_found],
  [/rate limit/i, MESSAGES_BY_CODE.over_email_send_rate_limit],
];

const FALLBACK_MESSAGE = "Coś poszło nie tak. Spróbuj ponownie.";

/**
 * Maps a Supabase Auth error to a short, user-facing message. Never returns
 * the raw error message/stack, since those can leak implementation details.
 *
 * Auth errors aren't all AuthApiError (HTTP responses) - client-thrown
 * variants like AuthWeakPasswordError or AuthSessionMissingError extend the
 * base AuthError instead, so we check broadly with isAuthError.
 */
export function getAuthErrorMessage(error: unknown): string {
  if (!error) return FALLBACK_MESSAGE;

  if (isAuthError(error)) {
    const code = error.code;
    if (code && MESSAGES_BY_CODE[code]) {
      return MESSAGES_BY_CODE[code];
    }

    for (const [pattern, message] of MESSAGES_BY_TEXT) {
      if (pattern.test(error.message)) return message;
    }
  }

  return FALLBACK_MESSAGE;
}
