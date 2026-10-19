import { AlertCircle, Stethoscope } from "lucide-react";
import { unstable_rethrow } from "next/navigation";

import { getSpecialties } from "@/features/specialties/api/get-specialties";
import { SpecialtyCard } from "@/features/specialties/components/specialty-card";
import type { Specialty } from "@/features/specialties/types/specialty.types";

const MAX_VISIBLE_SPECIALTIES = 5;

export async function SpecialtiesPreview() {
  const result = await loadSpecialties();

  if (!result.ok) {
    return (
      <SpecialtiesSection>
        <SpecialtiesState
          isError
          title="No pudimos cargar las especialidades"
          description="La información no está disponible en este momento. Puedes intentarlo nuevamente más tarde."
        />
      </SpecialtiesSection>
    );
  }

  const visibleSpecialties = result.specialties.slice(
    0,
    MAX_VISIBLE_SPECIALTIES,
  );

  return (
    <SpecialtiesSection>
      {visibleSpecialties.length > 0 ? (
        <div className="relative overflow-hidden rounded-[1.75rem] bg-brand-primary px-5 py-3 shadow-[0_28px_70px_rgba(23,59,73,0.18)] sm:px-8 sm:py-5 lg:px-10">
          <PanelDecoration />
          <div className="relative">
            {visibleSpecialties.map((specialty, index) => (
              <SpecialtyCard
                key={specialty.id}
                specialty={specialty}
                index={index}
              />
            ))}
          </div>
        </div>
      ) : (
        <SpecialtiesState
          title="Especialidades en preparación"
          description="Todavía no hay especialidades publicadas para mostrar. La información aparecerá aquí cuando esté disponible."
        />
      )}
    </SpecialtiesSection>
  );
}

type SpecialtiesResult =
  | { ok: true; specialties: Specialty[] }
  | { ok: false };

async function loadSpecialties(): Promise<SpecialtiesResult> {
  try {
    const specialties = await getSpecialties();
    return { ok: true, specialties };
  } catch (error) {
    unstable_rethrow(error);
    console.error("No fue posible cargar las especialidades públicas", error);
    return { ok: false };
  }
}

export function SpecialtiesPreviewSkeleton() {
  return (
    <SpecialtiesSection>
      <div
        aria-hidden="true"
        className="overflow-hidden rounded-[1.75rem] bg-brand-primary px-5 py-3 sm:px-8 sm:py-5 lg:px-10"
      >
        {Array.from({ length: MAX_VISIBLE_SPECIALTIES }, (_, index) => (
          <div
            key={index}
            className="grid min-h-24 grid-cols-[2.5rem_1fr_auto] items-center gap-3 border-b border-white/12 py-5 last:border-b-0 sm:min-h-28 sm:grid-cols-[3.25rem_1fr_auto] sm:gap-5 sm:py-6"
          >
            <div className="h-3 w-5 animate-pulse rounded bg-brand-turquoise/35 motion-reduce:animate-none" />
            <div className="h-5 w-2/3 animate-pulse rounded bg-white/15 motion-reduce:animate-none" />
            <div className="size-9 animate-pulse rounded-full bg-white/10 motion-reduce:animate-none sm:size-10" />
          </div>
        ))}
      </div>
      <span className="sr-only">Cargando especialidades</span>
    </SpecialtiesSection>
  );
}

function SpecialtiesSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-labelledby="specialties-preview-title"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-24 -z-10 size-96 rounded-full border border-brand-light/70"
      />
      <div className="mx-auto grid w-full max-w-[90rem] gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(19rem,0.7fr)_minmax(34rem,1.3fr)] lg:items-center lg:gap-16 lg:px-8 lg:py-32 xl:gap-24">
        <header className="max-w-xl">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-brand-primary uppercase">
            <span aria-hidden="true" className="h-px w-9 bg-brand-turquoise" />
            Atención especializada
          </div>
          <h2
            id="specialties-preview-title"
            className="mt-6 max-w-[13ch] text-3xl leading-[1.08] font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[3.25rem]"
          >
            Especialidades médicas
            <span className="block text-brand-primary">a tu servicio</span>
          </h2>
          <p className="mt-6 max-w-lg text-base leading-8 text-muted-foreground sm:text-lg">
            Conoce las áreas de atención publicadas por Body Scan Medical Center
            y encuentra la orientación médica que necesitas.
          </p>
          <div className="mt-8 flex items-center gap-3 border-t border-border pt-6 text-sm text-foreground/70">
            <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-secondary text-brand-primary">
              <Stethoscope aria-hidden="true" className="size-5" />
            </span>
            Información conectada directamente con nuestro centro médico.
          </div>
        </header>

        {children}
      </div>
    </section>
  );
}

function SpecialtiesState({
  title,
  description,
  isError = false,
}: {
  title: string;
  description: string;
  isError?: boolean;
}) {
  return (
    <div
      role={isError ? "alert" : "status"}
      className="relative flex min-h-80 flex-col items-center justify-center overflow-hidden rounded-[1.75rem] border border-border bg-muted px-6 py-12 text-center sm:min-h-96"
    >
      <span className="flex size-12 items-center justify-center rounded-2xl bg-white text-brand-primary shadow-sm">
        {isError ? (
          <AlertCircle aria-hidden="true" className="size-5" />
        ) : (
          <Stethoscope aria-hidden="true" className="size-5" />
        )}
      </span>
      <h3 className="mt-5 font-heading text-xl font-semibold text-foreground">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>
    </div>
  );
}

function PanelDecoration() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0">
      <div className="absolute -top-28 -right-20 size-72 rounded-full border border-white/8" />
      <div className="absolute -top-12 -right-8 size-40 rounded-full border border-brand-turquoise/18" />
      <div className="absolute -bottom-24 left-1/3 size-52 rounded-full bg-brand-turquoise/8 blur-2xl" />
    </div>
  );
}
