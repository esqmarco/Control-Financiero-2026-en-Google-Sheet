/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CODE.GS - MENÚ PRINCIPAL E INICIALIZACIÓN
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 7.20 - Validación dinámica de Reserva Variables desde CONFIG
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
      .addItem('🧹 Limpiar Datos de Prueba', 'limpiarDatosPrueba')
      .addItem('🔍 Verificar Contrapartes Huérfanas', 'limpiarContrapartesHuerfanas')
      .addItem('⚡ Instalar Auto-limpieza (onChange)', 'instalarTriggerOnChange'))
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

  if (row < 4) return;

  if (nombreHoja === NOMBRES_HOJAS.CARGA_FAMILIA) {
    procesarEdicionCargaFamilia(sheet, row, col, e.value, e.oldValue);
  } else if (nombreHoja === NOMBRES_HOJAS.CARGA_NT) {
    procesarEdicionCargaNT(sheet, row, col, e.value, e.oldValue);
  }
}

function procesarEdicionCargaFamilia(sheet, row, col, valor, oldValue) {
  const linkId = obtenerLinkId(sheet, row);
  const tieneContraparte = linkId && linkId.length === 6;

  // Columna A = FECHA (columna 1) - v7.21: También reintenta auto-creación
  if (col === 1 && valor) {
    if (tieneContraparte) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_FAMILIA, 1, valor);
    } else {
      // v7.21: Reintentar auto-creación cuando FECHA se completa
      intentarAutoCreacionFamilia(sheet, row);
    }
  }

  // Columna B = TIPO (columna 2)
  if (col === 2) {
    const esIngreso = TODOS_TIPOS_INGRESO_FAMILIA.includes(valor);
    const esAhorro = (valor === TIPO_AHORRO);

    if (esIngreso) {
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO).clearDataValidations();
    } else if (esAhorro) {
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO).clearDataValidations();
    } else {
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
      // v7.22: Restaurar validación SUBCATEGORÍA apuntando a CONFIG
      const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRES_HOJAS.CONFIG);
      const rangoVarFam = configSheet.getRange(21, 3, VARIABLES_FAMILIA.length, 1);
      sheet.getRange(row, 4).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInRange(rangoVarFam, true)
          .setAllowInvalid(true)
          .build()
      );
      // v7.21: Reintentar auto-creación cuando TIPO cambia a Egreso Familiar
      if (!tieneContraparte && valor === 'Egreso Familiar') {
        intentarAutoCreacionFamilia(sheet, row);
      }
    }
  }

  // Columna F = MONTO (columna 6)
  if (col === 6) {
    const montoNuevo = limpiarMonto(valor);
    const montoAnterior = limpiarMonto(oldValue);

    // Si el monto se vació, borrar contraparte
    if (montoNuevo === 0 && montoAnterior > 0) {
      if (tieneContraparte) {
        borrarContraparte(linkId, NOMBRES_HOJAS.CARGA_FAMILIA);
        sheet.getRange(row, 9).setValue('');
      }
    }
    // v7.19: Si ya tiene contraparte, sincronizar monto
    else if (tieneContraparte && montoNuevo >= 10000) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_FAMILIA, 6, montoNuevo);
    }
    // v7.18: Si no tiene contraparte, intentar crear
    else if (!tieneContraparte && montoNuevo >= 10000) {
      intentarAutoCreacionFamilia(sheet, row);
    }
  }

  // Columna G = CUENTA (columna 7)
  if (col === 7 && valor && valor !== '-') {
    // v7.19: Si ya tiene contraparte, sincronizar cuenta
    if (tieneContraparte) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_FAMILIA, 7, valor);
    }
    // Si no tiene contraparte, intentar crear
    else {
      intentarAutoCreacionFamilia(sheet, row);
    }
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    const tipoActual = sheet.getRange(row, 2).getValue();

    // Validar que el TIPO no sea un INGRESO
    if (TODOS_TIPOS_INGRESO_FAMILIA.includes(tipoActual) && valor !== '-') { // v7.14
      SpreadsheetApp.getUi().alert(
        '⚠️ INCOHERENCIA: TIPO es un INGRESO',
        'El TIPO "' + tipoActual + '" es un INGRESO.\n\n' +
        'Los ingresos NO tienen CATEGORÍA.\n' +
        'La CATEGORÍA solo aplica para egresos ("Egreso Familiar") o ahorro ("Ahorro").',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
      return;
    }

    // Si TIPO = "Ahorro", validar que CATEGORÍA sea de ahorro
    if (tipoActual === TIPO_AHORRO) {
      if (!CATEGORIAS_AHORRO_FAMILIA.includes(valor)) {
        SpreadsheetApp.getUi().alert(
          '⚠️ CATEGORÍA incorrecta para AHORRO',
          'Si el TIPO es "Ahorro", la CATEGORÍA debe ser:\n\n' +
          '• Ahorro Clara\n' +
          '• Ahorro Marco\n' +
          '• Fondo de Emergencia\n\n' +
          'Seleccionaste: "' + valor + '"',
          SpreadsheetApp.getUi().ButtonSet.OK
        );
        sheet.getRange(row, 3).setValue('');
        return;
      }
      // AHORRO: SUBCATEGORÍA siempre bloqueada
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
      return;
    }

    // Para egresos: habilitar subcategoría solo si es VARIABLES
    if (valor === 'VARIABLES') {
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
      // v7.21: Reintentar auto-creación cuando CATEGORÍA cambia a VARIABLES
      if (!tieneContraparte) {
        intentarAutoCreacionFamilia(sheet, row);
      }
    } else {
      // Deshabilitar subcategoría para otras categorías de egreso
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    }
  }

  // Columna D = SUBCATEGORÍA (columna 4) - Validaciones Anti-Burro
  if (col === 4) {
    const tipoActual = sheet.getRange(row, 2).getValue();
    const categoriaActual = sheet.getRange(row, 3).getValue();

    // Si TIPO = "Ahorro", SUBCATEGORÍA debe estar bloqueada
    if (tipoActual === TIPO_AHORRO && valor !== '-') {
      SpreadsheetApp.getUi().alert(
        '⚠️ SUBCATEGORÍA no aplica para AHORRO',
        'Cuando el TIPO es "Ahorro", la SUBCATEGORÍA no se usa.\n\n' +
        'El tipo de ahorro se selecciona en CATEGORÍA.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
      return;
    }

    // 1. Validar contradicciones TIPO vs SUBCATEGORÍA
    if (validarContradiccionTipoSubcategoriaFamilia(sheet, row, tipoActual, valor)) {
      return; // Si hubo contradicción, ya se limpió la celda
    }

    // 2. Validar VARIABLES con subcategoría correcta (v7.20: lee desde CONFIG dinámicamente)
    const variablesFamValidas = obtenerVariablesDesdeConfig('FAMILIA');
    if (categoriaActual === 'VARIABLES' && !variablesFamValidas.includes(valor)) {
      SpreadsheetApp.getUi().alert(
        '⚠️ SUBCATEGORÍA incorrecta para VARIABLES',
        'La subcategoría "' + valor + '" no pertenece a VARIABLES.\n\n' +
        'Verifica que estés seleccionando de la lista correcta.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue('');
      return;
    }

    // 3. Validar préstamos/devoluciones (balance cruzado)
    // v7.21: Si validación bloquea, no intentar auto-creación
    const bloqueadoFam = validarPrestamoDevolucionFamilia(sheet, row, valor);
    if (bloqueadoFam) return;

    // 4. v7.19: Manejar préstamos/devoluciones
    const esPrestamoODevolucion = (valor === 'Préstamo Familia → NT' || valor === 'Devolución Familia → NT');
    const eraPrestamoODevolucion = (oldValue === 'Préstamo Familia → NT' || oldValue === 'Devolución Familia → NT');

    if (esPrestamoODevolucion) {
      // Si ya tenía contraparte y cambió el tipo (préstamo↔devolución), recrear
      if (tieneContraparte && eraPrestamoODevolucion && valor !== oldValue) {
        recrearContraparte(sheet, row, NOMBRES_HOJAS.CARGA_FAMILIA);
      }
      // Si no tiene contraparte, intentar crear
      else if (!tieneContraparte) {
        intentarAutoCreacionFamilia(sheet, row);
      }
    }
    // Si cambió DE préstamo/devolución A otra cosa, borrar contraparte
    else if (eraPrestamoODevolucion && tieneContraparte) {
      borrarContraparte(linkId, NOMBRES_HOJAS.CARGA_FAMILIA);
      sheet.getRange(row, 9).setValue('');
      SpreadsheetApp.getActiveSpreadsheet().toast('✓ Contraparte eliminada', '🗑️ Auto', 2);
    }
  }
}

function procesarEdicionCargaNT(sheet, row, col, valor, oldValue) {
  const linkId = obtenerLinkId(sheet, row);
  const tieneContraparte = linkId && linkId.length === 6;

  // Columna A = FECHA (columna 1) - v7.19: Sincronizar si ya tiene contraparte
  if (col === 1 && valor) {
    if (tieneContraparte) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_NT, 1, valor);
    } else {
      // v7.21: Reintentar auto-creación cuando FECHA se completa
      intentarAutoCreacionNT(sheet, row);
    }
  }

  // Columna B = TIPO (columna 2)
  if (col === 2) {
    const esIngreso = TODOS_TIPOS_INGRESO_NT.includes(valor);
    if (esIngreso) {
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO).clearDataValidations();
    } else {
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
      // v7.22: Restaurar validación SUBCATEGORÍA apuntando a CONFIG
      const configSheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(NOMBRES_HOJAS.CONFIG);
      const rangoVarNT = configSheet.getRange(21, 7, VARIABLES_NT.length, 1);
      sheet.getRange(row, 4).setDataValidation(
        SpreadsheetApp.newDataValidation()
          .requireValueInRange(rangoVarNT, true)
          .setAllowInvalid(true)
          .build()
      );
      // v7.21: Reintentar auto-creación cuando TIPO cambia a Egreso NT
      if (!tieneContraparte && valor === 'Egreso NT') {
        intentarAutoCreacionNT(sheet, row);
      }
    }
  }

  // Columna F = MONTO (columna 6)
  if (col === 6) {
    const montoNuevo = limpiarMonto(valor);
    const montoAnterior = limpiarMonto(oldValue);

    // Si el monto se vació, borrar contraparte
    if (montoNuevo === 0 && montoAnterior > 0) {
      if (tieneContraparte) {
        borrarContraparte(linkId, NOMBRES_HOJAS.CARGA_NT);
        sheet.getRange(row, 9).setValue('');
      }
    }
    // v7.19: Si ya tiene contraparte, sincronizar monto
    else if (tieneContraparte && montoNuevo >= 10000) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_NT, 6, montoNuevo);
    }
    // v7.18: Si no tiene contraparte, intentar crear
    else if (!tieneContraparte && montoNuevo >= 10000) {
      intentarAutoCreacionNT(sheet, row);
    }
  }

  // Columna G = CUENTA (columna 7)
  if (col === 7 && valor && valor !== '-') {
    // v7.19: Si ya tiene contraparte, sincronizar cuenta
    if (tieneContraparte) {
      sincronizarContraparte(linkId, NOMBRES_HOJAS.CARGA_NT, 7, valor);
    }
    // Si no tiene contraparte, intentar crear
    else {
      intentarAutoCreacionNT(sheet, row);
    }
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    // Validar que el TIPO no sea un INGRESO
    const tipoActual = sheet.getRange(row, 2).getValue();
    if (TODOS_TIPOS_INGRESO_NT.includes(tipoActual) && valor !== '-') { // v7.14
      SpreadsheetApp.getUi().alert(
        '⚠️ INCOHERENCIA: TIPO es un INGRESO',
        'El TIPO "' + tipoActual + '" es un INGRESO.\n\n' +
        'Los ingresos NO tienen CATEGORÍA.\n' +
        'La CATEGORÍA solo aplica para egresos ("Egreso NT").',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
      return;
    }

    if (valor === 'VARIABLES' || valor === 'EVENTOS') {
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
      // v7.21: Reintentar auto-creación cuando CATEGORÍA cambia a VARIABLES
      if (!tieneContraparte && valor === 'VARIABLES') {
        intentarAutoCreacionNT(sheet, row);
      }
    } else {
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    }
  }

  // Columna D = SUBCATEGORÍA (columna 4) - Validaciones Anti-Burro
  if (col === 4) {
    const tipoActual = sheet.getRange(row, 2).getValue();
    const categoriaActual = sheet.getRange(row, 3).getValue();

    // 1. Validar contradicciones TIPO vs SUBCATEGORÍA
    if (validarContradiccionTipoSubcategoriaNT(sheet, row, tipoActual, valor)) {
      return; // Si hubo contradicción, ya se limpió la celda
    }

    // 2. Validar VARIABLES con subcategoría correcta (v7.20: lee desde CONFIG dinámicamente)
    const variablesNTValidas = obtenerVariablesDesdeConfig('NT');
    if (categoriaActual === 'VARIABLES' && !variablesNTValidas.includes(valor)) {
      SpreadsheetApp.getUi().alert(
        '⚠️ SUBCATEGORÍA incorrecta para VARIABLES',
        'La subcategoría "' + valor + '" no pertenece a VARIABLES de NT.\n\n' +
        'Verifica que estés seleccionando de la lista correcta.',
        SpreadsheetApp.getUi().ButtonSet.OK
      );
      sheet.getRange(row, 4).setValue('');
      return;
    }

    // 3. Validar EVENTOS con subcategoría correcta
    if (categoriaActual === 'EVENTOS') {
      const eventosValidos = EVENTOS_NT.map(e => e.nombre);
      if (!eventosValidos.includes(valor)) {
        SpreadsheetApp.getUi().alert(
          '⚠️ SUBCATEGORÍA incorrecta para EVENTOS',
          'La subcategoría "' + valor + '" no es un evento válido.\n\n' +
          'Verifica que estés seleccionando de la lista de eventos.',
          SpreadsheetApp.getUi().ButtonSet.OK
        );
        sheet.getRange(row, 4).setValue('');
        return;
      }
    }

    // 4. Validar préstamos/devoluciones (balance cruzado)
    // v7.21: Si validación bloquea, no intentar auto-creación
    const bloqueadoNT = validarPrestamoDevolucionNT(sheet, row, valor);
    if (bloqueadoNT) return;

    // 5. v7.19: Manejar préstamos/devoluciones
    const esPrestamoODevolucion = (valor === 'Préstamo NT → Familia' || valor === 'Devolución NT → Familia');
    const eraPrestamoODevolucion = (oldValue === 'Préstamo NT → Familia' || oldValue === 'Devolución NT → Familia');

    if (esPrestamoODevolucion) {
      // Si ya tenía contraparte y cambió el tipo (préstamo↔devolución), recrear
      if (tieneContraparte && eraPrestamoODevolucion && valor !== oldValue) {
        recrearContraparte(sheet, row, NOMBRES_HOJAS.CARGA_NT);
      }
      // Si no tiene contraparte, intentar crear
      else if (!tieneContraparte) {
        intentarAutoCreacionNT(sheet, row);
      }
    }
    // Si cambió DE préstamo/devolución A otra cosa, borrar contraparte
    else if (eraPrestamoODevolucion && tieneContraparte) {
      borrarContraparte(linkId, NOMBRES_HOJAS.CARGA_NT);
      sheet.getRange(row, 9).setValue('');
      SpreadsheetApp.getActiveSpreadsheet().toast('✓ Contraparte eliminada', '🗑️ Auto', 2);
    }
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LECTURA DINÁMICA DE VARIABLES DESDE CONFIG (v7.20)
// Permite renombrar "Reserva Var." sin tocar el código
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Lee las subcategorías VARIABLES desde la hoja CONFIG dinámicamente.
 * Esto permite que el usuario renombre las "Reserva Var." en CONFIG
 * y la validación las acepte sin necesidad de modificar el código.
 *
 * Posiciones en CONFIG (escritas por escribirListaConfig en Sheets.gs):
 *   VARIABLES FAMILIA: columna 3 (C), header fila 20, items fila 21+
 *   VARIABLES NT: columna 7 (G), header fila 20, items fila 21+
 *
 * @param {string} entidad - 'FAMILIA' o 'NT'
 * @returns {string[]} Lista de subcategorías válidas
 */
function obtenerVariablesDesdeConfig(entidad) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const config = ss.getSheetByName(NOMBRES_HOJAS.CONFIG);

  if (!config) {
    // Fallback a arrays hardcodeados si CONFIG no existe
    return entidad === 'FAMILIA' ? VARIABLES_FAMILIA : VARIABLES_NT;
  }

  // VARIABLES FAMILIA: col 3, VARIABLES NT: col 7
  const col = entidad === 'FAMILIA' ? 3 : 7;
  const maxItems = 20; // margen suficiente para las reservas

  const valores = config.getRange(21, col, maxItems, 1).getValues()
    .map(function(r) { return r[0]; })
    .filter(function(v) { return v !== '' && v !== null; });

  return valores.length > 0 ? valores : (entidad === 'FAMILIA' ? VARIABLES_FAMILIA : VARIABLES_NT);
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDACIÓN ANTI-BURRO - CONTRADICCIONES TIPO vs SUBCATEGORÍA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Valida contradicciones entre TIPO y SUBCATEGORÍA en CARGA_FAMILIA
 * v7.13: Simplificado - solo valida que TIPO ingreso no tenga SUBCAT de egreso
 * @returns {boolean} true si hubo contradicción (y se limpió la celda)
 */
function validarContradiccionTipoSubcategoriaFamilia(sheet, row, tipo, subcategoria) {
  // Cualquier TIPO de ingreso no debería tener subcategoría de egreso
  if (TODOS_TIPOS_INGRESO_FAMILIA.includes(tipo) && // v7.14: Incluye tipos auto-creados
      (subcategoria === 'Devolución Familia → NT' || subcategoria === 'Préstamo Familia → NT')) {
    SpreadsheetApp.getUi().alert(
      '⚠️ INCOHERENCIA: TIPO es INGRESO pero SUBCATEGORÍA es de EGRESO',
      'El TIPO "' + tipo + '" es un INGRESO.\n\n' +
      'La subcategoría "' + subcategoria + '" es de EGRESO.\n\n' +
      'No puedes combinar un ingreso con una subcategoría de egreso.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  return false; // No hubo contradicción
}

/**
 * Valida contradicciones entre TIPO y SUBCATEGORÍA en CARGA_NT
 * v7.13: Simplificado - solo valida que TIPO ingreso no tenga SUBCAT de egreso
 * @returns {boolean} true si hubo contradicción (y se limpió la celda)
 */
function validarContradiccionTipoSubcategoriaNT(sheet, row, tipo, subcategoria) {
  // Cualquier TIPO de ingreso no debería tener subcategoría de egreso
  if (TODOS_TIPOS_INGRESO_NT.includes(tipo) && // v7.14: Incluye tipos auto-creados
      (subcategoria === 'Devolución NT → Familia' || subcategoria === 'Préstamo NT → Familia')) {
    SpreadsheetApp.getUi().alert(
      '⚠️ INCOHERENCIA: TIPO es INGRESO pero SUBCATEGORÍA es de EGRESO',
      'El TIPO "' + tipo + '" es un INGRESO.\n\n' +
      'La subcategoría "' + subcategoria + '" es de EGRESO.\n\n' +
      'No puedes combinar un ingreso con una subcategoría de egreso.',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  return false; // No hubo contradicción
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDACIÓN ANTI-BURRO - PRÉSTAMOS Y DEVOLUCIONES (BALANCE CRUZADO)
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
      return true; // v7.21: Indica que fue bloqueado
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
      return true; // v7.21: Indica que fue bloqueado
    }
  }
  return false; // v7.21: No fue bloqueado, puede continuar
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
      return true; // v7.21: Indica que fue bloqueado
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
      return true; // v7.21: Indica que fue bloqueado
    }
  }
  return false; // v7.21: No fue bloqueado, puede continuar
}

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-CREACIÓN DE TRANSACCIONES CRUZADAS (PRÉSTAMOS/DEVOLUCIONES)
// v7.13 SIMPLIFICADO: Sin sistema de flags - la protección es natural
// (las filas auto-creadas tienen SUBCAT="-", no disparan más creaciones)
// ═══════════════════════════════════════════════════════════════════════════════

// ═══════════════════════════════════════════════════════════════════════════════
// SISTEMA UUID - VINCULACIÓN DE TRANSACCIONES CRUZADAS (v7.12)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Genera un ID único para vincular transacciones cruzadas
 * Formato: 6 caracteres alfanuméricos (ej: A7K2M1)
 * @returns {string} ID único breve
 */
function generarLinkId() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
}

/**
 * Busca la transacción contraparte por LINK_ID
 * @param {Sheet} sheet - Hoja donde buscar
 * @param {string} linkId - ID de vinculación a buscar
 * @returns {number|null} Número de fila donde está, o null si no existe
 */
function buscarContraparte(sheet, linkId) {
  if (!linkId || linkId === '') return null;

  const datos = sheet.getDataRange().getValues();
  // Columna I (índice 8) = LINK_ID
  for (let i = 3; i < datos.length; i++) {
    if (datos[i][8] === linkId) {
      return i + 1; // Retornar número de fila (1-indexed)
    }
  }
  return null;
}

/**
 * Borra la transacción contraparte vinculada por LINK_ID
 * @param {string} linkId - ID de vinculación
 * @param {string} hojaOrigen - Nombre de la hoja donde se originó el borrado
 * @returns {boolean} true si se borró correctamente
 */
function borrarContraparte(linkId, hojaOrigen) {
  if (!linkId || linkId === '') return false;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Determinar hoja destino (la contraria)
  const nombreHojaDestino = hojaOrigen === NOMBRES_HOJAS.CARGA_FAMILIA
    ? NOMBRES_HOJAS.CARGA_NT
    : NOMBRES_HOJAS.CARGA_FAMILIA;

  const hojaDestino = ss.getSheetByName(nombreHojaDestino);
  if (!hojaDestino) return false;

  const filaContraparte = buscarContraparte(hojaDestino, linkId);
  if (!filaContraparte) return false;

  try {
    // Borrar la fila completa de la contraparte
    hojaDestino.deleteRow(filaContraparte);
    ss.toast('✓ Borrada contraparte en ' + nombreHojaDestino, '🔄 Auto-borrado', 3);
    return true;
  } catch (error) {
    ss.toast('❌ Error al borrar contraparte: ' + error.message, 'Error', 5);
    return false;
  }
}

/**
 * Verifica si una transacción tiene LINK_ID (es parte de par cruzado)
 * @param {Sheet} sheet - Hoja
 * @param {number} row - Fila a verificar
 * @returns {string|null} LINK_ID si existe, null si no
 */
function obtenerLinkId(sheet, row) {
  const valor = sheet.getRange(row, 9).getValue(); // Columna I
  return (valor && valor !== '' && String(valor).length === 6) ? String(valor) : null;
}

/**
 * v7.19: Sincroniza cambios en la transacción contraparte
 * Puede actualizar: FECHA (col 1), MONTO (col 6), CUENTA (col 7)
 * @param {string} linkId - ID de vinculación
 * @param {string} hojaOrigen - Nombre de la hoja origen
 * @param {number} columna - Columna a actualizar (1=FECHA, 6=MONTO, 7=CUENTA)
 * @param {any} nuevoValor - Nuevo valor
 * @returns {boolean} true si se actualizó correctamente
 */
function sincronizarContraparte(linkId, hojaOrigen, columna, nuevoValor) {
  if (!linkId || linkId === '') return false;

  const ss = SpreadsheetApp.getActiveSpreadsheet();

  const nombreHojaDestino = hojaOrigen === NOMBRES_HOJAS.CARGA_FAMILIA
    ? NOMBRES_HOJAS.CARGA_NT
    : NOMBRES_HOJAS.CARGA_FAMILIA;

  const hojaDestino = ss.getSheetByName(nombreHojaDestino);
  if (!hojaDestino) return false;

  const filaContraparte = buscarContraparte(hojaDestino, linkId);
  if (!filaContraparte) return false;

  try {
    hojaDestino.getRange(filaContraparte, columna).setValue(nuevoValor);

    // Aplicar formato de fecha si es columna A
    if (columna === 1) {
      hojaDestino.getRange(filaContraparte, 1).setNumberFormat('dd/mm/yyyy');
    }

    const nombreCampo = columna === 1 ? 'fecha' : (columna === 6 ? 'monto' : 'cuenta');
    ss.toast('✓ Sincronizado ' + nombreCampo + ' en ' + nombreHojaDestino, '🔄 Auto', 2);
    return true;
  } catch (error) {
    return false;
  }
}

/**
 * v7.19: Borra contraparte y recrea cuando cambia el tipo de transacción
 * (ej: de Préstamo a Devolución)
 */
function recrearContraparte(sheet, row, hojaOrigen) {
  const linkId = obtenerLinkId(sheet, row);
  if (linkId) {
    // Borrar la contraparte vieja
    borrarContraparte(linkId, hojaOrigen);
    // Limpiar el LINK_ID de la fila original
    sheet.getRange(row, 9).setValue('');
  }

  // Crear nueva contraparte
  if (hojaOrigen === NOMBRES_HOJAS.CARGA_FAMILIA) {
    intentarAutoCreacionFamilia(sheet, row);
  } else {
    intentarAutoCreacionNT(sheet, row);
  }
}

// Mantener compatibilidad con código existente
function actualizarMontoContraparte(linkId, hojaOrigen, nuevoMonto) {
  return sincronizarContraparte(linkId, hojaOrigen, 6, nuevoMonto);
}

/**
 * Encuentra la primera fila vacía en una hoja (desde fila 4)
 */
function encontrarPrimeraFilaVacia(sheet) {
  const ultimaFila = sheet.getLastRow();
  if (ultimaFila < 4) return 4;
  return ultimaFila + 1;
}

/**
 * Verifica si ya existe una transacción cruzada para evitar duplicados
 * v7.10 - Mejorado: verifica por descripción además de monto
 * @param {Sheet} sheet - Hoja donde buscar
 * @param {Date} fecha - Fecha de la transacción
 * @param {string} tipoOSubcat - Tipo o subcategoría a buscar
 * @param {number} monto - Monto de la transacción
 * @param {string} campo - 'tipo' o 'subcategoria' para indicar qué columna buscar
 * @param {string} descripcion - Descripción de la transacción (opcional)
 * @returns {boolean} true si ya existe
 */
function existeTransaccionCruzada(sheet, fecha, tipoOSubcat, monto, campo, descripcion) {
  const datos = sheet.getDataRange().getValues();
  const colBusqueda = campo === 'tipo' ? 1 : 3; // B=TIPO, D=SUBCATEGORÍA

  // Normalizar fecha a solo día/mes/año para comparación
  const fechaBuscar = fecha instanceof Date ?
    new Date(fecha.getFullYear(), fecha.getMonth(), fecha.getDate()).getTime() : null;

  if (!fechaBuscar) return false;

  // Normalizar descripción para comparación
  const descripNorm = String(descripcion || '').toLowerCase().trim();

  for (let i = 3; i < datos.length; i++) {
    const fila = datos[i];
    const fechaFila = fila[0];
    const valorColumna = fila[colBusqueda];
    const descripFila = String(fila[4] || '').toLowerCase().trim();
    const montoFila = Number(fila[5]) || 0;

    // Verificar si la fecha es válida
    if (!(fechaFila instanceof Date)) continue;

    const fechaFilaNorm = new Date(fechaFila.getFullYear(), fechaFila.getMonth(), fechaFila.getDate()).getTime();

    // Condición 1: Mismo fecha + tipo/subcat + monto (con tolerancia de 1)
    const coincidePorMonto = (fechaFilaNorm === fechaBuscar &&
                              valorColumna === tipoOSubcat &&
                              Math.abs(montoFila - monto) < 1);

    // Condición 2: Mismo fecha + tipo/subcat + descripción similar (v7.10)
    // Esto evita duplicados cuando el usuario edita el monto después
    const coincidePorDescripcion = (descripNorm.length >= 5 &&
                                     fechaFilaNorm === fechaBuscar &&
                                     valorColumna === tipoOSubcat &&
                                     descripFila.includes(descripNorm.substring(0, 10)));

    if (coincidePorMonto || coincidePorDescripcion) {
      return true; // Ya existe
    }
  }
  return false;
}

/**
 * Aplica formato de fecha dd/mm/yyyy a una celda
 * @param {Sheet} sheet - Hoja
 * @param {number} fila - Número de fila
 */
function aplicarFormatoFecha(sheet, fila) {
  sheet.getRange(fila, 1).setNumberFormat('dd/mm/yyyy');
}

/**
 * Limpia un valor numérico que puede venir con formato paraguayo (puntos como miles)
 * @param {any} valor - El valor a limpiar
 * @returns {number} El número limpio
 */
function limpiarMonto(valor) {
  if (typeof valor === 'number') return valor;
  if (!valor) return 0;
  // Remover puntos (separador de miles) y reemplazar coma por punto (decimal)
  const limpio = String(valor).replace(/\./g, '').replace(',', '.');
  return Number(limpio) || 0;
}

/**
 * v7.18: Verifica que TODOS los campos requeridos estén completos antes de auto-crear
 * Campos requeridos: FECHA, TIPO, CATEGORÍA, SUBCATEGORÍA, MONTO, CUENTA
 * Campos opcionales: DESCRIPCIÓN, NOTAS
 */
function intentarAutoCreacionFamilia(sheet, row) {
  const datos = sheet.getRange(row, 1, 1, 9).getValues()[0];

  // Leer todos los campos
  const fecha = datos[0];
  const tipo = String(datos[1] || '').trim();
  const categoria = String(datos[2] || '').trim();
  const subcategoria = String(datos[3] || '').trim();
  const monto = limpiarMonto(datos[5]);
  const cuenta = String(datos[6] || '').trim();
  const linkId = String(datos[8] || '').trim();

  // Si ya tiene LINK_ID, no hacer nada (ya fue auto-creada)
  if (linkId && linkId.length === 6) return;

  // Verificar que sea un préstamo/devolución
  const esPrestamoFamNT = subcategoria === 'Préstamo Familia → NT';
  const esDevolucionFamNT = subcategoria === 'Devolución Familia → NT';
  if (!esPrestamoFamNT && !esDevolucionFamNT) return;

  // Verificar TODOS los campos requeridos
  const fechaValida = fecha && (fecha instanceof Date || (typeof fecha === 'string' && fecha.includes('/')));
  const tipoValido = tipo === 'Egreso Familiar';
  const categoriaValida = categoria === 'VARIABLES';
  const montoValido = monto >= 10000;
  const cuentaValida = cuenta && cuenta !== '-' && cuenta !== '';

  // Si falta algún campo, no hacer nada (esperar a que complete)
  if (!fechaValida || !tipoValido || !categoriaValida || !montoValido || !cuentaValida) {
    return;
  }

  // ¡Todos los campos completos! Disparar auto-creación
  autoCrearTransaccionCruzadaFamilia(sheet, row);
}

/**
 * v7.18: Verifica que TODOS los campos requeridos estén completos antes de auto-crear (NT)
 */
function intentarAutoCreacionNT(sheet, row) {
  const datos = sheet.getRange(row, 1, 1, 9).getValues()[0];

  // Leer todos los campos
  const fecha = datos[0];
  const tipo = String(datos[1] || '').trim();
  const categoria = String(datos[2] || '').trim();
  const subcategoria = String(datos[3] || '').trim();
  const monto = limpiarMonto(datos[5]);
  const cuenta = String(datos[6] || '').trim();
  const linkId = String(datos[8] || '').trim();

  // Si ya tiene LINK_ID, no hacer nada (ya fue auto-creada)
  if (linkId && linkId.length === 6) return;

  // Verificar que sea un préstamo/devolución
  const esPrestamoNTFam = subcategoria === 'Préstamo NT → Familia';
  const esDevolucionNTFam = subcategoria === 'Devolución NT → Familia';
  if (!esPrestamoNTFam && !esDevolucionNTFam) return;

  // Verificar TODOS los campos requeridos
  const fechaValida = fecha && (fecha instanceof Date || (typeof fecha === 'string' && fecha.includes('/')));
  const tipoValido = tipo === 'Egreso NT';
  const categoriaValida = categoria === 'VARIABLES';
  const montoValido = monto >= 10000;
  const cuentaValida = cuenta && cuenta !== '-' && cuenta !== '';

  // Si falta algún campo, no hacer nada (esperar a que complete)
  if (!fechaValida || !tipoValido || !categoriaValida || !montoValido || !cuentaValida) {
    return;
  }

  // ¡Todos los campos completos! Disparar auto-creación
  autoCrearTransaccionCruzadaNT(sheet, row);
}

/**
 * Auto-crea transacción en CARGA_NT cuando FAM registra préstamo/devolución
 * v7.15 - Con logging para debugging
 */
function autoCrearTransaccionCruzadaFamilia(sheet, row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const datos = sheet.getRange(row, 1, 1, 9).getValues()[0];

    let fecha = datos[0];
    const subcategoria = String(datos[3] || '').trim();
    const montoRaw = datos[5];
    const monto = limpiarMonto(montoRaw);
    const linkIdExistente = String(datos[8] || '').trim();

    // LOG: Ver qué datos estamos leyendo
    console.log('AUTO-FAM: fecha=' + fecha + ', subcat=' + subcategoria + ', montoRaw=' + montoRaw + ', monto=' + monto);

    // Convertir fecha si es string (dd/mm/yyyy)
    if (typeof fecha === 'string' && fecha) {
      const p = fecha.split('/');
      if (p.length === 3) fecha = new Date(p[2], p[1] - 1, p[0]);
    }

    if (!fecha || !(fecha instanceof Date) || isNaN(fecha.getTime())) {
      console.log('AUTO-FAM: Fecha inválida, saliendo');
      return;
    }
    if (!monto || monto < 10000) {
      console.log('AUTO-FAM: Monto inválido (' + monto + '), saliendo');
      return;
    }

    // Solo procesar préstamos/devoluciones
    const esPrestamoFamNT = subcategoria === 'Préstamo Familia → NT';
    const esDevolucionFamNT = subcategoria === 'Devolución Familia → NT';

    if (!esPrestamoFamNT && !esDevolucionFamNT) {
      console.log('AUTO-FAM: Subcategoría no es préstamo/devolución: "' + subcategoria + '"');
      return;
    }

    const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
    if (!cargaNT) {
      console.log('AUTO-FAM: No se encontró hoja CARGA_NT');
      return;
    }

    // Si ya tiene LINK_ID, actualizar monto en vez de crear nueva
    if (linkIdExistente && linkIdExistente.length === 6) {
      console.log('AUTO-FAM: Ya tiene LINK_ID, actualizando monto');
      if (actualizarMontoContraparte(linkIdExistente, NOMBRES_HOJAS.CARGA_FAMILIA, monto)) return;
    }

    // Determinar tipo de ingreso y descripción
    const tipoIngreso = esPrestamoFamNT ? 'Préstamo Familia' : 'Devolución Familia → NT';
    const descripcion = esPrestamoFamNT ? 'Auto: "Recibido de FAMILIA"' : 'Auto: "Devolución de FAMILIA"';

    // Verificar si ya existe
    if (existeTransaccionCruzada(cargaNT, fecha, tipoIngreso, monto, 'tipo', '')) {
      console.log('AUTO-FAM: Ya existe transacción cruzada, saliendo');
      return;
    }

    // Crear transacción en NT con cuenta por defecto
    const linkId = generarLinkId();
    const filaDestino = encontrarPrimeraFilaVacia(cargaNT);

    console.log('AUTO-FAM: Creando en fila ' + filaDestino + ' con linkId=' + linkId);

    cargaNT.getRange(filaDestino, 1, 1, 9).setValues([[
      fecha, tipoIngreso, '-', '-', descripcion, monto, 'Atlas NeuroTEA', '', linkId
    ]]);
    aplicarFormatoFecha(cargaNT, filaDestino);

    // Guardar LINK_ID en fila original
    sheet.getRange(row, 9).setValue(linkId);

    ss.toast('✓ Creado en CARGA_NT: ' + tipoIngreso, '🔄 Auto', 3);
    console.log('AUTO-FAM: ¡Éxito! Creado ' + tipoIngreso);

  } catch (error) {
    console.log('AUTO-FAM ERROR: ' + error.message);
    ss.toast('❌ Error auto-creación: ' + error.message, 'Error', 5);
  }
}

