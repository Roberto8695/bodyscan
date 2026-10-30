import {
  Activity,
  Baby,
  Bone,
  Brain,
  Ear,
  Eye,
  FlaskConical,
  HeartPulse,
  Microscope,
  PersonStanding,
  Pill,
  ScanLine,
  Smile,
  Stethoscope,
  Syringe,
  type LucideIcon,
} from "lucide-react";

const ICON_RULES: Array<{ keywords: string[]; icon: LucideIcon }> = [
  { keywords: ["cardio", "corazon"], icon: HeartPulse },
  { keywords: ["pediatr", "neonat"], icon: Baby },
  { keywords: ["ginec", "obstetr", "matern"], icon: Baby },
  { keywords: ["derma", "piel"], icon: Smile },
  { keywords: ["trauma", "ortoped", "reumat"], icon: Bone },
  { keywords: ["oftalm", "ocular", "vision"], icon: Eye },
  { keywords: ["otorrino", "audi", "oido"], icon: Ear },
  { keywords: ["odonto", "dental"], icon: Smile },
  { keywords: ["neuro", "psiqui", "psicol"], icon: Brain },
  { keywords: ["oncolog", "hematolog"], icon: Microscope },
  { keywords: ["endocrin", "diabet"], icon: Activity },
  { keywords: ["gastro", "digest"], icon: Activity },
  { keywords: ["urolog", "nefr"], icon: FlaskConical },
  { keywords: ["radiolog", "imagen", "ecograf"], icon: ScanLine },
  { keywords: ["laborator", "analisis"], icon: FlaskConical },
  { keywords: ["fisioter", "rehabilit"], icon: PersonStanding },
  { keywords: ["vacun", "inmuno"], icon: Syringe },
  { keywords: ["farmac"], icon: Pill },
];

export function getSpecialtyIcon(slug: string, name: string): LucideIcon {
  const haystack = `${slug} ${name}`.toLowerCase();
  for (const { keywords, icon } of ICON_RULES) {
    if (keywords.some((kw) => haystack.includes(kw))) {
      return icon;
    }
  }
  return Stethoscope;
}
