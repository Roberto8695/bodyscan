import "server-only";

import { unstable_rethrow } from "next/navigation";

import { getProfessionals } from "@/features/professionals/api/get-professionals";
import type { Professional } from "@/features/professionals/types/professional.types";

export type ProfessionalsResult =
  | { ok: true; professionals: Professional[] }
  | { ok: false };

export async function loadProfessionals(): Promise<ProfessionalsResult> {
  try {
    const professionals = await getProfessionals();
    return { ok: true, professionals };
  } catch (error) {
    unstable_rethrow(error);
    console.error("No fue posible cargar los profesionales públicos", error);
    return { ok: false };
  }
}
