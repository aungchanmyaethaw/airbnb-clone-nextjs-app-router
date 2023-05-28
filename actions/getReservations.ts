import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
  userId?: string;
  authorId?: string;
}

export default async function ({ listingId, userId, authorId }: IParams) {
  let query: any = {};

  if (listingId) {
    query.listingId = listingId;
  }

  if (userId) {
    query.userId = userId;
  }

  if (authorId) {
    query.listing = { userId: authorId };
  }

  try {
    const reservations = await prisma.reservation.findMany({
      where: query,
      include: {
        listing: true,
      },
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return reservations;
  } catch (error: any) {
    throw new Error(error);
  }
}
