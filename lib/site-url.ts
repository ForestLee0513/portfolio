// og:image, sitemap, robots 등 절대 URL이 필요한 곳에서 공통으로 쓰는 origin.
// 이 값이 없으면 Next.js가 "http://localhost:3000"으로 fallback해, 배포 환경에서도
// 주소가 로컬로 잡히는 문제가 생긴다.
// 우선순위: 직접 지정한 NEXT_PUBLIC_SITE_URL > Vercel 프로덕션 도메인 > Vercel 배포 URL(프리뷰) > 로컬.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000");
