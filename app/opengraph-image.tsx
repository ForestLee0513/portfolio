import { profile } from "@/lib/data/profile";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = `${profile.name} · ${profile.role}`;
export const size = ogImageSize;
export const contentType = ogImageContentType;

// 홈은 title.template을 거치지 않는 기본 title(`이름 · 역할`)을 그대로 쓴다.
// description은 생략 — 하단 푸터에 이미 같은 tagline이 나와 있어 중복된다.
export default async function Image() {
  return renderOgImage({ title: `${profile.name} · ${profile.role}` });
}
