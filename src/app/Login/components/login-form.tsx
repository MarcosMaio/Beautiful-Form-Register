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

interface FormData {
  email: string;
  password: string;
}

interface LoginFormProps {
  SetIsForgotPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function LoginForm({ SetIsForgotPassword }: LoginFormProps) {
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
        GetMessageType("Success login", "success");
      } else if (responseData.status === 401) {
        GetMessageType("Email ou senha inválidos", "error");
      } else if (responseData.status === 404) {
        GetMessageType("Usuário não encontrado", "warning");
      } else {
        GetMessageType("Ocorreu um erro", "warning");
      }
    } else {
      GetMessageType("Ocorreu um erro na solicitação", "warning");
    }
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
          window.location.href = "/Card";
        }, 2000);
      }
      setTimeout(() => {
        setShowResponseMessage(false);
        setMessage("");
        setMessageType("");
      }, 4000);
    }
  }, [message, messageType]);

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValueOnEmail(e.target.value);
  };

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasValueOnPassword(e.target.value);
  };

  const IsVerificationEmail = () => {
    SetIsForgotPassword(true);
  };

  return (
    <FormContainer title={"Login"}>
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
            <input type="checkbox" />
            Remember me
          </label>
          <a href="#" onClick={() => IsVerificationEmail()}>
            Forgot Password?
          </a>
        </div>

        {showResponseMessage ? (
          <MessageStatus type={messageType} />
        ) : (
          <Button>Login</Button>
        )}
        <div className={styles["login-register"]}>
          <p>
            Don't have an account?
            <a href="/Register" className={styles["register-link"]}>
              Register
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}
