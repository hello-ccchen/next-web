"use client";
import { SessionProvider } from "next-auth/react";
import { CommonProps } from "@/common/common-props";

function AuthProvider({ children }: CommonProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthProvider;
