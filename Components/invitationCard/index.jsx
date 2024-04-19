"use client";

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Collapse,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  ThemeProvider,
} from "@mui/material";
import React, { useState } from "react";
import styles from "../../styles/card.module.scss";
import {
  cardHeaderTitleTypographyProps,
  primaryTheme,
} from "@/styles/muiTheme";
import { useUserContext } from "@/context/context";
import {
  IoIosArrowDown,
  IoIosArrowUp,
  IoIosCheckmarkCircle,
  IoIosCloseCircle,
} from "react-icons/io";
import { FaPenToSquare } from "react-icons/fa6";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";
import AddInvitationModal from "../addInvitationModal";

function Row({ invitation, updateInvitation, deleteInvitation }) {
  const [open, setOpen] = useState(false);

  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <IoIosArrowDown size={16} /> : <IoIosArrowUp size={16} />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" align="center">
          {invitation.name}
        </TableCell>
        <TableCell align="center">{invitation.mailAddress}</TableCell>
        <TableCell align="center">
          {invitation.isAnswered ? (
            <IoIosCheckmarkCircle size={20} className={styles.iconGreen} />
          ) : (
            <IoIosCloseCircle size={20} className={styles.iconGrey} />
          )}
        </TableCell>
        <TableCell align="center">
          {invitation.isCityHallInvited ? (
            <IoIosCheckmarkCircle size={20} className={styles.iconGreen} />
          ) : (
            <IoIosCloseCircle size={20} className={styles.iconGrey} />
          )}
        </TableCell>
        <TableCell align="center">
          <FaPenToSquare
            size={16}
            className={styles.icon}
            onClick={() => updateInvitation(invitation)}
          />{" "}
        </TableCell>
        <TableCell align="center">
          <MdOutlineRemoveCircleOutline
            size={20}
            className={styles.iconRed}
            onClick={() => deleteInvitation(invitation)}
          />{" "}
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell align="center">Type</TableCell>
                    <TableCell align="center">Nom</TableCell>
                    <TableCell align="center">Prénom</TableCell>
                    <TableCell align="center">Présent ?</TableCell>
                    <TableCell align="center">Besoin hébergement ?</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {invitation.guest.map((guest) => (
                    <TableRow key={guest.idGuest}>
                      <TableCell component="th" scope="row" align="center">
                        {guest.isChild ? "Enfant" : "Adulte"}
                      </TableCell>
                      <TableCell align="center">{guest.lastName}</TableCell>
                      <TableCell align="center">{guest.firstName}</TableCell>
                      <TableCell align="center">
                        {guest.isPresent ? (
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
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

export default function InvitationCard({ invitations }) {
  const context = useUserContext();
  const [modal, setModal] = useState({
    isOpen: false,
    invitation: null,
  });

  const handleModal = () => setModal({ ...modal, isOpen: !modal.isOpen });
  const handleModalClose = () =>
    setModal({ ...modal, invitation: null, isOpen: false });
  const handleModalUpdate = (invitation) =>
    setModal({ ...modal, invitation: invitation, isOpen: true });

  return (
    <Card className={styles.tableCard}>
      <CardHeader
        className={styles.cardHeader}
        title="Liste des invitations"
        titleTypographyProps={cardHeaderTitleTypographyProps}
      />
      <CardContent className={styles.cardContent}>
        {invitations.datas != null ? (
          <>
            <div className={styles.btnAddMobile}>
              <ThemeProvider theme={primaryTheme}>
                <Button onClick={handleModal} variant="outlined">
                  Ajouter une invitation
                </Button>
              </ThemeProvider>
            </div>
            {modal.isOpen ? (
              <AddInvitationModal
                open={modal.isOpen}
                handleModalClose={handleModalClose}
                invitation={modal.invitation}
                updateInvitation={(invitation) =>
                  invitations.updateInvitation(invitation, context.token)
                }
                addInvitation={(invitation) =>
                  invitations.createInvitation(invitation, context.token)
                }
              />
            ) : (
              <></>
            )}
            {invitations.datas != null && invitations.datas.length > 0 ? (
              <>
                <TableContainer component={Paper} style={{minHeight: 370, maxHeight: 370}}>
                  <Table sx={{ minWidth: 650 }} aria-label="simple table" stickyHeader>
                    <TableHead>
                      <TableRow>
                        <TableCell align="center" />
                        <TableCell align="center">Nom</TableCell>
                        <TableCell align="center">Adresse mail</TableCell>
                        <TableCell align="center">Répondu</TableCell>
                        <TableCell align="center">Invité mairie</TableCell>
                        <TableCell align="center">modifier</TableCell>
                        <TableCell align="center">Supprimer</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {invitations.datas.sort((a,b) => a.name.localeCompare(b.name)).map((item) => {
                        return (
                          <Row
                            key={item.idInvitation}
                            invitation={item}
                            updateInvitation={handleModalUpdate}
                            deleteInvitation={() =>
                              invitations.deleteInvitation(item, context.token)
                            }
                          />
                        );
                      })}
                    </TableBody>
                  </Table>
                </TableContainer>
              </>
            ) : (
              <div className={styles.itemCenterContent}>
                Vous n&apos;avez pas ajouté d&apos;invitations
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
