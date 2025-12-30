/**
 * =====================================================
 * SISTEMA DE CONTROL FINANCIERO 2026
 * NeuroTEA & Familia - Google Apps Script
 * Versión 1.0
 * =====================================================
 */

// ==================== CONFIGURACIÓN GLOBAL ====================

const CONFIG = {
  MESES: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
          'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],

  ENTIDADES: ['FAMILIA', 'NEUROTEA'],

  FRECUENCIAS: ['Fijo/Mensual', 'Fijo/Anual', 'Variable/Mensual', 'Variable/Anual'],

  ESTADOS: ['Pendiente', 'Pagado', 'Cancelado'],

  // Tipos de Ingreso Familia
  TIPOS_INGRESO_FAMILIA: [
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
  ],

  // Tipos de Ingreso NeuroTEA
  TIPOS_INGRESO_NT: [
    'Aporte NeuroTEA Terapeutas',
    'Cursos NeuroTEA',
    'Otros',
    'Devolución Familia → NT'
  ],

  // Cuentas Familia
  CUENTAS_FAMILIA: [
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
  ],

  // Cuentas NeuroTEA
  CUENTAS_NT: [
    'Atlas NeuroTEA',
    'Caja Chica NT',
    'Efectivo NT'
  ],

  // Categorías Egreso Familia
  CATEGORIAS_EGRESO_FAMILIA: [
    'GASTOS FIJOS',
    'CUOTAS Y PRÉSTAMOS',
    'OBLIGACIONES LEGALES',
    'SUSCRIPCIONES',
    'VARIABLES',
    'AHORRO'
  ],

  // Categorías Egreso NeuroTEA
  CATEGORIAS_EGRESO_NT: [
    'CLÍNICA',
    'SUELDOS Y HONORARIOS',
    'TELEFONÍA E INTERNET',
    'OBLIGACIONES LEGALES',
    'EVENTOS',
    'VARIABLES'
  ],

  // Subcategorías Variables Familia
  SUBCATEGORIAS_VAR_FAMILIA: [
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
  ],

  // Subcategorías Variables NeuroTEA
  SUBCATEGORIAS_VAR_NT: [
    'Insumos y Papelería',
    'Reparaciones Clínica',
    'Mantenimiento Aire',
    'Gastos Cursos',
    'Gastos Varios Cumple (Tortas, bocaditos, meriendas)',
    'Préstamo NT → Familia'
  ],

  // Eventos NeuroTEA
  EVENTOS_NT: [
    'Día del Autismo',
    'San Juan',
    'Día del Niño',
    'Clausura Padres',
    'Navidad Papá Noel',
    'Cena Fin de Año',
    'Reserva 1',
    'Reserva 2',
    'Reserva 3',
    'Reserva 4',
    'Reserva 5',
    'Reserva 6',
    'Reserva 7',
    'Reserva 8',
    'Reserva 9',
    'Reserva 10'
  ],

  // Colores del sistema
  COLORES: {
    FAMILIA_PRINCIPAL: '#059669',
    FAMILIA_FONDO: '#dcfce7',
    FAMILIA_HEADER: '#166534',
    NT_PRINCIPAL: '#1d4ed8',
    NT_FONDO: '#dbeafe',
    NT_HEADER: '#1e40af',
    ALERTA_ROJO: '#dc2626',
    ALERTA_AMARILLO: '#f59e0b',
    OK_VERDE: '#22c55e',
    TEXTO: '#1f2937',
    FONDO_GRIS: '#f3f4f6',
    SEPARADOR: '#9ca3af',
    PURPURA: '#7c3aed'
  },

  // Metas NeuroTEA
  METAS: {
    GANANCIA_MINIMA: 0.07,
    MAX_GASTOS: 0.93,
    DISTRIBUCION_UTILIDAD: 0.3333,
    DISTRIBUCION_EMERGENCIA: 0.3333,
    DISTRIBUCION_INVERSION: 0.3333
  }
};

// ==================== MENÚ PRINCIPAL ====================

function onOpen() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('💰 Control Financiero')
    .addItem('🚀 Inicializar Sistema', 'inicializarSistema')
    .addSeparator()
    .addSubMenu(ui.createMenu('📋 Hojas')
      .addItem('Crear CONFIG', 'crearHojaCONFIG')
      .addItem('Crear PRESUPUESTO', 'crearHojaPRESUPUESTO')
      .addItem('Crear GASTOS_FIJOS', 'crearHojaGASTOS_FIJOS')
      .addItem('Crear CARGA_FAMILIA', 'crearHojaCARGA_FAMILIA')
      .addItem('Crear CARGA_NT', 'crearHojaCARGA_NT')
      .addItem('Crear MOVIMIENTO', 'crearHojaMOVIMIENTO')
      .addItem('Crear TABLERO', 'crearHojaTABLERO'))
    .addSeparator()
    .addItem('🔄 Actualizar Validaciones', 'actualizarValidaciones')
    .addItem('📊 Recalcular Todo', 'recalcularTodo')
    .addToUi();
}

// ==================== INICIALIZACIÓN COMPLETA ====================

function inicializarSistema() {
  const ui = SpreadsheetApp.getUi();
  const response = ui.alert(
    '🚀 Inicializar Sistema',
    '¿Desea crear todas las hojas del sistema?\n\nEsto creará: CONFIG, PRESUPUESTO, GASTOS_FIJOS, CARGA_FAMILIA, CARGA_NT, MOVIMIENTO, TABLERO\n\n⚠️ Las hojas existentes NO se sobrescribirán.',
    ui.ButtonSet.YES_NO
  );

  if (response !== ui.Button.YES) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Crear hojas en orden
  crearHojaCONFIG();
  crearHojaGASTOS_FIJOS();
  crearHojaPRESUPUESTO();
  crearHojaCARGA_FAMILIA();
  crearHojaCARGA_NT();
  crearHojaMOVIMIENTO();
  crearHojaTABLERO();

  // Actualizar validaciones
  actualizarValidaciones();

  ui.alert('✅ Sistema inicializado correctamente',
    'Todas las hojas han sido creadas.\n\nPasos siguientes:\n1. Revisar CONFIG y ajustar valores\n2. Completar GASTOS_FIJOS con montos base\n3. Definir PRESUPUESTO anual\n4. ¡Empezar a cargar movimientos!',
    ui.ButtonSet.OK);
}

