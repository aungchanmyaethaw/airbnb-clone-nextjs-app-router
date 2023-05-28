"use client";
import Container from "@/components/Container";
import Heading from "@/components/Heading";
import ListingCard from "@/components/listings/ListingCard";
import { Listing, User } from "@prisma/client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useCallback, useState } from "react";
import { toast } from "react-hot-toast";

interface PropertiesClientProps {
  listings: Listing[];
  currentUser?: User | null;
}

export default function PropertiesClient({
  listings,
  currentUser,
}: PropertiesClientProps) {
  const router = useRouter();
  const [deletingId, setDeleteingId] = useState("");

  const onCancel = useCallback(async (id: string) => {
    setDeleteingId(id);

    try {
      await axios.delete(`/api/listings/${id}`);
      toast.success("Property deleted.");
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
        {listings.map((listing) => (
          <ListingCard
            key={listing.id}
            listing={listing}
            onAction={onCancel}
            disabled={deletingId === listing?.id}
            actionId={listing.id}
            actionLabel="Delete property"
            currentUser={currentUser}
          />
        ))}
      </div>
    </Container>
  );
}
