"use client";

import { primaryTheme } from "@/styles/muiTheme";
import {
  Box,
  Button,
  MenuItem,
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
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function AddDishModal({
  open,
  handleModal,
  dishTypeList,
  addDish,
  refModal,
}) {
  const model = {
    label: "",
    errorLabel: false,
    quantity: null,
    errorQuantity: false,
    dishType: 1,
    errorDishType: false,
  };

  const [dish, setDish] = useState(model);

  const checkValue = (value) => value == null || value == "" || value == 0;

  const handleClose = () => {
    setDish(model);
    handleModal();
  };

  const handleClickValidate = () => {
    if (
      !checkValue(dish.label) &&
      !checkValue(dish.quantity) &&
      !checkValue(dish.dishType)
    ) {

      addDish({
        label: dish.label,
        quantity: dish.quantity,
        dishType: dish.dishType
      });
      handleClose();
    } else {
      setDish({
        ...dish,
        errorLabel: checkValue(dish.label),
        errorQuantity: checkValue(dish.quantity),
        errorDishType: checkValue(dish.dishType),
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
              Ajout d'un plat
            </Typography>
            <TextField
              fullWidth
              type="text"
              onChange={(event) => {
                setDish({ ...dish, label: event.target.value });
              }}
              variant="outlined"
              label="Nom du plat"
              error={dish.errorLabel}
              helperText={dish.errorLabel ? "Nom du plat invalide." : ""}
              size="small"
            />
            <br />
            <br />
            <TextField
              fullWidth
              type="number"
              onChange={(event) => {
                const regex = /^[0-9\b]+$/;
                if (
                  event.target.value === "" ||
                  regex.test(event.target.value)
                ) {
                  setDish({ ...dish, quantity: event.target.value });
                }
              }}
              variant="outlined"
              label="Quantité"
              error={dish.errorQuantity}
              helperText={dish.errorQuantity ? "quantité invalide." : ""}
              size="small"
            />
            <br />
            <br />
            <TextField
              fullWidth
              select
              onChange={(event) => {
                setDish({ ...dish, dishType: event.target.value });
              }}
              //value={dish.dishType}
              defaultValue={1}
              variant="outlined"
              label="Type de plat"
              error={dish.errorDishType}
              helperText={dish.errorDishType ? "Type de plat invalide." : ""}
              size="small"
            >
              {dishTypeList.map((option) => (
                <MenuItem key={`select-key-${option.idDishType}`} value={option.idDishType}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
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
