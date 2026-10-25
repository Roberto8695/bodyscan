import { SpecialtiesSection } from "@/features/specialties/components/specialties-section";
import { SpecialtyDirectory } from "@/features/specialties/components/specialty-directory";

const SKELETON_ROWS = 6;

export function SpecialtiesPreviewSkeleton() {
  return (
    <SpecialtiesSection>
      <SpecialtyDirectory count={SKELETON_ROWS} isLoading>
        <div
          aria-hidden="true"
          className="grid sm:grid-cols-2 sm:gap-x-8 lg:gap-x-12"
        >
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <div
              key={index}
              className="grid min-h-24 grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-white/15 py-5 sm:min-h-28 sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:py-6"
            >
              <div className="h-3 w-5 animate-pulse rounded bg-brand-turquoise/35 motion-reduce:animate-none" />
              <div className="h-5 w-2/3 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
            </div>
          ))}
        </div>
      </SpecialtyDirectory>
      <span className="sr-only">Cargando especialidades</span>
    </SpecialtiesSection>
  );
}
