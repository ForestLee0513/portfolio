import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Blog";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "Blog",
    description: "개발하며 겪은 문제와 해결 과정을 기록합니다.",
  });
}
