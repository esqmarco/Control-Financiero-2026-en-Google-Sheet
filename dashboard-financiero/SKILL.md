---
name: dashboard-financiero
description: Genera dashboards HTML con Chart.js para finanzas personales y empresariales. Usar cuando el usuario pida gráficos financieros, control de gastos, liquidez, presupuesto o reportes en guaraníes.
---

# Dashboard Financiero NeuroTEA + Familia

Skill para generar dashboards financieros HTML interactivos con Chart.js para control de finanzas personales (Familia) y empresariales (NeuroTEA - clínica de terapias).

## Cuándo usar este skill

- Usuario pide dashboard financiero, reporte visual o gráficos de control
- Usuario sube archivo Excel con datos financieros
- Usuario menciona: liquidez, presupuesto vs ejecutado, gastos, ingresos
- Usuario pide gráficos en guaraníes (₲)

## Estructura de datos esperada

El archivo Excel debe contener:

| Hoja | Propósito |
|------|-----------|
| TABLERO | Saldos actuales y KPIs |
| LIQUIDEZ_NT | Cobertura semanal NeuroTEA |
| LIQUIDEZ_FAMILIA | Cobertura semanal Familia |
| MOVIMIENTO | Real vs Presupuesto |
| GASTOS_FIJOS | Lista maestra mensual |
| CARGA_FAMILIA | Variables familia |
| CARGA_NT | Variables NeuroTEA |
| PRESUPUESTO | Plan anual |

## Paleta de colores

Usar paleta Minimalista Profesional definida en `references/colors.md`.

**Regla principal:** NO usar grises en gráficos de distribución (donuts, barras de categorías).

## Gráficos requeridos

Ver `references/charts.md` para especificaciones detalladas de los 15 gráficos:

1. KPIs (6 tarjetas)
2. Liquidez semanal (2 barras)
3. Balance mensual (2 gráficos)
4. Distribución gastos (2 gráficos)
5. % Gastos vs Ingresos (2 gráficos)
6. Tendencias (2 gráficos)
7. Presupuesto vs Ejecución (2 gráficos)
8. Flujo NT → Familia (diagrama + barras)
9. Análisis detallado (2 gráficos)

## Proceso de generación

1. Leer el archivo Excel del usuario
2. Extraer datos de cada hoja según estructura esperada
3. Usar `assets/dashboard_template.html` como base
4. Reemplazar datos de ejemplo con datos reales
5. Guardar como `dashboard_financiero_[fecha].html`

## Configuración Chart.js

### Línea de balance (destacada)
```javascript
{
    type: 'line',
    borderColor: '#b45309',
    borderWidth: 4,
    pointRadius: 7,
    order: 1,
    yAxisID: 'y1'
}
```

### Tooltips
```javascript
tooltip: {
    backgroundColor: 'rgba(31,41,55,0.95)',
    callbacks: {
        label: ctx => ctx.dataset.label + ': ₲' + ctx.raw + 'M'
    }
}
```

## Formato de moneda

- Símbolo: ₲ (guaraníes paraguayos)
- Millones: ₲16.7M

## Validación

Antes de entregar, verificar:
- Fondo blanco (#f9fafb)
- Donuts SIN grises
- Línea balance gruesa y al frente
- Diagrama flujo vertical
- Tooltips funcionando
