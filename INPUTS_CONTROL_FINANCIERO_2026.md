# DATOS DE ENTRADA - CONTROL FINANCIERO 2026

Este documento contiene todos los valores cargados (inputs) en el sistema de control financiero. Son datos reales de enero 2026.

---

## ESTRUCTURA DEL SISTEMA

El sistema tiene 2 entidades financieras separadas:
- **FAMILIA**: Gastos e ingresos del hogar
- **NEUROTEA**: Clínica de terapia para autismo

Las hojas de **INPUT** (donde se cargan datos manualmente) son:
1. `GASTOS_FIJOS` - Gastos recurrentes con día de vencimiento
2. `CARGA_FAMILIA` - Ingresos y egresos variables de la familia
3. `CARGA_NT` - Ingresos y egresos variables de NeuroTEA

Las demás hojas (TABLERO, MOVIMIENTO, LIQUIDEZ, PRESUPUESTO) son **cálculos** basados en estos inputs.

---

## 1. HOJA GASTOS_FIJOS

### Estructura de columnas:
| Columna | Contenido |
|---------|-----------|
| CONCEPTO | Nombre del gasto |
| ENTIDAD | FAMILIA o NEUROTEA |
| CATEGORÍA | Tipo de gasto |
| FRECUENCIA | Fijo/Mensual, Variable/Mensual, Fijo/Anual, Variable/Anual |
| DÍA | Día del mes que vence |
| CUENTA | Cuenta desde donde se paga |
| ENE-DIC | Monto por cada mes (si hay valor en ENE, aplica a todos los meses) |

---

### 🏠 GASTOS FIJOS FAMILIA

#### Categoría: GASTOS FIJOS
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Salario Lili Doméstico | Fijo/Mensual | 1 | ITAU Marco | 2.550.000 |
| Salario Laura Doméstico | Fijo/Mensual | 1 | ITAU Marco | 2.550.000 |
| Escuela Fabián y Brenda | Fijo/Mensual | 10 | ITAU Marco | (sin valor) |
| Robótica Niños | Fijo/Mensual | 10 | ITAU Marco | (sin valor) |
| ANDE Casa | Variable/Mensual | 15 | ITAU Marco | (sin valor) |
| Expensa Casa | Fijo/Mensual | 1 | ITAU Marco | 490.500 |
| Ña Luisa | Fijo/Mensual | 5 | ITAU Marco | 2.000.000 |
| Remedio Lochi | Variable/Mensual | 15 | ITAU Marco | 500.000 |
| Seguro Médico Papá y Mamá | Fijo/Mensual | 10 | ITAU Marco | (sin valor) |
| Contadora Marco | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |

#### Categoría: CUOTAS Y PRÉSTAMOS
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Préstamo Lizzi | Fijo/Mensual | 20 | ITAU Marco | 2.500.000 |
| Cajubi Marco | Fijo/Mensual | 5 | ITAU Marco | (sin valor) |
| Mutual Marco | Fijo/Mensual | 5 | ITAU Marco | 30.000.000 |
| Seguro Auto Laura ITAU | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| Cuota ITAU | Variable/Mensual | 15 | ITAU Marco | (sin valor) |
| Auto Laura Cuota | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| Coop. Universitaria Clara | Fijo/Mensual | 10 | ITAU Marco | 702.060 |
| Coomecipar Clara | Fijo/Mensual | 10 | ITAU Marco | 2.052.000 |
| Préstamo Solar | Fijo/Mensual | 20 | ITAU Marco | 1.220.617 |
| Préstamo Comecipar | Fijo/Mensual | 20 | ITAU Marco | 2.015.568 |
| Show Congelador | Fijo/Mensual | 25 | ITAU Marco | (sin valor) |
| Pago Mínimo Tarj ITAU Clara | Variable/Mensual | 10 | ITAU Marco | (sin valor) |
| Pago Mínimo Tarj ITAU Marco | Variable/Mensual | 10 | ITAU Marco | (sin valor) |
| Pago Mínimo Tarj Solar Clara | Variable/Mensual | 15 | ITAU Marco | (sin valor) |
| Pago Mínimo Tarj Comecipar | Variable/Mensual | 15 | ITAU Marco | (sin valor) |

