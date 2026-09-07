import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Contact";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "Contact",
    description: "커피챗이나 면접 제안은 언제든 편하게 연락 주세요.",
  });
}
