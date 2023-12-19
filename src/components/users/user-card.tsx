import { IUser } from "@/interfaces/users/users-interface";
import EmailMask from "./email-mask";
import Image from "next/image";

const UserCard = (user: IUser) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center my-auto">
      <Image src={user.avatar} alt="avatar" priority className="m-2 rounded-circle" width={150} height={150} />
      <div className="d-flex flex-column align-items-center w-100">
        <h6>{`${user.first_name} ${user.last_name}`}</h6>
        <EmailMask email={user.email} />
      </div>
    </div>
  );
};

export default UserCard;
