import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Página no encontrada | Body Scan Medical Center",
  description:
    "La página que buscas no está disponible. Regresa al inicio de Body Scan Medical Center.",
};

export default function NotFound() {
  return (
    <main className="relative isolate flex h-svh w-full flex-col overflow-hidden bg-background">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden w-[45%] bg-gradient-to-l from-brand-light/50 via-brand-light/10 to-transparent lg:block"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute top-0 right-0 -z-10 hidden h-[22rem] w-px bg-brand-turquoise/35 lg:block"
      />

      <div className="mx-auto flex h-full w-full max-w-[90rem] flex-col px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-10">
        <header className="flex items-center justify-between text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
          <Link
            href="/"
            className="inline-flex items-center gap-3 outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2"
            aria-label="Ir al inicio de Body Scan Medical Center"
          >
            <span aria-hidden="true" className="h-px w-10 bg-brand-turquoise" />
            <span>Body Scan Medical Center</span>
          </Link>
          <span className="hidden text-brand-primary/85 sm:inline">
            Error 404
          </span>
        </header>

        <section className="my-auto grid gap-10 lg:grid-cols-12 lg:items-end lg:gap-14">
          <div className="min-w-0 lg:col-span-7">
            <p
              aria-hidden="true"
              className="font-heading text-[clamp(5rem,14vw,11rem)] leading-[0.9] font-bold tracking-[-0.055em] text-brand-primary/10"
            >
              404
            </p>

            <h1 className="mt-2 max-w-[16ch] font-heading text-[clamp(2.25rem,5vw,4.25rem)] leading-[1.02] font-bold tracking-[-0.035em] text-balance text-foreground sm:-mt-4 lg:-mt-6">
              Esta página no está{" "}
              <span className="relative inline-block whitespace-nowrap text-brand-primary">
                disponible
                <span
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-1 h-[0.1em] bg-brand-turquoise"
                />
              </span>
              .
            </h1>
          </div>

          <div className="min-w-0 lg:col-span-5">
            <div className="flex gap-5 sm:gap-7">
              <span
                aria-hidden="true"
                className="w-[2px] shrink-0 self-stretch bg-brand-turquoise"
              />
              <div>
                <p className="text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                  No encontramos la dirección que solicitaste. Puede que el
                  enlace haya cambiado o que la página ya no esté publicada.
                </p>

                <div className="mt-8 flex flex-col items-stretch gap-5 sm:flex-row sm:items-center sm:gap-7">
                  <Link
                    href="/"
                    className="group inline-flex min-h-12 items-center justify-center gap-3 rounded-full bg-brand-primary px-7 text-sm font-semibold text-white shadow-[0_14px_32px_rgba(32,104,120,0.22)] outline-none transition-[background-color,transform,box-shadow] hover:-translate-y-0.5 hover:bg-brand-primary/92 hover:shadow-[0_18px_38px_rgba(32,104,120,0.28)] focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 motion-reduce:transform-none motion-reduce:transition-none"
                  >
                    Volver al inicio
                    <ArrowRight
                      aria-hidden="true"
                      className="size-4 transition-transform group-hover:translate-x-0.5 motion-reduce:transition-none"
                    />
                  </Link>
                  <Link
                    href="/especialidades"
                    className="group inline-flex items-center gap-2 self-start text-sm font-semibold text-brand-primary outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 sm:self-center"
                  >
                    <span className="relative">
                      Ver especialidades
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
            </div>
          </div>
        </section>

        <footer className="flex items-center justify-between border-t border-border/70 pt-5 text-[0.7rem] font-semibold tracking-[0.14em] text-muted-foreground uppercase sm:text-xs">
          <span>Cochabamba · Bolivia</span>
          <span className="hidden sm:inline">Centro médico y academia</span>
        </footer>
      </div>
    </main>
  );
}
