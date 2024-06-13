"use client";

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
import React, { useEffect, useState } from "react";
import styles from "../../styles/card.module.scss";
import { cardHeaderTitleTypographyProps, primaryTheme } from "@/styles/muiTheme";
import { IoIosCheckmarkCircle, IoIosCloseCircle } from "react-icons/io";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

const pdfStyles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default function GuestCard({ invitations }) {
  const [guestList, setGuestList] = useState(null);
  console.log("invitations", invitations);
  useEffect(() => {
    if (invitations != null) {
      const list = [];
      for (let invitation of invitations.datas) {
        for (let guest of invitation.guest) {
          if (guest.isPresent) list.push(guest);
        }
      }
      setGuestList(list);
    }
  }, [invitations]);

  const MyDocument = () => {
    return guestList != null ? (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.section}>
            <Text>{`Type | Nom | Prénom | Dors dans la salle de réception ?`}</Text>
            <Text> </Text>
            {guestList.map((guest) => {
              return (
                <>
                  <Text>{`${guest.isChild ? "Enfant" : "Adulte"} | ${
                    guest.lastName
                  } | ${guest.firstName} | ${
                    guest.isNeedAccomodation ? "OUI" : "NON"
                  }`}</Text>{" "}
                  <Text> </Text>
                </>
              );
            })}
          </View>
        </Page>
      </Document>
    ) : (
      <Document>
        <Page size="A4" style={pdfStyles.page}>
          <View style={pdfStyles.section}>
            <Text>{`AUCUN INVITÉ`}</Text>
          </View>
        </Page>
      </Document>
    );
  };

  return (
    <Card className={styles.tableCard}>
      <CardHeader
        className={styles.cardHeader}
        title="Liste des invités présent"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        <PDFDownloadLink
          document={<MyDocument guestList={guestList} />}
          fileName="liste_invites_mariage-yann-et-lucie.pdf"
        >
          {({ blob, url, loading, error }) =>
            loading ? (
              <div className={styles.btnAddMobile}>
                <ThemeProvider theme={primaryTheme}>
                  <Button  variant="outlined">
                    Télécharger
                  </Button>
                </ThemeProvider>
              </div>
            ) : (
              <div className={styles.btnAddMobile}>
                <ThemeProvider theme={primaryTheme}>
                  <Button 
                  variant="outlined">
                  Télécharger
                  </Button>
                </ThemeProvider>
              </div>
            )
          }
        </PDFDownloadLink>
        {invitations.datas != null ? (
          <>
            {guestList != null && guestList.length > 0 ? (
              <>
                <TableContainer
                  component={Paper}
                  style={{ minHeight: 370, maxHeight: 370 }}
                >
                  <Table
                    sx={{ minWidth: 650 }}
                    aria-label="simple table"
                    stickyHeader
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell align="center">Type</TableCell>
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center">Prénom</TableCell>
                        <TableCell align="center">
                          Dors dans la salle
                          <br />
                          de réception ?
                        </TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {guestList
                        .sort((a, b) => a.lastName.localeCompare(b.lastName))
                        .map((guest) => (
                          <TableRow
                            key={guest.idGuest}
                            sx={{
                              "&:last-child td, &:last-child th": { border: 0 },
                            }}
                          >
                            <TableCell
                              component="th"
                              scope="row"
                              align="center"
                            >
                              {guest.isChild ? "Enfant" : "Adulte"}
                            </TableCell>
                            <TableCell align="center">
                              {guest.lastName}
                            </TableCell>
                            <TableCell align="center">
                              {guest.firstName}
                            </TableCell>
                            <TableCell align="center">
                              {guest.isNeedAccomodation ? (
                                <IoIosCheckmarkCircle
                                  size={20}
                                  className={styles.iconGreen}
                                />
                              ) : (
                                <IoIosCloseCircle
                                  size={20}
                                  className={styles.iconGrey}
                                />
                              )}
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
