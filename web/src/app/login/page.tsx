import type { Metadata } from "next";
import { LoginForm } from "./LoginForm";

export const metadata: Metadata = {
  title: "Investor Login",
  description: "Secure investor portal access for Mansa Conquest limited partners.",
  robots: { index: false, follow: false },
};

export default function LoginPage() {
  return <LoginForm />;
}
