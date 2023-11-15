"use client";

import { useEffect, useState } from "react";

import LoginForm from "./components/login-form";
import LoggedUser from "./components/logged-user";
import { useStoredUsername } from "@/context/stored-username-context";

export default function Login() {
  const { storedUsername, setStoredUsername } = useStoredUsername();
  const [rememberUser, setRememberUser] = useState(false);

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");

    if (storedUsername !== null && storedUsername !== "") {
      setStoredUsername(storedUsername);
    }
  }, []);

  useEffect(() => {
    if (rememberUser === true) {
      localStorage.setItem("username", storedUsername);
    }
  }, [storedUsername]);

  return <>{storedUsername !== "" ? <LoggedUser /> : <LoginForm rememberUser={rememberUser} setRememberUser={setRememberUser} />}</>;
}
