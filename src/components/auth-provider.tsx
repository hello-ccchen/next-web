"use client";
import { CommonProps } from "@/models/common-props";
import { SessionProvider } from "next-auth/react";

function AuthProvider({ children }: CommonProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
