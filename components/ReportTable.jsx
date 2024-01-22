"use client";
import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";
import { DeleteIcon } from "./DeleteIcon";
import Image from "next/image";

export default function ReportTable({ columns, rows, setRows }) {
  const deleteQ = (key) => {
    const qs = rows.filter((r) => {
      return r.key !== key;
    });

    setRows(qs);
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        {columns.map((c) => (
          <TableColumn key={c.key}>{c.label}</TableColumn>
        ))}
        <TableColumn>ACTION</TableColumn>
      </TableHeader>
      <TableBody>
        {rows.map((r) => (
          <TableRow key={r.key}>
            <TableCell>{r.main}</TableCell>
            <TableCell>{r.sub}</TableCell>
            <TableCell>{r.hmName}</TableCell>
            <TableCell>
              <div
                onClick={() => deleteQ(r.key)}
                className="bg-primary-200 flex items-center justify-center p-1 rounded-lg"
              >
                <Image
                  src={"/icons/delete.svg"}
                  alt="delete icon"
                  width={20}
                  height={20}
                />
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
