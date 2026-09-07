import { readFileSync } from "node:fs";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { profile } from "@/lib/data/profile";

// 모든 opengraph-image.tsx가 공유하는 크기/포맷 — 각 라우트 파일에서 size/contentType으로 재수출한다.
export const ogImageSize = { width: 1200, height: 630 };
export const ogImageContentType = "image/png";

// next/og(=satori)의 폰트 파서는 사이트에서 쓰는 Variable 폰트(PretendardVariable.woff2)를
// 지원하지 않는다 — WOFF2 컨테이너 자체도 못 읽고("Unsupported OpenType signature wOF2"),
// wawoff2로 풀어 sfnt로 넘겨도 Variable 폰트의 glyf 구조를 satori가 완전히 해석하지 못해
// 별도 에러로 깨진다. 대신 `pretendard` 패키지가 함께 배포하는, 굵기별로 고정된 정적 OTF를 쓴다.
const pretendardRegular = readFileSync(
  join(
    process.cwd(),
    "node_modules/pretendard/dist/public/static/Pretendard-Regular.otf",
  ),
);
const pretendardBold = readFileSync(
  join(
    process.cwd(),
    "node_modules/pretendard/dist/public/static/Pretendard-Bold.otf",
  ),
);

// 페이지 title이 layout의 title.template("%s · 이우림")을 거친 결과라면 그 접미사를 제거해
// OG 이미지에는 페이지 고유 타이틀만 크게 보여준다. (로고 옆에 이름을 이미 표기하기 때문에 중복 방지)
export function stripBrandSuffix(title: string): string {
  const suffix = ` · ${profile.name}`;
  return title.endsWith(suffix) ? title.slice(0, -suffix.length) : title;
}

// 제목이 길어질수록(주로 블로그 글) 630px 안에 들어오도록 폰트 크기를 단계적으로 줄인다.
function headingFontSize(heading: string): number {
  if (heading.length > 40) return 44;
  if (heading.length > 24) return 54;
  return 68;
}

// 설명(주로 블로그 글 요약)이 너무 길면 캔버스를 벗어나므로 적당한 길이에서 자른다.
function truncate(text: string, max: number): string {
  if (text.length <= max) return text;
  return `${text.slice(0, max).trimEnd()}…`;
}

export function renderOgImage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  const heading = stripBrandSuffix(title);
  const summary = description ? truncate(description, 110) : undefined;

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: "56px 72px 48px",
        backgroundColor: "#ffffff",
        fontFamily: "Pretendard",
      }}
    >
      {/* 상단 브랜드 accent bar — 사이트 전반의 emerald 포인트 컬러(primary) */}
      <div
        style={{
          display: "flex",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: 10,
          backgroundColor: "#047857",
        }}
      />

      {/* 로고 + 이름 (Header와 동일한 트리 로고 마크) */}
      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <svg width={48} height={48} viewBox="0 0 400 400" fill="none">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M200 23L320 324.116H216.725V343.553H243.124V377H183.275V199.837H216.725V237.785H243.124V271.232H216.725V290.669H270.663L200 113.354L129.337 290.669H168.796V324.116H80L200 23Z"
            fill="#000000"
          />
        </svg>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <span style={{ fontSize: 24, fontWeight: 700, color: "#171717" }}>
            {profile.name}
          </span>
          <span style={{ fontSize: 16, color: "#737373" }}>{profile.role}</span>
        </div>
      </div>

      {/* 페이지 타이틀 */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 20,
          maxWidth: 980,
        }}
      >
        <span
          style={{
            display: "flex",
            fontSize: headingFontSize(heading),
            fontWeight: 700,
            color: "#171717",
            lineHeight: 1.2,
          }}
        >
          {heading}
        </span>
        {summary && (
          <span
            style={{
              display: "flex",
              fontSize: 24,
              color: "#525252",
              lineHeight: 1.5,
            }}
          >
            {summary}
          </span>
        )}
      </div>

      {/* 하단 정보 */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 18,
          color: "#737373",
        }}
      >
        <span style={{ display: "flex" }}>{profile.tagline}</span>
        <span style={{ display: "flex" }}>
          {profile.links.github.replace("https://", "")}
        </span>
      </div>
    </div>,
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Pretendard",
          data: pretendardRegular,
          weight: 400,
          style: "normal",
        },
        {
          name: "Pretendard",
          data: pretendardBold,
          weight: 700,
          style: "normal",
        },
      ],
    },
  );
}
