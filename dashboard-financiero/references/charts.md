# Especificaciones de Gráficos

## 1. Tarjetas KPI (6 cards)

| KPI | Color borde | Condición alerta |
|-----|-------------|------------------|
| Saldo Familia | positive (#047857) | - |
| Saldo NeuroTEA | sky (#0369a1) | - |
| Total Disponible | primary (#1f2937) | - |
| Gastos/Ingresos | danger si >70% | Rojo si supera 70% |
| Balance Mensual | positive si >0 | Verde si positivo |
| Préstamos/Ingresos | danger si >30% | Rojo si supera 30% |

## 2. Liquidez Semanal (2 barras)

### Familia
- Pagos Realizados: `positive` (#047857)
- Pagos Pendientes: `negative` (#dc2626)

### NeuroTEA
- Pagos Realizados: `sky` (#0369a1)
- Pagos Pendientes: `negative` (#dc2626)

## 3. Balance Mensual

### Gráfico principal (barras + línea)
```javascript
datasets: [
    { label: 'Ingresos', backgroundColor: '#047857', order: 2 },
    { label: 'Egresos', backgroundColor: '#dc2626', order: 2 },
    { 
        label: 'Balance',
        type: 'line',
        borderColor: '#b45309',
        borderWidth: 4,
        pointRadius: 7,
        pointBorderWidth: 3,
        pointBorderColor: '#fff',
        order: 1,
        yAxisID: 'y1'
    }
]
```

### Ahorro acumulado (área)
- Color: `positive` con fill

## 4. Distribución Gastos

### Donut categorías
```javascript
backgroundColor: ['#1e3a5f', '#be123c', '#d97706', '#4338ca', '#0d9488']
labels: ['Gastos Fijos', 'Préstamos', 'Variables', 'Obligaciones', 'Suscripciones']
cutout: '60%'
borderWidth: 3
```

### Barras horizontales
```javascript
backgroundColor: ['#be123c', '#1e3a5f', '#d97706', '#0d9488']
labels: ['Préstamos', 'Gastos Fijos', 'Variables', 'Ahorro']
indexAxis: 'y'
```

## 5. Gastos como % de Ingresos

### Barras verticales
- Cada categoría con su color de la paleta
- Eje Y en porcentaje

### Línea ratio préstamos
```javascript
datasets: [
    { label: 'Préstamos/Ingresos', borderColor: '#dc2626', fill: true },
    { label: 'Meta 30%', borderColor: '#047857', borderDash: [8,4] }
]
```

## 6. Tendencias

### Gastos mensuales
```javascript
datasets: [
    { label: 'Gastos', borderColor: '#dc2626', fill: true },
    { label: 'Tendencia', borderColor: '#1f2937', borderDash: [10,5] }
]
```

### Ratio gastos/ingresos
```javascript
datasets: [
    { label: 'Ratio', borderColor: '#1f2937', fill: true },
    { label: 'Meta 65%', borderColor: '#047857', borderDash: [8,4] }
]
```

## 7. Presupuesto vs Ejecución

### Áreas superpuestas
```javascript
datasets: [
    { label: 'Presupuestado', borderColor: '#1f2937', fill: true },
    { label: 'Ejecutado', borderColor: '#0d9488', fill: true }
]
```

### Línea límite
```javascript
datasets: [
    { label: 'Límite', borderColor: '#dc2626', borderDash: [10,5] },
    { label: 'Gasto Real', borderColor: '#b45309', fill: true }
]
```

## 8. Flujo NT → Familia

### Diagrama visual
- Layout: VERTICAL
- Box NeuroTEA: borde `sky`, fondo gradiente azul claro
- Box Familia: borde `primary`, fondo gradiente gris claro
- Flecha: SVG vertical con punta
- Info transferencia: al lado de la flecha (no rotado)

### Barras transferencias
- Color: `primary` (#1f2937)

## 9. Análisis Detallado

### Donut subcategorías
```javascript
backgroundColor: ['#047857', '#b45309', '#0369a1', '#7c3aed', '#c2410c', '#0891b2']
labels: ['Supermercado', 'Recreación', 'Combustible', 'Gastos Varios', 'Alimentación', 'Salud']
```

### Proyección liquidez
```javascript
datasets: [
    { label: 'Saldo Proyectado', borderColor: '#0369a1', fill: true },
    { label: 'Mínimo Seguridad', borderColor: '#dc2626', borderDash: [8,4] }
]
```

## Configuración Global

### Tooltips
```javascript
tooltip: {
    backgroundColor: 'rgba(31,41,55,0.95)',
    padding: 12,
    callbacks: {
        label: ctx => ctx.dataset.label + ': ₲' + ctx.raw + 'M'
    }
}
```

### Leyendas
```javascript
legend: {
    labels: {
        usePointStyle: true,
        padding: 16
    }
}
```

### Escalas
```javascript
scales: {
    x: { grid: { display: false } },
    y: { 
        grid: { color: '#f3f4f6' },
        ticks: { callback: v => '₲' + v + 'M' }
    }
}
```
