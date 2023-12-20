import { NextResponse } from "next/server";
import UsersService from "@/services/users/users-service";

const handler = async () => {
  try {
    const result = await UsersService.getUsers();
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export { handler as GET };
