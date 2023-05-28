import prisma from "@/libs/prismadb";

import { NextResponse } from "next/server";

import getCurrentUser from "@/actions/getCurrentUser";

interface IParams {
  reservationId: string;
}

export async function DELETE(req: Request, { params }: { params: IParams }) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const { reservationId } = params;

  if (!reservationId || typeof reservationId !== "string") {
    return NextResponse.json("Invalid Id!");
  }

  const reservations = await prisma.reservation.deleteMany({
    where: {
      id: reservationId,
      OR: [{ userId: currentUser.id }, { listing: { userId: currentUser.id } }],
    },
  });

  return NextResponse.json(reservations);
}
