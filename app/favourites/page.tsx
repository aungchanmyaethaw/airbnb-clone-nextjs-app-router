import React from "react";
import getCurrentUser from "@/actions/getCurrentUser";
import EmptyState from "@/components/EmptyState";
import getFavouriteListings from "@/actions/getFavouriteListings";
import FavouriteClient from "./FavouriteClient";
export default async function Favourites() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }
  const listings = await getFavouriteListings();

  if (listings.length === 0) {
    return (
      <EmptyState
        title="No favourites found"
        subtitle="Looks like you have no favourites list yet!"
      />
    );
  }

  return <FavouriteClient listings={listings} currentUser={currentUser} />;
}
