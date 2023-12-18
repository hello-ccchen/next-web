"use client";
import { useEffect } from "react";
import EmailMask from "@/components/email-mask";
import { useAppDispatch, useAppSelector } from "@/store/store";
import styles from "./page.module.css";
import { fetchUsers, usersSelector } from "./slice";

const Users = () => {
  const dispatch = useAppDispatch();
  const { userList, isLoading, error } = useAppSelector(usersSelector);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  if (isLoading) return <h1>Loading...</h1>;
  if (userList.length === 0 || error) return <h1>Uh-oh, no data</h1>;

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
