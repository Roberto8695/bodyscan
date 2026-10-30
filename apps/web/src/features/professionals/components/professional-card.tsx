import {
  getProfessionalAvatarVariant,
  getProfessionalInitials,
} from "@/features/professionals/lib/professional-avatar";
import type { Professional } from "@/features/professionals/types/professional.types";

type ProfessionalCardProps = {
  professional: Professional;
  index: number;
};

const ENTRY_DELAYS = ["0ms", "80ms", "160ms", "240ms", "320ms", "400ms"] as const;

export function ProfessionalCard({ professional, index }: ProfessionalCardProps) {
  const initials = getProfessionalInitials(professional.fullName);
  const avatarVariant = getProfessionalAvatarVariant(professional.id);
  const delay = ENTRY_DELAYS[index % ENTRY_DELAYS.length];
  const specialties = professional.specialties.map((item) => item.specialty);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-background shadow-[0_18px_42px_rgba(23,59,73,0.08)] transition-[transform,box-shadow] duration-500 ease-out hover:-translate-y-1 hover:shadow-[0_28px_58px_rgba(23,59,73,0.14)] motion-reduce:transform-none motion-reduce:transition-none motion-safe:animate-[hero-rise_650ms_ease-out_both]"
      style={{ animationDelay: delay }}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-1 origin-left scale-x-0 bg-brand-turquoise transition-transform duration-500 ease-out group-hover:scale-x-100 motion-reduce:transition-none"
      />

      <div
        aria-hidden={professional.photo === null ? "true" : undefined}
        className={`relative flex aspect-[4/3] w-full items-center justify-center overflow-hidden ${avatarVariant}`}
      >
        <span className="absolute inset-x-6 bottom-5 flex items-center justify-between text-[0.65rem] font-semibold tracking-[0.18em] text-current opacity-70 uppercase">
          <span>{String(index + 1).padStart(2, "0")}</span>
          <span>{professional.photo === null ? "Perfil pendiente" : "Perfil"}</span>
        </span>
        <span className="font-heading text-5xl font-semibold tracking-[-0.04em] text-current sm:text-6xl">
          {initials}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-4 px-6 py-6 sm:px-7 sm:py-7">
        <h3 className="font-heading text-lg leading-[1.2] font-semibold tracking-[-0.02em] text-foreground sm:text-xl">
          {professional.fullName}
        </h3>

        {specialties.length > 0 ? (
          <ul className="flex flex-wrap gap-1.5">
            {specialties.map((specialty) => (
              <li
                key={specialty.id}
                className="rounded-full border border-brand-primary/15 bg-brand-primary/5 px-3 py-1 text-xs font-medium tracking-[-0.005em] text-brand-primary"
              >
                {specialty.name}
              </li>
            ))}
          </ul>
        ) : null}

        {professional.biography ? (
          <p className="line-clamp-3 text-sm leading-6 text-muted-foreground">
            {professional.biography}
          </p>
        ) : null}
      </div>
    </article>
  );
}
