import { Category } from "@/app/listings/[listingId]/ListingClient";
import React from "react";

export default function ListingCategory({
  icon: Icon,
  label,
  description,
}: Category) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <span className="text-lg font-semibold">{label}</span>
          <p className="font-light text-neutral-500">{description}</p>
        </div>
      </div>
    </div>
  );
}
