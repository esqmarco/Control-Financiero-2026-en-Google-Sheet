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
├── Código.gs      → Menú principal, triggers, inicialización
├── Config.gs      → Datos maestros, cuentas, categorías, colores
├── Sheets.gs      → Creación de las 7 hojas principales
├── Tablero.gs     → Dashboard en Google Sheets (fórmulas dinámicas)
├── WebApp.gs      → Dashboard HTML/CSS (lee datos en tiempo real)
└── Utils.gs       → Funciones utilitarias
```

---

## Estructura de las 7 Hojas

| # | Hoja | Función | Editable |
|---|------|---------|----------|
| 1 | CONFIG | Listas maestras para desplegables | Sí |
| 2 | PRESUPUESTO | Plan anual (manual) | Sí |
| 3 | GASTOS_FIJOS | Montos recurrentes con BASE y meses | Sí |
| 4 | CARGA_FAMILIA | Transacciones variables puras | Sí |
| 5 | CARGA_NT | Transacciones variables + eventos | Sí |
| 6 | MOVIMIENTO | Real vs Presupuesto (automático) | Parcial |
| 7 | TABLERO | KPIs y dashboard (automático) | No |

---

## REGLA CRÍTICA: Origen de Datos REAL

| Frecuencia | ¿Dónde se registra? | Origen en MOVIMIENTO |
|------------|---------------------|----------------------|
| **Variable** (puro) | CARGA_FAMILIA / CARGA_NT | `SUMIFS()` desde CARGA |
| **Fijo/Mensual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |
| **Variable/Mensual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |
| **Fijo/Anual** | GASTOS_FIJOS | `INDEX/MATCH` (mes específico) |
| **Variable/Anual** | GASTOS_FIJOS | `INDEX/MATCH` desde GASTOS_FIJOS |

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

### NEUROTEA (3 cuentas)
1. Atlas NeuroTEA
2. Caja Chica NT
3. Efectivo NT

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
=IFERROR(SUMIFS(CARGA_FAMILIA!$F:$F,CARGA_FAMILIA!$D:$D,"concepto",MONTH(CARGA_FAMILIA!$A:$A),$L$3,YEAR(CARGA_FAMILIA!$A:$A),2026),0)
```

### Columna DIFERENCIA
```
=E{row}-D{row}
```

### Columna ESTADO
```
=IF(E{row}>=D{row},"✓","⚠")  // Para Ingresos
=IF(E{row}<=D{row},"✓","⚠")  // Para Egresos
```

### Columna EST. PAGO (nueva)
Dropdown con opciones: **Pendiente**, **Pagado**, **Cancelado**

> **IMPORTANTE**: Todas las fórmulas usan `IFERROR(...,0)` para evitar errores #VALUE! cuando no hay datos.

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

- **Inicializar Sistema COMPLETO**: Crea las 7 hojas
- **Reinicializar Sistema**: Borra y recrea todo
- **Abrir Dashboard Web**: Muestra HTML popup
- **Crear Hojas**: Submenú para crear hojas individuales
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
4. **TABLERO solo lee** - Todas son fórmulas que leen de MOVIMIENTO
5. **Variables PUROS van a CARGA** - Solo Supermercado, Combustible, etc.
6. **Variables con BASE van a GASTOS_FIJOS** - ANDE, Cuotas variables, etc.

---

## Checklist Antes de Modificar Código

- [ ] ¿Leí este CLAUDE.md completo?
- [ ] ¿El cambio es consistente con PLAN_MAESTRO?
- [ ] ¿Las fórmulas usan las referencias correctas?
- [ ] ¿Los colores siguen el esquema definido?
- [ ] ¿Las listas están completas (tipos, categorías, cuentas)?
- [ ] ¿Ejecuté /verificar después del cambio?

---

*Última actualización: Enero 2026*
*Versión: 2.1 - Agregada columna EST. PAGO, corregidas fórmulas con IFERROR*
