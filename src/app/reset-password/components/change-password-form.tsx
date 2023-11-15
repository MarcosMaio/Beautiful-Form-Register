"use client";

import React, { useEffect, useState } from "react";
import Button from "@/components/button";
import ContainerInfo from "@/components/container-info";
import FormContainer from "@/components/form-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useForm } from "react-hook-form";
import styles from "../styles/input-box.module.css";
import { faEye, faEyeSlash, faLock } from "@fortawesome/free-solid-svg-icons";
import sendDataToEndpoint from "@/app/api/api";
import MessageStatus from "@/components/messages-statuns";
import { useMessage } from "@/context/message-context";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  newPassword: z
    .string()
    .min(6, { message: "must have at least 6 characters" })
    .refine((value) => /[A-Z]/.test(value), {
      message: "must have at least one uppercase letter",
    })
    .refine((value) => /[a-z]/.test(value), {
      message: "must have at least one lowercase letter",
    })
    .refine((value) => /[!@#$%^&*()_+{}\[\]:;<>,.?~\\/-]/.test(value), {
      message: "must have at least one special character",
    })
    .refine((value) => /\d/.test(value), {
      message: "must have at least one number",
    }),
});

interface FormData {
  newPassword: string;
  currentCode: string;
}

interface Props {
  currentCode: string;
}
export default function ChangePasswordForm({ currentCode }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const [passwordValue, setPasswordValue] = useState("");
  const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
  const { message, setMessage, setMessageType, messageType } = useMessage();
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [newShowPassword, setNewShowPassword] = useState(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    if (passwordValue === confirmPasswordValue) {
      const url = "/api/reset-password";
      const requestData = {
        ...data,
        currentCode: currentCode,
      };

      const responseData = await sendDataToEndpoint(url, requestData);

      if (responseData) {
        if (responseData.status === 200) {
          GetMessageType("Password was changed successfully", "success");
        } else if (responseData.status === 409) {
          GetMessageType(
            "This password has already been registered previously, choose a new password",
            "error"
          );
        } else {
          GetMessageType("Request error, token has expired", "warning");
        }
      } else {
        GetMessageType("An error occurred in the request", "warning");
      }
    } else {
      GetMessageType("Password fields must be the same", "error");
    }
  };

  const GetMessageType = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
  };

  useEffect(() => {
    if (message && messageType && passwordValue !== "") {
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

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordValue(e.target.value);
  };

  const handleInputChangeConfirmPassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setConfirmPasswordValue(e.target.value);
  };

  return (
    <FormContainer
      path={"/"}
      textAlign={"left"}
      height={"380px"}
      title={"New Password"}
      fontSize={"1.8rem"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ContainerInfo
          text={`Please make sure to create a password that uses a combination of
        uppercase and lowercase letters, numbers, and special characters.`}
        />
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLock} style={{ margin: "0 0.5em" }} />
            {newShowPassword ? (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faEye}
                onClick={() => {
                  setNewShowPassword(false);
                }}
              />
            ) : (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faEyeSlash}
                onClick={() => {
                  setNewShowPassword(true);
                }}
              />
            )}
          </span>
          <input
            type={newShowPassword ? "text" : "password"}
            required
            autoComplete="off"
            {...register("newPassword", {
              required: "Required",
            })}
            onChange={handleInputChangePassword}
          />
          <label
            htmlFor="password"
            style={{ top: passwordValue === "" ? "" : "-5px" }}
          >
            Create new password
            {errors.newPassword && (
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "0.3em",
                  marginLeft: "0.1em",
                }}
              >
                {errors.newPassword.message}
              </p>
            )}
          </label>
        </div>

        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon style={{ margin: "0 0.5em" }} icon={faLock} />

            {confirmShowPassword ? (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faEye}
                onClick={() => {
                  setConfirmShowPassword(false);
                }}
              />
            ) : (
              <FontAwesomeIcon
                style={{ cursor: "pointer" }}
                icon={faEyeSlash}
                onClick={() => {
                  setConfirmShowPassword(true);
                }}
              />
            )}
          </span>
          <input
            type={confirmShowPassword ? "text" : "password"}
            required
            autoComplete="off"
            name="confirmPassword"
            onChange={handleInputChangeConfirmPassword}
          />
          <label
            htmlFor="ConfirmPassword"
            style={{ top: confirmPasswordValue === "" ? "" : "-5px" }}
          >
            Confirm your password
            {errors.newPassword && (
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "0.3em",
                  marginLeft: "0.1em",
                }}
              >
                {errors.newPassword.message}
              </p>
            )}
          </label>
        </div>

        {showResponseMessage ? (
          <MessageStatus type={messageType} message={message} />
        ) : (
          <Button>Reset Password</Button>
        )}
      </form>
    </FormContainer>
  );
}
