import Link from "next/link";
import { UserRound } from "lucide-react";

import { BrandLogo } from "@/components/layout/public/brand-logo";
import { MobileMenu } from "@/components/layout/public/mobile-menu";
import { publicNavigation } from "@/components/layout/public/navigation";
import { ActiveNavLink } from "@/components/layout/public/public-nav-link";

export function Navbar() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/95 shadow-[0_1px_0_rgba(32,104,120,0.03)] backdrop-blur-md supports-[backdrop-filter]:bg-background/90">
      <div className="h-1 bg-gradient-to-r from-brand-primary via-brand-turquoise to-brand-sky" />
      <div className="mx-auto flex h-[4.75rem] w-full max-w-[90rem] items-center justify-between gap-6 px-4 sm:px-6 lg:px-8">
        <BrandLogo />

        <nav
          aria-label="Navegación principal"
          className="hidden items-stretch self-stretch xl:flex"
        >
          {publicNavigation.map((item) => (
            <ActiveNavLink key={item.href} item={item} />
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2">
          <Link
            href="/iniciar-sesion"
            className="hidden h-11 items-center justify-center gap-2 rounded-full border border-brand-primary/25 px-4 text-sm font-medium text-brand-primary outline-none transition-colors hover:border-brand-turquoise/60 hover:bg-secondary focus-visible:ring-2 focus-visible:ring-brand-primary/30 focus-visible:ring-offset-2 motion-reduce:transition-none sm:inline-flex"
          >
            <UserRound aria-hidden="true" className="size-4" />
            Iniciar sesión
          </Link>

          <MobileMenu items={publicNavigation} />
        </div>
      </div>
    </header>
  );
}
