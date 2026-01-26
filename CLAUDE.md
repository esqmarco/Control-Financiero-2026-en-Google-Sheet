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
| 5 | CARGA_NT | Transacciones variables puras (v7.7: EVENTOS va en GASTOS_FIJOS) | Sí |
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

### FAMILIA (5 categorías - AHORRO es TIPO separado)
1. GASTOS FIJOS
2. CUOTAS Y PRÉSTAMOS
3. OBLIGACIONES LEGALES
4. SUSCRIPCIONES
5. VARIABLES

> **DECISIÓN [2026-01-15]**: AHORRO ya no es categoría de egreso. Es un TIPO separado en CARGA_FAMILIA.

### NEUROTEA (6 categorías)
1. CLÍNICA
2. SUELDOS Y HONORARIOS
3. TELEFONÍA E INTERNET
4. OBLIGACIONES LEGALES
5. EVENTOS
6. VARIABLES

---

## Subcategorías Variables

### FAMILIA - VARIABLES (19 items - v7.25)
1. Supermercado
2. Combustible
3. **Alimentación** (v7.7)
4. **Gastos Varios** (v7.7)
5. Mantenimiento / Reparaciones Auto Clara
6. Mantenimiento / Reparaciones Auto Niños
7. Mantenimiento / Reparaciones Camioneta Marco
8. Ropa/Vestidos
9. Recreación (Pizza, hamburguesa, helados, etc)
10. Salud y Medicamentos
11. Gastos no identificados
12. **Devolución Familia → NT** (FAM devuelve préstamo a NT)
13. **Préstamo Familia → NT** (FAM presta a NT)
14. **Gastos del Colegio** (v7.22)
15-19. Reserva Var. 1 a Reserva Var. 5 (renombrables desde CONFIG)

### NEUROTEA - VARIABLES (15 items - v7.25)
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple
6. **Horas Extras Aracely** (v7.7)
7. **Horas Extras Fatima** (v7.7)
8. **Préstamo NT → Familia** (NT presta a FAM)
9. **Devolución NT → Familia** (NT devuelve préstamo a FAM)
10. **Muebles y equipos** (v7.22)
11-15. Reserva Var. 1 a Reserva Var. 5 (renombrables desde CONFIG)

### NEUROTEA - EVENTOS (18 items: 6 definidos + 12 reservas) - v7.7
> **DECISIÓN [2026-01-20]**: EVENTOS ahora se registra en GASTOS_FIJOS (no en CARGA_NT).
> Son gastos PLANIFICADOS, no variables puros.

1. Día del Autismo (Abril)
2. San Juan (Junio)
3. Día del Niño (Agosto)
4. Clausura Padres (Noviembre)
5. Navidad Papá Noel (Diciembre)
6. Cena Fin de Año (Diciembre)
7-18. Reserva Evento 1 a Reserva Evento 12 (renombrables)

### TIPO AHORRO (FAMILIA) - 3 categorías
> **DECISIÓN [2026-01-15]**: AHORRO es un TIPO separado (no Egreso). Sus opciones van en CATEGORÍA, no SUBCATEGORÍA.

| TIPO | CATEGORÍA | SUBCATEGORÍA |
|------|-----------|--------------|
| Ahorro | Ahorro Clara | - (bloqueada) |
| Ahorro | Ahorro Marco | - (bloqueada) |
| Ahorro | Fondo de Emergencia | - (bloqueada) |

> AHORRO no es egreso. Se separa en TABLERO para mostrar:
> - INGRESOS = EGRESOS PAGADOS + AHORRO + FONDO EMERGENCIA + DISPONIBLE

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
2. UENO Marco (cuenta compartida para gastos NT en efectivo)

---

## Metas NeuroTEA (Configurables v7.6)

| Parámetro | Valor Default | Ubicación CONFIG |
|-----------|---------------|------------------|
| Meta Ganancia Mínima | **7%** sobre ingresos | CONFIG!$B$40 |
| Meta Máximo Gastos | **93%** de ingresos | CONFIG!$B$41 |
| Distribución Utilidad Dueño | 33.33% | CONFIG!$B$42 |
| Distribución Fondo Emergencia | 33.33% | CONFIG!$B$43 |
| Distribución Fondo Inversión | 33.34% | CONFIG!$B$44 |

> **v7.6**: Todas las METAS son editables desde CONFIG (sección "🎯 METAS NEUROTEA").
> Las fórmulas en PRESUPUESTO, MOVIMIENTO y TABLERO leen estos valores con referencias
> como `CONFIG!$B$40/100` en lugar de valores hardcodeados.

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
| N | CUENTA (oculta) | Cuenta bancaria del gasto fijo (v7.8) |

> **NOTA**: Las columnas L, M y N son ocultas y se usan para cálculos internos.
> - L y M: % GASTOS POR CATEGORÍA en TABLERO
> - N: Cálculo de "Esperado" por cuenta en TABLERO (v7.8 - corrige bug crítico)
> - Celda N3: Contiene la fórmula MES_NUM (número de mes seleccionado)

---

## Fórmulas Clave en MOVIMIENTO

### Celda N3 (número de mes - MES_NUM)
> **NOTA v7.8**: N3 contiene MES_NUM. La columna N ahora tiene CUENTA en las filas de datos.
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

### Ubicación de los saldos iniciales GLOBALES (v7.5 - ahora son FÓRMULAS):
```
CONFIG → Sección "SALDOS INICIALES POR MES" (filas 46-59)
| MES       | FAMILIA           | NEUROTEA          |
|-----------|-------------------|-------------------|
| Enero     | =SUM(B65:B74)     | =SUM(B79:B80)     |  ← Fórmula automática
| Febrero   | =SUM(C65:C74)     | =SUM(C79:C80)     |
| ...       | ...               | ...               |
| Diciembre | =SUM(M65:M74)     | =SUM(M79:M80)     |
```

> **v7.5**: Los saldos globales ya NO son editables. Se calculan automáticamente
> sumando los saldos por cuenta. Solo se editan los saldos individuales por cuenta.

### Fórmulas en TABLERO (saldo global - obsoleto):
```
// NOTA: DISPONIBLE ya no usa estas fórmulas directamente
// DISPONIBLE = SUM(Esperado por cuenta) - ver sección "DISPONIBLE = SUM(Esperado)"
```

---

## SALDO_INICIAL Por Cuenta (v7.4)

**Decisión [2026-01-19]**: Cada cuenta tiene su propio saldo inicial por mes.

### Ubicación en CONFIG:
```
CONFIG → "SALDOS INICIALES POR CUENTA - FAMILIA" (filas 63-75)
| CUENTA              | ENE | FEB | MAR | ... | DIC |
|---------------------|-----|-----|-----|-----|-----|
| ITAU Marco          |  0  |  0  |  0  | ... |  0  |
| Coop. Univ. Marco   |  0  |  0  |  0  | ... |  0  |
| ITAU Clara          |  0  |  0  |  0  | ... |  0  |
| UENO Clara          |  0  |  0  |  0  | ... |  0  |
| Tarjeta Solar Clara |  0  |  0  |  0  | ... |  0  |
| Tarjeta ITAU Clara  |  0  |  0  |  0  | ... |  0  |
| Tarjeta ITAU Marco  |  0  |  0  |  0  | ... |  0  |
| Tarjeta Comecipar   |  0  |  0  |  0  | ... |  0  |
| Gourmed             |  0  |  0  |  0  | ... |  0  |
| Efectivo            |  0  |  0  |  0  | ... |  0  |

CONFIG → "SALDOS INICIALES POR CUENTA - NEUROTEA" (filas 77-81)
| CUENTA              | ENE | FEB | MAR | ... | DIC |
|---------------------|-----|-----|-----|-----|-----|
| Atlas NeuroTEA      |  0  |  0  |  0  | ... |  0  |
| UENO Marco          |  0  |  0  |  0  | ... |  0  |
```

