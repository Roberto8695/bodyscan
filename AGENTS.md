# AGENTS.md — Body Scan Medical Center

Guía operativa para agentes de IA que colaboran en este repositorio. Léela **antes** de editar código, crear archivos o proponer features. No es un README genérico: contiene reglas de negocio y de diseño que no se derivan del código.

---

## 1. Qué es este proyecto

**Body Scan Medical Center** es una clínica real en Cochabamba, Bolivia. Este monorepo contiene su sitio institucional, su academia de formación médica (LMS básico) y su blog. El sistema interno de personal (asistencias, agenda, tareas) **no vive aquí** y no debe fusionarse ni replicarse.

Tres públicos conviven en un mismo producto:

- **Visitantes / pacientes** — conocer la clínica, especialidades, profesionales y contacto.
- **Estudiantes** — descubrir cursos, enviar comprobante de pago manual, acceder a videos y PDFs cuando el admin habilita el acceso.
- **Administradores** — publicar contenido editorial, administrar cursos y módulos, verificar comprobantes y habilitar inscripciones.

---

## 2. Topología del monorepo

```
bodyscan/
├── apps/
│   ├── web/   → Next.js 16 (App Router, React 19, Tailwind v4, shadcn/ui)
│   └── api/   → NestJS 11 + Prisma 7 + PostgreSQL
├── packages/  → compartidos entre apps (vacío por ahora)
├── infra/     → docker-compose para Postgres local
├── docs/      → API reference generada manualmente
└── .agents/   → skills Impeccable + body-scan-design (contexto obligatorio)
```

Monorepo gestionado por **pnpm 12** + **Turborepo**. No introduzcas yarn, npm, bun ni lerna.

---

## 3. Reglas innegociables de alcance

Las siguientes funciones **no existen** en el producto y no deben dibujarse como activas en UI, mocks, prototipos ni demos:

- Seguimiento de progreso, porcentaje de avance o "continuar donde lo dejaste".
- Certificados, insignias, diplomas o verificadores de acreditación.
- Exámenes, calificaciones o evaluaciones.
- Pasarela de pago automática o suscripciones recurrentes. El flujo real es **manual**: QR / transferencia + comprobante que el admin valida.
- Reservas médicas, ficha clínica, historial o telemedicina propia.
- Reportes analíticos, dashboards de métricas o KPIs ficticios.
- Chat comunitario, videollamadas propias, app nativa.
- Gestión del personal, asistencias, tareas o agenda interna de la clínica.

Si una pantalla parece exigir una de estas funciones, detente y pregunta antes de implementarla.

---

## 4. Reglas de contenido

- No inventes nombres, retratos, credenciales, especialidades, horarios, precios ni testimonios. Usa datos de la API o `placeholders` explícitos.
- No atribuyas fotos de banco de imágenes a médicos reales. Imagen pendiente = marco con nota, no una cara ficticia.
- No uses afirmaciones no verificadas: "equipos de última generación", "certificación oficial", "100 % seguro".
- Prefiere copy en español natural, breve y específico. Evita jerga SaaS ("potencia tu salud con IA").

---

## 5. Identidad visual (resumen)

Full detail en `.agents/skills/body-scan-design/references/brand-and-design.md`. Reglas rápidas:

- **Paleta:** `brand-petrol #206878`, `brand-turquoise #40B8C0`, `brand-ocean #58A0B8`, `brand-ice #C8E8F0`, texto `#173B49`, superficies blanco-hielo.
- **Tipografía:** `Montserrat` 600–700 para titulares, `Inter` 400–600 para cuerpo. Cargar vía `next/font/google` con variables CSS.
- **Tono visual:** editorial, clínico y confiable. Evita gradientes morados, glassmorphism excesivo, iconos decorativos arbitrarios y tarjetas idénticas repetidas en bucle.
- **Tokens:** usa variables de `apps/web/src/app/globals.css`. Nada de hexadecimales esparcidos en componentes.

Siempre que la tarea toque UI (nueva página, sección, componente, refinamiento visual), carga primero el skill `body-scan-design` y sus `references/`.

---

## 6. Convenciones de código

### 6.1 Frontend (`apps/web`)

