"use client";
import useCountries from "@/hooks/useCountries";
import { Listing, Reservation, User } from "@prisma/client";
import { format } from "date-fns";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useCallback } from "react";
import HeartButton from "./HeartButton";
import Button from "../Button";

declare module "@prisma/client" {
  interface user {
    hashedPassword: string;
  }
}

interface ListingCardProps {
  listing: Listing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  disabled?: boolean;
  actionLabel?: string;
  actionId?: string;
  currentUser?: User | null;
}

export default function ListingCard({
  listing,
  reservation,
  onAction,
  disabled,
  actionId = "",
  actionLabel,
  currentUser,
}: ListingCardProps) {
  const router = useRouter();

  const { getByValue } = useCountries();

  const location = getByValue(listing?.locationValue);

  const price = () => {
    if (reservation) {
      return reservation.totalPrice;
    }

    return listing.price;
  };

  const reservationDate = () => {
    if (!reservation) {
      return null;
    }

    const startDate = new Date(reservation.startDate);
    const endDate = new Date(reservation.endDate);

    return `${format(startDate, "PP")} - ${format(endDate, "PP")}`;
  };

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();
      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [onAction, disabled, actionId]
  );

  return (
    <article
      onClick={() => router.push(`/listings/${listing.id}`)}
      className="col-span-1 cursor-pointer group"
    >
      <div className="flex flex-col w-full gap-2 ">
        <div className="relative w-full overflow-hidden aspect-square rounded-xl">
          <Image
            fill
            src={listing.imageSrc}
            alt="Listing"
            className="object-cover w-full h-full transition group-hover:scale-110"
          />
          <div className="absolute top-3 right-3">
            <HeartButton listingId={listing.id} currentUser={currentUser} />
          </div>
        </div>
        <h4 className="text-lg font-semibold">
          {location?.region}, {location?.label}
        </h4>
        <span className="font-light text-neutral-800 whitespace-nowrap">
          {reservationDate() || listing?.category}
        </span>
        <div className="flex items-center gap-1">
          <span className="font-semibold">$ {price()}</span>
          {!reservation ? (
            <span className="text-sm font-light">night</span>
          ) : null}
        </div>

        {onAction && actionLabel ? (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        ) : null}
      </div>
    </article>
  );
}
