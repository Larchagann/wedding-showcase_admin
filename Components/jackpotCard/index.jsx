"use client";

import React from "react";
import styles from "@/styles/card.module.scss";
import {
  Card,
  CardContent,
  CardHeader,
  Button,
  ThemeProvider,
} from "@mui/material";
import {
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";

export default function JackpotCard() {

    const handleClick = () =>          {
        const jackpotLink =
          "https://www.leetchi.com/c/mariage-de-lucie-et-yann-david-7501719?utm_source=native&utm_medium=social_sharing";

        if (window !== undefined) {
            window.open(jackpotLink, '_blank')
        }
    }

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title={`Lien de la cagnotte`}
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <div className={styles.itemCenterContent}>
        <ThemeProvider theme={primaryTheme}>
            <Button variant="contained" onClick={handleClick}>
              {`cliquez ici : Cagnotte Leetchi - Mariage de Yann et lucie`}
            </Button>
        </ThemeProvider>
        </div>
      </CardContent>
    </Card>
  );
}
