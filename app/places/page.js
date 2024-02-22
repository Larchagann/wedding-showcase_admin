import React from "react";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";
import PlacesCards from "@/Components/placesCards";
import PlacesCard from "@/Components/placesCard";

const ConnectionRootCard = dynamic(
  () => import("@/Components/connectionRootCard"),
  { ssr: false }
);

export default function Places() {
  return (
    <>
      <div className="header">
        Voici les lieux et horaires où se dérouleront les festivités de notre
        union le 20 juillet 2024
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <PlacesCard
            headerText={"Cérémonie Chrétienne"}
            placeName={"CATHÉDRALE SAINT-VINCENT"}
            address={"29 RUE LAMARTINE 71000 MÂCON"}
            hour={"14:30"}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <PlacesCard
            headerText={"Vin d'honneur"}
            placeName={"ESPACE PLEIN ÉVANGILE"}
            address={"139 RUE DU CONCOURS 71000 MÂCON"}
          />
        </Grid>
      </Grid>
      <ConnectionRootCard>
        <PlacesCards />
      </ConnectionRootCard>
    </>
  );
}
