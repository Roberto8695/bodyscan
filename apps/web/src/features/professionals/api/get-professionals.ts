import "server-only";

import type { Professional } from "@/features/professionals/types/professional.types";
import { serverApi } from "@/lib/api/server";

function isSpecialtyRef(value: unknown): boolean {
  if (!value || typeof value !== "object") return false;
  const ref = value as { specialty?: unknown };
  if (!ref.specialty || typeof ref.specialty !== "object") return false;
  const specialty = ref.specialty as Record<string, unknown>;
  return (
    typeof specialty.id === "string" &&
    typeof specialty.slug === "string" &&
    typeof specialty.name === "string"
  );
}

function isProfessional(value: unknown): value is Professional {
  if (!value || typeof value !== "object") return false;
  const professional = value as Record<string, unknown>;

  const okCore =
    typeof professional.id === "string" &&
    typeof professional.fullName === "string" &&
    (professional.biography === null ||
      typeof professional.biography === "string");

  if (!okCore) return false;

  const okPhoto =
    professional.photo === null ||
    (typeof professional.photo === "object" &&
      professional.photo !== null &&
      typeof (professional.photo as Record<string, unknown>).id === "string");

  if (!okPhoto) return false;

  return (
    Array.isArray(professional.specialties) &&
    professional.specialties.every(isSpecialtyRef)
  );
}

export async function getProfessionals(): Promise<Professional[]> {
  const response = await serverApi<unknown>("/institutional/professionals", {
    cache: "no-store",
  });

  if (!Array.isArray(response) || !response.every(isProfessional)) {
    throw new Error("La API devolvió un formato de profesionales inválido");
  }

  return response;
}
