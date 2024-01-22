"use client";
import React from "react";
import Loader from "./Loader";

export default function SummarizedChart({ data, requestsCount }) {
  return (
    <div>
      <div className="mt-[10px]">
        <center>
          <p className="text-primary-200 font-bold text-xl">
            Summarized Questions
          </p>
        </center>
      </div>
      <div className="flex flex-wrap justify-center items-start gap-[10px] mt-[15px]">
        {data.map((d, index) => (
          <Loader count={requestsCount} data={d} key={index} />
        ))}
      </div>
    </div>
  );
}
