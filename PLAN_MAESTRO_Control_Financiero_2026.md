# PLAN MAESTRO: Sistema de Control Financiero 2026
## NeuroTEA & Familia - Google Sheets + Web App
### Versión 2.2 - Con GASTOS_FIJOS Completo

---

## RESUMEN EJECUTIVO

Este documento consolida la interpretación completa del proyecto de planilla de control financiero basado en el análisis exhaustivo de:
- Conversaciones anteriores con chatbots
- Archivos Excel V7 y V9
- Prototipo visual JSX del tablero
- Imágenes de referencia (preview1-4.webp)
- PDF del presupuesto anual

**Objetivo del Sistema:** Crear una herramienta robusta, práctica y visualmente elegante para controlar las finanzas de la familia y de la clínica NeuroTEA de forma integrada, con alertas automáticas sobre rentabilidad y flujo de caja.

---

## 1. CONTEXTO DEL USUARIO

### Perfil
- **Usuario principal:** Marco (administrador de NeuroTEA y finanzas familiares)
- **Usuario secundario:** Clara (esposa de Marco, carga gastos familiares)
- **Moneda:** Guaraníes paraguayos (Gs.)
- **Período:** Año fiscal 2026

### Entidades Financieras
1. **FAMILIA:** Finanzas del hogar (salarios, gastos domésticos, préstamos personales)
2. **NEUROTEA:** Clínica de terapias para niños con autismo (ingresos por terapeutas, cursos, gastos operativos)

### Relación entre Entidades
- Marco recibe **Salario de Itaipu** (empleador principal)
- Marco recibe **Salario de Administrador de NeuroTEA** (Gs. 5.000.000/mes) - Este es un GASTO para NT y un INGRESO para Familia
- Clara recibe **Honorarios de NeuroTEA** (Gs. 2.999.999/mes aprox)
- Cuando la familia tiene déficit, **NeuroTEA presta dinero a la Familia**
- La familia debe **devolver esos préstamos** a NeuroTEA
- El sistema debe rastrear este **balance cruzado** y alertar si hay subsidio

---

## 2. ESTRUCTURA DE HOJAS (8 PESTAÑAS)

| # | Hoja | Función | Quién la usa | Editable |
|---|------|---------|--------------|----------|
| 1 | **CONFIG** | Listas maestras, metas, parámetros globales | Marco | Sí |
| 2 | **PRESUPUESTO** | Plan anual de ingresos/gastos (excepto Ganancia NT que es calculada) | Marco | Sí (parcial) |
| 3 | **GASTOS_FIJOS** | Montos base × 12 meses + día de vencimiento | Marco | Sí |
| 4 | **CARGA_FAMILIA** | Registro cronológico de variables familiares | Clara/Marco | Sí |
| 5 | **CARGA_NT** | Registro cronológico de variables NeuroTEA | Marco | Sí |
| 6 | **MOVIMIENTO** | Real vs Presupuesto mes a mes con estados | Marco | Parcial |
| 7 | **TABLERO** | Indicadores resumidos en hoja (KPIs básicos) | Lectura | No |
| 8 | **WEB APP** | Dashboard completo visual (igual al JSX) | Ambos | No |

---

## 3. HOJA CONFIG - CONFIGURACIÓN COMPLETA

### 3.1 MESES
```
Enero, Febrero, Marzo, Abril, Mayo, Junio, Julio, Agosto, Septiembre, Octubre, Noviembre, Diciembre
```

### 3.2 ENTIDADES
```
FAMILIA, NEUROTEA
```

### 3.3 TIPOS DE INGRESO FAMILIA (para desplegable)
| # | Tipo de Ingreso | Descripción |
|---|-----------------|-------------|
| 1 | Salario Marco | Salario de Itaipu (empleador principal) |
| 2 | **Salario Marco NeuroTEA** | Salario de administrador que NT paga a Marco |
| 3 | Vacaciones Marco | Pago de vacaciones |
| 4 | Adelanto de Aguinaldo Marco | Anticipo de aguinaldo |
| 5 | Saldo Aguinaldo Marco | Resto del aguinaldo |
| 6 | Viático Marco | Viáticos de trabajo |
| 7 | Animador Bíblico Marco | Ingreso por actividad religiosa |
| 8 | Tarjeta Gourmed | Beneficio alimentación |
| 9 | Contrato Colectivo Marco | Bonificación sindical |
| 10 | PL Itaipu Marco | Participación en utilidades Itaipu |
| 11 | Honorarios Clara NeuroTEA | Pago de NT a Clara |
| 12 | Préstamo NeuroTEA | Dinero que NT presta a Familia |
| 13 | Préstamo Otros Bancos | Préstamos de terceros |

### 3.4 TIPOS DE INGRESO NEUROTEA (para desplegable)
| # | Tipo de Ingreso | Descripción |
|---|-----------------|-------------|
| 1 | Aporte NeuroTEA Terapeutas | Ingresos principales de la clínica |
| 2 | Cursos NeuroTEA | Ingresos por capacitaciones |
| 3 | Otros | Otros ingresos varios |
| 4 | Devolución Familia → NT | Cuando Familia devuelve préstamo a NT |

**ACLARACIÓN IMPORTANTE - FLUJO DE HONORARIOS CLARA:**
- Los terapeutas entregan su aporte a la clínica
- **Clara retira su parte ANTES** de que el dinero entre a NeuroTEA
- Lo que se registra en "Aporte NeuroTEA Terapeutas" ya viene **NETO** (sin la parte de Clara)
- Por lo tanto, **NO existe** un egreso en NT llamado "Honorarios Clara"
- En FAMILIA, Clara registra su ingreso como "Honorarios Clara NeuroTEA"
- Este flujo evita duplicación: Clara ya tomó su parte, no se descuenta de NT

### 3.5 CUENTAS FAMILIA (para desplegable)
| # | Cuenta |
|---|--------|
| 1 | ITAU Marco |
| 2 | Coop. Univ. Marco |
| 3 | ITAU Clara |
| 4 | UENO Clara |
| 5 | Tarjeta Solar Clara |
| 6 | Tarjeta ITAU Clara |
| 7 | **Tarjeta ITAU Marco** |
| 8 | Tarjeta Comecipar Clara |
| 9 | Gourmed |
| 10 | Efectivo |

### 3.6 CUENTAS NEUROTEA (para desplegable)
| # | Cuenta |
|---|--------|
| 1 | Atlas NeuroTEA |
| 2 | Caja Chica NT |
| 3 | Efectivo NT |

### 3.7 CATEGORÍAS EGRESO FAMILIA (Agrupaciones principales)
| # | Categoría |
|---|-----------|
| 1 | GASTOS FIJOS |
| 2 | CUOTAS Y PRÉSTAMOS |
| 3 | OBLIGACIONES LEGALES |
| 4 | SUSCRIPCIONES |
| 5 | VARIABLES |
| 6 | AHORRO |

