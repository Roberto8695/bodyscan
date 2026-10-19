import Link from "next/link";
import { ArrowUpRight, MapPin } from "lucide-react";

import { BrandLogo } from "@/components/layout/public/brand-logo";

const clinicLinks = [
  { label: "Especialidades", href: "/especialidades" },
  { label: "Profesionales", href: "/profesionales" },
  { label: "Servicios", href: "/servicios" },
  { label: "Contacto", href: "/contacto" },
];

const learningLinks = [
  { label: "Academia", href: "/academia" },
  { label: "Blog", href: "/blog" },
  { label: "Acceso de estudiantes", href: "/iniciar-sesion" },
];

const footerLinkClasses =
  "group inline-flex min-h-11 items-center rounded-md text-sm text-white/72 outline-none transition-colors hover:text-white focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary motion-reduce:transition-none";

type SocialNetwork = {
  label: string;
  href?: string;
  icon: "instagram" | "facebook" | "tiktok" | "whatsapp";
};

const socialNetworks: SocialNetwork[] = [
  {
    label: "Instagram",
    href: process.env.NEXT_PUBLIC_INSTAGRAM_URL,
    icon: "instagram",
  },
  {
    label: "Facebook",
    href: process.env.NEXT_PUBLIC_FACEBOOK_URL,
    icon: "facebook",
  },
  {
    label: "TikTok",
    href: process.env.NEXT_PUBLIC_TIKTOK_URL,
    icon: "tiktok",
  },
  {
    label: "WhatsApp",
    href: process.env.NEXT_PUBLIC_WHATSAPP_URL,
    icon: "whatsapp",
  },
];

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-brand-primary text-white">
      <div
        aria-hidden="true"
        className="absolute -top-28 -right-24 size-80 rounded-full border border-brand-turquoise/15"
      />
      <div
        aria-hidden="true"
        className="absolute -top-12 -right-8 size-48 rounded-full border border-white/8"
      />

      <div className="h-1 bg-gradient-to-r from-brand-turquoise via-brand-sky to-brand-ocean" />

      <div className="relative mx-auto w-full max-w-[90rem] px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-[1.45fr_0.75fr_0.8fr_1fr] lg:gap-10 xl:gap-16">
          <div className="max-w-md">
            <BrandLogo tone="inverse" />
            <p className="mt-6 max-w-sm text-sm leading-7 text-white/72 sm:text-[0.95rem]">
              Atención médica especializada y formación para profesionales de
              la salud, con una experiencia clara, cercana y confiable.
            </p>
            <div className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 text-sm text-brand-light">
              <MapPin aria-hidden="true" className="size-4 text-brand-turquoise" />
              Cochabamba, Bolivia
            </div>
            <SocialLinks />
          </div>

          <FooterNavigation title="Centro médico" links={clinicLinks} />
          <FooterNavigation title="Formación" links={learningLinks} />

          <div>
            <p className="font-heading text-sm font-semibold tracking-wide text-white">
              Estamos para orientarte
            </p>
            <p className="mt-4 text-sm leading-6 text-white/65">
              Encuentra los canales oficiales y la información disponible para
              comunicarte con el centro médico.
            </p>
            <Link
              href="/contacto"
              className="mt-6 inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 text-sm font-semibold text-brand-primary outline-none transition-[background-color,transform] hover:bg-brand-light focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary motion-reduce:transition-none"
            >
              Ir a contacto
              <ArrowUpRight aria-hidden="true" className="size-4" />
            </Link>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-white/12 pt-6 text-xs leading-5 text-white/55 sm:mt-16 sm:flex-row sm:items-center sm:justify-between">
          <p>© Body Scan Medical Center.</p>
          <p>Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}

function SocialLinks() {
  const hasPendingLinks = socialNetworks.some((network) => !network.href);

  return (
    <div className="mt-7">
      <p className="font-heading text-xs font-semibold tracking-[0.12em] text-white/75 uppercase">
        Síguenos
      </p>
      <div className="mt-3 flex flex-wrap gap-2" aria-label="Redes sociales">
        {socialNetworks.map(({ label, href, icon }) =>
          href ? (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={`Visitar ${label} de Body Scan`}
              className="inline-flex size-11 items-center justify-center rounded-full border border-white/15 bg-white/7 text-white outline-none transition-[background-color,border-color,transform] hover:-translate-y-0.5 hover:border-brand-turquoise/70 hover:bg-white/12 focus-visible:ring-2 focus-visible:ring-brand-turquoise focus-visible:ring-offset-2 focus-visible:ring-offset-brand-primary motion-reduce:transform-none motion-reduce:transition-none"
            >
              <SocialIcon name={icon} />
            </a>
          ) : (
            <span
              key={label}
              role="img"
              aria-label={`${label}, enlace oficial pendiente`}
              title={`${label}: enlace oficial pendiente`}
              className="inline-flex size-11 cursor-not-allowed items-center justify-center rounded-full border border-white/10 bg-white/4 text-white/45"
            >
              <SocialIcon name={icon} />
            </span>
          ),
        )}
      </div>
      {hasPendingLinks ? (
        <p className="mt-2 text-xs text-white/45">
          Enlaces oficiales por confirmar
        </p>
      ) : null}
    </div>
  );
}

function SocialIcon({ name }: { name: SocialNetwork["icon"] }) {
  if (name === "instagram") {
    return (
      <svg
        aria-hidden="true"
        className="size-[1.15rem]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  if (name === "facebook") {
    return (
      <svg
        aria-hidden="true"
        className="size-[1.15rem]"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M14 8.5V7.2c0-1 .7-1.2 1.3-1.2H18V2.2A22 22 0 0 0 14.9 2C11.8 2 9.7 3.9 9.7 7v1.5H6.2V13h3.5v9H14v-9h3.5l.6-4.5H14Z" />
      </svg>
    );
  }

  if (name === "tiktok") {
    return (
      <svg
        aria-hidden="true"
        className="size-[1.15rem]"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
      >
        <path d="M14 4v10.5a4.5 4.5 0 1 1-3.5-4.4" />
        <path d="M14 4c.8 2.5 2.4 4 5 4.5" />
      </svg>
    );
  }

  return (
    <svg
      aria-hidden="true"
      className="size-[1.15rem]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
    >
      <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z" />
      <path d="M9 8.5c.3 3.2 2.3 5.1 5.5 5.5" />
      <path d="m9 8.5.8-.5 1.2 2-1 .8" />
      <path d="m14.5 14 .5-.9 2 1.1-.5.8" />
    </svg>
  );
}

type FooterNavigationProps = {
  title: string;
  links: Array<{ label: string; href: string }>;
};

function FooterNavigation({ title, links }: FooterNavigationProps) {
  return (
    <nav aria-label={title}>
      <p className="font-heading text-sm font-semibold tracking-wide text-white">
        {title}
      </p>
      <ul className="mt-3 grid">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className={footerLinkClasses}>
              <span className="mr-2 h-px w-0 bg-brand-turquoise transition-[width] duration-200 group-hover:w-3 motion-reduce:transition-none" />
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
