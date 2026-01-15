# CLAUDE.md - Sistema de Control Financiero 2026

> **FUENTE DE VERDAD TÉCNICA** - Este archivo debe leerse SIEMPRE antes de modificar código.
> Para detalles de negocio completos, ver: `PLAN_MAESTRO_Control_Financiero_2026.md`
> Para decisiones ya aprobadas (NO REVERTIR), ver: `DECISIONES.md`

---

## Descripción del Proyecto

Sistema de control financiero en Google Sheets con Apps Script para gestionar las finanzas de dos entidades:
- **FAMILIA**: Finanzas del hogar (Marco y Clara)
- **NEUROTEA**: Clínica de terapia para autismo

**Moneda**: Guaraníes paraguayos (Gs.)
**Período**: Año fiscal 2026

---

## Arquitectura de Archivos .gs

```
gs/
├── Code.gs        → Menú principal, triggers, inicialización
├── Config.gs      → Datos maestros, cuentas, categorías, colores
├── Sheets.gs      → Creación de las 8 hojas principales
├── Tablero.gs     → Dashboard en Google Sheets (fórmulas dinámicas)
├── WebApp.gs      → Dashboard HTML/CSS (lee datos en tiempo real)
└── Utils.gs       → Funciones utilitarias
```

---

## Estructura de las 8 Hojas

| # | Hoja | Función | Editable |
|---|------|---------|----------|
| 1 | CONFIG | Listas maestras para desplegables | Sí |
| 2 | PRESUPUESTO | Plan anual con cálculos automáticos (subtotales, totales, ganancia NT) | Sí (montos) |
| 3 | GASTOS_FIJOS | Montos recurrentes con CUENTA y meses (sin BASE) | Sí |
| 4 | CARGA_FAMILIA | Transacciones variables puras + AHORRO | Sí |
| 5 | CARGA_NT | Transacciones variables + eventos | Sí |
| 6 | MOVIMIENTO | Real vs Presupuesto (automático) | Parcial |
| 7 | TABLERO | KPIs y dashboard (automático) | Parcial* |
| 8 | LIQUIDEZ | Vencimientos y flujo de caja (automático) | No |

> *TABLERO tiene campos editables: SALDO_INICIAL y "Saldo Banco" para cada cuenta

---

## REGLA CRÍTICA: Origen de Datos REAL

| Frecuencia | ¿Dónde se registra? | Origen en MOVIMIENTO |
|------------|---------------------|----------------------|
| **Variable** (puro) | CARGA_FAMILIA / CARGA_NT | `SUMPRODUCT()` desde CARGA |
| **Fijo/Mensual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |
| **Variable/Mensual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |
| **Fijo/Anual** | GASTOS_FIJOS | `INDEX/MATCH` (mes específico) |
| **Variable/Anual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |

> **NOTA**: Se usa SUMPRODUCT en lugar de SUMIFS porque SUMIFS no funciona correctamente con MONTH()/YEAR() como criterios en locale español.

### Ejemplos concretos:
- ✅ **Supermercado** → Variable puro → va a CARGA_FAMILIA
- ✅ **Combustible** → Variable puro → va a CARGA_FAMILIA
- ✅ **ANDE Casa** → Variable/Mensual → va a GASTOS_FIJOS (monto mensual directo)
- ✅ **Alquiler NT** → Fijo/Mensual → va a GASTOS_FIJOS
- ✅ **Antivirus** → Fijo/Anual → va a GASTOS_FIJOS (solo 1 mes con valor)
- ✅ **Ahorro Clara** → AHORRO → va a CARGA_FAMILIA (transferencia a cuenta ahorro)

---

## Estructura de Columnas en GASTOS_FIJOS

