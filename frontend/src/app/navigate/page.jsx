"use client";

import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/components/Directions"), {
  ssr: false,
});

export default function Navigate() {
  return (
    <div>
      <DynamicMapComponent />
    </div>
  );
}