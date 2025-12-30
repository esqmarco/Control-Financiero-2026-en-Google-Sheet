# PLAN MAESTRO: Sistema de Control Financiero 2026
## NeuroTEA & Familia - Google Sheets + Web App

---

## RESUMEN EJECUTIVO

Este documento consolida la interpretación completa del proyecto de planilla de control financiero basado en el análisis exhaustivo de:
- Conversaciones anteriores con chatbots
- Archivos Excel V7 y V9
- Prototipo visual JSX del tablero
- Imágenes de referencia (preview1-4.webp)
- PDF del presupuesto anual

**Objetivo del Sistema:** Crear una herramienta robusta, práctica y visualmente elegante para controlar las finanzas de la familia y de la clínica NeuroTEA de forma integrada, con alertas automáticas sobre rentabilidad y flujo de caja.

---

## 1. CONTEXTO DEL USUARIO

### Perfil
- **Usuario principal:** Marco (administrador de NeuroTEA y finanzas familiares)
- **Usuario secundario:** Clara (esposa de Marco, carga gastos familiares)
- **Moneda:** Guaraníes paraguayos (Gs.)
- **Período:** Año fiscal 2026

### Entidades Financieras
1. **FAMILIA:** Finanzas del hogar (salarios, gastos domésticos, préstamos personales)
2. **NEUROTEA:** Clínica de terapias para niños con autismo (ingresos por terapeutas, cursos, gastos operativos)

### Relación entre Entidades
- NeuroTEA paga un **Salario de Administrador** a Marco (Gs. 5.000.000/mes)
- Clara recibe **Honorarios de NeuroTEA** (Gs. 2.999.999/mes aprox)
- Cuando la familia tiene déficit, **NeuroTEA presta dinero a la Familia**
- La familia debe **devolver esos préstamos** a NeuroTEA
- El sistema debe rastrear este **balance cruzado** y alertar si hay subsidio

---

## 2. ESTRUCTURA DE HOJAS (8 PESTAÑAS)

| # | Hoja | Función | Quién la usa | Editable |
|---|------|---------|--------------|----------|
| 1 | **CONFIG** | Listas maestras, metas, parámetros globales | Marco | Sí |
| 2 | **PRESUPUESTO** | Plan anual de ingresos/gastos (excepto Ganancia NT que es calculada) | Marco | Sí (parcial) |
| 3 | **GASTOS_FIJOS** | Montos base × 12 meses + día de vencimiento | Marco | Sí |
| 4 | **CARGA_FAMILIA** | Registro cronológico de variables familiares | Clara/Marco | Sí |
| 5 | **CARGA_NT** | Registro cronológico de variables NeuroTEA | Marco | Sí |
| 6 | **MOVIMIENTO** | Real vs Presupuesto mes a mes con estados | Marco | Parcial |
| 7 | **TABLERO** | Indicadores resumidos en hoja (KPIs básicos) | Lectura | No |
| 8 | **WEB APP** | Dashboard completo visual (igual al JSX) | Ambos | No |

---

## 3. FLUJO DE DATOS

```
┌─────────────────┐     ┌─────────────────┐
│  CARGA_FAMILIA  │     │    CARGA_NT     │
│   (Variables)   │     │   (Variables)   │
└────────┬────────┘     └────────┬────────┘
         │                       │
         └───────────┬───────────┘
                     │
                     ▼
            ┌─────────────────┐
            │  GASTOS_FIJOS   │
            │(Montos mensuales)│
            └────────┬────────┘
                     │
                     ▼
┌─────────────┐    ┌──────────────┐
│ PRESUPUESTO │───►│  MOVIMIENTO  │
│   (Metas)   │    │(Real vs Plan)│
└─────────────┘    └──────┬───────┘
                          │
          ┌───────────────┼───────────────┐
          ▼               ▼               ▼
    ┌──────────┐   ┌─────────────┐   ┌─────────┐
    │ TABLERO  │   │   WEB APP   │   │ CONFIG  │
    │  (Hoja)  │   │ (Dashboard) │   │ (Listas)│
    └──────────┘   └─────────────┘   └─────────┘
```

