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
| 2 | PRESUPUESTO | Plan anual (manual) | Sí |
| 3 | GASTOS_FIJOS | Montos recurrentes con BASE y meses | Sí |
| 4 | CARGA_FAMILIA | Transacciones variables puras | Sí |
| 5 | CARGA_NT | Transacciones variables + eventos | Sí |
| 6 | MOVIMIENTO | Real vs Presupuesto (automático) | Parcial |
| 7 | TABLERO | KPIs y dashboard (automático) | Parcial* |
| 8 | LIQUIDEZ | Vencimientos y flujo de caja (automático) | No |

> *TABLERO tiene campos editables: SALDO_INICIAL para FAMILIA y NEUROTEA

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
- ✅ **ANDE Casa** → Variable/Mensual → va a GASTOS_FIJOS (tiene BASE)
- ✅ **Alquiler NT** → Fijo/Mensual → va a GASTOS_FIJOS
- ✅ **Antivirus** → Fijo/Anual → va a GASTOS_FIJOS (solo 1 mes)

---

## Tipos de Ingreso (para desplegables)

### FAMILIA (13 tipos)
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

### NEUROTEA (4 tipos)
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros
4. Devolución Familia → NT

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

### FAMILIA - VARIABLES (10 items)
1. Supermercado
2. Combustible
3. Mantenimiento / Reparaciones Auto Clara
4. Mantenimiento / Reparaciones Auto Niños
5. Mantenimiento / Reparaciones Camioneta Marco
6. Ropa/Vestidos
7. Recreación (Pizza, hamburguesa, helados, etc)
8. Salud y Medicamentos
9. Gastos no identificados
10. **Devolución Familia → NT**

### NEUROTEA - VARIABLES (6 items)
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple
6. **Préstamo NT → Familia**

### NEUROTEA - EVENTOS (16 items: 6 definidos + 10 reservas)
1. Día del Autismo (Abril)
2. San Juan (Junio)
3. Día del Niño (Agosto)
4. Clausura Padres (Noviembre)
5. Navidad Papá Noel (Diciembre)
6. Cena Fin de Año (Diciembre)
7-16. Reserva 1 a Reserva 10 (renombrables)

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
| D | PRESUPUESTO | Monto planeado (desde PRESUPUESTO) |
| E | REAL | Monto real (desde GASTOS_FIJOS o CARGA) |
| F | DIFERENCIA | REAL - PRESUPUESTO |
| G | % | Porcentaje de ejecución |
| H | ESTADO | ✓ (OK) o ⚠ (Alerta) |
| I | EST. PAGO | Pendiente / Pagado / Cancelado |
| J | 🚦 | Semáforo visual |
| K | (oculta) | Etiqueta MES_NUM |
| L | (oculta) | Número de mes calculado |

---

## Fórmulas Clave en MOVIMIENTO

### Celda L3 (número de mes oculto)
```
=MATCH(B3,{"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"},0)
```

### Columna PRESUPUESTO
```
=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("concepto",PRESUPUESTO!$A:$A,0),$L$3),0)
```

### Columna REAL (para gastos fijos)
```
=IFERROR(IF(INDEX(GASTOS_FIJOS!$G:$R,MATCH("concepto",GASTOS_FIJOS!$A:$A,0),$L$3)<>"",
  INDEX(GASTOS_FIJOS!$G:$R,MATCH("concepto",GASTOS_FIJOS!$A:$A,0),$L$3),
  INDEX(GASTOS_FIJOS!$F:$F,MATCH("concepto",GASTOS_FIJOS!$A:$A,0))),0)
```

### Columna REAL (para variables puros)
```
=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$D$4:$D$500="concepto")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=$L$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500)),0)
```
> **IMPORTANTE**: Se usa SUMPRODUCT en lugar de SUMIFS porque SUMIFS no acepta funciones como MONTH()/YEAR() en criterios.

### Columna DIFERENCIA
```
=E{row}-D{row}
```

### Columna ESTADO
```
=IF(E{row}>=D{row},"✓","⚠")  // Para Ingresos
=IF(E{row}<=D{row},"✓","⚠")  // Para Egresos
```

### Columna EST. PAGO (GATILLO de contabilización)

> **DECISIÓN [2026-01-03o]**: EST.PAGO varía según el origen del dato:

| Origen | EST. PAGO | Editable | Valor |
|--------|-----------|----------|-------|
| **INGRESOS** (de CARGA) | Fijo | No | "Recibido" |
| **VARIABLES puros** (de CARGA) | Fijo | No | "Pagado" |
| **EVENTOS** (de CARGA) | Fijo | No | "Pagado" |
| **GASTOS_FIJOS** | Dropdown | Sí | Pendiente/Pagado/Cancelado |

**Razón**: Si cargas un gasto en CARGA, es porque YA lo pagaste. No tiene sentido preguntar si está pendiente. Solo GASTOS_FIJOS (alquiler, salarios, cuotas) necesitan confirmación manual.

**Estados para GASTOS_FIJOS:**
- **Pendiente**: Monto suma a "EGRESOS PENDIENTES" (no afecta DISPONIBLE)
- **Pagado**: Monto suma a "EGRESOS PAGADOS" (se descuenta de DISPONIBLE)
- **Cancelado**: Monto no suma a ninguno (anulado)

**Fórmulas en TABLERO:**
```
EGRESOS_PAGADOS = SUMIFS(MOVIMIENTO!E:E;MOVIMIENTO!B:B;"Egreso";MOVIMIENTO!I:I;"Pagado")
EGRESOS_PENDIENTES = SUMIFS(MOVIMIENTO!E:E;MOVIMIENTO!B:B;"Egreso";MOVIMIENTO!I:I;"Pendiente")
DISPONIBLE = SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS
PROYECCIÓN = DISPONIBLE - EGRESOS_PENDIENTES
```

