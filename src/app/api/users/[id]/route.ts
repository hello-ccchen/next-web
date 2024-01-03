import { getUserById } from "@/services/users/users-service";
import { NextResponse } from "next/server";

const handler = async (_request: Request, { params }: { params: { id: number } }) => {
  try {
    const id = params.id;
    const result = await getUserById(id);
    return NextResponse.json({ result }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ error: err }, { status: 500 });
  }
};

export { handler as GET };
