import React from "react";
import styles from "./footer.module.scss";
import { FaRegCopyright } from "react-icons/fa6";

export default function Footer() {
  return <div className={styles.footer}>
    <FaRegCopyright size={12} className={styles.icon}/>
    {`- Wedding Showcase by Coding-Cow`}
  </div>;
}
