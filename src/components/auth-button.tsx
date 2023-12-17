"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { status, data } = useSession();

  return status === "authenticated" ? (
    <div>
      {data.user?.name}
      {data.user?.image && (
        <img
          src={data.user.image}
          className="m-2 rounded-circle"
          width={24}
          height={24}
        />
      )}
      <Image
        onClick={() => signOut({ callbackUrl: "/" })}
        src="/logout.svg"
        alt="login"
        width={24}
        height={24}
        className="ms-2"
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  ) : (
    <Link href="/login">
      Sign in
      <Image
        src="/login.svg"
        alt="login"
        width={24}
        height={24}
        className="ms-2"
      />
    </Link>
  );
};

export default AuthButton;
