"use client";

import { useEffect, useState, type ReactNode } from "react";
import { toast } from "sonner";
import type { PortfolioProject } from "@/api/portfolio/types";
import { PdfDownloadContext } from "./contexts/PdfDownloadContext";
import type { PdfDocumentType, PdfPrintJob } from "./types";
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
  // 클릭 시점(데이터 로딩)부터 afterprint까지 유지되는 로딩 상태.
  // 버튼의 스피너·비활성화 표시와, 인쇄가 끝나기 전 다른 문서를 중복으로 트리거하는 것을 막는 데 함께 쓴다.
  const [loadingType, setLoadingType] = useState<PdfDocumentType | null>(null);

  const loadPortfolioForPrint = async () => {
    const response = await fetch("/api/portfolio", { cache: "no-store" });
    if (!response.ok) throw new Error("포트폴리오 데이터를 불러오지 못했습니다.");
    return (await response.json()) as PortfolioProject[];
  };

  useEffect(() => {
    if (!job) return;

    const handleAfterPrint = () => {
      setJob(null);
      setLoadingType(null);
    };
    window.addEventListener("afterprint", handleAfterPrint);
    // useEffect는 DOM 커밋 이후에 실행되므로 문서는 이미 그려진 상태다.
    // requestAnimationFrame은 탭이 백그라운드일 때 실행이 보류될 수 있어 쓰지 않는다.
    window.print();

    return () => {
      window.removeEventListener("afterprint", handleAfterPrint);
    };
  }, [job]);

  const downloadResume = () => {
    if (loadingType) return;
    setLoadingType("resume");
    loadPortfolioForPrint()
      .then((projects) => setJob({ type: "resume", projects }))
      .catch(() => {
        toast.error("이력서를 준비하지 못했어요. 다시 시도해주세요.");
        setLoadingType(null);
      });
  };

  const downloadCareer = () => {
    if (loadingType) return;
    setLoadingType("career");
    loadPortfolioForPrint()
      .then((projects) => setJob({ type: "career", projects }))
      .catch(() => {
        toast.error("경력기술서를 준비하지 못했어요. 다시 시도해주세요.");
        setLoadingType(null);
      });
  };

  const downloadPortfolio = (projects: PortfolioProject[]) => {
    if (loadingType) return;
    setLoadingType("portfolio");
    setJob({ type: "portfolio", projects });
  };

  return (
    <PdfDownloadContext.Provider
      value={{ downloadResume, downloadCareer, downloadPortfolio, loadingType }}
    >
      {children}
      <div id="pdf-print-root" className="hidden print:block">
        {job?.type === "resume" && <ResumeDocument projects={job.projects} />}
        {job?.type === "career" && <CareerDocument projects={job.projects} />}
        {job?.type === "portfolio" && <PortfolioDocument projects={job.projects} />}
      </div>
    </PdfDownloadContext.Provider>
  );
}
