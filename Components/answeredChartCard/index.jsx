"use client";

import React from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const getGuestCount = (invitations, type) => {
  if (invitations != null) {
    invitations = invitations.filter((item) => item.isAnswered);
    if (type == "answered") {
      return invitations.length;
    } else {
      let guestNumber = 0;
      for (let invitation of invitations) {
        switch (type) {
          case "adults":
            guestNumber += invitation.guest.filter(
              (item) => !item.isChild && item.isPresent
            ).length;
            break;
          case "childs":
            guestNumber += invitation.guest.filter(
              (item) => item.isChild && item.isPresent
            ).length;
            break;
          default:
            guestNumber += invitation.guest.filter(
              (item) => item.isPresent
            ).length;
        }
      }
      return guestNumber;
    }
  } else return 0;
};

export default function AnsweredChartCard({ invitations }) {
  ChartJS.register(ArcElement, Tooltip, Legend);

  const data = {
    labels: ["Adultes", "Enfants"],
    datasets: [
      {
        label: "Nb adultes/enfants",
        data: [
          getGuestCount(invitations.datas, "adults"),
          getGuestCount(invitations.datas, "childs"),
        ],
        backgroundColor: ["rgba(75, 192, 192, 0.5)", "rgba(54, 162, 235, 0.5)"],
        borderColor: ["rgba(75, 192, 192, 1)", "rgba(54, 162, 235, 1)"],
        borderWidth: 1,
      },
    ],
  };

  return (
    <Card className={styles.chartCard}>
      <CardHeader
        className={styles.cardHeader}
        title="Invitations Répondu"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <Doughnut data={data} />
        <br />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div className={styles.chartComments}>{`Nombres d'invités : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>
              {getGuestCount(invitations.datas)}
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div className={styles.chartComments}>{`Nombres d'adultes : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>
              {getGuestCount(invitations.datas, "adults")}
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div className={styles.chartComments}>{`Nombres d'enfants : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>
              {getGuestCount(invitations.datas, "childs")}
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
