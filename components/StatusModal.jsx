"use client"
import Image from "next/image";
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import 'animate.css';

export default function StatusModal({ status }) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  useEffect(() => {
    onOpen()
  }, []);
  return (
    <div>
      <Modal
        backdrop="opaque"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          body: "py-6",
          closeButton: "hidden",
        }}
        isDismissable={false}
      >
        <ModalContent>
          {(onClose) => (
            <>
              {status === "loading" && (
                <div className="p-6">
                  <center>
                    <Image
                      src={"/icons/spinner2.svg"}
                      width={50}
                      height={50}
                      alt="spinner"
                      className="animate-spin"
                    />
                    <h1 className="text-primary-200 font-semibold animate-pulse text-xl">
                      Adding Questions...
                    </h1>
                    <p className="text-sm text-gray-400">
                      Please wait a moment!
                    </p>
                  </center>
                </div>
              )}
              {status === "done" && (
                <>
                  <div className="p-6">
                    <center>
                      <Image
                        src={"/icons/success.svg"}
                        width={90}
                        height={90}
                        alt="spinner"
                        className="animate__shakeY"
                      />

                      <h1 className="animate__shakeY font-bold text-primary-200 mt-[10px] text-xl">
                        Successfully Added
                      </h1>
                      <p className="text-sm text-gray-400">
                        දැන් ගිහින් වැඩ කරපන්!
                      </p>
                    </center>
                  </div>
                  <ModalFooter>
                    <Button
                      color="foreground"
                      variant="light"
                      // onPress={onClose}
                      onClick={() => {
                        location.reload()
                      }}
                    >
                      Close
                    </Button>
                  </ModalFooter>
                </>
              )}
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
}
