/**
 * ═══════════════════════════════════════════════════════════════════════════
 * SIMULACIÓN COMPLETA DE CÁLCULOS FINANCIEROS
 * Sistema de Control Financiero 2026
 *
 * Este script simula EXACTAMENTE lo que hacen las fórmulas del TABLERO
 * para identificar dónde está el error.
 * ═══════════════════════════════════════════════════════════════════════════
 */

/**
 * SIMULACIÓN PRINCIPAL - Ejecutar esta función
 */
function simularTodo() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('SIMULACIÓN COMPLETA DE CÁLCULOS - ' + new Date().toLocaleString());
  Logger.log('═══════════════════════════════════════════════════════════════');

  // 1. Obtener mes actual de MOVIMIENTO
  const mesNum = obtenerMesActual(ss);
  Logger.log('\n📅 MES ACTUAL: ' + mesNum + ' (MOVIMIENTO!N3)');

  // 2. Simular INGRESOS FAMILIA
  const resultadoIngresos = simularIngresosFamilia(ss, mesNum);

  // 3. Simular EGRESOS PAGADOS
  const resultadoEgresos = simularEgresosPagados(ss);

  // 4. Simular Esperado por cuenta
  const resultadoEsperado = simularEsperadoPorCuenta(ss, mesNum);

  // 5. Calcular valores finales
  const disponibleIndicador = resultadoIngresos.total - resultadoEgresos.total;
  const totalDisponible = resultadoEsperado.totalFamilia;
  const discrepancia = disponibleIndicador - totalDisponible;

  Logger.log('\n═══════════════════════════════════════════════════════════════');
  Logger.log('📊 RESUMEN FINAL');
  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('INGRESOS (simulado):        Gs. ' + formatNum(resultadoIngresos.total));
  Logger.log('EGRESOS PAGADOS (simulado): Gs. ' + formatNum(resultadoEgresos.total));
  Logger.log('DISPONIBLE (Ing-Egr):       Gs. ' + formatNum(disponibleIndicador));
  Logger.log('TOTAL DISPONIBLE (cuentas): Gs. ' + formatNum(totalDisponible));
  Logger.log('DISCREPANCIA:               Gs. ' + formatNum(discrepancia));

  // Mostrar resumen en UI
  let msg = '📊 SIMULACIÓN COMPLETA\n\n';
  msg += 'INGRESOS: Gs. ' + formatNum(resultadoIngresos.total) + '\n';
  msg += 'EGRESOS PAGADOS: Gs. ' + formatNum(resultadoEgresos.total) + '\n';
  msg += 'DISPONIBLE (indicador): Gs. ' + formatNum(disponibleIndicador) + '\n';
  msg += 'TOTAL DISPONIBLE (cuentas): Gs. ' + formatNum(totalDisponible) + '\n';
  msg += 'DISCREPANCIA: Gs. ' + formatNum(discrepancia) + '\n\n';
  msg += 'Ver Logger para detalles completos.';

  ui.alert('Simulación Completada', msg, ui.ButtonSet.OK);
}

/**
 * Obtiene el mes actual de MOVIMIENTO!N3
 */
function obtenerMesActual(ss) {
  const movSheet = ss.getSheetByName('MOVIMIENTO');
  if (!movSheet) {
    Logger.log('ERROR: No se encontró MOVIMIENTO');
    return 1;
  }

  const valor = movSheet.getRange('N3').getValue();
  Logger.log('Valor raw de N3: ' + valor + ' (tipo: ' + typeof valor + ')');

  // N3 puede tener una fórmula que devuelve el número de mes
  // O puede ser el número directamente
  if (typeof valor === 'number') {
    return valor;
  }

  // Si es string, intentar parsear
  const num = parseInt(valor);
  if (!isNaN(num)) {
    return num;
  }

  Logger.log('ADVERTENCIA: N3 no contiene un número válido, usando mes 1');
  return 1;
}

/**
 * Simula la fórmula de INGRESOS FAMILIA
 * Fórmula original:
 * =SUMPRODUCT((CARGA_FAMILIA!$B$4:$B$500<>"Egreso Familiar")
 *            *(CARGA_FAMILIA!$B$4:$B$500<>"Ahorro")
 *            *(MONTH(CARGA_FAMILIA!$A$4:$A$500)=MOVIMIENTO!$N$3)
 *            *(YEAR(CARGA_FAMILIA!$A$4:$A$500)=2026)
 *            *(CARGA_FAMILIA!$F$4:$F$500))
 */
