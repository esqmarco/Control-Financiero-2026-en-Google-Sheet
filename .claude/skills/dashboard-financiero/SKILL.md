# Skill: Dashboard Financiero

## Descripcion

Este skill permite generar y mantener el Dashboard Financiero del Sistema de Control Financiero 2026. El dashboard presenta KPIs, indicadores de estado, graficos y resumen financiero para las entidades FAMILIA y NEUROTEA.

## Contexto

- **Proyecto**: Control Financiero 2026 en Google Sheets con Apps Script
- **Entidades**: FAMILIA (finanzas del hogar) y NEUROTEA (clinica de terapia)
- **Moneda**: Guaranies paraguayos (Gs.)
- **Locale**: Espanol Paraguay (separador miles: punto, decimal: coma, argumentos formulas: punto y coma)

## Archivos Relacionados

| Archivo | Funcion |
|---------|---------|
| `gs/Tablero.gs` | Dashboard en Google Sheets (formulas dinamicas) |
| `gs/WebApp.gs` | Dashboard HTML/CSS (lee datos en tiempo real) |
| `gs/Config.gs` | Datos maestros, cuentas, categorias, colores |
| `gs/Sheets.gs` | Creacion de las 8 hojas principales |

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

### Consolidado
- Balance Cruzado NT <-> FAMILIA
- Liquidez (Atrasados, Esta Semana, Proxima Semana, Semana 3)
- % Gastos por Categoria

## Reglas de Implementacion

1. **Formulas MOVIMIENTO como fuente**: TABLERO lee de MOVIMIENTO con INDEX/MATCH, no recalcula desde CARGA
2. **Formato Guaranies**: `SUBSTITUTE(TEXT(ROUND(valor;0);"#,##0");",";".")` para mostrar "Gs. 1.000.000"
3. **Colores**: Ver `references/colors.md` para paleta completa
4. **Graficos**: Ver `references/charts.md` para tipos de visualizacion
5. **DISPONIBLE = SUM(Esperado)**: Nunca calcular independientemente de las cuentas
6. **IFERROR proteccion**: Todas las formulas SUMPRODUCT deben usar `IFERROR(MONTH();0)` internamente

## Referencias

- [Paleta de colores](references/colors.md)
- [Tipos de graficos](references/charts.md)
- [Template HTML](assets/dashboard_template.html)