// ==================== HOJA CONFIG ====================

function crearHojaCONFIG() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CONFIG');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja CONFIG ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('CONFIG');

  // Título principal
  sheet.getRange('A1').setValue('⚙️ CONFIGURACIÓN DEL SISTEMA').setFontSize(16).setFontWeight('bold');
  sheet.getRange('A1:F1').merge().setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  let row = 3;

  // === MESES ===
  sheet.getRange(row, 1).setValue('MESES').setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  row++;
  CONFIG.MESES.forEach((mes, i) => {
    sheet.getRange(row + i, 1).setValue(mes);
  });
  row += CONFIG.MESES.length + 1;

  // === ENTIDADES ===
  sheet.getRange(row, 1).setValue('ENTIDADES').setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  row++;
  CONFIG.ENTIDADES.forEach((ent, i) => {
    sheet.getRange(row + i, 1).setValue(ent);
  });
  row += CONFIG.ENTIDADES.length + 1;

  // === FRECUENCIAS ===
  sheet.getRange(row, 1).setValue('FRECUENCIAS').setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  row++;
  CONFIG.FRECUENCIAS.forEach((frec, i) => {
    sheet.getRange(row + i, 1).setValue(frec);
  });
  row += CONFIG.FRECUENCIAS.length + 1;

  // === ESTADOS ===
  sheet.getRange(row, 1).setValue('ESTADOS').setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  row++;
  CONFIG.ESTADOS.forEach((est, i) => {
    sheet.getRange(row + i, 1).setValue(est);
  });

  // Columna C - Tipos Ingreso Familia
  row = 3;
  sheet.getRange(row, 3).setValue('TIPOS INGRESO FAMILIA').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  row++;
  CONFIG.TIPOS_INGRESO_FAMILIA.forEach((tipo, i) => {
    sheet.getRange(row + i, 3).setValue(tipo);
  });

  // Columna C abajo - Tipos Ingreso NT
  row += CONFIG.TIPOS_INGRESO_FAMILIA.length + 1;
  sheet.getRange(row, 3).setValue('TIPOS INGRESO NEUROTEA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  row++;
  CONFIG.TIPOS_INGRESO_NT.forEach((tipo, i) => {
    sheet.getRange(row + i, 3).setValue(tipo);
  });

  // Columna E - Cuentas Familia
  row = 3;
  sheet.getRange(row, 5).setValue('CUENTAS FAMILIA').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  row++;
  CONFIG.CUENTAS_FAMILIA.forEach((cuenta, i) => {
    sheet.getRange(row + i, 5).setValue(cuenta);
  });

  // Columna E abajo - Cuentas NT
  row += CONFIG.CUENTAS_FAMILIA.length + 1;
  sheet.getRange(row, 5).setValue('CUENTAS NEUROTEA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  row++;
  CONFIG.CUENTAS_NT.forEach((cuenta, i) => {
    sheet.getRange(row + i, 5).setValue(cuenta);
  });

  // Columna G - Categorías Egreso Familia
  row = 3;
  sheet.getRange(row, 7).setValue('CATEGORÍAS EGRESO FAM').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  row++;
  CONFIG.CATEGORIAS_EGRESO_FAMILIA.forEach((cat, i) => {
    sheet.getRange(row + i, 7).setValue(cat);
  });

  // Columna G abajo - Categorías Egreso NT
  row += CONFIG.CATEGORIAS_EGRESO_FAMILIA.length + 1;
  sheet.getRange(row, 7).setValue('CATEGORÍAS EGRESO NT').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  row++;
  CONFIG.CATEGORIAS_EGRESO_NT.forEach((cat, i) => {
    sheet.getRange(row + i, 7).setValue(cat);
  });

  // Columna I - Subcategorías Variables Familia
  row = 3;
  sheet.getRange(row, 9).setValue('SUBCAT. VAR. FAMILIA').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  row++;
  CONFIG.SUBCATEGORIAS_VAR_FAMILIA.forEach((sub, i) => {
    sheet.getRange(row + i, 9).setValue(sub);
  });

  // Columna I abajo - Subcategorías Variables NT
  row += CONFIG.SUBCATEGORIAS_VAR_FAMILIA.length + 1;
  sheet.getRange(row, 9).setValue('SUBCAT. VAR. NT').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  row++;
  CONFIG.SUBCATEGORIAS_VAR_NT.forEach((sub, i) => {
    sheet.getRange(row + i, 9).setValue(sub);
  });

  // Columna K - Eventos NT
  row = 3;
  sheet.getRange(row, 11).setValue('EVENTOS NEUROTEA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  row++;
  CONFIG.EVENTOS_NT.forEach((evento, i) => {
    sheet.getRange(row + i, 11).setValue(evento);
  });

  // Columna M - Metas
  row = 3;
  sheet.getRange(row, 13).setValue('METAS NEUROTEA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');
  row++;
  sheet.getRange(row, 13).setValue('Meta Ganancia Mínima');
  sheet.getRange(row, 14).setValue('7%');
  row++;
  sheet.getRange(row, 13).setValue('Meta Máximo Gastos');
  sheet.getRange(row, 14).setValue('93%');
  row++;
  sheet.getRange(row, 13).setValue('Distribución Utilidad');
  sheet.getRange(row, 14).setValue('33.33%');
  row++;
  sheet.getRange(row, 13).setValue('Distribución Emergencia');
  sheet.getRange(row, 14).setValue('33.33%');
  row++;
  sheet.getRange(row, 13).setValue('Distribución Inversión');
  sheet.getRange(row, 14).setValue('33.33%');

  // Ajustar anchos
  sheet.setColumnWidth(1, 150);
  sheet.setColumnWidth(3, 200);
  sheet.setColumnWidth(5, 180);
  sheet.setColumnWidth(7, 180);
  sheet.setColumnWidth(9, 200);
  sheet.setColumnWidth(11, 180);
  sheet.setColumnWidth(13, 180);

  return sheet;
}

// ==================== HOJA GASTOS_FIJOS ====================

function crearHojaGASTOS_FIJOS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('GASTOS_FIJOS');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja GASTOS_FIJOS ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('GASTOS_FIJOS');

  // Título
  sheet.getRange('A1').setValue('📋 GASTOS FIJOS - LISTA MAESTRA').setFontSize(14).setFontWeight('bold');
  sheet.getRange('A1:R1').merge().setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  sheet.getRange('A2').setValue('DÍA = día del mes que vence. Si un mes está vacío, usa el MONTO BASE.').setFontStyle('italic');
  sheet.getRange('A2:R2').merge().setBackground(CONFIG.COLORES.FONDO_GRIS);

  // Encabezados
  const headers = ['CONCEPTO', 'ENTIDAD', 'CATEGORÍA', 'FRECUENCIA', 'DÍA', 'BASE',
                   'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];

  // Sección FAMILIA
  let row = 4;
  sheet.getRange(row, 1).setValue('🟢 GASTOS FIJOS FAMILIA').setFontSize(12).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 18).merge().setBackground(CONFIG.COLORES.FAMILIA_HEADER).setFontColor('white');

  row++;
  headers.forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  });

  // Datos de ejemplo FAMILIA
  row++;
  const gastosFamilia = [
    ['Salario Lili Doméstico', 'FAMILIA', 'GASTOS FIJOS', 'Fijo/Mensual', 5, 2500000],
    ['Salario Laura Doméstico', 'FAMILIA', 'GASTOS FIJOS', 'Fijo/Mensual', 5, 1800000],
    ['Escuela Fabián y Brenda', 'FAMILIA', 'GASTOS FIJOS', 'Fijo/Mensual', 10, 1200000],
    ['ANDE Casa', 'FAMILIA', 'GASTOS FIJOS', 'Variable/Mensual', 15, 400000],
    ['Expensa Casa', 'FAMILIA', 'GASTOS FIJOS', 'Fijo/Mensual', 1, 450000],
    ['Préstamo Lizzi', 'FAMILIA', 'CUOTAS Y PRÉSTAMOS', 'Fijo/Mensual', 20, 800000],
    ['Cuota ITAU', 'FAMILIA', 'CUOTAS Y PRÉSTAMOS', 'Variable/Mensual', 15, 1500000],
    ['Giganet', 'FAMILIA', 'SUSCRIPCIONES', 'Fijo/Mensual', 1, 180000],
    ['ChatGPT', 'FAMILIA', 'SUSCRIPCIONES', 'Fijo/Mensual', 15, 120000],
    ['Claude Marco', 'FAMILIA', 'SUSCRIPCIONES', 'Fijo/Mensual', 15, 120000],
  ];

  gastosFamilia.forEach((gasto, i) => {
    gasto.forEach((val, j) => {
      sheet.getRange(row + i, j + 1).setValue(val);
    });
    sheet.getRange(row + i, 1, 1, 18).setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  });

  row += gastosFamilia.length + 2;

  // Separador
  sheet.getRange(row, 1, 1, 18).merge().setBackground(CONFIG.COLORES.SEPARADOR);
  row += 2;

  // Sección NEUROTEA
  sheet.getRange(row, 1).setValue('🔵 GASTOS FIJOS NEUROTEA').setFontSize(12).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 18).merge().setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');

  row++;
  headers.forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  });

  // Datos de ejemplo NEUROTEA
  row++;
  const gastosNT = [
    ['Alquiler 1 (Principal)', 'NEUROTEA', 'CLÍNICA', 'Fijo/Mensual', 5, 3500000],
    ['Alquiler 2 (Secundario)', 'NEUROTEA', 'CLÍNICA', 'Fijo/Mensual', 5, 1800000],
    ['ANDE clínica', 'NEUROTEA', 'CLÍNICA', 'Variable/Mensual', 15, 350000],
    ['Sueldo Aracely', 'NEUROTEA', 'SUELDOS Y HONORARIOS', 'Fijo/Mensual', 30, 2800000],
    ['Sueldo Fátima', 'NEUROTEA', 'SUELDOS Y HONORARIOS', 'Fijo/Mensual', 30, 2500000],
    ['Salario Administrador (Marco)', 'NEUROTEA', 'SUELDOS Y HONORARIOS', 'Fijo/Mensual', 30, 5000000],
    ['Honorario Contador', 'NEUROTEA', 'SUELDOS Y HONORARIOS', 'Fijo/Mensual', 10, 800000],
    ['Celular Tigo NT', 'NEUROTEA', 'TELEFONÍA E INTERNET', 'Fijo/Mensual', 28, 150000],
    ['Internet NT', 'NEUROTEA', 'TELEFONÍA E INTERNET', 'Fijo/Mensual', 15, 200000],
    ['IVA', 'NEUROTEA', 'OBLIGACIONES LEGALES', 'Variable/Mensual', 20, 500000],
  ];

  gastosNT.forEach((gasto, i) => {
    gasto.forEach((val, j) => {
      sheet.getRange(row + i, j + 1).setValue(val);
    });
    sheet.getRange(row + i, 1, 1, 18).setBackground(CONFIG.COLORES.NT_FONDO);
  });

  // Formato de números
  sheet.getRange('F:R').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 100);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 50);
  sheet.setColumnWidth(6, 100);
  for (let i = 7; i <= 18; i++) {
    sheet.setColumnWidth(i, 85);
  }

  return sheet;
}

