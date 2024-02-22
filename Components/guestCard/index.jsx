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
import { useUserContext } from "@/context/context";
import { useGuestList } from "@/hooks/useGuestList";
import {
  cardHeaderMobileTitleTypographyProps,
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import ChoiceButton from "../choiseButton";
import { isMobile } from "@/utils/utils";

export default function GuestCard() {
  const context = useUserContext();
  const guestList = useGuestList();

  const [datas, setDatas] = useState(null);

  useEffect(
    (getGuestList = guestList.getGuestList) => {
      getGuestList(context.user.idInvitation, context.token);
    },
    [guestList.getGuestList]
  );

  useEffect(() => {
    setDatas(guestList.datas);
  }, [guestList.datas]);

  const handlChangeIsPresent = (isTrue, data) => {
    setDatas(
      datas.map((item) =>
        item.idGuest == data.idGuest ? { ...item, isPresent: isTrue } : item
      )
    );
  };

  const handleChangeIsNeedAccomodation = (isTrue, data) => {
    const newDatas = datas.map((item) =>
      item.idGuest == data.idGuest
        ? { ...item, isNeedAccomodation: isTrue }
        : item
    );
    setDatas(newDatas);
  };

  const handleUpdate = () => {
    guestList.updateGuestList(datas, context.token);
    context.updateUser()
  };

  return isMobile() ? (
    <>
      <Card className={styles.card}>
        <CardHeader
          className={styles.cardHeaderSimple}
          title="Confirmation réception"
          titleTypographyProps={cardHeaderTitleTypographyProps}
        />
      </Card>
      {datas != null ? (
        <>
          {datas.map((data) => (
            <Card key={data.idGuest} className={styles.card}>
              <CardHeader
              className={styles.cardHeaderMobile}
                title={`${data.firstName} ${data.lastName}`}
                titleTypographyProps={cardHeaderMobileTitleTypographyProps}
              />
              <CardContent className={styles.cardContent}>
                <div className={styles.mobileLine}>
                  <div className={styles.mobileLineLabel}>Sera là </div>
                  <div className={styles.mobileLineButton}>
                    <ChoiceButton
                      key={`ispresent-${data.idGuest}`}
                      isTrue={data.isPresent}
                      handleChangeChoice={(isTrue) =>
                        handlChangeIsPresent(isTrue, data)
                      }
                    />
                  </div>
                </div>
                <div className={styles.mobileLine}>
                  <div className={styles.mobileLineLabel}>
                    Besoin d'un hébergement{" "}
                  </div>
                  <div className={styles.mobileLineButton}>
                    <ChoiceButton
                      key={`isNeedAccomodation-${data.idGuest}`}
                      isTrue={data.isNeedAccomodation}
                      handleChangeChoice={(isTrue) =>
                        handleChangeIsNeedAccomodation(isTrue, data)
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
          <div className={styles.btnValiderMobile}>
              <ThemeProvider theme={primaryTheme}>
                <Button onClick={handleUpdate} variant="contained">
                  Enregistrer
                </Button>
              </ThemeProvider>
            </div>
        </>
      ) : (
        <div>Chargement...</div>
      )}
    </>
  ) : (
    <Card className={styles.card}>
      <CardHeader
        className={styles.cardHeader}
        title="Confirmation réception"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {datas != null ? (
          <>
            <div className={styles.table}>
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell align="center">Nom </TableCell>
                      <TableCell align="center">Prénom </TableCell>
                      <TableCell align="center">Sera là</TableCell>
                      <TableCell align="center">
                        Besoin d'un <br />
                        hébergement
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {datas.map((data) => (
                      <TableRow
                        key={data.idGuest}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        <TableCell component="th" scope="row">
                          {data.lastName}
                        </TableCell>
                        <TableCell align="center">{data.firstName}</TableCell>
                        <TableCell align="center">
                          <ChoiceButton
                            key={`ispresent-${data.idGuest}`}
                            isTrue={data.isPresent}
                            handleChangeChoice={(isTrue) =>
                              handlChangeIsPresent(isTrue, data)
                            }
                          />
                        </TableCell>
                        <TableCell align="center">
                          <ChoiceButton
                            key={`isNeedAccomodation-${data.idGuest}`}
                            isTrue={data.isNeedAccomodation}
                            handleChangeChoice={(isTrue) =>
                              handleChangeIsNeedAccomodation(isTrue, data)
                            }
                          />
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className={styles.btnValider}>
              <ThemeProvider theme={primaryTheme}>
                <Button onClick={handleUpdate} variant="outlined">
                  Enregistrer
                </Button>
              </ThemeProvider>
            </div>
          </>
        ) : (
          <div>Chargement...</div>
        )}
      </CardContent>
    </Card>
  );
}
