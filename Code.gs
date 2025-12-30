/**
 * =====================================================
 * SISTEMA DE CONTROL FINANCIERO 2026
 * NeuroTEA & Familia - Google Apps Script
 * Versión 2.0 - COMPLETO
 * =====================================================
 */

// ==================== DATOS COMPLETOS DEL PLAN MAESTRO ====================

const DATOS = {
  // ─────────────────────────────────────────────────────────────
  // PRESUPUESTO FAMILIA - INGRESOS (13 items)
  // ─────────────────────────────────────────────────────────────
  INGRESOS_FAMILIA: [
    { concepto: 'Salario Marco', tipo: 'Ingreso', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Salario Marco NeuroTEA', tipo: 'Ingreso', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Vacaciones Marco', tipo: 'Ingreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Adelanto de Aguinaldo Marco', tipo: 'Ingreso', frecuencia: 'Fijo/Anual' },
    { concepto: 'Saldo Aguinaldo Marco', tipo: 'Ingreso', frecuencia: 'Fijo/Anual' },
    { concepto: 'Viático Marco', tipo: 'Ingreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Animador Bíblico Marco', tipo: 'Ingreso', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Tarjeta Gourmed', tipo: 'Ingreso', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Contrato Colectivo Marco', tipo: 'Ingreso', frecuencia: 'Variable/Anual' },
    { concepto: 'PL Itaipu Marco', tipo: 'Ingreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Honorarios Clara NeuroTEA', tipo: 'Ingreso', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Préstamo NeuroTEA', tipo: 'Ingreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Préstamo Otros Bancos', tipo: 'Ingreso', frecuencia: 'Variable/Anual' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - GASTOS FIJOS (10 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  GASTOS_FIJOS_FAMILIA: [
    { concepto: 'Salario Lili Doméstico', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Salario Laura Doméstico', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Escuela Fabián y Brenda', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Robótica Niños', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'ANDE Casa', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Expensa Casa', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 1 },
    { concepto: 'Ña Luisa', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Remedio Lochi', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Seguro Médico Papá y Mamá', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Contadora Marco', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva GF 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva GF 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva GF 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - CUOTAS Y PRÉSTAMOS (15 + 2 reservas)
  // ─────────────────────────────────────────────────────────────
  CUOTAS_FAMILIA: [
    { concepto: 'Préstamo Lizzi', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Cajubi Marco', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Mutual Marco', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Seguro Auto Laura ITAU', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Cuota ITAU', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Auto Laura Cuota', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Coop. Universitaria Clara', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Coomecipar Clara', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Solar Préstamo 1', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Solar Préstamo 2', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Show Congelador', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 25 },
    { concepto: 'Pago Mínimo Tarj Crédito ITAU Clara', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Pago Mínimo Tarj Crédito ITAU Marco', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Pago Mínimo Tarj Crédito Solar Clara', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Pago Mínimo Tarj Crédito Comecipar Clara', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Reserva Cuota 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Cuota 2', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - OBLIGACIONES LEGALES (9 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  OBLIGACIONES_FAMILIA: [
    { concepto: 'Aporte IPS', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte Cajubi', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte STEIBI', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte SICHAP', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Impuesto compra digital', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 20 },
    { concepto: 'Aporte y Solidaridad Coop. Univer. Clara', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Aporte y Solidaridad Coop. Univer. Marco', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Impuesto a la Renta personal', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 31 },
    { concepto: 'Impuesto del terreno casa', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 31 },
    { concepto: 'Reserva Oblig. 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - SUSCRIPCIONES (15 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  SUSCRIPCIONES_FAMILIA: [
    { concepto: 'Giganet', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 1 },
    { concepto: 'Tigo Clara', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Tigo Familiar', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Google One', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'ChatGPT', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Claude Marco', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Claude Clara', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Antivirus Clara (Anual)', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Antivirus Marco (Anual)', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Microsoft Office Clara (Anual)', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Microsoft Office Marco (Anual)', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'PosterWall', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Canva (Anual)', tipo: 'Egreso', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Scribd', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'iLovePDF', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Suscr. 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Suscr. 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Suscr. 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - VARIABLES (9 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  VARIABLES_FAMILIA: [
    { concepto: 'Supermercado', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Combustible', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Mantenimiento / Reparaciones Auto Clara', tipo: 'Egreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Mantenimiento / Reparaciones Auto Niños', tipo: 'Egreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Mantenimiento / Reparaciones Camioneta Marco', tipo: 'Egreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Ropa/Vestidos', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Recreación (Pizza, hamburguesa, helados, etc)', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Salud y Medicamentos', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Gastos no identificados', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Var. 1', tipo: 'Egreso', frecuencia: '-' },
    { concepto: 'Reserva Var. 2', tipo: 'Egreso', frecuencia: '-' },
    { concepto: 'Reserva Var. 3', tipo: 'Egreso', frecuencia: '-' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS FAMILIA - AHORRO (2 items)
  // ─────────────────────────────────────────────────────────────
  AHORRO_FAMILIA: [
    { concepto: 'Ahorro Clara', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Ahorro Marco', tipo: 'Egreso', frecuencia: 'Variable/Mensual' }
  ],

  // ─────────────────────────────────────────────────────────────
  // INGRESOS NEUROTEA (3 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  INGRESOS_NT: [
    { concepto: 'Aporte NeuroTEA Terapeutas', tipo: 'Ingreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Cursos NeuroTEA', tipo: 'Ingreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Otros', tipo: 'Ingreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Ing. 1', tipo: 'Ingreso', frecuencia: '-' },
    { concepto: 'Reserva Ing. 2', tipo: 'Ingreso', frecuencia: '-' },
    { concepto: 'Reserva Ing. 3', tipo: 'Ingreso', frecuencia: '-' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - CLÍNICA (3 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  CLINICA_NT: [
    { concepto: 'Alquiler 1 (Principal)', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Alquiler 2 (Secundario)', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'ANDE clínica', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Reserva Clín. 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Clín. 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Clín. 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - SUELDOS Y HONORARIOS (6 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  SUELDOS_NT: [
    { concepto: 'Sueldo Aracely', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Sueldo Fátima', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Limpieza NeuroTEA', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 30 },
    { concepto: 'Honorario Contador', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Salario Administrador (Marco)', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Honorario Mant. Sistema', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Sueldo 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Sueldo 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Sueldo 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - TELEFONÍA E INTERNET (4 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  TELEFONIA_NT: [
    { concepto: 'Celular Tigo NeuroTEA', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Celular Tigo Sistema', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'WhatsFlow', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Internet NeuroTEA', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Tel. 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Tel. 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Tel. 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - OBLIGACIONES LEGALES (4 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  OBLIGACIONES_NT: [
    { concepto: 'IVA', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 20 },
    { concepto: 'IPS', tipo: 'Egreso', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Ministerio de Salud', tipo: 'Egreso', frecuencia: 'Variable/Anual', dia: 31 },
    { concepto: 'Mora de Alquiler', tipo: 'Egreso', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Reserva Oblig. 1', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 2', tipo: 'Egreso', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 3', tipo: 'Egreso', frecuencia: '-', dia: '' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - EVENTOS (6 definidos + 10 reservas = 16 total)
  // ─────────────────────────────────────────────────────────────
  EVENTOS_NT: [
    { concepto: 'Día del Autismo', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Abril' },
    { concepto: 'San Juan', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Junio' },
    { concepto: 'Día del Niño', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Agosto' },
    { concepto: 'Clausura Padres', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Noviembre' },
    { concepto: 'Navidad Papá Noel', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Diciembre' },
    { concepto: 'Cena Fin de Año', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: 'Diciembre' },
    { concepto: 'Reserva 1', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 2', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 3', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 4', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 5', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 6', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 7', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 8', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 9', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 10', tipo: 'Egreso', frecuencia: 'Variable/Anual', mes: '(por definir)' }
  ],

  // ─────────────────────────────────────────────────────────────
  // EGRESOS NT - VARIABLES (5 + 3 reservas)
  // ─────────────────────────────────────────────────────────────
  VARIABLES_NT: [
    { concepto: 'Insumos y Papelería', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reparaciones Clínica', tipo: 'Egreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Mantenimiento Aire', tipo: 'Egreso', frecuencia: 'Variable/Anual' },
    { concepto: 'Gastos Cursos', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Gastos Varios Cumple (Tortas, bocaditos, meriendas)', tipo: 'Egreso', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Var. 1', tipo: 'Egreso', frecuencia: '-' },
    { concepto: 'Reserva Var. 2', tipo: 'Egreso', frecuencia: '-' },
    { concepto: 'Reserva Var. 3', tipo: 'Egreso', frecuencia: '-' }
  ],

  // ─────────────────────────────────────────────────────────────
  // GANANCIA NT (calculado)
  // ─────────────────────────────────────────────────────────────
  GANANCIA_NT: [
    { concepto: 'Ganancia 7%', tipo: 'Calculado', frecuencia: '-' },
    { concepto: '→ Utilidad al propietario (33.33%)', tipo: 'Calculado', frecuencia: '-' },
    { concepto: '→ Fondo de emergencia (33.33%)', tipo: 'Calculado', frecuencia: '-' },
    { concepto: '→ Fondo de Inversión (33.33%)', tipo: 'Calculado', frecuencia: '-' }
  ]
};

// ==================== CONFIGURACIÓN LISTAS ====================

const CONFIG = {
  MESES: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

  ENTIDADES: ['FAMILIA', 'NEUROTEA'],

  FRECUENCIAS: ['Fijo/Mensual', 'Fijo/Anual', 'Variable/Mensual', 'Variable/Anual'],

  ESTADOS: ['Pendiente', 'Pagado', 'Cancelado'],

  TIPOS_INGRESO_FAMILIA: [
    'Salario Marco', 'Salario Marco NeuroTEA', 'Vacaciones Marco',
    'Adelanto de Aguinaldo Marco', 'Saldo Aguinaldo Marco', 'Viático Marco',
    'Animador Bíblico Marco', 'Tarjeta Gourmed', 'Contrato Colectivo Marco',
    'PL Itaipu Marco', 'Honorarios Clara NeuroTEA', 'Préstamo NeuroTEA', 'Préstamo Otros Bancos'
  ],

  TIPOS_INGRESO_NT: [
    'Aporte NeuroTEA Terapeutas', 'Cursos NeuroTEA', 'Otros', 'Devolución Familia → NT'
  ],

  CUENTAS_FAMILIA: [
    'ITAU Marco', 'Coop. Univ. Marco', 'ITAU Clara', 'UENO Clara',
    'Tarjeta Solar Clara', 'Tarjeta ITAU Clara', 'Tarjeta ITAU Marco',
    'Tarjeta Comecipar Clara', 'Gourmed', 'Efectivo'
  ],

  CUENTAS_NT: ['Atlas NeuroTEA', 'Caja Chica NT', 'Efectivo NT'],

  CATEGORIAS_EGRESO_FAMILIA: [
    'GASTOS FIJOS', 'CUOTAS Y PRÉSTAMOS', 'OBLIGACIONES LEGALES',
    'SUSCRIPCIONES', 'VARIABLES', 'AHORRO'
  ],

  CATEGORIAS_EGRESO_NT: [
    'CLÍNICA', 'SUELDOS Y HONORARIOS', 'TELEFONÍA E INTERNET',
    'OBLIGACIONES LEGALES', 'EVENTOS', 'VARIABLES'
  ],

  SUBCATEGORIAS_VAR_FAMILIA: [
    'Supermercado', 'Combustible', 'Mantenimiento / Reparaciones Auto Clara',
    'Mantenimiento / Reparaciones Auto Niños', 'Mantenimiento / Reparaciones Camioneta Marco',
    'Ropa/Vestidos', 'Recreación (Pizza, hamburguesa, helados, etc)',
    'Salud y Medicamentos', 'Gastos no identificados', 'Devolución Familia → NT'
  ],

  SUBCATEGORIAS_VAR_NT: [
    'Insumos y Papelería', 'Reparaciones Clínica', 'Mantenimiento Aire',
    'Gastos Cursos', 'Gastos Varios Cumple (Tortas, bocaditos, meriendas)', 'Préstamo NT → Familia'
  ],

  EVENTOS_NT: [
    'Día del Autismo', 'San Juan', 'Día del Niño', 'Clausura Padres',
    'Navidad Papá Noel', 'Cena Fin de Año',
    'Reserva 1', 'Reserva 2', 'Reserva 3', 'Reserva 4', 'Reserva 5',
    'Reserva 6', 'Reserva 7', 'Reserva 8', 'Reserva 9', 'Reserva 10'
  ],

  COLORES: {
    FAMILIA_HEADER: '#166534',
    FAMILIA_FONDO: '#dcfce7',
    FAMILIA_SUBTOTAL: '#bbf7d0',
    NT_HEADER: '#1e40af',
    NT_FONDO: '#dbeafe',
    NT_SUBTOTAL: '#93c5fd',
    ROJO: '#dc2626',
    AMARILLO: '#f59e0b',
    VERDE: '#22c55e',
    GRIS: '#f3f4f6',
    TEXTO: '#1f2937',
    BALANCE: '#fef08a',
    GANANCIA: '#fef3c7'
  }
};

// ==================== MENÚ ====================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💰 Control Financiero')
    .addItem('🚀 Inicializar Sistema COMPLETO', 'inicializarSistema')
    .addSeparator()
    .addItem('📊 Abrir Dashboard Web', 'abrirWebApp')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('📋 Crear Hojas')
      .addItem('CONFIG', 'crearHojaCONFIG')
      .addItem('PRESUPUESTO', 'crearHojaPRESUPUESTO')
      .addItem('GASTOS_FIJOS', 'crearHojaGASTOS_FIJOS')
      .addItem('CARGA_FAMILIA', 'crearHojaCARGA_FAMILIA')
      .addItem('CARGA_NT', 'crearHojaCARGA_NT')
      .addItem('MOVIMIENTO', 'crearHojaMOVIMIENTO')
      .addItem('TABLERO', 'crearHojaTABLERO'))
    .addSeparator()
    .addItem('🔄 Actualizar Validaciones', 'actualizarValidaciones')
    .addToUi();
}

// ==================== INICIALIZACIÓN ====================

function inicializarSistema() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert('🚀 Inicializar Sistema COMPLETO',
    '¿Crear todas las hojas con TODOS los items del Plan Maestro?\n\n' +
    '• CONFIG - Listas maestras\n' +
    '• PRESUPUESTO - Plan anual completo (con todas las Reservas)\n' +
    '• GASTOS_FIJOS - Lista maestra mensual\n' +
    '• CARGA_FAMILIA - Variables puros familia\n' +
    '• CARGA_NT - Variables puros NeuroTEA\n' +
    '• MOVIMIENTO - Real vs Presupuesto\n' +
    '• TABLERO - KPIs y resumen',
    ui.ButtonSet.YES_NO);

  if (response !== ui.Button.YES) return;

  crearHojaCONFIG();
  crearHojaPRESUPUESTO();
  crearHojaGASTOS_FIJOS();
  crearHojaCARGA_FAMILIA();
  crearHojaCARGA_NT();
  crearHojaMOVIMIENTO();
  crearHojaTABLERO();

  ui.alert('✅ Sistema Inicializado',
    'Todas las hojas han sido creadas con TODOS los items del Plan Maestro.\n\n' +
    'Para ver el Dashboard visual:\n' +
    '💰 Control Financiero → 📊 Abrir Dashboard Web',
    ui.ButtonSet.OK);
}

// ==================== HOJA PRESUPUESTO (COMPLETA) ====================

function crearHojaPRESUPUESTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('PRESUPUESTO');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('PRESUPUESTO');

  const C = CONFIG.COLORES;

  // Título
  sheet.getRange('A1:Q1').merge()
    .setValue('📊 PRESUPUESTO ANUAL 2026 - CONTROL FINANCIERO')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.TEXTO).setFontColor('white')
    .setHorizontalAlignment('center');

  // Headers
  const headers = ['CONCEPTO', 'TIPO', 'FRECUENCIA', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'TOTAL'];
  sheet.getRange(3, 1, 1, 16).setValues([headers])
    .setFontWeight('bold').setBackground(C.GRIS).setHorizontalAlignment('center');

  let row = 5;

  // ═══════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA
  // ═══════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('══════════════════════════════  🟢 PRESUPUESTO FAMILIA 🟢  ══════════════════════════════')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.FAMILIA_HEADER).setFontColor('white')
    .setHorizontalAlignment('center');
  row += 2;

  // ► INGRESOS FAMILIA
  row = agregarSeccion(sheet, row, '► INGRESOS FAMILIA', DATOS.INGRESOS_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'TOTAL INGRESOS FAMILIA');
  const filaIngFam = row - 1;
  row++;

  // ► GASTOS FIJOS FAMILIA
  row = agregarSeccion(sheet, row, '► EGRESOS - GASTOS FIJOS', DATOS.GASTOS_FIJOS_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Gastos Fijos');
  const filaGF = row - 1;
  row++;

  // ► CUOTAS Y PRÉSTAMOS
  row = agregarSeccion(sheet, row, '► EGRESOS - CUOTAS Y PRÉSTAMOS', DATOS.CUOTAS_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Cuotas y Préstamos');
  const filaCuotas = row - 1;
  row++;

  // ► OBLIGACIONES LEGALES
  row = agregarSeccion(sheet, row, '► EGRESOS - OBLIGACIONES LEGALES', DATOS.OBLIGACIONES_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Obligaciones');
  const filaOblig = row - 1;
  row++;

  // ► SUSCRIPCIONES
  row = agregarSeccion(sheet, row, '► EGRESOS - SUSCRIPCIONES', DATOS.SUSCRIPCIONES_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Suscripciones');
  const filaSuscr = row - 1;
  row++;

  // ► VARIABLES
  row = agregarSeccion(sheet, row, '► EGRESOS - VARIABLES', DATOS.VARIABLES_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Variables');
  const filaVar = row - 1;
  row++;

  // ► AHORRO
  row = agregarSeccion(sheet, row, '► EGRESO - AHORRO', DATOS.AHORRO_FAMILIA, C.FAMILIA_FONDO, C.FAMILIA_SUBTOTAL, 'Subtotal Ahorro');
  const filaAhorro = row - 1;
  row++;

  // TOTAL EGRESOS FAMILIA
  sheet.getRange(row, 1).setValue('TOTAL EGRESOS FAMILIA').setFontWeight('bold');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaGF}+${col}${filaCuotas}+${col}${filaOblig}+${col}${filaSuscr}+${col}${filaVar}+${col}${filaAhorro}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.FAMILIA_SUBTOTAL).setFontWeight('bold');
  const filaEgrFam = row;
  row += 2;

  // BALANCE FAMILIA
  sheet.getRange(row, 1).setValue('💰 BALANCE FAMILIA (Ingresos - Egresos)').setFontWeight('bold').setFontSize(11);
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaIngFam}-${col}${filaEgrFam}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.BALANCE).setFontWeight('bold');
  row += 3;

  // ═══════════════════════════════════════════════════════════════
  // SECCIÓN NEUROTEA
  // ═══════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('══════════════════════════════  🔵 PRESUPUESTO NEUROTEA 🔵  ══════════════════════════════')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor('white')
    .setHorizontalAlignment('center');
  row += 2;

  // ► INGRESOS NT
  row = agregarSeccion(sheet, row, '► INGRESOS NEUROTEA', DATOS.INGRESOS_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'TOTAL INGRESOS NEUROTEA');
  const filaIngNT = row - 1;
  row++;

  // ► CLÍNICA
  row = agregarSeccion(sheet, row, '► EGRESOS - CLÍNICA', DATOS.CLINICA_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'Subtotal Clínica');
  const filaClinica = row - 1;
  row++;

  // ► SUELDOS Y HONORARIOS
  row = agregarSeccion(sheet, row, '► EGRESOS - SUELDOS Y HONORARIOS', DATOS.SUELDOS_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'Subtotal Sueldos');
  const filaSueldos = row - 1;
  row++;

  // ► TELEFONÍA E INTERNET
  row = agregarSeccion(sheet, row, '► EGRESOS - TELEFONÍA E INTERNET', DATOS.TELEFONIA_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'Subtotal Telefonía');
  const filaTel = row - 1;
  row++;

  // ► OBLIGACIONES LEGALES NT
  row = agregarSeccion(sheet, row, '► EGRESOS - OBLIGACIONES LEGALES', DATOS.OBLIGACIONES_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'Subtotal Obligaciones');
  const filaObligNT = row - 1;
  row++;

  // ► EVENTOS (con 10 reservas)
  row = agregarSeccionEventos(sheet, row, '► EGRESOS - EVENTOS (6 definidos + 10 Reservas)', DATOS.EVENTOS_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'TOTAL EVENTOS');
  const filaEventos = row - 1;
  row++;

  // ► VARIABLES NT
  row = agregarSeccion(sheet, row, '► EGRESOS - VARIABLES', DATOS.VARIABLES_NT, C.NT_FONDO, C.NT_SUBTOTAL, 'Subtotal Variables');
  const filaVarNT = row - 1;
  row++;

  // TOTAL EGRESOS NT
  sheet.getRange(row, 1).setValue('TOTAL EGRESOS NEUROTEA').setFontWeight('bold');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaClinica}+${col}${filaSueldos}+${col}${filaTel}+${col}${filaObligNT}+${col}${filaEventos}+${col}${filaVarNT}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.NT_SUBTOTAL).setFontWeight('bold');
  const filaEgrNT = row;
  row += 2;

  // ► GANANCIA NT (7% META)
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('► GANANCIA NEUROTEA (META: 7% mínimo)')
    .setFontWeight('bold').setBackground(C.GANANCIA);
  row++;

  // Ganancia = Ingresos - Egresos
  sheet.getRange(row, 1).setValue('Ganancia Calculada');
  sheet.getRange(row, 2).setValue('Calculado');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaIngNT}-${col}${filaEgrNT}`);
  }
  const filaGanancia = row;
  row++;

  // % Ganancia
  sheet.getRange(row, 1).setValue('% Ganancia');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=IF(${col}${filaIngNT}=0,0,${col}${filaGanancia}/${col}${filaIngNT})`);
  }
  sheet.getRange(row, 4, 1, 13).setNumberFormat('0.00%');
  row++;

  // Distribución
  sheet.getRange(row, 1).setValue('→ Utilidad Dueño (33.33%)');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaGanancia}*0.3333`);
  }
  row++;

  sheet.getRange(row, 1).setValue('→ Fondo Emergencia (33.33%)');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaGanancia}*0.3333`);
  }
  row++;

  sheet.getRange(row, 1).setValue('→ Fondo Inversión (33.33%)');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaGanancia}*0.3333`);
  }
  row += 2;

  // BALANCE NT
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=${col}${filaIngNT}-${col}${filaEgrNT}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.BALANCE).setFontWeight('bold');
  row += 2;

  // BALANCE CONSOLIDADO
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('🏆 BALANCE TOTAL CONSOLIDADO FAMILIA + NEUROTEA')
    .setFontSize(12).setFontWeight('bold')
    .setBackground('#a855f7').setFontColor('white')
    .setHorizontalAlignment('center');
  row++;

  // Formato números
  sheet.getRange('D:P').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 350);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 120);
  for (let i = 4; i <= 16; i++) { sheet.setColumnWidth(i, 95); }

  // Congelar filas
  sheet.setFrozenRows(3);

  return sheet;
}

function agregarSeccion(sheet, row, titulo, items, colorFondo, colorSubtotal, textoSubtotal) {
  const C = CONFIG.COLORES;

  // Título de sección
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue(titulo)
    .setFontWeight('bold').setBackground(colorFondo);
  row++;

  const filaInicio = row;

  // Items
  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.tipo);
    sheet.getRange(row, 3).setValue(item.frecuencia);
    // Fórmula TOTAL
    sheet.getRange(row, 16).setFormula(`=SUM(D${row}:O${row})`);
    row++;
  });

  const filaFin = row - 1;

  // Subtotal
  sheet.getRange(row, 1).setValue(textoSubtotal).setFontWeight('bold').setFontStyle('italic');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=SUM(${col}${filaInicio}:${col}${filaFin})`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  row++;

  return row;
}

function agregarSeccionEventos(sheet, row, titulo, items, colorFondo, colorSubtotal, textoSubtotal) {
  // Título de sección
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue(titulo)
    .setFontWeight('bold').setBackground(colorFondo);
  row++;

  // Headers especiales para eventos
  sheet.getRange(row, 1).setValue('EVENTO');
  sheet.getRange(row, 2).setValue('MES EST.');
  sheet.getRange(row, 3).setValue('FREC.');
  sheet.getRange(row, 1, 1, 16).setFontStyle('italic').setBackground('#e0e7ff');
  row++;

  const filaInicio = row;

  // Items
  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.mes || '');
    sheet.getRange(row, 3).setValue(item.frecuencia);
    sheet.getRange(row, 16).setFormula(`=SUM(D${row}:O${row})`);
    row++;
  });

  const filaFin = row - 1;

  // Subtotal
  sheet.getRange(row, 1).setValue(textoSubtotal).setFontWeight('bold').setFontStyle('italic');
  for (let c = 4; c <= 16; c++) {
    const col = columnToLetter(c);
    sheet.getRange(row, c).setFormula(`=SUM(${col}${filaInicio}:${col}${filaFin})`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  row++;

  return row;
}

// ==================== HOJA CONFIG ====================

function crearHojaCONFIG() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CONFIG');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('CONFIG');

  const C = CONFIG.COLORES;

  sheet.getRange('A1:N1').merge()
    .setValue('⚙️ CONFIGURACIÓN DEL SISTEMA - LISTAS MAESTRAS')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.TEXTO).setFontColor('white');

  let col = 1;

  // Columna A - Meses, Entidades, Frecuencias, Estados
  escribirLista(sheet, 3, col, 'MESES', CONFIG.MESES, C.GRIS);
  escribirLista(sheet, 3 + CONFIG.MESES.length + 2, col, 'ENTIDADES', CONFIG.ENTIDADES, C.GRIS);
  escribirLista(sheet, 3 + CONFIG.MESES.length + CONFIG.ENTIDADES.length + 5, col, 'FRECUENCIAS', CONFIG.FRECUENCIAS, C.GRIS);
  escribirLista(sheet, 3 + CONFIG.MESES.length + CONFIG.ENTIDADES.length + CONFIG.FRECUENCIAS.length + 8, col, 'ESTADOS', CONFIG.ESTADOS, C.GRIS);

  col = 3;
  // Columna C - Tipos Ingreso
  escribirLista(sheet, 3, col, 'TIPOS INGRESO FAMILIA', CONFIG.TIPOS_INGRESO_FAMILIA, C.FAMILIA_FONDO);
  escribirLista(sheet, 3 + CONFIG.TIPOS_INGRESO_FAMILIA.length + 2, col, 'TIPOS INGRESO NT', CONFIG.TIPOS_INGRESO_NT, C.NT_FONDO);

  col = 5;
  // Columna E - Cuentas
  escribirLista(sheet, 3, col, 'CUENTAS FAMILIA', CONFIG.CUENTAS_FAMILIA, C.FAMILIA_FONDO);
  escribirLista(sheet, 3 + CONFIG.CUENTAS_FAMILIA.length + 2, col, 'CUENTAS NT', CONFIG.CUENTAS_NT, C.NT_FONDO);

  col = 7;
  // Columna G - Categorías
  escribirLista(sheet, 3, col, 'CATEGORÍAS EGRESO FAM', CONFIG.CATEGORIAS_EGRESO_FAMILIA, C.FAMILIA_FONDO);
  escribirLista(sheet, 3 + CONFIG.CATEGORIAS_EGRESO_FAMILIA.length + 2, col, 'CATEGORÍAS EGRESO NT', CONFIG.CATEGORIAS_EGRESO_NT, C.NT_FONDO);

  col = 9;
  // Columna I - Subcategorías Variables
  escribirLista(sheet, 3, col, 'SUBCAT. VAR. FAMILIA', CONFIG.SUBCATEGORIAS_VAR_FAMILIA, C.FAMILIA_FONDO);
  escribirLista(sheet, 3 + CONFIG.SUBCATEGORIAS_VAR_FAMILIA.length + 2, col, 'SUBCAT. VAR. NT', CONFIG.SUBCATEGORIAS_VAR_NT, C.NT_FONDO);

  col = 11;
  // Columna K - Eventos
  escribirLista(sheet, 3, col, 'EVENTOS NT (16)', CONFIG.EVENTOS_NT, C.NT_FONDO);

  col = 13;
  // Columna M - Metas
  sheet.getRange(3, col).setValue('METAS NEUROTEA').setFontWeight('bold').setBackground(C.NT_HEADER).setFontColor('white');
  const metas = [
    ['Meta Ganancia Mínima', '7%'],
    ['Meta Máximo Gastos', '93%'],
    ['Distribución Utilidad', '33.33%'],
    ['Distribución Emergencia', '33.33%'],
    ['Distribución Inversión', '33.33%']
  ];
  metas.forEach((m, i) => {
    sheet.getRange(4 + i, col).setValue(m[0]);
    sheet.getRange(4 + i, col + 1).setValue(m[1]);
  });

  // Ajustar anchos
  for (let i = 1; i <= 14; i++) { sheet.setColumnWidth(i, 180); }

  return sheet;
}

function escribirLista(sheet, row, col, titulo, lista, colorTitulo) {
  sheet.getRange(row, col).setValue(titulo).setFontWeight('bold').setBackground(colorTitulo);
  lista.forEach((item, i) => {
    sheet.getRange(row + 1 + i, col).setValue(item);
  });
}

// ==================== HOJA GASTOS_FIJOS ====================

function crearHojaGASTOS_FIJOS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('GASTOS_FIJOS');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('GASTOS_FIJOS');

  const C = CONFIG.COLORES;

  // Título
  sheet.getRange('A1:R1').merge()
    .setValue('📋 GASTOS FIJOS - LISTA MAESTRA (Todos los gastos recurrentes)')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.TEXTO).setFontColor('white');

  sheet.getRange('A2:R2').merge()
    .setValue('💡 DÍA = día del mes que vence | Si un mes está vacío, usa el MONTO BASE | Para cancelar un gasto, poner 0 en el mes siguiente')
    .setFontStyle('italic').setBackground(C.GRIS);

  const headers = ['CONCEPTO', 'ENTIDAD', 'CATEGORÍA', 'FRECUENCIA', 'DÍA', 'BASE', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  // SECCIÓN FAMILIA
  let row = 4;
  sheet.getRange(row, 1, 1, 18).merge()
    .setValue('══════════════════════  🟢 GASTOS FIJOS FAMILIA 🟢  ══════════════════════')
    .setFontWeight('bold').setBackground(C.FAMILIA_HEADER).setFontColor('white')
    .setHorizontalAlignment('center');
  row++;

  headers.forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold').setBackground(C.FAMILIA_FONDO);
  });
  row++;

  // Agregar todos los gastos fijos de familia
  const todosFamilia = [
    ...DATOS.GASTOS_FIJOS_FAMILIA.map(g => ({...g, categoria: 'GASTOS FIJOS'})),
    ...DATOS.CUOTAS_FAMILIA.map(g => ({...g, categoria: 'CUOTAS Y PRÉSTAMOS'})),
    ...DATOS.OBLIGACIONES_FAMILIA.map(g => ({...g, categoria: 'OBLIGACIONES LEGALES'})),
    ...DATOS.SUSCRIPCIONES_FAMILIA.map(g => ({...g, categoria: 'SUSCRIPCIONES'}))
  ];

  todosFamilia.forEach(g => {
    sheet.getRange(row, 1).setValue(g.concepto);
    sheet.getRange(row, 2).setValue('FAMILIA');
    sheet.getRange(row, 3).setValue(g.categoria);
    sheet.getRange(row, 4).setValue(g.frecuencia);
    sheet.getRange(row, 5).setValue(g.dia || '');
    sheet.getRange(row, 1, 1, 18).setBackground(C.FAMILIA_FONDO);
    row++;
  });

  row += 2;

  // SECCIÓN NEUROTEA
  sheet.getRange(row, 1, 1, 18).merge()
    .setValue('══════════════════════  🔵 GASTOS FIJOS NEUROTEA 🔵  ══════════════════════')
    .setFontWeight('bold').setBackground(C.NT_HEADER).setFontColor('white')
    .setHorizontalAlignment('center');
  row++;

  headers.forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold').setBackground(C.NT_FONDO);
  });
  row++;

  const todosNT = [
    ...DATOS.CLINICA_NT.map(g => ({...g, categoria: 'CLÍNICA'})),
    ...DATOS.SUELDOS_NT.map(g => ({...g, categoria: 'SUELDOS Y HONORARIOS'})),
    ...DATOS.TELEFONIA_NT.map(g => ({...g, categoria: 'TELEFONÍA E INTERNET'})),
    ...DATOS.OBLIGACIONES_NT.map(g => ({...g, categoria: 'OBLIGACIONES LEGALES'}))
  ];

  todosNT.forEach(g => {
    sheet.getRange(row, 1).setValue(g.concepto);
    sheet.getRange(row, 2).setValue('NEUROTEA');
    sheet.getRange(row, 3).setValue(g.categoria);
    sheet.getRange(row, 4).setValue(g.frecuencia);
    sheet.getRange(row, 5).setValue(g.dia || '');
    sheet.getRange(row, 1, 1, 18).setBackground(C.NT_FONDO);
    row++;
  });

  // Formato
  sheet.getRange('F:R').setNumberFormat('#,##0');
  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 50);
  for (let i = 6; i <= 18; i++) { sheet.setColumnWidth(i, 90); }
  sheet.setFrozenRows(5);

  return sheet;
}

// ==================== HOJA CARGA_FAMILIA ====================

function crearHojaCARGA_FAMILIA() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_FAMILIA');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('CARGA_FAMILIA');

  const C = CONFIG.COLORES;

  sheet.getRange('A1:I1').merge()
    .setValue('👨‍👩‍👧‍👦 CARGA FAMILIA - Solo Variables PUROS (no recurrentes)')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.FAMILIA_HEADER).setFontColor('white');

  sheet.getRange('A2:I2').merge()
    .setValue('⚠️ Aquí SOLO van: Supermercado, Combustible, Reparaciones imprevistas, etc. Los gastos fijos van en GASTOS_FIJOS')
    .setFontStyle('italic').setBackground(C.GRIS);

  sheet.getRange('A3').setValue('Filtrar Mes:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Todos');

  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1).setValue(h).setFontWeight('bold').setBackground(C.FAMILIA_FONDO);
  });

  // Formato
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F:F').setNumberFormat('#,##0');

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 250);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 150);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 150);

  aplicarValidacionesCargaFamilia(sheet);

  return sheet;
}

// ==================== HOJA CARGA_NT ====================

function crearHojaCARGA_NT() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_NT');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('CARGA_NT');

  const C = CONFIG.COLORES;

  sheet.getRange('A1:I1').merge()
    .setValue('🏥 CARGA NEUROTEA - Variables PUROS + EVENTOS')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor('white');

  sheet.getRange('A2:I2').merge()
    .setValue('⚠️ Variables puros (Insumos, Reparaciones imprevistas) + EVENTOS (Día del Niño, San Juan, etc.)')
    .setFontStyle('italic').setBackground(C.GRIS);

  sheet.getRange('A3').setValue('Filtrar Mes:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Todos');

  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA/EVENTO', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1).setValue(h).setFontWeight('bold').setBackground(C.NT_FONDO);
  });

  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F:F').setNumberFormat('#,##0');

  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 220);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 250);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 150);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 150);

  aplicarValidacionesCargaNT(sheet);

  return sheet;
}

