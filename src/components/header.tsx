"use client";

import React, { useEffect, useState } from "react";
import styles from "../styles/Header.module.css";
import { useStoredUsername } from "@/context/stored-username-context";
import Image from "next/image";

export default function Header() {
  const [loggedUser, setLoggedUser] = useState(false);
  const { storedUsername } = useStoredUsername();
  useEffect(() => {
    if (storedUsername !== null && storedUsername !== "") {
      setLoggedUser(true);
    }
  }, [storedUsername]);

  const handlerLogoutUser = () => {
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div className={styles["header-container"]}>
      <div>
        <a href="/">
          <Image src={"/assets/logo.svg"} width={80} height={80} alt="Logo" />
        </a>
      </div>
      <div>
        <ul className={styles["nav-container"]}>
          {loggedUser && (
            <span
              style={{ cursor: "pointer", color: "#202020", fontWeight: "600" }}
              onClick={() => handlerLogoutUser()}
            >
              Logout
            </span>
          )}
        </ul>
      </div>
    </div>
  );
}
