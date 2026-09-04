"use client";

import { useState } from "react";
import Link from "next/link";
import { IconFileDescription, IconFileText, IconMenu2 } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { usePdfDownload } from "@/components/common/PdfDownload/hooks/usePdfDownload";
import { NAV_ITEMS } from "./NavLinks";

export default function MobileNav() {
  const [open, setOpen] = useState(false);
  const { downloadResume, downloadCareer } = usePdfDownload();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger
        render={
          <Button
            type="button"
            variant="ghost"
            size="icon-sm"
            aria-label="메뉴 열기"
            className="md:hidden"
          />
        }
      >
        <IconMenu2 />
      </SheetTrigger>
      <SheetContent side="left">
        <SheetHeader>
          <SheetTitle>메뉴</SheetTitle>
        </SheetHeader>
        <nav className="flex flex-col gap-1 px-6">
          {NAV_ITEMS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              onClick={() => setOpen(false)}
              className="rounded-2xl px-3 py-2.5 text-sm font-medium text-foreground hover:bg-secondary"
            >
              {item.label}
            </Link>
          ))}

          <div className="mt-2 flex flex-col gap-1 border-t border-border pt-2">
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                downloadResume();
              }}
              className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary"
            >
              <IconFileText className="size-4" />
              이력서 다운로드
            </button>
            <button
              type="button"
              onClick={() => {
                setOpen(false);
                downloadCareer();
              }}
              className="flex items-center gap-2 rounded-2xl px-3 py-2.5 text-left text-sm font-medium text-foreground hover:bg-secondary"
            >
              <IconFileDescription className="size-4" />
              경력기술서 다운로드
            </button>
          </div>

          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="mt-2 rounded-2xl bg-primary px-3 py-2.5 text-center text-sm font-medium text-primary-foreground"
          >
            커피챗 제안하기
          </Link>
        </nav>
      </SheetContent>
    </Sheet>
  );
}