---

## 4. DETALLE POR HOJA

### 4.1 CONFIG (Configuración)

**Propósito:** Centralizar todos los parámetros editables del sistema.

| Sección | Contenido |
|---------|-----------|
| **MESES** | Enero, Febrero, ... Diciembre |
| **ENTIDADES** | FAMILIA, NEUROTEA |
| **TIPOS INGRESO FAM** | Salario Marco, Vacaciones Marco, Aguinaldo Marco, Viático Marco, Animador Bíblico, Honorarios Clara, Préstamo NT→Familia, Contrato Colectivo, PL Itaipu |
| **TIPOS INGRESO NT** | Aporte Terapeutas, Cursos NT, Otros, Devolución Familia→NT |
| **CATEGORÍAS EGRESO FAM** | Gastos Fijos, Cuotas y Préstamos, Obligaciones Legales, Suscripciones, Variables, Ahorro |
| **CATEGORÍAS EGRESO NT** | Clínica, Sueldos y Honorarios, Telefonía e Internet, Obligaciones Legales, Eventos, Variables |
| **FRECUENCIA** | Fijo/Mensual, Fijo/Anual, Variable/Mensual, Variable/Anual |
| **ESTADOS** | Pendiente, Pagado, Cancelado |
| **CUENTAS FAMILIA** | ITAU Marco, Coop. Univ. Marco, ITAU Clara, UENO Clara, Tarjeta Solar, Tarjeta ITAU Clara, Gourmed, Efectivo |
| **CUENTAS NT** | Atlas NeuroTEA, Costos Operativos, Utilidad Dueño, Fondo Emergencia, Fondo Inversión, Caja Chica |

**Metas NeuroTEA (editables):**
- Meta Ganancia Mínima: **7%** de los ingresos
- Meta Máximo Gastos: **93%** de los ingresos
- Distribución Utilidad Dueño: **33.33%** de la ganancia
- Distribución Fondo Emergencia: **33.33%** de la ganancia
- Distribución Fondo Inversión: **33.33%** de la ganancia

---

### 4.2 PRESUPUESTO

**Propósito:** Planificar ingresos y gastos esperados para cada mes del año.

**Estructura:**
```
| CONCEPTO | TIPO | FRECUENCIA | ENE | FEB | MAR | ... | DIC | TOTAL AÑO |
```

**Secciones FAMILIA:**
- ► INGRESOS FAMILIA
- ► EGRESOS FAMILIA - GASTOS FIJOS
- ► EGRESOS FAMILIA - CUOTAS Y PRÉSTAMOS
- ► EGRESOS FAMILIA - OBLIGACIONES LEGALES
- ► EGRESOS FAMILIA - SUSCRIPCIONES
- ► EGRESOS FAMILIA - VARIABLES
- ► EGRESO - AHORRO FAMILIA
- **BALANCE FAMILIA** (Ingresos - Egresos)

**Secciones NEUROTEA:**
- ► INGRESOS NEUROTEA
- ► EGRESOS NT - CLÍNICA
- ► EGRESOS NT - SUELDOS Y HONORARIOS
- ► EGRESOS NT - TELEFONÍA E INTERNET
- ► EGRESOS NT - OBLIGACIONES LEGALES
- ► EGRESOS NT - EVENTOS
- ► EGRESOS NT - VARIABLES
- ► EGRESO - GANANCIA NEUROTEA (CALCULADO)
  - Ganancia 7% (calculado automático)
  - Utilidad al propietario (1/3)
  - Fondo de emergencia (1/3)
  - Fondo de Inversión (1/3)
- **BALANCE NEUROTEA** (Ingresos - Egresos)
- **BALANCE TOTAL CONSOLIDADO FAM/NT**

**Lógica de Ganancia NeuroTEA:**
```
GANANCIA = TOTAL INGRESOS NT - TOTAL EGRESOS NT (sin contar la ganancia)
% GANANCIA = GANANCIA / INGRESOS NT × 100
```

