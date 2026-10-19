export type PublicNavigationItem = {
  label: string;
  href: string;
};

export const publicNavigation: PublicNavigationItem[] = [
  { label: "Inicio", href: "/" },
  { label: "Especialidades", href: "/especialidades" },
  { label: "Profesionales", href: "/profesionales" },
  { label: "Servicios", href: "/servicios" },
  { label: "Academia", href: "/academia" },
  { label: "Blog", href: "/blog" },
  { label: "Contacto", href: "/contacto" },
];
