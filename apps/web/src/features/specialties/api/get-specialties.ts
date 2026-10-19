import "server-only";

import type { Specialty } from "@/features/specialties/types/specialty.types";
import { serverApi } from "@/lib/api/server";

function isSpecialty(value: unknown): value is Specialty {
  if (!value || typeof value !== "object") return false;

  const specialty = value as Record<string, unknown>;

  return (
    typeof specialty.id === "string" &&
    typeof specialty.slug === "string" &&
    typeof specialty.name === "string" &&
    (specialty.description === null ||
      typeof specialty.description === "string")
  );
}

export async function getSpecialties(): Promise<Specialty[]> {
  const response = await serverApi<unknown>("/institutional/specialties", {
    cache: "no-store",
  });

  if (!Array.isArray(response) || !response.every(isSpecialty)) {
    throw new Error("La API devolvió un formato de especialidades inválido");
  }

  return response;
}
