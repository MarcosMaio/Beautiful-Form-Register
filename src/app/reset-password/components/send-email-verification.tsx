"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/input-box.module.css";
import FormContainer from "../../../components/form-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "@/components/button";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import sendDataToEndpoint from "@/app/api/api";
import ContainerInfo from "@/components/container-info";
import { useMessage } from "@/context/message-context";
import MessageStatus from "@/components/messages-statuns";

interface FormData {
  email: string;
}

interface Props {
  isCodeReset: boolean;
  setIsCodeReset: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function SendEmailVerification({
  isCodeReset,
  setIsCodeReset,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const [hasValueOnEmail, setHasValueOnEmail] = useState("");
  const { message, setMessage, setMessageType, messageType } = useMessage();
  const [showResponseMessage, setShowResponseMessage] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    const url = "/api/send-reset-password-email";
    const responseData = await sendDataToEndpoint(url, data);

    if (responseData) {
      if (responseData.status === 200) {
        GetMessageType("Email was sent successfully", "success");

        setTimeout(
          async () => {
            const resetData = data;
            const resetUrl = "/api/time-limit-reset-password";
            const resetResponse = await sendDataToEndpoint(resetUrl, resetData);
            console.log(isCodeReset);
            if (resetResponse) {
              if (resetResponse.status === 200) {
                console.log("Token reset");
                setIsCodeReset(true);
              } else if (resetResponse.status === 401) {
                console.log("Token não excluído");
              } else {
                console.log(
                  "Algum problema ao enviar os dados para resetar o token"
                );
              }
            }
          },
          10 * 60 * 9000
        );
      } else if (responseData.status === 401) {
        GetMessageType("There is no user with this email", "error");
      } else {
        GetMessageType(
          "Problem has occurred while trying to send the email, please try again later",
          "warning"
        );
      }
    }
  };

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValueOnEmail(e.target.value);
  };

  const GetMessageType = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
  };

  useEffect(() => {
    if (message && messageType) {
      setShowResponseMessage(true);
      if (messageType === "success") {
        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      }
      setTimeout(() => {
        setShowResponseMessage(false);
        setMessage("");
        setMessageType("");
      }, 4000);
    }
  }, [message, messageType]);

  return (
    <FormContainer
      path={"/"}
      textAlign={"left"}
      height={"300px"}
      title={"Reset Password"}
      fontSize={"1.8rem"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ContainerInfo
          text={`Please enter your email address used to register your account below
            so we can send you the verification code.`}
        />
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

        {showResponseMessage ? (
          <MessageStatus type={messageType} message={message} />
        ) : (
          <Button>Send Emai</Button>
        )}
      </form>
    </FormContainer>
  );
}
