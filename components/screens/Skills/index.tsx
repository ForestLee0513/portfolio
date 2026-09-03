import PageHeader from "@/components/common/PageHeader";
import { skillCategories } from "@/lib/data/skills";
import SkillCategoryCard from "./parts/SkillCategoryCard";

export default function Skills() {
  return (
    <>
      <PageHeader
        eyebrow="Skills"
        title="실무에서 직접 설계·구현하며 사용한 기술"
        description="언어와 프레임워크부터 결제·인프라까지, 프로젝트 전 과정에서 손에 익힌 스택입니다."
      />

      <section className="px-5 py-12 sm:px-8 sm:py-16">
        <div className="mx-auto grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <SkillCategoryCard key={category.id} category={category} index={index} />
          ))}
        </div>
      </section>
    </>
  );
}
