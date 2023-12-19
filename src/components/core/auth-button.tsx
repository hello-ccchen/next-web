"use client";
import Link from "next/link";
import Image from "next/image";
import { signOut, useSession } from "next-auth/react";

const AuthButton = () => {
  const { status, data } = useSession();

  return status === "authenticated" ? (
    <div className="d-flex justify-content-center align-items-center">
      {data.user?.name}
      {data.user?.image ? (
        <img
          src={data.user.image}
          alt="profile"
          className="m-2 rounded-circle"
          width={24}
          height={24}
        />
      ) : (
        <Image
          src="/person.svg"
          alt="profile"
          width={24}
          height={24}
          className="m-2 border border-dark rounded-circle"
        />
      )}
      <Image
        onClick={() => signOut({ callbackUrl: "/" })}
        src="/logout.svg"
        alt="logout"
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