#### Categoría: OBLIGACIONES LEGALES
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Aporte IPS | Fijo/Mensual | 5 | ITAU Marco | (sin valor) |
| Aporte Cajubi | Fijo/Mensual | 5 | ITAU Marco | (sin valor) |
| Aporte STEIBI | Fijo/Mensual | 5 | ITAU Marco | 684.167 |
| Aporte SICHAP | Fijo/Mensual | 5 | ITAU Marco | 684.167 |
| Impuesto compra digital | Variable/Mensual | 20 | ITAU Marco | (sin valor) |
| Aporte Coop. Univer. Clara | Fijo/Mensual | 10 | ITAU Marco | (sin valor) |
| Aporte Coop. Univer. Marco | Fijo/Mensual | 10 | ITAU Marco | (sin valor) |
| Impuesto Renta personal | Fijo/Anual | 31 | ITAU Marco | (sin valor) |
| Impuesto terreno casa | Fijo/Anual | 31 | ITAU Marco | (sin valor) |

#### Categoría: SUSCRIPCIONES
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Giganet | Fijo/Mensual | 1 | ITAU Marco | 250.000 |
| Tigo Clara | Fijo/Mensual | 28 | ITAU Marco | (sin valor) |
| Tigo Familiar | Fijo/Mensual | 28 | ITAU Marco | (sin valor) |
| Google One | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| ChatGPT | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| Claude Marco | Fijo/Mensual | 4 | ITAU Marco | 630.000 |
| Claude Clara | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| Antivirus Clara (Anual) | Fijo/Anual | 15 | ITAU Marco | (sin valor) |
| Antivirus Marco (Anual) | Fijo/Anual | 15 | ITAU Marco | (sin valor) |
| MS Office Clara (Anual) | Fijo/Anual | 15 | ITAU Marco | 650.000 |
| MS Office Marco (Anual) | Fijo/Anual | 15 | ITAU Marco | (sin valor) |
| PosterWall | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| Canva (Anual) | Fijo/Anual | 15 | ITAU Marco | (sin valor) |
| Scribd | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |
| iLovePDF | Fijo/Mensual | 15 | ITAU Marco | (sin valor) |

---

### 🏥 GASTOS FIJOS NEUROTEA

#### Categoría: CLÍNICA
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Alquiler 1 (Principal) | Fijo/Mensual | 5 | Atlas NeuroTEA | 13.837.500 |
| Alquiler 2 (Secundario) | Fijo/Mensual | 5 | Atlas NeuroTEA | 4.190.000 |
| ANDE clínica | Variable/Mensual | 15 | Atlas NeuroTEA | (sin valor) |

#### Categoría: SUELDOS Y HONORARIOS
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Sueldo Aracely | Fijo/Mensual | 30 | Atlas NeuroTEA | 2.900.000 |
| Sueldo Fátima | Fijo/Mensual | 30 | Atlas NeuroTEA | 2.640.000 |
| Limpieza NeuroTEA | Variable/Mensual | 30 | Atlas NeuroTEA | 1.050.000 |
| Honorario Contador | Fijo/Mensual | 10 | Atlas NeuroTEA | 250.000 |
| Salario Administrador (Marco) | Fijo/Mensual | 30 | Atlas NeuroTEA | 0 |
| Honorario Mant. Sistema | Fijo/Mensual | 15 | Atlas NeuroTEA | 0 |
| Honorario Comunity Manager | Fijo/Mensual | 15 | Atlas NeuroTEA | 1.540.000 |

