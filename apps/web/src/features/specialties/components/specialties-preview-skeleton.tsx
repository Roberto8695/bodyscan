import { SpecialtiesSection } from "@/features/specialties/components/specialties-section";
import { SpecialtyDirectory } from "@/features/specialties/components/specialty-directory";

const SKELETON_ROWS = 12;

export function SpecialtiesPreviewSkeleton() {
  return (
    <SpecialtiesSection>
      <SpecialtyDirectory count={SKELETON_ROWS} isLoading>
        <div
          aria-hidden="true"
          className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
        >
          {Array.from({ length: SKELETON_ROWS }, (_, index) => (
            <div
              key={index}
              className="-mt-px -ml-px flex h-full flex-col gap-5 border-t border-l border-white/10 bg-brand-primary px-5 py-6 sm:px-6 sm:py-7"
            >
              <div className="flex items-center justify-between">
                <div className="h-3 w-6 animate-pulse rounded bg-brand-turquoise/30 motion-reduce:animate-none" />
                <div className="size-10 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none sm:size-11" />
              </div>
              <div className="flex flex-1 flex-col gap-2">
                <div className="h-5 w-3/4 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
                <div className="h-3 w-full animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-white/10 motion-reduce:animate-none" />
              </div>
            </div>
          ))}
        </div>
      </SpecialtyDirectory>
      <span className="sr-only">Cargando especialidades</span>
    </SpecialtiesSection>
  );
}
