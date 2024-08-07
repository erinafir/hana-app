import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cookies } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HANA",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const isLoggedIn = cookies().has("Authorization") ? true : false;
  return (
    <html lang="en" data-theme="light">
      <body className={inter.className}>
        <Navbar isLoggedIn={isLoggedIn}/>
        {children}
        <Footer />
      </body>
    </html>
  );
}