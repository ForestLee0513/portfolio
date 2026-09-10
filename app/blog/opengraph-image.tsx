import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "개발 기록";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "개발 기록",
    description: "개발 과정에서 배운 내용과 문제 해결 과정을 기록합니다.",
  });
}
