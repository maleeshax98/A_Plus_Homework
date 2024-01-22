import Image from "next/image";
import React from "react";

export default function Loading() {
  return (
    <div>
      <center>
        <Image
          src={"/icons/spinner2.svg"}
          width={50}
          height={50}
          alt="spinner"
          className="animate-spin"
        />
        <h1 className="text-primary-200 text-center">Loading...</h1>
      </center>
    </div>
  );
}
 