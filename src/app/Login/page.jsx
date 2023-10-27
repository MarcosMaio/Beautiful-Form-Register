import { faEnvelope, faLock } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./styles/Login.module.css";
import FormContainer from "../../components/Form-Container";

const Login = () => {
  return (
    <FormContainer>
      <div className={styles["form-box"]}>
        <h2 className={styles["input-title"]}>Login</h2>
        <form action="#">
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faEnvelope} />
            </span>
            <input type="email" name="email" required />
            <label htmlFor="email">Email</label>
          </div>
          <div className={styles["input-box"]}>
            <span className={styles.icon}>
              <FontAwesomeIcon icon={faLock} />
            </span>
            <input type="password" name="password" required />
            <label htmlFor="password">Password</label>
          </div>
          <div className={styles["remember-forgot"]}>
            <label>
              <input type="checkbox" />
              Remember me
            </label>
            <a href="#">Forgot Password?</a>
          </div>
          <button type="submit" className={styles.btn}>
            Login
          </button>
          <div className={styles["login-register"]}>
            <p>
              Don't have an account?
              <a href="/Register" className={styles["register-link"]}>
                Register
              </a>
            </p>
          </div>
        </form>
      </div>
    </FormContainer>
  );
};

export default Login;
