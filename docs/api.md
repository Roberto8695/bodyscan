# Body Scan API

## Ejecución local

```bash
pnpm db:up
pnpm --filter @bodyscan/api run start:dev
```

Base URL predeterminada: `http://localhost:4000`.

Los orígenes web permitidos se configuran en `CORS_ORIGINS`, separados por comas.

- Swagger UI: `GET /docs`
- OpenAPI JSON: `GET /docs/openapi.json`
- Estado: `GET /`

## Autenticación

La API utiliza sesiones opacas. El token se entrega al registrarse o iniciar sesión y debe enviarse en las rutas protegidas:

```http
Authorization: Bearer TOKEN
```

Solo el hash SHA-256 del token se almacena en PostgreSQL. Las contraseñas se derivan con `scrypt` y una sal aleatoria. La duración de las sesiones se configura con `SESSION_TTL_DAYS` y por defecto es de 30 días.

### Crear el primer administrador

Configurar en `apps/api/.env`:

```env
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=una-contrasena-segura
ADMIN_FULL_NAME=Administrador Body Scan
```

Ejecutar:

```bash
pnpm --filter @bodyscan/api run admin:create
```

El comando puede volver a ejecutarse: actualiza la contraseña indicada y garantiza que el usuario tenga el rol `ADMIN`. Las variables `ADMIN_*` no son necesarias para ejecutar normalmente la API.

## Roles

| Rol | Permisos |
| --- | --- |
| `STUDENT` | Perfil propio y cursos con acceso vigente |
| `EDITOR` | Cursos, módulos, lecciones, artículos y contenido institucional |
| `ADMIN` | Todos los permisos, usuarios, accesos y eliminaciones restringidas |

Todas las rutas son privadas por defecto. Solo las marcadas explícitamente como públicas omiten la autenticación.

## Endpoints públicos

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/` | Estado de la API |
| `POST` | `/auth/register` | Registrar estudiante e iniciar sesión |
| `POST` | `/auth/login` | Iniciar sesión |
| `GET` | `/courses` | Cursos publicados |
| `GET` | `/courses/:slug` | Detalle público de un curso |
| `GET` | `/articles` | Artículos publicados |
| `GET` | `/articles/:slug` | Detalle de un artículo |
| `GET` | `/institutional/specialties` | Especialidades publicadas |
| `GET` | `/institutional/professionals` | Profesionales publicados |
| `GET` | `/institutional/services` | Servicios publicados |

### Registro

```http
POST /auth/register
Content-Type: application/json

{
  "email": "estudiante@correo.com",
  "fullName": "Nombre Apellido",
  "password": "contrasena-segura"
}
```

El registro público siempre asigna exclusivamente el rol `STUDENT`.

### Inicio de sesión

```http
POST /auth/login
Content-Type: application/json

{
  "email": "estudiante@correo.com",
  "password": "contrasena-segura"
}
```

Respuesta resumida:

```json
{
  "token": "token-entregado-una-sola-vez",
  "expiresAt": "2026-11-16T12:00:00.000Z",
  "user": {
    "id": "uuid",
    "email": "estudiante@correo.com",
    "fullName": "Nombre Apellido",
    "roles": ["STUDENT"]
  }
}
```

## Endpoints autenticados

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/auth/me` | Usuario y roles de la sesión |
| `POST` | `/auth/logout` | Revocar la sesión actual |
| `GET` | `/enrollments/me` | Cursos con acceso vigente |
| `GET` | `/enrollments/me/courses/:courseId` | Contenido completo de un curso autorizado |

## Administración de usuarios (`ADMIN`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/admin/users` | Listar usuarios |
| `GET` | `/admin/users/:id` | Consultar usuario |
| `POST` | `/admin/users` | Crear usuario y asignar roles |
| `PATCH` | `/admin/users/:id` | Cambiar nombre, estado o roles |

Las respuestas nunca incluyen `passwordHash` ni hashes de sesión.

