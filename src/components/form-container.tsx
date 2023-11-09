import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import styles from "../styles/Form-Container.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

interface Props {
  children: ReactNode;
  height?: string;
  title: string;
  textAlign?: string;
  fontSize?: string
}
export default function FormContainer({
  children,
  height,
  title,
  textAlign,
  fontSize
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ height }}>
        <span className={styles["icon-close"]}>
          <FontAwesomeIcon width={30} height={30} icon={faXmark} />
        </span>
        <div className={styles["form-box"]}>
          <h2 style={{ textAlign , fontSize }} className={styles["input-title"]}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
