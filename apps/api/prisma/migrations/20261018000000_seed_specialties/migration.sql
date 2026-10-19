-- SeedData: especialidades iniciales de Body Scan Medical Center.
-- Los UUID son deterministas para que los mismos registros puedan referenciarse
-- de forma consistente entre ambientes.
INSERT INTO "specialties" (
  "id",
  "slug",
  "name",
  "is_published",
  "position"
)
VALUES
  ('10000000-0000-4000-8000-000000000001', 'nefrologia', 'Nefrología', true, 1),
  ('10000000-0000-4000-8000-000000000002', 'medicina-interna', 'Medicina Interna', true, 2),
  ('10000000-0000-4000-8000-000000000003', 'cardiologia', 'Cardiología', true, 3),
  ('10000000-0000-4000-8000-000000000004', 'pediatria', 'Pediatría', true, 4),
  ('10000000-0000-4000-8000-000000000005', 'neumologia', 'Neumología', true, 5),
  ('10000000-0000-4000-8000-000000000006', 'nutricion', 'Nutrición', true, 6),
  ('10000000-0000-4000-8000-000000000007', 'cirugia', 'Cirugía', true, 7),
  ('10000000-0000-4000-8000-000000000008', 'cirugia-vascular', 'Cirugía Vascular', true, 8),
  ('10000000-0000-4000-8000-000000000009', 'endocrinologia', 'Endocrinología', true, 9),
  ('10000000-0000-4000-8000-000000000010', 'inmunologia-y-alergologia', 'Inmunología y Alergología', true, 10),
  ('10000000-0000-4000-8000-000000000011', 'infectologia', 'Infectología', true, 11),
  ('10000000-0000-4000-8000-000000000012', 'neurocirugia', 'Neurocirugía', true, 12)
ON CONFLICT DO NOTHING;

-- Sincroniza nombre, publicación y posición cuando el registro ya existía.
UPDATE "specialties"
SET
  "name" = seed."name",
  "is_published" = true,
  "position" = seed."position"
FROM (
  VALUES
    ('nefrologia', 'Nefrología', 1),
    ('medicina-interna', 'Medicina Interna', 2),
    ('cardiologia', 'Cardiología', 3),
    ('pediatria', 'Pediatría', 4),
    ('neumologia', 'Neumología', 5),
    ('nutricion', 'Nutrición', 6),
    ('cirugia', 'Cirugía', 7),
    ('cirugia-vascular', 'Cirugía Vascular', 8),
    ('endocrinologia', 'Endocrinología', 9),
    ('inmunologia-y-alergologia', 'Inmunología y Alergología', 10),
    ('infectologia', 'Infectología', 11),
    ('neurocirugia', 'Neurocirugía', 12)
) AS seed("slug", "name", "position")
WHERE "specialties"."slug" = seed."slug";
