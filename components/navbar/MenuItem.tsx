"use client";
import React from "react";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

export default function MenuItem({ label, onClick }: MenuItemProps) {
  return (
    <div
      className="px-4 py-3 font-semibold transition hover:bg-neutral-100"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
