"use client";

import React from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";
import { Card, CardContent, CardHeader } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function IsAnsweredChartCard({ invitations }) {
  ChartJS.register(ArcElement, Tooltip, Legend);
  const nbOfIsAnswered = invitations.datas.filter(
    (item) => item.isAnswered == true
  ).length;
  const nbOfIsNotAnswered = invitations.datas.filter(
    (item) => item.isAnswered == false
  ).length;

  const data = {
    labels: ["Répondu", "Non répondu"],
    datasets: [
      {
        label: "% invitations répondu",
        data: [nbOfIsAnswered, nbOfIsNotAnswered],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Avancée des réponses"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <Doughnut data={data} />
      </CardContent>
    </Card>
  );
}
