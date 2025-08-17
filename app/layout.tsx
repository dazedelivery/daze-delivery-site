import type { Metadata } from "next";
import "./globals.css";
import { BRAND } from "@/lib/site";
export const metadata: Metadata = {
  title: `${BRAND.NAME} — Fast Cannabis Delivery in Los Angeles`,
  description: "Premium cannabis delivered across Los Angeles. Licensed, lab-tested, and fast."
};
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="en"><body>{children}</body></html>);
}
