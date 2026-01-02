# CLAUDE.md - Sistema de Control Financiero 2026

## Descripción del Proyecto

Sistema de control financiero en Google Sheets con Apps Script para gestionar las finanzas de dos entidades:
- **FAMILIA**: Finanzas del hogar
- **NEUROTEA**: Clínica de terapia para autismo

## Arquitectura de Archivos .gs

```
gs/
├── Código.gs      → Menú principal, triggers, inicialización
├── Config.gs      → Datos maestros, cuentas, categorías, colores
├── Sheets.gs      → Creación de las 7 hojas principales
├── Tablero.gs     → Dashboard en Google Sheets (fórmulas)
├── WebApp.gs      → Dashboard HTML/CSS (lee datos en tiempo real)
└── Utils.gs       → Funciones utilitarias
```

## Estructura de Hojas

### 1. CONFIG
- Listas maestras para desplegables
- No tiene fórmulas, solo datos de referencia

### 2. PRESUPUESTO (100% Manual)
- Plan anual de ingresos y egresos
- Usuario define montos por mes (ENE-DIC)
- **Solo cálculos internos**: Subtotales, Totales, Balance
- NO se conecta con otras hojas

### 3. GASTOS_FIJOS (Semi-manual)
- Lista maestra de gastos recurrentes
- Columna BASE: Monto por defecto
- Columnas ENE-DIC: Si vacío, usa BASE; si tiene valor, usa ese valor
- Alimenta la columna REAL de MOVIMIENTO

### 4. CARGA_FAMILIA / CARGA_NT (Manual - Transacciones)
- Registro diario de ingresos y gastos VARIABLES PUROS
- Sistema Anti-Burro con validaciones en cascada
- Alimenta la columna REAL de MOVIMIENTO (solo para frecuencia "Variable")

### 5. MOVIMIENTO (Automático)
- Comparación PRESUPUESTO vs REAL
- Selector de MES que recalcula toda la hoja

### 6. TABLERO (Automático)
- Dashboard con KPIs calculados desde MOVIMIENTO
- Todo son fórmulas, no valores fijos

## Tipos de Frecuencia y Origen de Datos

| Frecuencia | Origen de REAL en MOVIMIENTO |
|------------|------------------------------|
| **Variable** | SUMIFS desde CARGA_FAMILIA o CARGA_NT |
| **Fijo/Mensual** | BASE desde GASTOS_FIJOS (12 meses) |
| **Variable/Mensual** | BASE desde GASTOS_FIJOS (puede variar) |
| **Fijo/Anual** | BASE desde GASTOS_FIJOS (1 mes específico) |
| **Variable/Anual** | BASE desde GASTOS_FIJOS (ocasional) |

## Flujo de Datos

```
PRESUPUESTO (manual)
       │
       ▼
MOVIMIENTO ◄─── GASTOS_FIJOS (BASE para Fijo/*, Variable/*)
       │              │
       │              ▼
       │         CARGA_FAMILIA / CARGA_NT (SUMIFS para "Variable" puro)
       │
       ▼
TABLERO ◄─── Lee resultados calculados
       │
       ▼
HTML Dashboard ◄─── Lee celdas con fórmulas en tiempo real
```

## Fórmulas Clave en MOVIMIENTO

### Columna PRESUPUESTO
```
=IFERROR(INDEX(PRESUPUESTO!$D:$O, MATCH(A10, PRESUPUESTO!$A:$A, 0), MES_NUMERO), 0)
```

### Columna REAL (lógica condicional)
```
=SI(FREC="Variable",
    SUMIFS(CARGA_FAMILIA!$F:$F, CARGA_FAMILIA!$B:$B, CONCEPTO, MES(CARGA_FAMILIA!$A:$A), MES_NUMERO),
    IFERROR(INDEX(GASTOS_FIJOS!columna_mes, MATCH(CONCEPTO, GASTOS_FIJOS!$A:$A, 0)), 0)
)
```

### Columna DIFERENCIA
```
=REAL - PRESUPUESTO
```

### Columna %
```
=SI(PRESUPUESTO>0, REAL/PRESUPUESTO, 0)
```

### Columna ESTADO
```
=SI(TIPO="Ingreso",
    SI(DIFERENCIA>=0, "✓", "⚠"),
    SI(DIFERENCIA<=0, "✓", "⚠")
)
```

## Colores del Sistema

### FAMILIA (Verdes)
- Header: #059669
- Fondo: #d1fae5
- Subtotal: #a7f3d0

### NEUROTEA (Azules)
- Header: #1d4ed8
- Fondo: #dbeafe
- Subtotal: #93c5fd

### Balance Cruzado (Púrpura)
- Header: #7c3aed
- Fondo: #ede9fe

### Estados
- OK/Ahorro: #22c55e (verde)
- Alerta/Déficit: #dc2626 (rojo)
- Advertencia: #f59e0b (amarillo)

## Cuentas

### FAMILIA (10 cuentas)
1. ITAU Marco
2. Coop. Univ. Marco
3. ITAU Clara
4. UENO Clara
5. Tarjeta Solar Clara
6. Tarjeta ITAU Clara
7. Tarjeta ITAU Marco
8. Tarjeta Comecipar Clara
9. Gourmed
10. Efectivo

### NEUROTEA (3 cuentas)
1. Atlas NeuroTEA
2. Caja Chica NT
3. Efectivo NT

## Metas NeuroTEA

- **Ganancia mínima**: 7% sobre ingresos
- **Máximo gastos**: 93% de ingresos
- **Distribución de ganancia**:
  - 33.33% Utilidad Dueño (Marco)
  - 33.33% Fondo Emergencia
  - 33.34% Fondo Inversión

## Balance Cruzado

Rastrea préstamos entre entidades:
- Préstamo NT → Familia
- Devolución Familia → NT
- Saldo Neto = Préstamos - Devoluciones

## Sistema Anti-Burro

Validaciones en cascada en CARGA_FAMILIA/CARGA_NT:
1. Si TIPO es Ingreso → Deshabilita CATEGORÍA y SUBCATEGORÍA
2. Si CATEGORÍA no es VARIABLES → Deshabilita SUBCATEGORÍA
3. Si CATEGORÍA es EVENTOS → Habilita lista de eventos

## Comandos del Menú

- **Inicializar Sistema COMPLETO**: Crea las 7 hojas
- **Reinicializar Sistema**: Borra y recrea todo
- **Abrir Dashboard Web**: Muestra HTML popup
- **Crear Hojas**: Submenú para crear hojas individuales
- **Utilidades**: Actualizar validaciones, recalcular, limpiar datos

## Desarrollo

### Para modificar fórmulas:
1. Editar `Sheets.gs` (función `crearHojaMOVIMIENTO`)
2. Editar `Tablero.gs` (función `crearHojaTABLERO`)

### Para modificar Dashboard HTML:
1. Editar `WebApp.gs` (función `generarHTMLDashboard`)
2. Asegurar que lee datos con `SpreadsheetApp.getActiveSpreadsheet()`

### Para agregar conceptos:
1. Editar `Config.gs` (arrays de datos maestros)
2. Ejecutar "Inicializar Sistema COMPLETO"

## Notas Importantes

1. **PRESUPUESTO es manual** - No cambia automáticamente
2. **GASTOS_FIJOS tiene arrastre** - Si mes vacío, usa mes anterior o BASE
3. **MOVIMIENTO calcula todo** - Es el corazón del sistema
4. **TABLERO solo lee** - No tiene datos propios
5. **HTML lee en tiempo real** - Usa getRange().getValue()
