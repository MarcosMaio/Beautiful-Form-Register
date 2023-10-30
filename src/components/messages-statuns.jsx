import React from "react";
import styles from "../styles/message-status.module.css";

const MessageStatus = ({ type }) => {
  return (
    <div
      className={
        type === "success"
          ? styles.success
          : type === "error"
          ? styles.error
          : styles.warning
      }
    >
      <div
        className={
          type === "success"
            ? styles.success__icon
            : type === "error"
            ? styles.error__icon
            : styles.warning__icon
        }
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          viewBox="0 0 24 24"
          height="24"
          fill="none"
        >
          {type === "success" && (
            <path
              fillRule="evenodd"
              fill="#393a37"
              d="m12 1c-6.075 0-11 4.925-11 11s4.925 11 11 11 11-4.925 11-11-4.925-11-11-11zm4.768 9.14c.0878-.1004.1546-.21726.1966-.34383.0419-.12657.0581-.26026.0477-.39319-.0105-.13293-.0475-.26242-.1087-.38085-.0613-.11844-.1456-.22342-.2481-.30879-.1024-.08536-.2209-.14938-.3484-.18828s-.2616-.0519-.3942-.03823c-.1327.01366-.2612.05372-.3782.1178-.1169.06409-.2198.15091-.3027.25537l-4.3 5.159-2.225-2.226c-.1886-.1822-.4412-.283-.7034-.2807s-.51301.1075-.69842.2929-.29058.4362-.29285.6984c-.00228.2622.09851.5148.28067.7034l3 3c.0983.0982.2159.1748.3454.2251.1295.0502.2681.0729.4069.0665.1387-.0063.2747-.0414.3991-.1032.1244-.0617.2347-.1487.3236-.2554z"
              clipRule="evenodd"
            ></path>
          )}
          {type === "error" && (
            <path
              fill="#393a37"
              d="m13 13h-2v-6h2zm0 4h-2v-2h2zm-1-15c-1.3132 0-2.61358.25866-3.82683.7612-1.21326.50255-2.31565 1.23915-3.24424 2.16773-1.87536 1.87537-2.92893 4.41891-2.92893 7.07107 0 2.6522 1.05357 5.1957 2.92893 7.0711.92859.9286 2.03098 1.6651 3.24424 2.1677 1.21325.5025 2.51363.7612 3.82683.7612 2.6522 0 5.1957-1.0536 7.0711-2.9289 1.8753-1.8754 2.9289-4.4189 2.9289-7.0711 0-1.3132-.2587-2.61358-.7612-3.82683-.5026-1.21326-1.2391-2.31565-2.1677-3.24424-.9286-.92858-2.031-1.66518-3.2443-2.16773-1.2132-.50254-2.5136-.7612-3.8268-.7612z"
            ></path>
          )}

          {type === "warning" && (
            <path
              d="m13 14h-2v-5h2zm0 4h-2v-2h2zm-12 3h22l-11-19z"
              fill="#393a37"
            ></path>
          )}
        </svg>
      </div>
      <div
        className={
          type === "success"
            ? styles.success__title
            : type === "error"
            ? styles.error__title
            : styles.error__warning
        }
      >
        {type === "success" && "Success Login ..."}

        {type === "error" && "Password invalid. Please, try again."}

        {type === "warning" && "User not found. Please try again."}
      </div>
    </div>
  );
};

export default MessageStatus;