**Semáforo de Ganancia:**
| Condición | Color | Significado |
|-----------|-------|-------------|
| Ganancia < 0 | 🔴 ROJO | Pérdida - Acción urgente |
| 0% ≤ Ganancia < 7% | 🟡 AMARILLO | Por debajo de la meta |
| Ganancia ≥ 7% | 🟢 VERDE | Meta cumplida |

---

### 4.3 GASTOS_FIJOS

**Propósito:** Registrar montos base de gastos recurrentes que pueden variar mes a mes (ej: ANDE).

**Estructura:**
```
| CONCEPTO | ENTIDAD | TIPO | FRECUENCIA | DÍA VENC | ENE | FEB | ... | DIC |
```

**Ejemplo:**
| CONCEPTO | ENTIDAD | TIPO | FRECUENCIA | DÍA | ENE | FEB |
|----------|---------|------|------------|-----|-----|-----|
| Salario Lili | FAMILIA | Fijo | Mensual | 5 | 1.800.000 | 1.800.000 |
| ANDE Casa | FAMILIA | Variable | Mensual | 20 | 400.000 | 420.000 |
| Alquiler 1 | NT | Fijo | Mensual | 5 | 13.500.000 | 13.500.000 |
| Antivirus Clara | FAMILIA | Fijo | Anual | 1 | 0 | 0 | (solo en DIC) |

**Uso:**
- Si ANDE sube en febrero, se edita SOLO en esta hoja, columna FEB
- La hoja MOVIMIENTO lee automáticamente el valor del mes correspondiente

---

### 4.4 CARGA_FAMILIA

**Propósito:** Punto único de entrada para transacciones variables de la familia.

**Estructura:**
```
| FECHA | TIPO | CATEGORÍA | DESCRIPCIÓN | INGRESO | EGRESO | CUENTA | ESTADO | NOTAS |
```

**Características:**
- Filtro de mes para ocultar otras entradas (lista no muy larga)
- Desplegables limitados a tipos/categorías de FAMILIA solamente
- Clara puede cargar sin ver opciones de NeuroTEA

**Tipos de Ingreso (desplegable):**
- Salario Marco
- Vacaciones Marco
- Aguinaldo Marco
- Viático Marco
- Animador Bíblico Marco
- Honorarios Clara NeuroTEA
- Préstamo NT → Familia (entrada de dinero)
- Contrato Colectivo Marco
- PL Itaipu Marco

**Categorías de Egreso (desplegable cuando TIPO = "Egreso Familiar"):**
- Supermercado
- Combustible
- Farmacia
- Recreación
- Ropa/Vestidos
- Salud y Medicamentos
- Gastos no identificados
- Devolución Familia → NT (salida de dinero)

**Resumen automático del mes:**
- Total Ingresos
- Total Egresos
- Balance del mes

---

### 4.5 CARGA_NT (NeuroTEA)

**Propósito:** Punto único de entrada para transacciones variables de la clínica.

**Estructura:** Igual que CARGA_FAMILIA

**Tipos de Ingreso (desplegable):**
- Aporte Terapeutas
- Cursos NeuroTEA
- Otros Ingresos
- Devolución Familia → NT (entrada de dinero)

**Categorías de Egreso (desplegable cuando TIPO = "Egreso NT"):**
- Insumos y Papelería
- Reparaciones Clínica
- Gastos Cursos
- Gastos Varios (Cumple, tortas, etc.)
- Préstamo NT → Familia (salida de dinero)

---

### 4.6 MOVIMIENTO

**Propósito:** Consolidar y comparar Presupuesto vs Real mes a mes.

**Diseño:** Vista lado a lado FAMILIA | NEUROTEA

**Estructura por columna:**
```
| CONCEPTO | TIPO | FRECUENCIA | PRESUPUESTO | REAL | DIFERENCIA | % | ESTADO |
```

**Selector de mes:** Desplegable que cambia toda la vista

**Lógica de datos REAL:**
- Si es **Fijo/Mensual o Fijo/Anual** → Jala de GASTOS_FIJOS (columna del mes)
- Si es **Variable** → SUMA de CARGA_FAMILIA o CARGA_NT filtrado por mes

