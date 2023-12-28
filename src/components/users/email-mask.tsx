"use client";
import Image from "next/image";
import { useState } from "react";
import { IUser } from "@/interfaces/users/users-interface";
import { useAppDispatch } from "@/store/store";
import { userAction, revealUserEmail } from "@/store/users/users-slice";

const EmailMask = (user: IUser) => {
  const dispatch = useAppDispatch();
  const [isMasked, setIsMasked] = useState(true);

  const onRevealEmailClick = () => {
    if (isMasked) {
      dispatch(revealUserEmail(user.id));
    } else {
      dispatch(userAction.maskUserEmail(user.id));
    }
    setIsMasked(!isMasked);
  };

  return (
    <div className="d-flex align-items-center">
      <span>{user.email}</span>
      <Image
        onClick={onRevealEmailClick}
        src={isMasked ? "/eye.svg" : "/eye-closed.svg"}
        alt="mask"
        width={16}
        height={16}
        className="ms-2"
        style={{
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default EmailMask;
