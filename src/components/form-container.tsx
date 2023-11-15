import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { ReactNode } from "react";
import styles from "../styles/Form-Container.module.css";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

type TextAlign =
  | "start"
  | "end"
  | "left"
  | "right"
  | "center"
  | "justify"
  | "match-parent";

interface Props {
  children: ReactNode;
  height?: string;
  title: string;
  textAlign?: TextAlign | undefined;
  fontSize?: string;
  path: string;
}
export default function FormContainer({
  children,
  height,
  title,
  textAlign,
  fontSize,
  path,
}: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper} style={{ height }}>
        <a className={styles["icon-close"]} href={path}>
          <FontAwesomeIcon width={30} height={30} icon={faXmark} />
        </a>
        <div className={styles["form-box"]}>
          <h2 style={{ textAlign, fontSize }} className={styles["input-title"]}>
            {title}
          </h2>
          {children}
        </div>
      </div>
    </div>
  );
}
