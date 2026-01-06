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
    .setFormula('="   📅 Mes: "&MOVIMIENTO!B3&" (seleccionar en hoja MOVIMIENTO)                                    🗓️ Actualizado: "&TEXT(TODAY();"dd/mm/yyyy")')
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
  const headersCuentasFam = ['Cuenta', 'Esperado', 'Saldo Banco ✏️', 'Diferencia'];
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

    // Esperado (fórmula: Ingresos - Egresos del mes en esa cuenta)
    // NOTA: Para gastos fijos, usamos SUMPRODUCT buscando en GASTOS_FIJOS por cuenta (col F) y verificando en MOVIMIENTO si está pagado
    // ESTRUCTURA GASTOS_FIJOS v5.1: A=Concepto, B=Entidad, C=Categoría, D=Frecuencia, E=Día, F=Cuenta, G-R=Meses (SIN BASE)
    // ESTRUCTURA MOVIMIENTO v5.1: J=EST.PAGO, F=REAL, N3=MES_NUM
    const formulaEsperado = `=IFERROR(SUMPRODUCT((CARGA_FAMILIA!G$4:G$500="${cuenta}")*(CARGA_FAMILIA!B$4:B$500<>"Egreso Familiar")*(MONTH(CARGA_FAMILIA!A$4:A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!A$4:A$500)=${AÑO})*(CARGA_FAMILIA!F$4:F$500))-SUMPRODUCT((CARGA_FAMILIA!G$4:G$500="${cuenta}")*(CARGA_FAMILIA!B$4:B$500="Egreso Familiar")*(MONTH(CARGA_FAMILIA!A$4:A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!A$4:A$500)=${AÑO})*(CARGA_FAMILIA!F$4:F$500))-SUMPRODUCT((GASTOS_FIJOS!$F$6:$F$100="${cuenta}")*(IFERROR(INDEX(MOVIMIENTO!$J:$J;MATCH(GASTOS_FIJOS!$A$6:$A$100;MOVIMIENTO!$A:$A;0))="Pagado";0))*(IFERROR(INDEX(MOVIMIENTO!$F:$F;MATCH(GASTOS_FIJOS!$A$6:$A$100;MOVIMIENTO!$A:$A;0));0)));0)`;
    sheet.getRange(rowFam, 3).setFormula(formulaEsperado)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Saldo Banco (editable - azul) - lo que verificás en tu cuenta bancaria
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
  // SECCIÓN FAMILIA: INDICADORES DE DISTRIBUCIÓN
  // Muestra: Ingresos, Egresos Pagados, Ahorro, Fondo Emergencia
  // Equilibrio: INGRESOS = EGRESOS_PAGADOS + AHORRO + FONDO_EMERGENCIA + PENDIENTES
  // ═══════════════════════════════════════════════════════════════════════════

  // Título sección
  sheet.getRange(rowFam, 2, 1, 4).merge()
    .setValue('🎯 INDICADORES DE DISTRIBUCIÓN')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowFam, 32);
  rowFam++;

  // ROW 1: Labels
  sheet.getRange(rowFam, 2, 1, 2).merge()
    .setValue('INGRESOS DEL MES')
    .setFontSize(9)
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_FILA_PAR)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4, 1, 2).merge()
    .setValue('EGRESOS PAGADOS')
    .setFontSize(9)
    .setFontColor(UI.NEGRO)
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 22);
  rowFam++;

  // ROW 2: Valores Ingresos y Egresos
  // Ingresos FAMILIA (suma de CARGA_FAMILIA con TIPO != "Egreso Familiar" en el mes activo)
  // ACTUALIZADO: $N$3 es el nuevo MES_NUM en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 2, 1, 2).merge()
    .setFormula('=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$B$4:$B$500<>"Egreso Familiar")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500));0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.FAM_TEXTO)
    .setBackground(UI.FAM_FILA_PAR)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  const filaValorIngresosFamInd = rowFam;

  // Egresos Pagados FAMILIA (filtrado por EST.PAGO = "Pagado" en MOVIMIENTO)
  // ACTUALIZADO: F=REAL, J=EST.PAGO en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 4, 1, 2).merge()
    .setFormula('=IFERROR(SUMIFS(MOVIMIENTO!F9:F70;MOVIMIENTO!B9:B70;"Egreso";MOVIMIENTO!J9:J70;"Pagado");0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.NEGRO)
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  const filaValorEgresosFamInd = rowFam;
  sheet.setRowHeight(rowFam, 35);
  rowFam++;

  // Espaciador
  sheet.setRowHeight(rowFam, 8);
  rowFam++;

  // ROW 3: Labels Ahorro y Fondo Emergencia
  sheet.getRange(rowFam, 2, 1, 2).merge()
    .setValue('💰 AHORRO')
    .setFontSize(9)
    .setFontColor(UI.VERDE)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.VERDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4, 1, 2).merge()
    .setValue('🛡️ FONDO EMERGENCIA')
    .setFontSize(9)
    .setFontColor(UI.AMARILLO)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.AMARILLO, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 22);
  rowFam++;

  // ROW 4: Valores Ahorro y Fondo Emergencia (desde CARGA_FAMILIA por CATEGORÍA)
  // AHORRO = suma de CARGA_FAMILIA donde CATEGORÍA = "AHORRO" en el mes activo
  // ACTUALIZADO: $N$3 es el nuevo MES_NUM en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 2, 1, 2).merge()
    .setFormula('=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$C$4:$C$500="AHORRO")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500));0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.VERDE)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.VERDE, SpreadsheetApp.BorderStyle.SOLID);
  const filaValorAhorroFam = rowFam;

  // FONDO EMERGENCIA = suma de CARGA_FAMILIA donde CATEGORÍA = "FONDO DE EMERGENCIA" en el mes activo
  sheet.getRange(rowFam, 4, 1, 2).merge()
    .setFormula('=IFERROR(SUMPRODUCT((CARGA_FAMILIA!$C$4:$C$500="FONDO DE EMERGENCIA")*(MONTH(CARGA_FAMILIA!$A$4:$A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)*(CARGA_FAMILIA!$F$4:$F$500));0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.AMARILLO)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.AMARILLO, SpreadsheetApp.BorderStyle.SOLID);
  const filaValorFondoEmFam = rowFam;
  sheet.setRowHeight(rowFam, 35);
  rowFam++;

  // Espaciador
  sheet.setRowHeight(rowFam, 8);
  rowFam++;

  // ROW 5: Balance de distribución
  // NOTA: La fórmula compara Ingresos de CARGA vs distribución
  // EGRESOS_PAGADOS incluye gastos fijos + variables de MOVIMIENTO
  // AHORRO y FONDO solo vienen de CARGA_FAMILIA
  // La diferencia muestra dinero sin asignar o faltante
  sheet.getRange(rowFam, 2, 1, 4).merge()
    .setFormula(`=IFERROR(LET(diff;B${filaValorIngresosFamInd}-(D${filaValorEgresosFamInd}+B${filaValorAhorroFam}+D${filaValorFondoEmFam});IF(ABS(diff)<1000;"✅ EQUILIBRADO: Ingresos distribuidos correctamente";IF(diff>0;"💰 DISPONIBLE: Gs. "&TEXT(diff;"#,##0")&" sin asignar";"⚠️ DÉFICIT: Gs. "&TEXT(ABS(diff);"#,##0")&" de más pagado")));"")`)
    .setFontSize(10)
    .setFontWeight('bold')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setWrap(true)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 28);
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

  // Valor Ingresos NEUROTEA (rango específico: filas 73-150)
  // ACTUALIZADO: F=REAL en MOVIMIENTO v5.1
  sheet.getRange(rowNT, 8, 1, 2).merge()
    .setFormula('=IFERROR(SUMIF(MOVIMIENTO!B73:B150;"Ingreso";MOVIMIENTO!F73:F150);0)')
    .setNumberFormat('#,##0')
    .setFontSize(16)
    .setFontWeight('bold')
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_FILA_PAR)
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

  // Valor Gastos NEUROTEA (rango específico: filas 73-150)
  // ACTUALIZADO: F=REAL en MOVIMIENTO v5.1
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setFormula('=IFERROR(SUMIF(MOVIMIENTO!B73:B150;"Egreso";MOVIMIENTO!F73:F150);0)')
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
    .setFormula(`=IFERROR(H${filaIngresosNT}-J${filaIngresosNT},0)`)
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
    .setFormula(`=IFERROR(H${filaIngresosNT}*0,07;0)`)
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
    .setFormula(`="📊 % Gastos: "&TEXT(IFERROR(IF(H${filaIngresosNT}>0;J${filaIngresosNT}/H${filaIngresosNT};0);0);"0%")&" de 93% máximo"`)
    .setFontSize(11)
    .setBackground('#E0F2FE')
    .setHorizontalAlignment('center')
    .setVerticalAlignment('middle')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
  rowNT++;

  // Estado de meta (badge grande)
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setFormula(`=IFERROR(IF(H${filaGananciaNT}>=J${filaGananciaNT};"✅ META CUMPLIDA - Superávit: Gs. "&TEXT(H${filaGananciaNT}-J${filaGananciaNT};"#.##0");"⚠️ META NO CUMPLIDA - Falta: Gs. "&TEXT(J${filaGananciaNT}-H${filaGananciaNT};"#.##0"));"⏳ Sin datos")`)
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
    .setFormula(`="💰 Distribución Ganancia (Meta: Gs. "&TEXT(IFERROR(J${filaGananciaNT};0);"#.##0")&")"`)
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
  sheet.getRange(rowNT, 8).setFormula(`=IFERROR(H${filaGananciaNT}*0,3333;0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#F3E8FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setFormula(`=IFERROR(H${filaGananciaNT}*0,3333;0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#FFEDD5')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10, 1, 2).merge()
    .setFormula(`=IFERROR(H${filaGananciaNT}*0,3334;0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#CFFAFE')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
  rowNT++;

  // ═══════════════════════════════════════════════════════════════════════════
  // SECCIÓN FAMILIA: FLUJO DE CAJA DEL MES (Filas 20+)
  // Implementa: SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS = DISPONIBLE
  // Decisión [2026-01-03k]: EST. PAGO como gatillo de contabilización
  // Decisión [2026-01-03m]: SALDO_INICIAL manual por mes
  // ═══════════════════════════════════════════════════════════════════════════

  rowFam++; // Espaciador

  // Título sección
  sheet.getRange(rowFam, 2, 1, 4).merge()
    .setValue('💵 FLUJO DE CAJA DEL MES')
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

  // SALDO INICIAL (desde CONFIG - independiente por mes)
  // Decisión [2026-01-06]: Cada mes tiene su saldo inicial en CONFIG!A48:C59
  // La fórmula usa INDEX/MATCH para traer el valor del mes seleccionado
  sheet.getRange(rowFam, 2).setValue('📥 SALDO INICIAL')
    .setBackground(UI.GRIS_INFO)
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setValue('-')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // Fórmula: Lee el saldo inicial del mes desde CONFIG (columna B = FAMILIA)
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(INDEX(CONFIG!$B$48:$B$59;MATCH(MOVIMIENTO!$B$3;CONFIG!$A$48:$A$59;0));0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('right')
    .setFontColor(UI.NT_EDITABLE)
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setValue('→ CONFIG')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setFontStyle('italic')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaSaldoInicialFam = rowFam;
  rowFam++;

  // Total Ingresos FAMILIA (rango específico de FAMILIA: filas 9-70)
  // ACTUALIZADO: E=PRESUP, F=REAL en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 2).setValue('➕ Total Ingresos')
    .setBackground(UI.VERDE_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B9:B70;"Ingreso";MOVIMIENTO!E9:E70);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B9:B70;"Ingreso";MOVIMIENTO!F9:F70);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=C${rowFam};"✓ OK";"⚠")`)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaIngresosFam = rowFam;
  rowFam++;

  // Egresos PAGADOS FAMILIA (filtrado por EST. PAGO = "Pagado")
  // ACTUALIZADO: E=PRESUP, F=REAL, J=EST.PAGO en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 2).setValue('➖ Egresos Pagados')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B9:B70;"Egreso";MOVIMIENTO!E9:E70);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // REAL = Solo los que tienen EST. PAGO = "Pagado" (columna J)
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!F9:F70;MOVIMIENTO!B9:B70;"Egreso";MOVIMIENTO!J9:J70;"Pagado");0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}<=C${rowFam};"✓ OK";"⚠")`)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaEgresosPagadosFam = rowFam;
  rowFam++;

  // DISPONIBLE = SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS
  sheet.getRange(rowFam, 2).setValue('💰 DISPONIBLE')
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setValue('-')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${filaSaldoInicialFam}+D${filaIngresosFam}-D${filaEgresosPagadosFam};0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setFontSize(12)
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0;"✓ OK";"⚠ DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground(UI.FAM_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 28);
  const filaDisponibleFam = rowFam;
  rowFam++;

  // Separador visual
  sheet.setRowHeight(rowFam, 6);
  rowFam++;

  // Egresos PENDIENTES FAMILIA (filtrado por EST. PAGO = "Pendiente")
  // ACTUALIZADO: F=REAL, J=EST.PAGO en MOVIMIENTO v5.1
  sheet.getRange(rowFam, 2).setValue('⏳ Egresos Pendientes')
    .setBackground(UI.AMARILLO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setValue('-')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // PENDIENTES = Solo los que tienen EST. PAGO = "Pendiente" (columna J)
  sheet.getRange(rowFam, 4).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!F9:F70;MOVIMIENTO!B9:B70;"Egreso";MOVIMIENTO!J9:J70;"Pendiente");0)')
    .setNumberFormat('#,##0')
    .setFontColor(UI.AMARILLO)
    .setFontWeight('bold')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}=0;"✓ Todo pagado";"⏳ Pendiente")`)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 24);
  const filaEgresosPendientesFam = rowFam;
  rowFam++;

  // PROYECCIÓN = DISPONIBLE - EGRESOS_PENDIENTES
  sheet.getRange(rowFam, 2).setValue('📊 PROYECCIÓN FIN DE MES')
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3).setValue('-')
    .setBackground('#E0E7FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${filaDisponibleFam}-D${filaEgresosPendientesFam};0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0;"SUPERÁVIT";"DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
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
  ['Cuenta', 'Esperado', 'Saldo Banco ✏️', 'Estado'].forEach((h, i) => {
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

    // Esperado (fórmula automática: suma de INGRESOS del mes en esa cuenta desde CARGA_NT)
    // ACTUALIZADO: $N$3 es el nuevo MES_NUM en MOVIMIENTO v5.1
    const formulaEsperado = `=IFERROR(SUMPRODUCT((CARGA_NT!G$4:G$500="${cuenta}")*(CARGA_NT!B$4:B$500<>"Egreso NT")*(MONTH(CARGA_NT!A$4:A$500)=MOVIMIENTO!$N$3)*(YEAR(CARGA_NT!A$4:A$500)=${AÑO})*(CARGA_NT!F$4:F$500));0)`;
    sheet.getRange(rowNT, 9).setFormula(formulaEsperado)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Saldo Banco ✏️ (editable - manual: lo que verificás en tu cuenta bancaria)
    sheet.getRange(rowNT, 10).setValue(0)
      .setNumberFormat('#,##0')
      .setBackground(bgColor)
      .setHorizontalAlignment('right')
      .setFontColor(UI.NT_EDITABLE)
      .setFontWeight('bold')
      .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);

    // Estado (fórmula: Real >= Esperado)
    sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}>=I${rowNT};"✓";"⚠")`)
      .setBackground(bgColor)
      .setHorizontalAlignment('center')
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
  // SECCIÓN NEUROTEA: FLUJO DE CAJA DEL MES
  // Implementa: SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS = DISPONIBLE
  // Decisión [2026-01-03k]: EST. PAGO como gatillo de contabilización
  // Decisión [2026-01-03m]: SALDO_INICIAL manual por mes
  // ═══════════════════════════════════════════════════════════════════════════

  // Título sección
  sheet.getRange(rowNT, 8, 1, 4).merge()
    .setValue('💵 FLUJO DE CAJA DEL MES')
    .setFontSize(12)
    .setFontWeight('bold')
    .setFontColor(UI.NT_TEXTO)
    .setBackground(UI.NT_TITULO)
    .setVerticalAlignment('middle');
  sheet.setRowHeight(rowNT, 32);
  rowNT++;

  // Headers
  ['Concepto', 'Presupuesto', 'Real', 'Estado'].forEach((h, i) => {
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

  // SALDO INICIAL NT (desde CONFIG - independiente por mes)
  // Decisión [2026-01-06]: Cada mes tiene su saldo inicial en CONFIG!A48:C59
  sheet.getRange(rowNT, 8).setValue('📥 SALDO INICIAL')
    .setBackground(UI.GRIS_INFO)
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setValue('-')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // Fórmula: Lee el saldo inicial del mes desde CONFIG (columna C = NEUROTEA)
  sheet.getRange(rowNT, 10).setFormula('=IFERROR(INDEX(CONFIG!$C$48:$C$59;MATCH(MOVIMIENTO!$B$3;CONFIG!$A$48:$A$59;0));0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('right')
    .setFontColor(UI.NT_EDITABLE)
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setValue('→ CONFIG')
    .setBackground(UI.GRIS_INFO)
    .setHorizontalAlignment('center')
    .setFontStyle('italic')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 24);
  const filaSaldoInicialNT = rowNT;
  rowNT++;

  // Total Ingresos NT (rango específico de NT: filas 73-150)
  // ACTUALIZADO: E=PRESUP, F=REAL en MOVIMIENTO v5.1
  sheet.getRange(rowNT, 8).setValue('➕ Total Ingresos')
    .setBackground(UI.VERDE_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B73:B150;"Ingreso";MOVIMIENTO!E73:E150);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B73:B150;"Ingreso";MOVIMIENTO!F73:F150);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}>=I${rowNT};"✓ OK";"⚠")`)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 24);
  const filaIngresosNTFlujo = rowNT;
  rowNT++;

  // Egresos PAGADOS NT (filtrado por EST. PAGO = "Pagado")
  // ACTUALIZADO: E=PRESUP, F=REAL, J=EST.PAGO en MOVIMIENTO v5.1
  sheet.getRange(rowNT, 8).setValue('➖ Egresos Pagados')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setFormula('=IFERROR(SUMIF(MOVIMIENTO!B73:B150;"Egreso";MOVIMIENTO!E73:E150);0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // REAL = Solo los que tienen EST. PAGO = "Pagado" (columna J)
  sheet.getRange(rowNT, 10).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!F73:F150;MOVIMIENTO!B73:B150;"Egreso";MOVIMIENTO!J73:J150;"Pagado");0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}<=I${rowNT};"✓ OK";"⚠")`)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 24);
  const filaEgresosPagadosNT = rowNT;
  rowNT++;

  // DISPONIBLE NT = SALDO_INICIAL + INGRESOS - EGRESOS_PAGADOS
  sheet.getRange(rowNT, 8).setValue('💰 DISPONIBLE')
    .setFontWeight('bold')
    .setBackground(UI.NT_SUBTOTAL)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setValue('-')
    .setBackground(UI.NT_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10).setFormula(`=IFERROR(J${filaSaldoInicialNT}+J${filaIngresosNTFlujo}-J${filaEgresosPagadosNT};0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setFontSize(12)
    .setBackground(UI.NT_SUBTOTAL)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}>=0;"✓ OK";"⚠ DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground(UI.NT_SUBTOTAL)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
  const filaDisponibleNT = rowNT;
  rowNT++;

  // Separador visual
  sheet.setRowHeight(rowNT, 6);
  rowNT++;

  // Egresos PENDIENTES NT (filtrado por EST. PAGO = "Pendiente")
  // ACTUALIZADO: F=REAL, J=EST.PAGO en MOVIMIENTO v5.1
  sheet.getRange(rowNT, 8).setValue('⏳ Egresos Pendientes')
    .setBackground(UI.AMARILLO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setValue('-')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  // PENDIENTES = Solo los que tienen EST. PAGO = "Pendiente" (columna J)
  sheet.getRange(rowNT, 10).setFormula('=IFERROR(SUMIFS(MOVIMIENTO!F73:F150;MOVIMIENTO!B73:B150;"Egreso";MOVIMIENTO!J73:J150;"Pendiente");0)')
    .setNumberFormat('#,##0')
    .setFontColor(UI.AMARILLO)
    .setFontWeight('bold')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}=0;"✓ Todo pagado";"⏳ Pendiente")`)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 24);
  const filaEgresosPendientesNT = rowNT;
  rowNT++;

  // PROYECCIÓN NT = DISPONIBLE - EGRESOS_PENDIENTES
  sheet.getRange(rowNT, 8).setValue('📊 PROYECCIÓN FIN DE MES')
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 9).setValue('-')
    .setBackground('#E0E7FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 10).setFormula(`=IFERROR(J${filaDisponibleNT}-J${filaEgresosPendientesNT};0)`)
    .setNumberFormat('#,##0')
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowNT, 11).setFormula(`=IF(J${rowNT}>=0;"SUPERÁVIT";"DÉFICIT")`)
    .setFontWeight('bold')
    .setBackground('#E0E7FF')
    .setHorizontalAlignment('center')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowNT, 28);
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

  // ESTA SEMANA (días HOY a HOY+7) - Con fórmula SIMPLIFICADA
  // ACTUALIZADO: Usa MOVIMIENTO!D=DÍA, J=EST.PAGO, F=REAL (sin INDEX/MATCH desde GASTOS_FIJOS)
  sheet.getRange(rowFam, 2).setValue('🔴 Esta semana (0-7 días)')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70>=DAY(TODAY()))*(MOVIMIENTO!$D$9:$D$70<=DAY(TODAY())+7)*(MOVIMIENTO!$F$9:$F$70));0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${rowFam-1}-C${rowFam};0)`)
    .setNumberFormat('#,##0')
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0;"✓ OK";"⚠ FALTA")`)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 22);
  rowFam++;

  // PRÓXIMA SEMANA (días HOY+8 a HOY+14) - Con fórmula SIMPLIFICADA
  sheet.getRange(rowFam, 2).setValue('🟡 Próxima semana (8-14 días)')
    .setBackground(UI.AMARILLO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70>DAY(TODAY())+7)*(MOVIMIENTO!$D$9:$D$70<=DAY(TODAY())+14)*(MOVIMIENTO!$F$9:$F$70));0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('right')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${rowFam-1}-C${rowFam};0)`)
    .setNumberFormat('#,##0')
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0;"✓ OK";"⚠ FALTA")`)
    .setBackground(UI.AMARILLO_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 22);
  rowFam++;

  // TERCERA SEMANA (días HOY+15 a HOY+21) - Con fórmula SIMPLIFICADA
  sheet.getRange(rowFam, 2).setValue('🟢 3ra semana (15-21 días)')
    .setBackground(UI.VERDE_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 3)
    .setFormula('=IFERROR(SUMPRODUCT((MOVIMIENTO!$J$9:$J$70="Pendiente")*(MOVIMIENTO!$B$9:$B$70="Egreso")*(MOVIMIENTO!$D$9:$D$70>0)*(MOVIMIENTO!$D$9:$D$70>DAY(TODAY())+14)*(MOVIMIENTO!$D$9:$D$70<=DAY(TODAY())+21)*(MOVIMIENTO!$F$9:$F$70));0)')
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 4).setFormula(`=IFERROR(D${rowFam-1}-C${rowFam};0)`)
    .setNumberFormat('#,##0')
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowFam, 5).setFormula(`=IF(D${rowFam}>=0;"✓ OK";"⚠ FALTA")`)
    .setBackground(UI.VERDE_FONDO)
    .setHorizontalAlignment('center')
    .setFontWeight('bold')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.setRowHeight(rowFam, 22);
  rowFam++;

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
  // ACTUALIZADO: N3=MES_NUM en MOVIMIENTO v5.1
  sheet.getRange(rowBalance + 2, 2).setValue('Préstamo NT → Familia')
    .setBackground(UI.ROJO_FONDO)
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 2, 3)
    .setFormula(`=IFERROR(SUMPRODUCT((CARGA_NT!D4:D500="Préstamo NT → Familia")*(MONTH(CARGA_NT!A4:A500)=MOVIMIENTO!N3)*(YEAR(CARGA_NT!A4:A500)=${AÑO})*(CARGA_NT!F4:F500));0)`)
    .setNumberFormat('#,##0')
    .setFontColor(UI.ROJO)
    .setBackground(UI.ROJO_FONDO)
    .setHorizontalAlignment('right')
    .setBorder(true, true, true, true, false, false, UI.GRIS_BORDE, SpreadsheetApp.BorderStyle.SOLID);
  sheet.getRange(rowBalance + 2, 4)
    .setFormula(`=IFERROR(SUMIF(CARGA_NT!D:D;"Préstamo NT → Familia";CARGA_NT!F:F);0)`)
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
    .setFormula(`=IFERROR(SUMPRODUCT((CARGA_FAMILIA!D4:D500="Devolución Familia → NT")*(MONTH(CARGA_FAMILIA!A4:A500)=MOVIMIENTO!N3)*(YEAR(CARGA_FAMILIA!A4:A500)=${AÑO})*(CARGA_FAMILIA!F4:F500));0)`)
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
