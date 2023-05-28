import getCurrentUser from "@/actions/getCurrentUser";
import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const {
    category,
    location,
    guestCount,
    roomCount,
    bathroomCount,
    imageSrc,
    price,
    title,
    description,
  } = await req.json();

  if (
    !category ||
    !location ||
    !guestCount ||
    !roomCount ||
    !bathroomCount ||
    !imageSrc ||
    !price ||
    !title ||
    !description
  ) {
    return NextResponse.error();
  }

  const listing = await prisma.listing.create({
    data: {
      category,
      locationValue: location.value,
      guestCount,
      roomCount,
      bathroomCount,
      imageSrc,
      price: parseInt(price, 10),
      title,
      description,
      userId: currentUser?.id,
    },
  });

  return NextResponse.json(listing, { status: 201 });
}
