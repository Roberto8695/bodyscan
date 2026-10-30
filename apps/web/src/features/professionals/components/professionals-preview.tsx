import { loadProfessionals } from "@/features/professionals/api/load-professionals";
import { ProfessionalCard } from "@/features/professionals/components/professional-card";
import { ProfessionalState } from "@/features/professionals/components/professional-state";
import { ProfessionalsSection } from "@/features/professionals/components/professionals-section";

export async function ProfessionalsPreview() {
  const result = await loadProfessionals();

  if (!result.ok) {
    return (
      <ProfessionalsSection>
        <ProfessionalState
          isError
          title="No pudimos cargar al equipo médico"
          description="La información no está disponible en este momento. Puedes intentarlo nuevamente más tarde."
        />
      </ProfessionalsSection>
    );
  }

  const { professionals } = result;

  if (professionals.length === 0) {
    return (
      <ProfessionalsSection>
        <ProfessionalState
          title="Equipo médico en preparación"
          description="Todavía no hay profesionales publicados para mostrar. La información aparecerá aquí cuando esté disponible."
        />
      </ProfessionalsSection>
    );
  }

  return (
    <ProfessionalsSection>
      <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 lg:gap-7 xl:grid-cols-4 xl:gap-8">
        {professionals.map((professional, index) => (
          <li key={professional.id} className="h-full">
            <ProfessionalCard professional={professional} index={index} />
          </li>
        ))}
      </ul>
    </ProfessionalsSection>
  );
}
