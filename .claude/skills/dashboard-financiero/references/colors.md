# Paleta de Colores - Dashboard Financiero

> Estilo sobrio (v6.1). Headers usan gris neutro. Colores SOLO para indicadores de estado.

## Colores Base

| Uso | Hex | RGB | Nota |
|-----|-----|-----|------|
| Headers (FAM/NT) | `#1f2937` | 31, 41, 55 | Gris oscuro sobrio |
| Fondo principal | `#f9fafb` | 249, 250, 251 | Gris muy claro |
| Fondo alternado | `#ffffff` | 255, 255, 255 | Blanco |
| Subtotales | `#e5e7eb` | 229, 231, 235 | Gris claro |
| Bordes | `#d1d5db` | 209, 213, 219 | Gris borde |

## Colores de Estado

| Estado | Hex | Uso |
|--------|-----|-----|
| OK / Ahorro | `#22c55e` | Verde - meta cumplida, ahorro realizado |
| Alerta / Deficit | `#dc2626` | Rojo - sobregasto, deficit |
| Advertencia | `#f59e0b` | Amarillo - cercano al limite |

## Colores de Indicadores

| Indicador | Hex | Uso |
|-----------|-----|-----|
| Ingreso | `#3b82f6` | Azul - dinero que entra |
| Egreso | `#ef4444` | Rojo - dinero que sale |
| Ganancia | `#22c55e` | Verde - resultado positivo |

## Semaforo de Diferencia (contexto-sensitivo)

| Tipo | Diferencia Positiva | Diferencia Negativa |
|------|---------------------|---------------------|
| INGRESO | Verde `#22c55e` (recibiste mas) | Rojo `#dc2626` (recibiste menos) |
| EGRESO | Rojo `#dc2626` (gastaste mas) | Verde `#22c55e` (gastaste menos) |

## Semaforo Ganancia NT

| Estado | Color | Condicion |
|--------|-------|-----------|
| PERDIDA | Rojo `#dc2626` | < 0% |
| Bajo meta | Amarillo `#f59e0b` | 0% - 7% |
| META CUMPLIDA | Verde `#22c55e` | >= 7% |

## Colores Estado de Pago

| Estado | Color fondo | Color texto |
|--------|-------------|-------------|
| Pendiente | `#fef3c7` (amarillo claro) | `#92400e` (marron) |
| Pagado | `#dcfce7` (verde claro) | `#166534` (verde oscuro) |
| Cancelado | `#f3f4f6` (gris claro) | `#6b7280` (gris) |
| Ahorrado | `#dcfce7` (verde claro) | `#166534` (verde oscuro) |

## Colores Validacion CARGA (columna VALIDO)

| Indicador | Fondo | Texto |
|-----------|-------|-------|
| Fila con advertencia | `#fde8e8` (rojo claro) | `#991b1b` (rojo oscuro) |
| Checkmark valido | - | Verde |
| Warning invalido | - | Rojo negrita |

## Uso en CSS (WebApp)

```css
:root {
  --color-header: #1f2937;
  --color-bg: #f9fafb;
  --color-bg-alt: #ffffff;
  --color-subtotal: #e5e7eb;
  --color-border: #d1d5db;
  --color-ok: #22c55e;
  --color-alert: #dc2626;
  --color-warn: #f59e0b;
  --color-ingreso: #3b82f6;
  --color-egreso: #ef4444;
  --color-ganancia: #22c55e;
}
```
