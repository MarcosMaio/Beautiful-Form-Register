"use client";

import { useEffect, useState } from "react";
import sendDataToEndpoint from "../../api/api";
import FormCodeVerification from "./form-code-verification";
import ChangePasswordForm from "./change-password-form";
import Loading from "@/components/loading";
import PageNotFound from "./page-not-found";

interface PageValidationProps {
  setIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
  isCodeReset: boolean;
}

function PageValidation({
  setIsForgotPassword,
  isCodeReset,
}: PageValidationProps) {
  const [access, setAccess] = useState("");
  const [loadingEffect, setLoadingEffect] = useState(false);
  const [accessAllowed, setAccessAllowed] = useState(false);
  const [currentCode, setCurrentCode] = useState("");

  useEffect(() => {
    async function sendVerifyCode() {
      const urlSearchParams = new URLSearchParams(window.location.search);
      const token = urlSearchParams.get("CYDE");
      console.log(token);
      if (token) {
        setLoadingEffect(true);

        const data = token;
        console.log("Token na URL:", data);
        const url = "/api/checking-url";
        const responseData = await sendDataToEndpoint(url, data);
        if (responseData) {
          setLoadingEffect(false);
          if (responseData.status === 200) {
            setAccess("Allowed");
          } else {
            setAccess("Denied");
          }
        } else {
          console.log("houve um problema a enviar os dados");
          setAccess("Denied");
        }
      } else {
        setIsForgotPassword(true);
        setLoadingEffect(false);
        setAccess("Invalid");
      }
    }

    sendVerifyCode();
  }, []);

  useEffect(() => {
    console.log("isCodeReset mudou:", isCodeReset);
  }, [isCodeReset]);

  return (
    <>
      {loadingEffect && <Loading />}

      {access === "Allowed" && accessAllowed === false && (
        <FormCodeVerification
          currentCode={currentCode}
          setCurrentCode={setCurrentCode}
          setAccessAllowed={setAccessAllowed}
        />
      )}

      {accessAllowed === true && (
        <ChangePasswordForm currentCode={currentCode} />
      )}

      {access === "Denied" && <PageNotFound />}

      {access === "Invalid" && <PageNotFound />}
    </>
  );
}

export default PageValidation;
