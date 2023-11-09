"use client";

import React, { useState } from "react";
import LoginForm from "./components/login-form";
import MessageProviderWrapper from "@/providers/message-provider";
import SendEmailVerification from "./components/send-email-verification";

export default function Login() {
  const [isForgotPassword, SetIsForgotPassword] =
    useState<React.SetStateAction<boolean>>(false);

  return (
    <MessageProviderWrapper>
      <>
        {isForgotPassword ? (
          <SendEmailVerification />
        ) : (
          <LoginForm SetIsForgotPassword={SetIsForgotPassword} />
        )}
      </>
    </MessageProviderWrapper>
  );
}
