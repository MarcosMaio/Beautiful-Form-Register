"use client";

import React, { useEffect, useRef } from "react";
import styles from "./Card.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLinkedin } from "@fortawesome/free-brands-svg-icons/faLinkedin";
import VanillaTilt from "vanilla-tilt";

export default function Card(props) {
  const { options, ...rest } = props;
  const tilt = useRef(null);

  useEffect(() => {
    VanillaTilt.init(tilt.current, options);
  }, [options]);

  return (
    <div className={styles["container-card"]}>
      <div ref={tilt} className={styles.card}>
        <img src="/assets/card/MarcosMaio.jpg" alt="" />
        <h2>Marcos Maio</h2>
        <span>Web Developer</span>
        <div className={styles.links}>
          <FontAwesomeIcon className={styles.i} icon={faGithub} />
          <FontAwesomeIcon className={styles.i} icon={faInstagram} />
          <FontAwesomeIcon className={styles.i} icon={faLinkedin} />
        </div>
        <a className={styles.btn}>Contact Me</a>
      </div>
    </div>
  );
}
