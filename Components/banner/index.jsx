"use client";

import { isMobile } from "@/utils/utils";
import styles from "./banner.module.scss";
import banner from "../../images/banner.png";
import mobileBanner from "../../images/mobileBanner.png";
import { useEffect, useState } from "react";

export default function Banner() {
  const [useMobile, setUseMobile] = useState(false)

  useEffect(() => {
    setUseMobile(isMobile())
  }, [])

  return useMobile ? (
    <img className={styles.banner} src={mobileBanner.src} alt="mobileBanner" />
  ) : (
    <img className={styles.banner} src={banner.src} alt="banner" />
  );
}
