"use client";

import React, { useEffect } from "react";
import { useUserContext } from "@/context/context";
import { useDishTypeList } from "@/hooks/useDishTypeList";
import { useInvitation } from "@/hooks/useInvitation";
import { Grid } from "@mui/material";
import InvitationCard from "../invitationCard";
import IsAnsweredChartCard from "../isAnsweredChartCard";
import DishTypeCard from "../dishTypeCard";

export default function Dashboard() {
  const context = useUserContext();
  const invitations = useInvitation();
  const dishTypes = useDishTypeList();

  useEffect(
    (getInvitationList = invitations.getInvitationList) => {
      getInvitationList(context.token);
    },
    [invitations.getInvitationList, context.token]
  );

  useEffect(
    (getDishTypeList = dishTypes.getDishTypeList) => {
      getDishTypeList(context.token);
    },
    [dishTypes.getDishTypeList, context.token]
  );

  return invitations.datas != null ? (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={2}>
          <IsAnsweredChartCard invitations={invitations} />
          <DishTypeCard
            dishTypesDatas={dishTypes.datas}
            addDishType={dishTypes.createDishType}
            deleteDishType={dishTypes.deleteDishType}
          />
        </Grid>
        <Grid item xs={12} md={10}>
          <InvitationCard invitations={invitations} />
        </Grid>
      </Grid>
    </>
  ) : (
    <>Chargement...</>
  );
}
