import Link from "next/link";
import Image from "next/image";

const NavBar = () => {
  return (
    <nav className="navbar fixed-top navbar-light bg-light shadow border-bottom border-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src="/next.svg" alt="Home Logo" width={100} height={24} />
        </Link>
      </div>
    </nav>
  );
};

export default NavBar;
