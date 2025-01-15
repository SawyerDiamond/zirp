"use client";
import { useState } from "react";

import { signInAction, signUpAction } from "@/app/actions";
import { useGoogleSignIn } from "@/hooks/useGoogleSignIn";

import { FormMessage, Message } from "@/components/authComponents/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

import { motion } from "framer-motion";

import { ZirpLogoB } from "@/assets/ZirpLogo";
import { BGLogo } from "@/assets/BGLogo";

import Image from "next/image";

const Auth = () => {
  const { handleGoogleSignIn, error: googleSignInError } = useGoogleSignIn();
  const [message, setMessage] = useState<Message | null>(null);
  const [isSignUp, setIsSignUp] = useState<boolean>(false);

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
    <section className="flex flex-row items-start justify-center h-screen w-screen">
      <Card className="w-[45vw] h-[calc(100vh-2rem)] bg-secondary border border-secondary-border backdrop-blur rounded-2xl overflow-hidden">
        <CardContent className="w-full h-full pt-6 flex flex-col justify-between">
          <motion.CardHeader
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 60,
              delay: 0.4,
            }}
            className="flex flex-row items-center content-center gap-2">
            <ZirpLogoB className="w-10 h-10" />
            <h2 className="text-4xl leading-none">ZIRP</h2>
          </motion.CardHeader>

          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 90,
              delay: 0.4,
            }}>
            <CardFooter className="flex flex-col gap-2 w-[90%] text-4xl font-semibold">
              The future of the internship hunt is here, with Zirp
            </CardFooter>
          </motion.div>
        </CardContent>

        <BGLogo
          fillColor="#030a17"
          className="absolute -z-10 -top-40 -left-56 opacity-50"
        />
      </Card>
      <div className="flex flex-col w-[30rem] h-full justify-center gap-4 mx-auto">
        <Tabs defaultValue="signUp">
          <TabsList>
            <TabsTrigger
              onClick={() => setIsSignUp(!isSignUp)}
              value="signUp"
              className="gap-1">
              <Image
                src="/icons/SignUp.svg"
                width="16"
                height="16"
                alt="Sign Up Icon"
              />
              Sign Up
            </TabsTrigger>
            <TabsTrigger
              onClick={() => setIsSignUp(!isSignUp)}
              value="signIn"
              className="gap-1">
              <Image
                src="/icons/SignIn.svg"
                width="16"
                height="16"
                alt="Sign In Icon"
              />
              Sign In
            </TabsTrigger>
          </TabsList>
        </Tabs>
        <header className="flex flex-col justify-center gap-1">
          <h1 className="text-4xl font-normal">
            {isSignUp ? "Welcome to Zirp" : "Welcome Back"}
          </h1>
          <h3 className="text-md text-slate-400 font-normal">
            {isSignUp
              ? "Sign up for free, and get started on your internship hunt."
              : "Sign in, and pick up where you left off."}
          </h3>
        </header>
        <form className="flex flex-col gap-4">
          <div className="flex flex-col gap-4">
            {isSignUp && (
              <div className="flex flex-col gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  name="username"
                  placeholder="Username"
                  className="h-11"
                  required
                />
              </div>
            )}
            <div className="flex flex-col gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                placeholder="Email Address"
                required
                className="h-11"
              />
            </div>

            <Label htmlFor="password">Password</Label>

            <div className="flex flex-row w-full gap-2">
              <Input
                type="password"
                name="password"
                placeholder="Password"
                className="h-11"
                required
              />
              {isSignUp && (
                <Input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Your Password"
                  className="h-11"
                  required
                />
              )}
            </div>

            <div>
              <SubmitButton
                onClick={handleSubmit}
                className="w-full mb-2 transition-transform transform hover:scale-103 hover:gradient-shadow"
                pendingText={isSignUp ? "Signing up..." : "Signing in..."}>
                {isSignUp ? "Sign Up" : "Sign In"}
              </SubmitButton>
            </div>
            <Button
              onClick={handleGoogleSignIn}
              className="h-11"
              variant="default">
              {isSignUp ? "Sign Up with Google" : "Sign In with Google"}
            </Button>

            {googleSignInError && (
              <FormMessage message={{ message: googleSignInError }} />
            )}
            {message && <FormMessage message={message} />}
          </div>
        </form>
      </div>
    </section>
  );
};
export default Auth;
