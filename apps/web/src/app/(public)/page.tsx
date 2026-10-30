import { Suspense } from "react";

import { AboutPreview } from "@/features/home/components/about-preview";
import { HeroSection } from "@/features/home/components/hero-section";
import { ProfessionalsPreview } from "@/features/professionals/components/professionals-preview";
import { ProfessionalsPreviewSkeleton } from "@/features/professionals/components/professionals-preview-skeleton";
import { SpecialtiesPreview } from "@/features/specialties/components/specialties-preview";
import { SpecialtiesPreviewSkeleton } from "@/features/specialties/components/specialties-preview-skeleton";

export default function Home() {
  return (
    <>
      <HeroSection />
      <AboutPreview />
      <Suspense fallback={<SpecialtiesPreviewSkeleton />}>
        <SpecialtiesPreview />
      </Suspense>
      <Suspense fallback={<ProfessionalsPreviewSkeleton />}>
        <ProfessionalsPreview />
      </Suspense>
    </>
  );
}
