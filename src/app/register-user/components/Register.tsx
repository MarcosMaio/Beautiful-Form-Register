"use client";

import FormContainer from "../../../components/form-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import styles from "./styles/Register.module.css";
import sendDataToEndpoint from "../../api/api";
import Button from "@/components/button";
import { useEffect, useState } from "react";
import { useMessage } from "@/context/message-context";
import MessageStatus from "@/components/messages-statuns";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z.object({
  username: z
    .string()
    .min(3, { message: "must have at least 3 characters" })
    .max(20, { message: "must have at most 20 characters" })
    .refine((value) => value.trim() !== "", {
      message: "is required",
    }),
  email: z
    .string()
    .email({ message: "Invalid email address" })
    .refine((value) => value.trim() !== "", {
      message: "is required",
    }),
  password: z
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
  username: string;
  email: string;
  password: string;
}

export default function RegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const { message, setMessage, setMessageType, messageType } = useMessage();
  const [showResponseMessage, setShowResponseMessage] = useState(false);
  const [hasValueOnEmail, setHasValueOnEmail] = useState("");
  const [hasValueOnPassword, setHasValueOnPassword] = useState("");
  const [hasValueOnUsername, setHasValueOnUsername] = useState("");
  const [isAgreeTermsChecked, setIsAgreeTermsChecked] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    if (isAgreeTermsChecked === true) {
      const url = "/api/register-endpoint";
      const responseData = await sendDataToEndpoint(url, data);

      if (responseData) {
        if (responseData.status === 200) {
          GetMessageType("User registered successfully", "success");
        } else if (responseData.status === 401) {
          GetMessageType("Email or Username already registered", "error");
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
    } else {
      GetMessageType("You must agree to the terms & conditions", "error");
    }
  };

  const GetMessageType = (message: string, type: string) => {
    if (type === "error" && message.includes("Password must")) {
      setMessage("Password must meet specific criteria.");
    } else {
      setMessage(message);
    }
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

  const handleInputChangeUsername = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasValueOnUsername(e.target.value);
  };

  const handleInputChangeEmail = (e: React.ChangeEvent<HTMLInputElement>) => {
    setHasValueOnEmail(e.target.value);
  };

  const handleInputChangePassword = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setHasValueOnPassword(e.target.value);
  };

  return (
    <FormContainer path={"/"} title={"Registration"} height="500px">
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faUser} />
          </span>
          <input
            type="text"
            id="username"
            autoComplete="off"
            {...register("username", {
              required: "Required",
            })}
            onChange={handleInputChangeUsername}
          />
          <label
            style={{ top: hasValueOnUsername === "" ? "" : "-5px" }}
            htmlFor="username"
          >
            Username
            {errors.username && (
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "0.3em",
                  marginLeft: "0.1em",
                }}
              >
                {errors.username.message}
              </p>
            )}
          </label>
        </div>
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faEnvelope} />
          </span>
          <input
            type="email"
            id="email"
            autoComplete="off"
            {...register("email", {
              required: "Required",
            })}
            onChange={handleInputChangeEmail}
          />
          <label
            style={{ top: hasValueOnEmail === "" ? "" : "-5px" }}
            htmlFor="email"
          >
            Email
            {errors.email && (
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "0.3em",
                  marginLeft: "0.1em",
                }}
              >
                {errors.email.message}
              </p>
            )}
          </label>
        </div>
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faLock} />
          </span>
          <input
            type="password"
            id="password"
            autoComplete="off"
            {...register("password", {
              required: "Required",
            })}
            onChange={handleInputChangePassword}
          />
          <label
            style={{ top: hasValueOnPassword === "" ? "" : "-5px" }}
            htmlFor="password"
          >
            Password
            {errors.password && (
              <p
                style={{
                  fontSize: "10px",
                  marginTop: "0.3em",
                  marginLeft: "0.1em",
                }}
              >
                {errors.password.message}
              </p>
            )}
          </label>
        </div>
        <div className={styles["remember-forgot"]}>
          <label>
            <input
              type="checkbox"
              onClick={() => {
                setIsAgreeTermsChecked(!isAgreeTermsChecked);
              }}
            />
            agree to the terms & conditions
          </label>
        </div>
        {showResponseMessage ? (
          <MessageStatus type={messageType} message={message} />
        ) : (
          <Button>Register</Button>
        )}
        <div className={styles["login-register"]}>
          <p>
            Already have an account?
            <a href="/" className={styles["login-link"]}>
              Login
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}
