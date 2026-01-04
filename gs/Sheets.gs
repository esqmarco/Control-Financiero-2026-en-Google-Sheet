/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SHEETS.GS - CREACIÓN DE LAS 8 HOJAS PRINCIPALES
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 5.0 - EST.PAGO como Gatillo, LIQUIDEZ automática, SALDO_INICIAL
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDAD: Crear o Limpiar Hoja
// ═══════════════════════════════════════════════════════════════════════════════

function crearOLimpiarHoja(nombre) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  let sheet = ss.getSheetByName(nombre);
  if (sheet) {
    ss.deleteSheet(sheet);
  }
  sheet = ss.insertSheet(nombre);
  return sheet;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 1. HOJA CONFIG - Listas Maestras y Configuración
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaCONFIG() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.CONFIG);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:N1').merge()
    .setValue('⚙️ CONFIGURACIÓN - LISTAS MAESTRAS')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:N2').merge()
    .setValue('Estas listas alimentan los desplegables del sistema. Modificar con cuidado.')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  let col = 1;

  // ─── MESES ───
  escribirListaConfig(sheet, 4, col, 'MESES', MESES, C.FAM_HEADER);
  col += 2;

  // ─── ENTIDADES ───
  escribirListaConfig(sheet, 4, col, 'ENTIDADES', ENTIDADES, C.NT_HEADER);
  col += 2;

  // ─── TIPOS INGRESO FAMILIA ───
  escribirListaConfig(sheet, 4, col, 'TIPOS INGRESO FAMILIA', TIPOS_INGRESO_FAMILIA, C.FAM_HEADER);
  col += 2;

  // ─── TIPOS INGRESO NT ───
  escribirListaConfig(sheet, 4, col, 'TIPOS INGRESO NT', TIPOS_INGRESO_NT, C.NT_HEADER);
  col += 2;

  // ─── CUENTAS FAMILIA ───
  escribirListaConfig(sheet, 4, col, 'CUENTAS FAMILIA', CUENTAS_FAMILIA, C.FAM_HEADER);
  col += 2;

  // ─── CUENTAS NT ───
  escribirListaConfig(sheet, 4, col, 'CUENTAS NT', CUENTAS_NT, C.NT_HEADER);
  col += 2;

  // ─── CATEGORÍAS EGRESO FAMILIA ───
  escribirListaConfig(sheet, 4, col, 'CATEG. EGRESO FAM', CATEGORIAS_EGRESO_FAMILIA, C.FAM_HEADER);

  // Segunda fila de listas
  col = 1;
  const fila2 = 20;

  // ─── CATEGORÍAS EGRESO NT ───
  escribirListaConfig(sheet, fila2, col, 'CATEG. EGRESO NT', CATEGORIAS_EGRESO_NT, C.NT_HEADER);
  col += 2;

  // ─── VARIABLES FAMILIA ───
  escribirListaConfig(sheet, fila2, col, 'VARIABLES FAMILIA', VARIABLES_FAMILIA, C.FAM_HEADER);
  col += 2;

  // ─── VARIABLES NT ───
  escribirListaConfig(sheet, fila2, col, 'VARIABLES NT', VARIABLES_NT, C.NT_HEADER);
  col += 2;

  // ─── EVENTOS NT ───
  escribirListaConfig(sheet, fila2, col, 'EVENTOS NT', EVENTOS_NT.map(e => e.nombre), C.BALANCE_HEADER);
  col += 2;

  // ─── FRECUENCIAS ───
  escribirListaConfig(sheet, fila2, col, 'FRECUENCIAS', FRECUENCIAS, C.TEXTO);
  col += 2;

  // ─── ESTADOS ───
  escribirListaConfig(sheet, fila2, col, 'ESTADOS', ESTADOS, C.TEXTO);

  // ─── METAS NEUROTEA ───
  const filaMetas = 38;
  sheet.getRange(filaMetas, 1, 1, 4).merge()
    .setValue('🎯 METAS NEUROTEA')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO);

  const metas = [
    ['Parámetro', 'Valor', 'Descripción'],
    ['Meta Ganancia Mínima', METAS_NT.GANANCIA_MINIMA_PCT + '%', '% mínimo de ganancia sobre ingresos'],
    ['Meta Máximo Gastos', METAS_NT.MAXIMO_GASTOS_PCT + '%', '% máximo de gastos sobre ingresos'],
    ['Distribución Utilidad Dueño', METAS_NT.DIST_UTILIDAD_DUEÑO + '%', 'Tercio de la ganancia para Marco'],
    ['Distribución Fondo Emergencia', METAS_NT.DIST_FONDO_EMERGENCIA + '%', 'Tercio para contingencias'],
    ['Distribución Fondo Inversión', METAS_NT.DIST_FONDO_INVERSION + '%', 'Tercio para crecimiento']
  ];

  sheet.getRange(filaMetas + 1, 1, metas.length, 3).setValues(metas);
  sheet.getRange(filaMetas + 1, 1, 1, 3).setFontWeight('bold').setBackground(C.GRIS_FONDO);

  // Formato general
  sheet.setColumnWidths(1, 14, 160);
  sheet.setFrozenRows(3);

  return sheet;
}

