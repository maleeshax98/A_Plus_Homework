import React, { useState } from "react";
import Loading from "../Loading";
import Image from "next/image";
import Papa from "papaparse";

export default function ReportTable({ rows }) {
  // console.log(rows);
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
    const fileName = `${formattedDateTime}.csv`;

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div>
      <div>
        <h1 className="text-center text-primary-200 font-bold text-xl">
          All Requests
        </h1>
        <center>
          <button
            onClick={handleDownload}
            className="p-2 mb-3 ml-3 mt-[10px]  rounded-lg font-semibold bg-primary-200 text-primary-100"
          >
            Download Results as CSV
          </button>
        </center>
        <table className=" rounded-lg ">
          <thead>
            <tr className="rounded-t-lg">
              <th className="p-2  bg-[#F4F4F5]">Tute/Paper</th>
              <th className="p-2  bg-[#F4F4F5]">Main Q. Number</th>
              <th className="p-2  bg-[#F4F4F5]">Sub Q. Number</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <React.Fragment key={row.id}>
                <tr>
                  <td className="bg-[#F4F4F5]" colSpan={3}>
                    <div>
                      <p className="">
                        {row.userName} {"'"}s Questions
                      </p>
                    </div>
                  </td>
                </tr>
                {row.rows.map((q, index) => (
                  <tr key={index}>
                    <td>{q.hmName}</td>
                    <td>
                      {"("}
                      {q.main}
                      {")"}
                    </td>
                    <td>{q.sub}</td>
                  </tr>
                ))}
              </React.Fragment>
            ))}
          </tbody>
        </table>
        {rows.length <= 0 && (
          <div>
            <center>
              <p>No data found!</p>
            </center>
          </div>
        )}
      </div>
    </div>
  );
}
