"use client";
import Link from "next/link";
import { signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";
import { useEffect, useState } from "react";

export default function Signup(props: { searchParams: Promise<Message> }) {
  const { handleGoogleSignIn, error: googleSignInError } = useGoogleSignIn();
  const [message, setMessage] = useState<Message | null>(null);

  useEffect(() => {
    props.searchParams.then((data) => setMessage(data));
  }, [props.searchParams]);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (form) {
      const formData = new FormData(form);
      await signUpAction(formData);
    } else {
      console.error("Form is not available");
    }
  };

  if (message && "message" in message) {
    return (
      <div className="w-full flex-1 flex items-center h-screen sm:max-w-md justify-center gap-2 p-4">
        <FormMessage message={message} />
      </div>
    );
  }

  return (
    <>
      <img
        src="/WebPromp.webp"
        className="w-[34vw] border-2 border-secondary-border rounded-3xl"></img>
      <form className="flex flex-col w-80 gap-4 mx-auto">
        <h1 className="text-3xl">Sign Up</h1>
        <Button onClick={handleGoogleSignIn} variant="default">
          Sign Up with Google
        </Button>
        <div className="flex flex-col gap-4">
          <div className="flex flex-col gap-2">
            <Label htmlFor="email">Email</Label>
            <Input name="email" placeholder="Email" required />
          </div>

          <div className="flex flex-col justify-start gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              type="password"
              name="password"
              className="mb-2"
              placeholder="Password"
              minLength={6}
              required
            />
          </div>

          <div>
            <SubmitButton
              onClick={handleSubmit}
              className="w-full mb-2 transition-transform transform hover:scale-103 hover:gradient-shadow"
              pendingText="Signing up...">
              Sign Up
            </SubmitButton>
            <p className="text-xs opacity-80 text text-foreground">
              Already have an account? &nbsp;
              <Link
                className="text-blue-600 font-medium underline"
                href="/sign-in">
                Sign in
              </Link>
            </p>
          </div>

          {googleSignInError && (
            <FormMessage message={{ message: googleSignInError }} />
          )}
          {message && <FormMessage message={message} />}
        </div>
      </form>
    </>
  );
}
