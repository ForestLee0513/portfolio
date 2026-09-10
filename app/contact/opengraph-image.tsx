import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "연락처";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "연락처",
    description: "커피챗, 프론트엔드 채용 및 협업 문의는 아래 채널로 연락 주세요.",
  });
}
