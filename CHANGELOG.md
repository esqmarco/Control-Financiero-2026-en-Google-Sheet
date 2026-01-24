# Changelog - Sistema Control Financiero 2026

Todas las versiones notables del sistema.

---

## [7.21] - 2026-01-24

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
