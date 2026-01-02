/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * TABLERO.GS - DASHBOARD PROFESIONAL DE CONTROL FINANCIERO
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 5.0 - Diseño UI/UX Profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// PALETA DE COLORES UI
// ═══════════════════════════════════════════════════════════════════════════════

const UI = {
  // FAMILIA - Verdes
  FAM_HEADER: '#059669',
  FAM_TITULO: '#D1FAE5',
  FAM_TEXTO: '#059669',
  FAM_FILA_PAR: '#ECFDF5',
  FAM_SUBTOTAL: '#A7F3D0',

  // NEUROTEA - Azules
  NT_HEADER: '#1E40AF',
  NT_TITULO: '#DBEAFE',
  NT_TEXTO: '#1E40AF',
  NT_FILA_PAR: '#EFF6FF',
  NT_SUBTOTAL: '#93C5FD',
  NT_EDITABLE: '#3B82F6',

  // Estados
  VERDE: '#22C55E',
  VERDE_FONDO: '#DCFCE7',
  AMARILLO: '#F59E0B',
  AMARILLO_FONDO: '#FEF3C7',
  ROJO: '#DC2626',
  ROJO_FONDO: '#FEF2F2',

  // Balance Cruzado
  PURPURA_HEADER: '#7C3AED',
  PURPURA_FONDO: '#EDE9FE',

  // Neutros
  HEADER_DARK: '#1E40AF',
  GRIS_INFO: '#F3F4F6',
  GRIS_BORDE: '#E5E7EB',
  BLANCO: '#FFFFFF',
  NEGRO: '#1F2937'
};

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL: CREAR HOJA TABLERO
// ═══════════════════════════════════════════════════════════════════════════════

