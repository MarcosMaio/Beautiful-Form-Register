"use client";

import React, { useState } from "react";
import PageValidation from "./components/page-validation";
import SendEmailVerification from "./components/send-email-verification";

export default function ResetPasswordPage() {
  const [isForgotPassword, setIsForgotPassword] =
    useState<React.SetStateAction<boolean>>(false);
  const [isCodeReset, setIsCodeReset] = useState<boolean>(false);

  return (
    <>
      {!isForgotPassword ? (
        <PageValidation
          isCodeReset={isCodeReset}
          setIsForgotPassword={setIsForgotPassword}
        />
      ) : (
        <SendEmailVerification
          isCodeReset={isCodeReset}
          setIsCodeReset={setIsCodeReset}
        />
      )}
    </>
  );
}
