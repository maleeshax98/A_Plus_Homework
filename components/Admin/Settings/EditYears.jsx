"use client";
import { getExamYears } from "@/actions/action";
import { deleteExamYear } from "@/actions/admin/action";
import Loading from "@/components/Loading";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function EditYears() {
  const [examYears, setExamYears] = useState([]);

  useEffect(() => {
    const run = async () => {
      const res = await getExamYears();
      setExamYears(res?.years);
    };
    run();
  }, []);

  const deleteYear = async (id) => {
    toast.success("Deleting...");

    const res = await deleteExamYear(id);

    if (res.status === 200) {
      toast.success("Successfully Deleted");
      location.reload();
    } else {
      toast.error("Something went wrong");
    }
  };


  if (examYears.length <= 0) {
    return <Loading />;
  }

  return (
    <div>
      <div className="flex flex-wrap gap-[20px] mt-[20px]">
        {examYears.map((y) => (
          <div
            className="flex gap-[10px] items-center border-1 rounded-lg p-2 font-semibold"
            key={y.id}
          >
            <div>{y.examyear}</div>
            <div
              className="cursor-pointer"
              onClick={() => {
                deleteYear(y.id);
              }}
            >
              <Image
                src={"/icons/remove.svg"}
                width={20}
                height={20}
                alt="remove"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
