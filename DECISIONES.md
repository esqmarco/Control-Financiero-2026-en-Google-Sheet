# DECISIONES.md - Registro de Cambios Aprobados

> **IMPORTANTE**: Este archivo contiene decisiones FINALES aprobadas por el usuario.
> Claude NO debe revertir, modificar ni contradecir estas decisiones.
> Solo el usuario puede agregar o modificar entradas aquí.

---

## Formato de Registro

```
### [FECHA] - Título corto
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**: Qué se decidió
**Archivos afectados**: Lista de archivos
**Razón**: Por qué se tomó esta decisión
```

---

## Decisiones Registradas

### [2026-01-02] - Origen de datos REAL según frecuencia
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Frecuencia "Variable" (puro) → SUMIFS desde CARGA_FAMILIA/CARGA_NT
- Frecuencia "Fijo/Mensual", "Variable/Mensual", "Fijo/Anual", "Variable/Anual" → INDEX/MATCH desde GASTOS_FIJOS
**Archivos afectados**: gs/Sheets.gs, CLAUDE.md
**Razón**: El usuario aclaró que solo los gastos puramente variables (Supermercado, Combustible) van a CARGA. Los que tienen BASE van a GASTOS_FIJOS.

---

### [2026-01-02] - MOVIMIENTO y TABLERO con fórmulas dinámicas
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- MOVIMIENTO debe usar fórmulas que lean de PRESUPUESTO, GASTOS_FIJOS y CARGA
- TABLERO debe usar fórmulas que lean de MOVIMIENTO
- NUNCA valores fijos/hardcodeados
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs
**Razón**: El usuario rechazó la versión con valores estáticos. El sistema debe actualizarse en tiempo real.

---

### [2026-01-02] - Selector de mes en MOVIMIENTO controla todo
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Celda B3 de MOVIMIENTO tiene dropdown con meses
- Celda K3 (oculta) tiene fórmula MATCH que convierte mes a número
- Todas las fórmulas usan $K$3 para filtrar por mes
- TABLERO sincroniza con MOVIMIENTO!B3
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs
**Razón**: Un solo punto de control para cambiar el mes visualizado.

---

### [2026-01-02] - Sistema de documentación con memoria
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- CLAUDE.md es la fuente de verdad técnica
- PLAN_MAESTRO es la referencia de negocio
- settings.json tiene reglas estructuradas
- /verificar audita consistencia
- DECISIONES.md registra cambios aprobados
**Archivos afectados**: CLAUDE.md, .claude/settings.json, .claude/commands/verificar.md, DECISIONES.md
**Razón**: Evitar que Claude "olvide" o "alucine" cambios diferentes a los acordados.

---

## Cómo Agregar Nuevas Decisiones

Después de aprobar un cambio, el usuario debe decir:
```
"Registra esta decisión: [descripción]"
```

Claude agregará una nueva entrada con:
- Fecha actual
- Descripción del cambio
- Archivos afectados
- Razón de la decisión
- Estado: ✅ APROBADO - NO REVERTIR

---

## Reglas para Claude

1. **ANTES de modificar código**: Leer DECISIONES.md
2. **Si un cambio contradice una decisión**: DETENER y preguntar al usuario
3. **NUNCA revertir** una decisión marcada como APROBADA
4. **Si hay duda**: Preguntar antes de actuar

---

*Última actualización: 2026-01-02*
