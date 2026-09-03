import { Client } from "@notionhq/client";

// Notion 공식 API 클라이언트 — NOTION_API_KEY(서버 전용 시크릿)로 인증한다.
// 대상 데이터베이스가 이 시크릿을 발급한 Notion 인테그레이션에 "연결"되어 있어야 한다.
export const notionClient = new Client({ auth: process.env.NOTION_API_KEY });
