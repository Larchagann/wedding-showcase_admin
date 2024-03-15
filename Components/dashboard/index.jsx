"use client";

import React, { useEffect } from "react";
import { useUserContext } from "@/context/context";
import { useDishTypeList } from "@/hooks/useDishTypeList";
import { useInvitation } from "@/hooks/useInvitation";
import { Grid } from "@mui/material";
import InvitationCard from "../invitationCard";
import IsAnsweredChartCard from "../isAnsweredChartCard";
import DishTypeCard from "../dishTypeCard";
import AnsweredChartCard from "../answeredChartCard";

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
        <Grid item xs={12} md={4}>
          <Grid container rowSpacing={0} columnSpacing={2}>
            <Grid item xs={12} md={6}>
              <IsAnsweredChartCard invitations={invitations} />
            </Grid>
            <Grid item xs={12} md={6}>
              <AnsweredChartCard invitations={invitations} />
            </Grid>
            <Grid item xs={12} md={6}>
              <DishTypeCard
                dishTypesDatas={dishTypes.datas}
                addDishType={dishTypes.createDishType}
                deleteDishType={dishTypes.deleteDishType}
              />
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={12} md={8}>
          <InvitationCard invitations={invitations} />
        </Grid>
      </Grid>
    </>
  ) : (
    <>Chargement...</>
  );
}
