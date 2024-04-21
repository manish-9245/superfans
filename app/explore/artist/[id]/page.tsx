"use client";
import Artist from "@/components/Explore/artist";
import { UUID } from "crypto";
import React from "react";

export default function Page({ params }: { params: { id: UUID } }) {
  return (
    <section className="relative mt-16 min-h-screen overflow-hidden pt-16 md:pt-20">
      <Artist id={params.id} />
    </section>
  );
}