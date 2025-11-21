import { Suspense } from "react";

export default function LeaderboardLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <Suspense>{children}</Suspense>;
}
