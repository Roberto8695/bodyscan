import { ProfessionalsSection } from "@/features/professionals/components/professionals-section";

const SKELETON_CARDS = 8;

export function ProfessionalsPreviewSkeleton() {
  return (
    <ProfessionalsSection>
      <ul
        aria-hidden="true"
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8"
      >
        {Array.from({ length: SKELETON_CARDS }, (_, index) => (
          <li
            key={index}
            className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background"
          >
            <div className="aspect-[4/3] w-full animate-pulse bg-brand-light/60 motion-reduce:animate-none" />
            <div className="flex flex-1 flex-col gap-4 px-6 py-6 sm:px-7 sm:py-7">
              <div className="h-5 w-3/4 animate-pulse rounded bg-muted motion-reduce:animate-none" />
              <div className="flex gap-2">
                <div className="h-5 w-20 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
                <div className="h-5 w-16 animate-pulse rounded-full bg-muted motion-reduce:animate-none" />
              </div>
              <div className="space-y-2">
                <div className="h-3 w-full animate-pulse rounded bg-muted motion-reduce:animate-none" />
                <div className="h-3 w-5/6 animate-pulse rounded bg-muted motion-reduce:animate-none" />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <span className="sr-only">Cargando equipo médico</span>
    </ProfessionalsSection>
  );
}