| # | Columna | Descripción |
|---|---------|-------------|
| A | CONCEPTO | Nombre del gasto fijo |
| B | ENTIDAD | FAMILIA o NEUROTEA |
| C | CATEGORÍA | Categoría del gasto |
| D | FRECUENCIA | Fijo/Mensual, Variable/Mensual, etc. |
| E | DÍA | Día del mes que vence |
| F | CUENTA | Cuenta desde donde se paga |
| G-R | ENE-DIC | Montos por mes (12 columnas) |

> **DECISIÓN [2026-01-05]**: Se eliminó columna BASE. Ahora cada mes tiene su valor directo. MOVIMIENTO copia el DÍA a columna D para que LIQUIDEZ y TABLERO lean directamente sin INDEX/MATCH.

---

## Tipos de Ingreso (para desplegables)

### FAMILIA (14 tipos)
1. Salario Marco (Itaipu)
2. **Salario Marco NeuroTEA** (NT paga a Marco)
3. Vacaciones Marco
4. Adelanto de Aguinaldo Marco
5. Saldo Aguinaldo Marco
6. Viático Marco
7. Animador Bíblico Marco
8. Tarjeta Gourmed
9. Contrato Colectivo Marco
10. PL Itaipu Marco
11. Honorarios Clara NeuroTEA
12. Préstamo NeuroTEA
13. Préstamo Otros Bancos
14. **Devolución NeuroTEA** (NT devuelve préstamo a Familia)

### NEUROTEA (5 tipos)
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros
4. Devolución Familia → NT
5. **Préstamo Familia** (Familia presta a NT)

---

## Categorías de Egreso

### FAMILIA (6 categorías)
1. GASTOS FIJOS
2. CUOTAS Y PRÉSTAMOS
3. OBLIGACIONES LEGALES
4. SUSCRIPCIONES
5. VARIABLES
6. AHORRO

### NEUROTEA (6 categorías)
1. CLÍNICA
2. SUELDOS Y HONORARIOS
3. TELEFONÍA E INTERNET
4. OBLIGACIONES LEGALES
5. EVENTOS
6. VARIABLES

---

## Subcategorías Variables

### FAMILIA - VARIABLES (11 items)
1. Supermercado
2. Combustible
3. Mantenimiento / Reparaciones Auto Clara
4. Mantenimiento / Reparaciones Auto Niños
5. Mantenimiento / Reparaciones Camioneta Marco
6. Ropa/Vestidos
7. Recreación (Pizza, hamburguesa, helados, etc)
8. Salud y Medicamentos
9. Gastos no identificados
10. **Devolución Familia → NT** (FAM devuelve préstamo a NT)
11. **Préstamo Familia → NT** (FAM presta a NT)

### NEUROTEA - VARIABLES (7 items)
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple
6. **Préstamo NT → Familia** (NT presta a FAM)
7. **Devolución NT → Familia** (NT devuelve préstamo a FAM)

### NEUROTEA - EVENTOS (16 items: 6 definidos + 10 reservas)
1. Día del Autismo (Abril)
2. San Juan (Junio)
3. Día del Niño (Agosto)
4. Clausura Padres (Noviembre)
5. Navidad Papá Noel (Diciembre)
6. Cena Fin de Año (Diciembre)
7-16. Reserva 1 a Reserva 10 (renombrables)

### FAMILIA - AHORRO (3 items)
1. Ahorro Clara
2. Ahorro Marco
3. Fondo de Emergencia

> **DECISIÓN [2026-01-04]**: AHORRO se carga desde CARGA_FAMILIA (no GASTOS_FIJOS) porque es una transferencia que se hace cuando realmente se ahorra.

---

## Cuentas Bancarias

### FAMILIA (10 cuentas)
1. ITAU Marco
2. Coop. Univ. Marco
3. ITAU Clara
4. UENO Clara
5. Tarjeta Solar Clara
6. Tarjeta ITAU Clara
7. **Tarjeta ITAU Marco**
8. Tarjeta Comecipar Clara
9. Gourmed
10. Efectivo

