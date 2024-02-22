"use client";

import React, { useEffect } from "react";
import { useUserContext } from "@/context/context";
import { useDishTypeList } from "@/hooks/useDishTypeList";
import { useInvitation } from "@/hooks/useInvitation";
import { Grid } from "@mui/material";
import InvitationCard from "../invitationCard";

export default function Dashboard() {
  const context = useUserContext();
  const invitations = useInvitation();
  const dishTypes = useDishTypeList();

  useEffect(
    (getInvitationList = invitations.getInvitationList) => {
      getInvitationList(context.token);
    },
    [invitations.getInvitationList]
  );

  useEffect(
    (getDishTypeList = dishTypes.getDishTypeList) => {
      getDishTypeList(context.token);
    },
    [dishTypes.getDishTypeList]
  );

  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12} md={4}></Grid>
        <Grid item xs={12} md={8}>
          <InvitationCard invitations={invitations} />
        </Grid>
      </Grid>
    </>
  );
}
