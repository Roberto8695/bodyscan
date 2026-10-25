import { Info } from "lucide-react";

type IdentityStatement = {
  number: string;
  label: string;
  body: string;
};

const identityStatements: IdentityStatement[] = [
  {
    number: "01",
    label: "Nosotros",
    body: "En Body Scan Medical Center trabajamos para ofrecer una atención médica especializada, cercana y profesional, poniendo las necesidades de cada paciente en el centro de nuestro servicio.",
  },
  {
    number: "02",
    label: "Misión",
    body: "Acompañar a cada paciente con atención médica especializada, equipos confiables e información clara, cuidando cada etapa del proceso clínico desde la consulta hasta el seguimiento.",
  },
  {
    number: "03",
    label: "Visión",
    body: "Consolidarnos en Cochabamba como un referente médico que integra rigor clínico y formación continua, al servicio de la comunidad y de las nuevas generaciones de profesionales de la salud.",
  },
];

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-title"
      className="relative isolate overflow-hidden bg-muted"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-border"
      />

      <div className="mx-auto w-full max-w-[90rem] px-4 py-20 sm:px-6 sm:py-24 lg:px-8 lg:py-32">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-turquoise" />
            <span>Capítulo 02</span>
          </div>
          <span className="text-brand-primary/85">Identidad institucional</span>
        </header>

        <div className="mt-14 grid gap-14 lg:mt-20 lg:grid-cols-12 lg:gap-12 xl:gap-16">
          <figure className="relative mx-auto w-full max-w-[26rem] lg:col-span-5 lg:mx-0 lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-primary shadow-[0_26px_70px_rgba(23,59,73,0.16)]">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-brand-turquoise"
              />

              <p className="absolute top-10 left-6 whitespace-nowrap text-[0.65rem] font-semibold tracking-[0.3em] text-white/60 uppercase [writing-mode:vertical-rl] sm:left-8 sm:top-12">
                Fotografía institucional
              </p>

              <div className="absolute inset-0 flex items-center justify-center">
                <div aria-hidden="true" className="relative h-16 w-16">
                  <span className="absolute top-0 left-1/2 h-full w-px -translate-x-1/2 bg-brand-turquoise/60" />
                  <span className="absolute top-1/2 left-0 h-px w-full -translate-y-1/2 bg-brand-turquoise/60" />
                </div>
              </div>

              <p
                aria-hidden="true"
                className="absolute right-6 bottom-14 font-heading text-[5rem] leading-none font-semibold tracking-tight text-white/12 sm:right-8 sm:bottom-16 sm:text-[6.5rem]"
              >
                02
              </p>

              <figcaption className="absolute inset-x-6 bottom-6 flex items-center gap-2 text-[0.65rem] font-semibold tracking-[0.12em] text-white/70 uppercase sm:inset-x-8 sm:bottom-7">
                <span>Body Scan</span>
                <span aria-hidden="true" className="h-px w-6 bg-brand-turquoise/60" />
                <span>Pendiente de aprobación</span>
              </figcaption>
            </div>
          </figure>

          <div className="min-w-0 lg:col-span-7 lg:pl-4 xl:pl-10">
            <h2
              id="about-preview-title"
              className="max-w-[16ch] text-3xl leading-[1.08] font-bold tracking-[-0.035em] text-balance text-foreground sm:text-4xl lg:text-[3.25rem]"
            >
              Comprometidos con tu salud,{" "}
              <span className="block text-brand-primary">
                enfocados en tu bienestar.
              </span>
            </h2>

            <ol className="mt-12 space-y-10 lg:mt-16 lg:space-y-12">
              {identityStatements.map((item, index) => (
                <li
                  key={item.number}
                  style={{ animationDelay: `${120 + index * 140}ms` }}
                  className="motion-safe:animate-[hero-rise_650ms_ease-out_both]"
                >
                  <div className="grid grid-cols-[auto_1fr] items-start gap-6 sm:gap-10">
                    <div className="flex min-w-16 flex-col gap-2 border-t-2 border-brand-turquoise pt-4 sm:min-w-20">
                      <span className="font-heading text-2xl font-semibold tracking-tight text-brand-primary sm:text-3xl">
                        {item.number}
                      </span>
                      <span className="text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase">
                        {item.label}
                      </span>
                    </div>
                    <p className="max-w-[62ch] pt-2 text-base leading-7 text-foreground/90 sm:text-lg sm:leading-8">
                      {item.body}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <p className="mt-14 flex max-w-xl items-start gap-2 border-t border-border/70 pt-5 text-xs leading-5 text-muted-foreground">
              <Info
                aria-hidden="true"
                className="mt-0.5 size-3.5 shrink-0 text-brand-turquoise"
              />
              Contenido institucional provisional. La misión y la visión están
              pendientes de redacción y aprobación por Body Scan Medical
              Center.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
