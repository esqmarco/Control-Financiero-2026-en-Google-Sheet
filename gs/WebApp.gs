/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WEBAPP.GS - DASHBOARD FINANCIERO v3.0
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Dashboards separados FAMILIA y NEUROTEA con Chart.js
 * Flujo entre entidades como seccion comun
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// HELPER FUNCTIONS
// ═══════════════════════════════════════════════════════════════════════════════

function formatearGuaranies(num) {
  if (num === 0 || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('es-PY').format(Math.round(num));
}

/**
 * FUNCIÓN DE PRUEBA - Ejecutar para diagnosticar problemas del dashboard
 * Muestra un popup con los valores que se leen de TABLERO
 */
function diagnosticarDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  var movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);

  var resultado = '=== DIAGNÓSTICO DASHBOARD ===\n\n';

  // Verificar hojas
  resultado += '1. VERIFICACIÓN DE HOJAS:\n';
  resultado += '   - TABLERO: ' + (tablero ? '✓ EXISTE' : '✗ NO EXISTE') + '\n';
  resultado += '   - MOVIMIENTO: ' + (movimiento ? '✓ EXISTE' : '✗ NO EXISTE') + '\n\n';

  if (!tablero) {
    SpreadsheetApp.getUi().alert('ERROR', resultado + '\n\nLa hoja TABLERO no existe. Ejecute "Reinicializar Sistema".', SpreadsheetApp.getUi().ButtonSet.OK);
    return;
  }

  // Posiciones calculadas
  var FILA_VALORES_FAM = 8 + CUENTAS_FAMILIA.length + 4;  // 8 + 10 + 4 = 22
  var FILA_AHORRO_FAM = FILA_VALORES_FAM + 3;  // 25
  var FILA_VALORES_NT = 8 + CUENTAS_NT.length + 5;  // 8 + 2 + 5 = 15
  var FILA_GANANCIA_NT = FILA_VALORES_NT + 6;  // 21

  resultado += '2. POSICIONES CALCULADAS:\n';
  resultado += '   FAMILIA - Ingresos/Egresos: Fila ' + FILA_VALORES_FAM + '\n';
  resultado += '   FAMILIA - Ahorro/Fondo: Fila ' + FILA_AHORRO_FAM + '\n';
  resultado += '   NEUROTEA - Ingresos/Egresos: Fila ' + FILA_VALORES_NT + '\n';
  resultado += '   NEUROTEA - Ganancia/Meta: Fila ' + FILA_GANANCIA_NT + '\n\n';

  resultado += '3. VALORES LEÍDOS DE TABLERO:\n\n';

  // FAMILIA
  resultado += '   === FAMILIA ===\n';
  var ingFam = tablero.getRange(FILA_VALORES_FAM, 2).getValue();
  var egrFam = tablero.getRange(FILA_VALORES_FAM, 4).getValue();
  var ahoFam = tablero.getRange(FILA_AHORRO_FAM, 2).getValue();
  var fonFam = tablero.getRange(FILA_AHORRO_FAM, 4).getValue();
  resultado += '   B' + FILA_VALORES_FAM + ' (Ingresos): ' + ingFam + ' (tipo: ' + typeof ingFam + ')\n';
  resultado += '   D' + FILA_VALORES_FAM + ' (Egresos): ' + egrFam + ' (tipo: ' + typeof egrFam + ')\n';
  resultado += '   B' + FILA_AHORRO_FAM + ' (Ahorro): ' + ahoFam + ' (tipo: ' + typeof ahoFam + ')\n';
  resultado += '   D' + FILA_AHORRO_FAM + ' (Fondo): ' + fonFam + ' (tipo: ' + typeof fonFam + ')\n\n';

  // NEUROTEA
  resultado += '   === NEUROTEA ===\n';
  var ingNT = tablero.getRange(FILA_VALORES_NT, 8).getValue();
  var egrNT = tablero.getRange(FILA_VALORES_NT, 10).getValue();
  var ganNT = tablero.getRange(FILA_GANANCIA_NT, 8).getValue();
  var metNT = tablero.getRange(FILA_GANANCIA_NT, 10).getValue();
  resultado += '   H' + FILA_VALORES_NT + ' (Ingresos): ' + ingNT + ' (tipo: ' + typeof ingNT + ')\n';
  resultado += '   J' + FILA_VALORES_NT + ' (Egresos): ' + egrNT + ' (tipo: ' + typeof egrNT + ')\n';
  resultado += '   H' + FILA_GANANCIA_NT + ' (Ganancia): ' + ganNT + ' (tipo: ' + typeof ganNT + ')\n';
  resultado += '   J' + FILA_GANANCIA_NT + ' (Meta): ' + metNT + ' (tipo: ' + typeof metNT + ')\n\n';

  // Verificar contenido de celdas clave
  resultado += '4. CONTENIDO DE CELDAS CLAVE:\n';
  resultado += '   B22 (debe decir el número de ingresos):\n';
  resultado += '   "' + tablero.getRange('B22').getValue() + '"\n';
  resultado += '   H15 (debe decir el número de ingresos NT):\n';
  resultado += '   "' + tablero.getRange('H15').getValue() + '"\n\n';

  resultado += '5. CONCLUSIÓN:\n';
  var valido = (typeof ingFam === 'number' && ingFam > 0);
  if (valido) {
    resultado += '   ✓ Los datos se leen correctamente.\n';
    resultado += '   Si el dashboard web no muestra datos, el problema\n';
    resultado += '   puede estar en la generación del HTML o Chart.js.';
  } else {
    resultado += '   ✗ Los datos NO se leen correctamente.\n';
    resultado += '   Verifique que:\n';
    resultado += '   1. Ha ejecutado "Reinicializar Sistema" recientemente\n';
    resultado += '   2. Las fórmulas de TABLERO están calculando\n';
    resultado += '   3. MOVIMIENTO tiene el mes seleccionado\n';
  }

  SpreadsheetApp.getUi().alert('Diagnóstico Dashboard', resultado, SpreadsheetApp.getUi().ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════════════════════
// DATA COLLECTION - Comprehensive data for both dashboards
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

  // DEBUG: Verificar que las hojas existen
  console.log('=== DIAGNÓSTICO WebApp ===');
  console.log('Hoja TABLERO existe:', !!tablero);
  console.log('Hoja MOVIMIENTO existe:', !!movimiento);
  console.log('Hoja CONFIG existe:', !!config);

  var mesSeleccionado = movimiento ? movimiento.getRange('B3').getValue() : 'Enero';
  var mesNum = MESES.indexOf(mesSeleccionado) + 1;
  console.log('Mes seleccionado:', mesSeleccionado, '- Número:', mesNum);

  function leerNumero(rango, debug) {
    try {
      var val = rango.getValue();
      if (debug) {
        var celda = rango.getA1Notation();
        console.log('  RAW [' + celda + ']:', val, '(tipo:', typeof val + ')');
      }
      if (val === '' || val === null || val === undefined) return 0;
      var num = Number(val);
      return isNaN(num) ? 0 : num;
    } catch(e) {
      console.log('  ERROR leyendo celda:', e.message);
      return 0;
    }
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
  // FAMILIA (columnas B-E)
  var FILA_INICIO_CUENTAS_FAM = 8;  // Cuentas FAM empiezan en fila 8
  var FILA_TOTAL_CUENTAS_FAM = FILA_INICIO_CUENTAS_FAM + CUENTAS_FAMILIA.length;  // 8 + 10 = 18
  // Fila 18: Total, +2 espacio = 20, +1 titulo = 21 labels, +1 = 22 valores
  var FILA_VALORES_FAM = FILA_TOTAL_CUENTAS_FAM + 4;  // 18 + 4 = 22 (INGRESOS col B, EGRESOS col D)
  var FILA_AHORRO_FAM = FILA_VALORES_FAM + 3;  // 22 + 3 = 25 (AHORRO col B, FONDO col D)

  // NEUROTEA (columnas H-K) - También empieza en fila 8
  var FILA_INICIO_CUENTAS_NT = 8;  // Cuentas NT empiezan en fila 8 (columnas H-K)
  var FILA_TOTAL_CUENTAS_NT = FILA_INICIO_CUENTAS_NT + CUENTAS_NT.length;  // 8 + 2 = 10
  // Fila 10: Total, +2 espacio = 12, +1 titulo = 13, +1 spacer = 14 labels, +1 = 15 valores
  var FILA_VALORES_NT = FILA_TOTAL_CUENTAS_NT + 5;  // 10 + 5 = 15 (INGRESOS col H, EGRESOS col J)
  var FILA_GANANCIA_NT = FILA_VALORES_NT + 6;  // 15 + 6 = 21 (GANANCIA col H, META col J)
  var FILA_DISTRIBUCION_NT = FILA_GANANCIA_NT + 6;  // 21 + 6 = 27 (labels), +1 = 28 (valores)

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

  // ═══ ACCOUNTS - NEUROTEA (columnas H=8, I=9, J=10, K=11) ═══
  var cuentasNT = [];
  if (tablero) {
    for (var j = 0; j < CUENTAS_NT.length; j++) {
      var filaNT = FILA_INICIO_CUENTAS_NT + j;  // Filas 8, 9 para 2 cuentas
      cuentasNT.push({
        nombre: CUENTAS_NT[j],
        saldo: leerNumero(tablero.getRange(filaNT, 9)),      // Columna I = Esperado
        acumulado: leerNumero(tablero.getRange(filaNT, 10))  // Columna J = Saldo Banco
      });
    }
  }
  var totalCuentasNT = tablero ? leerNumero(tablero.getRange(FILA_TOTAL_CUENTAS_NT, 9)) : 0;  // Fila 10, col I

  // ═══ NEUROTEA INDICATORS (columnas H=8, I=9, J=10, K=11) ═══
  var ingresosNT = 0, gastosNT = 0, gananciaNT = 0, metaNT = 0;
  var utilidadDueno = 0, fondoEmergenciaNT = 0, fondoInversionNT = 0;
  var egresosPendientesNT = 0;
  if (tablero) {
    // DEBUG: Mostrar valores RAW NEUROTEA
    console.log('--- NEUROTEA (fila valores', FILA_VALORES_NT, '/ fila ganancia', FILA_GANANCIA_NT, '/ fila dist', FILA_DISTRIBUCION_NT + 1, ') ---');
    // Fila 15: INGRESOS (H15:I15 merged) y EGRESOS (J15:K15 merged)
    ingresosNT = leerNumero(tablero.getRange(FILA_VALORES_NT, 8), true);   // Columna H = INGRESOS
    gastosNT = leerNumero(tablero.getRange(FILA_VALORES_NT, 10), true);    // Columna J = EGRESOS
    // Fila 21: GANANCIA (H21:I21 merged) y META (J21:K21 merged)
    gananciaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 8), true);  // Columna H = GANANCIA
    metaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 10), true);     // Columna J = META
    // Fila 28: Distribución valores (H=Utilidad, I=Emergencia, J:K=Inversión)
    utilidadDueno = leerNumero(tablero.getRange(FILA_DISTRIBUCION_NT + 1, 8), true);
    fondoEmergenciaNT = leerNumero(tablero.getRange(FILA_DISTRIBUCION_NT + 1, 9), true);
    fondoInversionNT = leerNumero(tablero.getRange(FILA_DISTRIBUCION_NT + 1, 10), true);
  }

  // ═══ FAMILIA RESUMEN (columnas B=2, C=3, D=4, E=5) ═══
  var ingresosFamReal = 0, egresosFamReal = 0, egresosPendientesFam = 0;
  var ahorroFam = 0, fondoEmergenciaFam = 0;
  if (tablero) {
    // DEBUG: Mostrar valores RAW
    console.log('--- FAMILIA (fila', FILA_VALORES_FAM, '/ fila ahorro', FILA_AHORRO_FAM, ') ---');
    // Fila 22: INGRESOS (B22:C22 merged) y EGRESOS (D22:E22 merged)
    ingresosFamReal = leerNumero(tablero.getRange(FILA_VALORES_FAM, 2), true);   // Columna B = INGRESOS
    egresosFamReal = leerNumero(tablero.getRange(FILA_VALORES_FAM, 4), true);    // Columna D = EGRESOS
    // Fila 25: AHORRO (B25:C25 merged) y FONDO (D25:E25 merged)
    ahorroFam = leerNumero(tablero.getRange(FILA_AHORRO_FAM, 2), true);          // Columna B = AHORRO
    fondoEmergenciaFam = leerNumero(tablero.getRange(FILA_AHORRO_FAM, 4), true); // Columna D = FONDO
  }

  // Read MOVIMIENTO for FAMILIA/NEUROTEA pendientes (ahorro/fondo ya leídos de TABLERO)
  if (movimiento) {
    var datosFamMov = movimiento.getRange('A9:J116').getValues();
    for (var idx = 0; idx < datosFamMov.length; idx++) {
      var filaM = datosFamMov[idx];
      var tipo = filaM[1] ? filaM[1].toString() : '';
      var real = Number(filaM[5]) || 0;
      var estPago = filaM[9] ? filaM[9].toString() : '';
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

  // ═══ LIQUIDEZ - Calculada desde disponible y pendientes ═══
  var liquidez = {
    cajaDisponible: ingresosFamReal - egresosFamReal,
    semanas: [
      { nombre: 'Esta semana', gastos: 0, saldo: 0 },
      { nombre: 'Prox. semana', gastos: 0, saldo: 0 },
      { nombre: '3ra semana', gastos: 0, saldo: 0 }
    ],
    saldoFinal: ingresosFamReal - egresosFamReal - egresosPendientesFam
  };

  // ═══ BALANCE CRUZADO - Se calcula después de leer CARGA ═══
  var balanceCruzado = {
    prestamoNTMes: 0, prestamoNTAcum: 0, devFamMes: 0, devFamAcum: 0,
    deudaFamMes: 0, deudaFamAcum: 0,
    prestamoFamMes: 0, prestamoFamAcum: 0, devNTMes: 0, devNTAcum: 0,
    deudaNTMes: 0, deudaNTAcum: 0,
    balanceNetoMes: 0, balanceNeto: 0
  };
  // Variables para acumular préstamos y devoluciones separados
  var prestamosNT = new Array(12).fill(0);  // NT presta a FAM
  var devolucionesFam = new Array(12).fill(0);  // FAM devuelve a NT
  var prestamosFam = new Array(12).fill(0);  // FAM presta a NT
  var devolucionesNT = new Array(12).fill(0);  // NT devuelve a FAM

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

  // ═══ 12-MONTH TREND DATA + SUBCATEGORÍAS + FLUJO CRUZADO ═══
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

  // NEW: Subcategorías variables del mes actual
  var subcatFamObj = {};
  var subcatNTObj = {};

  // NEW: Flujo mensual entre entidades (préstamos/devoluciones)
  var flujoMensual = { ntToFam: new Array(12).fill(0), famToNT: new Array(12).fill(0) };

  // CARGA_FAMILIA monthly sums + subcategorías + flujo
  if (cargaFam) {
    var dataCF = cargaFam.getRange('A4:F500').getValues();
    for (var ci = 0; ci < dataCF.length; ci++) {
      var fecha = dataCF[ci][0];
      var tipoC = (dataCF[ci][1] || '').toString();
      var catC = (dataCF[ci][2] || '').toString();
      var subcatC = (dataCF[ci][3] || '').toString();
      var montoC = Number(dataCF[ci][5]) || 0;
      if (!fecha || montoC === 0) continue;
      var mesC, yearC;
      try { mesC = fecha.getMonth(); yearC = fecha.getFullYear(); } catch(e) { continue; }
      if (yearC !== AÑO) continue;

      // Tendencia mensual
      if (tipoC === 'Egreso Familiar') tendencia.familia.egresos[mesC] += montoC;
      else if (tipoC === 'Ahorro') tendencia.familia.ahorro[mesC] += montoC;
      else if (tipoC) tendencia.familia.ingresos[mesC] += montoC;

      // Subcategorías variables del mes actual
      if (mesC + 1 === mesNum && tipoC === 'Egreso Familiar' && catC === 'VARIABLES' && subcatC && subcatC !== '-') {
        subcatFamObj[subcatC] = (subcatFamObj[subcatC] || 0) + montoC;
      }

      // Flujo cruzado NT→FAM (ingresos en FAM provenientes de NT)
      if (tipoC === 'Préstamo NeuroTEA') {
        flujoMensual.ntToFam[mesC] += montoC;
        prestamosNT[mesC] += montoC;  // NT presta a FAM
      }
      if (tipoC === 'Devolución NeuroTEA') {
        flujoMensual.ntToFam[mesC] += montoC;
        devolucionesNT[mesC] += montoC;  // NT devuelve a FAM
      }
      // Flujo cruzado FAM→NT (egresos de FAM hacia NT)
      if (subcatC === 'Préstamo Familia → NT') {
        flujoMensual.famToNT[mesC] += montoC;
        prestamosFam[mesC] += montoC;  // FAM presta a NT
      }
      if (subcatC === 'Devolución Familia → NT') {
        flujoMensual.famToNT[mesC] += montoC;
        devolucionesFam[mesC] += montoC;  // FAM devuelve a NT
      }
    }
  }

  // CARGA_NT monthly sums + subcategorías + flujo
  if (cargaNT) {
    var dataCN = cargaNT.getRange('A4:F500').getValues();
    for (var ni = 0; ni < dataCN.length; ni++) {
      var fechaN = dataCN[ni][0];
      var tipoN = (dataCN[ni][1] || '').toString();
      var catN = (dataCN[ni][2] || '').toString();
      var subcatN = (dataCN[ni][3] || '').toString();
      var montoN = Number(dataCN[ni][5]) || 0;
      if (!fechaN || montoN === 0) continue;
      var mesN, yearN;
      try { mesN = fechaN.getMonth(); yearN = fechaN.getFullYear(); } catch(e) { continue; }
      if (yearN !== AÑO) continue;

      // Tendencia mensual
      if (tipoN === 'Egreso NT') tendencia.neurotea.egresos[mesN] += montoN;
      else if (tipoN) tendencia.neurotea.ingresos[mesN] += montoN;

      // Subcategorías variables del mes actual
      if (mesN + 1 === mesNum && tipoN === 'Egreso NT' && catN === 'VARIABLES' && subcatN && subcatN !== '-') {
        subcatNTObj[subcatN] = (subcatNTObj[subcatN] || 0) + montoN;
      }

      // Flujo cruzado FAM→NT (ingresos en NT provenientes de FAM)
      if (tipoN === 'Préstamo Familia') {
        flujoMensual.famToNT[mesN] += montoN;
        prestamosFam[mesN] += montoN;  // FAM presta a NT
      }
      if (tipoN === 'Devolución Familia → NT') {
        flujoMensual.famToNT[mesN] += montoN;
        devolucionesFam[mesN] += montoN;  // FAM devuelve a NT
      }
      // Flujo cruzado NT→FAM (egresos de NT hacia FAM)
      if (subcatN === 'Préstamo NT → Familia') {
        flujoMensual.ntToFam[mesN] += montoN;
        prestamosNT[mesN] += montoN;  // NT presta a FAM
      }
      if (subcatN === 'Devolución NT → Familia') {
        flujoMensual.ntToFam[mesN] += montoN;
        devolucionesNT[mesN] += montoN;  // NT devuelve a FAM
      }
    }
  }

  // Convertir subcategorías a arrays ordenados
  var subcategoriasFam = [];
  for (var keyF in subcatFamObj) {
    subcategoriasFam.push({ nombre: keyF, monto: subcatFamObj[keyF] });
  }
  subcategoriasFam.sort(function(a, b) { return b.monto - a.monto; });

  var subcategoriasNT = [];
  for (var keyN in subcatNTObj) {
    subcategoriasNT.push({ nombre: keyN, monto: subcatNTObj[keyN] });
  }
  subcategoriasNT.sort(function(a, b) { return b.monto - a.monto; });

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
        for (var pm2 = 0; pm2 < 12; pm2++) tendencia.familia.presupEgresos[pm2] = Number(dataP[pi][3 + pm2]) || 0;
      } else if (cp.indexOf('TOTAL INGRESOS NEUROTEA') >= 0) {
        for (var pm3 = 0; pm3 < 12; pm3++) tendencia.neurotea.presupIngresos[pm3] = Number(dataP[pi][3 + pm3]) || 0;
      } else if (cp.indexOf('TOTAL EGRESOS NEUROTEA') >= 0) {
        for (var pm4 = 0; pm4 < 12; pm4++) tendencia.neurotea.presupEgresos[pm4] = Number(dataP[pi][3 + pm4]) || 0;
      }
    }
  }

  // ═══ CALCULAR BALANCE CRUZADO ═══
  var mesIdx = mesNum - 1;  // 0-indexed
  // Del mes actual
  balanceCruzado.prestamoNTMes = prestamosNT[mesIdx];
  balanceCruzado.devFamMes = devolucionesFam[mesIdx];
  balanceCruzado.prestamoFamMes = prestamosFam[mesIdx];
  balanceCruzado.devNTMes = devolucionesNT[mesIdx];
  // Acumulados (suma de todos los meses hasta el actual)
  for (var bc = 0; bc <= mesIdx; bc++) {
    balanceCruzado.prestamoNTAcum += prestamosNT[bc];
    balanceCruzado.devFamAcum += devolucionesFam[bc];
    balanceCruzado.prestamoFamAcum += prestamosFam[bc];
    balanceCruzado.devNTAcum += devolucionesNT[bc];
  }
  // Deudas = Préstamos - Devoluciones
  balanceCruzado.deudaFamMes = balanceCruzado.prestamoNTMes - balanceCruzado.devFamMes;
  balanceCruzado.deudaFamAcum = balanceCruzado.prestamoNTAcum - balanceCruzado.devFamAcum;
  balanceCruzado.deudaNTMes = balanceCruzado.prestamoFamMes - balanceCruzado.devNTMes;
  balanceCruzado.deudaNTAcum = balanceCruzado.prestamoFamAcum - balanceCruzado.devNTAcum;
  // Balance Neto = Deuda FAM a NT - Deuda NT a FAM (positivo = FAM debe a NT)
  balanceCruzado.balanceNetoMes = balanceCruzado.deudaFamMes - balanceCruzado.deudaNTMes;
  balanceCruzado.balanceNeto = balanceCruzado.deudaFamAcum - balanceCruzado.deudaNTAcum;

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
    metas: metas,
    subcategoriasFam: subcategoriasFam,
    subcategoriasNT: subcategoriasNT,
    flujoMensual: flujoMensual
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HTML GENERATION - Complete dashboard with Chart.js
// ═══════════════════════════════════════════════════════════════════════════════

