import type { SVGProps } from "react";

// 사용자 제공 트리 로고. fill="currentColor"로 둬서 부모의 text-color(주로 text-primary)를
// 그대로 상속받아 라이트/다크 테마 전환에도 별도 대응 없이 자연스럽게 맞춰진다.
export default function Logo(props: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M200 23L320 324.116H216.725V343.553H243.124V377H183.275V199.837H216.725V237.785H243.124V271.232H216.725V290.669H270.663L200 113.354L129.337 290.669H168.796V324.116H80L200 23Z"
        fill="currentColor"
      />
    </svg>
  );
}
