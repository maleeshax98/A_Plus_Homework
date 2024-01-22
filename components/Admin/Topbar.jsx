import React from "react";
import {
  Tabs,
  Tab,
  Card,
  CardBody,
  CardHeader,
  useDisclosure,
} from "@nextui-org/react";
import AddNewYear from "./AddNewYear";

export default function Topbar({
  selectedExamYear,
  setSelectedExamYear,
  examYears,
  setReRun
}) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <div>
      <AddNewYear onOpen={onOpen} onOpenChange={onOpenChange} isOpen={isOpen} setReRun={setReRun}/>
      <div className="flex justify-center items-center w-full gap-[10px] flex-wrap mt-[20px]">
        <div>
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
        <div>
          <button
            className="font-semibold bg-[#EDEDEE] p-2 rounded-lg"
            onClick={() => {
              onOpen(true);
            }}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
