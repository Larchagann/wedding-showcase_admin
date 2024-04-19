"use client";

import {
  Card,
  CardContent,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import React from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps } from "@/styles/muiTheme";

export default function DishCard({ dishs }) {
  return (
    <Card className={styles.tableCard}>
      <CardHeader
        className={styles.cardHeader}
        title="Liste des plats"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {dishs.datas != null ? (
          <>
            {dishs.datas != null && dishs.datas.length > 0 ? (
              <>
                <TableContainer
                  component={Paper}
                  style={{ minHeight: 425, maxHeight: 425 }}
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Invitation</TableCell>
                        <TableCell align="center">Nom plat</TableCell>
                        <TableCell align="center">Type de plat</TableCell>
                        <TableCell align="center">Quantité</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dishs.datas
                        .sort((a, b) =>
                          a.invitation.name.localeCompare(b.invitation.name)
                        )
                        .map((item) => (
                          <TableRow
                            key={item.idDish}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {item.invitation.name}
                            </TableCell>
                            <TableCell align="center">{item.label}</TableCell>
                            <TableCell align="center">
                              {item.dishType.label}
                            </TableCell>
                            <TableCell align="center">
                              {item.quantity}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <div className={styles.itemCenterContent}>
                Personne n'a ajouté de plat.
              </div>
            )}
          </>
        ) : (
          <div className={styles.itemCenterContent}>Chargement...</div>
        )}
      </CardContent>
    </Card>
  );
}
