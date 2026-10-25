import { Suspense } from "react";

import { AboutPreview } from "@/features/home/components/about-preview";
import { HeroSection } from "@/features/home/components/hero-section";
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
    </>
  );
}
