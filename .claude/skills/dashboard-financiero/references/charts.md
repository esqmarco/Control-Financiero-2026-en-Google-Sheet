# Tipos de Graficos - Dashboard Financiero v3.0

> Libreria: Chart.js via CDN. Todos los graficos incluyen descripcion interpretativa.

## Graficos FAMILIA

### 1. Balance Mensual (Combo: bar + line)
- **Tipo Chart.js**: bar + line en mismo canvas
- **Datos**: Ingresos (barras azules), Egresos (barras rojas), Ahorro (linea verde)
- **Eje X**: 12 meses (ENE-DIC)
- **Eje Y**: Guaranies
- **Interpretacion**: Barras muestran flujo mensual, linea muestra tendencia de ahorro

### 2. Ahorro Acumulado (Line)
- **Tipo Chart.js**: line con area fill
- **Datos**: 3 lineas - Ahorro Clara, Ahorro Marco, Fondo Emergencia (acumulados)
- **Colores**: #3b82f6 (Clara), #22c55e (Marco), #f59e0b (Fondo)
- **Interpretacion**: Lineas ascendentes = ahorro creciente. Mesetas = meses sin ahorro

### 3. Gastos por Categoria (Donut)
- **Tipo Chart.js**: doughnut (cutout: 60%)
- **Datos**: % de egresos pagados por categoria (GASTOS FIJOS, CUOTAS, OBLIGACIONES, SUSCRIPCIONES, VARIABLES)
- **Colores**: Paleta distinguible por categoria
- **Interpretacion**: Segmentos grandes = categorias con mayor peso en el gasto total

### 4. Composicion Egresos (Horizontal Bar)
- **Tipo Chart.js**: bar horizontal (indexAxis: 'y')
- **Datos**: Monto en Gs. por cada categoria de egreso
- **Interpretacion**: Barras largas = categorias mas costosas. Complementa el donut con valores absolutos

### 5. % Gastos vs Ingresos (Bar)
- **Tipo Chart.js**: bar
- **Datos**: Porcentaje mensual de egresos sobre ingresos
- **Linea de referencia**: 100% (horizontal dashed)
- **Colores**: Verde si < 100%, Rojo si >= 100%
- **Interpretacion**: Barras bajo 100% = meses con superavit. Sobre 100% = deficit

### 6. Subcategorias Variables (Donut)
- **Tipo Chart.js**: doughnut
- **Datos**: Desglose de gastos VARIABLES del mes actual (Supermercado, Combustible, etc.)
- **Interpretacion**: Identifica donde se va el gasto variable. Solo muestra subcategorias con monto > 0

### 7. Presupuesto vs Ejecucion (Area)
- **Tipo Chart.js**: line con area fill
- **Datos**: 2 lineas - Presupuesto acumulado vs Ejecucion acumulada (12 meses)
- **Colores**: Gris (presupuesto), Azul (ejecucion)
- **Interpretacion**: Si ejecucion esta sobre presupuesto = sobreejecutado. Debajo = subejecucion

### 8. Flujo entre Entidades (Bar)
- **Tipo Chart.js**: bar
- **Datos**: Prestamos NT→FAM vs FAM→NT por mes
- **Colores**: #3b82f6 (NT→FAM), #ef4444 (FAM→NT)
- **Interpretacion**: Barras muestran transferencias mensuales entre entidades

## Graficos NEUROTEA

### 1. Estado de Resultados (Combo: bar + line)
- **Tipo Chart.js**: bar + line con eje Y secundario
- **Datos**: Ingresos (barras azules), Egresos (barras rojas), % Ganancia (linea verde), Meta 7% (linea punteada)
- **Interpretacion**: Barras muestran flujo, linea muestra rentabilidad. Linea sobre meta = mes rentable

### 2. Ganancia Acumulada (Line)
- **Tipo Chart.js**: line con area fill
- **Datos**: Ganancia acumulada mes a mes
- **Color**: Verde #22c55e (positiva), Rojo #dc2626 (negativa)
- **Interpretacion**: Linea ascendente = ganancia creciente. Puntos bajo 0 = acumulado negativo

