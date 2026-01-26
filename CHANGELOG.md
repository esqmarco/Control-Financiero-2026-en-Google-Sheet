# Changelog - Sistema Control Financiero 2026

Todas las versiones notables del sistema.

---

## [7.28] - 2026-01-26

### Fixed
- **CRÍTICO: METAS sobrescribía VARIABLES_FAMILIA en CONFIG** - `filaMetas=38` se solapaba con las últimas 2 reservas variables (C38:C39). MOVIMIENTO filas 111-112 mostraban vacío/"Unidad" en vez de "Reserva Var. 4"/"Reserva Var. 5"
- Movido `filaMetas` de 38 a 41 para evitar overlap (19 items en C21:C39)
- Cascadeados todos los desplazamientos: SALDOS POR MES (50-63), CUENTA FAM (68-77), CUENTA NT (82-83)
- Actualizadas 29 referencias hardcodeadas en Sheets.gs, Tablero.gs y CLAUDE.md

---

## [7.27] - 2026-01-26

### Added
- **Filtro por mes** en CARGA_FAMILIA y CARGA_NT: dropdown en J2 con "TODOS" + 12 meses
- Al filtrar: ordena por fecha + oculta filas de otros meses
- Al seleccionar "TODOS": muestra todo ordenado cronológicamente
- Las filas ocultas NO afectan fórmulas (SUMPRODUCT sigue calculando todo)
- Utilidad de menú: "📅 Agregar Filtro por Mes a CARGA" para hojas existentes

### Technical
- Sheets.gs: fila 2 dividida (A2:H2 subtitle + I2 label + J2 dropdown)
- Code.gs: onEdit detecta J2, filtrarCargaPorMes() ordena y oculta filas en lotes
- Sort solo columnas A-I (preserva ARRAYFORMULA de J)

---

## [7.26] - 2026-01-26

### Added
- **Columna VÁLIDO (J)** en CARGA_FAMILIA y CARGA_NT: ARRAYFORMULA que detecta filas que NO serán contadas en TABLERO
  - "✓" = fila válida, será contada
  - "⚠ Fecha" = fecha inválida/texto
  - "⚠ Año" = año ≠ 2026
  - "⚠ Monto" = monto vacío o texto
- **Formato condicional**: filas con ⚠ se resaltan en rojo claro, ✓ en verde
- **Utilidad de menú**: "✓ Agregar columna VÁLIDO a CARGA" para agregar a hojas existentes sin reinicializar

### Technical
- Sheets.gs: headers expandidos A-J, ARRAYFORMULA en J4, conditional formatting mejorado
- Code.gs: nueva función `agregarColumnaValido()`, menú actualizado

---

## [7.25] - 2026-01-26

### Changed
- **VARIABLES FAMILIA**: 5 reservas dinámicas (antes 2) → total 19 ítems (14 fijos + 5 reservas)
- **VARIABLES NEUROTEA**: 5 reservas dinámicas (antes 2) → total 15 ítems (10 fijos + 5 reservas)
- "Gastos del Colegio" (FAM) y "Muebles y equipos" (NT) permanecen como ítems permanentes
- Rangos MOVIMIENTO actualizados: FAMILIA 9-116, NEUROTEA 122-206

### Technical
- Config.gs: VARIABLES_FAMILIA, VARIABLES_NT, VARIABLES_PRESUP_FAM, VARIABLES_PRESUP_NT (+3 reservas c/u)
- Sheets.gs: LIQUIDEZ parámetros actualizados (9,116 y 122,206)
- Tablero.gs: 12+ referencias de rango actualizadas (SUMIF, SUMIFS, SUMPRODUCT)
- WebApp.gs: 2 getRange actualizados

---

## [7.24] - 2026-01-26

### Fixed
- **BUG CRÍTICO:** SUMPRODUCT retornaba 0 si UNA fecha en CARGA era texto/malformada → ahora usa `IFERROR(MONTH();0)` y `IFERROR(YEAR();0)` dentro del SUMPRODUCT para aislar filas con fechas inválidas
- **BUG:** SUBCATEGORÍA mostraba error de validación al pegar datos desde otro Google Sheet → cambiado de `requireValueInRange(CONFIG)` a `requireValueInList(VARIABLES_*)` para compatibilidad con paste
- **BUG:** Validación de SUBCATEGORÍA en Code.gs (restauración Egreso) también usaba `requireValueInRange` → unificado a `requireValueInList`

### Changed
- `repararDatosCarga()` ahora también: trim de espacios en texto, limpieza de validaciones en filas de ingreso/ahorro
- Menú renombrado: "Reparar Datos Pegados en CARGA" (antes "Reparar Fechas/Montos")
- Todas las fórmulas SUMPRODUCT en Sheets.gs, Tablero.gs protegen MONTH/YEAR con IFERROR individual

### Technical
- Sheets.gs: 3 fórmulas SUMPRODUCT en MOVIMIENTO (ingresos, variables, ahorro)
- Tablero.gs: 10+ fórmulas SUMPRODUCT (Esperado FAM/NT, Ahorro, Fondo, Balance cruzado)
- Code.gs: 2 puntos de restauración de validación (FAMILIA y NT col 2 handler)

---

## [7.23] - 2026-01-26

### Added
- `repararDatosCarga()`: utilidad para convertir fechas/montos pegados como texto
- `analizarFechaTexto()`: detecta fechas bien formadas vs malformadas
- Menú: Utilidades → "Reparar Fechas/Montos en CARGA"

### Fixed
- Fórmula Esperado en Tablero.gs: cada SUMPRODUCT ahora tiene IFERROR individual (antes uno externo cubría todos)

---

## [7.22] - 2026-01-26