// ==================== HOJA MOVIMIENTO ====================

function crearHojaMOVIMIENTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('MOVIMIENTO');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('MOVIMIENTO');

  const C = CONFIG.COLORES;

  sheet.getRange('A1:H1').merge()
    .setValue('📈 MOVIMIENTO - Real vs Presupuesto por Mes')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.TEXTO).setFontColor('white');

  sheet.getRange('A3').setValue('📅 Mes Seleccionado:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Enero');

  const headers = ['CONCEPTO', 'TIPO', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', '🚦'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1).setValue(h).setFontWeight('bold').setBackground(C.GRIS);
  });

  sheet.getRange('C:E').setNumberFormat('#,##0');
  sheet.getRange('F:F').setNumberFormat('0%');

  sheet.setColumnWidth(1, 300);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 80);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 50);

  return sheet;
}

// ==================== HOJA TABLERO ====================

function crearHojaTABLERO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('TABLERO');
  if (sheet) { ss.deleteSheet(sheet); }
  sheet = ss.insertSheet('TABLERO');

  const C = CONFIG.COLORES;

  sheet.getRange('A1:F1').merge()
    .setValue('📊 TABLERO DE CONTROL - Dashboard Principal')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.TEXTO).setFontColor('white');

  sheet.getRange('A2').setValue('📅 Mes:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Enero 2026');

  let row = 4;

  // FAMILIA
  sheet.getRange(row, 1, 1, 3).merge()
    .setValue('🟢 RESUMEN FAMILIA')
    .setFontWeight('bold').setFontSize(12)
    .setBackground(C.FAMILIA_HEADER).setFontColor('white');
  row++;

  const kpiFam = [
    ['Total Ingresos', '', ''],
    ['Total Egresos', '', ''],
    ['Balance Mensual', '', ''],
    ['', '', ''],
    ['Liquidez Semana 1', '', ''],
    ['Liquidez Semana 2', '', ''],
    ['Liquidez Semana 3', '', '']
  ];
  kpiFam.forEach(k => {
    sheet.getRange(row, 1).setValue(k[0]).setFontWeight('bold');
    row++;
  });
  row++;

  // NEUROTEA
  sheet.getRange(row, 1, 1, 3).merge()
    .setValue('🔵 RESUMEN NEUROTEA')
    .setFontWeight('bold').setFontSize(12)
    .setBackground(C.NT_HEADER).setFontColor('white');
  row++;

  const kpiNT = [
    ['Total Ingresos', '', ''],
    ['Total Egresos', '', ''],
    ['Ganancia', '', ''],
    ['% Ganancia', '', '🚦'],
    ['', '', ''],
    ['→ Utilidad Dueño', '', ''],
    ['→ Fondo Emergencia', '', ''],
    ['→ Fondo Inversión', '', '']
  ];
  kpiNT.forEach(k => {
    sheet.getRange(row, 1).setValue(k[0]).setFontWeight('bold');
    sheet.getRange(row, 3).setValue(k[2]);
    row++;
  });
  row++;

  // BALANCE CRUZADO
  sheet.getRange(row, 1, 1, 3).merge()
    .setValue('🟣 BALANCE CRUZADO NT ↔ FAMILIA')
    .setFontWeight('bold').setFontSize(12)
    .setBackground('#7c3aed').setFontColor('white');
  row++;

  sheet.getRange(row, 1).setValue('Préstamos NT → Familia'); row++;
  sheet.getRange(row, 1).setValue('Devoluciones Familia → NT'); row++;
  sheet.getRange(row, 1).setValue('SALDO NETO').setFontWeight('bold'); row++;
  row++;

  // CONCILIACIÓN
  sheet.getRange(row, 1, 1, 5).merge()
    .setValue('🏦 CONCILIACIÓN BANCARIA')
    .setFontWeight('bold').setFontSize(12)
    .setBackground(C.GRIS);
  row++;

  ['CUENTA', 'ESPERADO', 'REAL', 'DIF.', '🚦'].forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold');
  });
  row++;

  CONFIG.CUENTAS_FAMILIA.slice(0, 5).forEach(cuenta => {
    sheet.getRange(row, 1).setValue(cuenta);
    row++;
  });

  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 100);
  sheet.setColumnWidth(5, 50);

  return sheet;
}

