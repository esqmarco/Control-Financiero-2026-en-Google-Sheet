/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * UTILS.GS - FUNCIONES UTILITARIAS Y CÁLCULOS
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
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

    const entidadFila = fila[1]; // Columna ENTIDAD
    const dia = fila[4]; // Columna DÍA
    const montoBase = fila[5]; // Columna BASE
    const montoMes = fila[6 + mesIndex]; // Columna del mes

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
 * Calcula el balance cruzado entre NT y Familia
 */
function calcularBalanceCruzado(mesIndex) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Obtener préstamos NT → Familia
  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);

  let prestamosNTaFamMes = 0;
  let prestamosNTaFamAcum = 0;
  let devolucionesFamaNTMes = 0;
  let devolucionesFamaNTAcum = 0;

  // Buscar en CARGA_NT los préstamos a familia
  if (cargaNT) {
    const datos = cargaNT.getDataRange().getValues();
    datos.forEach((fila, i) => {
      if (i < 3) return;
      const fecha = fila[0];
      const subcat = fila[3];
      const monto = fila[5];

      if (subcat === 'Préstamo NT → Familia' && monto > 0) {
        prestamosNTaFamAcum += monto;
        const fechaObj = new Date(fecha);
        if (fechaObj.getMonth() === mesIndex && fechaObj.getFullYear() === AÑO) {
          prestamosNTaFamMes += monto;
        }
      }
    });
  }

  // Buscar en CARGA_FAMILIA las devoluciones
  if (cargaFam) {
    const datos = cargaFam.getDataRange().getValues();
    datos.forEach((fila, i) => {
      if (i < 3) return;
      const fecha = fila[0];
      const subcat = fila[3];
      const monto = fila[5];

      if (subcat === 'Devolución Familia → NT' && monto > 0) {
        devolucionesFamaNTAcum += monto;
        const fechaObj = new Date(fecha);
        if (fechaObj.getMonth() === mesIndex && fechaObj.getFullYear() === AÑO) {
          devolucionesFamaNTMes += monto;
        }
      }
    });
  }

  const saldoNetoMes = prestamosNTaFamMes - devolucionesFamaNTMes;
  const saldoNetoAcum = prestamosNTaFamAcum - devolucionesFamaNTAcum;

  let estado;
  if (saldoNetoAcum > 0) {
    estado = 'NT SUBSIDIA A FAMILIA';
  } else if (saldoNetoAcum < 0) {
    estado = 'FAMILIA SUBSIDIA A NT';
  } else {
    estado = 'FINANZAS EQUILIBRADAS';
  }

  return {
    prestamos: {
      mes: prestamosNTaFamMes,
      acumulado: prestamosNTaFamAcum
    },
    devoluciones: {
      mes: devolucionesFamaNTMes,
      acumulado: devolucionesFamaNTAcum
    },
    saldoNeto: {
      mes: saldoNetoMes,
      acumulado: saldoNetoAcum
    },
    estado
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES DE ARRASTRE (GASTOS_FIJOS)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Obtiene el monto efectivo para un gasto fijo en un mes específico
 * Implementa la lógica de arrastre: usa el último valor hacia atrás o BASE
 */
function obtenerMontoEfectivo(fila, mesIndex, base) {
  // Buscar hacia atrás desde el mes actual
  for (let m = mesIndex; m >= 0; m--) {
    const valor = fila[6 + m]; // Columnas de meses empiezan en 7 (índice 6)
    if (valor !== '' && valor !== null && valor !== undefined) {
      return valor;
    }
  }
  // Si no hay valor, usar BASE
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
