import type { Metadata } from "next";
import { Roboto, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Layout from "@/components/layout/layout";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "typing game",
  description: "Full stack typing game",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body
        className={`${robotoSans.variable} ${robotoMono.variable}  antialiased px-80 min-h-full flex flex-col justify-between`}
      >
        <Layout>
          <main> {children}</main>
        </Layout>
      </body>
    </html>
  );
}
