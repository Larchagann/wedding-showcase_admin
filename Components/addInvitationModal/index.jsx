"use client";

import React, { useEffect, useState } from "react";
import styles from "../../styles/card.module.scss";
import { primaryTheme } from "@/styles/muiTheme";
import { checkValideAddressMail } from "@/utils/utils";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { MdOutlineRemoveCircleOutline } from "react-icons/md";

const guestModel = {
  lastName: "",
  firstName: "",
  isChild: false,
  isMainGuest: false,
  isNeedAccomodation: false,
  isPresent: false,
};

const invitationModel = {
  name: "",
  mailAddress: "",
  isAnswered: false,
  isCityHallInvited: false,
  guest: [guestModel],
};

const errorGuestModel = {
  errorLastName: false,
  errorFirstName: false,
};

const errorInvitationModel = {
  errorName: false,
  errorMailAddress: false,
  guest: [errorGuestModel],
};

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "0.25rem",
  boxShadow: 24,
  p: 4,
};

export default function AddInvitationModal({
  open,
  handleModalClose,
  invitation,
  addInvitation,
  updateInvitation,
  refModal,
}) {
  const [data, setData] = useState(invitationModel);
  const [error, setError] = useState(errorInvitationModel);

  useEffect(() => {
    if (invitation != null && invitation != undefined) {
      setData({ ...invitation });
      setError({
        ...errorInvitationModel,
        errorName: false,
        errorMailAddress: false,
        guest: invitation.guest.map((item) => errorGuestModel),
      });
    }
  }, [invitation]);

  const checkValue = (value) => value == null || value == "";

  const handleClose = () => {
    setData(invitationModel);
    setError(errorInvitationModel);
    handleModalClose();
  };

  const handleClickValidate = () => {
    let isValid = true;

    if (checkValue(data.name) || checkValideAddressMail(data.mailAddress) == null) {
      isValid = false;
    }
    for (let item of data.guest) {
      if (checkValue(item.lastName) || checkValue(item.firstName)) {
        isValid = false;
      }
    }
    if (isValid) {
      if (invitation != null) updateInvitation(data);
      else addInvitation(data);
      handleClose();
    } else {
      setError({
        ...error,
        errorName: checkValue(data.name),
        errorMailAddress: checkValue(data.mailAddress),
        guest: error.guest.map((item, index) => {
          const guest = data.guest.find(
            (elmt, indexElmt) => index == indexElmt
          );
          return {
            errorLastName: checkValue(guest.lastName),
            errorFirstName: checkValue(guest.firstName),
          };
        }),
      });
    }
  };

  return (
    <Modal
      ref={refModal}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div>
        <ThemeProvider theme={primaryTheme}>
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Ajout d'une invitation
            </Typography>

            <br />
            <Grid container spacing={2}>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  defaultValue={data.name}
                  onChange={(event) => {
                    setData({ ...data, name: event.target.value });
                  }}
                  variant="outlined"
                  label="Nom"
                  error={error.errorName}
                  helperText={error.errorName ? "Nom invalide." : ""}
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <TextField
                  fullWidth
                  type="text"
                  defaultValue={data.mailAddress}
                  onChange={(event) => {
                    setData({ ...data, mailAddress: event.target.value });
                  }}
                  variant="outlined"
                  label="Adresse mail"
                  error={error.errorMailAddress}
                  helperText={
                    error.errorMailAddress ? "Adresse mail invalide." : ""
                  }
                  size="small"
                />
              </Grid>
              <Grid item xs={4}>
                <FormControlLabel
                  control={
                    <Checkbox
                      key={"invitationcheckbox"}
                      checked={data.isCityHallInvited}
                      onChange={(event) =>
                        setData({
                          ...data,
                          isCityHallInvited: event.target.checked,
                        })
                      }
                      inputProps={{ "aria-label": "controlled" }}
                    />
                  }
                  label="Invité à la mairie ?"
                />
              </Grid>
            </Grid>
            <br />
            <Button
              onClick={() => {
                setData({
                  ...data,
                  guest: [...data.guest, guestModel],
                });
                setError({ ...error, guest: [...error.guest, errorGuestModel] });
              }}
              variant="contained"
            >
              Ajouter un invité
            </Button>
            <br />
            <br />
            {data.guest.map((guest, index) => {
              const errorGuest = data.guest.find(
                (elmt, indexElmt) => indexElmt == index
              );
              return (
                <div key={index} className={styles.modalBoxContainer}>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        type="text"
                        defaultValue={guest.lastName}
                        onChange={(event) => {
                          setData({
                            ...data,
                            guest: data.guest.map((elmt, indexElmt) =>
                              indexElmt == index
                                ? { ...elmt, lastName: event.target.value }
                                : elmt
                            ),
                          });
                        }}
                        variant="outlined"
                        label="Nom"
                        error={errorGuest.errorLastName}
                        helperText={
                          errorGuest.errorLastName ? "Nom invalide." : ""
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={4}>
                      <TextField
                        fullWidth
                        type="text"
                        defaultValue={guest.firstName}
                        onChange={(event) => {
                          setData({
                            ...data,
                            guest: data.guest.map((elmt, indexElmt) =>
                              indexElmt == index
                                ? { ...elmt, firstName: event.target.value }
                                : elmt
                            ),
                          });
                        }}
                        variant="outlined"
                        label="Prénom"
                        error={errorGuest.errorFirstName}
                        helperText={
                          errorGuest.errorFirstName ? "Prénom invalide." : ""
                        }
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={3}>
                      <FormControlLabel
                        control={
                          <Checkbox
                            key={`invitationcheckbox${index}`}
                            checked={guest.isCityHallInvited}
                            onChange={(event) => {
                              setData({
                                ...data,
                                guest: data.guest.map((elmt, indexElmt) =>
                                  indexElmt == index
                                    ? { ...elmt, isChild: event.target.checked }
                                    : elmt
                                ),
                              });
                            }}
                            inputProps={{ "aria-label": "controlled" }}
                          />
                        }
                        label="C'est un enfant ?"
                      />
                    </Grid>
                    <Grid item xs={1}>
                      <div className={styles.checkboxContainer}>
                        <MdOutlineRemoveCircleOutline
                          size={20}
                          className={styles.iconRed}
                          onClick={() => {
                            setData({
                              ...data,
                              guest: data.guest.filter(
                                (elmt, indexElmt) => indexElmt != index
                              ),
                            });
                          }}
                        />
                      </div>
                    </Grid>
                  </Grid>
                </div>
              );
            })}
            <div className={styles.modalButtonContainer}>
              <Button onClick={handleClickValidate} variant="contained">
                {invitation != null ? "Modifier" : "Ajouter"}
              </Button>
            </div>
          </Box>
        </ThemeProvider>
      </div>
    </Modal>
  );
}
