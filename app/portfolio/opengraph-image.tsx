import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Portfolio";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "Portfolio",
    description: "지금까지 개발한 프로젝트를 모아둔 포트폴리오입니다.",
  });
}