### 3.8 SUBCATEGORÍAS VARIABLES FAMILIA (para desplegable cuando Categoría = VARIABLES)
| # | Subcategoría Variable | Descripción |
|---|----------------------|-------------|
| 1 | Supermercado | Compras de alimentos y hogar |
| 2 | Combustible | Nafta para vehículos |
| 3 | Mantenimiento / Reparaciones Auto Clara | Gastos del auto de Clara |
| 4 | Mantenimiento / Reparaciones Auto Niños | Gastos del auto de los niños |
| 5 | Mantenimiento / Reparaciones Camioneta Marco | Gastos de la camioneta |
| 6 | Ropa/Vestidos | Vestimenta familiar |
| 7 | Recreación (Pizza, hamburguesa, helados, etc) | Salidas y entretenimiento |
| 8 | Salud y Medicamentos | Gastos médicos no cubiertos |
| 9 | Gastos no identificados | Gastos varios sin categoría |
| 10 | Devolución Familia → NT | Cuando Familia devuelve préstamo a NT |

### 3.9 CATEGORÍAS EGRESO NEUROTEA (Agrupaciones principales)
| # | Categoría |
|---|-----------|
| 1 | CLÍNICA |
| 2 | SUELDOS Y HONORARIOS |
| 3 | TELEFONÍA E INTERNET |
| 4 | OBLIGACIONES LEGALES |
| 5 | EVENTOS |
| 6 | VARIABLES |

### 3.10 SUBCATEGORÍAS VARIABLES NEUROTEA (para desplegable cuando Categoría = VARIABLES)
| # | Subcategoría Variable | Descripción |
|---|----------------------|-------------|
| 1 | Insumos y Papelería | Materiales de oficina y terapia |
| 2 | Reparaciones Clínica | Arreglos del local |
| 3 | Mantenimiento Aire | Service de aire acondicionado |
| 4 | Gastos Cursos | Materiales para capacitaciones |
| 5 | Gastos Varios Cumple (Tortas, bocaditos, meriendas) | Celebraciones menores |
| 6 | Préstamo NT → Familia | Cuando NT presta dinero a Familia |

### 3.11 SUBCATEGORÍAS EVENTOS NEUROTEA (para desplegable cuando Categoría = EVENTOS)
| # | Evento | Mes típico |
|---|--------|------------|
| 1 | Día del Niño | Agosto |
| 2 | San Juan | Junio |
| 3 | Día del Autismo | Abril |
| 4 | Clausura Padres | Noviembre |
| 5 | Navidad Papá Noel | Diciembre |
| 6 | Cena Fin de Año | Diciembre |

**NOTA IMPORTANTE EVENTOS:** Los eventos se cargan individualmente pero en MOVIMIENTO se comparan de forma GLOBAL contra el presupuesto total de "EVENTOS". No hay comparación individual por evento.

### 3.12 FRECUENCIA (para clasificar gastos)
| # | Frecuencia | Descripción |
|---|------------|-------------|
| 1 | Fijo/Mensual | Mismo monto cada mes (Ej: Alquiler) |
| 2 | Fijo/Anual | Se paga una vez al año (Ej: Antivirus) |
| 3 | Variable/Mensual | Monto varía cada mes (Ej: ANDE, Supermercado) |
| 4 | Variable/Anual | Ocurre ocasionalmente (Ej: Reparaciones) |

### 3.13 ESTADOS (para seguimiento de pagos)
| # | Estado | Descripción |
|---|--------|-------------|
| 1 | Pendiente | Aún no pagado |
| 2 | Pagado | Ya fue abonado |
| 3 | Cancelado | No se pagará (anulado) |

### 3.14 METAS NEUROTEA (parámetros editables)
| Parámetro | Valor | Descripción |
|-----------|-------|-------------|
| Meta Ganancia Mínima | **7%** | Porcentaje mínimo de ganancia sobre ingresos |
| Meta Máximo Gastos | **93%** | Porcentaje máximo de gastos sobre ingresos |
| Distribución Utilidad Dueño | **33.33%** | Tercio de la ganancia para Marco |
| Distribución Fondo Emergencia | **33.33%** | Tercio para contingencias |
| Distribución Fondo Inversión | **33.33%** | Tercio para crecimiento |

**ACLARACIÓN IMPORTANTE - FONDOS VIRTUALES:**
Los fondos de NeuroTEA (Utilidad, Fondo Emergencia, Fondo Inversión) son **VIRTUALES**:
- Se CALCULAN automáticamente basados en la ganancia
- **NO son cuentas bancarias separadas**
- El dinero físico permanece en las cuentas NT (Atlas, Caja Chica, Efectivo)
- Los fondos son una **asignación contable** para saber cuánto hay disponible para cada propósito
- Ayudan a tomar decisiones: "¿Puedo hacer esta inversión?" → Mirar Fondo Inversión

---

## 4. HOJA PRESUPUESTO - DETALLE COMPLETO

### 4.1 Estructura de la Hoja
```
| CONCEPTO | TIPO | FRECUENCIA | ENE | FEB | MAR | ABR | MAY | JUN | JUL | AGO | SEP | OCT | NOV | DIC | TOTAL AÑO |
```

### 4.2 PRESUPUESTO FAMILIA

#### ► INGRESOS FAMILIA
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Salario Marco | Ingreso | Fijo/Mensual |
| 2 | **Salario Marco NeuroTEA** | Ingreso | Fijo/Mensual |
| 3 | Vacaciones Marco | Ingreso | Variable/Anual |
| 4 | Adelanto de Aguinaldo Marco | Ingreso | Fijo/Anual |
| 5 | Saldo Aguinaldo Marco | Ingreso | Fijo/Anual |
| 6 | Viático Marco | Ingreso | Variable/Mensual |
| 7 | Animador Bíblico Marco | Ingreso | Fijo/Mensual |
| 8 | Tarjeta Gourmed | Ingreso | Fijo/Mensual |
| 9 | Contrato Colectivo Marco | Ingreso | Variable/Anual |
| 10 | PL Itaipu Marco | Ingreso | Variable/Anual |
| 11 | Honorarios Clara NeuroTEA | Ingreso | Fijo/Mensual |
| 12 | Préstamo NeuroTEA | Ingreso | Variable/Mensual |
| 13 | Préstamo Otros Bancos | Ingreso | Variable/Anual |
| - | **TOTAL INGRESOS FAMILIA** | - | - |

#### ► EGRESOS FAMILIA - GASTOS FIJOS
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Salario Lili Doméstico | Egreso | Fijo/Mensual |
| 2 | Salario Laura Doméstico | Egreso | Fijo/Mensual |
| 3 | Escuela Fabián y Brenda | Egreso | Fijo/Mensual |
| 4 | Robótica Niños | Egreso | Fijo/Mensual |
| 5 | ANDE Casa | Egreso | Variable/Mensual |
| 6 | Expensa Casa | Egreso | Fijo/Mensual |
| 7 | Ña Luisa | Egreso | Fijo/Mensual |
| 8 | Remedio Lochi | Egreso | Variable/Mensual |
| 9 | Seguro Médico Papá y Mamá | Egreso | Fijo/Mensual |
| 10 | Contadora Marco | Egreso | Fijo/Mensual |
| 11 | Reserva | - | - |
| 12 | Reserva | - | - |
| 13 | Reserva | - | - |
| - | **SUBTOTAL GASTOS FIJOS** | - | - |

