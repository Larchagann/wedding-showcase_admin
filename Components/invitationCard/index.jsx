"use client";

import { Card, CardContent, CardHeader } from "@mui/material";
import React from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";

export default function InvitationCard({invitations}) {
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Liste des invitations"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>

      </CardContent>
    </Card>
  );
}
