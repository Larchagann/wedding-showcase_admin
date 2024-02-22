import React from "react";
import { Grid } from "@mui/material";
import dynamic from "next/dynamic";

const JackpotCard = dynamic(() => import("@/Components/jackpotCard"), {
  ssr: false,
});

export default function WeddingList() {
  return (
    <>
      <div className="header">
        Nous avons pris la décision de ne pas faire de liste de maraiage mais de
        vous proposer une cagnotte qui nous permettra de financer notre voyage
        de noce
      </div>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <JackpotCard />
        </Grid>
      </Grid>
    </>
  );
}
