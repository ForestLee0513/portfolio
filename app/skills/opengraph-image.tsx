import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "보유 기술";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "보유 기술",
    description: "언어, 프레임워크, 데이터 관리 및 인프라 등 분야별 기술 스택입니다.",
  });
}
