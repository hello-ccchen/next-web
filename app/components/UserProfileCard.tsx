import { IUser } from "../models/IUser";

const UserProfileCard = (user: IUser) => {
  return <h1>Hi {user.name}!</h1>;
};

export default UserProfileCard;