### Fórmula "Esperado" en TABLERO (por cuenta):
```
// v7.5: AHORRO ahora RESTA (antes sumaba incorrectamente)
ESPERADO_CUENTA = Saldo Inicial Cuenta (CONFIG)
                + Ingresos a esa cuenta
                - Egresos de esa cuenta
                - AHORRO de esa cuenta  ← FIX v7.5
                - Gastos fijos PAGADOS de esa cuenta

// FAMILIA (filas 65-74):
=INDEX(CONFIG!$B$65:$M$74;MATCH("cuenta";CONFIG!$A$65:$A$74;0);MES)
  + SUMPRODUCT(CARGA donde CUENTA=cuenta Y TIPO<>"Egreso" Y TIPO<>"Ahorro")
  - SUMPRODUCT(CARGA donde CUENTA=cuenta Y TIPO="Egreso Familiar")
  - SUMPRODUCT(CARGA donde CUENTA=cuenta Y TIPO="Ahorro")
  - SUMPRODUCT(GASTOS_FIJOS donde CUENTA=cuenta Y EST.PAGO="Pagado")

// NEUROTEA (filas 79-80):
=INDEX(CONFIG!$B$79:$M$80;MATCH("cuenta";CONFIG!$A$79:$A$80;0);MES)
  + Ingresos a esa cuenta - Egresos de esa cuenta
```

### DISPONIBLE = SUM(Esperado) (v7.5)
```
// DISPONIBLE ya no se calcula independientemente
// Ahora es simplemente la suma de todos los Esperados por cuenta
// Esto garantiza coherencia total entre cuentas individuales y total

DISPONIBLE FAMILIA = SUM(Esperado de las 10 cuentas FAMILIA)
DISPONIBLE NEUROTEA = SUM(Esperado de las 2 cuentas NEUROTEA)
```

### Flujo de cierre de mes (por cuenta):
1. Ver saldo final de cada cuenta en TABLERO ("Esperado")
2. Ir a CONFIG → "SALDOS INICIALES POR CUENTA"
3. Ingresar cada saldo final como saldo inicial del mes siguiente
4. Las transferencias entre cuentas NO afectan el total global

### Ejemplo de transferencia entre cuentas:
```
Situación: Transferir 500.000 de ITAU Marco → ITAU Clara

1. Registrar en CARGA_FAMILIA:
   - Egreso desde ITAU Marco: "Transferencia a ITAU Clara" = 500.000
   - Ingreso a ITAU Clara: "Transferencia desde ITAU Marco" = 500.000

2. Efecto en TABLERO:
   - ITAU Marco: Esperado baja 500.000
   - ITAU Clara: Esperado sube 500.000
   - TOTAL DISPONIBLE: Sin cambio (suma cero)
```

> **NOTA**: El saldo inicial por cuenta permite arrastrar el histórico individualmente.

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
2. **Si TIPO es Ahorro** → CATEGORÍA habilita opciones ahorro, SUBCATEGORÍA bloqueada
3. **Si TIPO es Egreso Familiar** → CATEGORÍA habilita categorías de egreso
4. **Si CATEGORÍA ≠ VARIABLES ni EVENTOS** → SUBCATEGORÍA deshabilitada
5. **Si CATEGORÍA = EVENTOS** → Muestra lista de 16 eventos
6. **Si CATEGORÍA = VARIABLES** → Muestra subcategorías variables

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

### Auto-Creación de Transacciones Cruzadas (v7.0)

> **DECISIÓN [2026-01-19]**: Las transacciones de préstamos/devoluciones entre entidades se crean automáticamente en ambas hojas.

**Funcionamiento:**
1. Cargas la transacción en UNA sola hoja (CARGA_FAMILIA o CARGA_NT)
2. Al ingresar el MONTO, el sistema auto-crea la contraparte en la otra hoja
3. Aparece un Toast de confirmación: "✓ Creado en CARGA_XX por Gs. X.XXX.XXX"

**Casos desde CARGA_FAMILIA:**

| Tú cargas | Se auto-crea en CARGA_NT |
|-----------|--------------------------|
| TIPO="Préstamo NeuroTEA" (ingreso) | Egreso NT → VARIABLES → "Préstamo NT → Familia" |
| SUBCAT="Préstamo Familia → NT" (egreso) | TIPO="Préstamo Familia" (ingreso) |
| SUBCAT="Devolución Familia → NT" (egreso) | TIPO="Devolución Familia → NT" (ingreso) |

**Casos desde CARGA_NT:**

| Tú cargas | Se auto-crea en CARGA_FAMILIA |
|-----------|-------------------------------|
| TIPO="Préstamo Familia" (ingreso) | Egreso Familiar → VARIABLES → "Préstamo Familia → NT" |
| TIPO="Devolución Familia → NT" (ingreso) | Egreso Familiar → VARIABLES → "Devolución Familia → NT" |
| SUBCAT="Préstamo NT → Familia" (egreso) | TIPO="Préstamo NeuroTEA" (ingreso) |
| SUBCAT="Devolución NT → Familia" (egreso) | TIPO="Devolución NeuroTEA" (ingreso) |

**Notas importantes:**
- La cuenta destino se asigna automáticamente (ITAU Marco para FAM, Atlas NeuroTEA para NT)
- Las transacciones auto-generadas tienen NOTAS="Auto-generado desde CARGA_XX"
- El sistema usa una bandera anti-loop para evitar creaciones infinitas

### Validación Anti-Burro Completa (v6.8)

**Decisión [2026-01-15]**: Sistema completo de validaciones para evitar incoherencias en la carga.

#### 1. TIPO Ingreso → Bloquea CATEGORÍA y SUBCATEGORÍA
Si el TIPO es un ingreso (Salario, Préstamo recibido, Devolución recibida), las columnas CATEGORÍA y SUBCATEGORÍA se bloquean automáticamente con "-".

#### 2. Contradicciones TIPO vs SUBCATEGORÍA
| Contradicción | Explicación |
|---------------|-------------|
| TIPO="Devolución NeuroTEA" + SUBCAT="Devolución Familia → NT" | Son operaciones OPUESTAS |
| TIPO="Préstamo NeuroTEA" + SUBCAT="Préstamo Familia → NT" | Son operaciones OPUESTAS |

#### 3. AHORRO con subcategoría correcta
Si CATEGORÍA="AHORRO", la SUBCATEGORÍA debe ser: Ahorro Clara, Ahorro Marco, o Fondo de Emergencia.

#### 4. VARIABLES con subcategoría correcta
Si CATEGORÍA="VARIABLES", la SUBCATEGORÍA debe pertenecer a la lista VARIABLES_FAMILIA o VARIABLES_NT.

#### 5. Balance cruzado préstamos/devoluciones
No se puede prestar a quien ya te debe. Primero debe devolver.

| Entidad | Si DEBE a la otra | Si NO DEBE a la otra |
|---------|-------------------|----------------------|
| **FAMILIA** | ❌ Bloqueado "Préstamo Familia → NT" | ✅ Puede prestar, ❌ No puede devolver |
| **NEUROTEA** | ❌ Bloqueado "Préstamo NT → Familia" | ✅ Puede prestar, ❌ No puede devolver |

