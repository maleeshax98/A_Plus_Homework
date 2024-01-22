"use client";

import { NextUIProvider } from "@nextui-org/react";

export { NextUIProvider };

export default function ThemeContext({ children }) {
  return <NextUIProvider>{children}</NextUIProvider>;
}
