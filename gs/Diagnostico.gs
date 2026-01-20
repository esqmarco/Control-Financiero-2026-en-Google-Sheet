/**
 * ═══════════════════════════════════════════════════════════════════════════
 * DIAGNÓSTICO DE DISCREPANCIA DISPONIBLE vs TOTAL DISPONIBLE
 * Sistema de Control Financiero 2026
 *
 * Este script identifica la causa exacta de la discrepancia entre:
 * - DISPONIBLE (indicador ROW 5): INGRESOS - EGRESOS_PAGADOS - AHORRO - FONDO
 * - TOTAL DISPONIBLE (suma cuentas): SUM(Esperado de cada cuenta)
 *
 * HIPÓTESIS: Transacciones con columna CUENTA (G) vacía se cuentan en
 * el cálculo global pero NO en ningún Esperado por cuenta.
 * ═══════════════════════════════════════════════════════════════════════════
 */

const AÑO_DIAGNOSTICO = 2026;

/**
 * Función principal de diagnóstico
 * Ejecutar desde menú o directamente
 */
function diagnosticarDiscrepancia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  // Obtener mes actual de MOVIMIENTO
  const movSheet = ss.getSheetByName('MOVIMIENTO');
  if (!movSheet) {
    ui.alert('Error', 'No se encontró la hoja MOVIMIENTO', ui.ButtonSet.OK);
    return;
  }

  const mesNum = movSheet.getRange('N3').getValue();
  const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
                 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
  const mesNombre = meses[mesNum - 1] || 'Desconocido';

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('DIAGNÓSTICO DE DISCREPANCIA - ' + mesNombre + ' ' + AÑO_DIAGNOSTICO);
  Logger.log('═══════════════════════════════════════════════════════════════');

  // 1. Analizar CARGA_FAMILIA
  const resultadosFamilia = analizarCargaFamilia(ss, mesNum);

  // 2. Obtener valores actuales del TABLERO
  const valoresTablero = obtenerValoresTablero(ss);

  // 3. Calcular discrepancia esperada
  const discrepanciaCalculada = calcularDiscrepanciaEsperada(resultadosFamilia, valoresTablero);

  // 4. Mostrar reporte
  mostrarReporte(resultadosFamilia, valoresTablero, discrepanciaCalculada, mesNombre);
}

/**
 * Analiza CARGA_FAMILIA buscando transacciones con CUENTA vacía
 */
function analizarCargaFamilia(ss, mesNum) {
  const cargaSheet = ss.getSheetByName('CARGA_FAMILIA');
  if (!cargaSheet) {
    Logger.log('ERROR: No se encontró CARGA_FAMILIA');
    return null;
  }

  // Leer datos desde fila 4 (después de headers)
  // Columnas: A=Fecha, B=Tipo, C=Categoría, D=Subcategoría, E=Descripción, F=Monto, G=Cuenta, H=Notas
  const lastRow = cargaSheet.getLastRow();
  if (lastRow < 4) {
    Logger.log('CARGA_FAMILIA sin datos');
    return { sinCuenta: [], conCuenta: [], totales: {} };
  }

  const datos = cargaSheet.getRange(4, 1, lastRow - 3, 8).getValues();

  const transaccionesSinCuenta = [];
  const transaccionesConCuenta = [];

  let ingresosSinCuenta = 0;
  let egresosSinCuenta = 0;
  let ahorroSinCuenta = 0;

  let ingresosConCuenta = 0;
  let egresosConCuenta = 0;
  let ahorroConCuenta = 0;

  datos.forEach((fila, idx) => {
    const fecha = fila[0];
    const tipo = fila[1] || '';
    const categoria = fila[2] || '';
    const subcategoria = fila[3] || '';
    const descripcion = fila[4] || '';
    const monto = fila[5] || 0;
    const cuenta = fila[6] || '';
    const notas = fila[7] || '';

    // Verificar si es del mes correcto
    if (!fecha || !(fecha instanceof Date)) return;

    const mesFila = fecha.getMonth() + 1; // getMonth() devuelve 0-11
    const añoFila = fecha.getFullYear();

    if (mesFila !== mesNum || añoFila !== AÑO_DIAGNOSTICO) return;

    // Clasificar transacción
    const esIngreso = tipo !== 'Egreso Familiar' && tipo !== 'Ahorro';
    const esEgreso = tipo === 'Egreso Familiar';
    const esAhorro = tipo === 'Ahorro';

    const cuentaVacia = !cuenta || cuenta.toString().trim() === '' || cuenta === '-';

    const transaccion = {
      fila: idx + 4,
      fecha: Utilities.formatDate(fecha, 'America/Asuncion', 'dd/MM/yyyy'),
      tipo: tipo,
      categoria: categoria,
      subcategoria: subcategoria,
      descripcion: descripcion,
      monto: monto,
      cuenta: cuenta || '(VACÍA)',
      notas: notas
    };

    if (cuentaVacia) {
      transaccionesSinCuenta.push(transaccion);

      if (esIngreso) ingresosSinCuenta += monto;
      else if (esEgreso) egresosSinCuenta += monto;
      else if (esAhorro) ahorroSinCuenta += monto;
    } else {
      transaccionesConCuenta.push(transaccion);

      if (esIngreso) ingresosConCuenta += monto;
      else if (esEgreso) egresosConCuenta += monto;
      else if (esAhorro) ahorroConCuenta += monto;
    }
  });

  return {
    sinCuenta: transaccionesSinCuenta,
    conCuenta: transaccionesConCuenta,
    totales: {
      ingresosSinCuenta: ingresosSinCuenta,
      egresosSinCuenta: egresosSinCuenta,
      ahorroSinCuenta: ahorroSinCuenta,
      ingresosConCuenta: ingresosConCuenta,
      egresosConCuenta: egresosConCuenta,
      ahorroConCuenta: ahorroConCuenta,
      totalIngresos: ingresosSinCuenta + ingresosConCuenta,
      totalEgresos: egresosSinCuenta + egresosConCuenta,
      totalAhorro: ahorroSinCuenta + ahorroConCuenta
    }
  };
}

