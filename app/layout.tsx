import type { Metadata } from "next";
import { cn } from "@/lib/utils";
import { pretendard, pretendardJP } from "@/styles/fonts";
import UIProvider from "@/providers/UIProvider";
import "@/styles/globals.css";

export const metadata: Metadata = {
  title: "새 블로그",
  description: "Next.js로 만든 블로그",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 폰트 변수를 <html>에 부착한다 → globals.css의 @theme가 font-sans/font-mono 토큰으로 승격.
  return (
    <html
      lang="ko"
      className={cn(
        "h-full antialiased",
        pretendard.variable,
        pretendardJP.variable
      )}
    >
      <body className="min-h-full flex flex-col font-sans">
        <UIProvider>{children}</UIProvider>
      </body>
    </html>
  );
}
