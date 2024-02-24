"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/card.module.scss";
import {
  Button,
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
  ThemeProvider,
} from "@mui/material";
import {
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import { useUserContext } from "@/context/context";
import AddDishTypeModal from "../addDishTypeModal";

export default function DishTypeCard({
  dishTypesDatas,
  addDishType,
  deleteDishType,
}) {
  const context = useUserContext();

  const [modalOpen, setModalOpen] = useState(false);

  const handleModal = () => setModalOpen(!modalOpen);
  return (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Types de plat"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {dishTypesDatas != null ? (
          <>
            <div className={styles.itemContent}>
              <ThemeProvider theme={primaryTheme}>
                <Button onClick={handleModal} variant="outlined">
                  Ajouter un type de plat
                </Button>
              </ThemeProvider>
              {modalOpen ? (
                <AddDishTypeModal
                  open={modalOpen}
                  handleModal={handleModal}
                  addDishType={addDishType}
                />
              ) : (
                <></>
              )}
            </div>
            {dishTypesDatas.length > 0 ? (
              <div className={styles.table}>
                <TableContainer component={Paper}>
                  <Table sx={{ minWidth: 200 }} aria-label="simple table">
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Label</TableCell>
                        <TableCell align="center">Supprimer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {dishTypesDatas.map((data) => (
                        <TableRow
                          key={`${data.label}${data.idDishType}`}
                          sx={{
                            "&:last-child td, &:last-child th": { border: 0 },
                          }}
                        >
                          <TableCell component="th" scope="row" align="center">
                            {data.label}
                          </TableCell>
                          <TableCell align="center">
                            <MdOutlineRemoveCircleOutline
                              className={styles.iconDelete}
                              size={22}
                              onClick={() => {
                                deleteDishType(data, context.token);
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </div>
            ) : (
              <div className={styles.itemCenterContent}>
                Vous n&apos;avez pas encore ajouté de type de plats.
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
