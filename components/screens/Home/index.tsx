import Hero from "./parts/Hero";
import Stats from "./parts/Stats";
import Highlights from "./parts/Highlights";
import Career from "./parts/Career";
import CtaBanner from "./parts/CtaBanner";

// 이력 페이지 — app/page.tsx가 얇게 유지되도록 실제 UI는 이 컴포넌트가 담당한다.
export default function Home() {
  return (
    <>
      <Hero />
      <Stats />
      <Highlights />
      <Career />
      <CtaBanner />
    </>
  );
}
