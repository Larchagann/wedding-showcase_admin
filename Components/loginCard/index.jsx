"use client";

import {
  Button,
  Card,
  CardContent,
  CardHeader,
  TextField,
  ThemeProvider,
} from "@mui/material";
import styles from "../../styles/card.module.scss";
import { useState } from "react";
import { useUserContext } from "@/context/context";
import {
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import Footer from "../layout/footer";

export default function LoginCard(props) {
  const context = useUserContext();
  const [loginInfo, setLoginInfo] = useState({
    login: "",
    password: "",
  });

  const headerText = "Wedding Showcase - Gestion";

  const handleChangeLogin = (event) => {
    setLoginInfo({ ...loginInfo, login: event.target.value });
  };

  const handleChangePassword = (event) => {
    setLoginInfo({ ...loginInfo, password: event.target.value });
  };

  const handleClickValidate = () => {
    context.connect(loginInfo);
  };

  return (
    <main>
      <div className="login-page">
        <div className="page-container login-page-content">
            <Card className={styles.card}>
              <CardHeader
                className={styles.cardHeader}
                title={headerText}
                titleTypographyProps={cardHeaderTitleTypographyProps}
              />
              <CardContent className={styles.cardContent}>
                <div className={styles.itemCenterContent}>
                  Veuillez vous connecter avec vos identifiant et mot de passe
                </div>
                <ThemeProvider theme={primaryTheme}>
                  <div className={styles.itemCenterContent}>
                    <TextField
                      fullWidth
                      type="text"
                      onChange={handleChangeLogin}
                      variant="outlined"
                      label="Identifiant"
                      size="small"
                    />
                  </div>
                  <div className={styles.itemCenterContent}>
                    <TextField
                      fullWidth
                      type="text"
                      onChange={handleChangePassword}
                      variant="outlined"
                      label="Mot de passe"
                      size="small"
                    />
                  </div>
                  <div className={styles.itemCenterContent}>
                    <Button onClick={handleClickValidate} variant="outlined">
                      Se connecter
                    </Button>
                  </div>
                </ThemeProvider>
              </CardContent>
            </Card>
          </div>
        <Footer />
      </div>
    </main>
  );
}
