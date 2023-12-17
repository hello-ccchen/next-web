"use client";

import Image from "next/image";
import { useState } from "react";

type EmailProps = {
  email: string;
};
const EmailMask = ({ email }: EmailProps) => {
  const [isMasked, setIsMasked] = useState(true);

  const maskEmail = (email: string): string => {
    const atIndex = email.indexOf("@");
    if (atIndex !== -1) {
      const maskedPart = email.substring(0, atIndex).replace(/./g, "*");
      const domainPart = email.substring(atIndex);
      return maskedPart + domainPart;
    }
    return email;
  };

  const revealEmail = () => {
    setIsMasked(!isMasked);
  };

  return (
    <div className="d-flex align-items-center">
      <span>{isMasked ? maskEmail(email) : email}</span>
      <Image
        onClick={revealEmail}
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
