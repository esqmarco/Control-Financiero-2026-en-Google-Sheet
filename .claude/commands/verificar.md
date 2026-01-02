# Verificar Sistema de Control Financiero

Realiza una verificación COMPLETA del sistema comparando el código contra CLAUDE.md y PLAN_MAESTRO.

## 1. Verificar Arquitectura de Archivos

Confirma que existen estos 6 archivos en `gs/`:
- Código.gs (menú, triggers)
- Config.gs (datos maestros)
- Sheets.gs (creación de hojas)
- Tablero.gs (dashboard fórmulas)
- WebApp.gs (HTML dashboard)
- Utils.gs (utilidades)

## 2. Verificar Config.gs contra PLAN_MAESTRO

### Tipos de Ingreso FAMILIA (13 items - sección 3.3)
1. Salario Marco
2. Salario Marco NeuroTEA
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

### Tipos de Ingreso NT (4 items - sección 3.4)
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros
4. Devolución Familia → NT

### Cuentas FAMILIA (10 items - sección 3.5)
1. ITAU Marco
2. Coop. Univ. Marco
3. ITAU Clara
4. UENO Clara
5. Tarjeta Solar Clara
6. Tarjeta ITAU Clara
7. Tarjeta ITAU Marco
8. Tarjeta Comecipar Clara
9. Gourmed
10. Efectivo

### Cuentas NT (3 items - sección 3.6)
1. Atlas NeuroTEA
2. Caja Chica NT
3. Efectivo NT

### Categorías Egreso FAMILIA (6 - sección 3.7)
GASTOS FIJOS, CUOTAS Y PRÉSTAMOS, OBLIGACIONES LEGALES, SUSCRIPCIONES, VARIABLES, AHORRO

### Categorías Egreso NT (6 - sección 3.9)
CLÍNICA, SUELDOS Y HONORARIOS, TELEFONÍA E INTERNET, OBLIGACIONES LEGALES, EVENTOS, VARIABLES

### Subcategorías Variables FAMILIA (10 - sección 3.8)
Incluye "Devolución Familia → NT"

### Subcategorías Variables NT (6 - sección 3.10)
Incluye "Préstamo NT → Familia"

### Eventos NT (16 - sección 3.11)
6 definidos + 10 reservas

## 3. Verificar Sheets.gs - Fórmulas Dinámicas

### MOVIMIENTO debe tener:
- [ ] Selector de mes en B3 con validación
- [ ] Celda K3 con fórmula MATCH para número de mes
- [ ] Columna PRESUPUESTO con INDEX/MATCH a hoja PRESUPUESTO
- [ ] Columna REAL con lógica según frecuencia:
  - Variable puro → SUMIFS desde CARGA
  - Fijo/* o Variable/* → INDEX/MATCH desde GASTOS_FIJOS
- [ ] Columna DIFERENCIA = REAL - PRESUPUESTO
- [ ] Columna ESTADO con lógica Ingreso/Egreso

### TABLERO debe tener:
- [ ] Sincronización de mes con MOVIMIENTO!B3
- [ ] KPIs calculados con fórmulas desde MOVIMIENTO
- [ ] Balance Cruzado con SUMIFS desde CARGA_NT
- [ ] NO debe tener valores fijos/hardcodeados

## 4. Verificar Lógica de Negocio

### Metas NeuroTEA
- Ganancia mínima: 7%
- Máximo gastos: 93%
- Distribución: 33.33% Utilidad, 33.33% Emergencia, 33.34% Inversión

### Balance Cruzado
- Préstamo NT → Familia: Egreso en NT, Ingreso en FAM
- Devolución Familia → NT: Egreso en FAM, Ingreso en NT
- Saldo Neto = Préstamos - Devoluciones

### Sistema Anti-Burro
- Ingreso → deshabilita CATEGORÍA y SUBCATEGORÍA
- CATEGORÍA ≠ VARIABLES/EVENTOS → deshabilita SUBCATEGORÍA
- CATEGORÍA = EVENTOS → lista de 16 eventos
- CATEGORÍA = VARIABLES → lista de subcategorías

## 5. Verificar Colores

| Uso | Hex |
|-----|-----|
| FAMILIA Header | #059669 |
| FAMILIA Fondo | #d1fae5 |
| NEUROTEA Header | #1d4ed8 |
| NEUROTEA Fondo | #dbeafe |
| OK | #22c55e |
| Alerta | #dc2626 |
| Advertencia | #f59e0b |

## 6. Reportar

Lista todas las inconsistencias encontradas con:
- Archivo afectado
- Línea o sección
- Valor esperado vs valor encontrado
- Sugerencia de corrección

Si todo está correcto, confirma: "✅ Sistema verificado - Sin inconsistencias"
