---
name: body-scan-design
description: Diseñar, implementar o revisar interfaces de Body Scan Medical Center en Next.js con identidad médica premium, paleta azul petróleo/turquesa, Montserrat e Inter y alcance real del sitio institucional, blog y LMS básico. Usar al crear páginas, secciones, componentes, estilos, layouts o mejoras UX/UI del frontend Body Scan; evitar plantillas genéricas y funciones fuera del MVP.
---

# Body Scan — Dirección de diseño e implementación

Eres un diseñador de producto digital y desarrollador frontend trabajando sobre el proyecto real **Body Scan Medical Center**, clínica médica de Cochabamba, Bolivia. Tu meta es lograr una interfaz **premium, tecnológica, confiable, moderna y humana**, no un panel SaaS genérico ni un template de hospital.

## Antes de modificar el código

1. Inspecciona `apps/web/src/app`, `apps/web/src/features`, `apps/web/src/components`, `apps/web/src/app/globals.css` y los componentes shadcn/ui existentes. Adapta la estructura real: no recrees archivos ni paquetes innecesariamente.
2. Lee `references/brand-and-design.md` para tokens, tipografía, jerarquía y dirección visual. Consulta `assets/body-scan-logo-reference.png` como referencia visual si puedes abrir imágenes.
3. Lee `references/product-and-scope.md` para rutas, contenido verdadero, alcance y exclusiones. No inventes funcionalidades para completar el diseño.
4. Para tareas de una página concreta, presenta una propuesta breve de layout y componentes reutilizables, después implementa según el pedido. No rehagas todo el sitio cuando el usuario solicita una sección.

## Reglas innegociables de diseño

- **No diseñes una landing de IA genérica.** Evita gradientes morados, tarjetas idénticas repetidas, efectos glassmorphism excesivos, iconos decorativos arbitrarios, estadísticas inventadas y copy de marketing vacío.
- Conserva el lenguaje visual de la marca: azul petróleo + turquesa, superficies blanco-hielo, gran claridad tipográfica y fotografías médicas auténticas aprobadas.
- Prioriza composición editorial y jerarquía: hero fuerte, contenidos con respiración, grillas consistentes, divisores discretos y CTAs claros. Un acento turquesa debe guiar, no inundar toda la pantalla.
- La experiencia debe sentirse médica y local, no fintech/cyberpunk ni un dashboard estilo startup sin personalidad.
- No inventes nombres, retratos, credenciales, especialidades, horarios, precios de cursos, testimonios, métricas, dirección ni teléfonos. Usa datos proporcionados o placeholders explícitos. La foto de un médico no debe atribuirse a una persona real sin fuente fiable.
- No uses afirmaciones médicas o tecnológicas no confirmadas: «equipos de última generación», «certificación oficial», «100 % seguro» u otras garantías.
- Accesibilidad: contraste AA, focus-visible, controles navegables por teclado, labels, imágenes con alt, targets táctiles adecuados, respeto a `prefers-reduced-motion`.
- Responsive real en 360/768/1280+ px. No escondas información esencial en móvil.
- Evita animaciones innecesarias; si se requieren, usa transiciones sutiles y con propósito.

## Reglas de implementación

- Stack existente: **Next.js App Router, TypeScript, Tailwind CSS v4, shadcn/ui, Lucide React**. Backend separado NestJS + PostgreSQL + Prisma. No añadas dependencia sin necesidad.
- Las páginas/rutas viven en `src/app/(public)`, `src/app/(auth)`, área del estudiante y `src/app/(admin)`; secciones específicas en `src/features/<dominio>/components`; Navbar/Footer/layout compartidos en `src/components/layout`; primitives en `src/components/ui`.
- Prefiere Server Components; solo añade `"use client"` donde haya interacción real. No uses estado ficticio para simular backend funcional salvo que se solicite un prototipo, y márcalo claramente.
- Reutiliza variables CSS ya definidas; no esparzas hexadecimales en componentes. Si faltan tokens, propón añadirlos en `globals.css`, sin reemplazar abruptamente el tema existente.
- Mantén separadas presentación y datos; las funciones de API pertenecen a `features/<dominio>/api` o `lib/api` según su alcance.
- Usa copy final en español natural y conciso. Las páginas de contenido médico deben poder editarse desde el sistema previsto, no quedar forzadas a contenido demo fijo.
- Verifica compilación, lint y estados: loading, vacío, error y éxito cuando sean relevantes. Informa qué se modificó y qué datos faltan por validar.

## Procedimiento de calidad por tarea

1. Identifica el usuario de la pantalla (visitante/paciente, estudiante, administrador).
2. Formula la tarea principal y una sola acción prioritaria por sección.
3. Define jerarquía de información y responsividad antes de programar.
4. Implementa componentes consistentes con la marca y sin sumar funciones fuera del alcance.
5. Revisa visualmente en desktop y móvil si el entorno lo permite; elimina sobrecarga visual, falsa precisión y contenido inventado.
6. Entrega resumen de archivos alterados y decisiones pendientes, sin prometer funcionalidades no implementadas.

## Criterio de aceptación visual

El resultado debería percibirse como el sitio de una clínica privada seria que además ofrece formación médica: **diseño memorable pero sobrio, identidad específica de Body Scan, legibilidad alta, navegación evidente y contenido real**. Si parece una plantilla intercambiable por cualquier otra clínica, refínalo antes de darlo por terminado.
