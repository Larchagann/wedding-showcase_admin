"use client";
import { useUserContext } from "@/context/context";
import React, { useEffect } from "react";
import LoginCard from "../loginCard";
import { verify } from "jsonwebtoken";

export default function LoginRootCard({ headerText, children }) {
  const context = useUserContext();

  useEffect((logout = context.logout) => {
    if (context.token != null) {
      try {
        verify(context.token, process.env.NEXT_PUBLIC_API_JWT_KEY);
      } catch (error) {
        console.log("SESSION EXPIRED");
        logout();
      }
    }
  }, [context.token, context.logout]);

  return context.token != null ? (
    <>{children}</>
  ) : (
    <LoginCard />
  );
}
