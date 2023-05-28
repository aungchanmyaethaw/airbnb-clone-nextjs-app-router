import prisma from "@/libs/prismadb";

interface IParams {
  listingId?: string;
}

export default async function ({ listingId }: IParams) {
  try {
    const listing = await prisma.listing.findUnique({
      where: {
        id: listingId,
      },
      include: {
        user: true,
      },
    });

    if (!listing) {
      return null;
    }

    return listing;
  } catch (err: any) {
    throw new Error(err);
  }
}
