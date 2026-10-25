---
target: specialties Section de Body Scan Medical Center
total_score: 26
max_score: 32
na_heuristics: 7,10
p0_count: 0
p1_count: 1
target_identity: "file:C:\\Users\\rober\\Desktop\\bodyscan\\apps\\web\\src\\features\\specialties\\components\\specialties-preview.tsx"
target_fingerprint: "sha256:aa4d203d9c2382eacec6a7d261b0e908079080dba949137947af4c2bdbaf2047"
target_path: "C:\\Users\\rober\\Desktop\\bodyscan\\apps\\web\\src\\features\\specialties\\components\\specialties-preview.tsx"
timestamp: 2026-10-22T23-40-57Z
slug: alties-components-specialties-preview-tsx-332bee9e
---
Method: dual-agent (A: /root/specialties_design_review · B: /root/specialties_evidence)

## Design Health Score

| # | Heuristic | Score | Key issue |
|---|---|---:|---|
| 1 | Visibility of system status | 3 | Existen carga, vacío y error; el error no ofrece reintento inmediato. |
| 2 | Correspondencia con el mundo real | 4 | Español claro y especialidades reales. |
| 3 | Control y libertad | 2 | El directorio es informativo y todavía no tiene una continuación local. |
| 4 | Consistencia y estándares | 4 | Paleta, tipografía y espaciado coherentes con Body Scan. |
| 5 | Prevención de errores | 3 | API validada y estados honestos. |
| 6 | Reconocimiento antes que recuerdo | 4 | Las cinco especialidades permanecen visibles y ordenadas. |
| 7 | Flexibilidad y eficiencia | n/a | No resulta aplicable a esta sección Persuade. |
| 8 | Diseño estético y minimalista | 4 | Composición enfocada, sin tarjetas repetitivas ni ruido ornamental. |
| 9 | Reconocimiento y recuperación de errores | 2 | El mensaje es claro, pero la recuperación es volver más tarde. |
| 10 | Ayuda y documentación | n/a | No resulta necesaria para esta sección informativa. |
| **Total** |  | **26/32** | **Bueno** |

## Design Specificity Verdict

La composición se siente creada para Body Scan: el encuadre panorámico, el directorio desplazado, la paleta petróleo/turquesa y la jerarquía editorial evitan la cuadrícula clínica genérica. La fotografía real sigue siendo la prueba humana y local que falta; el placeholder es honesto para desarrollo, no un asset final.

El detector devolvió `[]` para ambos componentes. La revisión visual y manual sí detectó tres contrastes inferiores a AA y una proporción excesiva en tablet; todos fueron corregidos. No se inyectó overlay porque el runtime Node REPL del navegador integrado no estaba disponible.

## Overall Impression

El resultado es sobrio, reconocible y escaneable. La mayor oportunidad restante no está en el layout, sino en reemplazar el placeholder por una fotografía institucional aprobada. Una futura ruta real de especialidades permitirá convertir el directorio informativo en una continuación útil sin inventar navegación hoy.

## What's Working

- La imagen horizontal crea un cambio de ritmo respecto al Hero y AboutPreview.
- El directorio conserva nombres reales de la API y evita tarjetas repetitivas.
- Los estados de carga, vacío y error comparten el mismo lenguaje visual.
- Desktop, tablet y móvil no presentan desbordamiento horizontal.
- Los textos pequeños sobre petróleo cumplen ahora contraste AA.

## Priority Issues

1. **[P1] Falta la fotografía institucional definitiva.** La sección depende de ella para aportar cercanía y prueba local. Debe sustituirse el placeholder por una imagen aprobada, con encuadre horizontal, punto focal definido y texto alternativo útil. Sugerencia: `$impeccable polish` cuando el asset esté disponible.
2. **[P2] El directorio no tiene una continuación local.** El cambio de “Explora” a “Conoce” elimina la falsa affordance, pero una futura ruta funcional `/especialidades` debería cerrar la sección con una acción honesta. Sugerencia: `$impeccable harden` cuando la ruta exista.
3. **[P3] Las descripciones largas no se ejercitaron visualmente.** El seed actual devuelve `null`; el código admite descripciones y su contraste ya cumple, pero falta validar contenido extenso real. Sugerencia: `$impeccable harden` cuando existan descripciones aprobadas.

## Persona Red Flags

**Jordan, visitante nuevo:** comprende las áreas rápidamente, pero no puede profundizar mientras no exista una ruta pública de detalle.

**Riley, usuario que prueba extremos:** puede encontrar crecimiento irregular si en el futuro llegan descripciones muy largas; el estado de error es seguro, aunque sin reintento directo.

**Casey, visitante móvil distraído:** la lectura es clara y sin objetivos táctiles falsos; el recorrido sigue siendo largo, pero ahora el directorio conserva una sola columna legible y termina sin prometer una acción inexistente.

## Minor Observations

- El vacío inferior derecho causado por cinco elementos en una grilla de dos columnas es aceptable y refuerza la asimetría.
- La numeración indica el orden editorial real y ahora usa `brand-light` con contraste suficiente.
- El breakpoint tablet es más compacto después de activar dos columnas desde `sm`.

## Questions to Consider

- ¿Qué fotografía horizontal aprobada muestra mejor una interacción humana real dentro de Body Scan?
- Cuando exista `/especialidades`, ¿conviene un único enlace “Conoce todas las especialidades” o hacer navegable cada nombre?
- ¿Las descripciones se gestionarán desde el CMS/API o la Home seguirá mostrando solo nombres?
