"use client";

import { IconDownload, IconFileDescription, IconFileText } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePdfDownload } from "../hooks/usePdfDownload";

// 이력서/경력기술서는 어느 페이지에서나 접근 가능해야 해서 Header(글로벌 내비게이션)에 둔다.
// 포트폴리오 PDF는 Notion에서 가져온 데이터가 필요해 /portfolio 페이지 안에 별도로 둔다.
export default function DownloadMenu() {
  const { downloadResume, downloadCareer } = usePdfDownload();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger render={<Button variant="outline" size="sm" />}>
        <IconDownload data-icon="inline-start" />
        이력서 받기
      </DropdownMenuTrigger>
      {/*
        기본값(w-(--anchor-width))은 트리거 버튼 폭에 맞춰져 있어 "이력서 받기" 버튼처럼
        좁은 트리거에 이 메뉴를 달면 항목 문구가 줄바꿈된다. 내용 길이에 맞춰 넓힌다.
      */}
      <DropdownMenuContent align="end" className="w-max min-w-56">
        <DropdownMenuItem onClick={downloadResume}>
          <IconFileText />
          이력서 (경력 · 자기소개)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={downloadCareer}>
          <IconFileDescription />
          경력기술서
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
