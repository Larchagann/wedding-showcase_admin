import React from "react";
import styles from "../../styles/card.module.scss";
import { Card, CardContent, CardHeader } from "@mui/material";
import Link from "next/link";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";

export default function linkCard({ headerText, contentText, link }) {
  return (
    <Link href={link} legacyBehavior>
      <a>
        <Card className={styles.card}>
          <CardHeader
            className={styles.cardHeader}
            title={headerText}
            titleTypographyProps={cardHeaderTitleTypographyProps}
          />
          <CardContent className={styles.cardContent}>
            {contentText}
          </CardContent>
        </Card>
      </a>
    </Link>
  );
}
