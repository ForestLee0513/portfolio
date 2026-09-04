import { createContext } from "react";
import type { PdfDownloadContextValue } from "../types";

export const PdfDownloadContext = createContext<PdfDownloadContextValue | null>(null);
