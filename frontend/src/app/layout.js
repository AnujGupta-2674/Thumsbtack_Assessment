import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "./redux/ReduxProvider";
import ToastProvider from "./components/ToasterProvider.jsx";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Thumbstack Book Manager",
  description: "Personal Book Manager",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ReduxProvider>
          {children}
          <ToastProvider />
        </ReduxProvider>
      </body>
    </html>
  );
}