#### ► EGRESOS FAMILIA - CUOTAS Y PRÉSTAMOS
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Préstamo Lizzi | Egreso | Fijo/Mensual |
| 2 | Cajubi Marco | Egreso | Fijo/Mensual |
| 3 | Mutual Marco | Egreso | Fijo/Mensual |
| 4 | Seguro Auto Laura ITAU | Egreso | Fijo/Mensual |
| 5 | Cuota ITAU | Egreso | Variable/Mensual |
| 6 | Auto Laura Cuota | Egreso | Fijo/Mensual |
| 7 | Coop. Universitaria Clara | Egreso | Fijo/Mensual |
| 8 | Coomecipar Clara | Egreso | Fijo/Mensual |
| 9 | Solar Préstamo 1 | Egreso | Fijo/Mensual |
| 10 | Solar Préstamo 2 | Egreso | Fijo/Mensual |
| 11 | Show Congelador | Egreso | Fijo/Mensual |
| 12 | Pago Mínimo Tarj Crédito ITAU Clara | Egreso | Variable/Mensual |
| 13 | Pago Mínimo Tarj Crédito ITAU Marco | Egreso | Variable/Mensual |
| 14 | Pago Mínimo Tarj Crédito Solar Clara | Egreso | Variable/Mensual |
| 15 | Pago Mínimo Tarj Crédito Comecipar Clara | Egreso | Variable/Mensual |
| 16 | Reserva | - | - |
| 17 | Reserva | - | - |
| - | **SUBTOTAL CUOTAS Y PRÉSTAMOS** | - | - |

#### ► EGRESOS FAMILIA - OBLIGACIONES LEGALES
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Aporte IPS | Egreso | Fijo/Mensual |
| 2 | Aporte Cajubi | Egreso | Fijo/Mensual |
| 3 | Aporte STEIBI | Egreso | Fijo/Mensual |
| 4 | Aporte SICHAP | Egreso | Fijo/Mensual |
| 5 | Impuesto compra digital | Egreso | Variable/Mensual |
| 6 | Aporte y Solidaridad Coop. Univer. Clara | Egreso | Fijo/Mensual |
| 7 | Aporte y Solidaridad Coop. Univer. Marco | Egreso | Fijo/Mensual |
| 8 | Impuesto a la Renta personal | Egreso | Fijo/Anual |
| 9 | Impuesto del terreno casa | Egreso | Fijo/Anual |
| 10 | Reserva | - | - |
| 11 | Reserva | - | - |
| 12 | Reserva | - | - |
| - | **SUBTOTAL OBLIGACIONES LEGALES** | - | - |

#### ► EGRESOS FAMILIA - SUSCRIPCIONES
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Giganet | Egreso | Fijo/Mensual |
| 2 | Tigo Clara | Egreso | Fijo/Mensual |
| 3 | Tigo Familiar | Egreso | Fijo/Mensual |
| 4 | Google One | Egreso | Fijo/Mensual |
| 5 | ChatGPT | Egreso | Fijo/Mensual |
| 6 | Claude Marco | Egreso | Fijo/Mensual |
| 7 | Claude Clara | Egreso | Fijo/Mensual |
| 8 | Antivirus Clara (Anual) | Egreso | Fijo/Anual |
| 9 | Antivirus Marco (Anual) | Egreso | Fijo/Anual |
| 10 | Microsoft Office Clara (Anual) | Egreso | Fijo/Anual |
| 11 | Microsoft Office Marco (Anual) | Egreso | Fijo/Anual |
| 12 | PosterWall | Egreso | Fijo/Mensual |
| 13 | Canva (Anual) | Egreso | Fijo/Anual |
| 14 | Scribd | Egreso | Fijo/Mensual |
| 15 | iLovePDF | Egreso | Fijo/Mensual |
| 16 | Reserva | - | - |
| 17 | Reserva | - | - |
| 18 | Reserva | - | - |
| - | **SUBTOTAL SUSCRIPCIONES** | - | - |

#### ► EGRESOS FAMILIA - VARIABLES
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Supermercado | Egreso | Variable/Mensual |
| 2 | Combustible | Egreso | Variable/Mensual |
| 3 | Mantenimiento / Reparaciones Auto Clara | Egreso | Variable/Anual |
| 4 | Mantenimiento / Reparaciones Auto Niños | Egreso | Variable/Anual |
| 5 | Mantenimiento / Reparaciones Camioneta Marco | Egreso | Variable/Anual |
| 6 | Ropa/Vestidos | Egreso | Variable/Mensual |
| 7 | Recreación (Pizza, hamburguesa, helados, etc) | Egreso | Variable/Mensual |
| 8 | Salud y Medicamentos | Egreso | Variable/Mensual |
| 9 | Gastos no identificados | Egreso | Variable/Mensual |
| 10 | Reserva | - | - |
| 11 | Reserva | - | - |
| 12 | Reserva | - | - |
| - | **SUBTOTAL VARIABLES** | - | - |

#### ► EGRESO - AHORRO FAMILIA
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Ahorro Clara | Egreso | Variable/Mensual |
| 2 | Ahorro Marco | Egreso | Variable/Mensual |
| - | **SUBTOTAL AHORROS** | - | - |

| - | **TOTAL EGRESOS FAMILIA** | - | - |
| - | **BALANCE FAMILIA (Ingresos - Egresos)** | - | - |

---

### 4.3 PRESUPUESTO NEUROTEA

#### ► INGRESOS NEUROTEA
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Aporte NeuroTEA Terapeutas | Ingreso | Variable/Mensual |
| 2 | Cursos NeuroTEA | Ingreso | Variable/Mensual |
| 3 | Otros | Ingreso | Variable/Mensual |
| 4 | Reserva | - | - |
| 5 | Reserva | - | - |
| 6 | Reserva | - | - |
| - | **TOTAL INGRESOS NEUROTEA** | - | - |

#### ► EGRESOS NT - CLÍNICA
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Alquiler 1 (Principal) | Egreso | Fijo/Mensual |
| 2 | Alquiler 2 (Secundario) | Egreso | Fijo/Mensual |
| 3 | ANDE clínica | Egreso | Variable/Mensual |
| 4 | Reserva | - | - |
| 5 | Reserva | - | - |
| 6 | Reserva | - | - |
| - | **TOTAL EGRESOS CLÍNICA** | - | - |

#### ► EGRESOS NT - SUELDOS Y HONORARIOS
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Sueldo Aracely | Egreso | Fijo/Mensual |
| 2 | Sueldo Fátima | Egreso | Fijo/Mensual |
| 3 | Limpieza NeuroTEA | Egreso | Variable/Mensual |
| 4 | Honorario Contador | Egreso | Fijo/Mensual |
| 5 | **Salario Administrador (Marco)** | Egreso | Fijo/Mensual |
| 6 | Honorario Mant. Sistema | Egreso | Fijo/Mensual |
| 7 | Reserva | - | - |
| 8 | Reserva | - | - |
| 9 | Reserva | - | - |
| - | **TOTAL SUELDOS Y HONORARIOS** | - | - |

**NOTA:** El "Salario Administrador" es lo que NT paga a Marco. Este mismo monto aparece como INGRESO en Familia bajo "Salario Marco NeuroTEA".

#### ► EGRESOS NT - TELEFONÍA E INTERNET
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Celular Tigo NeuroTEA | Egreso | Fijo/Mensual |
| 2 | Celular Tigo Sistema | Egreso | Fijo/Mensual |
| 3 | WhatsFlow | Egreso | Fijo/Mensual |
| 4 | Internet NeuroTEA | Egreso | Fijo/Mensual |
| 5 | Reserva | - | - |
| 6 | Reserva | - | - |
| 7 | Reserva | - | - |
| - | **TOTAL TELEFONÍA E INTERNET** | - | - |