> **IMPORTANTE**: Todas las fórmulas usan `IFERROR(...,0)` para evitar errores #VALUE! cuando no hay datos.

---

## Hoja LIQUIDEZ (8va hoja)

**Propósito**: Mostrar gastos según vencimiento usando fórmulas con `TODAY()`.

### Estructura:
| Sección | Descripción | Fórmula clave |
|---------|-------------|---------------|
| 🔴 ATRASADOS | DÍA < DAY(TODAY()) y EST.PAGO = "Pendiente" | `=SUMPRODUCT((DAY(TODAY())>DÍA)*(EST.PAGO="Pendiente")*(MONTO))` |
| 🟡 ESTA SEMANA | DÍA entre HOY y HOY+7 | `=SUMPRODUCT((DÍA>=DAY(TODAY()))*(DÍA<=DAY(TODAY())+7)*(EST.PAGO="Pendiente")*(MONTO))` |
| 🟢 PRÓXIMA SEMANA | DÍA entre HOY+8 y HOY+14 | Similar con rango +8 a +14 |

### Flujo de datos:
```
MOVIMIENTO (columna H=DÍA, I=EST.PAGO, E=REAL)
    │
    └──► LIQUIDEZ (fórmulas TODAY() auto-actualizables)
            │
            ├── ATRASADOS (urgentes)
            ├── ESTA SEMANA (próximos)
            └── PRÓXIMA SEMANA (planificar)
```

---

## SALDO_INICIAL Manual por Mes

**Decisión [2026-01-03m]**: El saldo inicial de cada mes se ingresa manualmente.

### Flujo de cierre de mes:
1. Ver saldo final del mes actual en TABLERO
2. Cambiar selector de mes a siguiente mes
3. Ingresar saldo final anterior como SALDO_INICIAL del nuevo mes

### Fórmula de DISPONIBLE:
```
DISPONIBLE = SALDO_INICIAL + INGRESOS_MES - EGRESOS_PAGADOS
```

> **NOTA**: NO hay arrastre automático. El usuario controla manualmente el cierre de mes.

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
2. **Si CATEGORÍA ≠ VARIABLES ni EVENTOS** → SUBCATEGORÍA deshabilitada
3. **Si CATEGORÍA = EVENTOS** → Muestra lista de 16 eventos
4. **Si CATEGORÍA = VARIABLES** → Muestra subcategorías variables

---

## Balance Cruzado NT ↔ FAMILIA

**Cuando NT presta a Familia:**
- CARGA_NT: Egreso NT → VARIABLES → "Préstamo NT → Familia"
- CARGA_FAMILIA: Ingreso → "Préstamo NeuroTEA"

**Cuando Familia devuelve:**
- CARGA_FAMILIA: Egreso → VARIABLES → "Devolución Familia → NT"
- CARGA_NT: Ingreso → "Devolución Familia → NT"

**Saldo Neto** = Préstamos NT→FAM - Devoluciones FAM→NT
- Si > 0: NT subsidia a Familia 🔴
- Si = 0: Equilibrado 🟢
- Si < 0: Familia subsidia a NT 🟡

---

## Colores del Sistema

| Uso | Código Hex |
|-----|------------|
| FAMILIA Header | #059669 |
| FAMILIA Fondo | #d1fae5 |
| FAMILIA Subtotal | #a7f3d0 |
| NEUROTEA Header | #1d4ed8 |
| NEUROTEA Fondo | #dbeafe |
| NEUROTEA Subtotal | #93c5fd |
| Balance Cruzado | #7c3aed / #ede9fe |
| OK/Ahorro | #22c55e |
| Alerta/Déficit | #dc2626 |
| Advertencia | #f59e0b |

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

## Notas Críticas

1. **PRESUPUESTO es 100% manual** - Usuario define lo que PLANEA gastar
2. **GASTOS_FIJOS tiene arrastre** - Si mes vacío, usa último valor o BASE
3. **MOVIMIENTO es el corazón** - Compara Plan vs Real con fórmulas
4. **TABLERO lee + SALDO_INICIAL editable** - Fórmulas dinámicas + campos manuales
5. **Variables PUROS van a CARGA** - Solo Supermercado, Combustible, etc.
6. **Variables con BASE van a GASTOS_FIJOS** - ANDE, Cuotas variables, etc.
7. **EST. PAGO es el GATILLO** - Controla si un gasto cuenta como PAGADO o PENDIENTE
8. **LIQUIDEZ es 100% automática** - Usa TODAY() para calcular vencimientos

---

## Colores de DIFERENCIA (contexto-sensitivo)

**Decisión [2026-01-03n]**: Los colores dependen del tipo de concepto:

| Tipo | Diferencia Positiva | Diferencia Negativa |
|------|---------------------|---------------------|
| **INGRESO** | 🟢 VERDE (recibiste más) | 🔴 ROJO (recibiste menos) |
| **EGRESO** | 🔴 ROJO (gastaste más) | 🟢 VERDE (gastaste menos) |

---

## Checklist Antes de Modificar Código

- [ ] ¿Leí este CLAUDE.md completo?
- [ ] ¿El cambio es consistente con PLAN_MAESTRO?
- [ ] ¿Las fórmulas usan las referencias correctas?
- [ ] ¿Los colores siguen el esquema definido?
- [ ] ¿Las listas están completas (tipos, categorías, cuentas)?
- [ ] ¿Ejecuté /verificar después del cambio?
- [ ] ¿Las decisiones en DECISIONES.md están respetadas?

---

*Última actualización: 2026-01-03*
*Versión: 3.1 - EST.PAGO diferenciado según origen, Cuentas NT corregidas (2 cuentas)*
