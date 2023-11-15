import React from "react";
import styles from "../styles/container-info.module.css";

interface Props {
  text: string;
}
export default function ContainerInfo({ text }: Props) {
  return (
    <div className={styles["container-info"]}>
      <p>{text}</p>
    </div>
  );
}
