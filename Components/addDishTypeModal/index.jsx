"use client";

import { useUserContext } from "@/context/context";
import { primaryTheme } from "@/styles/muiTheme";
import {
  Box,
  Button,
  Modal,
  TextField,
  ThemeProvider,
  Typography,
} from "@mui/material";
import { useState } from "react";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "none",
  borderRadius: "0.25rem",
  boxShadow: 24,
  p: 4,
};

export default function AddDishTypeModal({
  open,
  handleModal,
  addDishType,
  refModal,
}) {
  const context = useUserContext();
  const model = {
    label: "",
    errorLabel: false,
  };

  const [dishType, setDishType] = useState(model);

  const checkValue = (value) => value == null || value == "";

  const handleClose = () => {
    setDishType(model);
    handleModal();
  };

  const handleClickValidate = () => {
    if (!checkValue(dishType.label)) {
      addDishType({ label: dishType.label }, context.token);
      handleClose();
    } else setDishType({ ...dishType, errorLabel: checkValue(dishType.label) });
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
              Ajout d'un type de plat
            </Typography>
            <br />
            <TextField
              fullWidth
              type="text"
              onChange={(event) => {
                setDishType({ ...dishType, label: event.target.value });
              }}
              variant="outlined"
              label="Type de plat"
              error={dishType.errorLabel}
              helperText={dishType.errorLabel ? "Type de plat invalide." : ""}
              size="small"
            />
            <br />
            <br />
            <Button onClick={handleClickValidate} variant="outlined">
              Ajouter
            </Button>
          </Box>
        </ThemeProvider>
      </div>
    </Modal>
  );
}