/**
 * Obtiene los valores actuales del TABLERO para comparar
 */
function obtenerValoresTablero(ss) {
  const tableroSheet = ss.getSheetByName('TABLERO');
  if (!tableroSheet) {
    Logger.log('ERROR: No se encontró TABLERO');
    return null;
  }

  // Buscar valores por texto de celda (más robusto que filas fijas)
  const datos = tableroSheet.getDataRange().getValues();

  let ingresos = 0;
  let egresosPagados = 0;
  let ahorro = 0;
  let fondoEmergencia = 0;
  let totalDisponible = 0;
  let disponibleIndicador = 0;

  for (let i = 0; i < datos.length; i++) {
    const fila = datos[i];

    // Buscar en columnas A-F (FAMILIA está en columnas B-E)
    for (let j = 0; j < Math.min(6, fila.length); j++) {
      const celda = fila[j];
      if (typeof celda !== 'string') continue;

      // TOTAL DISPONIBLE (suma de cuentas)
      if (celda.includes('TOTAL DISPONIBLE') && !celda.includes('DISPONIBLE:')) {
        // El valor numérico está en la siguiente columna
        totalDisponible = obtenerValorNumerico(tableroSheet, i + 1, j + 2);
      }

      // DISPONIBLE (indicador con texto "💰 DISPONIBLE: Gs. X")
      if (celda.includes('DISPONIBLE:') && celda.includes('Gs.')) {
        // Extraer número del texto
        const match = celda.match(/Gs\.\s*([\d.,]+)/);
        if (match) {
          disponibleIndicador = parseFloat(match[1].replace(/\./g, '').replace(',', '.'));
        }
      }
    }
  }

  // Obtener valores de indicadores (sección de distribución FAMILIA)
  // Los indicadores están aproximadamente en filas 18-25 de TABLERO
  // Ingresos: B con merge
  // Egresos Pagados: D con merge
  // Ahorro: B con merge (siguiente sección)
  // Fondo: D con merge

  // Buscar por contenido de celdas label
  for (let i = 0; i < datos.length; i++) {
    const fila = datos[i];
    for (let j = 0; j < fila.length; j++) {
      const celda = fila[j];
      if (typeof celda === 'string') {
        if (celda.includes('INGRESOS DEL MES')) {
          // Valor en la fila siguiente, misma columna(s)
          ingresos = obtenerValorNumerico(tableroSheet, i + 2, j + 1);
        }
        if (celda.includes('EGRESOS PAGADOS') && !celda.includes('PENDIENTES')) {
          egresosPagados = obtenerValorNumerico(tableroSheet, i + 2, j + 1);
        }
        if (celda === '💰 AHORRO' || celda.includes('💰 AHORRO')) {
          ahorro = obtenerValorNumerico(tableroSheet, i + 2, j + 1);
        }
        if (celda.includes('FONDO EMERGENCIA')) {
          fondoEmergencia = obtenerValorNumerico(tableroSheet, i + 2, j + 1);
        }
      }
    }
  }

  return {
    ingresos: ingresos,
    egresosPagados: egresosPagados,
    ahorro: ahorro,
    fondoEmergencia: fondoEmergencia,
    totalDisponible: totalDisponible,
    disponibleIndicador: disponibleIndicador,
    discrepanciaActual: disponibleIndicador - totalDisponible
  };
}