#### ► EGRESOS NT - OBLIGACIONES LEGALES
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | IVA | Egreso | Variable/Mensual |
| 2 | IPS | Egreso | Fijo/Mensual |
| 3 | Ministerio de Salud | Egreso | Variable/Anual |
| 4 | Mora de Alquiler | Egreso | Variable/Mensual |
| 5 | Reserva | - | - |
| 6 | Reserva | - | - |
| 7 | Reserva | - | - |
| - | **TOTAL OBLIGACIONES LEGALES** | - | - |

#### ► EGRESOS NT - EVENTOS (Tratamiento Especial)
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Día del Niño | Egreso | Variable/Anual |
| 2 | San Juan | Egreso | Variable/Anual |
| 3 | Día del Autismo | Egreso | Variable/Anual |
| 4 | Clausura Padres | Egreso | Variable/Anual |
| 5 | Navidad Papá Noel | Egreso | Variable/Anual |
| 6 | Cena Fin de Año | Egreso | Variable/Anual |
| 7 | Reserva | - | - |
| 8 | Reserva | - | - |
| 9 | Reserva | - | - |
| 10 | Reserva | - | - |
| 11 | Reserva | - | - |
| 12 | Reserva | - | - |
| 13 | Reserva | - | - |
| 14 | Reserva | - | - |
| - | **TOTAL GASTOS EVENTOS** | - | - |

**REGLA ESPECIAL EVENTOS:**
- En CARGA_NT se registra cada evento específico (Ej: "Día del Niño")
- En MOVIMIENTO se muestra como una sola línea "EVENTOS"
- La comparación Presupuesto vs Real es GLOBAL (suma de todos los eventos vs presupuesto total de eventos)
- NO hay comparación individual por evento

#### ► EGRESOS NT - VARIABLES
| # | Concepto | Tipo | Frecuencia |
|---|----------|------|------------|
| 1 | Insumos y Papelería | Egreso | Variable/Mensual |
| 2 | Reparaciones Clínica | Egreso | Variable/Anual |
| 3 | Mantenimiento Aire | Egreso | Variable/Anual |
| 4 | Gastos Cursos | Egreso | Variable/Mensual |
| 5 | Gastos Varios Cumple (Tortas, bocaditos, meriendas) | Egreso | Variable/Mensual |
| 6 | Reserva | - | - |
| 7 | Reserva | - | - |
| 8 | Reserva | - | - |
| - | **TOTAL GASTOS VARIABLES** | - | - |

#### ► EGRESO - GANANCIA NEUROTEA (CALCULADO AUTOMÁTICAMENTE)
| # | Concepto | Tipo | Fórmula |
|---|----------|------|---------|
| 1 | Ganancia 7% | Calculado | = TOTAL INGRESOS NT - TOTAL EGRESOS NT (sin ganancia) |
| 2 | Utilidad al propietario | Calculado | = Ganancia × 33.33% |
| 3 | Fondo de emergencia | Calculado | = Ganancia × 33.33% |
| 4 | Fondo de Inversión | Calculado | = Ganancia × 33.33% |
| - | **TOTAL GANANCIA NEUROTEA** | - | - |

| - | **TOTAL EGRESOS NEUROTEA** | - | - |
| - | **BALANCE NEUROTEA (Ingresos - Egresos)** | - | - |
| - | **BALANCE TOTAL CONSOLIDADO FAM/NT** | - | - |

### 4.4 Semáforo de Ganancia NeuroTEA

| Condición | Color | Significado | Acción |
|-----------|-------|-------------|--------|
| Ganancia < 0 | 🔴 ROJO | Pérdida | Acción urgente requerida |
| 0% ≤ Ganancia < 7% | 🟡 AMARILLO | Por debajo de la meta | Revisar gastos |
| Ganancia ≥ 7% | 🟢 VERDE | Meta cumplida | Mantener el rumbo |

---

## 5. HOJA GASTOS_FIJOS - LISTA MAESTRA

### 5.1 Propósito
Centralizar todos los gastos fijos de FAMILIA y NEUROTEA con:
- Monto BASE que se arrastra mes a mes
- Posibilidad de actualizar el monto en cualquier mes
- Día de vencimiento (DÍA) para cálculo de liquidez

### 5.2 Estructura de la Hoja

```
| CONCEPTO | ENTIDAD | CATEGORÍA | FRECUENCIA | DÍA | BASE | ENE | FEB | MAR | ABR | MAY | JUN | JUL | AGO | SEP | OCT | NOV | DIC |
```

| Columna | Descripción |
|---------|-------------|
| **CONCEPTO** | Nombre del gasto fijo |
| **ENTIDAD** | FAMILIA o NEUROTEA |
| **CATEGORÍA** | Categoría del gasto (GASTOS FIJOS, CUOTAS, etc.) |
| **FRECUENCIA** | Fijo/Mensual o Fijo/Anual |
| **DÍA** | Día del mes en que vence (1-31) |
| **BASE** | Monto base inicial |
| **ENE-DIC** | Celdas opcionales para sobrescribir el BASE |

### 5.3 Lógica de Actualización de Montos

**Regla Principal:** El sistema siempre usa el **VALOR MÁS RECIENTE** (último mes con dato hacia atrás).

```
ALGORITMO para obtener MONTO_EFECTIVO del mes M:

1. Buscar desde el mes M hacia atrás (M, M-1, M-2, ..., ENE)
2. SI encuentra un valor en algún mes → Usar ese valor
3. SI NO encuentra ningún valor → Usar BASE

Ejemplo:
BASE = 400.000
FEB = 500.000
MAY = 700.000

Resultado por mes:
- ENE: 400.000 (usa BASE, no hay valores previos)
- FEB: 500.000 (usa FEB)
- MAR: 500.000 (usa FEB, último valor)
- ABR: 500.000 (usa FEB, último valor)
- MAY: 700.000 (usa MAY)
- JUN: 700.000 (usa MAY, último valor)
- ... hasta DIC: 700.000
```

### 5.4 Fórmula Sugerida para Google Sheets

Para la celda del mes de MARZO (columna I), por ejemplo:
```
=SI(I3<>""; I3; SI(H3<>""; H3; SI(G3<>""; G3; F3)))
```

O más elegante con BUSCAR:
```
=INDICE(F3:I3; MAX(SI(F3:I3<>""; COLUMNA(F3:I3)-COLUMNA(F3)+1)))
```

