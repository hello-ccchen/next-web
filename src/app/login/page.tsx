"use client";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import styles from "./page.module.css";

const Login = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/";
  const isNotRedirectPage = callbackUrl === "/";

  return (
    <div className={`container shadow-sm ${styles.container}`}>
      <div className={`row ${styles.content}`}>
        <div className={`${styles.bggradient} ${isNotRedirectPage ? "bg-primary" : "bg-info"} 
          col-sm-6 border d-flex justify-content-center align-items-center`}
        >
          <h1 className="text-white fw-bolder">
            {isNotRedirectPage
              ? "You're almost there!"
              : "401: Uh-oh, you do not have access."}
          </h1>
        </div>
        <div className="col-sm-6 border d-flex justify-content-center align-items-center">
          <div
            className="d-flex flex-nowrap justify-content-center w-75 border shadow py-3 btn"
            onClick={() => signIn("google", { callbackUrl: callbackUrl })}
          >
            <Image
              src="/google.svg"
              alt="login"
              width={24}
              height={24}
              className="me-2"
            />
            Continue with Google
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
