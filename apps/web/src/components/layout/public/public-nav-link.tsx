"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import type { PublicNavigationItem } from "@/components/layout/public/navigation";
import { cn } from "@/lib/utils";

function isCurrentRoute(pathname: string, href: string) {
  return href === "/"
    ? pathname === href
    : pathname === href || pathname.startsWith(`${href}/`);
}

export function ActiveNavLink({ item }: { item: PublicNavigationItem }) {
  const pathname = usePathname();
  const isActive = isCurrentRoute(pathname, item.href);

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "group relative flex min-h-11 items-center px-2.5 text-[0.8125rem] font-medium text-foreground/70 outline-none transition-colors duration-200 hover:text-brand-primary focus-visible:rounded-md focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 motion-reduce:transition-none 2xl:px-3.5 2xl:text-sm",
        isActive && "font-semibold text-brand-primary",
      )}
    >
      {item.label}
      <span
        aria-hidden="true"
        className={cn(
          "absolute inset-x-2.5 bottom-0 h-0.5 origin-center scale-x-0 rounded-full bg-brand-turquoise transition-transform duration-200 group-hover:scale-x-100 motion-reduce:transition-none 2xl:inset-x-3.5",
          isActive && "scale-x-100",
        )}
      />
    </Link>
  );
}
