"use client";
import { getExamYears } from "@/actions/action";
import { deleteData, getSummarizedData } from "@/actions/admin/action";
import SummarizedChart from "@/components/Admin/SummarizedChart";
import Loading from "@/components/Loading";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Options from "@/components/Admin/Options";
import Empty from "@/components/Admin/Empty";
import Topbar from "@/components/Admin/Topbar";
import Header from "@/components/Admin/Header";

export default function Dashboard() {
  const [examYears, setExamYears] = useState([]);
  const [selectedExamYear, setSelectedExamYear] = useState(
    examYears.length > 0 ? examYears[0].examyear : null
  );

  const [summarizedData, setSummarizedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [reRun, setReRun] = useState(0);

  useEffect(() => {
    const run = async () => {
      const res = await getExamYears();
      setExamYears(res?.years);
      setInitialLoaded(true);
    };
    run();
  }, [reRun]);

  useEffect(() => {
    const run = async () => {
      if (selectedExamYear) {
        setLoaded(false);
        const res = await getSummarizedData(selectedExamYear);
        setSummarizedData(res?.data);
        setRequestsCount(res?.count);
        setAllData(res?.allData);
        setLoaded(true);
      }
    };
    run();
  }, [selectedExamYear, reRun]);

  const deleteWeekData = async () => {
    if (selectedExamYear) {
      toast.success("Deleting Data...", {
        style: {
          border: "1px solid #DE5353",
          padding: "16px",
          color: "#DE5353",
        },
        iconTheme: {
          primary: "#DE5353",
          secondary: "#DE5353",
        },
      });
      const res = await deleteData(selectedExamYear);
      if (res?.success) {
        toast.success(res?.success);
        setLoaded(false);
        setAllData([]);
        setSelectedExamYear(null);
      } else {
        toast.error("Something went wrong!");
      }
    }
  };

  if (!initialLoaded) {
    return (
      <div className="h-screen flex flex-col justify-center items-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="max-w-7xl p-6 mx-auto">
      <Header />
      <Topbar
        selectedExamYear={selectedExamYear}
        setSelectedExamYear={setSelectedExamYear}
        examYears={examYears}
        setReRun={setReRun}
      />
      {loaded ? (
        <>
          <div>
            {allData.length > 0 && (
              <div className="">
                <center>
                  <Options
                    deleteWeekData={deleteWeekData}
                    examYear={selectedExamYear}
                    rows={allData}
                    setReRun={setReRun}
                  />
                </center>
                <div className="mt-[10px]">
                  <SummarizedChart
                    data={summarizedData}
                    requestsCount={requestsCount}
                  />
                </div>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="h-screen flex flex-col justify-center items-center">
          <Loading />
        </div>
      )}

      {allData.length <= 0 && loaded && (
        <>
          <Empty />
        </>
      )}
    </div>
  );
}
