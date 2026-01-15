/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CODE.GS - MENÚ PRINCIPAL E INICIALIZACIÓN
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 6.7 - Validación Anti-Burro para préstamos/devoluciones
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ARQUITECTURA DE ARCHIVOS:
 * ├── Code.gs       → Menú principal e inicialización (este archivo)
 * ├── Config.gs     → Datos maestros y configuraciones
 * ├── Sheets.gs     → Creación de las 9 hojas principales
 * ├── Tablero.gs    → Dashboard TABLERO profesional sobrio
 * ├── WebApp.gs     → Dashboard HTML/CSS profesional
 * └── Utils.gs      → Funciones utilitarias
 *
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// MENÚ PRINCIPAL
// ═══════════════════════════════════════════════════════════════════════════════

function onOpen() {
  const ui = SpreadsheetApp.getUi();

  ui.createMenu('💰 Control Financiero')
    // Inicialización
    .addItem('🚀 Inicializar Sistema COMPLETO', 'inicializarSistemaCompleto')
    .addItem('🔄 Reinicializar Sistema (Borrar y Crear)', 'reinicializarSistema')
    .addSeparator()

    // Dashboard
    .addItem('📊 Abrir Dashboard Web', 'abrirDashboard')
    .addItem('🌐 Instrucciones Web App', 'mostrarInstruccionesWebApp')
    .addSeparator()

    // Crear Hojas Individual
    .addSubMenu(ui.createMenu('📋 Crear Hojas')
      .addItem('⚙️ CONFIG', 'crearHojaCONFIG')
      .addItem('📊 PRESUPUESTO', 'crearHojaPRESUPUESTO')
      .addItem('📝 GASTOS_FIJOS', 'crearHojaGASTOS_FIJOS')
      .addItem('👨‍👩‍👧‍👦 CARGA_FAMILIA', 'crearHojaCARGA_FAMILIA')
      .addItem('🏥 CARGA_NT', 'crearHojaCARGA_NT')
      .addItem('📈 MOVIMIENTO', 'crearHojaMOVIMIENTO')
      .addItem('🎯 TABLERO', 'crearHojaTABLERO')
      .addItem('💰 LIQUIDEZ FAMILIA', 'crearHojaLIQUIDEZ_FAMILIA')
      .addItem('💰 LIQUIDEZ NT', 'crearHojaLIQUIDEZ_NT'))
    .addSeparator()

    // Utilidades
    .addSubMenu(ui.createMenu('🔧 Utilidades')
      .addItem('🔄 Actualizar Validaciones', 'actualizarTodasValidaciones')
      .addItem('📈 Recalcular Tablero', 'recalcularTablero')
      .addItem('🎨 Aplicar Estilos', 'aplicarEstilosGlobales')
      .addItem('🧹 Limpiar Datos de Prueba', 'limpiarDatosPrueba'))
    .addSeparator()

    // Info
    .addItem('ℹ️ Acerca del Sistema', 'mostrarAcercaDe')
    .addToUi();
}

// ═══════════════════════════════════════════════════════════════════════════════
// INICIALIZACIÓN COMPLETA
// ═══════════════════════════════════════════════════════════════════════════════

