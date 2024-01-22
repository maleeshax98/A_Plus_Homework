"use client";
import React, { useState } from "react";
import { Tooltip } from "@nextui-org/react";
import Image from "next/image";
import DeleteWarning from "./DeleteWarning";
import { useDisclosure } from "@nextui-org/react";
import Papa from "papaparse";
import toast from "react-hot-toast";
import { signOut } from "next-auth/react";

export default function Options({ deleteWeekData, examYear, rows, setReRun }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const data = rows;

  const handleDownload = () => {
    const rows = data.flatMap((item) =>
      item.rows.map((row) => ({
        "Student Name": item.userName,
        "Main Q.": row.main,
        "Sub Q.": row.sub,
        "Tute/Paper": row.hmName,
      }))
    );

    const columns = ["Student Name", "Main Q.", "Sub Q.", "Tute/Paper"];

    const csv = Papa.unparse({ fields: columns, data: rows });

    const formattedDateTime = new Date().toISOString().replace(/[:.]/g, "_");
    const fileName = `${examYear}_Student_Homework_${formattedDateTime}.csv`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast.success("Data downloaded");
  };

  return (
    <div>
      <DeleteWarning
        onOpen={onOpen}
        onOpenChange={onOpenChange}
        isOpen={isOpen}
        deleteWeekData={deleteWeekData}
        examYear={examYear}
      />
      <div className="flex  justify-center items-center gap-[10px] rounded-lg loader_shadow p-1 mt-[20px] max-w-[291px]">
        <Tooltip content="Download Data">
          <div
            className="bg-primary-200 rounded-md p-2 cursor-pointer hover:opacity-80"
            onClick={handleDownload}
          >
            <Image
              src={"/icons/download.svg"}
              width={25}
              height={20}
              alt="delete icon"
            />
          </div>
        </Tooltip>
        <Tooltip content="Refresh Data">
          <div
            className="bg-primary-200 rounded-md p-2 cursor-pointer hover:opacity-80"
            onClick={() => {
              // location.reload();
              setReRun((prev) => prev + 1);
            }}
          >
            <Image
              src={"/icons/refresh.svg"}
              width={25}
              height={20}
              alt="delete icon"
            />
          </div>
        </Tooltip>
        <Tooltip content="Delete Data">
          <div
            className="bg-primary-200 rounded-md p-2 cursor-pointer hover:opacity-80"
            onClick={() => {
              onOpen(true);
            }}
          >
            <Image
              src={"/icons/delete.svg"}
              width={25}
              height={20}
              alt="delete icon"
            />
          </div>
        </Tooltip>
        <Tooltip content="Logout">
          <div
            className="bg-primary-200 rounded-md p-2 cursor-pointer hover:opacity-80"
            onClick={() => {
              signOut();
            }}
          >
            <Image
              src={"/icons/logout-line.svg"}
              width={25}
              height={20}
              alt="delete icon"
            />
          </div>
        </Tooltip>
      </div>
    </div>
  );
}
