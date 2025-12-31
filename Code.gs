/**
 * =====================================================
 * SISTEMA DE CONTROL FINANCIERO 2026
 * NeuroTEA & Familia - Google Apps Script
 * Versión 3.0 - COMPLETO (Igual al Prototipo JSX)
 * =====================================================
 */

// ==================== MENÚ ====================

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('💰 Control Financiero')
    .addItem('🚀 Inicializar Sistema COMPLETO', 'inicializarSistema')
    .addSeparator()
    .addItem('📊 Abrir Dashboard Web', 'abrirWebApp')
    .addItem('🌐 Desplegar como Web App', 'mostrarInstruccionesWebApp')
    .addSeparator()
    .addSubMenu(SpreadsheetApp.getUi().createMenu('📋 Crear Hojas Individual')
      .addItem('CONFIG', 'crearHojaCONFIG')
      .addItem('PRESUPUESTO', 'crearHojaPRESUPUESTO')
      .addItem('GASTOS_FIJOS', 'crearHojaGASTOS_FIJOS')
      .addItem('CARGA_FAMILIA', 'crearHojaCARGA_FAMILIA')
      .addItem('CARGA_NT', 'crearHojaCARGA_NT')
      .addItem('MOVIMIENTO', 'crearHojaMOVIMIENTO')
      .addItem('TABLERO', 'crearHojaTABLERO'))
    .addSeparator()
    .addItem('🔄 Actualizar Validaciones', 'actualizarValidaciones')
    .addItem('📈 Recalcular Tablero', 'recalcularTablero')
    .addToUi();
}

// ==================== DATOS COMPLETOS ====================