function escribirListaConfig(sheet, row, col, titulo, lista, colorHeader) {
  // Título
  sheet.getRange(row, col)
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorHeader)
    .setFontColor(COLORES.BLANCO)
    .setHorizontalAlignment('center');

  // Items
  lista.forEach((item, i) => {
    sheet.getRange(row + 1 + i, col).setValue(item);
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// 2. HOJA PRESUPUESTO - Plan Anual ENE-DIC
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaPRESUPUESTO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.PRESUPUESTO);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:Q1').merge()
    .setValue('📊 PRESUPUESTO ANUAL ' + AÑO)
    .setFontSize(18).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:Q2').merge()
    .setValue('Plan de ingresos y egresos para FAMILIA y NEUROTEA • Moneda: Guaraníes (Gs.)')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO);

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['CONCEPTO', 'TIPO', 'FREC.', ...MESES_CORTOS, 'TOTAL AÑO'];
  headers.forEach((h, i) => {
    sheet.getRange(4, i + 1).setValue(h).setFontWeight('bold')
      .setBackground(C.GRIS_FONDO).setHorizontalAlignment('center');
  });

  let row = 6;

  // ═══════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('═══════════════  🏠 FAMILIA  ═══════════════')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // ─── INGRESOS FAMILIA ───
  row = escribirSeccionPresupuesto(sheet, row, '▶ INGRESOS FAMILIA', INGRESOS_FAMILIA, 'Ingreso', C.FAM_FONDO, C.FAM_SUBTOTAL);
  row++;

  // ─── EGRESOS FAMILIA ───
  row = escribirSeccionPresupuesto(sheet, row, '▶ GASTOS FIJOS', GASTOS_FIJOS_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ CUOTAS Y PRÉSTAMOS', CUOTAS_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ SUSCRIPCIONES', SUSCRIPCIONES_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ VARIABLES', VARIABLES_PRESUP_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ AHORRO', AHORRO_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);

  // BALANCE FAMILIA
  sheet.getRange(row, 1).setValue('💰 BALANCE FAMILIA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 1, 1, 16).setBackground(C.GANANCIA_FONDO);
  row += 3;

  // ═══════════════════════════════════════════════════════════════════
  // SECCIÓN NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('═══════════════  🏥 NEUROTEA  ═══════════════')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // ─── INGRESOS NT ───
  row = escribirSeccionPresupuesto(sheet, row, '▶ INGRESOS NEUROTEA', INGRESOS_NT, 'Ingreso', C.NT_FONDO, C.NT_SUBTOTAL);
  row++;

  // ─── EGRESOS NT ───
  row = escribirSeccionPresupuesto(sheet, row, '▶ CLÍNICA', CLINICA_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ SUELDOS Y HONORARIOS', SUELDOS_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ TELEFONÍA E INTERNET', TELEFONIA_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionPresupuesto(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  // EVENTOS NT (especial)
  row = escribirSeccionEventos(sheet, row, C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  row = escribirSeccionPresupuesto(sheet, row, '▶ VARIABLES', VARIABLES_PRESUP_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  // GANANCIA NT (calculada)
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('▶ GANANCIA (7% META)')
    .setFontWeight('bold').setBackground(C.GANANCIA_FONDO);
  row++;

  const gananciaItems = [
    ['Ganancia Calculada', 'Calculado', '-'],
    ['→ Utilidad al propietario (33.33%)', 'Calculado', '-'],
    ['→ Fondo de emergencia (33.33%)', 'Calculado', '-'],
    ['→ Fondo de Inversión (33.33%)', 'Calculado', '-']
  ];
  gananciaItems.forEach(item => {
    sheet.getRange(row, 1).setValue(item[0]).setFontStyle('italic');
    sheet.getRange(row, 2).setValue(item[1]);
    sheet.getRange(row, 3).setValue(item[2]);
    row++;
  });
  row++;

  // BALANCE NT
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 1, 1, 16).setBackground(C.GANANCIA_FONDO);
  row += 2;

  // BALANCE CONSOLIDADO
  sheet.getRange(row, 1).setValue('🔄 BALANCE TOTAL CONSOLIDADO FAM/NT').setFontWeight('bold').setFontSize(12);
  sheet.getRange(row, 1, 1, 16).setBackground(C.BALANCE_FONDO);

  // Formato de números
  sheet.getRange('D:P').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 80);
  for (let i = 4; i <= 15; i++) sheet.setColumnWidth(i, 85);
  sheet.setColumnWidth(16, 100);

  sheet.setFrozenRows(4);

  return sheet;
}

function escribirSeccionPresupuesto(sheet, row, titulo, items, tipo, colorFondo, colorSubtotal) {
  // Título de sección
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  // Items
  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue(tipo);
    sheet.getRange(row, 3).setValue(item.frecuencia);

    // Valores mensuales
    const monto = item.monto || 0;
    const esMensual = item.frecuencia && item.frecuencia.includes('Mensual');
    const esReserva = item.concepto.includes('Reserva');

    if (!esReserva && monto > 0) {
      for (let m = 4; m <= 15; m++) {
        if (esMensual) {
          sheet.getRange(row, m).setValue(monto);
        }
      }
      // Total año
      const formula = `=SUM(D${row}:O${row})`;
      sheet.getRange(row, 16).setFormula(formula);
    }
    row++;
  });

  // Subtotal
  sheet.getRange(row, 1).setValue('Subtotal ' + titulo.replace('▶ ', '')).setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  row++;

  return row;
}

