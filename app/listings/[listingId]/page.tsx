import getSingleListing from "@/actions/getSingleListing";
import EmptyState from "@/components/EmptyState";
import React from "react";
import ListingClient from "./ListingClient";
import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";

interface IParams {
  listingId?: string;
}

export default async function ListingDetails({ params }: { params: IParams }) {
  const listing = await getSingleListing(params);
  const currentUser = await getCurrentUser();
  const reservations = await getReservations(params);
  if (!listing) {
    return <EmptyState />;
  }

  return (
    <ListingClient
      reservations={reservations}
      listing={listing}
      currentUser={currentUser}
    />
  );
}