const DATOS = {
  INGRESOS_FAMILIA: [
    { concepto: 'Salario Marco', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Salario Marco NeuroTEA', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Vacaciones Marco', frecuencia: 'Variable/Anual' },
    { concepto: 'Adelanto de Aguinaldo Marco', frecuencia: 'Fijo/Anual' },
    { concepto: 'Saldo Aguinaldo Marco', frecuencia: 'Fijo/Anual' },
    { concepto: 'Viático Marco', frecuencia: 'Variable/Mensual' },
    { concepto: 'Animador Bíblico Marco', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Tarjeta Gourmed', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Contrato Colectivo Marco', frecuencia: 'Variable/Anual' },
    { concepto: 'PL Itaipu Marco', frecuencia: 'Variable/Anual' },
    { concepto: 'Honorarios Clara NeuroTEA', frecuencia: 'Fijo/Mensual' },
    { concepto: 'Préstamo NeuroTEA', frecuencia: 'Variable/Mensual' },
    { concepto: 'Préstamo Otros Bancos', frecuencia: 'Variable/Anual' }
  ],
  GASTOS_FIJOS_FAM: [
    { concepto: 'Salario Lili Doméstico', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Salario Laura Doméstico', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Escuela Fabián y Brenda', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Robótica Niños', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'ANDE Casa', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Expensa Casa', frecuencia: 'Fijo/Mensual', dia: 1 },
    { concepto: 'Ña Luisa', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Remedio Lochi', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Seguro Médico Papá y Mamá', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Contadora Marco', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva GF 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva GF 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva GF 3', frecuencia: '-', dia: '' }
  ],
  CUOTAS_FAM: [
    { concepto: 'Préstamo Lizzi', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Cajubi Marco', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Mutual Marco', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Seguro Auto Laura ITAU', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Cuota ITAU', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Auto Laura Cuota', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Coop. Universitaria Clara', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Coomecipar Clara', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Solar Préstamo 1', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Solar Préstamo 2', frecuencia: 'Fijo/Mensual', dia: 20 },
    { concepto: 'Show Congelador', frecuencia: 'Fijo/Mensual', dia: 25 },
    { concepto: 'Pago Mínimo Tarj ITAU Clara', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Pago Mínimo Tarj ITAU Marco', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Pago Mínimo Tarj Solar Clara', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Pago Mínimo Tarj Comecipar', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Reserva Cuota 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Cuota 2', frecuencia: '-', dia: '' }
  ],
  OBLIGACIONES_FAM: [
    { concepto: 'Aporte IPS', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte Cajubi', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte STEIBI', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Aporte SICHAP', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Impuesto compra digital', frecuencia: 'Variable/Mensual', dia: 20 },
    { concepto: 'Aporte Coop. Univer. Clara', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Aporte Coop. Univer. Marco', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Impuesto Renta personal', frecuencia: 'Fijo/Anual', dia: 31 },
    { concepto: 'Impuesto terreno casa', frecuencia: 'Fijo/Anual', dia: 31 },
    { concepto: 'Reserva Oblig. 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 3', frecuencia: '-', dia: '' }
  ],
  SUSCRIPCIONES_FAM: [
    { concepto: 'Giganet', frecuencia: 'Fijo/Mensual', dia: 1 },
    { concepto: 'Tigo Clara', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Tigo Familiar', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Google One', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'ChatGPT', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Claude Marco', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Claude Clara', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Antivirus Clara (Anual)', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Antivirus Marco (Anual)', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'MS Office Clara (Anual)', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'MS Office Marco (Anual)', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'PosterWall', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Canva (Anual)', frecuencia: 'Fijo/Anual', dia: 15 },
    { concepto: 'Scribd', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'iLovePDF', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Suscr. 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Suscr. 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Suscr. 3', frecuencia: '-', dia: '' }
  ],
  VARIABLES_FAM: [
    { concepto: 'Supermercado', frecuencia: 'Variable/Mensual' },
    { concepto: 'Combustible', frecuencia: 'Variable/Mensual' },
    { concepto: 'Mant. Auto Clara', frecuencia: 'Variable/Anual' },
    { concepto: 'Mant. Auto Niños', frecuencia: 'Variable/Anual' },
    { concepto: 'Mant. Camioneta Marco', frecuencia: 'Variable/Anual' },
    { concepto: 'Ropa/Vestidos', frecuencia: 'Variable/Mensual' },
    { concepto: 'Recreación', frecuencia: 'Variable/Mensual' },
    { concepto: 'Salud y Medicamentos', frecuencia: 'Variable/Mensual' },
    { concepto: 'Gastos no identificados', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Var. 1', frecuencia: '-' },
    { concepto: 'Reserva Var. 2', frecuencia: '-' },
    { concepto: 'Reserva Var. 3', frecuencia: '-' }
  ],
  AHORRO_FAM: [
    { concepto: 'Ahorro Clara', frecuencia: 'Variable/Mensual' },
    { concepto: 'Ahorro Marco', frecuencia: 'Variable/Mensual' }
  ],
  INGRESOS_NT: [
    { concepto: 'Aporte NeuroTEA Terapeutas', frecuencia: 'Variable/Mensual' },
    { concepto: 'Cursos NeuroTEA', frecuencia: 'Variable/Mensual' },
    { concepto: 'Otros', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Ing. 1', frecuencia: '-' },
    { concepto: 'Reserva Ing. 2', frecuencia: '-' },
    { concepto: 'Reserva Ing. 3', frecuencia: '-' }
  ],
  CLINICA_NT: [
    { concepto: 'Alquiler 1 (Principal)', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'Alquiler 2 (Secundario)', frecuencia: 'Fijo/Mensual', dia: 5 },
    { concepto: 'ANDE clínica', frecuencia: 'Variable/Mensual', dia: 15 },
    { concepto: 'Reserva Clín. 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Clín. 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Clín. 3', frecuencia: '-', dia: '' }
  ],
  SUELDOS_NT: [
    { concepto: 'Sueldo Aracely', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Sueldo Fátima', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Limpieza NeuroTEA', frecuencia: 'Variable/Mensual', dia: 30 },
    { concepto: 'Honorario Contador', frecuencia: 'Fijo/Mensual', dia: 10 },
    { concepto: 'Salario Administrador (Marco)', frecuencia: 'Fijo/Mensual', dia: 30 },
    { concepto: 'Honorario Mant. Sistema', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Sueldo 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Sueldo 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Sueldo 3', frecuencia: '-', dia: '' }
  ],
  TELEFONIA_NT: [
    { concepto: 'Celular Tigo NeuroTEA', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'Celular Tigo Sistema', frecuencia: 'Fijo/Mensual', dia: 28 },
    { concepto: 'WhatsFlow', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Internet NeuroTEA', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Reserva Tel. 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Tel. 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Tel. 3', frecuencia: '-', dia: '' }
  ],
  OBLIGACIONES_NT: [
    { concepto: 'IVA', frecuencia: 'Variable/Mensual', dia: 20 },
    { concepto: 'IPS', frecuencia: 'Fijo/Mensual', dia: 15 },
    { concepto: 'Ministerio de Salud', frecuencia: 'Variable/Anual', dia: 31 },
    { concepto: 'Mora de Alquiler', frecuencia: 'Variable/Mensual', dia: 10 },
    { concepto: 'Reserva Oblig. 1', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 2', frecuencia: '-', dia: '' },
    { concepto: 'Reserva Oblig. 3', frecuencia: '-', dia: '' }
  ],
  EVENTOS_NT: [
    { concepto: 'Día del Autismo', frecuencia: 'Variable/Anual', mes: 'Abril' },
    { concepto: 'San Juan', frecuencia: 'Variable/Anual', mes: 'Junio' },
    { concepto: 'Día del Niño', frecuencia: 'Variable/Anual', mes: 'Agosto' },
    { concepto: 'Clausura Padres', frecuencia: 'Variable/Anual', mes: 'Noviembre' },
    { concepto: 'Navidad Papá Noel', frecuencia: 'Variable/Anual', mes: 'Diciembre' },
    { concepto: 'Cena Fin de Año', frecuencia: 'Variable/Anual', mes: 'Diciembre' },
    { concepto: 'Reserva 1', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 2', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 3', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 4', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 5', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 6', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 7', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 8', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 9', frecuencia: 'Variable/Anual', mes: '(por definir)' },
    { concepto: 'Reserva 10', frecuencia: 'Variable/Anual', mes: '(por definir)' }
  ],
  VARIABLES_NT: [
    { concepto: 'Insumos y Papelería', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reparaciones Clínica', frecuencia: 'Variable/Anual' },
    { concepto: 'Mantenimiento Aire', frecuencia: 'Variable/Anual' },
    { concepto: 'Gastos Cursos', frecuencia: 'Variable/Mensual' },
    { concepto: 'Gastos Cumple (Tortas, etc)', frecuencia: 'Variable/Mensual' },
    { concepto: 'Reserva Var. 1', frecuencia: '-' },
    { concepto: 'Reserva Var. 2', frecuencia: '-' },
    { concepto: 'Reserva Var. 3', frecuencia: '-' }
  ]
};

const CONFIG = {
  MESES: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
  ENTIDADES: ['FAMILIA', 'NEUROTEA'],
  FRECUENCIAS: ['Fijo/Mensual', 'Fijo/Anual', 'Variable/Mensual', 'Variable/Anual'],
  ESTADOS: ['Pendiente', 'Pagado', 'Cancelado'],
  TIPOS_INGRESO_FAM: ['Salario Marco','Salario Marco NeuroTEA','Vacaciones Marco','Adelanto Aguinaldo','Saldo Aguinaldo','Viático Marco','Animador Bíblico','Tarjeta Gourmed','Contrato Colectivo','PL Itaipu','Honorarios Clara NT','Préstamo NeuroTEA','Préstamo Otros'],
  TIPOS_INGRESO_NT: ['Aporte Terapeutas','Cursos NeuroTEA','Otros','Devolución Familia→NT'],
  CUENTAS_FAM: ['ITAU Marco','Coop. Univ. Marco','ITAU Clara','UENO Clara','Tarjeta Solar Clara','Tarjeta ITAU Clara','Tarjeta ITAU Marco','Tarjeta Comecipar','Gourmed','Efectivo'],
  CUENTAS_NT: ['Atlas NeuroTEA','Caja Chica NT','Efectivo NT'],
  CATEGORIAS_FAM: ['GASTOS FIJOS','CUOTAS Y PRÉSTAMOS','OBLIGACIONES LEGALES','SUSCRIPCIONES','VARIABLES','AHORRO'],
  CATEGORIAS_NT: ['CLÍNICA','SUELDOS Y HONORARIOS','TELEFONÍA E INTERNET','OBLIGACIONES LEGALES','EVENTOS','VARIABLES'],
  SUBCAT_VAR_FAM: ['Supermercado','Combustible','Mant. Auto Clara','Mant. Auto Niños','Mant. Camioneta','Ropa/Vestidos','Recreación','Salud/Medicamentos','Gastos no identificados','Devolución Fam→NT'],
  SUBCAT_VAR_NT: ['Insumos/Papelería','Reparaciones Clínica','Mant. Aire','Gastos Cursos','Gastos Cumple','Préstamo NT→Familia'],
  EVENTOS_NT: ['Día del Autismo','San Juan','Día del Niño','Clausura Padres','Navidad Papá Noel','Cena Fin de Año','Reserva 1','Reserva 2','Reserva 3','Reserva 4','Reserva 5','Reserva 6','Reserva 7','Reserva 8','Reserva 9','Reserva 10'],
  COLORES: {
    FAM_HEADER: '#166534', FAM_FONDO: '#dcfce7', FAM_SUBTOTAL: '#bbf7d0',
    NT_HEADER: '#1e40af', NT_FONDO: '#dbeafe', NT_SUBTOTAL: '#93c5fd',
    ROJO: '#dc2626', AMARILLO: '#f59e0b', VERDE: '#22c55e',
    GRIS: '#f3f4f6', TEXTO: '#1f2937', BALANCE: '#fef08a',
    PURPURA: '#7c3aed', PURPURA_FONDO: '#ede9fe'
  }
};

// ==================== INICIALIZACIÓN ====================

function inicializarSistema() {
  const ui = SpreadsheetApp.getUi();
  const r = ui.alert('🚀 Inicializar Sistema','¿Crear todas las hojas?\n\nCONFIG, PRESUPUESTO, GASTOS_FIJOS, CARGA_FAMILIA, CARGA_NT, MOVIMIENTO, TABLERO',ui.ButtonSet.YES_NO);
  if (r !== ui.Button.YES) return;

  crearHojaCONFIG();
  crearHojaPRESUPUESTO();
  crearHojaGASTOS_FIJOS();
  crearHojaCARGA_FAMILIA();
  crearHojaCARGA_NT();
  crearHojaMOVIMIENTO();
  crearHojaTABLERO();

  ui.alert('✅ Sistema Creado','Todas las hojas creadas.\n\nPara ver el Dashboard:\n💰 Control Financiero → 📊 Abrir Dashboard Web',ui.ButtonSet.OK);
}

// ==================== HOJA TABLERO (IGUAL AL JSX) ====================

function crearHojaTABLERO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('TABLERO');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('TABLERO');

  const C = CONFIG.COLORES;

  // ═══════════════════════════════════════════════════════════════════════
  // HEADER PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════
  sheet.getRange('A1:N1').merge().setValue('📊 TABLERO DE CONTROL FINANCIERO')
    .setFontSize(18).setFontWeight('bold').setBackground('#1e40af').setFontColor('white').setHorizontalAlignment('center');

  sheet.getRange('A2').setValue('📅 Mes:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Enero 2026').setBackground('#fff7ed');
  sheet.getRange('D2').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E2').setValue(new Date()).setNumberFormat('dd/mm/yyyy');

  // ═══════════════════════════════════════════════════════════════════════
  // COLUMNA FAMILIA (A-G)
  // ═══════════════════════════════════════════════════════════════════════
  let row = 4;

  // Header FAMILIA
  sheet.getRange(row, 1, 1, 7).merge().setValue('🏠 FAMILIA')
    .setFontSize(14).setFontWeight('bold').setBackground(C.FAM_HEADER).setFontColor('white').setHorizontalAlignment('center');
  row += 2;

  // --- SALDOS EN CUENTAS FAMILIA ---
  sheet.getRange(row, 1, 1, 4).merge().setValue('💰 SALDOS EN CUENTAS')
    .setFontWeight('bold').setFontColor(C.FAM_HEADER);
  row++;

  ['Cuenta', 'Esperado', 'Real ✏️', 'Diferencia'].forEach((h, i) => {
    sheet.getRange(row, i+1).setValue(h).setFontWeight('bold').setBackground(C.FAM_FONDO);
  });
  row++;

  const cuentasFam = ['ITAU Marco', 'Coop. Univ. Marco', 'ITAU Clara', 'UENO Clara', 'Tarjeta Solar Clara', 'Tarjeta ITAU Clara', 'Tarjeta ITAU Marco', 'Tarjeta Comecipar', 'Gourmed', 'Efectivo'];
  cuentasFam.forEach(cuenta => {
    sheet.getRange(row, 1).setValue(cuenta);
    sheet.getRange(row, 4).setFormula(`=C${row}-B${row}`); // Diferencia
    row++;
  });
  row++;

  // --- PRESUPUESTO vs REAL FAMILIA ---
  sheet.getRange(row, 1, 1, 4).merge().setValue('📋 PRESUPUESTO vs REAL')
    .setFontWeight('bold').setFontColor(C.FAM_HEADER);
  row++;

  ['Categoría', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(row, i+1).setValue(h).setFontWeight('bold').setBackground(C.FAM_FONDO);
  });
  row++;

  const categsFam = ['► INGRESOS FAMILIA', '► GASTOS FIJOS', '► CUOTAS Y PRÉSTAMOS', '► OBLIGACIONES LEGALES', '► SUSCRIPCIONES', '► VARIABLES', '► AHORRO'];
  const filaInicioCategFam = row;
  categsFam.forEach(cat => {
    sheet.getRange(row, 1).setValue(cat).setFontWeight('bold');
    sheet.getRange(row, 4).setFormula(`=IF(B${row}=0,"-",TEXT(C${row}/B${row},"0%"))`);
    row++;
  });

  // Balance Familia
  sheet.getRange(row, 1).setValue('BALANCE FAMILIA').setFontWeight('bold');
  sheet.getRange(row, 2).setFormula(`=B${filaInicioCategFam}-SUM(B${filaInicioCategFam+1}:B${row-1})`);
  sheet.getRange(row, 3).setFormula(`=C${filaInicioCategFam}-SUM(C${filaInicioCategFam+1}:C${row-1})`);
  sheet.getRange(row, 1, 1, 4).setBackground(C.FAM_SUBTOTAL);
  row += 2;

  // --- FLUJO DEL MES FAMILIA ---
  sheet.getRange(row, 1, 1, 2).merge().setValue('💵 FLUJO DEL MES')
    .setFontWeight('bold').setFontColor(C.FAM_HEADER);
  row++;

  sheet.getRange(row, 1).setValue('Ingresos');
  sheet.getRange(row, 2).setValue(0).setFontColor(C.VERDE).setFontWeight('bold');
  row++;
  sheet.getRange(row, 1).setValue('Egresos Pagados');
  sheet.getRange(row, 2).setValue(0).setFontColor(C.ROJO).setFontWeight('bold');
  row++;
  sheet.getRange(row, 1).setValue('Egresos Pendientes');
  sheet.getRange(row, 2).setValue(0).setFontColor(C.AMARILLO).setFontWeight('bold');
  row++;
  sheet.getRange(row, 1).setValue('BALANCE').setFontWeight('bold');
  sheet.getRange(row, 2).setValue(0).setFontWeight('bold');
  sheet.getRange(row, 1, 1, 2).setBackground(C.FAM_HEADER).setFontColor('white');
  row += 2;

  // --- LIQUIDEZ FAMILIA ---
  sheet.getRange(row, 1, 1, 5).merge().setValue('📅 LIQUIDEZ - PRÓXIMOS PAGOS')
    .setFontWeight('bold').setFontColor(C.FAM_HEADER);
  row++;

  ['Concepto', 'Cuotas', 'Monto', 'Saldo', 'Estado'].forEach((h, i) => {
    sheet.getRange(row, i+1).setValue(h).setFontWeight('bold').setBackground(C.FAM_FONDO);
  });
  row++;

  const liquidezFam = ['Caja disponible', '⚠️ Atrasados', 'Esta semana', 'Próxima semana', '3ra semana', 'SALDO FINAL'];
  liquidezFam.forEach((item, i) => {
    sheet.getRange(row, 1).setValue(item);
    if (item === 'SALDO FINAL') {
      sheet.getRange(row, 1, 1, 5).setFontWeight('bold').setBackground(C.GRIS);
    }
    if (item === '⚠️ Atrasados') {
      sheet.getRange(row, 1, 1, 5).setBackground('#fef2f2');
    }
    row++;
  });

  // ═══════════════════════════════════════════════════════════════════════
  // COLUMNA NEUROTEA (H-N)
  // ═══════════════════════════════════════════════════════════════════════
  row = 4;

  // Header NEUROTEA
  sheet.getRange(row, 8, 1, 7).merge().setValue('🏥 NEUROTEA')
    .setFontSize(14).setFontWeight('bold').setBackground(C.NT_HEADER).setFontColor('white').setHorizontalAlignment('center');
  row += 2;

  // --- INDICADORES DE METAS ---
  sheet.getRange(row, 8, 1, 4).merge().setValue('🎯 INDICADORES DE METAS')
    .setFontWeight('bold').setFontColor(C.NT_HEADER);
  row++;

  // KPIs en grid
  sheet.getRange(row, 8).setValue('Ingresos del Mes').setBackground('#dbeafe');
  sheet.getRange(row, 9).setValue(0).setFontWeight('bold').setFontSize(12);
  sheet.getRange(row, 10).setValue('Gastos del Mes').setBackground(C.GRIS);
  sheet.getRange(row, 11).setValue(0).setFontWeight('bold').setFontSize(12);
  row++;

  sheet.getRange(row, 8).setValue('Ganancia Real').setBackground('#dcfce7');
  sheet.getRange(row, 9).setValue(0).setFontWeight('bold').setFontSize(12).setFontColor(C.VERDE);
  sheet.getRange(row, 10).setValue('Meta 7%').setBackground('#fef3c7');
  sheet.getRange(row, 11).setValue(0).setFontWeight('bold').setFontSize(12);
  row++;

  // Barra de % gastos
  sheet.getRange(row, 8, 1, 4).merge().setValue('% Gastos sobre Ingresos: 91% / 93% máx')
    .setHorizontalAlignment('center').setBackground('#e0f2fe');
  row++;

  sheet.getRange(row, 8, 1, 4).merge().setValue('✅ META CUMPLIDA - Superávit: 0')
    .setHorizontalAlignment('center').setBackground('#bbf7d0').setFontWeight('bold');
  row++;

  // Distribución ganancia
  sheet.getRange(row, 8, 1, 4).merge().setValue('Distribución de Ganancia (7%)')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  sheet.getRange(row, 8).setValue('Utilidad Dueño').setBackground('#f3e8ff');
  sheet.getRange(row, 9).setValue(0);
  sheet.getRange(row, 10).setValue('F. Emergencia').setBackground('#ffedd5');
  sheet.getRange(row, 11).setValue(0);
  row++;
  sheet.getRange(row, 8).setValue('F. Inversión').setBackground('#cffafe');
  sheet.getRange(row, 9).setValue(0);
  row += 2;

  // --- SALDOS EN CUENTAS NT ---
  sheet.getRange(row, 8, 1, 3).merge().setValue('💰 SALDOS EN CUENTAS')
    .setFontWeight('bold').setFontColor(C.NT_HEADER);
  row++;

  ['Cuenta', 'Mes', 'Acumulado'].forEach((h, i) => {
    sheet.getRange(row, 8+i).setValue(h).setFontWeight('bold').setBackground(C.NT_FONDO);
  });
  row++;

  const cuentasNT = ['Atlas NeuroTEA ✏️', 'Costos Operativos', 'Utilidad del Dueño', 'Fondo Emergencia', 'Fondo Inversión'];
  cuentasNT.forEach(cuenta => {
    sheet.getRange(row, 8).setValue(cuenta);
    row++;
  });
  row++;

  // --- PRESUPUESTO vs REAL NT ---
  sheet.getRange(row, 8, 1, 4).merge().setValue('📋 PRESUPUESTO vs REAL')
    .setFontWeight('bold').setFontColor(C.NT_HEADER);
  row++;

  ['Categoría', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(row, 8+i).setValue(h).setFontWeight('bold').setBackground(C.NT_FONDO);
  });
  row++;

  const categsNT = ['► INGRESOS NT', '► CLÍNICA', '► SUELDOS Y HONORARIOS', '► TELEFONÍA E INTERNET', '► OBLIGACIONES LEGALES', '► EVENTOS', '► VARIABLES', '► GANANCIA (7%)'];
  const filaInicioCategNT = row;
  categsNT.forEach(cat => {
    sheet.getRange(row, 8).setValue(cat).setFontWeight('bold');
    sheet.getRange(row, 11).setFormula(`=IF(I${row}=0,"-",TEXT(J${row}/I${row},"0%"))`);
    row++;
  });

  // Balance NT
  sheet.getRange(row, 8).setValue('BALANCE NEUROTEA').setFontWeight('bold');
  sheet.getRange(row, 8, 1, 4).setBackground(C.NT_SUBTOTAL);
  row += 2;

  // --- FLUJO DEL MES NT ---
  sheet.getRange(row, 8, 1, 2).merge().setValue('💵 FLUJO DEL MES')
    .setFontWeight('bold').setFontColor(C.NT_HEADER);
  row++;

  sheet.getRange(row, 8).setValue('Ingresos');
  sheet.getRange(row, 9).setValue(0).setFontColor(C.VERDE).setFontWeight('bold');
  row++;
  sheet.getRange(row, 8).setValue('Egresos Pagados');
  sheet.getRange(row, 9).setValue(0).setFontColor(C.ROJO).setFontWeight('bold');
  row++;
  sheet.getRange(row, 8).setValue('Egresos Pendientes');
  sheet.getRange(row, 9).setValue(0).setFontColor(C.AMARILLO).setFontWeight('bold');
  row++;
  sheet.getRange(row, 8).setValue('BALANCE').setFontWeight('bold');
  sheet.getRange(row, 9).setValue(0).setFontWeight('bold');
  sheet.getRange(row, 8, 1, 2).setBackground(C.NT_HEADER).setFontColor('white');
  row += 2;

  // --- LIQUIDEZ NT ---
  sheet.getRange(row, 8, 1, 5).merge().setValue('📅 LIQUIDEZ - PRÓXIMOS PAGOS')
    .setFontWeight('bold').setFontColor(C.NT_HEADER);
  row++;

  ['Concepto', 'Cuotas', 'Monto', 'Saldo', 'Estado'].forEach((h, i) => {
    sheet.getRange(row, 8+i).setValue(h).setFontWeight('bold').setBackground(C.NT_FONDO);
  });
  row++;

  liquidezFam.forEach((item, i) => {
    sheet.getRange(row, 8).setValue(item);
    if (item === 'SALDO FINAL') {
      sheet.getRange(row, 8, 1, 5).setFontWeight('bold').setBackground(C.GRIS);
    }
    row++;
  });

  // ═══════════════════════════════════════════════════════════════════════
  // BALANCE CRUZADO (abajo de todo)
  // ═══════════════════════════════════════════════════════════════════════
  row += 2;
  const filaBalanceCruzado = row;

  sheet.getRange(row, 1, 1, 14).merge().setValue('🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA')
    .setFontSize(14).setFontWeight('bold').setBackground(C.PURPURA).setFontColor('white').setHorizontalAlignment('center');
  row++;

  // Tabla izquierda
  ['Concepto', 'Este Mes', 'Acumulado Año'].forEach((h, i) => {
    sheet.getRange(row, 1+i).setValue(h).setFontWeight('bold').setBackground(C.PURPURA_FONDO);
  });
  row++;

  sheet.getRange(row, 1).setValue('Préstamo NT → Familia');
  sheet.getRange(row, 2).setValue(0).setFontColor(C.ROJO);
  sheet.getRange(row, 3).setValue(0).setFontColor(C.ROJO).setFontWeight('bold');
  row++;

  sheet.getRange(row, 1).setValue('Devolución Familia → NT');
  sheet.getRange(row, 2).setValue(0).setFontColor(C.VERDE);
  sheet.getRange(row, 3).setValue(0).setFontColor(C.VERDE).setFontWeight('bold');
  row++;

  sheet.getRange(row, 1).setValue('SALDO NETO').setFontWeight('bold');
  sheet.getRange(row, 2).setValue(0).setFontWeight('bold').setFontColor(C.ROJO);
  sheet.getRange(row, 3).setValue(0).setFontWeight('bold').setFontColor(C.ROJO);
  sheet.getRange(row, 1, 1, 3).setBackground(C.PURPURA_FONDO);

  // Indicador visual (derecha)
  sheet.getRange(filaBalanceCruzado + 1, 6, 4, 5).merge()
    .setValue('⚠️ NT SUBSIDIA A FAMILIA\n\nGs. 0\n\nEl salario de administrador no está cubriendo gastos familiares')
    .setBackground('#fef2f2').setFontColor(C.ROJO).setHorizontalAlignment('center').setVerticalAlignment('middle')
    .setWrap(true).setFontWeight('bold');

  // Formato números
  sheet.getRange('B:C').setNumberFormat('#,##0');
  sheet.getRange('I:K').setNumberFormat('#,##0');

  // Ajustar anchos
  sheet.setColumnWidth(1, 180);
  for (let i = 2; i <= 5; i++) sheet.setColumnWidth(i, 100);
  sheet.setColumnWidth(6, 20);
  sheet.setColumnWidth(7, 20);
  sheet.setColumnWidth(8, 180);
  for (let i = 9; i <= 12; i++) sheet.setColumnWidth(i, 100);

  sheet.setFrozenRows(3);

  return sheet;
}

// ==================== HOJA MOVIMIENTO (COMPLETA) ====================

function crearHojaMOVIMIENTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('MOVIMIENTO');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('MOVIMIENTO');

  const C = CONFIG.COLORES;

  // Header
  sheet.getRange('A1:H1').merge().setValue('📈 MOVIMIENTO - Real vs Presupuesto por Mes')
    .setFontSize(14).setFontWeight('bold').setBackground(C.TEXTO).setFontColor('white');

  sheet.getRange('A3').setValue('📅 Mes:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Enero');

  // Headers columnas
  const headers = ['CONCEPTO', 'FRECUENCIA', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', '🚦'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i+1).setValue(h).setFontWeight('bold').setBackground(C.GRIS).setHorizontalAlignment('center');
  });

  let row = 7;

  // ═══════════════════════════════════════════════════════════════
  // FAMILIA
  // ═══════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 8).merge().setValue('══════════  🟢 FAMILIA 🟢  ══════════')
    .setFontWeight('bold').setBackground(C.FAM_HEADER).setFontColor('white').setHorizontalAlignment('center');
  row += 2;

  // Ingresos Familia
  sheet.getRange(row, 1, 1, 8).merge().setValue('► INGRESOS FAMILIA')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.INGRESOS_FAMILIA.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });

  // Subtotal Ingresos
  sheet.getRange(row, 1).setValue('TOTAL INGRESOS').setFontWeight('bold');
  sheet.getRange(row, 1, 1, 8).setBackground(C.FAM_SUBTOTAL);
  row += 2;

  // Gastos Fijos
  sheet.getRange(row, 1, 1, 8).merge().setValue('► GASTOS FIJOS')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.GASTOS_FIJOS_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('Subtotal Gastos Fijos').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Cuotas
  sheet.getRange(row, 1, 1, 8).merge().setValue('► CUOTAS Y PRÉSTAMOS')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.CUOTAS_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('Subtotal Cuotas').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Obligaciones
  sheet.getRange(row, 1, 1, 8).merge().setValue('► OBLIGACIONES LEGALES')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.OBLIGACIONES_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('Subtotal Obligaciones').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Suscripciones
  sheet.getRange(row, 1, 1, 8).merge().setValue('► SUSCRIPCIONES')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.SUSCRIPCIONES_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('Subtotal Suscripciones').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Variables
  sheet.getRange(row, 1, 1, 8).merge().setValue('► VARIABLES')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.VARIABLES_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('Subtotal Variables').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Ahorro
  sheet.getRange(row, 1, 1, 8).merge().setValue('► AHORRO')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  row++;

  DATOS.AHORRO_FAM.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    row++;
  });
  row++;

  // BALANCE FAMILIA
  sheet.getRange(row, 1).setValue('💰 BALANCE FAMILIA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 1, 1, 8).setBackground(C.BALANCE);
  row += 3;

  // ═══════════════════════════════════════════════════════════════
  // NEUROTEA
  // ═══════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 8).merge().setValue('══════════  🔵 NEUROTEA 🔵  ══════════')
    .setFontWeight('bold').setBackground(C.NT_HEADER).setFontColor('white').setHorizontalAlignment('center');
  row += 2;

  // Ingresos NT
  sheet.getRange(row, 1, 1, 8).merge().setValue('► INGRESOS NEUROTEA')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.INGRESOS_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('TOTAL INGRESOS NT').setFontWeight('bold');
  sheet.getRange(row, 1, 1, 8).setBackground(C.NT_SUBTOTAL);
  row += 2;

  // Clínica
  sheet.getRange(row, 1, 1, 8).merge().setValue('► CLÍNICA')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.CLINICA_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  row++;

  // Sueldos
  sheet.getRange(row, 1, 1, 8).merge().setValue('► SUELDOS Y HONORARIOS')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.SUELDOS_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  row++;

  // Telefonía
  sheet.getRange(row, 1, 1, 8).merge().setValue('► TELEFONÍA E INTERNET')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.TELEFONIA_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  row++;

  // Obligaciones NT
  sheet.getRange(row, 1, 1, 8).merge().setValue('► OBLIGACIONES LEGALES')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.OBLIGACIONES_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  row++;

  // Eventos
  sheet.getRange(row, 1, 1, 8).merge().setValue('► EVENTOS (6 + 10 Reservas)')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.EVENTOS_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.mes || item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  sheet.getRange(row, 1).setValue('TOTAL EVENTOS').setFontWeight('bold').setFontStyle('italic');
  row += 2;

  // Variables NT
  sheet.getRange(row, 1, 1, 8).merge().setValue('► VARIABLES')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  row++;

  DATOS.VARIABLES_NT.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(item.frecuencia);
    sheet.getRange(row, 5).setFormula(`=D${row}-C${row}`);
    sheet.getRange(row, 6).setFormula(`=IF(C${row}=0,"-",D${row}/C${row})`);
    row++;
  });
  row++;

  // Ganancia
  sheet.getRange(row, 1, 1, 8).merge().setValue('► GANANCIA (7% META)')
    .setFontWeight('bold').setBackground('#fef3c7');
  row++;

  sheet.getRange(row, 1).setValue('Ganancia Calculada');
  sheet.getRange(row, 2).setValue('Calculado');
  row++;
  sheet.getRange(row, 1).setValue('% Ganancia');
  row++;
  sheet.getRange(row, 1).setValue('→ Utilidad Dueño (33.33%)');
  row++;
  sheet.getRange(row, 1).setValue('→ Fondo Emergencia (33.33%)');
  row++;
  sheet.getRange(row, 1).setValue('→ Fondo Inversión (33.33%)');
  row += 2;

  // BALANCE NT
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 1, 1, 8).setBackground(C.BALANCE);

  // Formato
  sheet.getRange('C:E').setNumberFormat('#,##0');
  sheet.getRange('F:F').setNumberFormat('0%');

  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidth(2, 120);
  for (let i = 3; i <= 5; i++) sheet.setColumnWidth(i, 110);
  sheet.setColumnWidth(6, 70);
  sheet.setColumnWidth(7, 90);
  sheet.setColumnWidth(8, 50);

  sheet.setFrozenRows(5);

  return sheet;
}

