# 이우림 홈페이지

3년차 React/Front-end 개발자 이우림의 개인 홈페이지입니다. 이력·Skills·Portfolio·Contact와
Notion을 CMS로 쓰는 블로그·포트폴리오로 구성되어 있습니다.

- 이력 (`/`) — 히어로, 핵심 성과 통계, 강점, 경력 타임라인, 학력
- Skills (`/skills`) — 카테고리별 기술 스택
- Portfolio (`/portfolio`) — Notion 데이터베이스를 CMS로 쓰는 회사/개인 프로젝트 갤러리 (필터 제공)
- Contact (`/contact`) — 이메일/GitHub/LinkedIn 연락 채널
- Blog (`/blog`) — Notion 데이터베이스를 CMS로 쓰는 블로그

## 기술 스택

- **Framework**: Next.js 16 (App Router), React 19, TypeScript
- **스타일링**: Tailwind CSS v4, shadcn/ui(base-ui), tabler-icons
- **애니메이션**: motion (framer-motion 후속)
- **테마**: next-themes (라이트/다크)
- **Notion 연동**: `@notionhq/client`(공식 Notion API) — 블로그는 `react-markdown`으로 본문
  렌더링, 포트폴리오는 속성값을 그대로 카드에 매핑

## 폴더 구조

```
📦 repo root
 ┣ 📂api        # 백엔드/외부 API 도메인별 요청 계층 (api/blog, api/portfolio)
 ┣ 📂app        # 라우팅 및 화면 조립
 ┣ 📂components # ui(shadcn 프리미티브) · common(공통) · screens(라우트별 화면)
 ┣ 📂lib        # 공용 클라이언트 기반(notion.ts 등) + 정적 데이터(lib/data)
 ┣ 📂providers  # 전역 프로바이더
 ┗ 📂styles     # 전역 스타일 및 폰트
```

각 폴더의 상세 규칙은 `AGENTS.md`와 `agent/docs/*.md`를 참고하세요.

## 시작하기

### 요구사항

- Node.js 20+
- yarn (yarn.lock 기준)

### 설치 및 실행

```bash
yarn install
yarn dev
```

기본적으로 [http://localhost:3000](http://localhost:3000) 에서 확인할 수 있습니다.

### 환경 변수

`.env.example`을 복사해 `.env.local`을 만들고 값을 채워주세요. `.env.local`은 git에
커밋되지 않습니다.

```bash
cp .env.example .env.local
```

| 변수명                          | 설명                                                                        |
| -------------------------------- | --------------------------------------------------------------------------- |
| `NOTION_BLOG_DATABASE_ID`        | 블로그 글 목록으로 쓸 Notion 데이터베이스 ID(또는 그 DB를 담고 있는 상위 페이지 ID) |
| `NOTION_PORTFOLIO_DATABASE_ID`   | 포트폴리오 프로젝트 목록으로 쓸 Notion 데이터베이스 ID(또는 상위 페이지 ID)  |
| `NOTION_API_KEY`                 | Notion 인테그레이션의 Internal Integration Secret                           |

**Notion 연동 설정 순서 (공통)**

1. [notion.so/my-integrations](https://www.notion.so/my-integrations)에서 새 internal
   integration을 만들고 `Internal Integration Secret`을 복사해 `NOTION_API_KEY`에 넣습니다.
2. 대상 Notion 데이터베이스(또는 그 상위 페이지)를 열고 `···` 메뉴 → `Connections`에서
   방금 만든 인테그레이션을 연결합니다. (연결하지 않으면 API가 404를 반환합니다.) 블로그와
   포트폴리오 데이터베이스 둘 다 같은 인테그레이션에 연결하면 됩니다.
3. 해당 페이지/데이터베이스의 URL에서 32자리 ID를 추출해 각각의 환경 변수에 넣습니다.
4. 쓰기 작업(스키마 변경, 마이그레이션 스크립트 등)이 필요할 때만 인테그레이션의
   `Capabilities`에서 `Update content`/`Insert content`를 켜고, 평소에는 `Read content`만
   켜두는 것을 권장합니다.

**블로그 데이터베이스 속성**

`Public`(checkbox), `Published`(date), `Tags`(multi-select), `Description`(rich text)을
두면 자동으로 인식됩니다. 속성명이 다르면 `api/blog/constants.ts`의 `BLOG_PROPERTY_NAMES`만
맞춰주면 됩니다. `Public`이 꺼진 글은 목록에서 자동으로 제외됩니다. 본문은 Notion 페이지
콘텐츠를 그대로 마크다운으로 변환해서 보여줍니다.

**포트폴리오 데이터베이스 속성**

| 속성명        | 타입              | 설명                                              |
| ------------- | ----------------- | ------------------------------------------------- |
| 제목(title)   | title              | 프로젝트명                                         |
| `Category`    | select             | `회사` / `개인` — Portfolio 페이지 필터 값과 일치해야 함 |
| `Org`         | rich text          | 소속                                                |
| `Role`        | rich text          | 역할                                                |
| `Period`      | rich text          | 기간                                                |
| `Summary`     | rich text          | 한 줄 요약                                          |
| `Highlights`  | rich text          | 줄바꿈(Shift+Enter)으로 구분한 핵심 성과 목록       |
| `Stack`       | multi-select       | 기술 스택 태그                                      |
| `Links`       | rich text          | 텍스트 일부에 하이퍼링크를 걸면 그대로 라벨+링크로 추출됨 |
| `Public`      | checkbox           | 꺼두면 목록에서 제외 (기본값: 공개)                 |
| `Order`       | number             | 정렬 순서 (오름차순, 없으면 조회 순서 유지)          |

속성명이 다르면 `api/portfolio/constants.ts`의 `PORTFOLIO_PROPERTY_NAMES`만 맞춰주면 됩니다.

환경 변수를 바꾼 뒤에는 dev 서버를 재시작해야 반영됩니다.

## 스크립트

| 명령어             | 설명                                  |
| ------------------ | ------------------------------------- |
| `yarn dev`          | 개발 서버 실행 (포트 3000)             |
| `yarn build`        | 프로덕션 빌드                         |
| `yarn start`        | 빌드된 앱 실행                        |
| `yarn lint`         | ESLint 검사                           |
| `yarn ui:add <name>`| shadcn 컴포넌트 추가                  |

테스트 스위트는 별도로 구성되어 있지 않으며, 검증은 dev 서버를 직접 띄워 확인합니다.
