import { AlertCircle, Stethoscope } from "lucide-react";

type SpecialtyStateProps = {
  title: string;
  description: string;
  isError?: boolean;
};

export function SpecialtyState({
  title,
  description,
  isError = false,
}: SpecialtyStateProps) {
  return (
    <div
      role={isError ? "alert" : "status"}
      className="flex min-h-56 flex-col items-center justify-center border-t border-white/15 px-6 py-12 text-center sm:min-h-64"
    >
      <span className="flex size-11 items-center justify-center rounded-xl bg-white/10 text-brand-light">
        {isError ? (
          <AlertCircle aria-hidden="true" className="size-5" />
        ) : (
          <Stethoscope aria-hidden="true" className="size-5" />
        )}
      </span>
      <h3 className="mt-5 font-heading text-xl font-semibold text-white">
        {title}
      </h3>
      <p className="mt-3 max-w-md text-sm leading-6 text-white/80">
        {description}
      </p>
    </div>
  );
}
