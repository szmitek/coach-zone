import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ForgotPasswordForm } from "@/components/auth/ForgotPasswordForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Reset hasła — Coach Zone",
};

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      title="Zresetuj hasło"
      subtitle="Podaj swój email, a wyślemy Ci link do zresetowania hasła."
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
