"use client";
import { useEffect } from "react";
import UserCard from "@/components/users/user-card";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchUsers, usersSelector } from "@/store/users/users-slice";
import styles from "./page.module.css";

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
          <UserCard {...user} />
        </div>
      ))}
    </div>
  );
};

export default Users;