**Estados (solo para Fijos):**
- **Pendiente:** No pagado aún
- **Pagado:** Contabilizado en "Egresos Pagados"
- **Cancelado:** No se pagará (ej: anulado)

**Contabilización:**
- Al marcar "Pagado": Se SUMA a Egresos Pagados Y se RESTA de Egresos Pendientes

**Indicadores visuales:**
- ✅ Verde: Real ≤ Presupuesto (gastos) o Real ≥ Presupuesto (ingresos)
- ⚠️ Amarillo: Desvío menor al 10%
- ❌ Rojo: Desvío mayor al 10% o pérdida

**Sección GANANCIA NT (calculada):**
```
GANANCIA NT = Total Ingresos NT - Total Egresos NT
% GANANCIA = GANANCIA / INGRESOS × 100
Utilidad (1/3) = GANANCIA × 33.33%
Fondo Emergencia (1/3) = GANANCIA × 33.33%
Fondo Inversión (1/3) = GANANCIA × 33.33%
```

---

### 4.7 TABLERO (Hoja de resumen)

**Propósito:** KPIs básicos visibles sin abrir Web App.

**Contenido:**
```
┌─────────────────────────────────────────────────────────────────┐
│ 📊 RESUMEN RÁPIDO - [MES: ▼ Enero 2026]                        │
├─────────────────────────────────────────────────────────────────┤
│   FAMILIA          │    NEUROTEA         │   PRÉSTAMOS         │
├──────────────────────┼──────────────────────┼───────────────────┤
│ Balance: -291.000 ❌ │ Ganancia: 9% 🟢      │ NT→Fam: 3.000.000 │
│ Pendientes: 5        │ Utilidad: 900.000    │ Fam→NT: 0         │
│ Atrasados: 2 ⚠️     │ Fdo.Emerg: 900.000   │ Saldo: 3.000.000  │
└──────────────────────┴──────────────────────┴───────────────────┘
```

---

### 4.8 WEB APP (Dashboard Completo)

**Propósito:** Visualización elegante en tiempo real, idéntica al prototipo JSX.

**Acceso:** Menú → 💰 Control Financiero → 📊 Abrir Tablero Web

**Abre en:** Ventana emergente del navegador

**Actualización:** Automática cada 60 segundos

---

## 5. DISEÑO VISUAL DEL TABLERO WEB APP