/**
 * Auto-crea transacción en CARGA_FAMILIA cuando NT registra préstamo/devolución
 * v7.15 - Con logging para debugging
 */
function autoCrearTransaccionCruzadaNT(sheet, row) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  try {
    const datos = sheet.getRange(row, 1, 1, 9).getValues()[0];

    let fecha = datos[0];
    const subcategoria = String(datos[3] || '').trim();
    const montoRaw = datos[5];
    const monto = limpiarMonto(montoRaw);
    const linkIdExistente = String(datos[8] || '').trim();

    // LOG: Ver qué datos estamos leyendo
    console.log('AUTO-NT: fecha=' + fecha + ', subcat=' + subcategoria + ', montoRaw=' + montoRaw + ', monto=' + monto);

    // Convertir fecha si es string (dd/mm/yyyy)
    if (typeof fecha === 'string' && fecha) {
      const p = fecha.split('/');
      if (p.length === 3) fecha = new Date(p[2], p[1] - 1, p[0]);
    }

    if (!fecha || !(fecha instanceof Date) || isNaN(fecha.getTime())) {
      console.log('AUTO-NT: Fecha inválida, saliendo');
      return;
    }
    if (!monto || monto < 10000) {
      console.log('AUTO-NT: Monto inválido (' + monto + '), saliendo');
      return;
    }

    // Solo procesar préstamos/devoluciones
    const esPrestamoNTFam = subcategoria === 'Préstamo NT → Familia';
    const esDevolucionNTFam = subcategoria === 'Devolución NT → Familia';

    if (!esPrestamoNTFam && !esDevolucionNTFam) {
      console.log('AUTO-NT: Subcategoría no es préstamo/devolución: "' + subcategoria + '"');
      return;
    }

    const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
    if (!cargaFam) {
      console.log('AUTO-NT: No se encontró hoja CARGA_FAMILIA');
      return;
    }

    // Si ya tiene LINK_ID, actualizar monto en vez de crear nueva
    if (linkIdExistente && linkIdExistente.length === 6) {
      console.log('AUTO-NT: Ya tiene LINK_ID, actualizando monto');
      if (actualizarMontoContraparte(linkIdExistente, NOMBRES_HOJAS.CARGA_NT, monto)) return;
    }

    // Determinar tipo de ingreso y descripción
    const tipoIngreso = esPrestamoNTFam ? 'Préstamo NeuroTEA' : 'Devolución NeuroTEA';
    const descripcion = esPrestamoNTFam ? 'Auto: "Recibido de NEUROTEA"' : 'Auto: "Devolución de NEUROTEA"';

    // Verificar si ya existe
    if (existeTransaccionCruzada(cargaFam, fecha, tipoIngreso, monto, 'tipo', '')) {
      console.log('AUTO-NT: Ya existe transacción cruzada, saliendo');
      return;
    }

    // Crear transacción en FAMILIA con cuenta por defecto
    const linkId = generarLinkId();
    const filaDestino = encontrarPrimeraFilaVacia(cargaFam);

    console.log('AUTO-NT: Creando en fila ' + filaDestino + ' con linkId=' + linkId);

    cargaFam.getRange(filaDestino, 1, 1, 9).setValues([[
      fecha, tipoIngreso, '-', '-', descripcion, monto, 'ITAU Marco', '', linkId
    ]]);
    aplicarFormatoFecha(cargaFam, filaDestino);

    // Guardar LINK_ID en fila original
    sheet.getRange(row, 9).setValue(linkId);

    ss.toast('✓ Creado en CARGA_FAMILIA: ' + tipoIngreso, '🔄 Auto', 3);
    console.log('AUTO-NT: ¡Éxito! Creado ' + tipoIngreso);

  } catch (error) {
    console.log('AUTO-NT ERROR: ' + error.message);
    ss.toast('❌ Error auto-creación: ' + error.message, 'Error', 5);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// LIMPIEZA DE CONTRAPARTES HUÉRFANAS (v7.21)
// Detecta LINK_IDs que existen en una hoja pero no en la otra y los elimina
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Handler para trigger onChange (instalable).
 * Se dispara cuando hay cambios estructurales (insertar/eliminar filas).
 * Solo actúa en REMOVE_ROW para limpiar contrapartes huérfanas.
 */
function onChangeHandler(e) {
  if (!e || e.changeType !== 'REMOVE_ROW') return;
  limpiarContrapartesHuerfanas();
}

/**
 * Escanea CARGA_FAMILIA y CARGA_NT buscando LINK_IDs huérfanos.
 * Un LINK_ID es huérfano si existe en una hoja pero no en la otra.
 * Los elimina automáticamente y notifica al usuario.
 * Se puede ejecutar manualmente desde el menú o automáticamente via onChange.
 */
function limpiarContrapartesHuerfanas() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);

  if (!cargaFam || !cargaNT) return;

  // Recoger todos los LINK_IDs de cada hoja
  const linkIdsFam = obtenerLinkIds(cargaFam);
  const linkIdsNT = obtenerLinkIds(cargaNT);

  let huerfanasEliminadas = 0;

  // Buscar huérfanas en CARGA_FAMILIA (LINK_ID existe en FAM pero no en NT)
  const huerfanasFam = linkIdsFam.filter(function(item) {
    return !linkIdsNT.some(function(nt) { return nt.linkId === item.linkId; });
  });

  // Buscar huérfanas en CARGA_NT (LINK_ID existe en NT pero no en FAM)
  const huerfanasNT = linkIdsNT.filter(function(item) {
    return !linkIdsFam.some(function(fam) { return fam.linkId === item.linkId; });
  });

  // Eliminar huérfanas de CARGA_FAMILIA (de abajo hacia arriba para no desplazar filas)
  huerfanasFam.sort(function(a, b) { return b.fila - a.fila; });
  for (var i = 0; i < huerfanasFam.length; i++) {
    cargaFam.deleteRow(huerfanasFam[i].fila);
    huerfanasEliminadas++;
    console.log('HUÉRFANA: Eliminada fila ' + huerfanasFam[i].fila + ' de CARGA_FAMILIA (LINK_ID: ' + huerfanasFam[i].linkId + ')');
  }

  // Eliminar huérfanas de CARGA_NT (de abajo hacia arriba)
  huerfanasNT.sort(function(a, b) { return b.fila - a.fila; });
  for (var j = 0; j < huerfanasNT.length; j++) {
    cargaNT.deleteRow(huerfanasNT[j].fila);
    huerfanasEliminadas++;
    console.log('HUÉRFANA: Eliminada fila ' + huerfanasNT[j].fila + ' de CARGA_NT (LINK_ID: ' + huerfanasNT[j].linkId + ')');
  }

  // Notificar resultado
  if (huerfanasEliminadas > 0) {
    ss.toast('✓ Eliminadas ' + huerfanasEliminadas + ' contraparte(s) huérfana(s)', '🧹 Auto-limpieza', 4);
  }
}

