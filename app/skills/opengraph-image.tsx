import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Skills";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "Skills",
    description: "실무에서 직접 설계·구현하며 사용한 기술 스택입니다.",
  });
}
