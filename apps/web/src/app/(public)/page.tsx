import { Suspense } from "react";

import { AboutPreview } from "@/features/home/components/about-preview";
import { HeroSection } from "@/features/home/components/hero-section";
import {
  SpecialtiesPreview,
  SpecialtiesPreviewSkeleton,
} from "@/features/specialties/components/specialties-preview";

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
