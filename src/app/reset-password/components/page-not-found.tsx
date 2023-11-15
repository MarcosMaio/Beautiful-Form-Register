import React from "react";
import styles from "../styles/page-not-found.module.css";
export default function PageNotFound() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Error 404</h1>
      <p>
        Access denied, link has expired or invalid url, click on the logo icon
        to go back to home page
      </p>
    </div>
  );
}