// ==================== OTRAS HOJAS (simplificadas) ====================

function crearHojaCONFIG() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CONFIG');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('CONFIG');

  sheet.getRange('A1:L1').merge().setValue('⚙️ CONFIGURACIÓN - LISTAS MAESTRAS')
    .setFontSize(14).setFontWeight('bold').setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  let col = 1;
  escribirLista(sheet, 3, col, 'MESES', CONFIG.MESES);
  col = 3;
  escribirLista(sheet, 3, col, 'TIPOS ING. FAM', CONFIG.TIPOS_INGRESO_FAM);
  col = 5;
  escribirLista(sheet, 3, col, 'CUENTAS FAM', CONFIG.CUENTAS_FAM);
  col = 7;
  escribirLista(sheet, 3, col, 'CATEGORÍAS FAM', CONFIG.CATEGORIAS_FAM);
  col = 9;
  escribirLista(sheet, 3, col, 'EVENTOS NT', CONFIG.EVENTOS_NT);
  col = 11;
  escribirLista(sheet, 3, col, 'ESTADOS', CONFIG.ESTADOS);

  return sheet;
}

function escribirLista(sheet, row, col, titulo, lista) {
  sheet.getRange(row, col).setValue(titulo).setFontWeight('bold').setBackground(CONFIG.COLORES.GRIS);
  lista.forEach((item, i) => sheet.getRange(row + 1 + i, col).setValue(item));
}

