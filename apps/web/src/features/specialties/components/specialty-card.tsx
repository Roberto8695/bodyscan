import type { Specialty } from "@/features/specialties/types/specialty.types";

type SpecialtyCardProps = {
  specialty: Specialty;
  index: number;
};

export function SpecialtyCard({ specialty, index }: SpecialtyCardProps) {
  return (
    <article className="group relative grid min-h-24 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/12 py-5 last:border-b-0 sm:min-h-28 sm:grid-cols-[3.25rem_1fr_auto] sm:gap-5 sm:py-6">
      <span className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-turquoise">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-white transition-colors group-hover:text-brand-light sm:text-xl">
          {specialty.name}
        </h3>
        {specialty.description ? (
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/60">
            {specialty.description}
          </p>
        ) : null}
      </div>

      <span
        aria-hidden="true"
        className="relative flex size-9 items-center justify-center rounded-full border border-white/12 bg-white/5 sm:size-10"
      >
        <span className="absolute h-px w-3.5 bg-brand-turquoise" />
        <span className="absolute h-3.5 w-px bg-brand-turquoise" />
      </span>
    </article>
  );
}