### NEUROTEA (2 cuentas)
1. Atlas NeuroTEA (cuenta bancaria)
2. Caja Chica NT (efectivo en caja)

---

## Metas NeuroTEA

| Parámetro | Valor |
|-----------|-------|
| Meta Ganancia Mínima | **7%** sobre ingresos |
| Meta Máximo Gastos | **93%** de ingresos |
| Distribución Utilidad Dueño | 33.33% |
| Distribución Fondo Emergencia | 33.33% |
| Distribución Fondo Inversión | 33.34% |

**IMPORTANTE**: Los fondos son **VIRTUALES** (asignación contable, no cuentas bancarias separadas).

---

## Flujo de Datos

```
CONFIG (listas maestras)
    │
    ├──► CARGA_FAMILIA ──────┐
    ├──► CARGA_NT ───────────┼──► MOVIMIENTO ──► TABLERO ──► WEB APP
    ├──► GASTOS_FIJOS ───────┘        ▲
    │                                 │
    └──► PRESUPUESTO ─────────────────┘
```

---

## Estructura de Columnas en MOVIMIENTO

| # | Columna | Descripción |
|---|---------|-------------|
| A | CONCEPTO | Nombre del ingreso/egreso |
| B | TIPO | Ingreso / Egreso |
| C | FREC. | Frecuencia del concepto |
| D | DÍA | Día de vencimiento (copiado de GASTOS_FIJOS o 0) |
| E | PRESUPUESTO | Monto planeado (desde PRESUPUESTO) |
| F | REAL | Monto real (desde GASTOS_FIJOS o CARGA) |
| G | DIFERENCIA | REAL - PRESUPUESTO |
| H | % | Porcentaje de ejecución |
| I | ESTADO | ✓ (OK) o ⚠ (Alerta) |
| J | EST. PAGO | Pendiente / Pagado / Cancelado / Ahorrado |
| K | 🚦 | Semáforo visual |
| L | CATEGORÍA (oculta) | Categoría del egreso (GASTOS FIJOS, VARIABLES, etc.) |
| M | ENTIDAD (oculta) | FAMILIA o NEUROTEA |
| N | MES_NUM (oculta) | Número de mes calculado

> **NOTA**: Las columnas L y M son ocultas y se usan para cálculos de % GASTOS POR CATEGORÍA en TABLERO.

---

## Fórmulas Clave en MOVIMIENTO

### Celda N3 (número de mes oculto - MES_NUM)
```
=MATCH(B3;{"Enero";"Febrero";"Marzo";"Abril";"Mayo";"Junio";"Julio";"Agosto";"Septiembre";"Octubre";"Noviembre";"Diciembre"};0)
```

### Columna DÍA (D) - para gastos fijos
```
=IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH("concepto";GASTOS_FIJOS!$A:$A;0));0)
```
> Para variables/ahorro/eventos: valor fijo 0 (no tienen día de vencimiento)

### Columna PRESUPUESTO (E)
```
=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("concepto";PRESUPUESTO!$A:$A;0);$N$3);0)
```

### Columna REAL (F) - para gastos fijos
```
=IFERROR(INDEX(GASTOS_FIJOS!$G:$R;MATCH("concepto";GASTOS_FIJOS!$A:$A;0);$N$3);0)
```
> **NOTA**: G-R = meses ENE-DIC (ya no hay columna BASE)

### Columna REAL (F) - para variables puros
```
=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$D$4:$D$500="concepto")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=$N$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500));0)
```
> **IMPORTANTE**: Se usa SUMPRODUCT en lugar de SUMIFS porque SUMIFS no acepta funciones como MONTH()/YEAR() en criterios.

### Columna DIFERENCIA (G)
```
=F{row}-E{row}
```

### Columna ESTADO (I)
```
=IF(F{row}>=E{row};"✓";"⚠")  // Para Ingresos
=IF(F{row}<=E{row};"✓";"⚠")  // Para Egresos
```

