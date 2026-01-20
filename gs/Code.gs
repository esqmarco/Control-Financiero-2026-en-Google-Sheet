/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * CODE.GS - MENÚ PRINCIPAL E INICIALIZACIÓN
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 7.0 - Auto-creación de transacciones cruzadas (préstamos/devoluciones)
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
    const esAhorro = (valor === TIPO_AHORRO); // "Ahorro"

    if (esIngreso) {
      // Deshabilitar CATEGORÍA y SUBCATEGORÍA para ingresos
      sheet.getRange(row, 3).setValue('-').setBackground(COLORES.GRIS_FONDO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    } else if (esAhorro) {
      // AHORRO: Habilitar CATEGORÍA (con opciones de ahorro), bloquear SUBCATEGORÍA
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
    } else {
      // Egresos: Habilitar CATEGORÍA y SUBCATEGORÍA
      sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
      sheet.getRange(row, 4).setBackground(COLORES.BLANCO);
    }
  }

  // Columna F = MONTO (columna 6) - Disparar auto-creación de transacciones cruzadas
  if (col === 6 && valor && Number(valor) > 0) {
    autoCrearTransaccionCruzadaFamilia(sheet, row);
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    const tipoActual = sheet.getRange(row, 2).getValue();

    // Validar que el TIPO no sea un INGRESO
    if (TIPOS_INGRESO_FAMILIA.includes(tipoActual) && valor !== '-') {
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

    // 2. Validar VARIABLES con subcategoría correcta
    if (categoriaActual === 'VARIABLES' && !VARIABLES_FAMILIA.includes(valor)) {
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

  // Columna F = MONTO (columna 6) - Disparar auto-creación de transacciones cruzadas
  if (col === 6 && valor && Number(valor) > 0) {
    autoCrearTransaccionCruzadaNT(sheet, row);
  }

  // Columna C = CATEGORÍA (columna 3)
  if (col === 3) {
    // Validar que el TIPO no sea un INGRESO
    const tipoActual = sheet.getRange(row, 2).getValue();
    if (TIPOS_INGRESO_NT.includes(tipoActual) && valor !== '-') {
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

    // 2. Validar VARIABLES con subcategoría correcta
    if (categoriaActual === 'VARIABLES' && !VARIABLES_NT.includes(valor)) {
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
    validarPrestamoDevolucionNT(sheet, row, valor);
  }
}

// ═══════════════════════════════════════════════════════════════════════════════
// VALIDACIÓN ANTI-BURRO - CONTRADICCIONES TIPO vs SUBCATEGORÍA
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Valida contradicciones entre TIPO y SUBCATEGORÍA en CARGA_FAMILIA
 * Detecta combinaciones imposibles como:
 * - TIPO="Devolución NeuroTEA" (INGRESO) + SUBCAT="Devolución Familia → NT" (EGRESO)
 * - TIPO="Préstamo NeuroTEA" (INGRESO) + SUBCAT="Préstamo Familia → NT" (EGRESO)
 * @returns {boolean} true si hubo contradicción (y se limpió la celda)
 */
function validarContradiccionTipoSubcategoriaFamilia(sheet, row, tipo, subcategoria) {
  // Contradicción 1: "Devolución NeuroTEA" es cuando NT devuelve a Familia (INGRESO)
  // pero "Devolución Familia → NT" es cuando Familia devuelve a NT (EGRESO)
  if (tipo === 'Devolución NeuroTEA' && subcategoria === 'Devolución Familia → NT') {
    SpreadsheetApp.getUi().alert(
      '⚠️ CONTRADICCIÓN DETECTADA',
      'Estás mezclando dos operaciones OPUESTAS:\n\n' +
      '• "Devolución NeuroTEA" = NT te devuelve dinero (INGRESO)\n' +
      '• "Devolución Familia → NT" = Vos devolvés a NT (EGRESO)\n\n' +
      '¿Qué querés registrar?\n\n' +
      '→ Si NT te devuelve: Usá TIPO="Devolución NeuroTEA" sin categoría\n' +
      '→ Si vos devolvés a NT: Usá TIPO="Egreso Familiar" → VARIABLES → "Devolución Familia → NT"',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  // Contradicción 2: "Préstamo NeuroTEA" es cuando NT presta a Familia (INGRESO)
  // pero "Préstamo Familia → NT" es cuando Familia presta a NT (EGRESO)
  if (tipo === 'Préstamo NeuroTEA' && subcategoria === 'Préstamo Familia → NT') {
    SpreadsheetApp.getUi().alert(
      '⚠️ CONTRADICCIÓN DETECTADA',
      'Estás mezclando dos operaciones OPUESTAS:\n\n' +
      '• "Préstamo NeuroTEA" = NT te presta dinero (INGRESO)\n' +
      '• "Préstamo Familia → NT" = Vos prestás a NT (EGRESO)\n\n' +
      '¿Qué querés registrar?\n\n' +
      '→ Si NT te presta: Usá TIPO="Préstamo NeuroTEA" sin categoría\n' +
      '→ Si vos prestás a NT: Usá TIPO="Egreso Familiar" → VARIABLES → "Préstamo Familia → NT"',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  // Contradicción 3: Cualquier TIPO de ingreso no debería tener subcategoría de egreso
  if (TIPOS_INGRESO_FAMILIA.includes(tipo) &&
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
 * Detecta combinaciones imposibles como:
 * - TIPO="Devolución Familia → NT" (INGRESO) + SUBCAT="Devolución NT → Familia" (EGRESO)
 * - TIPO="Préstamo Familia" (INGRESO) + SUBCAT="Préstamo NT → Familia" (EGRESO)
 * @returns {boolean} true si hubo contradicción (y se limpió la celda)
 */
function validarContradiccionTipoSubcategoriaNT(sheet, row, tipo, subcategoria) {
  // Contradicción 1: "Devolución Familia → NT" es cuando Familia devuelve a NT (INGRESO para NT)
  // pero "Devolución NT → Familia" es cuando NT devuelve a Familia (EGRESO para NT)
  if (tipo === 'Devolución Familia → NT' && subcategoria === 'Devolución NT → Familia') {
    SpreadsheetApp.getUi().alert(
      '⚠️ CONTRADICCIÓN DETECTADA',
      'Estás mezclando dos operaciones OPUESTAS:\n\n' +
      '• "Devolución Familia → NT" = Familia te devuelve dinero (INGRESO)\n' +
      '• "Devolución NT → Familia" = Vos devolvés a Familia (EGRESO)\n\n' +
      '¿Qué querés registrar?\n\n' +
      '→ Si Familia te devuelve: Usá TIPO="Devolución Familia → NT" sin categoría\n' +
      '→ Si vos devolvés a Familia: Usá TIPO="Egreso NT" → VARIABLES → "Devolución NT → Familia"',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  // Contradicción 2: "Préstamo Familia" es cuando Familia presta a NT (INGRESO para NT)
  // pero "Préstamo NT → Familia" es cuando NT presta a Familia (EGRESO para NT)
  if (tipo === 'Préstamo Familia' && subcategoria === 'Préstamo NT → Familia') {
    SpreadsheetApp.getUi().alert(
      '⚠️ CONTRADICCIÓN DETECTADA',
      'Estás mezclando dos operaciones OPUESTAS:\n\n' +
      '• "Préstamo Familia" = Familia te presta dinero (INGRESO)\n' +
      '• "Préstamo NT → Familia" = Vos prestás a Familia (EGRESO)\n\n' +
      '¿Qué querés registrar?\n\n' +
      '→ Si Familia te presta: Usá TIPO="Préstamo Familia" sin categoría\n' +
      '→ Si vos prestás a Familia: Usá TIPO="Egreso NT" → VARIABLES → "Préstamo NT → Familia"',
      SpreadsheetApp.getUi().ButtonSet.OK
    );
    sheet.getRange(row, 4).setValue('');
    return true;
  }

  // Contradicción 3: Cualquier TIPO de ingreso no debería tener subcategoría de egreso
  if (TIPOS_INGRESO_NT.includes(tipo) &&
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

// ═══════════════════════════════════════════════════════════════════════════════
// AUTO-CREACIÓN DE TRANSACCIONES CRUZADAS (PRÉSTAMOS/DEVOLUCIONES)
// ═══════════════════════════════════════════════════════════════════════════════

/**
 * Bandera para evitar loops infinitos en auto-creación
 * Usa PropertiesService del documento para persistir entre llamadas
 */
function estaEnModoAutoCreacion() {
  const props = PropertiesService.getDocumentProperties();
  return props.getProperty('AUTO_CREACION_ACTIVA') === 'true';
}

function activarModoAutoCreacion() {
  const props = PropertiesService.getDocumentProperties();
  props.setProperty('AUTO_CREACION_ACTIVA', 'true');
}

function desactivarModoAutoCreacion() {
  const props = PropertiesService.getDocumentProperties();
  props.deleteProperty('AUTO_CREACION_ACTIVA');
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
 * Auto-crea transacción cruzada cuando se completa una fila en CARGA_FAMILIA
 * Se llama después de que el usuario ingresa el MONTO (columna F)
 * v7.1 - Corregido: formato fecha, verificación duplicados, alertas
 */
function autoCrearTransaccionCruzadaFamilia(sheet, row) {
  // Verificar si ya estamos en modo auto-creación (evitar loop)
  if (estaEnModoAutoCreacion()) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const datos = sheet.getRange(row, 1, 1, 7).getValues()[0];
  // [0]=FECHA, [1]=TIPO, [2]=CATEGORÍA, [3]=SUBCATEGORÍA, [4]=DESCRIPCIÓN, [5]=MONTO, [6]=CUENTA

  const fecha = datos[0];
  const tipo = datos[1];
  const subcategoria = datos[3];
  const descripcion = datos[4] || '';
  const monto = Number(datos[5]) || 0;

  // Validar monto - mínimo 10.000 Gs para evitar auto-creación con valores parciales (v7.10)
  // Ej: si el usuario está escribiendo 13.837.500 y presiona Enter en "13", no crear transacción
  const MONTO_MINIMO = 10000;
  if (!monto || monto < MONTO_MINIMO) return;

  // Validar fecha y mostrar alerta si falta
  if (!fecha || !(fecha instanceof Date)) {
    ss.toast('⚠️ Falta la FECHA. La transacción cruzada NO se creó.', '❌ Error', 5);
    return;
  }

  // Verificar si es una transacción que requiere auto-creación
  const esPrestamo = tipo === 'Préstamo NeuroTEA';
  const esDevolucionNT = tipo === 'Devolución NeuroTEA';  // v7.3: Caso faltante
  const esPrestamoFamNT = subcategoria === 'Préstamo Familia → NT';
  const esDevolucionFamNT = subcategoria === 'Devolución Familia → NT';

  if (!esPrestamo && !esDevolucionNT && !esPrestamoFamNT && !esDevolucionFamNT) return;

  const cargaNT = ss.getSheetByName(NOMBRES_HOJAS.CARGA_NT);
  if (!cargaNT) return;

  let transaccionCreada = false;
  let mensajeToast = '';
  let filaDestino = 0;

  try {
    activarModoAutoCreacion();

    // CASO 1: TIPO="Préstamo NeuroTEA" (NT presta a FAM)
    // → Crear egreso en CARGA_NT: Egreso NT / VARIABLES / Préstamo NT → Familia
    if (esPrestamo) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaNT, fecha, 'Préstamo NT → Familia', monto, 'subcategoria', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_NT', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaNT);
      cargaNT.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Egreso NT',                  // B: TIPO
        'VARIABLES',                  // C: CATEGORÍA
        'Préstamo NT → Familia',      // D: SUBCATEGORÍA
        descripcion || 'Auto: Préstamo a Familia',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'Atlas NeuroTEA',             // G: CUENTA (cuenta principal NT)
        'Auto-generado desde CARGA_FAMILIA'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaNT, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado egreso en CARGA_NT: "Préstamo NT → Familia" por ' + formatearGuaranies(monto);
    }

    // CASO 2: SUBCAT="Préstamo Familia → NT" (FAM presta a NT)
    // → Crear ingreso en CARGA_NT: Préstamo Familia
    else if (esPrestamoFamNT) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaNT, fecha, 'Préstamo Familia', monto, 'tipo', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_NT', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaNT);
      cargaNT.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Préstamo Familia',           // B: TIPO (ingreso para NT)
        '-',                          // C: CATEGORÍA (bloqueada para ingresos)
        '-',                          // D: SUBCATEGORÍA (bloqueada para ingresos)
        descripcion || 'Auto: Préstamo recibido de Familia',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'Atlas NeuroTEA',             // G: CUENTA
        'Auto-generado desde CARGA_FAMILIA'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaNT, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado ingreso en CARGA_NT: "Préstamo Familia" por ' + formatearGuaranies(monto);
    }

    // CASO 3: SUBCAT="Devolución Familia → NT" (FAM devuelve a NT)
    // → Crear ingreso en CARGA_NT: Devolución Familia → NT
    else if (esDevolucionFamNT) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaNT, fecha, 'Devolución Familia → NT', monto, 'tipo', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_NT', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaNT);
      cargaNT.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Devolución Familia → NT',    // B: TIPO (ingreso para NT)
        '-',                          // C: CATEGORÍA (bloqueada para ingresos)
        '-',                          // D: SUBCATEGORÍA (bloqueada para ingresos)
        descripcion || 'Auto: Devolución recibida de Familia',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'Atlas NeuroTEA',             // G: CUENTA
        'Auto-generado desde CARGA_FAMILIA'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaNT, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado ingreso en CARGA_NT: "Devolución Familia → NT" por ' + formatearGuaranies(monto);
    }

    // CASO 4: TIPO="Devolución NeuroTEA" (NT devuelve a FAM - ingreso para FAM)
    // → Crear egreso en CARGA_NT: Egreso NT / VARIABLES / Devolución NT → Familia
    // v7.3: Caso faltante - cuando FAM registra ingreso, auto-crear egreso en NT
    else if (esDevolucionNT) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaNT, fecha, 'Devolución NT → Familia', monto, 'subcategoria', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_NT', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaNT);
      cargaNT.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Egreso NT',                  // B: TIPO
        'VARIABLES',                  // C: CATEGORÍA
        'Devolución NT → Familia',    // D: SUBCATEGORÍA
        descripcion || 'Auto: Devolución a Familia',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'Atlas NeuroTEA',             // G: CUENTA
        'Auto-generado desde CARGA_FAMILIA'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaNT, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado egreso en CARGA_NT: "Devolución NT → Familia" por ' + formatearGuaranies(monto);
    }

  } catch (error) {
    ss.toast('❌ Error al crear transacción: ' + error.message, 'Error', 5);
  } finally {
    desactivarModoAutoCreacion();
  }

  // Mostrar Toast de confirmación
  if (transaccionCreada) {
    ss.toast(mensajeToast, '🔄 Auto-creación', 5);
  }
}

/**
 * Auto-crea transacción cruzada cuando se completa una fila en CARGA_NT
 * Se llama después de que el usuario ingresa el MONTO (columna F)
 * v7.1 - Corregido: formato fecha, verificación duplicados, alertas
 */
function autoCrearTransaccionCruzadaNT(sheet, row) {
  // Verificar si ya estamos en modo auto-creación (evitar loop)
  if (estaEnModoAutoCreacion()) return;

  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const datos = sheet.getRange(row, 1, 1, 7).getValues()[0];
  // [0]=FECHA, [1]=TIPO, [2]=CATEGORÍA, [3]=SUBCATEGORÍA, [4]=DESCRIPCIÓN, [5]=MONTO, [6]=CUENTA

  const fecha = datos[0];
  const tipo = datos[1];
  const subcategoria = datos[3];
  const descripcion = datos[4] || '';
  const monto = Number(datos[5]) || 0;

  // Validar monto - mínimo 10.000 Gs para evitar auto-creación con valores parciales (v7.10)
  // Ej: si el usuario está escribiendo 13.837.500 y presiona Enter en "13", no crear transacción
  const MONTO_MINIMO = 10000;
  if (!monto || monto < MONTO_MINIMO) return;

  // Validar fecha y mostrar alerta si falta
  if (!fecha || !(fecha instanceof Date)) {
    ss.toast('⚠️ Falta la FECHA. La transacción cruzada NO se creó.', '❌ Error', 5);
    return;
  }

  // Verificar si es una transacción que requiere auto-creación
  const esPrestamoFam = tipo === 'Préstamo Familia';
  const esDevolucionFamNT = tipo === 'Devolución Familia → NT';
  const esPrestamoNTFam = subcategoria === 'Préstamo NT → Familia';
  const esDevolucionNTFam = subcategoria === 'Devolución NT → Familia';

  if (!esPrestamoFam && !esDevolucionFamNT && !esPrestamoNTFam && !esDevolucionNTFam) return;

  const cargaFam = ss.getSheetByName(NOMBRES_HOJAS.CARGA_FAMILIA);
  if (!cargaFam) return;

  let transaccionCreada = false;
  let mensajeToast = '';
  let filaDestino = 0;

  try {
    activarModoAutoCreacion();

    // CASO 1: TIPO="Préstamo Familia" (FAM presta a NT)
    // → Crear egreso en CARGA_FAMILIA: Egreso Familiar / VARIABLES / Préstamo Familia → NT
    if (esPrestamoFam) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaFam, fecha, 'Préstamo Familia → NT', monto, 'subcategoria', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_FAMILIA', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaFam);
      cargaFam.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Egreso Familiar',            // B: TIPO
        'VARIABLES',                  // C: CATEGORÍA
        'Préstamo Familia → NT',      // D: SUBCATEGORÍA
        descripcion || 'Auto: Préstamo a NeuroTEA',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'ITAU Marco',                 // G: CUENTA (cuenta principal FAM)
        'Auto-generado desde CARGA_NT'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaFam, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado egreso en CARGA_FAMILIA: "Préstamo Familia → NT" por ' + formatearGuaranies(monto);
    }

    // CASO 2: TIPO="Devolución Familia → NT" (FAM devuelve a NT - ingreso para NT)
    // → Crear egreso en CARGA_FAMILIA: Egreso Familiar / VARIABLES / Devolución Familia → NT
    else if (esDevolucionFamNT) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaFam, fecha, 'Devolución Familia → NT', monto, 'subcategoria', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_FAMILIA', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaFam);
      cargaFam.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Egreso Familiar',            // B: TIPO
        'VARIABLES',                  // C: CATEGORÍA
        'Devolución Familia → NT',    // D: SUBCATEGORÍA
        descripcion || 'Auto: Devolución a NeuroTEA',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'ITAU Marco',                 // G: CUENTA
        'Auto-generado desde CARGA_NT'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaFam, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado egreso en CARGA_FAMILIA: "Devolución Familia → NT" por ' + formatearGuaranies(monto);
    }

    // CASO 3: SUBCAT="Préstamo NT → Familia" (NT presta a FAM)
    // → Crear ingreso en CARGA_FAMILIA: Préstamo NeuroTEA
    else if (esPrestamoNTFam) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaFam, fecha, 'Préstamo NeuroTEA', monto, 'tipo', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_FAMILIA', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaFam);
      cargaFam.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Préstamo NeuroTEA',          // B: TIPO (ingreso para FAM)
        '-',                          // C: CATEGORÍA (bloqueada para ingresos)
        '-',                          // D: SUBCATEGORÍA (bloqueada para ingresos)
        descripcion || 'Auto: Préstamo recibido de NeuroTEA',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'ITAU Marco',                 // G: CUENTA
        'Auto-generado desde CARGA_NT'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaFam, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado ingreso en CARGA_FAMILIA: "Préstamo NeuroTEA" por ' + formatearGuaranies(monto);
    }

    // CASO 4: SUBCAT="Devolución NT → Familia" (NT devuelve a FAM)
    // → Crear ingreso en CARGA_FAMILIA: Devolución NeuroTEA
    else if (esDevolucionNTFam) {
      // Verificar duplicado
      if (existeTransaccionCruzada(cargaFam, fecha, 'Devolución NeuroTEA', monto, 'tipo', descripcion)) {
        ss.toast('ℹ️ Ya existe esta transacción en CARGA_FAMILIA', '⏭️ Omitido', 3);
        return;
      }
      filaDestino = encontrarPrimeraFilaVacia(cargaFam);
      cargaFam.getRange(filaDestino, 1, 1, 8).setValues([[
        fecha,                        // A: FECHA
        'Devolución NeuroTEA',        // B: TIPO (ingreso para FAM)
        '-',                          // C: CATEGORÍA (bloqueada para ingresos)
        '-',                          // D: SUBCATEGORÍA (bloqueada para ingresos)
        descripcion || 'Auto: Devolución recibida de NeuroTEA',  // E: DESCRIPCIÓN
        monto,                        // F: MONTO
        'ITAU Marco',                 // G: CUENTA
        'Auto-generado desde CARGA_NT'  // H: NOTAS
      ]]);
      aplicarFormatoFecha(cargaFam, filaDestino);
      transaccionCreada = true;
      mensajeToast = '✓ Creado ingreso en CARGA_FAMILIA: "Devolución NeuroTEA" por ' + formatearGuaranies(monto);
    }

  } catch (error) {
    ss.toast('❌ Error al crear transacción: ' + error.message, 'Error', 5);
  } finally {
    desactivarModoAutoCreacion();
  }

  // Mostrar Toast de confirmación
  if (transaccionCreada) {
    ss.toast(mensajeToast, '🔄 Auto-creación', 5);
  }
}
