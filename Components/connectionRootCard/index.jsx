"use client";
import { useUserContext } from "@/context/context";
import React, { useEffect } from "react";
import ConnectionCard from "../connectionCard";
import { verify } from "jsonwebtoken";

export default function ConnectionRootCard({ headerText, children }) {
  const context = useUserContext();

  useEffect(() => {
    if (context.token != null) {
      try {
        verify(context.token, process.env.NEXT_PUBLIC_API_JWT_KEY);
      } catch (error) {
        console.log("SESSION EXPIRED");
        context.logout();
      }
    }
  }, [context.user, context.token]);

  return context.user != null && context.token != null ? (
    <>{children}</>
  ) : (
    <ConnectionCard headerText={headerText} />
  );
}
