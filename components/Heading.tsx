"use client";
import React from "react";

interface HeadingProps {
  title: string;
  subtitle?: string;
  center?: boolean;
}

export default function Heading({ title, subtitle, center }: HeadingProps) {
  return (
    <div className={center ? "text-center" : "text-start"}>
      <h2 className="text-2xl font-bold">{title}</h2>
      <div className="mt-2 text-light text-neutral-500">{subtitle}</div>
    </div>
  );
}
