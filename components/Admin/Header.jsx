"use client";
import { signOut } from "next-auth/react";
import Image from "next/image";
import React from "react";
import Settings from "./Settings/Settings";
import { useDisclosure } from "@nextui-org/react";

export default function Header() {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <Settings onOpen={onOpen} onOpenChange={onOpenChange} isOpen={isOpen} />
      <center>
        <p className="text-primary-200 font-bold text-xl  mt-[25px] md:mt-[0px]">
          Admin Panel
        </p>
        <div className=" absolute top-0 right-0 m-2 flex gap-[10px] items-center">
          <Image
            src={"/icons/settings.svg"}
            width={30}
            height={30}
            alt="settings"
            onClick={() => {
              onOpen(true);

            }}
            className="hover:opacity-70 cursor-pointer"
          />
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
