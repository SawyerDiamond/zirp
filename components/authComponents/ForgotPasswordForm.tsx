"use client";
import { forgotPasswordAction } from "@/app/actions";
import { FormMessage, Message } from "@/components/authComponents/form-message";
import { SubmitButton } from "@/components/SubmitButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";

export default function ForgotPasswordForm({
  searchParams,
}: {
  searchParams: Message;
}) {
  const [message, setMessage] = useState(searchParams);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const form = event.currentTarget.form;

    if (form) {
      const formData = new FormData(form);
      await forgotPasswordAction(formData);
    }
  };

  return (
    <form className="flex-1 flex flex-col gap- text-foreground w-96  mx-auto justify-center align-middle">
      <div>
        <h1 className="text-3xl font-medium">Reset Password</h1>
      </div>
      <div className="flex flex-col gap-2 [&>input]:mb-3 mt-3">
        <Label htmlFor="email">Email</Label>
        <Input name="email" placeholder="you@example.com" required />
        <SubmitButton onClick={handleSubmit}>Reset Password</SubmitButton>
        <FormMessage message={message} />
      </div>
    </form>
  );
}
