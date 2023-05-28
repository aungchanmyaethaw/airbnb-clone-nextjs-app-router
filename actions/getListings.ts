import prisma from "@/libs/prismadb";

export interface IPramsListings {
  userId?: string;
  category?: string;
  guestCount?: number;
  roomCount?: number;
  bathroomCount?: number;
  locationValue?: string;
  startDate?: string;
  endDate?: string;
}

export default async function getListings(params: IPramsListings) {
  const {
    userId,
    category,
    guestCount,
    roomCount,
    bathroomCount,
    locationValue,
    startDate,
    endDate,
  } = params;

  let query: any = {};

  if (userId) {
    query.userId = userId;
  }

  if (category) {
    query.category = category;
  }

  if (guestCount) {
    query.guestCount = { gte: +guestCount };
  }
  if (roomCount) {
    query.roomCount = { gte: +roomCount };
  }
  if (bathroomCount) {
    query.bathroomCount = { gte: +bathroomCount };
  }

  if (locationValue) {
    query.locationValue = locationValue;
  }

  if (startDate && endDate) {
    query.NOT = {
      reservations: {
        some: {
          OR: [
            { endDate: { gte: startDate }, startDate: { lte: startDate } },
            { startDate: { lte: endDate }, endDate: { gte: endDate } },
          ],
        },
      },
    };
  }

  try {
    const listings = await prisma?.listing.findMany({
      where: query,
      orderBy: [
        {
          createdAt: "desc",
        },
      ],
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
