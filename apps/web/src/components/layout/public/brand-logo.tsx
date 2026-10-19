import Link from "next/link";

import { cn } from "@/lib/utils";

type BrandLogoProps = {
  tone?: "default" | "inverse";
};

function BrandMark({ tone }: Required<BrandLogoProps>) {
  return (
    <svg
      aria-hidden="true"
      className="size-10 shrink-0 sm:size-11"
      viewBox="0 0 64 64"
    >
      <path
        className="fill-brand-turquoise"
        d="M32 8c4.4 5.6 6.7 10.1 6.7 13.6 0 3.6-1.6 6.7-4.1 8.5 1.8-2.5 4.9-4.1 8.5-4.1 3.5 0 8 2.3 13.6 6-5.6 3.7-10.1 6-13.6 6-3.6 0-6.7-1.6-8.5-4.1 2.5 1.8 4.1 4.9 4.1 8.5 0 3.5-2.3 8-6.7 13.6-4.4-5.6-6.7-10.1-6.7-13.6 0-3.6 1.6-6.7 4.1-8.5-1.8 2.5-4.9 4.1-8.5 4.1-3.5 0-8-2.3-13.6-6 5.6-3.7 10.1-6 13.6-6 3.6 0 6.7 1.6 8.5 4.1-2.5-1.8-4.1-4.9-4.1-8.5C25.3 18.1 27.6 13.6 32 8Z"
      />
      <circle
        className={tone === "inverse" ? "fill-white" : "fill-brand-primary"}
        cx="17"
        cy="17"
        r="5"
      />
      <circle
        className={tone === "inverse" ? "fill-white" : "fill-brand-primary"}
        cx="47"
        cy="17"
        r="5"
      />
      <circle
        className={tone === "inverse" ? "fill-white" : "fill-brand-primary"}
        cx="17"
        cy="47"
        r="5"
      />
      <circle
        className={tone === "inverse" ? "fill-white" : "fill-brand-primary"}
        cx="47"
        cy="47"
        r="5"
      />
    </svg>
  );
}

export function BrandLogo({ tone = "default" }: BrandLogoProps) {
  return (
    <Link
      href="/"
      aria-label="Body Scan Medical Center, ir al inicio"
      className={cn(
        "group flex min-h-11 w-fit shrink-0 items-center gap-2.5 rounded-md outline-none focus-visible:ring-2 focus-visible:ring-offset-4",
        tone === "inverse"
          ? "focus-visible:ring-brand-turquoise focus-visible:ring-offset-brand-primary"
          : "focus-visible:ring-ring focus-visible:ring-offset-background",
      )}
    >
      <span className="transition-transform duration-300 motion-reduce:transition-none group-hover:scale-[1.03]">
        <BrandMark tone={tone} />
      </span>
      <span
        className={cn(
          "flex flex-col font-heading leading-none font-bold uppercase",
          tone === "inverse" ? "text-white" : "text-brand-primary",
        )}
      >
        <span className="text-[1.05rem] tracking-[0.075em] sm:text-lg">
          Body Scan
        </span>
        <span
          className={cn(
            "mt-1 text-[0.5rem] font-semibold tracking-[0.18em] sm:text-[0.56rem]",
            tone === "inverse"
              ? "text-brand-light"
              : "text-brand-primary/75",
          )}
        >
          Medical Center
        </span>
      </span>
    </Link>
  );
}
