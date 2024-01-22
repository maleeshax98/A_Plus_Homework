"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
export default function DeleteWarning({
  onOpen,
  isOpen,
  onOpenChange,
  deleteWeekData,
  examYear,
}) {
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
                Warning{" "}
              </ModalHeader>
              <ModalBody>
                <p>
                  It is recommended to download your data before deletion. If
                  you have already done so, proceed with the deletion.
                  Otherwise, you will lose your data.
                </p>
                <p className="font-bold text-center text-primary-200 text-lg">
                  You're deleting {examYear} A/L data!
                </p>
              </ModalBody>
              <ModalFooter>
                <Button className="" onPress={onClose}>
                  No Close!
                </Button>
                <Button
                  className="bg-primary-200 text-white"
                  onPress={async () => {
                    deleteWeekData();
                    onClose();
                  }}
                >
                  Delete Now!
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
