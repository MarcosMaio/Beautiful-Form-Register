"use client";

import React, { useRef, useEffect } from "react";
import styles from "./styles/logged-user.module.css";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import VanillaTilt from "vanilla-tilt";
import { useStoredUsername } from "@/context/stored-username-context";

export default function LoggedUser() {
  const { storedUsername } = useStoredUsername();
  const currentDate = new Date();

  const dateTimeFormatOptions = {
    timeZone: "America/Sao_Paulo",
    hour: "numeric" as "numeric" | "2-digit" | undefined,
    minute: "numeric" as "numeric" | "2-digit" | undefined,
    month: "long" as "long",
    day: "numeric" as "numeric" | undefined,
    year: "numeric" as "numeric" | "2-digit" | undefined,
  };

  const brasiliaTime = new Intl.DateTimeFormat(
    "en-US",
    dateTimeFormatOptions
  ).format(currentDate);

  const tilt = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {};

    VanillaTilt.init(tilt.current!, options);
  }, []);
  return (
    <div ref={tilt} className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles["card-profile"]}>
          <div className={styles["card-profile__photo"]}>
            <Image
              className={styles["profile-photo__img"]}
              src="/assets/card/marcos_maio.jpg"
              alt="Profile Photo"
              width={60}
              height={60}
            />
          </div>
          <div className={styles["card-profile__info"]}>
            <span className={styles["profile-info__name"]}>Marcos Maio</span>
            <span className={styles["profile-info__username"]}>
              @maio_marcos
            </span>
          </div>
        </div>
        <div className={styles["card-message"]}>
          <p>
            Dear{" "}
            <span className={styles.username} suppressHydrationWarning={true}>
              {storedUsername} 🤟🏻
            </span>
            ,<br />
            <br />
            I extend my heartfelt gratitude to you ❤️ for taking the time to
            visit and test my application! Your presence and valuable feedback
            mean a lot for me. Your enthusiasm and support are like a beacon,
            guiding me to improve and innovate.
            <br />
            <br />
            Thank you once again for testing my application. I hope you enjoyed
            it. If you would like to learn more about other projects I've worked
            on, please click the 'arrow' button to explore more about me 👍🏻.
            <br />
            <br />
            Sincerely, Marcos Maio
          </p>
        </div>
        <div className={styles["card-message-stamp"]}>
          <div>
            <span className={styles.time}>{brasiliaTime}</span>
          </div>
          <a href="/about-me">
            <FontAwesomeIcon className={styles.i} icon={faArrowRight} />
          </a>
        </div>
      </div>
    </div>
  );
}
