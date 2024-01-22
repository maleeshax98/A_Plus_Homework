"use client";
import { getExamYears } from "@/actions/action";
import {
  changeWebStatus,
  deleteData,
  getSummarizedData,
  getWebStatus,
} from "@/actions/admin/action";
import ButtonGroup from "@/components/Admin/ButtonGroup";
import ReportTable from "@/components/Admin/ReportTable";
import SummarizedChart from "@/components/Admin/SummarizedChart";
import Loading from "@/components/Loading";
import { Tabs, Tab, Card, CardBody, CardHeader } from "@nextui-org/react";
import { signOut } from "next-auth/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { Switch } from "@nextui-org/react";
import toast from "react-hot-toast";
import WebStatus from "@/components/Admin/WebStatus";

export default function DashboardOld() {
  const [examYears, setExamYears] = useState([]);
  const [selectedExamYear, setSelectedExamYear] = useState(
    examYears.length > 0 ? examYears[0].examyear : null
  );

  const [summarizedData, setSummarizedData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [requestsCount, setRequestsCount] = useState(0);
  const [loaded, setLoaded] = useState(false);
  const [initialLoaded, setInitialLoaded] = useState(false);
  const [filter, setFilter] = useState("summery");

  useEffect(() => {
    const run = async () => {
      const res = await getExamYears();
      setExamYears(res?.years);
      setInitialLoaded(true);
    };
    run();
  }, []);

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
  }, [selectedExamYear]);

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
        // Update state instead of location.reload()
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
          <div className="p-2 rounded-lg loader_shadow">
            <WebStatus />
          </div>
        </div>
        <button
          onClick={() => {
            deleteWeekData();
          }}
          className="p-2 mb-3 ml-3 mt-[10px] absolute top-0 left-0 m-2   rounded-lg font-semibold bg-primary-200 text-primary-100"
        >
          Delete {selectedExamYear} Data
        </button>
      </center>
      <div className="flex justify-center items-center w-full  flex-col mt-[20px]">
        <Tabs
          aria-label="Options"
          selectedKey={selectedExamYear}
          onSelectionChange={setSelectedExamYear}
        >
          {examYears.map((examYear, index) => (
            <Tab key={examYear.examyear} title={examYear.examyear}></Tab>
          ))}
        </Tabs>
      </div>
      {loaded ? (
        <>
          <div>
            <div className="mt-[20px]">
              <ButtonGroup filter={filter} setFilter={setFilter} />
            </div>

            {allData.length > 0 && (
              <>
                {filter === "summery" ? (
                  <SummarizedChart
                    data={summarizedData}
                    requestsCount={requestsCount}
                  />
                ) : (
                  <>
                    <ReportTable rows={allData} />
                  </>
                )}
              </>
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
          <center>
            <p className="mt-[20px]">No data found!</p>
          </center>
        </>
      )}
    </div>
  );
}
