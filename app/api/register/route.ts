import bcrypt from "bcrypt";
import { NextResponse } from "next/server";
import prisma from "@/libs/prismadb";
export async function POST(req: Request) {
  const { email, name, password } = await req.json();

  if (!email || !name || !password) {
    return NextResponse.json("All fields required!", { status: 400 });
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  const user = await prisma?.user.create({
    data: {
      email,
      name,
      hashedPassword,
    },
  });

  return NextResponse.json(user);
}
