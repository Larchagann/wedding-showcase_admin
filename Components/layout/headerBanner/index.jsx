import React from "react";
import LogoutButton from "@/Components/logoutButton";
import styles from "./headerBanner.module.scss"

export default function HeaderBanner() {
  return (
    <div className={styles.base}>
      <div className={styles.container}>
        <div className={styles.banner}>
          <div className={styles.logo}>
            Mariage de <br />
            Yann & Lucie
          </div>
          <div className={styles.title}>Gestion - Administrateur</div>
          <LogoutButton />
        </div>
      </div>
    </div>
  );
}