### Columna EST. PAGO (GATILLO de contabilización)

> **DECISIÓN [2026-01-03o]**: EST.PAGO varía según el origen del dato:

| Origen | EST. PAGO | Editable | Valor |
|--------|-----------|----------|-------|
| **INGRESOS** (de CARGA) | Fijo | No | "Recibido" |
| **VARIABLES puros** (de CARGA) | Fijo | No | "Pagado" |
| **EVENTOS** (de CARGA) | Fijo | No | "Pagado" |
| **AHORRO** (de CARGA) | Fijo | No | "Ahorrado" |
| **GASTOS_FIJOS** | Dropdown | Sí | Pendiente/Pagado/Cancelado |

**Razón**: Si cargas un gasto en CARGA, es porque YA lo pagaste. No tiene sentido preguntar si está pendiente. Solo GASTOS_FIJOS (alquiler, salarios, cuotas) necesitan confirmación manual.

> **DECISIÓN [2026-01-04]**: AHORRO tiene estado "Ahorrado" (color verde) porque es una transferencia positiva a cuenta de ahorro.

**Estados para GASTOS_FIJOS:**
- **Pendiente**: Monto suma a "EGRESOS PENDIENTES" (no afecta DISPONIBLE)
- **Pagado**: Monto suma a "EGRESOS PAGADOS" (se descuenta de DISPONIBLE)
- **Cancelado**: Monto no suma a ninguno (anulado)

**Fórmulas en TABLERO:**
```
EGRESOS_PAGADOS = SUMIFS(MOVIMIENTO!F:F;MOVIMIENTO!B:B;"Egreso";MOVIMIENTO!J:J;"Pagado")
EGRESOS_PENDIENTES = SUMIFS(MOVIMIENTO!F:F;MOVIMIENTO!B:B;"Egreso";MOVIMIENTO!J:J;"Pendiente")
DISPONIBLE = SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS
PROYECCIÓN = DISPONIBLE - EGRESOS_PENDIENTES
```
> **NOTA**: Columna F=REAL, J=EST.PAGO (estructura actualizada v4.1)

> **IMPORTANTE**: Todas las fórmulas usan `IFERROR(...,0)` para evitar errores #VALUE! cuando no hay datos.

---

## Hoja LIQUIDEZ (8va hoja)

**Propósito**: Mostrar gastos según vencimiento leyendo DÍA directamente de MOVIMIENTO (sin INDEX/MATCH desde GASTOS_FIJOS).

### Estructura:
| Sección | Descripción | Fórmula clave |
|---------|-------------|---------------|
| 🔴 ATRASADOS | DÍA < DAY(TODAY()) y EST.PAGO = "Pendiente" | `=SUMPRODUCT((MOVIMIENTO!D>0)*(MOVIMIENTO!D<DAY(TODAY()))*(MOVIMIENTO!J="Pendiente")*(MOVIMIENTO!F))` |
| 🟡 ESTA SEMANA | DÍA entre HOY y HOY+7 | `=SUMPRODUCT((MOVIMIENTO!D>0)*(MOVIMIENTO!D>=DAY(TODAY()))*(MOVIMIENTO!D<=DAY(TODAY())+7)*(MOVIMIENTO!J="Pendiente")*(MOVIMIENTO!F))` |
| 🟢 PRÓXIMA SEMANA | DÍA entre HOY+8 y HOY+14 | Similar con rango +8 a +14 |
| 🔵 SEMANA 3 | DÍA entre HOY+15 y HOY+21 | Similar con rango +15 a +21 |

> **NOTA**: Se filtra `(MOVIMIENTO!D>0)` para excluir variables/ahorro que tienen DÍA=0