**Implementación técnica (Code.gs v6.8):**
- `validarContradiccionTipoSubcategoriaFamilia()` → Detecta contradicciones en CARGA_FAMILIA
- `validarContradiccionTipoSubcategoriaNT()` → Detecta contradicciones en CARGA_NT
- `calcularDeudaFamiliaANT()` / `calcularDeudaNTAFamilia()` → Calculan deudas cruzadas
- `validarPrestamoDevolucionFamilia()` / `validarPrestamoDevolucionNT()` → Bloquean según balance

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
5. **SALDO_INICIAL por cuenta (v7.4)** - Cada cuenta tiene saldo inicial por mes en CONFIG (FAMILIA: 65-74, NT: 79-80)
6. **TABLERO usa "Saldo Banco"** - Columna editable para verificar saldo real en banco
7. **Variables PUROS van a CARGA** - Solo Supermercado, Combustible, etc.
8. **AHORRO va a CARGA** - Se registra cuando realmente se hace la transferencia
9. **EST. PAGO es el GATILLO** - Controla si un gasto cuenta como PAGADO o PENDIENTE
10. **LIQUIDEZ lee de MOVIMIENTO** - Sin INDEX/MATCH, fórmulas simplificadas con DÍA en columna D
11. **MOVIMIENTO tiene CATEGORÍA y ENTIDAD** - Columnas L y M (ocultas) para cálculos de % GASTOS POR CATEGORÍA
12. **% GASTOS POR CATEGORÍA lee de MOVIMIENTO** - Filtra por EST.PAGO="Pagado" para mostrar solo gastos ejecutados

---

## Colores de DIFERENCIA (contexto-sensitivo)

**Decisión [2026-01-03n]**: Los colores dependen del tipo de concepto:

| Tipo | Diferencia Positiva | Diferencia Negativa |
|------|---------------------|---------------------|
| **INGRESO** | 🟢 VERDE (recibiste más) | 🔴 ROJO (recibiste menos) |
| **EGRESO** | 🔴 ROJO (gastaste más) | 🟢 VERDE (gastaste menos) |

---

## AHORRO vs EGRESOS (Tratamiento Conceptual)

**Decisión [2026-01-13]**: AHORRO es transferencia, NO egreso.

| Concepto | Descripción | Cómo afecta |
|----------|-------------|-------------|
| **EGRESOS PAGADOS** | Egresos reales ya pagados (EST.PAGO = "Pagado") | Reduce DISPONIBLE |
| **EGRESOS PENDIENTES** | Egresos aún no pagados (EST.PAGO = "Pendiente") | Reduce PROYECCIÓN |
| **AHORRO** | Transferencia a cuenta de ahorro (EST.PAGO = "Ahorrado") | Reduce DISPONIBLE pero NO es egreso |
| **DISPONIBLE** | INGRESOS - EGRESOS PAGADOS - AHORRO | Dinero para más egresos/ahorro |
| **PATRIMONIO FAMILIA** | INGRESOS - EGRESOS (sin restar ahorro) | Total de activos de FAMILIA |

### Visualización en TABLERO

```
📥 INGRESOS DEL MES     📤 EGRESOS PAGADOS
    20.000.000               6.200.000

💰 AHORRO               🛡️ FONDO EMERGENCIA
    5.000.000                   0

💰 DISPONIBLE: Gs. 8.800.000 sin asignar
🏦 PATRIMONIO FAMILIA: Gs. 13.800.000 (incl. ahorros)
```

> **NOTA**: PATRIMONIO = INGRESOS - EGRESOS (incluye ahorros como activos de FAMILIA)

---

## Rangos de Filas en MOVIMIENTO

**IMPORTANTE**: Las fórmulas en TABLERO deben usar los rangos correctos.

| Entidad | Rango de Filas | Uso |
|---------|----------------|-----|
| **FAMILIA** | 9-116 | Todas las fórmulas de FAMILIA |
| **NEUROTEA** | 122-206 | Todas las fórmulas de NEUROTEA |

> **BUG CORREGIDO [2026-01-13]**: Las fórmulas de NEUROTEA usaban 73-150, lo cual incluía SUSCRIPCIONES de FAMILIA. Corregido a 122-206 (v7.25).

---

## Checklist Antes de Modificar Código

- [ ] ¿Leí este CLAUDE.md completo?
- [ ] ¿El cambio es consistente con PLAN_MAESTRO?
- [ ] ¿Las fórmulas usan las referencias correctas?
- [ ] ¿Los colores siguen el esquema definido?
- [ ] ¿Las listas están completas (tipos, categorías, cuentas)?
- [ ] ¿Ejecuté /verificar después del cambio?
- [ ] ¿Las decisiones en DECISIONES.md están respetadas?
- [ ] ¿Los rangos de filas son correctos? (FAMILIA: 9-116, NEUROTEA: 122-206)

---

---

## Bug Fixes Testing [2026-01-14]

### EGRESOS PAGADOS FAMILIA (rango corregido)
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

## Bug Fixes [2026-01-19] - v7.1

### INGRESOS vuelven a cero después de préstamo (BUG CRÍTICO)
- **Problema**: Al cargar un préstamo, la auto-creación copiaba la fecha sin formato, causando que `MONTH()` fallara y SUMPRODUCT devolviera 0
- **Solución**: Nueva función `aplicarFormatoFecha()` que aplica 'dd/mm/yyyy' después de `setValues()`
- **Archivos**: Code.gs (líneas 878-885, y en cada caso de auto-creación)

### Duplicación de transacciones cruzadas
- **Problema**: Cada vez que se editaba el MONTO (no solo al crear), se generaba una nueva transacción cruzada duplicada
- **Solución**: Nueva función `existeTransaccionCruzada()` que verifica por fecha+tipo+monto antes de crear
- **Archivos**: Code.gs (líneas 837-876)

### Fallo silencioso sin fecha
- **Problema**: Si el usuario ingresaba MONTO sin FECHA, la auto-creación fallaba sin mostrar error
- **Solución**: Alerta toast "⚠️ Falta la FECHA. La transacción cruzada NO se creó."
- **Archivos**: Code.gs (líneas 909-913, 1038-1042)

### Rangos incorrectos en LIQUIDEZ
- **Problema**: LIQUIDEZ_FAMILIA usaba 9-70 y LIQUIDEZ_NT usaba 73-150
- **Solución**: Corregido a FAMILIA: 9-116, NEUROTEA: 122-206 (v7.25)
- **Archivos**: Sheets.gs (líneas 1544-1545, 1553-1555)

### Nomenclatura unificada: EGRESOS PAGADOS
- **Problema**: FAMILIA mostraba "GASTOS OPERATIVOS" y NEUROTEA mostraba "GASTOS PAGADOS"
- **Solución**: Unificado a "EGRESOS PAGADOS" en ambas entidades
- **Diferenciación**: "EGRESOS PAGADOS" vs "EGRESOS PENDIENTES" (estados claros)
- **Archivos**: Tablero.gs, Sheets.gs, WebApp.gs

### Caso faltante: Devolución NeuroTEA no auto-creaba egreso en NT
- **Problema**: Si FAM registraba TIPO="Devolución NeuroTEA" (ingreso), no se auto-creaba el egreso correspondiente en CARGA_NT
- **Solución**: Agregado CASO 4 en `autoCrearTransaccionCruzadaFamilia()` para crear "Devolución NT → Familia" en NT
- **Archivos**: Code.gs (líneas 1005-1028)

---

## Bug Fixes [2026-01-19] - v7.5

### AHORRO sumaba en vez de restar en Esperado (BUG CRÍTICO)
- **Problema**: La fórmula Esperado usaba `TIPO<>"Egreso Familiar"`, lo que incluía AHORRO como ingreso
- **Impacto**: El saldo de cuenta se inflaba incorrectamente cuando se registraba ahorro
- **Solución**: Añadir condición `*(TIPO<>"Ahorro")` y restar AHORRO explícitamente
- **Archivos**: Tablero.gs (fórmula Esperado FAMILIA)

### DISPONIBLE calculado independientemente de cuentas
- **Problema**: DISPONIBLE usaba su propia fórmula (SALDO_INICIAL + INGRESOS - EGRESOS) separada de las cuentas
- **Impacto**: Podía haber inconsistencia entre suma de cuentas y DISPONIBLE
- **Solución**: DISPONIBLE ahora es simplemente `=SUM(Esperado de cuentas)`
- **Archivos**: Tablero.gs (DISPONIBLE FAMILIA y NEUROTEA)

