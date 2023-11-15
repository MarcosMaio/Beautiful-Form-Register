"use client";

import React, { useEffect, useRef } from "react";
import styles from "./about-me.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import VanillaTilt from "vanilla-tilt";
import Image from "next/image";

export default function AboutMe() {
  const tilt = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = {};

    VanillaTilt.init(tilt.current!, options);
  }, []);
  return (
    <div className={styles["container-card"]}>
      <div ref={tilt} className={styles.card}>
        <Image
          className={styles["profile-picture"]}
          src="/assets/card/MarcosMaio.jpg"
          alt=""
          height={130}
          width={100}
        />
        <h2>Marcos Maio</h2>
        <span>Web Developer</span>
        <div className={styles.links}>
          <a
            href="https://github.com/MarcosMaio"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className={styles.i} icon={faGithub} />
          </a>
          <a
            href="https://www.instagram.com/marcos_maiio"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className={styles.i} icon={faInstagram} />
          </a>
          <a
            href="https://www.linkedin.com/in/marcos-maio-792aab23a/"
            target="_blank"
            rel="noreferrer"
          >
            <FontAwesomeIcon className={styles.i} icon={faLinkedin} />
          </a>
        </div>
        <a
          href="https://api.whatsapp.com/send?phone=5521965399177&text=Olá Marcos tudo bem ? podemos conversar ?"
          className={styles.btn}
          target="_blank"
          rel="noreferrer"
        >
          Contact Me
        </a>
      </div>
    </div>
  );
}
