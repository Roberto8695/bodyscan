import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

type HeroIndexItem = {
  number: string;
  title: string;
  description: string;
  href: string;
};

const heroIndex: HeroIndexItem[] = [
  {
    number: "01",
    title: "Especialidades",
    description: "Áreas médicas de atención.",
    href: "/especialidades",
  },
  {
    number: "02",
    title: "Profesionales",
    description: "Equipo médico de la clínica.",
    href: "/profesionales",
  },
  {
    number: "03",
    title: "Academia",
    description: "Cursos y talleres de formación.",
    href: "/academia",
  },
  {
    number: "04",
    title: "Blog",
    description: "Artículos y noticias publicadas.",
    href: "/blog",
  },
];

export function HeroSection() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden bg-background"
    >
      <div
        aria-hidden="true"
        className="absolute inset-y-0 right-0 -z-10 hidden w-[55%] bg-gradient-to-l from-brand-light/55 via-brand-light/15 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -z-10 hidden h-[22rem] w-px bg-brand-turquoise/35 lg:block"
      />

      <div className="mx-auto flex min-h-[calc(100svh-5rem)] w-full max-w-[90rem] flex-col px-4 pt-12 pb-20 sm:px-6 sm:pt-14 sm:pb-24 lg:px-8 lg:pt-10 lg:pb-16 xl:pt-14 xl:pb-20">
        <header className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          <div className="flex items-center gap-3">
            <span aria-hidden="true" className="h-px w-10 bg-brand-turquoise" />
            <span>Cochabamba · Bolivia</span>
          </div>
          <span className="text-brand-primary/85">
            Centro médico y academia
          </span>
        </header>

        <div className="my-auto grid gap-14 pt-16 sm:pt-20 lg:grid-cols-12 lg:gap-10 lg:pt-10 xl:gap-14 xl:pt-16">
          <div className="min-w-0 lg:col-span-7 lg:pr-6 xl:pr-12">
            <h1
              id="hero-title"
              className="max-w-[13ch] text-[clamp(2.5rem,5.4vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.04em] text-balance text-foreground"
            >
              Atención médica{" "}
              <span className="relative inline-block whitespace-nowrap text-brand-primary">
                especializada
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-[0.14em] origin-left scale-x-0 bg-brand-turquoise motion-safe:animate-[hero-underline_650ms_ease-out_320ms_forwards]"
                />
              </span>
              , cerca de ti.
            </h1>

            <div className="mt-8 flex max-w-2xl gap-5 motion-safe:animate-[hero-rise_600ms_ease-out_120ms_both] sm:gap-7 lg:mt-6 xl:mt-8">
              <span
                aria-hidden="true"
                className="w-[2px] shrink-0 self-stretch bg-brand-turquoise"
              />
              <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                Conoce las especialidades, profesionales y servicios de Body
                Scan Medical Center, junto con nuestra propuesta de formación
                médica.
              </p>
            </div>

            <div className="mt-8 flex flex-col items-stretch gap-5 motion-safe:animate-[hero-rise_600ms_ease-out_240ms_both] sm:flex-row sm:items-center sm:gap-8 lg:mt-6 xl:mt-10">
              <Link
                href="/especialidades"
                className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-primary px-7 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(32,104,120,0.22)] outline-none transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand-primary/92 hover:shadow-[0_18px_38px_rgba(32,104,120,0.28)] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
              >
                Conoce las especialidades
                <ArrowRight
                  aria-hidden="true"
                  className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
              <Link
                href="/academia"
                className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:self-center"
              >
                <span className="relative">
                  Explora la academia
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-brand-turquoise transition-transform duration-300 group-hover:scale-x-100 motion-reduce:transition-none"
                  />
                </span>
                <ArrowUpRight
                  aria-hidden="true"
                  className="size-4 shrink-0 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none"
                />
              </Link>
            </div>
          </div>

          <aside
            aria-label="Secciones del sitio"
            className="min-w-0 motion-safe:animate-[hero-rise_700ms_ease-out_200ms_both] lg:col-span-5"
          >
            <div className="relative isolate overflow-hidden rounded-2xl border border-border bg-background shadow-[0_26px_60px_rgba(23,59,73,0.08)]">
              <span
                aria-hidden="true"
                className="absolute inset-x-0 top-0 h-1.5 bg-brand-turquoise"
              />
              <div className="flex items-center justify-between gap-4 border-b border-border/70 px-6 pt-8 pb-5 sm:px-8">
                <p className="font-heading text-sm font-semibold tracking-[-0.01em] text-foreground sm:text-base">
                  En este sitio
                </p>
                <p className="text-[0.65rem] font-semibold tracking-[0.12em] text-muted-foreground uppercase">
                  Edición vigente
                </p>
              </div>
              <ol className="divide-y divide-border/70">
                {heroIndex.map((item) => (
                  <li key={item.number}>
                    <Link
                      href={item.href}
                      className="group grid grid-cols-[2.5rem_1fr_auto] items-center gap-4 px-6 py-5 outline-none transition-colors hover:bg-secondary focus-visible:bg-secondary focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-brand-primary sm:grid-cols-[3rem_1fr_auto] sm:px-8"
                    >
                      <span className="font-heading text-base font-semibold tracking-[0.08em] text-brand-turquoise">
                        {item.number}
                      </span>
                      <span className="min-w-0">
                        <span className="block font-heading text-base font-semibold tracking-[-0.01em] text-foreground transition-colors group-hover:text-brand-primary sm:text-lg">
                          {item.title}
                        </span>
                        <span className="mt-1 block text-sm leading-5 text-muted-foreground">
                          {item.description}
                        </span>
                      </span>
                      <ArrowUpRight
                        aria-hidden="true"
                        className="size-4 shrink-0 text-brand-primary/55 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-brand-primary motion-reduce:transition-none"
                      />
                    </Link>
                  </li>
                ))}
              </ol>
            </div>
          </aside>
        </div>
      </div>
    </section>
  );
}
