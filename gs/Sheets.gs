/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * SHEETS.GS - CREACIÓN DE LAS 7 HOJAS PRINCIPALES
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
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
  sheet.getRange('A1:S1').merge()
    .setValue('📋 GASTOS FIJOS - LISTA MAESTRA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:S2').merge()
    .setValue('DÍA = día del mes que vence | Si un mes está vacío, usa el MONTO BASE | Poner 0 para cancelar un gasto')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['CONCEPTO', 'ENTIDAD', 'CATEGORÍA', 'FRECUENCIA', 'DÍA', 'BASE', ...MESES_CORTOS];
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
  sheet.getRange(row, 1, 1, 18).merge()
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
    sheet.getRange(row, 6).setValue(gasto.monto).setNumberFormat('#,##0');

    // Fórmulas de arrastre para cada mes
    for (let m = 7; m <= 18; m++) {
      // El valor del mes es: si hay valor en este mes usarlo, sino buscar hacia atrás
      const colActual = String.fromCharCode(64 + m);
      const colAnterior = String.fromCharCode(64 + m - 1);
      const formula = m === 7
        ? `=IF(${colActual}${row}<>"", ${colActual}${row}, F${row})`
        : `=IF(${colActual}${row}<>"", ${colActual}${row}, ${colAnterior}${row})`;
      // No ponemos fórmula automática, dejamos celdas editables
    }

    if (!gasto.concepto.includes('Reserva')) {
      sheet.getRange(row, 1, 1, 18).setBackground(C.FAM_FONDO_ALT);
    }
    row++;
  });

  row += 2;

  // ═══════════════════════════════════════════════════════════════════
  // GASTOS FIJOS NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 18).merge()
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
    sheet.getRange(row, 6).setValue(gasto.monto).setNumberFormat('#,##0');

    if (!gasto.concepto.includes('Reserva')) {
      sheet.getRange(row, 1, 1, 18).setBackground(C.NT_FONDO_ALT);
    }
    row++;
  });

  // Formato de números
  sheet.getRange('F:R').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 250);
  sheet.setColumnWidth(2, 90);
  sheet.setColumnWidth(3, 150);
  sheet.setColumnWidth(4, 110);
  sheet.setColumnWidth(5, 50);
  sheet.setColumnWidth(6, 100);
  for (let i = 7; i <= 18; i++) sheet.setColumnWidth(i, 80);

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
  sheet.getRange('A1:J1').merge()
    .setValue('👨‍👩‍👧‍👦 CARGA FAMILIA - Variables Puros')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:J2').merge()
    .setValue('Solo para gastos VARIABLES puros (Supermercado, Combustible, etc). Los gastos fijos van en GASTOS_FIJOS.')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCATEGORÍA', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS', '#'];

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
  sheet.setColumnWidth(8, 90);   // ESTADO
  sheet.setColumnWidth(9, 150);  // NOTAS
  sheet.setColumnWidth(10, 40);  // #

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

  // ESTADO (columna H)
  sheet.getRange('H4:H500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(ESTADOS, true)
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
  sheet.getRange('A1:J1').merge()
    .setValue('🏥 CARGA NEUROTEA - Variables + Eventos')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:J2').merge()
    .setValue('Solo para gastos VARIABLES puros y EVENTOS. Los gastos fijos van en GASTOS_FIJOS.')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['FECHA', 'TIPO', 'CATEGORÍA', 'SUBCAT/EVENTO', 'DESCRIPCIÓN', 'MONTO', 'CUENTA', 'ESTADO', 'NOTAS', '#'];

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
  sheet.setColumnWidth(8, 90);   // ESTADO
  sheet.setColumnWidth(9, 150);  // NOTAS
  sheet.setColumnWidth(10, 40);  // #

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

  // ESTADO (columna H)
  sheet.getRange('H4:H500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(ESTADOS, true)
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
    .setRanges([sheet.getRange('A4:J500')])
    .build();

  // Estado Pagado = verde
  const reglaPagado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pagado')
    .setBackground(C.VERDE_FONDO)
    .setRanges([sheet.getRange('H4:H500')])
    .build();

  // Estado Pendiente = amarillo
  const reglaPendiente = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pendiente')
    .setBackground(C.AMARILLO_FONDO)
    .setRanges([sheet.getRange('H4:H500')])
    .build();

  // Estado Cancelado = gris
  const reglaCancelado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Cancelado')
    .setBackground(C.GRIS_FONDO)
    .setFontColor(C.TEXTO_CLARO)
    .setRanges([sheet.getRange('H4:H500')])
    .build();

  sheet.setConditionalFormatRules([reglaAlternada, reglaPagado, reglaPendiente, reglaCancelado]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// 6. HOJA MOVIMIENTO - Real vs Presupuesto (CON FÓRMULAS DINÁMICAS)
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaMOVIMIENTO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.MOVIMIENTO);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:I1').merge()
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

  // Número de mes calculado (oculto en K3)
  sheet.getRange('J3').setValue('MES_NUM:').setFontColor(C.TEXTO_CLARO);
  sheet.getRange('K3').setFormula('=MATCH(B3,{"Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"},0)');

  sheet.getRange('D3').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E3').setFormula('=TODAY()').setNumberFormat('dd/mm/yyyy');

  // ─── HEADERS DE COLUMNAS ───
  const headers = ['CONCEPTO', 'TIPO', 'FREC.', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', '🚦'];
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
  sheet.getRange(row, 1, 1, 9).merge()
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
  sheet.getRange(row, 4).setFormula(`=SUMIF(B9:B${row-1},"Ingreso",D9:D${row-1})-SUMIF(B9:B${row-1},"Egreso",D9:D${row-1})`);
  sheet.getRange(row, 5).setFormula(`=SUMIF(B9:B${row-1},"Ingreso",E9:E${row-1})-SUMIF(B9:B${row-1},"Egreso",E9:E${row-1})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓ OK","⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 9).setBackground(C.GANANCIA_FONDO);
  row += 3;

  const filaInicioNT = row;

  // ═══════════════════════════════════════════════════════════════════
  // NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 9).merge()
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
  sheet.getRange(row, 1, 1, 9).merge()
    .setValue('▶ GANANCIA (META 7%)')
    .setFontWeight('bold').setBackground(C.GANANCIA_FONDO);
  row++;

  // Fila de Ganancia Calculada
  sheet.getRange(row, 1).setValue('Ganancia Calculada');
  sheet.getRange(row, 2).setValue('Ganancia');
  sheet.getRange(row, 3).setValue('-');
  // Ganancia = Ingresos NT - Egresos NT
  sheet.getRange(row, 4).setFormula(`=SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2})-SUMIF(B${filaInicioNT+2}:B${row-2},"Egreso",D${filaInicioNT+2}:D${row-2})`);
  sheet.getRange(row, 5).setFormula(`=SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2})-SUMIF(B${filaInicioNT+2}:B${row-2},"Egreso",E${filaInicioNT+2}:E${row-2})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  row++;

  // % Ganancia sobre Ingresos
  sheet.getRange(row, 1).setValue('% Ganancia sobre Ingresos');
  sheet.getRange(row, 4).setFormula(`=IF(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2})>0,D${row-1}/SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",D${filaInicioNT+2}:D${row-2}),0)`);
  sheet.getRange(row, 5).setFormula(`=IF(SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2})>0,E${row-1}/SUMIF(B${filaInicioNT+2}:B${row-2},"Ingreso",E${filaInicioNT+2}:E${row-2}),0)`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=0.07,"✓ META","⚠ <7%")`);
  row++;

  // Distribución de Ganancia
  sheet.getRange(row, 1).setValue('  → Utilidad Dueño (33.33%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=E${row-2}*0.3333`);
  row++;
  sheet.getRange(row, 1).setValue('  → Fondo Emergencia (33.33%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=E${row-3}*0.3333`);
  row++;
  sheet.getRange(row, 1).setValue('  → Fondo Inversión (33.34%)').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=E${row-4}*0.3334`);
  row += 2;

  // Balance NT
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  sheet.getRange(row, 4).setFormula(`=D${filaGanancia+1}`);
  sheet.getRange(row, 5).setFormula(`=E${filaGanancia+1}`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓ OK","⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 9).setBackground(C.GANANCIA_FONDO);

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
  sheet.setColumnWidth(8, 100);
  sheet.setColumnWidth(9, 50);

  // Formato condicional para ESTADO
  aplicarFormatoCondicionalMovimiento(sheet);

  sheet.setFrozenRows(5);

  return sheet;
}

// ─── SECCIÓN INGRESOS (Variables puros - vienen de CARGA) ───
function escribirSeccionMovimientoIngresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 9).merge()
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
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$K$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: SUMIFS desde CARGA según tipo y mes
    const formulaReal = `=SUMIFS(${hojaCarga}!$F:$F,${hojaCarga}!$B:$B,"${item.concepto}",MONTH(${hojaCarga}!$A:$A),$K$3,YEAR(${hojaCarga}!$A:$A),${AÑO})`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,IF(E${row}>0,1,0),E${row}/D${row})`);

    // ESTADO (Ingreso: positivo es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}>=D${row},"✓","⚠")`);

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=SUM(D${filaInicio}:D${filaFin})`);
  sheet.getRange(row, 5).setFormula(`=SUM(E${filaInicio}:E${filaFin})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 9).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EGRESOS FIJOS (vienen de GASTOS_FIJOS) ───
function escribirSeccionMovimientoEgresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 9).merge()
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
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$K$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: Busca en GASTOS_FIJOS (columnas G a R son ENE a DIC)
    // La columna del mes es: G(7) + MES_NUM - 1 = G para Enero, H para Febrero, etc.
    const formulaReal = `=IFERROR(INDEX(GASTOS_FIJOS!$G:$R,MATCH("${item.concepto}",GASTOS_FIJOS!$A:$A,0),$K$3),IFERROR(INDEX(GASTOS_FIJOS!$F:$F,MATCH("${item.concepto}",GASTOS_FIJOS!$A:$A,0)),0))`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,IF(E${row}>0,1,0),E${row}/D${row})`);

    // ESTADO (Egreso: gastar menos es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=SUM(D${filaInicio}:D${filaFin})`);
  sheet.getRange(row, 5).setFormula(`=SUM(E${filaInicio}:E${filaFin})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 9).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN VARIABLES PUROS (vienen de CARGA) ───
function escribirSeccionMovimientoVariables(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 9).merge()
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
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${item.concepto}",PRESUPUESTO!$A:$A,0),$K$3),0)`;
    sheet.getRange(row, 4).setFormula(formulaPresup);

    // REAL: SUMIFS desde CARGA según subcategoría y mes
    const formulaReal = `=SUMIFS(${hojaCarga}!$F:$F,${hojaCarga}!$D:$D,"${item.concepto}",MONTH(${hojaCarga}!$A:$A),$K$3,YEAR(${hojaCarga}!$A:$A),${AÑO})`;
    sheet.getRange(row, 5).setFormula(formulaReal);

    // DIFERENCIA
    sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);

    // %
    sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,IF(E${row}>0,1,0),E${row}/D${row})`);

    // ESTADO (Egreso: gastar menos es bueno)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=SUM(D${filaInicio}:D${filaFin})`);
  sheet.getRange(row, 5).setFormula(`=SUM(E${filaInicio}:E${filaFin})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 9).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EVENTOS NT ───
function escribirSeccionMovimientoEventos(sheet, row, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 9).merge()
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
      const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O,MATCH("${evento.nombre}",PRESUPUESTO!$A:$A,0),$K$3),0)`;
      sheet.getRange(row, 4).setFormula(formulaPresup);

      // REAL: SUMIFS desde CARGA_NT según evento y mes
      const formulaReal = `=SUMIFS(CARGA_NT!$F:$F,CARGA_NT!$D:$D,"${evento.nombre}",MONTH(CARGA_NT!$A:$A),$K$3,YEAR(CARGA_NT!$A:$A),${AÑO})`;
      sheet.getRange(row, 5).setFormula(formulaReal);

      sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
      sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,IF(E${row}>0,1,0),E${row}/D${row})`);
      sheet.getRange(row, 8).setFormula(`=IF(E${row}<=D${row},"✓","⚠")`);
      row++;
    }
  });

  // Subtotal Eventos
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal Eventos').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 4).setFormula(`=SUM(D${filaInicio}:D${filaFin})`);
  sheet.getRange(row, 5).setFormula(`=SUM(E${filaInicio}:E${filaFin})`);
  sheet.getRange(row, 6).setFormula(`=E${row}-D${row}`);
  sheet.getRange(row, 7).setFormula(`=IF(D${row}=0,"-",E${row}/D${row})`);
  sheet.getRange(row, 1, 1, 9).setBackground(colorSubtotal);
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

  // Diferencia negativa (egresos) = Rojo
  const reglaDifNeg = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('F:F')])
    .build();

  // Diferencia positiva = Verde (solo para filas de egreso donde gastar menos es bueno)
  const reglaDifPos = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('F:F')])
    .build();

  sheet.setConditionalFormatRules([reglaOK, reglaAlerta, reglaDifNeg, reglaDifPos]);
}
