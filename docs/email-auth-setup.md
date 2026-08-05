# Email confirmation + password reset — SMTP & template setup (Round 17)

This is a reference copy of what needs to be pasted into the Supabase dashboard
manually (Auth settings aren't version-controlled — there's no
`supabase/config.toml` in this repo). Nothing here requires an app code change:
`app/auth/confirm/route.ts`, `/reset-password`, and `SignupForm` were already
built to handle a custom template link and both confirmed/unconfirmed signup
outcomes (see the comments in those files). The only reason confirmation links
were broken was that the *email templates* still used Supabase's default
`{{ .ConfirmationURL }}` link, which never reaches `/auth/confirm`.

## 1. SMTP provider — Brevo (free tier)

Recommending **Brevo** over Resend here specifically because this project has
no custom domain (`coach-zone.vercel.app` is a Vercel subdomain we don't
control DNS for). Resend's free tier only lets you send to your *own* signup
address until you verify a domain via DNS — useless for real users. Brevo lets
you verify a single sender **mailbox** (not a domain) and send to anyone, on a
free tier of 300 emails/day, no monthly cap. If a custom domain gets bought
later, Resend is worth revisiting — it's the simpler of the two once domain
verification is possible.

Setup on brevo.com (free signup):

1. **Senders, Domains & Dedicated IPs → Senders → Add a sender** — add the
   email address you want mail to come from (e.g. your own address, or
   something like `kontakt@<something you control>`). Brevo emails *that
   inbox* a confirmation link — click it to verify. No DNS needed.
2. **SMTP & API → SMTP tab** — note the SMTP login (usually your Brevo account
   email) and click "Generate a new SMTP key" — that key is the SMTP
   *password* (not your Brevo login password).

### Paste into Supabase → Project Settings → Authentication → SMTP Settings

```
Enable Custom SMTP: ON
Sender email:        <the address you verified as a sender in Brevo>
Sender name:         Coach Zone
Host:                smtp-relay.brevo.com
Port:                587
Username:             <your Brevo account email>
Password:            <the SMTP key from Brevo's SMTP & API tab>
```

Also check **Authentication → URL Configuration**:

```
Site URL:       https://coach-zone.vercel.app
Redirect URLs:  https://coach-zone.vercel.app/**
                http://localhost:3000/**   (only if you test locally)
```

`Site URL` is what `{{ .SiteURL }}` resolves to in the templates below, and the
redirect allow-list is checked by Supabase regardless of template shape.

## 2. Email templates (Polish)

Paste into **Authentication → Email Templates**. The critical part is the link
— it must point at `/auth/confirm` with `token_hash` + `type`, matching what
`app/auth/confirm/route.ts` reads. `type=email` is what confirm-signup links
must carry (that's the value `verifyOtp` expects for this flow); `type=recovery`
is for the reset link. Do not use `{{ .ConfirmationURL }}` — that's the old
default that caused this whole problem.

### Confirm signup

Subject: `Potwierdź adres e-mail — Coach Zone`

```html
<h2>Witaj w Coach Zone!</h2>
<p>
  Dzięki, że założyłeś/aś konto. Zanim zaczniesz budować swoją bibliotekę
  ćwiczeń i planować treningi, potwierdź adres e-mail — to zajmie chwilę.
</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=email&next=/app">
    Potwierdź adres e-mail
  </a>
</p>
<p>Jeśli to nie Ty zakładałeś/aś to konto, możesz po prostu zignorować tę wiadomość.</p>
<p>Do zobaczenia na boisku,<br>Zespół Coach Zone</p>
```

### Reset Password

Subject: `Ustaw nowe hasło — Coach Zone`

```html
<h2>Reset hasła</h2>
<p>
  Dostaliśmy prośbę o zresetowanie hasła do Twojego konta w Coach Zone.
  Kliknij poniżej, aby ustawić nowe hasło.
</p>
<p>
  <a href="{{ .SiteURL }}/auth/confirm?token_hash={{ .TokenHash }}&type=recovery&next=/reset-password">
    Ustaw nowe hasło
  </a>
</p>
<p>
  Jeśli to nie Ty prosiłeś/aś o reset hasła, zignoruj tę wiadomość — Twoje
  obecne hasło zostaje bez zmian.
</p>
<p>Pozdrawiamy,<br>Zespół Coach Zone</p>
```

## 3. Testing checklist — do this BEFORE flipping confirmation on

1. Save the SMTP settings above and the two templates.
2. Sign up a fresh throwaway account on prod with a real inbox you can check.
   Confirmation is still OFF at this point, so you'll be logged in
   immediately — that's expected, this step only tests that SMTP is wired up
   and *sends* mail (Supabase still sends the confirmation email even when
   `Confirm email` is off, it's just not required to proceed).
3. Open the confirmation email, confirm it rendered in Polish and the button
   points at `.../auth/confirm?token_hash=...&type=email...`. Click it —
   should land you on `/app` without an error banner.
4. Go to `/forgot-password` with that same test account, request a reset,
   open the email, confirm the link shape (`type=recovery`), click it — should
   land on `/reset-password` and let you set a new password.
5. Only once both round-trips work end-to-end: flip the toggle (next section).

## 4. Turning email confirmation back ON

**Authentication → Providers → Email → "Confirm email"** → switch to on.

Do this only after step 3 in the checklist above passes — until then, leaving
confirmation off costs nothing except that new signups skip the check.

**Existing accounts are unaffected.** Supabase enforces confirmation at
sign-in by checking whether `email_confirmed_at` is set on the user row.
Every account created while confirmation was off already has that column
populated (Supabase auto-confirms at signup time when the requirement is
off) — flipping the toggle later doesn't clear or recheck it retroactively,
it only changes what's required for *new* signups from that point on. Your 4
existing accounts, and your friend's, keep working exactly as they do today.
You can spot-check this in Supabase's Table Editor → `auth.users` →
`email_confirmed_at` column before flipping the toggle, if you want to see it
for yourself first.

## 5. Signup behavior in both modes (already implemented, no change needed)

`components/auth/SignupForm.tsx` already branches on whether `signUp()`
returns a live session:

- Confirmation **off** → Supabase returns a session immediately → user is
  routed straight to `/app`.
- Confirmation **on** → no session comes back → the form shows the
  "Wysłaliśmy link potwierdzający…" banner instead.

This was already correct before this round; nothing needed to change for it.