function crearHojaTABLERO() {
  const sheet = crearOLimpiarHoja(NOMBRES_HOJAS.TABLERO);

  // ═══════════════════════════════════════════════════════════════════════════
  // CONFIGURAR ANCHOS DE COLUMNA
  // ═══════════════════════════════════════════════════════════════════════════

  // Espaciadores
  sheet.setColumnWidth(1, 25);   // A - margen izquierdo
  sheet.setColumnWidth(6, 25);   // F - separador
  sheet.setColumnWidth(7, 25);   // G - separador
  sheet.setColumnWidth(12, 25);  // L - margen derecho

  // FAMILIA (columnas B-E)
  sheet.setColumnWidth(2, 180);  // B - Conceptos
  sheet.setColumnWidth(3, 120);  // C - Valores 1
  sheet.setColumnWidth(4, 120);  // D - Valores 2
  sheet.setColumnWidth(5, 110);  // E - Estado/Diferencia

  // NEUROTEA (columnas H-K)
  sheet.setColumnWidth(8, 180);  // H - Conceptos
  sheet.setColumnWidth(9, 120);  // I - Valores 1
  sheet.setColumnWidth(10, 120); // J - Valores 2
  sheet.setColumnWidth(11, 110); // K - Estado/Diferencia

  // ═══════════════════════════════════════════════════════════════════════════
  // FILA 1: TÍTULO PRINCIPAL
  // ═══════════════════════════════════════════════════════════════════════════

  sheet.getRange('A1:L1').merge()
    .setValue('📊 TABLERO DE CONTROL FINANCIERO ' + AÑO)
    .setFontSize(20)
    .setFontWeight('bold')
    .setFontColor(UI.BLANCO)
    .setBackground(UI.HEADER_DARK)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(1, 50);

  // ═══════════════════════════════════════════════════════════════════════════
  // FILA 2: INFO CONTEXTUAL
  // ═══════════════════════════════════════════════════════════════════════════

  sheet.getRange('A2:L2').merge()
    .setFormula('="   📅 Mes: "&MOVIMIENTO!B3&"                                                                        🗓️ Actualizado: "&TEXT(TODAY(),"dd/mm/yyyy")')
    .setFontSize(11)
    .setBackground(UI.GRIS_INFO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(2, 30);

  // ═══════════════════════════════════════════════════════════════════════════
  // FILA 3: ESPACIADOR
  // ═══════════════════════════════════════════════════════════════════════════

  sheet.setRowHeight(3, 8);
  sheet.getRange('A3:L3').setBackground(UI.BLANCO);

  // ═══════════════════════════════════════════════════════════════════════════
  // FILA 4: HEADERS DE ENTIDAD (PARALELOS)
  // ═══════════════════════════════════════════════════════════════════════════

  // FAMILIA
  sheet.getRange('B4:E4').merge()
    .setValue('🏠 FAMILIA')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.BLANCO)
    .setBackground(UI.FAM_HEADER)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  // NEUROTEA
  sheet.getRange('H4:K4').merge()
    .setValue('🏥 NEUROTEA')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.BLANCO)
    .setBackground(UI.NT_HEADER)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');

  sheet.setRowHeight(4, 40);

  // Espaciador fila 5
  sheet.setRowHeight(5, 6);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA: SALDOS EN CUENTAS (Filas 6-17)
  // ═══════════════════════════════════════════════════════════════════════════

  let rowFam = 6;

  // Título sección
  sheet.getRange('B6:E6').merge()
    .setValue('💰 SALDOS EN CUENTAS')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(6, 32);
  rowFam++;

  // Headers tabla
  const headersCuentasFam = ['Cuenta', 'Esperado', 'Real ✏️', 'Diferencia'];
  headersCuentasFam.forEach((h, i) => {
    sheet.getRange(rowFam, 2 + i)
      .setValue(h)
      .setFontSize(10)
      .setFontWeight('bold')
      .setBackground(UI.FAM_FILA_PAR)
      .setHorizontalAlignment(i === 0 ? 'left' : 'right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  });
  sheet.setRowHeight(rowFam, 25);
  rowFam++;

  // Filas de cuentas FAMILIA
  const filaInicioCuentasFam = rowFam;
  CUENTAS_FAMILIA.forEach((cuenta, idx) => {
    const bgColor = (idx % 2 === 0) ? UI.FAM_FILA_PAR : UI.BLANCO;

    // Nombre cuenta
    sheet.getRange(rowFam, 2).setValue(cuenta)
      .setBackground(bgColor)
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Esperado (manual)
    sheet.getRange(rowFam, 3).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Real (editable - azul)
    sheet.getRange(rowFam, 4).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setFontColor(UI.NT_EDITABLE)
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Diferencia (fórmula)
    sheet.getRange(rowFam, 5).setFormula(`=IFERROR(D${rowFam}-C${rowFam},0)`)
      .setNumberFormat('+#,##0;-#,##0;-')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    sheet.setRowHeight(rowFam, 21);
    rowFam++;
  });

  // Total disponible FAMILIA
  sheet.getRange(rowFam, 2).setValue('💵 TOTAL DISPONIBLE')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula(`=IFERROR(SUM(C${filaInicioCuentasFam}:C${rowFam-1}),0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(SUM(D${filaInicioCuentasFam}:D${rowFam-1}),0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IFERROR(D${rowFam}-C${rowFam},0)`)
    .setNumberFormat('+#,##0;-#,##0;-')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 25);
  const filaTotalCuentasFam = rowFam;
  rowFam += 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN NEUROTEA: INDICADORES DE METAS (Filas 6-17)
  // ═══════════════════════════════════════════════════════════════════════════

  let rowNT = 6;

  // Título sección
  sheet.getRange('H6:K6').merge()
    .setValue('🎯 INDICADORES DE METAS')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(6, 32);
  rowNT++;

  // Espaciador
  rowNT++;

  // KPI ROW 1: Ingresos del Mes | Gastos del Mes
  // Label Ingresos
  sheet.getRange(rowNT, 8, 1, 2).merge()
    .setValue('INGRESOS DEL MES')
    .setFontSize(9)
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_FILA_PAR)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

  // Label Gastos
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setValue('GASTOS DEL MES')
    .setFontSize(9)
    .setFontColor(UI.NEGRO)
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 22);
  rowNT++;

  // Valor Ingresos
  sheet.getRange(rowNT, 8, 1, 2).merge()
    .setFormula('=IFERROR(SUMIFS(MOVIMIENTO!E:E,MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!A:A,"<>Subtotal*")/2,0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_FILA_PAR)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

  // Valor Gastos
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setFormula('=IFERROR(SUMIFS(MOVIMIENTO!E:E,MOVIMIENTO!B:B,"Egreso",MOVIMIENTO!A:A,"<>Subtotal*")/2,0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.NEGRO)
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 35);
  const filaIngresosNT = rowNT;
  rowNT++;

  // Espaciador
  sheet.setRowHeight(rowNT, 8);
  rowNT++;

  // KPI ROW 2: Ganancia Real | Meta 7%
  // Label Ganancia
  sheet.getRange(rowNT, 8, 1, 2).merge()
    .setValue('GANANCIA REAL')
    .setFontSize(9)
    .setFontColor(UI.VERDE)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.VERDE, SpreadsheetApp.BorderStyle.SOLID);

  // Label Meta
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setValue('META 7%')
    .setFontSize(9)
    .setFontColor(UI.AMARILLO)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.AMARILLO, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 22);
  rowNT++;

  // Valor Ganancia
  sheet.getRange(rowNT, 8, 1, 2).merge()
    .setFormula(`=IFERROR(I${filaIngresosNT}-K${filaIngresosNT},0)`)
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.VERDE)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.VERDE, SpreadsheetApp.BorderStyle.SOLID);

  // Valor Meta 7%
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setFormula(`=IFERROR(I${filaIngresosNT}*0.07,0)`)
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.AMARILLO)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.AMARILLO, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 35);
  const filaGananciaNT = rowNT;
  rowNT++;

  // Espaciador
  sheet.setRowHeight(rowNT, 8);
  rowNT++;

  // Barra de progreso: % Gastos sobre Ingresos
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setFormula(`="📊 % Gastos: "&TEXT(IFERROR(IF(I${filaIngresosNT}>0,K${filaIngresosNT}/I${filaIngresosNT},0),0),"0%")&" de 93% máximo"`)
    .setFontSize(11)
    .setBackground('#E0F2FE')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
  rowNT++;

  // Estado de meta (badge grande)
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setFormula(`=IFERROR(IF(I${filaGananciaNT}>=K${filaGananciaNT},"✅ META CUMPLIDA - Superávit: Gs. "&TEXT(I${filaGananciaNT}-K${filaGananciaNT},"#,##0"),"⚠️ META NO CUMPLIDA - Falta: Gs. "&TEXT(K${filaGananciaNT}-I${filaGananciaNT},"#,##0")),"⏳ Sin datos")`)
    .setFontSize(11)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 32);
  rowNT++;

  // Espaciador
  sheet.setRowHeight(rowNT, 8);
  rowNT++;

  // Distribución de Ganancia - Título
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setFormula(`="💰 Distribución Ganancia (Meta: Gs. "&TEXT(IFERROR(K${filaGananciaNT},0),"#,##0")&")"`)
    .setFontSize(10)
    .setFontWeight('bold')
    .setBackground(UI.NT_TITULO)
    .setFontColor(UI.NT_TEXTO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowNT, 26);
  rowNT++;

  // Labels de distribución
  sheet.getRange(rowNT, 8).setValue('Utilidad Dueño')
    .setFontSize(9)
    .setBackground('#F3E8FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setValue('Fondo Emergencia')
    .setFontSize(9)
    .setBackground('#FFEDD5')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setValue('Fondo Inversión')
    .setFontSize(9)
    .setBackground('#CFFAFE')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 22);
  rowNT++;

  // Valores de distribución
  sheet.getRange(rowNT, 8).setFormula(`=IFERROR(I${filaGananciaNT}*0.3333,0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#F3E8FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setFormula(`=IFERROR(I${filaGananciaNT}*0.3333,0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#FFEDD5')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setFormula(`=IFERROR(I${filaGananciaNT}*0.3334,0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#CFFAFE')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
  rowNT++;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA: RESUMEN DEL MES (Filas 20+)
  // ═══════════════════════════════════════════════════════════════════════════

  rowFam++; // Espaciador

  // Título sección
  sheet.getRange(rowFam, 2, 1, 4).merge()
    .setValue('📋 RESUMEN DEL MES')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowFam, 32);
  rowFam++;

  // Headers
  ['Concepto', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, 2 + i)
      .setValue(h)
      .setFontSize(10)
      .setFontWeight('bold')
      .setBackground(UI.FAM_FILA_PAR)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'))
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  });
  sheet.setRowHeight(rowFam, 25);
  rowFam++;

  // Total Ingresos FAMILIA
  sheet.getRange(rowFam, 2).setValue('Total Ingresos')
    .setBackground(UI.VERDE_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!D:D)/2,0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B:B,"Ingreso",MOVIMIENTO!E:E)/2,0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=C${rowFam},"✓ OK","⚠")`)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaIngresosFam = rowFam;
  rowFam++;

  // Total Egresos FAMILIA
  sheet.getRange(rowFam, 2).setValue('Total Egresos')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!B9:B100="Egreso")*(MOVIMIENTO!D9:D100))/2,0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!B9:B100="Egreso")*(MOVIMIENTO!E9:E100))/2,0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}<=C${rowFam},"✓ OK","⚠")`)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaEgresosFam = rowFam;
  rowFam++;

  // BALANCE FAMILIA
  sheet.getRange(rowFam, 2).setValue('💰 BALANCE FAMILIA')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula(`=IFERROR(C${filaIngresosFam}-C${filaEgresosFam},0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${filaIngresosFam}-D${filaEgresosFam},0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0,"SUPERÁVIT","DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 28);
  rowFam += 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN NEUROTEA: SALDOS EN CUENTAS (Filas 20+)
  // ═══════════════════════════════════════════════════════════════════════════

  rowNT += 2; // Espaciador

  // Título sección
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setValue('💰 SALDOS EN CUENTAS')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowNT, 32);
  rowNT++;

  // Headers
  ['Cuenta', 'Saldo ✏️', 'Acumulado', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowNT, 8 + i)
      .setValue(h)
      .setFontSize(10)
      .setFontWeight('bold')
      .setBackground(UI.NT_FILA_PAR)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'))
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  });
  sheet.setRowHeight(rowNT, 25);
  rowNT++;

  // Filas de cuentas NT
  const filaInicioCuentasNT = rowNT;
  CUENTAS_NT.forEach((cuenta, idx) => {
    const bgColor = (idx % 2 === 0) ? UI.NT_FILA_PAR : UI.BLANCO;

    sheet.getRange(rowNT, 8).setValue(cuenta)
      .setBackground(bgColor)
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    sheet.getRange(rowNT, 9).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setFontColor(UI.NT_EDITABLE)
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    sheet.getRange(rowNT, 10).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    sheet.getRange(rowNT, 11).setValue('✓')
      .setBackground(bgColor)
      .setHorizontalAlignment('center')
      .setFontColor(UI.VERDE)
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    sheet.setRowHeight(rowNT, 21);
    rowNT++;
  });

  // Total NT
  sheet.getRange(rowNT, 8).setValue('💵 TOTAL DISPONIBLE')
    .setFontWeight('bold')
    .setBackground(UI.NT_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setFormula(`=IFERROR(SUM(I${filaInicioCuentasNT}:I${rowNT-1}),0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.NT_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10).setFormula(`=IFERROR(SUM(J${filaInicioCuentasNT}:J${rowNT-1}),0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.NT_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setValue('')
    .setBackground(UI.NT_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 25);
  rowNT += 2;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA: LIQUIDEZ 3 SEMANAS
  // ═══════════════════════════════════════════════════════════════════════════

  // Título sección
  sheet.getRange(rowFam, 2, 1, 4).merge()
    .setValue('📅 LIQUIDEZ - PRÓXIMAS 3 SEMANAS')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowFam, 32);
  rowFam++;

  // Headers
  ['Semana', 'Gastos', 'Saldo', 'Estado'].forEach((h, i) => {
    sheet.getRange(rowFam, 2 + i)
      .setValue(h)
      .setFontSize(10)
      .setFontWeight('bold')
      .setBackground(UI.FAM_FILA_PAR)
      .setHorizontalAlignment(i === 0 ? 'left' : (i === 3 ? 'center' : 'right'))
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  });
  sheet.setRowHeight(rowFam, 25);
  rowFam++;

  // Caja disponible
  sheet.getRange(rowFam, 2).setValue('Caja disponible')
    .setBackground(UI.FAM_FILA_PAR)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setValue('-')
    .setBackground(UI.FAM_FILA_PAR)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=D${filaTotalCuentasFam}`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_FILA_PAR)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setValue('-')
    .setBackground(UI.FAM_FILA_PAR)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaCajaDisp = rowFam;
  rowFam++;

  // Semanas
  const semanas = ['Esta semana', 'Próxima semana', '3ra semana'];
  semanas.forEach((sem, idx) => {
    const bgColor = (idx % 2 === 0) ? UI.BLANCO : UI.FAM_FILA_PAR;

    sheet.getRange(rowFam, 2).setValue(sem)
      .setBackground(bgColor)
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(rowFam, 3).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setFontColor(UI.NT_EDITABLE)
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${rowFam-1}-C${rowFam},0)`)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
    sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0,"✓ OK","⚠ FALTA")`)
      .setBackground(bgColor)
      .setHorizontalAlignment('center')
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
    sheet.setRowHeight(rowFam, 22);
    rowFam++;
  });

  // Saldo Final
  sheet.getRange(rowFam, 2).setValue('💵 SALDO FINAL')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula(`=IFERROR(SUM(C${filaCajaDisp+1}:C${rowFam-1}),0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${filaCajaDisp}-C${rowFam},0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0,"✓ OK","⚠ DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 26);

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN INFERIOR: BALANCE CRUZADO NT ↔ FAMILIA
  // ═══════════════════════════════════════════════════════════════════════════

  const rowBalance = Math.max(rowFam, rowNT) + 3;

  // Título principal
  sheet.getRange(rowBalance, 2, 1, 10).merge()
    .setValue('🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA')
    .setFontSize(14)
    .setFontWeight('bold')
    .setFontColor(UI.BLANCO)
    .setBackground(UI.PURPURA_HEADER)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowBalance, 40);

  // Headers
  const headersBalance = ['Concepto', 'Este Mes', 'Acumulado Año'];
  headersBalance.forEach((h, i) => {
    sheet.getRange(rowBalance + 1, 2 + i)
      .setValue(h)
      .setFontWeight('bold')
      .setBackground(UI.PURPURA_FONDO)
      .setHorizontalAlignment(i === 0 ? 'left' : 'right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  });
  sheet.setRowHeight(rowBalance + 1, 25);

  // Préstamo NT → Familia
  sheet.getRange(rowBalance + 2, 2).setValue('Préstamo NT → Familia')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 2, 3)
    .setFormula(`=IFERROR(SUMIFS(CARGA_NT!F:F,CARGA_NT!D:D,"Préstamo NT → Familia",MONTH(CARGA_NT!A:A),MOVIMIENTO!L3,YEAR(CARGA_NT!A:A),${AÑO}),0)`)
    .setNumberFormat('#,##0')
    .setFontColor(UI.ROJO)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 2, 4)
    .setFormula(`=IFERROR(SUMIF(CARGA_NT!D:D,"Préstamo NT → Familia",CARGA_NT!F:F),0)`)
    .setNumberFormat('#,##0')
    .setFontColor(UI.ROJO)
    .setFontWeight('bold')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowBalance + 2, 24);

  // Devolución Familia → NT
  sheet.getRange(rowBalance + 3, 2).setValue('Devolución Familia → NT')
    .setBackground(UI.VERDE_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 3, 3)
    .setFormula(`=IFERROR(SUMIFS(CARGA_FAMILIA!F:F,CARGA_FAMILIA!D:D,"Devolución Familia → NT",MONTH(CARGA_FAMILIA!A:A),MOVIMIENTO!L3,YEAR(CARGA_FAMILIA!A:A),${AÑO}),0)`)
    .setNumberFormat('#,##0')
    .setFontColor(UI.VERDE)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 3, 4)
    .setFormula(`=IFERROR(SUMIF(CARGA_FAMILIA!D:D,"Devolución Familia → NT",CARGA_FAMILIA!F:F),0)`)
    .setNumberFormat('#,##0')
    .setFontColor(UI.VERDE)
    .setFontWeight('bold')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowBalance + 3, 24);

  // Saldo Neto
  sheet.getRange(rowBalance + 4, 2).setValue('📊 SALDO NETO')
    .setFontWeight('bold')
    .setBackground(UI.PURPURA_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 4, 3)
    .setFormula(`=IFERROR(C${rowBalance+2}-C${rowBalance+3},0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.PURPURA_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 4, 4)
    .setFormula(`=IFERROR(D${rowBalance+2}-D${rowBalance+3},0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground(UI.PURPURA_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowBalance + 4, 28);

  // Alerta Visual Grande
  sheet.getRange(rowBalance + 1, 6, 4, 6).merge()
    .setFormula(`=IFERROR(IF(D${rowBalance+4}>0,"⚠️ NT SUBSIDIA A FAMILIA"&CHAR(10)&CHAR(10)&"Gs. "&TEXT(D${rowBalance+4},"#,##0")&CHAR(10)&CHAR(10)&"El salario de administrador no cubre los gastos familiares","✅ BALANCE EQUILIBRADO"&CHAR(10)&CHAR(10)&"Familia no debe a NeuroTEA"),"")`)
    .setFontSize(12)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true);

  // Formato condicional para alerta
  const reglaAlertaRojo = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=$D$${rowBalance+4}>0`)
    .setBackground(UI.ROJO_FONDO)
    .setFontColor(UI.ROJO)
    .setRanges([sheet.getRange(rowBalance + 1, 6, 4, 6)])
    .build();

  const reglaAlertaVerde = SpreadsheetApp.newConditionalFormatRule()
    .whenFormulaSatisfied(`=$D$${rowBalance+4}<=0`)
    .setBackground(UI.VERDE_FONDO)
    .setFontColor(UI.VERDE)
    .setRanges([sheet.getRange(rowBalance + 1, 6, 4, 6)])
    .build();

  // Formato condicional para estados ✓ y ⚠
  const reglaEstadoOK = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('✓')
    .setFontColor(UI.VERDE)
    .setRanges([sheet.getRange('E:E'), sheet.getRange('K:K')])
    .build();

  const reglaEstadoAlerta = SpreadsheetApp.newConditionalFormatRule()
    .whenTextContains('⚠')
    .setFontColor(UI.ROJO)
    .setRanges([sheet.getRange('E:E'), sheet.getRange('K:K')])
    .build();

  // Formato condicional para diferencias
  const reglaDifPositiva = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberGreaterThan(0)
    .setFontColor(UI.VERDE)
    .setRanges([sheet.getRange('E8:E50')])
    .build();

  const reglaDifNegativa = SpreadsheetApp.newConditionalFormatRule()
    .whenNumberLessThan(0)
    .setFontColor(UI.ROJO)
    .setRanges([sheet.getRange('E8:E50')])
    .build();

  sheet.setConditionalFormatRules([
    reglaAlertaRojo, reglaAlertaVerde,
    reglaEstadoOK, reglaEstadoAlerta,
    reglaDifPositiva, reglaDifNegativa
  ]);

  // ═══════════════════════════════════════════════════════════════════════════
  // FOOTER
  // ═══════════════════════════════════════════════════════════════════════════

  const rowFooter = rowBalance + 6;
  sheet.getRange(rowFooter, 2, 1, 10).merge()
    .setValue('📝 Los campos marcados con ✏️ son editables manualmente  |  Sistema de Control Financiero v5.0  |  © 2026')
    .setFontSize(9)
    .setFontColor('#9CA3AF')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowFooter, 25);

  // Congelar filas superiores
  sheet.setFrozenRows(4);

  return sheet;
}
