import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, Check, Info } from "lucide-react";

const specialties = [
  "Nefrología",
  "Medicina Interna",
  "Cardiología",
  "Pediatría",
  "Neumología",
];

const institutionalImagePlaceholder = `data:image/svg+xml;charset=utf-8,${encodeURIComponent(`
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 1400">
    <defs>
      <linearGradient id="wall" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="#f5fafb"/>
        <stop offset="1" stop-color="#c8e8f0"/>
      </linearGradient>
      <linearGradient id="glass" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stop-color="#78c8d8" stop-opacity=".55"/>
        <stop offset="1" stop-color="#206878" stop-opacity=".9"/>
      </linearGradient>
      <filter id="soft"><feGaussianBlur stdDeviation="36"/></filter>
    </defs>
    <rect width="1200" height="1400" fill="url(#wall)"/>
    <circle cx="1010" cy="190" r="260" fill="#40b8c0" opacity=".16" filter="url(#soft)"/>
    <circle cx="160" cy="1120" r="300" fill="#58a0b8" opacity=".2" filter="url(#soft)"/>
    <path d="M0 1010 380 690l820 170v540H0Z" fill="#fff" opacity=".88"/>
    <path d="M95 900 365 670h725L930 900Z" fill="#fff"/>
    <rect x="210" y="310" width="780" height="620" rx="24" fill="#fff" opacity=".96"/>
    <rect x="276" y="376" width="648" height="438" rx="12" fill="url(#glass)"/>
    <path d="M600 376v438M276 595h648" stroke="#fff" stroke-opacity=".5" stroke-width="10"/>
    <path d="M170 1035h860" stroke="#206878" stroke-opacity=".12" stroke-width="8"/>
    <path d="M220 1095h760" stroke="#206878" stroke-opacity=".08" stroke-width="8"/>
    <circle cx="600" cy="595" r="92" fill="#fff" fill-opacity=".15" stroke="#fff" stroke-opacity=".3" stroke-width="4"/>
    <path d="M600 532c25 32 38 57 38 76 0 20-17 37-38 37s-38-17-38-37c0-19 13-44 38-76Z" fill="#40b8c0"/>
    <circle cx="552" cy="547" r="15" fill="#fff"/>
    <circle cx="648" cy="547" r="15" fill="#fff"/>
    <circle cx="552" cy="643" r="15" fill="#fff"/>
    <circle cx="648" cy="643" r="15" fill="#fff"/>
  </svg>
`)}`;

export function AboutPreview() {
  return (
    <section
      aria-labelledby="about-preview-title"
      className="relative isolate overflow-hidden bg-muted"
    >
      <div
        aria-hidden="true"
        className="absolute top-0 right-0 -z-10 h-full w-1/3 bg-gradient-to-l from-brand-light/20 to-transparent"
      />

      <div className="mx-auto grid w-full max-w-[90rem] items-center gap-12 px-4 py-20 sm:px-6 sm:py-24 lg:grid-cols-[minmax(0,1.05fr)_minmax(26rem,0.95fr)] lg:gap-16 lg:px-8 lg:py-32 xl:gap-24">
        <div className="relative mx-auto w-full max-w-[44rem] lg:mx-0">
          <div
            aria-hidden="true"
            className="absolute -top-5 -left-5 size-24 rounded-tl-[2rem] border-t-2 border-l-2 border-brand-turquoise/55 sm:-top-7 sm:-left-7 sm:size-32"
          />
          <div
            aria-hidden="true"
            className="absolute -right-4 -bottom-4 size-32 rounded-full bg-brand-light/65 sm:-right-7 sm:-bottom-7 sm:size-44"
          />

          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-brand-light shadow-[0_24px_65px_rgba(23,59,73,0.14)] sm:aspect-[5/4] lg:aspect-[4/5]">
            <Image
              src={institutionalImagePlaceholder}
              alt="Composición provisional reservada para una fotografía institucional de Body Scan Medical Center"
              fill
              sizes="(min-width: 1024px) 52vw, (min-width: 640px) calc(100vw - 3rem), calc(100vw - 2rem)"
              className="object-cover"
              unoptimized
            />

            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-foreground/95 via-foreground/70 to-transparent px-5 pt-24 pb-5 sm:px-7 sm:pb-7">
              <div className="flex items-center gap-2 text-[0.68rem] font-semibold tracking-[0.14em] text-brand-sky uppercase">
                <span className="h-px w-7 bg-brand-turquoise" />
                Especialidades médicas
              </div>
              <p className="mt-3 max-w-lg text-sm leading-6 text-white/85 sm:text-base">
                {specialties.join(" · ")}
              </p>
            </div>

            <div className="absolute top-4 left-4 inline-flex min-h-9 items-center gap-2 rounded-full border border-white/35 bg-white/90 px-3.5 text-[0.68rem] font-semibold tracking-[0.08em] text-brand-primary uppercase shadow-sm backdrop-blur-sm sm:top-6 sm:left-6">
              <Info aria-hidden="true" className="size-3.5 text-brand-turquoise" />
              Imagen institucional pendiente
            </div>
          </figure>
        </div>

        <div className="relative max-w-2xl lg:pb-4">
          <div className="flex items-center gap-3 text-xs font-semibold tracking-[0.16em] text-brand-primary uppercase">
            <span aria-hidden="true" className="h-px w-9 bg-brand-turquoise" />
            Conoce Body Scan
          </div>

          <h2
            id="about-preview-title"
            className="mt-6 max-w-[15ch] text-3xl leading-[1.08] font-bold tracking-[-0.035em] text-foreground sm:text-4xl lg:text-[3.25rem]"
          >
            Comprometidos con tu salud,
            <span className="block text-brand-primary">
              enfocados en tu bienestar
            </span>
          </h2>

          <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
            En Body Scan Medical Center trabajamos para ofrecer una atención
            médica especializada, cercana y profesional, poniendo las
            necesidades de cada paciente en el centro de nuestro servicio.
          </p>

          <div className="mt-8 border-y border-border py-5">
            <p className="flex items-start gap-3 text-sm leading-6 text-foreground/75">
              <Check
                aria-hidden="true"
                className="mt-0.5 size-5 shrink-0 text-brand-turquoise"
              />
              Atención especializada con una mirada cercana, respetuosa y
              centrada en cada paciente.
            </p>
          </div>

          <Link
            href="/nosotros"
            className="group mt-8 inline-flex min-h-12 items-center gap-2 rounded-full bg-brand-primary px-6 text-sm font-semibold text-white shadow-[0_12px_28px_rgba(32,104,120,0.18)] outline-none transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand-primary/92 hover:shadow-[0_16px_32px_rgba(32,104,120,0.22)] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
          >
            Conoce más sobre nosotros
            <ArrowUpRight
              aria-hidden="true"
              className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 motion-reduce:transition-none"
            />
          </Link>

          <p className="mt-5 flex max-w-lg items-start gap-2 text-xs leading-5 text-muted-foreground">
            <Info aria-hidden="true" className="mt-0.5 size-3.5 shrink-0" />
            Texto institucional provisional, pendiente de revisión y aprobación
            por Body Scan Medical Center.
          </p>
        </div>
      </div>
    </section>
  );
}
