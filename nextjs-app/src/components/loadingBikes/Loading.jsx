import { Backdrop } from "@mui/material";
import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <>
      <Backdrop sx={{ color: "#bfbfbfff", zIndex: 20 }}></Backdrop>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 animate-bounce w-50 h-50 z-[1000]">
        <Image src="/24356-673ab7.svg" fill alt="loading" />
      </div>
    </>
  );
}
