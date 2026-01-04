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
**Estado**: 🔄 EVOLUCIONADA → ver v2 [2026-01-02b]

---

### [2026-01-02b] - Selector de mes en MOVIMIENTO controla todo (v2)
**Estado**: ✅ APROBADO - NO REVERTIR
**Evoluciona de**: [2026-01-02] Selector de mes en MOVIMIENTO
**Descripción**:
- Celda B3 de MOVIMIENTO tiene dropdown con meses
- Celda **L3** (oculta) tiene fórmula MATCH que convierte mes a número (antes era K3)
- Todas las fórmulas usan **$L$3** para filtrar por mes
- TABLERO sincroniza con MOVIMIENTO!B3 y usa MOVIMIENTO!L3 para el número de mes
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs, CLAUDE.md
**Razón del cambio**: Se agregó columna EST. PAGO (columna I), desplazando MES_NUM a columna L.

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

### [2026-01-02c] - Columna EST. PAGO en MOVIMIENTO
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- MOVIMIENTO ahora tiene 10 columnas (antes 9)
- Nueva columna I: EST. PAGO con dropdown (Pendiente, Pagado, Cancelado)
- Permite trackear el estado de pago de cada concepto individualmente
- Columnas K-L quedan ocultas (MES_NUM)
**Archivos afectados**: gs/Sheets.gs, CLAUDE.md
**Razón**: Requerimiento del usuario para control de pagos en la hoja MOVIMIENTO.

---

### [2026-01-02d] - Todas las fórmulas con IFERROR
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- TODAS las fórmulas INDEX, MATCH, SUMIFS, SUMIF deben estar envueltas en IFERROR(...,0)
- Evita errores #VALUE!, #ERROR!, #N/A cuando no hay datos
- Ejemplo: `=IFERROR(SUMIFS(...),0)` en lugar de `=SUMIFS(...)`
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs, CLAUDE.md
**Razón**: El sistema mostraba #VALUE! en hojas vacías. Con IFERROR muestra 0.

---

### [2026-01-02e] - Nombres de conceptos unificados
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Los nombres en VARIABLES_PRESUP_FAM deben coincidir EXACTAMENTE con VARIABLES_FAMILIA
- Los nombres en VARIABLES_PRESUP_NT deben coincidir EXACTAMENTE con VARIABLES_NT
- Ejemplo: "Recreación (Pizza, hamburguesa, helados, etc)" NO "Recreación"
- Ejemplo: "Mantenimiento / Reparaciones Auto Clara" NO "Mant. Auto Clara"
**Archivos afectados**: gs/Config.gs
**Razón**: Los SUMIFS fallan si los nombres no coinciden exactamente.

---

### [2026-01-02f] - Valores iniciales en cero
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Todos los `monto: 0` en Config.gs
- Las hojas CARGA inician vacías
- PRESUPUESTO se completa manualmente por el usuario
- GASTOS_FIJOS tiene BASE=0 hasta que el usuario ingrese valores
**Archivos afectados**: gs/Config.gs
**Razón**: El usuario solicitó que el sistema inicie sin valores precargados.

---

### [2026-01-03g] - SUMPRODUCT en lugar de SUMIFS para filtrar por mes/año
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Usar `SUMPRODUCT` en lugar de `SUMIFS` cuando se filtran fechas con `MONTH()` y `YEAR()`
- SUMIFS no funciona correctamente con funciones de fecha como criterio en español
- Sintaxis correcta: `=SUMPRODUCT((CARGA!$B$4:$B$500="Concepto")*(MONTH(CARGA!$A$4:$A$500)=$L$3)*(YEAR(CARGA!$A$4:$A$500)=2026)*(CARGA!$F$4:$F$500))`
- Siempre envuelto en `IFERROR(...,0)`
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs
**Razón**: SUMIFS fallaba silenciosamente al no reconocer MONTH()/YEAR() como criterios válidos.

---

### [2026-01-03h] - Locale español en fórmulas Google Sheets
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Separador decimal: **coma** (`,`) → `0,07` no `0.07`
- Separador de argumentos: **punto y coma** (`;`) → `IF(A1>0;B1;C1)` no `IF(A1>0,B1,C1)`
- Aplica a todas las fórmulas generadas por Apps Script
- Ejemplo: `=IFERROR(E${row}*0,3333;0)` para 33.33%
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs
**Razón**: El sistema está configurado para Paraguay (es-PY) que usa formato europeo de números.

