import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Zarejestruj się — Coach Zone",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Utwórz konto"
      subtitle="Zbuduj bibliotekę ćwiczeń i zacznij planować treningi."
    >
      <SignupForm />
    </AuthShell>
  );
}
