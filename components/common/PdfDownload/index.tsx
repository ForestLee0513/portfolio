"use client";

import { useEffect, useState, type ReactNode } from "react";
import type { PortfolioProject } from "@/api/portfolio/types";
import { PdfDownloadContext } from "./contexts/PdfDownloadContext";
import type { PdfPrintJob } from "./types";
import ResumeDocument from "./parts/ResumeDocument";
import CareerDocument from "./parts/CareerDocument";
import PortfolioDocument from "./parts/PortfolioDocument";

// 인쇄용 문서는 화면에는 그리지 않고(hidden) body에 항상 마운트해 두다가,
// 다운로드 요청 시에만 해당 문서를 채워 넣고 window.print()를 호출한다.
// 실제 화면(Header/main/Footer)은 print:hidden 클래스로 인쇄 결과에서 제외한다.
export default function PdfDownloadProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [job, setJob] = useState<PdfPrintJob | null>(null);

  useEffect(() => {
    if (!job) return;

    const handleAfterPrint = () => setJob(null);
    window.addEventListener("afterprint", handleAfterPrint);
    // useEffect는 DOM 커밋 이후에 실행되므로 문서는 이미 그려진 상태다.
    // requestAnimationFrame은 탭이 백그라운드일 때 실행이 보류될 수 있어 쓰지 않는다.
    window.print();

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [job]);

  return (
    <PdfDownloadContext.Provider
      value={{
        downloadResume: () => setJob({ type: "resume" }),
        downloadCareer: () => setJob({ type: "career" }),
        downloadPortfolio: (projects: PortfolioProject[]) =>
          setJob({ type: "portfolio", projects }),
      }}
    >
      {children}
      <div id="pdf-print-root" className="hidden print:block">
        {job?.type === "resume" && <ResumeDocument />}
        {job?.type === "career" && <CareerDocument />}
        {job?.type === "portfolio" && <PortfolioDocument projects={job.projects} />}
      </div>
    </PdfDownloadContext.Provider>
  );
}
