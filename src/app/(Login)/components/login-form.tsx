"use client";

import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles/Login.module.css";
import FormContainer from "../../../components/form-container";
import MessageStatus from "@/components/messages-statuns";
import { useForm } from "react-hook-form";
import sendDataToEndpoint from "../../api/api";
import { useMessage } from "@/context/message-context";
import { useEffect, useState } from "react";
import Button from "@/components/button";
import { useStoredUsername } from "@/context/stored-username-context";

interface FormData {
  email: string;
  password: string;
}

interface Props {
  setRememberUser: React.Dispatch<React.SetStateAction<boolean>>;
  rememberUser: boolean;
}
export default function LoginForm({ setRememberUser, rememberUser }: Props) {
  const { setStoredUsername } = useStoredUsername();
  const { register, handleSubmit } = useForm<FormData>();
  const { message, setMessage, setMessageType, messageType } = useMessage();
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [hasValueOnEmail, setHasValueOnEmail] = useState("");
  const [hasValueOnPassword, setHasValueOnPassword] = useState("");

  const handleSubmitForm = async (data: FormData) => {
    const url = "/api/login-endpoint";
    const responseData = await sendDataToEndpoint(url, data);

    if (responseData) {
      if (responseData.status === 200) {
        GetMessageType("Success Login ...", "success");
        setTimeout(() => {
          setStoredUsername(responseData.data.data.username);
        }, 2000);
      } else if (responseData.status === 401) {
        GetMessageType("Password invalid. Please, try again.", "error");
      } else if (responseData.status === 404) {
        GetMessageType("User not found. Please try again.", "warning");
      } else {
        GetMessageType(
          "System error has occur please try again later",
          "warning"
        );
      }
    } else {
      GetMessageType(
        "System error has occur please try again later",
        "warning"
      );
    }
  };

  const GetMessageType = (message: string, type: string) => {
    setMessage(message);
    setMessageType(type);
  };

  useEffect(() => {
    if (message && messageType) {
      setShowResponseMessage(true);
      setTimeout(() => {
        setShowResponseMessage(false);
        setMessage("");
        setMessageType("");
      }, 4000);
    }
  }, [message, messageType, setMessage, setMessageType]);

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValueOnEmail(e.target.value);
  };

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasValueOnPassword(e.target.value);
  };

  return (
    <FormContainer path={"/"} title={"Login"}>
      <form onSubmit={handleSubmit(handleSubmitForm)}>
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
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            required
            autoComplete="off"
            {...register("password", {
              required: "Required",
            })}
            onChange={handleInputChangePassword}
          />
          <label
            htmlFor="password"
            style={{ top: hasValueOnPassword === "" ? "" : "-5px" }}
          >
            Password
          </label>
        </div>
        <div className={styles["remember-forgot"]}>
          <label>
            <input
              type="checkbox"
              onClick={() => setRememberUser(!rememberUser)}
            />
            Remember me
          </label>
          <a href="/reset-password">Forgot Password?</a>
        </div>

        {showResponseMessage ? (
          <MessageStatus type={messageType} message={message} />
        ) : (
          <Button>Login</Button>
        )}
        <div className={styles["login-register"]}>
          <p>
            Don&apos;t have an account?
            <a href="/register-user" className={styles["register-link"]}>
              Register
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}
