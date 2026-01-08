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

  // ─── AHORRO FAMILIA ───
  escribirListaConfig(sheet, fila2, col, 'AHORRO FAMILIA', AHORRO_FAMILIA, C.FAM_HEADER);
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

  // ─── SALDOS INICIALES POR MES ───
  // Decisión [2026-01-06]: Cada mes tiene su propio saldo inicial independiente
  const filaSaldos = 46;
  sheet.getRange(filaSaldos, 1, 1, 4).merge()
    .setValue('💰 SALDOS INICIALES POR MES')
    .setFontSize(12).setFontWeight('bold')
    .setBackground(C.BALANCE_HEADER).setFontColor(C.BLANCO);

  sheet.getRange(filaSaldos + 1, 1, 1, 3)
    .setValues([['MES', 'FAMILIA', 'NEUROTEA']])
    .setFontWeight('bold')
    .setBackground(C.GRIS_FONDO)
    .setHorizontalAlignment('center');

  // Filas de meses con valores editables (inicializados en 0)
  MESES.forEach((mes, i) => {
    const filaMes = filaSaldos + 2 + i;
    sheet.getRange(filaMes, 1).setValue(mes);
    sheet.getRange(filaMes, 2).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(C.FAM_FONDO)
      .setFontWeight('bold');
    sheet.getRange(filaMes, 3).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(C.NT_FONDO)
      .setFontWeight('bold');
  });

  // Nota explicativa
  sheet.getRange(filaSaldos + 14, 1, 1, 3).merge()
    .setValue('✏️ Ingrese aquí el saldo inicial de cada mes. Al cambiar el mes en MOVIMIENTO, TABLERO usará el saldo correspondiente.')
    .setFontSize(9).setFontStyle('italic').setFontColor(C.TEXTO_CLARO);

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
  const metaGanancia = METAS_NT.GANANCIA_MINIMA_PCT / 100; // 0.07

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
  let result;

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
  result = escribirSeccionPresupuesto(sheet, row, '▶ INGRESOS FAMILIA', INGRESOS_FAMILIA, 'Ingreso', C.FAM_FONDO, C.FAM_SUBTOTAL);
  row = result.row;
  const filaSubtotalIngresosFam = result.filaSubtotal;

  // TOTAL INGRESOS FAMILIA
  sheet.getRange(row, 1).setValue('📥 TOTAL INGRESOS FAMILIA').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaSubtotalIngresosFam}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.VERDE_FONDO);
  const filaTotalIngresosFam = row;
  row += 2;

  // ─── EGRESOS FAMILIA ───
  const filasSubtotalesEgresosFam = [];

  result = escribirSeccionPresupuesto(sheet, row, '▶ GASTOS FIJOS', GASTOS_FIJOS_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ CUOTAS Y PRÉSTAMOS', CUOTAS_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ SUSCRIPCIONES', SUSCRIPCIONES_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ VARIABLES', VARIABLES_PRESUP_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ AHORRO', AHORRO_FAM, 'Egreso', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosFam.push(result.filaSubtotal);

  // TOTAL EGRESOS FAMILIA
  sheet.getRange(row, 1).setValue('📤 TOTAL EGRESOS FAMILIA').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    const sumaFilas = filasSubtotalesEgresosFam.map(f => `${colLetra}${f}`).join('+');
    sheet.getRange(row, col).setFormula(`=${sumaFilas}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.ROJO_FONDO);
  const filaTotalEgresosFam = row;
  row++;

  // BALANCE FAMILIA = Ingresos - Egresos
  sheet.getRange(row, 1).setValue('💰 BALANCE FAMILIA (Ingresos - Egresos)').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaTotalIngresosFam}-${colLetra}${filaTotalEgresosFam}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.GANANCIA_FONDO);
  const filaBalanceFam = row;
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
  result = escribirSeccionPresupuesto(sheet, row, '▶ INGRESOS NEUROTEA', INGRESOS_NT, 'Ingreso', C.NT_FONDO, C.NT_SUBTOTAL);
  row = result.row;
  const filaSubtotalIngresosNT = result.filaSubtotal;

  // TOTAL INGRESOS NT
  sheet.getRange(row, 1).setValue('📥 TOTAL INGRESOS NEUROTEA').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaSubtotalIngresosNT}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.VERDE_FONDO);
  const filaTotalIngresosNT = row;
  row += 2;

  // ─── EGRESOS NT ───
  const filasSubtotalesEgresosNT = [];

  result = escribirSeccionPresupuesto(sheet, row, '▶ CLÍNICA', CLINICA_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ SUELDOS Y HONORARIOS', SUELDOS_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ TELEFONÍA E INTERNET', TELEFONIA_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ OBLIGACIONES LEGALES', OBLIGACIONES_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  // EVENTOS NT (especial)
  result = escribirSeccionEventos(sheet, row, C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  result = escribirSeccionPresupuesto(sheet, row, '▶ VARIABLES', VARIABLES_PRESUP_NT, 'Egreso', C.NT_FONDO_ALT, C.NT_SUBTOTAL);
  row = result.row; filasSubtotalesEgresosNT.push(result.filaSubtotal);

  // TOTAL EGRESOS NT (sin ganancia)
  sheet.getRange(row, 1).setValue('📤 TOTAL EGRESOS NEUROTEA').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    const sumaFilas = filasSubtotalesEgresosNT.map(f => `${colLetra}${f}`).join('+');
    sheet.getRange(row, col).setFormula(`=${sumaFilas}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.ROJO_FONDO);
  const filaTotalEgresosNT = row;
  row += 2;

  // ═══════════════════════════════════════════════════════════════════
  // GANANCIA NT (CALCULADA AUTOMÁTICAMENTE)
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue(`▶ GANANCIA NEUROTEA (META ${METAS_NT.GANANCIA_MINIMA_PCT}%)`)
    .setFontWeight('bold').setBackground(C.GANANCIA_FONDO);
  row++;

  // Ganancia Calculada = Ingresos - Egresos
  sheet.getRange(row, 1).setValue('Ganancia Calculada').setFontWeight('bold');
  sheet.getRange(row, 2).setValue('Calculado');
  sheet.getRange(row, 3).setValue('-');
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaTotalIngresosNT}-${colLetra}${filaTotalEgresosNT}`);
  }
  const filaGananciaCalculada = row;
  row++;

  // % Ganancia = Ganancia / Ingresos
  sheet.getRange(row, 1).setValue('% Ganancia').setFontWeight('bold');
  sheet.getRange(row, 2).setValue('Calculado');
  sheet.getRange(row, 3).setValue('-');
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=IFERROR(${colLetra}${filaGananciaCalculada}/${colLetra}${filaTotalIngresosNT};0)`);
  }
  sheet.getRange(row, 4, 1, 13).setNumberFormat('0.00%');
  const filaPctGanancia = row;
  row++;

  // Semáforo de estado
  sheet.getRange(row, 1).setValue('Estado Meta').setFontWeight('bold');
  sheet.getRange(row, 2).setValue('Calculado');
  sheet.getRange(row, 3).setValue('-');
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    // Semáforo: <0% = Rojo (Pérdida), 0-7% = Amarillo, >=7% = Verde
    sheet.getRange(row, col).setFormula(
      `=IF(${colLetra}${filaPctGanancia}<0;"🔴 PÉRDIDA";IF(${colLetra}${filaPctGanancia}<${metaGanancia.toString().replace('.',',')};"🟡 <${METAS_NT.GANANCIA_MINIMA_PCT}%";"🟢 META"))`
    );
  }
  const filaEstadoMeta = row;
  row++;

  // Distribución de ganancia
  const distItems = [
    { nombre: `→ Utilidad al propietario (${METAS_NT.DIST_UTILIDAD_DUEÑO}%)`, pct: METAS_NT.DIST_UTILIDAD_DUEÑO / 100 },
    { nombre: `→ Fondo de emergencia (${METAS_NT.DIST_FONDO_EMERGENCIA}%)`, pct: METAS_NT.DIST_FONDO_EMERGENCIA / 100 },
    { nombre: `→ Fondo de Inversión (${METAS_NT.DIST_FONDO_INVERSION}%)`, pct: METAS_NT.DIST_FONDO_INVERSION / 100 }
  ];
  distItems.forEach(item => {
    sheet.getRange(row, 1).setValue(item.nombre).setFontStyle('italic');
    sheet.getRange(row, 2).setValue('Calculado');
    sheet.getRange(row, 3).setValue('-');
    for (let col = 4; col <= 16; col++) {
      const colLetra = String.fromCharCode(64 + col);
      // Solo distribuir si ganancia > 0
      sheet.getRange(row, col).setFormula(
        `=IF(${colLetra}${filaGananciaCalculada}>0;${colLetra}${filaGananciaCalculada}*${item.pct.toString().replace('.',',')};0)`
      );
    }
    row++;
  });
  row++;

  // BALANCE NT = Ingresos - Egresos (igual a Ganancia)
  sheet.getRange(row, 1).setValue('💰 BALANCE NEUROTEA').setFontWeight('bold').setFontSize(11);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaGananciaCalculada}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.GANANCIA_FONDO);
  const filaBalanceNT = row;
  row += 2;

  // BALANCE CONSOLIDADO FAM + NT
  sheet.getRange(row, 1).setValue('🔄 BALANCE TOTAL CONSOLIDADO FAM/NT').setFontWeight('bold').setFontSize(12);
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=${colLetra}${filaBalanceFam}+${colLetra}${filaBalanceNT}`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(C.BALANCE_FONDO);

  // ═══════════════════════════════════════════════════════════════════
  // FORMATO FINAL
  // ═══════════════════════════════════════════════════════════════════

  // Formato de números
  sheet.getRange('D:P').setNumberFormat('#,##0');

  // Restaurar formato % en fila de porcentaje
  sheet.getRange(filaPctGanancia, 4, 1, 13).setNumberFormat('0.00%');

  // Anchos de columna
  sheet.setColumnWidth(1, 300);
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

  const filaInicio = row; // Guardar fila inicio para subtotales

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
    }
    // Total año por fila (siempre, para que sume lo que el usuario ingrese)
    sheet.getRange(row, 16).setFormula(`=SUM(D${row}:O${row})`);
    row++;
  });

  const filaFin = row - 1;

  // Subtotal con fórmulas SUM() para cada columna
  sheet.getRange(row, 1).setValue('Subtotal ' + titulo.replace('▶ ', '')).setFontWeight('bold').setFontStyle('italic');
  // Fórmulas para meses (D-O) y total año (P)
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col); // D=68, E=69, etc.
    sheet.getRange(row, col).setFormula(`=SUM(${colLetra}${filaInicio}:${colLetra}${filaFin})`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  const filaSubtotal = row;
  row++;

  // Devolver objeto con fila siguiente y fila del subtotal (para totales)
  return { row: row, filaSubtotal: filaSubtotal };
}

function escribirSeccionEventos(sheet, row, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 16).merge()
    .setValue('▶ EVENTOS (6 definidos + 10 reservas)')
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;

  EVENTOS_NT.forEach(evento => {
    sheet.getRange(row, 1).setValue(evento.nombre);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue(evento.mes);
    sheet.getRange(row, 16).setFormula(`=SUM(D${row}:O${row})`);
    row++;
  });

  const filaFin = row - 1;

  // Subtotal con fórmulas SUM()
  sheet.getRange(row, 1).setValue('Subtotal EVENTOS').setFontWeight('bold').setFontStyle('italic');
  for (let col = 4; col <= 16; col++) {
    const colLetra = String.fromCharCode(64 + col);
    sheet.getRange(row, col).setFormula(`=SUM(${colLetra}${filaInicio}:${colLetra}${filaFin})`);
  }
  sheet.getRange(row, 1, 1, 16).setBackground(colorSubtotal);
  const filaSubtotal = row;
  row++;

  return { row: row, filaSubtotal: filaSubtotal };
}

// ═══════════════════════════════════════════════════════════════════════════════
// 3. HOJA GASTOS_FIJOS - Lista Maestra SIMPLIFICADA (sin BASE)
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaGASTOS_FIJOS() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.GASTOS_FIJOS);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  // Nueva estructura SIMPLIFICADA: 18 columnas (A-R) sin BASE
  sheet.getRange('A1:R1').merge()
    .setValue('📋 GASTOS FIJOS - LISTA MAESTRA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.HEADER_DARK).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');

  sheet.getRange('A2:R2').merge()
    .setValue('DÍA = día del mes que vence | CUENTA = cuenta desde donde se paga | Ingrese el monto en cada mes que corresponda')
    .setFontSize(10).setFontColor(C.TEXTO_CLARO).setFontStyle('italic');

  // ─── HEADERS DE COLUMNAS ───
  // Estructura SIMPLIFICADA: CONCEPTO, ENTIDAD, CATEGORÍA, FRECUENCIA, DÍA, CUENTA, ENE-DIC (sin BASE)
  const headers = ['CONCEPTO', 'ENTIDAD', 'CATEGORÍA', 'FRECUENCIA', 'DÍA', 'CUENTA', ...MESES_CORTOS];
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
    sheet.getRange(row, 6).setValue(gasto.cuenta || ''); // CUENTA (columna F)
    // Meses empiezan en columna G (sin BASE)
    // El monto inicial se pone en ENERO (columna G) si existe
    if (gasto.monto > 0) {
      sheet.getRange(row, 7).setValue(gasto.monto).setNumberFormat('#,##0'); // ENE
    }

    // Validación para CUENTA (columna F) - dropdown de cuentas FAMILIA
    sheet.getRange(row, 6).setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(CUENTAS_FAMILIA, true)
        .setAllowInvalid(false)
        .build()
    );

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
    sheet.getRange(row, 6).setValue(gasto.cuenta || ''); // CUENTA (columna F)
    // Meses empiezan en columna G (sin BASE)
    if (gasto.monto > 0) {
      sheet.getRange(row, 7).setValue(gasto.monto).setNumberFormat('#,##0'); // ENE
    }

    // Validación para CUENTA (columna F) - dropdown de cuentas NT
    sheet.getRange(row, 6).setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(CUENTAS_NT, true)
        .setAllowInvalid(false)
        .build()
    );

    if (!gasto.concepto.includes('Reserva')) {
      sheet.getRange(row, 1, 1, 18).setBackground(C.NT_FONDO_ALT);
    }
    row++;
  });

  // Formato de números (meses son G-R, sin BASE)
  sheet.getRange('G:R').setNumberFormat('#,##0');

  // Anchos de columna
  sheet.setColumnWidth(1, 250);  // CONCEPTO
  sheet.setColumnWidth(2, 90);   // ENTIDAD
  sheet.setColumnWidth(3, 150);  // CATEGORÍA
  sheet.setColumnWidth(4, 110);  // FRECUENCIA
  sheet.setColumnWidth(5, 50);   // DÍA
  sheet.setColumnWidth(6, 130);  // CUENTA
  for (let i = 7; i <= 18; i++) sheet.setColumnWidth(i, 85); // ENE-DIC

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

  // SUBCATEGORÍA (columna D) - incluye VARIABLES y AHORRO
  sheet.getRange('D4:D500').setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['-', ...VARIABLES_FAMILIA, ...AHORRO_FAMILIA], true)
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
// 6. HOJA MOVIMIENTO - Real vs Presupuesto (SIMPLIFICADO v5.1)
// Nueva estructura: Con DÍA y RESUMEN para TABLERO/LIQUIDEZ
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaMOVIMIENTO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.MOVIMIENTO);
  const C = COLORES;

  // ─── HEADER PRINCIPAL ───
  sheet.getRange('A1:L1').merge()
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

  // Número de mes calculado (oculto en M3)
  sheet.getRange('M3').setValue('MES_NUM:').setFontColor(C.TEXTO_CLARO);
  sheet.getRange('N3').setFormula('=MATCH(B3;{"Enero";"Febrero";"Marzo";"Abril";"Mayo";"Junio";"Julio";"Agosto";"Septiembre";"Octubre";"Noviembre";"Diciembre"};0)');

  sheet.getRange('D3').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E3').setFormula('=TODAY()').setNumberFormat('dd/mm/yyyy');

  // ─── HEADERS DE COLUMNAS (con DÍA) ───
  // A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
  const headers = ['CONCEPTO', 'TIPO', 'FREC.', 'DÍA', 'PRESUPUESTO', 'REAL', 'DIFERENCIA', '%', 'ESTADO', 'EST. PAGO', '🚦'];
  headers.forEach((h, i) => {
    sheet.getRange(5, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.GRIS_FONDO)
      .setHorizontalAlignment('center');
  });

  let row = 7;
  const filaInicioFam = 9; // Primera fila de datos FAMILIA

  // ═══════════════════════════════════════════════════════════════════
  // FAMILIA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 11).merge()
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
  row = escribirSeccionMovimientoAhorro(sheet, row, '▶ AHORRO', AHORRO_FAM, 'FAMILIA', C.FAM_FONDO_ALT, C.FAM_SUBTOTAL);

  const filaFinFam = row - 1;

  // ═══════════════════════════════════════════════════════════════════
  // RESUMEN FAMILIA (para que TABLERO y LIQUIDEZ lean directamente)
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 11).merge()
    .setValue('📊 RESUMEN FAMILIA')
    .setFontSize(11).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row++;

  // TOTAL INGRESOS FAMILIA
  sheet.getRange(row, 1).setValue('📥 TOTAL INGRESOS');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIF(B${filaInicioFam}:B${filaFinFam};"Ingreso";F${filaInicioFam}:F${filaFinFam});0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.VERDE_FONDO);
  const filaTotalIngresosFam = row;
  row++;

  // TOTAL EGRESOS PAGADOS
  sheet.getRange(row, 1).setValue('📤 TOTAL EGRESOS PAGADOS');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIFS(F${filaInicioFam}:F${filaFinFam};B${filaInicioFam}:B${filaFinFam};"Egreso";J${filaInicioFam}:J${filaFinFam};"Pagado")+SUMIFS(F${filaInicioFam}:F${filaFinFam};B${filaInicioFam}:B${filaFinFam};"Egreso";J${filaInicioFam}:J${filaFinFam};"Ahorrado");0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.ROJO_FONDO);
  const filaTotalEgresosPagadosFam = row;
  row++;

  // TOTAL EGRESOS PENDIENTES
  sheet.getRange(row, 1).setValue('⏳ TOTAL EGRESOS PENDIENTES');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIFS(F${filaInicioFam}:F${filaFinFam};B${filaInicioFam}:B${filaFinFam};"Egreso";J${filaInicioFam}:J${filaFinFam};"Pendiente");0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.AMARILLO_FONDO);
  const filaTotalEgresosPendientesFam = row;
  row++;

  // SALDO DISPONIBLE (Ingresos - Pagados)
  sheet.getRange(row, 1).setValue('💵 SALDO DISPONIBLE').setFontWeight('bold');
  sheet.getRange(row, 6).setFormula(`=F${filaTotalIngresosFam}-F${filaTotalEgresosPagadosFam}`).setFontWeight('bold');
  sheet.getRange(row, 9).setFormula(`=IF(F${row}>=0;"✓ OK";"⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.GANANCIA_FONDO);
  const filaSaldoDisponibleFam = row;
  row++;

  // SALDO PROYECTADO (Disponible - Pendientes)
  sheet.getRange(row, 1).setValue('📉 SALDO PROYECTADO').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 6).setFormula(`=F${filaSaldoDisponibleFam}-F${filaTotalEgresosPendientesFam}`).setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 9).setFormula(`=IF(F${row}>=0;"✓ OK";"⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.BALANCE_FONDO);
  const filaSaldoProyectadoFam = row;
  row += 3;

  const filaInicioNT = row + 2; // +2 por el header y la fila vacía

  // ═══════════════════════════════════════════════════════════════════
  // NEUROTEA
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 11).merge()
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

  const filaFinNT = row - 1;

  // ═══════════════════════════════════════════════════════════════════
  // RESUMEN NEUROTEA (para que TABLERO y LIQUIDEZ lean directamente)
  // ═══════════════════════════════════════════════════════════════════
  sheet.getRange(row, 1, 1, 11).merge()
    .setValue('📊 RESUMEN NEUROTEA')
    .setFontSize(11).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  row++;

  // TOTAL INGRESOS NT
  sheet.getRange(row, 1).setValue('📥 TOTAL INGRESOS');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIF(B${filaInicioNT}:B${filaFinNT};"Ingreso";F${filaInicioNT}:F${filaFinNT});0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.VERDE_FONDO);
  const filaTotalIngresosNT = row;
  row++;

  // TOTAL EGRESOS PAGADOS NT
  sheet.getRange(row, 1).setValue('📤 TOTAL EGRESOS PAGADOS');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIFS(F${filaInicioNT}:F${filaFinNT};B${filaInicioNT}:B${filaFinNT};"Egreso";J${filaInicioNT}:J${filaFinNT};"Pagado");0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.ROJO_FONDO);
  const filaTotalEgresosPagadosNT = row;
  row++;

  // TOTAL EGRESOS PENDIENTES NT
  sheet.getRange(row, 1).setValue('⏳ TOTAL EGRESOS PENDIENTES');
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUMIFS(F${filaInicioNT}:F${filaFinNT};B${filaInicioNT}:B${filaFinNT};"Egreso";J${filaInicioNT}:J${filaFinNT};"Pendiente");0)`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.AMARILLO_FONDO);
  const filaTotalEgresosPendientesNT = row;
  row++;

  // GANANCIA NT (Ingresos - Egresos)
  sheet.getRange(row, 1).setValue('📈 GANANCIA (META 7%)').setFontWeight('bold');
  sheet.getRange(row, 6).setFormula(`=F${filaTotalIngresosNT}-(F${filaTotalEgresosPagadosNT}+F${filaTotalEgresosPendientesNT})`).setFontWeight('bold');
  const filaGananciaNT = row;
  row++;

  // % Ganancia
  sheet.getRange(row, 1).setValue('  % Ganancia sobre Ingresos').setFontStyle('italic');
  sheet.getRange(row, 6).setFormula(`=IFERROR(IF(F${filaTotalIngresosNT}>0;F${filaGananciaNT}/F${filaTotalIngresosNT};0);0)`).setNumberFormat('0,00%');
  sheet.getRange(row, 9).setFormula(`=IF(F${row}>=0,07;"🟢 META";"🟡 <7%")`);
  row++;

  // Distribución de Ganancia (solo si > 0)
  sheet.getRange(row, 1).setValue('    → Utilidad Dueño (33.33%)').setFontStyle('italic').setFontColor(C.TEXTO_CLARO);
  sheet.getRange(row, 6).setFormula(`=IFERROR(IF(F${filaGananciaNT}>0;F${filaGananciaNT}*0,3333;0);0)`);
  row++;
  sheet.getRange(row, 1).setValue('    → Fondo Emergencia (33.33%)').setFontStyle('italic').setFontColor(C.TEXTO_CLARO);
  sheet.getRange(row, 6).setFormula(`=IFERROR(IF(F${filaGananciaNT}>0;F${filaGananciaNT}*0,3333;0);0)`);
  row++;
  sheet.getRange(row, 1).setValue('    → Fondo Inversión (33.34%)').setFontStyle('italic').setFontColor(C.TEXTO_CLARO);
  sheet.getRange(row, 6).setFormula(`=IFERROR(IF(F${filaGananciaNT}>0;F${filaGananciaNT}*0,3334;0);0)`);
  row++;

  // SALDO DISPONIBLE NT
  sheet.getRange(row, 1).setValue('💵 SALDO DISPONIBLE').setFontWeight('bold');
  sheet.getRange(row, 6).setFormula(`=F${filaTotalIngresosNT}-F${filaTotalEgresosPagadosNT}`).setFontWeight('bold');
  sheet.getRange(row, 9).setFormula(`=IF(F${row}>=0;"✓ OK";"⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.GANANCIA_FONDO);
  const filaSaldoDisponibleNT = row;
  row++;

  // SALDO PROYECTADO NT
  sheet.getRange(row, 1).setValue('📉 SALDO PROYECTADO').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 6).setFormula(`=F${filaSaldoDisponibleNT}-F${filaTotalEgresosPendientesNT}`).setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 9).setFormula(`=IF(F${row}>=0;"✓ OK";"⚠ DÉFICIT")`);
  sheet.getRange(row, 1, 1, 11).setBackground(C.BALANCE_FONDO);

  // Formato
  sheet.getRange('E:G').setNumberFormat('#,##0');
  sheet.getRange('H:H').setNumberFormat('0%');

  // Anchos (nueva estructura con DÍA)
  sheet.setColumnWidth(1, 280);   // CONCEPTO
  sheet.setColumnWidth(2, 70);    // TIPO
  sheet.setColumnWidth(3, 100);   // FREC
  sheet.setColumnWidth(4, 45);    // DÍA
  sheet.setColumnWidth(5, 110);   // PRESUPUESTO
  sheet.setColumnWidth(6, 110);   // REAL
  sheet.setColumnWidth(7, 100);   // DIFERENCIA
  sheet.setColumnWidth(8, 55);    // %
  sheet.setColumnWidth(9, 80);    // ESTADO
  sheet.setColumnWidth(10, 90);   // EST. PAGO
  sheet.setColumnWidth(11, 45);   // 🚦

  // Ocultar columnas M y N (MES_NUM)
  sheet.hideColumns(13, 2);

  // Formato condicional para ESTADO
  aplicarFormatoCondicionalMovimiento(sheet);

  sheet.setFrozenRows(5);

  return sheet;
}

// ─── SECCIÓN INGRESOS (Variables puros - vienen de CARGA) ───
// Nueva estructura: A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
function escribirSeccionMovimientoIngresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 11).merge()
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
    sheet.getRange(row, 4).setValue(0).setHorizontalAlignment('center'); // DÍA (ingresos no tienen)

    // PRESUPUESTO (col E): Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("${item.concepto}";PRESUPUESTO!$A:$A;0);$N$3);0)`;
    sheet.getRange(row, 5).setFormula(formulaPresup);

    // REAL (col F): SUMPRODUCT desde CARGA según tipo y mes
    const formulaReal = `=IFERROR(SUMPRODUCT((${hojaCarga}!$B$4:$B$500="${item.concepto}")*(MONTH(${hojaCarga}!$A$4:$A$500)=$N$3)*(YEAR(${hojaCarga}!$A$4:$A$500)=${AÑO})*(${hojaCarga}!$F$4:$F$500));0)`;
    sheet.getRange(row, 6).setFormula(formulaReal);

    // DIFERENCIA (col G)
    sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);

    // % (col H)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);

    // ESTADO (col I) - Ingreso: positivo es bueno
    sheet.getRange(row, 9).setFormula(`=IF(F${row}>=E${row};"✓";"⚠")`);

    // EST. PAGO (col J): Ingresos de CARGA ya están RECIBIDOS (sin dropdown)
    sheet.getRange(row, 10).setValue('Recibido')
      .setFontStyle('italic')
      .setFontColor('#6B7280');

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin});0)`);
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUM(F${filaInicio}:F${filaFin});0)`);
  sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);
  sheet.getRange(row, 1, 1, 11).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EGRESOS FIJOS (vienen de GASTOS_FIJOS) ───