### Saldos globales redundantes y editables
- **Problema**: SALDOS INICIALES POR MES eran editables independientemente de SALDOS POR CUENTA
- **Impacto**: Riesgo de datos inconsistentes si se editaban ambos
- **Solución**: Saldos globales ahora son FÓRMULAS que suman los saldos por cuenta
- **Archivos**: Sheets.gs (función crearHojaCONFIG)

---

## Mejoras [2026-01-19] - v7.6

### METAS NEUROTEA configurables desde CONFIG
- **Solicitud**: Las metas (7%, 93%, 33.33%) estaban hardcodeadas en las fórmulas
- **Mejora**: Ahora son editables desde CONFIG (filas 40-44, columna B)
- **Ubicación**:
  - CONFIG!$B$40: Meta Ganancia Mínima (%)
  - CONFIG!$B$41: Meta Máximo Gastos (%)
  - CONFIG!$B$42: Distribución Utilidad Dueño (%)
  - CONFIG!$B$43: Distribución Fondo Emergencia (%)
  - CONFIG!$B$44: Distribución Fondo Inversión (%)
- **Archivos modificados**:
  - Sheets.gs (PRESUPUESTO y MOVIMIENTO)
  - Tablero.gs (indicadores NT)
  - WebApp.gs (dashboard HTML)
- **Fórmulas ahora usan**: `CONFIG!$B$40/100` en lugar de `0,07`

---

## Mejoras [2026-01-20] - v7.7

### Dropdowns CARGA limpios (categorías eliminadas)
- **Problema**: CARGA_FAMILIA mostraba GASTOS FIJOS, CUOTAS, OBLIGACIONES, SUSCRIPCIONES en dropdown CATEGORÍA
- **Problema**: CARGA_NT mostraba CLÍNICA, SUELDOS, TELEFONÍA, OBLIGACIONES, EVENTOS en dropdown CATEGORÍA
- **Impacto**: Confusión al usuario - esas categorías van en GASTOS_FIJOS
- **Solución**:
  - CARGA_FAMILIA CATEGORÍA: Solo muestra `['-', 'VARIABLES', opciones_ahorro]`
  - CARGA_NT CATEGORÍA: Solo muestra `['-', 'VARIABLES']`
  - CARGA_NT SUBCATEGORÍA: Ya no incluye EVENTOS
- **Archivos**: Config.gs (nuevos arrays CARGA_CATEGORIAS_*), Sheets.gs (validaciones)

### EVENTOS movido de CARGA a GASTOS_FIJOS
- **Problema**: EVENTOS se cargaba en CARGA_NT como gasto variable
- **Análisis**: EVENTOS son gastos PLANIFICADOS (Variable/Anual), no variables puros
- **Solución**:
  - EVENTOS ahora está en GASTOS_FIJOS junto a CLÍNICA, SUELDOS, etc.
  - MOVIMIENTO lee EVENTOS de GASTOS_FIJOS (INDEX/MATCH) no de CARGA_NT (SUMPRODUCT)
  - EST.PAGO de EVENTOS ahora tiene dropdown (Pendiente/Pagado/Cancelado)
- **Archivos**: Config.gs (EVENTOS_GASTOS_NT), Sheets.gs (GASTOS_FIJOS y MOVIMIENTO)

### Reservas de EVENTOS ampliadas
- **Antes**: 6 eventos definidos + 10 reservas = 16 total
- **Ahora**: 6 eventos definidos + 12 reservas = 18 total
- **Cambio**: Reservas renombradas de "Reserva X" a "Reserva Evento X" para claridad
- **Archivos**: Config.gs (EVENTOS_NT, EVENTOS_GASTOS_NT)

### Nuevas subcategorías VARIABLES FAMILIA
- **Agregadas**: "Alimentación" y "Gastos Varios"
- **Total**: 13 items (antes 11)
- **Archivos**: Config.gs (VARIABLES_FAMILIA, VARIABLES_PRESUP_FAM)

---

## Bug Fixes [2026-01-20] - v7.8 (CRÍTICO)

### "Esperado" por cuenta no restaba gastos fijos (BUG CRÍTICO)
- **Problema FAMILIA**: La fórmula usaba INDEX/MATCH dentro de SUMPRODUCT para buscar EST.PAGO, pero INDEX/MATCH con arrays como argumento no funciona correctamente
- **Problema NEUROTEA**: La fórmula ni siquiera intentaba restar gastos fijos - solo leía de CARGA_NT
- **Impacto**: Los saldos "Esperado" por cuenta estaban inflados (~44M FAMILIA, ~27M NEUROTEA) porque no se restaban los gastos fijos pagados
- **Solución**:
  1. Nueva columna N (CUENTA) en MOVIMIENTO que almacena la cuenta de cada gasto fijo
  2. Fórmulas "Esperado" ahora usan SUMPRODUCT simple con la columna N
  3. Tanto FAMILIA como NEUROTEA restan gastos fijos correctamente
- **Archivos modificados**:
  - Sheets.gs (columna N=CUENTA en todas las funciones de MOVIMIENTO)
  - Tablero.gs (fórmulas Esperado para FAMILIA y NEUROTEA)
- **Fórmula corregida**:
  ```
  Esperado = Saldo_Inicial
           + Ingresos_CARGA_a_cuenta
           - Egresos_CARGA_de_cuenta
           - Ahorro_CARGA_de_cuenta (solo FAMILIA)
           - SUMPRODUCT(MOVIMIENTO!N=cuenta * MOVIMIENTO!J="Pagado" * MOVIMIENTO!F)
  ```

---

## Bug Fixes [2026-01-20] - v7.11 (CRÍTICO)

### DISPONIBLE ahora referencia TOTAL DISPONIBLE (coherencia garantizada)
- **Problema FAMILIA**: DISPONIBLE se calculaba como `INGRESOS - EGRESOS - AHORRO - FONDO`,
  pero TOTAL DISPONIBLE se calculaba como `SUM(Esperado de cuentas)`.
  Estas fórmulas usaban fuentes de datos diferentes, causando discrepancias de ~1.6M.
- **Problema NEUROTEA**: GANANCIA REAL y PROYECCIÓN usaban `Ingresos - Egresos` en lugar
  de TOTAL DISPONIBLE NT.
- **Solución FAMILIA**:
  - DISPONIBLE = `C${filaTotalCuentasFam}` (referencia directa a TOTAL DISPONIBLE)
  - PATRIMONIO = `TOTAL DISPONIBLE + AHORRO + FONDO`
- **Solución NEUROTEA**:
  - GANANCIA REAL = `I${filaTotalCuentasNT}` (referencia a TOTAL DISPONIBLE NT)
  - PROYECCIÓN = `I${filaTotalCuentasNT} - Pendientes`
- **Archivos modificados**: Tablero.gs (líneas 398-424, 636-691)

### Lógica corregida
```
ANTES (incorrecto):
  DISPONIBLE = INGRESOS - EGRESOS_PAGADOS - AHORRO - FONDO
  TOTAL DISPONIBLE = SUM(Esperado de cuentas)
  → Usaban fuentes diferentes → DISCREPANCIA

AHORA (correcto):
  DISPONIBLE = TOTAL DISPONIBLE (referencia directa)
  → Siempre iguales por definición → SIN DISCREPANCIA
```

---

## Mejoras [2026-01-21] - v7.12 (SISTEMA UUID + AUTO-BORRADO)

### Sistema UUID para vincular transacciones cruzadas
- **Problema**: Las transacciones cruzadas (préstamos/devoluciones NT↔FAM) no tenían vínculo explícito
- **Impacto**: Imposible saber cuál transacción en una hoja corresponde a cuál en la otra
- **Solución**:
  - Nueva columna I (`LINK_ID`) en CARGA_FAMILIA y CARGA_NT
  - Formato: `TXN_YYYYMMDD_XXXXXX` (ID único alfanumérico)
  - Ambas transacciones del par tienen el mismo LINK_ID
