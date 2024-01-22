import { Inter } from "next/font/google";
import "./globals.css";
import ThemeContext from "../contexts/ThemeContext";
import ToasterContext from "../contexts/ToastContext";
import Provider from "@/contexts/AuthContext";
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Ajantha Dissanayake",
  description: "Report difficult homework questions.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Provider>
          <ThemeContext>
            <ToasterContext />
            {children}
          </ThemeContext>
        </Provider>
      </body>
    </html>
  );
}
