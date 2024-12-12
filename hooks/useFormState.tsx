"use client";
import { useState } from "react";
import { Message } from "@/components/form-message";

export const useFormState = (initialMessage: Message) => {
  const [message, setMessage] = useState<Message>(initialMessage);

  return [message, setMessage] as const;
};
