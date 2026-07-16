import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    // Yarn이 생성하는 파일 — 린트 대상이 아니다.
    ".pnp.*",
    ".yarn/**",
  ]),
  // shadcn CLI가 벤더링한 코드(components/ui/*, hooks/use-mobile.ts)는 손대지 않는다.
  // shadcn 표준 구현이 일부 규칙과 충돌하므로(예: SSR 때문에 effect에서 window를 읽어
  // setState하는 use-mobile 패턴) 해당 경로에 한해 문제 규칙만 완화한다.
  {
    files: ["components/ui/**/*.{ts,tsx}", "hooks/use-mobile.ts"],
    rules: {
      "react-hooks/set-state-in-effect": "off",
    },
  },
]);

export default eslintConfig;