// Nueva estructura: A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
// GASTOS_FIJOS simplificado: A=Concepto, B=Entidad, C=Categoría, D=Frecuencia, E=Día, F=Cuenta, G-R=Meses (sin BASE)
function escribirSeccionMovimientoEgresos(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 11).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;

  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue(item.frecuencia);

    // DÍA (col D): Trae de GASTOS_FIJOS columna E
    const formulaDia = `=IFERROR(INDEX(GASTOS_FIJOS!$E:$E;MATCH("${item.concepto}";GASTOS_FIJOS!$A:$A;0));0)`;
    sheet.getRange(row, 4).setFormula(formulaDia).setHorizontalAlignment('center');

    // PRESUPUESTO (col E): Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("${item.concepto}";PRESUPUESTO!$A:$A;0);$N$3);0)`;
    sheet.getRange(row, 5).setFormula(formulaPresup);

    // REAL (col F): Busca en GASTOS_FIJOS directamente (G-R son ENE-DIC, sin BASE)
    // Estructura simplificada: columnas G a R son los meses
    const formulaReal = `=IFERROR(INDEX(GASTOS_FIJOS!$G:$R;MATCH("${item.concepto}";GASTOS_FIJOS!$A:$A;0);$N$3);0)`;
    sheet.getRange(row, 6).setFormula(formulaReal);

    // DIFERENCIA (col G)
    sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);

    // % (col H)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);

    // ESTADO (col I) - Egreso: gastar menos es bueno
    sheet.getRange(row, 9).setFormula(`=IF(F${row}<=E${row};"✓";"⚠")`);

    // ESTADO PAGO (col J) - dropdown, por defecto "Pendiente"
    sheet.getRange(row, 10).setValue('Pendiente').setDataValidation(
      SpreadsheetApp.newDataValidation()
        .requireValueInList(ESTADOS, true)
        .build()
    );

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin});0)`);
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUM(F${filaInicio}:F${filaFin});0)`);
  sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);
  sheet.getRange(row, 1, 1, 11).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN VARIABLES PUROS (vienen de CARGA) ───