---

### [2026-01-03i] - WebApp.gs con concatenación de strings
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- El HTML se genera usando **concatenación de strings** (`+`) en lugar de template literals
- Google Apps Script NO soporta template literals anidados con backticks escapados
- Se usan funciones auxiliares (`generarFilasCuentasFamilia()`, `generarTortaGastos()`, etc.) para modularizar
**Archivos afectados**: gs/WebApp.gs
**Razón**: Error de sintaxis "Invalid or unexpected token" al usar template literals anidados.

---

### [2026-01-03j] - Cálculo dinámico de posiciones en WebApp
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Las posiciones de celdas en `obtenerDatosDashboard()` se calculan dinámicamente
- Basado en `CUENTAS_FAMILIA.length` (10) y `CUENTAS_NT.length` (3)
- Posiciones clave calculadas:
  - FILA_INICIO_CUENTAS_FAM = 8
  - FILA_TOTAL_CUENTAS_FAM = 8 + 10 = 18
  - FILA_INGRESOS_FAM = 23, FILA_EGRESOS_FAM = 24, FILA_BALANCE_FAM = 25
  - FILA_INGRESOS_NT = 9 (H9/J9), FILA_GANANCIA_NT = 13 (H13/J13)
  - FILA_DISTRIBUCION = 20
- Función `leerNumero()` para evitar valores NaN
**Archivos afectados**: gs/WebApp.gs
**Razón**: Valores hardcodeados causaban que el HTML mostrara datos incorrectos o NaN.

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
2. **Si un cambio contradice una decisión**: DETENER y mostrar ALERTA DE IMPACTO
3. **NUNCA revertir silenciosamente** - siempre notificar
4. **Si hay duda**: Preguntar antes de actuar

---

## Protocolo de Modificación de Decisiones

Las decisiones pueden **evolucionar** cuando hay razones válidas. Cuando detecte un conflicto:

### Paso 1: Mostrar Alerta de Impacto
```
⚠️ ALERTA: Este cambio afecta una decisión aprobada

📋 Decisión afectada: [nombre]
📅 Aprobada el: [fecha]
📝 Dice actualmente: [descripción]

🔄 Cambio propuesto: [nuevo comportamiento]

📊 ANÁLISIS DE IMPACTO:
- Archivos que cambiarían: [lista]
- Funcionalidad afectada: [descripción]
- Riesgo: [Bajo/Medio/Alto]

❓ ¿Deseas:
   A) Proceder con el cambio (evolucionará la decisión)
   B) Cancelar y mantener la decisión actual
   C) Discutir alternativas
```

### Paso 2: Si el usuario aprueba, registrar evolución
La decisión original se marca como EVOLUCIONADA y se crea una nueva versión.

---

## Decisiones Evolucionadas (Historial)

Cuando una decisión cambia, se registra así:

```
### [FECHA] - Título (v2)
**Estado**: ✅ APROBADO - NO REVERTIR
**Evoluciona de**: [referencia a versión anterior]
**Descripción**: Nueva descripción
**Razón del cambio**: Por qué se modificó
**Archivos afectados**: Lista actualizada
```

La versión anterior se marca como:
```
**Estado**: 🔄 EVOLUCIONADA → ver v2
```

---

## Ejemplo de Evolución

### Antes:
```
### [2026-01-02] - Meta ganancia NT 7%
**Estado**: 🔄 EVOLUCIONADA → ver v2 [2026-02-15]
```

### Después:
```
### [2026-02-15] - Meta ganancia NT 10% (v2)
**Estado**: ✅ APROBADO - NO REVERTIR
**Evoluciona de**: [2026-01-02] Meta ganancia NT 7%
**Razón del cambio**: Análisis financiero mostró que 7% era insuficiente
```

---

---

### [2026-01-03k] - EST. PAGO como GATILLO de contabilización
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- EST. PAGO en MOVIMIENTO controla DÓNDE se contabiliza cada gasto
- **Pendiente**: Monto se muestra pero suma a "EGRESOS PENDIENTES" (no a pagados)
- **Pagado**: Monto suma a "EGRESOS PAGADOS" (se descuenta de DISPONIBLE)
- **Cancelado**: Monto no suma a ninguno (anulado)
- Por defecto: Todos los conceptos inician como "Pendiente"
- Fórmula TABLERO: `EGRESOS_PAGADOS = SUMIF(MOVIMIENTO!I:I,"Pagado",MOVIMIENTO!E:E)`
**Archivos afectados**: gs/Sheets.gs, gs/Tablero.gs, PLAN_MAESTRO (§8.3)
**Razón**: El usuario quiere controlar manualmente cuándo un gasto se considera "efectuado", no automáticamente.

