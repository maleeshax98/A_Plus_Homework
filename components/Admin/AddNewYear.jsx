"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  Input,
} from "@nextui-org/react";
import { addNewYear } from "@/actions/admin/action";
import toast from "react-hot-toast";

export default function AddNewYear({ isOpen, onOpenChange, setReRun }) {
  const [year, setYear] = useState("");
  const [loading, setLoading] = useState("");

  const addYear = async () => {
    setLoading(true);
    const res = await addNewYear(year);
    if (res?.success) {
      toast.success(res?.success);
    } else {
      toast.error("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        classNames={{
          backdrop:
            "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-primary-200 text-lg">
                Add a year{" "}
              </ModalHeader>
              <ModalBody>
                <div className="mt-[20px]  ">
                  <Input
                    type="text"
                    label="Enter Year"
                    className="w-full"
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    onClear={() => setYear("")}
                    isClearable
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button className="" onPress={onClose}>
                  Close
                </Button>
                <Button
                  className="bg-primary-200 text-white"
                  onPress={async () => {
                    await addYear();
                    onClose();
                    setReRun((prev) => prev + 1);
                  }}
                >
                  {loading ? "Adding..." : "Add Year"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
