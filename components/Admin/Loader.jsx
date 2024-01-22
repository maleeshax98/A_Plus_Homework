"use client";
import React, { useEffect, useState } from "react";
import { CircularProgress } from "@nextui-org/react";

export default function Loader({ data, count }) {
  
  const [percentage, setPercentage] = useState(0);
  useEffect(() => {
    var studentsWithVotes = data.count;
    var totalStudents = count;
    var percentage = Math.round((studentsWithVotes / totalStudents) * 100);

    setPercentage(percentage);
  }, [data]);

  return (
    <div>
      <div className="p-3 rounded-md min-w-[163px] loader_shadow m-[10px]">
        <div>
          <center>
            <CircularProgress
              aria-label="Loading..."
              size="lg"
              value={percentage}
              color="danger"
              showValueLabel={true}
            />
          </center>
        </div>
        <div className="text-sm mt-[10px]">
          <p>
            Tute/Paper - <span className="font-bold">{data.hmName}</span>{" "}
          </p>
          <p>
            Main.Q - <span className="font-bold">{data.main}</span>{" "}
          </p>
          <p>
            Sub.Q - <span className="font-bold">{data.sub}</span>{" "}
          </p>
        </div>
      </div>
    </div>
  );
}
