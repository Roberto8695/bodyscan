import type { Specialty } from "@/features/specialties/types/specialty.types";

type SpecialtyCardProps = {
  specialty: Specialty;
  index: number;
};

export function SpecialtyCard({ specialty, index }: SpecialtyCardProps) {
  return (
    <li className="grid min-h-24 grid-cols-[2.5rem_1fr] items-center gap-3 border-t border-white/15 py-5 sm:min-h-28 sm:grid-cols-[3.25rem_1fr] sm:gap-5 sm:py-6">
      <span className="font-heading text-xs font-semibold tracking-[0.14em] text-brand-light">
        {String(index + 1).padStart(2, "0")}
      </span>

      <div>
        <h3 className="font-heading text-lg font-semibold tracking-[-0.02em] text-white sm:text-xl">
          {specialty.name}
        </h3>
        {specialty.description ? (
          <p className="mt-1.5 max-w-xl text-sm leading-6 text-white/80">
            {specialty.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}
