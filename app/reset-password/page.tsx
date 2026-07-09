import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { ResetPasswordGate } from "@/components/auth/ResetPasswordGate";

export const metadata: Metadata = {
  title: "Set new password — Coach Zone",
};

export default function ResetPasswordPage() {
  return (
    <AuthShell title="Reset your password">
      <ResetPasswordGate />
    </AuthShell>
  );
}
