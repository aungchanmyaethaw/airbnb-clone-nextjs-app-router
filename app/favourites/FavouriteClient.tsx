import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import React from "react";

interface FavouriteClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

export default function FavouriteClient({
  listings,
  currentUser,
}: FavouriteClientProps) {
  return (
    <Container>
      <Heading
        title="Favourites"
        subtitle="List of places you have favourited!"
      />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {listings.map((listing) => (
          <ListingCard
            listing={listing}
            currentUser={currentUser}
            key={listing.id}
          />
        ))}
      </div>
    </Container>
  );
}
