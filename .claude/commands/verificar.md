# Verificar Sistema de Control Financiero

Realiza una verificación COMPLETA del sistema comparando el código contra CLAUDE.md y PLAN_MAESTRO.

## 1. Verificar Arquitectura de Archivos

Confirma que existen estos 6 archivos en `gs/`:
- Code.gs (menú, triggers, inicialización)
- Config.gs (datos maestros, cuentas, categorías, colores)
- Sheets.gs (creación de las 8 hojas)
- Tablero.gs (dashboard en Google Sheets)
- WebApp.gs (dashboard HTML popup)
- Utils.gs (funciones utilitarias)

## 2. Verificar Config.gs

### Tipos de Ingreso FAMILIA (14 items)
1-14: Salario Marco, Salario Marco NeuroTEA, Vacaciones, Aguinalos, Viático, Animador Bíblico, Gourmed, Contrato Colectivo, PL Itaipu, Honorarios Clara, Préstamo NeuroTEA, **Devolución NeuroTEA**, Préstamo Otros Bancos

### Tipos de Ingreso NT (5 items)
1-5: Aporte Terapeutas, Cursos, Otros, Devolución Familia → NT, **Préstamo Familia**

### Cuentas FAMILIA (10 items)
ITAU Marco, Coop. Univ. Marco, ITAU Clara, UENO Clara, Tarjeta Solar Clara, Tarjeta ITAU Clara, **Tarjeta ITAU Marco**, Tarjeta Comecipar Clara, Gourmed, Efectivo

### Cuentas NT (2 items)
1. Atlas NeuroTEA
2. Caja Chica NT

### Categorías Egreso FAMILIA (6)
GASTOS FIJOS, CUOTAS Y PRÉSTAMOS, OBLIGACIONES LEGALES, SUSCRIPCIONES, VARIABLES, AHORRO

### Categorías Egreso NT (6)
CLÍNICA, SUELDOS Y HONORARIOS, TELEFONÍA E INTERNET, OBLIGACIONES LEGALES, EVENTOS, VARIABLES

### Subcategorías Variables FAMILIA (11 items)
Incluye "Devolución Familia → NT" y "Préstamo Familia → NT"

### Subcategorías Variables NT (7 items)
Incluye "Préstamo NT → Familia" y "Devolución NT → Familia"

### Eventos NT (16)
6 definidos + 10 reservas

### AHORRO FAMILIA (3 items)
Ahorro Clara, Ahorro Marco, Fondo de Emergencia

## 3. Verificar Estructura de Columnas

### GASTOS_FIJOS (sin BASE)
| Col | Contenido |
|-----|-----------|
| A | CONCEPTO |
| B | ENTIDAD |
| C | CATEGORÍA |
| D | FRECUENCIA |
| E | DÍA |
| F | CUENTA |
| G-R | ENE-DIC (12 meses) |

### MOVIMIENTO (14 columnas)
| Col | Contenido |
|-----|-----------|
| A | CONCEPTO |
| B | TIPO |
| C | FREC. |
| D | DÍA |
| E | PRESUPUESTO |
| F | REAL |
| G | DIFERENCIA |
| H | % |
| I | ESTADO |
| J | EST. PAGO |
| K | 🚦 |
| L | CATEGORÍA (oculta) |
| M | ENTIDAD (oculta) |
| N | MES_NUM (oculta) |

## 4. Verificar Rangos de Filas en MOVIMIENTO

**CRÍTICO - Verificar que las fórmulas en Tablero.gs usen los rangos correctos:**

| Entidad | Rango Correcto | Verificar |
|---------|----------------|-----------|
| FAMILIA | 9-113 | Fórmulas para indicadores FAMILIA |
| NEUROTEA | 119-200 | Fórmulas para indicadores NEUROTEA |

⚠️ **ERROR COMÚN**: Las fórmulas de NEUROTEA NO deben usar rango 73-150 (eso incluye FAMILIA)

## 5. Verificar Lógica de Negocio

### Metas NeuroTEA
- Ganancia mínima: 7%
- Máximo gastos: 93%
- Distribución: 33.33% Utilidad, 33.33% Emergencia, 33.34% Inversión
- Fondos son VIRTUALES (asignación contable, no cuentas bancarias)

### Balance Cruzado Bidireccional
- **NT → FAM**: Préstamo NT → Familia, Devolución Familia → NT
- **FAM → NT**: Préstamo Familia → NT, Devolución NT → Familia
- Balance Neto = Deuda FAM - Deuda NT

### Sistema Anti-Burro
- Ingreso → deshabilita CATEGORÍA y SUBCATEGORÍA
- CATEGORÍA ≠ VARIABLES/EVENTOS/AHORRO → deshabilita SUBCATEGORÍA
- CATEGORÍA = EVENTOS → lista de 16 eventos
- CATEGORÍA = VARIABLES → lista de subcategorías
- CATEGORÍA = AHORRO → lista de 3 items (Clara, Marco, Fondo)

### EST. PAGO como Gatillo
- **De CARGA**: Fijo ("Recibido", "Pagado", "Ahorrado")
- **De GASTOS_FIJOS**: Dropdown (Pendiente/Pagado/Cancelado)

## 6. Verificar Visualización AHORRO

- **GASTOS OPERATIVOS**: Solo EST.PAGO = "Pagado" (sin incluir "Ahorrado")
- **AHORRO**: Mostrado separadamente
- **DISPONIBLE**: INGRESOS - GASTOS - AHORRO
- **PATRIMONIO FAMILIA**: INGRESOS - GASTOS (incluye ahorros)

## 7. Verificar Colores (Estilo Sobrio v6.1)

| Uso | Hex |
|-----|-----|
| Headers | #1f2937 (gris oscuro) |
| Fondo principal | #f9fafb |
| Fondo alternado | #ffffff |
| Subtotales | #e5e7eb |
| Bordes | #d1d5db |
| OK/Verde | #22c55e |
| Alerta/Rojo | #dc2626 |
| Advertencia/Amarillo | #f59e0b |
| Ingreso/Azul | #3b82f6 |

## 8. Reportar

Lista todas las inconsistencias encontradas con:
- Archivo afectado
- Línea o sección
- Valor esperado vs valor encontrado
- Sugerencia de corrección

Si todo está correcto, confirma: "✅ Sistema verificado - Sin inconsistencias"