---

### [2026-01-03l] - Nueva hoja LIQUIDEZ (8va hoja)
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Se crea una 8va hoja llamada "LIQUIDEZ" (antes eran 7 + WEB APP popup)
- Estructura:
  - 🔴 ATRASADOS: Gastos donde DÍA < DAY(TODAY()) y EST.PAGO = "Pendiente"
  - 🟡 ESTA SEMANA: DÍA entre HOY y HOY+7
  - 🟢 PRÓXIMA SEMANA: DÍA entre HOY+8 y HOY+14
- Usa fórmulas con TODAY() que se actualizan automáticamente cada día
- Separado por entidad: FAMILIA y NEUROTEA
- Incluye resumen con SALDO PROYECTADO
**Archivos afectados**: gs/Sheets.gs (nueva función crearHojaLIQUIDEZ), gs/Código.gs, PLAN_MAESTRO (§11)
**Razón**: El usuario quiere ver claramente qué gastos vencieron, cuáles vencen esta semana y cuáles la próxima.

---

### [2026-01-03m] - SALDO_INICIAL manual por mes
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- En TABLERO, sección editable para ingresar SALDO_INICIAL de cada entidad
- Al cambiar de mes, el usuario carga manualmente el saldo que quedó del mes anterior
- Fórmula: `DISPONIBLE = SALDO_INICIAL + INGRESOS_MES - EGRESOS_PAGADOS`
- NO se arrastra automáticamente del mes anterior (simplicidad)
- Flujo: Cerrar enero → Ver saldo final → Cambiar a febrero → Cargar saldo inicial febrero
**Archivos afectados**: gs/Tablero.gs, PLAN_MAESTRO (§12.0)
**Razón**: El usuario prefiere control manual del cierre de mes en lugar de fórmulas complejas de arrastre.

---

### [2026-01-03n] - Corrección de colores en DIFERENCIA
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Colores de la columna DIFERENCIA deben considerar el contexto:
  - **INGRESOS**: Positivo (+) = VERDE (recibiste más), Negativo (-) = ROJO (recibiste menos)
  - **EGRESOS**: Negativo (-) = VERDE (gastaste menos), Positivo (+) = ROJO (gastaste más)
- Antes: Misma regla para todos (invertido para ingresos)
- Implementación: Formato condicional con fórmula que verifica columna TIPO
**Archivos afectados**: gs/Sheets.gs (reglas de formato condicional)
**Razón**: El usuario reportó que los colores estaban invertidos para ingresos.

---

### [2026-01-03o] - EST.PAGO diferenciado según origen del dato
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- Los items que vienen de **CARGA** (ya pagados/recibidos) NO tienen dropdown:
  - **INGRESOS**: EST.PAGO = "Recibido" (fijo, gris, cursiva)
  - **VARIABLES puros**: EST.PAGO = "Pagado" (fijo, gris, cursiva)
  - **EVENTOS**: EST.PAGO = "Pagado" (fijo, gris, cursiva)
- Solo **GASTOS_FIJOS** tienen dropdown (Pendiente/Pagado/Cancelado)
- Razón: Si ya cargaste un gasto en CARGA, es porque ya lo pagaste. No tiene sentido preguntar si está pendiente.
**Archivos afectados**: gs/Sheets.gs (funciones escribirSeccionMovimiento*)
**Razón**: El usuario detectó inconsistencia: items de CARGA aparecían como "Pendiente" pero ya estaban contabilizados como pagados en TABLERO.

---

### [2026-01-03p] - Cuentas NEUROTEA corregidas
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- NEUROTEA tiene solo 2 cuentas:
  1. Atlas NeuroTEA (cuenta bancaria)
  2. Caja Chica NT (efectivo)
