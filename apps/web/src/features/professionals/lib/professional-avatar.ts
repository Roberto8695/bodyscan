export function getProfessionalInitials(fullName: string): string {
  const cleaned = fullName
    .replace(/^(dr|dra|lic|ing|mg|mgtr|prof)\.?\s+/i, "")
    .trim();

  const parts = cleaned.split(/\s+/).filter(Boolean);
  if (parts.length === 0) return "·";
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();

  const first = parts[0][0] ?? "";
  const last = parts[parts.length - 1][0] ?? "";
  return `${first}${last}`.toUpperCase();
}

const AVATAR_VARIANTS = [
  "bg-brand-light text-brand-primary",
  "bg-brand-primary/95 text-white",
  "bg-brand-sky/35 text-brand-primary",
  "bg-brand-primary text-brand-light",
] as const;

export function getProfessionalAvatarVariant(seed: string): string {
  let hash = 0;
  for (let i = 0; i < seed.length; i += 1) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  return AVATAR_VARIANTS[hash % AVATAR_VARIANTS.length];
}
