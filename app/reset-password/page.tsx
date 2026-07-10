import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordGate } from "@/components/auth/ResetPasswordGate";

export const metadata: Metadata = {
  title: "Nowe hasło — Coach Zone",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Ustaw nowe hasło">
      <ResetPasswordGate />
    </AuthShell>
  );
}