function generarHTMLDashboard() {
  var datos = obtenerDatosDashboard();
  var dataJson = JSON.stringify(datos);

  // ═══════════════════════════════════════════════════════════════════════════
  // CSS
  // ═══════════════════════════════════════════════════════════════════════════

  var css = ''
  + '*{margin:0;padding:0;box-sizing:border-box;}'
  + 'body{font-family:"Inter",-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;background:#f9fafb;color:#1f2937;}'
  // Header
  + '.header{background:#1e293b;color:white;padding:16px 24px;display:flex;justify-content:space-between;align-items:center;}'
  + '.header h1{font-size:1.3em;font-weight:700;}'
  + '.header-right{display:flex;align-items:center;gap:16px;font-size:0.9em;}'
  // Tabs
  + '.tabs{display:flex;background:#e2e8f0;border-bottom:2px solid #cbd5e1;}'
  + '.tab{padding:14px 32px;cursor:pointer;font-weight:600;font-size:0.95em;border:none;background:transparent;color:#64748b;transition:all 0.2s;}'
  + '.tab:hover{background:#f1f5f9;color:#334155;}'
  + '.tab.active{background:white;color:#1e293b;border-bottom:3px solid #3b82f6;margin-bottom:-2px;}'
  + '.tab-content{display:none;padding:20px 24px;max-width:1500px;margin:0 auto;}'
  + '.tab-content.active{display:block;}'
  // Section titles
  + '.section-title{background:#1f2937;color:white;padding:10px 18px;margin:24px 0 14px 0;border-radius:8px;font-size:0.92em;font-weight:600;letter-spacing:0.5px;}'
  // Grid
  + '.grid{display:grid;gap:16px;margin-bottom:16px;}'
  + '.grid-2{grid-template-columns:1fr 1fr;}'
  + '.grid-1{grid-template-columns:1fr;}'
  + '.grid-3{grid-template-columns:1fr 1fr 1fr;}'
  // Cards
  + '.card{background:white;border-radius:12px;padding:20px;box-shadow:0 1px 3px rgba(0,0,0,0.08);border:2px solid #e5e7eb;transition:all 0.2s;}'
  + '.card:hover{border-color:#d1d5db;box-shadow:0 4px 12px rgba(0,0,0,0.1);}'
  + '.card h3{color:#1f2937;margin-bottom:4px;font-size:1em;font-weight:600;}'
  + '.card .desc{color:#6b7280;font-size:0.78em;margin-bottom:14px;font-weight:400;line-height:1.4;}'
  + '.chart-container{position:relative;height:270px;}'
  + '.chart-container.short{height:200px;}'
  // KPI cards
  + '.kpi-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:14px;margin-bottom:20px;}'
  + '.kpi-card{background:white;border-radius:12px;padding:18px;text-align:center;border:2px solid #e5e7eb;transition:all 0.2s;}'
  + '.kpi-card:hover{transform:translateY(-2px);box-shadow:0 4px 12px rgba(0,0,0,0.08);}'
  + '.kpi-card.blue{border-left:4px solid #3b82f6;}'
  + '.kpi-card.red{border-left:4px solid #dc2626;}'
  + '.kpi-card.green{border-left:4px solid #047857;}'
  + '.kpi-card.amber{border-left:4px solid #b45309;}'
  + '.kpi-card.gray{border-left:4px solid #1f2937;}'
  + '.kpi-value{font-size:1.5em;font-weight:700;color:#1f2937;}'
  + '.kpi-card.blue .kpi-value{color:#1d4ed8;}'
  + '.kpi-card.red .kpi-value{color:#dc2626;}'
  + '.kpi-card.green .kpi-value{color:#047857;}'
  + '.kpi-card.amber .kpi-value{color:#b45309;}'
  + '.kpi-label{font-size:0.72em;color:#6b7280;margin-top:4px;font-weight:500;text-transform:uppercase;letter-spacing:0.5px;}'
  + '.kpi-sub{font-size:0.78em;margin-top:6px;font-weight:500;}'
  + '.kpi-sub.up{color:#047857;}'
  + '.kpi-sub.down{color:#dc2626;}'
  + '.kpi-sub.neutral{color:#6b7280;}'
  // Tables
  + 'table{width:100%;border-collapse:collapse;font-size:0.88em;}'
  + 'th{background:#f8fafc;padding:10px 8px;text-align:left;font-weight:600;color:#475569;border-bottom:2px solid #e2e8f0;}'
  + 'td{padding:9px 8px;border-bottom:1px solid #f1f5f9;}'
  + 'tr:hover td{background:#f8fafc;}'
  + '.text-right{text-align:right;}.text-center{text-align:center;}.font-bold{font-weight:600;}'
  + '.text-green{color:#047857;}.text-red{color:#dc2626;}.text-blue{color:#1d4ed8;}.text-amber{color:#b45309;}.text-gray{color:#6b7280;}'
  // Flow diagram
  + '.flow-diagram{display:flex;flex-direction:column;align-items:center;padding:24px;background:#f3f4f6;border-radius:8px;margin-bottom:14px;gap:0;}'
  + '.flow-box{background:white;border:2px solid #1f2937;border-radius:12px;padding:14px 36px;text-align:center;box-shadow:0 2px 8px rgba(0,0,0,0.06);min-width:170px;}'
  + '.flow-box.nt{border-color:#0369a1;background:linear-gradient(135deg,#f0f9ff,#e0f2fe);}'
  + '.flow-box.familia{border-color:#1f2937;background:linear-gradient(135deg,#f9fafb,#f3f4f6);}'
  + '.flow-box .icon{font-size:1.8em;margin-bottom:4px;}'
  + '.flow-box .title{font-weight:600;color:#1f2937;font-size:1em;}'
  + '.flow-box .amount{font-weight:500;font-size:0.82em;margin-top:3px;}'
  + '.flow-box.nt .amount{color:#0369a1;}'
  + '.flow-box.familia .amount{color:#047857;}'
  + '.flow-arrow{display:flex;flex-direction:row;align-items:center;justify-content:center;gap:16px;padding:6px 0;}'
  + '.flow-arrow .arrow-line{display:flex;flex-direction:column;align-items:center;}'
  + '.flow-arrow .arrow-line svg{width:24px;height:46px;}'
  + '.flow-arrow .transfer-info{text-align:left;}'
  + '.flow-arrow .transfer-amount{font-weight:700;font-size:1.2em;color:#1f2937;}'
  + '.flow-arrow .transfer-label{font-size:0.78em;color:#6b7280;margin-top:2px;}'
  // Liquidez items
  + '.liq-item{display:flex;justify-content:space-between;align-items:center;padding:10px 12px;border-radius:8px;margin-bottom:5px;}'
  + '.liq-verde{background:#f0fdf4;}.liq-amarillo{background:#fef3c7;}.liq-azul{background:#eff6ff;}'
  + '.liq-dark{background:#1e293b;color:white;margin-top:6px;}'
  // Alert card
  + '.alert-box{padding:18px;border-radius:10px;text-align:center;}'
  + '.alert-box .a-icon{font-size:2.2em;margin-bottom:6px;}'
  + '.alert-box .a-title{font-size:1em;font-weight:700;margin-bottom:4px;}'
  + '.alert-box .a-value{font-size:1.6em;font-weight:700;margin-bottom:6px;}'
  + '.alert-box .a-desc{font-size:0.85em;color:#64748b;}'
  // Balance cruzado table
  + '.bc-table{font-size:0.85em;}'
  + '.bc-table td,.bc-table th{padding:7px 8px;}'
  + '.bc-section{font-weight:600;padding:6px 8px !important;}'
  // Footer
  + '.footer{text-align:center;padding:14px;color:#94a3b8;font-size:0.78em;border-top:1px solid #e2e8f0;background:white;margin-top:24px;}'
  // Responsive
  + '@media(max-width:1200px){.grid-2{grid-template-columns:1fr;}.grid-3{grid-template-columns:1fr;}}'
  + '@media(max-width:768px){.kpi-grid{grid-template-columns:repeat(2,1fr);}.tab{padding:10px 16px;font-size:0.85em;}}';

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER: KPI card builder
  // ═══════════════════════════════════════════════════════════════════════════

  function kpi(cls, label, valor, sub, subCls) {
    return '<div class="kpi-card ' + cls + '">'
      + '<div class="kpi-value">Gs. ' + formatearGuaranies(valor) + '</div>'
      + '<div class="kpi-label">' + label + '</div>'
      + (sub ? '<div class="kpi-sub ' + (subCls || 'neutral') + '">' + sub + '</div>' : '')
      + '</div>';
  }

  function kpiPct(cls, label, valor, sub, subCls) {
    return '<div class="kpi-card ' + cls + '">'
      + '<div class="kpi-value">' + valor + '%</div>'
      + '<div class="kpi-label">' + label + '</div>'
      + (sub ? '<div class="kpi-sub ' + (subCls || 'neutral') + '">' + sub + '</div>' : '')
      + '</div>';
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // HELPER: Flujo entre entidades (common section)
  // ═══════════════════════════════════════════════════════════════════════════

  var bc = datos.balanceCruzado;
  var balNeto = bc.balanceNeto;
  var estadoTxt = balNeto > 0 ? 'FAMILIA DEBE A NT' : balNeto < 0 ? 'NT DEBE A FAMILIA' : 'EQUILIBRADO';
  var estadoIcon = balNeto > 0 ? '\uD83D\uDD34' : balNeto < 0 ? '\uD83D\uDFE1' : '\u2705';
  var estadoBg = balNeto > 0 ? '#fef2f2' : balNeto < 0 ? '#fefce8' : '#f0fdf4';
  var estadoColor = balNeto > 0 ? '#dc2626' : balNeto < 0 ? '#b45309' : '#047857';

  function buildFlujoSection(chartId) {
    var html = '';
    html += '<div class="section-title">\uD83D\uDD04 FLUJO ENTRE ENTIDADES</div>';

    // Flow diagram + Alert
    html += '<div class="grid grid-2">';

    // SVG flow diagram
    html += '<div class="card"><h3>Transferencias entre entidades</h3>';
    html += '<p class="desc">Flujo de prestamos y devoluciones entre FAMILIA y NEUROTEA. El diagrama muestra el movimiento acumulado del a\u00F1o.</p>';
    html += '<div class="flow-diagram">';
    html += '<div class="flow-box nt"><div class="icon">\uD83C\uDFE5</div><div class="title">NeuroTEA</div>';
    html += '<div class="amount">Gs. ' + formatearGuaranies(datos.neurotea.ingresos) + ' ingresos</div></div>';

    // Arrow NT→FAM (down)
    html += '<div class="flow-arrow"><div class="arrow-line">';
    html += '<svg viewBox="0 0 24 46"><defs><marker id="ah1' + chartId + '" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#1f2937"/></marker></defs>';
    html += '<line x1="12" y1="0" x2="12" y2="38" stroke="#1f2937" stroke-width="3" marker-end="url(#ah1' + chartId + ')"/></svg></div>';
    html += '<div class="transfer-info"><div class="transfer-amount">Gs. ' + formatearGuaranies(bc.prestamoNTAcum) + '</div>';
    html += '<div class="transfer-label">Prestamos NT \u2192 Familia</div></div></div>';

    // Arrow FAM→NT (up)
    html += '<div class="flow-arrow"><div class="arrow-line">';
    html += '<svg viewBox="0 0 24 46"><defs><marker id="ah2' + chartId + '" markerWidth="10" markerHeight="7" refX="5" refY="3.5" orient="auto"><polygon points="0 0,10 3.5,0 7" fill="#047857"/></marker></defs>';
    html += '<line x1="12" y1="46" x2="12" y2="8" stroke="#047857" stroke-width="3" marker-end="url(#ah2' + chartId + ')"/></svg></div>';
    html += '<div class="transfer-info"><div class="transfer-amount text-green">Gs. ' + formatearGuaranies(bc.prestamoFamAcum) + '</div>';
    html += '<div class="transfer-label">Prestamos Familia \u2192 NT</div></div></div>';

    html += '<div class="flow-box familia"><div class="icon">\uD83C\uDFE0</div><div class="title">Familia</div>';
    html += '<div class="amount">Gs. ' + formatearGuaranies(datos.familia.ingresos) + ' ingresos</div></div>';
    html += '</div></div>'; // close flow-diagram, close card

    // Alert box
    html += '<div class="card" style="display:flex;align-items:center;justify-content:center;flex-direction:column;gap:16px;">';
    html += '<div class="alert-box" style="background:' + estadoBg + ';width:100%;padding:24px;">';
    html += '<div class="a-icon">' + estadoIcon + '</div>';
    html += '<div class="a-title" style="color:' + estadoColor + '">' + estadoTxt + '</div>';
    html += '<div class="a-value" style="color:' + estadoColor + '">Gs. ' + formatearGuaranies(Math.abs(balNeto)) + '</div>';
    if (balNeto > 0) html += '<div class="a-desc">NeuroTEA ha prestado mas a Familia de lo que Familia ha devuelto.</div>';
    else if (balNeto < 0) html += '<div class="a-desc">Familia ha prestado mas a NeuroTEA de lo que NT ha devuelto.</div>';
    else html += '<div class="a-desc">No hay deudas pendientes entre entidades.</div>';
    html += '</div>';

    // Balance cruzado table
    html += '<table class="bc-table" style="margin-top:8px;"><thead><tr><th>Concepto</th><th class="text-right">Mes</th><th class="text-right">Acumulado</th></tr></thead><tbody>';
    html += '<tr><td class="bc-section" style="background:#fef2f2" colspan="3">NT \u2192 FAMILIA</td></tr>';
    html += '<tr><td>Prestamo NT \u2192 Familia</td><td class="text-right">' + formatearGuaranies(bc.prestamoNTMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.prestamoNTAcum) + '</td></tr>';
    html += '<tr><td>Devolucion Familia \u2192 NT</td><td class="text-right text-green">' + formatearGuaranies(bc.devFamMes) + '</td><td class="text-right text-green font-bold">' + formatearGuaranies(bc.devFamAcum) + '</td></tr>';
    html += '<tr style="background:#f1f5f9"><td class="font-bold">Deuda FAM \u2192 NT</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaFamMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaFamAcum) + '</td></tr>';
    html += '<tr><td class="bc-section" style="background:#fefce8" colspan="3">FAMILIA \u2192 NT</td></tr>';
    html += '<tr><td>Prestamo Familia \u2192 NT</td><td class="text-right">' + formatearGuaranies(bc.prestamoFamMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.prestamoFamAcum) + '</td></tr>';
    html += '<tr><td>Devolucion NT \u2192 Familia</td><td class="text-right text-green">' + formatearGuaranies(bc.devNTMes) + '</td><td class="text-right text-green font-bold">' + formatearGuaranies(bc.devNTAcum) + '</td></tr>';
    html += '<tr style="background:#f1f5f9"><td class="font-bold">Deuda NT \u2192 FAM</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaNTMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(bc.deudaNTAcum) + '</td></tr>';
    html += '</tbody></table></div>'; // close card

    html += '</div>'; // close grid-2

    // Monthly flujo bar chart
    html += '<div class="card"><h3>Flujo mensual entre entidades</h3>';
    html += '<p class="desc">Barras: prestamos y devoluciones entre entidades por mes. Permite ver la tendencia del flujo cruzado a lo largo del a\u00F1o.</p>';
    html += '<div class="chart-container short"><canvas id="' + chartId + '"></canvas></div></div>';

    return html;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // TAB FAMILIA
  // ═══════════════════════════════════════════════════════════════════════════

  var famTab = '';

  // --- KPIs ---
  famTab += '<div class="kpi-grid">';
  famTab += kpi('blue', 'Ingresos del mes', datos.familia.ingresos, '');
  famTab += kpi('red', 'Egresos pagados', datos.familia.egresos, '');
  famTab += kpi('green', 'Ahorro total', datos.familia.ahorro, 'Incluye fondo emergencia', 'neutral');
  famTab += kpi('gray', 'Disponible', datos.familia.disponible, 'Ing - Egr - Ahorro', 'neutral');
  famTab += kpi('amber', 'Pendientes', datos.familia.pendientes, datos.familia.pendientes > 0 ? 'Egresos sin pagar' : 'Todo al dia', datos.familia.pendientes > 0 ? 'down' : 'up');
  famTab += '</div>';

  // --- 1. Balance Mensual (Combo: bars + line) ---
  famTab += '<div class="section-title">\u2696\uFE0F BALANCE MENSUAL</div>';
  famTab += '<div class="grid grid-2">';
  famTab += '<div class="card"><h3>Ingresos vs Egresos</h3>';
  famTab += '<p class="desc">Barras: ingresos (verde) y egresos (rojo) por mes. Linea: balance neto. Si la linea baja de 0, hay deficit ese mes.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_balance"></canvas></div></div>';

  // --- 2. Ahorro Acumulado ---
  famTab += '<div class="card"><h3>Ahorro Acumulado Anual</h3>';
  famTab += '<p class="desc">Evolucion del ahorro familiar a lo largo del a\u00F1o. Incluye Ahorro Clara, Marco y Fondo de Emergencia. La curva debe subir constantemente.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_ahorro"></canvas></div></div>';
  famTab += '</div>'; // close grid-2

  // --- 3. Distribución de Gastos ---
  famTab += '<div class="section-title">\uD83E\uDD67 DISTRIBUCION DE GASTOS</div>';
  famTab += '<div class="grid grid-2">';
  famTab += '<div class="card"><h3>Gastos por Categoria</h3>';
  famTab += '<p class="desc">Porcentaje de egresos por categoria sobre el total de gastos. Identifica donde se concentra el gasto familiar.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_donut"></canvas></div></div>';

  famTab += '<div class="card"><h3>Composicion: monto por categoria</h3>';
  famTab += '<p class="desc">Monto real gastado en cada categoria. Las barras muestran cuanto se gasto en cada rubro del hogar.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_comp"></canvas></div></div>';
  famTab += '</div>'; // close grid-2

  // --- 4. % Gastos vs Ingresos + Subcategorías ---
  famTab += '<div class="section-title">\uD83D\uDCCA ANALISIS DETALLADO</div>';
  famTab += '<div class="grid grid-2">';
  famTab += '<div class="card"><h3>Cada categoria como % de ingresos</h3>';
  famTab += '<p class="desc">Que porcentaje de tus ingresos consume cada rubro? Permite identificar las areas que mas impactan al presupuesto familiar.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_pct"></canvas></div></div>';

  famTab += '<div class="card"><h3>Gastos Variables por Subcategoria</h3>';
  famTab += '<p class="desc">Detalle de gastos variables del mes: supermercado, combustible, recreacion, etc. Estos son los gastos mas controlables.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_subcat"></canvas></div></div>';
  famTab += '</div>'; // close grid-2

  // --- 5. Presupuesto vs Ejecución ---
  famTab += '<div class="section-title">\uD83C\uDFAF PRESUPUESTO VS EJECUCION</div>';
  famTab += '<div class="card"><h3>Plan vs Real - Evolucion Mensual</h3>';
  famTab += '<p class="desc">Area gris = egresos presupuestados. Area coloreada = egresos reales ejecutados. Si el area coloreada supera la gris, hay sobregasto.</p>';
  famTab += '<div class="chart-container"><canvas id="chart_fam_presup"></canvas></div></div>';

  // --- 6. Cuentas + Liquidez ---
  famTab += '<div class="section-title">\uD83C\uDFE6 CUENTAS Y LIQUIDEZ</div>';
  famTab += '<div class="grid grid-2">';

  // Accounts table
  famTab += '<div class="card"><h3>Saldos por cuenta bancaria</h3>';
  famTab += '<p class="desc">Esperado = saldo calculado por el sistema. Banco = saldo real verificado. Diferencia positiva = mas dinero del esperado.</p>';
  famTab += '<table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Banco</th><th class="text-right">Dif.</th></tr></thead><tbody>';
  for (var ai = 0; ai < datos.cuentasFamilia.length; ai++) {
    var ct = datos.cuentasFamilia[ai];
    var difCls = ct.diferencia > 0 ? 'text-green' : ct.diferencia < 0 ? 'text-red' : 'text-gray';
    famTab += '<tr><td>' + ct.nombre + '</td><td class="text-right">' + formatearGuaranies(ct.esperado) + '</td><td class="text-right text-blue font-bold">' + formatearGuaranies(ct.real) + '</td><td class="text-right font-bold ' + difCls + '">' + (ct.diferencia !== 0 ? formatearGuaranies(ct.diferencia) : '-') + '</td></tr>';
  }
  famTab += '</tbody></table></div>';

  // Liquidez
  famTab += '<div class="card"><h3>Liquidez - Gastos pendientes</h3>';
  famTab += '<p class="desc">Disponible menos gastos por vencer cada semana. Si el saldo fin de mes es negativo, no alcanza para cubrir todos los compromisos.</p>';
  famTab += '<div class="liq-item liq-verde"><span>Disponible</span><span class="font-bold text-green">Gs. ' + formatearGuaranies(datos.liquidez.cajaDisponible) + '</span></div>';
  for (var li = 0; li < datos.liquidez.semanas.length; li++) {
    var sem = datos.liquidez.semanas[li];
    var liqCls = li === 0 ? 'liq-amarillo' : 'liq-azul';
    famTab += '<div class="liq-item ' + liqCls + '"><span>' + sem.nombre + '</span><span class="font-bold">- Gs. ' + formatearGuaranies(sem.gastos) + '</span></div>';
  }
  famTab += '<div class="liq-item liq-dark"><span class="font-bold">Saldo fin de mes</span><span class="font-bold">Gs. ' + formatearGuaranies(datos.liquidez.saldoFinal) + '</span></div>';
  famTab += '</div>';
  famTab += '</div>'; // close grid-2

  // --- 7. Flujo entre entidades (COMMON) ---
  famTab += buildFlujoSection('chart_flujo_fam');

  // ═══════════════════════════════════════════════════════════════════════════
  // TAB NEUROTEA
  // ═══════════════════════════════════════════════════════════════════════════

  var ntTab = '';

  // --- KPIs ---
  var pctGNT = datos.neurotea.pctGastos;
  var ganOk = datos.neurotea.ganancia >= datos.neurotea.meta;
  ntTab += '<div class="kpi-grid">';
  ntTab += kpi('blue', 'Ingresos del mes', datos.neurotea.ingresos, '');
  ntTab += kpi('red', 'Egresos pagados', datos.neurotea.egresos, '');
  ntTab += kpi(ganOk ? 'green' : 'red', 'Ganancia real', datos.neurotea.ganancia, ganOk ? 'Meta cumplida' : 'Meta no cumplida', ganOk ? 'up' : 'down');
  ntTab += kpi('amber', 'Pendientes', datos.neurotea.pendientes, datos.neurotea.pendientes > 0 ? 'Egresos sin pagar' : 'Todo al dia', datos.neurotea.pendientes > 0 ? 'down' : 'up');
  ntTab += kpiPct(pctGNT <= datos.metas.maxGastos ? 'green' : 'red', '% Gastos / Ingresos', pctGNT, 'Meta: \u2264' + datos.metas.maxGastos + '%', pctGNT <= datos.metas.maxGastos ? 'up' : 'down');
  ntTab += '</div>';

  // --- 1. Estado de Resultados Mensual ---
  ntTab += '<div class="section-title">\uD83D\uDCC8 ESTADO DE RESULTADOS</div>';
  ntTab += '<div class="grid grid-2">';
  ntTab += '<div class="card"><h3>Ingresos vs Egresos - Mensual</h3>';
  ntTab += '<p class="desc">Barras: ingresos y egresos por mes. Linea: % de ganancia. La linea punteada marca la meta del ' + datos.metas.ganancia + '%. Si la linea esta por encima, el negocio es rentable.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_estado"></canvas></div></div>';

  // --- 2. Ganancia Acumulada ---
  ntTab += '<div class="card"><h3>Ganancia Acumulada Anual</h3>';
  ntTab += '<p class="desc">Si la curva sube, la clinica genera superavit mes a mes. Una curva plana o descendente indica problemas de rentabilidad.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_ganancia_acum"></canvas></div></div>';
  ntTab += '</div>'; // close grid-2

  // --- 3. Distribución de Gastos ---
  ntTab += '<div class="section-title">\uD83E\uDD67 DISTRIBUCION DE GASTOS</div>';
  ntTab += '<div class="grid grid-2">';
  ntTab += '<div class="card"><h3>Gastos por Categoria</h3>';
  ntTab += '<p class="desc">Porcentaje de egresos por area operativa. Identifica las areas de la clinica con mayor consumo de recursos.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_donut"></canvas></div></div>';

  ntTab += '<div class="card"><h3>Composicion: monto por categoria</h3>';
  ntTab += '<p class="desc">Monto real gastado en cada area operativa de la clinica. Las barras muestran el peso de cada rubro.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_comp"></canvas></div></div>';
  ntTab += '</div>'; // close grid-2

  // --- 4. Evolución % Ganancia + Distribución Ganancia ---
  ntTab += '<div class="section-title">\uD83D\uDCC9 RENTABILIDAD</div>';
  ntTab += '<div class="grid grid-2">';
  ntTab += '<div class="card"><h3>Evolucion % Ganancia</h3>';
  ntTab += '<p class="desc">Evolucion del margen de ganancia mensual. La linea punteada verde marca la meta del ' + datos.metas.ganancia + '%. Mientras la linea azul este por encima, el negocio es sostenible.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_pct_ganancia"></canvas></div></div>';

  ntTab += '<div class="card"><h3>Distribucion de Ganancia</h3>';
  ntTab += '<p class="desc">Distribucion de la ganancia en 3 fondos virtuales: Utilidad Due\u00F1o (' + datos.metas.distUtilidad + '%), Fondo Emergencia (' + datos.metas.distEmergencia + '%), Fondo Inversion (' + datos.metas.distInversion + '%). Columna gris = meta, coloreada = real.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_dist"></canvas></div></div>';
  ntTab += '</div>'; // close grid-2

  // --- 5. Presupuesto vs Ejecución + Subcategorías ---
  ntTab += '<div class="section-title">\uD83C\uDFAF PRESUPUESTO Y DETALLE</div>';
  ntTab += '<div class="grid grid-2">';
  ntTab += '<div class="card"><h3>Plan vs Real - Evolucion Mensual</h3>';
  ntTab += '<p class="desc">Controla si la clinica opera dentro del presupuesto planificado. Area gris = plan, area coloreada = ejecucion real.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_presup"></canvas></div></div>';

  ntTab += '<div class="card"><h3>Gastos Variables por Subcategoria</h3>';
  ntTab += '<p class="desc">Detalle de gastos variables de la clinica: insumos, reparaciones, gastos varios, etc. Estos son los gastos mas controlables de la operacion.</p>';
  ntTab += '<div class="chart-container"><canvas id="chart_nt_subcat"></canvas></div></div>';
  ntTab += '</div>'; // close grid-2

  // --- 6. Cuentas NT ---
  ntTab += '<div class="section-title">\uD83C\uDFE6 CUENTAS NEUROTEA</div>';
  ntTab += '<div class="card"><h3>Saldos por cuenta</h3>';
  ntTab += '<p class="desc">Esperado = saldo calculado. Acumulado = movimiento total del a\u00F1o. Permite verificar el estado de cada cuenta de la clinica.</p>';
  ntTab += '<table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Acumulado</th></tr></thead><tbody>';
  for (var nai = 0; nai < datos.cuentasNT.length; nai++) {
    var cnt = datos.cuentasNT[nai];
    ntTab += '<tr><td>' + cnt.nombre + '</td><td class="text-right text-blue font-bold">' + formatearGuaranies(cnt.saldo) + '</td><td class="text-right">' + formatearGuaranies(cnt.acumulado) + '</td></tr>';
  }
  ntTab += '<tr style="background:#f1f5f9"><td class="font-bold">TOTAL</td><td class="text-right font-bold text-blue">' + formatearGuaranies(datos.totalCuentasNT) + '</td><td></td></tr>';
  ntTab += '</tbody></table></div>';

  // --- 7. Flujo entre entidades (COMMON) ---
  ntTab += buildFlujoSection('chart_flujo_nt');

  // ═══════════════════════════════════════════════════════════════════════════
  // JAVASCRIPT - Chart.js rendering
  // ═══════════════════════════════════════════════════════════════════════════

  var js = ''

  // --- Global config ---
  + 'Chart.defaults.font.family="\'Inter\',sans-serif";'
  + 'Chart.defaults.color="#4b5563";'

  // --- Colors ---
  + 'var C={primary:"#1f2937",positive:"#047857",negative:"#dc2626",balance:"#b45309",'
  + 'navy:"#1e3a5f",teal:"#0d9488",amber:"#d97706",indigo:"#4338ca",rose:"#be123c",'
  + 'emerald:"#059669",sky:"#0369a1",violet:"#7c3aed",orange:"#c2410c",cyan:"#0891b2"};'
  + 'var DONUT1=["#1e3a5f","#be123c","#d97706","#4338ca","#0d9488","#7c3aed"];'
  + 'var DONUT2=["#047857","#b45309","#0369a1","#7c3aed","#c2410c","#0891b2","#059669","#4338ca","#0d9488","#1e3a5f"];'

  // --- Format helper ---
  + 'function fmtGs(n){if(!n&&n!==0)return"0";return new Intl.NumberFormat("es-PY").format(Math.round(n));}'
  + 'function fmtM(n){if(!n)return"0";var m=n/1000000;return m>=1?m.toFixed(1)+"M":(n/1000).toFixed(0)+"K";}'

  // --- Common tooltip config ---
  + 'var TT={backgroundColor:"rgba(31,41,55,0.95)",titleColor:"#fff",bodyColor:"#fff",padding:12,displayColors:true};'

  // --- Chart storage ---
  + 'var famCharts={};var ntCharts={};'

  // --- Destroy helper ---
  + 'function destroyCharts(obj){for(var k in obj){if(obj[k]&&obj[k].destroy)obj[k].destroy();}}'

  // --- Tab switching ---
  + 'function showTab(name){'
  + '  document.querySelectorAll(".tab-content").forEach(function(t){t.classList.remove("active");});'
  + '  document.querySelectorAll(".tab").forEach(function(t){t.classList.remove("active");});'
  + '  document.getElementById("tab-"+name).classList.add("active");'
  + '  document.querySelector("[data-tab=\\""+name+"\\"]").classList.add("active");'
  + '  if(name==="familia"){destroyCharts(famCharts);drawFamiliaCharts();}'
  + '  else if(name==="neurotea"){destroyCharts(ntCharts);drawNeuroteaCharts();}'
  + '}'

  // ═══ FAMILIA CHARTS ═══
  + 'function drawFamiliaCharts(){'
  + '  drawFamBalance();drawFamAhorro();drawFamDonut();drawFamComp();drawFamPct();drawFamSubcat();drawFamPresup();drawFlujoChart("chart_flujo_fam");'
  + '}'

  // 1. Balance Mensual (Combo)
  + 'function drawFamBalance(){'
  + '  var ctx=document.getElementById("chart_fam_balance");if(!ctx)return;'
  + '  var balData=[];for(var i=0;i<12;i++){balData.push(DATA.tendencia.familia.ingresos[i]-DATA.tendencia.familia.egresos[i]-DATA.tendencia.familia.ahorro[i]);}'
  + '  famCharts.balance=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"Ingresos",data:DATA.tendencia.familia.ingresos,backgroundColor:C.positive,borderRadius:4,order:2},'
  + '      {label:"Egresos",data:DATA.tendencia.familia.egresos,backgroundColor:C.negative,borderRadius:4,order:2},'
  + '      {label:"Balance",data:balData,type:"line",borderColor:C.balance,backgroundColor:"rgba(180,83,9,0.1)",borderWidth:3,pointRadius:5,pointBackgroundColor:C.balance,pointBorderColor:"#fff",pointBorderWidth:2,tension:0.4,fill:false,order:1,yAxisID:"y1"}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}},y1:{position:"right",ticks:{callback:function(v){return fmtM(v);},color:C.balance},grid:{display:false}}}}'
  + '  });'
  + '}'

  // 2. Ahorro Acumulado
  + 'function drawFamAhorro(){'
  + '  var ctx=document.getElementById("chart_fam_ahorro");if(!ctx)return;'
  + '  var acum=[];var sum=0;for(var i=0;i<12;i++){sum+=DATA.tendencia.familia.ahorro[i];acum.push(sum||null);}'
  + '  famCharts.ahorro=new Chart(ctx,{'
  + '    type:"line",'
  + '    data:{labels:DATA.meses,datasets:[{label:"Ahorro Acumulado",data:acum,borderColor:C.positive,backgroundColor:"rgba(4,120,87,0.1)",fill:true,tension:0.4,borderWidth:3,pointRadius:4,pointHoverRadius:7}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{display:false},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return"Acumulado: Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // 3. Donut categorías FAMILIA
  + 'function drawFamDonut(){'
  + '  var ctx=document.getElementById("chart_fam_donut");if(!ctx)return;'
  + '  var cats=DATA.categorias.familia;var labels=[];var values=[];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("AHORRO")===-1&&c.real>0){labels.push(c.nombre);values.push(c.real);}}'
  + '  if(values.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin egresos registrados</p>";return;}'
  + '  famCharts.donut=new Chart(ctx,{'
  + '    type:"doughnut",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:DONUT1,borderWidth:3,borderColor:"#fff",hoverOffset:8}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,cutout:"60%",'
  + '      plugins:{legend:{position:"right",labels:{usePointStyle:true,padding:12,font:{size:11}}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){var t=0;ctx.dataset.data.forEach(function(v){t+=v;});return ctx.label+": "+Math.round(ctx.raw/t*100)+"%";}}})}}'
  + '  });'
  + '}'

  // 4. Composición horizontal bar FAMILIA
  + 'function drawFamComp(){'
  + '  var ctx=document.getElementById("chart_fam_comp");if(!ctx)return;'
  + '  var cats=DATA.categorias.familia;var gastos=[];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("AHORRO")===-1&&c.real>0)gastos.push(c);}'
  + '  gastos.sort(function(a,b){return b.real-a.real;});'
  + '  var labels=[];var values=[];var colors=[];'
  + '  for(var j=0;j<gastos.length;j++){labels.push(gastos[j].nombre);values.push(gastos[j].real);colors.push(DONUT1[j%DONUT1.length]);}'
  + '  if(values.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  famCharts.comp=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderRadius:4}]},'
  + '    options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{display:false},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return"Gs. "+fmtGs(ctx.raw);}}})},scales:{x:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}},y:{grid:{display:false}}}}'
  + '  });'
  + '}'

  // 5. % Gastos vs Ingresos FAMILIA
  + 'function drawFamPct(){'
  + '  var ctx=document.getElementById("chart_fam_pct");if(!ctx)return;'
  + '  var cats=DATA.categorias.familia;var labels=[];var values=[];var colors=[];var ing=DATA.familia.ingresos||1;'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("AHORRO")===-1&&c.real>0){labels.push(c.nombre);values.push(Math.round(c.real/ing*100));colors.push(DONUT1[labels.length%DONUT1.length]);}}'
  + '  if(values.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  famCharts.pct=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:labels,datasets:[{label:"% de Ingresos",data:values,backgroundColor:colors,borderRadius:4}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{display:false},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.raw+"% de los ingresos";}}})},scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return v+"%";}},grid:{color:"#f3f4f6"},max:Math.max.apply(null,values)+10}}}'
  + '  });'
  + '}'

  // 6. Subcategorías Variables FAMILIA
  + 'function drawFamSubcat(){'
  + '  var ctx=document.getElementById("chart_fam_subcat");if(!ctx)return;'
  + '  var subs=DATA.subcategoriasFam;'
  + '  if(!subs||subs.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin gastos variables este mes</p>";return;}'
  + '  var labels=[];var values=[];for(var i=0;i<subs.length;i++){labels.push(subs[i].nombre);values.push(subs[i].monto);}'
  + '  famCharts.subcat=new Chart(ctx,{'
  + '    type:"doughnut",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:DONUT2,borderWidth:3,borderColor:"#fff",hoverOffset:8}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,cutout:"55%",'
  + '      plugins:{legend:{position:"right",labels:{usePointStyle:true,padding:10,font:{size:10}}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.label+": Gs. "+fmtGs(ctx.raw);}}})}}'
  + '  });'
  + '}'

  // 7. Presupuesto vs Ejecución FAMILIA
  + 'function drawFamPresup(){'
  + '  var ctx=document.getElementById("chart_fam_presup");if(!ctx)return;'
  + '  var presup=DATA.tendencia.familia.presupEgresos;var real=DATA.tendencia.familia.egresos;'
  + '  var realData=[];for(var i=0;i<12;i++){realData.push(real[i]||null);}'
  + '  famCharts.presup=new Chart(ctx,{'
  + '    type:"line",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"Presupuestado",data:presup,borderColor:C.primary,backgroundColor:"rgba(31,41,55,0.12)",fill:true,tension:0.1,borderWidth:2},'
  + '      {label:"Ejecutado",data:realData,borderColor:C.teal,backgroundColor:"rgba(13,148,136,0.12)",fill:true,tension:0.4,borderWidth:3}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // ═══ NEUROTEA CHARTS ═══
  + 'function drawNeuroteaCharts(){'
  + '  drawNTEstado();drawNTGananciaAcum();drawNTDonut();drawNTComp();drawNTPctGanancia();drawNTDist();drawNTPresup();drawNTSubcat();drawFlujoChart("chart_flujo_nt");'
  + '}'

  // 1. Estado de Resultados NT (Combo)
  + 'function drawNTEstado(){'
  + '  var ctx=document.getElementById("chart_nt_estado");if(!ctx)return;'
  + '  var pctData=[];for(var i=0;i<12;i++){var ing=DATA.tendencia.neurotea.ingresos[i];var egr=DATA.tendencia.neurotea.egresos[i];pctData.push(ing>0?Math.round((ing-egr)/ing*100):null);}'
  + '  ntCharts.estado=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"Ingresos",data:DATA.tendencia.neurotea.ingresos,backgroundColor:C.sky,borderRadius:4,order:2},'
  + '      {label:"Egresos",data:DATA.tendencia.neurotea.egresos,backgroundColor:C.negative,borderRadius:4,order:2},'
  + '      {label:"% Ganancia",data:pctData,type:"line",borderColor:C.positive,backgroundColor:"rgba(4,120,87,0.1)",borderWidth:3,pointRadius:5,pointBackgroundColor:C.positive,tension:0.4,fill:false,order:1,yAxisID:"y1"},'
  + '      {label:"Meta "+DATA.metas.ganancia+"%",data:new Array(12).fill(DATA.metas.ganancia),type:"line",borderColor:C.positive,borderDash:[8,4],borderWidth:2,pointRadius:0,fill:false,order:0,yAxisID:"y1"}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,interaction:{intersect:false,mode:"index"},'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:12}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){if(ctx.dataset.label.indexOf("%")>=0)return ctx.dataset.label+": "+ctx.raw+"%";return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}},y1:{position:"right",ticks:{callback:function(v){return v+"%";},color:C.positive},grid:{display:false},min:0,max:40}}}'
  + '  });'
  + '}'

  // 2. Ganancia Acumulada NT
  + 'function drawNTGananciaAcum(){'
  + '  var ctx=document.getElementById("chart_nt_ganancia_acum");if(!ctx)return;'
  + '  var acum=[];var sum=0;for(var i=0;i<12;i++){var g=DATA.tendencia.neurotea.ingresos[i]-DATA.tendencia.neurotea.egresos[i];sum+=g;acum.push(sum||null);}'
  + '  ntCharts.gananciaAcum=new Chart(ctx,{'
  + '    type:"line",'
  + '    data:{labels:DATA.meses,datasets:[{label:"Ganancia Acumulada",data:acum,borderColor:C.emerald,backgroundColor:"rgba(5,150,105,0.1)",fill:true,tension:0.4,borderWidth:3,pointRadius:4,pointHoverRadius:7}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{display:false},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return"Acumulado: Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // 3. Donut categorías NT
  + 'function drawNTDonut(){'
  + '  var ctx=document.getElementById("chart_nt_donut");if(!ctx)return;'
  + '  var cats=DATA.categorias.neurotea;var labels=[];var values=[];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("GANANCIA")===-1&&c.real>0){labels.push(c.nombre);values.push(c.real);}}'
  + '  if(values.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin egresos registrados</p>";return;}'
  + '  ntCharts.donut=new Chart(ctx,{'
  + '    type:"doughnut",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:["#0369a1","#6366f1","#8b5cf6","#06b6d4","#14b8a6","#1e3a5f"],borderWidth:3,borderColor:"#fff",hoverOffset:8}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,cutout:"60%",'
  + '      plugins:{legend:{position:"right",labels:{usePointStyle:true,padding:12,font:{size:11}}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){var t=0;ctx.dataset.data.forEach(function(v){t+=v;});return ctx.label+": "+Math.round(ctx.raw/t*100)+"%";}}})}}'
  + '  });'
  + '}'

  // 4. Composición horizontal bar NT
  + 'function drawNTComp(){'
  + '  var ctx=document.getElementById("chart_nt_comp");if(!ctx)return;'
  + '  var cats=DATA.categorias.neurotea;var gastos=[];'
  + '  for(var i=0;i<cats.length;i++){var c=cats[i];var n=c.nombre.toUpperCase();if(n.indexOf("INGRESO")===-1&&n.indexOf("BALANCE")===-1&&n.indexOf("GANANCIA")===-1&&c.real>0)gastos.push(c);}'
  + '  gastos.sort(function(a,b){return b.real-a.real;});'
  + '  var labels=[];var values=[];var colors=["#0369a1","#6366f1","#8b5cf6","#06b6d4","#14b8a6","#1e3a5f"];'
  + '  for(var j=0;j<gastos.length;j++){labels.push(gastos[j].nombre);values.push(gastos[j].real);}'
  + '  if(values.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin datos</p>";return;}'
  + '  ntCharts.comp=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:colors,borderRadius:4}]},'
  + '    options:{indexAxis:"y",responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{display:false},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return"Gs. "+fmtGs(ctx.raw);}}})},scales:{x:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}},y:{grid:{display:false}}}}'
  + '  });'
  + '}'

  // 5. Evolución % Ganancia NT
  + 'function drawNTPctGanancia(){'
  + '  var ctx=document.getElementById("chart_nt_pct_ganancia");if(!ctx)return;'
  + '  var pctData=[];for(var i=0;i<12;i++){var ing=DATA.tendencia.neurotea.ingresos[i];var egr=DATA.tendencia.neurotea.egresos[i];pctData.push(ing>0?Math.round((ing-egr)/ing*100):null);}'
  + '  ntCharts.pctGanancia=new Chart(ctx,{'
  + '    type:"line",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"% Ganancia",data:pctData,borderColor:C.sky,backgroundColor:"rgba(3,105,161,0.08)",fill:true,tension:0.4,borderWidth:3,pointRadius:5,pointBackgroundColor:C.sky},'
  + '      {label:"Meta ("+DATA.metas.ganancia+"%)",data:new Array(12).fill(DATA.metas.ganancia),borderColor:C.positive,borderDash:[8,4],borderWidth:2,pointRadius:0,fill:false}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": "+ctx.raw+"%";}}})},scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return v+"%";}},grid:{color:"#f3f4f6"},min:0,max:40}}}'
  + '  });'
  + '}'

  // 6. Distribución Ganancia NT (Column)
  + 'function drawNTDist(){'
  + '  var ctx=document.getElementById("chart_nt_dist");if(!ctx)return;'
  + '  var dist=DATA.neurotea.distribucion;var metas=DATA.metas;var metaTotal=DATA.neurotea.meta;'
  + '  var metaUtil=Math.round(metaTotal*metas.distUtilidad/100);var metaEmerg=Math.round(metaTotal*metas.distEmergencia/100);var metaInv=Math.round(metaTotal*metas.distInversion/100);'
  + '  ntCharts.dist=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:["Utilidad Due\\u00F1o","Fondo Emergencia","Fondo Inversion"],'
  + '      datasets:[{label:"Meta",data:[metaUtil,metaEmerg,metaInv],backgroundColor:"#94a3b8",borderRadius:4},{label:"Real",data:[dist.utilidad,dist.emergencia,dist.inversion],backgroundColor:C.emerald,borderRadius:4}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // 7. Presupuesto vs Ejecución NT
  + 'function drawNTPresup(){'
  + '  var ctx=document.getElementById("chart_nt_presup");if(!ctx)return;'
  + '  var presup=DATA.tendencia.neurotea.presupEgresos;var real=DATA.tendencia.neurotea.egresos;'
  + '  var realData=[];for(var i=0;i<12;i++){realData.push(real[i]||null);}'
  + '  ntCharts.presup=new Chart(ctx,{'
  + '    type:"line",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"Presupuestado",data:presup,borderColor:C.primary,backgroundColor:"rgba(31,41,55,0.12)",fill:true,tension:0.1,borderWidth:2},'
  + '      {label:"Ejecutado",data:realData,borderColor:C.sky,backgroundColor:"rgba(3,105,161,0.12)",fill:true,tension:0.4,borderWidth:3}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},'
  + '      scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // 8. Subcategorías Variables NT
  + 'function drawNTSubcat(){'
  + '  var ctx=document.getElementById("chart_nt_subcat");if(!ctx)return;'
  + '  var subs=DATA.subcategoriasNT;'
  + '  if(!subs||subs.length===0){ctx.parentElement.innerHTML="<p style=\\"text-align:center;padding:60px;color:#94a3b8\\">Sin gastos variables este mes</p>";return;}'
  + '  var labels=[];var values=[];for(var i=0;i<subs.length;i++){labels.push(subs[i].nombre);values.push(subs[i].monto);}'
  + '  ntCharts.subcat=new Chart(ctx,{'
  + '    type:"doughnut",'
  + '    data:{labels:labels,datasets:[{data:values,backgroundColor:DONUT2,borderWidth:3,borderColor:"#fff",hoverOffset:8}]},'
  + '    options:{responsive:true,maintainAspectRatio:false,cutout:"55%",'
  + '      plugins:{legend:{position:"right",labels:{usePointStyle:true,padding:10,font:{size:10}}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.label+": Gs. "+fmtGs(ctx.raw);}}})}}'
  + '  });'
  + '}'

  // ═══ COMMON: Flujo Mensual Chart ═══
  + 'function drawFlujoChart(canvasId){'
  + '  var ctx=document.getElementById(canvasId);if(!ctx)return;'
  + '  var obj=(canvasId.indexOf("fam")>=0)?famCharts:ntCharts;'
  + '  obj.flujo=new Chart(ctx,{'
  + '    type:"bar",'
  + '    data:{labels:DATA.meses,datasets:['
  + '      {label:"NT \\u2192 Familia",data:DATA.flujoMensual.ntToFam,backgroundColor:C.primary,borderRadius:4},'
  + '      {label:"Familia \\u2192 NT",data:DATA.flujoMensual.famToNT,backgroundColor:C.teal,borderRadius:4}'
  + '    ]},'
  + '    options:{responsive:true,maintainAspectRatio:false,'
  + '      plugins:{legend:{position:"top",labels:{usePointStyle:true,padding:14}},tooltip:Object.assign({},TT,{callbacks:{label:function(ctx){return ctx.dataset.label+": Gs. "+fmtGs(ctx.raw);}}})},scales:{x:{grid:{display:false}},y:{ticks:{callback:function(v){return fmtM(v);}},grid:{color:"#f3f4f6"}}}}'
  + '  });'
  + '}'

  // --- Initialize ---
  + 'drawFamiliaCharts();';

  // ═══════════════════════════════════════════════════════════════════════════
  // ASSEMBLE COMPLETE HTML
  // ═══════════════════════════════════════════════════════════════════════════

  return '<!DOCTYPE html>'
  + '<html lang="es"><head>'
  + '<meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">'
  + '<title>Dashboard Financiero ' + AÑO + '</title>'
  + '<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">'
  + '<script src="https://cdn.jsdelivr.net/npm/chart.js"><\/script>'
  + '<style>' + css + '</style>'
  + '</head><body>'

  // Header
  + '<div class="header"><h1>\uD83D\uDCCA Dashboard Financiero ' + AÑO + '</h1>'
  + '<div class="header-right"><span>Mes: <strong>' + datos.mes + '</strong></span><span>|</span><span>' + new Date().toLocaleDateString('es-PY') + '</span><span>|</span><span>v' + VERSION + '</span></div>'
  + '</div>'

  // Tabs
  + '<div class="tabs">'
  + '<button class="tab active" data-tab="familia" onclick="showTab(\'familia\')">\uD83C\uDFE0 FAMILIA</button>'
  + '<button class="tab" data-tab="neurotea" onclick="showTab(\'neurotea\')">\uD83C\uDFE5 NEUROTEA</button>'
  + '</div>'

  // Tab contents
  + '<div id="tab-familia" class="tab-content active">' + famTab + '</div>'
  + '<div id="tab-neurotea" class="tab-content">' + ntTab + '</div>'

  // Footer
  + '<div class="footer">Dashboard Financiero ' + AÑO + ' - NeuroTEA & Familia | v' + VERSION + '</div>'

  // Script
  + '<script>var DATA=' + dataJson + ';' + js + '<\/script>'
  + '</body></html>';
}
