import "server-only";

import { unstable_rethrow } from "next/navigation";

import { getSpecialties } from "@/features/specialties/api/get-specialties";
import type { Specialty } from "@/features/specialties/types/specialty.types";

export type SpecialtiesResult =
  | { ok: true; specialties: Specialty[] }
  | { ok: false };

export async function loadSpecialties(): Promise<SpecialtiesResult> {
  try {
    const specialties = await getSpecialties();
    return { ok: true, specialties };
  } catch (error) {
    unstable_rethrow(error);
    console.error("No fue posible cargar las especialidades públicas", error);
    return { ok: false };
  }
}