function simularIngresosFamilia(ss, mesNum) {
  Logger.log('\n═══════════════════════════════════════════════════════════════');
  Logger.log('💵 SIMULANDO INGRESOS FAMILIA');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const cargaSheet = ss.getSheetByName('CARGA_FAMILIA');
  if (!cargaSheet) {
    Logger.log('ERROR: No se encontró CARGA_FAMILIA');
    return { total: 0, detalle: [] };
  }

  const lastRow = cargaSheet.getLastRow();
  Logger.log('Última fila en CARGA_FAMILIA: ' + lastRow);

  if (lastRow < 4) {
    Logger.log('No hay datos en CARGA_FAMILIA');
    return { total: 0, detalle: [] };
  }

  // Leer datos: A=Fecha, B=Tipo, F=Monto
  const datos = cargaSheet.getRange(4, 1, lastRow - 3, 7).getValues();
  Logger.log('Filas de datos leídas: ' + datos.length);

  let total = 0;
  const detalle = [];
  let contadorPorTipo = {};
  let contadorPorMes = {};
  let contadorPorAño = {};

  datos.forEach((fila, idx) => {
    const fecha = fila[0];  // Columna A
    const tipo = fila[1];   // Columna B
    const monto = fila[5];  // Columna F

    // Contar por tipo
    contadorPorTipo[tipo] = (contadorPorTipo[tipo] || 0) + 1;

    // Verificar si es fecha válida
    if (!fecha || !(fecha instanceof Date)) {
      return;
    }

    const mesFila = fecha.getMonth() + 1;
    const añoFila = fecha.getFullYear();

    // Contar por mes y año
    contadorPorMes[mesFila] = (contadorPorMes[mesFila] || 0) + 1;
    contadorPorAño[añoFila] = (contadorPorAño[añoFila] || 0) + 1;

    // Aplicar filtros de la fórmula
    const noEsEgreso = tipo !== 'Egreso Familiar';
    const noEsAhorro = tipo !== 'Ahorro';
    const mesCorrecto = mesFila === mesNum;
    const añoCorrecto = añoFila === 2026;

    if (noEsEgreso && noEsAhorro && mesCorrecto && añoCorrecto) {
      total += monto || 0;
      detalle.push({
        fila: idx + 4,
        fecha: Utilities.formatDate(fecha, 'America/Asuncion', 'dd/MM/yyyy'),
        tipo: tipo,
        monto: monto
      });
    }
  });

  Logger.log('\n📈 CONTADORES DE DIAGNÓSTICO:');
  Logger.log('Por TIPO: ' + JSON.stringify(contadorPorTipo));
  Logger.log('Por MES: ' + JSON.stringify(contadorPorMes));
  Logger.log('Por AÑO: ' + JSON.stringify(contadorPorAño));

  Logger.log('\n✅ TRANSACCIONES QUE CALIFICAN COMO INGRESO:');
  Logger.log('Total: ' + detalle.length + ' transacciones');
  Logger.log('Suma: Gs. ' + formatNum(total));

  if (detalle.length <= 20) {
    detalle.forEach(d => {
      Logger.log('  Fila ' + d.fila + ': ' + d.fecha + ' | ' + d.tipo + ' | Gs. ' + formatNum(d.monto));
    });
  } else {
    Logger.log('  (Mostrando primeras 10 de ' + detalle.length + ')');
    detalle.slice(0, 10).forEach(d => {
      Logger.log('  Fila ' + d.fila + ': ' + d.fecha + ' | ' + d.tipo + ' | Gs. ' + formatNum(d.monto));
    });
  }

  return { total: total, detalle: detalle };
}

/**
 * Simula la fórmula de EGRESOS PAGADOS
 * Fórmula original:
 * =SUMIFS(MOVIMIENTO!F9:F113;MOVIMIENTO!B9:B113;"Egreso";MOVIMIENTO!J9:J113;"Pagado")
 */
