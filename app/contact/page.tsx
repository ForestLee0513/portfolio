import type { Metadata } from "next";
import Contact from "@/components/screens/Contact";

export const metadata: Metadata = { title: "연락처" };

export default function Page() {
  return <Contact />;
}
