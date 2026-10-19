# Instalar la skill de diseño Body Scan para Codex

Coloca la carpeta `body-scan-design` completa dentro del repositorio en:

```text
bodyscan/.agents/skills/body-scan-design/
```

Si tu versión/configuración de Codex no descubre skills locales del proyecto, instálala en tu directorio personal:

```text
~/.codex/skills/body-scan-design/
```

Para instalar globalmente en Git Bash desde el directorio donde extrajiste el ZIP:

```bash
mkdir -p ~/.codex/skills
cp -r body-scan-design ~/.codex/skills/
```

En Codex, invócala de forma explícita: `$body-scan-design`.

Ejemplos:

- `$body-scan-design Rediseña la home de Body Scan basándote en su marca. Inspecciona primero el código existente. No inventes métricas, testimonios ni funcionalidades.`
- `$body-scan-design Implementa el Navbar responsive y Footer institucional usando nuestros tokens y estructura Feature-Based.`
- `$body-scan-design Revisa el catálogo de cursos y mejora el diseño sin incluir progreso, exámenes ni certificados.`
- `$body-scan-design Diseña la página del blog con estética editorial médica y estados vacíos reales.`

La carpeta `assets/` contiene exclusivamente la referencia de logo proporcionada, no tipografías ni fotos de médicos.
