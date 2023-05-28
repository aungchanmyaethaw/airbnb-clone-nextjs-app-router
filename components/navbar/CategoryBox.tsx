"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useCallback } from "react";
import { IconType } from "react-icons";
import queryString from "query-string";

interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}

export default function CategoryBox({
  icon: Icon,
  label,
  selected,
}: CategoryBoxProps) {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      category: label,
    };

    if (params?.get("category") === label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      { url: "/", query: updatedQuery },
      { skipNull: true }
    );

    router.push(url);
  }, [label, params, router]);

  return (
    <article
      onClick={handleClick}
      className={`flex flex-col items-center gap-2 p-3 transition border-b-2 cursor-pointer hover:text-neutral-800 ${
        selected
          ? "border-b-neutral-800 text-neutral-800"
          : "border-b-transparent text-neutral-500"
      }`}
    >
      <Icon size={26} />
      <span className="text-sm font-medium">{label}</span>
    </article>
  );
}