#### Categoría: TELEFONÍA E INTERNET
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| Celular Tigo NeuroTEA | Fijo/Mensual | 28 | Atlas NeuroTEA | 120.000 |
| Celular Tigo Sistema | Fijo/Mensual | 28 | Atlas NeuroTEA | 120.000 |
| WhatsFlow | Fijo/Mensual | 15 | Atlas NeuroTEA | 120.000 |
| Internet NeuroTEA | Fijo/Mensual | 15 | Atlas NeuroTEA | 160.000 |

#### Categoría: OBLIGACIONES LEGALES
| Concepto | Frecuencia | Día Venc. | Cuenta | Monto Enero (Gs) |
|----------|------------|-----------|--------|------------------|
| IVA | Variable/Mensual | 20 | Atlas NeuroTEA | (sin valor) |
| IPS | Fijo/Mensual | 15 | Atlas NeuroTEA | 750.000 |
| Ministerio de Salud | Variable/Anual | 31 | Atlas NeuroTEA | (sin valor) |
| Mora de Alquiler | Variable/Mensual | 10 | Atlas NeuroTEA | (sin valor) |

#### Categoría: EVENTOS (anuales)
| Concepto | Frecuencia | Día (mes típico) | Cuenta |
|----------|------------|------------------|--------|
| Día del Autismo | Variable/Anual | 2 (abril) | Atlas NeuroTEA |
| San Juan | Variable/Anual | 24 (junio) | Atlas NeuroTEA |
| Día del Niño | Variable/Anual | 16 (agosto) | Atlas NeuroTEA |
| Clausura Padres | Variable/Anual | 15 (noviembre) | Atlas NeuroTEA |
| Navidad Papá Noel | Variable/Anual | 20 (diciembre) | Atlas NeuroTEA |
| Cena Fin de Año | Variable/Anual | 28 (diciembre) | Atlas NeuroTEA |

---

## 2. HOJA CARGA_FAMILIA (Enero 2026)

### Estructura de columnas:
| Columna | Contenido |
|---------|-----------|
| FECHA | Fecha de la transacción |
| TIPO | Tipo de ingreso/egreso |
| CATEGORÍA | VARIABLES, -, etc. |
| SUBCATEGORÍA | Detalle (Supermercado, Combustible, etc.) |
| DESCRIPCIÓN | Nota adicional |
| MONTO | Valor en Gs |
| CUENTA | Cuenta bancaria |

---

### INGRESOS FAMILIA (Enero 2026)

| Fecha | Tipo | Monto (Gs) | Descripción |
|-------|------|------------|-------------|
| 02/01/2026 | Contrato Colectivo Marco | 68.416.658 | CCT |
| 10/01/2026 | Adelanto de Aguinaldo Marco | 20.835.855 | Adelanto Aguinaldo |
| 19/01/2026 | Préstamo Otros Bancos | 3.000.000 | Mutual |

**Total Ingresos Familia Enero: Gs 92.252.513**

---

### EGRESOS VARIABLES FAMILIA (Enero 2026)

#### Supermercado
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 02/01/2026 | Compra de supermercado | 1.014.400 |
| 02/01/2026 | Compra de supermercado | 48.150 |
| 07/01/2026 | Compra de supermercado | 275.000 |
| 10/01/2026 | Insumos para viaje | 61.500 |
| 10/01/2026 | Insumos para viaje | 32.000 |
| 11/01/2026 | Gel | 11.000 |
| 14/01/2026 | Compra de supermercado | 113.250 |
| 15/01/2026 | Compra de supermercado | 132.500 |
| 18/01/2026 | Super | 76.500 |
| 18/12/2025 | Super | 134.300 |
| 19/12/2025 | Super | 23.900 |
| 12/12/2025 | Super | 88.000 |
**Subtotal Supermercado: Gs 2.010.500**