### 5.5 Diseño Visual - Separación FAMILIA / NEUROTEA

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                    GASTOS FIJOS - LISTA MAESTRA                                  │
│  DIA = día del mes que vence. Si un mes está vacío, usa el MONTO BASE.          │
├─────────────────────────────────────────────────────────────────────────────────┤
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓                    🟢 GASTOS FIJOS FAMILIA 🟢                          ▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
├─────────────────────────────────────────────────────────────────────────────────┤
│ CONCEPTO              │ENTIDAD │CATEGORÍA      │FREC    │DÍA│ BASE    │ENE│... │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Salario Lili          │FAMILIA │GASTOS FIJOS   │Fijo/Mes│ 5 │2.500.000│   │    │
│ Salario Laura         │FAMILIA │GASTOS FIJOS   │Fijo/Mes│ 5 │1.800.000│   │    │
│ Escuela Fabián/Brenda │FAMILIA │GASTOS FIJOS   │Fijo/Mes│10 │1.200.000│   │    │
│ Robótica Niños        │FAMILIA │GASTOS FIJOS   │Fijo/Mes│15 │  350.000│   │    │
│ Expensa Casa          │FAMILIA │GASTOS FIJOS   │Fijo/Mes│ 1 │  450.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Préstamo Lizzi        │FAMILIA │CUOTAS/PRÉST.  │Fijo/Mes│20 │  800.000│   │    │
│ Cajubi Marco          │FAMILIA │CUOTAS/PRÉST.  │Fijo/Mes│ 5 │  450.000│   │    │
│ Cuota ITAU            │FAMILIA │CUOTAS/PRÉST.  │Fijo/Mes│15 │1.500.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Giganet               │FAMILIA │SUSCRIPCIONES  │Fijo/Mes│ 1 │  180.000│   │    │
│ Tigo Familiar         │FAMILIA │SUSCRIPCIONES  │Fijo/Mes│28 │  250.000│   │    │
│ ChatGPT               │FAMILIA │SUSCRIPCIONES  │Fijo/Mes│15 │  120.000│   │    │
│ Claude Marco          │FAMILIA │SUSCRIPCIONES  │Fijo/Mes│15 │  120.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                 │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
│ ▓▓▓                    🔵 GASTOS FIJOS NEUROTEA 🔵                         ▓▓▓ │
│ ▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓▓ │
├─────────────────────────────────────────────────────────────────────────────────┤
│ CONCEPTO              │ENTIDAD │CATEGORÍA      │FREC    │DÍA│ BASE    │ENE│... │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Alquiler 1 (Principal)│NEUROTEA│CLÍNICA        │Fijo/Mes│ 5 │3.500.000│   │    │
│ Alquiler 2 (Secundar.)│NEUROTEA│CLÍNICA        │Fijo/Mes│ 5 │1.800.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Sueldo Aracely        │NEUROTEA│SUELDOS/HONOR. │Fijo/Mes│30 │2.800.000│   │    │
│ Sueldo Fátima         │NEUROTEA│SUELDOS/HONOR. │Fijo/Mes│30 │2.500.000│   │    │
│ Salario Admin (Marco) │NEUROTEA│SUELDOS/HONOR. │Fijo/Mes│30 │5.000.000│   │    │
│ Honorario Contador    │NEUROTEA│SUELDOS/HONOR. │Fijo/Mes│10 │  800.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
├───────────────────────┼────────┼───────────────┼────────┼───┼─────────┼───┼────┤
│ Celular Tigo NT       │NEUROTEA│TELEFONÍA      │Fijo/Mes│28 │  150.000│   │    │
│ Internet NT           │NEUROTEA│TELEFONÍA      │Fijo/Mes│15 │  200.000│   │    │
│ WhatsFlow             │NEUROTEA│TELEFONÍA      │Fijo/Mes│15 │  180.000│   │    │
│ ...                   │        │               │        │   │         │   │    │
└─────────────────────────────────────────────────────────────────────────────────┘
```

### 5.6 Colores para Diferenciación Visual

| Sección | Color Fondo | Color Texto | Código Hex Fondo |
|---------|-------------|-------------|------------------|
| Encabezado FAMILIA | Verde oscuro | Blanco | #166534 |
| Filas FAMILIA | Verde claro | Negro | #dcfce7 |
| Encabezado NEUROTEA | Azul oscuro | Blanco | #1e40af |
| Filas NEUROTEA | Azul claro | Negro | #dbeafe |
| Separador | Gris | - | #9ca3af |

### 5.7 Uso del DÍA de Vencimiento

El campo **DÍA** es crucial para:
1. **Cálculo de LIQUIDEZ 3 SEMANAS** - Determina en qué semana cae cada gasto
2. **Alertas de vencimiento** - Avisar cuando se acerca la fecha
3. **Ordenamiento** - Mostrar gastos en orden de vencimiento

```
Ejemplo de uso en LIQUIDEZ:
HOY = 3 de Enero

Gastos con DÍA entre 3-9 → SEMANA 1
Gastos con DÍA entre 10-16 → SEMANA 2
Gastos con DÍA entre 17-23 → SEMANA 3
```

### 5.8 Gastos Fijos Anuales

Para gastos que se pagan **una vez al año** (Ej: Antivirus, Impuesto Renta):
- FRECUENCIA = "Fijo/Anual"
- Solo se coloca valor en el MES que corresponde
- Los demás meses quedan vacíos (no se arrastran)

```
Ejemplo: Antivirus Clara (se paga en Marzo)

| CONCEPTO        | FREC       | BASE    | ENE | FEB | MAR     | ABR | ... |
|-----------------|------------|---------|-----|-----|---------|-----|-----|
| Antivirus Clara | Fijo/Anual | 350.000 |     |     | 350.000 |     |     |
```

### 5.9 Relación con Otras Hojas

```
GASTOS_FIJOS ─────┬────► MOVIMIENTO (columna REAL para gastos fijos)
                  │
                  ├────► LIQUIDEZ 3 SEMANAS (según DÍA VENC)
                  │
                  └────► PRESUPUESTO (validar que coincidan conceptos)
```

---

## 6. HOJA CARGA_FAMILIA - SISTEMA "ANTI-BURRO"

### 6.1 Estructura de la Hoja
```
| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA | ESTADO | NOTAS |
```

### 6.2 Lógica "Anti-Burro" (Validación Inteligente)

El sistema debe ser inteligente para evitar errores de carga:

#### Regla 1: TIPO determina si es INGRESO o EGRESO
```
SI TIPO está en lista de "TIPOS DE INGRESO FAMILIA":
   → Es un INGRESO
   → Columna CATEGORÍA se deshabilita o muestra "-"
   → Columna SUBCATEGORÍA se deshabilita o muestra "-"

SI TIPO = "Egreso Familiar":
   → Es un EGRESO
   → Columna CATEGORÍA se habilita (desplegable de categorías egreso)
   → Columna SUBCATEGORÍA depende de la CATEGORÍA elegida
```

#### Regla 2: CATEGORÍA determina SUBCATEGORÍA disponible
```
SI CATEGORÍA = "VARIABLES":
   → SUBCATEGORÍA muestra desplegable de Variables Familia
   (Supermercado, Combustible, Mantenimiento Auto, etc.)

SI CATEGORÍA = "GASTOS FIJOS", "CUOTAS Y PRÉSTAMOS", etc.:
   → SUBCATEGORÍA se deshabilita (los fijos no tienen subcategoría variable)
