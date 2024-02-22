"use client";
import styles from "./choiceButton.module.scss";
import { FaCheck, FaX } from "react-icons/fa6";

export default function ChoiceButton({ isTrue, handleChangeChoice }) {
  return (
    <div className={styles.choiceButton}>
      <div className={styles.button}>
        <div
          className={isTrue ? styles.btnLeft : styles.btnLeftCheck}
          onClick={() => {
            if (isTrue) handleChangeChoice(false);
          }}
        >
          <FaX className={styles.btnIcon} />
        </div>
        <div
          className={isTrue ? styles.btnRightCheck : styles.btnRight}
          onClick={() => {
            if (!isTrue) handleChangeChoice(true);
          }}
        >
          <FaCheck className={styles.btnIcon} />
        </div>
      </div>
    </div>
  );
}
