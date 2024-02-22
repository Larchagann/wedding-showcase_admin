"use client";

import React from "react";
import { Grid } from "@mui/material";
import { useUserContext } from "@/context/context";
import PlacesCard from "../placesCard";

export default function PlacesCards() {
  const context = useUserContext();

  return (
    <Grid container spacing={2}>
      {context.user.isCityHallInvited ? (
        <>
          <Grid item xs={12} md={6}>
            <PlacesCard
              headerText={"Mairie"}
              placeName={"HÔTEL DE VILLE"}
              address={"QUAI LAMARTINE 71000 MÂCON"}
              hour={"11h"}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <PlacesCard
              headerText="Réception"
              placeName="SALLE DES FÊTES DE SENNECÉ"
              address="RUE VRÉMONTOISE 71000 MÂCON"
            />
          </Grid>
        </>
      ) : (
        <Grid item xs={12} md={12}>
          <PlacesCard
            headerText="Réception"
            placeName="SALLE DES FÊTES DE SENNECÉ"
            address="RUE VRÉMONTOISE 71000 MÂCON"
          />
        </Grid>
      )}
    </Grid>
  );
}
