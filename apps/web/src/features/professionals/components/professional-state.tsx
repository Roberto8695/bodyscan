type ProfessionalStateProps = {
  title: string;
  description: string;
  isError?: boolean;
};

export function ProfessionalState({
  title,
  description,
  isError = false,
}: ProfessionalStateProps) {
  return (
    <div
      role={isError ? "alert" : undefined}
      className="rounded-2xl border border-dashed border-border bg-background px-6 py-10 text-center sm:px-10 sm:py-14"
    >
      <p className="font-heading text-base font-semibold tracking-[-0.01em] text-foreground sm:text-lg">
        {title}
      </p>
      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted-foreground sm:text-base sm:leading-7">
        {description}
      </p>
    </div>
  );
}
