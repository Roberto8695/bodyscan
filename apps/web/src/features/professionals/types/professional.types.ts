export type ProfessionalPhoto = {
  id: string;
  provider: string;
  providerKey: string;
  mimeType: string | null;
};

export type ProfessionalSpecialtyRef = {
  specialty: {
    id: string;
    slug: string;
    name: string;
  };
};

export type Professional = {
  id: string;
  fullName: string;
  biography: string | null;
  photo: ProfessionalPhoto | null;
  specialties: ProfessionalSpecialtyRef[];
};
