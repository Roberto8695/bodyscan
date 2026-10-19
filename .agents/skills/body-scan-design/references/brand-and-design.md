# Identidad visual Body Scan — Guía operativa

## Fuente de marca

El logo proporcionado por el cliente muestra un símbolo turquesa de cuatro ramificaciones orgánicas con cuatro círculos azul petróleo, acompañado de la marca «BODY SCAN / MEDICAL CENTER» en sans serif geométrica mayúscula. La imagen de referencia se encuentra en `../assets/body-scan-logo-reference.png`.

La familia tipográfica exacta del logotipo **no está confirmada**; no afirmes que se usó Montserrat originalmente. Montserrat + Inter son propuestas para la interfaz, no identificación forense del logo.

## Tokens recomendados

Valores visuales aproximados basados en la imagen; validar contra archivo vectorial oficial si se recibe.

| Token | Hex | Uso |
|---|---|---|
| brand-petrol | `#206878` | Navegación, títulos, botones primarios |
| brand-turquoise | `#40B8C0` | Acento, iconografía, indicadores seleccionados |
| brand-ocean | `#58A0B8` | Variantes, detalles discretos |
| brand-sky | `#78C8D8` | Acentos suaves |
| brand-ice | `#C8E8F0` | Fondos de apoyo |
| text-strong | `#173B49` | Texto principal |
| surface | `#FFFFFF` | Tarjetas y áreas principales |
| surface-soft | `#F5FAFB` | Fondos alternos |
| border-soft | `#DCE9ED` | Divisores, bordes |

Los tokens neutros son decisiones de UI, no extracción literal del logo. Para texto blanco sobre turquesa claro, verifica contraste: prefiere petróleo como fondo de botones con texto blanco y turquesa como acento.

## Tipografía

- `Montserrat` 600–700: titulares de portada, secciones y énfasis editorial.
- `Inter` 400–600: párrafos, menús, formularios, tablas y botones.
- Usar `next/font/google`, preferiblemente variables `--font-montserrat`, `--font-inter`.
- Titulares con tracking ajustado ligeramente, line-height compacto; párrafos generosos y legibles.
- Títulos en español, no mayúsculas completas indiscriminadamente.

## Lenguaje visual

- Inspiración: arquitectura médica contemporánea, superficies limpias, cyan contenido y fotografía honesta de clínica y profesionales.
- Hero editorial asimétrico con copy claro a la izquierda y fotografía real a la derecha; evita superponer texto blanco sobre fondos fotográficos sin contraste.
- Escalas amplias de spacing, contenedores alineados, tarjetas de poca sombra, radios moderados (10–16px).
- Secciones que se diferencian por composición y fondo, no seis grillas idénticas.
- Iconos lineales Lucide, sólo cuando aumentan la comprensión.
- Microinteracciones discretas de hover y focus; no efectos futuristas que dificulten la lectura.

## Ejemplo de CSS sin sobrescribir temas existentes

```css
:root {
  --brand-petrol: #206878;
  --brand-turquoise: #40b8c0;
  --brand-ocean: #58a0b8;
  --brand-ice: #c8e8f0;
  --brand-ink: #173b49;
  --brand-canvas: #f5fafb;
}
@theme inline {
  --color-brand-petrol: var(--brand-petrol);
  --color-brand-turquoise: var(--brand-turquoise);
  --color-brand-ink: var(--brand-ink);
  --font-heading: var(--font-montserrat);
  --font-sans: var(--font-inter);
}
```

No copies si ya existen tokens equivalentes; reutiliza las clases del proyecto.

## Criterios específicos de composición

- Header: logo original, navegación clara y acción de contacto solo si existe un destino real. «Agendar cita» no significa prometer un sistema de reservas; puede ser enlace a WhatsApp si el cliente lo aprueba.
- Home: hero, valor diferencial validado, especialidades, profesionales destacados, introducción a academia, acceso al blog, contacto.
- Profesionales: filtros únicamente si están respaldados por datos reales; tarjetas con retratos autorizados y horarios verificados.
- Blog: editorial legible, jerarquía de categorías y artículos, credibilidad del autor y fecha. No fabricar consejos clínicos.
- Academia: catálogo comprensible y fichas de curso con precio, vigencia y proceso de inscripción explícitos.
- Admin: más funcional que ornamental; densidad útil, accesibilidad y claridad en estados de pago.
