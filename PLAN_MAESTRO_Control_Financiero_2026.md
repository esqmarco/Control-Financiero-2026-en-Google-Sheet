# PLAN MAESTRO: Sistema de Control Financiero 2026
## NeuroTEA & Familia - Google Sheets + Web App
### Versión 2.0 - Revisada y Corregida

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

## 5. HOJA CARGA_FAMILIA - SISTEMA "ANTI-BURRO"

### 5.1 Estructura de la Hoja
```
| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA | ESTADO | NOTAS |
```

### 5.2 Lógica "Anti-Burro" (Validación Inteligente)

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

### 5.3 Tipos de Ingreso Familia (Desplegable completo)
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

### 5.4 Tipo de Egreso Familia
- **Egreso Familiar** (único tipo que habilita CATEGORÍA y SUBCATEGORÍA)

### 5.5 Subcategorías Variables Familia (cuando CATEGORÍA = VARIABLES)
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

### 5.6 Ejemplo de Carga Correcta

| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA |
|-------|------|-----------|--------------|-------------|-------|--------|
| 02/01/26 | Salario Marco | - | - | Enero Itaipu | 8.500.000 | ITAU Marco |
| 02/01/26 | Salario Marco NeuroTEA | - | - | Enero Admin | 5.000.000 | ITAU Marco |
| 03/01/26 | Egreso Familiar | VARIABLES | Supermercado | Stock mensual | 450.000 | Efectivo |
| 05/01/26 | Egreso Familiar | VARIABLES | Combustible | Nafta | 200.000 | Tarjeta ITAU Marco |
| 10/01/26 | Egreso Familiar | VARIABLES | Devolución Familia → NT | Devuelvo préstamo | 500.000 | ITAU Marco |

### 5.7 Filtro por Mes
- Desplegable en celda fija que OCULTA filas de otros meses
- Muestra solo las transacciones del mes seleccionado
- Resumen automático al final: Total Ingresos | Total Egresos | Balance

---

## 6. HOJA CARGA_NT - SISTEMA "ANTI-BURRO"

### 6.1 Estructura de la Hoja
```
| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA/EVENTO | DESCRIPCIÓN | MONTO | CUENTA | ESTADO | NOTAS |
```

### 6.2 Lógica "Anti-Burro" para NeuroTEA

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

### 6.3 Tipos de Ingreso NT (Desplegable)
1. Aporte NeuroTEA Terapeutas
2. Cursos NeuroTEA
3. Otros
4. **Devolución Familia → NT** (cuando Familia devuelve préstamo)

### 6.4 Tipo de Egreso NT
- **Egreso NT** (único tipo que habilita CATEGORÍA y SUBCATEGORÍA)

### 6.5 Subcategorías EVENTOS NT (cuando CATEGORÍA = EVENTOS)
1. Día del Niño
2. San Juan
3. Día del Autismo
4. Clausura Padres
5. Navidad Papá Noel
6. Cena Fin de Año

### 6.6 Subcategorías VARIABLES NT (cuando CATEGORÍA = VARIABLES)
1. Insumos y Papelería
2. Reparaciones Clínica
3. Mantenimiento Aire
4. Gastos Cursos
5. Gastos Varios Cumple
6. **Préstamo NT → Familia** (cuando NT presta dinero a Familia)

### 6.7 Ejemplo de Carga Correcta

| FECHA | TIPO | CATEGORÍA | SUBCATEGORÍA | DESCRIPCIÓN | MONTO | CUENTA |
|-------|------|-----------|--------------|-------------|-------|--------|
| 02/01/26 | Aporte NeuroTEA Terapeutas | - | - | Semana 1 | 6.000.000 | Atlas NT |
| 05/01/26 | Egreso NT | VARIABLES | Insumos y Papelería | Materiales | 150.000 | Caja Chica |
| 10/01/26 | Egreso NT | EVENTOS | Día del Autismo | Decoración | 200.000 | Atlas NT |
| 15/01/26 | Egreso NT | VARIABLES | Préstamo NT → Familia | Marco necesita | 3.000.000 | Atlas NT |
| 20/01/26 | Devolución Familia → NT | - | - | Marco devuelve | 500.000 | Atlas NT |

### 6.8 TRATAMIENTO ESPECIAL DE EVENTOS

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

## 7. HOJA MOVIMIENTO - CONTROL MENSUAL

### 7.1 Estructura
- Selector de mes en celda fija
- Vista lado a lado: FAMILIA | NEUROTEA
- Columnas: CONCEPTO | TIPO | FRECUENCIA | PRESUPUESTO | REAL | DIFERENCIA | % | ESTADO

### 7.2 Lógica de Datos REAL

| Tipo de Gasto | Fuente del dato REAL |
|---------------|---------------------|
| Fijo/Mensual | GASTOS_FIJOS (columna del mes) |
| Fijo/Anual | GASTOS_FIJOS (columna del mes donde aplica) |
| Variable/Mensual | SUMA de CARGA_FAMILIA o CARGA_NT filtrado por mes y subcategoría |
| Variable/Anual | SUMA de CARGA_FAMILIA o CARGA_NT filtrado por mes y subcategoría |
| **EVENTOS (NT)** | SUMA de todos los registros con CATEGORÍA = "EVENTOS" del mes |

### 7.3 Estados y Contabilización
- **Pendiente:** No suma a "Egresos Pagados", sí suma a "Egresos Pendientes"
- **Pagado:** Suma a "Egresos Pagados", resta de "Egresos Pendientes"
- **Cancelado:** No suma a ninguno

---

## 8. FLUJO DE DATOS COMPLETO

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

## 9. BALANCE CRUZADO NT ↔ FAMILIA

### 9.1 Registro de Préstamos

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

### 9.2 Cálculo del Saldo Neto
```
PRÉSTAMOS NT→FAM = SUMA(CARGA_NT donde SUBCATEGORÍA = "Préstamo NT → Familia")
DEVOLUCIONES FAM→NT = SUMA(CARGA_NT donde TIPO = "Devolución Familia → NT")

SALDO NETO = PRÉSTAMOS NT→FAM - DEVOLUCIONES FAM→NT

SI SALDO > 0 → "NT SUBSIDIA A FAMILIA" (Familia debe a NT) 🔴
SI SALDO < 0 → "FAMILIA SUBSIDIA A NT" (NT debe a Familia) 🟡
SI SALDO = 0 → "FINANZAS EQUILIBRADAS" 🟢
```

---

## 10. COLORES DEL SISTEMA

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

## 11. RESUMEN DE CORRECCIONES V2.0

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

---

*Documento actualizado el 30 de diciembre de 2025*
*Versión: 2.0 - Revisada con observaciones del usuario*
