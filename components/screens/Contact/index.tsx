"use client";

import { motion } from "motion/react";
import { toast } from "sonner";
import {
  IconBrandGithub,
  IconBrandLinkedin,
  IconCopy,
  IconMail,
} from "@tabler/icons-react";
import PageHeader from "@/components/common/PageHeader";
import { profile } from "@/lib/data/profile";
import ContactCard from "./parts/ContactCard";

export default function Contact() {
  const handleCopyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      toast.success("이메일 주소를 복사했어요.");
    } catch {
      toast.error("복사에 실패했어요. 직접 입력해주세요.");
    }
  };

  return (
    <>
      <PageHeader
        eyebrow="Contact"
        title="연락처"
        description="커피챗, 프론트엔드 채용 및 협업 문의는 아래 채널로 연락 주세요."
      />

      <section className="px-5 py-10 sm:px-8 sm:py-14">
        <div className="mx-auto flex max-w-2xl flex-col gap-3">
          <ContactCard
            icon={IconMail}
            title="Email"
            value={profile.email}
            href={profile.links.email}
            index={0}
          />
          <ContactCard
            icon={IconCopy}
            title="이메일 복사"
            value="클릭해서 클립보드에 복사"
            index={1}
            onClick={handleCopyEmail}
          />
          <ContactCard
            icon={IconBrandGithub}
            title="GitHub"
            value="github.com/ForestLee0513"
            href={profile.links.github}
            index={2}
          />
          <ContactCard
            icon={IconBrandLinkedin}
            title="LinkedIn"
            value="linkedin.com/in/woolimlee0513"
            href={profile.links.linkedin}
            index={3}
          />
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="mx-auto mt-10 max-w-2xl text-center text-sm text-muted-foreground"
        >
          {profile.name} · {profile.role} · 경력 {profile.totalCareer}
        </motion.p>
      </section>
    </>
  );
}
