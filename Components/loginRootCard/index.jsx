"use client";
import { useUserContext } from "@/context/context";
import React, { useEffect } from "react";
import LoginCard from "../loginCard";
import { verify } from "jsonwebtoken";

export default function LoginRootCard({ headerText, children }) {
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
  }, [context.token]);

  return context.token != null ? (
    <>{children}</>
  ) : (
    <LoginCard />
  );
}
