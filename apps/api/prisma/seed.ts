import 'dotenv/config';
import { randomUUID } from 'node:crypto';
import { Client } from 'pg';

const specialties = [
  { slug: 'nefrologia', name: 'Nefrología', position: 1 },
  { slug: 'medicina-interna', name: 'Medicina Interna', position: 2 },
  { slug: 'cardiologia', name: 'Cardiología', position: 3 },
  { slug: 'pediatria', name: 'Pediatría', position: 4 },
  { slug: 'neumologia', name: 'Neumología', position: 5 },
  { slug: 'nutricion', name: 'Nutrición', position: 6 },
  { slug: 'cirugia', name: 'Cirugía', position: 7 },
  { slug: 'cirugia-vascular', name: 'Cirugía Vascular', position: 8 },
  { slug: 'endocrinologia', name: 'Endocrinología', position: 9 },
  {
    slug: 'inmunologia-y-alergologia',
    name: 'Inmunología y Alergología',
    position: 10,
  },
  { slug: 'infectologia', name: 'Infectología', position: 11 },
  { slug: 'neurocirugia', name: 'Neurocirugía', position: 12 },
] as const;

const PLACEHOLDER_BIO =
  'Perfil de ejemplo. Reemplazar con la biografía profesional validada por la clínica.';

const professionals = [
  {
    fullName: 'Dra. Ana López Rivas',
    position: 1,
    specialtySlugs: ['cardiologia', 'medicina-interna'],
  },
  {
    fullName: 'Dr. Carlos Mendoza Soliz',
    position: 2,
    specialtySlugs: ['nefrologia'],
  },
  {
    fullName: 'Dra. Lucía Fernández Vargas',
    position: 3,
    specialtySlugs: ['pediatria'],
  },
  {
    fullName: 'Dr. Javier Rojas Camacho',
    position: 4,
    specialtySlugs: ['cirugia', 'cirugia-vascular'],
  },
  {
    fullName: 'Dra. María Teresa Salinas',
    position: 5,
    specialtySlugs: ['endocrinologia', 'medicina-interna'],
  },
  {
    fullName: 'Dr. Esteban Quiroga Peña',
    position: 6,
    specialtySlugs: ['neumologia'],
  },
  {
    fullName: 'Dra. Paola Guzmán Torrico',
    position: 7,
    specialtySlugs: ['inmunologia-y-alergologia', 'infectologia'],
  },
  {
    fullName: 'Dr. Rodrigo Vaca Terán',
    position: 8,
    specialtySlugs: ['neurocirugia'],
  },
] as const;

async function main() {
  const connectionString = process.env.DATABASE_URL;

  if (!connectionString) {
    throw new Error('DATABASE_URL no está configurada');
  }

  const database = new Client({ connectionString });
  await database.connect();

  try {
    await database.query('BEGIN');

    for (const specialty of specialties) {
      await database.query(
        `
          INSERT INTO "specialties" (
            "id",
            "slug",
            "name",
            "is_published",
            "position"
          )
          VALUES ($1, $2, $3, true, $4)
          ON CONFLICT ("slug") DO UPDATE
          SET
            "name" = EXCLUDED."name",
            "is_published" = true,
            "position" = EXCLUDED."position"
        `,
        [randomUUID(), specialty.slug, specialty.name, specialty.position],
      );
    }

    const specialtyRows = await database.query<{ id: string; slug: string }>(
      `SELECT "id", "slug" FROM "specialties"`,
    );
    const specialtyIdBySlug = new Map(
      specialtyRows.rows.map((row) => [row.slug, row.id]),
    );

    for (const professional of professionals) {
      const existing = await database.query<{ id: string }>(
        `SELECT "id" FROM "professionals" WHERE "full_name" = $1 LIMIT 1`,
        [professional.fullName],
      );

      let professionalId: string;

      if (existing.rows.length > 0) {
        professionalId = existing.rows[0].id;
        await database.query(
          `
            UPDATE "professionals"
            SET "biography" = $2,
                "is_published" = true,
                "position" = $3
            WHERE "id" = $1
          `,
          [professionalId, PLACEHOLDER_BIO, professional.position],
        );
      } else {
        professionalId = randomUUID();
        await database.query(
          `
            INSERT INTO "professionals" (
              "id",
              "full_name",
              "biography",
              "is_published",
              "position"
            )
            VALUES ($1, $2, $3, true, $4)
          `,
          [
            professionalId,
            professional.fullName,
            PLACEHOLDER_BIO,
            professional.position,
          ],
        );
      }

      await database.query(
        `DELETE FROM "professional_specialties" WHERE "professional_id" = $1`,
        [professionalId],
      );

      for (const slug of professional.specialtySlugs) {
        const specialtyId = specialtyIdBySlug.get(slug);
        if (!specialtyId) continue;
        await database.query(
          `
            INSERT INTO "professional_specialties" ("professional_id", "specialty_id")
            VALUES ($1, $2)
            ON CONFLICT DO NOTHING
          `,
          [professionalId, specialtyId],
        );
      }
    }

    await database.query('COMMIT');

    console.log(
      `${specialties.length} especialidades y ${professionals.length} profesionales de ejemplo listos.`,
    );
  } catch (error) {
    await database.query('ROLLBACK');
    throw error;
  } finally {
    await database.end();
  }
}

void main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
});