### Flujo de datos:
```
MOVIMIENTO (columna D=DÍA, J=EST.PAGO, F=REAL)
    │
    └──► LIQUIDEZ/TABLERO (lectura directa, sin INDEX/MATCH)
            │
            ├── ATRASADOS (urgentes)
            ├── ESTA SEMANA (próximos)
            ├── PRÓXIMA SEMANA (planificar)
            └── SEMANA 3 (horizonte)
```

---

## SALDO_INICIAL Independiente por Mes

**Decisión [2026-01-06]**: Cada mes tiene su propio saldo inicial almacenado en CONFIG.

### Ubicación de los saldos iniciales:
```
CONFIG → Sección "SALDOS INICIALES POR MES" (filas 46-59)
| MES       | FAMILIA    | NEUROTEA   |
|-----------|------------|------------|
| Enero     | [editable] | [editable] |
| Febrero   | [editable] | [editable] |
| ...       | ...        | ...        |
| Diciembre | [editable] | [editable] |
```

### Fórmulas en TABLERO:
```
SALDO_INICIAL_FAM = INDEX(CONFIG!$B$48:$B$59;MATCH(MOVIMIENTO!$B$3;CONFIG!$A$48:$A$59;0))
SALDO_INICIAL_NT = INDEX(CONFIG!$C$48:$C$59;MATCH(MOVIMIENTO!$B$3;CONFIG!$A$48:$A$59;0))
DISPONIBLE = SALDO_INICIAL + INGRESOS_MES - EGRESOS_PAGADOS
```

### Flujo de cierre de mes:
1. Ver saldo final del mes actual en TABLERO (DISPONIBLE - PENDIENTES)
2. Ir a CONFIG → "SALDOS INICIALES POR MES"
3. Ingresar el saldo final como SALDO_INICIAL del mes siguiente
4. Al cambiar el mes en MOVIMIENTO, TABLERO mostrará automáticamente el saldo correcto

> **NOTA**: Cada mes queda "congelado" con su histórico independiente.

---

## Locale Español (Paraguay)

El sistema usa formato español/europeo para números:

| Elemento | Formato Correcto | Formato Incorrecto |
|----------|-----------------|-------------------|
| Separador decimal | `,` (coma) | `.` (punto) |
| Separador argumentos | `;` (punto y coma) | `,` (coma) |
| 7% | `0,07` | `0.07` |
| 33.33% | `0,3333` | `0.3333` |

### Ejemplo de fórmula en locale español:
```
=IF(A1>=0,07;"META CUMPLIDA";"META NO CUMPLIDA")
=IFERROR(B1*0,3333;0)
```

---

## Sistema Anti-Burro (Validaciones en Cascada)

1. **Si TIPO es Ingreso** → CATEGORÍA y SUBCATEGORÍA deshabilitadas
2. **Si CATEGORÍA ≠ VARIABLES ni EVENTOS ni AHORRO** → SUBCATEGORÍA deshabilitada
3. **Si CATEGORÍA = EVENTOS** → Muestra lista de 16 eventos
4. **Si CATEGORÍA = VARIABLES** → Muestra subcategorías variables
5. **Si CATEGORÍA = AHORRO** → Muestra subcategorías ahorro (Ahorro Clara, Ahorro Marco, Fondo de Emergencia)

---

## Balance Cruzado NT ↔ FAMILIA (Bidireccional v6.3)

### FLUJO 1: NT → FAMILIA (NT presta a Familia)

**Cuando NT presta a Familia:**
- CARGA_NT: Egreso NT → VARIABLES → "Préstamo NT → Familia"
- CARGA_FAMILIA: Ingreso → "Préstamo NeuroTEA"

**Cuando Familia devuelve a NT:**
- CARGA_FAMILIA: Egreso → VARIABLES → "Devolución Familia → NT"
- CARGA_NT: Ingreso → "Devolución Familia → NT"

**Deuda FAM → NT** = Préstamos NT→FAM - Devoluciones FAM→NT

### FLUJO 2: FAM → NT (Familia presta a NT)

