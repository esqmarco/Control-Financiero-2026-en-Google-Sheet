/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WEBAPP.GS - DASHBOARD HTML/CSS PROFESIONAL
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 5.0 - Dashboard Dinámico con datos reales
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
  if (datos.balanceCruzado.saldoNetoAcum > 0) {
    return '<div class="alert-icon">⚠️</div>' +
           '<div class="alert-title">NT SUBSIDIA A FAMILIA</div>' +
           '<div class="alert-value">Gs. ' + formatearGuaranies(datos.balanceCruzado.saldoNetoAcum) + '</div>' +
           '<div class="alert-desc">El salario de administrador no está cubriendo los gastos familiares.</div>';
  } else {
    return '<div class="alert-icon">✅</div>' +
           '<div class="alert-title">BALANCE EQUILIBRADO</div>' +
           '<div class="alert-value">Gs. ' + formatearGuaranies(Math.abs(datos.balanceCruzado.saldoNetoAcum)) + '</div>' +
           '<div class="alert-desc">Familia no debe a NeuroTEA.</div>';
  }
}

function generarMesesOptions() {
  var html = '';
  for (var i = 0; i < MESES.length; i++) {
    html += '<option>' + MESES[i] + ' ' + AÑO + '</option>';
  }
  return html;
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
  var metaFondo = Math.round(datos.distribucion.metaTotal * 0.3333);
  var metaFondoInv = Math.round(datos.distribucion.metaTotal * 0.3334);

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
'    .fondo-box.utilidad { background: #f3e8ff; }' +
'    .fondo-box.emergencia { background: #ffedd5; }' +
'    .fondo-box.inversion { background: #cffafe; }' +
'    .fondo-label { font-size: 0.8em; color: #64748b; margin-bottom: 5px; }' +
'    .fondo-meta { font-weight: 700; font-size: 1.1em; }' +
'    .fondo-real { font-size: 0.85em; margin-top: 5px; }' +
'    .fondo-real.ok { color: #059669; }' +
'    .fondo-real.warning { color: #d97706; }' +
'    .balance-section { background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #8b5cf6 100%); color: white; padding: 25px; border-radius: 15px; grid-column: 1 / -1; margin-top: 10px; box-shadow: 0 8px 30px rgba(124, 58, 237, 0.3); }' +
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
'      <!-- SALDOS EN CUENTAS -->' +
'      <div class="card">' +
'        <div class="card-title">💰 SALDOS EN CUENTAS</div>' +
'        <table><thead><tr><th>Cuenta</th><th class="text-right">Esperado</th><th class="text-right">Real ✏️</th><th class="text-right">Diferencia</th></tr></thead>' +
'        <tbody>' + generarFilasCuentasFamilia(datos.cuentasFamilia) + '</tbody></table>' +
'        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>' +
'      </div>' +
'      <!-- PRESUPUESTO VS REAL -->' +
'      <div class="card">' +
'        <div class="card-title">📋 PRESUPUESTO vs REAL</div>' +
'        <table><thead><tr><th>Categoría</th><th class="text-right">Presupuesto</th><th class="text-right">Real</th><th class="text-center">Estado</th></tr></thead>' +
'        <tbody>' + generarFilasPresupuestoFamilia(datos.presupuestoFamilia) + '</tbody>' +
'        <tfoot><tr style="background: #dcfce7;">' +
'          <td class="font-bold">BALANCE FAMILIA</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(datos.familia.balancePres) + '</td>' +
'          <td class="text-right font-bold ' + (datos.familia.balanceReal < 0 ? 'text-red' : 'text-green') + '">' + formatearGuaranies(datos.familia.balanceReal) + '</td>' +
'          <td class="text-center"><span class="badge ' + (datos.familia.balanceReal >= 0 ? 'badge-solid-green' : 'badge-solid-red') + '">' + (datos.familia.balanceReal >= 0 ? 'SUPERÁVIT' : 'DÉFICIT') + '</span></td>' +
'        </tr></tfoot></table>' +
'      </div>' +
'      <!-- FLUJO DEL MES -->' +
'      <div class="card">' +
'        <div class="card-title">💵 FLUJO DEL MES</div>' +
'        <div class="flujo-container">' +
'          <div class="flujo-item flujo-ingresos"><span>Ingresos</span><span class="font-bold text-green">+ ' + formatearGuaranies(datos.familia.ingresosReal) + '</span></div>' +
'          <div class="flujo-item flujo-pagados"><span>Total Egresos</span><span class="font-bold text-red">- ' + formatearGuaranies(datos.familia.egresosReal) + '</span></div>' +
'          <div class="flujo-item flujo-pendientes"><span>Gastos Pendientes</span><span class="font-bold text-yellow">- ' + formatearGuaranies(datos.liquidezFamilia.totalGastos) + '</span></div>' +
'          <div class="flujo-balance familia"><span>BALANCE</span><span>' + formatearGuaranies(datos.familia.balanceReal) + '</span></div>' +
'        </div>' +
'      </div>' +
'      <!-- LIQUIDEZ -->' +
'      <div class="card">' +
'        <div class="card-title">📅 LIQUIDEZ - PRÓXIMAS 3 SEMANAS</div>' +
'        <table><thead><tr><th>Semana</th><th class="text-right">Gastos</th><th class="text-right">Saldo</th><th class="text-center">Estado</th></tr></thead>' +
'        <tbody>' +
'          <tr style="background: #dcfce7;"><td class="font-bold">Caja disponible</td><td class="text-right">-</td><td class="text-right font-bold">' + formatearGuaranies(datos.liquidezFamilia.cajaDisponible) + '</td><td class="text-center">-</td></tr>' +
           generarFilasLiquidez(datos.liquidezFamilia.semanas) +
'        </tbody>' +
'        <tfoot><tr style="background: #f1f5f9;">' +
'          <td class="font-bold">SALDO FINAL</td>' +
'          <td class="text-right font-bold">-' + formatearGuaranies(datos.liquidezFamilia.totalGastos) + '</td>' +
'          <td class="text-right font-bold ' + (datos.liquidezFamilia.saldoFinal < 0 ? 'text-red' : 'text-green') + '">' + formatearGuaranies(datos.liquidezFamilia.saldoFinal) + '</td>' +
'          <td class="text-center"><span class="badge ' + (datos.liquidezFamilia.saldoFinal >= 0 ? 'badge-solid-green' : 'badge-solid-red') + '">' + (datos.liquidezFamilia.saldoFinal >= 0 ? 'OK' : 'DÉFICIT') + '</span></td>' +
'        </tr></tfoot></table>' +
'      </div>' +
'    </div>' +
'    <!-- COLUMNA NEUROTEA -->' +
'    <div class="column neurotea">' +
'      <div class="column-header">🏥 NEUROTEA</div>' +
'      <!-- INDICADORES DE METAS -->' +
'      <div class="card">' +
'        <div class="card-title">🎯 INDICADORES DE METAS</div>' +
'        <div class="kpi-grid">' +
'          <div class="kpi-box" style="background:#dbeafe"><div class="kpi-label">INGRESOS DEL MES</div><div class="kpi-value text-blue">' + formatearGuaranies(datos.neurotea.ingresos) + '</div></div>' +
'          <div class="kpi-box" style="background:#f3f4f6"><div class="kpi-label">GASTOS DEL MES</div><div class="kpi-value">' + formatearGuaranies(datos.neurotea.gastos) + '</div></div>' +
'          <div class="kpi-box" style="background:#dcfce7"><div class="kpi-label">GANANCIA REAL</div><div class="kpi-value text-green">' + formatearGuaranies(datos.neurotea.ganancia) + '</div></div>' +
'          <div class="kpi-box" style="background:#fef3c7"><div class="kpi-label">META 7%</div><div class="kpi-value text-yellow">' + formatearGuaranies(datos.neurotea.meta) + '</div></div>' +
'        </div>' +
'        <div class="progress-container">' +
'          <div style="display:flex;justify-content:space-between;font-size:0.9em;margin-bottom:8px"><span>% Gastos sobre Ingresos</span><span class="font-bold">' + pctGastosNT + '% / 93% máx</span></div>' +
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
'            <div class="fondo-box utilidad"><div class="fondo-label" style="color:#7c3aed">Utilidad Dueño</div><div class="fondo-meta">' + formatearGuaranies(metaFondo) + '</div><div class="fondo-real ' + (datos.distribucion.utilidad >= metaFondo ? 'ok' : 'warning') + '">' + (datos.distribucion.utilidad >= metaFondo ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.utilidad) + '</div></div>' +
'            <div class="fondo-box emergencia"><div class="fondo-label" style="color:#ea580c">Fondo Emerg.</div><div class="fondo-meta">' + formatearGuaranies(metaFondo) + '</div><div class="fondo-real ' + (datos.distribucion.emergencia >= metaFondo ? 'ok' : 'warning') + '">' + (datos.distribucion.emergencia >= metaFondo ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.emergencia) + '</div></div>' +
'            <div class="fondo-box inversion"><div class="fondo-label" style="color:#0891b2">Fondo Inversión</div><div class="fondo-meta">' + formatearGuaranies(metaFondoInv) + '</div><div class="fondo-real ' + (datos.distribucion.inversion >= metaFondoInv ? 'ok' : 'warning') + '">' + (datos.distribucion.inversion >= metaFondoInv ? '✓' : '⚠') + ' ' + formatearGuaranies(datos.distribucion.inversion) + '</div></div>' +
'          </div>' +
'        </div>' +
'      </div>' +
'      <!-- PRESUPUESTO VS REAL NT -->' +
'      <div class="card">' +
'        <div class="card-title">📋 PRESUPUESTO vs REAL</div>' +
'        <table><thead><tr><th>Categoría</th><th class="text-right">Presupuesto</th><th class="text-right">Real</th><th class="text-center">Estado</th></tr></thead>' +
'        <tbody>' + generarFilasPresupuestoNT(datos.presupuestoNT) + '</tbody>' +
'        <tfoot><tr style="background: #dbeafe;">' +
'          <td class="font-bold">BALANCE NEUROTEA</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(datos.neurotea.meta) + '</td>' +
'          <td class="text-right font-bold ' + (datos.neurotea.ganancia >= 0 ? 'text-green' : 'text-red') + '">' + formatearGuaranies(datos.neurotea.ganancia) + '</td>' +
'          <td class="text-center"><span class="badge ' + (datos.neurotea.ganancia >= datos.neurotea.meta ? 'badge-solid-green' : 'badge-solid-red') + '">' + (datos.neurotea.ganancia >= datos.neurotea.meta ? 'META OK' : 'DÉFICIT') + '</span></td>' +
'        </tr></tfoot></table>' +
'      </div>' +
'      <!-- FLUJO DEL MES NT -->' +
'      <div class="card">' +
'        <div class="card-title">💵 FLUJO DEL MES</div>' +
'        <div class="flujo-container">' +
'          <div class="flujo-item flujo-ingresos"><span>Ingresos</span><span class="font-bold text-green">+ ' + formatearGuaranies(datos.neurotea.ingresos) + '</span></div>' +
'          <div class="flujo-item flujo-pagados"><span>Total Gastos</span><span class="font-bold text-red">- ' + formatearGuaranies(datos.neurotea.gastos) + '</span></div>' +
'          <div class="flujo-item flujo-pendientes"><span>Meta 7%</span><span class="font-bold text-yellow">' + formatearGuaranies(datos.neurotea.meta) + '</span></div>' +
'          <div class="flujo-balance neurotea"><span>GANANCIA</span><span>' + formatearGuaranies(datos.neurotea.ganancia) + '</span></div>' +
'        </div>' +
'      </div>' +
'      <!-- SALDOS EN CUENTAS NT -->' +
'      <div class="card">' +
'        <div class="card-title">💰 SALDOS EN CUENTAS</div>' +
'        <table><thead><tr><th>Cuenta</th><th class="text-right">Saldo ✏️</th><th class="text-right">Acumulado</th><th class="text-center">Estado</th></tr></thead>' +
'        <tbody>' + generarFilasCuentasNT(datos.cuentasNT) + '</tbody>' +
'        <tfoot><tr style="background: #93c5fd;">' +
'          <td class="font-bold">💵 TOTAL DISPONIBLE</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(datos.totalCuentasNT) + '</td>' +
'          <td class="text-right font-bold">' + formatearGuaranies(totalAcumuladoNT) + '</td>' +
'          <td class="text-center">-</td>' +
'        </tr></tfoot></table>' +
'        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>' +
'      </div>' +
'    </div>' +
'    <!-- BALANCE CRUZADO -->' +
'    <div class="balance-section">' +
'      <h3>🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA</h3>' +
'      <div class="balance-grid">' +
'        <table class="balance-table"><thead><tr><th>Concepto</th><th class="text-right">Este Mes</th><th class="text-right">Acumulado Año</th></tr></thead>' +
'        <tbody>' +
'          <tr><td>Préstamo NT → Familia</td><td class="text-right" style="color:#fca5a5">' + (datos.balanceCruzado.prestamoMes > 0 ? formatearGuaranies(datos.balanceCruzado.prestamoMes) : '-') + '</td><td class="text-right font-bold" style="color:#fca5a5">' + formatearGuaranies(datos.balanceCruzado.prestamoAcum) + '</td></tr>' +
'          <tr><td>Devolución Familia → NT</td><td class="text-right" style="color:#86efac">' + (datos.balanceCruzado.devolucionMes > 0 ? formatearGuaranies(datos.balanceCruzado.devolucionMes) : '-') + '</td><td class="text-right font-bold" style="color:#86efac">' + formatearGuaranies(datos.balanceCruzado.devolucionAcum) + '</td></tr>' +
'        </tbody>' +
'        <tfoot><tr style="background:rgba(0,0,0,0.2)">' +
'          <td class="font-bold">SALDO NETO</td>' +
'          <td class="text-right font-bold" style="color:' + (datos.balanceCruzado.saldoNetoMes > 0 ? '#fca5a5' : '#86efac') + '">' + formatearGuaranies(datos.balanceCruzado.saldoNetoMes) + '</td>' +
'          <td class="text-right font-bold" style="color:' + (datos.balanceCruzado.saldoNetoAcum > 0 ? '#fca5a5' : '#86efac') + '">' + formatearGuaranies(datos.balanceCruzado.saldoNetoAcum) + '</td>' +
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
// ═══════════════════════════════════════════════════════════════════════════════

function obtenerDatosDashboard() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  var movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);

  var mesSeleccionado = movimiento ? movimiento.getRange('B3').getValue() : 'Enero';

  // SALDOS EN CUENTAS FAMILIA (filas 8-17)
  var cuentasFamilia = [];
  if (tablero) {
    for (var i = 0; i < CUENTAS_FAMILIA.length; i++) {
      var fila = 8 + i;
      cuentasFamilia.push({
        nombre: CUENTAS_FAMILIA[i],
        esperado: tablero.getRange(fila, 3).getValue() || 0,
        real: tablero.getRange(fila, 4).getValue() || 0,
        diferencia: tablero.getRange(fila, 5).getValue() || 0
      });
    }
  }

  // INDICADORES NT
  var ingresosNT = 0, gastosNT = 0, gananciaNT = 0, metaNT = 0;
  if (tablero) {
    ingresosNT = tablero.getRange('I9').getValue() || 0;
    gastosNT = tablero.getRange('K9').getValue() || 0;
    gananciaNT = tablero.getRange('I13').getValue() || 0;
    metaNT = tablero.getRange('K13').getValue() || 0;
  }

  // DISTRIBUCIÓN DE GANANCIA NT
  var utilidadDueno = 0, fondoEmergencia = 0, fondoInversion = 0;
  if (tablero) {
    utilidadDueno = tablero.getRange('H20').getValue() || 0;
    fondoEmergencia = tablero.getRange('I20').getValue() || 0;
    fondoInversion = tablero.getRange('J20').getValue() || 0;
  }

  // RESUMEN DEL MES FAMILIA
  var ingresosFamPres = 0, ingresosFamReal = 0;
  var egresosFamPres = 0, egresosFamReal = 0;
  var balanceFamPres = 0, balanceFamReal = 0;
  if (tablero) {
    ingresosFamPres = tablero.getRange('C22').getValue() || 0;
    ingresosFamReal = tablero.getRange('D22').getValue() || 0;
    egresosFamPres = tablero.getRange('C23').getValue() || 0;
    egresosFamReal = tablero.getRange('D23').getValue() || 0;
    balanceFamPres = tablero.getRange('C24').getValue() || 0;
    balanceFamReal = tablero.getRange('D24').getValue() || 0;
  }

  // SALDOS EN CUENTAS NT
  var cuentasNT = [];
  if (tablero) {
    for (var j = 0; j < CUENTAS_NT.length; j++) {
      var filaNT = 25 + j;
      cuentasNT.push({
        nombre: CUENTAS_NT[j],
        saldo: tablero.getRange(filaNT, 9).getValue() || 0,
        acumulado: tablero.getRange(filaNT, 10).getValue() || 0
      });
    }
  }
  var totalCuentasNT = tablero ? tablero.getRange('I28').getValue() || 0 : 0;

  // LIQUIDEZ FAMILIA
  var cajaDisponibleFam = 0;
  var semanasFam = [];
  var saldoFinalFam = 0, totalGastosFam = 0;
  if (tablero) {
    cajaDisponibleFam = tablero.getRange('D28').getValue() || 0;
    var nombresSemanadas = ['Esta semana', 'Próxima semana', '3ra semana'];
    for (var k = 0; k < 3; k++) {
      var filaS = 29 + k;
      semanasFam.push({
        nombre: nombresSemanadas[k],
        gastos: tablero.getRange(filaS, 3).getValue() || 0,
        saldo: tablero.getRange(filaS, 4).getValue() || 0,
        estado: tablero.getRange(filaS, 5).getValue() || ''
      });
    }
    totalGastosFam = tablero.getRange('C32').getValue() || 0;
    saldoFinalFam = tablero.getRange('D32').getValue() || 0;
  }

  // BALANCE CRUZADO
  var prestamoNTMes = 0, prestamoNTAcum = 0;
  var devolucionFamMes = 0, devolucionFamAcum = 0;
  var saldoNetoMes = 0, saldoNetoAcum = 0;
  if (tablero) {
    prestamoNTMes = tablero.getRange('C38').getValue() || 0;
    prestamoNTAcum = tablero.getRange('D38').getValue() || 0;
    devolucionFamMes = tablero.getRange('C39').getValue() || 0;
    devolucionFamAcum = tablero.getRange('D39').getValue() || 0;
    saldoNetoMes = tablero.getRange('C40').getValue() || 0;
    saldoNetoAcum = tablero.getRange('D40').getValue() || 0;
  }

  // PRESUPUESTO VS REAL POR CATEGORÍAS
  var presupuestoFamilia = [];
  var presupuestoNT = [];

  if (movimiento) {
    var datosFam = movimiento.getRange('A9:E70').getValues();
    for (var m = 0; m < datosFam.length; m++) {
      var row = datosFam[m];
      var concepto = row[0];
      if (concepto && concepto.toString().indexOf('►') >= 0) {
        presupuestoFamilia.push({
          categoria: concepto.toString().replace('►', '').trim(),
          presupuesto: row[3] || 0,
          real: row[4] || 0
        });
      }
    }

    var datosNT = movimiento.getRange('A73:E150').getValues();
    for (var n = 0; n < datosNT.length; n++) {
      var rowNT = datosNT[n];
      var conceptoNT = rowNT[0];
      if (conceptoNT && conceptoNT.toString().indexOf('►') >= 0) {
        presupuestoNT.push({
          categoria: conceptoNT.toString().replace('►', '').trim(),
          presupuesto: rowNT[3] || 0,
          real: rowNT[4] || 0
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
      balancePres: balanceFamPres,
      balanceReal: balanceFamReal
    },
    neurotea: {
      ingresos: ingresosNT,
      gastos: gastosNT,
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
      prestamoMes: prestamoNTMes,
      prestamoAcum: prestamoNTAcum,
      devolucionMes: devolucionFamMes,
      devolucionAcum: devolucionFamAcum,
      saldoNetoMes: saldoNetoMes,
      saldoNetoAcum: saldoNetoAcum
    }
  };
}

// Función auxiliar para formatear números
function formatearGuaranies(num) {
  if (num === 0 || num === null || num === undefined) return '0';
  return new Intl.NumberFormat('es-PY').format(Math.round(num));
}
