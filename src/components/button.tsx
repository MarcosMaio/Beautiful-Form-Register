import React from "react";
import styles from "../styles/button.module.css";

interface Props {
  children?: string;
}
export default function Button({ children }: Props) {
  return (
    <>
      <button type="submit" className={styles.btn}>
        {children}
      </button>
    </>
  );
}