### Added
- Nuevas subcategorías: "Gastos del Colegio" (FAMILIA), "Muebles y equipos" (NT) - reemplazan Reserva Var. 1
- Restauración completa de dropdowns CATEGORÍA/SUBCATEGORÍA al cambiar TIPO a Egreso

### Changed
- Distribución ganancia NT simplificada: `=IF(ganancia>0;ganancia/3;0)` en PRESUPUESTO y MOVIMIENTO

### Fixed
- **BUG CRÍTICO:** Validación "No válido" en SUBCATEGORÍA y CATEGORÍA al seleccionar Ingreso/Ahorro
- **BUG CRÍTICO:** Transacciones auto-creadas (préstamos/devoluciones) mostraban error de validación
- **BUG:** CATEGORÍA dropdown desaparecía al cambiar Ingreso → Egreso (validación no se restauraba)
- **BUG:** SUBCATEGORÍA mostraba warning al seleccionar CATEGORÍA no-VARIABLES (faltaba clearDataValidations)
- `clearDataValidations()` aplicado en 6+ puntos donde se asigna "-" a celdas con validación activa
- Validaciones restauradas con `setDataValidation()` al volver a modo Egreso

---

## [7.21] - 2026-01-24

### Added
- Auto-limpieza de contrapartes huérfanas via trigger `onChange` (detecta `REMOVE_ROW`)
- `limpiarContrapartesHuerfanas()`: escanea LINK_IDs sin par y elimina filas huérfanas
- `instalarTriggerOnChange()`: instala el trigger una sola vez desde menú
- Menú: Utilidades → "Verificar Contrapartes Huérfanas" + "Instalar Auto-limpieza"

### Fixed
- Auto-creación de "Devolución NT → Familia" no generaba ingreso en CARGA_FAMILIA
- FECHA, TIPO y CATEGORÍA ahora reintentan `intentarAutoCreacion` para entradas nuevas
- `validarPrestamoDevolucionNT/Familia` retornan boolean y hacen `return` si bloquean
- Eliminado flujo donde validación limpiaba celda pero código seguía ejecutando

---

## [7.20] - 2026-01-22

### Added
- Reservas de VARIABLES dinámicamente renombrables desde CONFIG
- `obtenerVariablesDesdeConfig()` lee subcategorías dinámicamente
- Dropdown SUBCATEGORÍA usa `requireValueInRange` para reflejar cambios en CONFIG

### Changed
- Validación de SUBCATEGORÍA ahora lee desde CONFIG en lugar de arrays hardcodeados

---

## [7.19] - 2026-01-22

### Added
- Sincronización dinámica de contrapartes (FECHA, MONTO, CUENTA)
- `sincronizarContraparte()` - actualiza campo específico en contraparte
- `recrearContraparte()` - borra y recrea cuando cambia tipo de transacción
- Trigger en columna CUENTA para completar auto-creación

### Changed
- Auto-creación ahora espera TODOS los campos completos (FECHA, TIPO, CATEGORÍA, SUBCATEGORÍA, MONTO, CUENTA)

### Fixed
- Cambiar SUBCATEGORÍA de préstamo a devolución ahora borra y recrea correctamente

---

## [7.18] - 2026-01-22

### Added
- `intentarAutoCreacionFamilia()` - verifica 6 campos antes de auto-crear
- `intentarAutoCreacionNT()` - misma lógica para NeuroTEA

### Fixed
- Auto-creación ya no se dispara prematuramente

---

## [7.17] - 2026-01-22

### Changed
- Distribución ganancia NT simplificada: `=IF(H21>0;H21/3;0)`
- Eliminados porcentajes configurables (eran innecesarios)

---

## [7.16] - 2026-01-22

### Fixed
- `limpiarMonto()` usado en verificación de SUBCATEGORÍA
- Toast de debug mejorado

---

## [7.15] - 2026-01-21

### Added
- `limpiarMonto()` para formato paraguayo (5.000.000)
- Logging con console.log para debugging

### Fixed
- Dropdown TIPO con `setAllowInvalid(true)` permite auto-creación

---

## [7.14] - 2026-01-21

### Changed
- Dropdowns TIPO simplificados (préstamos/devoluciones son solo auto-creados)
- TABLERO usa INDEX/MATCH en lugar de SUMPRODUCT

### Added
- Arrays separados: `TIPOS_INGRESO_*` vs `TIPOS_INGRESO_*_AUTOCREADOS`

---

## [7.13] - 2026-01-21

### Fixed
- Sistema anti-loop con timeout de 10 segundos
- Tipos auto-creados reconocidos en validaciones

---

## [7.12] - 2026-01-21

### Added
- Sistema LINK_ID (6 caracteres) para vincular contrapartes
- Auto-borrado sincronizado de transacciones cruzadas
- `borrarContraparte()`, `buscarContraparte()`

---

## [7.11] - 2026-01-20

### Fixed
- DISPONIBLE ahora referencia TOTAL DISPONIBLE (coherencia garantizada)
- GANANCIA REAL NT referencia TOTAL DISPONIBLE NT

---

## [7.8] - 2026-01-20

### Fixed
- **BUG CRÍTICO:** "Esperado" por cuenta no restaba gastos fijos
- Nueva columna N (CUENTA) en MOVIMIENTO

---

## [7.5] - 2026-01-19

### Fixed
- AHORRO ahora RESTA en fórmula Esperado (antes sumaba incorrectamente)
- Saldos globales son FÓRMULAS que suman saldos por cuenta

---

## [7.1] - 2026-01-19

### Fixed
- **BUG CRÍTICO:** INGRESOS volvían a cero después de préstamo
- `aplicarFormatoFecha()` después de setValues()
- Duplicación de transacciones cruzadas evitada con `existeTransaccionCruzada()`
