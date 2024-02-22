"use client";

import React from "react";
import { useUserContext } from "@/context/context";
import { logoutBtnTheme, logoutBtnThemeMobile } from "@/styles/muiTheme";
import styles from "./logoutButton.module.scss";
import { Button, ThemeProvider } from "@mui/material";
import { isMobile } from "@/utils/utils";

export default function LogoutButton() {
  const context = useUserContext();

  const handleLogout = () => {
    context.logout();
  };

  return context.user != null ? (
    <div className={!isMobile() ?  styles.btnLogout : styles.btnLogoutMobile}>
      <ThemeProvider theme={!isMobile() ? logoutBtnTheme : logoutBtnThemeMobile}>
        <Button onClick={handleLogout} variant="outlined" size="sm">
          Se déconnecter
        </Button>
      </ThemeProvider>
    </div>
  ) : (
    <></>
  );
}