function escribirSeccionEventos(sheet, row, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('▶ EVENTOS (6 definidos + 10 reservas)')
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  EVENTOS_NT.forEach(evento => {
    sheet.getRange(row, 1).setValue(evento.nombre);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue(evento.mes);
    sheet.getRange(row, 16).setFormula(`=SUM(D${row}:O${row})`);
    row++;
  });

  sheet.getRange(row, 1).setValue('Subtotal EVENTOS').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  row++;

  return row;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. HOJA GASTOS_FIJOS - Lista Maestra con Arrastre BASE
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaGASTOS_FIJOS() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.GASTOS_FIJOS);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  // Nueva estructura: 19 columnas (A-S) + CUENTA = 20 columnas (A-T)
  sheet.getRange('A1:T1').merge()
    .setValue('📋 GASTOS FIJOS - LISTA MAESTRA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:T2').merge()
    .setValue('DÍA = día del mes que vence | CUENTA = cuenta desde donde se paga | Si un mes está vacío, usa el MONTO BASE | Poner 0 para cancelar un gasto')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  // Nueva estructura: CONCEPTO, ENTIDAD, CATEGORÍA, FRECUENCIA, DÍA, CUENTA, BASE, ENE-DIC
  const headers = ['CONCEPTO', 'ENTIDAD', 'CATEGORÍA', 'FRECUENCIA', 'DÍA', 'CUENTA', 'BASE', ...MESES_CORTOS];
  headers.forEach((h, i) => {
    sheet.getRange(4, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center');
  });

  let row = 6;

  // ═══════════════════════════════════════════════════════════════════
  // GASTOS FIJOS FAMILIA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 19).merge()
    .setValue('═══════════════  🏠 GASTOS FIJOS FAMILIA  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // Combinar todos los gastos familia
  const todosGastosFamilia = [
    ...GASTOS_FIJOS_FAM,
    ...CUOTAS_FAM,
    ...OBLIGACIONES_FAM,
    ...SUSCRIPCIONES_FAM
  ];

  todosGastosFamilia.forEach(gasto => {
    sheet.getRange(row, 1).setValue(gasto.concepto);
    sheet.getRange(row, 2).setValue('FAMILIA');
    sheet.getRange(row, 3).setValue(gasto.categoria);
    sheet.getRange(row, 4).setValue(gasto.frecuencia);
    sheet.getRange(row, 5).setValue(gasto.dia).setHorizontalAlignment('center');
    sheet.getRange(row, 6).setValue(gasto.cuenta || ''); // CUENTA (nueva columna F)
    sheet.getRange(row, 7).setValue(gasto.monto).setNumberFormat('#,##0'); // BASE ahora es columna G

    // Validación para CUENTA (columna F) - dropdown de cuentas FAMILIA
    if (gasto.cuenta) {
      sheet.getRange(row, 6).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(CUENTAS_FAMILIA, true)
          .setAllowInvalid(false)
          .build()
      );
    }

    if (!gasto.concepto.includes('Reserva')) {
      sheet.getRange(row, 1, 1, 19).setBackground(C.FAM_FONDO_ALT);
    }
    row++;
  });

  row += 2;

  // ═══════════════════════════════════════════════════════════════════
  // GASTOS FIJOS NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 19).merge()
    .setValue('═══════════════  🏥 GASTOS FIJOS NEUROTEA  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  const todosGastosNT = [
    ...CLINICA_NT,
    ...SUELDOS_NT,
    ...TELEFONIA_NT,
    ...OBLIGACIONES_NT
  ];

  todosGastosNT.forEach(gasto => {
    sheet.getRange(row, 1).setValue(gasto.concepto);
    sheet.getRange(row, 2).setValue('NEUROTEA');
    sheet.getRange(row, 3).setValue(gasto.categoria);
    sheet.getRange(row, 4).setValue(gasto.frecuencia);
    sheet.getRange(row, 5).setValue(gasto.dia).setHorizontalAlignment('center');
    sheet.getRange(row, 6).setValue(gasto.cuenta || ''); // CUENTA (nueva columna F)
    sheet.getRange(row, 7).setValue(gasto.monto).setNumberFormat('#,##0'); // BASE ahora es columna G

    // Validación para CUENTA (columna F) - dropdown de cuentas NT
    if (gasto.cuenta) {
      sheet.getRange(row, 6).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInList(CUENTAS_NT, true)
          .setAllowInvalid(false)
          .build()
      );
    }

    if (!gasto.concepto.includes('Reserva')) {
      sheet.getRange(row, 1, 1, 19).setBackground(C.NT_FONDO_ALT);
    }
    row++;
  });

  // Formato de números (BASE es columna G, meses son H-S)
  sheet.getRange('G:S').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 250);  // CONCEPTO
  sheet.setColumnWidth(2, 90);   // ENTIDAD
  sheet.setColumnWidth(3, 150);  // CATEGORÍA
  sheet.setColumnWidth(4, 110);  // FRECUENCIA
  sheet.setColumnWidth(5, 50);   // DÍA
  sheet.setColumnWidth(6, 130);  // CUENTA (nueva)
  sheet.setColumnWidth(7, 100);  // BASE
  for (let i = 8; i <= 19; i++) sheet.setColumnWidth(i, 80); // ENE-DIC

  sheet.setFrozenRows(4);

  return sheet;
}

// ═══════════════════════════════════════════════════════════════════════════════
// 4. HOJA CARGA_FAMILIA - Variables Puros (Sistema Anti-Burro)
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaCARGA_FAMILIA() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.CARGA_FAMILIA);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:I1').merge()
    .setValue('👨‍👩‍👧‍👦 CARGA FAMILIA - Variables Puros')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:I2').merge()
    .setValue('Solo para gastos VARIABLES puros (Supermercado, Combustible, etc). Los gastos fijos van en GASTOS_FIJOS.')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'NOTAS', '#'];

  headers.forEach((h, i) => {
    sheet.getRange(3, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  });

  // ─── VALIDACIONES ───
  aplicarValidacionesCargaFamilia(sheet);

  // ─── FORMATO ───
  sheet.getRange('A4:A500').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F4:F500').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 90);   // FECHA
  sheet.setColumnWidth(2, 180);  // TIPO
  sheet.setColumnWidth(3, 150);  // CATEGORÍA
  sheet.setColumnWidth(4, 200);  // SUBCATEGORÍA
  sheet.setColumnWidth(5, 200);  // DESCRIPCIÓN
  sheet.setColumnWidth(6, 110);  // MONTO
  sheet.setColumnWidth(7, 130);  // CUENTA
  sheet.setColumnWidth(8, 150);  // NOTAS
  sheet.setColumnWidth(9, 40);   // #

  sheet.setFrozenRows(3);

  // Formato condicional para ingresos (verde) y egresos (rojo)
  aplicarFormatoCondicionalCarga(sheet, 'FAMILIA');

  return sheet;
}