## Administración de cursos (`ADMIN` o `EDITOR`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/admin/courses` | Listar cursos, incluidos borradores |
| `GET` | `/admin/courses/:id` | Curso con módulos y lecciones |
| `POST` | `/admin/courses` | Crear curso |
| `PATCH` | `/admin/courses/:id` | Actualizar o publicar curso |
| `DELETE` | `/admin/courses/:id` | Eliminar borrador sin inscripciones (`ADMIN`) |
| `POST` | `/admin/courses/:courseId/modules` | Crear módulo |
| `PATCH` | `/admin/modules/:moduleId` | Actualizar módulo |
| `DELETE` | `/admin/modules/:moduleId` | Eliminar módulo y sus lecciones |
| `POST` | `/admin/modules/:moduleId/lessons` | Crear lección |
| `PATCH` | `/admin/lessons/:lessonId` | Actualizar lección |
| `DELETE` | `/admin/lessons/:lessonId` | Eliminar lección |

## Administración de archivos (`ADMIN` o `EDITOR`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/admin/media` | Listar metadatos de archivos |
| `POST` | `/admin/media` | Registrar un archivo ya subido al proveedor |
| `DELETE` | `/admin/media/:id` | Eliminar un registro no utilizado (`ADMIN`) |

Este bloque registra metadatos. La subida binaria a S3, Cloudflare R2 u otro proveedor se conectará cuando se elija el servicio de almacenamiento.

## Accesos manuales por WhatsApp (`ADMIN`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/admin/enrollments` | Listar inscripciones e historial de accesos |
| `POST` | `/admin/enrollments/access` | Conceder o renovar acceso |
| `DELETE` | `/admin/enrollments/access/:accessId` | Revocar acceso |

Si no se proporciona `expiresAt`, se calcula usando `Course.accessDays`.

```http
POST /admin/enrollments/access
Authorization: Bearer TOKEN_ADMIN
Content-Type: application/json

{
  "userId": "uuid-del-estudiante",
  "courseId": "uuid-del-curso",
  "reason": "Pago confirmado por WhatsApp"
}
```

## Administración del blog (`ADMIN` o `EDITOR`)

| Método | Ruta | Descripción |
| --- | --- | --- |
| `GET` | `/admin/articles` | Listar todos los artículos |
| `GET` | `/admin/articles/:id` | Consultar artículo |
| `POST` | `/admin/articles` | Crear artículo |
| `PATCH` | `/admin/articles/:id` | Actualizar o publicar artículo |
| `DELETE` | `/admin/articles/:id` | Eliminar artículo |
| `GET` | `/admin/article-categories` | Listar categorías |
| `POST` | `/admin/article-categories` | Crear categoría |
| `PATCH` | `/admin/article-categories/:id` | Actualizar categoría |
| `DELETE` | `/admin/article-categories/:id` | Eliminar categoría (`ADMIN`) |

## Administración institucional (`ADMIN` o `EDITOR`)

Los recursos disponibles son `specialties`, `professionals` y `services`.

```text
GET    /admin/institutional/{resource}
POST   /admin/institutional/{resource}
PATCH  /admin/institutional/{resource}/:id
DELETE /admin/institutional/{resource}/:id
```

Las eliminaciones requieren `ADMIN`. Un editor puede crear, modificar, publicar y despublicar.

## Códigos de respuesta relevantes

| Código | Significado |
| --- | --- |
| `200` | Consulta o actualización correcta |
| `201` | Recurso creado |
| `204` | Cierre de sesión, revocación o eliminación correcta |
| `400` | Datos o fechas inválidas |
| `401` | Token ausente, inválido o vencido |
| `403` | Rol insuficiente o curso sin acceso vigente |
| `404` | Recurso no encontrado |
| `409` | Correo o identificador único duplicado |
| `429` | Límite de solicitudes excedido |

## Controles de seguridad

- Autenticación global por defecto.
- Roles verificados en el servidor.
- Tokens aleatorios de 256 bits; en base de datos solo se conserva su hash.
- Contraseñas con `scrypt`, sal individual y comparación resistente a temporización.
- Cinco intentos por minuto en registro e inicio de sesión.
- Cien solicitudes por minuto como límite general.
- DTOs con lista blanca: las propiedades no declaradas son rechazadas.
- Usuarios desactivados y sesiones revocadas no pueden autenticarse.
- El contenido privado del curso se entrega únicamente con acceso vigente.