function simularEgresosPagados(ss) {
  Logger.log('\n═══════════════════════════════════════════════════════════════');
  Logger.log('📤 SIMULANDO EGRESOS PAGADOS');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const movSheet = ss.getSheetByName('MOVIMIENTO');
  if (!movSheet) {
    Logger.log('ERROR: No se encontró MOVIMIENTO');
    return { total: 0, detalle: [] };
  }

  // Leer filas 9-113 (rango FAMILIA en MOVIMIENTO)
  // Columnas: B=TIPO, F=REAL, J=EST.PAGO
  const datos = movSheet.getRange('A9:N113').getValues();

  let total = 0;
  const detalle = [];
  let contadorPorTipo = {};
  let contadorPorEstado = {};

  datos.forEach((fila, idx) => {
    const concepto = fila[0]; // Columna A
    const tipo = fila[1];     // Columna B
    const real = fila[5];     // Columna F
    const estPago = fila[9];  // Columna J

    if (!concepto) return; // Fila vacía

    // Contar por tipo y estado
    contadorPorTipo[tipo] = (contadorPorTipo[tipo] || 0) + 1;
    contadorPorEstado[estPago] = (contadorPorEstado[estPago] || 0) + 1;

    // Aplicar filtros
    if (tipo === 'Egreso' && estPago === 'Pagado') {
      total += real || 0;
      detalle.push({
        fila: idx + 9,
        concepto: concepto,
        real: real,
        estPago: estPago
      });
    }
  });

  Logger.log('\n📈 CONTADORES DE DIAGNÓSTICO:');
  Logger.log('Por TIPO: ' + JSON.stringify(contadorPorTipo));
  Logger.log('Por EST.PAGO: ' + JSON.stringify(contadorPorEstado));

  Logger.log('\n✅ EGRESOS PAGADOS:');
  Logger.log('Total: ' + detalle.length + ' conceptos');
  Logger.log('Suma: Gs. ' + formatNum(total));

  return { total: total, detalle: detalle };
}

/**
 * Simula el cálculo de Esperado por cuenta
 * Fórmula por cuenta:
 * = Saldo_Inicial (CONFIG)
 * + SUMPRODUCT(CARGA donde G=cuenta y B<>"Egreso" y B<>"Ahorro")  // Ingresos
 * - SUMPRODUCT(CARGA donde G=cuenta y B="Egreso Familiar")         // Egresos
 * - SUMPRODUCT(CARGA donde G=cuenta y B="Ahorro")                  // Ahorro
 * - SUMPRODUCT(MOVIMIENTO donde N=cuenta y J="Pagado")             // Gastos fijos
 */
