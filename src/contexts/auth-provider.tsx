"use client";
import { SessionProvider } from "next-auth/react";
import { CommonProps } from "@/interfaces/common-interface";

function AuthProvider({ children }: CommonProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
