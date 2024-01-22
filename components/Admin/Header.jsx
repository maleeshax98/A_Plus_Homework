"use client"
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";

export default function Header() {
  return (
    <div>
      <center>
        <p className="text-primary-200 font-bold text-xl  mt-[25px] md:mt-[0px]">
          Admin Panel
        </p>
        <div className=" absolute top-0 right-0 m-2 flex gap-[10px] items-center">
          <Image
            src={"/icons/logout.svg"}
            width={30}
            height={30}
            alt="logout"
            onClick={() => {
              signOut();
            }}
            className="hover:opacity-70 cursor-pointer"
          />
        </div>
      </center>
    </div>
  );
}
