# Tipos de Graficos - Dashboard Financiero

## Visualizaciones del Dashboard

### 1. Barras de Progreso (KPI Cards)

Usadas para mostrar ejecucion presupuestaria.

```
INGRESOS    ████████████████░░░░  80%
EGRESOS     ██████████░░░░░░░░░░  50%
```

- Color barra: Azul `#3b82f6` para ingresos, Rojo `#ef4444` para egresos
- Fondo barra: Gris claro `#e5e7eb`
- Porcentaje: `REAL / PRESUPUESTO * 100`

### 2. Semaforo de Estado

Indicador visual circular para estados criticos.

| Estado | Icono | Color |
|--------|-------|-------|
| OK / Meta cumplida | Circulo verde | `#22c55e` |
| Advertencia | Circulo amarillo | `#f59e0b` |
| Alerta / Deficit | Circulo rojo | `#dc2626` |

### 3. Tabla de Saldos por Cuenta

Muestra saldo esperado vs saldo real (banco) por cuenta.

| Columna | Descripcion |
|---------|-------------|
| Cuenta | Nombre de la cuenta bancaria |
| Saldo Inicial | Desde CONFIG (por mes) |
| Esperado | Calculado: Inicial + Ingresos - Egresos - Ahorro |
| Saldo Banco | Editable: saldo real verificado en banco |
| Diferencia | Esperado - Banco |

- Diferencia positiva: Verde (hay mas de lo esperado)
- Diferencia negativa: Rojo (falta dinero)

### 4. Distribucion por Categoria (FAMILIA)

Muestra % de egresos pagados por categoria.

Categorias:
1. GASTOS FIJOS
2. CUOTAS Y PRESTAMOS
3. OBLIGACIONES LEGALES
4. SUSCRIPCIONES
5. VARIABLES

Formula: `SUMIFS(MOVIMIENTO!F:F; MOVIMIENTO!L:L; categoria; MOVIMIENTO!J:J; "Pagado") / TOTAL_EGRESOS_PAGADOS`

### 5. Distribucion por Categoria (NEUROTEA)

Categorias:
1. CLINICA
2. SUELDOS Y HONORARIOS
3. TELEFONIA E INTERNET
4. OBLIGACIONES LEGALES
5. EVENTOS
6. VARIABLES

### 6. Indicador de Liquidez

Muestra flujo de caja por ventanas temporales.

```
ATRASADOS      Gs. 500.000    (rojo)
ESTA SEMANA    Gs. 1.200.000  (amarillo)
PROX SEMANA    Gs. 800.000    (verde)
SEMANA 3       Gs. 600.000    (azul)
```

- Solo muestra gastos con EST.PAGO = "Pendiente"
- Filtra por DIA de vencimiento vs DAY(TODAY())

### 7. Balance Cruzado NT <-> FAMILIA

Muestra estado de prestamos entre entidades.

```
FAMILIA debe a NT:     Gs. 2.000.000
NT debe a FAMILIA:     Gs. 500.000
BALANCE NETO:          Gs. 1.500.000 (FAMILIA DEBE A NT)
```

Estados:
- Balance > 0: "FAMILIA DEBE A NT" (rojo)
- Balance = 0: "EQUILIBRADO" (verde)
- Balance < 0: "NT DEBE A FAMILIA" (amarillo)

### 8. Ganancia NT (Indicador Especial)

```
GANANCIA REAL:    Gs. 3.500.000
% GANANCIA:       8.2%
ESTADO META:      META CUMPLIDA (>= 7%)

Distribucion:
  Propietario:       Gs. 1.166.667  (33.33%)
  Fondo Emergencia:  Gs. 1.166.667  (33.33%)
  Fondo Inversion:   Gs. 1.166.666  (33.34%)
```

## Notas de Implementacion

- **Google Sheets (Tablero.gs)**: Usa formulas nativas y formato condicional
- **WebApp (WebApp.gs)**: Usa HTML/CSS con datos leidos via `google.script.run`
- **Formato numeros**: Siempre `Gs. X.XXX.XXX` (puntos como separador de miles)
- **Responsive**: WebApp debe funcionar en desktop y mobile