function simularEsperadoPorCuenta(ss, mesNum) {
  Logger.log('\n═══════════════════════════════════════════════════════════════');
  Logger.log('💰 SIMULANDO ESPERADO POR CUENTA');
  Logger.log('═══════════════════════════════════════════════════════════════');

  const cuentasFamilia = [
    'ITAU Marco', 'Coop. Univ. Marco', 'ITAU Clara', 'UENO Clara',
    'Tarjeta Solar Clara', 'Tarjeta ITAU Clara', 'Tarjeta ITAU Marco',
    'Tarjeta Comecipar Clara', 'Gourmed', 'Efectivo'
  ];

  // Leer datos de CARGA_FAMILIA
  const cargaSheet = ss.getSheetByName('CARGA_FAMILIA');
  const configSheet = ss.getSheetByName('CONFIG');
  const movSheet = ss.getSheetByName('MOVIMIENTO');

  if (!cargaSheet || !configSheet || !movSheet) {
    Logger.log('ERROR: Falta alguna hoja requerida');
    return { totalFamilia: 0, detallePorCuenta: {} };
  }

  const lastRowCarga = cargaSheet.getLastRow();
  const datosCarga = lastRowCarga >= 4 ? cargaSheet.getRange(4, 1, lastRowCarga - 3, 7).getValues() : [];

  // Leer saldos iniciales de CONFIG (filas 65-74, columnas B-M)
  const saldosIniciales = configSheet.getRange('A65:M74').getValues();

  // Leer MOVIMIENTO para gastos fijos (columna N = cuenta, J = EST.PAGO, F = REAL)
  const datosMovimiento = movSheet.getRange('A9:N113').getValues();

  let totalFamilia = 0;
  const detallePorCuenta = {};

  cuentasFamilia.forEach((cuenta, idx) => {
    // 1. Saldo inicial de CONFIG
    let saldoInicial = 0;
    for (let i = 0; i < saldosIniciales.length; i++) {
      if (saldosIniciales[i][0] === cuenta) {
        saldoInicial = saldosIniciales[i][mesNum] || 0; // mesNum es 1-12, columnas B-M son índices 1-12
        break;
      }
    }

    // 2. Ingresos de CARGA a esta cuenta
    let ingresosCarga = 0;
    // 3. Egresos de CARGA de esta cuenta
    let egresosCarga = 0;
    // 4. Ahorro de CARGA de esta cuenta
    let ahorroCarga = 0;

    datosCarga.forEach(fila => {
      const fecha = fila[0];
      const tipo = fila[1];
      const monto = fila[5];
      const cuentaFila = fila[6];

      if (!fecha || !(fecha instanceof Date)) return;
      if (fecha.getMonth() + 1 !== mesNum || fecha.getFullYear() !== 2026) return;
      if (cuentaFila !== cuenta) return;

      if (tipo !== 'Egreso Familiar' && tipo !== 'Ahorro') {
        ingresosCarga += monto || 0;
      } else if (tipo === 'Egreso Familiar') {
        egresosCarga += monto || 0;
      } else if (tipo === 'Ahorro') {
        ahorroCarga += monto || 0;
      }
    });

    // 5. Gastos fijos pagados de MOVIMIENTO
    let gastosFijosPagados = 0;
    datosMovimiento.forEach(fila => {
      const tipo = fila[1];      // Columna B
      const real = fila[5];      // Columna F
      const estPago = fila[9];   // Columna J
      const cuentaMov = fila[13]; // Columna N

      if (cuentaMov === cuenta && estPago === 'Pagado') {
        gastosFijosPagados += real || 0;
      }
    });

    // Calcular Esperado
    const esperado = saldoInicial + ingresosCarga - egresosCarga - ahorroCarga - gastosFijosPagados;

    detallePorCuenta[cuenta] = {
      saldoInicial: saldoInicial,
      ingresosCarga: ingresosCarga,
      egresosCarga: egresosCarga,
      ahorroCarga: ahorroCarga,
      gastosFijosPagados: gastosFijosPagados,
      esperado: esperado
    };

    totalFamilia += esperado;

    Logger.log('\n📊 ' + cuenta + ':');
    Logger.log('  Saldo Inicial:     Gs. ' + formatNum(saldoInicial));
    Logger.log('  + Ingresos CARGA:  Gs. ' + formatNum(ingresosCarga));
    Logger.log('  - Egresos CARGA:   Gs. ' + formatNum(egresosCarga));
    Logger.log('  - Ahorro CARGA:    Gs. ' + formatNum(ahorroCarga));
    Logger.log('  - Gastos Fijos:    Gs. ' + formatNum(gastosFijosPagados));
    Logger.log('  ─────────────────────────');
    Logger.log('  = ESPERADO:        Gs. ' + formatNum(esperado));
  });

  Logger.log('\n═══════════════════════════════════════════════════════════════');
  Logger.log('💵 TOTAL DISPONIBLE FAMILIA: Gs. ' + formatNum(totalFamilia));
  Logger.log('═══════════════════════════════════════════════════════════════');

  return { totalFamilia: totalFamilia, detallePorCuenta: detallePorCuenta };
}

/**
 * Formatea un número con separadores de miles
 */
function formatNum(num) {
  if (num === null || num === undefined) return '0';
  return Math.round(num).toLocaleString('es-PY').replace(/,/g, '.');
}

/**
 * Agrega menú de simulación
 */
function agregarMenuSimulacion() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔬 Simulación')
    .addItem('Simular Todo', 'simularTodo')
    .addItem('Solo Ingresos', 'soloIngresos')
    .addItem('Solo Esperado', 'soloEsperado')
    .addToUi();
}

function soloIngresos() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mesNum = obtenerMesActual(ss);
  simularIngresosFamilia(ss, mesNum);
}

function soloEsperado() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const mesNum = obtenerMesActual(ss);
  simularEsperadoPorCuenta(ss, mesNum);
}
