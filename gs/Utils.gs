/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UTILS.GS - FUNCIONES UTILITARIAS Y CÁLCULOS
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 6.1 - Estilo sobrio profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// FORMATEO DE NÚMEROS
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Formatea un número como guaraníes paraguayos
 * @param {number} numero - El número a formatear
 * @return {string} El número formateado con separadores de miles
 */
function formatearGuaranies(numero) {
  if (numero === null || numero === undefined || isNaN(numero)) return '-';
  return new Intl.NumberFormat('es-PY').format(numero);
}

/**
 * Formatea un número como porcentaje
 * @param {number} numero - El número a formatear (0.5 = 50%)
 * @return {string} El porcentaje formateado
 */
function formatearPorcentaje(numero) {
  if (numero === null || numero === undefined || isNaN(numero)) return '-';
  return (numero * 100).toFixed(0) + '%';
}

// ═══════════════════════════════════════════════════════════════════════════════
// CÁLCULOS DE LIQUIDEZ
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calcula la liquidez para las próximas 3 semanas
 * @param {string} entidad - 'FAMILIA' o 'NEUROTEA'
 * @param {number} mesIndex - Índice del mes (0-11)
 * @return {Object} Objeto con los cálculos de liquidez
 */
function calcularLiquidez(entidad, mesIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const hoy = new Date();
  const diaActual = hoy.getDate();

  // Obtener caja disponible
  const cajaDisponible = calcularCajaDisponible(entidad, mesIndex);

  // Obtener gastos por vencer de GASTOS_FIJOS
  const gastosFijos = ss.getSheetByName(NOMBRES_HOJAS.GASTOS_FIJOS);
  if (!gastosFijos) return null;

  const datos = gastosFijos.getDataRange().getValues();
  let atrasados = { cantidad: 0, monto: 0 };
  let semana1 = { cantidad: 0, monto: 0 };
  let semana2 = { cantidad: 0, monto: 0 };
  let semana3 = { cantidad: 0, monto: 0 };

  // Calcular rangos de días
  const finSemana1 = diaActual + 7;
  const finSemana2 = diaActual + 14;
  const finSemana3 = diaActual + 21;

  datos.forEach((fila, i) => {
    if (i < 6) return; // Saltar headers

    // ESTRUCTURA GASTOS_FIJOS v2:
    // A(0)=Concepto, B(1)=Entidad, C(2)=Categoría, D(3)=Frecuencia, E(4)=Día, F(5)=Cuenta, G(6)=Base, H-S(7-18)=Meses
    const entidadFila = fila[1]; // Columna B = ENTIDAD
    const dia = fila[4]; // Columna E = DÍA
    const montoBase = fila[6]; // Columna G = BASE (v2: era F=5, ahora G=6)
    const montoMes = fila[7 + mesIndex]; // Columnas H-S = Meses (v2: era G-R=6+mes, ahora H-S=7+mes)

    if (entidadFila !== entidad) return;
    if (!dia || dia === '') return;

    const monto = montoMes || montoBase || 0;
    if (monto <= 0) return;

    if (dia < diaActual) {
      // Atrasados
      atrasados.cantidad++;
      atrasados.monto += monto;
    } else if (dia <= finSemana1) {
      semana1.cantidad++;
      semana1.monto += monto;
    } else if (dia <= finSemana2) {
      semana2.cantidad++;
      semana2.monto += monto;
    } else if (dia <= finSemana3) {
      semana3.cantidad++;
      semana3.monto += monto;
    }
  });

  // Calcular saldos proyectados
  const saldoAtrasados = cajaDisponible - atrasados.monto;
  const saldoSem1 = saldoAtrasados - semana1.monto;
  const saldoSem2 = saldoSem1 - semana2.monto;
  const saldoSem3 = saldoSem2 - semana3.monto;

  return {
    cajaDisponible,
    atrasados: { ...atrasados, saldo: saldoAtrasados },
    semana1: { ...semana1, saldo: saldoSem1 },
    semana2: { ...semana2, saldo: saldoSem2 },
    semana3: { ...semana3, saldo: saldoSem3 },
    saldoFinal: saldoSem3
  };
}

/**
 * Calcula la caja disponible (ingresos - egresos pagados)
 */
