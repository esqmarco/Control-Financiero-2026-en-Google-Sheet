/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WEBAPP.GS - DASHBOARD HTML/CSS PROFESIONAL
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 6.3 - Préstamos bidireccionales NT↔FAM, GANANCIA consistente
 * ═══════════════════════════════════════════════════════════════════════════════
 */

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIONES AUXILIARES PARA GENERAR HTML DINÁMICO
// ═══════════════════════════════════════════════════════════════════════════════

function generarFilasCuentasFamilia(cuentas) {
  var html = '';
  for (var i = 0; i < cuentas.length; i++) {
    var c = cuentas[i];
    var esperadoClass = c.esperado < 0 ? 'text-red' : '';
    var difClass = c.diferencia > 0 ? 'text-green' : (c.diferencia < 0 ? 'text-red' : 'text-gray');
    var difText = c.diferencia !== 0 ? ((c.diferencia > 0 ? '+' : '') + formatearGuaranies(c.diferencia)) : '-';
    html += '<tr>';
    html += '<td>' + c.nombre + '</td>';
    html += '<td class="text-right ' + esperadoClass + '">' + formatearGuaranies(c.esperado) + '</td>';
    html += '<td class="text-right text-blue font-bold">' + formatearGuaranies(c.real) + '</td>';
    html += '<td class="text-right ' + difClass + ' font-bold">' + difText + '</td>';
    html += '</tr>';
  }
  return html;
}

function generarFilasPresupuestoFamilia(categorias) {
  var html = '';
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var pct = cat.presupuesto > 0 ? Math.round(cat.real / cat.presupuesto * 100) : 0;
    var isIngreso = cat.categoria.toUpperCase().indexOf('INGRESO') >= 0;
    var badgeClass = 'badge-green';
    if (isIngreso) {
      badgeClass = pct >= 100 ? 'badge-green' : (pct >= 90 ? 'badge-yellow' : 'badge-red');
    } else {
      badgeClass = pct <= 100 ? 'badge-green' : (pct <= 110 ? 'badge-yellow' : 'badge-red');
    }
    html += '<tr>';
    html += '<td class="font-bold">► ' + cat.categoria + '</td>';
    html += '<td class="text-right">' + formatearGuaranies(cat.presupuesto) + '</td>';
    html += '<td class="text-right">' + formatearGuaranies(cat.real) + '</td>';
    html += '<td class="text-center"><span class="badge ' + badgeClass + '">' + pct + '%</span></td>';
    html += '</tr>';
  }
  return html;
}

function generarFilasLiquidez(semanas) {
  var html = '';
  for (var i = 0; i < semanas.length; i++) {
    var sem = semanas[i];
    var bgColor = i % 2 === 0 ? '#ffffff' : '#ecfdf5';
    var saldoClass = sem.saldo < 0 ? 'text-red' : '';
    var badgeClass = sem.saldo >= 0 ? 'badge-solid-green' : 'badge-solid-red';
    var badgeText = sem.saldo >= 0 ? 'OK' : 'FALTA';
    var gastosText = sem.gastos > 0 ? ('-' + formatearGuaranies(sem.gastos)) : '-';
    html += '<tr style="background: ' + bgColor + '">';
    html += '<td>' + sem.nombre + '</td>';
    html += '<td class="text-right">' + gastosText + '</td>';
    html += '<td class="text-right font-bold ' + saldoClass + '">' + formatearGuaranies(sem.saldo) + '</td>';
    html += '<td class="text-center"><span class="badge ' + badgeClass + '">' + badgeText + '</span></td>';
    html += '</tr>';
  }
  return html;
}

function generarFilasPresupuestoNT(categorias) {
  var html = '';
  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var pct = cat.presupuesto > 0 ? Math.round(cat.real / cat.presupuesto * 100) : 0;
    var isIngreso = cat.categoria.toUpperCase().indexOf('INGRESO') >= 0;
    var isGanancia = cat.categoria.toUpperCase().indexOf('GANANCIA') >= 0;
    var badgeClass = 'badge-green';
    if (isIngreso || isGanancia) {
      badgeClass = pct >= 100 ? 'badge-green' : (pct >= 90 ? 'badge-yellow' : 'badge-red');
    } else {
      badgeClass = pct <= 100 ? 'badge-green' : (pct <= 110 ? 'badge-yellow' : 'badge-red');
    }
    html += '<tr>';
    html += '<td class="font-bold">► ' + cat.categoria + '</td>';
    html += '<td class="text-right">' + formatearGuaranies(cat.presupuesto) + '</td>';
    html += '<td class="text-right">' + formatearGuaranies(cat.real) + '</td>';
    html += '<td class="text-center"><span class="badge ' + badgeClass + '">' + pct + '%</span></td>';
    html += '</tr>';
  }
  return html;
}

function generarFilasCuentasNT(cuentas) {
  var html = '';
  for (var i = 0; i < cuentas.length; i++) {
    var c = cuentas[i];
    var bgColor = i % 2 === 0 ? '#eff6ff' : '#ffffff';
    var badgeClass = c.saldo >= c.acumulado ? 'badge-green' : 'badge-yellow';
    var badgeText = c.saldo >= c.acumulado ? '✓' : '⚠';
    html += '<tr style="background: ' + bgColor + '">';
    html += '<td>' + c.nombre + '</td>';
    html += '<td class="text-right text-blue font-bold">' + formatearGuaranies(c.saldo) + '</td>';
    html += '<td class="text-right">' + formatearGuaranies(c.acumulado) + '</td>';
    html += '<td class="text-center"><span class="badge ' + badgeClass + '">' + badgeText + '</span></td>';
    html += '</tr>';
  }
  return html;
}

function generarAlertaBalanceCruzado(datos) {
  var saldo = datos.balanceCruzado.balanceNeto || 0;
  if (saldo > 0) {
    // FAMILIA debe a NT (NT ha prestado más de lo que FAM devolvió)
    return '<div class="alert-icon">🔴</div>' +
           '<div class="alert-title">FAMILIA DEBE A NT</div>' +
           '<div class="alert-value">Gs. ' + formatearGuaranies(saldo) + '</div>' +
           '<div class="alert-desc">NeuroTEA ha prestado más a Familia de lo que Familia ha devuelto.</div>';
  } else if (saldo < 0) {
    // NT debe a FAMILIA (FAM ha prestado más de lo que NT devolvió)
    return '<div class="alert-icon">🟡</div>' +
           '<div class="alert-title">NT DEBE A FAMILIA</div>' +
           '<div class="alert-value">Gs. ' + formatearGuaranies(Math.abs(saldo)) + '</div>' +
           '<div class="alert-desc">Familia ha prestado más a NeuroTEA de lo que NT ha devuelto.</div>';
  } else {
    return '<div class="alert-icon">✅</div>' +
           '<div class="alert-title">BALANCE EQUILIBRADO</div>' +
           '<div class="alert-value">Gs. 0</div>' +
           '<div class="alert-desc">No hay deudas pendientes entre entidades.</div>';
  }
}

