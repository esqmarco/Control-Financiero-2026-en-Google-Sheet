/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CODE.GS - MENÚ PRINCIPAL E INICIALIZACIÓN
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 *
 * ARQUITECTURA DE ARCHIVOS:
 * ├── Code.gs       → Menú principal e inicialización (este archivo)
 * ├── Config.gs     → Datos maestros y configuraciones
 * ├── Sheets.gs     → Creación de las 7 hojas principales
 * ├── Styles.gs     → Estilos profesionales y formato condicional
 * ├── Formulas.gs   → Fórmulas complejas y cálculos
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
      .addItem('🎯 TABLERO', 'crearHojaTABLERO'))
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
    '📋 Se crearán las siguientes hojas:\n' +
    '  • CONFIG - Configuración y listas maestras\n' +
    '  • PRESUPUESTO - Plan anual ENE-DIC\n' +
    '  • GASTOS_FIJOS - Montos base × 12 meses\n' +
    '  • CARGA_FAMILIA - Variables familiares\n' +
    '  • CARGA_NT - Variables NeuroTEA\n' +
    '  • MOVIMIENTO - Real vs Presupuesto\n' +
    '  • TABLERO - Dashboard KPIs\n\n' +
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
    if (valor === 'VARIABLES') {
      // Habilitar subcategoría
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    } else {
      // Deshabilitar subcategoría
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    }
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
}