- Se eliminó "Efectivo NT" que era redundante con Caja Chica
- En TABLERO, SALDOS NT muestra: Esperado (automático desde CARGA_NT) y Real ✏️ (manual)
**Archivos afectados**: gs/Config.gs, gs/Tablero.gs
**Razón**: El usuario corrigió que no existe cuenta "Efectivo NT" separada de Caja Chica.

---

---

### [2026-01-04q] - Columna CUENTA en GASTOS_FIJOS
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- GASTOS_FIJOS ahora tiene columna F = CUENTA
- Indica de qué cuenta bancaria se debita cada gasto fijo
- Nueva estructura de columnas:
  - A=CONCEPTO, B=ENTIDAD, C=CATEGORÍA, D=FRECUENCIA, E=DÍA
  - **F=CUENTA** (nueva)
  - G=BASE, H-S=ENE-DIC (meses desplazados)
- Dropdown con opciones de CUENTAS_FAMILIA o CUENTAS_NT según entidad
**Archivos afectados**: gs/Config.gs, gs/Sheets.gs, CLAUDE.md
**Razón**: El usuario necesita saber de qué cuenta se paga cada gasto fijo para control de saldos.

---

### [2026-01-04r] - "Saldo Banco" en lugar de "Real" en TABLERO
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- En TABLERO, sección "SALDOS EN CUENTAS", la columna editable se renombró
- Antes: "Real ✏️"
- Ahora: "Saldo Banco ✏️"
- Razón: "Real" se confundía con la columna REAL de MOVIMIENTO (que muestra gastos reales)
- "Saldo Banco" es más claro: es el saldo que el usuario verifica en su banco/app
**Archivos afectados**: gs/Tablero.gs, CLAUDE.md
**Razón**: El usuario reportó confusión por tener "Real" en dos contextos con significados diferentes.

---

### [2026-01-04s] - AHORRO carga desde CARGA_FAMILIA (no GASTOS_FIJOS)
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- AHORRO ya NO está en GASTOS_FIJOS
- AHORRO se registra en CARGA_FAMILIA cuando efectivamente se hace la transferencia
- Items de ahorro: Ahorro Clara, Ahorro Marco, Fondo de Emergencia
- En MOVIMIENTO:
  - Sección separada "AHORRO" (verde)
  - EST.PAGO = "Ahorrado" (fijo, verde, cursiva) - no es "Pendiente"
  - Fórmula: SUMPRODUCT desde CARGA_FAMILIA
- En CARGA_FAMILIA:
  - Si CATEGORÍA = AHORRO → muestra dropdown con subcategorías ahorro
**Archivos afectados**: gs/Config.gs (AHORRO_FAMILIA array), gs/Sheets.gs, gs/Code.gs (onEdit)
**Razón**: El ahorro es una transferencia positiva que se hace cuando hay dinero disponible. No tiene sentido tenerlo como "Pendiente" ya que no es una obligación fija.

---

### [2026-01-04t] - PRESUPUESTO con cálculos automáticos completos
**Estado**: ✅ APROBADO - NO REVERTIR
**Descripción**:
- PRESUPUESTO ahora incluye fórmulas calculadas según PLAN_MAESTRO §4:
  - Subtotales por sección (SUM automático)
  - TOTAL INGRESOS FAMILIA / EGRESOS FAMILIA / BALANCE FAMILIA
  - TOTAL INGRESOS NEUROTEA / EGRESOS NEUROTEA
  - **Ganancia Calculada** = Ingresos - Egresos
  - **% Ganancia** = Ganancia / Ingresos (formato porcentaje)
  - **Estado Meta** con semáforo:
    - 🔴 PÉRDIDA: Ganancia < 0
    - 🟡 <7%: Ganancia 0-7%
    - 🟢 META: Ganancia ≥ 7%
  - Distribución de utilidad: 33.33% cada fondo (lee de METAS_NT.GANANCIA_MINIMA_PCT)
  - BALANCE NEUROTEA
  - BALANCE CONSOLIDADO FAM/NT
**Archivos afectados**: gs/Sheets.gs (crearHojaPRESUPUESTO, escribirSeccionPresupuesto, escribirSeccionEventos)
**Razón**: El usuario identificó que PRESUPUESTO no tenía los cálculos especificados en PLAN_MAESTRO §4.

---

*Última actualización: 2026-01-04 - Agregadas decisiones q, r, s, t (CUENTA, Saldo Banco, AHORRO, PRESUPUESTO cálculos)*
