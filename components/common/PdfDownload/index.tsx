"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { toast } from "sonner";
import type { PortfolioProject } from "@/api/portfolio/types";
import { pretendard, pretendardJP } from "@/styles/fonts";
import { PdfDownloadContext } from "./contexts/PdfDownloadContext";
import type { PdfDocumentType, PdfPrintJob } from "./types";
import ResumeDocument from "./parts/ResumeDocument";
import CareerDocument from "./parts/CareerDocument";
import PortfolioDocument from "./parts/PortfolioDocument";

// iOS Chrome(CriOS)은 iOS 정책상 내부적으로 Safari와 같은 WebKit을 쓰지만, 인쇄
// 기능은 자체 구현이라 iframe.contentWindow.print()로 서브프레임만 골라 인쇄하지
// 못하고 메인 문서를 통째로 인쇄해 버린다(iOS Safari는 정상적으로 iframe만 인쇄한다).
function isIOSChrome() {
  return typeof navigator !== "undefined" && /CriOS/i.test(navigator.userAgent);
}

// 기본적으로 인쇄용 문서는 메인 문서에는 전혀 그리지 않고, 화면 밖에 항상 떠 있는
// iframe의 별도 문서에 Portal로 그려 넣은 뒤 그 iframe에서만 print()를 호출한다.
// 메인 문서 자체가 print 스타일(라이트 컬러 고정)로 전환되는 게 아니므로, 다크모드로
// 보고 있는 화면이 다운로드 시작과 동시에 밝게 번쩍이는 현상이 생기지 않는다.
// 단, iOS Chrome에서는 위 이유로 iframe 인쇄가 메인 문서를 인쇄해 버려 내용 없는
// 빈 PDF가 나오므로, 이 환경에서만 메인 문서에 직접 그려 넣고 window.print()를 쓴다
// (다크모드 화면이 잠깐 밝아지는 현상은 이 환경에 한해 감수한다).
export default function PdfDownloadProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [job, setJob] = useState<PdfPrintJob | null>(null);
  // 클릭 시점(데이터 로딩)부터 afterprint까지 유지되는 로딩 상태.
  // 버튼의 스피너·비활성화 표시와, 인쇄가 끝나기 전 다른 문서를 중복으로 트리거하는 것을 막는 데 함께 쓴다.
  const [loadingType, setLoadingType] = useState<PdfDocumentType | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  // iframe 문서 안에 만든 인쇄 루트 엘리먼트 — 여기로 Portal을 그린다.
  const [printRoot, setPrintRoot] = useState<HTMLElement | null>(null);

  const loadPortfolioForPrint = async () => {
    const response = await fetch("/api/portfolio", { cache: "no-store" });
    if (!response.ok) throw new Error("포트폴리오 데이터를 불러오지 못했습니다.");
    return (await response.json()) as PortfolioProject[];
  };

  // iframe의 about:blank 문서는 마운트 시점에 이미 만들어져 있어(네비게이션이
  // 필요 없다) load 이벤트가 React가 리스너를 붙이기 전에 먼저 발생해 버린다.
  // 그래서 onLoad 대신 마운트 직후 effect에서 바로 iframeRef.current.contentDocument에
  // 접근해 스타일시트를 그대로 복제해 넣는다 — globals.css의 @media print 규칙
  // (#pdf-print-root .pdf-sheet ...)을 iframe 안에서도 동일하게 재사용하기 위함이다.
  // next/font가 노출하는 --font-pretendard 변수는 <html>에 붙은 전용 클래스가 있어야
  // 활성화되므로, 그 클래스만 iframe의 <html>에도 그대로 달아준다(h-full 같은 레이아웃
  // 클래스는 붙이지 않는다 — 메인 문서에서 print 시 빈 페이지를 만들던 원인이라 필요 없다).
  useEffect(() => {
    const doc = iframeRef.current?.contentDocument;
    if (!doc) return;
    document
      .querySelectorAll('link[rel="stylesheet"], style')
      .forEach((node) => doc.head.appendChild(node.cloneNode(true)));
    doc.documentElement.className = `${pretendard.variable} ${pretendardJP.variable}`;
    const root = doc.createElement("div");
    root.id = "pdf-print-root";
    doc.body.appendChild(root);
    setPrintRoot(root);
  }, []);

  useEffect(() => {
    if (!job) return;

    if (isIOSChrome()) {
      const handleAfterPrint = () => {
        setJob(null);
        setLoadingType(null);
      };
      window.addEventListener("afterprint", handleAfterPrint);
      window.print();
      return () => window.removeEventListener("afterprint", handleAfterPrint);
    }

    if (!printRoot) return;
    const iframeWindow = iframeRef.current?.contentWindow;
    if (!iframeWindow) return;

    const handleAfterPrint = () => {
      setJob(null);
      setLoadingType(null);
    };
    iframeWindow.addEventListener("afterprint", handleAfterPrint);
    // Portal로 그린 내용이 iframe 레이아웃에 커밋된 뒤 인쇄하도록 한 프레임 미룬다.
    const raf = iframeWindow.requestAnimationFrame(() => {
      iframeWindow.focus();
      iframeWindow.print();
    });

    return () => {
      iframeWindow.removeEventListener("afterprint", handleAfterPrint);
      iframeWindow.cancelAnimationFrame(raf);
    };
  }, [job, printRoot]);

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

  const documentContent = job && (
    <>
      {job.type === "resume" && <ResumeDocument projects={job.projects} />}
      {job.type === "career" && <CareerDocument projects={job.projects} />}
      {job.type === "portfolio" && <PortfolioDocument projects={job.projects} />}
    </>
  );

  return (
    <PdfDownloadContext.Provider
      value={{ downloadResume, downloadCareer, downloadPortfolio, loadingType }}
    >
      {children}
      {/*
        suppressHydrationWarning: GoGuardian 같은 일부 크롬 확장 프로그램이 React가
        하이드레이션하기 전에 페이지의 iframe에 __gcrchildframeremotetoken 같은
        속성을 주입한다. 우리 코드와 무관한 확장 프로그램의 DOM 변형이라 실제
        불일치가 아니며, Safari 등 해당 확장이 없는 환경에서는 나타나지 않는다.
      */}
      <iframe
        ref={iframeRef}
        src="about:blank"
        title="PDF 인쇄용 문서"
        aria-hidden
        tabIndex={-1}
        suppressHydrationWarning
        style={{
          position: "fixed",
          top: 0,
          left: "-10000px",
          width: "210mm",
          height: "297mm",
          border: "none",
        }}
      />
      {printRoot && createPortal(documentContent, printRoot)}
      {/* iOS Chrome 전용 폴백 경로가 쓰는 인쇄 대상. 그 외 환경에서는 항상
          display:none이고 window.print()도 호출되지 않아 그대로 무해하다. */}
      <div id="pdf-print-root" className="hidden print:block">
        {documentContent}
      </div>
    </PdfDownloadContext.Provider>
  );
}