function crearHojaPRESUPUESTO() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('PRESUPUESTO');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('PRESUPUESTO');

  sheet.getRange('A1:P1').merge().setValue('📊 PRESUPUESTO ANUAL 2026')
    .setFontSize(16).setFontWeight('bold').setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  const headers = ['CONCEPTO','TIPO','FREC','ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC','TOTAL'];
  headers.forEach((h,i) => sheet.getRange(3, i+1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.GRIS));

  sheet.setColumnWidth(1, 250);
  sheet.setFrozenRows(3);

  return sheet;
}

function crearHojaGASTOS_FIJOS() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('GASTOS_FIJOS');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('GASTOS_FIJOS');

  sheet.getRange('A1:R1').merge().setValue('📋 GASTOS FIJOS - LISTA MAESTRA')
    .setFontSize(14).setFontWeight('bold').setBackground(CONFIG.COLORES.TEXTO).setFontColor('white');

  const headers = ['CONCEPTO','ENTIDAD','CATEGORÍA','FREC','DÍA','BASE','ENE','FEB','MAR','ABR','MAY','JUN','JUL','AGO','SEP','OCT','NOV','DIC'];
  headers.forEach((h,i) => sheet.getRange(3, i+1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.GRIS));

  sheet.setColumnWidth(1, 250);
  sheet.setFrozenRows(3);

  return sheet;
}