**Cuando Familia presta a NT:**
- CARGA_FAMILIA: Egreso → VARIABLES → "Préstamo Familia → NT"
- CARGA_NT: Ingreso → "Préstamo Familia"

**Cuando NT devuelve a Familia:**
- CARGA_NT: Egreso → VARIABLES → "Devolución NT → Familia"
- CARGA_FAMILIA: Ingreso → "Devolución NeuroTEA"

**Deuda NT → FAM** = Préstamos FAM→NT - Devoluciones NT→FAM

### Balance Neto

**Balance Neto** = Deuda FAM→NT - Deuda NT→FAM
- Si > 0: FAMILIA debe a NT 🔴 (NT ha prestado más)
- Si = 0: Equilibrado 🟢
- Si < 0: NT debe a FAMILIA 🟡 (FAM ha prestado más)

### Validación Anti-Burro de Préstamos (v6.7)

**Decisión [2026-01-15]**: No se puede prestar a quien ya te debe. Primero debe devolver.

| Entidad | Si DEBE a la otra | Si NO DEBE a la otra |
|---------|-------------------|----------------------|
| **FAMILIA** | ❌ Bloqueado "Préstamo Familia → NT" | ✅ Puede prestar, ❌ No puede devolver |
| **NEUROTEA** | ❌ Bloqueado "Préstamo NT → Familia" | ✅ Puede prestar, ❌ No puede devolver |

**Implementación técnica (Code.gs v6.7):**
- `calcularDeudaFamiliaANT()` → Calcula deuda de Familia hacia NT
- `calcularDeudaNTAFamilia()` → Calcula deuda de NT hacia Familia
- `validarPrestamoDevolucionFamilia()` → Bloquea en CARGA_FAMILIA
- `validarPrestamoDevolucionNT()` → Bloquea en CARGA_NT

**Mensajes de bloqueo:**
- "FAMILIA debe Gs. X a NT. Primero usa 'Devolución Familia → NT'"
- "FAMILIA no debe nada a NT. No hay nada que devolver."
- "NT debe Gs. X a FAMILIA. Primero usa 'Devolución NT → Familia'"
- "NT no debe nada a FAMILIA. No hay nada que devolver."

---

## Colores del Sistema (Estilo Sobrio v6.1)

> **NOTA**: Headers usan gris neutro. Colores SOLO para indicadores de estado.

| Uso | Código Hex | Nota |
|-----|------------|------|
| Headers (FAM/NT) | #1f2937 | Gris oscuro sobrio |
| Fondo principal | #f9fafb | Gris muy claro |
| Fondo alternado | #ffffff | Blanco |
| Subtotales | #e5e7eb | Gris claro |
| Bordes | #d1d5db | Gris borde |
| OK/Ahorro | #22c55e | Verde (estado) |
| Alerta/Déficit | #dc2626 | Rojo (estado) |
| Advertencia | #f59e0b | Amarillo (estado) |
| Ingreso | #3b82f6 | Azul (indicador) |
| Egreso | #ef4444 | Rojo (indicador) |
| Ganancia | #22c55e | Verde (indicador) |

---

## Comandos del Menú

- **Inicializar Sistema COMPLETO**: Crea las 8 hojas
- **Reinicializar Sistema**: Borra y recrea todo
- **Abrir Dashboard Web**: Muestra HTML popup
- **Crear Hojas**: Submenú para crear hojas individuales (incluye LIQUIDEZ)
- **Utilidades**: Actualizar validaciones, recalcular

---

## Desarrollo - Guía Rápida

### Para modificar fórmulas:
1. Editar `gs/Sheets.gs` → función `crearHojaMOVIMIENTO()`
2. Editar `gs/Tablero.gs` → función `crearHojaTABLERO()`

### Para modificar listas/datos:
1. Editar `gs/Config.gs` → arrays de datos maestros
2. Ejecutar "Reinicializar Sistema"

