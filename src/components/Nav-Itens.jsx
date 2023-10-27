import Link from "next/link";
import styles from "../styles/Nav-Itens.module.css";
const NavItens = ({ children, href }) => {
  return (
    <li className={styles["nav-itens"]}>
      <Link className={styles.link} href={href}>
        {children}
      </Link>
    </li>
  );
};

export default NavItens;
