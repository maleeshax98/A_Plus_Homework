import Image from "next/image";
import React from "react";

export default function Success() {
  return (
    <div>
      <center>
      <Image src={"/icons/success.svg"} width={90} height={90} alt='spinner' />

        <h1 className="font-bold text-primary-200 mt-[10px] text-xl">Successfully added</h1>
      </center>
    </div>
  );
}
