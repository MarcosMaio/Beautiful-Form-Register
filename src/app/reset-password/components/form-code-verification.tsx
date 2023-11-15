import Button from "@/components/button";
import FormContainer from "@/components/form-container";
import { faKey } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../styles/input-box.module.css";
import sendDataToEndpoint from "@/app/api/api";
import ContainerInfo from "@/components/container-info";
import { useMessage } from "@/context/message-context";
import MessageStatus from "@/components/messages-statuns";

interface FormData {
  token: string;
}

interface Props {
  setAccessAllowed: React.Dispatch<React.SetStateAction<boolean>>;
  currentCode: string;
  setCurrentCode: React.Dispatch<React.SetStateAction<string>>;
}
export default function FormCodeVerification({
  setAccessAllowed,
  currentCode,
  setCurrentCode,
}: Props) {
  const { register, handleSubmit } = useForm<FormData>();
  const { message, setMessage, setMessageType, messageType } = useMessage();
  const [showResponseMessage, setShowResponseMessage] = useState(false);

  const handleSubmitForm = async (data: FormData) => {
    const url = "/api/checking-code";
    const responseData = await sendDataToEndpoint(url, data);

    if (responseData) {
      if (responseData.status === 200) {
        GetMessageType("Correct code access released", "success");
      } else {
        GetMessageType("invalid code or code has expired", "error");
      }
    }
  };

  const handleTokenStore = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentCode(e.target.value);
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
          setAccessAllowed(true);
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
      textAlign={"left"}
      height={"300px"}
      title={"Verification Code"}
      fontSize={"1.8rem"}
      path={"/"}
    >
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        <ContainerInfo text={`Please enter your verification code:`} />
        <div className={styles["input-box"]}>
          <span className={styles.icon}>
            <FontAwesomeIcon icon={faKey} />
          </span>
          <input
            type="text"
            required
            autoComplete="off"
            {...register("token", {
              required: "Required",
            })}
            onChange={handleTokenStore}
          />
          <label
            htmlFor="Code"
            style={{ top: currentCode === "" ? "" : "-5px" }}
          >
            Code
          </label>
        </div>
        {showResponseMessage ? (
          <MessageStatus type={messageType} message={message} />
        ) : (
          <Button>Verify</Button>
        )}
      </form>
    </FormContainer>
  );
}
