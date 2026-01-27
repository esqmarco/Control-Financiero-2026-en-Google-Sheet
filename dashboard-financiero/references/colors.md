# Paleta de Colores - Dashboard Financiero

## Colores Base

| Variable | Hex | Uso |
|----------|-----|-----|
| primary | #1f2937 | Títulos, texto principal, header |
| positive | #047857 | Verde (ingresos, positivo, éxito) |
| negative | #dc2626 | Rojo (egresos, alertas, pendientes) |
| balance | #b45309 | Ámbar (línea de balance destacada) |

## Colores para Distribuciones

**REGLA:** NO usar grises en gráficos de distribución.

| Variable | Hex | Categoría típica |
|----------|-----|------------------|
| navy | #1e3a5f | Gastos Fijos |
| rose | #be123c | Préstamos/Cuotas |
| amber | #d97706 | Variables |
| indigo | #4338ca | Obligaciones |
| teal | #0d9488 | Suscripciones/Ahorro |
| sky | #0369a1 | Info, NeuroTEA |
| violet | #7c3aed | Secundario |
| orange | #c2410c | Alimentación |
| cyan | #0891b2 | Salud |
| emerald | #059669 | Supermercado |

## Paletas para Donuts

### Categorías principales (5 colores)
```javascript
['#1e3a5f', '#be123c', '#d97706', '#4338ca', '#0d9488']
```

### Subcategorías variables (6 colores)
```javascript
['#047857', '#b45309', '#0369a1', '#7c3aed', '#c2410c', '#0891b2']
```

## Fondos y Bordes

| Elemento | Color |
|----------|-------|
| Fondo página | #f9fafb |
| Fondo cards | #ffffff |
| Borde cards | #e5e7eb |
| Grilla gráficos | #f3f4f6 |

## CSS Variables

```css
:root {
    --color-primary: #1f2937;
    --color-positive: #047857;
    --color-negative: #dc2626;
    --color-balance: #b45309;
    --bg-page: #f9fafb;
    --bg-card: #ffffff;
    --border-card: #e5e7eb;
}
```
