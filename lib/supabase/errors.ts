import { isAuthError } from "@supabase/supabase-js";

const MESSAGES_BY_CODE: Record<string, string> = {
  user_already_exists:
    "An account with this email already exists. Try logging in instead.",
  email_exists:
    "An account with this email already exists. Try logging in instead.",
  invalid_credentials: "Incorrect email or password.",
  email_not_confirmed:
    "Please confirm your email address before logging in. Check your inbox for the confirmation link.",
  email_address_invalid: "Please enter a valid email address.",
  email_address_not_authorized: "This email address isn't allowed to sign up.",
  signup_disabled: "Sign-ups are currently disabled.",
  user_banned:
    "This account has been disabled. Contact support if you think this is a mistake.",
  weak_password: "Password must be at least 6 characters.",
  same_password:
    "Your new password must be different from your current password.",
  over_email_send_rate_limit:
    "Too many attempts. Please wait a moment and try again.",
  over_request_rate_limit:
    "Too many attempts. Please wait a moment and try again.",
  validation_failed: "Please check the form for errors and try again.",
  session_not_found: "Your session has expired. Please log in again.",
  user_not_found: "Incorrect email or password.",
};

// Fallback for cases where Supabase doesn't populate error.code - notably
// signInWithPassword's "Invalid login credentials", which auth-js currently
// surfaces via the legacy invalid_grant response shape with code: undefined
// (supabase/auth-js#937). email_not_confirmed is unaffected and matches via
// error.code above, so the two cases still get distinct messages.
const MESSAGES_BY_TEXT: Array<[RegExp, string]> = [
  [/already registered/i, MESSAGES_BY_CODE.user_already_exists],
  [/invalid login credentials/i, MESSAGES_BY_CODE.invalid_credentials],
  [/email not confirmed/i, MESSAGES_BY_CODE.email_not_confirmed],
  [/password should be at least/i, MESSAGES_BY_CODE.weak_password],
  [/session missing/i, MESSAGES_BY_CODE.session_not_found],
  [/rate limit/i, MESSAGES_BY_CODE.over_email_send_rate_limit],
];

const FALLBACK_MESSAGE = "Something went wrong. Please try again.";

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
