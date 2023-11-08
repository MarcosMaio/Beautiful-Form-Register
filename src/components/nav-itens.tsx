import React, { ReactNode } from "react";
import Link from "next/link";
import styles from "../styles/Nav-Itens.module.css";

interface Props {
  children: ReactNode;
  href: string;
}

const NavItens = ({ children, href }: Props) => {
  return (
    <li className={styles["nav-itens"]}>
      <Link className={styles.link} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavItens;