#### Combustible
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 08/01/2026 | Auto i10 | 100.000 |
| 09/01/2026 | Auto i10 | 50.000 |
| 11/01/2026 | Combustible S10 | 100.000 |
| 12/01/2026 | Combustible S10 viaje | 100.000 |
| 13/01/2026 | Combustible S10 viaje | 330.000 |
| 15/01/2026 | Combustible S10 | 100.000 |
| 15/01/2026 | Combustible S10 | 100.000 |
| 20/01/2026 | Auto i10 | 50.000 |
| 21/01/2026 | Auto Laura | 50.000 |
**Subtotal Combustible: Gs 980.000**

#### Recreación (Pizza, hamburguesa, helados, etc.)
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 03/01/2026 | Franconia | 198.000 |
| 06/01/2026 | Pizza Hut | 193.000 |
| 10/01/2026 | Pizza Hut | 152.000 |
| 11/01/2026 | Helados Asu | 90.000 |
| 13/01/2026 | Parrillita/Asu | 426.000 |
| 13/01/2026 | Arepa/Asu | 35.000 |
| 13/01/2026 | Hamburguesa/Asu | 117.000 |
| 14/01/2026 | Tragos/Asu | 50.000 |
| 17/01/2026 | Origami | 115.400 |
| 17/01/2026 | Alimentación y peluches campo 9 | 426.000 |
| 18/01/2026 | Franconia | 99.000 |
**Subtotal Recreación: Gs 1.901.400**

#### Alimentación (comidas/meriendas)
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 04/01/2026 | Merienda | 19.000 |
| 05/01/2026 | Merienda | 19.000 |
| 06/01/2026 | Comida | 48.000 |
| 08/01/2026 | Merienda | 40.000 |
| 13/01/2026 | Desayuno | 66.000 |
| 15/01/2026 | Desayuno | 27.000 |
| 19/01/2026 | Almuerzo IB | 25.500 |
| 20/01/2026 | Desayuno IB | 19.000 |
**Subtotal Alimentación: Gs 263.500**

#### Salud y Medicamentos
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 09/01/2026 | Farmacia | 59.700 |
| 10/01/2026 | Asu | 290.000 |
| 11/01/2026 | Farmacia | 26.200 |
**Subtotal Salud: Gs 375.900**

#### Ropa/Vestidos
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 10/01/2026 | Fabri Ofertas | 405.100 |
| 10/01/2026 | Surcos | 161.000 |
| 10/01/2026 | Feria Asuncion | 676.000 |
**Subtotal Ropa: Gs 1.242.100**

#### Mantenimiento/Reparaciones Auto
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 12/01/2026 | Mantenimiento S10/Asu | 795.000 |
| 16/01/2026 | Reparación motor auto niños | 3.700.000 |
**Subtotal Mantenimiento Auto: Gs 4.495.000**

#### Gastos Varios
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 02/01/2026 | Lavado Camio S10 | 70.000 |
| 03/01/2026 | Camioneta S10 | 50.000 |
| 08/01/2026 | Aporte Asado Exa colegio | 80.000 |
| 08/01/2026 | Minicarga Clara | 50.000 |
| 09/01/2026 | Vacuna Lipoless | 807.000 |
| 10/01/2026 | Peajes | 144.000 |
| 10/01/2026 | Aceite S10 | 140.000 |
| 10/01/2026 | Modista | 50.000 |
| 10/01/2026 | Peluquería | 620.000 |
| 10/01/2026 | Plastilina | 14.000 |
| 16/01/2026 | Corte de pasto + mantenimiento | 600.000 |
| 17/01/2026 | Peluquería | 150.000 |
| 17/01/2026 | Ferretería | 111.500 |
| 18/01/2026 | Recarga Tigo | 30.000 |
**Subtotal Gastos Varios: Gs 2.916.500**

