import Link from "next/link";
import Image from "next/image";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/options";

const NavBar = async () => {
  const session = await getServerSession(authOptions);
  return (
    <nav className="navbar fixed-top navbar-light bg-light shadow border-bottom border-light">
      <div className="container-fluid">
        <Link className="navbar-brand" href="/">
          <Image src="/next.svg" alt="Home Logo" width={100} height={24} />
        </Link>
        {session && (
          <Link
            className="d-flex justify-content-center py-3 btn"
            href="/api/auth/signout?callbackUrl=/"
          >
            Sign out
            <Image
              src="/logout.svg"
              alt="logout"
              width={24}
              height={24}
              className="ms-2"
            />
          </Link>
        )}
      </div>
    </nav>
  );
};

export default NavBar;