function generarMesesOptions() {
  var html = '';
  for (var i = 0; i < MESES.length; i++) {
    html += '<option>' + MESES[i] + ' ' + AÑO + '</option>';
  }
  return html;
}

function generarTortaGastos(categorias, tipo) {
  // Filtrar solo categorías de egresos (no ingresos, no balance)
  var gastos = [];
  var total = 0;
  var colores = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#3b82f6', '#6b7280', '#ec4899', '#06b6d4'];

  for (var i = 0; i < categorias.length; i++) {
    var cat = categorias[i];
    var nombre = cat.categoria.toUpperCase();
    // Excluir ingresos y totales
    if (nombre.indexOf('INGRESO') === -1 && nombre.indexOf('BALANCE') === -1 && nombre.indexOf('GANANCIA') === -1) {
      if (cat.real > 0) {
        gastos.push({ nombre: cat.categoria, valor: cat.real });
        total += cat.real;
      }
    }
  }

  if (total === 0 || gastos.length === 0) {
    return '<div style="text-align:center;padding:40px;color:#6b7280">Sin gastos registrados</div>';
  }

  // Generar SVG de la torta
  var svgSize = 160;
  var cx = svgSize / 2;
  var cy = svgSize / 2;
  var radius = 60;
  var startAngle = -90;

  var svg = '<svg class="chart-svg" viewBox="0 0 ' + svgSize + ' ' + svgSize + '">';

  for (var j = 0; j < gastos.length; j++) {
    var gasto = gastos[j];
    var pct = gasto.valor / total;
    var angle = pct * 360;
    var color = colores[j % colores.length];

    var endAngle = startAngle + angle;
    var largeArc = angle > 180 ? 1 : 0;

    var x1 = cx + radius * Math.cos(startAngle * Math.PI / 180);
    var y1 = cy + radius * Math.sin(startAngle * Math.PI / 180);
    var x2 = cx + radius * Math.cos(endAngle * Math.PI / 180);
    var y2 = cy + radius * Math.sin(endAngle * Math.PI / 180);

    if (gastos.length === 1) {
      // Si solo hay un segmento, dibujar un círculo completo
      svg += '<circle cx="' + cx + '" cy="' + cy + '" r="' + radius + '" fill="' + color + '"/>';
    } else {
      svg += '<path d="M' + cx + ',' + cy + ' L' + x1 + ',' + y1 + ' A' + radius + ',' + radius + ' 0 ' + largeArc + ',1 ' + x2 + ',' + y2 + ' Z" fill="' + color + '"/>';
    }

    startAngle = endAngle;
  }

  svg += '</svg>';

  // Generar leyenda
  var leyenda = '<div class="chart-legend">';
  for (var k = 0; k < gastos.length; k++) {
    var g = gastos[k];
    var pctLeyenda = Math.round(g.valor / total * 100);
    var colorL = colores[k % colores.length];
    leyenda += '<div class="chart-legend-item">';
    leyenda += '<div class="chart-legend-color" style="background:' + colorL + '"></div>';
    leyenda += '<span>' + g.nombre + ' (' + pctLeyenda + '%)</span>';
    leyenda += '</div>';
  }
  leyenda += '</div>';

  return svg + leyenda;
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIÓN PRINCIPAL: GENERAR HTML DEL DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

function generarHTMLDashboard() {
  var datos = obtenerDatosDashboard();

  // Calcular valores derivados
  var pctGastosNT = datos.neurotea.ingresos > 0 ? Math.round(datos.neurotea.gastos / datos.neurotea.ingresos * 100) : 0;
  var progressClass = pctGastosNT > 93 ? 'danger' : '';
  var metaCumplida = datos.neurotea.ganancia >= datos.neurotea.meta;
  var totalAcumuladoNT = 0;
  for (var i = 0; i < datos.cuentasNT.length; i++) {
    totalAcumuladoNT += datos.cuentasNT[i].acumulado;
  }

  // Meta distribución
  // v7.6: Los porcentajes se leen de datos.metas (desde CONFIG)
  var metaFondo = Math.round(datos.distribucion.metaTotal * datos.metas.distUtilidad / 100);
  var metaFondoEmerg = Math.round(datos.distribucion.metaTotal * datos.metas.distEmergencia / 100);
  var metaFondoInv = Math.round(datos.distribucion.metaTotal * datos.metas.distInversion / 100);

  return '<!DOCTYPE html>' +
'<html lang="es">' +
'<head>' +
'  <meta charset="UTF-8">' +
'  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
'  <title>Control Financiero ' + AÑO + ' - NeuroTEA & Familia</title>' +
'  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">' +
'  <style>' +
'    * { margin: 0; padding: 0; box-sizing: border-box; }' +
'    body { font-family: "Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif; background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%); min-height: 100vh; }' +
'    .header { background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1d4ed8 100%); color: white; padding: 20px 30px; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3); }' +
'    .header h1 { font-size: 1.8em; font-weight: 700; display: flex; align-items: center; gap: 12px; }' +
'    .header-controls { display: flex; align-items: center; gap: 25px; }' +
'    .header select { padding: 10px 20px; border: none; border-radius: 8px; font-weight: 600; font-size: 1em; cursor: pointer; background: white; color: #1e40af; }' +
'    .header .date { font-size: 0.95em; opacity: 0.9; }' +
'    .header .date strong { font-weight: 600; }' +
'    .main { display: grid; grid-template-columns: 1fr 1fr; gap: 25px; padding: 25px; max-width: 1600px; margin: 0 auto; }' +
'    .column { display: flex; flex-direction: column; gap: 20px; }' +
'    .column-header { text-align: center; padding: 15px; border-radius: 12px 12px 0 0; font-weight: 700; font-size: 1.3em; color: white; display: flex; align-items: center; justify-content: center; gap: 10px; box-shadow: 0 4px 15px rgba(0,0,0,0.15); }' +
'    .familia .column-header { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }' +
'    .neurotea .column-header { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); }' +
'    .card { background: white; border-radius: 12px; padding: 20px; box-shadow: 0 4px 15px rgba(0,0,0,0.08); transition: transform 0.2s, box-shadow 0.2s; }' +
'    .card:hover { transform: translateY(-2px); box-shadow: 0 8px 25px rgba(0,0,0,0.12); }' +
'    .card-title { font-weight: 700; font-size: 1.05em; border-bottom: 2px solid #e5e7eb; padding-bottom: 10px; margin-bottom: 15px; display: flex; align-items: center; gap: 8px; }' +
'    .familia .card-title { color: #059669; }' +
'    .neurotea .card-title { color: #1d4ed8; }' +
'    table { width: 100%; border-collapse: collapse; font-size: 0.9em; }' +
'    th { background: #f8fafc; padding: 12px 10px; text-align: left; font-weight: 600; color: #475569; border-bottom: 2px solid #e2e8f0; }' +
'    td { padding: 10px; border-bottom: 1px solid #f1f5f9; transition: background 0.2s; }' +
'    tr:hover td { background: #f8fafc; }' +
'    .familia th { background: #ecfdf5; }' +
'    .neurotea th { background: #eff6ff; }' +
'    .text-right { text-align: right; }' +
'    .text-center { text-align: center; }' +
'    .font-bold { font-weight: 600; }' +
'    .text-green { color: #059669; }' +
'    .text-red { color: #dc2626; }' +
'    .text-yellow { color: #d97706; }' +
'    .text-blue { color: #2563eb; }' +
'    .text-gray { color: #6b7280; }' +
'    .badge { display: inline-block; padding: 4px 12px; border-radius: 20px; font-size: 0.8em; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; }' +
'    .badge-green { background: #dcfce7; color: #166534; }' +
'    .badge-red { background: #fef2f2; color: #991b1b; }' +
'    .badge-yellow { background: #fef3c7; color: #92400e; }' +
'    .badge-solid-green { background: #22c55e; color: white; }' +
'    .badge-solid-red { background: #ef4444; color: white; }' +
'    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }' +
'    .kpi-box { padding: 15px; border-radius: 10px; transition: transform 0.2s; }' +
'    .kpi-box:hover { transform: scale(1.02); }' +
'    .kpi-label { font-size: 0.75em; color: #64748b; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 5px; }' +
'    .kpi-value { font-size: 1.5em; font-weight: 700; }' +
'    .progress-container { margin: 15px 0; }' +
'    .progress-bar { height: 24px; background: #e5e7eb; border-radius: 12px; overflow: hidden; position: relative; }' +
'    .progress-fill { height: 100%; background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%); border-radius: 12px; transition: width 0.5s ease; }' +
'    .progress-fill.danger { background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%); }' +
'    .progress-text { position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%); font-weight: 600; font-size: 0.85em; color: white; text-shadow: 0 1px 2px rgba(0,0,0,0.2); }' +
'    .flujo-container { display: flex; flex-direction: column; gap: 8px; }' +
'    .flujo-item { display: flex; justify-content: space-between; align-items: center; padding: 12px 15px; border-radius: 8px; transition: transform 0.2s; }' +
'    .flujo-item:hover { transform: translateX(5px); }' +
'    .flujo-ingresos { background: #dcfce7; }' +
'    .flujo-pagados { background: #fef2f2; }' +
'    .flujo-pendientes { background: #fef3c7; }' +
'    .flujo-balance { padding: 15px; border-radius: 10px; color: white; font-weight: 700; }' +
'    .flujo-balance.familia { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }' +
'    .flujo-balance.neurotea { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); }' +
'    .fondos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }' +
'    .fondo-box { padding: 15px; border-radius: 10px; text-align: center; transition: transform 0.2s; }' +
'    .fondo-box:hover { transform: scale(1.03); }' +
'    .fondo-box.utilidad { background: #dbeafe; }' +
'    .fondo-box.emergencia { background: #ffedd5; }' +
'    .fondo-box.inversion { background: #cffafe; }' +
'    .fondo-label { font-size: 0.8em; color: #64748b; margin-bottom: 5px; }' +
'    .fondo-meta { font-weight: 700; font-size: 1.1em; }' +
'    .fondo-real { font-size: 0.85em; margin-top: 5px; }' +
'    .fondo-real.ok { color: #059669; }' +
'    .fondo-real.warning { color: #d97706; }' +
'    .balance-section { background: linear-gradient(135deg, #1f2937 0%, #374151 50%, #1f2937 100%); color: white; padding: 25px; border-radius: 15px; grid-column: 1 / -1; margin-top: 10px; box-shadow: 0 8px 30px rgba(31, 41, 55, 0.3); }' +
'    .balance-section h3 { text-align: center; margin-bottom: 20px; font-size: 1.3em; display: flex; align-items: center; justify-content: center; gap: 10px; }' +
'    .balance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }' +
'    .balance-table { background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }' +
'    .balance-table th { background: rgba(0,0,0,0.2); color: white; }' +
'    .balance-table td { border-color: rgba(255,255,255,0.1); }' +
'    .balance-table tr:hover td { background: rgba(255,255,255,0.05); }' +
'    .alert-box { background: rgba(255,255,255,0.15); border: 2px solid rgba(255,255,255,0.3); border-radius: 15px; padding: 30px; text-align: center; backdrop-filter: blur(10px); }' +
'    .alert-icon { font-size: 4em; margin-bottom: 10px; }' +
'    .alert-title { font-size: 1.3em; margin-bottom: 10px; font-weight: 600; }' +
'    .alert-value { font-size: 2.5em; font-weight: 700; margin-bottom: 15px; }' +
'    .alert-desc { font-size: 0.95em; opacity: 0.9; line-height: 1.5; }' +
'    .footer { text-align: center; padding: 25px; color: #64748b; font-size: 0.85em; border-top: 1px solid #e2e8f0; background: white; }' +
'    .footer .version { font-weight: 600; color: #475569; }' +
'    @media (max-width: 1200px) { .main { grid-template-columns: 1fr; } .balance-grid { grid-template-columns: 1fr; } }' +
'  </style>' +
'</head>' +
'<body>' +
'  <div class="header">' +
'    <h1>📊 TABLERO DE CONTROL FINANCIERO</h1>' +
'    <div class="header-controls">' +
'      <div><span>Mes:</span> <select id="mes">' + generarMesesOptions() + '</select></div>' +
'      <div class="date">Hoy: <strong>' + new Date().toLocaleDateString('es-PY') + '</strong></div>' +
'    </div>' +
'  </div>' +
'  <div class="main">' +
'    <!-- COLUMNA FAMILIA -->' +
'    <div class="column familia">' +
'      <div class="column-header">🏠 FAMILIA</div>' +
'      <!-- 1. SALDOS EN CUENTAS -->' +
'      <div class="card">' +
'        <div class="card-title">💰 SALDOS EN CUENTAS</div>' +
'        <table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Saldo Banco ✏️</th><th class="text-right">Diferencia</th></tr></thead>' +
'        <tbody>' + generarFilasCuentasFamilia(datos.cuentasFamilia) + '</tbody></table>' +
'        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>' +
'      </div>' +
'      <!-- 2. INDICADORES DE DISTRIBUCIÓN -->' +
'      <div class="card">' +
'        <div class="card-title">🎯 INDICADORES DE DISTRIBUCIÓN</div>' +
'        <div class="kpi-grid">' +
'          <div class="kpi-box" style="background:#dbeafe"><div class="kpi-label">💵 INGRESOS DEL MES</div><div class="kpi-value text-blue">' + formatearGuaranies(datos.familia.ingresosReal) + '</div></div>' +
'          <div class="kpi-box" style="background:#fee2e2"><div class="kpi-label">📤 EGRESOS PAGADOS</div><div class="kpi-value text-red">' + formatearGuaranies(datos.familia.egresosReal) + '</div></div>' +
'          <div class="kpi-box" style="background:#dcfce7"><div class="kpi-label">💰 AHORRO</div><div class="kpi-value text-green">' + formatearGuaranies(datos.indicadoresFam.ahorro) + '</div></div>' +
'          <div class="kpi-box" style="background:#fef3c7"><div class="kpi-label">🛡️ FONDO EMERGENCIA</div><div class="kpi-value text-yellow">' + formatearGuaranies(datos.indicadoresFam.fondoEmergencia) + '</div></div>' +
'        </div>' +
'        <div style="text-align:center;margin-top:15px;padding:12px;border-radius:8px;background:#f3f4f6">' +
         (function() {
           var diff = datos.familia.ingresosReal - (datos.familia.egresosReal + datos.indicadoresFam.ahorro + datos.indicadoresFam.fondoEmergencia);
           if (Math.abs(diff) < 1000) {
             return '<span class="badge badge-solid-green">✅ EQUILIBRADO: Ingresos distribuidos correctamente</span>';
           } else if (diff > 0) {
             return '<span class="badge badge-yellow">💰 DISPONIBLE: Gs. ' + formatearGuaranies(diff) + ' sin asignar</span>';
           } else {
             return '<span class="badge badge-solid-red">⚠️ DÉFICIT: Gs. ' + formatearGuaranies(Math.abs(diff)) + ' de más pagado</span>';
           }
         })() +
'        </div>' +
'      </div>' +
'      <!-- 3. FLUJO DE CAJA DEL MES -->' +
'      <div class="card">' +
'        <div class="card-title">💵 FLUJO DE CAJA DEL MES</div>' +
'        <div class="flujo-container">' +
'          <div class="flujo-item flujo-ingresos"><span>Ingresos</span><span class="font-bold text-green">+ ' + formatearGuaranies(datos.familia.ingresosReal) + '</span></div>' +
'          <div class="flujo-item flujo-pagados"><span>Egresos Pagados</span><span class="font-bold text-red">- ' + formatearGuaranies(datos.familia.egresosReal) + '</span></div>' +
'          <div class="flujo-item flujo-pendientes"><span>Egresos Pendientes</span><span class="font-bold text-yellow">- ' + formatearGuaranies(datos.familia.egresosPendientes) + '</span></div>' +
'          <div class="flujo-balance familia"><span>PROYECCIÓN</span><span>' + formatearGuaranies(datos.familia.ingresosReal - datos.familia.egresosReal - datos.familia.egresosPendientes) + '</span></div>' +
'        </div>' +
'      </div>' +
'      <!-- 4. % GASTOS POR CATEGORÍA -->' +
'      <div class="card">' +
'        <div class="card-title">📊 % GASTOS POR CATEGORÍA</div>' +
'        <div class="chart-container">' +
           generarTortaGastos(datos.presupuestoFamilia, 'familia') +
'        </div>' +
'      </div>' +
'    </div>' +
'    <!-- COLUMNA NEUROTEA -->' +
'    <div class="column neurotea">' +
'      <div class="column-header">🏥 NEUROTEA</div>' +
'      <!-- 1. SALDOS EN CUENTAS (PRIMERO) -->' +
'      <div class="card">' +
'        <div class="card-title">💰 SALDOS EN CUENTAS</div>' +
'        <table><thead><tr><th>Cuenta</th><th class="text-right">Saldo ✏️</th><th class="text-right">Acumulado</th><th class="text-center">Estado</th></tr></thead>' +
'        <tbody>' + generarFilasCuentasNT(datos.cuentasNT) + '</tbody>' +
'        <tfoot><tr style="background: #e5e7eb;">' +
'          <td class="font-bold">💵 TOTAL DISPONIBLE</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(datos.totalCuentasNT) + '</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(totalAcumuladoNT) + '</td>' +
'          <td class="text-center">-</td>' +
'        </tr></tfoot></table>' +
'        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>' +
'      </div>' +
'      <!-- 2. INDICADORES DE METAS -->' +
'      <div class="card">' +
'        <div class="card-title">🎯 INDICADORES DE METAS</div>' +
'        <div class="kpi-grid">' +
'          <div class="kpi-box" style="background:#dbeafe"><div class="kpi-label">💵 INGRESOS DEL MES</div><div class="kpi-value text-blue">' + formatearGuaranies(datos.neurotea.ingresos) + '</div></div>' +
'          <div class="kpi-box" style="background:#fee2e2"><div class="kpi-label">📤 EGRESOS PAGADOS</div><div class="kpi-value text-red">' + formatearGuaranies(datos.neurotea.gastos) + '</div></div>' +
'          <div class="kpi-box" style="background:#fef3c7"><div class="kpi-label">⏳ EGRESOS PENDIENTES</div><div class="kpi-value text-yellow">' + formatearGuaranies(datos.neurotea.egresosPendientes) + '</div></div>' +
'          <div class="kpi-box" style="background:#f3f4f6"><div class="kpi-label">📊 PROYECCIÓN FIN MES</div><div class="kpi-value">' + formatearGuaranies(datos.neurotea.ingresos - datos.neurotea.gastos - datos.neurotea.egresosPendientes) + '</div></div>' +
'        </div>' +
'        <div style="margin-top:12px">' +
'          <div class="kpi-grid">' +
'            <div class="kpi-box" style="background:#dcfce7"><div class="kpi-label">💰 GANANCIA REAL</div><div class="kpi-value text-green">' + formatearGuaranies(datos.neurotea.ganancia) + '</div></div>' +
'            <div class="kpi-box" style="background:#fef3c7"><div class="kpi-label">🎯 META ' + datos.metas.ganancia + '%</div><div class="kpi-value text-yellow">' + formatearGuaranies(datos.neurotea.meta) + '</div></div>' +
'          </div>' +
'        </div>' +
'        <div class="progress-container">' +
'          <div style="display:flex;justify-content:space-between;font-size:0.9em;margin-bottom:8px"><span>% Gastos sobre Ingresos</span><span class="font-bold">' + pctGastosNT + '% / ' + datos.metas.maxGastos + '% máx</span></div>' +
'          <div class="progress-bar"><div class="progress-fill ' + progressClass + '" style="width:' + Math.min(pctGastosNT, 100) + '%"></div><span class="progress-text">' + pctGastosNT + '%</span></div>' +
'        </div>' +
'        <div style="text-align:center;margin:15px 0">' +
           (metaCumplida
             ? '<span class="badge badge-solid-green" style="padding:10px 25px;font-size:1em">✅ META CUMPLIDA - Superávit: ' + formatearGuaranies(datos.neurotea.ganancia - datos.neurotea.meta) + '</span>'
             : '<span class="badge badge-solid-red" style="padding:10px 25px;font-size:1em">⚠️ META NO CUMPLIDA - Falta: ' + formatearGuaranies(datos.neurotea.meta - datos.neurotea.ganancia) + '</span>') +
'        </div>' +
'        <div style="border-top:1px solid #e5e7eb;padding-top:15px;margin-top:15px">' +
'          <div class="font-bold" style="margin-bottom:12px">Distribución de Ganancia (Meta: ' + formatearGuaranies(datos.distribucion.metaTotal) + ')</div>' +
'          <div class="fondos-grid">' +
'            <div class="fondo-box utilidad"><div class="fondo-label" style="color:#1d4ed8">Utilidad Dueño (' + datos.metas.distUtilidad + '%)</div><div class="fondo-meta">' + formatearGuaranies(metaFondo) + '</div><div class="fondo-real ' + (datos.distribucion.utilidad >= metaFondo ? 'ok' : 'warning') + '">' + (datos.distribucion.utilidad >= metaFondo ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.utilidad) + '</div></div>' +
'            <div class="fondo-box emergencia"><div class="fondo-label" style="color:#ea580c">Fondo Emerg. (' + datos.metas.distEmergencia + '%)</div><div class="fondo-meta">' + formatearGuaranies(metaFondoEmerg) + '</div><div class="fondo-real ' + (datos.distribucion.emergencia >= metaFondoEmerg ? 'ok' : 'warning') + '">' + (datos.distribucion.emergencia >= metaFondoEmerg ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.emergencia) + '</div></div>' +
'            <div class="fondo-box inversion"><div class="fondo-label" style="color:#0891b2">Fondo Inversión (' + datos.metas.distInversion + '%)</div><div class="fondo-meta">' + formatearGuaranies(metaFondoInv) + '</div><div class="fondo-real ' + (datos.distribucion.inversion >= metaFondoInv ? 'ok' : 'warning') + '">' + (datos.distribucion.inversion >= metaFondoInv ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.inversion) + '</div></div>' +
'          </div>' +
'        </div>' +
'      </div>' +
'      <!-- 3. FLUJO DE CAJA DEL MES NT -->' +
'      <div class="card">' +
'        <div class="card-title">💵 FLUJO DE CAJA DEL MES</div>' +
'        <div class="flujo-container">' +
'          <div class="flujo-item flujo-ingresos"><span>Ingresos</span><span class="font-bold text-green">+ ' + formatearGuaranies(datos.neurotea.ingresos) + '</span></div>' +
'          <div class="flujo-item flujo-pagados"><span>Gastos Pagados</span><span class="font-bold text-red">- ' + formatearGuaranies(datos.neurotea.gastos) + '</span></div>' +
'          <div class="flujo-item flujo-pendientes"><span>Egresos Pendientes</span><span class="font-bold text-yellow">- ' + formatearGuaranies(datos.neurotea.egresosPendientes) + '</span></div>' +
'          <div class="flujo-balance neurotea"><span>PROYECCIÓN</span><span>' + formatearGuaranies(datos.neurotea.ingresos - datos.neurotea.gastos - datos.neurotea.egresosPendientes) + '</span></div>' +
'        </div>' +
'      </div>' +
'      <!-- 4. % GASTOS POR CATEGORÍA NT -->' +
'      <div class="card">' +
'        <div class="card-title">📊 % GASTOS POR CATEGORÍA</div>' +
'        <div class="chart-container">' +
           generarTortaGastos(datos.presupuestoNT, 'neurotea') +
'        </div>' +
'      </div>' +
'    </div>' +
'    <!-- BALANCE CRUZADO BIDIRECCIONAL -->' +
'    <div class="balance-section">' +
'      <h3>🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA</h3>' +
'      <div class="balance-grid">' +
'        <table class="balance-table"><thead><tr><th>Concepto</th><th class="text-right">Este Mes</th><th class="text-right">Acumulado Año</th></tr></thead>' +
'        <tbody>' +
'          <tr style="background:rgba(255,255,255,0.05)"><td colspan="3" class="font-bold" style="color:#fca5a5">↗️ FLUJO NT → FAMILIA</td></tr>' +
'          <tr><td>Préstamo NT → Familia</td><td class="text-right" style="color:#fca5a5">' + (datos.balanceCruzado.prestamoNTMes > 0 ? formatearGuaranies(datos.balanceCruzado.prestamoNTMes) : '-') + '</td><td class="text-right font-bold" style="color:#fca5a5">' + formatearGuaranies(datos.balanceCruzado.prestamoNTAcum) + '</td></tr>' +
'          <tr><td>Devolución Familia → NT</td><td class="text-right" style="color:#86efac">' + (datos.balanceCruzado.devFamMes > 0 ? formatearGuaranies(datos.balanceCruzado.devFamMes) : '-') + '</td><td class="text-right font-bold" style="color:#86efac">' + formatearGuaranies(datos.balanceCruzado.devFamAcum) + '</td></tr>' +
'          <tr style="background:rgba(0,0,0,0.1)"><td class="font-bold">📊 Deuda FAM → NT</td><td class="text-right font-bold">' + formatearGuaranies(datos.balanceCruzado.deudaFamMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(datos.balanceCruzado.deudaFamAcum) + '</td></tr>' +
'          <tr style="background:rgba(255,255,255,0.05)"><td colspan="3" class="font-bold" style="color:#fde68a">↗️ FLUJO FAM → NT</td></tr>' +
'          <tr><td>Préstamo Familia → NT</td><td class="text-right" style="color:#fde68a">' + (datos.balanceCruzado.prestamoFamMes > 0 ? formatearGuaranies(datos.balanceCruzado.prestamoFamMes) : '-') + '</td><td class="text-right font-bold" style="color:#fde68a">' + formatearGuaranies(datos.balanceCruzado.prestamoFamAcum) + '</td></tr>' +
'          <tr><td>Devolución NT → Familia</td><td class="text-right" style="color:#86efac">' + (datos.balanceCruzado.devNTMes > 0 ? formatearGuaranies(datos.balanceCruzado.devNTMes) : '-') + '</td><td class="text-right font-bold" style="color:#86efac">' + formatearGuaranies(datos.balanceCruzado.devNTAcum) + '</td></tr>' +
'          <tr style="background:rgba(0,0,0,0.1)"><td class="font-bold">📊 Deuda NT → FAM</td><td class="text-right font-bold">' + formatearGuaranies(datos.balanceCruzado.deudaNTMes) + '</td><td class="text-right font-bold">' + formatearGuaranies(datos.balanceCruzado.deudaNTAcum) + '</td></tr>' +
'        </tbody>' +
'        <tfoot><tr style="background:rgba(0,0,0,0.3)">' +
'          <td class="font-bold">💰 BALANCE NETO</td>' +
'          <td class="text-right font-bold" style="color:' + (datos.balanceCruzado.balanceNetoMes > 0 ? '#fca5a5' : (datos.balanceCruzado.balanceNetoMes < 0 ? '#fde68a' : '#86efac')) + '">' + formatearGuaranies(datos.balanceCruzado.balanceNetoMes) + '</td>' +
'          <td class="text-right font-bold" style="color:' + (datos.balanceCruzado.balanceNeto > 0 ? '#fca5a5' : (datos.balanceCruzado.balanceNeto < 0 ? '#fde68a' : '#86efac')) + '">' + formatearGuaranies(datos.balanceCruzado.balanceNeto) + '</td>' +
'        </tr></tfoot></table>' +
'        <div class="alert-box">' + generarAlertaBalanceCruzado(datos) + '</div>' +
'      </div>' +
'    </div>' +
'  </div>' +
'  <div class="footer">' +
'    <p>Control Financiero ' + AÑO + ' - NeuroTEA & Familia</p>' +
'    <p class="version">Versión ' + VERSION + '</p>' +
'    <p style="margin-top:5px">✏️ = Campo de ingreso manual | 🔗 = Calculado automáticamente</p>' +
'  </div>' +
'</body>' +
'</html>';
}

// ═══════════════════════════════════════════════════════════════════════════════
// FUNCIÓN PARA OBTENER DATOS DEL DASHBOARD
// Calcula posiciones dinámicamente basándose en la estructura del TABLERO
// ═══════════════════════════════════════════════════════════════════════════════

function obtenerDatosDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  var movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);
  var config = ss.getSheetByName(NOMBRES_HOJAS.CONFIG);

  var mesSeleccionado = movimiento ? movimiento.getRange('B3').getValue() : 'Enero';

  // v7.6: Leer METAS desde CONFIG (filas 40-44, columna B)
  var metaGananciaPct = 7, metaMaxGastosPct = 93;
  var distUtilidadPct = 33.33, distEmergenciaPct = 33.33, distInversionPct = 33.34;
  if (config) {
    metaGananciaPct = Number(config.getRange('B40').getValue()) || 7;
    metaMaxGastosPct = Number(config.getRange('B41').getValue()) || 93;
    distUtilidadPct = Number(config.getRange('B42').getValue()) || 33.33;
    distEmergenciaPct = Number(config.getRange('B43').getValue()) || 33.33;
    distInversionPct = Number(config.getRange('B44').getValue()) || 33.34;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // CÁLCULO DINÁMICO DE POSICIONES (basado en Tablero.gs)
  // ═══════════════════════════════════════════════════════════════════════════

  // FAMILIA - Posiciones calculadas
  var FILA_INICIO_CUENTAS_FAM = 8;  // Primera cuenta FAMILIA
  var FILA_TOTAL_CUENTAS_FAM = FILA_INICIO_CUENTAS_FAM + CUENTAS_FAMILIA.length; // 8 + 10 = 18
  var FILA_TITULO_RESUMEN = FILA_TOTAL_CUENTAS_FAM + 3; // 18 + 3 = 21
  var FILA_INGRESOS_FAM = FILA_TITULO_RESUMEN + 2; // 21 + 2 = 23
  var FILA_EGRESOS_FAM = FILA_INGRESOS_FAM + 1; // 24
  var FILA_BALANCE_FAM = FILA_EGRESOS_FAM + 1; // 25
  var FILA_TITULO_LIQUIDEZ = FILA_BALANCE_FAM + 2; // 25 + 2 = 27
  var FILA_CAJA_DISP = FILA_TITULO_LIQUIDEZ + 2; // 27 + 2 = 29
  var FILA_SEMANA_1 = FILA_CAJA_DISP + 1; // 30
  var FILA_SALDO_FINAL_FAM = FILA_SEMANA_1 + 3; // 30 + 3 = 33

  // NEUROTEA - Posiciones fijas según estructura
  var FILA_INGRESOS_NT = 9;  // Valores Ingresos/Gastos NT
  var FILA_GANANCIA_NT = 13; // Valores Ganancia/Meta NT
  var FILA_DISTRIBUCION = 20; // Valores distribución
  var FILA_INICIO_CUENTAS_NT = 24; // Primera cuenta NT
  var FILA_TOTAL_CUENTAS_NT = FILA_INICIO_CUENTAS_NT + CUENTAS_NT.length; // 24 + 3 = 27

  // BALANCE CRUZADO - Posición calculada
  var FILA_BALANCE_CRUZADO = Math.max(FILA_SALDO_FINAL_FAM, FILA_TOTAL_CUENTAS_NT + 2) + 3; // max(33, 29) + 3 = 36

  // ═══════════════════════════════════════════════════════════════════════════
  // LECTURA DE DATOS
  // ═══════════════════════════════════════════════════════════════════════════

  // Función auxiliar para leer valor numérico seguro
  function leerNumero(rango) {
    try {
      var val = rango.getValue();
      if (val === '' || val === null || val === undefined) return 0;
      var num = Number(val);
      return isNaN(num) ? 0 : num;
    } catch(e) {
      return 0;
    }
  }

  // SALDOS EN CUENTAS FAMILIA
  var cuentasFamilia = [];
  if (tablero) {
    for (var i = 0; i < CUENTAS_FAMILIA.length; i++) {
      var fila = FILA_INICIO_CUENTAS_FAM + i;
      cuentasFamilia.push({
        nombre: CUENTAS_FAMILIA[i],
        esperado: leerNumero(tablero.getRange(fila, 3)),  // Columna C
        real: leerNumero(tablero.getRange(fila, 4)),      // Columna D
        diferencia: leerNumero(tablero.getRange(fila, 5)) // Columna E
      });
    }
  }

  // INDICADORES NEUROTEA (celdas merged: H-I = Ingresos/Ganancia, J-K = Gastos/Meta)
  var ingresosNT = 0, gastosNT = 0, gananciaNT = 0, metaNT = 0;
  if (tablero) {
    ingresosNT = leerNumero(tablero.getRange(FILA_INGRESOS_NT, 8));  // H9
    gastosNT = leerNumero(tablero.getRange(FILA_INGRESOS_NT, 10));   // J9
    gananciaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 8));  // H13
    metaNT = leerNumero(tablero.getRange(FILA_GANANCIA_NT, 10));     // J13
  }

  // DISTRIBUCIÓN DE GANANCIA NT (fila 20: I=Utilidad, J=Emergencia, K=Inversión)
  var utilidadDueno = 0, fondoEmergencia = 0, fondoInversion = 0;
  if (tablero) {
    utilidadDueno = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 9));    // I20
    fondoEmergencia = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 10)); // J20
    fondoInversion = leerNumero(tablero.getRange(FILA_DISTRIBUCION, 11));  // K20
  }

  // RESUMEN DEL MES FAMILIA (columna C=Presupuesto, D=Real)
  var ingresosFamPres = 0, ingresosFamReal = 0;
  var egresosFamPres = 0, egresosFamReal = 0;
  var egresosPendientesFam = 0;
  var balanceFamPres = 0, balanceFamReal = 0;
  if (tablero) {
    ingresosFamPres = leerNumero(tablero.getRange(FILA_INGRESOS_FAM, 3));  // C23
    ingresosFamReal = leerNumero(tablero.getRange(FILA_INGRESOS_FAM, 4));  // D23
    egresosFamPres = leerNumero(tablero.getRange(FILA_EGRESOS_FAM, 3));    // C24
    egresosFamReal = leerNumero(tablero.getRange(FILA_EGRESOS_FAM, 4));    // D24
    balanceFamPres = leerNumero(tablero.getRange(FILA_BALANCE_FAM, 3));    // C25
    balanceFamReal = leerNumero(tablero.getRange(FILA_BALANCE_FAM, 4));    // D25
  }

  // INDICADORES FAMILIA: Ahorro y Fondo Emergencia (desde MOVIMIENTO)
  var ahorroFam = 0, fondoEmergenciaFam = 0;
  if (movimiento) {
    // Leer columnas B (Tipo), F (Real), J (Est.Pago) de MOVIMIENTO FAMILIA
    var datosFamMov = movimiento.getRange('A9:J70').getValues();
    for (var idx = 0; idx < datosFamMov.length; idx++) {
      var fila = datosFamMov[idx];
      var concepto = fila[0] ? fila[0].toString() : '';
      var tipo = fila[1] ? fila[1].toString() : '';
      var real = Number(fila[5]) || 0;  // Columna F
      var estPago = fila[9] ? fila[9].toString() : '';  // Columna J

      // Ahorro (buscar en concepto o categoría)
      if (concepto.indexOf('Ahorro') >= 0 || concepto.indexOf('AHORRO') >= 0) {
        ahorroFam += real;
      }
      // Fondo Emergencia
      if (concepto.indexOf('Fondo') >= 0 && concepto.indexOf('Emergencia') >= 0) {
        fondoEmergenciaFam += real;
      }
      // Egresos Pendientes FAMILIA
      if (tipo === 'Egreso' && estPago === 'Pendiente') {
        egresosPendientesFam += real;
      }
    }
  }

  // EGRESOS PENDIENTES NEUROTEA (desde MOVIMIENTO)
  var egresosPendientesNT = 0;
  if (movimiento) {
    var datosNTMovPend = movimiento.getRange('A73:J150').getValues();
    for (var idxNT = 0; idxNT < datosNTMovPend.length; idxNT++) {
      var filaNT = datosNTMovPend[idxNT];
      var tipoNT = filaNT[1] ? filaNT[1].toString() : '';
      var realNT = Number(filaNT[5]) || 0;  // Columna F
      var estPagoNT = filaNT[9] ? filaNT[9].toString() : '';  // Columna J

      if (tipoNT === 'Egreso' && estPagoNT === 'Pendiente') {
        egresosPendientesNT += realNT;
      }
    }
  }

  // SALDOS EN CUENTAS NT (columna I=Saldo, J=Acumulado)
  var cuentasNT = [];
  if (tablero) {
    for (var j = 0; j < CUENTAS_NT.length; j++) {
      var filaNT = FILA_INICIO_CUENTAS_NT + j;
      cuentasNT.push({
        nombre: CUENTAS_NT[j],
        saldo: leerNumero(tablero.getRange(filaNT, 9)),     // Columna I
        acumulado: leerNumero(tablero.getRange(filaNT, 10)) // Columna J
      });
    }
  }
  var totalCuentasNT = tablero ? leerNumero(tablero.getRange(FILA_TOTAL_CUENTAS_NT, 9)) : 0;

  // LIQUIDEZ FAMILIA (columna C=Gastos, D=Saldo)
  var cajaDisponibleFam = 0;
  var semanasFam = [];
  var saldoFinalFam = 0, totalGastosFam = 0;
  if (tablero) {
    cajaDisponibleFam = leerNumero(tablero.getRange(FILA_CAJA_DISP, 4)); // D29
    var nombresSemanadas = ['Esta semana', 'Próxima semana', '3ra semana'];
    for (var k = 0; k < 3; k++) {
      var filaS = FILA_SEMANA_1 + k;
      semanasFam.push({
        nombre: nombresSemanadas[k],
        gastos: leerNumero(tablero.getRange(filaS, 3)),  // Columna C
        saldo: leerNumero(tablero.getRange(filaS, 4)),   // Columna D
        estado: tablero.getRange(filaS, 5).getValue() || ''
      });
    }
    totalGastosFam = leerNumero(tablero.getRange(FILA_SALDO_FINAL_FAM, 3)); // C33
    saldoFinalFam = leerNumero(tablero.getRange(FILA_SALDO_FINAL_FAM, 4));  // D33
  }

  // BALANCE CRUZADO BIDIRECCIONAL (columna C=Este Mes, D=Acumulado)
  // Estructura v6.3: 8 filas (FLOW NT→FAM: Préstamo, Devolución, Deuda + FLOW FAM→NT: Préstamo, Devolución, Deuda + Balance)
  var prestamoNTMes = 0, prestamoNTAcum = 0;
  var devFamMes = 0, devFamAcum = 0;
  var deudaFamMes = 0, deudaFamAcum = 0;
  var prestamoFamMes = 0, prestamoFamAcum = 0;
  var devNTMes = 0, devNTAcum = 0;
  var deudaNTMes = 0, deudaNTAcum = 0;
  var balanceNetoMes = 0, balanceNeto = 0;
  if (tablero) {
    // FLOW 1: NT → FAM (filas relativas al inicio de Balance Cruzado)
    var filaPrestamoNT = FILA_BALANCE_CRUZADO + 2;    // Préstamo NT → Familia
    var filaDevFam = filaPrestamoNT + 1;              // Devolución Familia → NT
    var filaDeudaFam = filaDevFam + 1;                // Deuda FAM → NT (subtotal)
    // FLOW 2: FAM → NT
    var filaPrestamoFam = filaDeudaFam + 1;           // Préstamo Familia → NT
    var filaDevNT = filaPrestamoFam + 1;              // Devolución NT → Familia
    var filaDeudaNT = filaDevNT + 1;                  // Deuda NT → FAM (subtotal)
    // Balance Neto
    var filaBalanceNeto = filaDeudaNT + 1;            // BALANCE NETO

    prestamoNTMes = leerNumero(tablero.getRange(filaPrestamoNT, 3));
    prestamoNTAcum = leerNumero(tablero.getRange(filaPrestamoNT, 4));
    devFamMes = leerNumero(tablero.getRange(filaDevFam, 3));
    devFamAcum = leerNumero(tablero.getRange(filaDevFam, 4));
    deudaFamMes = leerNumero(tablero.getRange(filaDeudaFam, 3));
    deudaFamAcum = leerNumero(tablero.getRange(filaDeudaFam, 4));
    prestamoFamMes = leerNumero(tablero.getRange(filaPrestamoFam, 3));
    prestamoFamAcum = leerNumero(tablero.getRange(filaPrestamoFam, 4));
    devNTMes = leerNumero(tablero.getRange(filaDevNT, 3));
    devNTAcum = leerNumero(tablero.getRange(filaDevNT, 4));
    deudaNTMes = leerNumero(tablero.getRange(filaDeudaNT, 3));
    deudaNTAcum = leerNumero(tablero.getRange(filaDeudaNT, 4));
    balanceNetoMes = leerNumero(tablero.getRange(filaBalanceNeto, 3));
    balanceNeto = leerNumero(tablero.getRange(filaBalanceNeto, 4));
  }

  // PRESUPUESTO VS REAL POR CATEGORÍAS (desde MOVIMIENTO)
  // ACTUALIZADO v4.1: Nueva estructura columnas - A=CONCEPTO, D=DÍA, E=PRESUPUESTO, F=REAL
  var presupuestoFamilia = [];
  var presupuestoNT = [];

  if (movimiento) {
    var datosFam = movimiento.getRange('A9:F70').getValues();  // A hasta F (6 columnas)
    for (var m = 0; m < datosFam.length; m++) {
      var row = datosFam[m];
      var concepto = row[0];
      if (concepto && concepto.toString().indexOf('►') >= 0) {
        presupuestoFamilia.push({
          categoria: concepto.toString().replace('►', '').trim(),
          presupuesto: Number(row[4]) || 0,  // Columna E (índice 4) = PRESUPUESTO
          real: Number(row[5]) || 0          // Columna F (índice 5) = REAL
        });
      }
    }

    var datosNTMov = movimiento.getRange('A73:F150').getValues();  // A hasta F (6 columnas)
    for (var n = 0; n < datosNTMov.length; n++) {
      var rowNTMov = datosNTMov[n];
      var conceptoNT = rowNTMov[0];
      if (conceptoNT && conceptoNT.toString().indexOf('►') >= 0) {
        presupuestoNT.push({
          categoria: conceptoNT.toString().replace('►', '').trim(),
          presupuesto: Number(rowNTMov[4]) || 0,  // Columna E (índice 4) = PRESUPUESTO
          real: Number(rowNTMov[5]) || 0          // Columna F (índice 5) = REAL
        });
      }
    }
  }

  return {
    mes: mesSeleccionado,
    año: AÑO,
    cuentasFamilia: cuentasFamilia,
    cuentasNT: cuentasNT,
    totalCuentasNT: totalCuentasNT,
    familia: {
      ingresosPres: ingresosFamPres,
      ingresosReal: ingresosFamReal,
      egresosPres: egresosFamPres,
      egresosReal: egresosFamReal,
      egresosPendientes: egresosPendientesFam,
      balancePres: balanceFamPres,
      balanceReal: balanceFamReal
    },
    indicadoresFam: {
      ahorro: ahorroFam,
      fondoEmergencia: fondoEmergenciaFam
    },
    neurotea: {
      ingresos: ingresosNT,
      gastos: gastosNT,
      egresosPendientes: egresosPendientesNT,
      ganancia: gananciaNT,
      meta: metaNT
    },
    distribucion: {
      utilidad: utilidadDueno,
      emergencia: fondoEmergencia,
      inversion: fondoInversion,
      metaTotal: metaNT
    },
    presupuestoFamilia: presupuestoFamilia,
    presupuestoNT: presupuestoNT,
    liquidezFamilia: {
      cajaDisponible: cajaDisponibleFam,
      semanas: semanasFam,
      totalGastos: totalGastosFam,
      saldoFinal: saldoFinalFam
    },
    balanceCruzado: {
      // FLOW NT → FAM
      prestamoNTMes: prestamoNTMes,
      prestamoNTAcum: prestamoNTAcum,
      devFamMes: devFamMes,
      devFamAcum: devFamAcum,
      deudaFamMes: deudaFamMes,
      deudaFamAcum: deudaFamAcum,
      // FLOW FAM → NT
      prestamoFamMes: prestamoFamMes,
      prestamoFamAcum: prestamoFamAcum,
      devNTMes: devNTMes,
      devNTAcum: devNTAcum,
      deudaNTMes: deudaNTMes,
      deudaNTAcum: deudaNTAcum,
      // Balance neto
      balanceNetoMes: balanceNetoMes,
      balanceNeto: balanceNeto
    },
    // v7.6: METAS leídas desde CONFIG
    metas: {
      ganancia: metaGananciaPct,
      maxGastos: metaMaxGastosPct,
      distUtilidad: distUtilidadPct,
      distEmergencia: distEmergenciaPct,
      distInversion: distInversionPct
    }
  };
}

// Función auxiliar para formatear números
function formatearGuaranies(num) {
  if (num === 0 || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('es-PY').format(Math.round(num));
}
