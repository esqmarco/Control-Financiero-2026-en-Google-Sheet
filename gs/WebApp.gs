/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WEBAPP.GS - DASHBOARD FINANCIERO v2.0
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Google Charts Visualization API + Tabs + 12-month trends
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function formatearGuaranies(num) {
  if (num === 0 || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('es-PY').format(Math.round(num));
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA COLLECTION - Comprehensive data for dashboard
// ═══════════════════════════════════════════════════════════════════════════════

function obtenerDatosDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  var movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);
  var config = ss.getSheetByName(NOMBRES_HOJAS.CONFIG);
  var cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  var cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  var gastosFijos = ss.getSheetByName(NOMBRES_HOJAS.GASTOS_FIJOS);
  var presupuesto = ss.getSheetByName(NOMBRES_HOJAS.PRESUPUESTO);

  var mesSeleccionado = movimiento ? movimiento.getRange('B3').getValue() : 'Enero';
  var mesNum = MESES.indexOf(mesSeleccionado) + 1;

  function leerNumero(rango) {
    try {
      var val = rango.getValue();
      if (val === '' || val === null || val === undefined) return 0;
      var num = Number(val);
      return isNaN(num) ? 0 : num;
    } catch(e) { return 0; }
  }

  // ═══ METAS FROM CONFIG (v7.28: rows B43-B47) ═══
  var metas = { ganancia: 7, maxGastos: 93, distUtilidad: 33.33, distEmergencia: 33.33, distInversion: 33.34 };
  if (config) {
    metas.ganancia = Number(config.getRange('B43').getValue()) || 7;
    metas.maxGastos = Number(config.getRange('B44').getValue()) || 93;
    metas.distUtilidad = Number(config.getRange('B45').getValue()) || 33.33;
    metas.distEmergencia = Number(config.getRange('B46').getValue()) || 33.33;
    metas.distInversion = Number(config.getRange('B47').getValue()) || 33.34;
  }

  // ═══ TABLERO - Dynamic row positions ═══
  var FILA_INICIO_CUENTAS_FAM = 8;
  var FILA_TOTAL_CUENTAS_FAM = FILA_INICIO_CUENTAS_FAM + CUENTAS_FAMILIA.length;
  var FILA_TITULO_RESUMEN = FILA_TOTAL_CUENTAS_FAM + 3;
  var FILA_INGRESOS_FAM = FILA_TITULO_RESUMEN + 2;
  var FILA_EGRESOS_FAM = FILA_INGRESOS_FAM + 1;
  var FILA_BALANCE_FAM = FILA_EGRESOS_FAM + 1;
  var FILA_TITULO_LIQUIDEZ = FILA_BALANCE_FAM + 2;
  var FILA_CAJA_DISP = FILA_TITULO_LIQUIDEZ + 2;
  var FILA_SEMANA_1 = FILA_CAJA_DISP + 1;
  var FILA_SALDO_FINAL_FAM = FILA_SEMANA_1 + 3;

  var FILA_INGRESOS_NT = 9;
  var FILA_GANANCIA_NT = 13;
  var FILA_DISTRIBUCION = 20;
  var FILA_INICIO_CUENTAS_NT = 24;
  var FILA_TOTAL_CUENTAS_NT = FILA_INICIO_CUENTAS_NT + CUENTAS_NT.length;
  var FILA_BALANCE_CRUZADO = Math.max(FILA_SALDO_FINAL_FAM, FILA_TOTAL_CUENTAS_NT + 2) + 3;

  // ═══ ACCOUNTS - FAMILIA ═══
  var cuentasFamilia = [];
  if (tablero) {
    for (var i = 0; i < CUENTAS_FAMILIA.length; i++) {
      var fila = FILA_INICIO_CUENTAS_FAM + i;
      cuentasFamilia.push({
        nombre: CUENTAS_FAMILIA[i],
        esperado: leerNumero(tablero.getRange(fila, 3)),
        real: leerNumero(tablero.getRange(fila, 4)),
        diferencia: leerNumero(tablero.getRange(fila, 5))
      });
    }
  }

  // ═══ ACCOUNTS - NEUROTEA ═══
  var cuentasNT = [];
  if (tablero) {
    for (var j = 0; j < CUENTAS_NT.length; j++) {
      var filaNT = FILA_INICIO_CUENTAS_NT + j;
      cuentasNT.push({
        nombre: CUENTAS_NT[j],
        saldo: leerNumero(tablero.getRange(filaNT, 9)),
        acumulado: leerNumero(tablero.getRange(filaNT, 10))
      });
    }
  }
  var totalCuentasNT = tablero ? leerNumero(tablero.getRange(FILA_TOTAL_CUENTAS_NT, 9)) : 0;

  // ═══ NEUROTEA INDICATORS ═══
  var ingresosNT = 0, gastosNT = 0, gananciaNT = 0, metaNT = 0;
  var utilidadDueno = 0, fondoEmergenciaNT = 0, fondoInversionNT = 0;
  var egresosPendientesNT = 0;
  if (tablero) {
    ingresosNT = leerNumero(tablero.getRange(FILA_INGRESOS_NT, 8));
    gastosNT = leerNumero(tablero.getRange(FILA_INGRESOS_NT, 10));
    gananciaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 8));
    metaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 10));
    utilidadDueno = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 9));
    fondoEmergenciaNT = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 10));
    fondoInversionNT = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 11));
  }

  // ═══ FAMILIA RESUMEN ═══
  var ingresosFamReal = 0, egresosFamReal = 0, egresosPendientesFam = 0;
  var ahorroFam = 0, fondoEmergenciaFam = 0;
  if (tablero) {
    ingresosFamReal = leerNumero(tablero.getRange(FILA_INGRESOS_FAM, 4));
    egresosFamReal = leerNumero(tablero.getRange(FILA_EGRESOS_FAM, 4));
  }

  // Read MOVIMIENTO for FAMILIA ahorro, fondo, pendientes
  if (movimiento) {
    var datosFamMov = movimiento.getRange('A9:J116').getValues();
    for (var idx = 0; idx < datosFamMov.length; idx++) {
      var filaM = datosFamMov[idx];
      var concepto = filaM[0] ? filaM[0].toString() : '';
      var tipo = filaM[1] ? filaM[1].toString() : '';
      var real = Number(filaM[5]) || 0;
      var estPago = filaM[9] ? filaM[9].toString() : '';

      if (concepto.indexOf('Ahorro') >= 0 || concepto.indexOf('AHORRO') >= 0) ahorroFam += real;
      if (concepto.indexOf('Fondo') >= 0 && concepto.indexOf('Emergencia') >= 0) fondoEmergenciaFam += real;
      if (tipo === 'Egreso' && estPago === 'Pendiente') egresosPendientesFam += real;
    }
  }

  // NEUROTEA pendientes
  if (movimiento) {
    var datosNTMov = movimiento.getRange('A122:J206').getValues();
    for (var idxNT = 0; idxNT < datosNTMov.length; idxNT++) {
      var filaNTM = datosNTMov[idxNT];
      var tipoNT = filaNTM[1] ? filaNTM[1].toString() : '';
      var realNT = Number(filaNTM[5]) || 0;
      var estPagoNT = filaNTM[9] ? filaNTM[9].toString() : '';
      if (tipoNT === 'Egreso' && estPagoNT === 'Pendiente') egresosPendientesNT += realNT;
    }
  }

  // ═══ LIQUIDEZ FAMILIA ═══
  var liquidez = { cajaDisponible: 0, semanas: [], saldoFinal: 0 };
  if (tablero) {
    liquidez.cajaDisponible = leerNumero(tablero.getRange(FILA_CAJA_DISP, 4));
    var nombresS = ['Esta semana', 'Prox. semana', '3ra semana'];
    for (var k = 0; k < 3; k++) {
      var filaS = FILA_SEMANA_1 + k;
      liquidez.semanas.push({
        nombre: nombresS[k],
        gastos: leerNumero(tablero.getRange(filaS, 3)),
        saldo: leerNumero(tablero.getRange(filaS, 4))
      });
    }
    liquidez.saldoFinal = leerNumero(tablero.getRange(FILA_SALDO_FINAL_FAM, 4));
  }

  // ═══ BALANCE CRUZADO ═══
  var balanceCruzado = {
    prestamoNTMes: 0, prestamoNTAcum: 0, devFamMes: 0, devFamAcum: 0,
    deudaFamMes: 0, deudaFamAcum: 0,
    prestamoFamMes: 0, prestamoFamAcum: 0, devNTMes: 0, devNTAcum: 0,
    deudaNTMes: 0, deudaNTAcum: 0,
    balanceNetoMes: 0, balanceNeto: 0
  };
  if (tablero) {
    var fBC = FILA_BALANCE_CRUZADO + 2;
    balanceCruzado.prestamoNTMes = leerNumero(tablero.getRange(fBC, 3));
    balanceCruzado.prestamoNTAcum = leerNumero(tablero.getRange(fBC, 4));
    balanceCruzado.devFamMes = leerNumero(tablero.getRange(fBC+1, 3));
    balanceCruzado.devFamAcum = leerNumero(tablero.getRange(fBC+1, 4));
    balanceCruzado.deudaFamMes = leerNumero(tablero.getRange(fBC+2, 3));
    balanceCruzado.deudaFamAcum = leerNumero(tablero.getRange(fBC+2, 4));
    balanceCruzado.prestamoFamMes = leerNumero(tablero.getRange(fBC+3, 3));
    balanceCruzado.prestamoFamAcum = leerNumero(tablero.getRange(fBC+3, 4));
    balanceCruzado.devNTMes = leerNumero(tablero.getRange(fBC+4, 3));
    balanceCruzado.devNTAcum = leerNumero(tablero.getRange(fBC+4, 4));
    balanceCruzado.deudaNTMes = leerNumero(tablero.getRange(fBC+5, 3));
    balanceCruzado.deudaNTAcum = leerNumero(tablero.getRange(fBC+5, 4));
    balanceCruzado.balanceNetoMes = leerNumero(tablero.getRange(fBC+6, 3));
    balanceCruzado.balanceNeto = leerNumero(tablero.getRange(fBC+6, 4));
  }

  // ═══ CATEGORY BREAKDOWN FROM MOVIMIENTO ═══
  var categoriasFamilia = [];
  var categoriasNT = [];
  if (movimiento) {
    var dataFMov = movimiento.getRange('A9:F116').getValues();
    for (var m = 0; m < dataFMov.length; m++) {
      var c = (dataFMov[m][0] || '').toString();
      if (c.indexOf('\u25B6') >= 0) {
        categoriasFamilia.push({
          nombre: c.replace('\u25B6', '').trim(),
          presupuesto: Number(dataFMov[m][4]) || 0,
          real: Number(dataFMov[m][5]) || 0
        });
      }
    }
    var dataNMov = movimiento.getRange('A122:F206').getValues();
    for (var n = 0; n < dataNMov.length; n++) {
      var cn = (dataNMov[n][0] || '').toString();
      if (cn.indexOf('\u25B6') >= 0) {
        categoriasNT.push({
          nombre: cn.replace('\u25B6', '').trim(),
          presupuesto: Number(dataNMov[n][4]) || 0,
          real: Number(dataNMov[n][5]) || 0
        });
      }
    }
  }

  // ═══ 12-MONTH TREND DATA ═══
  var tendencia = {
    familia: {
      ingresos: new Array(12).fill(0), egresos: new Array(12).fill(0),
      ahorro: new Array(12).fill(0),
      presupIngresos: new Array(12).fill(0), presupEgresos: new Array(12).fill(0)
    },
    neurotea: {
      ingresos: new Array(12).fill(0), egresos: new Array(12).fill(0),
      presupIngresos: new Array(12).fill(0), presupEgresos: new Array(12).fill(0)
    }
  };

  // CARGA_FAMILIA monthly sums
  if (cargaFam) {
    var dataCF = cargaFam.getRange('A4:F500').getValues();
    for (var ci = 0; ci < dataCF.length; ci++) {
      var fecha = dataCF[ci][0];
      var tipoC = (dataCF[ci][1] || '').toString();
      var montoC = Number(dataCF[ci][5]) || 0;
      if (!fecha || montoC === 0) continue;
      var mesC, yearC;
      try { mesC = fecha.getMonth(); yearC = fecha.getFullYear(); } catch(e) { continue; }
      if (yearC !== AÑO) continue;
      if (tipoC === 'Egreso Familiar') tendencia.familia.egresos[mesC] += montoC;
      else if (tipoC === 'Ahorro') tendencia.familia.ahorro[mesC] += montoC;
      else if (tipoC) tendencia.familia.ingresos[mesC] += montoC;
    }
  }

  // CARGA_NT monthly sums
  if (cargaNT) {
    var dataCN = cargaNT.getRange('A4:F500').getValues();
    for (var ni = 0; ni < dataCN.length; ni++) {
      var fechaN = dataCN[ni][0];
      var tipoN = (dataCN[ni][1] || '').toString();
      var montoN = Number(dataCN[ni][5]) || 0;
      if (!fechaN || montoN === 0) continue;
      var mesN, yearN;
      try { mesN = fechaN.getMonth(); yearN = fechaN.getFullYear(); } catch(e) { continue; }
      if (yearN !== AÑO) continue;
      if (tipoN === 'Egreso NT') tendencia.neurotea.egresos[mesN] += montoN;
      else if (tipoN) tendencia.neurotea.ingresos[mesN] += montoN;
    }
  }

  // GASTOS_FIJOS monthly sums (add to egresos)
  if (gastosFijos) {
    var dataGF = gastosFijos.getRange('A2:R500').getValues();
    for (var gi = 0; gi < dataGF.length; gi++) {
      var entidad = (dataGF[gi][1] || '').toString().trim();
      if (!dataGF[gi][0] || !entidad) continue;
      for (var gm = 0; gm < 12; gm++) {
        var val = Number(dataGF[gi][6 + gm]) || 0;
        if (val === 0) continue;
        if (entidad === 'FAMILIA') tendencia.familia.egresos[gm] += val;
        else if (entidad === 'NEUROTEA') tendencia.neurotea.egresos[gm] += val;
      }
    }
  }

  // PRESUPUESTO total rows (planned values per month)
  if (presupuesto) {
    var dataP = presupuesto.getRange('A1:P200').getValues();
    for (var pi = 0; pi < dataP.length; pi++) {
      var cp = (dataP[pi][0] || '').toString();
      if (cp.indexOf('TOTAL INGRESOS FAMILIA') >= 0) {
        for (var pm = 0; pm < 12; pm++) tendencia.familia.presupIngresos[pm] = Number(dataP[pi][3 + pm]) || 0;
      } else if (cp.indexOf('TOTAL EGRESOS FAMILIA') >= 0) {
        for (var pm = 0; pm < 12; pm++) tendencia.familia.presupEgresos[pm] = Number(dataP[pi][3 + pm]) || 0;
      } else if (cp.indexOf('TOTAL INGRESOS NEUROTEA') >= 0) {
        for (var pm = 0; pm < 12; pm++) tendencia.neurotea.presupIngresos[pm] = Number(dataP[pi][3 + pm]) || 0;
      } else if (cp.indexOf('TOTAL EGRESOS NEUROTEA') >= 0) {
        for (var pm = 0; pm < 12; pm++) tendencia.neurotea.presupEgresos[pm] = Number(dataP[pi][3 + pm]) || 0;
      }
    }
  }

  // ═══ RETURN COMPLETE DATA ═══
  var disponibleFam = ingresosFamReal - egresosFamReal - ahorroFam - fondoEmergenciaFam;
  var proyeccionFam = disponibleFam - egresosPendientesFam;
  var pctGastosNT = ingresosNT > 0 ? Math.round(gastosNT / ingresosNT * 100) : 0;

  return {
    mes: mesSeleccionado,
    mesNum: mesNum,
    meses: MESES_CORTOS,
    familia: {
      ingresos: ingresosFamReal,
      egresos: egresosFamReal,
      ahorro: ahorroFam,
      fondoEmergencia: fondoEmergenciaFam,
      pendientes: egresosPendientesFam,
      disponible: disponibleFam,
      proyeccion: proyeccionFam
    },
    neurotea: {
      ingresos: ingresosNT,
      egresos: gastosNT,
      pendientes: egresosPendientesNT,
      ganancia: gananciaNT,
      meta: metaNT,
      pctGastos: pctGastosNT,
      distribucion: { utilidad: utilidadDueno, emergencia: fondoEmergenciaNT, inversion: fondoInversionNT }
    },
    cuentasFamilia: cuentasFamilia,
    cuentasNT: cuentasNT,
    totalCuentasNT: totalCuentasNT,
    categorias: { familia: categoriasFamilia, neurotea: categoriasNT },
    tendencia: tendencia,
    liquidez: liquidez,
    balanceCruzado: balanceCruzado,
    metas: metas
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML GENERATION - Complete dashboard with Google Charts
// ═══════════════════════════════════════════════════════════════════════════════

function generarHTMLDashboard() {
  var datos = obtenerDatosDashboard();
  var dataJson = JSON.stringify(datos);

  // ═══ CSS ═══
  var css = ''
  + '* { margin:0; padding:0; box-sizing:border-box; }'
  + 'body { font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif; background:#f1f5f9; color:#1e293b; }'
  + '.header { background:#1e293b; color:white; padding:16px 24px; display:flex; justify-content:space-between; align-items:center; }'
  + '.header h1 { font-size:1.3em; font-weight:700; }'
  + '.header-right { display:flex; align-items:center; gap:16px; font-size:0.9em; }'
  + '.header select { padding:6px 12px; border:none; border-radius:6px; font-weight:600; background:white; color:#1e293b; }'
  + '.tabs { display:flex; background:#e2e8f0; border-bottom:2px solid #cbd5e1; }'
  + '.tab { padding:12px 28px; cursor:pointer; font-weight:600; font-size:0.95em; border:none; background:transparent; color:#64748b; transition:all 0.2s; }'
  + '.tab:hover { background:#f1f5f9; color:#334155; }'
  + '.tab.active { background:white; color:#1e293b; border-bottom:3px solid #3b82f6; margin-bottom:-2px; }'
  + '.tab-content { display:none; padding:20px; max-width:1500px; margin:0 auto; }'
  + '.tab-content.active { display:block; }'
  + '.grid { display:grid; gap:16px; margin-bottom:16px; }'
  + '.grid-5 { grid-template-columns:repeat(5,1fr); }'
  + '.grid-2 { grid-template-columns:1fr 1fr; }'
  + '.grid-1 { grid-template-columns:1fr; }'
  + '.grid-3 { grid-template-columns:1fr 1fr 1fr; }'
  + '.card { background:white; border-radius:10px; padding:16px; box-shadow:0 1px 3px rgba(0,0,0,0.08); }'
  + '.card-title { font-weight:700; font-size:0.85em; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:12px; padding-bottom:8px; border-bottom:1px solid #f1f5f9; }'
  + '.kpi { border-left:4px solid #e2e8f0; padding:14px 16px; border-radius:8px; background:white; box-shadow:0 1px 3px rgba(0,0,0,0.06); }'
  + '.kpi-label { font-size:0.75em; color:#64748b; text-transform:uppercase; letter-spacing:0.5px; margin-bottom:4px; }'
  + '.kpi-value { font-size:1.5em; font-weight:700; }'
  + '.kpi-sub { font-size:0.8em; margin-top:4px; }'
  + '.kpi-blue { border-left-color:#3b82f6; } .kpi-blue .kpi-value { color:#1d4ed8; }'
  + '.kpi-red { border-left-color:#ef4444; } .kpi-red .kpi-value { color:#dc2626; }'
  + '.kpi-green { border-left-color:#22c55e; } .kpi-green .kpi-value { color:#16a34a; }'
  + '.kpi-amber { border-left-color:#f59e0b; } .kpi-amber .kpi-value { color:#d97706; }'
  + '.kpi-gray { border-left-color:#6b7280; } .kpi-gray .kpi-value { color:#374151; }'
  + '.chart-box { min-height:300px; }'
  + 'table { width:100%; border-collapse:collapse; font-size:0.88em; }'
  + 'th { background:#f8fafc; padding:10px 8px; text-align:left; font-weight:600; color:#475569; border-bottom:2px solid #e2e8f0; }'
  + 'td { padding:9px 8px; border-bottom:1px solid #f1f5f9; }'
  + 'tr:hover td { background:#f8fafc; }'
  + '.text-right { text-align:right; } .text-center { text-align:center; } .font-bold { font-weight:600; }'
  + '.text-green { color:#16a34a; } .text-red { color:#dc2626; } .text-blue { color:#2563eb; } .text-amber { color:#d97706; } .text-gray { color:#6b7280; }'
  + '.badge { display:inline-block; padding:3px 10px; border-radius:12px; font-size:0.78em; font-weight:600; }'
  + '.badge-green { background:#dcfce7; color:#166534; } .badge-red { background:#fef2f2; color:#991b1b; } .badge-amber { background:#fef3c7; color:#92400e; }'
  + '.alert-card { padding:20px; border-radius:10px; text-align:center; }'
  + '.alert-card .icon { font-size:2.5em; margin-bottom:8px; }'
  + '.alert-card .title { font-size:1.1em; font-weight:700; margin-bottom:4px; }'
  + '.alert-card .value { font-size:1.8em; font-weight:700; margin-bottom:8px; }'
  + '.alert-card .desc { font-size:0.88em; color:#64748b; }'
  + '.liq-item { display:flex; justify-content:space-between; align-items:center; padding:10px 12px; border-radius:8px; margin-bottom:6px; }'
  + '.liq-rojo { background:#fef2f2; } .liq-amarillo { background:#fef3c7; } .liq-verde { background:#f0fdf4; } .liq-azul { background:#eff6ff; }'
  + '.section-title { font-size:0.95em; font-weight:700; color:#334155; margin-bottom:12px; display:flex; align-items:center; gap:6px; }'
  + '.footer { text-align:center; padding:16px; color:#94a3b8; font-size:0.8em; border-top:1px solid #e2e8f0; background:white; margin-top:20px; }'
  + '@media(max-width:1200px) { .grid-5{grid-template-columns:repeat(3,1fr);} .grid-2{grid-template-columns:1fr;} .grid-3{grid-template-columns:1fr;} }'
  + '@media(max-width:768px) { .grid-5{grid-template-columns:repeat(2,1fr);} .tab{padding:10px 16px;font-size:0.85em;} }';

  // ═══ HTML BODY ═══

  // --- KPI helper ---
  function kpi(clase, label, valor, sub) {
    return '<div class="kpi ' + clase + '"><div class="kpi-label">' + label + '</div>'
      + '<div class="kpi-value">Gs. ' + formatearGuaranies(valor) + '</div>'
      + (sub ? '<div class="kpi-sub">' + sub + '</div>' : '') + '</div>';
  }

  function pctBadge(pres, real, esIngreso) {
    if (pres === 0) return '';
    var pct = Math.round(real / pres * 100);
    var cls = esIngreso ? (pct >= 100 ? 'badge-green' : pct >= 90 ? 'badge-amber' : 'badge-red')
                        : (pct <= 100 ? 'badge-green' : pct <= 110 ? 'badge-amber' : 'badge-red');
    return '<span class="badge ' + cls + '">' + pct + '% ejecutado</span>';
  }

  // --- FAMILIA TAB ---
  var famTab = '';

  // KPIs
  famTab += '<div class="grid grid-5">';
  famTab += kpi('kpi-blue', 'Ingresos del mes', datos.familia.ingresos, '');
  famTab += kpi('kpi-red', 'Egresos pagados', datos.familia.egresos, '');
  famTab += kpi('kpi-green', 'Ahorro', datos.familia.ahorro, '');
  famTab += kpi('kpi-gray', 'Disponible', datos.familia.disponible, '');
  famTab += kpi('kpi-amber', 'Pendientes', datos.familia.pendientes, '');
  famTab += '</div>';

  // Trend chart
  famTab += '<div class="card"><div class="card-title">Ingresos vs Egresos - Evolucion Mensual ' + AÑO + '</div><div id="chart_fam_trend" class="chart-box"></div></div>';

  // Category bars + Donut
  famTab += '<div class="grid grid-2">';
  famTab += '<div class="card"><div class="card-title">Detalle de egresos del mes</div><div id="chart_fam_cat_bars" class="chart-box"></div></div>';
  famTab += '<div class="card"><div class="card-title">Distribucion de egresos</div><div id="chart_fam_donut" class="chart-box"></div></div>';
  famTab += '</div>';

  // Budget vs Real
  famTab += '<div class="card"><div class="card-title">Presupuesto vs Real por categoria</div><div id="chart_fam_budget" class="chart-box"></div></div>';

  // Accounts + Liquidez
  famTab += '<div class="grid grid-2">';
  // Accounts table
  famTab += '<div class="card"><div class="card-title">Saldos por cuenta bancaria</div><table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Banco</th><th class="text-right">Dif.</th></tr></thead><tbody>';
  for (var ai = 0; ai < datos.cuentasFamilia.length; ai++) {
    var ct = datos.cuentasFamilia[ai];
    var difCls = ct.diferencia > 0 ? 'text-green' : ct.diferencia < 0 ? 'text-red' : 'text-gray';
    famTab += '<tr><td>' + ct.nombre + '</td><td class="text-right">' + formatearGuaranies(ct.esperado) + '</td><td class="text-right text-blue font-bold">' + formatearGuaranies(ct.real) + '</td><td class="text-right font-bold ' + difCls + '">' + (ct.diferencia !== 0 ? formatearGuaranies(ct.diferencia) : '-') + '</td></tr>';
  }
  famTab += '</tbody></table></div>';

  // Liquidez
  famTab += '<div class="card"><div class="card-title">Liquidez - Gastos pendientes</div>';
  famTab += '<div class="liq-item liq-verde"><span>Disponible</span><span class="font-bold text-green">Gs. ' + formatearGuaranies(datos.liquidez.cajaDisponible) + '</span></div>';
  for (var li = 0; li < datos.liquidez.semanas.length; li++) {
    var sem = datos.liquidez.semanas[li];
    var liqCls = li === 0 ? 'liq-amarillo' : li === 1 ? 'liq-azul' : 'liq-azul';
    famTab += '<div class="liq-item ' + liqCls + '"><span>' + sem.nombre + '</span><span class="font-bold">- Gs. ' + formatearGuaranies(sem.gastos) + '</span></div>';
  }
  var saldoFinCls = datos.liquidez.saldoFinal >= 0 ? 'text-green' : 'text-red';
  famTab += '<div class="liq-item" style="background:#1e293b;color:white;margin-top:6px"><span class="font-bold">Saldo fin de mes</span><span class="font-bold">Gs. ' + formatearGuaranies(datos.liquidez.saldoFinal) + '</span></div>';
  famTab += '</div>';
  famTab += '</div>'; // close grid-2

  // --- NEUROTEA TAB ---
  var ntTab = '';

  // KPIs
  ntTab += '<div class="grid grid-5">';
  ntTab += kpi('kpi-blue', 'Ingresos del mes', datos.neurotea.ingresos, '');
  ntTab += kpi('kpi-red', 'Egresos pagados', datos.neurotea.egresos, '');
  ntTab += kpi('kpi-green', 'Ganancia real', datos.neurotea.ganancia, (datos.neurotea.ganancia >= datos.neurotea.meta ? '<span class="text-green">Meta cumplida</span>' : '<span class="text-red">Meta no cumplida</span>'));
  ntTab += kpi('kpi-amber', 'Pendientes', datos.neurotea.pendientes, '');
  ntTab += kpi('kpi-gray', '% Gastos / Ingresos', 0, '').replace('Gs. 0', datos.neurotea.pctGastos + '%').replace('kpi-gray', datos.neurotea.pctGastos <= datos.metas.maxGastos ? 'kpi-green' : 'kpi-red');
  ntTab += '</div>';

  // Trend chart
  ntTab += '<div class="card"><div class="card-title">Estado de Resultados Mensual - NeuroTEA ' + AÑO + '</div><div id="chart_nt_trend" class="chart-box"></div></div>';

  // Category bars + Donut
  ntTab += '<div class="grid grid-2">';
  ntTab += '<div class="card"><div class="card-title">Detalle de egresos del mes</div><div id="chart_nt_cat_bars" class="chart-box"></div></div>';
  ntTab += '<div class="card"><div class="card-title">Distribucion de egresos</div><div id="chart_nt_donut" class="chart-box"></div></div>';
  ntTab += '</div>';

  // Ganancia distribution
  ntTab += '<div class="card"><div class="card-title">Distribucion de ganancia (Meta: Gs. ' + formatearGuaranies(datos.neurotea.meta) + ')</div><div id="chart_nt_ganancia" class="chart-box" style="min-height:250px"></div></div>';

  // Budget vs Real
  ntTab += '<div class="card"><div class="card-title">Presupuesto vs Real por categoria</div><div id="chart_nt_budget" class="chart-box"></div></div>';

  // Accounts table
  ntTab += '<div class="card"><div class="card-title">Cuentas NeuroTEA</div><table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Acumulado</th></tr></thead><tbody>';
  for (var nai = 0; nai < datos.cuentasNT.length; nai++) {
    var cnt = datos.cuentasNT[nai];
    ntTab += '<tr><td>' + cnt.nombre + '</td><td class="text-right text-blue font-bold">' + formatearGuaranies(cnt.saldo) + '</td><td class="text-right">' + formatearGuaranies(cnt.acumulado) + '</td></tr>';
  }
  ntTab += '<tr style="background:#f1f5f9"><td class="font-bold">TOTAL</td><td class="text-right font-bold text-blue">' + formatearGuaranies(datos.totalCuentasNT) + '</td><td></td></tr>';
  ntTab += '</tbody></table></div>';

  // --- BALANCE CRUZADO TAB ---
  var balTab = '';
  var bc = datos.balanceCruzado;
  var balNeto = bc.balanceNeto;
  var estadoTxt = balNeto > 0 ? 'FAMILIA DEBE A NT' : balNeto < 0 ? 'NT DEBE A FAMILIA' : 'EQUILIBRADO';
  var estadoIcon = balNeto > 0 ? '\uD83D\uDD34' : balNeto < 0 ? '\uD83D\uDFE1' : '\u2705';
  var estadoBg = balNeto > 0 ? '#fef2f2' : balNeto < 0 ? '#fefce8' : '#f0fdf4';
  var estadoColor = balNeto > 0 ? '#dc2626' : balNeto < 0 ? '#d97706' : '#16a34a';

  // KPIs
  balTab += '<div class="grid grid-3">';
  balTab += kpi('kpi-red', 'Deuda FAMILIA a NT', bc.deudaFamAcum, 'Acumulado a\u00F1o');
  balTab += kpi('kpi-amber', 'Deuda NT a FAMILIA', bc.deudaNTAcum, 'Acumulado a\u00F1o');
  balTab += '<div class="kpi" style="border-left-color:' + estadoColor + '"><div class="kpi-label">Balance neto</div><div class="kpi-value" style="color:' + estadoColor + '">Gs. ' + formatearGuaranies(Math.abs(balNeto)) + '</div><div class="kpi-sub">' + estadoTxt + '</div></div>';
  balTab += '</div>';

  // Alert + Table
  balTab += '<div class="grid grid-2">';
  // Table
  balTab += '<div class="card"><div class="card-title">Detalle de flujos cruzados</div><table><thead><tr><th>Concepto</th><th class="text-right">Este mes</th><th class="text-right">Acumulado</th></tr></thead><tbody>';
  balTab += '<tr style="background:#fef2f2"><td colspan="3" class="font-bold">NT \u2192 FAMILIA</td></tr>';
  balTab += '<tr><td>Prestamo NT \u2192 Familia</td><td class="text-right">' + formatearGuaranies(bc.prestamoNTMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.prestamoNTAcum) + '</td></tr>';
  balTab += '<tr><td>Devolucion Familia \u2192 NT</td><td class="text-right text-green">' + formatearGuaranies(bc.devFamMes) + '</td><td class="text-right text-green font-bold">' + formatearGuaranies(bc.devFamAcum) + '</td></tr>';
  balTab += '<tr style="background:#f1f5f9"><td class="font-bold">Deuda FAM \u2192 NT</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaFamMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaFamAcum) + '</td></tr>';
  balTab += '<tr style="background:#fefce8"><td colspan="3" class="font-bold">FAMILIA \u2192 NT</td></tr>';
  balTab += '<tr><td>Prestamo Familia \u2192 NT</td><td class="text-right">' + formatearGuaranies(bc.prestamoFamMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.prestamoFamAcum) + '</td></tr>';
  balTab += '<tr><td>Devolucion NT \u2192 Familia</td><td class="text-right text-green">' + formatearGuaranies(bc.devNTMes) + '</td><td class="text-right text-green font-bold">' + formatearGuaranies(bc.devNTAcum) + '</td></tr>';
  balTab += '<tr style="background:#f1f5f9"><td class="font-bold">Deuda NT \u2192 FAM</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaNTMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaNTAcum) + '</td></tr>';
  balTab += '</tbody></table></div>';

  // Alert box
  balTab += '<div class="card" style="display:flex;align-items:center;justify-content:center"><div class="alert-card" style="background:' + estadoBg + '">';
  balTab += '<div class="icon">' + estadoIcon + '</div>';
  balTab += '<div class="title" style="color:' + estadoColor + '">' + estadoTxt + '</div>';
  balTab += '<div class="value" style="color:' + estadoColor + '">Gs. ' + formatearGuaranies(Math.abs(balNeto)) + '</div>';
  if (balNeto > 0) balTab += '<div class="desc">NeuroTEA ha prestado mas a Familia de lo que Familia ha devuelto.</div>';
  else if (balNeto < 0) balTab += '<div class="desc">Familia ha prestado mas a NeuroTEA de lo que NT ha devuelto.</div>';
  else balTab += '<div class="desc">No hay deudas pendientes entre entidades.</div>';
  balTab += '</div></div>';
  balTab += '</div>'; // close grid-2

  // ═══ JAVASCRIPT FOR CHARTS ═══
  var js = ''
  // --- Tab switching ---
  + 'function showTab(name){'
  + '  document.querySelectorAll(".tab-content").forEach(function(t){t.classList.remove("active");});'
  + '  document.querySelectorAll(".tab").forEach(function(t){t.classList.remove("active");});'
  + '  document.getElementById("tab-"+name).classList.add("active");'
  + '  document.querySelector("[data-tab=\\""+name+"\\"]").classList.add("active");'
  + '  if(name==="familia") drawFamiliaCharts();'
  + '  else if(name==="neurotea") drawNeuroteaCharts();'
  + '}'

  // --- Format helper ---
  + 'function fmtGs(n){if(!n)return"0";return new Intl.NumberFormat("es-PY").format(Math.round(n));}'

  // --- Google Charts load ---
  + 'google.charts.load("current",{packages:["corechart"]});'
  + 'google.charts.setOnLoadCallback(function(){drawFamiliaCharts();});'

  // --- Common chart options ---
  + 'var BASE_OPT={fontName:"Inter",backgroundColor:"transparent",chartArea:{left:60,top:40,right:20,bottom:50,width:"85%",height:"70%"},legend:{position:"top",textStyle:{fontSize:11}},animation:{startup:true,duration:600,easing:"out"},titleTextStyle:{color:"#334155",fontSize:13,bold:true}};'

  // ═══ FAMILIA CHARTS ═══
  + 'function drawFamiliaCharts(){'
  + '  drawFamTrend();drawFamCatBars();drawFamDonut();drawFamBudget();'
  + '}'

  // Combo: 12-month trend
  + 'function drawFamTrend(){'
  + '  var d=new google.visualization.DataTable();'
  + '  d.addColumn("string","Mes");d.addColumn("number","Ingresos");d.addColumn("number","Egresos");d.addColumn("number","Balance");'
  + '  for(var i=0;i<12;i++){'
  + '    var ing=DATA.tendencia.familia.ingresos[i];var egr=DATA.tendencia.familia.egresos[i];'
  + '    var bal=ing-egr-DATA.tendencia.familia.ahorro[i];'
  + '    d.addRow([DATA.meses[i],ing||null,egr||null,(ing||egr)?bal:null]);'
  + '  }'
  + '  var o=Object.assign({},BASE_OPT,{seriesType:"bars",series:{2:{type:"line",lineWidth:3,pointSize:5,color:"#22c55e"}},colors:["#3b82f6","#ef4444"],vAxes:{0:{title:"Gs.",format:"short"}},bar:{groupWidth:"60%"}});'
  + '  new google.visualization.ComboChart(document.getElementById("chart_fam_trend")).draw(d,o);'
  + '}'

  // Bar: Category breakdown
  + 'function drawFamCatBars(){'
  + '  var cats=DATA.categorias.familia;var gastos=[];var total=0;'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("AHORRO")===-1&&c.real>0){gastos.push(c);total+=c.real;}}'
  + '  gastos.sort(function(a,b){return b.real-a.real;});'
  + '  var d=new google.visualization.DataTable();d.addColumn("string","Categoria");d.addColumn("number","Monto");d.addColumn({type:"string",role:"annotation"});'
  + '  var colors=["#ef4444","#f97316","#eab308","#06b6d4","#8b5cf6","#6b7280"];'
  + '  for(var i=0;i<gastos.length;i++){var g=gastos[i];var pct=total>0?Math.round(g.real/total*100):0;d.addRow([g.nombre,g.real,"Gs. "+fmtGs(g.real)+" | "+pct+"%"]);}'
  + '  if(gastos.length===0){document.getElementById("chart_fam_cat_bars").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin egresos registrados</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{bars:"horizontal",legend:"none",colors:colors,chartArea:{left:130,top:20,right:80,bottom:20,width:"60%",height:"85%"},annotations:{textStyle:{fontSize:11,color:"#334155"},alwaysOutside:true}});'
  + '  new google.visualization.BarChart(document.getElementById("chart_fam_cat_bars")).draw(d,o);'
  + '}'

  // Donut: Expense distribution
  + 'function drawFamDonut(){'
  + '  var cats=DATA.categorias.familia;var d=[["Categoria","Monto"]];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("AHORRO")===-1&&c.real>0)d.push([c.nombre,c.real]);}'
  + '  if(d.length===1){document.getElementById("chart_fam_donut").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{pieHole:0.4,pieSliceText:"percentage",colors:["#ef4444","#f97316","#eab308","#06b6d4","#8b5cf6","#6b7280"],chartArea:{left:10,top:30,right:10,bottom:10,width:"90%",height:"85%"},legend:{position:"right",textStyle:{fontSize:11}}});'
  + '  new google.visualization.PieChart(document.getElementById("chart_fam_donut")).draw(google.visualization.arrayToDataTable(d),o);'
  + '}'

  // Budget vs Real grouped bars
  + 'function drawFamBudget(){'
  + '  var cats=DATA.categorias.familia;var d=[["Categoria","Presupuesto","Real"]];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];if(c.presupuesto>0||c.real>0)d.push([c.nombre,c.presupuesto,c.real]);}'
  + '  if(d.length===1){document.getElementById("chart_fam_budget").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{bars:"horizontal",colors:["#94a3b8","#3b82f6"],chartArea:{left:150,top:40,right:30,bottom:20,width:"65%",height:"80%"},bar:{groupWidth:"70%"}});'
  + '  new google.visualization.BarChart(document.getElementById("chart_fam_budget")).draw(google.visualization.arrayToDataTable(d),o);'
  + '}'

  // ═══ NEUROTEA CHARTS ═══
  + 'function drawNeuroteaCharts(){'
  + '  drawNTTrend();drawNTCatBars();drawNTDonut();drawNTGanancia();drawNTBudget();'
  + '}'

  // Combo: 12-month Income Statement
  + 'function drawNTTrend(){'
  + '  var d=new google.visualization.DataTable();'
  + '  d.addColumn("string","Mes");d.addColumn("number","Ingresos");d.addColumn("number","Egresos");d.addColumn("number","% Ganancia");'
  + '  for(var i=0;i<12;i++){'
  + '    var ing=DATA.tendencia.neurotea.ingresos[i];var egr=DATA.tendencia.neurotea.egresos[i];'
  + '    var pct=ing>0?Math.round((ing-egr)/ing*100):null;'
  + '    d.addRow([DATA.meses[i],ing||null,egr||null,(ing>0)?pct:null]);'
  + '  }'
  + '  var o=Object.assign({},BASE_OPT,{seriesType:"bars",series:{2:{type:"line",targetAxisIndex:1,lineWidth:3,pointSize:5,color:"#22c55e"}},colors:["#3b82f6","#ef4444"],vAxes:{0:{title:"Gs.",format:"short"},1:{title:"% Ganancia",format:"#\'%\'",viewWindow:{min:0,max:30}}},bar:{groupWidth:"60%"}});'
  + '  new google.visualization.ComboChart(document.getElementById("chart_nt_trend")).draw(d,o);'
  + '}'

  // Bar: NT category breakdown
  + 'function drawNTCatBars(){'
  + '  var cats=DATA.categorias.neurotea;var gastos=[];var total=0;'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("GANANCIA")===-1&&c.real>0){gastos.push(c);total+=c.real;}}'
  + '  gastos.sort(function(a,b){return b.real-a.real;});'
  + '  var d=new google.visualization.DataTable();d.addColumn("string","Categoria");d.addColumn("number","Monto");d.addColumn({type:"string",role:"annotation"});'
  + '  var colors=["#3b82f6","#6366f1","#8b5cf6","#06b6d4","#14b8a6","#6b7280"];'
  + '  for(var i=0;i<gastos.length;i++){var g=gastos[i];var pct=total>0?Math.round(g.real/total*100):0;d.addRow([g.nombre,g.real,"Gs. "+fmtGs(g.real)+" | "+pct+"%"]);}'
  + '  if(gastos.length===0){document.getElementById("chart_nt_cat_bars").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin egresos registrados</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{bars:"horizontal",legend:"none",colors:colors,chartArea:{left:160,top:20,right:100,bottom:20,width:"50%",height:"85%"},annotations:{textStyle:{fontSize:11,color:"#334155"},alwaysOutside:true}});'
  + '  new google.visualization.BarChart(document.getElementById("chart_nt_cat_bars")).draw(d,o);'
  + '}'

  // Donut: NT expense distribution
  + 'function drawNTDonut(){'
  + '  var cats=DATA.categorias.neurotea;var d=[["Categoria","Monto"]];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("GANANCIA")===-1&&c.real>0)d.push([c.nombre,c.real]);}'
  + '  if(d.length===1){document.getElementById("chart_nt_donut").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{pieHole:0.4,pieSliceText:"percentage",colors:["#3b82f6","#6366f1","#8b5cf6","#06b6d4","#14b8a6","#6b7280"],chartArea:{left:10,top:30,right:10,bottom:10,width:"90%",height:"85%"},legend:{position:"right",textStyle:{fontSize:11}}});'
  + '  new google.visualization.PieChart(document.getElementById("chart_nt_donut")).draw(google.visualization.arrayToDataTable(d),o);'
  + '}'

  // Column: Ganancia distribution
  + 'function drawNTGanancia(){'
  + '  var dist=DATA.neurotea.distribucion;var metas=DATA.metas;var metaTotal=DATA.neurotea.meta;'
  + '  var metaUtil=Math.round(metaTotal*metas.distUtilidad/100);var metaEmerg=Math.round(metaTotal*metas.distEmergencia/100);var metaInv=Math.round(metaTotal*metas.distInversion/100);'
  + '  var d=google.visualization.arrayToDataTable(['
  + '    ["Fondo","Meta","Real"],'
  + '    ["Utilidad Dueno ("+metas.distUtilidad+"%)",metaUtil,dist.utilidad],'
  + '    ["Fondo Emergencia ("+metas.distEmergencia+"%)",metaEmerg,dist.emergencia],'
  + '    ["Fondo Inversion ("+metas.distInversion+"%)",metaInv,dist.inversion]'
  + '  ]);'
  + '  var o=Object.assign({},BASE_OPT,{colors:["#94a3b8","#22c55e"],bar:{groupWidth:"50%"},vAxis:{format:"short"}});'
  + '  new google.visualization.ColumnChart(document.getElementById("chart_nt_ganancia")).draw(d,o);'
  + '}'

  // Budget vs Real NT
  + 'function drawNTBudget(){'
  + '  var cats=DATA.categorias.neurotea;var d=[["Categoria","Presupuesto","Real"]];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];if(c.presupuesto>0||c.real>0)d.push([c.nombre,c.presupuesto,c.real]);}'
  + '  if(d.length===1){document.getElementById("chart_nt_budget").innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  var o=Object.assign({},BASE_OPT,{bars:"horizontal",colors:["#94a3b8","#3b82f6"],chartArea:{left:180,top:40,right:30,bottom:20,width:"55%",height:"80%"},bar:{groupWidth:"70%"}});'
  + '  new google.visualization.BarChart(document.getElementById("chart_nt_budget")).draw(google.visualization.arrayToDataTable(d),o);'
  + '}';

  // ═══ ASSEMBLE COMPLETE HTML ═══
  return '<!DOCTYPE html>'
  + '<html lang="es"><head>'
  + '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">'
  + '<title>Control Financiero ' + AÑO + '</title>'
  + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
  + '<style>' + css + '</style>'
  + '</head><body>'
  + '<div class="header"><h1>Control Financiero ' + AÑO + '</h1>'
  + '<div class="header-right"><span>Mes: <strong>' + datos.mes + '</strong></span><span>|</span><span>' + new Date().toLocaleDateString('es-PY') + '</span></div>'
  + '</div>'
  + '<div class="tabs">'
  + '<button class="tab active" data-tab="familia" onclick="showTab(\'familia\')">FAMILIA</button>'
  + '<button class="tab" data-tab="neurotea" onclick="showTab(\'neurotea\')">NEUROTEA</button>'
  + '<button class="tab" data-tab="balance" onclick="showTab(\'balance\')">BALANCE CRUZADO</button>'
  + '</div>'
  + '<div id="tab-familia" class="tab-content active">' + famTab + '</div>'
  + '<div id="tab-neurotea" class="tab-content">' + ntTab + '</div>'
  + '<div id="tab-balance" class="tab-content">' + balTab + '</div>'
  + '<div class="footer">Control Financiero ' + AÑO + ' - NeuroTEA & Familia | v' + VERSION + '</div>'
  + '<script src="https://www.gstatic.com/charts/loader.js"><\/script>'
  + '<script>var DATA=' + dataJson + ';' + js + '<\/script>'
  + '</body></html>';
}
