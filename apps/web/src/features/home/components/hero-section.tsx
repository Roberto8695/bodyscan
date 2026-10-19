import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  GraduationCap,
  MapPin,
  Stethoscope,
} from "lucide-react";

const serviceHighlights = [
  "Atención especializada",
  "Profesionales de la salud",
  "Formación médica",
];

export function HeroSection() {
  return (
    <section className="relative isolate overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-gradient-to-b from-secondary/75 to-transparent"
      />
      <div
        aria-hidden="true"
        className="absolute top-20 -left-36 -z-10 size-80 rounded-full bg-brand-light/45 blur-3xl"
      />

      <div className="mx-auto grid min-h-[calc(100svh-5rem)] w-full max-w-[90rem] items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[minmax(0,0.92fr)_minmax(31rem,1.08fr)] lg:gap-14 lg:px-8 lg:py-24 xl:gap-20">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-brand-primary/15 bg-white px-3.5 py-1.5 text-xs font-semibold tracking-[0.08em] text-brand-primary uppercase shadow-[0_8px_30px_rgba(32,104,120,0.07)]">
            <MapPin aria-hidden="true" className="size-3.5 text-brand-turquoise" />
            Cochabamba, Bolivia
          </div>

          <h1 className="mt-7 max-w-[13ch] text-[clamp(2.65rem,7.5vw,5.25rem)] leading-[0.98] font-bold tracking-[-0.045em] text-foreground">
            Salud especializada,
            <span className="mt-2 block text-brand-primary">
              conocimiento
              <span className="relative ml-[0.18em] inline-block text-brand-turquoise">
                que acompaña.
                <svg
                  aria-hidden="true"
                  className="absolute -bottom-2 left-0 h-2.5 w-full text-brand-turquoise/35"
                  viewBox="0 0 280 12"
                  preserveAspectRatio="none"
                >
                  <path
                    d="M2 8.5C62 2.8 185 2.6 278 7"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="4"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
            Conoce nuestras especialidades, profesionales y servicios. Explora
            también la academia y los contenidos de formación médica de Body
            Scan Medical Center.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
            <Link
              href="/especialidades"
              className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-brand-primary px-6 text-sm font-semibold text-white shadow-[0_12px_30px_rgba(32,104,120,0.2)] outline-none transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand-primary/92 hover:shadow-[0_16px_34px_rgba(32,104,120,0.25)] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
            >
              Conocer especialidades
              <ArrowRight
                aria-hidden="true"
                className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
              />
            </Link>
            <Link
              href="/academia"
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full border border-brand-primary/20 bg-white px-6 text-sm font-semibold text-brand-primary outline-none transition-colors hover:border-brand-turquoise/60 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transition-none"
            >
              <BookOpen aria-hidden="true" className="size-4" />
              Explorar la academia
            </Link>
          </div>

          <ul className="mt-10 flex max-w-xl flex-wrap gap-x-5 gap-y-3 border-t border-border pt-6">
            {serviceHighlights.map((highlight) => (
              <li
                key={highlight}
                className="flex items-center gap-2 text-xs font-medium text-foreground/70 sm:text-sm"
              >
                <span
                  aria-hidden="true"
                  className="size-1.5 rounded-full bg-brand-turquoise"
                />
                {highlight}
              </li>
            ))}
          </ul>
        </div>

        <ClinicalBrandVisual />
      </div>
    </section>
  );
}

function ClinicalBrandVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[42rem] lg:mx-0 lg:justify-self-end">
      <div
        aria-hidden="true"
        className="absolute -inset-5 -z-10 rounded-[2rem] border border-brand-primary/8 bg-brand-light/20 sm:-inset-7"
      />
      <div className="relative min-h-[28rem] overflow-hidden rounded-[1.75rem] bg-brand-primary p-5 shadow-[0_32px_80px_rgba(23,59,73,0.22)] sm:min-h-[34rem] sm:p-8">
        <div
          aria-hidden="true"
          className="absolute inset-0 bg-gradient-to-br from-brand-turquoise/28 via-transparent to-foreground/25"
        />
        <div
          aria-hidden="true"
          className="absolute -top-28 -right-24 size-80 rounded-full border border-white/10"
        />
        <div
          aria-hidden="true"
          className="absolute -right-8 -bottom-28 size-72 rounded-full bg-brand-turquoise/15 blur-3xl"
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 opacity-[0.08] [background-image:linear-gradient(to_right,white_1px,transparent_1px),linear-gradient(to_bottom,white_1px,transparent_1px)] [background-size:44px_44px]"
        />

        <div className="relative flex items-center justify-between gap-4">
          <div className="inline-flex min-h-9 items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 text-xs font-medium text-white/85 backdrop-blur-sm">
            <span
              aria-hidden="true"
              className="size-2 rounded-full bg-brand-turquoise shadow-[0_0_0_4px_rgba(64,184,192,0.14)]"
            />
            Body Scan Medical Center
          </div>
          <span className="hidden text-[0.65rem] font-semibold tracking-[0.18em] text-white/45 uppercase sm:block">
            Clínica + Academia
          </span>
        </div>

        <div className="relative flex min-h-[20rem] items-center justify-center sm:min-h-[25rem]">
          <div className="relative flex size-52 items-center justify-center sm:size-72">
            <div
              aria-hidden="true"
              className="absolute inset-0 rounded-full border border-white/12"
            />
            <div
              aria-hidden="true"
              className="absolute inset-7 rounded-full border border-dashed border-brand-sky/35"
            />
            <div
              aria-hidden="true"
              className="absolute inset-[4.25rem] rounded-full border border-white/15 bg-white/5 backdrop-blur-sm sm:inset-[5.75rem]"
            />

            <svg
              aria-hidden="true"
              className="relative size-20 sm:size-24"
              viewBox="0 0 64 64"
            >
              <path
                className="fill-brand-turquoise"
                d="M32 8c4.4 5.6 6.7 10.1 6.7 13.6 0 3.6-1.6 6.7-4.1 8.5 1.8-2.5 4.9-4.1 8.5-4.1 3.5 0 8 2.3 13.6 6-5.6 3.7-10.1 6-13.6 6-3.6 0-6.7-1.6-8.5-4.1 2.5 1.8 4.1 4.9 4.1 8.5 0 3.5-2.3 8-6.7 13.6-4.4-5.6-6.7-10.1-6.7-13.6 0-3.6 1.6-6.7 4.1-8.5-1.8 2.5-4.9 4.1-8.5 4.1-3.5 0-8-2.3-13.6-6 5.6-3.7 10.1-6 13.6-6 3.6 0 6.7 1.6 8.5 4.1-2.5-1.8-4.1-4.9-4.1-8.5C25.3 18.1 27.6 13.6 32 8Z"
              />
              <circle className="fill-white" cx="17" cy="17" r="5" />
              <circle className="fill-white" cx="47" cy="17" r="5" />
              <circle className="fill-white" cx="17" cy="47" r="5" />
              <circle className="fill-white" cx="47" cy="47" r="5" />
            </svg>

            <VisualLabel
              className="-top-3 left-1/2 -translate-x-1/2"
              icon={Stethoscope}
              label="Clínica"
            />
            <VisualLabel
              className="top-1/2 -right-12 -translate-y-1/2 sm:-right-16"
              icon={GraduationCap}
              label="Academia"
            />
            <VisualLabel
              className="-bottom-3 left-1/2 -translate-x-1/2"
              icon={BookOpen}
              label="Contenido"
            />
          </div>
        </div>

        <div className="relative grid grid-cols-[auto_1fr] items-center gap-4 rounded-2xl border border-white/12 bg-white/9 p-4 backdrop-blur-md sm:p-5">
          <div className="flex size-11 items-center justify-center rounded-xl bg-white text-brand-primary">
            <Stethoscope aria-hidden="true" className="size-5" />
          </div>
          <div>
            <p className="font-heading text-sm font-semibold text-white">
              Un centro, dos formas de cuidar
            </p>
            <p className="mt-1 text-xs leading-5 text-white/62">
              Atención médica e iniciativas de formación para profesionales.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

type VisualLabelProps = {
  className: string;
  icon: typeof Stethoscope;
  label: string;
};

function VisualLabel({ className, icon: Icon, label }: VisualLabelProps) {
  return (
    <div
      className={`absolute inline-flex min-h-10 items-center gap-2 rounded-full border border-white/12 bg-white px-3.5 text-xs font-semibold whitespace-nowrap text-brand-primary shadow-lg ${className}`}
    >
      <Icon aria-hidden="true" className="size-3.5 text-brand-turquoise" />
      {label}
    </div>
  );
}
