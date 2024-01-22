"use client";
import React from "react";
import animation from "@/public/animations/empty.json";
import Lottie from "lottie-react";
export default function Empty() {
  return (
    <div>
      <center>
        <div className="w-[250px] ">
          <Lottie animationData={animation} width={10} />
        </div>
        <p className="">No Data Found!</p>
      </center>
    </div>
  );
}
