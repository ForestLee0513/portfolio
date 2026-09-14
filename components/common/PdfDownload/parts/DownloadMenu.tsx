"use client";

import {
  IconDownload,
  IconFileDescription,
  IconFileText,
} from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePdfDownload } from "../hooks/usePdfDownload";

// 이력서/경력기술서/포트폴리오 모두 어느 페이지에서나 접근 가능해야 해서 Header(글로벌
// 내비게이션)에 둔다. 포트폴리오는 /portfolio 페이지에서는 이미 불러온 목록을 그대로
// 넘겨 재요청을 피하고, 여기서는 인자 없이 호출해 usePdfDownload가 직접 fetch하게 한다.
export default function DownloadMenu() {
  const { downloadResume, downloadPortfolio, downloadCareer, loadingType } =
    usePdfDownload();
  const isLoading = loadingType !== null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        render={<Button variant="outline" size="sm" disabled={isLoading} />}
      >
        {isLoading ? (
          <Spinner data-icon="inline-start" />
        ) : (
          <IconDownload data-icon="inline-start" />
        )}
        이력서 받기
      </DropdownMenuTrigger>
      {/*
        기본값(w-(--anchor-width))은 트리거 버튼 폭에 맞춰져 있어 "이력서 받기" 버튼처럼
        좁은 트리거에 이 메뉴를 달면 항목 문구가 줄바꿈된다. 내용 길이에 맞춰 넓힌다.
      */}
      <DropdownMenuContent align="end" className="w-max min-w-56">
        <DropdownMenuItem onClick={downloadResume} disabled={isLoading}>
          {loadingType === "resume" ? <Spinner /> : <IconFileText />}
          이력서 (경력 · 자기소개)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadCareer} disabled={isLoading}>
          {loadingType === "career" ? <Spinner /> : <IconFileDescription />}
          경력기술서
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => downloadPortfolio()}
          disabled={isLoading}
        >
          {loadingType === "portfolio" ? <Spinner /> : <IconFileDescription />}
          포트폴리오
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
