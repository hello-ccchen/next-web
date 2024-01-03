import { getUsers } from "@/services/users/users-service";
import { NextResponse } from "next/server";

const handler = async () => {
  try {
    const result = await getUsers();
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export { handler as GET };
