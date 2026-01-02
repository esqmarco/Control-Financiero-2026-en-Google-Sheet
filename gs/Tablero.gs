/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TABLERO.GS - HOJA TABLERO (Dashboard con FÓRMULAS DINÁMICAS)
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Lee datos en tiempo real desde MOVIMIENTO
 * ═══════════════════════════════════════════════════════════════════════════════
 */

function crearHojaTABLERO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.TABLERO);
  const C = COLORES;

  // ═══════════════════════════════════════════════════════════════════════════
  // HEADER PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════
  sheet.getRange('A1:N1').merge()
    .setValue('📊 TABLERO DE CONTROL FINANCIERO ' + AÑO)
    .setFontSize(20).setFontWeight('bold')
    .setBackground('#1e40af')
    .setFontColor(C.BLANCO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 50);

  // Selector de mes (sincronizado con MOVIMIENTO)
  sheet.getRange('A2').setValue('📅 Mes:').setFontWeight('bold');
  sheet.getRange('B2').setFormula('=MOVIMIENTO!B3').setBackground(C.GANANCIA_FONDO).setFontWeight('bold');
  sheet.getRange('D2').setValue('Hoy:').setFontWeight('bold');
  sheet.getRange('E2').setFormula('=TODAY()').setNumberFormat('dd/mm/yyyy').setFontWeight('bold');
  sheet.getRange('A2:N2').setBackground(C.GRIS_FONDO);

  // ═══════════════════════════════════════════════════════════════════════════
  // COLUMNA FAMILIA (A-G)
  // ═══════════════════════════════════════════════════════════════════════════
  let rowFam = 4;

  // Header FAMILIA
  sheet.getRange(rowFam, 1, 1, 6).merge()
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

  ['Cuenta', 'Esperado', 'Real ✏️', 'Diferencia'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : 'right');
  });
  rowFam++;

  const filaInicioCuentasFam = rowFam;
  CUENTAS_FAMILIA.forEach(cuenta => {
    sheet.getRange(rowFam, 1).setValue(cuenta);
    sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0'); // Esperado (manual)
    sheet.getRange(rowFam, 3).setValue(0).setNumberFormat('#,##0').setFontColor('#3b82f6').setFontWeight('bold'); // Real (manual)
    sheet.getRange(rowFam, 4).setFormula(`=C${rowFam}-B${rowFam}`).setNumberFormat('#,##0');
    rowFam++;
  });
  rowFam++;

  // ─── RESUMEN FAMILIA (lee de MOVIMIENTO) ───
  sheet.getRange(rowFam, 1, 1, 4).merge()
    .setValue('📋 RESUMEN DEL MES')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  ['Concepto', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'));
  });
  rowFam++;

  // Total Ingresos Familia - busca en MOVIMIENTO la fila de Subtotal de INGRESOS FAMILIA
  sheet.getRange(rowFam, 1).setValue('Total Ingresos');
  sheet.getRange(rowFam, 2).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!D:D)/2,0)').setNumberFormat('#,##0'); // Dividido por 2 porque hay subtotales
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!E:E)/2,0)').setNumberFormat('#,##0');
  sheet.getRange(rowFam, 4).setFormula(`=IF(C${rowFam}>=B${rowFam},"✓ OK","⚠")`);
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.VERDE_FONDO);
  rowFam++;

  // Total Egresos Familia
  sheet.getRange(rowFam, 1).setValue('Total Egresos');
  sheet.getRange(rowFam, 2).setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!B9:B100="Egreso")*(MOVIMIENTO!D9:D100)),0)').setNumberFormat('#,##0');
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!B9:B100="Egreso")*(MOVIMIENTO!E9:E100)),0)').setNumberFormat('#,##0');
  sheet.getRange(rowFam, 4).setFormula(`=IF(C${rowFam}<=B${rowFam},"✓ OK","⚠")`);
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.ROJO_FONDO);
  rowFam++;

  // Balance Familia
  sheet.getRange(rowFam, 1).setValue('BALANCE FAMILIA').setFontWeight('bold');
  sheet.getRange(rowFam, 2).setFormula(`=B${rowFam-2}-B${rowFam-1}`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 3).setFormula(`=C${rowFam-2}-C${rowFam-1}`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 4).setFormula(`=IF(C${rowFam}>=0,"SUPERÁVIT","DÉFICIT")`).setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.FAM_SUBTOTAL);
  rowFam += 2;

  // ─── LIQUIDEZ FAMILIA ───
  sheet.getRange(rowFam, 1, 1, 4).merge()
    .setValue('📅 LIQUIDEZ - PRÓXIMAS 3 SEMANAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.FAM_HEADER);
  rowFam++;

  ['Semana', 'Gastos', 'Saldo', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, i + 1)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.FAM_FONDO);
  });
  rowFam++;

  // Caja disponible
  sheet.getRange(rowFam, 1).setValue('Caja disponible');
  sheet.getRange(rowFam, 2).setValue('-');
  sheet.getRange(rowFam, 3).setFormula(`=SUM(C${filaInicioCuentasFam}:C${filaInicioCuentasFam+9})`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 4).setValue('-');
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.FAM_FONDO);
  rowFam++;

  const filaCaja = rowFam - 1;

  // Semanas
  ['Esta semana', 'Próxima semana', '3ra semana'].forEach((sem, i) => {
    sheet.getRange(rowFam, 1).setValue(sem);
    sheet.getRange(rowFam, 2).setValue(0).setNumberFormat('#,##0'); // Gastos (manual o calculado)
    sheet.getRange(rowFam, 3).setFormula(`=C${rowFam-1}-B${rowFam}`).setNumberFormat('#,##0');
    sheet.getRange(rowFam, 4).setFormula(`=IF(C${rowFam}>=0,"✓ OK","⚠ FALTA")`);
    rowFam++;
  });

  // Saldo Final
  sheet.getRange(rowFam, 1).setValue('SALDO FINAL').setFontWeight('bold');
  sheet.getRange(rowFam, 2).setFormula(`=SUM(B${rowFam-3}:B${rowFam-1})`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 3).setFormula(`=C${filaCaja}-B${rowFam}`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowFam, 4).setFormula(`=IF(C${rowFam}>=0,"✓ OK","⚠ DÉFICIT")`).setFontWeight('bold');
  sheet.getRange(rowFam, 1, 1, 4).setBackground(C.FAM_SUBTOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // COLUMNA NEUROTEA (H-N)
  // ═══════════════════════════════════════════════════════════════════════════
  let rowNT = 4;
  const colNT = 8;

  // Header NEUROTEA
  sheet.getRange(rowNT, colNT, 1, 7).merge()
    .setValue('🏥 NEUROTEA')
    .setFontSize(16).setFontWeight('bold')
    .setBackground(C.NT_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  rowNT += 2;

  // ─── INDICADORES DE METAS (lee de MOVIMIENTO) ───
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('🎯 INDICADORES DE METAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  // Ingresos del Mes
  sheet.getRange(rowNT, colNT).setValue('INGRESOS DEL MES').setFontSize(9).setFontColor(C.NT_HEADER);
  // Busca el subtotal de INGRESOS NEUROTEA en MOVIMIENTO
  sheet.getRange(rowNT, colNT + 1).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!E:E,MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!A:A,"<>Subtotal*"),0)')
    .setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.NT_HEADER);
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.NT_FONDO);

  sheet.getRange(rowNT, colNT + 2).setValue('GASTOS DEL MES').setFontSize(9);
  sheet.getRange(rowNT, colNT + 3).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!E:E,MOVIMIENTO!B:B,"Egreso",MOVIMIENTO!A:A,"<>Subtotal*"),0)')
    .setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 2, 1, 2).setBackground(C.GRIS_FONDO);
  rowNT++;

  // Ganancia Real
  const filaKPI = rowNT;
  sheet.getRange(rowNT, colNT).setValue('GANANCIA REAL').setFontSize(9).setFontColor(C.VERDE);
  sheet.getRange(rowNT, colNT + 1).setFormula(`=IFERROR(K${rowNT-1}-L${rowNT-1},0)`)
    .setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.VERDE);
  sheet.getRange(rowNT, colNT, 1, 2).setBackground(C.VERDE_FONDO);

  sheet.getRange(rowNT, colNT + 2).setValue('META 7%').setFontSize(9).setFontColor(C.GANANCIA);
  sheet.getRange(rowNT, colNT + 3).setFormula(`=IFERROR(K${rowNT-1}*0.07,0)`)
    .setNumberFormat('#,##0').setFontSize(14).setFontWeight('bold').setFontColor(C.GANANCIA);
  sheet.getRange(rowNT, colNT + 2, 1, 2).setBackground(C.GANANCIA_FONDO);
  rowNT++;

  // % Gastos sobre Ingresos
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setFormula(`="% Gastos sobre Ingresos: "&TEXT(IFERROR(IF(K${filaKPI-1}>0,L${filaKPI-1}/K${filaKPI-1},0),0),"0%")&" / 93% máx"`)
    .setHorizontalAlignment('center')
    .setBackground('#e0f2fe')
    .setFontSize(10);
  rowNT++;

  // Estado meta
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setFormula(`=IFERROR(IF(K${filaKPI}>=L${filaKPI},"✅ META CUMPLIDA - Superávit: "&TEXT(K${filaKPI}-L${filaKPI},"#,##0"),"⚠️ META NO CUMPLIDA - Falta: "&TEXT(L${filaKPI}-K${filaKPI},"#,##0")),"⏳ Sin datos")`)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setFontSize(10);
  rowNT++;

  // Distribución ganancia
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setFormula(`="Distribución de Ganancia (7% = "&TEXT(IFERROR(L${filaKPI},0),"#,##0")&")"`)
    .setFontWeight('bold')
    .setFontSize(10)
    .setBackground(C.NT_FONDO);
  rowNT++;

  // 3 fondos
  sheet.getRange(rowNT, colNT).setValue('Utilidad Dueño').setFontSize(9).setBackground('#f3e8ff');
  sheet.getRange(rowNT, colNT + 1).setValue('Fondo Emerg.').setFontSize(9).setBackground('#ffedd5');
  sheet.getRange(rowNT, colNT + 2).setValue('Fondo Inversión').setFontSize(9).setBackground('#cffafe');
  rowNT++;

  sheet.getRange(rowNT, colNT).setFormula(`=IFERROR(K${filaKPI}*0.3333,0)`).setNumberFormat('#,##0').setFontWeight('bold').setBackground('#f3e8ff');
  sheet.getRange(rowNT, colNT + 1).setFormula(`=IFERROR(K${filaKPI}*0.3333,0)`).setNumberFormat('#,##0').setFontWeight('bold').setBackground('#ffedd5');
  sheet.getRange(rowNT, colNT + 2).setFormula(`=IFERROR(K${filaKPI}*0.3334,0)`).setNumberFormat('#,##0').setFontWeight('bold').setBackground('#cffafe');
  rowNT += 2;

  // ─── SALDOS EN CUENTAS NT ───
  sheet.getRange(rowNT, colNT, 1, 3).merge()
    .setValue('💰 SALDOS EN CUENTAS')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  ['Cuenta', 'Saldo ✏️', 'Acumulado'].forEach((h, i) => {
    sheet.getRange(rowNT, colNT + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.NT_FONDO);
  });
  rowNT++;

  CUENTAS_NT.forEach(cuenta => {
    sheet.getRange(rowNT, colNT).setValue(cuenta);
    sheet.getRange(rowNT, colNT + 1).setValue(0).setNumberFormat('#,##0').setFontColor('#3b82f6').setFontWeight('bold');
    sheet.getRange(rowNT, colNT + 2).setValue(0).setNumberFormat('#,##0');
    rowNT++;
  });
  rowNT++;

  // ─── RESUMEN NT (lee de MOVIMIENTO) ───
  sheet.getRange(rowNT, colNT, 1, 4).merge()
    .setValue('📋 RESUMEN DEL MES')
    .setFontWeight('bold').setFontSize(11)
    .setFontColor(C.NT_HEADER);
  rowNT++;

  ['Concepto', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowNT, colNT + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.NT_FONDO);
  });
  rowNT++;

  // Total Ingresos NT
  sheet.getRange(rowNT, colNT).setValue('Total Ingresos');
  sheet.getRange(rowNT, colNT + 1).setFormula(`=IFERROR(K${filaKPI-1},0)`).setNumberFormat('#,##0');
  sheet.getRange(rowNT, colNT + 2).setFormula(`=IFERROR(K${filaKPI-1},0)`).setNumberFormat('#,##0');
  sheet.getRange(rowNT, colNT + 3).setFormula(`=IF(J${rowNT}>=I${rowNT},"✓","⚠")`);
  sheet.getRange(rowNT, colNT, 1, 4).setBackground(C.VERDE_FONDO);
  rowNT++;

  // Total Egresos NT
  sheet.getRange(rowNT, colNT).setValue('Total Egresos');
  sheet.getRange(rowNT, colNT + 1).setFormula(`=IFERROR(L${filaKPI-1},0)`).setNumberFormat('#,##0');
  sheet.getRange(rowNT, colNT + 2).setFormula(`=IFERROR(L${filaKPI-1},0)`).setNumberFormat('#,##0');
  sheet.getRange(rowNT, colNT + 3).setFormula(`=IF(J${rowNT}<=I${rowNT},"✓","⚠")`);
  sheet.getRange(rowNT, colNT, 1, 4).setBackground(C.ROJO_FONDO);
  rowNT++;

  // Balance NT
  sheet.getRange(rowNT, colNT).setValue('BALANCE NEUROTEA').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 1).setFormula(`=IFERROR(I${rowNT-2}-I${rowNT-1},0)`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 2).setFormula(`=IFERROR(J${rowNT-2}-J${rowNT-1},0)`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowNT, colNT + 3).setFormula(`=IF(J${rowNT}>=0,"SUPERÁVIT","DÉFICIT")`).setFontWeight('bold');
  sheet.getRange(rowNT, colNT, 1, 4).setBackground(C.NT_SUBTOTAL);

  // ═══════════════════════════════════════════════════════════════════════════
  // BALANCE CRUZADO (abajo de todo)
  // ═══════════════════════════════════════════════════════════════════════════
  const rowBalance = Math.max(rowFam, rowNT) + 3;

  sheet.getRange(rowBalance, 1, 1, 14).merge()
    .setValue('🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA')
    .setFontSize(14).setFontWeight('bold')
    .setBackground(C.BALANCE_HEADER).setFontColor(C.BLANCO)
    .setHorizontalAlignment('center');
  sheet.setRowHeight(rowBalance, 35);

  ['Concepto', 'Este Mes', 'Acumulado Año'].forEach((h, i) => {
    sheet.getRange(rowBalance + 1, 1 + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(C.BALANCE_FONDO);
  });

  // Préstamo NT → Familia (busca en CARGA_NT)
  sheet.getRange(rowBalance + 2, 1).setValue('Préstamo NT → Familia');
  sheet.getRange(rowBalance + 2, 2).setFormula(`=IFERROR(SUMIFS(CARGA_NT!F:F,CARGA_NT!D:D,"Préstamo NT → Familia",MONTH(CARGA_NT!A:A),MOVIMIENTO!L3,YEAR(CARGA_NT!A:A),${AÑO}),0)`)
    .setNumberFormat('#,##0').setFontColor(C.ROJO);
  sheet.getRange(rowBalance + 2, 3).setFormula(`=IFERROR(SUMIF(CARGA_NT!D:D,"Préstamo NT → Familia",CARGA_NT!F:F),0)`)
    .setNumberFormat('#,##0').setFontColor(C.ROJO).setFontWeight('bold');

  // Devolución Familia → NT (busca en CARGA_FAMILIA)
  sheet.getRange(rowBalance + 3, 1).setValue('Devolución Familia → NT');
  sheet.getRange(rowBalance + 3, 2).setFormula(`=IFERROR(SUMIFS(CARGA_FAMILIA!F:F,CARGA_FAMILIA!D:D,"Devolución Familia → NT",MONTH(CARGA_FAMILIA!A:A),MOVIMIENTO!L3,YEAR(CARGA_FAMILIA!A:A),${AÑO}),0)`)
    .setNumberFormat('#,##0').setFontColor(C.VERDE);
  sheet.getRange(rowBalance + 3, 3).setFormula(`=IFERROR(SUMIF(CARGA_FAMILIA!D:D,"Devolución Familia → NT",CARGA_FAMILIA!F:F),0)`)
    .setNumberFormat('#,##0').setFontColor(C.VERDE).setFontWeight('bold');

  // Saldo Neto
  sheet.getRange(rowBalance + 4, 1).setValue('SALDO NETO').setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 2).setFormula(`=B${rowBalance+2}-B${rowBalance+3}`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 3).setFormula(`=C${rowBalance+2}-C${rowBalance+3}`).setNumberFormat('#,##0').setFontWeight('bold');
  sheet.getRange(rowBalance + 4, 1, 1, 3).setBackground(C.BALANCE_FONDO);

  // Alerta visual
  sheet.getRange(rowBalance + 1, 5, 4, 5).merge()
    .setFormula(`=IF(C${rowBalance+4}>0,"⚠️ NT SUBSIDIA A FAMILIA"&CHAR(10)&CHAR(10)&"Gs. "&TEXT(C${rowBalance+4},"#,##0")&CHAR(10)&CHAR(10)&"El salario de administrador no está cubriendo los gastos familiares.","✅ BALANCE EQUILIBRADO"&CHAR(10)&CHAR(10)&"Familia no debe a NeuroTEA")`)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true)
    .setFontWeight('bold')
    .setFontSize(11);

  // Formato condicional para alerta
  const reglaAlerta = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=$C$${rowBalance+4}>0`)
    .setBackground(C.ROJO_FONDO)
    .setFontColor(C.ROJO)
    .setRanges([sheet.getRange(rowBalance + 1, 5, 4, 5)])
    .build();

  const reglaOK = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=$C$${rowBalance+4}<=0`)
    .setBackground(C.VERDE_FONDO)
    .setFontColor(C.VERDE)
    .setRanges([sheet.getRange(rowBalance + 1, 5, 4, 5)])
    .build();

  sheet.setConditionalFormatRules([reglaAlerta, reglaOK]);

  // ═══════════════════════════════════════════════════════════════════════════
  // FORMATO FINAL
  // ═══════════════════════════════════════════════════════════════════════════

  // Columna separadora
  sheet.setColumnWidth(7, 15);
  sheet.getRange(4, 7, rowBalance + 5, 1).setBackground(C.GRIS_FONDO);

  // Anchos de columnas
  sheet.setColumnWidth(1, 150);
  for (let i = 2; i <= 4; i++) sheet.setColumnWidth(i, 100);
  sheet.setColumnWidth(5, 80);
  sheet.setColumnWidth(6, 80);

  sheet.setColumnWidth(8, 140);
  for (let i = 9; i <= 11; i++) sheet.setColumnWidth(i, 100);
  for (let i = 12; i <= 14; i++) sheet.setColumnWidth(i, 90);

  sheet.setFrozenRows(3);

  return sheet;
}
