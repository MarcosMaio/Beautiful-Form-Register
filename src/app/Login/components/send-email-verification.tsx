"use client";

import React, { useState } from "react";
import styles from "./styles/send-email-verification.module.css";
import FormContainer from "../../../components/form-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import sendDataToEndpoint from "@/app/api/api";

interface FormData {
  email: string;
}
export default function SendEmailVerification() {
  const { register, handleSubmit } = useForm<FormData>();
  const [hasValueOnEmail, setHasValueOnEmail] = useState("");

  const handleSubmitForm = async (data: FormData) => {
    const url = "/api/forgot-password";
    const responseData = await sendDataToEndpoint(url, data);

    if (responseData) {
      if (responseData.status === 200) {
        console.log("foi enviado");
      } else if (responseData.status === 401) {
        console.log("não foi enviado");
      } else if (responseData.status === 404) {
        console.log("algum problema");
      } else {
        console.log("algum problema ao enviar os dados");
      }
    }
  };

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValueOnEmail(e.target.value);
  };

  return (
    <FormContainer
      textAlign={"left"}
      height={"300px"}
      title={"Reset Password"}
      fontSize={"1.8rem"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles["container-info"]}>
          <p>
            Please enter your email address used to register your account below
            so we can send you the verification code.
          </p>
        </div>
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            required
            autoComplete="off"
            {...register("email", {
              required: "Required",
            })}
            onChange={handleInputChangeEmail}
          />
          <label
            htmlFor="email"
            style={{ top: hasValueOnEmail === "" ? "" : "-5px" }}
          >
            Email
          </label>
        </div>

        <Button>Send Email</Button>
      </form>
    </FormContainer>
  );
}
