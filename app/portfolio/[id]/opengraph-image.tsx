import { getPortfolioProject } from "@/api/portfolio/requests";
import { ogImageContentType, ogImageSize, renderOgImage } from "@/lib/og-image";

export const alt = "Portfolio Project";
export const size = ogImageSize;
export const contentType = ogImageContentType;

type ImageProps = { params: Promise<{ id: string }> };

export default async function Image({ params }: ImageProps) {
  const { id } = await params;
  const project = await getPortfolioProject(id);

  const description = project
    ? [`${project.category} · ${project.org}`, project.summary].filter(Boolean).join(" · ")
    : undefined;

  return renderOgImage({
    title: project?.name ?? "프로젝트를 찾을 수 없어요",
    description: description || undefined,
  });
}