// ==================== VALIDACIONES ANTI-BURRO ====================

function aplicarValidacionesCargaFamilia(sheet) {
  const ultimaFila = 500;
  const tipos = [...CONFIG.TIPOS_INGRESO_FAMILIA, 'Egreso Familiar'];
  const categorias = ['-', ...CONFIG.CATEGORIAS_EGRESO_FAMILIA];
  const subcategorias = ['-', ...CONFIG.SUBCATEGORIAS_VAR_FAMILIA];

  sheet.getRange('B6:B' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(tipos, true).build()
  );
  sheet.getRange('C6:C' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(categorias, true).build()
  );
  sheet.getRange('D6:D' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(subcategorias, true).build()
  );
  sheet.getRange('G6:G' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.CUENTAS_FAMILIA, true).build()
  );
  sheet.getRange('H6:H' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.ESTADOS, true).build()
  );
}

function aplicarValidacionesCargaNT(sheet) {
  const ultimaFila = 500;
  const tipos = [...CONFIG.TIPOS_INGRESO_NT, 'Egreso NT'];
  const categorias = ['-', ...CONFIG.CATEGORIAS_EGRESO_NT];
  const subcategorias = ['-', ...CONFIG.SUBCATEGORIAS_VAR_NT, ...CONFIG.EVENTOS_NT];

  sheet.getRange('B6:B' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(tipos, true).build()
  );
  sheet.getRange('C6:C' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(categorias, true).build()
  );
  sheet.getRange('D6:D' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(subcategorias, true).build()
  );
  sheet.getRange('G6:G' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.CUENTAS_NT, true).build()
  );
  sheet.getRange('H6:H' + ultimaFila).setDataValidation(
    SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.ESTADOS, true).build()
  );
}

function actualizarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheetFam = ss.getSheetByName('CARGA_FAMILIA');
  const sheetNT = ss.getSheetByName('CARGA_NT');
  if (sheetFam) aplicarValidacionesCargaFamilia(sheetFam);
  if (sheetNT) aplicarValidacionesCargaNT(sheetNT);
  SpreadsheetApp.getUi().alert('✅ Validaciones actualizadas');
}

// ==================== WEB APP ====================

function abrirWebApp() {
  const html = HtmlService.createHtmlOutput(getWebAppHtml())
    .setWidth(1200)
    .setHeight(800);
  SpreadsheetApp.getUi().showModalDialog(html, '📊 Dashboard Control Financiero 2026');
}

function doGet() {
  return HtmlService.createHtmlOutput(getWebAppHtml())
    .setTitle('Control Financiero 2026')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getWebAppHtml() {
  return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Control Financiero 2026</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
      color: white;
      min-height: 100vh;
      padding: 20px;
    }
    .header {
      text-align: center;
      padding: 20px;
      background: rgba(255,255,255,0.1);
      border-radius: 15px;
      margin-bottom: 20px;
    }
    .header h1 { font-size: 2em; margin-bottom: 10px; }
    .header .subtitle { color: #9ca3af; font-size: 0.9em; }

    .dashboard {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
      gap: 20px;
    }

    .card {
      background: rgba(255,255,255,0.05);
      border-radius: 15px;
      padding: 20px;
      border: 1px solid rgba(255,255,255,0.1);
    }

    .card.familia { border-left: 4px solid #059669; }
    .card.neurotea { border-left: 4px solid #1d4ed8; }
    .card.cruzado { border-left: 4px solid #7c3aed; }
    .card.liquidez { border-left: 4px solid #f59e0b; }

    .card-title {
      font-size: 1.1em;
      font-weight: bold;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 10px;
    }

    .card-title .icon {
      width: 30px;
      height: 30px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.2em;
    }

    .card.familia .icon { background: #059669; }
    .card.neurotea .icon { background: #1d4ed8; }
    .card.cruzado .icon { background: #7c3aed; }
    .card.liquidez .icon { background: #f59e0b; }

    .kpi-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid rgba(255,255,255,0.1);
    }

    .kpi-label { color: #9ca3af; }
    .kpi-value { font-weight: bold; font-size: 1.1em; }

    .kpi-value.positive { color: #22c55e; }
    .kpi-value.negative { color: #dc2626; }
    .kpi-value.warning { color: #f59e0b; }

    .semaforo {
      display: inline-block;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      margin-left: 8px;
    }
    .semaforo.verde { background: #22c55e; box-shadow: 0 0 10px #22c55e; }
    .semaforo.amarillo { background: #f59e0b; box-shadow: 0 0 10px #f59e0b; }
    .semaforo.rojo { background: #dc2626; box-shadow: 0 0 10px #dc2626; }

    .progress-bar {
      height: 8px;
      background: rgba(255,255,255,0.1);
      border-radius: 4px;
      margin-top: 10px;
      overflow: hidden;
    }
    .progress-bar .fill {
      height: 100%;
      border-radius: 4px;
      transition: width 0.5s ease;
    }
    .progress-bar .fill.green { background: linear-gradient(90deg, #059669, #22c55e); }
    .progress-bar .fill.blue { background: linear-gradient(90deg, #1d4ed8, #3b82f6); }

    .ganancia-box {
      background: rgba(34, 197, 94, 0.2);
      border: 1px solid #22c55e;
      border-radius: 10px;
      padding: 15px;
      text-align: center;
      margin-top: 15px;
    }
    .ganancia-box.warning {
      background: rgba(245, 158, 11, 0.2);
      border-color: #f59e0b;
    }
    .ganancia-box.danger {
      background: rgba(220, 38, 38, 0.2);
      border-color: #dc2626;
    }

    .ganancia-value { font-size: 2em; font-weight: bold; }
    .ganancia-label { color: #9ca3af; font-size: 0.9em; }

    .liquidez-week {
      display: flex;
      gap: 10px;
      margin-top: 10px;
    }
    .week-box {
      flex: 1;
      background: rgba(255,255,255,0.05);
      border-radius: 8px;
      padding: 10px;
      text-align: center;
    }
    .week-box .week-label { font-size: 0.8em; color: #9ca3af; }
    .week-box .week-value { font-size: 1.2em; font-weight: bold; margin-top: 5px; }

    .footer {
      text-align: center;
      padding: 20px;
      color: #6b7280;
      font-size: 0.8em;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>💰 Control Financiero 2026</h1>
    <div class="subtitle">NeuroTEA & Familia | Dashboard en Tiempo Real</div>
    <div class="subtitle" style="margin-top: 5px;">📅 Enero 2026</div>
  </div>

  <div class="dashboard">
    <!-- FAMILIA -->
    <div class="card familia">
      <div class="card-title">
        <span class="icon">👨‍👩‍👧‍👦</span>
        FAMILIA
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Total Ingresos</span>
        <span class="kpi-value positive">Gs. 13.500.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Total Egresos</span>
        <span class="kpi-value">Gs. 8.200.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Balance Mensual</span>
        <span class="kpi-value positive">Gs. 5.300.000 <span class="semaforo verde"></span></span>
      </div>
      <div class="progress-bar">
        <div class="fill green" style="width: 60%"></div>
      </div>
    </div>

    <!-- NEUROTEA -->
    <div class="card neurotea">
      <div class="card-title">
        <span class="icon">🏥</span>
        NEUROTEA
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Total Ingresos</span>
        <span class="kpi-value positive">Gs. 12.000.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Total Egresos</span>
        <span class="kpi-value">Gs. 11.100.000</span>
      </div>
      <div class="ganancia-box">
        <div class="ganancia-value">7.5%</div>
        <div class="ganancia-label">Ganancia (Meta: 7%) <span class="semaforo verde"></span></div>
      </div>
      <div class="kpi-row" style="margin-top: 15px;">
        <span class="kpi-label">→ Utilidad Dueño</span>
        <span class="kpi-value">Gs. 300.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">→ Fondo Emergencia</span>
        <span class="kpi-value">Gs. 300.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">→ Fondo Inversión</span>
        <span class="kpi-value">Gs. 300.000</span>
      </div>
    </div>

    <!-- LIQUIDEZ -->
    <div class="card liquidez">
      <div class="card-title">
        <span class="icon">💧</span>
        LIQUIDEZ 3 SEMANAS - FAMILIA
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Caja Disponible Hoy</span>
        <span class="kpi-value">Gs. 2.500.000</span>
      </div>
      <div class="liquidez-week">
        <div class="week-box">
          <div class="week-label">SEMANA 1</div>
          <div class="week-value positive">1.300.000 <span class="semaforo verde"></span></div>
        </div>
        <div class="week-box">
          <div class="week-label">SEMANA 2</div>
          <div class="week-value warning">500.000 <span class="semaforo amarillo"></span></div>
        </div>
        <div class="week-box">
          <div class="week-label">SEMANA 3</div>
          <div class="week-value negative">-200.000 <span class="semaforo rojo"></span></div>
        </div>
      </div>
    </div>

    <!-- BALANCE CRUZADO -->
    <div class="card cruzado">
      <div class="card-title">
        <span class="icon">🔄</span>
        BALANCE CRUZADO NT ↔ FAM
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Préstamos NT → Familia</span>
        <span class="kpi-value">Gs. 3.000.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Devoluciones Fam → NT</span>
        <span class="kpi-value">Gs. 500.000</span>
      </div>
      <div class="kpi-row">
        <span class="kpi-label">Saldo Neto</span>
        <span class="kpi-value negative">Gs. 2.500.000 <span class="semaforo rojo"></span></span>
      </div>
      <div style="margin-top: 10px; padding: 10px; background: rgba(220, 38, 38, 0.2); border-radius: 8px; text-align: center;">
        ⚠️ Familia debe a NeuroTEA
      </div>
    </div>
  </div>

  <div class="footer">
    Sistema de Control Financiero 2026 | NeuroTEA & Familia | v2.0
  </div>
</body>
</html>
  `;
}

// ==================== UTILIDADES ====================

function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

// ==================== TRIGGER onEdit ====================

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  const range = e.range;
  const row = range.getRow();
  const col = range.getColumn();

  if (sheetName !== 'CARGA_FAMILIA' && sheetName !== 'CARGA_NT') return;
  if (row < 6) return;

  // Si cambia TIPO (col B)
  if (col === 2) {
    const tipo = e.value;
    const esIngreso = CONFIG.TIPOS_INGRESO_FAMILIA.includes(tipo) ||
                      CONFIG.TIPOS_INGRESO_NT.includes(tipo);
    if (esIngreso) {
      sheet.getRange(row, 3).setValue('-');
      sheet.getRange(row, 4).setValue('-');
    }
  }

  // Si cambia CATEGORÍA (col C)
  if (col === 3) {
    const categoria = e.value;
    if (categoria !== 'VARIABLES' && categoria !== 'EVENTOS') {
      sheet.getRange(row, 4).setValue('-');
    }
  }
}