- **Archivos**: Code.gs (función `generarLinkId()`), Sheets.gs (headers actualizados)

### Auto-borrado sincronizado de transacciones cruzadas
- **Problema**: Al borrar una transacción, la contraparte quedaba huérfana
- **Solución**:
  - `onEdit` detecta cuando se vacía el MONTO (columna F)
  - Busca la contraparte por LINK_ID y la borra automáticamente
  - Toast de confirmación: "✓ Borrada contraparte en CARGA_XX"
- **Archivos**: Code.gs (funciones `borrarContraparte()`, `obtenerLinkId()`)

### Actualización automática de monto en contraparte
- **Problema**: Al editar el monto, se creaba duplicado en vez de actualizar
- **Solución**:
  - Si la transacción ya tiene LINK_ID, busca la contraparte y actualiza su monto
  - No crea nueva transacción si ya existe vínculo
- **Archivos**: Code.gs (función `actualizarMontoContraparte()`)

### Corrección de rangos en WebApp.gs
- **Problema**: Leía rangos incorrectos de MOVIMIENTO
  - FAMILIA: `A9:J70` (faltaban filas 71-113)
  - NEUROTEA: `A73:J150` (inicio y fin incorrectos)
- **Solución**:
  - FAMILIA: `A9:J113`
  - NEUROTEA: `A119:J200`
- **Impacto**: Ahora captura todos los datos de AHORRO y EGRESOS PENDIENTES
- **Archivos**: WebApp.gs (líneas 603, 629)

### Utils.gs `calcularBalanceCruzado()` bidireccional completo
- **Problema**: Solo calculaba FLUJO 1 (NT→FAM), ignoraba FLUJO 2 (FAM→NT)
- **Solución**: Ahora calcula ambos flujos y retorna objeto completo con:
  - `prestamoNTMes/Acum`: Préstamos NT → Familia
  - `devFamMes/Acum`: Devoluciones Familia → NT
  - `prestamoFamMes/Acum`: Préstamos Familia → NT
  - `devNTMes/Acum`: Devoluciones NT → Familia
  - `balanceNetoMes/Acum`: Balance neto consolidado
  - `estado`: "FAMILIA DEBE A NT" / "NT DEBE A FAMILIA" / "EQUILIBRADO"
- **Archivos**: Utils.gs

### Estructura columnas LINK_ID y VÁLIDO en hojas CARGA
```
| Columna | CARGA_FAMILIA | CARGA_NT |
|---------|---------------|----------|
| I       | LINK_ID       | LINK_ID  |
| J       | VÁLIDO        | VÁLIDO   |

LINK_ID: 6 caracteres alfanuméricos (ej: A7K2M1)
- No incluye prefijos ni fechas
- Identificador breve y único

VÁLIDO (v7.26): ARRAYFORMULA que valida cada fila
- "✓" = Fila será contada en TABLERO
- "⚠ Fecha" = Fecha inválida (texto/malformada)
- "⚠ Año" = Año diferente a 2026
- "⚠ Monto" = Monto vacío o texto
- Filas con ⚠ se resaltan en rojo claro
```

### Flujo completo de transacciones cruzadas (v7.12)
```
1. Usuario registra préstamo en CARGA_NT:
   - TIPO="Préstamo Familia", MONTO=1.000.000

2. Sistema auto-genera LINK_ID: X9K2M1 (6 caracteres)

3. Sistema auto-crea contraparte en CARGA_FAMILIA:
   - TIPO="Egreso Familiar", CAT="VARIABLES", SUBCAT="Préstamo Familia → NT"
   - DESCRIPCIÓN y NOTAS vacíos
   - LINK_ID=X9K2M1 (mismo ID)

4. Si usuario edita MONTO a 1.500.000:
   - Sistema actualiza monto en contraparte (no crea duplicado)

5. Si usuario vacía MONTO (borra):
   - Sistema busca contraparte por LINK_ID
   - Sistema borra la fila contraparte automáticamente
```

---

## Bug Fixes [2026-01-21] - v7.13 (CRÍTICO)

### Auto-creación no se disparaba correctamente (BUG CRÍTICO)
- **Problema**: La auto-creación de transacciones cruzadas solo se disparaba al editar MONTO, pero si el usuario llenaba MONTO antes de SUBCATEGORÍA, no funcionaba
- **Problema adicional**: El flag anti-loop `AUTO_CREACION_ACTIVA` podía quedarse pegado en `true` después de un error, bloqueando permanentemente la auto-creación
- **Solución**:
  1. Auto-creación ahora se dispara tanto al editar MONTO como SUBCATEGORÍA
  2. Sistema anti-loop mejorado con TIMEOUT de 10 segundos (auto-limpieza)
  3. Try-catch global en `onEdit()` que limpia el flag si hay error
  4. Nueva función de menú: `🔓 Desbloquear Auto-Creación`
- **Archivos modificados**: Code.gs (onEdit, procesarEdicion*, autoCrearTransaccion*, funciones anti-loop)

### Tipos auto-creados no reconocidos como INGRESOS
- **Problema**: Al remover los tipos de préstamo/devolución de los dropdowns (v7.13), las transacciones auto-creadas no eran reconocidas como INGRESOS en las validaciones
- **Solución**:
  - Nuevos arrays separados para dropdown vs validación:
    - `TIPOS_INGRESO_FAMILIA` / `TIPOS_INGRESO_NT` → Para dropdowns
    - `TIPOS_INGRESO_*_AUTOCREADOS` → Tipos que se crean automáticamente
    - `TODOS_TIPOS_INGRESO_*` → Unión de ambos, para validaciones
  - Todas las validaciones `.includes()` ahora usan `TODOS_TIPOS_*`
- **Archivos modificados**: Config.gs, Code.gs

### Logging de diagnóstico agregado
- **Propósito**: Facilitar debugging de problemas con auto-creación
- **Ubicación**: `autoCrearTransaccionCruzadaFamilia()` y `autoCrearTransaccionCruzadaNT()`
- **Uso**: Ver Extensiones → Apps Script → Ejecuciones para ver logs

### Flujo actualizado de auto-creación (v7.13)
```
REGLA ÚNICA: Siempre registrar desde quien ENVÍA el dinero (EGRESO)

┌─────────────────────────────────────────────────────────────────┐
│ FAMILIA presta a NT:                                            │
│   1. CARGA_FAMILIA: Egreso → VARIABLES → "Préstamo Familia → NT"│
│   2. Auto-crea en CARGA_NT: TIPO="Préstamo Familia" (ingreso)   │
├─────────────────────────────────────────────────────────────────┤
│ NT devuelve a FAMILIA:                                          │
│   1. CARGA_NT: Egreso → VARIABLES → "Devolución NT → Familia"   │
│   2. Auto-crea en CARGA_FAMILIA: TIPO="Devolución NeuroTEA"     │
├─────────────────────────────────────────────────────────────────┤
│ NT presta a FAMILIA:                                            │
│   1. CARGA_NT: Egreso → VARIABLES → "Préstamo NT → Familia"     │
│   2. Auto-crea en CARGA_FAMILIA: TIPO="Préstamo NeuroTEA"       │
├─────────────────────────────────────────────────────────────────┤
│ FAMILIA devuelve a NT:                                          │
│   1. CARGA_FAMILIA: Egreso → VARIABLES → "Devolución Familia → NT"│
│   2. Auto-crea en CARGA_NT: TIPO="Devolución Familia → NT"      │
└─────────────────────────────────────────────────────────────────┘
```

### Sistema anti-loop mejorado (v7.13)
```javascript
// Flag con timeout automático de 10 segundos
function estaEnModoAutoCreacion() {
  const flagTime = props.getProperty('AUTO_CREACION_TIME');
  const ahora = Date.now();

  // Si pasaron más de 10 segundos, limpiar flag automáticamente
  if (flagTime && (ahora - parseInt(flagTime)) > 10000) {
    props.deleteProperty('AUTO_CREACION_ACTIVA');
    return false;
  }

  return props.getProperty('AUTO_CREACION_ACTIVA') === 'true';
}
```