/**
 * Obtiene un valor numérico de una celda específica
 */
function obtenerValorNumerico(sheet, fila, columna) {
  try {
    const valor = sheet.getRange(fila, columna).getValue();
    if (typeof valor === 'number') return valor;
    if (typeof valor === 'string') {
      const limpio = valor.replace(/[^\d.-]/g, '');
      return parseFloat(limpio) || 0;
    }
    return 0;
  } catch (e) {
    return 0;
  }
}

/**
 * Calcula la discrepancia esperada basada en transacciones sin cuenta
 */
function calcularDiscrepanciaEsperada(resultadosFamilia, valoresTablero) {
  if (!resultadosFamilia || !valoresTablero) {
    return { explicacion: 'Datos insuficientes', coincide: false };
  }

  const t = resultadosFamilia.totales;

  // Discrepancia esperada:
  // DISPONIBLE (indicador) cuenta ingresos/egresos SIN filtrar por cuenta
  // TOTAL DISPONIBLE (cuentas) solo cuenta transacciones CON cuenta asignada
  //
  // Si hay ingresos sin cuenta: DISPONIBLE > TOTAL (inflado)
  // Si hay egresos sin cuenta: DISPONIBLE > TOTAL (menos restado)
  //
  // Discrepancia = IngresosSinCuenta - EgresosSinCuenta - AhorroSinCuenta
  // (porque estos montos se cuentan en indicadores pero NO en suma de cuentas)

  const discrepanciaEsperada = t.ingresosSinCuenta - t.egresosSinCuenta - t.ahorroSinCuenta;
  const discrepanciaReal = valoresTablero.disponibleIndicador - valoresTablero.totalDisponible;

  const diferencia = Math.abs(discrepanciaEsperada - discrepanciaReal);
  const coincide = diferencia < 100; // Tolerancia de Gs. 100 por redondeos

  return {
    discrepanciaEsperada: discrepanciaEsperada,
    discrepanciaReal: discrepanciaReal,
    diferencia: diferencia,
    coincide: coincide,
    explicacion: coincide
      ? '¡HIPÓTESIS CONFIRMADA! La discrepancia coincide con transacciones sin cuenta.'
      : 'Hay otra fuente de discrepancia además de transacciones sin cuenta.'
  };
}

/**
 * Muestra el reporte completo en Logger y opcionalmente en UI
 */
