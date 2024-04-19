"use client";

import React from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";
import { Card, CardContent, CardHeader, Grid } from "@mui/material";
import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

const getGuestCount = (invitations, type) => {
  if (invitations != null) {
    let guestNumber = 0;
    for (let invitation of invitations) {
      switch (type) {
        case "adults":
          guestNumber += invitation.guest.filter(
            (item) => !item.isChild
          ).length;
          break;
        case "childs":
          guestNumber += invitation.guest.filter((item) => item.isChild).length;
          break;
        default:
          guestNumber += invitation.guest.length;
      }
    }
    return guestNumber;
  } else return 0;
};

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
        label: "Nb invitations",
        data: [nbOfIsAnswered, nbOfIsNotAnswered],
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
        title="Invitations"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <Doughnut data={data} />
        <br />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div
              className={styles.chartComments}
            >{`Nombres d'invitations : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>
              {invitations.datas.length}
            </div>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div className={styles.chartComments}>{`Répondu : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>{nbOfIsAnswered}</div>
          </Grid>
        </Grid>
        <hr />
        <Grid container spacing={0}>
          <Grid item xs={12} md={10}>
            <div className={styles.chartComments}>{`Non répondu : `}</div>
          </Grid>
          <Grid item xs={12} md={2}>
            <div className={styles.chartComments}>{nbOfIsNotAnswered}</div>
          </Grid>
        </Grid>
        <hr />
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
