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
    <div className="overflow-hidden rounded-2xl bg-brand-primary shadow-[0_28px_70px_rgba(23,59,73,0.2)]">
      <div className="flex flex-wrap items-end justify-between gap-3 px-5 pt-6 pb-5 text-white sm:px-8 sm:pt-8 sm:pb-6 lg:px-10">
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
