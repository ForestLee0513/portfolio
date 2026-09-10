import type { ReactNode } from "react";
import PageHeader from "@/components/common/PageHeader";

// 데이터 없이 그릴 수 있는 부분(제목/설명)만 담당한다. 목록은 children으로 받아
// app/blog/page.tsx가 Suspense로 감싼 비동기 컴포넌트를 스트리밍해 넣는다.
export default function Blog({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="개발 기록"
        description="개발 과정에서 배운 내용과 문제 해결 과정을 기록합니다."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-16">{children}</section>
    </>
  );
}
