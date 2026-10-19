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

    await database.query('COMMIT');

    console.log(`${specialties.length} especialidades listas.`);
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