#### Gastos no identificados (Clara y otros)
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 04/01/2026 | (sin descripción) | 150.000 |
| 05/01/2026 | Clara | 76.400 |
| 06/01/2026 | Clara | 110.000 |
| 06/01/2026 | Clara | 327.841 |
| 06/01/2026 | Clara | 290.000 |
| 07/01/2026 | Clara | 65.000 |
| 07/01/2026 | (sin descripción) | 39.500 |
| 10/01/2026 | Asu | 32.805 |
| 10/01/2026 | Clara | 991.043 |
| 10/01/2026 | (sin descripción) | 369.000 |
| 10/01/2026 | Tu financiera | 100.000 |
| 11/01/2026 | Gasto Clara | 268.000 |
| 13/01/2026 | Asu | 190.000 |
**Subtotal No Identificados: Gs 3.009.589**

---

**RESUMEN EGRESOS VARIABLES FAMILIA ENERO:**
| Categoría | Total (Gs) |
|-----------|------------|
| Supermercado | 2.010.500 |
| Combustible | 980.000 |
| Recreación | 1.901.400 |
| Alimentación | 263.500 |
| Salud | 375.900 |
| Ropa | 1.242.100 |
| Mantenimiento Auto | 4.495.000 |
| Gastos Varios | 2.916.500 |
| No Identificados | 3.009.589 |
| **TOTAL VARIABLES** | **17.194.489** |

---

## 3. HOJA CARGA_NT (Enero 2026)

### Estructura de columnas:
| Columna | Contenido |
|---------|-----------|
| FECHA | Fecha de la transacción |
| TIPO | "Aporte NeuroTEA Terapeutas" o "Egreso NT" |
| CATEGORÍA | VARIABLES o - |
| SUBCAT/EVENTO | Detalle del gasto |
| DESCRIPCIÓN | Nota adicional |
| MONTO | Valor en Gs |
| CUENTA | Atlas NeuroTEA |

---

### INGRESOS NEUROTEA (Aportes Terapeutas - Enero 2026)

| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 05/01/2026 | Lunes - Semana 1 | 783.000 |
| 06/01/2026 | Martes - Semana 1 | 561.000 |
| 07/01/2026 | Miércoles - Semana 1 | 890.000 |
| 08/01/2026 | Jueves - Semana 1 | 476.000 |
| 09/01/2026 | Viernes - Semana 1 | 1.235.000 |
| 10/01/2026 | Sábado - Semana 1 | 429.000 |
| **Subtotal Semana 1** | | **4.374.000** |
| 12/01/2026 | Lunes - Semana 2 | 1.167.000 |
| 13/01/2026 | Martes - Semana 2 | 690.000 |
| 14/01/2026 | Miércoles - Semana 2 | 682.000 |
| 15/01/2026 | Jueves - Semana 2 | 1.424.000 |
| 16/01/2026 | Viernes - Semana 2 | 1.901.000 |
| 17/01/2026 | Sábado - Semana 2 | 486.000 |
| **Subtotal Semana 2** | | **6.350.000** |
| 19/01/2026 | Lunes - Semana 3 | 1.475.000 |
| **Subtotal Semana 3** | | **1.475.000** |

**TOTAL INGRESOS NT ENERO (hasta 19/01): Gs 12.199.000**

---

### EGRESOS VARIABLES NEUROTEA (Enero 2026)

#### Insumos y Papelería
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 09/01/2026 | Artículos de oficina | 87.500 |
| 12/01/2026 | Artículos de oficina | 955.450 |
| 12/01/2026 | Artículos de oficina | 175.700 |
| 15/01/2026 | Artículos de oficina | 463.500 |
| 15/01/2026 | Artículos de oficina | 84.800 |
| 17/01/2026 | Artículos de oficina | 99.000 |
| 18/01/2026 | Artículos oficina Nuestra Casa | 97.600 |
| 19/01/2026 | Insumos cafetería | 28.900 |
**Subtotal Insumos: Gs 1.992.450**

#### Reparaciones y Mantenimiento
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 08/01/2026 | Reparo Aire Lic. Liliana | 350.000 |
| 10/01/2026 | Reparo Impresora | 200.000 |
**Subtotal Reparaciones: Gs 550.000**

