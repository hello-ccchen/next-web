import Link from "next/link";
import Image from "next/image";
import AuthButton from "./auth-button";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-light bg-light shadow border-bottom border-light">
      <div className="container-fluid">
        <div className="d-flex justify-content-between align-items-center">
          <Link className="navbar-brand me-5" href="/">
            <Image src="/next.svg" alt="home" width={100} height={24} priority />
          </Link>
          <Link href="/products" className="mx-2">Products</Link>
          <Link href="/users" className="mx-2">Top buyers</Link>
        </div>
        <AuthButton />
      </div>
    </nav>
  );
};

export default NavBar;