// ==================== HOJA CARGA_FAMILIA ====================

function crearHojaCARGA_FAMILIA() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_FAMILIA');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja CARGA_FAMILIA ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('CARGA_FAMILIA');

  // Título
  sheet.getRange('A1').setValue('👨‍👩‍👧‍👦 CARGA FAMILIA - Variables Puros').setFontSize(14).setFontWeight('bold');
  sheet.getRange('A1:I1').merge().setBackground(CONFIG.COLORES.FAMILIA_HEADER).setFontColor('white');

  // Filtro de mes
  sheet.getRange('A2').setValue('Filtrar Mes:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Todos');

  // Encabezados
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS'];
  headers.forEach((h, i) => {
    sheet.getRange(4, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  });

  // Datos de ejemplo
  const ejemplos = [
    [new Date(2026, 0, 2), 'Salario Marco', '-', '-', 'Enero Itaipu', 8500000, 'ITAU Marco', 'Pagado', ''],
    [new Date(2026, 0, 2), 'Salario Marco NeuroTEA', '-', '-', 'Enero Admin', 5000000, 'ITAU Marco', 'Pagado', ''],
    [new Date(2026, 0, 3), 'Egreso Familiar', 'VARIABLES', 'Supermercado', 'Stock mensual', 450000, 'Efectivo', 'Pagado', ''],
    [new Date(2026, 0, 5), 'Egreso Familiar', 'VARIABLES', 'Combustible', 'Nafta', 200000, 'Tarjeta ITAU Marco', 'Pagado', ''],
  ];

  ejemplos.forEach((ej, i) => {
    ej.forEach((val, j) => {
      sheet.getRange(5 + i, j + 1).setValue(val);
    });
  });

  // Formato
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F:F').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 150);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 150);

  // Aplicar validaciones Anti-Burro
  aplicarValidacionesCargaFamilia(sheet);

  return sheet;
}

