"use client";

import { useState } from "react";
import Link from "next/link";
import { LogIn, Menu, ShieldCheck, X } from "lucide-react";
import { usePathname } from "next/navigation";

import type { PublicNavigationItem } from "@/components/layout/public/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

type MobileMenuProps = {
  items: PublicNavigationItem[];
};

function isCurrentRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function MobileMenu({ items }: MobileMenuProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
      <Button
        variant="outline"
        size="icon-lg"
        aria-label="Abrir menú de navegación"
        className="size-11 rounded-full border-brand-primary/25 text-brand-primary shadow-none hover:border-brand-turquoise/60 hover:bg-secondary xl:hidden"
      >
        <Menu aria-hidden="true" className="size-5" />
      </Button>

      <Dialog
        className="inset-y-0 right-0 left-auto h-dvh w-[min(24rem,calc(100%-1rem))] max-w-none translate-x-0 translate-y-0 content-start overflow-y-auto rounded-none rounded-l-2xl border-l border-border bg-background p-0 shadow-2xl sm:max-w-none"
        aria-label="Menú principal"
        showCloseButton={false}
      >
        <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-turquoise to-brand-sky" />
        <div className="flex min-h-full flex-col p-6 pt-8 sm:p-8 sm:pt-9">
          <DialogClose
            variant="ghost"
            size="icon-lg"
            aria-label="Cerrar menú"
            className="absolute top-4 right-4 size-11 rounded-full text-brand-primary hover:bg-secondary"
          >
            <X aria-hidden="true" className="size-5" />
          </DialogClose>
          <DialogHeader className="pr-10">
            <div className="mb-3 flex size-10 items-center justify-center rounded-xl bg-secondary text-brand-primary">
              <ShieldCheck aria-hidden="true" className="size-5" />
            </div>
            <DialogTitle className="text-xl font-bold text-brand-primary">
              Explora Body Scan
            </DialogTitle>
            <DialogDescription className="max-w-64 leading-relaxed">
              Atención médica y formación profesional en un solo lugar.
            </DialogDescription>
          </DialogHeader>

          <nav aria-label="Navegación móvil" className="mt-8">
            <ul className="grid gap-1.5">
              {items.map((item) => {
                const isActive = isCurrentRoute(pathname, item.href);

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={isActive ? "page" : undefined}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "group flex min-h-12 items-center justify-between rounded-xl px-4 text-[0.95rem] font-medium text-foreground/75 outline-none transition-[background-color,color,transform] duration-200 hover:bg-secondary hover:text-brand-primary focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none",
                        isActive &&
                          "bg-secondary font-semibold text-brand-primary",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span
                          aria-hidden="true"
                          className={cn(
                            "size-1.5 rounded-full bg-border transition-colors group-hover:bg-brand-turquoise",
                            isActive && "bg-brand-turquoise",
                          )}
                        />
                        {item.label}
                      </span>
                      {isActive ? (
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-brand-primary/60">
                          Actual
                        </span>
                      ) : null}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="mt-auto border-t border-border pt-6">
            <Link
              href="/iniciar-sesion"
              onClick={() => setIsOpen(false)}
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "h-12 w-full gap-2 rounded-xl bg-brand-primary px-5 hover:bg-brand-primary/90",
              )}
            >
              <LogIn aria-hidden="true" className="size-4" />
              Iniciar sesión
            </Link>
            <p className="mt-3 text-center text-xs leading-relaxed text-muted-foreground">
              Acceso para estudiantes inscritos
            </p>
          </div>
        </div>
      </Dialog>
    </DialogTrigger>
  );
}
