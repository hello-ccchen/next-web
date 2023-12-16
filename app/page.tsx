import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";
import UserProfileCard from "./components/UserProfileCard";
import { IUser } from "./models/IUser";

const Home = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect("/login");
  }

  const user = {
    name: session.user?.name,
    email: session.user?.email,
    image: session.user?.image,
  } as IUser;

  return <UserProfileCard {...user} />;
};

export default Home;
