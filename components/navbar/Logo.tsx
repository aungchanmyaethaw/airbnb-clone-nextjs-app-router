"use client";
import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
export default function Logo() {
  const router = useRouter();

  return (
    <Image
      onClick={() => router.push("/")}
      className="hidden cursor-pointer md:block"
      src="/images/logo.png"
      height="100"
      width="100"
      alt="Logo"
    />
  );
}
