import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../styles/Form-Container.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function FormContainer({ children, height, title }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ height }}>
        <span className={styles["icon-close"]}>
          <FontAwesomeIcon width={30} height={30} icon={faXmark} />
        </span>
        <div className={styles["form-box"]}>
          <h2 className={styles["input-title"]}>{title}</h2>
          {children}
        </div>
      </div>
    </div>
  );
}