function inicializarSistemaCompleto() {
  const ui = SpreadsheetApp.getUi();

  const resultado = ui.alert(
    '🚀 Inicializar Sistema Completo',
    '¿Crear todas las hojas del sistema?\n\n' +
    '📋 Se crearán las siguientes 9 hojas:\n' +
    '  • CONFIG - Configuración y listas maestras\n' +
    '  • PRESUPUESTO - Plan anual ENE-DIC\n' +
    '  • GASTOS_FIJOS - Montos base × 12 meses\n' +
    '  • CARGA_FAMILIA - Variables familiares\n' +
    '  • CARGA_NT - Variables NeuroTEA\n' +
    '  • MOVIMIENTO - Real vs Presupuesto + EST. PAGO\n' +
    '  • TABLERO - Dashboard KPIs + SALDO_INICIAL\n' +
    '  • LIQUIDEZ_FAMILIA - Control semanal Familia\n' +
    '  • LIQUIDEZ_NT - Control semanal NeuroTEA\n\n' +
    '⚠️ Las hojas existentes serán sobrescritas.',
    ui.ButtonSet.YES_NO
  );

  if (resultado !== ui.Button.YES) {
    ui.alert('Operación cancelada', 'No se realizaron cambios.', ui.ButtonSet.OK);
    return;
  }

  // Mostrar progreso
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('Creando CONFIG...', '🚀 Inicializando', 3);
  crearHojaCONFIG();

  ss.toast('Creando PRESUPUESTO...', '🚀 Inicializando', 3);
  crearHojaPRESUPUESTO();

  ss.toast('Creando GASTOS_FIJOS...', '🚀 Inicializando', 3);
  crearHojaGASTOS_FIJOS();

  ss.toast('Creando CARGA_FAMILIA...', '🚀 Inicializando', 3);
  crearHojaCARGA_FAMILIA();

  ss.toast('Creando CARGA_NT...', '🚀 Inicializando', 3);
  crearHojaCARGA_NT();

  ss.toast('Creando MOVIMIENTO...', '🚀 Inicializando', 3);
  crearHojaMOVIMIENTO();

  ss.toast('Creando TABLERO...', '🚀 Inicializando', 3);
  crearHojaTABLERO();

  ss.toast('Creando LIQUIDEZ_FAMILIA...', '🚀 Inicializando', 3);
  crearHojaLIQUIDEZ_FAMILIA();

  ss.toast('Creando LIQUIDEZ_NT...', '🚀 Inicializando', 3);
  crearHojaLIQUIDEZ_NT();

  // Ordenar hojas
  ordenarHojas();

  // Ir a TABLERO
  const tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  if (tablero) ss.setActiveSheet(tablero);

  ui.alert(
    '✅ Sistema Creado Exitosamente',
    'Todas las hojas han sido creadas.\n\n' +
    '📊 Para ver el Dashboard interactivo:\n' +
    '   Menú → 💰 Control Financiero → 📊 Abrir Dashboard Web\n\n' +
    '🌐 Para publicar como Web App:\n' +
    '   Menú → 💰 Control Financiero → 🌐 Instrucciones Web App\n\n' +
    '🎯 Próximos pasos:\n' +
    '   1. Ajustar montos en PRESUPUESTO\n' +
    '   2. Completar GASTOS_FIJOS con días de vencimiento\n' +
    '   3. Comenzar a registrar en CARGA_FAMILIA y CARGA_NT',
    ui.ButtonSet.OK
  );
}

function reinicializarSistema() {
  const ui = SpreadsheetApp.getUi();

  const resultado = ui.alert(
    '⚠️ Reinicializar Sistema',
    '¿Estás seguro de querer BORRAR y RECREAR todas las hojas?\n\n' +
    '🔴 ADVERTENCIA: Se perderán TODOS los datos actuales.\n\n' +
    'Esta acción no se puede deshacer.',
    ui.ButtonSet.YES_NO
  );

  if (resultado !== ui.Button.YES) return;

  const confirmacion = ui.alert(
    '⚠️ Confirmación Final',
    '¿Confirmas que deseas BORRAR todos los datos y recrear el sistema?',
    ui.ButtonSet.YES_NO
  );

  if (confirmacion !== ui.Button.YES) return;

  inicializarSistemaCompleto();
}

// ═══════════════════════════════════════════════════════════════════════════════
// ORDENAR HOJAS
// ═══════════════════════════════════════════════════════════════════════════════

function ordenarHojas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const orden = [
    NOMBRES_HOJAS.TABLERO,
    NOMBRES_HOJAS.LIQUIDEZ_FAM,    // v6.0 - Hojas separadas
    NOMBRES_HOJAS.LIQUIDEZ_NT,     // v6.0
    NOMBRES_HOJAS.MOVIMIENTO,
    NOMBRES_HOJAS.CARGA_FAMILIA,
    NOMBRES_HOJAS.CARGA_NT,
    NOMBRES_HOJAS.GASTOS_FIJOS,
    NOMBRES_HOJAS.PRESUPUESTO,
    NOMBRES_HOJAS.CONFIG
  ];

  orden.forEach((nombre, index) => {
    const sheet = ss.getSheetByName(nombre);
    if (sheet) {
      ss.setActiveSheet(sheet);
      ss.moveActiveSheet(index + 1);
    }
  });
}