- **App Router**, grupos de ruta por audiencia:
  - `src/app/(public)/` — sitio institucional, academia pública, blog.
  - `src/app/(auth)/` — login / registro (pendiente de crear).
  - `src/app/(admin)/` — panel administrativo (pendiente de crear).
  - Área de estudiante autenticado — grupo propio cuando se cree.
- **Server Components por defecto.** Solo añade `"use client"` cuando haya interacción real (estado, efectos, event handlers no server-action).
- **Dominios en `src/features/<dominio>/`** con subcarpetas canónicas:
  - `api/` — fetchers y loaders (`server-only`).
  - `components/` — un componente por archivo, kebab-case.
  - `types/` — tipos de dominio.
  - `config.ts` — constantes locales si hay más de una.
- **Separa fetching puro de orquestación:** `api/get-X.ts` hace la petición y valida formato; `api/load-X.ts` envuelve en Result y maneja `unstable_rethrow`. Ejemplo real: `features/specialties/api/`.
- **Primitives shadcn** en `src/components/ui/`. Layouts compartidos en `src/components/layout/{public,student,admin}/`.
- **Alias `@/`** apunta a `apps/web/src/`.
- **Validación**: zod ya está disponible; úsalo en formularios y boundaries de API.
- **No agregues dependencias** sin justificar. Antes verifica que no exista algo equivalente ya instalado.

### 6.2 Backend (`apps/api`)

- Módulos NestJS por dominio: `auth`, `users`, `courses`, `articles`, `enrollments`, `institutional`, `media`.
- Separa controladores públicos de los admin: `X.controller.ts` + `X-admin.controller.ts` (patrón establecido).
- DTOs con `class-validator` en `dto/` por módulo.
- Prisma schema único en `apps/api/prisma/schema.prisma`. Para cambios: `pnpm db:migrate` desde la raíz.
- Guards de auth en `src/auth/guards/`. No autentiques en controladores manualmente.
- Swagger expuesto en `http://localhost:4000/docs`.

### 6.3 Compartido

- No crees documentación `*.md` sin pedido explícito.
- Comentarios solo cuando el **por qué** no es obvio. Nombres descriptivos > comentarios decorativos.

---

## 7. Flujo de trabajo

### Comandos frecuentes (desde la raíz)

```bash
pnpm dev              # web + api en paralelo (turbo)
pnpm build            # build de todo el workspace
pnpm lint             # eslint en todos los packages
pnpm test             # jest donde esté configurado

pnpm db:up            # Postgres en Docker (necesita .env en raíz)
pnpm db:migrate       # Prisma migrate dev
pnpm db:generate      # regenerar Prisma Client
pnpm db:studio        # Prisma Studio
pnpm db:seed          # (desde apps/api) seed inicial
pnpm db:down          # detener Postgres
```

Admin inicial: `pnpm --filter @bodyscan/api run admin:create`.

### Antes de abrir un cambio

1. Lee el skill `body-scan-design` si tocas UI; su `references/product-and-scope.md` manda sobre el alcance.
2. Inspecciona el feature existente antes de crear archivos nuevos. Reutiliza estructura (`api/`, `components/`, `types/`, `config.ts`).
3. Verifica `pnpm lint` y `tsc --noEmit` en el paquete tocado.
4. En UI, revisa visualmente al menos en breakpoints 360 / 768 / 1280 px y los estados loading / vacío / error / éxito cuando apliquen.

---

## 8. Notas sobre otros `AGENTS.md`

- **`apps/web/AGENTS.md`** lo genera y mantiene `next dev` (Next 16 lo reescribe en cada arranque). No lo edites a mano: tus cambios se perderán. Si necesitas instrucciones específicas para `apps/web`, añádelas a este archivo raíz o abre un ticket.

---

## 9. Dónde pedir contexto

- Reglas de diseño y marca → `.agents/skills/body-scan-design/`
- Framework de craft visual → `.agents/skills/impeccable/SKILL.md`
- Hooks locales (impeccable, codex) → `.impeccable/`, `.codex/hooks.json`
- Referencia de API → `docs/api.md` y Swagger en `localhost:4000/docs`
- Schema de datos → `apps/api/prisma/schema.prisma`

---

Última revisión: 2026-10-24.
