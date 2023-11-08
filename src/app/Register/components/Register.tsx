"use client";

import FormContainer from "../../../components/form-container";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope, faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { useForm } from "react-hook-form";
import styles from "./styles/Register.module.css";
import sendDataToEndpoint from "../../api/api";
import Button from "@/components/button";

interface FormData {
  username: string;
  email: string;
  password: string;
}
export default function RegisterForm() {
  const { register, handleSubmit } = useForm<FormData>();

  const handleSubmitForm = async (data: FormData) => {
    const url = "/api/register-endpoint";
    const responseData = await sendDataToEndpoint(url, data);

    if (responseData) {
      console.log("success");
    }
  };

  return (
    <FormContainer title={"Registration"} height="500px">
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
          />
          <label htmlFor="username">Username</label>
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
          />
          <label htmlFor="email">Email</label>
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
          />
          <label htmlFor="password">Password</label>
        </div>
        <div className={styles["remember-forgot"]}>
          <label>
            <input type="checkbox" />
            agree to the terms & conditions
          </label>
        </div>
        <Button>Register</Button>
        <div className={styles["login-register"]}>
          <p>
            Already have an account?
            <a href="/Login" className={styles["login-link"]}>
              Login
            </a>
          </p>
        </div>
      </form>
    </FormContainer>
  );
}
