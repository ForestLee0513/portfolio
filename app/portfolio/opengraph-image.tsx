import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "프로젝트";
export const size = ogImageSize;
export const contentType = ogImageContentType;

export default async function Image() {
  return renderOgImage({
    title: "프로젝트",
    description: "회사에서 참여한 프로젝트와 개인 프로젝트의 담당 업무, 구현 내용, 성과를 정리했습니다.",
  });
}