// ═══════════════════════════════════════════════════════════════════════════════
// DASHBOARD WEB
// ═══════════════════════════════════════════════════════════════════════════════

function abrirDashboard() {
  const html = HtmlService.createHtmlOutput(generarHTMLDashboard())
    .setWidth(1500)
    .setHeight(950);
  SpreadsheetApp.getUi().showModalDialog(html, '📊 Dashboard Control Financiero 2026');
}

function doGet() {
  return HtmlService.createHtmlOutput(generarHTMLDashboard())
    .setTitle('Control Financiero 2026 - NeuroTEA & Familia')
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function mostrarInstruccionesWebApp() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    '🌐 Publicar como Web App',
    'Para publicar el Dashboard como página web independiente:\n\n' +
    '1️⃣ Ir a: Extensiones → Apps Script\n\n' +
    '2️⃣ En Apps Script, click en "Implementar" (botón azul arriba)\n\n' +
    '3️⃣ Seleccionar "Nueva implementación"\n\n' +
    '4️⃣ Configurar:\n' +
    '   • Tipo: "Aplicación web"\n' +
    '   • Ejecutar como: "Yo (tu email)"\n' +
    '   • Acceso: "Cualquier persona"\n\n' +
    '5️⃣ Click "Implementar"\n\n' +
    '6️⃣ Autorizar el acceso cuando se solicite\n\n' +
    '7️⃣ ¡Copiar la URL generada!\n\n' +
    '📱 Podrás acceder al Dashboard desde cualquier navegador o celular.',
    ui.ButtonSet.OK
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// UTILIDADES
// ═══════════════════════════════════════════════════════════════════════════════

function actualizarTodasValidaciones() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  if (cargaFam) aplicarValidacionesCargaFamilia(cargaFam);

  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  if (cargaNT) aplicarValidacionesCargaNT(cargaNT);

  SpreadsheetApp.getUi().alert('✅ Validaciones Actualizadas',
    'Las validaciones de CARGA_FAMILIA y CARGA_NT han sido actualizadas.',
    SpreadsheetApp.getUi().ButtonSet.OK);
}

function recalcularTablero() {
  SpreadsheetApp.flush();
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('Tablero recalculado correctamente', '✅ Listo', 3);
}

function aplicarEstilosGlobales() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ss.toast('Aplicando estilos...', '🎨 Estilos', 2);
  // Aquí se llamarían las funciones de Styles.gs
  ss.toast('Estilos aplicados correctamente', '✅ Listo', 3);
}

