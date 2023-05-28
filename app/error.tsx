"use client";

import EmptyState from "@/components/EmptyState";
import { useEffect } from "react";

interface ErrorProps {
  error: Error;
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.log("error");
  }, [error]);

  return <EmptyState title="Uh Oh" subtitle="Something went wrong!" />;
}