function aplicarValidacionesCargaFamilia(sheet) {
  const tipos = [...TIPOS_INGRESO_FAMILIA, 'Egreso Familiar'];

  // TIPO (columna B)
  sheet.getRange('B4:B500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(tipos, true)
      .setAllowInvalid(false)
      .build()
  );

  // CATEGORÍA (columna C)
  sheet.getRange('C4:C500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['-', ...CATEGORIAS_EGRESO_FAMILIA], true)
      .setAllowInvalid(false)
      .build()
  );

  // SUBCATEGORÍA (columna D)
  sheet.getRange('D4:D500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['-', ...VARIABLES_FAMILIA], true)
      .setAllowInvalid(false)
      .build()
  );

  // CUENTA (columna G)
  sheet.getRange('G4:G500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(CUENTAS_FAMILIA, true)
      .setAllowInvalid(false)
      .build()
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// 5. HOJA CARGA_NT - Variables + Eventos (Sistema Anti-Burro)
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaCARGA_NT() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.CARGA_NT);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:I1').merge()
    .setValue('🏥 CARGA NEUROTEA - Variables + Eventos')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:I2').merge()
    .setValue('Solo para gastos VARIABLES puros y EVENTOS. Los gastos fijos van en GASTOS_FIJOS.')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCAT/EVENTO', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'NOTAS', '#'];

  headers.forEach((h, i) => {
    sheet.getRange(3, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.NT_FONDO)
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  });

  // ─── VALIDACIONES ───
  aplicarValidacionesCargaNT(sheet);

  // ─── FORMATO ───
  sheet.getRange('A4:A500').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('F4:F500').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 90);   // FECHA
  sheet.setColumnWidth(2, 180);  // TIPO
  sheet.setColumnWidth(3, 150);  // CATEGORÍA
  sheet.setColumnWidth(4, 180);  // SUBCAT/EVENTO
  sheet.setColumnWidth(5, 200);  // DESCRIPCIÓN
  sheet.setColumnWidth(6, 110);  // MONTO
  sheet.setColumnWidth(7, 130);  // CUENTA
  sheet.setColumnWidth(8, 150);  // NOTAS
  sheet.setColumnWidth(9, 40);   // #

  sheet.setFrozenRows(3);

  // Formato condicional
  aplicarFormatoCondicionalCarga(sheet, 'NEUROTEA');

  return sheet;
}

function aplicarValidacionesCargaNT(sheet) {
  const tipos = [...TIPOS_INGRESO_NT, 'Egreso NT'];

  // TIPO (columna B)
  sheet.getRange('B4:B500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(tipos, true)
      .setAllowInvalid(false)
      .build()
  );

  // CATEGORÍA (columna C)
  sheet.getRange('C4:C500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['-', ...CATEGORIAS_EGRESO_NT], true)
      .setAllowInvalid(false)
      .build()
  );

  // SUBCATEGORÍA/EVENTO (columna D)
  const subcatEventos = ['-', ...VARIABLES_NT, ...EVENTOS_NT.map(e => e.nombre)];
  sheet.getRange('D4:D500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(subcatEventos, true)
      .setAllowInvalid(false)
      .build()
  );

  // CUENTA (columna G)
  sheet.getRange('G4:G500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(CUENTAS_NT, true)
      .setAllowInvalid(false)
      .build()
  );
}