function mostrarReporte(resultadosFamilia, valoresTablero, discrepancia, mesNombre) {
  const t = resultadosFamilia.totales;

  Logger.log('\n══════════════════════════════════════════════════════════════');
  Logger.log('📊 REPORTE DE DIAGNÓSTICO - ' + mesNombre);
  Logger.log('══════════════════════════════════════════════════════════════');

  // Sección 1: Transacciones sin cuenta
  Logger.log('\n🔴 TRANSACCIONES SIN CUENTA ASIGNADA:');
  Logger.log('─────────────────────────────────────────────────────────────');

  if (resultadosFamilia.sinCuenta.length === 0) {
    Logger.log('  (Ninguna transacción sin cuenta)');
  } else {
    resultadosFamilia.sinCuenta.forEach(tx => {
      Logger.log(Utilities.formatString(
        '  Fila %d | %s | %s | %s | Gs. %s | Cuenta: %s',
        tx.fila,
        tx.fecha,
        tx.tipo.substring(0, 15).padEnd(15),
        (tx.subcategoria || tx.categoria || '-').substring(0, 20).padEnd(20),
        formatearNumero(tx.monto),
        tx.cuenta
      ));
    });
  }

  // Sección 2: Totales por tipo
  Logger.log('\n📈 TOTALES DE TRANSACCIONES SIN CUENTA:');
  Logger.log('─────────────────────────────────────────────────────────────');
  Logger.log('  Ingresos sin cuenta:  Gs. ' + formatearNumero(t.ingresosSinCuenta));
  Logger.log('  Egresos sin cuenta:   Gs. ' + formatearNumero(t.egresosSinCuenta));
  Logger.log('  Ahorro sin cuenta:    Gs. ' + formatearNumero(t.ahorroSinCuenta));
  Logger.log('  ────────────────────────────');
  Logger.log('  NETO SIN CUENTA:      Gs. ' + formatearNumero(t.ingresosSinCuenta - t.egresosSinCuenta - t.ahorroSinCuenta));

  // Sección 3: Valores del TABLERO
  Logger.log('\n📋 VALORES ACTUALES EN TABLERO:');
  Logger.log('─────────────────────────────────────────────────────────────');
  Logger.log('  INGRESOS (indicador):     Gs. ' + formatearNumero(valoresTablero.ingresos));
  Logger.log('  EGRESOS PAGADOS:          Gs. ' + formatearNumero(valoresTablero.egresosPagados));
  Logger.log('  AHORRO:                   Gs. ' + formatearNumero(valoresTablero.ahorro));
  Logger.log('  FONDO EMERGENCIA:         Gs. ' + formatearNumero(valoresTablero.fondoEmergencia));
  Logger.log('  ────────────────────────────');
  Logger.log('  DISPONIBLE (indicador):   Gs. ' + formatearNumero(valoresTablero.disponibleIndicador));
  Logger.log('  TOTAL DISPONIBLE (cuentas): Gs. ' + formatearNumero(valoresTablero.totalDisponible));
  Logger.log('  ────────────────────────────');
  Logger.log('  DISCREPANCIA ACTUAL:      Gs. ' + formatearNumero(valoresTablero.discrepanciaActual));

  // Sección 4: Análisis de discrepancia
  Logger.log('\n🔍 ANÁLISIS DE DISCREPANCIA:');
  Logger.log('─────────────────────────────────────────────────────────────');
  Logger.log('  Discrepancia esperada (sin cuenta): Gs. ' + formatearNumero(discrepancia.discrepanciaEsperada));
  Logger.log('  Discrepancia real (TABLERO):        Gs. ' + formatearNumero(discrepancia.discrepanciaReal));
  Logger.log('  Diferencia:                         Gs. ' + formatearNumero(discrepancia.diferencia));
  Logger.log('');
  Logger.log('  ' + (discrepancia.coincide ? '✅' : '⚠️') + ' ' + discrepancia.explicacion);

  // Sección 5: Diagnóstico adicional si no coincide
  if (!discrepancia.coincide) {
    Logger.log('\n⚠️ INVESTIGACIÓN ADICIONAL NECESARIA:');
    Logger.log('─────────────────────────────────────────────────────────────');
    Logger.log('  La discrepancia NO se explica solo por transacciones sin cuenta.');
    Logger.log('  Posibles causas adicionales:');
    Logger.log('  1. EGRESOS_PAGADOS lee de MOVIMIENTO, no de CARGA');
    Logger.log('  2. Gastos fijos en MOVIMIENTO con cuenta diferente a CARGA');
    Logger.log('  3. Diferencias en filtrado por mes/año');
    Logger.log('  4. Transacciones duplicadas o faltantes');

    // Calcular diferencia entre egresos
    const diferenciaEgresos = valoresTablero.egresosPagados - t.totalEgresos;
    Logger.log('\n  Diferencia EGRESOS (MOVIMIENTO vs CARGA): Gs. ' + formatearNumero(diferenciaEgresos));
  }

  // Sección 6: Recomendaciones
  Logger.log('\n💡 RECOMENDACIONES:');
  Logger.log('─────────────────────────────────────────────────────────────');

  if (resultadosFamilia.sinCuenta.length > 0) {
    Logger.log('  1. Asignar CUENTA a las ' + resultadosFamilia.sinCuenta.length + ' transacciones sin cuenta');
    Logger.log('  2. Editar las filas listadas arriba en CARGA_FAMILIA, columna G');
  }

  if (!discrepancia.coincide) {
    Logger.log('  3. Ejecutar diagnosticarEgresosPagados() para analizar diferencias');
    Logger.log('  4. Verificar que MOVIMIENTO y CARGA estén sincronizados');
  }

  Logger.log('\n══════════════════════════════════════════════════════════════');
  Logger.log('FIN DEL DIAGNÓSTICO');
  Logger.log('══════════════════════════════════════════════════════════════');

  // Mostrar resumen en UI
  const ui = SpreadsheetApp.getUi();
  let mensaje = '📊 DIAGNÓSTICO DE DISCREPANCIA\n\n';
  mensaje += '🔴 Transacciones sin cuenta: ' + resultadosFamilia.sinCuenta.length + '\n';
  mensaje += '   - Ingresos: Gs. ' + formatearNumero(t.ingresosSinCuenta) + '\n';
  mensaje += '   - Egresos: Gs. ' + formatearNumero(t.egresosSinCuenta) + '\n';
  mensaje += '   - Ahorro: Gs. ' + formatearNumero(t.ahorroSinCuenta) + '\n\n';
  mensaje += '📋 Discrepancia actual: Gs. ' + formatearNumero(valoresTablero.discrepanciaActual) + '\n';
  mensaje += '📈 Discrepancia esperada: Gs. ' + formatearNumero(discrepancia.discrepanciaEsperada) + '\n\n';
  mensaje += (discrepancia.coincide ? '✅' : '⚠️') + ' ' + discrepancia.explicacion + '\n\n';
  mensaje += 'Ver Logger (Ver > Registros) para detalles completos.';

  ui.alert('Diagnóstico Completado', mensaje, ui.ButtonSet.OK);
}

