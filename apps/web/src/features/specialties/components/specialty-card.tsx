import { getSpecialtyIcon } from "@/features/specialties/lib/specialty-icon";
import type { Specialty } from "@/features/specialties/types/specialty.types";

type SpecialtyCardProps = {
  specialty: Specialty;
  index: number;
};

export function SpecialtyCard({ specialty, index }: SpecialtyCardProps) {
  const Icon = getSpecialtyIcon(specialty.slug, specialty.name);

  return (
    <li className="group relative -mt-px -ml-px flex h-full flex-col gap-5 border-t border-l border-white/10 bg-brand-primary px-5 py-6 transition-colors duration-300 hover:bg-brand-primary/80 sm:px-6 sm:py-7">
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-5 bottom-0 h-px origin-left scale-x-0 bg-brand-turquoise transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none sm:inset-x-6"
      />

      <div className="flex items-center justify-between">
        <span className="font-heading text-[0.7rem] font-semibold tracking-[0.2em] text-brand-light/70">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span
          aria-hidden="true"
          className="flex size-10 items-center justify-center rounded-full border border-white/15 text-brand-light transition-all duration-300 group-hover:border-brand-turquoise group-hover:text-brand-turquoise sm:size-11"
        >
          <Icon className="size-5 sm:size-[1.35rem]" strokeWidth={1.5} />
        </span>
      </div>

      <div className="flex flex-1 flex-col">
        <h3 className="font-heading text-lg leading-[1.15] font-semibold tracking-[-0.02em] text-white sm:text-xl">
          {specialty.name}
        </h3>
        {specialty.description ? (
          <p className="mt-2 line-clamp-3 text-sm leading-6 text-white/70">
            {specialty.description}
          </p>
        ) : null}
      </div>
    </li>
  );
}
