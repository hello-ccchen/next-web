import { NextResponse } from "next/server";
import UsersService from "@/services/users/users-service";

const handler = async (_request: Request, { params }: { params: { id: number } }) => {
  try {
    const id = params.id;
    const result = await UsersService.getUserById(id);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export { handler as GET };
