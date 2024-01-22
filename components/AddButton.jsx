"use client";
import React from "react";
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";

import { useFormStatus } from "react-dom";
import Image from "next/image";

export default function AddButton({ setIsPending }) {
  const { pending } = useFormStatus();

  return (
    <Button
      color="primary-200"
      className="bg-primary-200 font-semibold text-white mt-[10px]"
      variant="solid"
      type="submit"
      name="submit"
      isDisabled={pending}
     
    >
      {pending ? "Adding..." : "Submit Report"}
    </Button>
  );
}
