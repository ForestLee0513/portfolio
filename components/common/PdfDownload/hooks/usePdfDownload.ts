"use client";

import { useContext } from "react";
import { PdfDownloadContext } from "../contexts/PdfDownloadContext";

export function usePdfDownload() {
  const context = useContext(PdfDownloadContext);
  if (!context) {
    throw new Error("usePdfDownload는 PdfDownloadProvider 내부에서만 사용할 수 있습니다.");
  }
  return context;
}