### Opción de menú para desbloquear manualmente
- **Ubicación**: Control Financiero → 🔧 Utilidades → 🔓 Desbloquear Auto-Creación
- **Uso**: Si la auto-creación deja de funcionar, ejecutar esta opción
- **Función**: `limpiarFlagAutoCreacion()`

---

## Mejoras [2026-01-21] - v7.14

### Dropdowns TIPO simplificados (préstamos/devoluciones removidos)
- **Problema**: Los tipos "Préstamo NeuroTEA", "Devolución NeuroTEA" (FAMILIA) y "Préstamo Familia", "Devolución Familia → NT" (NT) aparecían en dropdowns pero ya no deberían usarse manualmente
- **Decisión**: Estos tipos ahora son solo AUTO-CREADOS por el sistema
- **Cambio en Config.gs**:
  - `TIPOS_INGRESO_FAMILIA`: Sin préstamos/devoluciones (para dropdowns)
  - `TIPOS_INGRESO_FAMILIA_AUTOCREADOS`: ['Préstamo NeuroTEA', 'Devolución NeuroTEA']
  - `TODOS_TIPOS_INGRESO_FAMILIA`: Unión de ambos (para validaciones)
  - Ídem para NT
- **Cambio en Code.gs**: Todas las validaciones `.includes()` ahora usan `TODOS_TIPOS_*`

### TABLERO simplificado - Referencias directas a MOVIMIENTO
- **Problema**: TABLERO tenía fórmulas SUMPRODUCT/SUMIFS complejas que duplicaban lógica ya calculada en MOVIMIENTO
- **Solución**: TABLERO ahora usa INDEX/MATCH para leer directamente del RESUMEN de MOVIMIENTO
- **Fórmulas simplificadas**:
  ```
  ANTES: =IFERROR(SUMPRODUCT((CARGA_FAMILIA!$B$4:$B$500<>"Egreso")...);0)
  AHORA: =IFERROR(INDEX(MOVIMIENTO!F:F;MATCH("📥 TOTAL INGRESOS FAMILIA";MOVIMIENTO!A:A;0));0)
  ```
- **Beneficios**:
  1. Rendimiento: Fórmulas más simples = cálculo más rápido
  2. Coherencia: Una sola fuente de verdad (MOVIMIENTO)
  3. Mantenibilidad: Cambios en lógica solo en MOVIMIENTO
  4. Debugging: Más fácil encontrar errores

### RESUMEN de MOVIMIENTO con textos únicos
- **Problema**: Los textos del RESUMEN eran genéricos ("TOTAL INGRESOS") y se repetían en FAMILIA y NT
- **Solución**: Textos ahora son únicos para permitir INDEX/MATCH
- **Textos FAMILIA**:
  - "📥 TOTAL INGRESOS FAMILIA"
  - "📤 TOTAL EGRESOS PAGADOS FAMILIA"
  - "💰 TOTAL AHORRO FAMILIA"
  - "⏳ TOTAL EGRESOS PENDIENTES FAMILIA"
  - "💵 SALDO DISPONIBLE FAMILIA"
  - "📉 SALDO FIN DE MES FAMILIA"
- **Textos NT**:
  - "📥 TOTAL INGRESOS NT"
  - "📤 TOTAL EGRESOS PAGADOS NT"
  - "⏳ TOTAL EGRESOS PENDIENTES NT"
  - "💵 SALDO DISPONIBLE NT"
  - "📉 SALDO PROYECTADO NT"

### Archivos modificados
- **Config.gs**: Arrays separados para dropdowns vs auto-creados
- **Code.gs**: Validaciones usan `TODOS_TIPOS_INGRESO_*`
- **Sheets.gs**: Textos únicos en RESUMEN de MOVIMIENTO
- **Tablero.gs**: Fórmulas INDEX/MATCH en lugar de SUMPRODUCT/SUMIFS

---

## Bug Fixes [2026-01-24] - v7.21 (CRÍTICO)

### Auto-creación de devolución NT→Familia no se disparaba
- **Problema**: Al registrar "Devolución NT → Familia" en CARGA_NT, la auto-creación de
  "Devolución NeuroTEA" en CARGA_FAMILIA no se disparaba
- **Causa raíz**: `intentarAutoCreacionNT()` requiere 6 campos completos, pero solo se
  reintentaba al editar SUBCATEGORÍA, MONTO o CUENTA. Ediciones de FECHA, TIPO o
  CATEGORÍA no retriggereaban la auto-creación
- **Impacto**: Si el usuario completaba los campos en cierto orden (ej: SUBCATEGORÍA antes
  de MONTO/CUENTA), la auto-creación fallaba silenciosamente en cada intento y nunca se
  recuperaba
- **Solución**:
  1. FECHA (col 1): ahora retrigerea `intentarAutoCreacion` para entradas sin LINK_ID
  2. TIPO (col 2): retrigerea cuando cambia a "Egreso NT" / "Egreso Familiar"
  3. CATEGORÍA (col 3): retrigerea cuando cambia a "VARIABLES"
  4. `validarPrestamoDevolucionNT/Familia` ahora retornan `true/false`
  5. Si validación bloquea → `return` inmediato (antes seguía ejecutando con celda vacía)
- **Archivos**: Code.gs (procesarEdicionCargaNT, procesarEdicionCargaFamilia, validarPrestamo*)

### Trigger points completos para auto-creación (v7.21)
```
| Campo         | ¿Retrigerea auto-creación? |
|---------------|---------------------------|
| FECHA (col 1) | ✓ SÍ (v7.21)             |
| TIPO (col 2)  | ✓ SÍ (v7.21)             |
| CATEGORÍA (3) | ✓ SÍ (v7.21)             |
| SUBCATEGORÍA  | ✓ SÍ (v7.19)             |
| MONTO (col 6) | ✓ SÍ (v7.18)             |
| CUENTA (col 7)| ✓ SÍ (v7.19)             |
```

### Auto-limpieza de contrapartes huérfanas (onChange)
- **Problema**: Si el usuario elimina una fila con clic derecho → "Eliminar fila",
  `onEdit` NO se dispara (limitación de Apps Script). La contraparte queda huérfana
  y corrompe los cálculos de balance cruzado.
- **Solución**:
  1. `onChangeHandler(e)`: trigger instalable que detecta `REMOVE_ROW`
  2. `limpiarContrapartesHuerfanas()`: escanea ambas hojas CARGA buscando LINK_IDs
     que existen en una pero no en la otra → elimina las filas huérfanas
  3. `instalarTriggerOnChange()`: función de menú para instalar el trigger (una sola vez)
  4. `obtenerLinkIds(sheet)`: utilidad que extrae todos los LINK_IDs de una hoja
- **Menú**: Utilidades → "Verificar Contrapartes Huérfanas" (manual) + "Instalar Auto-limpieza"
- **Instalación**: Ejecutar UNA vez desde menú. El trigger queda activo permanentemente.
- **Archivos**: Code.gs (funciones nuevas + menú actualizado)

### Bug secundario: validación no hacía return
- **Problema**: `validarPrestamoDevolucionNT()` limpiaba la celda cuando balance <= 0,
  pero no retornaba. El código seguía y llamaba `intentarAutoCreacionNT()` que leía
  la celda vacía y salía silenciosamente
- **Solución**: Funciones ahora retornan `true` (bloqueado) o `false` (permitido).
  El caller hace `if (bloqueado) return;` antes de intentar auto-creación

---

## Bug Fixes [2026-01-24/26] - v7.22