### 5.1 Layout General

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 📊 TABLERO DE CONTROL FINANCIERO    [Mes: ▼ Enero 2026]    Hoy: 29/12/2025 │
├─────────────────────────────────────┬───────────────────────────────────────┤
│                                     │                                       │
│         🏠 FAMILIA                  │           🏥 NEUROTEA                │
│         (Verde esmeralda)           │           (Azul intenso)             │
│                                     │                                       │
├─────────────────────────────────────┼───────────────────────────────────────┤
│                                     │                                       │
│  💰 SALDOS EN CUENTAS              │  🎯 INDICADORES DE METAS              │
│  ┌────────────────────────────┐    │  ┌─────────────────────────────────┐  │
│  │ Cuenta    │Esperado│Real  │    │  │ Ingresos: 30.000.000            │  │
│  │ ITAU Marco│2.500.000│2.350.000│  │  │ Gastos:   27.300.000            │  │
│  │ ...       │...      │...   │    │  │ Ganancia: 2.700.000  META 7%    │  │
│  └────────────────────────────┘    │  │ ████████████████░░░ 91%/93%máx │  │
│                                     │  │ ✅ META CUMPLIDA - Superávit    │  │
│  📋 PRESUPUESTO vs REAL            │  └─────────────────────────────────┘  │
│  ┌────────────────────────────┐    │                                       │
│  │ Categoría   │Presup│Real│%│    │  💰 DISTRIBUCIÓN GANANCIA (7%)        │
│  │ ► INGRESOS  │15.2M │14.5M│95%│  │  ┌─────────┬─────────┬─────────┐    │
│  │ ► GASTOS FIJOS│7.2M│7.1M│98%│   │  │Utilidad │Fdo.Emerg│Fdo.Inv. │    │
│  │ ► CUOTAS   │5.5M │5.5M│100%│    │  │ 700.000 │ 700.000 │ 700.000 │    │
│  │ ► VARIABLES│900K│1.25M│139%❌│   │  │ ✓580.000│ ✓700.000│ ⚠420.000│    │
│  │ BALANCE    │39K  │-291K│❌ │    │  └─────────┴─────────┴─────────┘    │
│  └────────────────────────────┘    │                                       │
│                                     │  📋 PRESUPUESTO vs REAL              │
│  💵 FLUJO DEL MES                  │  (Similar a Familia)                  │
│  ┌────────────────────────────┐    │                                       │
│  │ Ingresos:     + 14.500.000 │    │  💵 FLUJO DEL MES                    │
│  │ Pagados:      - 12.450.000 │    │  (Similar a Familia)                  │
│  │ Pendientes:   -  2.341.000 │    │                                       │
│  │ BALANCE:        2.050.000  │    │                                       │
│  └────────────────────────────┘    │                                       │
│                                     │                                       │
│  📅 LIQUIDEZ - PRÓXIMOS PAGOS      │  📅 LIQUIDEZ - PRÓXIMOS PAGOS        │
│  ┌────────────────────────────┐    │  ┌─────────────────────────────────┐  │
│  │ Concepto   │Cuotas│Monto│Saldo│  │  │ (Similar estructura)            │  │
│  │ Caja disp. │ -    │ -   │2.35M│  │  │ Atrasados: 0  ✅ OK             │  │
│  │ ⚠Atrasados│ 2    │-850K│1.5M │  │  │ Esta semana: 2 → 4.370.000     │  │
│  │ Esta semana│ 4    │-2.1M│-600K│  │  │ ...                             │  │
│  │ Próx.seman│ 3    │-1.8M│-2.4M│  │  └─────────────────────────────────┘  │
│  │ 3ra semana│ 2    │-1.2M│-3.6M│  │                                       │
│  │ SALDO FINAL│ 11   │-5.9M│❌  │  │  📊 DISTRIBUCIÓN DE GASTOS          │
│  └────────────────────────────┘    │  ┌─────────────────────────────────┐  │
│                                     │  │    (Gráfico Torta/Donut)        │  │
│  📊 DISTRIBUCIÓN DE GASTOS         │  │  ● Clínica 58%                   │  │
│  ┌────────────────────────────┐    │  │  ● Sueldos 32%                   │  │
│  │    (Gráfico Torta/Donut)   │    │  │  ● Obligaciones 8%               │  │
│  │  ● Gastos Fijos 48%        │    │  │  ● Tel/Internet/Var 2%           │  │
│  │  ● Cuotas 37%              │    │  └─────────────────────────────────┘  │
│  │  ● Variables 8%            │    │                                       │
│  │  ● Suscripciones 4%        │    │                                       │
│  │  ● Obligaciones 3%         │    │                                       │
│  └────────────────────────────┘    │                                       │
│                                     │                                       │
├─────────────────────────────────────┴───────────────────────────────────────┤
│                                                                             │
│                 🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA                     │
│                                                                             │
│  ┌─────────────────────────────────┬───────────────────────────────────────┐│
│  │ Concepto          │Este Mes│Año │         ⚠️ NT SUBSIDIA A FAMILIA     ││
│  │ Préstamo NT→Fam   │3.000.000│8.5M│                                      ││
│  │ Devolución Fam→NT │    0   │2.0M│         Gs. 6.500.000                ││
│  │ SALDO NETO        │3.000.000│6.5M│                                      ││
│  └─────────────────────────────────┘  El salario de administrador          ││
│                                       (Gs. 5.000.000) no está cubriendo    ││
│                                       los gastos familiares.               ││
│                                       Déficit mensual promedio: 2.166.667  ││
└─────────────────────────────────────────────────────────────────────────────┘
```

---

### 5.2 Colores del Sistema

| Uso | Color | Código Hex |
|-----|-------|------------|
| Familia (principal) | Verde esmeralda | #059669 |
| Familia (fondo claro) | Verde pastel | #dcfce7 |
| NeuroTEA (principal) | Azul intenso | #1d4ed8 |
| NeuroTEA (fondo claro) | Azul pastel | #dbeafe |
| Balance Cruzado | Púrpura | #7c3aed |
| Alerta/Pérdida | Rojo | #dc2626 |
| Advertencia | Amarillo/Naranja | #f59e0b |
| Cumplimiento/OK | Verde claro | #22c55e |
| Textos | Gris oscuro | #1f2937 |
| Fondos | Gris muy claro | #f3f4f6 |

---

### 5.3 Alertas Automáticas

| Situación | Tipo | Mensaje |
|-----------|------|---------|
| Ganancia NT < 0 | 🔴 Crítico | "PÉRDIDA - Gastos superan ingresos" |
| 0% ≤ Ganancia NT < 7% | 🟡 Advertencia | "BAJO META - Rentabilidad inferior al 7%" |
| Ganancia NT ≥ 7% | 🟢 OK | "META CUMPLIDA - Superávit: Gs. X" |
| Pagos atrasados > 0 | 🔴 Crítico | "X pagos ATRASADOS por Gs. Y" |
| Saldo semana < 0 | 🟡 Advertencia | "FALTA liquidez para esta semana" |
| NT subsidia a Familia | 🔴 Crítico | "NT SUBSIDIA A FAMILIA - Deuda: Gs. X" |
| Familia subsidia a NT | 🟡 Info | "FAMILIA SUBSIDIA A NT - Préstamo: Gs. X" |
| Balance equilibrado | 🟢 OK | "FINANZAS EQUILIBRADAS" |

---

## 6. LÓGICA DEL BALANCE CRUZADO NT ↔ FAMILIA

### Flujo de Préstamos

**Cuando NeuroTEA presta a Familia:**
- En CARGA_NT: Tipo = "Préstamo NT → Familia" → columna EGRESO
- En CARGA_FAMILIA: Tipo = "Préstamo NT → Familia" → columna INGRESO

**Cuando Familia devuelve a NeuroTEA:**
- En CARGA_FAMILIA: Categoría = "Devolución Familia → NT" → columna EGRESO
- En CARGA_NT: Tipo = "Devolución Familia → NT" → columna INGRESO

### Cálculo del Saldo

```
SALDO NETO = Préstamos NT→Fam - Devoluciones Fam→NT

