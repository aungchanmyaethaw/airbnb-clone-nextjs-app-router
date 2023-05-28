"use client";
import { User } from "@prisma/client";
import React from "react";
import { Category } from "@/app/listings/[listingId]/ListingClient";
import useCountries from "@/hooks/useCountries";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), { ssr: false });

interface ListinInfoProps {
  user: User | undefined;
  description: string;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  category: Category | undefined;
  locationValue: string;
}

export default function ListingInfo({
  user,
  description,
  guestCount,
  roomCount,
  bathroomCount,
  category,
  locationValue,
}: ListinInfoProps) {
  const { getByValue } = useCountries();

  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <div className="flex flex-col col-span-4 gap-8">
      <div className="flex flex-col gap-2">
        <div className="flex items-center gap-2 text-xl font-semibold">
          <Avatar src={user?.image} />
          <h3>Hosted by {user?.name}</h3>
        </div>
        <div className="flex items-center gap-4 font-light text-neutral-500">
          <span>{guestCount} guests</span>
          <span>{roomCount} rooms</span>
          <span>{bathroomCount} bathrooms</span>
        </div>
        <hr />
        {category ? (
          <ListingCategory
            icon={category.icon}
            label={category.label}
            description={category.description}
          />
        ) : null}
        <hr />
        <p className="text-lg font-light text-neutral-500">{description}</p>
        <hr />
        <Map center={coordinates} />
      </div>
    </div>
  );
}
