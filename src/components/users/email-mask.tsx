"use client";
import Image from "next/image";
import { useState } from "react";

type EmailProps = {
  email: string;
};
const EmailMask = ({ email }: EmailProps) => {
  const [isMasked, setIsMasked] = useState(true);

  const maskEmail = (originalEmail: string): string => {
    const atIndex = originalEmail.indexOf("@");
    if (atIndex !== -1) {
      const maskedPart = isMasked ? originalEmail.substring(0, atIndex).replace(/./g, "*") : atob(originalEmail.substring(0, atIndex));
      const domainPart = originalEmail.substring(atIndex);
      return maskedPart + domainPart;
    }
    return originalEmail;
  };

  const onRevealEmailClick = () => {
    setIsMasked(!isMasked);
  };

  return (
    <div className="d-flex align-items-center">
      <span>{maskEmail(email)}</span>
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