#### Horas Extras
| Fecha | Descripción | Monto (Gs) |
|-------|-------------|------------|
| 20/01/2026 | Horas Extras lunes (Aracely) | 63.500 |
**Subtotal Horas Extras: Gs 63.500**

---

**RESUMEN EGRESOS VARIABLES NT ENERO:**
| Categoría | Total (Gs) |
|-----------|------------|
| Insumos y Papelería | 1.992.450 |
| Reparaciones | 550.000 |
| Horas Extras | 63.500 |
| **TOTAL VARIABLES NT** | **2.605.950** |

---

## RESUMEN GENERAL ENERO 2026

### FAMILIA
| Concepto | Monto (Gs) |
|----------|------------|
| **INGRESOS** | |
| Contrato Colectivo Marco | 68.416.658 |
| Adelanto Aguinaldo Marco | 20.835.855 |
| Préstamo Mutual | 3.000.000 |
| **TOTAL INGRESOS** | **92.252.513** |
| | |
| **EGRESOS FIJOS** (con valor en enero) | |
| Salario Lili | 2.550.000 |
| Salario Laura | 2.550.000 |
| Expensa Casa | 490.500 |
| Ña Luisa | 2.000.000 |
| Remedio Lochi | 500.000 |
| Préstamo Lizzi | 2.500.000 |
| Mutual Marco | 30.000.000 |
| Coop. Universitaria Clara | 702.060 |
| Coomecipar Clara | 2.052.000 |
| Préstamo Solar | 1.220.617 |
| Préstamo Comecipar | 2.015.568 |
| Aporte STEIBI | 684.167 |
| Aporte SICHAP | 684.167 |
| Giganet | 250.000 |
| Claude Marco | 630.000 |
| MS Office Clara | 650.000 |
| **Subtotal Fijos** | **49.479.079** |
| | |
| **EGRESOS VARIABLES** | **17.194.489** |
| | |
| **TOTAL EGRESOS** | **66.673.568** |

### NEUROTEA
| Concepto | Monto (Gs) |
|----------|------------|
| **INGRESOS** | |
| Aporte Terapeutas (5-19 enero) | 12.199.000 |
| **TOTAL INGRESOS** | **12.199.000** |
| | |
| **EGRESOS FIJOS** (con valor en enero) | |
| Alquiler 1 (Principal) | 13.837.500 |
| Alquiler 2 (Secundario) | 4.190.000 |
| Sueldo Aracely | 2.900.000 |
| Sueldo Fátima | 2.640.000 |
| Limpieza NeuroTEA | 1.050.000 |
| Honorario Contador | 250.000 |
| Honorario Community Manager | 1.540.000 |
| Celular Tigo NeuroTEA | 120.000 |
| Celular Tigo Sistema | 120.000 |
| WhatsFlow | 120.000 |
| Internet NeuroTEA | 160.000 |
| IPS | 750.000 |
| **Subtotal Fijos** | **27.677.500** |
| | |
| **EGRESOS VARIABLES** | **2.605.950** |
| | |
| **TOTAL EGRESOS** | **30.283.450** |

---

## NOTAS IMPORTANTES

1. **Muchos gastos fijos tienen valor 0 o vacío en enero** - Esto puede indicar que aún no fueron cargados o que no aplican este mes.

2. **El Salario Administrador Marco está en Gs 0** - Según conversaciones previas, este es un gasto de NT que debería tener valor (típicamente Gs 5.000.000).

3. **Los ingresos de NT solo cubren hasta el 19 de enero** - Faltan ~10 días del mes.

4. **Balance actual NT es negativo** - Con Gs 12.199.000 de ingresos y Gs 30.283.450 de egresos, hay un déficit de Gs 18.084.450. Esto se equilibrará cuando se carguen los días restantes de enero.

5. **Las cuentas de pago son:**
   - FAMILIA: ITAU Marco
   - NEUROTEA: Atlas NeuroTEA
