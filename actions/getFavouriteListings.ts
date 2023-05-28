import getCurrentUser from "./getCurrentUser";
import prisma from "@/libs/prismadb";

export default async function getFavouriteListings() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return [];
  }

  try {
    const listings = await prisma.listing.findMany({
      where: {
        id: {
          in: [...(currentUser.favouriteIds || [])],
        },
      },
    });

    return listings;
  } catch (error: any) {
    throw new Error(error);
  }
}