function crearHojaCARGA_FAMILIA() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_FAMILIA');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('CARGA_FAMILIA');

  sheet.getRange('A1:I1').merge().setValue('👨‍👩‍👧‍👦 CARGA FAMILIA - Variables Puros')
    .setFontSize(14).setFontWeight('bold').setBackground(CONFIG.COLORES.FAM_HEADER).setFontColor('white');

  const headers = ['FECHA','TIPO','CATEGORÍA','SUBCATEGORÍA','DESCRIPCIÓN','MONTO','CUENTA','ESTADO','NOTAS'];
  headers.forEach((h,i) => sheet.getRange(3, i+1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.FAM_FONDO));

  aplicarValidacionesCargaFamilia(sheet);
  return sheet;
}

function crearHojaCARGA_NT() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName('CARGA_NT');
  if (sheet) ss.deleteSheet(sheet);
  sheet = ss.insertSheet('CARGA_NT');

  sheet.getRange('A1:I1').merge().setValue('🏥 CARGA NEUROTEA - Variables + Eventos')
    .setFontSize(14).setFontWeight('bold').setBackground(CONFIG.COLORES.NT_HEADER).setFontColor('white');

  const headers = ['FECHA','TIPO','CATEGORÍA','SUBCAT/EVENTO','DESCRIPCIÓN','MONTO','CUENTA','ESTADO','NOTAS'];
  headers.forEach((h,i) => sheet.getRange(3, i+1).setValue(h).setFontWeight('bold').setBackground(CONFIG.COLORES.NT_FONDO));

  aplicarValidacionesCargaNT(sheet);
  return sheet;
}

