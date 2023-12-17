"use client";
import { useEffect, useState } from "react";
import EmailMask from "@/components/email-mask";
import styles from "./page.module.css";
import { IUser } from "./interface";
import { getAllUserList } from "./service";

const Users = () => {
  const [userList, setUserList] = useState<IUser[]>([]);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    getAllUserList().then((result) => {
      setUserList(result);
      setLoading(false);
    });
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (userList.length === 0 ) return <h1>No data</h1>;

  return (
    <div className={`row mx-auto w-75 ${styles.container}`}>
      {userList.map((user) => (
        <div className="col-sm-4" key={user.id}>
          <div className="d-flex flex-wrap justify-content-center align-items-center my-auto">
            <img src={user.avatar} className="m-2 rounded-circle" />
            <div className="d-flex flex-column align-items-center w-100">
              <h6>{`${user.first_name} ${user.last_name}`}</h6>
              <EmailMask email={user.email} />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Users;
