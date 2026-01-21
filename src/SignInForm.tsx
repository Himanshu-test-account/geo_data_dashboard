"use client";
import { useState } from "react";
import { toast } from "sonner";

interface SignInFormProps {
  onSignIn: (user: { name: string; email: string }) => void;
}

export function SignInForm({ onSignIn }: SignInFormProps) {
  const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
  const [submitting, setSubmitting] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    // Simulate authentication delay
    setTimeout(() => {
      // Simple frontend mock logic
      if (email && password.length >= 4) {
        toast.success(`Successfully ${flow === "signIn" ? "signed in" : "signed up"}`);
        onSignIn({ name: email.split("@")[0], email });
      } else {
        toast.error("Invalid credentials. Please try again.");
      }
      setSubmitting(false);
    }, 500);
  };

  const handleAnonymousSignIn = () => {
    const randomName = `Guest${Math.floor(Math.random() * 1000)}`;
    toast.success("Signed in anonymously");
    onSignIn({ name: randomName, email: "" });
  };

  return (
    <div className="w-full">
      <form className="flex flex-col gap-form-field" onSubmit={handleSubmit}>
        <input
          className="auth-input-field"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          className="auth-input-field"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit" disabled={submitting}>
          {flow === "signIn" ? "Sign in" : "Sign up"}
        </button>
        <div className="text-center text-sm text-secondary">
          <span>
            {flow === "signIn" ? "Don't have an account? " : "Already have an account? "}
          </span>
          <button
            type="button"
            className="text-primary hover:text-primary-hover hover:underline font-medium cursor-pointer"
            onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
          >
            {flow === "signIn" ? "Sign up instead" : "Sign in instead"}
          </button>
        </div>
      </form>

      <div className="flex items-center justify-center my-3">
        <hr className="my-4 grow border-gray-200" />
        <span className="mx-4 text-secondary">or</span>
        <hr className="my-4 grow border-gray-200" />
      </div>

      <button className="auth-button" onClick={handleAnonymousSignIn}>
        Sign in anonymously
      </button>
    </div>
  );
}
