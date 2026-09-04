import type { ComponentType, ReactNode } from "react";
import ReactMarkdown, { type Components } from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";

// Notion 공식 API의 pages.retrieveMarkdown()은 콜아웃/컬럼처럼 순수 마크다운으로
// 표현 안 되는 블록을 <callout>, <columns> 같은 커스텀 태그로 함께 내려준다.
// rehype-raw로 그 태그들을 실제 엘리먼트로 파싱한 뒤, 아래 컴포넌트로 매핑한다.
function Callout({ icon, children }: { icon?: string; children?: ReactNode }) {
  return (
    <div className="my-6 flex gap-3 rounded-2xl bg-secondary/70 p-4 text-sm leading-6 text-foreground/90">
      {icon && <span className="shrink-0 text-lg">{icon}</span>}
      <div className="flex-1 [&>p]:my-0">{children}</div>
    </div>
  );
}

function Columns({ children }: { children?: ReactNode }) {
  return <div className="my-6 grid gap-4 sm:grid-cols-2">{children}</div>;
}

// react-markdown의 Components 타입은 표준 HTML 태그 키만 허용하므로,
// Notion 전용 커스텀 태그는 별도로 만들고 마지막에 합쳐서 캐스팅한다.
const customComponents: Record<
  string,
  ComponentType<{ children?: ReactNode; icon?: string }>
> = {
  callout: Callout,
  columns: Columns,
  column: ({ children }) => <div>{children}</div>,
  "empty-block": () => <div className="h-4" />,
};

const htmlComponents: Components = {
  h1: ({ children }) => (
    <h2 className="mt-10 mb-4 text-2xl font-bold tracking-tight text-foreground first:mt-0">
      {children}
    </h2>
  ),
  h2: ({ children }) => (
    <h3 className="mt-9 mb-3 text-xl font-bold tracking-tight text-foreground">
      {children}
    </h3>
  ),
  h3: ({ children }) => (
    <h4 className="mt-7 mb-2 text-lg font-semibold text-foreground">
      {children}
    </h4>
  ),
  p: ({ children }) => (
    <p className="my-4 text-base leading-8 text-foreground/90">{children}</p>
  ),
  a: ({ href, children }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="font-medium text-primary underline underline-offset-4 hover:opacity-80"
    >
      {children}
    </a>
  ),
  ul: ({ children }) => (
    <ul className="my-4 ml-5 list-disc space-y-1.5 text-base leading-7 text-foreground/90">
      {children}
    </ul>
  ),
  ol: ({ children }) => (
    <ol className="my-4 ml-5 list-decimal space-y-1.5 text-base leading-7 text-foreground/90">
      {children}
    </ol>
  ),
  blockquote: ({ children }) => (
    <blockquote className="my-5 rounded-r-2xl border-l-4 border-primary bg-secondary/60 py-2 pl-5 text-foreground/80">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-10 border-border" />,
  img: ({ src, alt }) =>
    typeof src === "string" ? (
      // eslint-disable-next-line @next/next/no-img-element -- Notion 이미지는 임의 도메인이라 next/image 최적화 대상에서 제외한다.
      <img src={src} alt={alt ?? ""} className="my-6 w-full rounded-3xl" />
    ) : null,
  code: ({ className, children }) => {
    const isBlock = Boolean(className);
    if (!isBlock) {
      return (
        <code className="rounded-md bg-secondary px-1.5 py-0.5 font-mono text-[0.85em] text-foreground">
          {children}
        </code>
      );
    }
    return <code className={className}>{children}</code>;
  },
  pre: ({ children }) => (
    <pre className="my-6 overflow-x-auto rounded-2xl bg-[#1e1e1e] p-4 font-mono text-sm leading-6 text-zinc-100">
      {children}
    </pre>
  ),
  table: ({ children }) => (
    <div className="my-6 overflow-x-auto rounded-2xl ring-1 ring-border">
      <table className="w-full border-collapse text-sm">{children}</table>
    </div>
  ),
  th: ({ children }) => (
    <th className="border-b border-border bg-secondary px-4 py-2 text-left font-medium text-foreground">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="border-b border-border/60 px-4 py-2 text-foreground/90">
      {children}
    </td>
  ),
};

const components = { ...htmlComponents, ...customComponents } as Components;

export default function MarkdownContent({ markdown }: { markdown: string }) {
  return (
    <div className="max-w-none">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw]}
        components={components}
      >
        {markdown}
      </ReactMarkdown>
    </div>
  );
}
