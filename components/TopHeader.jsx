import Image from "next/image";
import React from "react";

export default function TopHeader() {
  return (
    <div className="flex justify-center gap-[10px] flex-wrap items-center">
      <div>
        <div className="w-[80px] h-[80px] rounded-full overflow-hidden relative">
          <Image
            src={"/images/ajanthasir.png"}
            fill
            alt="aja"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
      <div>
        <h1 className="font-bold text-2xl text-primary-200">
          Report difficult homework questions.{" "}
        </h1>
        <p className="font-semibold text-md text-text">Ajantha Dissanayake</p>
      </div>
    </div>
  );
}
