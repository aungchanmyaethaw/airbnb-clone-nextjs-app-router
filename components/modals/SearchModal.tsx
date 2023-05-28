"use client";
import React, { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import dynamic from "next/dynamic";
import useSearchModal from "@/hooks/useSearchModal";
import Modal from "./Modal";
import Heading from "../Heading";
import CountrySelect, { CountrySelectValue } from "../inputs/CountrySelect";
import queryString from "query-string";
import { Range } from "react-date-range";
import { formatISO } from "date-fns";
import Calendar from "../inputs/Calendar";
import Counter from "../Counter";

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();
  const [steps, setSteps] = useState<STEPS>(STEPS.LOCATION);
  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  });

  const Map = useMemo(
    () => dynamic(() => import("../Map"), { ssr: false }),
    [location]
  );

  const onNext = useCallback(() => {
    setSteps((prev) => prev + 1);
  }, []);

  const onBack = useCallback(() => {
    setSteps((prev) => prev - 1);
  }, []);

  const onSubmit = useCallback(() => {
    if (steps === STEPS.INFO) {
      let currentQuery: any = {};

      if (params) {
        currentQuery = {
          ...currentQuery,
          locationValue: location?.value,
          guestCount,
          roomCount,
          bathroomCount,
        };
      }

      if (dateRange.startDate) {
        currentQuery.startDate = formatISO(dateRange.startDate);
      }

      if (dateRange.endDate) {
        currentQuery.endDate = formatISO(dateRange.endDate);
      }

      const url = queryString.stringifyUrl(
        { url: "/", query: currentQuery },
        { skipNull: true }
      );

      setSteps(STEPS.LOCATION);
      router.push(url);
      searchModal.onClose();
    } else {
      onNext();
    }
  }, [
    steps,
    router,
    location,
    searchModal,
    roomCount,
    bathroomCount,
    dateRange,
    guestCount,
    params,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (steps !== STEPS.INFO) {
      return "Next";
    } else {
      return "Search";
    }
  }, [steps]);

  const secondaryLabel = useMemo(() => {
    if (steps === STEPS.LOCATION) {
      return undefined;
    } else {
      return "Back";
    }
  }, [steps]);

  let body = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you wanna go?"
        subtitle="Find the best location!"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />

      <Map center={location?.latlng} />
    </div>
  );

  if (steps === STEPS.DATE) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading
          title="When do you plan to go?"
          subtitle="Make sure everyone is free!"
        />
        <Calendar
          onChange={(value) => setDateRange(value.selection)}
          value={dateRange}
        />
      </div>
    );
  }

  if (steps === STEPS.INFO) {
    body = (
      <div className="flex flex-col gap-8">
        <Heading title="More information" subtitle="Find your perfect place!" />
        <Counter
          title="Guests"
          subtitle="How many guest are you coming?"
          value={guestCount}
          onChange={(value) => {
            setGuestCount(value);
          }}
        />
        <hr />
        <Counter
          title="Rooms"
          subtitle="How many rooms do you need?"
          value={roomCount}
          onChange={(value) => {
            setRoomCount(value);
          }}
        />
        <hr />
        <Counter
          title="Bathrooms"
          subtitle="How many bathrooms do you need?"
          value={bathroomCount}
          onChange={(value) => {
            setBathroomCount(value);
          }}
        />
      </div>
    );
  }

  return (
    <Modal
      actionLabel={actionLabel}
      secondaryAction={onBack}
      secondaryLabel={secondaryLabel}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      isOpen={searchModal.isOpen}
      body={body}
    />
  );
}
