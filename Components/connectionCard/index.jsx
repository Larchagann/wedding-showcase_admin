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
import { checkValideAddressMail } from "@/utils/utils";
import { cardHeaderTitleTypographyProps, primaryTheme } from "@/styles/muiTheme";

export default function ConnectionCard(props) {
  const context = useUserContext();
  const [addressMail, setAddressMail] = useState({
    value: "",
    error: false,
  });

  const headerText = "Connexion";

  const handleChange = (event) => {
    setAddressMail({ ...addressMail, value: event.target.value });
  };

  const handleClickValidate = () => {
    if (checkValideAddressMail(addressMail.value)) {
      context.connect(addressMail.value);
    } else {
      setAddressMail({ ...addressMail, error: true });
    }
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title={props.headerText ? props.headerText : headerText}
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.itemCenterContent}>
          Veuillez vous connecter avec l'adresse mail sur laquel vous avez reçu
          l'invitation
        </div>
        <ThemeProvider theme={primaryTheme}>
          <div className={styles.itemCenterContent}>
            <TextField
              fullWidth
              type="email"
              onChange={handleChange}
              variant="outlined"
              label="Adresse mail"
              error={addressMail.error}
              helperText={addressMail.error ? "Adresse mail invalide." : ""}
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
  );
}