### Validación SUBCATEGORÍA mostraba "No válido" al seleccionar Ingreso/Ahorro
- **Problema**: v7.20 cambió validación de `requireValueInList(['-', ...VARIABLES])` a
  `requireValueInRange(CONFIG)`. El rango CONFIG no incluye "-", así que al seleccionar
  un tipo ingreso y poner "-" en SUBCATEGORÍA, Google Sheets mostraba error "No válido"
- **Impacto**: Confusión visual al usuario - parecía error cuando era comportamiento esperado
- **Solución**:
  1. `clearDataValidations()` en celda SUBCATEGORÍA al poner "-" (ingreso/ahorro)
  2. Restaurar `requireValueInRange(CONFIG)` cuando TIPO cambia a Egreso
- **Archivos**: Code.gs (procesarEdicionCargaFamilia, procesarEdicionCargaNT)

### Validación CATEGORÍA también mostraba "No válido" en ingresos manuales
- **Problema**: Al seleccionar un tipo ingreso, solo se limpiaba validación de SUBCATEGORÍA (col 4).
  La celda CATEGORÍA (col 3) también tenía validación activa que rechazaba "-"
- **Solución**: `clearDataValidations()` también en CATEGORÍA al poner "-" para ingresos
- **Archivos**: Code.gs (procesarEdicionCargaFamilia col 2, procesarEdicionCargaNT col 2)

### Transacciones auto-creadas mostraban errores de validación
- **Problema**: Auto-creación usa `setValues()` que NO dispara `onEdit`, por lo que las celdas
  CATEGORÍA y SUBCATEGORÍA heredaban la validación de la hoja y rechazaban "-"
- **Solución**: `clearDataValidations()` explícito en cols 3 y 4 después de `setValues()` en
  `autoCrearTransaccionCruzadaFamilia` y `autoCrearTransaccionCruzadaNT`
- **Archivos**: Code.gs (funciones autoCrearTransaccionCruzada*)

### BUG 1: CATEGORÍA dropdown desaparecía al volver a Egreso
- **Problema**: Al cambiar TIPO de Ingreso → Egreso, la validación de CATEGORÍA se había
  limpiado con `clearDataValidations()` pero nunca se restauraba. El dropdown desaparecía
- **Solución**: Al cambiar a Egreso, restaurar validación con
  `requireValueInList(['-', ...CARGA_CATEGORIAS_*, ...CATEGORIAS_AHORRO_*])` y
  `requireValueInRange(CONFIG)` para SUBCATEGORÍA
- **Archivos**: Code.gs (col===2 handler en ambas funciones procesarEdicion*)

### BUG 2: SUBCATEGORÍA mostraba warning al seleccionar CATEGORÍA no-VARIABLES
- **Problema**: Al seleccionar una CATEGORÍA que no es VARIABLES (ej: Ahorro Clara, "-"),
  se ponía "-" en SUBCATEGORÍA sin limpiar la validación `requireValueInRange` activa
- **Solución**: `clearDataValidations()` en TODAS las ramas donde SUBCATEGORÍA se setea a "-":
  1. CATEGORÍA es Ingreso y usuario intenta cambiar CATEGORÍA (cols 3-4 FAMILIA y NT)
  2. CATEGORÍA es AHORRO (col 3 FAMILIA)
  3. CATEGORÍA no es VARIABLES ni EVENTOS (else branch col 3 FAMILIA y NT)
- **Archivos**: Code.gs (6 puntos de clearDataValidations añadidos)

### Fórmulas distribución ganancia NT simplificadas
- **Problema**: Fórmulas usaban `VALUE(CONFIG!$B$42)/100` etc. (innecesariamente complejo)
- **Solución**: `=IF(ganancia>0;ganancia/3;0)` - dividir entre 3 si es positiva, 0 si negativa
- **Archivos**: Sheets.gs (PRESUPUESTO y MOVIMIENTO)
- **Nota**: Tablero.gs ya usaba la fórmula simple

### Nuevas subcategorías agregadas
- **VARIABLES FAMILIA**: "Gastos del Colegio" (reemplaza Reserva Var. 1)
- **VARIABLES NT**: "Muebles y equipos" (reemplaza Reserva Var. 1)
- **Archivos**: Config.gs (VARIABLES_FAMILIA, VARIABLES_NT, VARIABLES_PRESUP_FAM, VARIABLES_PRESUP_NT)

---

## Bug Fixes [2026-01-26] - v7.23

### Utilidad para reparar datos pegados en CARGA
- **Problema**: Al copiar datos desde otra hoja de Google Sheets, fechas y montos quedan como texto
- **Solución**: Nueva función `repararDatosCarga()` que:
  1. Convierte fechas texto a objetos Date (detecta formatos dd/mm/yyyy bien formados)
  2. Alerta sobre fechas malformadas que no puede reparar automáticamente
  3. Convierte montos texto a números usando `limpiarMonto()`
- **Funciones nuevas**: `repararDatosCarga()`, `analizarFechaTexto()`
- **Menú**: Utilidades → "🩹 Reparar Datos Pegados en CARGA"
- **Archivos**: Utils.gs, Code.gs (menú)

### Fórmulas Esperado en Tablero con IFERROR individual
- **Problema**: IFERROR externo cubría todo el SUMPRODUCT, ocultando errores parciales
- **Solución**: Cada SUMPRODUCT ahora tiene IFERROR individual para aislar errores
- **Archivos**: Tablero.gs (fórmulas Esperado FAMILIA y NT)

---

## Bug Fixes [2026-01-26] - v7.24 (CRÍTICO)

### SUMPRODUCT retornaba 0 con UNA fecha texto/malformada (BUG CRÍTICO)
- **Problema**: `MONTH()` y `YEAR()` sobre texto producen error. En un SUMPRODUCT, un error en
  cualquier elemento mata toda la multiplicación de arrays. El IFERROR externo capturaba TODO
  el SUMPRODUCT como error y retornaba 0 para TODOS los conceptos
- **Impacto**: TABLERO mostraba 0 para TODOS los ingresos/egresos cuando había UNA fecha mala
- **Solución**: `IFERROR(MONTH(rango);0)` y `IFERROR(YEAR(rango);0)` DENTRO del SUMPRODUCT.
  Mes=0/Año=0 no matchean ningún mes real (1-12), así solo esa fila se excluye
- **Archivos modificados**:
  - Sheets.gs: 3 fórmulas SUMPRODUCT en MOVIMIENTO (ingresos, variables, ahorro)
  - Tablero.gs: 10+ fórmulas SUMPRODUCT (Esperado FAM/NT, Ahorro, Fondo, Balance cruzado)
- **Fórmula corregida**:
  ```
  ANTES: =SUMPRODUCT((B=tipo)*(MONTH(A)=mes)*(YEAR(A)=año)*(F))
  AHORA: =SUMPRODUCT((B=tipo)*(IFERROR(MONTH(A);0)=mes)*(IFERROR(YEAR(A);0)=año)*(F))
  ```

### SUBCATEGORÍA mostraba error al pegar datos desde otro Google Sheet
- **Problema**: `requireValueInRange(CONFIG)` referencia un rango de celdas. Valores pegados
  desde otro Google Sheet pueden no coincidir exactamente (diferencias invisibles de encoding/whitespace)
- **Solución**: Cambiado a `requireValueInList(VARIABLES_FAMILIA/NT)` que compara strings directos
- **Archivos**: Sheets.gs (2 funciones crearHojaCARGA*), Code.gs (2 puntos de restauración Egreso)

### Utilidad de reparación extendida (repararDatosCarga v2)
- **Mejoras**: Ahora también:
  1. Trim de espacios en columnas TIPO, CATEGORÍA, SUBCATEGORÍA, CUENTA
  2. Limpieza de validaciones en filas de ingreso (CATEGORÍA y SUBCATEGORÍA → clearDataValidations)
  3. Limpieza de validaciones en filas de ahorro (SUBCATEGORÍA → clearDataValidations)
  4. Limpieza de validaciones en egresos no-VARIABLES (SUBCATEGORÍA → clearDataValidations)
