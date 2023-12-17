import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

const Login = () => {
  return (
    <div className={`container shadow-sm ${styles.container}`}>
      <div className={`row ${styles.content}`}>
        <div
          className={`col-sm-6 border d-flex justify-content-center align-items-center bg-info ${styles.bggradient}`}
        >
          <h1 className="text-white fw-bolder">To continue, please sign in</h1>
        </div>
        <div className="col-sm-6 border d-flex justify-content-center align-items-center">
          <Link
            className="d-flex flex-nowrap justify-content-center w-75 border shadow py-3 btn"
            href="/api/auth/signin"
          >
            Sign in
            <Image
              src="/login.svg"
              alt="login"
              width={24}
              height={24}
              className="ms-2"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