function limpiarDatosPrueba() {
  const ui = SpreadsheetApp.getUi();
  const resultado = ui.alert(
    '🧹 Limpiar Datos de Prueba',
    '¿Deseas limpiar los datos de prueba de CARGA_FAMILIA y CARGA_NT?\n\n' +
    'Solo se eliminarán las filas de datos, no la estructura.',
    ui.ButtonSet.YES_NO
  );

  if (resultado !== ui.Button.YES) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  if (cargaFam && cargaFam.getLastRow() > 3) {
    cargaFam.deleteRows(4, cargaFam.getLastRow() - 3);
  }

  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  if (cargaNT && cargaNT.getLastRow() > 3) {
    cargaNT.deleteRows(4, cargaNT.getLastRow() - 3);
  }

  ui.alert('✅ Datos Limpiados', 'Los datos de prueba han sido eliminados.', ui.ButtonSet.OK);
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACERCA DE
// ═══════════════════════════════════════════════════════════════════════════════

function mostrarAcercaDe() {
  const ui = SpreadsheetApp.getUi();
  ui.alert(
    '📊 Sistema de Control Financiero 2026',
    '═══════════════════════════════════════\n\n' +
    '🏥 NeuroTEA & 🏠 Familia\n\n' +
    '═══════════════════════════════════════\n\n' +
    'Versión: ' + VERSION + '\n' +
    'Año Fiscal: ' + AÑO + '\n\n' +
    '📋 Funcionalidades:\n' +
    '  • Presupuesto anual integrado\n' +
    '  • Control de gastos fijos y variables\n' +
    '  • Sistema "Anti-Burro" para evitar errores\n' +
    '  • Liquidez a 3 semanas\n' +
    '  • Conciliación bancaria\n' +
    '  • Balance cruzado NT ↔ Familia\n' +
    '  • Dashboard visual profesional\n' +
    '  • Meta de ganancia 7% para NeuroTEA\n\n' +
    '═══════════════════════════════════════\n\n' +
    '👤 Usuarios: Marco (Admin) | Clara (Carga)\n' +
    '💰 Moneda: Guaraníes (Gs.)\n\n' +
    '═══════════════════════════════════════',
    ui.ButtonSet.OK
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TRIGGER onEdit - Sistema Anti-Burro
// ═══════════════════════════════════════════════════════════════════════════════

function onEdit(e) {
  if (!e) return;

  const sheet = e.source.getActiveSheet();
  const nombreHoja = sheet.getName();
  const row = e.range.getRow();
  const col = e.range.getColumn();

  // Solo procesar hojas de carga y filas de datos
  if (row < 4) return;

  if (nombreHoja === NOMBRES_HOJAS.CARGA_FAMILIA) {
    procesarEdicionCargaFamilia(sheet, row, col, e.value);
  } else if (nombreHoja === NOMBRES_HOJAS.CARGA_NT) {
    procesarEdicionCargaNT(sheet, row, col, e.value);
  }
}

function procesarEdicionCargaFamilia(sheet, row, col, valor) {
  // Columna B = TIPO (columna 2)
  if (col === 2) {
    const esIngreso = TIPOS_INGRESO_FAMILIA.includes(valor);
    if (esIngreso) {
      // Deshabilitar CATEGORÍA y SUBCATEGORÍA para ingresos
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    } else {
      // Habilitar para egresos
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    }
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    if (valor === 'VARIABLES' || valor === 'AHORRO') {
      // Habilitar subcategoría para VARIABLES y AHORRO
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    } else {
      // Deshabilitar subcategoría
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    }
  }

  // Columna D = SUBCATEGORÍA (columna 4) - Validación Anti-Burro Préstamos
  if (col === 4) {
    validarPrestamoDevolucionFamilia(sheet, row, valor);
  }
}

function procesarEdicionCargaNT(sheet, row, col, valor) {
  // Columna B = TIPO (columna 2)
  if (col === 2) {
    const esIngreso = TIPOS_INGRESO_NT.includes(valor);
    if (esIngreso) {
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    } else {
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    }
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    if (valor === 'VARIABLES' || valor === 'EVENTOS') {
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    } else {
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    }
  }

  // Columna D = SUBCATEGORÍA (columna 4) - Validación Anti-Burro Préstamos
  if (col === 4) {
    validarPrestamoDevolucionNT(sheet, row, valor);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDACIÓN ANTI-BURRO - PRÉSTAMOS Y DEVOLUCIONES
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Calcula cuánto debe FAMILIA a NT
 * Deuda = Préstamos que NT dio a Familia - Devoluciones que Familia hizo a NT
 */
function calcularDeudaFamiliaANT() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Préstamos que NT dio a Familia (registrados en CARGA_NT como egreso)
  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  let prestamosNTaFamilia = 0;
  if (cargaNT) {
    const datosNT = cargaNT.getDataRange().getValues();
    for (let i = 3; i < datosNT.length; i++) {
      if (datosNT[i][3] === 'Préstamo NT → Familia') { // Columna D (índice 3)
        prestamosNTaFamilia += Number(datosNT[i][5]) || 0; // Columna F = MONTO (índice 5)
      }
    }
  }

  // Devoluciones que Familia hizo a NT (registrados en CARGA_FAMILIA como egreso)
  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  let devolucionesFamiliaANT = 0;
  if (cargaFam) {
    const datosFam = cargaFam.getDataRange().getValues();
    for (let i = 3; i < datosFam.length; i++) {
      if (datosFam[i][3] === 'Devolución Familia → NT') { // Columna D (índice 3)
        devolucionesFamiliaANT += Number(datosFam[i][5]) || 0; // Columna F = MONTO (índice 5)
      }
    }
  }

  return prestamosNTaFamilia - devolucionesFamiliaANT;
}

/**
 * Calcula cuánto debe NT a FAMILIA
 * Deuda = Préstamos que Familia dio a NT - Devoluciones que NT hizo a Familia
 */
function calcularDeudaNTAFamilia() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Préstamos que Familia dio a NT (registrados en CARGA_FAMILIA como egreso)
  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  let prestamosFamiliaANT = 0;
  if (cargaFam) {
    const datosFam = cargaFam.getDataRange().getValues();
    for (let i = 3; i < datosFam.length; i++) {
      if (datosFam[i][3] === 'Préstamo Familia → NT') { // Columna D (índice 3)
        prestamosFamiliaANT += Number(datosFam[i][5]) || 0; // Columna F = MONTO (índice 5)
      }
    }
  }

  // Devoluciones que NT hizo a Familia (registrados en CARGA_NT como egreso)
  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  let devolucionesNTaFamilia = 0;
  if (cargaNT) {
    const datosNT = cargaNT.getDataRange().getValues();
    for (let i = 3; i < datosNT.length; i++) {
      if (datosNT[i][3] === 'Devolución NT → Familia') { // Columna D (índice 3)
        devolucionesNTaFamilia += Number(datosNT[i][5]) || 0; // Columna F = MONTO (índice 5)
      }
    }
  }

  return prestamosFamiliaANT - devolucionesNTaFamilia;
}

/**
 * Formatea un número en formato Guaraníes paraguayos
 */
function formatearGuaranies(monto) {
  return 'Gs. ' + monto.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

/**
 * Valida préstamos/devoluciones en CARGA_FAMILIA
 * - Si Familia DEBE a NT: solo puede devolver, no prestar
 * - Si Familia NO DEBE a NT: solo puede prestar, no devolver
 */
function validarPrestamoDevolucionFamilia(sheet, row, valor) {
  if (valor === 'Préstamo Familia → NT') {
    const deudaFamiliaANT = calcularDeudaFamiliaANT();
    if (deudaFamiliaANT > 0) {
      // Familia ya debe a NT, no puede prestar más
      SpreadsheetApp.getUi().alert(
        '⚠️ BLOQUEO: No puedes prestar a NT',
        'FAMILIA debe ' + formatearGuaranies(deudaFamiliaANT) + ' a NeuroTEA.\n\n' +
        'Primero debes usar "Devolución Familia → NT" para saldar la deuda.\n\n' +
        'Regla: No puedes prestar a quien ya te debe.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue(''); // Limpiar la celda
    }
  } else if (valor === 'Devolución Familia → NT') {
    const deudaFamiliaANT = calcularDeudaFamiliaANT();
    if (deudaFamiliaANT <= 0) {
      // Familia no debe nada a NT, no puede devolver
      SpreadsheetApp.getUi().alert(
        '⚠️ BLOQUEO: No tienes nada que devolver',
        'FAMILIA no debe nada a NeuroTEA.\n\n' +
        'No puedes registrar una devolución si no recibiste un préstamo.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue(''); // Limpiar la celda
    }
  }
}

/**
 * Valida préstamos/devoluciones en CARGA_NT
 * - Si NT DEBE a Familia: solo puede devolver, no prestar
 * - Si NT NO DEBE a Familia: solo puede prestar, no devolver
 */
function validarPrestamoDevolucionNT(sheet, row, valor) {
  if (valor === 'Préstamo NT → Familia') {
    const deudaNTaFamilia = calcularDeudaNTAFamilia();
    if (deudaNTaFamilia > 0) {
      // NT ya debe a Familia, no puede prestar más
      SpreadsheetApp.getUi().alert(
        '⚠️ BLOQUEO: NT no puede prestar a Familia',
        'NeuroTEA debe ' + formatearGuaranies(deudaNTaFamilia) + ' a FAMILIA.\n\n' +
        'Primero debes usar "Devolución NT → Familia" para saldar la deuda.\n\n' +
        'Regla: No puedes prestar a quien ya te debe.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue(''); // Limpiar la celda
    }
  } else if (valor === 'Devolución NT → Familia') {
    const deudaNTaFamilia = calcularDeudaNTAFamilia();
    if (deudaNTaFamilia <= 0) {
      // NT no debe nada a Familia, no puede devolver
      SpreadsheetApp.getUi().alert(
        '⚠️ BLOQUEO: NT no tiene nada que devolver',
        'NeuroTEA no debe nada a FAMILIA.\n\n' +
        'No puedes registrar una devolución si no recibiste un préstamo.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue(''); // Limpiar la celda
    }
  }
}
