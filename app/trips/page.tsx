import getCurrentUser from "@/actions/getCurrentUser";
import getReservations from "@/actions/getReservations";
import EmptyState from "@/components/EmptyState";
import React from "react";
import TripClient from "./TripClient";

export default async function TripPage() {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return <EmptyState title="Unauthorized" subtitle="Please Login" />;
  }
  const reservations = await getReservations({ userId: currentUser?.id });

  if (reservations.length === 0) {
    return (
      <EmptyState
        title="No trips found"
        subtitle="Looks like you haven't reserveed your trips!"
      />
    );
  }

  return (
    <div>
      <TripClient reservations={reservations} currentUser={currentUser} />
    </div>
  );
}
