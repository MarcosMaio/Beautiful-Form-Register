import React from "react";
import MessageProviderWrapper from "@/providers/message-provider";
import RegisterForm from "./components/Register";
export default function Register() {
  return (
    <MessageProviderWrapper>
      <RegisterForm />
    </MessageProviderWrapper>
  );
}
