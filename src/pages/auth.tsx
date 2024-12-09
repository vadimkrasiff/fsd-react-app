import { SignInForm } from "../features/auth/sign-in-form";

export function AuthPage() {
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-5">
      <SignInForm style={{ maxWidth: 400 }} />
    </div>
  );
}
