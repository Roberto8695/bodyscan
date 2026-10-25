import { ImageIcon } from "lucide-react";

export function SpecialtiesSection({ children }: { children: React.ReactNode }) {
  return (
    <section
      aria-labelledby="specialties-preview-title"
      className="relative isolate overflow-hidden bg-background py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-border"
      />
      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <h2
            id="specialties-preview-title"
            className="max-w-[14ch] text-3xl leading-[1.06] font-bold tracking-[-0.035em] text-foreground text-balance sm:text-4xl lg:col-span-7 lg:text-[3.5rem]"
          >
            Especialidades para una atención
            <span className="block text-brand-primary">médica integral</span>
          </h2>
          <div className="max-w-xl lg:col-span-4 lg:col-start-9">
            <div className="mb-6 h-px w-20 bg-brand-turquoise" />
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Conoce las áreas de atención actualmente publicadas por Body
              Scan Medical Center.
            </p>
          </div>
        </header>

        <figure className="relative mt-12 aspect-[4/3] overflow-hidden rounded-2xl bg-brand-light sm:aspect-[16/8] lg:mt-16 lg:aspect-[16/6]">
          <div
            aria-hidden="true"
            className="absolute inset-y-0 right-0 w-[32%] bg-brand-sky/35"
          />
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-[41%] w-px bg-brand-primary/15"
          />
          <div
            aria-hidden="true"
            className="absolute inset-x-0 top-0 h-2 bg-brand-turquoise"
          />
          <figcaption className="absolute inset-x-5 bottom-5 max-w-xl bg-background px-5 py-4 sm:inset-x-auto sm:bottom-8 sm:left-8 sm:px-6 sm:py-5">
            <div className="flex items-start gap-3">
              <ImageIcon
                aria-hidden="true"
                className="mt-0.5 size-4 shrink-0 text-brand-primary"
              />
              <div>
                <p className="font-heading text-sm font-semibold text-foreground sm:text-base">
                  Fotografía institucional pendiente
                </p>
                <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm sm:leading-6">
                  Este encuadre panorámico está preparado para una imagen
                  aprobada de la clínica o de su equipo médico.
                </p>
              </div>
            </div>
          </figcaption>
        </figure>

        <div className="mt-10 sm:mt-12 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
