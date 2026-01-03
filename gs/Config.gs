/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CONFIG.GS - DATOS MAESTROS Y CONFIGURACIÓN
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// CONSTANTES GLOBALES
// ═══════════════════════════════════════════════════════════════════════════════

const VERSION = '4.0';
const AÑO = 2026;

const MESES = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
const MESES_CORTOS = ['ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];

// ═══════════════════════════════════════════════════════════════════════════════
// PALETA DE COLORES PROFESIONAL
// ═══════════════════════════════════════════════════════════════════════════════

const COLORES = {
  // FAMILIA - Tonos Verdes
  FAM_HEADER: '#059669',      // Verde esmeralda oscuro
  FAM_HEADER_LIGHT: '#10b981', // Verde esmeralda
  FAM_FONDO: '#d1fae5',       // Verde muy claro
  FAM_FONDO_ALT: '#ecfdf5',   // Verde casi blanco
  FAM_SUBTOTAL: '#a7f3d0',    // Verde pastel
  FAM_BORDER: '#34d399',      // Verde medio

  // NEUROTEA - Tonos Azules
  NT_HEADER: '#1d4ed8',       // Azul intenso
  NT_HEADER_LIGHT: '#3b82f6', // Azul medio
  NT_FONDO: '#dbeafe',        // Azul muy claro
  NT_FONDO_ALT: '#eff6ff',    // Azul casi blanco
  NT_SUBTOTAL: '#93c5fd',     // Azul pastel
  NT_BORDER: '#60a5fa',       // Azul medio

  // BALANCE CRUZADO - Tonos Púrpura
  BALANCE_HEADER: '#7c3aed',  // Púrpura
  BALANCE_FONDO: '#ede9fe',   // Púrpura claro
  BALANCE_SUBTOTAL: '#c4b5fd', // Púrpura pastel

  // ESTADOS / SEMÁFORO
  VERDE: '#22c55e',           // OK / Cumplido
  VERDE_FONDO: '#dcfce7',
  AMARILLO: '#f59e0b',        // Advertencia
  AMARILLO_FONDO: '#fef3c7',
  ROJO: '#dc2626',            // Alerta / Déficit
  ROJO_FONDO: '#fef2f2',

  // NEUTROS
  HEADER_DARK: '#1f2937',     // Gris muy oscuro
  TEXTO: '#374151',           // Gris oscuro
  TEXTO_CLARO: '#6b7280',     // Gris medio
  GRIS_FONDO: '#f3f4f6',      // Gris muy claro
  GRIS_BORDE: '#e5e7eb',      // Gris borde
  BLANCO: '#ffffff',

  // ESPECIALES
  INGRESO: '#15803d',         // Verde oscuro para ingresos
  EGRESO: '#b91c1c',          // Rojo oscuro para egresos
  GANANCIA: '#ca8a04',        // Dorado para ganancia
  GANANCIA_FONDO: '#fef9c3'   // Amarillo claro
};

// ═══════════════════════════════════════════════════════════════════════════════
// CONFIGURACIÓN DE LISTAS MAESTRAS
// ═══════════════════════════════════════════════════════════════════════════════

const ENTIDADES = ['FAMILIA', 'NEUROTEA'];
const FRECUENCIAS = ['Fijo/Mensual', 'Fijo/Anual', 'Variable/Mensual', 'Variable/Anual'];
const ESTADOS = ['Pendiente', 'Pagado', 'Cancelado'];

// ═══════════════════════════════════════════════════════════════════════════════
// CUENTAS
// ═══════════════════════════════════════════════════════════════════════════════

const CUENTAS_FAMILIA = [
  'ITAU Marco',
  'Coop. Univ. Marco',
  'ITAU Clara',
  'UENO Clara',
  'Tarjeta Solar Clara',
  'Tarjeta ITAU Clara',
  'Tarjeta ITAU Marco',
  'Tarjeta Comecipar Clara',
  'Gourmed',
  'Efectivo'
];

const CUENTAS_NT = [
  'Atlas NeuroTEA',
  'Caja Chica NT'
];

// ═══════════════════════════════════════════════════════════════════════════════
// TIPOS DE INGRESO
// ═══════════════════════════════════════════════════════════════════════════════

const TIPOS_INGRESO_FAMILIA = [
  'Salario Marco',
  'Salario Marco NeuroTEA',
  'Vacaciones Marco',
  'Adelanto de Aguinaldo Marco',
  'Saldo Aguinaldo Marco',
  'Viático Marco',
  'Animador Bíblico Marco',
  'Tarjeta Gourmed',
  'Contrato Colectivo Marco',
  'PL Itaipu Marco',
  'Honorarios Clara NeuroTEA',
  'Préstamo NeuroTEA',
  'Préstamo Otros Bancos'
];

const TIPOS_INGRESO_NT = [
  'Aporte NeuroTEA Terapeutas',
  'Cursos NeuroTEA',
  'Otros',
  'Devolución Familia → NT'
];

// ═══════════════════════════════════════════════════════════════════════════════
// CATEGORÍAS DE EGRESO
// ═══════════════════════════════════════════════════════════════════════════════

const CATEGORIAS_EGRESO_FAMILIA = [
  'GASTOS FIJOS',
  'CUOTAS Y PRÉSTAMOS',
  'OBLIGACIONES LEGALES',
  'SUSCRIPCIONES',
  'VARIABLES',
  'AHORRO',
  'FONDO DE EMERGENCIA'
];

const CATEGORIAS_EGRESO_NT = [
  'CLÍNICA',
  'SUELDOS Y HONORARIOS',
  'TELEFONÍA E INTERNET',
  'OBLIGACIONES LEGALES',
  'EVENTOS',
  'VARIABLES'
];

// ═══════════════════════════════════════════════════════════════════════════════
// SUBCATEGORÍAS VARIABLES
// ═══════════════════════════════════════════════════════════════════════════════

const VARIABLES_FAMILIA = [
  'Supermercado',
  'Combustible',
  'Mantenimiento / Reparaciones Auto Clara',
  'Mantenimiento / Reparaciones Auto Niños',
  'Mantenimiento / Reparaciones Camioneta Marco',
  'Ropa/Vestidos',
  'Recreación (Pizza, hamburguesa, helados, etc)',
  'Salud y Medicamentos',
  'Gastos no identificados',
  'Devolución Familia → NT'
];

const VARIABLES_NT = [
  'Insumos y Papelería',
  'Reparaciones Clínica',
  'Mantenimiento Aire',
  'Gastos Cursos',
  'Gastos Varios Cumple (Tortas, bocaditos, meriendas)',
  'Préstamo NT → Familia'
];

// ═══════════════════════════════════════════════════════════════════════════════
// EVENTOS NEUROTEA (6 definidos + 10 reservas)
// ═══════════════════════════════════════════════════════════════════════════════

const EVENTOS_NT = [
  { nombre: 'Día del Autismo', mes: 'Abril' },
  { nombre: 'San Juan', mes: 'Junio' },
  { nombre: 'Día del Niño', mes: 'Agosto' },
  { nombre: 'Clausura Padres', mes: 'Noviembre' },
  { nombre: 'Navidad Papá Noel', mes: 'Diciembre' },
  { nombre: 'Cena Fin de Año', mes: 'Diciembre' },
  { nombre: 'Reserva 1', mes: '(por definir)' },
  { nombre: 'Reserva 2', mes: '(por definir)' },
  { nombre: 'Reserva 3', mes: '(por definir)' },
  { nombre: 'Reserva 4', mes: '(por definir)' },
  { nombre: 'Reserva 5', mes: '(por definir)' },
  { nombre: 'Reserva 6', mes: '(por definir)' },
  { nombre: 'Reserva 7', mes: '(por definir)' },
  { nombre: 'Reserva 8', mes: '(por definir)' },
  { nombre: 'Reserva 9', mes: '(por definir)' },
  { nombre: 'Reserva 10', mes: '(por definir)' }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PRESUPUESTO - INGRESOS FAMILIA
// ═══════════════════════════════════════════════════════════════════════════════

const INGRESOS_FAMILIA = [
  { concepto: 'Salario Marco', frecuencia: 'Variable/Mensual', monto: 0 },
  { concepto: 'Salario Marco NeuroTEA', frecuencia: 'Variable/Mensual', monto: 0 },
  { concepto: 'Vacaciones Marco', frecuencia: 'Variable/Anual', monto: 0 },
  { concepto: 'Adelanto de Aguinaldo Marco', frecuencia: 'Variable/Anual', monto: 0 },
  { concepto: 'Saldo Aguinaldo Marco', frecuencia: 'Variable/Anual', monto: 0 },
  { concepto: 'Viático Marco', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Animador Bíblico Marco', frecuencia: 'Variable/Mensual', monto: 0 },
  { concepto: 'Tarjeta Gourmed', frecuencia: 'Variable/Mensual', monto: 0 },
  { concepto: 'Contrato Colectivo Marco', frecuencia: 'Variable/Anual', monto: 0 },
  { concepto: 'PL Itaipu Marco', frecuencia: 'Variable/Anual', monto: 0 },
  { concepto: 'Honorarios Clara NeuroTEA', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Préstamo NeuroTEA', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Préstamo Otros Bancos', frecuencia: 'Variable', monto: 0 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// GASTOS FIJOS FAMILIA
// ═══════════════════════════════════════════════════════════════════════════════

const GASTOS_FIJOS_FAM = [
  { concepto: 'Salario Lili Doméstico', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Salario Laura Doméstico', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Escuela Fabián y Brenda', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Robótica Niños', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'ANDE Casa', categoria: 'GASTOS FIJOS', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Expensa Casa', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 1, monto: 0 },
  { concepto: 'Ña Luisa', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Remedio Lochi', categoria: 'GASTOS FIJOS', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Seguro Médico Papá y Mamá', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Contadora Marco', categoria: 'GASTOS FIJOS', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva GF 1', categoria: 'GASTOS FIJOS', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva GF 2', categoria: 'GASTOS FIJOS', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva GF 3', categoria: 'GASTOS FIJOS', frecuencia: '-', dia: '', monto: 0 }
];

const CUOTAS_FAM = [
  { concepto: 'Préstamo Lizzi', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 20, monto: 0 },
  { concepto: 'Cajubi Marco', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Mutual Marco', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Seguro Auto Laura ITAU', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Cuota ITAU', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Auto Laura Cuota', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Coop. Universitaria Clara', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Coomecipar Clara', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Solar Préstamo 1', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 20, monto: 0 },
  { concepto: 'Solar Préstamo 2', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 20, monto: 0 },
  { concepto: 'Show Congelador', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Fijo/Mensual', dia: 25, monto: 0 },
  { concepto: 'Pago Mínimo Tarj ITAU Clara', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Variable/Mensual', dia: 10, monto: 0 },
  { concepto: 'Pago Mínimo Tarj ITAU Marco', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Variable/Mensual', dia: 10, monto: 0 },
  { concepto: 'Pago Mínimo Tarj Solar Clara', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Pago Mínimo Tarj Comecipar', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva Cuota 1', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Cuota 2', categoria: 'CUOTAS Y PRÉSTAMOS', frecuencia: '-', dia: '', monto: 0 }
];

const OBLIGACIONES_FAM = [
  { concepto: 'Aporte IPS', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Aporte Cajubi', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Aporte STEIBI', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Aporte SICHAP', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Impuesto compra digital', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Variable/Mensual', dia: 20, monto: 0 },
  { concepto: 'Aporte Coop. Univer. Clara', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Aporte Coop. Univer. Marco', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Impuesto Renta personal', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Anual', dia: 31, monto: 0 },
  { concepto: 'Impuesto terreno casa', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Anual', dia: 31, monto: 0 },
  { concepto: 'Reserva Oblig. 1', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Oblig. 2', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Oblig. 3', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 }
];

const SUSCRIPCIONES_FAM = [
  { concepto: 'Giganet', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 1, monto: 0 },
  { concepto: 'Tigo Clara', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 28, monto: 0 },
  { concepto: 'Tigo Familiar', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 28, monto: 0 },
  { concepto: 'Google One', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'ChatGPT', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Claude Marco', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Claude Clara', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Antivirus Clara (Anual)', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Anual', dia: 15, monto: 0 },
  { concepto: 'Antivirus Marco (Anual)', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Anual', dia: 15, monto: 0 },
  { concepto: 'MS Office Clara (Anual)', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Anual', dia: 15, monto: 0 },
  { concepto: 'MS Office Marco (Anual)', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Anual', dia: 15, monto: 0 },
  { concepto: 'PosterWall', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Canva (Anual)', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Anual', dia: 15, monto: 0 },
  { concepto: 'Scribd', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'iLovePDF', categoria: 'SUSCRIPCIONES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva Suscr. 1', categoria: 'SUSCRIPCIONES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Suscr. 2', categoria: 'SUSCRIPCIONES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Suscr. 3', categoria: 'SUSCRIPCIONES', frecuencia: '-', dia: '', monto: 0 }
];

const VARIABLES_PRESUP_FAM = [
  { concepto: 'Supermercado', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Combustible', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Mantenimiento / Reparaciones Auto Clara', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Mantenimiento / Reparaciones Auto Niños', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Mantenimiento / Reparaciones Camioneta Marco', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Ropa/Vestidos', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Recreación (Pizza, hamburguesa, helados, etc)', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Salud y Medicamentos', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Gastos no identificados', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Devolución Familia → NT', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Reserva Var. 1', categoria: 'VARIABLES', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Var. 2', categoria: 'VARIABLES', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Var. 3', categoria: 'VARIABLES', frecuencia: '-', monto: 0 }
];

const AHORRO_FAM = [
  { concepto: 'Ahorro Clara', categoria: 'AHORRO', frecuencia: 'Variable/Mensual', monto: 0 },
  { concepto: 'Ahorro Marco', categoria: 'AHORRO', frecuencia: 'Variable/Mensual', monto: 0 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// PRESUPUESTO - NEUROTEA
// ═══════════════════════════════════════════════════════════════════════════════

const INGRESOS_NT = [
  { concepto: 'Aporte NeuroTEA Terapeutas', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Cursos NeuroTEA', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Otros', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Devolución Familia → NT', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Reserva Ing. 1', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Ing. 2', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Ing. 3', frecuencia: '-', monto: 0 }
];

const CLINICA_NT = [
  { concepto: 'Alquiler 1 (Principal)', categoria: 'CLÍNICA', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'Alquiler 2 (Secundario)', categoria: 'CLÍNICA', frecuencia: 'Fijo/Mensual', dia: 5, monto: 0 },
  { concepto: 'ANDE clínica', categoria: 'CLÍNICA', frecuencia: 'Variable/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva Clín. 1', categoria: 'CLÍNICA', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Clín. 2', categoria: 'CLÍNICA', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Clín. 3', categoria: 'CLÍNICA', frecuencia: '-', dia: '', monto: 0 }
];

const SUELDOS_NT = [
  { concepto: 'Sueldo Aracely', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Fijo/Mensual', dia: 30, monto: 0 },
  { concepto: 'Sueldo Fátima', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Fijo/Mensual', dia: 30, monto: 0 },
  { concepto: 'Limpieza NeuroTEA', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Variable/Mensual', dia: 30, monto: 0 },
  { concepto: 'Honorario Contador', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Fijo/Mensual', dia: 10, monto: 0 },
  { concepto: 'Salario Administrador (Marco)', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Fijo/Mensual', dia: 30, monto: 0 },
  { concepto: 'Honorario Mant. Sistema', categoria: 'SUELDOS Y HONORARIOS', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva Sueldo 1', categoria: 'SUELDOS Y HONORARIOS', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Sueldo 2', categoria: 'SUELDOS Y HONORARIOS', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Sueldo 3', categoria: 'SUELDOS Y HONORARIOS', frecuencia: '-', dia: '', monto: 0 }
];

const TELEFONIA_NT = [
  { concepto: 'Celular Tigo NeuroTEA', categoria: 'TELEFONÍA E INTERNET', frecuencia: 'Fijo/Mensual', dia: 28, monto: 0 },
  { concepto: 'Celular Tigo Sistema', categoria: 'TELEFONÍA E INTERNET', frecuencia: 'Fijo/Mensual', dia: 28, monto: 0 },
  { concepto: 'WhatsFlow', categoria: 'TELEFONÍA E INTERNET', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Internet NeuroTEA', categoria: 'TELEFONÍA E INTERNET', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Reserva Tel. 1', categoria: 'TELEFONÍA E INTERNET', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Tel. 2', categoria: 'TELEFONÍA E INTERNET', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Tel. 3', categoria: 'TELEFONÍA E INTERNET', frecuencia: '-', dia: '', monto: 0 }
];

const OBLIGACIONES_NT = [
  { concepto: 'IVA', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Variable/Mensual', dia: 20, monto: 0 },
  { concepto: 'IPS', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Fijo/Mensual', dia: 15, monto: 0 },
  { concepto: 'Ministerio de Salud', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Variable/Anual', dia: 31, monto: 0 },
  { concepto: 'Mora de Alquiler', categoria: 'OBLIGACIONES LEGALES', frecuencia: 'Variable/Mensual', dia: 10, monto: 0 },
  { concepto: 'Reserva Oblig. 1', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Oblig. 2', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 },
  { concepto: 'Reserva Oblig. 3', categoria: 'OBLIGACIONES LEGALES', frecuencia: '-', dia: '', monto: 0 }
];

const VARIABLES_PRESUP_NT = [
  { concepto: 'Insumos y Papelería', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Reparaciones Clínica', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Mantenimiento Aire', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Gastos Cursos', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Gastos Varios Cumple (Tortas, bocaditos, meriendas)', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Préstamo NT → Familia', categoria: 'VARIABLES', frecuencia: 'Variable', monto: 0 },
  { concepto: 'Reserva Var. 1', categoria: 'VARIABLES', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Var. 2', categoria: 'VARIABLES', frecuencia: '-', monto: 0 },
  { concepto: 'Reserva Var. 3', categoria: 'VARIABLES', frecuencia: '-', monto: 0 }
];

// ═══════════════════════════════════════════════════════════════════════════════
// METAS NEUROTEA
// ═══════════════════════════════════════════════════════════════════════════════

const METAS_NT = {
  GANANCIA_MINIMA_PCT: 7,        // 7% mínimo de ganancia
  MAXIMO_GASTOS_PCT: 93,        // Máximo 93% en gastos
  DIST_UTILIDAD_DUEÑO: 33.33,   // 1/3 para Marco
  DIST_FONDO_EMERGENCIA: 33.33, // 1/3 para emergencias
  DIST_FONDO_INVERSION: 33.34   // 1/3 para inversión
};

// ═══════════════════════════════════════════════════════════════════════════════
// NOMBRES DE HOJAS
// ═══════════════════════════════════════════════════════════════════════════════

const NOMBRES_HOJAS = {
  CONFIG: 'CONFIG',
  PRESUPUESTO: 'PRESUPUESTO',
  GASTOS_FIJOS: 'GASTOS_FIJOS',
  CARGA_FAMILIA: 'CARGA_FAMILIA',
  CARGA_NT: 'CARGA_NT',
  MOVIMIENTO: 'MOVIMIENTO',
  TABLERO: 'TABLERO',
  LIQUIDEZ: 'LIQUIDEZ'   // Nueva hoja v5.0
};
