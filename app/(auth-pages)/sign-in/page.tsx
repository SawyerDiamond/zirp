"use client";

import Link from "next/link";
import { signInAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/authComponents/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";

export default function Login(props: { searchParams: Promise<Message> }) {
  const [searchParams, setSearchParams] = useState<Message | null>(null);

  useEffect(() => {
    props.searchParams.then((data) => setSearchParams(data));
  }, [props.searchParams]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (form) {
      const formData = new FormData(form);
      await signInAction(formData);
    }
  };

  return (
    <>
      <img
        src="/WebPromp.webp"
        className="w-[34vw] border-2 border-secondary-border rounded-3xl"
      />
      <form className="flex flex-col w-80 gap-4 mx-auto">
        <h1 className="text-3xl">Sign In</h1>
        <p className="text-sm text-foreground">
          Don't have an account?{" "}
          <Link
            className="text-foreground font-medium underline"
            href="/sign-up">
            Sign up
          </Link>
        </p>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="you@example.com" required />
          </div>

          <div className="flex flex-col justify-start gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              placeholder="Your password"
              required
            />
          </div>

          <div>
            <SubmitButton
              onClick={handleSubmit}
              className="w-full mb-2 transition-transform transform hover:scale-103 hover:gradient-shadow"
              pendingText="Signing in...">
              Sign In
            </SubmitButton>
            <p className="text-xs opacity-80 text text-foreground">
              <Link
                className="text-xs text-foreground underline"
                href="/forgot-password">
                Forgot Password?
              </Link>
            </p>
          </div>

          <FormMessage message={searchParams || { message: "" }} />
        </div>
      </form>
    </>
  );
}
