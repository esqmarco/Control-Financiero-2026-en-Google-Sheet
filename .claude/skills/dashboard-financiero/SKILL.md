# Skill: Dashboard Financiero

## Descripcion

Este skill permite generar y mantener el Dashboard Financiero del Sistema de Control Financiero 2026. El dashboard v3.0 presenta dashboards separados para FAMILIA y NEUROTEA con Chart.js, incluyendo KPIs, graficos interactivos con guias de interpretacion, y flujo de dinero entre entidades.

## Contexto

- **Proyecto**: Control Financiero 2026 en Google Sheets con Apps Script
- **Entidades**: FAMILIA (finanzas del hogar) y NEUROTEA (clinica de terapia)
- **Moneda**: Guaranies paraguayos (Gs.)
- **Locale**: Espanol Paraguay (separador miles: punto, decimal: coma, argumentos formulas: punto y coma)
- **Libreria graficos**: Chart.js via CDN (v3.0, reemplaza Google Charts)

## Archivos Relacionados

| Archivo | Funcion |
|---------|---------|
| `gs/WebApp.gs` | Dashboard HTML/Chart.js separado FAMILIA/NEUROTEA (v3.0) |
| `gs/Tablero.gs` | Dashboard en Google Sheets (formulas dinamicas) |
| `gs/Config.gs` | Datos maestros, cuentas, categorias, colores |
| `gs/Code.gs` | Menu principal, abrirDashboard(), doGet() |
| `gs/Sheets.gs` | Creacion de las 8 hojas principales |

## Arquitectura Dashboard v3.0

### Tabs
- **FAMILIA**: 8 graficos + seccion flujo entre entidades
- **NEUROTEA**: 8 graficos + seccion flujo entre entidades
- Charts se destruyen y recrean al cambiar tab (destroy/recreate pattern)

### Graficos FAMILIA
1. Balance Mensual (combo bar+line)
2. Ahorro Acumulado (line)
3. Gastos por Categoria (donut)
4. Composicion Egresos (horizontal bar)
5. % Gastos vs Ingresos (bar)
6. Subcategorias Variables (donut)
7. Presupuesto vs Ejecucion (area)
8. Flujo entre Entidades (bar)

### Graficos NEUROTEA
1. Estado de Resultados (combo con linea % ganancia + meta 7%)
2. Ganancia Acumulada (line)
3. Gastos por Categoria (donut)
4. Composicion Egresos (horizontal bar)
5. Evolucion % Ganancia (line + meta)
6. Distribucion Ganancia (column: meta vs real)
7. Presupuesto vs Ejecucion (area)
8. Flujo entre Entidades (bar)

### Seccion Flujo entre Entidades (comun en ambos tabs)
- Diagrama SVG vertical con flechas bidireccionales NT<->FAM
- Alert box con estado del balance
- Tabla detallada de prestamos/devoluciones
- Grafico de barras: flujo mensual (12 meses)

## KPIs del Dashboard

### FAMILIA
- Ingresos del Mes
- Egresos Pagados
- Egresos Pendientes
- Ahorro (Clara, Marco, Fondo Emergencia)
- Disponible (= SUM de Esperado por cuenta)
- Patrimonio (= Ingresos - Egresos, incluye ahorros)
- Saldo por cuenta bancaria (10 cuentas)

### NEUROTEA
- Ingresos del Mes
- Egresos Pagados
- Egresos Pendientes
- Ganancia Real (= Ingresos - Pagados)
- % Ganancia (meta >= 7%)
- Distribucion utilidad (propietario / fondo emergencia / fondo inversion)
- Saldo por cuenta bancaria (2 cuentas)

### Flujo entre Entidades
- Balance Cruzado NT <-> FAMILIA
- Prestamos y devoluciones por direccion
- Estado: FAMILIA DEBE / NT DEBE / EQUILIBRADO

## Funciones Principales

| Funcion | Descripcion |
|---------|-------------|
| `obtenerDatosDashboard()` | Lee 7 hojas, recopila KPIs, tendencia 12 meses, subcategorias, flujo mensual |
| `generarHTMLDashboard()` | Genera HTML completo con CSS + Chart.js embebido |
| `buildFlujoSection(chartId)` | Helper que genera seccion flujo con IDs SVG unicos |
| `abrirDashboard()` | Abre modal dialog 1500x1000px |
| `doGet()` | Publica como Web App independiente |

## Reglas de Implementacion

1. **Compatibilidad ES5**: Usar `var` (no `const`/`let`), string concatenation (no template literals)
2. **Formulas MOVIMIENTO como fuente**: TABLERO lee de MOVIMIENTO con INDEX/MATCH, no recalcula desde CARGA
3. **Formato Guaranies**: `Gs. X.XXX.XXX` con puntos como separador de miles
4. **Colores**: Ver `references/colors.md` para paleta completa
5. **Graficos**: Ver `references/charts.md` para tipos de visualizacion
6. **DISPONIBLE = SUM(Esperado)**: Nunca calcular independientemente de las cuentas
7. **IFERROR proteccion**: Todas las formulas SUMPRODUCT deben usar `IFERROR(MONTH();0)` internamente
8. **TRIM proteccion (v7.35)**: Comparaciones de strings deben usar `TRIM()`: `(TRIM(rango)=TRIM(celda))`
9. **IDs unicos**: SVG markers usan IDs con chartId suffix para evitar colisiones entre tabs
10. **Destroy/Recreate**: Charts se destruyen al cambiar tab para evitar "Canvas already in use"

## Rangos Criticos (v7.35)

| Entidad | MOVIMIENTO | CONFIG Saldos |
|---------|------------|---------------|
| FAMILIA | 9-116 | 68-77 |
| NEUROTEA | 122-206 | 82-83 |

## Referencias

- [Paleta de colores](references/colors.md)
- [Tipos de graficos](references/charts.md)
- [Template HTML](assets/dashboard_template.html)
