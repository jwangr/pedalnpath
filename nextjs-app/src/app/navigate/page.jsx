"use client";

import dynamic from "next/dynamic";
const DynamicMapComponent = dynamic(() => import("@/components/maps/NavigatePageMap"), {
  ssr: false,
});

export default function Navigate() {
  return (
    <div>
      <DynamicMapComponent />
    </div>
  );
}