// ==================== HOJA CARGA_NT ====================

function crearHojaCARGA_NT() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_NT');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja CARGA_NT ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('CARGA_NT');

  // Título
  sheet.getRange('A1').setValue('🏥 CARGA NEUROTEA - Variables y Eventos').setFontSize(14).setFontWeight('bold');
  sheet.getRange('A1:I1').merge().setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');

  // Filtro de mes
  sheet.getRange('A2').setValue('Filtrar Mes:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Todos');

  // Encabezados
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA/EVENTO', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS'];
  headers.forEach((h, i) => {
    sheet.getRange(4, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  });

  // Datos de ejemplo
  const ejemplos = [
    [new Date(2026, 0, 2), 'Aporte NeuroTEA Terapeutas', '-', '-', 'Semana 1', 6000000, 'Atlas NeuroTEA', 'Pagado', ''],
    [new Date(2026, 0, 5), 'Egreso NT', 'VARIABLES', 'Insumos y Papelería', 'Materiales terapia', 150000, 'Caja Chica NT', 'Pagado', ''],
    [new Date(2026, 3, 10), 'Egreso NT', 'EVENTOS', 'Día del Autismo', 'Decoración', 200000, 'Atlas NeuroTEA', 'Pendiente', ''],
  ];

  ejemplos.forEach((ej, i) => {
    ej.forEach((val, j) => {
      sheet.getRange(5 + i, j + 1).setValue(val);
    });
  });

  // Formato
  sheet.getRange('A:A').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F:F').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 100);
  sheet.setColumnWidth(2, 200);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 200);
  sheet.setColumnWidth(5, 200);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 150);
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 150);

  // Aplicar validaciones Anti-Burro
  aplicarValidacionesCargaNT(sheet);

  return sheet;
}

// ==================== HOJA PRESUPUESTO ====================

function crearHojaPRESUPUESTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('PRESUPUESTO');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja PRESUPUESTO ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('PRESUPUESTO');

  // Título
  sheet.getRange('A1').setValue('📊 PRESUPUESTO ANUAL 2026').setFontSize(16).setFontWeight('bold');
  sheet.getRange('A1:P1').merge().setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  // Encabezados de meses
  const headers = ['CONCEPTO', 'TIPO', 'FRECUENCIA', 'ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC', 'TOTAL'];
  headers.forEach((h, i) => {
    sheet.getRange(3, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  });

  let row = 5;

  // === SECCIÓN FAMILIA ===
  sheet.getRange(row, 1).setValue('🟢 PRESUPUESTO FAMILIA').setFontSize(12).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 16).merge().setBackground(CONFIG.COLORES.FAMILIA_HEADER).setFontColor('white');
  row += 2;

  // Ingresos Familia
  sheet.getRange(row, 1).setValue('► INGRESOS FAMILIA').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const ingresosFam = [
    ['Salario Marco', 'Ingreso', 'Fijo/Mensual'],
    ['Salario Marco NeuroTEA', 'Ingreso', 'Fijo/Mensual'],
    ['Vacaciones Marco', 'Ingreso', 'Variable/Anual'],
    ['Adelanto de Aguinaldo Marco', 'Ingreso', 'Fijo/Anual'],
    ['Saldo Aguinaldo Marco', 'Ingreso', 'Fijo/Anual'],
    ['Honorarios Clara NeuroTEA', 'Ingreso', 'Fijo/Mensual'],
  ];

  ingresosFam.forEach((ing) => {
    sheet.getRange(row, 1).setValue(ing[0]);
    sheet.getRange(row, 2).setValue(ing[1]);
    sheet.getRange(row, 3).setValue(ing[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });

  // Total Ingresos Familia
  const filaInicioIngFam = row - ingresosFam.length;
  sheet.getRange(row, 1).setValue('TOTAL INGRESOS FAMILIA').setFontWeight('bold');
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=SUM(' + colLetter + filaInicioIngFam + ':' + colLetter + (row - 1) + ')');
  }
  sheet.getRange(row, 1, 1, 16).setBackground('#bbf7d0');
  const filaTotalIngFam = row;
  row += 2;

  // Egresos Familia - Gastos Fijos
  sheet.getRange(row, 1).setValue('► EGRESOS FAMILIA - GASTOS FIJOS').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const gastosFijosFam = [
    ['Salario Lili Doméstico', 'Egreso', 'Fijo/Mensual'],
    ['Salario Laura Doméstico', 'Egreso', 'Fijo/Mensual'],
    ['Escuela Fabián y Brenda', 'Egreso', 'Fijo/Mensual'],
    ['ANDE Casa', 'Egreso', 'Variable/Mensual'],
    ['Expensa Casa', 'Egreso', 'Fijo/Mensual'],
  ];

  gastosFijosFam.forEach((gasto) => {
    sheet.getRange(row, 1).setValue(gasto[0]);
    sheet.getRange(row, 2).setValue(gasto[1]);
    sheet.getRange(row, 3).setValue(gasto[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });

  const filaInicioGFFam = row - gastosFijosFam.length;
  sheet.getRange(row, 1).setValue('SUBTOTAL GASTOS FIJOS').setFontWeight('bold').setFontStyle('italic');
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=SUM(' + colLetter + filaInicioGFFam + ':' + colLetter + (row - 1) + ')');
  }
  row += 2;

  // Egresos Familia - Variables
  sheet.getRange(row, 1).setValue('► EGRESOS FAMILIA - VARIABLES').setFontWeight('bold').setBackground(CONFIG.COLORES.FAMILIA_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const variablesFam = [
    ['Supermercado', 'Egreso', 'Variable/Mensual'],
    ['Combustible', 'Egreso', 'Variable/Mensual'],
    ['Recreación', 'Egreso', 'Variable/Mensual'],
    ['Salud y Medicamentos', 'Egreso', 'Variable/Mensual'],
  ];

  variablesFam.forEach((v) => {
    sheet.getRange(row, 1).setValue(v[0]);
    sheet.getRange(row, 2).setValue(v[1]);
    sheet.getRange(row, 3).setValue(v[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });

  const filaInicioVarFam = row - variablesFam.length;
  sheet.getRange(row, 1).setValue('SUBTOTAL VARIABLES').setFontWeight('bold').setFontStyle('italic');
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=SUM(' + colLetter + filaInicioVarFam + ':' + colLetter + (row - 1) + ')');
  }
  const filaTotalEgrFam = row;
  row += 2;

  // Balance Familia
  sheet.getRange(row, 1).setValue('BALANCE FAMILIA').setFontWeight('bold').setFontSize(11);
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=' + colLetter + filaTotalIngFam + '-' + colLetter + filaTotalEgrFam);
  }
  sheet.getRange(row, 1, 1, 16).setBackground('#fef08a');
  row += 3;

  // === SECCIÓN NEUROTEA ===
  sheet.getRange(row, 1).setValue('🔵 PRESUPUESTO NEUROTEA').setFontSize(12).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 16).merge().setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');
  row += 2;

  // Ingresos NT
  sheet.getRange(row, 1).setValue('► INGRESOS NEUROTEA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const ingresosNT = [
    ['Aporte NeuroTEA Terapeutas', 'Ingreso', 'Variable/Mensual'],
    ['Cursos NeuroTEA', 'Ingreso', 'Variable/Mensual'],
    ['Otros', 'Ingreso', 'Variable/Mensual'],
  ];

  ingresosNT.forEach((ing) => {
    sheet.getRange(row, 1).setValue(ing[0]);
    sheet.getRange(row, 2).setValue(ing[1]);
    sheet.getRange(row, 3).setValue(ing[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });

  const filaInicioIngNT = row - ingresosNT.length;
  sheet.getRange(row, 1).setValue('TOTAL INGRESOS NEUROTEA').setFontWeight('bold');
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=SUM(' + colLetter + filaInicioIngNT + ':' + colLetter + (row - 1) + ')');
  }
  sheet.getRange(row, 1, 1, 16).setBackground('#bfdbfe');
  const filaTotalIngNT = row;
  row += 2;

  // Egresos NT - Clínica
  sheet.getRange(row, 1).setValue('► EGRESOS NT - CLÍNICA').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const clinicaNT = [
    ['Alquiler 1 (Principal)', 'Egreso', 'Fijo/Mensual'],
    ['Alquiler 2 (Secundario)', 'Egreso', 'Fijo/Mensual'],
    ['ANDE clínica', 'Egreso', 'Variable/Mensual'],
  ];

  clinicaNT.forEach((g) => {
    sheet.getRange(row, 1).setValue(g[0]);
    sheet.getRange(row, 2).setValue(g[1]);
    sheet.getRange(row, 3).setValue(g[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });
  row++;

  // Egresos NT - Sueldos
  sheet.getRange(row, 1).setValue('► EGRESOS NT - SUELDOS Y HONORARIOS').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const sueldosNT = [
    ['Sueldo Aracely', 'Egreso', 'Fijo/Mensual'],
    ['Sueldo Fátima', 'Egreso', 'Fijo/Mensual'],
    ['Salario Administrador (Marco)', 'Egreso', 'Fijo/Mensual'],
    ['Honorario Contador', 'Egreso', 'Fijo/Mensual'],
  ];

  sueldosNT.forEach((g) => {
    sheet.getRange(row, 1).setValue(g[0]);
    sheet.getRange(row, 2).setValue(g[1]);
    sheet.getRange(row, 3).setValue(g[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });
  row++;

  // Egresos NT - Eventos
  sheet.getRange(row, 1).setValue('► EGRESOS NT - EVENTOS').setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO);
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  const eventosNT = [
    ['Día del Autismo', 'Egreso', 'Variable/Anual'],
    ['San Juan', 'Egreso', 'Variable/Anual'],
    ['Día del Niño', 'Egreso', 'Variable/Anual'],
    ['Clausura Padres', 'Egreso', 'Variable/Anual'],
    ['Navidad Papá Noel', 'Egreso', 'Variable/Anual'],
    ['Cena Fin de Año', 'Egreso', 'Variable/Anual'],
  ];

  eventosNT.forEach((e) => {
    sheet.getRange(row, 1).setValue(e[0]);
    sheet.getRange(row, 2).setValue(e[1]);
    sheet.getRange(row, 3).setValue(e[2]);
    sheet.getRange(row, 16).setFormula('=SUM(D' + row + ':O' + row + ')');
    row++;
  });

  const filaInicioEventos = row - eventosNT.length;
  sheet.getRange(row, 1).setValue('TOTAL EVENTOS').setFontWeight('bold').setFontStyle('italic');
  for (let c = 4; c <= 16; c++) {
    const colLetter = columnToLetter(c);
    sheet.getRange(row, c).setFormula('=SUM(' + colLetter + filaInicioEventos + ':' + colLetter + (row - 1) + ')');
  }
  row += 2;

  // Ganancia NT
  sheet.getRange(row, 1).setValue('► GANANCIA NEUROTEA (7% META)').setFontWeight('bold').setBackground('#fef3c7');
  sheet.getRange(row, 1, 1, 16).merge();
  row++;

  sheet.getRange(row, 1).setValue('Ganancia Calculada');
  sheet.getRange(row, 2).setValue('Calculado');
  sheet.getRange(row, 3).setValue('-');
  row++;

  sheet.getRange(row, 1).setValue('→ Utilidad Dueño (33.33%)');
  row++;
  sheet.getRange(row, 1).setValue('→ Fondo Emergencia (33.33%)');
  row++;
  sheet.getRange(row, 1).setValue('→ Fondo Inversión (33.33%)');
  row += 2;

  // Formato de números
  sheet.getRange('D:P').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 120);
  for (let i = 4; i <= 16; i++) {
    sheet.setColumnWidth(i, 90);
  }

  return sheet;
}

// ==================== HOJA MOVIMIENTO ====================

function crearHojaMOVIMIENTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('MOVIMIENTO');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja MOVIMIENTO ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('MOVIMIENTO');

  // Título
  sheet.getRange('A1').setValue('📈 MOVIMIENTO - Real vs Presupuesto').setFontSize(14).setFontWeight('bold');
  sheet.getRange('A1:H1').merge().setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  // Selector de mes
  sheet.getRange('A3').setValue('Mes:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Enero');

  // Encabezados
  const headers = ['CONCEPTO', 'TIPO', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', 'SEMÁFORO'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.FONDO_GRIS);
  });

  // Sección Familia
  let row = 7;
  sheet.getRange(row, 1).setValue('🟢 FAMILIA').setFontWeight('bold');
  sheet.getRange(row, 1, 1, 8).merge().setBackground(CONFIG.COLORES.FAMILIA_HEADER).setFontColor('white');
  row += 2;

  const itemsFam = [
    ['Salario Marco', 'Ingreso', 8500000, 8500000],
    ['Salario Marco NeuroTEA', 'Ingreso', 5000000, 5000000],
    ['Gastos Fijos', 'Egreso', 6500000, 6200000],
    ['Variables', 'Egreso', 2000000, 1800000],
  ];

  itemsFam.forEach((item) => {
    sheet.getRange(row, 1).setValue(item[0]);
    sheet.getRange(row, 2).setValue(item[1]);
    sheet.getRange(row, 3).setValue(item[2]);
    sheet.getRange(row, 4).setValue(item[3]);
    sheet.getRange(row, 5).setFormula('=D' + row + '-C' + row);
    sheet.getRange(row, 6).setFormula('=IF(C' + row + '=0,"",D' + row + '/C' + row + ')');
    sheet.getRange(row, 7).setValue('Pagado');
    row++;
  });
  row += 2;

  // Sección NT
  sheet.getRange(row, 1).setValue('🔵 NEUROTEA').setFontWeight('bold');
  sheet.getRange(row, 1, 1, 8).merge().setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');
  row += 2;

  const itemsNT = [
    ['Aporte Terapeutas', 'Ingreso', 12000000, 11500000],
    ['Clínica (Alquileres, ANDE)', 'Egreso', 5650000, 5650000],
    ['Sueldos y Honorarios', 'Egreso', 11100000, 11100000],
    ['Variables', 'Egreso', 500000, 350000],
    ['Eventos', 'Egreso', 300000, 280000],
  ];

  itemsNT.forEach((item) => {
    sheet.getRange(row, 1).setValue(item[0]);
    sheet.getRange(row, 2).setValue(item[1]);
    sheet.getRange(row, 3).setValue(item[2]);
    sheet.getRange(row, 4).setValue(item[3]);
    sheet.getRange(row, 5).setFormula('=D' + row + '-C' + row);
    sheet.getRange(row, 6).setFormula('=IF(C' + row + '=0,"",D' + row + '/C' + row + ')');
    sheet.getRange(row, 7).setValue('Pagado');
    row++;
  });

  // Formato
  sheet.getRange('C:E').setNumberFormat('#,##0');
  sheet.getRange('F:F').setNumberFormat('0%');

  // Ajustar anchos
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 120);
  sheet.setColumnWidth(6, 80);
  sheet.setColumnWidth(7, 100);
  sheet.setColumnWidth(8, 100);

  return sheet;
}

// ==================== HOJA TABLERO ====================

function crearHojaTABLERO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('TABLERO');

  if (sheet) {
    SpreadsheetApp.getUi().alert('La hoja TABLERO ya existe');
    return sheet;
  }

  sheet = ss.insertSheet('TABLERO');

  // Título
  sheet.getRange('A1').setValue('📊 TABLERO DE CONTROL').setFontSize(18).setFontWeight('bold');
  sheet.getRange('A1:F1').merge().setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  sheet.getRange('A2').setValue('Mes Actual:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Enero 2026');

  let row = 4;

  // === RESUMEN FAMILIA ===
  sheet.getRange(row, 1).setValue('🟢 RESUMEN FAMILIA').setFontSize(14).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 3).merge().setBackground(CONFIG.COLORES.FAMILIA_HEADER).setFontColor('white');
  row++;

  const kpisFam = [
    ['Total Ingresos', 13500000, ''],
    ['Total Egresos', 8000000, ''],
    ['Balance', 5500000, '🟢'],
    ['Liquidez Semana 1', 3200000, '🟢'],
    ['Liquidez Semana 2', 1500000, '🟡'],
    ['Liquidez Semana 3', 800000, '🟡'],
  ];

  kpisFam.forEach((kpi) => {
    sheet.getRange(row, 1).setValue(kpi[0]).setFontWeight('bold');
    sheet.getRange(row, 2).setValue(kpi[1]).setNumberFormat('#,##0');
    sheet.getRange(row, 3).setValue(kpi[2]);
    if (kpi[0] === 'Balance') {
      sheet.getRange(row, 1, 1, 3).setBackground('#bbf7d0');
    }
    row++;
  });
  row++;

  // === RESUMEN NEUROTEA ===
  sheet.getRange(row, 1).setValue('🔵 RESUMEN NEUROTEA').setFontSize(14).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 3).merge().setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');
  row++;

  const kpisNT = [
    ['Total Ingresos', 12000000, ''],
    ['Total Egresos', 11100000, ''],
    ['Ganancia', 900000, '🟢'],
    ['% Ganancia', '7.5%', '🟢'],
    ['Utilidad Dueño', 300000, ''],
    ['Fondo Emergencia', 300000, ''],
    ['Fondo Inversión', 300000, ''],
  ];

  kpisNT.forEach((kpi) => {
    sheet.getRange(row, 1).setValue(kpi[0]).setFontWeight('bold');
    sheet.getRange(row, 2).setValue(kpi[1]);
    if (typeof kpi[1] === 'number') {
      sheet.getRange(row, 2).setNumberFormat('#,##0');
    }
    sheet.getRange(row, 3).setValue(kpi[2]);
    if (kpi[0] === 'Ganancia' || kpi[0] === '% Ganancia') {
      sheet.getRange(row, 1, 1, 3).setBackground('#bfdbfe');
    }
    row++;
  });
  row++;

  // === BALANCE CRUZADO ===
  sheet.getRange(row, 1).setValue('🟣 BALANCE CRUZADO NT ↔ FAM').setFontSize(14).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 3).merge().setBackground(CONFIG.COLORES.PURPURA).setFontColor('white');
  row++;

  sheet.getRange(row, 1).setValue('Préstamos NT → Familia');
  sheet.getRange(row, 2).setValue(3000000).setNumberFormat('#,##0');
  row++;
  sheet.getRange(row, 1).setValue('Devoluciones Familia → NT');
  sheet.getRange(row, 2).setValue(500000).setNumberFormat('#,##0');
  row++;
  sheet.getRange(row, 1).setValue('SALDO NETO').setFontWeight('bold');
  sheet.getRange(row, 2).setValue(2500000).setNumberFormat('#,##0');
  sheet.getRange(row, 3).setValue('Familia debe a NT').setFontColor(CONFIG.COLORES.ALERTA_ROJO);
  row += 2;

  // === CONCILIACIÓN BANCARIA ===
  sheet.getRange(row, 1).setValue('🏦 CONCILIACIÓN BANCARIA').setFontSize(14).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 5).merge().setBackground(CONFIG.COLORES.FONDO_GRIS);
  row++;

  const headersConcil = ['CUENTA', 'ESPERADO', 'REAL', 'DIFERENCIA', 'ESTADO'];
  headersConcil.forEach((h, i) => {
    sheet.getRange(row, i + 1).setValue(h).setFontWeight('bold');
  });
  row++;

  const cuentas = [
    ['ITAU Marco', 12500000, 12150000, -350000, '🔴'],
    ['Coop. Univ.', 2300000, 2300000, 0, '✅'],
    ['ITAU Clara', 1800000, 1850000, 50000, '🟢'],
    ['Atlas NT', 8500000, 8500000, 0, '✅'],
  ];

  cuentas.forEach((cuenta) => {
    cuenta.forEach((val, i) => {
      sheet.getRange(row, i + 1).setValue(val);
      if (i >= 1 && i <= 3) {
        sheet.getRange(row, i + 1).setNumberFormat('#,##0');
      }
    });
    row++;
  });

  // Ajustar anchos
  sheet.setColumnWidth(1, 200);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 150);

  return sheet;
}