function aplicarFormatoCondicionalCarga(sheet, entidad) {
  const C = COLORES;
  const color = entidad === 'FAMILIA' ? C.FAM_FONDO : C.NT_FONDO;

  // Alternar colores de filas
  const reglaAlternada = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=ISEVEN(ROW())')
    .setBackground(color)
    .setRanges([sheet.getRange('A4:I500')])
    .build();

  sheet.setConditionalFormatRules([reglaAlternada]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. HOJA MOVIMIENTO - Real vs Presupuesto (CON FÓRMULAS DINÁMICAS)
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaMOVIMIENTO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.MOVIMIENTO);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:J1').merge()
    .setValue('📈 MOVIMIENTO - Real vs Presupuesto')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  // ─── SELECTOR DE MES ───
  sheet.getRange('A3').setValue('📅 MES:').setFontWeight('bold');
  sheet.getRange('B3').setValue('Enero').setBackground(C.GANANCIA_FONDO);
  sheet.getRange('B3').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(MESES, true)
      .build()
  );

  // Número de mes calculado (oculto en L3)
  sheet.getRange('K3').setValue('MES_NUM:').setFontColor(C.TEXTO_CLARO);
  sheet.getRange('L3').setFormula('=MATCH(B3,{"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"},0)');

  sheet.getRange('D3').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E3').setFormula('=TODAY()').setNumberFormat('dd/mm/yyyy');

  // ─── HEADERS DE COLUMNAS (agregamos ESTADO PAGO) ───
  const headers = ['CONCEPTO', 'TIPO', 'FREC.', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', 'EST. PAGO', '🚦'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center');
  });

  let row = 7;

  // ═══════════════════════════════════════════════════════════════════
  // FAMILIA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue('═══════════════  🏠 FAMILIA  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // Ingresos Familia (vienen de CARGA_FAMILIA - son variables puros)
  row = escribirSeccionMovimientoIngresos(sheet, row, '▶ INGRESOS FAMILIA', INGRESOS_FAMILIA, 'FAMILIA', C.FAM_FONDO, C.FAM_SUBTOTAL);

  // Egresos Familia (vienen de GASTOS_FIJOS o CARGA según frecuencia)
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ GASTOS FIJOS', GASTOS_FIJOS_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ CUOTAS Y PRÉSTAMOS', CUOTAS_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ SUSCRIPCIONES', SUSCRIPCIONES_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionMovimientoVariables(sheet, row, '▶ VARIABLES', VARIABLES_PRESUP_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ AHORRO', AHORRO_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);

  // Balance Familia
  const filaBalanceFam = row;
  sheet.getRange(row, 1).setValue('💰 BALANCE FAMILIA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUMIF(B9:B${row-1},"Ingreso",D9:D${row-1})-SUMIF(B9:B${row-1},"Egreso",D9:D${row-1}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUMIF(B9:B${row-1},"Ingreso",E9:E${row-1})-SUMIF(B9:B${row-1},"Egreso",E9:E${row-1}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓ OK","⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 10).setBackground(C.GANANCIA_FONDO);
  row += 3;

  const filaInicioNT = row;

  // ═══════════════════════════════════════════════════════════════════
  // NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue('═══════════════  🏥 NEUROTEA  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // Ingresos NT (vienen de CARGA_NT - son variables puros)
  row = escribirSeccionMovimientoIngresos(sheet, row, '▶ INGRESOS NEUROTEA', INGRESOS_NT, 'NEUROTEA', C.NT_FONDO, C.NT_SUBTOTAL);

  // Egresos NT (vienen de GASTOS_FIJOS o CARGA según frecuencia)
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ CLÍNICA', CLINICA_NT, 'NEUROTEA', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ SUELDOS Y HONORARIOS', SUELDOS_NT, 'NEUROTEA', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ TELEFONÍA E INTERNET', TELEFONIA_NT, 'NEUROTEA', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = escribirSeccionMovimientoEgresos(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_NT, 'NEUROTEA', C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  // Eventos NT
  row = escribirSeccionMovimientoEventos(sheet, row, C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  row = escribirSeccionMovimientoVariables(sheet, row, '▶ VARIABLES NT', VARIABLES_PRESUP_NT, 'NEUROTEA', C.NT_FONDO_ALT, C.NT_SUBTOTAL);

  // Ganancia NT
  const filaGanancia = row;
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue('▶ GANANCIA (META 7%)')
    .setFontWeight('bold').setBackground(C.GANANCIA_FONDO);
  row++;

  // Fila de Ganancia Calculada
  sheet.getRange(row, 1).setValue('Ganancia Calculada');
  sheet.getRange(row, 2).setValue('Ganancia');
  sheet.getRange(row, 3).setValue('-');
  // Ganancia = Ingresos NT - Egresos NT
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2})-SUMIF(B${filaInicioNT+2}:B${row-2},"Egreso",D${filaInicioNT+2}:D${row-2}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2})-SUMIF(B${filaInicioNT+2}:B${row-2},"Egreso",E${filaInicioNT+2}:E${row-2}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  row++;

  // % Ganancia sobre Ingresos
  sheet.getRange(row, 1).setValue('% Ganancia sobre Ingresos');
  sheet.getRange(row, 4).setFormula(`=IFERROR(IF(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2})>0,D${row-1}/SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2}),0),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(IF(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2})>0,E${row-1}/SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2}),0),0)`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=0,07;"✓ META";"⚠ <7%")`);
  row++;

  // Distribución de Ganancia
  sheet.getRange(row, 1).setValue('  → Utilidad Dueño (33.33%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(E${row-2}*0,3333;0)`);
  row++;
  sheet.getRange(row, 1).setValue('  → Fondo Emergencia (33.33%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(E${row-3}*0,3333;0)`);
  row++;
  sheet.getRange(row, 1).setValue('  → Fondo Inversión (33.34%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(E${row-4}*0,3334;0)`);
  row += 2;

  // Balance NT
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 4).setFormula(`=D${filaGanancia+1}`);
  sheet.getRange(row, 5).setFormula(`=E${filaGanancia+1}`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓ OK","⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 10).setBackground(C.GANANCIA_FONDO);

  // Formato
  sheet.getRange('D:F').setNumberFormat('#,##0');
  sheet.getRange('G:G').setNumberFormat('0%');

  // Anchos
  sheet.setColumnWidth(1, 280);
  sheet.setColumnWidth(2, 80);
  sheet.setColumnWidth(3, 110);
  sheet.setColumnWidth(4, 110);
  sheet.setColumnWidth(5, 110);
  sheet.setColumnWidth(6, 100);
  sheet.setColumnWidth(7, 60);
  sheet.setColumnWidth(8, 80);
  sheet.setColumnWidth(9, 90);   // EST. PAGO
  sheet.setColumnWidth(10, 50);  // Semáforo

  // Ocultar columna K y L (MES_NUM)
  sheet.hideColumns(11, 2);

  // Formato condicional para ESTADO
  aplicarFormatoCondicionalMovimiento(sheet);

  sheet.setFrozenRows(5);

  return sheet;
}