- **Archivos**: Utils.gs (repararDatosCarga)

---

## Mejoras [2026-01-26] - v7.25

### 5 reservas dinámicas por subcategoría VARIABLES
- **Solicitud**: Usuario necesita más reservas en subcategorías VARIABLES
- **Cambio FAMILIA**: De 2 reservas (Reserva Var. 2-3) a 5 reservas (Reserva Var. 1-5)
  - Total: 14 ítems fijos + 5 reservas = 19 ítems
  - "Gastos del Colegio" se mantiene como ítem permanente
- **Cambio NEUROTEA**: De 2 reservas (Reserva Var. 2-3) a 5 reservas (Reserva Var. 1-5)
  - Total: 10 ítems fijos + 5 reservas = 15 ítems
  - "Muebles y equipos" se mantiene como ítem permanente
- **Arrays actualizados**: VARIABLES_FAMILIA, VARIABLES_NT, VARIABLES_PRESUP_FAM, VARIABLES_PRESUP_NT

### Rangos MOVIMIENTO actualizados (+3 filas por entidad)
- **FAMILIA**: 9-113 → **9-116** (+3 reservas variables)
- **NEUROTEA**: 119-200 → **122-206** (+3 shift por FAM + 3 reservas NT)
- **Archivos actualizados**:
  - Sheets.gs: LIQUIDEZ (parámetros filaInicioMov/filaFinMov)
  - Tablero.gs: Fórmulas Esperado, SUMIF/SUMIFS (12 referencias)
  - WebApp.gs: getRange para lectura de datos (2 referencias)

---

## Mejoras [2026-01-26] - v7.26

### Columna VÁLIDO en hojas CARGA (detección de errores silenciosos)
- **Solicitud**: Usuario no podía saber cuáles filas NO estaban siendo contadas en TABLERO
- **Problema**: SUMPRODUCT con IFERROR(MONTH();0) excluye silenciosamente filas con fechas
  texto/malformadas. El usuario veía montos menores sin saber por qué.
- **Solución**: Nueva columna J ("VÁLIDO") con ARRAYFORMULA que replica las condiciones
  del SUMPRODUCT en MOVIMIENTO
- **Indicadores**:
  - "✓" = Fila válida, será contada en TABLERO
  - "⚠ Fecha" = Fecha inválida (texto, malformada, no es fecha)
  - "⚠ Año" = Año diferente a 2026
  - "⚠ Monto" = Monto vacío o texto (no numérico)
- **Formato visual**:
  - Filas con ⚠: fondo rojo claro (#fde8e8), texto rojo oscuro (#991b1b)
  - ✓: texto verde
  - ⚠: texto rojo negrita
- **Fórmula (locale español)**:
  ```
  =ARRAYFORMULA(IF(A4:A500="";""
    ;IF(IFERROR(MONTH(A4:A500);0)=0;"⚠ Fecha"
      ;IF(IFERROR(YEAR(A4:A500);0)<>2026;"⚠ Año"
        ;IF((F4:F500="")+(NOT(ISNUMBER(F4:F500)))>0;"⚠ Monto"
          ;"✓")))))
  ```
- **Utilidad de menú**: "✓ Agregar columna VÁLIDO a CARGA" - agrega la columna a hojas
  existentes sin reinicializar (no pierde datos)
- **Archivos modificados**:
  - Sheets.gs: crearHojaCARGA_FAMILIA, crearHojaCARGA_NT, aplicarFormatoCondicionalCarga
  - Code.gs: agregarColumnaValido(), menú actualizado

---

## Mejoras [2026-01-26] - v7.27

### Filtro por mes en hojas CARGA
- **Solicitud**: Lista interminable de transacciones de todos los meses dificulta la revisión
- **Solución**: Dropdown en celda J2 con opciones "TODOS" + 12 meses
- **Comportamiento**:
  - Al seleccionar un mes: oculta filas de otros meses, ordena por fecha
  - Al seleccionar "TODOS": muestra todas las filas ordenadas por fecha
  - Las filas ocultas **siguen existiendo** para SUMPRODUCT (no afecta cálculos)
  - Filas vacías permanecen visibles (permite ingresar datos nuevos)
  - Toast de confirmación: "Mostrando X transacciones de Enero"
- **Ordenamiento**: Siempre ordena por fecha (columna A) ascendente al aplicar filtro
  - Solo ordena columnas A-I (no mueve ARRAYFORMULA de J)
- **Impacto en fórmulas**: CERO - las filas ocultas son invisibles visualmente pero
  siguen siendo calculadas por SUMPRODUCT, SUMIFS, etc.
- **Utilidad de menú**: "📅 Agregar Filtro por Mes a CARGA" para hojas existentes
- **Archivos modificados**:
  - Sheets.gs: crearHojaCARGA_FAMILIA, crearHojaCARGA_NT (fila 2 dividida, dropdown)
  - Code.gs: onEdit (detección J2), filtrarCargaPorMes(), agregarFiltroMes(), menú

---

## LECCIONES APRENDIDAS (NO IGNORAR)

> Ver también: `.claude/rules/errores-historicos.md` para lista completa de bugs resueltos.

### Formato Paraguayo (CRÍTICO)
- Separador de miles: **PUNTO** (5.000.000)
- Separador decimal: **COMA** (5,5)
- Separador de argumentos en fórmulas: **PUNTO Y COMA** (;)
- **SIEMPRE** usar `limpiarMonto()` para parsear montos del usuario

### Auto-creación de Préstamos/Devoluciones
- Solo disparar cuando **TODOS** los campos estén completos (FECHA, TIPO, CATEGORÍA, SUBCATEGORÍA, MONTO, CUENTA)
- **TODOS** los campos deben retriggerar `intentarAutoCreacion` (no solo SUBCAT/MONTO/CUENTA)
- Usar LINK_ID (6 caracteres) para vincular contrapartes
- Sincronizar cambios automáticamente (FECHA, MONTO, CUENTA)
- Si cambia SUBCATEGORÍA (préstamo↔devolución) → borrar y recrear
- Funciones de validación (`validarPrestamo*`) deben retornar boolean y hacer `return` si bloquean

### Validaciones de Data Validation (CRÍTICO)
- Al poner "-" en una celda que tiene `requireValueInRange`, **SIEMPRE** llamar `.clearDataValidations()`
- Al restaurar Egreso después de Ingreso, **SIEMPRE** restaurar validaciones con `setDataValidation()`
- `setValues()` (auto-creación) NO dispara `onEdit` → limpiar validaciones EXPLÍCITAMENTE después
- Ciclo completo: Ingreso→clearDataValidations | Egreso→setDataValidation (restaurar dropdown)
- **PREFERIR** `requireValueInList(array)` sobre `requireValueInRange(CONFIG)` para SUBCATEGORÍA → más confiable con datos pegados desde otros sheets

### Fórmulas
- **NUNCA** usar SUMIFS con MONTH()/YEAR() → usar SUMPRODUCT
- **SIEMPRE** usar `IFERROR(MONTH(rango);0)` e `IFERROR(YEAR(rango);0)` DENTRO del SUMPRODUCT para proteger contra fechas texto
- **NUNCA** calcular DISPONIBLE independientemente → referenciar TOTAL DISPONIBLE
- Distribución ganancia NT: simple `=SI(H>0;H/3;0)` - no complicar

### Rangos en MOVIMIENTO
- FAMILIA: filas **9-116** (NO 9-70)
- NEUROTEA: filas **122-206** (NO 73-150)

### Workflow Anti-Errores
1. Después de cambios en gs/ → ejecutar `/verificar`
2. Copiar código a Apps Script → Guardar → Reinicializar
3. Probar caso específico en spreadsheet real
4. Reportar resultado: "Funciona" o "No funciona, pasa X"

---

*Última actualización: 2026-01-26*
*Versión: 7.27 - Filtro por mes en CARGA + columna VÁLIDO*