/**
 * Formatea un número con separadores de miles (puntos)
 */
function formatearNumero(num) {
  if (num === null || num === undefined) return '0';
  return Math.round(num).toLocaleString('es-PY').replace(/,/g, '.');
}

/**
 * Diagnóstico adicional: Compara EGRESOS_PAGADOS entre MOVIMIENTO y CARGA
 */
function diagnosticarEgresosPagados() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Obtener mes actual
  const movSheet = ss.getSheetByName('MOVIMIENTO');
  const mesNum = movSheet.getRange('N3').getValue();

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('DIAGNÓSTICO DE EGRESOS PAGADOS');
  Logger.log('═══════════════════════════════════════════════════════════════');

  // 1. EGRESOS desde MOVIMIENTO (como lo calcula TABLERO)
  // SUMIFS(MOVIMIENTO!F9:F113;MOVIMIENTO!B9:B113;"Egreso";MOVIMIENTO!J9:J113;"Pagado")
  const datosMovimiento = movSheet.getRange('B9:N113').getValues();

  let egresosMovimiento = 0;
  const detalleMovimiento = [];

  datosMovimiento.forEach((fila, idx) => {
    const tipo = fila[0]; // Columna B = índice 0
    const concepto = fila[1]; // Columna C = índice 1 (si aplica)
    const real = fila[4]; // Columna F = índice 4
    const estPago = fila[8]; // Columna J = índice 8
    const cuenta = fila[12]; // Columna N = índice 12

    if (tipo === 'Egreso' && estPago === 'Pagado') {
      egresosMovimiento += real || 0;
      detalleMovimiento.push({
        fila: idx + 9,
        concepto: concepto,
        monto: real,
        cuenta: cuenta
      });
    }
  });

  Logger.log('\n📋 EGRESOS PAGADOS desde MOVIMIENTO:');
  Logger.log('   Total: Gs. ' + formatearNumero(egresosMovimiento));
  Logger.log('   Detalle:');
  detalleMovimiento.forEach(d => {
    Logger.log('     Fila ' + d.fila + ': ' + (d.concepto || 'N/A').substring(0,30).padEnd(30) +
               ' Gs. ' + formatearNumero(d.monto) + ' | Cuenta: ' + (d.cuenta || '(vacía)'));
  });

  // 2. EGRESOS desde CARGA_FAMILIA
  const cargaSheet = ss.getSheetByName('CARGA_FAMILIA');
  const datosCarga = cargaSheet.getRange(4, 1, cargaSheet.getLastRow() - 3, 8).getValues();

  let egresosCarga = 0;
  const detalleCarga = [];

  datosCarga.forEach((fila, idx) => {
    const fecha = fila[0];
    const tipo = fila[1];
    const monto = fila[5];
    const cuenta = fila[6];

    if (!fecha || !(fecha instanceof Date)) return;
    if (fecha.getMonth() + 1 !== mesNum || fecha.getFullYear() !== AÑO_DIAGNOSTICO) return;

    if (tipo === 'Egreso Familiar') {
      egresosCarga += monto || 0;
      detalleCarga.push({
        fila: idx + 4,
        fecha: Utilities.formatDate(fecha, 'America/Asuncion', 'dd/MM'),
        monto: monto,
        cuenta: cuenta
      });
    }
  });

  Logger.log('\n📋 EGRESOS desde CARGA_FAMILIA:');
  Logger.log('   Total: Gs. ' + formatearNumero(egresosCarga));
  Logger.log('   Registros: ' + detalleCarga.length);

  Logger.log('\n🔍 COMPARACIÓN:');
  Logger.log('   MOVIMIENTO: Gs. ' + formatearNumero(egresosMovimiento));
  Logger.log('   CARGA:      Gs. ' + formatearNumero(egresosCarga));
  Logger.log('   DIFERENCIA: Gs. ' + formatearNumero(egresosMovimiento - egresosCarga));

  Logger.log('\n💡 INTERPRETACIÓN:');
  Logger.log('   MOVIMIENTO incluye gastos fijos (alquiler, salarios, etc.)');
  Logger.log('   CARGA solo incluye gastos variables registrados manualmente');
  Logger.log('   La diferencia representa gastos fijos pagados este mes.');
}