// ─── SECCIÓN INGRESOS (Variables puros - vienen de CARGA) ───
function escribirSeccionMovimientoIngresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;
  const hojaCarga = entidad === 'FAMILIA' ? 'CARGA_FAMILIA' : 'CARGA_NT';

  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue('Ingreso');
    sheet.getRange(row, 3).setValue(item.frecuencia || 'Variable');

    // PRESUPUESTO: Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$L$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: SUMPRODUCT desde CARGA según tipo y mes (SUMIFS no funciona con MONTH/YEAR)
    const formulaReal = `=IFERROR(SUMPRODUCT((${hojaCarga}!$B$4:$B$500="${item.concepto}")*(MONTH(${hojaCarga}!$A$4:$A$500)=$L$3)*(YEAR(${hojaCarga}!$A$4:$A$500)=${AÑO})*(${hojaCarga}!$F$4:$F$500)),0)`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);

    // ESTADO (Ingreso: positivo es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓","⚠")`);

    // EST. PAGO: Ingresos de CARGA ya están RECIBIDOS (sin dropdown)
    sheet.getRange(row, 9).setValue('Recibido')
      .setFontStyle('italic')
      .setFontColor('#6B7280');

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUM(D${filaInicio}:D${filaFin}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 10).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EGRESOS FIJOS (vienen de GASTOS_FIJOS) ───
function escribirSeccionMovimientoEgresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;

  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue(item.frecuencia);

    // PRESUPUESTO: Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$L$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: Busca en GASTOS_FIJOS (columnas H a S son ENE a DIC)
    // Si no hay valor en el mes, usa BASE (columna G)
    // NOTA: Estructura GASTOS_FIJOS v2: A=Concepto, B=Entidad, C=Categoría, D=Frecuencia, E=Día, F=Cuenta, G=Base, H-S=Meses
    const formulaReal = `=IFERROR(IF(INDEX(GASTOS_FIJOS!$H:$S,MATCH("${item.concepto}",GASTOS_FIJOS!$A:$A,0),$L$3)<>"",INDEX(GASTOS_FIJOS!$H:$S,MATCH("${item.concepto}",GASTOS_FIJOS!$A:$A,0),$L$3),INDEX(GASTOS_FIJOS!$G:$G,MATCH("${item.concepto}",GASTOS_FIJOS!$A:$A,0))),0)`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);

    // ESTADO (Egreso: gastar menos es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);

    // ESTADO PAGO (dropdown) - por defecto "Pendiente"
    sheet.getRange(row, 9).setValue('Pendiente').setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(ESTADOS, true)
        .build()
    );

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUM(D${filaInicio}:D${filaFin}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 10).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN VARIABLES PUROS (vienen de CARGA) ───
function escribirSeccionMovimientoVariables(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;
  const hojaCarga = entidad === 'FAMILIA' ? 'CARGA_FAMILIA' : 'CARGA_NT';

  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue('Variable');

    // PRESUPUESTO: Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$L$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: SUMPRODUCT desde CARGA según subcategoría y mes (SUMIFS no funciona con MONTH/YEAR)
    const formulaReal = `=IFERROR(SUMPRODUCT((${hojaCarga}!$D$4:$D$500="${item.concepto}")*(MONTH(${hojaCarga}!$A$4:$A$500)=$L$3)*(YEAR(${hojaCarga}!$A$4:$A$500)=${AÑO})*(${hojaCarga}!$F$4:$F$500)),0)`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);

    // ESTADO (Egreso: gastar menos es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);

    // EST. PAGO: Variables de CARGA ya están PAGADOS (sin dropdown)
    sheet.getRange(row, 9).setValue('Pagado')
      .setFontStyle('italic')
      .setFontColor('#6B7280');

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUM(D${filaInicio}:D${filaFin}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 10).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EVENTOS NT ───
function escribirSeccionMovimientoEventos(sheet, row, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 10).merge()
    .setValue('▶ EVENTOS')
    .setFontWeight('bold').setBackground(colorFondo);
  row++;

  const filaInicio = row;

  EVENTOS_NT.forEach(evento => {
    if (!evento.nombre.includes('Reserva')) {
      sheet.getRange(row, 1).setValue(evento.nombre);
      sheet.getRange(row, 2).setValue('Egreso');
      sheet.getRange(row, 3).setValue('Variable');

      // PRESUPUESTO: Busca en hoja PRESUPUESTO
      const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${evento.nombre}",PRESUPUESTO!$A:$A,0),$L$3),0)`;
      sheet.getRange(row, 4).setFormula(formulaPresup);

      // REAL: SUMPRODUCT desde CARGA_NT según evento y mes (SUMIFS no funciona con MONTH/YEAR)
      const formulaReal = `=IFERROR(SUMPRODUCT((CARGA_NT!$D$4:$D$500="${evento.nombre}")*(MONTH(CARGA_NT!$A$4:$A$500)=$L$3)*(YEAR(CARGA_NT!$A$4:$A$500)=${AÑO})*(CARGA_NT!$F$4:$F$500)),0)`;
      sheet.getRange(row, 5).setFormula(formulaReal);

      sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
      sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
      sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);

      // EST. PAGO: Eventos de CARGA ya están PAGADOS (sin dropdown)
      sheet.getRange(row, 9).setValue('Pagado')
        .setFontStyle('italic')
        .setFontColor('#6B7280');

      row++;
    }
  });

  // Subtotal Eventos
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal Eventos').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=IFERROR(SUM(D${filaInicio}:D${filaFin}),0)`);
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin}),0)`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,0,E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 10).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── FORMATO CONDICIONAL MOVIMIENTO ───
function aplicarFormatoCondicionalMovimiento(sheet) {
  const C = COLORES;

  // Estado ✓ = Verde
  const reglaOK = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('✓')
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('H:H')])
    .build();

  // Estado ⚠ = Rojo
  const reglaAlerta = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('⚠')
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('H:H')])
    .build();

  // ═══════════════════════════════════════════════════════════════════
  // COLORES DIFERENCIA - Sensible al contexto INGRESO vs EGRESO
  // ═══════════════════════════════════════════════════════════════════

  // INGRESOS: Positivo (+) = VERDE (recibiste más = bueno)
  const reglaDifIngresoPos = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Ingreso",$F1>0)')
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('F:F')])
    .build();

  // INGRESOS: Negativo (-) = ROJO (recibiste menos = malo)
  const reglaDifIngresoNeg = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Ingreso",$F1<0)')
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('F:F')])
    .build();

  // EGRESOS: Positivo (+) = ROJO (gastaste más = malo)
  const reglaDifEgresoPos = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Egreso",$F1>0)')
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('F:F')])
    .build();

  // EGRESOS: Negativo (-) = VERDE (gastaste menos = bueno)
  const reglaDifEgresoNeg = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Egreso",$F1<0)')
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('F:F')])
    .build();

  // EST. PAGO colores
  const reglaPagado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pagado')
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('I:I')])
    .build();

  const reglaPendiente = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pendiente')
    .setBackground(C.AMARILLO_FONDO)
    .setFontColor(C.AMARILLO)
    .setRanges([sheet.getRange('I:I')])
    .build();

  const reglaCancelado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Cancelado')
    .setBackground(C.GRIS_FONDO)
    .setFontColor(C.TEXTO_CLARO)
    .setRanges([sheet.getRange('I:I')])
    .build();

  sheet.setConditionalFormatRules([
    reglaOK, reglaAlerta,
    reglaDifIngresoPos, reglaDifIngresoNeg,
    reglaDifEgresoPos, reglaDifEgresoNeg,
    reglaPagado, reglaPendiente, reglaCancelado
  ]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 8. HOJA LIQUIDEZ - Control de Flujo de Caja con TODAY()
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaLIQUIDEZ() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.LIQUIDEZ);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:H1').merge()
    .setValue('💰 LIQUIDEZ - Control de Flujo de Caja')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:H2').merge()
    .setValue('Se actualiza automáticamente cada día usando TODAY() • Muestra gastos pendientes según fecha de vencimiento')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── INFO DE FECHA ───
  sheet.getRange('A4').setValue('📅 HOY:').setFontWeight('bold');
  sheet.getRange('B4').setFormula('=TODAY()').setNumberFormat('dd/mm/yyyy');
  sheet.getRange('C4').setValue('DÍA:').setFontWeight('bold');
  sheet.getRange('D4').setFormula('=DAY(TODAY())');
  sheet.getRange('F4').setValue('📋 MES:').setFontWeight('bold');
  sheet.getRange('G4').setFormula('=MOVIMIENTO!B3');

  let row = 7;

  // ═══════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA - LIQUIDEZ
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 8).merge()
    .setValue('═══════════════  🏠 FAMILIA - LIQUIDEZ  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // Headers de la tabla de flujo
  const headersFlujoCaja = ['Período', 'Debe Pagar', 'Acumulado', 'Saldo', 'Estado'];
  headersFlujoCaja.forEach((h, i) => {
    sheet.getRange(row, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  });
  row++;

  // DISPONIBLE INICIAL FAMILIA (editable)
  sheet.getRange(row, 1).setValue('💵 DISPONIBLE INICIAL ✏️')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 2).setValue('-').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 4).setValue(0)
    .setNumberFormat('#,##0')
    .setFontColor(C.NT_HEADER).setFontWeight('bold')
    .setBackground(C.FAM_FONDO)
    .setHorizontalAlignment('right');
  sheet.getRange(row, 5).setValue('✏️ Editar')
    .setFontStyle('italic').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaDispFam = row;
  row++;

  // 🔴 ATRASADOS FAMILIA (DÍA < HOY)
  sheet.getRange(row, 1).setValue('🔴 Atrasados (vencidos)')
    .setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$9:$I$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$9:$A$70;GASTOS_FIJOS!$A:$A;0));99)<DAY(TODAY()))*(MOVIMIENTO!$E$9:$E$70));0)')
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=B' + row)
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispFam + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaAtrasadosFam = row;
  row++;

  // 🟡 ESTA SEMANA FAMILIA (DÍA entre HOY y HOY+7)
  sheet.getRange(row, 1).setValue('🟡 Esta semana (0-7 días)')
    .setFontWeight('bold').setBackground(C.AMARILLO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$9:$I$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$9:$A$70;GASTOS_FIJOS!$A:$A;0));99)>=DAY(TODAY()))*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$9:$A$70;GASTOS_FIJOS!$A:$A;0));99)<=DAY(TODAY())+7)*(MOVIMIENTO!$E$9:$E$70));0)')
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=C' + (row-1) + '+B' + row)
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispFam + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.AMARILLO_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row++;

  // 🟢 PRÓXIMA SEMANA FAMILIA (DÍA entre HOY+8 y HOY+14)
  sheet.getRange(row, 1).setValue('🟢 Próxima semana (8-14 días)')
    .setFontWeight('bold').setBackground(C.VERDE_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$9:$I$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$9:$A$70;GASTOS_FIJOS!$A:$A;0));99)>DAY(TODAY())+7)*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$9:$A$70;GASTOS_FIJOS!$A:$A;0));99)<=DAY(TODAY())+14)*(MOVIMIENTO!$E$9:$E$70));0)')
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=C' + (row-1) + '+B' + row)
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispFam + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.VERDE_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row++;

  // SALDO FINAL FAMILIA
  sheet.getRange(row, 1).setValue('💵 SALDO FINAL')
    .setFontWeight('bold').setFontSize(11).setBackground(C.FAM_SUBTOTAL);
  sheet.getRange(row, 2).setFormula('=SUM(B' + (filaAtrasadosFam) + ':B' + (row-1) + ')')
    .setNumberFormat('#,##0').setFontWeight('bold').setBackground(C.FAM_SUBTOTAL).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.FAM_SUBTOTAL);
  sheet.getRange(row, 4).setFormula('=D' + filaDispFam + '-B' + row)
    .setNumberFormat('#,##0').setFontWeight('bold').setFontSize(11).setBackground(C.FAM_SUBTOTAL).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✅ LIQUIDEZ OK";"⚠️ DÉFICIT")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.FAM_SUBTOTAL);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row += 3;

  // ═══════════════════════════════════════════════════════════════════
  // SECCIÓN NEUROTEA - LIQUIDEZ
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 8).merge()
    .setValue('═══════════════  🏥 NEUROTEA - LIQUIDEZ  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  // Headers NT
  headersFlujoCaja.forEach((h, i) => {
    sheet.getRange(row, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  });
  row++;

  // DISPONIBLE INICIAL NT (editable)
  sheet.getRange(row, 1).setValue('💵 DISPONIBLE INICIAL ✏️')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  sheet.getRange(row, 2).setValue('-').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  sheet.getRange(row, 4).setValue(0)
    .setNumberFormat('#,##0')
    .setFontColor(C.NT_HEADER).setFontWeight('bold')
    .setBackground(C.NT_FONDO)
    .setHorizontalAlignment('right');
  sheet.getRange(row, 5).setValue('✏️ Editar')
    .setFontStyle('italic').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaDispNT = row;
  row++;

  // 🔴 ATRASADOS NT (DÍA < HOY) - Rango NT: filas 73-150
  sheet.getRange(row, 1).setValue('🔴 Atrasados (vencidos)')
    .setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$73:$I$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$73:$A$150;GASTOS_FIJOS!$A:$A;0));99)<DAY(TODAY()))*(MOVIMIENTO!$E$73:$E$150));0)')
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=B' + row)
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispNT + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.ROJO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaAtrasadosNT = row;
  row++;

  // 🟡 ESTA SEMANA NT
  sheet.getRange(row, 1).setValue('🟡 Esta semana (0-7 días)')
    .setFontWeight('bold').setBackground(C.AMARILLO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$73:$I$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$73:$A$150;GASTOS_FIJOS!$A:$A;0));99)>=DAY(TODAY()))*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$73:$A$150;GASTOS_FIJOS!$A:$A;0));99)<=DAY(TODAY())+7)*(MOVIMIENTO!$E$73:$E$150));0)')
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=C' + (row-1) + '+B' + row)
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispNT + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.AMARILLO_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.AMARILLO_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row++;

  // 🟢 PRÓXIMA SEMANA NT
  sheet.getRange(row, 1).setValue('🟢 Próxima semana (8-14 días)')
    .setFontWeight('bold').setBackground(C.VERDE_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$I$73:$I$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$73:$A$150;GASTOS_FIJOS!$A:$A;0));99)>DAY(TODAY())+7)*(IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH(MOVIMIENTO!$A$73:$A$150;GASTOS_FIJOS!$A:$A;0));99)<=DAY(TODAY())+14)*(MOVIMIENTO!$E$73:$E$150));0)')
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=C' + (row-1) + '+B' + row)
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=D' + filaDispNT + '-C' + row)
    .setNumberFormat('#,##0').setBackground(C.VERDE_FONDO).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✓";"⚠️ FALTA")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.VERDE_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row++;

  // SALDO FINAL NT
  sheet.getRange(row, 1).setValue('💵 SALDO FINAL')
    .setFontWeight('bold').setFontSize(11).setBackground(C.NT_SUBTOTAL);
  sheet.getRange(row, 2).setFormula('=SUM(B' + (filaAtrasadosNT) + ':B' + (row-1) + ')')
    .setNumberFormat('#,##0').setFontWeight('bold').setBackground(C.NT_SUBTOTAL).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.NT_SUBTOTAL);
  sheet.getRange(row, 4).setFormula('=D' + filaDispNT + '-B' + row)
    .setNumberFormat('#,##0').setFontWeight('bold').setFontSize(11).setBackground(C.NT_SUBTOTAL).setHorizontalAlignment('right');
  sheet.getRange(row, 5).setFormula('=IF(D' + row + '>=0;"✅ LIQUIDEZ OK";"⚠️ DÉFICIT")')
    .setHorizontalAlignment('center').setFontWeight('bold').setBackground(C.NT_SUBTOTAL);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  row += 3;

  // ═══════════════════════════════════════════════════════════════════
  // RESUMEN CONSOLIDADO
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 8).merge()
    .setValue('═══════════════  📊 RESUMEN CONSOLIDADO  ═══════════════')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.BALANCE_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row += 2;

  const headersConsolidado = ['Concepto', 'FAMILIA', 'NEUROTEA', 'TOTAL'];
  headersConsolidado.forEach((h, i) => {
    sheet.getRange(row, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center')
      .setBorder(true, true, true, true, false, false, C.BALANCE_HEADER, SpreadsheetApp.BorderStyle.SOLID);
  });
  row++;

  // Disponible Inicial
  sheet.getRange(row, 1).setValue('💵 Disponible Inicial').setFontWeight('bold');
  sheet.getRange(row, 2).setFormula('=D' + filaDispFam).setNumberFormat('#,##0').setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=D' + filaDispNT).setNumberFormat('#,##0').setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=B' + row + '+C' + row).setNumberFormat('#,##0').setFontWeight('bold').setHorizontalAlignment('right');
  sheet.getRange(row, 1, 1, 4).setBorder(true, true, true, true, false, false, C.GRIS_FONDO, SpreadsheetApp.BorderStyle.SOLID);
  const filaDispConsolidado = row;
  row++;

  // Total a Pagar
  sheet.getRange(row, 1).setValue('(-) Total a Pagar').setFontColor(C.ROJO);
  sheet.getRange(row, 2).setFormula('=B' + (filaDispFam + 4)).setNumberFormat('#,##0').setFontColor(C.ROJO).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=B' + (filaDispNT + 4)).setNumberFormat('#,##0').setFontColor(C.ROJO).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=B' + row + '+C' + row).setNumberFormat('#,##0').setFontWeight('bold').setFontColor(C.ROJO).setHorizontalAlignment('right');
  sheet.getRange(row, 1, 1, 4).setBorder(true, true, true, true, false, false, C.GRIS_FONDO, SpreadsheetApp.BorderStyle.SOLID);
  row++;

  // Saldo Proyectado
  sheet.getRange(row, 1).setValue('= SALDO PROYECTADO').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 2).setFormula('=B' + filaDispConsolidado + '-B' + (row-1))
    .setNumberFormat('#,##0').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('right');
  sheet.getRange(row, 3).setFormula('=C' + filaDispConsolidado + '-C' + (row-1))
    .setNumberFormat('#,##0').setFontWeight('bold').setFontSize(11).setHorizontalAlignment('right');
  sheet.getRange(row, 4).setFormula('=B' + row + '+C' + row)
    .setNumberFormat('#,##0').setFontWeight('bold').setFontSize(12).setHorizontalAlignment('right');
  sheet.getRange(row, 1, 1, 4).setBackground(C.GANANCIA_FONDO)
    .setBorder(true, true, true, true, false, false, C.BALANCE_HEADER, SpreadsheetApp.BorderStyle.SOLID);
  row += 2;

  // Alerta final
  sheet.getRange(row, 1, 1, 4).merge()
    .setFormula('=IF(D' + (row-2) + '>=0;"✅ LIQUIDEZ CONSOLIDADA OK - Puedes cubrir todos los gastos pendientes";"⚠️ ALERTA: Te faltan Gs. "&TEXT(ABS(D' + (row-2) + ');"#,##0")&" para cubrir los gastos pendientes")')
    .setFontSize(12)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(row, 35);

  // Formato condicional para la alerta
  const reglaAlertaOK = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$D$' + (row-2) + '>=0')
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange(row, 1, 1, 4)])
    .build();

  const reglaAlertaFail = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=$D$' + (row-2) + '<0')
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange(row, 1, 1, 4)])
    .build();

  sheet.setConditionalFormatRules([reglaAlertaOK, reglaAlertaFail]);

  // Anchos de columna
  sheet.setColumnWidth(1, 220);
  sheet.setColumnWidth(2, 120);
  sheet.setColumnWidth(3, 120);
  sheet.setColumnWidth(4, 120);
  sheet.setColumnWidth(5, 130);
  for (let i = 6; i <= 8; i++) sheet.setColumnWidth(i, 80);

  sheet.setFrozenRows(6);

  return sheet;
}

// ─── FORMATO CONDICIONAL LIQUIDEZ ───
function aplicarFormatoCondicionalLiquidez(sheet) {
  const C = COLORES;

  // Saldo negativo = Rojo
  const reglaNegativo = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('B:D')])
    .build();

  // Saldo positivo = Verde
  const reglaPositivo = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('B:D')])
    .build();

  sheet.setConditionalFormatRules([reglaNegativo, reglaPositivo]);
}
