import { IUser } from "@/interfaces/users-interface";
import EmailMask from "./email-mask";

const UserCard = (user: IUser) => {
  return (
    <div className="d-flex flex-wrap justify-content-center align-items-center my-auto">
      <img src={user.avatar} className="m-2 rounded-circle" />
      <div className="d-flex flex-column align-items-center w-100">
        <h6>{`${user.first_name} ${user.last_name}`}</h6>
        <EmailMask email={user.email} />
      </div>
    </div>
  );
};

export default UserCard;
