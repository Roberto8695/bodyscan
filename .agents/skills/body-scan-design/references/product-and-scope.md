# Contexto de negocio y límites del MVP

## Producto real

**Body Scan Medical Center** es una clínica con sitio institucional y especialistas médicos en Cochabamba, Bolivia. Está desarrollando una nueva web con **academia de cursos/talleres de formación médica** y **blog** para noticias, artículos e información. Existe un sistema interno anterior para tareas, asistencias y agendas del personal; **NO** debe reconstruirse, fusionarse ni modificarse sin evaluación y solicitud explícita.

Públicos:
- Visitantes/pacientes: conocer clínica, especialidades, profesionales, servicios y contacto.
- Estudiantes: descubrir cursos, registrarse, solicitar inscripción, acceder a videos y PDFs si tienen autorización vigente.
- Administradores de clínica: publicar cursos, organizar módulos/lecciones, validar comprobantes de pago, administrar inscripciones y publicar artículos.

## Alcance confirmado para versión inicial

- Web institucional renovada, diseño responsive y coherente con el logo.
- Secciones: Inicio, Nosotros, Especialidades, Servicios, Profesionales, Contacto, Academia y Blog.
- Blog con artículos, noticias, imágenes, categorías, borradores/publicación (según API disponible).
- LMS básico con cursos, módulos, lecciones, videos alojados con proveedor externo y materiales PDF.
- Registro/inicio de sesión y área privada de estudiantes.
- Pago **manual** por QR/transferencia: estudiante adjunta comprobante, administrador confirma recepción del dinero, habilita acceso por tiempo limitado.
- Panel admin para contenidos, cursos, estudiantes, pagos e inscripciones.
- Protecciones razonables de autorización y acceso a contenido; no prometer impedir toda copia o reventa.

## Funciones excluidas: NO implementar ni dibujar como funcionalidades activas

- Seguimiento de progreso/porcentaje de avance o «continuar donde lo dejaste».
- Certificados digitales, insignias, acreditaciones o verificadores.
- Evaluaciones, exámenes o calificaciones.
- Reportes/analítica avanzada y paneles de métricas ficticias.
- Pasarela de cobro automático y suscripciones recurrentes.
- Sistema propio de videollamadas, chat comunitario, app nativa.
- Control avanzado de múltiples dispositivos/sesiones si no se contrata después.
- Gestión del personal, asistencias, tareas y agenda interna de la clínica.
- Reserva médica automatizada, ficha clínica o historial médico.

## Reglas de contenido

- No presentar cursos inventados como oferta real; en prototipos, identificarlos expresamente como «curso de ejemplo».
- No atribuir fotos de banco de imágenes a doctores de Body Scan ni inventar cédulas, títulos u horarios.
- No asumir que Body Scan otorga títulos reconocidos o certificados; esa función se descartó.
- No duplicar datos sensibles ni revelar comprobantes a otros estudiantes.
- No usar precios de ejemplo (p. ej., Bs 300 de documento comercial) como precios confirmados.
- Preferir copy real disponible en API o contenido facilitado por la clínica.

## Arquitectura web

- Monorepo pnpm/Turborepo: `apps/web` (Next.js) y `apps/api` (NestJS) con PostgreSQL/Prisma en backend.
- `src/app/(public)/` para rutas institucionales y educativas públicas, `src/features/home/components/` para secciones de Home, `src/components/layout/public/` para Navbar/Footer, `src/components/ui/` para primitives de shadcn.
- `src/features/courses`, `auth`, `blog`, `payments`, `enrollments`, `professionals`, `specialties` para componentes y lógica por dominio.
- Panel de estudiante y panel administrativo con layouts propios, sin reutilizar el header comercial indiscriminadamente.

## Ejemplo de lenguaje útil para producto

Preferir: «Explora nuestros cursos», «Conoce nuestras especialidades», «Consulta el perfil», «Envía tu comprobante», «Pendiente de verificación», «Acceso disponible hasta [fecha]».

Evitar: «Tu progreso 85 %», «Descarga tu certificado», «Revisar calificaciones», «Ingresos del mes +32 %», «Agenda en línea confirmada» si no existe la función.