```

#### Regla 3: Validación de combinaciones inválidas

| TIPO | CATEGORÍA Válida | SUBCATEGORÍA Válida |
|------|------------------|---------------------|
| Salario Marco | - (deshabilitado) | - (deshabilitado) |
| Honorarios Clara | - (deshabilitado) | - (deshabilitado) |
| Préstamo NeuroTEA | - (deshabilitado) | - (deshabilitado) |
| Egreso Familiar | VARIABLES | Supermercado, Combustible, etc. |
| Egreso Familiar | GASTOS FIJOS | - (deshabilitado) |

### 6.3 Tipos de Ingreso Familia (Desplegable completo)
1. Salario Marco
2. **Salario Marco NeuroTEA**
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

### 6.4 Tipo de Egreso Familia
- **Egreso Familiar** (único tipo que habilita CATEGORÍA y SUBCATEGORÍA)

### 6.5 Subcategorías Variables Familia (cuando CATEGORÍA = VARIABLES)
1. Supermercado
2. Combustible
3. Mantenimiento / Reparaciones Auto Clara
4. Mantenimiento / Reparaciones Auto Niños
5. Mantenimiento / Reparaciones Camioneta Marco
6. Ropa/Vestidos
7. Recreación
8. Salud y Medicamentos
9. Gastos no identificados
10. **Devolución Familia → NT** (para devolver préstamos a NeuroTEA)

### 6.6 Ejemplo de Carga Correcta

| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA |
|-------|------|-----------|--------------|-------------|-------|--------|
| 02/01/26 | Salario Marco | - | - | Enero Itaipu | 8.500.000 | ITAU Marco |
| 02/01/26 | Salario Marco NeuroTEA | - | - | Enero Admin | 5.000.000 | ITAU Marco |
| 03/01/26 | Egreso Familiar | VARIABLES | Supermercado | Stock mensual | 450.000 | Efectivo |
| 05/01/26 | Egreso Familiar | VARIABLES | Combustible | Nafta | 200.000 | Tarjeta ITAU Marco |
| 10/01/26 | Egreso Familiar | VARIABLES | Devolución Familia → NT | Devuelvo préstamo | 500.000 | ITAU Marco |

### 6.7 Filtro por Mes
- Desplegable en celda fija que OCULTA filas de otros meses
- Muestra solo las transacciones del mes seleccionado
- Resumen automático al final: Total Ingresos | Total Egresos | Balance

---

## 7. HOJA CARGA_NT - SISTEMA "ANTI-BURRO"

### 7.1 Estructura de la Hoja
```
| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA/EVENTO | DESCRIPCIÓN | MONTO | CUENTA | ESTADO | NOTAS |
```

### 7.2 Lógica "Anti-Burro" para NeuroTEA

#### Regla 1: TIPO determina si es INGRESO o EGRESO
```
SI TIPO está en lista de "TIPOS DE INGRESO NT":
   → Es un INGRESO
   → CATEGORÍA se deshabilita
   → SUBCATEGORÍA se deshabilita

SI TIPO = "Egreso NT":
   → Es un EGRESO
   → CATEGORÍA se habilita (CLÍNICA, SUELDOS, TELEFONÍA, OBLIGACIONES, EVENTOS, VARIABLES)
   → SUBCATEGORÍA depende de la CATEGORÍA
```

#### Regla 2: CATEGORÍA determina opciones de SUBCATEGORÍA

| CATEGORÍA | SUBCATEGORÍA disponible |
|-----------|------------------------|
| CLÍNICA | - (deshabilitado, son fijos) |
| SUELDOS Y HONORARIOS | - (deshabilitado, son fijos) |
| TELEFONÍA E INTERNET | - (deshabilitado, son fijos) |
| OBLIGACIONES LEGALES | - (deshabilitado, son fijos) |
| **EVENTOS** | Lista de eventos (Día del Niño, San Juan, etc.) |
| **VARIABLES** | Lista de variables (Insumos, Reparaciones, etc.) |

### 7.3 Tipos de Ingreso NT (Desplegable)
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros
4. **Devolución Familia → NT** (cuando Familia devuelve préstamo)

### 7.4 Tipo de Egreso NT
- **Egreso NT** (único tipo que habilita CATEGORÍA y SUBCATEGORÍA)

### 7.5 Subcategorías EVENTOS NT (cuando CATEGORÍA = EVENTOS)
1. Día del Niño
2. San Juan
3. Día del Autismo
4. Clausura Padres
5. Navidad Papá Noel
6. Cena Fin de Año

### 7.6 Subcategorías VARIABLES NT (cuando CATEGORÍA = VARIABLES)
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple
6. **Préstamo NT → Familia** (cuando NT presta dinero a Familia)

### 7.7 Ejemplo de Carga Correcta

| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA |
|-------|------|-----------|--------------|-------------|-------|--------|
| 02/01/26 | Aporte NeuroTEA Terapeutas | - | - | Semana 1 | 6.000.000 | Atlas NT |
| 05/01/26 | Egreso NT | VARIABLES | Insumos y Papelería | Materiales | 150.000 | Caja Chica |
| 10/01/26 | Egreso NT | EVENTOS | Día del Autismo | Decoración | 200.000 | Atlas NT |
| 15/01/26 | Egreso NT | VARIABLES | Préstamo NT → Familia | Marco necesita | 3.000.000 | Atlas NT |
| 20/01/26 | Devolución Familia → NT | - | - | Marco devuelve | 500.000 | Atlas NT |

### 7.8 TRATAMIENTO ESPECIAL DE EVENTOS

**En CARGA_NT:**
- Se registra cada evento con su nombre específico (Día del Niño, San Juan, etc.)
- Cada registro tiene su monto individual

**En MOVIMIENTO:**
- Todos los eventos se agrupan en UNA SOLA LÍNEA llamada "EVENTOS"
- La columna REAL suma todos los eventos del mes
- La comparación es: PRESUPUESTO TOTAL EVENTOS vs REAL TOTAL EVENTOS
- NO se compara evento por evento

**Ejemplo:**
```
MOVIMIENTO - Junio 2026
| CONCEPTO | PRESUPUESTO | REAL | DIFERENCIA |
| EVENTOS  | 500.000     | 450.000 | +50.000 ✅ |

Donde REAL = Suma de:
- San Juan: 300.000
- Cumple empleado: 150.000
```

---

## 8. HOJA MOVIMIENTO - CONTROL MENSUAL

### 8.1 Estructura
- Selector de mes en celda fija
- Vista lado a lado: FAMILIA | NEUROTEA
- Columnas: CONCEPTO | TIPO | FRECUENCIA | PRESUPUESTO | REAL | DIFERENCIA | % | ESTADO

### 8.2 Lógica de Datos REAL

| Tipo de Gasto | Fuente del dato REAL |
|---------------|---------------------|
| Fijo/Mensual | GASTOS_FIJOS (columna del mes) |
| Fijo/Anual | GASTOS_FIJOS (columna del mes donde aplica) |
| Variable/Mensual | SUMA de CARGA_FAMILIA o CARGA_NT filtrado por mes y subcategoría |
| Variable/Anual | SUMA de CARGA_FAMILIA o CARGA_NT filtrado por mes y subcategoría |
| **EVENTOS (NT)** | SUMA de todos los registros con CATEGORÍA = "EVENTOS" del mes |

### 8.3 Estados y Contabilización
- **Pendiente:** No suma a "Egresos Pagados", sí suma a "Egresos Pendientes"
- **Pagado:** Suma a "Egresos Pagados", resta de "Egresos Pendientes"
- **Cancelado:** No suma a ninguno

---

## 9. FLUJO DE DATOS COMPLETO

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CONFIG                                          │
│  (Listas maestras, tipos, categorías, subcategorías, metas)                 │
└─────────────────────────────────────────────────────────────────────────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
         ┌─────────────────┐ ┌─────────────────┐ ┌─────────────────┐
         │  CARGA_FAMILIA  │ │    CARGA_NT     │ │  GASTOS_FIJOS   │
         │  (Variables)    │ │  (Variables +   │ │  (Montos base   │
         │                 │ │   Eventos)      │ │   × 12 meses)   │
         └────────┬────────┘ └────────┬────────┘ └────────┬────────┘
                  │                   │                   │
                  └───────────────────┼───────────────────┘
                                      │
                                      ▼
                           ┌─────────────────┐
                           │   PRESUPUESTO   │
                           │ (Plan anual)    │◄─── Comparación
                           └────────┬────────┘
                                    │
                                    ▼
                           ┌─────────────────┐
                           │   MOVIMIENTO    │
                           │ (Real vs Plan)  │
                           └────────┬────────┘
                                    │
                    ┌───────────────┼───────────────┐
                    ▼               ▼               ▼
         ┌─────────────────┐ ┌─────────────────┐
         │    TABLERO      │ │    WEB APP      │
         │   (KPIs hoja)   │ │  (Dashboard)    │
         └─────────────────┘ └─────────────────┘
```

