import React from "react";
import LoginForm from "./components/login-form";
import MessageProviderWrapper from "@/providers/message-provider";

export default function Login() {
  return (
    <MessageProviderWrapper>
      <LoginForm />
    </MessageProviderWrapper>
  );
}
