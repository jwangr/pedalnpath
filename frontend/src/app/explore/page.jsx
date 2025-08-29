"use client";

import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/components/Map"), {
  ssr: false,
});

export default function Explore() {
  return (
    <div>
      <DynamicMapComponent />
    </div>
  );
}


