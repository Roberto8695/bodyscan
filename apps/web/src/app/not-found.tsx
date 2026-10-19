import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  HeartPulse,
  Home,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada | Body Scan Medical Center",
  description:
    "La página que buscas no está disponible. Regresa al inicio de Body Scan Medical Center.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex min-h-svh overflow-hidden bg-background px-5 py-6 sm:px-8 lg:px-12">
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-20 bg-[radial-gradient(circle_at_15%_15%,color-mix(in_oklch,var(--brand-light)_72%,transparent),transparent_36%),radial-gradient(circle_at_88%_78%,color-mix(in_oklch,var(--brand-sky)_28%,transparent),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10 opacity-40 [background-image:linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] [background-size:3rem_3rem] [mask-image:linear-gradient(to_bottom,black,transparent_82%)]"
      />

      <div className="mx-auto flex w-full max-w-7xl flex-col">
        <header className="flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-xl focus-visible:outline-offset-4"
            aria-label="Ir al inicio de Body Scan Medical Center"
          >
            <span className="grid size-11 place-items-center rounded-xl bg-primary text-primary-foreground shadow-[0_10px_30px_-12px_var(--brand-primary)] transition-transform group-hover:-rotate-3 group-hover:scale-105">
              <HeartPulse className="size-6" strokeWidth={2.25} />
            </span>
            <span className="leading-none">
              <span className="block font-heading text-base font-bold tracking-[-0.02em] text-foreground sm:text-lg">
                Body Scan
              </span>
              <span className="mt-1 block text-[0.65rem] font-semibold tracking-[0.18em] text-muted-foreground uppercase sm:text-xs">
                Medical Center
              </span>
            </span>
          </Link>

          <div className="hidden items-center gap-2 rounded-full border border-border/80 bg-card/75 px-4 py-2 text-xs font-medium text-muted-foreground shadow-sm backdrop-blur sm:flex">
            <ShieldCheck className="size-4 text-brand-turquoise" />
            Atención médica confiable
          </div>
        </header>

        <section className="grid flex-1 items-center gap-10 py-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(28rem,1.1fr)] lg:gap-16 lg:py-16">
          <div className="relative z-10 max-w-2xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-brand-turquoise/25 bg-secondary/80 px-3.5 py-2 text-xs font-bold tracking-[0.16em] text-secondary-foreground uppercase backdrop-blur">
              <Stethoscope className="size-4" />
              Diagnóstico 404
            </div>

            <p className="font-heading text-7xl font-black leading-none tracking-[-0.08em] text-brand-primary/10 sm:text-8xl lg:text-9xl">
              404
            </p>
            <h1 className="-mt-3 max-w-xl font-heading text-4xl font-bold leading-[1.08] tracking-[-0.04em] text-foreground sm:text-5xl lg:text-6xl">
              Esta página necesita una revisión.
            </h1>
            <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
              No encontramos la dirección que solicitaste. Puede que haya cambiado
              o que el enlace ya no esté disponible, pero podemos ayudarte a volver
              al lugar correcto.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/"
                className="group inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-[0_14px_32px_-14px_var(--brand-primary)] transition-all hover:-translate-y-0.5 hover:bg-brand-primary/90 hover:shadow-[0_18px_36px_-14px_var(--brand-primary)]"
              >
                <Home className="size-4" />
                Volver al inicio
                <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                href="/#servicios"
                className="inline-flex min-h-12 items-center justify-center rounded-xl border border-border bg-card/80 px-6 py-3 text-sm font-semibold text-foreground shadow-sm backdrop-blur transition-all hover:-translate-y-0.5 hover:border-brand-turquoise/50 hover:bg-secondary"
              >
                Explorar nuestros servicios
              </Link>
            </div>

            <p className="mt-8 flex items-center gap-2 text-sm text-muted-foreground">
              <span className="size-2 rounded-full bg-brand-turquoise shadow-[0_0_0_5px_color-mix(in_oklch,var(--brand-turquoise)_15%,transparent)]" />
              Tu bienestar sigue siendo nuestra prioridad.
            </p>
          </div>

          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -inset-8 -z-10 rounded-full bg-brand-light/45 blur-3xl"
            />

            <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-card/80 p-4 shadow-[0_30px_80px_-38px_var(--brand-primary)] backdrop-blur-xl sm:p-7">
              <div className="mb-5 flex items-center justify-between border-b border-border/70 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid size-10 place-items-center rounded-xl bg-secondary text-primary">
                    <HeartPulse className="size-5" />
                  </div>
                  <div>
                    <p className="font-heading text-sm font-bold text-foreground">
                      Monitor de navegación
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      Body Scan Medical Center
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-2 text-xs font-semibold text-brand-primary">
                  <span className="relative flex size-2">
                    <span className="absolute inline-flex size-full animate-ping rounded-full bg-brand-turquoise opacity-60" />
                    <span className="relative inline-flex size-2 rounded-full bg-brand-turquoise" />
                  </span>
                  En línea
                </span>
              </div>

              <div className="relative grid min-h-72 place-items-center overflow-hidden rounded-2xl bg-[linear-gradient(145deg,var(--secondary),color-mix(in_oklch,var(--brand-light)_55%,white))] sm:min-h-96">
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-45 [background-image:linear-gradient(to_right,var(--brand-ocean)_1px,transparent_1px),linear-gradient(to_bottom,var(--brand-ocean)_1px,transparent_1px)] [background-size:2rem_2rem] [mask-image:radial-gradient(circle_at_center,black,transparent_72%)]"
                />

                <div className="relative grid size-48 place-items-center sm:size-64">
                  <div className="absolute inset-0 rounded-full border border-brand-ocean/15" />
                  <div className="absolute inset-5 rounded-full border border-brand-ocean/25" />
                  <div className="absolute inset-10 animate-pulse rounded-full border-2 border-brand-turquoise/35" />
                  <div className="absolute inset-14 rounded-full bg-card/75 shadow-[inset_0_0_35px_color-mix(in_oklch,var(--brand-sky)_20%,transparent),0_24px_50px_-30px_var(--brand-primary)] backdrop-blur sm:inset-16">
                    <div className="absolute inset-x-6 top-1/2 h-px bg-brand-primary/15" />
                    <div className="absolute inset-y-6 left-1/2 w-px bg-brand-primary/15" />
                  </div>

                  <div className="relative text-center">
                    <span className="block font-heading text-5xl font-black tracking-[-0.08em] text-primary sm:text-7xl">
                      404
                    </span>
                    <span className="mt-1 block text-[0.65rem] font-bold tracking-[0.2em] text-muted-foreground uppercase">
                      Sin resultados
                    </span>
                  </div>

                  <svg
                    viewBox="0 0 260 70"
                    className="absolute left-1/2 top-1/2 w-[115%] -translate-x-1/2 -translate-y-1/2 overflow-visible"
                    role="img"
                    aria-label="Línea de pulso médica decorativa"
                  >
                    <path
                      d="M0 38h75l10-18 15 42 18-57 18 53 13-20h111"
                      fill="none"
                      stroke="var(--brand-turquoise)"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="4"
                    />
                  </svg>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-white/70 bg-card/75 px-4 py-3 text-xs text-muted-foreground shadow-sm backdrop-blur sm:bottom-6 sm:left-6 sm:right-6">
                  <span>Ruta no localizada</span>
                  <span className="font-semibold text-primary">Estado estable</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        <footer className="flex flex-col gap-2 border-t border-border/70 pt-5 text-xs text-muted-foreground sm:flex-row sm:items-center sm:justify-between">
          <p>© Body Scan Medical Center</p>
          <p>Atención especializada · Formación profesional</p>
        </footer>
      </div>
    </main>
  );
}