// Nueva estructura: A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
function escribirSeccionMovimientoVariables(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 11).merge()
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
    sheet.getRange(row, 4).setValue(0).setHorizontalAlignment('center'); // DÍA (variables no tienen)

    // PRESUPUESTO (col E): Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("${item.concepto}";PRESUPUESTO!$A:$A;0);$N$3);0)`;
    sheet.getRange(row, 5).setFormula(formulaPresup);

    // REAL (col F): SUMPRODUCT desde CARGA según subcategoría y mes
    const formulaReal = `=IFERROR(SUMPRODUCT((${hojaCarga}!$D$4:$D$500="${item.concepto}")*(MONTH(${hojaCarga}!$A$4:$A$500)=$N$3)*(YEAR(${hojaCarga}!$A$4:$A$500)=${AÑO})*(${hojaCarga}!$F$4:$F$500));0)`;
    sheet.getRange(row, 6).setFormula(formulaReal);

    // DIFERENCIA (col G)
    sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);

    // % (col H)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);

    // ESTADO (col I) - Egreso: gastar menos es bueno
    sheet.getRange(row, 9).setFormula(`=IF(F${row}<=E${row};"✓";"⚠")`);

    // EST. PAGO (col J): Variables de CARGA ya están PAGADOS (sin dropdown)
    sheet.getRange(row, 10).setValue('Pagado')
      .setFontStyle('italic')
      .setFontColor('#6B7280');

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin});0)`);
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUM(F${filaInicio}:F${filaFin});0)`);
  sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);
  sheet.getRange(row, 1, 1, 11).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN AHORRO (viene de CARGA, EST.PAGO = "Ahorrado") ───
