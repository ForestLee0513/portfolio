import type { Metadata } from "next";
import Skills from "@/components/screens/Skills";

export const metadata: Metadata = { title: "보유 기술" };

export default function Page() {
  return <Skills />;
}
