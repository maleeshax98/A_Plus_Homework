import React from "react";
import dynamic from "next/dynamic";
import { Button } from "@nextui-org/react";

const NoSSR = dynamic(() => import("./no-ssr"), { ssr: false });

export default function MainButton() {
  return (
    <Button
      color="primary-200"
      className="bg-primary-200 font-semibold text-white mt-[10px]"
      variant="solid"
      onClick={() => {
        insertData(mainNumber, subNumber);
      }}
      isLoading
    >
      Add question
    </Button>
  );
}
