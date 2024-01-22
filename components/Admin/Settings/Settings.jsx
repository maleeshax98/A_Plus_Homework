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
} from "@nextui-org/react";
import SettingsTabs from "./SettingsTabs";
import WebStatus from "./WebStatus";
import EditYears from "./EditYears";

const tabs = ["Web Status", "Edit Years"];

export default function Settings({ onOpen, isOpen, onOpenChange }) {
  const [selectedTab, setSelectedTab] = useState("Web Status");
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
        size={"xl"}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 font-bold text-primary-200 text-lg">
                Settings{" "}
              </ModalHeader>
              <ModalBody>
                <SettingsTabs
                  selectedTab={selectedTab}
                  setSelectedTab={setSelectedTab}
                  tablist={tabs}
                />

                {selectedTab === "Web Status" && <WebStatus />}
                {selectedTab === "Edit Years" && <EditYears />}
              </ModalBody>
              <ModalFooter>
                <Button className="" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
