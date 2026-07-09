import type { Metadata } from "next";
import { AuthShell } from "@/components/auth/AuthShell";
import { SignupForm } from "@/components/auth/SignupForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Sign up — Coach Zone",
};

export default function SignupPage() {
  return (
    <AuthShell
      title="Create your account"
      subtitle="Build your exercise library and start planning sessions."
    >
      <SignupForm />
    </AuthShell>
  );
}
