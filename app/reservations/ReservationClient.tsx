"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, Reservation, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface MyReservation extends Reservation {
  listing: Listing;
}

interface ReservationClient {
  reservations: MyReservation[];
  currentUser?: User | null;
}

export default function TripClient({
  reservations,
  currentUser,
}: ReservationClient) {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");

  const onCancel = useCallback(async (id: string) => {
    setDeleteingId(id);

    try {
      await axios.delete(`/api/reservations/${id}`);
      toast.success("Reservation cancelled.");
      router.refresh();
    } catch (error: any) {
      toast.error(error?.reponse?.data?.error);
    } finally {
      setDeleteingId("");
    }
  }, []);

  return (
    <Container>
      <Heading
        title="My Reservations"
        subtitle="Where you've been nd where you're going"
      />
      <div className="grid grid-cols-1 gap-8 mt-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 ">
        {reservations.map((reservation) => (
          <ListingCard
            key={reservation.id}
            reservation={reservation}
            listing={reservation.listing}
            onAction={onCancel}
            disabled={deletingId === reservation?.id}
            actionId={reservation.id}
            actionLabel="Cancel guest  reservation"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
