import { loadSpecialties } from "@/features/specialties/api/load-specialties";
import { SpecialtiesSection } from "@/features/specialties/components/specialties-section";
import { SpecialtyCard } from "@/features/specialties/components/specialty-card";
import { SpecialtyDirectory } from "@/features/specialties/components/specialty-directory";
import { SpecialtyState } from "@/features/specialties/components/specialty-state";

export async function SpecialtiesPreview() {
  const result = await loadSpecialties();

  if (!result.ok) {
    return (
      <SpecialtiesSection>
        <SpecialtyDirectory>
          <SpecialtyState
            isError
            title="No pudimos cargar las especialidades"
            description="La información no está disponible en este momento. Puedes intentarlo nuevamente más tarde."
          />
        </SpecialtyDirectory>
      </SpecialtiesSection>
    );
  }

  const { specialties } = result;

  if (specialties.length === 0) {
    return (
      <SpecialtiesSection>
        <SpecialtyDirectory>
          <SpecialtyState
            title="Especialidades en preparación"
            description="Todavía no hay especialidades publicadas para mostrar. La información aparecerá aquí cuando esté disponible."
          />
        </SpecialtyDirectory>
      </SpecialtiesSection>
    );
  }

  return (
    <SpecialtiesSection>
      <SpecialtyDirectory count={specialties.length}>
        <ul className="grid grid-cols-1 border-t border-white/10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {specialties.map((specialty, index) => (
            <SpecialtyCard
              key={specialty.id}
              specialty={specialty}
              index={index}
            />
          ))}
        </ul>
      </SpecialtyDirectory>
    </SpecialtiesSection>
  );
}