### Para agregar conceptos nuevos:
1. Agregar a `Config.gs`
2. Agregar a `PRESUPUESTO` section en `Sheets.gs`
3. Agregar a `GASTOS_FIJOS` si tiene frecuencia fija

---

## Hoja PRESUPUESTO - Cálculos Automáticos

> **DECISIÓN [2026-01-04]**: PRESUPUESTO ahora tiene fórmulas calculadas según PLAN_MAESTRO §4.

### Estructura FAMILIA:
```
▶ INGRESOS FAMILIA
   Subtotal INGRESOS FAMILIA          ← SUM() automático
📥 TOTAL INGRESOS FAMILIA             ← Fórmula

▶ GASTOS FIJOS / CUOTAS / etc.
   Subtotal por sección               ← SUM() automático
📤 TOTAL EGRESOS FAMILIA              ← Suma de subtotales
💰 BALANCE FAMILIA (Ing - Egr)        ← Fórmula
```

### Estructura NEUROTEA:
```
📥 TOTAL INGRESOS NEUROTEA
📤 TOTAL EGRESOS NEUROTEA

▶ GANANCIA NEUROTEA (META X%)         ← X desde METAS_NT.GANANCIA_MINIMA_PCT
   Ganancia Calculada                 ← = Ingresos - Egresos
   % Ganancia                         ← = Ganancia / Ingresos (formato %)
   Estado Meta                        ← Semáforo:
                                         🔴 PÉRDIDA (< 0%)
                                         🟡 <7% (0-7%)
                                         🟢 META (≥ 7%)
   → Utilidad al propietario          ← = Ganancia × 33.33%
   → Fondo de emergencia              ← = Ganancia × 33.33%
   → Fondo de Inversión               ← = Ganancia × 33.34%

💰 BALANCE NEUROTEA
🔄 BALANCE TOTAL CONSOLIDADO FAM/NT   ← = Balance FAM + Balance NT
```

---

## Notas Críticas

1. **PRESUPUESTO tiene cálculos automáticos** - Subtotales, totales, ganancia NT y semáforo
2. **GASTOS_FIJOS sin BASE** - Cada mes tiene su valor directo (columnas G-R = ENE-DIC)
3. **MOVIMIENTO tiene columna DÍA** - Columna D copia el día de vencimiento para acceso directo
4. **SALDO_INICIAL independiente por mes** - Cada mes tiene su saldo en CONFIG (filas 48-59)
5. **TABLERO usa "Saldo Banco"** - Columna editable para verificar saldo real en banco
6. **Variables PUROS van a CARGA** - Solo Supermercado, Combustible, etc.
7. **AHORRO va a CARGA** - Se registra cuando realmente se hace la transferencia
8. **EST. PAGO es el GATILLO** - Controla si un gasto cuenta como PAGADO o PENDIENTE
9. **LIQUIDEZ lee de MOVIMIENTO** - Sin INDEX/MATCH, fórmulas simplificadas con DÍA en columna D
10. **MOVIMIENTO tiene CATEGORÍA y ENTIDAD** - Columnas L y M (ocultas) para cálculos de % GASTOS POR CATEGORÍA
11. **% GASTOS POR CATEGORÍA lee de MOVIMIENTO** - Filtra por EST.PAGO="Pagado" para mostrar solo gastos ejecutados

---

## Colores de DIFERENCIA (contexto-sensitivo)

**Decisión [2026-01-03n]**: Los colores dependen del tipo de concepto:

| Tipo | Diferencia Positiva | Diferencia Negativa |
|------|---------------------|---------------------|
| **INGRESO** | 🟢 VERDE (recibiste más) | 🔴 ROJO (recibiste menos) |
| **EGRESO** | 🔴 ROJO (gastaste más) | 🟢 VERDE (gastaste menos) |

---

## AHORRO vs GASTOS (Tratamiento Conceptual)