// ==================== VALIDACIONES ====================

function aplicarValidacionesCargaFamilia(sheet) {
  const tipos = [...CONFIG.TIPOS_INGRESO_FAM, 'Egreso Familiar'];
  sheet.getRange('B4:B500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(tipos, true).build());
  sheet.getRange('C4:C500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['-',...CONFIG.CATEGORIAS_FAM], true).build());
  sheet.getRange('D4:D500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['-',...CONFIG.SUBCAT_VAR_FAM], true).build());
  sheet.getRange('G4:G500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.CUENTAS_FAM, true).build());
  sheet.getRange('H4:H500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.ESTADOS, true).build());
}

function aplicarValidacionesCargaNT(sheet) {
  const tipos = [...CONFIG.TIPOS_INGRESO_NT, 'Egreso NT'];
  sheet.getRange('B4:B500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(tipos, true).build());
  sheet.getRange('C4:C500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['-',...CONFIG.CATEGORIAS_NT], true).build());
  sheet.getRange('D4:D500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(['-',...CONFIG.SUBCAT_VAR_NT,...CONFIG.EVENTOS_NT], true).build());
  sheet.getRange('G4:G500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.CUENTAS_NT, true).build());
  sheet.getRange('H4:H500').setDataValidation(SpreadsheetApp.newDataValidation().requireValueInList(CONFIG.ESTADOS, true).build());
}

function actualizarValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sf = ss.getSheetByName('CARGA_FAMILIA');
  const sn = ss.getSheetByName('CARGA_NT');
  if (sf) aplicarValidacionesCargaFamilia(sf);
  if (sn) aplicarValidacionesCargaNT(sn);
  SpreadsheetApp.getUi().alert('✅ Validaciones actualizadas');
}

function recalcularTablero() {
  SpreadsheetApp.flush();
  SpreadsheetApp.getUi().alert('✅ Tablero recalculado');
}

// ==================== WEB APP ====================

function abrirWebApp() {
  const html = HtmlService.createHtmlOutput(getWebAppHtml()).setWidth(1400).setHeight(900);
  SpreadsheetApp.getUi().showModalDialog(html, '📊 Dashboard Control Financiero 2026');
}

function doGet() {
  return HtmlService.createHtmlOutput(getWebAppHtml())
    .setTitle('Control Financiero 2026')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function mostrarInstruccionesWebApp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('🌐 Desplegar Web App',
    'Para publicar el Dashboard como página web:\n\n' +
    '1. Ir a: Extensiones → Apps Script\n' +
    '2. Click en "Implementar" → "Nueva implementación"\n' +
    '3. Tipo: "Aplicación web"\n' +
    '4. Ejecutar como: "Yo"\n' +
    '5. Acceso: "Cualquier usuario"\n' +
    '6. Click "Implementar"\n' +
    '7. Copiar la URL generada\n\n' +
    '¡Listo! Podrás acceder al Dashboard desde cualquier navegador.',
    ui.ButtonSet.OK);
}

function getWebAppHtml() {
  return `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Control Financiero 2026</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; font-family: 'Segoe UI', sans-serif; }
    body { background: #f3f4f6; }

    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 100%);
      color: white; padding: 15px 30px;
      display: flex; justify-content: space-between; align-items: center;
    }
    .header h1 { font-size: 1.5em; }
    .header select { padding: 8px 15px; border-radius: 5px; font-weight: bold; }

    .main { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; padding: 20px; }

    .column { display: flex; flex-direction: column; gap: 15px; }

    .column-header {
      text-align: center; padding: 12px; border-radius: 8px 8px 0 0;
      font-weight: bold; font-size: 1.2em; color: white;
    }
    .familia .column-header { background: #059669; }
    .neurotea .column-header { background: #1d4ed8; }

    .card {
      background: white; border-radius: 8px; padding: 15px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }
    .card-title {
      font-weight: bold; border-bottom: 2px solid #e5e7eb;
      padding-bottom: 8px; margin-bottom: 12px;
    }
    .familia .card-title { color: #059669; }
    .neurotea .card-title { color: #1d4ed8; }

    table { width: 100%; border-collapse: collapse; font-size: 0.85em; }
    th { background: #f3f4f6; padding: 8px; text-align: left; }
    td { padding: 8px; border-bottom: 1px solid #e5e7eb; }

    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: bold; }

    .text-green { color: #059669; }
    .text-red { color: #dc2626; }
    .text-yellow { color: #d97706; }

    .bg-green { background: #dcfce7; }
    .bg-red { background: #fef2f2; }
    .bg-yellow { background: #fef3c7; }
    .bg-blue { background: #dbeafe; }

    .badge {
      display: inline-block; padding: 3px 10px; border-radius: 12px;
      font-size: 0.75em; font-weight: bold;
    }
    .badge-green { background: #059669; color: white; }
    .badge-red { background: #dc2626; color: white; }
    .badge-yellow { background: #f59e0b; color: white; }

    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
    .kpi-box { padding: 12px; border-radius: 8px; }
    .kpi-label { font-size: 0.75em; color: #6b7280; }
    .kpi-value { font-size: 1.3em; font-weight: bold; }

    .progress-bar {
      height: 20px; background: #e5e7eb; border-radius: 10px;
      overflow: hidden; margin: 10px 0;
    }
    .progress-fill { height: 100%; background: #22c55e; }

    .balance-section {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 100%);
      color: white; padding: 20px; border-radius: 8px;
      grid-column: 1 / -1; margin-top: 10px;
    }
    .balance-section h3 { text-align: center; margin-bottom: 15px; }

    .balance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 30px; }

    .alert-box {
      background: rgba(255,255,255,0.1); border: 2px solid rgba(255,255,255,0.3);
      border-radius: 10px; padding: 20px; text-align: center;
    }
    .alert-icon { font-size: 3em; }
    .alert-title { font-size: 1.2em; margin: 10px 0; }
    .alert-value { font-size: 2em; font-weight: bold; }

    .footer { text-align: center; padding: 20px; color: #6b7280; font-size: 0.8em; }
  </style>
</head>
<body>
  <div class="header">
    <h1>📊 TABLERO DE CONTROL FINANCIERO</h1>
    <div>
      <span>Mes:</span>
      <select id="mes">
        <option>Enero 2026</option>
        <option>Febrero 2026</option>
        <option>Marzo 2026</option>
      </select>
      <span style="margin-left:20px">Hoy: <strong>30/12/2025</strong></span>
    </div>
  </div>

  <div class="main">
    <!-- ═══════════════ FAMILIA ═══════════════ -->
    <div class="column familia">
      <div class="column-header">🏠 FAMILIA</div>

      <!-- Saldos en Cuentas -->
      <div class="card">
        <div class="card-title">💰 SALDOS EN CUENTAS</div>
        <table>
          <thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Real ✏️</th><th class="text-right">Diferencia</th></tr></thead>
          <tbody>
            <tr><td>ITAU Marco</td><td class="text-right">2.500.000</td><td class="text-right text-blue font-bold">2.350.000</td><td class="text-right text-red">-150.000</td></tr>
            <tr><td>Coop. Univ. Marco</td><td class="text-right">1.200.000</td><td class="text-right text-blue font-bold">1.200.000</td><td class="text-right">-</td></tr>
            <tr><td>ITAU Clara</td><td class="text-right">800.000</td><td class="text-right text-blue font-bold">650.000</td><td class="text-right text-red">-150.000</td></tr>
            <tr><td>UENO Clara</td><td class="text-right">500.000</td><td class="text-right text-blue font-bold">520.000</td><td class="text-right text-green">+20.000</td></tr>
            <tr><td>Tarjeta Solar Clara</td><td class="text-right">-1.500.000</td><td class="text-right text-red font-bold">-1.800.000</td><td class="text-right text-red">-300.000</td></tr>
            <tr><td>Tarjeta ITAU Clara</td><td class="text-right">-800.000</td><td class="text-right text-red font-bold">-950.000</td><td class="text-right text-red">-150.000</td></tr>
            <tr><td>Tarjeta ITAU Marco</td><td class="text-right">0</td><td class="text-right text-blue font-bold">0</td><td class="text-right">-</td></tr>
            <tr><td>Tarjeta Comecipar</td><td class="text-right">0</td><td class="text-right text-blue font-bold">0</td><td class="text-right">-</td></tr>
            <tr><td>Gourmed</td><td class="text-right">350.000</td><td class="text-right text-blue font-bold">280.000</td><td class="text-right text-red">-70.000</td></tr>
            <tr><td>Efectivo</td><td class="text-right">0</td><td class="text-right text-blue font-bold">0</td><td class="text-right">-</td></tr>
          </tbody>
        </table>
        <small style="color:#6b7280">✏️ = Ingreso manual</small>
      </div>

      <!-- Presupuesto vs Real -->
      <div class="card">
        <div class="card-title">📋 PRESUPUESTO vs REAL</div>
        <table>
          <thead><tr><th>Categoría</th><th class="text-right">Presupuesto</th><th class="text-right">Real</th><th class="text-center">Estado</th></tr></thead>
          <tbody>
            <tr><td class="font-bold">► INGRESOS FAMILIA</td><td class="text-right">15.200.000</td><td class="text-right">14.500.000</td><td class="text-center"><span class="badge badge-yellow">95%</span></td></tr>
            <tr><td class="font-bold">► GASTOS FIJOS</td><td class="text-right">7.250.000</td><td class="text-right">7.100.000</td><td class="text-center"><span class="badge badge-green">98%</span></td></tr>
            <tr><td class="font-bold">► CUOTAS Y PRÉSTAMOS</td><td class="text-right">5.541.000</td><td class="text-right">5.541.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► OBLIGACIONES LEGALES</td><td class="text-right">450.000</td><td class="text-right">380.000</td><td class="text-center"><span class="badge badge-green">84%</span></td></tr>
            <tr><td class="font-bold">► SUSCRIPCIONES</td><td class="text-right">520.000</td><td class="text-right">520.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► VARIABLES</td><td class="text-right">900.000</td><td class="text-right">1.250.000</td><td class="text-center"><span class="badge badge-red">139%</span></td></tr>
            <tr><td class="font-bold">► AHORRO</td><td class="text-right">500.000</td><td class="text-right">-</td><td class="text-center"><span class="badge badge-red">0%</span></td></tr>
          </tbody>
          <tfoot>
            <tr class="bg-green"><td class="font-bold">BALANCE FAMILIA</td><td class="text-right font-bold">39.000</td><td class="text-right font-bold text-red">-291.000</td><td class="text-center"><span class="badge badge-red">DÉFICIT</span></td></tr>
          </tfoot>
        </table>
      </div>

      <!-- Flujo del Mes -->
      <div class="card">
        <div class="card-title">💵 FLUJO DEL MES</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="bg-green" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Ingresos</span><span class="font-bold text-green">+ 14.500.000</span>
          </div>
          <div class="bg-red" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Egresos Pagados</span><span class="font-bold text-red">- 12.450.000</span>
          </div>
          <div class="bg-yellow" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Egresos Pendientes</span><span class="font-bold text-yellow">- 2.341.000</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:12px;border-radius:5px;background:#059669;color:white">
            <span class="font-bold">BALANCE</span><span class="font-bold">2.050.000</span>
          </div>
        </div>
      </div>

      <!-- Liquidez -->
      <div class="card">
        <div class="card-title">📅 LIQUIDEZ - PRÓXIMOS PAGOS</div>
        <table>
          <thead><tr><th>Concepto</th><th class="text-center">Cuotas</th><th class="text-right">Monto</th><th class="text-right">Saldo</th><th class="text-center">Estado</th></tr></thead>
          <tbody>
            <tr class="bg-green"><td class="font-bold">Caja disponible</td><td class="text-center">-</td><td class="text-right">-</td><td class="text-right font-bold">2.350.000</td><td class="text-center">-</td></tr>
            <tr class="bg-red"><td class="text-red">⚠️ Atrasados</td><td class="text-center font-bold text-red">2</td><td class="text-right text-red">-850.000</td><td class="text-right font-bold">1.500.000</td><td class="text-center"><span class="badge badge-red">PAGAR</span></td></tr>
            <tr><td>Esta semana</td><td class="text-center font-bold">4</td><td class="text-right">-2.100.000</td><td class="text-right font-bold text-red">-600.000</td><td class="text-center"><span class="badge badge-red">FALTA</span></td></tr>
            <tr><td>Próxima semana</td><td class="text-center font-bold">3</td><td class="text-right">-1.800.000</td><td class="text-right font-bold text-red">-2.400.000</td><td class="text-center"><span class="badge badge-red">FALTA</span></td></tr>
            <tr><td>3ra semana</td><td class="text-center font-bold">2</td><td class="text-right">-1.200.000</td><td class="text-right font-bold text-red">-3.600.000</td><td class="text-center"><span class="badge badge-red">FALTA</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background:#e5e7eb"><td class="font-bold">SALDO FINAL</td><td class="text-center font-bold">11</td><td class="text-right font-bold">-5.950.000</td><td class="text-right font-bold text-red">-3.600.000</td><td class="text-center"><span class="badge badge-red">DÉFICIT</span></td></tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- ═══════════════ NEUROTEA ═══════════════ -->
    <div class="column neurotea">
      <div class="column-header">🏥 NEUROTEA</div>

      <!-- Indicadores de Metas -->
      <div class="card">
        <div class="card-title">🎯 INDICADORES DE METAS</div>
        <div class="kpi-grid">
          <div class="kpi-box bg-blue"><div class="kpi-label">INGRESOS DEL MES</div><div class="kpi-value" style="color:#1d4ed8">30.000.000</div></div>
          <div class="kpi-box" style="background:#f3f4f6"><div class="kpi-label">GASTOS DEL MES</div><div class="kpi-value">27.300.000</div></div>
          <div class="kpi-box bg-green"><div class="kpi-label">GANANCIA REAL</div><div class="kpi-value text-green">2.700.000</div></div>
          <div class="kpi-box bg-yellow"><div class="kpi-label">META 7%</div><div class="kpi-value">2.100.000</div></div>
        </div>
        <div style="margin-top:15px">
          <div style="display:flex;justify-content:space-between;font-size:0.85em;margin-bottom:5px">
            <span>% Gastos sobre Ingresos</span><span class="font-bold">91% / 93% máx</span>
          </div>
          <div class="progress-bar"><div class="progress-fill" style="width:91%"></div></div>
          <div class="text-center" style="margin-top:10px">
            <span class="badge badge-green" style="padding:8px 20px;font-size:0.9em">✅ META CUMPLIDA - Superávit: 600.000</span>
          </div>
        </div>
        <div style="margin-top:15px;padding-top:15px;border-top:1px solid #e5e7eb">
          <div class="font-bold" style="margin-bottom:10px">Distribución de Ganancia (7% = 2.100.000)</div>
          <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px;font-size:0.85em">
            <div style="background:#f3e8ff;padding:10px;border-radius:5px;text-align:center">
              <div style="color:#7c3aed;font-size:0.75em">Utilidad Dueño</div>
              <div class="font-bold">700.000</div>
              <div style="color:#059669;font-size:0.75em">✓ 580.000</div>
            </div>
            <div style="background:#ffedd5;padding:10px;border-radius:5px;text-align:center">
              <div style="color:#ea580c;font-size:0.75em">Fondo Emerg.</div>
              <div class="font-bold">700.000</div>
              <div style="color:#059669;font-size:0.75em">✓ 700.000</div>
            </div>
            <div style="background:#cffafe;padding:10px;border-radius:5px;text-align:center">
              <div style="color:#0891b2;font-size:0.75em">Fondo Inversión</div>
              <div class="font-bold">700.000</div>
              <div style="color:#d97706;font-size:0.75em">⚠ 420.000</div>
            </div>
          </div>
        </div>
      </div>

      <!-- Presupuesto vs Real NT -->
      <div class="card">
        <div class="card-title">📋 PRESUPUESTO vs REAL</div>
        <table>
          <thead><tr><th>Categoría</th><th class="text-right">Presupuesto</th><th class="text-right">Real</th><th class="text-center">Estado</th></tr></thead>
          <tbody>
            <tr><td class="font-bold">► INGRESOS NT</td><td class="text-right">30.000.000</td><td class="text-right">30.000.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► CLÍNICA</td><td class="text-right">17.630.000</td><td class="text-right">17.630.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► SUELDOS Y HONORARIOS</td><td class="text-right">9.600.000</td><td class="text-right">9.300.000</td><td class="text-center"><span class="badge badge-green">97%</span></td></tr>
            <tr><td class="font-bold">► TELEFONÍA E INTERNET</td><td class="text-right">550.000</td><td class="text-right">550.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► OBLIGACIONES LEGALES</td><td class="text-right">2.300.000</td><td class="text-right">1.850.000</td><td class="text-center"><span class="badge badge-green">80%</span></td></tr>
            <tr><td class="font-bold">► EVENTOS</td><td class="text-right">-</td><td class="text-right">-</td><td class="text-center">-%</td></tr>
            <tr><td class="font-bold">► VARIABLES</td><td class="text-right">450.000</td><td class="text-right">670.000</td><td class="text-center"><span class="badge badge-red">149%</span></td></tr>
            <tr><td class="font-bold">► GANANCIA (7%)</td><td class="text-right">2.100.000</td><td class="text-right">2.700.000</td><td class="text-center"><span class="badge badge-green">129%</span></td></tr>
          </tbody>
          <tfoot>
            <tr class="bg-blue"><td class="font-bold">BALANCE NEUROTEA</td><td class="text-right font-bold">-530.000</td><td class="text-right font-bold text-green">2.700.000</td><td class="text-center"><span class="badge badge-green">SUPERÁVIT</span></td></tr>
          </tfoot>
        </table>
      </div>

      <!-- Flujo del Mes NT -->
      <div class="card">
        <div class="card-title">💵 FLUJO DEL MES</div>
        <div style="display:flex;flex-direction:column;gap:8px">
          <div class="bg-green" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Ingresos</span><span class="font-bold text-green">+ 30.000.000</span>
          </div>
          <div class="bg-red" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Egresos Pagados</span><span class="font-bold text-red">- 24.500.000</span>
          </div>
          <div class="bg-yellow" style="display:flex;justify-content:space-between;padding:10px;border-radius:5px">
            <span>Egresos Pendientes</span><span class="font-bold text-yellow">- 2.800.000</span>
          </div>
          <div style="display:flex;justify-content:space-between;padding:12px;border-radius:5px;background:#1d4ed8;color:white">
            <span class="font-bold">BALANCE</span><span class="font-bold">5.500.000</span>
          </div>
        </div>
      </div>

      <!-- Liquidez NT -->
      <div class="card">
        <div class="card-title">📅 LIQUIDEZ - PRÓXIMOS PAGOS</div>
        <table>
          <thead><tr><th>Concepto</th><th class="text-center">Cuotas</th><th class="text-right">Monto</th><th class="text-right">Saldo</th><th class="text-center">Estado</th></tr></thead>
          <tbody>
            <tr class="bg-blue"><td class="font-bold">Caja disponible</td><td class="text-center">-</td><td class="text-right">-</td><td class="text-right font-bold">8.500.000</td><td class="text-center">-</td></tr>
            <tr class="bg-green"><td class="text-green">✅ Atrasados</td><td class="text-center font-bold text-green">0</td><td class="text-right">-</td><td class="text-right font-bold">8.500.000</td><td class="text-center"><span class="badge badge-green">OK</span></td></tr>
            <tr><td>Esta semana</td><td class="text-center font-bold">2</td><td class="text-right">-4.130.000</td><td class="text-right font-bold text-green">4.370.000</td><td class="text-center"><span class="badge badge-green">ALCANZA</span></td></tr>
            <tr><td>Próxima semana</td><td class="text-center font-bold">3</td><td class="text-right">-2.300.000</td><td class="text-right font-bold text-green">2.070.000</td><td class="text-center"><span class="badge badge-green">ALCANZA</span></td></tr>
            <tr><td>3ra semana</td><td class="text-center font-bold">1</td><td class="text-right">-500.000</td><td class="text-right font-bold text-green">1.570.000</td><td class="text-center"><span class="badge badge-green">ALCANZA</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background:#e5e7eb"><td class="font-bold">SALDO FINAL</td><td class="text-center font-bold">6</td><td class="text-right font-bold">-6.930.000</td><td class="text-right font-bold text-green">1.570.000</td><td class="text-center"><span class="badge badge-green">OK</span></td></tr>
          </tfoot>
        </table>
      </div>
    </div>

    <!-- ═══════════════ BALANCE CRUZADO ═══════════════ -->
    <div class="balance-section">
      <h3>🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA</h3>
      <div class="balance-grid">
        <table style="background:rgba(255,255,255,0.1);border-radius:8px">
          <thead><tr><th style="color:white;background:rgba(0,0,0,0.2)">Concepto</th><th style="color:white;background:rgba(0,0,0,0.2)" class="text-right">Este Mes</th><th style="color:white;background:rgba(0,0,0,0.2)" class="text-right">Acumulado Año</th></tr></thead>
          <tbody>
            <tr><td>Préstamo NT → Familia</td><td class="text-right" style="color:#fca5a5">3.000.000</td><td class="text-right font-bold" style="color:#fca5a5">8.500.000</td></tr>
            <tr><td>Devolución Familia → NT</td><td class="text-right" style="color:#86efac">-</td><td class="text-right font-bold" style="color:#86efac">2.000.000</td></tr>
          </tbody>
          <tfoot>
            <tr style="background:rgba(0,0,0,0.2)"><td class="font-bold">SALDO NETO</td><td class="text-right font-bold" style="color:#fca5a5">3.000.000</td><td class="text-right font-bold" style="color:#fca5a5">6.500.000</td></tr>
          </tfoot>
        </table>
        <div class="alert-box">
          <div class="alert-icon">⚠️</div>
          <div class="alert-title">NT SUBSIDIA A FAMILIA</div>
          <div class="alert-value">Gs. 6.500.000</div>
          <div style="font-size:0.85em;margin-top:10px;opacity:0.9">
            El salario de administrador (Gs. 5.000.000) no está cubriendo los gastos familiares.<br>
            Déficit mensual promedio: Gs. 2.166.667
          </div>
        </div>
      </div>
    </div>
  </div>

  <div class="footer">
    Control Financiero 2026 - NeuroTEA & Familia | v3.0 | ✏️ = Campo manual | 🔗 = Calculado automáticamente
  </div>
</body>
</html>`;
}

// ==================== TRIGGER onEdit ====================

function onEdit(e) {
  if (!e) return;
  const sheet = e.source.getActiveSheet();
  const name = sheet.getName();
  if (name !== 'CARGA_FAMILIA' && name !== 'CARGA_NT') return;
  const row = e.range.getRow();
  const col = e.range.getColumn();
  if (row < 4 || col !== 2) return;

  const tipo = e.value;
  const esIngreso = CONFIG.TIPOS_INGRESO_FAM.includes(tipo) || CONFIG.TIPOS_INGRESO_NT.includes(tipo);
  if (esIngreso) {
    sheet.getRange(row, 3).setValue('-');
    sheet.getRange(row, 4).setValue('-');
  }
}
