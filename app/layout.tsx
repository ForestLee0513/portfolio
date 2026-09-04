import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { pretendard, pretendardJP } from "@/styles/fonts";
import UIProvider from "@/providers/UIProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PdfDownloadProvider from "@/components/common/PdfDownload";
import { Toaster } from "@/components/ui/sonner";
import { profile } from "@/lib/data/profile";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 폰트 변수를 <html>에 부착한다 → globals.css의 @theme가 font-sans/font-mono 토큰으로 승격.
  // suppressHydrationWarning: next-themes가 클라이언트에서 class="dark"를 주입하는 과정에서
  // 발생하는 정상적인(의도된) hydration 경고를 막는다.
  return (
    <html
      lang="ko"
      suppressHydrationWarning
      className={cn(
        "h-full antialiased",
        pretendard.variable,
        pretendardJP.variable
      )}
    >
      {/*
        print:block — body의 flex 레이아웃을 그대로 두면 인쇄 시 display:none 처리된
        형제 요소(Header/main/Footer 래퍼)가 크로미움의 flex 페이지네이션 버그로 인해
        빈 첫 페이지를 만들어낸다. 인쇄 중에는 block으로 되돌려 이 문제를 피한다.
      */}
      <body className="min-h-full flex flex-col font-sans print:block">
        <UIProvider>
          <PdfDownloadProvider>
            <div className="flex flex-1 flex-col print:hidden">
              <Header />
              <main className="flex flex-1 flex-col">{children}</main>
              <Footer />
            </div>
            <div className="print:hidden">
              <Toaster position="bottom-center" />
            </div>
          </PdfDownloadProvider>
        </UIProvider>
      </body>
    </html>
  );
}
