export function ProfessionalsSection({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section
      aria-labelledby="professionals-preview-title"
      className="relative isolate overflow-hidden bg-muted py-20 sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-border"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -z-10 hidden h-[22rem] w-px bg-brand-turquoise/35 lg:block"
      />

      <div className="mx-auto w-full max-w-[90rem] px-4 sm:px-6 lg:px-8">
        <header className="grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-10">
          <div className="lg:col-span-7">
            <div className="mb-6 flex items-center gap-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              <span aria-hidden="true" className="h-px w-10 bg-brand-turquoise" />
              <span>Equipo médico</span>
            </div>
            <h2
              id="professionals-preview-title"
              className="max-w-[16ch] text-3xl leading-[1.06] font-bold tracking-[-0.035em] text-foreground text-balance sm:text-4xl lg:text-[3.5rem]"
            >
              Profesionales que
              <span className="block text-brand-primary">conforman la clínica</span>
            </h2>
          </div>
          <div className="max-w-xl lg:col-span-4 lg:col-start-9">
            <div className="mb-6 h-px w-20 bg-brand-turquoise" />
            <p className="text-base leading-8 text-muted-foreground sm:text-lg">
              Conoce al equipo de especialistas que atiende en Body Scan Medical
              Center, con sus áreas de ejercicio profesional.
            </p>
          </div>
        </header>

        <div className="mt-10 sm:mt-12 lg:mt-16">{children}</div>
      </div>
    </section>
  );
}
