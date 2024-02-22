import React from "react";
import Link from "next/link";
import styles from "./navbar.module.scss";
import LogoutButton from "@/Components/logoutButton";
import { isMobile } from "@/utils/utils";

const Navbar = ({ toggle }) => {
  return (
    <>
      <div className={styles.base}>
        <div className={styles.container}>
          <div className={styles.navbar}>
            {/* <Logo /> */}
            <div className={styles.logo}>
              Mariage de <br />
              Yann & Lucie
            </div>
            <ul className={styles.linkList}>
              <li>
                <Link href="/">
                  <p>Accueil</p>
                </Link>
              </li>
              <li>
                <Link href="/confirmationReceipt">
                  <p>Confirmation Réception</p>
                </Link>
              </li>
              <li>
                <Link href="/meal">
                  <p>Repas</p>
                </Link>
              </li>
              <li>
                <Link href="/places">
                  <p>Lieux</p>
                </Link>
              </li>
              <li>
                <Link href="/weddingList">
                  <p>Liste de mariage</p>
                </Link>
              </li>
            </ul>
            {!isMobile() ? <LogoutButton /> : <></>}
            <button
              className={styles.sidebarButton}
              type="button"
              onClick={toggle}
              on
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="25"
                height="25"
                viewBox="0 0 24 24"
              >
                <path
                  fill="#fff"
                  d="M3 6h18v2H3V6m0 5h18v2H3v-2m0 5h18v2H3v-2Z"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
