"use client";
import useFavourites from "@/hooks/useFavourites";
import { User } from "@prisma/client";
import React from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

declare module "@prisma/client" {
  interface user {
    hashedPassword: string;
  }
}

interface HeartButtonProps {
  listingId: string;
  currentUser?: User | null;
}

export default function HeartButton({
  listingId,
  currentUser,
}: HeartButtonProps) {
  const { hasFavourite, toggleFavourite } = useFavourites({
    listingId,
    currentUser,
  });

  return (
    <button
      className="transition cursor-pointer hover:opacity-80"
      onClick={toggleFavourite}
    >
      <AiOutlineHeart
        size={28}
        className="absolute -top-[2px] -right-[1px] fill-white"
      />
      <AiFillHeart
        size={26}
        className={` ${
          hasFavourite() ? "fill-rose-500" : "fill-neutral-500/70"
        }`}
      />
    </button>
  );
}
