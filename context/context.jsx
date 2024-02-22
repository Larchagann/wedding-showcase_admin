"use client";
import { useUser } from "@/hooks/useUser";
import { createContext, useContext } from "react";

const UserContext = createContext(null);

export default function Context({ children }) {
  const user = useUser();

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
}

export function useUserContext() {
  return useContext(UserContext);
}
