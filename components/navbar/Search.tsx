"use client";
import useCountries from "@/hooks/useCountries";
import useSearchModal from "@/hooks/useSearchModal";
import { differenceInDays } from "date-fns";
import { useSearchParams } from "next/navigation";
import React, { useMemo } from "react";
import { BiSearch } from "react-icons/bi";
export default function Search() {
  const searchModal = useSearchModal();
  const params = useSearchParams();
  const guestCount = params?.get("guestCount");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const location = params?.get("locationValue");
  const { getByValue } = useCountries();

  const dateLabel = useMemo(() => {
    if (!startDate || !endDate) {
      return "Any Week";
    }

    let diff = differenceInDays(new Date(endDate), new Date(startDate));

    if (diff === 0) {
      diff = 1;
    }

    return diff === 1 ? "1 day" : `${diff} days`;
  }, [startDate, endDate, params, getByValue]);

  const locationLabel = useMemo(() => {
    if (!location) {
      return "Anywhere";
    }

    return getByValue(location as string)?.label;
  }, [params, location, searchModal]);

  const guestsLabel = useMemo(() => {
    if (!guestCount) {
      return "Add guests";
    }

    const tempLabel =
      parseInt(guestCount) > 1 ? `${guestCount} guests` : "1 guest";

    return tempLabel;
  }, [guestCount, params, searchModal]);

  return (
    <div
      className="border-[1px] w-full md:w-auto py-2 rounded-full shadow-sm hover:shadow-md transition cursor-pointer"
      onClick={searchModal.onOpen}
    >
      <div className="flex items-center justify-between">
        <div className="px-6 text-sm font-semibold">{locationLabel}</div>
        <div className="hidden sm:block text-sm font-semibold px-6 border-x-[1px] flex-1 text-center">
          {dateLabel}
        </div>
        <div className="flex flex-row items-center gap-3 pl-6 pr-2 text-sm text-gray-600">
          <div className="hidden sm:block">{guestsLabel}</div>
          <div className="p-2 text-white rounded-full bg-rose-500">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>
  );
}