---

## 10. BALANCE CRUZADO NT ↔ FAMILIA

### 10.1 Registro de Préstamos

**Cuando NeuroTEA presta a Familia:**

| Hoja | TIPO | CATEGORÍA | SUBCATEGORÍA | Columna |
|------|------|-----------|--------------|---------|
| CARGA_NT | Egreso NT | VARIABLES | Préstamo NT → Familia | EGRESO |
| CARGA_FAMILIA | Préstamo NeuroTEA | - | - | INGRESO |

**Cuando Familia devuelve a NeuroTEA:**

| Hoja | TIPO | CATEGORÍA | SUBCATEGORÍA | Columna |
|------|------|-----------|--------------|---------|
| CARGA_FAMILIA | Egreso Familiar | VARIABLES | Devolución Familia → NT | EGRESO |
| CARGA_NT | Devolución Familia → NT | - | - | INGRESO |

### 10.2 Cálculo del Saldo Neto
```
PRÉSTAMOS NT→FAM = SUMA(CARGA_NT donde SUBCATEGORÍA = "Préstamo NT → Familia")
DEVOLUCIONES FAM→NT = SUMA(CARGA_NT donde TIPO = "Devolución Familia → NT")

SALDO NETO = PRÉSTAMOS NT→FAM - DEVOLUCIONES FAM→NT

SI SALDO > 0 → "NT SUBSIDIA A FAMILIA" (Familia debe a NT) 🔴
SI SALDO < 0 → "FAMILIA SUBSIDIA A NT" (NT debe a Familia) 🟡
SI SALDO = 0 → "FINANZAS EQUILIBRADAS" 🟢
```

---

## 11. LIQUIDEZ 3 SEMANAS - FLUJO DE CAJA

### 11.1 Propósito
Prever si habrá dinero suficiente en las próximas 3 semanas para cubrir los gastos que vencen. Esto permite tomar decisiones anticipadas (postergar un gasto, buscar ingreso extra, etc.).

### 11.2 Conceptos Clave

| Concepto | Definición | Fórmula |
|----------|------------|---------|
| **CAJA DISPONIBLE** | Dinero "libre" después de pagar | Ingresos del mes - Egresos PAGADOS |
| **GASTOS POR VENCER** | Compromisos próximos | Suma de gastos con estado "Pendiente" que vencen en las próximas semanas |
| **LIQUIDEZ SEMANA X** | Proyección de caja | CAJA DISPONIBLE - GASTOS POR VENCER (acumulado hasta esa semana) |

### 11.3 Cálculo Detallado

#### Paso 1: Calcular CAJA DISPONIBLE (hoy)
```
INGRESOS_MES = Suma de todos los ingresos del mes actual (de CARGA_FAMILIA o CARGA_NT)
EGRESOS_PAGADOS = Suma de gastos donde ESTADO = "Pagado" del mes actual

CAJA_DISPONIBLE = INGRESOS_MES - EGRESOS_PAGADOS
```

#### Paso 2: Identificar GASTOS POR VENCER (según DÍA VENC de GASTOS_FIJOS)
```
Para cada gasto fijo en GASTOS_FIJOS:
  - SI DÍA_VENC está entre HOY y FIN_SEMANA_1 → Sumar a VENCER_SEM1
  - SI DÍA_VENC está entre FIN_SEMANA_1 y FIN_SEMANA_2 → Sumar a VENCER_SEM2
  - SI DÍA_VENC está entre FIN_SEMANA_2 y FIN_SEMANA_3 → Sumar a VENCER_SEM3
```

#### Paso 3: Calcular LIQUIDEZ por Semana
```
LIQUIDEZ_SEM1 = CAJA_DISPONIBLE - VENCER_SEM1
LIQUIDEZ_SEM2 = LIQUIDEZ_SEM1 - VENCER_SEM2
LIQUIDEZ_SEM3 = LIQUIDEZ_SEM2 - VENCER_SEM3
```

### 11.4 Semáforo de Liquidez

| Condición | Color | Significado | Acción |
|-----------|-------|-------------|--------|
| LIQUIDEZ_SEMX < 0 | 🔴 ROJO | Déficit proyectado | Buscar ingreso o postergar gasto |
| 0 ≤ LIQUIDEZ_SEMX < 500.000 | 🟡 AMARILLO | Margen ajustado | Monitorear de cerca |
| LIQUIDEZ_SEMX ≥ 500.000 | 🟢 VERDE | Liquidez saludable | Continuar normalmente |

### 11.5 Visualización en Dashboard

```
┌─────────────────────────────────────────────────────────────┐
│  LIQUIDEZ 3 SEMANAS - FAMILIA                               │
├─────────────────────────────────────────────────────────────┤
│  Caja Disponible Hoy:           Gs. 2.500.000              │
├───────────────┬───────────────┬───────────────┬────────────┤
│    SEMANA 1   │    SEMANA 2   │    SEMANA 3   │   ESTADO   │
│  (5-11 Ene)   │  (12-18 Ene)  │  (19-25 Ene)  │            │
├───────────────┼───────────────┼───────────────┼────────────┤
│ Por Vencer:   │ Por Vencer:   │ Por Vencer:   │            │
│ - Alquiler    │ - Escuela     │ - ANDE        │            │
│ - Cuota ITAU  │ - Seguro      │ - Tigo        │            │
│ = 1.200.000   │ = 800.000     │ = 350.000     │            │
├───────────────┼───────────────┼───────────────┼────────────┤
│ Liquidez:     │ Liquidez:     │ Liquidez:     │            │
│ 1.300.000 🟢  │ 500.000 🟡    │ 150.000 🔴    │  ⚠️ ALERTA │
└───────────────┴───────────────┴───────────────┴────────────┘
```

### 11.6 Notas Importantes
- Este cálculo se realiza para FAMILIA y NEUROTEA por separado
- Los gastos variables estimados del mes también deben considerarse
- Si la LIQUIDEZ_SEM3 es negativa, el sistema debe alertar ANTES de que llegue esa semana
- El usuario puede marcar gastos como "Postergable" para simular escenarios

---

## 12. SALDOS EN CUENTAS - CONCILIACIÓN BANCARIA

### 12.1 Propósito
Comparar el saldo CALCULADO (según los movimientos cargados) con el saldo REAL (lo que se ve en la app del banco). La diferencia revela gastos no registrados o errores de carga.

### 12.2 Tipos de Saldo

| Tipo | Fuente | Descripción |
|------|--------|-------------|
| **ESPERADO** | Calculado | Saldo inicial + Ingresos a cuenta - Egresos de cuenta |
| **REAL** | Manual | Lo que el usuario ve en la app del banco |
| **DIFERENCIA** | Calculado | REAL - ESPERADO |

