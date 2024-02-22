import Link from "next/link";
import styles from "./sidebar.module.scss";
import LogoutButton from "@/Components/logoutButton";

const Sidebar = ({ isOpen, toggle }) => {
  return (
    <>
      <div
        className={styles.sidebar}
        style={{
          opacity: `${isOpen ? "1" : "0"}`,
          top: ` ${isOpen ? "0" : "-100%"}`,
        }}
      >
        <ul className={styles.linkList}>
          <li className={styles.link}>
            <Link href="/" onClick={toggle}>
              <p>Accueil</p>
            </Link>
          </li>
          <li className={styles.link}>
            <Link href="/confirmationReceipt" onClick={toggle}>
              <p>Confirmation Réception</p>
            </Link>
          </li>
          <li className={styles.link}>
            <Link href="/meal" onClick={toggle}>
              <p>Repas</p>
            </Link>
          </li>
          <li className={styles.link}>
            <Link href="/places" onClick={toggle}>
              <p>Lieux</p>
            </Link>
          </li>
          <li className={styles.link}>
            <Link className={styles.link} href="/weddingList" onClick={toggle}>
              <p>Liste de mariage</p>
            </Link>
          </li>
          <li className={styles.btnLogout}>
            <LogoutButton />
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
