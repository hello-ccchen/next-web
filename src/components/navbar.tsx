import Link from "next/link";
import Image from "next/image";
import AuthButton from "./auth-button";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-light bg-light shadow border-bottom border-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-center align-items-center">
          <Link className="navbar-brand me-5" href="/">
            <Image src="/next.svg" alt="Home Logo" width={100} height={24} priority />
          </Link>
          <Link href="/users">User List</Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