### 12.3 Estructura de la Sección

```
| CUENTA | SALDO INICIAL | INGRESOS | EGRESOS | ESPERADO | REAL | DIFERENCIA | ESTADO |
```

### 12.4 Cálculo del Saldo ESPERADO

Para cada cuenta (Ej: "ITAU Marco"):
```
SALDO_INICIAL = Valor configurado al inicio del mes (o arrastrado del mes anterior)

INGRESOS_CUENTA = Suma de todos los registros en CARGA_FAMILIA donde:
  - CUENTA = "ITAU Marco"
  - TIPO está en lista de ingresos

EGRESOS_CUENTA = Suma de todos los registros en CARGA_FAMILIA donde:
  - CUENTA = "ITAU Marco"
  - TIPO = "Egreso Familiar"
  - ESTADO = "Pagado"

SALDO_ESPERADO = SALDO_INICIAL + INGRESOS_CUENTA - EGRESOS_CUENTA
```

### 12.5 Ingreso del Saldo REAL

- El usuario ingresa MANUALMENTE el saldo que ve en la app del banco
- Se recomienda actualizar al menos 1 vez por semana
- Campo editable en TABLERO o sección dedicada

### 12.6 Interpretación de la DIFERENCIA

| Diferencia | Significado | Acción |
|------------|-------------|--------|
| DIFERENCIA = 0 | ✅ Perfecto | Registros completos y correctos |
| DIFERENCIA > 0 (REAL > ESPERADO) | 🟢 Hay más dinero del esperado | Posible ingreso no registrado |
| DIFERENCIA < 0 (REAL < ESPERADO) | 🔴 Hay menos dinero del esperado | Posible gasto no registrado |

### 12.7 Ejemplo Práctico

```
CUENTA: ITAU Marco - Enero 2026

Saldo Inicial (01/01):     Gs. 500.000
+ Salario Marco:           Gs. 8.500.000
+ Salario Marco NT:        Gs. 5.000.000
- Cuota ITAU:              Gs. 1.200.000
- Nafta:                   Gs. 300.000
─────────────────────────────────────────
SALDO ESPERADO:            Gs. 12.500.000

SALDO REAL (app banco):    Gs. 12.150.000

DIFERENCIA:                Gs. -350.000 🔴

→ Interpretación: Hay Gs. 350.000 de gastos NO registrados
→ Acción: Revisar extracto bancario y cargar los gastos faltantes
```

### 12.8 Visualización en Dashboard

```
┌─────────────────────────────────────────────────────────────────────────┐
│  CONCILIACIÓN BANCARIA - FAMILIA                        [Enero 2026]   │
├─────────────────┬────────────┬────────────┬────────────┬───────────────┤
│     CUENTA      │  ESPERADO  │    REAL    │ DIFERENCIA │    ESTADO     │
├─────────────────┼────────────┼────────────┼────────────┼───────────────┤
│ ITAU Marco      │ 12.500.000 │ 12.150.000 │  -350.000  │ 🔴 Revisar    │
│ Coop. Univ.     │  2.300.000 │  2.300.000 │      0     │ ✅ OK         │
│ ITAU Clara      │  1.800.000 │  1.850.000 │   +50.000  │ 🟢 Ingreso?   │
│ Efectivo        │    400.000 │    350.000 │   -50.000  │ 🟡 Menor      │
├─────────────────┼────────────┼────────────┼────────────┼───────────────┤
│ **TOTAL**       │ 17.000.000 │ 16.650.000 │  -350.000  │               │
└─────────────────┴────────────┴────────────┴────────────┴───────────────┘
```

### 12.9 Frecuencia de Actualización Recomendada
- **Semanal:** Actualizar REAL de cuentas principales (ITAU, Coop)
- **Quincenal:** Actualizar tarjetas de crédito
- **Fin de mes:** Conciliación completa de todas las cuentas

---

## 13. COLORES DEL SISTEMA

| Uso | Color | Código Hex |
|-----|-------|------------|
| Familia (principal) | Verde esmeralda | #059669 |
| Familia (fondo claro) | Verde pastel | #dcfce7 |
| NeuroTEA (principal) | Azul intenso | #1d4ed8 |
| NeuroTEA (fondo claro) | Azul pastel | #dbeafe |
| Balance Cruzado | Púrpura | #7c3aed |
| Alerta/Pérdida | Rojo | #dc2626 |
| Advertencia | Amarillo/Naranja | #f59e0b |
| Cumplimiento/OK | Verde claro | #22c55e |
| Textos | Gris oscuro | #1f2937 |
| Fondos | Gris muy claro | #f3f4f6 |

---

## 14. RESUMEN DE CAMBIOS POR VERSIÓN

### Versión 2.0
| # | Corrección | Estado |
|---|------------|--------|
| 1 | Agregado "Salario Marco NeuroTEA" en TIPOS INGRESO FAM | ✅ |
| 2 | Agregado "Tarjeta ITAU Marco" en CUENTAS FAMILIA | ✅ |
| 3 | Detalladas SUBCATEGORÍAS VARIABLES FAMILIA | ✅ |
| 4 | Detalladas SUBCATEGORÍAS VARIABLES NT | ✅ |
| 5 | Detalladas SUBCATEGORÍAS EVENTOS NT | ✅ |
| 6 | Presupuesto completo con todas las Reservas | ✅ |
| 7 | Lógica "Anti-Burro" documentada para CARGA_FAMILIA | ✅ |
| 8 | Lógica "Anti-Burro" documentada para CARGA_NT | ✅ |
| 9 | Tratamiento especial de EVENTOS documentado | ✅ |
| 10 | Relación Salario Administrador NT ↔ Ingreso Marco explicada | ✅ |

### Versión 2.1
| # | Adición/Aclaración | Estado |
|---|-------------------|--------|
| 11 | Nueva sección LIQUIDEZ 3 SEMANAS con cálculo detallado | ✅ |
| 12 | Nueva sección SALDOS EN CUENTAS (Esperado vs Real) | ✅ |
| 13 | Aclaración: Flujo de Honorarios Clara (aportes vienen NETOS) | ✅ |
| 14 | Aclaración: Fondos NT son VIRTUALES (no cuentas bancarias) | ✅ |
| 15 | Visualizaciones de dashboard para Liquidez y Conciliación | ✅ |

### Versión 2.2
| # | Adición/Aclaración | Estado |
|---|-------------------|--------|
| 16 | Nueva sección GASTOS_FIJOS completa con estructura y lógica | ✅ |
| 17 | Lógica de arrastre de monto BASE (último valor prevalece) | ✅ |
| 18 | Diseño visual con separación clara FAMILIA / NEUROTEA | ✅ |
| 19 | Columna DÍA VENC para cálculo de liquidez | ✅ |
| 20 | Fórmulas sugeridas para Google Sheets | ✅ |
| 21 | Tratamiento de gastos fijos anuales | ✅ |

---

## 15. PENDIENTES PARA PRÓXIMA VERSIÓN

| # | Tema | Descripción |
|---|------|-------------|
| 1 | WEB APP | Especificación técnica de Google Apps Script |
| 2 | Fórmulas | Documentar fórmulas exactas de Google Sheets |
| 3 | TABLERO | Estructura detallada de KPIs en hoja |

---

*Documento actualizado el 30 de diciembre de 2025*
*Versión: 2.2 - Con GASTOS_FIJOS Completo*
