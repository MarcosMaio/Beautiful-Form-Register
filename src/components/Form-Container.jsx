import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import styles from "../styles/Form-Container.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
export default function FormContainer({ children, height }) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ height }}>
        <span className={styles["icon-close"]}>
          <FontAwesomeIcon width={30} height={30} icon={faXmark} />
        </span>
        {children}
      </div>
    </div>
  );
}
