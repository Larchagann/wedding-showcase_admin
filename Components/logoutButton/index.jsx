"use client";

import React from "react";
import { useUserContext } from "@/context/context";
import { logoutBtnTheme} from "@/styles/muiTheme";
import styles from "./logoutButton.module.scss";
import { Button, ThemeProvider } from "@mui/material";

export default function LogoutButton() {
  const context = useUserContext();

  const handleLogout = () => {
    context.logout();
  };

  return (
    <div className={styles.btnLogout}>
      <ThemeProvider theme={logoutBtnTheme}>
        <Button onClick={handleLogout} variant="outlined" size="sm">
          Se déconnecter
        </Button>
      </ThemeProvider>
    </div>
  );
}
