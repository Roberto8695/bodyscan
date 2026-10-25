type SpecialtyDirectoryProps = {
  children: React.ReactNode;
  count?: number;
  isLoading?: boolean;
};

export function SpecialtyDirectory({
  children,
  count,
  isLoading = false,
}: SpecialtyDirectoryProps) {
  return (
    <div className="overflow-hidden rounded-2xl bg-brand-primary px-5 py-6 shadow-[0_28px_70px_rgba(23,59,73,0.2)] sm:px-8 sm:py-8 lg:px-10">
      <div className="mb-3 flex flex-wrap items-end justify-between gap-3 pb-5 text-white">
        <p className="font-heading text-sm font-semibold tracking-[-0.01em] sm:text-base">
          Directorio de especialidades
        </p>
        {count ? (
          <p className="text-xs font-medium tracking-[0.08em] text-brand-light uppercase">
            {isLoading ? "Cargando" : `${count} especialidades`}
          </p>
        ) : null}
      </div>
      {children}
    </div>
  );
}
