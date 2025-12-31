/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TABLERO.GS - HOJA TABLERO (Dashboard en Google Sheets)
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// 7. HOJA TABLERO - Dashboard KPIs Profesional
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaTABLERO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.TABLERO);
  const C = COLORES;

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════
  sheet.getRange('A1:O1').merge()
    .setValue('📊 TABLERO DE CONTROL FINANCIERO ' + AÑO)
    .setFontSize(20).setFontWeight('bold')
    .setBackground('#1e40af')
    .setFontColor(C.BLANCO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 50);

  // Selector de mes y fecha
  sheet.getRange('A2').setValue('📅 Mes:').setFontWeight('bold');
  sheet.getRange('B2').setValue('Enero ' + AÑO).setBackground(C.GANANCIA_FONDO).setFontWeight('bold');
  sheet.getRange('D2').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E2').setValue(new Date()).setNumberFormat('dd/mm/yyyy').setFontWeight('bold');

  sheet.getRange('A2:O2').setBackground(C.GRIS_FONDO);

  // ═══════════════════════════════════════════════════════════════════════════
  // COLUMNA FAMILIA (A-G)
  // ═══════════════════════════════════════════════════════════════════════════
  let rowFam = 4;

  // Header FAMILIA
  sheet.getRange(rowFam, 1, 1, 7).merge()
    .setValue('🏠 FAMILIA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.FAM_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  sheet.setRowHeight(rowFam, 40);
  rowFam += 2;

  // ─── SALDOS EN CUENTAS FAMILIA ───
  sheet.getRange(rowFam, 1, 1, 4).merge()
    .setValue('💰 SALDOS EN CUENTAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  // Headers
  ['Cuenta', 'Esperado', 'Real ✏️', 'Diferencia'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : 'right');
  });
  rowFam++;

  // Cuentas
  CUENTAS_FAMILIA.forEach(cuenta => {
    sheet.getRange(rowFam, 1).setValue(cuenta);
    sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0'); // Esperado
    sheet.getRange(rowFam, 3).setValue(0).setNumberFormat('#,##0').setFontColor('#3b82f6').setFontWeight('bold'); // Real
    sheet.getRange(rowFam, 4).setFormula(`=C${rowFam}-B${rowFam}`).setNumberFormat('#,##0'); // Diferencia
    rowFam++;
  });

  sheet.getRange(rowFam - 10, 4, 10, 1).setFontWeight('bold');
  rowFam++;

  // ─── PRESUPUESTO vs REAL FAMILIA ───
  sheet.getRange(rowFam, 1, 1, 4).merge()
    .setValue('📋 PRESUPUESTO vs REAL')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  ['Categoría', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'));
  });
  rowFam++;

  const categsFam = [
    '► INGRESOS FAMILIA',
    '► GASTOS FIJOS',
    '► CUOTAS Y PRÉSTAMOS',
    '► OBLIGACIONES LEGALES',
    '► SUSCRIPCIONES',
    '► VARIABLES',
    '► AHORRO'
  ];

  const filaInicioCategFam = rowFam;
  categsFam.forEach((cat, i) => {
    sheet.getRange(rowFam, 1).setValue(cat).setFontWeight('bold');
    sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0');
    sheet.getRange(rowFam, 3).setValue(0).setNumberFormat('#,##0');
    sheet.getRange(rowFam, 4).setValue(i === 0 ? '100%' : '0%')
      .setHorizontalAlignment('center')
      .setBackground(i === 0 ? C.VERDE_FONDO : C.GRIS_FONDO)
      .setFontWeight('bold')
      .setFontSize(10);
    rowFam++;
  });

  // Balance Familia
  sheet.getRange(rowFam, 1).setValue('BALANCE FAMILIA').setFontWeight('bold');
  sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 3).setValue(0).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 4).setValue('DÉFICIT')
    .setHorizontalAlignment('center')
    .setBackground(C.ROJO)
    .setFontColor(C.BLANCO)
    .setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.FAM_SUBTOTAL);
  rowFam += 2;

  // ─── FLUJO DEL MES FAMILIA ───
  sheet.getRange(rowFam, 1, 1, 2).merge()
    .setValue('💵 FLUJO DEL MES')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  // Ingresos
  sheet.getRange(rowFam, 1).setValue('Ingresos');
  sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('+ #,##0').setFontColor(C.VERDE).setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 2).setBackground(C.VERDE_FONDO);
  rowFam++;

  // Egresos Pagados
  sheet.getRange(rowFam, 1).setValue('Egresos Pagados');
  sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('- #,##0').setFontColor(C.ROJO).setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 2).setBackground(C.ROJO_FONDO);
  rowFam++;

  // Egresos Pendientes
  sheet.getRange(rowFam, 1).setValue('Egresos Pendientes');
  sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('- #,##0').setFontColor(C.AMARILLO).setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 2).setBackground(C.AMARILLO_FONDO);
  rowFam++;

  // Balance
  sheet.getRange(rowFam, 1).setValue('BALANCE').setFontWeight('bold');
  sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 2).setBackground(C.FAM_HEADER).setFontColor(C.BLANCO);
  rowFam += 2;

  // ─── LIQUIDEZ FAMILIA ───
  sheet.getRange(rowFam, 1, 1, 5).merge()
    .setValue('📅 LIQUIDEZ - PRÓXIMOS PAGOS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  ['Concepto', 'Cuotas', 'Monto', 'Saldo', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : 'center');
  });
  rowFam++;

  const liquidezItems = [
    { concepto: 'Caja disponible', cuotas: '-', monto: '-', saldo: 0, estado: '-', bg: C.FAM_FONDO },
    { concepto: '⚠️ Atrasados', cuotas: 0, monto: 0, saldo: 0, estado: 'PAGAR', bg: C.ROJO_FONDO },
    { concepto: 'Esta semana', cuotas: 0, monto: 0, saldo: 0, estado: 'FALTA', bg: C.BLANCO },
    { concepto: 'Próxima semana', cuotas: 0, monto: 0, saldo: 0, estado: 'FALTA', bg: C.BLANCO },
    { concepto: '3ra semana', cuotas: 0, monto: 0, saldo: 0, estado: 'FALTA', bg: C.BLANCO },
    { concepto: 'SALDO FINAL', cuotas: 0, monto: 0, saldo: 0, estado: 'DÉFICIT', bg: C.GRIS_FONDO }
  ];

  liquidezItems.forEach((item, i) => {
    sheet.getRange(rowFam, 1).setValue(item.concepto).setFontWeight(i === 5 ? 'bold' : 'normal');
    sheet.getRange(rowFam, 2).setValue(item.cuotas).setHorizontalAlignment('center').setFontWeight('bold');
    sheet.getRange(rowFam, 3).setValue(item.monto === '-' ? '-' : item.monto).setNumberFormat(item.monto === '-' ? '@' : '#,##0').setHorizontalAlignment('right');
    sheet.getRange(rowFam, 4).setValue(item.saldo).setNumberFormat('#,##0').setHorizontalAlignment('right').setFontWeight('bold');
    sheet.getRange(rowFam, 5).setValue(item.estado)
      .setHorizontalAlignment('center')
      .setBackground(item.estado === 'PAGAR' || item.estado === 'FALTA' || item.estado === 'DÉFICIT' ? C.ROJO : (item.estado === '-' ? C.GRIS_FONDO : C.VERDE))
      .setFontColor(item.estado === '-' ? C.TEXTO : C.BLANCO)
      .setFontWeight('bold')
      .setFontSize(9);
    sheet.getRange(rowFam, 1, 1, 5).setBackground(item.bg);
    rowFam++;
  });

  // ═══════════════════════════════════════════════════════════════════════════
  // COLUMNA NEUROTEA (H-O)
  // ═══════════════════════════════════════════════════════════════════════════
  let rowNT = 4;
  const colNT = 9; // Columna I

  // Header NEUROTEA
  sheet.getRange(rowNT, colNT, 1, 7).merge()
    .setValue('🏥 NEUROTEA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  rowNT += 2;

  // ─── INDICADORES DE METAS ───
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('🎯 INDICADORES DE METAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  // KPIs en grid 2x2
  sheet.getRange(rowNT, colNT).setValue('INGRESOS DEL MES').setFontSize(9).setFontColor(C.NT_HEADER);
  sheet.getRange(rowNT, colNT + 1).setValue(30000000).setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.NT_HEADER);
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.NT_FONDO);

  sheet.getRange(rowNT, colNT + 2).setValue('GASTOS DEL MES').setFontSize(9).setFontColor(C.TEXTO);
  sheet.getRange(rowNT, colNT + 3).setValue(27300000).setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 2, 1, 2).setBackground(C.GRIS_FONDO);
  rowNT++;

  sheet.getRange(rowNT, colNT).setValue('GANANCIA REAL').setFontSize(9).setFontColor(C.VERDE);
  sheet.getRange(rowNT, colNT + 1).setValue(2700000).setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.VERDE);
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.VERDE_FONDO);

  sheet.getRange(rowNT, colNT + 2).setValue('META 7%').setFontSize(9).setFontColor(C.GANANCIA);
  sheet.getRange(rowNT, colNT + 3).setValue(2100000).setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.GANANCIA);
  sheet.getRange(rowNT, colNT + 2, 1, 2).setBackground(C.GANANCIA_FONDO);
  rowNT++;

  // Barra de progreso (simulada con texto)
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('% Gastos sobre Ingresos: 91% / 93% máx')
    .setHorizontalAlignment('center')
    .setBackground('#e0f2fe')
    .setFontSize(10);
  rowNT++;

  // Estado meta
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('✅ META CUMPLIDA - Superávit: 600.000')
    .setHorizontalAlignment('center')
    .setBackground(C.VERDE_FONDO)
    .setFontWeight('bold')
    .setFontColor(C.VERDE);
  rowNT++;

  // Distribución ganancia
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('Distribución de Ganancia (7% = 2.100.000)')
    .setFontWeight('bold')
    .setFontSize(10)
    .setBackground(C.NT_FONDO);
  rowNT++;

  // 3 fondos
  const fondos = [
    { nombre: 'Utilidad Dueño', meta: 700000, real: 580000, color: '#f3e8ff' },
    { nombre: 'Fondo Emerg.', meta: 700000, real: 700000, color: '#ffedd5' },
    { nombre: 'Fondo Inversión', meta: 700000, real: 420000, color: '#cffafe' }
  ];

  fondos.forEach((fondo, i) => {
    const col = colNT + (i === 0 ? 0 : (i === 1 ? 1 : 3));
    sheet.getRange(rowNT, col).setValue(fondo.nombre).setFontSize(9).setBackground(fondo.color);
    sheet.getRange(rowNT + 1, col).setValue(fondo.meta).setNumberFormat('#,##0').setFontWeight('bold').setBackground(fondo.color);
    sheet.getRange(rowNT + 2, col).setValue((fondo.real >= fondo.meta ? '✓ ' : '⚠ ') + fondo.real.toLocaleString())
      .setFontSize(9)
      .setFontColor(fondo.real >= fondo.meta ? C.VERDE : C.AMARILLO)
      .setBackground(fondo.color);
  });
  rowNT += 4;

  // ─── SALDOS EN CUENTAS NT ───
  sheet.getRange(rowNT, colNT, 1, 3).merge()
    .setValue('💰 SALDOS EN CUENTAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  ['Cuenta', 'Mes', 'Acumulado'].forEach((h, i) => {
    sheet.getRange(rowNT, colNT + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.NT_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : 'right');
  });
  rowNT++;

  const cuentasNTData = [
    { cuenta: 'Atlas NeuroTEA ✏️', mes: 8500000, acum: '-' },
    { cuenta: 'Costos Operativos', mes: 22800000, acum: 22800000 },
    { cuenta: 'Utilidad del Dueño', mes: 580000, acum: 580000 },
    { cuenta: 'Fondo Emergencia', mes: 700000, acum: 2100000 },
    { cuenta: 'Fondo Inversión', mes: 420000, acum: 1260000 }
  ];

  cuentasNTData.forEach(c => {
    sheet.getRange(rowNT, colNT).setValue(c.cuenta).setFontWeight(c.cuenta.includes('Atlas') ? 'bold' : 'normal');
    sheet.getRange(rowNT, colNT + 1).setValue(c.mes).setNumberFormat('#,##0').setFontColor(c.cuenta.includes('Atlas') ? '#3b82f6' : C.TEXTO).setFontWeight(c.cuenta.includes('Atlas') ? 'bold' : 'normal');
    sheet.getRange(rowNT, colNT + 2).setValue(c.acum === '-' ? '-' : c.acum).setNumberFormat(c.acum === '-' ? '@' : '#,##0').setFontColor(C.TEXTO_CLARO);
    rowNT++;
  });
  rowNT++;

  // ─── PRESUPUESTO vs REAL NT ───
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('📋 PRESUPUESTO vs REAL')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  ['Categoría', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowNT, colNT + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.NT_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'));
  });
  rowNT++;

  const categsNT = [
    { cat: '► INGRESOS NT', pres: 30000000, real: 30000000, pct: '100%', ok: true },
    { cat: '► CLÍNICA', pres: 17630000, real: 17630000, pct: '100%', ok: true },
    { cat: '► SUELDOS Y HONORARIOS', pres: 9600000, real: 9300000, pct: '97%', ok: true },
    { cat: '► TELEFONÍA E INTERNET', pres: 550000, real: 550000, pct: '100%', ok: true },
    { cat: '► OBLIGACIONES LEGALES', pres: 2300000, real: 1850000, pct: '80%', ok: true },
    { cat: '► EVENTOS', pres: 0, real: 0, pct: '-', ok: true },
    { cat: '► VARIABLES', pres: 450000, real: 670000, pct: '149%', ok: false },
    { cat: '► GANANCIA (7%)', pres: 2100000, real: 2700000, pct: '129%', ok: true }
  ];

  categsNT.forEach(c => {
    sheet.getRange(rowNT, colNT).setValue(c.cat).setFontWeight('bold');
    sheet.getRange(rowNT, colNT + 1).setValue(c.pres).setNumberFormat('#,##0');
    sheet.getRange(rowNT, colNT + 2).setValue(c.real).setNumberFormat('#,##0');
    sheet.getRange(rowNT, colNT + 3).setValue(c.pct)
      .setHorizontalAlignment('center')
      .setBackground(c.ok ? C.VERDE_FONDO : C.ROJO_FONDO)
      .setFontWeight('bold')
      .setFontSize(10);
    rowNT++;
  });

  // Balance NT
  sheet.getRange(rowNT, colNT).setValue('BALANCE NEUROTEA').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 1).setValue(-530000).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 2).setValue(2700000).setNumberFormat('#,##0').setFontWeight('bold').setFontColor(C.VERDE);
  sheet.getRange(rowNT, colNT + 3).setValue('SUPERÁVIT')
    .setHorizontalAlignment('center')
    .setBackground(C.VERDE)
    .setFontColor(C.BLANCO)
    .setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 4).setBackground(C.NT_SUBTOTAL);
  rowNT += 2;

  // ─── FLUJO DEL MES NT ───
  sheet.getRange(rowNT, colNT, 1, 2).merge()
    .setValue('💵 FLUJO DEL MES')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  sheet.getRange(rowNT, colNT).setValue('Ingresos');
  sheet.getRange(rowNT, colNT + 1).setValue(30000000).setNumberFormat('+ #,##0').setFontColor(C.VERDE).setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.VERDE_FONDO);
  rowNT++;

  sheet.getRange(rowNT, colNT).setValue('Egresos Pagados');
  sheet.getRange(rowNT, colNT + 1).setValue(24500000).setNumberFormat('- #,##0').setFontColor(C.ROJO).setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.ROJO_FONDO);
  rowNT++;

  sheet.getRange(rowNT, colNT).setValue('Egresos Pendientes');
  sheet.getRange(rowNT, colNT + 1).setValue(2800000).setNumberFormat('- #,##0').setFontColor(C.AMARILLO).setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.AMARILLO_FONDO);
  rowNT++;

  sheet.getRange(rowNT, colNT).setValue('BALANCE').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 1).setValue(5500000).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.NT_HEADER).setFontColor(C.BLANCO);

  // ═══════════════════════════════════════════════════════════════════════════
  // BALANCE CRUZADO (abajo de todo)
  // ═══════════════════════════════════════════════════════════════════════════
  const rowBalance = Math.max(rowFam, rowNT) + 2;

  sheet.getRange(rowBalance, 1, 1, 15).merge()
    .setValue('🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.BALANCE_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  sheet.setRowHeight(rowBalance, 35);

  // Tabla izquierda
  ['Concepto', 'Este Mes', 'Acumulado Año'].forEach((h, i) => {
    sheet.getRange(rowBalance + 1, 1 + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.BALANCE_FONDO);
  });

  sheet.getRange(rowBalance + 2, 1).setValue('Préstamo NT → Familia');
  sheet.getRange(rowBalance + 2, 2).setValue(3000000).setNumberFormat('#,##0').setFontColor(C.ROJO);
  sheet.getRange(rowBalance + 2, 3).setValue(8500000).setNumberFormat('#,##0').setFontColor(C.ROJO).setFontWeight('bold');

  sheet.getRange(rowBalance + 3, 1).setValue('Devolución Familia → NT');
  sheet.getRange(rowBalance + 3, 2).setValue(0).setNumberFormat('#,##0').setFontColor(C.VERDE);
  sheet.getRange(rowBalance + 3, 3).setValue(2000000).setNumberFormat('#,##0').setFontColor(C.VERDE).setFontWeight('bold');

  sheet.getRange(rowBalance + 4, 1).setValue('SALDO NETO').setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 2).setValue(3000000).setNumberFormat('#,##0').setFontColor(C.ROJO).setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 3).setValue(6500000).setNumberFormat('#,##0').setFontColor(C.ROJO).setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 1, 1, 3).setBackground(C.BALANCE_FONDO);

  // Alerta visual (derecha)
  sheet.getRange(rowBalance + 1, 6, 4, 6).merge()
    .setValue('⚠️ NT SUBSIDIA A FAMILIA\n\nGs. 6.500.000\n\nEl salario de administrador (Gs. 5.000.000) no está cubriendo los gastos familiares.')
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true)
    .setFontWeight('bold')
    .setFontSize(11);

  // ═══════════════════════════════════════════════════════════════════════════
  // FORMATO FINAL
  // ═══════════════════════════════════════════════════════════════════════════

  // Columna separadora
  sheet.setColumnWidth(8, 15);
  sheet.getRange(4, 8, rowBalance + 5, 1).setBackground(C.GRIS_FONDO);

  // Anchos de columnas
  sheet.setColumnWidth(1, 170);
  for (let i = 2; i <= 5; i++) sheet.setColumnWidth(i, 100);
  sheet.setColumnWidth(6, 80);
  sheet.setColumnWidth(7, 80);

  sheet.setColumnWidth(9, 150);
  for (let i = 10; i <= 12; i++) sheet.setColumnWidth(i, 100);
  for (let i = 13; i <= 15; i++) sheet.setColumnWidth(i, 80);

  sheet.setFrozenRows(3);

  return sheet;
}
