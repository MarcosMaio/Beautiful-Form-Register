import Link from "next/link";
import React from "react";
import NavItens from "./nav-itens";
import styles from "../styles/Header.module.css";

export default function Header() {
  return (
    <div className={styles["header-container"]}>
      <div>
        <h1>Logo</h1>
      </div>

      <div>
        <ul className={styles["nav-container"]}>
          <NavItens href="/">Home</NavItens>
          <NavItens href="/Card">About Me</NavItens>
          <NavItens href="/Login">Login</NavItens>
        </ul>
      </div>
    </div>
  );
}
