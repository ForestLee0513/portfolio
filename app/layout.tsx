import type { Metadata } from "next";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { pretendard, pretendardJP } from "@/styles/fonts";
import UIProvider from "@/providers/UIProvider";
import Header from "@/components/common/Header";
import Footer from "@/components/common/Footer";
import PdfDownloadProvider from "@/components/common/PdfDownload";
import { Toaster } from "@/components/ui/sonner";
import { profile } from "@/lib/data/profile";
import "@/styles/globals.css";

// og:image 등 metadata에 들어가는 상대경로를 절대 URL로 바꿀 때 기준이 되는 origin.
// 이 값이 없으면 Next.js가 "http://localhost:3000"으로 fallback해, 배포 환경에서도
// OG 이미지가 로컬 주소로 잡히는 문제가 생긴다.
// 우선순위: 직접 지정한 NEXT_PUBLIC_SITE_URL > Vercel 프로덕션 도메인 > Vercel 배포 URL(프리뷰) > 로컬.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${profile.name} · ${profile.role}`,
    template: `%s · ${profile.name}`,
  },
  description: profile.tagline,
  keywords: [
    profile.name,
    profile.role,
    "프론트엔드 개발자",
    "Front-end Developer",
    "React",
    "Next.js",
    "포트폴리오",
    "이력서",
  ],
  authors: [{ name: profile.name, url: profile.links.github }],
  creator: profile.name,
  publisher: profile.name,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    siteName: profile.name,
    type: "website",
    locale: "ko_KR",
    url: "/",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
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
