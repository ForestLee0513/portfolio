import PageHeader from "@/components/common/PageHeader";
import { skillCategories } from "@/lib/data/skills";
import SkillCategoryCard from "./parts/SkillCategoryCard";

export default function Skills() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="보유 기술"
        description="언어, 프레임워크, 데이터 관리 및 인프라 등 분야별 기술 스택입니다."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard
              key={category.id}
              category={category}
              index={index}
            />
          ))}
        </div>
      </section>
    </>
  );
}