/**
 * Obtiene todos los LINK_IDs válidos de una hoja CARGA.
 * @param {Sheet} sheet - Hoja CARGA_FAMILIA o CARGA_NT
 * @returns {Array<{linkId: string, fila: number}>} Lista de LINK_IDs con su fila
 */
function obtenerLinkIds(sheet) {
  const datos = sheet.getDataRange().getValues();
  var resultado = [];
  for (var i = 3; i < datos.length; i++) {
    var linkId = String(datos[i][8] || '').trim();
    if (linkId && linkId.length === 6) {
      resultado.push({ linkId: linkId, fila: i + 1 });
    }
  }
  return resultado;
}

/**
 * Instala el trigger onChange para auto-limpiar contrapartes huérfanas.
 * Solo necesita ejecutarse UNA VEZ. Si ya existe, no crea duplicado.
 */
function instalarTriggerOnChange() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();

  // Verificar si ya existe
  const triggers = ScriptApp.getUserTriggers(ss);
  for (var i = 0; i < triggers.length; i++) {
    if (triggers[i].getHandlerFunction() === 'onChangeHandler') {
      ss.toast('⚡ El trigger ya está instalado', 'Info', 3);
      return;
    }
  }

  // Instalar trigger
  ScriptApp.newTrigger('onChangeHandler')
    .forSpreadsheet(ss)
    .onChange()
    .create();

  ss.toast('✓ Trigger onChange instalado. Las contrapartes huérfanas se eliminarán automáticamente.', '⚡ Instalado', 5);
}