### 3. Gastos por Categoria (Donut)
- **Tipo Chart.js**: doughnut (cutout: 60%)
- **Datos**: % de egresos pagados por categoria (CLINICA, SUELDOS, TELEFONIA, OBLIGACIONES, EVENTOS, VARIABLES)
- **Interpretacion**: Segmentos grandes = categorias con mayor peso

### 4. Composicion Egresos (Horizontal Bar)
- **Tipo Chart.js**: bar horizontal (indexAxis: 'y')
- **Datos**: Monto en Gs. por categoria
- **Interpretacion**: Valores absolutos complementan el donut

### 5. Evolucion % Ganancia (Line + Meta)
- **Tipo Chart.js**: line
- **Datos**: % ganancia mensual + linea horizontal de meta (7%)
- **Colores**: #22c55e (ganancia), #f59e0b dashed (meta)
- **Interpretacion**: Meses sobre la linea meta = meta cumplida. Debajo = no cumplida

### 6. Distribucion Ganancia (Column)
- **Tipo Chart.js**: bar (grouped)
- **Datos**: 3 fondos (Propietario, Emergencia, Inversion) - Meta (1/3 cada uno) vs Real
- **Colores**: Gris claro (meta), Color del fondo (real)
- **Interpretacion**: Si real >= meta, el fondo esta bien capitalizado

### 7. Presupuesto vs Ejecucion (Area)
- **Tipo Chart.js**: line con area fill
- **Datos**: Presupuesto acumulado vs Ejecucion acumulada
- **Interpretacion**: Igual que FAMILIA - sobre/sub ejecucion

### 8. Flujo entre Entidades (Bar)
- **Mismo que FAMILIA** - Prestamos NT↔FAM mensuales

## Seccion Flujo entre Entidades

### Diagrama SVG
- Layout vertical: NT arriba, FAM abajo
- Flechas bidireccionales con etiquetas de monto
- Color NT→FAM: #3b82f6 (azul), FAM→NT: #ef4444 (rojo)
- IDs unicos por instancia (suffix con chartId)

### Alert Box
- Verde si EQUILIBRADO
- Rojo si FAMILIA DEBE A NT
- Amarillo si NT DEBE A FAMILIA

### Tabla Detallada
| Columna | Descripcion |
|---------|-------------|
| Concepto | Prestamos/Devoluciones por direccion |
| Mes Actual | Monto del mes seleccionado |
| Acumulado | Monto acumulado anual |

## KPI Cards

### Formato
- Border-left 4px con color segun tipo:
  - Azul `#3b82f6`: Ingresos
  - Rojo `#ef4444`: Egresos
  - Verde `#22c55e`: Positivo (disponible, ganancia, ahorro)
  - Amber `#f59e0b`: Pendiente/advertencia
- Valor principal en formato `Gs. X.XXX.XXX`
- Label descriptivo debajo

### Layout
- CSS Grid: 4 columnas en desktop, responsive
- Gap: 16px entre cards

## Tabla de Saldos por Cuenta

### FAMILIA (10 cuentas)
| Columna | Descripcion |
|---------|-------------|
| Cuenta | Nombre de la cuenta bancaria |
| Saldo Inicial | Desde CONFIG (por mes) |
| Esperado | Calculado: Inicial + Ingresos - Egresos - Ahorro |
| Saldo Banco | Editable: saldo real verificado en banco |
| Diferencia | Esperado - Banco |

### NEUROTEA (2 cuentas)
| Columna | Descripcion |
|---------|-------------|
| Cuenta | Atlas NeuroTEA / UENO Marco |
| Esperado | Calculado desde TABLERO |

## Notas de Implementacion

- **Chart.js via CDN**: `https://cdn.jsdelivr.net/npm/chart.js` (cargado en `<script>`)
- **ES5 compatible**: No usar template literals ni const/let en WebApp.gs
- **Destroy/Recreate**: Llamar `chart.destroy()` antes de crear nuevo chart en mismo canvas
- **Formato numeros**: Siempre `Gs. X.XXX.XXX` (puntos como separador de miles)
- **Responsive**: CSS Grid con media queries
- **Descripcion interpretativa**: Cada chart card tiene `<p class="desc">` con guia de lectura