// ==================== VALIDACIONES ANTI-BURRO ====================

function aplicarValidacionesCargaFamilia(sheet) {
  const ultimaFila = 500;

  // Validación TIPO (columna B) - Ingresos + "Egreso Familiar"
  const tiposFamilia = [...CONFIG.TIPOS_INGRESO_FAMILIA, 'Egreso Familiar'];
  const ruleTipo = SpreadsheetApp.newDataValidation()
    .requireValueInList(tiposFamilia, true)
    .setAllowInvalid(false)
    .setHelpText('Seleccione el tipo de movimiento')
    .build();
  sheet.getRange('B5:B' + ultimaFila).setDataValidation(ruleTipo);

  // Validación CATEGORÍA (columna C) - Solo para egresos
  const ruleCat = SpreadsheetApp.newDataValidation()
    .requireValueInList(['-', ...CONFIG.CATEGORIAS_EGRESO_FAMILIA], true)
    .setAllowInvalid(false)
    .setHelpText('Para Ingresos use "-". Para Egresos seleccione categoría.')
    .build();
  sheet.getRange('C5:C' + ultimaFila).setDataValidation(ruleCat);

  // Validación SUBCATEGORÍA (columna D)
  const ruleSubcat = SpreadsheetApp.newDataValidation()
    .requireValueInList(['-', ...CONFIG.SUBCATEGORIAS_VAR_FAMILIA], true)
    .setAllowInvalid(false)
    .setHelpText('Solo aplica para CATEGORÍA = VARIABLES')
    .build();
  sheet.getRange('D5:D' + ultimaFila).setDataValidation(ruleSubcat);

  // Validación CUENTA (columna G)
  const ruleCuenta = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.CUENTAS_FAMILIA, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('G5:G' + ultimaFila).setDataValidation(ruleCuenta);

  // Validación ESTADO (columna H)
  const ruleEstado = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.ESTADOS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('H5:H' + ultimaFila).setDataValidation(ruleEstado);
}