function calcularCajaDisponible(entidad, mesIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const nombreHojaCarga = entidad === 'FAMILIA'
    ? NOMBRES_HOJAS.CARGA_FAMILIA
    : NOMBRES_HOJAS.CARGA_NT;

  const hojaCarga = ss.getSheetByName(nombreHojaCarga);
  if (!hojaCarga) return 0;

  const datos = hojaCarga.getDataRange().getValues();
  const mesActual = MESES[mesIndex];
  const añoActual = AÑO;

  let ingresos = 0;
  let egresosPagados = 0;

  const tiposIngreso = entidad === 'FAMILIA'
    ? TIPOS_INGRESO_FAMILIA
    : TIPOS_INGRESO_NT;

  datos.forEach((fila, i) => {
    if (i < 3) return; // Saltar headers

    const fecha = fila[0]; // Columna FECHA
    const tipo = fila[1]; // Columna TIPO
    const monto = fila[5]; // Columna MONTO
    const estado = fila[7]; // Columna ESTADO

    if (!fecha || !monto) return;

    // Verificar que sea del mes actual
    const fechaObj = new Date(fecha);
    if (fechaObj.getMonth() !== mesIndex) return;
    if (fechaObj.getFullYear() !== añoActual) return;

    if (tiposIngreso.includes(tipo)) {
      ingresos += monto;
    } else if (estado === 'Pagado') {
      egresosPagados += monto;
    }
  });

  return ingresos - egresosPagados;
}

// ═══════════════════════════════════════════════════════════════════════════════
// CÁLCULOS DE GANANCIA NEUROTEA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calcula la ganancia de NeuroTEA para un mes
 */
