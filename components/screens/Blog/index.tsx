import type { ReactNode } from "react";
import PageHeader from "@/components/common/PageHeader";

// 데이터 없이 그릴 수 있는 부분(제목/설명)만 담당한다. 목록은 children으로 받아
// app/blog/page.tsx가 Suspense로 감싼 비동기 컴포넌트를 스트리밍해 넣는다.
export default function Blog({ children }: { children: ReactNode }) {
  return (
    <>
      <PageHeader
        eyebrow="Blog"
        title="개발하며 정리한 생각들"
        description="Notion에 정리한 글을 그대로 이어서 보여줍니다."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-16">{children}</section>
    </>
  );
}
