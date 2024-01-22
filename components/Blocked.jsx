"use client";
import React from "react";
import animation from "@/public/animations/blocked.json";
import Lottie from "lottie-react";
export default function Blocked() {
  return (
    <div className="h-screen flex flex-col items-center justify-center">
      <div className="w-[250px] h-[250px]">
        <Lottie animationData={animation} width={10} />
      </div>
      <div>
        <h1 className="text-primary-200 text-xl font-bold text-center">
          Website is blocked by admin.
        </h1>
        <h1 className="text-gray-600 text-md font-light text-center">
          Try again another time or try refreshing the page.
        </h1>
      </div>
    </div>
  );
}