function calcularGananciaNT(mesIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);
  if (!movimiento) return null;

  // Buscar totales de ingresos y egresos NT
  // (En implementación completa, esto buscaría en las celdas correspondientes)

  const ingresos = 30000000; // Placeholder
  const egresos = 27300000;  // Placeholder

  const ganancia = ingresos - egresos;
  const porcentajeGanancia = ingresos > 0 ? (ganancia / ingresos) * 100 : 0;
  const metaCumplida = porcentajeGanancia >= METAS_NT.GANANCIA_MINIMA_PCT;

  // Distribución de la ganancia según metas
  const metaGanancia = ingresos * (METAS_NT.GANANCIA_MINIMA_PCT / 100);
  const utilidadDueño = metaGanancia * (METAS_NT.DIST_UTILIDAD_DUEÑO / 100);
  const fondoEmergencia = metaGanancia * (METAS_NT.DIST_FONDO_EMERGENCIA / 100);
  const fondoInversion = metaGanancia * (METAS_NT.DIST_FONDO_INVERSION / 100);

  return {
    ingresos,
    egresos,
    ganancia,
    porcentajeGanancia,
    metaCumplida,
    distribucion: {
      utilidadDueño,
      fondoEmergencia,
      fondoInversion
    }
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// CÁLCULOS DE BALANCE CRUZADO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calcula el balance cruzado entre NT y Familia (v7.12 - Bidireccional completo)
 * FLUJO 1: NT → FAM (NT presta a Familia)
 * FLUJO 2: FAM → NT (Familia presta a NT)
 */
function calcularBalanceCruzado(mesIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);

  // FLUJO 1: NT → FAM
  let prestamosNTaFamMes = 0, prestamosNTaFamAcum = 0;
  let devolucionesFamaNTMes = 0, devolucionesFamaNTAcum = 0;

  // FLUJO 2: FAM → NT (NUEVO)
  let prestamosFamaNTMes = 0, prestamosFamaNTAcum = 0;
  let devolucionesNTaFamMes = 0, devolucionesNTaFamAcum = 0;

  // Buscar en CARGA_NT
  if (cargaNT) {
    const datos = cargaNT.getDataRange().getValues();
    datos.forEach((fila, i) => {
      if (i < 3) return;
      const fecha = fila[0];
      const subcat = fila[3];
      const monto = Number(fila[5]) || 0;
      if (monto <= 0) return;

      const fechaObj = new Date(fecha);
      const esDelMes = fechaObj.getMonth() === mesIndex && fechaObj.getFullYear() === AÑO;

      // FLUJO 1: NT presta a FAM
      if (subcat === 'Préstamo NT → Familia') {
        prestamosNTaFamAcum += monto;
        if (esDelMes) prestamosNTaFamMes += monto;
      }
      // FLUJO 2: NT devuelve a FAM
      if (subcat === 'Devolución NT → Familia') {
        devolucionesNTaFamAcum += monto;
        if (esDelMes) devolucionesNTaFamMes += monto;
      }
    });
  }

  // Buscar en CARGA_FAMILIA
  if (cargaFam) {
    const datos = cargaFam.getDataRange().getValues();
    datos.forEach((fila, i) => {
      if (i < 3) return;
      const fecha = fila[0];
      const subcat = fila[3];
      const monto = Number(fila[5]) || 0;
      if (monto <= 0) return;

      const fechaObj = new Date(fecha);
      const esDelMes = fechaObj.getMonth() === mesIndex && fechaObj.getFullYear() === AÑO;

      // FLUJO 1: FAM devuelve a NT
      if (subcat === 'Devolución Familia → NT') {
        devolucionesFamaNTAcum += monto;
        if (esDelMes) devolucionesFamaNTMes += monto;
      }
      // FLUJO 2: FAM presta a NT
      if (subcat === 'Préstamo Familia → NT') {
        prestamosFamaNTAcum += monto;
        if (esDelMes) prestamosFamaNTMes += monto;
      }
    });
  }

  // Calcular deudas netas
  const deudaFamANT_Mes = prestamosNTaFamMes - devolucionesFamaNTMes;
  const deudaFamANT_Acum = prestamosNTaFamAcum - devolucionesFamaNTAcum;
  const deudaNTaFam_Mes = prestamosFamaNTMes - devolucionesNTaFamMes;
  const deudaNTaFam_Acum = prestamosFamaNTAcum - devolucionesNTaFamAcum;

  // Balance neto: positivo = FAM debe a NT, negativo = NT debe a FAM
  const balanceNetoMes = deudaFamANT_Mes - deudaNTaFam_Mes;
  const balanceNetoAcum = deudaFamANT_Acum - deudaNTaFam_Acum;

  let estado;
  if (balanceNetoAcum > 0) {
    estado = 'FAMILIA DEBE A NT';
  } else if (balanceNetoAcum < 0) {
    estado = 'NT DEBE A FAMILIA';
  } else {
    estado = 'EQUILIBRADO';
  }

  return {
    // FLUJO 1: NT → FAM
    prestamoNTMes: prestamosNTaFamMes,
    prestamoNTAcum: prestamosNTaFamAcum,
    devFamMes: devolucionesFamaNTMes,
    devFamAcum: devolucionesFamaNTAcum,
    deudaFamANT_Mes,
    deudaFamANT_Acum,
    // FLUJO 2: FAM → NT
    prestamoFamMes: prestamosFamaNTMes,
    prestamoFamAcum: prestamosFamaNTAcum,
    devNTMes: devolucionesNTaFamMes,
    devNTAcum: devolucionesNTaFamAcum,
    deudaNTaFam_Mes,
    deudaNTaFam_Acum,
    // Balance neto
    balanceNetoMes,
    balanceNetoAcum,
    estado
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE ARRASTRE (GASTOS_FIJOS)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Obtiene el monto efectivo para un gasto fijo en un mes específico
 * Implementa la lógica de arrastre: usa el último valor hacia atrás o BASE
 * ESTRUCTURA GASTOS_FIJOS v2: A(0)=Concepto, B(1)=Entidad, C(2)=Categoría, D(3)=Frecuencia, E(4)=Día, F(5)=Cuenta, G(6)=Base, H-S(7-18)=Meses
 */
function obtenerMontoEfectivo(fila, mesIndex, base) {
  // Buscar hacia atrás desde el mes actual
  for (let m = mesIndex; m >= 0; m--) {
    const valor = fila[7 + m]; // Columnas de meses empiezan en H (índice 7) - v2 con CUENTA
    if (valor !== '' && valor !== null && valor !== undefined) {
      return valor;
    }
  }
  // Si no hay valor, usar BASE (columna G, índice 6)
  return base || 0;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE VALIDACIÓN
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Verifica si un tipo de transacción es ingreso
 */
function esIngreso(tipo, entidad) {
  if (entidad === 'FAMILIA') {
    return TIPOS_INGRESO_FAMILIA.includes(tipo);
  } else {
    return TIPOS_INGRESO_NT.includes(tipo);
  }
}

/**
 * Obtiene el índice del mes actual (0-11)
 */
function getMesActual() {
  return new Date().getMonth();
}

/**
 * Convierte nombre de mes a índice
 */
function mesAIndice(nombreMes) {
  return MESES.findIndex(m => m === nombreMes);
}

/**
 * Convierte índice a nombre de mes
 */
function indiceAMes(indice) {
  return MESES[indice] || 'Enero';
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE COLOR / SEMÁFORO
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Determina el color del semáforo basado en un porcentaje
 * @param {number} porcentaje - El porcentaje a evaluar
 * @param {boolean} esIngreso - Si es ingreso (mayor es mejor) o egreso (menor es mejor)
 * @return {string} Código de color hex
 */
function colorSemaforo(porcentaje, esIngreso = false) {
  if (esIngreso) {
    // Para ingresos: verde si >= 100%, amarillo si >= 90%, rojo si < 90%
    if (porcentaje >= 100) return COLORES.VERDE;
    if (porcentaje >= 90) return COLORES.AMARILLO;
    return COLORES.ROJO;
  } else {
    // Para egresos: verde si <= 100%, amarillo si <= 110%, rojo si > 110%
    if (porcentaje <= 100) return COLORES.VERDE;
    if (porcentaje <= 110) return COLORES.AMARILLO;
    return COLORES.ROJO;
  }
}

/**
 * Determina el color para liquidez
 */
function colorLiquidez(saldo) {
  if (saldo < 0) return COLORES.ROJO;
  if (saldo < 500000) return COLORES.AMARILLO;
  return COLORES.VERDE;
}

/**
 * Determina el badge de estado
 */
function badgeEstado(valor, umbralPositivo, umbralNegativo) {
  if (valor >= umbralPositivo) return { texto: 'OK', color: 'green' };
  if (valor <= umbralNegativo) return { texto: 'DÉFICIT', color: 'red' };
  return { texto: 'AJUSTADO', color: 'yellow' };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE FECHA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Obtiene el primer día del mes
 */
function primerDiaMes(mes, año) {
  return new Date(año, mes, 1);
}

/**
 * Obtiene el último día del mes
 */
function ultimoDiaMes(mes, año) {
  return new Date(año, mes + 1, 0);
}

/**
 * Calcula los días restantes del mes
 */
function diasRestantesMes() {
  const hoy = new Date();
  const ultimoDia = ultimoDiaMes(hoy.getMonth(), hoy.getFullYear());
  return ultimoDia.getDate() - hoy.getDate();
}

// ═══════════════════════════════════════════════════════════════════════════════
// LOG Y DEBUG
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Registra un mensaje en el log (para debug)
 */
function log(mensaje, tipo = 'info') {
  const timestamp = new Date().toLocaleString('es-PY');
  console.log(`[${timestamp}] [${tipo.toUpperCase()}] ${mensaje}`);
}

/**
 * Muestra un toast de notificación
 */
function mostrarToast(mensaje, titulo = 'Info', duracion = 5) {
  SpreadsheetApp.getActiveSpreadsheet().toast(mensaje, titulo, duracion);
}

// ═══════════════════════════════════════════════════════════════════════════════
// REPARACIÓN DE DATOS EN CARGA (v7.23)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Repara fechas y montos en CARGA_FAMILIA y CARGA_NT que estén almacenados como texto.
 * Esto puede ocurrir al pegar datos desde otro Google Sheet o fuente externa.
 *
 * Comportamiento:
 * - Fechas texto bien formadas ("02/01/2026") → auto-convierte a Date
 * - Montos texto ("68.416.658") → auto-convierte a Number
 * - Fechas MALFORMADAS ("24/012026", año incorrecto) → NO toca, ALERTA al usuario
 */
function repararDatosCarga() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const ui = SpreadsheetApp.getUi();

  const resultado = ui.alert(
    '🔧 Reparar Datos de CARGA',
    'Esta función revisa CARGA_FAMILIA y CARGA_NT:\n\n' +
    '✅ Auto-repara:\n' +
    '• Fechas pegadas como texto (formato correcto dd/mm/' + AÑO + ')\n' +
    '• Montos pegados como texto\n' +
    '• Textos con espacios extra (trim)\n' +
    '• Validaciones incorrectas en filas pegadas\n\n' +
    '⚠️ Solo alerta (NO modifica):\n' +
    '• Fechas con barras faltantes ("24/012026")\n' +
    '• Fechas con año incorrecto\n' +
    '• Fechas no reconocibles\n\n' +
    '¿Continuar?',
    ui.ButtonSet.YES_NO
  );

  if (resultado !== ui.Button.YES) return;

  let totalReparadas = 0;
  let validacionesReparadas = 0;
  const alertas = []; // Fechas malformadas que requieren revisión manual

  // Determinar tipos de ingreso por hoja
  const tiposIngresoMap = {};
  tiposIngresoMap[NOMBRES_HOJAS.CARGA_FAMILIA] = TODOS_TIPOS_INGRESO_FAMILIA;
  tiposIngresoMap[NOMBRES_HOJAS.CARGA_NT] = TODOS_TIPOS_INGRESO_NT;

  // Reparar ambas hojas
  [NOMBRES_HOJAS.CARGA_FAMILIA, NOMBRES_HOJAS.CARGA_NT].forEach(nombreHoja => {
    const sheet = ss.getSheetByName(nombreHoja);
    if (!sheet) return;

    const ultimaFila = sheet.getLastRow();
    if (ultimaFila < 4) return; // No hay datos

    const rango = sheet.getRange(4, 1, ultimaFila - 3, 9); // A4:I{ultima}
    const datos = rango.getValues();
    let cambios = 0;
    let validaciones = 0;
    const tiposIngreso = tiposIngresoMap[nombreHoja] || [];

    datos.forEach((fila, i) => {
      const filaSheet = i + 4;
      let huboCambio = false;

      // ── COLUMNA A: FECHA ──
      const fechaVal = fila[0];
      if (fechaVal && !(fechaVal instanceof Date)) {
        // Es texto - analizar qué tipo de problema tiene
        const fechaStr = String(fechaVal).trim();
        const analisis = analizarFechaTexto(fechaStr);

        if (analisis.tipo === 'ok') {
          // Fecha bien formada, solo es texto → auto-reparar
          sheet.getRange(filaSheet, 1).setValue(analisis.fecha);
          sheet.getRange(filaSheet, 1).setNumberFormat('dd/mm/yyyy');
          huboCambio = true;
        } else {
          // Fecha malformada → NO tocar, agregar a alertas
          alertas.push(`${nombreHoja} fila ${filaSheet}: "${fechaStr}" → ${analisis.problema}`);
        }
      } else if (fechaVal instanceof Date) {
        // Es fecha correcta, solo asegurar formato visual
        sheet.getRange(filaSheet, 1).setNumberFormat('dd/mm/yyyy');
      }

      // ── COLUMNAS B, C, D, G: TRIM ESPACIOS ──
      // Columna B=TIPO, C=CATEGORÍA, D=SUBCATEGORÍA, G=CUENTA
      const colsTexto = [1, 2, 3, 6]; // indices 0-based en el array (B=1, C=2, D=3, G=6)
      colsTexto.forEach(idx => {
        const val = fila[idx];
        if (val && typeof val === 'string') {
          const trimmed = val.trim();
          if (trimmed !== val) {
            sheet.getRange(filaSheet, idx + 1).setValue(trimmed);
            huboCambio = true;
          }
        }
      });

      // ── COLUMNA F: MONTO ──
      const montoVal = fila[5];
      if (montoVal && typeof montoVal === 'string') {
        const montoNumero = limpiarMonto(montoVal);
        if (montoNumero > 0) {
          sheet.getRange(filaSheet, 6).setValue(montoNumero);
          huboCambio = true;
        }
      }

      // ── VALIDACIONES: Limpiar warnings en filas de ingreso/ahorro ──
      const tipo = String(fila[1] || '').trim();
      const categoria = String(fila[2] || '').trim();
      const subcategoria = String(fila[3] || '').trim();

      // Si TIPO es ingreso → CAT y SUBCAT deben ser "-" sin validación
      if (tiposIngreso.includes(tipo)) {
        if (categoria === '-' || categoria === '') {
          sheet.getRange(filaSheet, 3).clearDataValidations();
          if (categoria !== '-') {
            sheet.getRange(filaSheet, 3).setValue('-');
            huboCambio = true;
          }
        }
        if (subcategoria === '-' || subcategoria === '') {
          sheet.getRange(filaSheet, 4).clearDataValidations();
          if (subcategoria !== '-') {
            sheet.getRange(filaSheet, 4).setValue('-');
            huboCambio = true;
          }
        }
        validaciones++;
      }
      // Si TIPO es Ahorro → SUBCAT debe ser "-" sin validación
      else if (tipo === TIPO_AHORRO) {
        if (subcategoria === '-' || subcategoria === '') {
          sheet.getRange(filaSheet, 4).clearDataValidations();
          if (subcategoria !== '-') {
            sheet.getRange(filaSheet, 4).setValue('-');
            huboCambio = true;
          }
        }
        validaciones++;
      }
      // Si es Egreso y CAT no es VARIABLES → SUBCAT debe ser "-" sin validación
      else if (tipo && categoria && categoria !== 'VARIABLES' && categoria !== 'EVENTOS' && categoria !== '-') {
        if (subcategoria === '-' || subcategoria === '') {
          sheet.getRange(filaSheet, 4).clearDataValidations();
          if (subcategoria !== '-') {
            sheet.getRange(filaSheet, 4).setValue('-');
            huboCambio = true;
          }
        }
        validaciones++;
      }

      if (huboCambio) cambios++;
    });

    totalReparadas += cambios;
    validacionesReparadas += validaciones;
    if (cambios > 0) {
      log(`Reparadas ${cambios} filas en ${nombreHoja}`, 'fix');
    }
    if (validaciones > 0) {
      log(`Validaciones limpiadas en ${validaciones} filas de ${nombreHoja}`, 'fix');
    }
  });

  // Mostrar resultado
  let mensaje = '';

  if (totalReparadas > 0) {
    mensaje += `✅ Se repararon ${totalReparadas} filas (texto → fecha/número/trim).\n`;
  } else {
    mensaje += '✅ No se encontraron datos texto que reparar.\n';
  }

  if (validacionesReparadas > 0) {
    mensaje += `✅ Se limpiaron validaciones en ${validacionesReparadas} filas.\n`;
  }

  mensaje += 'Las fórmulas deberían actualizarse automáticamente.\n';

  if (alertas.length > 0) {
    mensaje += `\n⚠️ ${alertas.length} fecha(s) con problemas (NO modificadas):\n\n`;
    // Mostrar máximo 15 alertas para no desbordar el cuadro
    const mostrar = alertas.slice(0, 15);
    mensaje += mostrar.join('\n');
    if (alertas.length > 15) {
      mensaje += `\n... y ${alertas.length - 15} más. Ver log para lista completa.`;
      alertas.forEach(a => log(a, 'warning'));
    }
    mensaje += '\n\nCorregí estas fechas manualmente en la hoja.';
  }

  ui.alert(
    alertas.length > 0 ? '⚠️ Reparación con alertas' : '✅ Reparación completada',
    mensaje,
    ui.ButtonSet.OK
  );
}

/**
 * Analiza una fecha en texto y determina si es reparable automáticamente o necesita revisión.
 *
 * @param {string} texto - El texto a analizar
 * @returns {Object} { tipo: 'ok'|'error', fecha?: Date, problema?: string }
 *   - tipo 'ok': fecha bien formada, se puede auto-reparar
 *   - tipo 'error': fecha malformada, requiere revisión manual
 */
function analizarFechaTexto(texto) {
  if (!texto) return { tipo: 'error', problema: 'Vacío' };

  // Solo auto-reparar formato estándar: dd/mm/yyyy con año correcto
  const match = texto.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    const dia = parseInt(match[1]);
    const mes = parseInt(match[2]);
    const anio = parseInt(match[3]);

    if (dia < 1 || dia > 31) return { tipo: 'error', problema: `Día ${dia} fuera de rango` };
    if (mes < 1 || mes > 12) return { tipo: 'error', problema: `Mes ${mes} fuera de rango` };
    if (anio !== AÑO) return { tipo: 'error', problema: `Año ${anio} (esperado ${AÑO})` };

    return { tipo: 'ok', fecha: new Date(anio, mes - 1, dia) };
  }

  // Detectar patrones malformados conocidos para dar mejor mensaje
  const matchBarraFaltante = texto.match(/^(\d{1,2})\/(\d{2})(\d{4})$/);
  if (matchBarraFaltante) {
    return { tipo: 'error', problema: `Falta "/" → ¿debería ser ${matchBarraFaltante[1]}/${matchBarraFaltante[2]}/${matchBarraFaltante[3]}?` };
  }

  const matchSinBarras = texto.match(/^(\d{2})(\d{2})(\d{4})$/);
  if (matchSinBarras) {
    return { tipo: 'error', problema: `Sin barras → ¿debería ser ${matchSinBarras[1]}/${matchSinBarras[2]}/${matchSinBarras[3]}?` };
  }

  return { tipo: 'error', problema: 'Formato no reconocido' };
}