**Decisión [2026-01-13]**: AHORRO es transferencia, NO gasto.

| Concepto | Descripción | Cómo afecta |
|----------|-------------|-------------|
| **GASTOS OPERATIVOS** | Gastos reales (EST.PAGO = "Pagado") | Reduce DISPONIBLE |
| **AHORRO** | Transferencia a cuenta de ahorro (EST.PAGO = "Ahorrado") | Reduce DISPONIBLE pero NO es gasto |
| **DISPONIBLE** | INGRESOS - GASTOS - AHORRO | Dinero para más gastos/ahorro |
| **PATRIMONIO FAMILIA** | INGRESOS - GASTOS (sin restar ahorro) | Total de activos de FAMILIA |

### Visualización en TABLERO

```
📥 INGRESOS DEL MES     📤 GASTOS OPERATIVOS
    20.000.000               6.200.000

💰 AHORRO               🛡️ FONDO EMERGENCIA
    5.000.000                   0

💰 DISPONIBLE: Gs. 8.800.000 sin asignar
🏦 PATRIMONIO FAMILIA: Gs. 13.800.000 (incl. ahorros)
```

> **NOTA**: PATRIMONIO = INGRESOS - GASTOS (incluye ahorros como activos de FAMILIA)

---

## Rangos de Filas en MOVIMIENTO

**IMPORTANTE**: Las fórmulas en TABLERO deben usar los rangos correctos.

| Entidad | Rango de Filas | Uso |
|---------|----------------|-----|
| **FAMILIA** | 9-113 | Todas las fórmulas de FAMILIA |
| **NEUROTEA** | 119-200 | Todas las fórmulas de NEUROTEA |

> **BUG CORREGIDO [2026-01-13]**: Las fórmulas de NEUROTEA usaban 73-150, lo cual incluía SUSCRIPCIONES de FAMILIA. Corregido a 119-200.

---

## Checklist Antes de Modificar Código

- [ ] ¿Leí este CLAUDE.md completo?
- [ ] ¿El cambio es consistente con PLAN_MAESTRO?
- [ ] ¿Las fórmulas usan las referencias correctas?
- [ ] ¿Los colores siguen el esquema definido?
- [ ] ¿Las listas están completas (tipos, categorías, cuentas)?
- [ ] ¿Ejecuté /verificar después del cambio?
- [ ] ¿Las decisiones en DECISIONES.md están respetadas?
- [ ] ¿Los rangos de filas son correctos? (FAMILIA: 9-113, NEUROTEA: 119-200)

---

---

## Bug Fixes Testing [2026-01-14]

### GASTOS OPERATIVOS FAMILIA (rango corregido)
- **Problema**: Rango F9:F70 excluía SUSCRIPCIONES y VARIABLES
- **Solución**: Rango expandido a F9:F113
- **Además**: Se incluye EST.PAGO="Ahorrado" junto con "Pagado"

### GANANCIA REAL NEUROTEA (fórmula corregida)
- **Problema**: Restaba egresos pendientes (incorrecto)
- **Solución**: GANANCIA REAL = Ingresos - Pagados (sin pendientes)
- **Nota**: PROYECCIÓN FIN DE MES sí resta pendientes

### Formato números locale Paraguay (puntos como separador de miles)
- **Problema**: Mostraba "Gs. 1000000" sin separadores
- **Solución**: `SUBSTITUTE(TEXT(ROUND(valor;0);"#,##0");",";".")`
- **Resultado**: "Gs. 1.000.000" con puntos como separadores de miles
- **Archivos**:
  - Tablero.gs (líneas 394, 408, 706, 720, 1514)
  - Sheets.gs (líneas 1668, 1679 - Sobrante/Faltante y Monto atrasado)

---

*Última actualización: 2026-01-15*
*Versión: 6.7 - Validación Anti-Burro para préstamos/devoluciones entre NT y FAMILIA*