// Nueva estructura: A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
function escribirSeccionMovimientoAhorro(sheet, row, titulo, items, entidad, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 11).merge()
    .setValue(titulo)
    .setFontWeight('bold')
    .setBackground(colorFondo);
  row++;

  const filaInicio = row;
  const hojaCarga = entidad === 'FAMILIA' ? 'CARGA_FAMILIA' : 'CARGA_NT';

  items.forEach(item => {
    sheet.getRange(row, 1).setValue(item.concepto);
    sheet.getRange(row, 2).setValue('Egreso');
    sheet.getRange(row, 3).setValue(item.frecuencia || 'Variable/Mensual');
    sheet.getRange(row, 4).setValue(0).setHorizontalAlignment('center'); // DÍA (ahorro no tiene)

    // PRESUPUESTO (col E): Busca en hoja PRESUPUESTO según mes seleccionado
    const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("${item.concepto}";PRESUPUESTO!$A:$A;0);$N$3);0)`;
    sheet.getRange(row, 5).setFormula(formulaPresup);

    // REAL (col F): SUMPRODUCT desde CARGA según subcategoría y mes
    const formulaReal = `=IFERROR(SUMPRODUCT((${hojaCarga}!$D$4:$D$500="${item.concepto}")*(MONTH(${hojaCarga}!$A$4:$A$500)=$N$3)*(YEAR(${hojaCarga}!$A$4:$A$500)=${AÑO})*(${hojaCarga}!$F$4:$F$500));0)`;
    sheet.getRange(row, 6).setFormula(formulaReal);

    // DIFERENCIA (col G)
    sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);

    // % (col H)
    sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);

    // ESTADO (col I): Ahorro: ahorrar MÁS es bueno, verde si real >= presupuesto
    sheet.getRange(row, 9).setFormula(`=IF(F${row}>=E${row};"✓";"⚠")`);

    // EST. PAGO (col J): Ahorro viene de CARGA = ya está "Ahorrado" (sin dropdown)
    sheet.getRange(row, 10).setValue('Ahorrado')
      .setFontStyle('italic')
      .setFontColor('#059669'); // Verde para ahorro

    row++;
  });

  // Subtotal
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin});0)`);
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUM(F${filaInicio}:F${filaFin});0)`);
  sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);
  sheet.getRange(row, 1, 1, 11).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── SECCIÓN EVENTOS NT ───
// Nueva estructura: A=CONCEPTO, B=TIPO, C=FREC, D=DÍA, E=PRESUP, F=REAL, G=DIF, H=%, I=ESTADO, J=EST.PAGO, K=🚦
function escribirSeccionMovimientoEventos(sheet, row, colorFondo, colorSubtotal) {
  sheet.getRange(row, 1, 1, 11).merge()
    .setValue('▶ EVENTOS')
    .setFontWeight('bold').setBackground(colorFondo);
  row++;

  const filaInicio = row;

  EVENTOS_NT.forEach(evento => {
    if (!evento.nombre.includes('Reserva')) {
      sheet.getRange(row, 1).setValue(evento.nombre);
      sheet.getRange(row, 2).setValue('Egreso');
      sheet.getRange(row, 3).setValue('Variable');
      sheet.getRange(row, 4).setValue(0).setHorizontalAlignment('center'); // DÍA (eventos no tienen)

      // PRESUPUESTO (col E): Busca en hoja PRESUPUESTO
      const formulaPresup = `=IFERROR(INDEX(PRESUPUESTO!$D:$O;MATCH("${evento.nombre}";PRESUPUESTO!$A:$A;0);$N$3);0)`;
      sheet.getRange(row, 5).setFormula(formulaPresup);

      // REAL (col F): SUMPRODUCT desde CARGA_NT según evento y mes
      const formulaReal = `=IFERROR(SUMPRODUCT((CARGA_NT!$D$4:$D$500="${evento.nombre}")*(MONTH(CARGA_NT!$A$4:$A$500)=$N$3)*(YEAR(CARGA_NT!$A$4:$A$500)=${AÑO})*(CARGA_NT!$F$4:$F$500));0)`;
      sheet.getRange(row, 6).setFormula(formulaReal);

      // DIFERENCIA (col G)
      sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);

      // % (col H)
      sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);

      // ESTADO (col I)
      sheet.getRange(row, 9).setFormula(`=IF(F${row}<=E${row};"✓";"⚠")`);

      // EST. PAGO (col J): Eventos de CARGA ya están PAGADOS (sin dropdown)
      sheet.getRange(row, 10).setValue('Pagado')
        .setFontStyle('italic')
        .setFontColor('#6B7280');

      row++;
    }
  });

  // Subtotal Eventos
  const filaFin = row - 1;
  sheet.getRange(row, 1).setValue('Subtotal Eventos').setFontWeight('bold').setFontStyle('italic');
  sheet.getRange(row, 5).setFormula(`=IFERROR(SUM(E${filaInicio}:E${filaFin});0)`);
  sheet.getRange(row, 6).setFormula(`=IFERROR(SUM(F${filaInicio}:F${filaFin});0)`);
  sheet.getRange(row, 7).setFormula(`=F${row}-E${row}`);
  sheet.getRange(row, 8).setFormula(`=IF(E${row}=0;0;F${row}/E${row})`);
  sheet.getRange(row, 1, 1, 11).setBackground(colorSubtotal);
  row++;

  return row;
}

// ─── FORMATO CONDICIONAL MOVIMIENTO ───
// Nueva estructura columnas: I=ESTADO, G=DIFERENCIA, J=EST.PAGO
function aplicarFormatoCondicionalMovimiento(sheet) {
  const C = COLORES;

  // Estado ✓ = Verde (columna I)
  const reglaOK = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('✓')
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('I:I')])
    .build();

  // Estado ⚠ = Rojo (columna I)
  const reglaAlerta = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('⚠')
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('I:I')])
    .build();

  // ═══════════════════════════════════════════════════════════════════
  // COLORES DIFERENCIA (columna G) - Sensible al contexto INGRESO vs EGRESO
  // ═══════════════════════════════════════════════════════════════════

  // INGRESOS: Positivo (+) = VERDE (recibiste más = bueno)
  const reglaDifIngresoPos = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Ingreso";$G1>0)')
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('G:G')])
    .build();

  // INGRESOS: Negativo (-) = ROJO (recibiste menos = malo)
  const reglaDifIngresoNeg = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Ingreso";$G1<0)')
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('G:G')])
    .build();

  // EGRESOS: Positivo (+) = ROJO (gastaste más = malo)
  const reglaDifEgresoPos = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Egreso";$G1>0)')
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange('G:G')])
    .build();

  // EGRESOS: Negativo (-) = VERDE (gastaste menos = bueno)
  const reglaDifEgresoNeg = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied('=AND($B1="Egreso";$G1<0)')
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('G:G')])
    .build();

  // EST. PAGO colores (columna J)
  const reglaPagado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pagado')
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange('J:J')])
    .build();

  const reglaPendiente = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Pendiente')
    .setBackground(C.AMARILLO_FONDO)
    .setFontColor(C.AMARILLO)
    .setRanges([sheet.getRange('J:J')])
    .build();

  const reglaCancelado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Cancelado')
    .setBackground(C.GRIS_FONDO)
    .setFontColor(C.TEXTO_CLARO)
    .setRanges([sheet.getRange('J:J')])
    .build();

  // Ahorrado = Verde especial (columna J)
  const reglaAhorrado = SpreadsheetApp.newConditionalFormatRule()
    .whenTextEqualTo('Ahorrado')
    .setBackground(C.VERDE_FONDO)
    .setFontColor('#059669')
    .setRanges([sheet.getRange('J:J')])
    .build();

  sheet.setConditionalFormatRules([
    reglaOK, reglaAlerta,
    reglaDifIngresoPos, reglaDifIngresoNeg,
    reglaDifEgresoPos, reglaDifEgresoNeg,
    reglaPagado, reglaPendiente, reglaCancelado, reglaAhorrado
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

  // DISPONIBLE ACTUAL FAMILIA (calculado: Ingresos recibidos - Egresos pagados)
  // Muestra el dinero disponible HOY para pagar compromisos
  sheet.getRange(row, 1).setValue('💵 DISPONIBLE ACTUAL')
    .setFontWeight('bold').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 2).setValue('-').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  // Fórmula: Ingresos del mes - Egresos pagados del mes
  sheet.getRange(row, 4)
    .setFormula('=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$B$4:$B$500<>"Egreso Familiar")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500))-SUMIFS(MOVIMIENTO!$F$9:$F$70;MOVIMIENTO!$B$9:$B$70;"Egreso";MOVIMIENTO!$J$9:$J$70;"Pagado");0)')
    .setNumberFormat('#,##0')
    .setFontColor(C.NT_HEADER).setFontWeight('bold')
    .setBackground(C.FAM_FONDO)
    .setHorizontalAlignment('right');
  sheet.getRange(row, 5).setValue('Calculado')
    .setFontStyle('italic').setHorizontalAlignment('center').setBackground(C.FAM_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.FAM_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaDispFam = row;
  row++;

  // 🔴 ATRASADOS FAMILIA (DÍA < HOY, solo gastos con DÍA > 0)
  // Fórmula SIMPLIFICADA: lee DÍA desde MOVIMIENTO!D (no INDEX/MATCH desde GASTOS_FIJOS)
  // J=EST.PAGO, B=TIPO, D=DÍA, F=REAL
  sheet.getRange(row, 1).setValue('🔴 Atrasados (vencidos)')
    .setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70<DAY(TODAY()))*(MOVIMIENTO!$F$9:$F$70));0)')
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
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70>=DAY(TODAY()))*(MOVIMIENTO!$D$9:$D$70<=DAY(TODAY())+7)*(MOVIMIENTO!$F$9:$F$70));0)')
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
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70>DAY(TODAY())+7)*(MOVIMIENTO!$D$9:$D$70<=DAY(TODAY())+14)*(MOVIMIENTO!$F$9:$F$70));0)')
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

  // DISPONIBLE ACTUAL NT (calculado: Ingresos recibidos - Egresos pagados)
  // Muestra el dinero disponible HOY para pagar compromisos
  sheet.getRange(row, 1).setValue('💵 DISPONIBLE ACTUAL')
    .setFontWeight('bold').setBackground(C.NT_FONDO);
  sheet.getRange(row, 2).setValue('-').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  sheet.getRange(row, 3).setValue('-').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  // Fórmula: Ingresos del mes - Egresos pagados del mes (rango NT: filas 73-150)
  sheet.getRange(row, 4)
    .setFormula('=IFERROR(SUMIF(MOVIMIENTO!$B$73:$B$150;"Ingreso";MOVIMIENTO!$F$73:$F$150)-SUMIFS(MOVIMIENTO!$F$73:$F$150;MOVIMIENTO!$B$73:$B$150;"Egreso";MOVIMIENTO!$J$73:$J$150;"Pagado");0)')
    .setNumberFormat('#,##0')
    .setFontColor(C.NT_HEADER).setFontWeight('bold')
    .setBackground(C.NT_FONDO)
    .setHorizontalAlignment('right');
  sheet.getRange(row, 5).setValue('Calculado')
    .setFontStyle('italic').setHorizontalAlignment('center').setBackground(C.NT_FONDO);
  sheet.getRange(row, 1, 1, 5).setBorder(true, true, true, true, false, false, C.NT_BORDER, SpreadsheetApp.BorderStyle.SOLID);
  const filaDispNT = row;
  row++;

  // 🔴 ATRASADOS NT (DÍA < HOY, solo gastos con DÍA > 0) - Rango NT: filas 73-150
  // Fórmula SIMPLIFICADA: lee DÍA desde MOVIMIENTO!D (no INDEX/MATCH desde GASTOS_FIJOS)
  // J=EST.PAGO, B=TIPO, D=DÍA, F=REAL
  sheet.getRange(row, 1).setValue('🔴 Atrasados (vencidos)')
    .setFontWeight('bold').setBackground(C.ROJO_FONDO);
  sheet.getRange(row, 2)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$73:$J$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(MOVIMIENTO!$D$73:$D$150>0)*(MOVIMIENTO!$D$73:$D$150<DAY(TODAY()))*(MOVIMIENTO!$F$73:$F$150));0)')
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
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$73:$J$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(MOVIMIENTO!$D$73:$D$150>0)*(MOVIMIENTO!$D$73:$D$150>=DAY(TODAY()))*(MOVIMIENTO!$D$73:$D$150<=DAY(TODAY())+7)*(MOVIMIENTO!$F$73:$F$150));0)')
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
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$73:$J$150="Pendiente")*(MOVIMIENTO!$B$73:$B$150="Egreso")*(MOVIMIENTO!$D$73:$D$150>0)*(MOVIMIENTO!$D$73:$D$150>DAY(TODAY())+7)*(MOVIMIENTO!$D$73:$D$150<=DAY(TODAY())+14)*(MOVIMIENTO!$F$73:$F$150));0)')
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