/**
 * Diagnóstico de cuentas: Lista el Esperado por cada cuenta
 */
function diagnosticarCuentas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tableroSheet = ss.getSheetByName('TABLERO');

  Logger.log('═══════════════════════════════════════════════════════════════');
  Logger.log('DIAGNÓSTICO DE SALDOS POR CUENTA');
  Logger.log('═══════════════════════════════════════════════════════════════');

  // Buscar sección de cuentas FAMILIA (empieza después del título "SALDOS EN CUENTAS")
  const datos = tableroSheet.getDataRange().getValues();

  let enSeccionCuentas = false;
  let totalEsperado = 0;

  for (let i = 0; i < datos.length; i++) {
    const fila = datos[i];

    // Detectar inicio de sección
    if (fila[1] && fila[1].toString().includes('SALDOS EN CUENTAS')) {
      enSeccionCuentas = true;
      Logger.log('\n💰 ' + fila[1]);
      Logger.log('─────────────────────────────────────────────────────────────');
      continue;
    }

    // Detectar fin de sección
    if (enSeccionCuentas && fila[1] && fila[1].toString().includes('TOTAL DISPONIBLE')) {
      Logger.log('─────────────────────────────────────────────────────────────');
      Logger.log('   TOTAL: Gs. ' + formatearNumero(totalEsperado));
      Logger.log('   (Valor en TABLERO: Gs. ' + formatearNumero(fila[2]) + ')');
      enSeccionCuentas = false;
      totalEsperado = 0;
      continue;
    }

    // Procesar filas de cuentas
    if (enSeccionCuentas && fila[1] && typeof fila[1] === 'string' && !fila[1].includes('INDICADORES')) {
      const cuenta = fila[1];
      const esperado = fila[2] || 0;

      if (cuenta && cuenta !== 'Cuenta') {
        Logger.log('   ' + cuenta.padEnd(25) + ' Gs. ' + formatearNumero(esperado));
        totalEsperado += esperado;
      }
    }
  }
}

/**
 * Agrega las funciones de diagnóstico al menú
 */
function agregarMenuDiagnostico() {
  const ui = SpreadsheetApp.getUi();
  ui.createMenu('🔧 Diagnóstico')
    .addItem('Diagnosticar Discrepancia', 'diagnosticarDiscrepancia')
    .addItem('Diagnosticar Egresos Pagados', 'diagnosticarEgresosPagados')
    .addItem('Diagnosticar Cuentas', 'diagnosticarCuentas')
    .addToUi();
}
