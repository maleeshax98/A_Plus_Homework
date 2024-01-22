"use client";
import Image from "next/image";
import {
  Avatar,
  Input,
  Button,
  Textarea,
  Select,
  SelectItem,
} from "@nextui-org/react";
import ReportTable from "../components/ReportTable";
import { Suspense, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { addData, getExamYears } from "@/actions/action";
import AddButton from "@/components/AddButton";
import Modal from "@/components/StatusModal";
import Loading from "@/components/Loading";
import Success from "@/components/Success";
import StatusModal from "@/components/StatusModal";
import TopHeader from "@/components/TopHeader";
import { getWebStatus } from "@/actions/admin/action";
import Blocked from "@/components/Blocked";

const columns = [
  {
    key: "main",
    label: "MAIN Q.NUMBER",
  },
  {
    key: "sub",
    label: "SUB Q.NUMBER",
  },
  {
    key: "hmName",
    label: "TUTE/PAPER",
  },
];

// const years = [
//   {
//     key: "2024",
//     label: "2024",
//   },
//   {
//     key: "2025",
//     label: "2025",
//   },
// ];

export default function Home() {
  const [rows, setRows] = useState([]);
  const [mainNumber, setMainNumber] = useState("");
  const [subNumber, setSubNumber] = useState("");
  const [adding, setAdding] = useState(false);

  const [hmName, setHmName] = useState("");
  const [stName, setStName] = useState("");

  const [examYear, setExamYear] = useState("2025");
  const [examYears, setExamYears] = useState([]);

  const [access, setAccess] = useState(null);

  useEffect(() => {
    const run = async () => {
      const res = await getExamYears();
      setExamYears(res?.years);
      setExamYear(res?.years[1].examyear);
    };

    run();
  }, []);

  useEffect(() => {
    const run = async () => {
      const res = await getWebStatus();
      if (res.status) {
        setAccess(true);
      } else {
        setAccess(false);
      }
    };

    run();
  }, []);

  console.log(access);

  const [isPending, setIsPending] = useState(false);
  const [status, setStatus] = useState("pending");

  const insertData = (main, sub) => {
    setAdding(true);

    if (!stName.trim()) {
      toast.error("Please enter your name");
      setAdding(false);
      return;
    }

    if (!hmName.trim()) {
      toast.error("Please enter tute/paper name");
      setAdding(false);
      return;
    }

    if (!main.trim()) {
      toast.error("Please enter main question number");
      setAdding(false);
      return;
    }

    if (!sub.trim()) {
      toast.error("Please enter sub question number");
      setAdding(false);
      return;
    }

    const length = rows.length;
    const newKey = length + 1;
    const data = {
      key: newKey,
      main: main,
      sub: sub,
      hmName: hmName,
    };

    setRows((prev) => [...prev, data]);
    setSubNumber("");
    setAdding(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      // You can also call your form submission logic here if needed
      console.log("Enter key pressed!");
    }
  };

  if (access === null) {
    return (
      <div className="h-screen flex items-center justify-center">
        {" "}
        <Loading />{" "}
      </div>
    );
  }

  if (access === false) {
    return <Blocked />;
  }

  return (
    <main className="">
      <div className=" max-w-[750px] mx-auto  p-2 m-2 rounded-lg shadow-sm">
        <TopHeader />
        <br />
        <hr />
        <br />
        {examYears.length <= 0 ? (
          <>
            <Loading />
          </>
        ) : (
          <>
            {isPending ? (
              <>
                {status !== "done" ? (
                  <StatusModal status={"loading"} />
                ) : (
                  <>{status === "done" && <StatusModal status={"done"} />}</>
                )}
              </>
            ) : (
              <></>
            )}
            <form
              action={async (formData) => {
                setIsPending(true);
                setStatus("pending");
                console.log(isPending);
                const res = await addData(rows, formData);
                if (res?.error) {
                  toast.error(res.error);
                  setIsPending(false);
                  setStatus("pending");
                }

                if (res?.success === true) {
                  setStatus("done");
                }
              }}
              onKeyPress={handleKeyPress}
            >
              <div>
                <Select
                  items={examYears}
                  label="Exam Year"
                  placeholder="Select your exam year"
                  selectedKeys={[examYear]}
                  onChange={(e) => {
                    setExamYear(e.target.value);
                  }}
                  name="examYear"
                >
                  {(year) => (
                    <SelectItem
                      key={year.examyear}
                      value={year.examyear.toString()}
                    >
                      {year.examyear.toString()}
                    </SelectItem>
                  )}
                </Select>
              </div>
              <div className="flex flex-col sm:flex-row gap-[20px] flex-wrap ">
                <div className="mt-[20px]  flex-1">
                  <Input
                    type="text"
                    label="ඔබේ නම"
                    className=" relative w-full"
                    isClearable
                    value={stName}
                    onChange={(e) => setStName(e.target.value)}
                    onClear={() => setStName("")}
                    name="studentName"
                  />
                </div>
                <div className="mt-[20px]  flex-1">
                  <Input
                    type="text"
                    label="ටියුට්/ප්‍රශ්න පත්‍ර නම"
                    className="w-full"
                    value={hmName}
                    onChange={(e) => setHmName(e.target.value)}
                    onClear={() => setHmName("")}
                    isClearable
                  />
                </div>
              </div>
              <div className="mt-[20px] ">
                <div className="flex flex-col sm:flex-row gap-[20px] flex-wrap">
                  <div className="mt-[20px]  flex-1">
                    <Input
                      type="text"
                      label="ප්‍රධාන ප්‍රශ්න අංකය උදා:- 7"
                      className=" relative w-full"
                      value={mainNumber}
                      onChange={(e) => setMainNumber(e.target.value)}
                      onClear={() => setMainNumber("")}
                      isClearable
                    />
                  </div>
                  <div className="mt-[20px]  flex-1">
                    <Input
                      type="text"
                      label="උප ප්‍රශ්න අංකය උදා:- iv"
                      className="w-full"
                      value={subNumber}
                      onChange={(e) => setSubNumber(e.target.value)}
                      onClear={() => setSubNumber("")}
                      isClearable
                    />
                  </div>
                </div>
                <Button
                  color="primary-200"
                  className="bg-primary-200 font-semibold text-white mt-[10px]"
                  variant="solid"
                  onClick={() => {
                    insertData(mainNumber, subNumber);
                  }}
                  isDisabled={adding}
                >
                  {adding ? (
                    <div className="flex gap-[10px] items-center justify-center">
                      <Image
                        src={"/icons/spinner.svg"}
                        className="animate-spin"
                        width={20}
                        height={20}
                        alt="spinner"
                      />
                      <p>Adding...</p>
                    </div>
                  ) : (
                    // "Add question"
                    <>
                      <div className="flex items-center flex-wrap gap-[5px] justify-center">
                        <p>Add</p>
                        <Image
                          src={"/icons/add.svg"}
                          width={25}
                          height={25}
                          alt="add"
                        />
                      </div>
                    </>
                  )}
                </Button>
              </div>
              <div className="mt-[20px]">
                <ReportTable columns={columns} rows={rows} setRows={setRows} />
              </div>

              <div className="mt-[20px]">
                <center>
                  <AddButton setIsPending={setIsPending} />
                </center>
              </div>
            </form>
          </>
        )}
      </div>
    </main>
  );
}