Si SALDO > 0 → NT SUBSIDIA A FAMILIA (Familia debe a NT)
Si SALDO < 0 → FAMILIA SUBSIDIA A NT (NT debe a Familia)
Si SALDO = 0 → FINANZAS EQUILIBRADAS
```

---

## 7. CÁLCULO DE LIQUIDEZ (3 SEMANAS)

### Datos necesarios
- **Caja disponible:** Saldo actual de cuentas bancarias + efectivo
- **Día de vencimiento:** De cada gasto en GASTOS_FIJOS
- **Fecha actual:** Para calcular semanas

### Lógica por período

| Período | Condición | Cálculo |
|---------|-----------|---------|
| Atrasados | DÍA_VENC < HOY y ESTADO = "Pendiente" | SUMA de montos |
| Esta semana | HOY ≤ DÍA_VENC ≤ HOY+7 | SUMA de montos |
| Próxima semana | HOY+7 < DÍA_VENC ≤ HOY+14 | SUMA de montos |
| 3ra semana | HOY+14 < DÍA_VENC ≤ HOY+21 | SUMA de montos |

### Saldo corrido

```
Saldo inicial = Caja disponible
Saldo tras atrasados = Saldo inicial - Atrasados
Saldo tras esta semana = Saldo tras atrasados - Esta semana
Saldo tras próx. semana = Saldo tras esta semana - Próxima semana
Saldo final = Saldo tras próx. semana - 3ra semana
```

### Estados

| Saldo | Estado | Color |
|-------|--------|-------|
| ≥ 0 | ALCANZA / OK | 🟢 Verde |
| < 0 | FALTA / DÉFICIT | 🔴 Rojo |

---

## 8. ITEMS DEL PRESUPUESTO (COMPLETO)

### FAMILIA - INGRESOS
1. Salario Marco
2. Salario Marco NeuroTEA (si aplica)
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

### FAMILIA - GASTOS FIJOS
1. Salario Lili Doméstico
2. Salario Laura Doméstico
3. Escuela Fabián y Brenda
4. Robótica Niños
5. ANDE Casa
6. Expensa Casa
7. Ña Luisa
8. Remedio Lochi
9. Seguro Médico Papá y Mamá
10. Contadora Marco

### FAMILIA - CUOTAS Y PRÉSTAMOS
1. Préstamo Lizzi
2. Cajubi Marco
3. Mutual Marco
4. Seguro Auto Laura ITAU
5. Cuota ITAU (variable mensual)
6. Auto Laura Cuota
7. Coop. Universitaria Clara
8. Coomecipar Clara
9. Solar Préstamo 1
10. Solar Préstamo 2
11. Show Congelador
12. Pago Mínimo Tarj. Crédito ITAU Clara
13. Pago Mínimo Tarj. Crédito ITAU Marco
14. Pago Mínimo Tarj. Crédito Solar Clara
15. Pago Mínimo Tarj. Crédito Comecipar Clara

### FAMILIA - OBLIGACIONES LEGALES
1. Aporte IPS
2. Aporte Cajubi
3. Aporte STEIBI
4. Aporte SICHAP
5. Impuesto compra digital
6. Aporte y Solidaridad Coop. Univer. Clara
7. Aporte y Solidaridad Coop. Univer. Marco
8. Impuesto a la Renta personal
9. Impuesto del terreno casa

### FAMILIA - SUSCRIPCIONES
1. Giganet
2. Tigo Clara
3. Tigo Familiar
4. Google One
5. ChatGPT
6. Claude Marco
7. Claude Clara
8. Antivirus Clara (Anual)
9. Antivirus Marco (Anual)
10. Microsoft Office Clara (Anual)
11. Microsoft Office Marco (Anual)
12. PosterWall
13. Canva (Anual)
14. Scribd
15. iLovePDF

### FAMILIA - VARIABLES
1. Supermercado
2. Combustible
3. Mantenimiento/Reparaciones Auto Clara
4. Mantenimiento/Reparaciones Auto Niños
5. Mantenimiento/Reparaciones Camioneta Marco
6. Ropa/Vestidos
7. Recreación (Pizza, hamburguesa, helados, etc.)
8. Salud y Medicamentos
9. Gastos no identificados

### FAMILIA - AHORRO
1. Ahorro Clara
2. Ahorro Marco

---

### NEUROTEA - INGRESOS
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros

### NEUROTEA - CLÍNICA
1. Alquiler 1 (Principal)
2. Alquiler 2 (Secundario)
3. ANDE clínica

### NEUROTEA - SUELDOS Y HONORARIOS
1. Sueldo Aracely
2. Sueldo Fátima
3. Limpieza NeuroTEA
4. Honorario Contador
5. Salario Administrador (Marco)
6. Honorario Mant. Sistema

### NEUROTEA - TELEFONÍA E INTERNET
1. Celular Tigo NeuroTEA
2. Celular Tigo Sistema
3. WhatsFlow
4. Internet NeuroTEA

### NEUROTEA - OBLIGACIONES LEGALES
1. IVA
2. IPS
3. Ministerio de Salud
4. Mora de Alquiler

### NEUROTEA - EVENTOS
1. Día del Niño
2. San Juan
3. Día del Autismo
4. Clausura Padres
5. Navidad Papá Noel
6. Cena Fin de Año

### NEUROTEA - VARIABLES
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple (Tortas, bocaditos, meriendas)

### NEUROTEA - GANANCIA (CALCULADO)
1. Ganancia 7% (automático)
2. Utilidad al propietario (1/3 automático)
3. Fondo de emergencia (1/3 automático)
4. Fondo de Inversión (1/3 automático)

---

## 9. REGLAS DE NEGOCIO CRÍTICAS

### 9.1 Validaciones de Datos
- Fechas en formato DD/MM/AAAA
- Montos siempre positivos (el tipo determina si suma o resta)
- Estado obligatorio para gastos fijos
- No permitir categoría si el tipo es ingreso (automático)

### 9.2 Integridad Referencial
- Todo concepto en MOVIMIENTO debe existir en PRESUPUESTO
- Todo tipo en CARGA debe existir en CONFIG
- Toda categoría en CARGA debe existir en CONFIG

### 9.3 Cálculos Automáticos
- Ganancia NT = Ingresos NT - Egresos NT (sin ganancia)
- % Ganancia = Ganancia / Ingresos × 100
- Distribución de fondos = Ganancia × 33.33% cada uno
- Saldo neto préstamos = Préstamos NT→Fam - Devoluciones Fam→NT
- Liquidez = Caja - Atrasados - Esta semana - Próx. semana - 3ra semana

### 9.4 Protecciones
- Celdas de fórmulas protegidas contra edición accidental
- Hojas de solo lectura: TABLERO, MOVIMIENTO (parcial)
- Validación de datos con desplegables para evitar errores de tipeo

---

## 10. FLUJO DE TRABAJO DIARIO

### Usuario: Clara (Familia)
1. Abrir hoja **CARGA_FAMILIA**
2. Seleccionar el mes en el filtro
3. Registrar gastos/ingresos del día
4. Verificar resumen del mes

### Usuario: Marco (NeuroTEA + Supervisión)
1. Abrir hoja **CARGA_NT**
2. Registrar transacciones de la clínica
3. Ir a **MOVIMIENTO** → Cambiar estados a "Pagado" cuando corresponda
4. Revisar **TABLERO** o abrir **WEB APP** para ver indicadores
5. Verificar alertas y tomar acciones si hay rojo

### Cierre Mensual
1. Verificar que todos los gastos fijos estén en "Pagado" o "Cancelado"
2. Revisar balance final del mes en MOVIMIENTO
3. Analizar indicadores de ganancia y fondos en TABLERO
4. Actualizar GASTOS_FIJOS si hay cambios para el próximo mes

---

## 11. TECNOLOGÍA DE IMPLEMENTACIÓN

### Plataforma
- **Google Sheets** (planilla principal)
- **Google Apps Script** (automatizaciones + Web App)
- **HTML/CSS/JavaScript** (dashboard web)

### Archivos del Proyecto
1. `Codigo.gs` - Código principal Apps Script
2. `Tablero.html` - Dashboard web visual

### Funciones Principales
- `crearSistemaCompleto()` - Genera todas las hojas
- `actualizarMovimiento()` - Recalcula datos del mes
- `doGet()` - Sirve el Web App
- `obtenerDatosTablero()` - API para el dashboard
- `onOpen()` - Menú personalizado

### Despliegue Web App
- Implementar → Nueva implementación → Aplicación web
- Ejecutar como: Usuario propietario
- Acceso: Cualquier persona (o restringido)

---

## 12. PRÓXIMOS PASOS PARA IMPLEMENTACIÓN

1. **Crear Google Sheet nuevo** llamado "Control Financiero 2026"
2. **Abrir Apps Script** (Extensiones → Apps Script)
3. **Pegar código** de `Codigo.gs`
4. **Crear archivo HTML** llamado `Tablero`
5. **Pegar código** del dashboard HTML
6. **Ejecutar** `crearSistemaCompleto()`
7. **Implementar Web App**
8. **Cargar datos iniciales** en PRESUPUESTO y GASTOS_FIJOS
9. **Probar flujo** con datos de prueba
10. **Ajustar** según feedback

---

## 13. CONCLUSIÓN

Este plan maestro representa la interpretación completa del proyecto de Control Financiero 2026 basado en:

- Las necesidades expresadas en múltiples conversaciones
- El diseño visual del prototipo JSX
- La estructura de datos del Excel existente
- Las reglas de negocio específicas de NeuroTEA y Familia

El sistema está diseñado para ser:
- **Robusto:** Validaciones y protecciones contra errores
- **Práctico:** Pocas hojas, entrada de datos simplificada
- **Visual:** Dashboard moderno con alertas intuitivas
- **Flexible:** Parámetros editables en CONFIG

---

*Documento generado el 30 de diciembre de 2025*
*Versión: 1.0 - Plan Maestro*