function aplicarValidacionesCargaNT(sheet) {
  const ultimaFila = 500;

  // Validación TIPO (columna B) - Ingresos + "Egreso NT"
  const tiposNT = [...CONFIG.TIPOS_INGRESO_NT, 'Egreso NT'];
  const ruleTipo = SpreadsheetApp.newDataValidation()
    .requireValueInList(tiposNT, true)
    .setAllowInvalid(false)
    .setHelpText('Seleccione el tipo de movimiento')
    .build();
  sheet.getRange('B5:B' + ultimaFila).setDataValidation(ruleTipo);

  // Validación CATEGORÍA (columna C)
  const ruleCat = SpreadsheetApp.newDataValidation()
    .requireValueInList(['-', ...CONFIG.CATEGORIAS_EGRESO_NT], true)
    .setAllowInvalid(false)
    .setHelpText('Para Ingresos use "-". Para Egresos seleccione categoría.')
    .build();
  sheet.getRange('C5:C' + ultimaFila).setDataValidation(ruleCat);

  // Validación SUBCATEGORÍA/EVENTO (columna D)
  const opcionesSubcat = ['-', ...CONFIG.SUBCATEGORIAS_VAR_NT, ...CONFIG.EVENTOS_NT];
  const ruleSubcat = SpreadsheetApp.newDataValidation()
    .requireValueInList(opcionesSubcat, true)
    .setAllowInvalid(false)
    .setHelpText('Variables o Eventos según la categoría')
    .build();
  sheet.getRange('D5:D' + ultimaFila).setDataValidation(ruleSubcat);

  // Validación CUENTA (columna G)
  const ruleCuenta = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.CUENTAS_NT, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('G5:G' + ultimaFila).setDataValidation(ruleCuenta);

  // Validación ESTADO (columna H)
  const ruleEstado = SpreadsheetApp.newDataValidation()
    .requireValueInList(CONFIG.ESTADOS, true)
    .setAllowInvalid(false)
    .build();
  sheet.getRange('H5:H' + ultimaFila).setDataValidation(ruleEstado);
}

function actualizarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const sheetFam = ss.getSheetByName('CARGA_FAMILIA');
  if (sheetFam) aplicarValidacionesCargaFamilia(sheetFam);

  const sheetNT = ss.getSheetByName('CARGA_NT');
  if (sheetNT) aplicarValidacionesCargaNT(sheetNT);

  SpreadsheetApp.getUi().alert('✅ Validaciones actualizadas');
}

// ==================== FUNCIONES AUXILIARES ====================

function columnToLetter(column) {
  let temp, letter = '';
  while (column > 0) {
    temp = (column - 1) % 26;
    letter = String.fromCharCode(temp + 65) + letter;
    column = (column - temp - 1) / 26;
  }
  return letter;
}

function recalcularTodo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Recálculo completado');
}

// ==================== TRIGGER onEdit PARA ANTI-BURRO ====================

function onEdit(e) {
  const sheet = e.source.getActiveSheet();
  const sheetName = sheet.getName();
  const range = e.range;
  const row = range.getRow();
  const col = range.getColumn();

  // Solo procesar CARGA_FAMILIA y CARGA_NT
  if (sheetName !== 'CARGA_FAMILIA' && sheetName !== 'CARGA_NT') return;
  if (row < 5) return; // Ignorar encabezados

  // Si se edita TIPO (columna B)
  if (col === 2) {
    const tipo = e.value;
    const esIngreso = CONFIG.TIPOS_INGRESO_FAMILIA.includes(tipo) ||
                      CONFIG.TIPOS_INGRESO_NT.includes(tipo);

    if (esIngreso) {
      // Limpiar CATEGORÍA y SUBCATEGORÍA
      sheet.getRange(row, 3).setValue('-');
      sheet.getRange(row, 4).setValue('-');
    }
  }

  // Si se edita CATEGORÍA (columna C)
  if (col === 3) {
    const categoria = e.value;

    // Si categoría NO es VARIABLES ni EVENTOS, limpiar subcategoría
    if (categoria !== 'VARIABLES' && categoria !== 'EVENTOS') {
      sheet.getRange(row, 4).setValue('-');
    }
  }
}

// ==================== FIN DEL SCRIPT ====================
