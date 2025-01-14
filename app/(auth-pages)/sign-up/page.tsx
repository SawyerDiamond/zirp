"use client";

import { signInAction, signUpAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/authComponents/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";
import { useEffect, useState } from "react";

export default function Auth() {
  const { handleGoogleSignIn, error: googleSignInError } = useGoogleSignIn();
  const [message, setMessage] = useState<Message | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

  useEffect(() => {
    // Handle any initial messages if necessary
  }, []);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (form) {
      const formData = new FormData(form);
      if (isSignUp) {
        await signUpAction(formData);
      } else {
        await signInAction(formData);
      }
    } else {
      console.error("Form is not available");
    }
  };

  return (
    <>
      <img
        src="/WebPromp.webp"
        className="w-[34vw] border-2 border-secondary-border rounded-3xl"
      />
      <div className="flex flex-col w-80 gap-4 mx-auto">
        <div className="flex justify-between items-center">
          <Button
            variant={isSignUp ? "secondary" : "default"}
            onClick={() => setIsSignUp(!isSignUp)}>
            Sign Up
          </Button>
          <Button
            variant={isSignUp ? "default" : "secondary"}
            onClick={() => setIsSignUp(!isSignUp)}>
            Sign In
          </Button>
        </div>
        <form className="flex flex-col gap-4">
          <Button onClick={handleGoogleSignIn} variant="default">
            {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
          </Button>
          <div className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input name="username" placeholder="Username" required />
              </div>
            )}
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

            {isSignUp && (
              <div className="flex flex-col justify-start gap-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            )}

            <div>
              <SubmitButton
                onClick={handleSubmit}
                className="w-full mb-2 transition-transform transform hover:scale-103 hover:gradient-shadow"
                pendingText={isSignUp ? "Signing up..." : "Signing in..."}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </SubmitButton>
            </div>

            {googleSignInError && (
              <FormMessage message={{ message: googleSignInError }} />
            )}
            {message && <FormMessage message={message} />}
          </div>
        </form>
      </div>
    </>
  );
}
