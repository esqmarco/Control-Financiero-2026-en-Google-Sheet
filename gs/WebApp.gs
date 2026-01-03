/**
 * ═══════════════════════════════════════════════════════════════════════════════
 * WEBAPP.GS - DASHBOARD HTML/CSS PROFESIONAL
 * Sistema de Control Financiero 2026 - NeuroTEA & Familia
 * Versión 4.0 - Arquitectura Modular Profesional
 * ═══════════════════════════════════════════════════════════════════════════════
 */

function generarHTMLDashboard() {
  // Obtener datos reales de las hojas (simulado por ahora)
  const datos = obtenerDatosDashboard();

  return `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Control Financiero ${AÑO} - NeuroTEA & Familia</title>
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
      background: linear-gradient(135deg, #f5f7fa 0%, #e4e8ec 100%);
      min-height: 100vh;
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* HEADER */
    /* ═══════════════════════════════════════════════════════════════ */
    .header {
      background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #1d4ed8 100%);
      color: white;
      padding: 20px 30px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 4px 20px rgba(30, 64, 175, 0.3);
    }
    .header h1 {
      font-size: 1.8em;
      font-weight: 700;
      display: flex;
      align-items: center;
      gap: 12px;
    }
    .header-controls {
      display: flex;
      align-items: center;
      gap: 25px;
    }
    .header select {
      padding: 10px 20px;
      border: none;
      border-radius: 8px;
      font-weight: 600;
      font-size: 1em;
      cursor: pointer;
      background: white;
      color: #1e40af;
    }
    .header .date {
      font-size: 0.95em;
      opacity: 0.9;
    }
    .header .date strong { font-weight: 600; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* MAIN LAYOUT */
    /* ═══════════════════════════════════════════════════════════════ */
    .main {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 25px;
      padding: 25px;
      max-width: 1600px;
      margin: 0 auto;
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* COLUMNS */
    /* ═══════════════════════════════════════════════════════════════ */
    .column { display: flex; flex-direction: column; gap: 20px; }

    .column-header {
      text-align: center;
      padding: 15px;
      border-radius: 12px 12px 0 0;
      font-weight: 700;
      font-size: 1.3em;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.15);
    }
    .familia .column-header {
      background: linear-gradient(135deg, #059669 0%, #10b981 100%);
    }
    .neurotea .column-header {
      background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%);
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* CARDS */
    /* ═══════════════════════════════════════════════════════════════ */
    .card {
      background: white;
      border-radius: 12px;
      padding: 20px;
      box-shadow: 0 4px 15px rgba(0,0,0,0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .card:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(0,0,0,0.12);
    }
    .card-title {
      font-weight: 700;
      font-size: 1.05em;
      border-bottom: 2px solid #e5e7eb;
      padding-bottom: 10px;
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .familia .card-title { color: #059669; }
    .neurotea .card-title { color: #1d4ed8; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* TABLES */
    /* ═══════════════════════════════════════════════════════════════ */
    table { width: 100%; border-collapse: collapse; font-size: 0.9em; }
    th {
      background: #f8fafc;
      padding: 12px 10px;
      text-align: left;
      font-weight: 600;
      color: #475569;
      border-bottom: 2px solid #e2e8f0;
    }
    td {
      padding: 10px;
      border-bottom: 1px solid #f1f5f9;
      transition: background 0.2s;
    }
    tr:hover td { background: #f8fafc; }

    .familia th { background: #ecfdf5; }
    .neurotea th { background: #eff6ff; }

    .text-right { text-align: right; }
    .text-center { text-align: center; }
    .font-bold { font-weight: 600; }
    .font-semibold { font-weight: 500; }

    .text-green { color: #059669; }
    .text-red { color: #dc2626; }
    .text-yellow { color: #d97706; }
    .text-blue { color: #2563eb; }
    .text-gray { color: #6b7280; }
    .text-purple { color: #7c3aed; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* BADGES */
    /* ═══════════════════════════════════════════════════════════════ */
    .badge {
      display: inline-block;
      padding: 4px 12px;
      border-radius: 20px;
      font-size: 0.8em;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .badge-green { background: #dcfce7; color: #166534; }
    .badge-red { background: #fef2f2; color: #991b1b; }
    .badge-yellow { background: #fef3c7; color: #92400e; }
    .badge-blue { background: #dbeafe; color: #1e40af; }
    .badge-solid-green { background: #22c55e; color: white; }
    .badge-solid-red { background: #ef4444; color: white; }
    .badge-solid-yellow { background: #f59e0b; color: white; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* KPI GRID */
    /* ═══════════════════════════════════════════════════════════════ */
    .kpi-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
    .kpi-box {
      padding: 15px;
      border-radius: 10px;
      transition: transform 0.2s;
    }
    .kpi-box:hover { transform: scale(1.02); }
    .kpi-label {
      font-size: 0.75em;
      color: #64748b;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      margin-bottom: 5px;
    }
    .kpi-value {
      font-size: 1.5em;
      font-weight: 700;
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* PROGRESS BAR */
    /* ═══════════════════════════════════════════════════════════════ */
    .progress-container { margin: 15px 0; }
    .progress-bar {
      height: 24px;
      background: #e5e7eb;
      border-radius: 12px;
      overflow: hidden;
      position: relative;
    }
    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #22c55e 0%, #16a34a 100%);
      border-radius: 12px;
      transition: width 0.5s ease;
    }
    .progress-fill.warning { background: linear-gradient(90deg, #f59e0b 0%, #d97706 100%); }
    .progress-fill.danger { background: linear-gradient(90deg, #ef4444 0%, #dc2626 100%); }
    .progress-text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      font-weight: 600;
      font-size: 0.85em;
      color: white;
      text-shadow: 0 1px 2px rgba(0,0,0,0.2);
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* FLUJO BOX */
    /* ═══════════════════════════════════════════════════════════════ */
    .flujo-container { display: flex; flex-direction: column; gap: 8px; }
    .flujo-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 12px 15px;
      border-radius: 8px;
      transition: transform 0.2s;
    }
    .flujo-item:hover { transform: translateX(5px); }
    .flujo-ingresos { background: #dcfce7; }
    .flujo-pagados { background: #fef2f2; }
    .flujo-pendientes { background: #fef3c7; }
    .flujo-balance {
      padding: 15px;
      border-radius: 10px;
      color: white;
      font-weight: 700;
    }
    .flujo-balance.familia { background: linear-gradient(135deg, #059669 0%, #10b981 100%); }
    .flujo-balance.neurotea { background: linear-gradient(135deg, #1d4ed8 0%, #3b82f6 100%); }

    /* ═══════════════════════════════════════════════════════════════ */
    /* DISTRIBUCIÓN FONDOS */
    /* ═══════════════════════════════════════════════════════════════ */
    .fondos-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
    .fondo-box {
      padding: 15px;
      border-radius: 10px;
      text-align: center;
      transition: transform 0.2s;
    }
    .fondo-box:hover { transform: scale(1.03); }
    .fondo-box.utilidad { background: #f3e8ff; }
    .fondo-box.emergencia { background: #ffedd5; }
    .fondo-box.inversion { background: #cffafe; }
    .fondo-label { font-size: 0.8em; color: #64748b; margin-bottom: 5px; }
    .fondo-meta { font-weight: 700; font-size: 1.1em; }
    .fondo-real { font-size: 0.85em; margin-top: 5px; }
    .fondo-real.ok { color: #059669; }
    .fondo-real.warning { color: #d97706; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* BALANCE CRUZADO */
    /* ═══════════════════════════════════════════════════════════════ */
    .balance-section {
      background: linear-gradient(135deg, #7c3aed 0%, #a855f7 50%, #8b5cf6 100%);
      color: white;
      padding: 25px;
      border-radius: 15px;
      grid-column: 1 / -1;
      margin-top: 10px;
      box-shadow: 0 8px 30px rgba(124, 58, 237, 0.3);
    }
    .balance-section h3 {
      text-align: center;
      margin-bottom: 20px;
      font-size: 1.3em;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
    }
    .balance-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; }
    .balance-table { background: rgba(255,255,255,0.1); border-radius: 10px; overflow: hidden; }
    .balance-table th { background: rgba(0,0,0,0.2); color: white; }
    .balance-table td { border-color: rgba(255,255,255,0.1); }
    .balance-table tr:hover td { background: rgba(255,255,255,0.05); }

    .alert-box {
      background: rgba(255,255,255,0.15);
      border: 2px solid rgba(255,255,255,0.3);
      border-radius: 15px;
      padding: 30px;
      text-align: center;
      backdrop-filter: blur(10px);
    }
    .alert-icon { font-size: 4em; margin-bottom: 10px; }
    .alert-title { font-size: 1.3em; margin-bottom: 10px; font-weight: 600; }
    .alert-value { font-size: 2.5em; font-weight: 700; margin-bottom: 15px; }
    .alert-desc { font-size: 0.95em; opacity: 0.9; line-height: 1.5; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* FOOTER */
    /* ═══════════════════════════════════════════════════════════════ */
    .footer {
      text-align: center;
      padding: 25px;
      color: #64748b;
      font-size: 0.85em;
      border-top: 1px solid #e2e8f0;
      background: white;
    }
    .footer .version { font-weight: 600; color: #475569; }

    /* ═══════════════════════════════════════════════════════════════ */
    /* RESPONSIVE */
    /* ═══════════════════════════════════════════════════════════════ */
    @media (max-width: 1200px) {
      .main { grid-template-columns: 1fr; }
      .balance-grid { grid-template-columns: 1fr; }
    }

    /* ═══════════════════════════════════════════════════════════════ */
    /* PIE CHART (SVG) */
    /* ═══════════════════════════════════════════════════════════════ */
    .chart-container {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      padding: 15px 0;
    }
    .chart-svg { width: 180px; height: 180px; }
    .chart-legend { font-size: 0.85em; }
    .chart-legend-item {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 8px;
    }
    .chart-legend-color {
      width: 14px;
      height: 14px;
      border-radius: 4px;
    }
  </style>
</head>
<body>
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- HEADER -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div class="header">
    <h1>📊 TABLERO DE CONTROL FINANCIERO</h1>
    <div class="header-controls">
      <div>
        <span>Mes:</span>
        <select id="mes">
          ${MESES.map(m => `<option>${m} ${AÑO}</option>`).join('')}
        </select>
      </div>
      <div class="date">
        Hoy: <strong>${new Date().toLocaleDateString('es-PY')}</strong>
      </div>
    </div>
  </div>

  <div class="main">
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- COLUMNA FAMILIA -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="column familia">
      <div class="column-header">🏠 FAMILIA</div>

      <!-- SALDOS EN CUENTAS -->
      <div class="card">
        <div class="card-title">💰 SALDOS EN CUENTAS</div>
        <table>
          <thead>
            <tr>
              <th>Cuenta</th>
              <th class="text-right">Esperado</th>
              <th class="text-right">Real ✏️</th>
              <th class="text-right">Diferencia</th>
            </tr>
          </thead>
          <tbody>
            ${datos.cuentasFamilia.map(c => `
              <tr>
                <td>${c.nombre}</td>
                <td class="text-right ${c.esperado < 0 ? 'text-red' : ''}">${formatearGuaranies(c.esperado)}</td>
                <td class="text-right text-blue font-bold">${formatearGuaranies(c.real)}</td>
                <td class="text-right ${c.diferencia > 0 ? 'text-green' : c.diferencia < 0 ? 'text-red' : 'text-gray'} font-bold">${c.diferencia !== 0 ? (c.diferencia > 0 ? '+' : '') + formatearGuaranies(c.diferencia) : '-'}</td>
              </tr>
            `).join('')}
          </tbody>
        </table>
        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>
      </div>

      <!-- PRESUPUESTO VS REAL -->
      <div class="card">
        <div class="card-title">📋 PRESUPUESTO vs REAL</div>
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th class="text-right">Presupuesto</th>
              <th class="text-right">Real</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${datos.presupuestoFamilia.map(cat => {
              const pct = cat.presupuesto > 0 ? Math.round(cat.real / cat.presupuesto * 100) : 0;
              const isIngreso = cat.categoria.toUpperCase().includes('INGRESO');
              let badgeClass = 'badge-green';
              if (isIngreso) {
                badgeClass = pct >= 100 ? 'badge-green' : pct >= 90 ? 'badge-yellow' : 'badge-red';
              } else {
                badgeClass = pct <= 100 ? 'badge-green' : pct <= 110 ? 'badge-yellow' : 'badge-red';
              }
              return \`<tr>
                <td class="font-bold">► \${cat.categoria}</td>
                <td class="text-right">\${formatearGuaranies(cat.presupuesto)}</td>
                <td class="text-right">\${formatearGuaranies(cat.real)}</td>
                <td class="text-center"><span class="badge \${badgeClass}">\${pct}%</span></td>
              </tr>\`;
            }).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #dcfce7;">
              <td class="font-bold">BALANCE FAMILIA</td>
              <td class="text-right font-bold">${formatearGuaranies(datos.familia.balancePres)}</td>
              <td class="text-right font-bold ${datos.familia.balanceReal < 0 ? 'text-red' : 'text-green'}">${formatearGuaranies(datos.familia.balanceReal)}</td>
              <td class="text-center"><span class="badge ${datos.familia.balanceReal >= 0 ? 'badge-solid-green' : 'badge-solid-red'}">${datos.familia.balanceReal >= 0 ? 'SUPERÁVIT' : 'DÉFICIT'}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- FLUJO DEL MES -->
      <div class="card">
        <div class="card-title">💵 FLUJO DEL MES</div>
        <div class="flujo-container">
          <div class="flujo-item flujo-ingresos">
            <span>Ingresos</span>
            <span class="font-bold text-green">+ ${formatearGuaranies(datos.familia.ingresosReal)}</span>
          </div>
          <div class="flujo-item flujo-pagados">
            <span>Total Egresos</span>
            <span class="font-bold text-red">- ${formatearGuaranies(datos.familia.egresosReal)}</span>
          </div>
          <div class="flujo-item flujo-pendientes">
            <span>Gastos Pendientes</span>
            <span class="font-bold text-yellow">- ${formatearGuaranies(datos.liquidezFamilia.totalGastos)}</span>
          </div>
          <div class="flujo-balance familia">
            <span>BALANCE</span>
            <span>${formatearGuaranies(datos.familia.balanceReal)}</span>
          </div>
        </div>
      </div>

      <!-- LIQUIDEZ -->
      <div class="card">
        <div class="card-title">📅 LIQUIDEZ - PRÓXIMAS 3 SEMANAS</div>
        <table>
          <thead>
            <tr>
              <th>Semana</th>
              <th class="text-right">Gastos</th>
              <th class="text-right">Saldo</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #dcfce7;">
              <td class="font-bold">Caja disponible</td>
              <td class="text-right">-</td>
              <td class="text-right font-bold">${formatearGuaranies(datos.liquidezFamilia.cajaDisponible)}</td>
              <td class="text-center">-</td>
            </tr>
            ${datos.liquidezFamilia.semanas.map((sem, idx) => \`
              <tr style="background: \${idx % 2 === 0 ? '#ffffff' : '#ecfdf5'}">
                <td>\${sem.nombre}</td>
                <td class="text-right">\${sem.gastos > 0 ? '-' + formatearGuaranies(sem.gastos) : '-'}</td>
                <td class="text-right font-bold \${sem.saldo < 0 ? 'text-red' : ''}">\${formatearGuaranies(sem.saldo)}</td>
                <td class="text-center"><span class="badge \${sem.saldo >= 0 ? 'badge-solid-green' : 'badge-solid-red'}">\${sem.saldo >= 0 ? 'OK' : 'FALTA'}</span></td>
              </tr>
            \`).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #f1f5f9;">
              <td class="font-bold">SALDO FINAL</td>
              <td class="text-right font-bold">-${formatearGuaranies(datos.liquidezFamilia.totalGastos)}</td>
              <td class="text-right font-bold ${datos.liquidezFamilia.saldoFinal < 0 ? 'text-red' : 'text-green'}">${formatearGuaranies(datos.liquidezFamilia.saldoFinal)}</td>
              <td class="text-center"><span class="badge ${datos.liquidezFamilia.saldoFinal >= 0 ? 'badge-solid-green' : 'badge-solid-red'}">${datos.liquidezFamilia.saldoFinal >= 0 ? 'OK' : 'DÉFICIT'}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- DISTRIBUCIÓN DE GASTOS -->
      <div class="card">
        <div class="card-title">📊 DISTRIBUCIÓN DE GASTOS</div>
        <div class="chart-container">
          <svg class="chart-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#059669" stroke-width="20" stroke-dasharray="75 100" stroke-dashoffset="25" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#3b82f6" stroke-width="20" stroke-dasharray="55 100" stroke-dashoffset="-50" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#f59e0b" stroke-width="20" stroke-dasharray="12 100" stroke-dashoffset="-105" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ef4444" stroke-width="20" stroke-dasharray="6 100" stroke-dashoffset="-117" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" stroke-width="20" stroke-dasharray="4 100" stroke-dashoffset="-123" transform="rotate(-90 50 50)"/>
          </svg>
          <div class="chart-legend">
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#059669"></div>Gastos Fijos 48%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#3b82f6"></div>Cuotas/Préstamos 37%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#f59e0b"></div>Variables 8%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#ef4444"></div>Suscripciones 4%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#8b5cf6"></div>Obligaciones 3%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- COLUMNA NEUROTEA -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="column neurotea">
      <div class="column-header">🏥 NEUROTEA</div>

      <!-- INDICADORES DE METAS -->
      <div class="card">
        <div class="card-title">🎯 INDICADORES DE METAS</div>
        <div class="kpi-grid">
          <div class="kpi-box" style="background:#dbeafe">
            <div class="kpi-label">INGRESOS DEL MES</div>
            <div class="kpi-value text-blue">${formatearGuaranies(datos.neurotea.ingresos)}</div>
          </div>
          <div class="kpi-box" style="background:#f3f4f6">
            <div class="kpi-label">GASTOS DEL MES</div>
            <div class="kpi-value">${formatearGuaranies(datos.neurotea.gastos)}</div>
          </div>
          <div class="kpi-box" style="background:#dcfce7">
            <div class="kpi-label">GANANCIA REAL</div>
            <div class="kpi-value text-green">${formatearGuaranies(datos.neurotea.ganancia)}</div>
          </div>
          <div class="kpi-box" style="background:#fef3c7">
            <div class="kpi-label">META 7%</div>
            <div class="kpi-value text-yellow">${formatearGuaranies(datos.neurotea.meta)}</div>
          </div>
        </div>

        <div class="progress-container">
          <div style="display:flex;justify-content:space-between;font-size:0.9em;margin-bottom:8px">
            <span>% Gastos sobre Ingresos</span>
            <span class="font-bold">${datos.neurotea.ingresos > 0 ? Math.round(datos.neurotea.gastos / datos.neurotea.ingresos * 100) : 0}% / 93% máx</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill ${datos.neurotea.ingresos > 0 && datos.neurotea.gastos / datos.neurotea.ingresos > 0.93 ? 'danger' : ''}" style="width:${datos.neurotea.ingresos > 0 ? Math.min(Math.round(datos.neurotea.gastos / datos.neurotea.ingresos * 100), 100) : 0}%"></div>
            <span class="progress-text">${datos.neurotea.ingresos > 0 ? Math.round(datos.neurotea.gastos / datos.neurotea.ingresos * 100) : 0}%</span>
          </div>
        </div>

        <div style="text-align:center;margin:15px 0">
          ${datos.neurotea.ganancia >= datos.neurotea.meta
            ? `<span class="badge badge-solid-green" style="padding:10px 25px;font-size:1em">✅ META CUMPLIDA - Superávit: ${formatearGuaranies(datos.neurotea.ganancia - datos.neurotea.meta)}</span>`
            : `<span class="badge badge-solid-red" style="padding:10px 25px;font-size:1em">⚠️ META NO CUMPLIDA - Falta: ${formatearGuaranies(datos.neurotea.meta - datos.neurotea.ganancia)}</span>`
          }
        </div>

        <div style="border-top:1px solid #e5e7eb;padding-top:15px;margin-top:15px">
          <div class="font-bold" style="margin-bottom:12px">Distribución de Ganancia (Meta: ${formatearGuaranies(datos.distribucion.metaTotal)})</div>
          <div class="fondos-grid">
            <div class="fondo-box utilidad">
              <div class="fondo-label" style="color:#7c3aed">Utilidad Dueño</div>
              <div class="fondo-meta">${formatearGuaranies(Math.round(datos.distribucion.metaTotal * 0.3333))}</div>
              <div class="fondo-real ${datos.distribucion.utilidad >= datos.distribucion.metaTotal * 0.3333 ? 'ok' : 'warning'}">${datos.distribucion.utilidad >= datos.distribucion.metaTotal * 0.3333 ? '✓' : '⚠'} ${formatearGuaranies(datos.distribucion.utilidad)}</div>
            </div>
            <div class="fondo-box emergencia">
              <div class="fondo-label" style="color:#ea580c">Fondo Emerg.</div>
              <div class="fondo-meta">${formatearGuaranies(Math.round(datos.distribucion.metaTotal * 0.3333))}</div>
              <div class="fondo-real ${datos.distribucion.emergencia >= datos.distribucion.metaTotal * 0.3333 ? 'ok' : 'warning'}">${datos.distribucion.emergencia >= datos.distribucion.metaTotal * 0.3333 ? '✓' : '⚠'} ${formatearGuaranies(datos.distribucion.emergencia)}</div>
            </div>
            <div class="fondo-box inversion">
              <div class="fondo-label" style="color:#0891b2">Fondo Inversión</div>
              <div class="fondo-meta">${formatearGuaranies(Math.round(datos.distribucion.metaTotal * 0.3334))}</div>
              <div class="fondo-real ${datos.distribucion.inversion >= datos.distribucion.metaTotal * 0.3334 ? 'ok' : 'warning'}">${datos.distribucion.inversion >= datos.distribucion.metaTotal * 0.3334 ? '✓' : '⚠'} ${formatearGuaranies(datos.distribucion.inversion)}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- PRESUPUESTO VS REAL NT -->
      <div class="card">
        <div class="card-title">📋 PRESUPUESTO vs REAL</div>
        <table>
          <thead>
            <tr>
              <th>Categoría</th>
              <th class="text-right">Presupuesto</th>
              <th class="text-right">Real</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${datos.presupuestoNT.map(cat => {
              const pct = cat.presupuesto > 0 ? Math.round(cat.real / cat.presupuesto * 100) : 0;
              const isIngreso = cat.categoria.toUpperCase().includes('INGRESO');
              const isGanancia = cat.categoria.toUpperCase().includes('GANANCIA');
              let badgeClass = 'badge-green';
              if (isIngreso || isGanancia) {
                badgeClass = pct >= 100 ? 'badge-green' : pct >= 90 ? 'badge-yellow' : 'badge-red';
              } else {
                badgeClass = pct <= 100 ? 'badge-green' : pct <= 110 ? 'badge-yellow' : 'badge-red';
              }
              return \`<tr>
                <td class="font-bold">► \${cat.categoria}</td>
                <td class="text-right">\${formatearGuaranies(cat.presupuesto)}</td>
                <td class="text-right">\${formatearGuaranies(cat.real)}</td>
                <td class="text-center"><span class="badge \${badgeClass}">\${pct}%</span></td>
              </tr>\`;
            }).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #dbeafe;">
              <td class="font-bold">BALANCE NEUROTEA</td>
              <td class="text-right font-bold">${formatearGuaranies(datos.neurotea.meta)}</td>
              <td class="text-right font-bold ${datos.neurotea.ganancia >= 0 ? 'text-green' : 'text-red'}">${formatearGuaranies(datos.neurotea.ganancia)}</td>
              <td class="text-center"><span class="badge ${datos.neurotea.ganancia >= datos.neurotea.meta ? 'badge-solid-green' : 'badge-solid-red'}">${datos.neurotea.ganancia >= datos.neurotea.meta ? 'META OK' : 'DÉFICIT'}</span></td>
            </tr>
          </tfoot>
        </table>
      </div>

      <!-- FLUJO DEL MES NT -->
      <div class="card">
        <div class="card-title">💵 FLUJO DEL MES</div>
        <div class="flujo-container">
          <div class="flujo-item flujo-ingresos">
            <span>Ingresos</span>
            <span class="font-bold text-green">+ ${formatearGuaranies(datos.neurotea.ingresos)}</span>
          </div>
          <div class="flujo-item flujo-pagados">
            <span>Total Gastos</span>
            <span class="font-bold text-red">- ${formatearGuaranies(datos.neurotea.gastos)}</span>
          </div>
          <div class="flujo-item flujo-pendientes">
            <span>Meta 7%</span>
            <span class="font-bold text-yellow">${formatearGuaranies(datos.neurotea.meta)}</span>
          </div>
          <div class="flujo-balance neurotea">
            <span>GANANCIA</span>
            <span>${formatearGuaranies(datos.neurotea.ganancia)}</span>
          </div>
        </div>
      </div>

      <!-- SALDOS EN CUENTAS NT -->
      <div class="card">
        <div class="card-title">💰 SALDOS EN CUENTAS</div>
        <table>
          <thead>
            <tr>
              <th>Cuenta</th>
              <th class="text-right">Saldo ✏️</th>
              <th class="text-right">Acumulado</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            ${datos.cuentasNT.map((c, idx) => \`
              <tr style="background: \${idx % 2 === 0 ? '#eff6ff' : '#ffffff'}">
                <td>\${c.nombre}</td>
                <td class="text-right text-blue font-bold">\${formatearGuaranies(c.saldo)}</td>
                <td class="text-right">\${formatearGuaranies(c.acumulado)}</td>
                <td class="text-center"><span class="badge \${c.saldo >= c.acumulado ? 'badge-green' : 'badge-yellow'}">\${c.saldo >= c.acumulado ? '✓' : '⚠'}</span></td>
              </tr>
            \`).join('')}
          </tbody>
          <tfoot>
            <tr style="background: #93c5fd;">
              <td class="font-bold">💵 TOTAL DISPONIBLE</td>
              <td class="text-right font-bold">${formatearGuaranies(datos.totalCuentasNT)}</td>
              <td class="text-right font-bold">${formatearGuaranies(datos.cuentasNT.reduce((sum, c) => sum + c.acumulado, 0))}</td>
              <td class="text-center">-</td>
            </tr>
          </tfoot>
        </table>
        <p style="font-size: 0.8em; color: #6b7280; margin-top: 10px;">✏️ = Ingreso manual</p>
      </div>

      <!-- DISTRIBUCIÓN DE GASTOS NT -->
      <div class="card">
        <div class="card-title">📊 DISTRIBUCIÓN DE GASTOS</div>
        <div class="chart-container">
          <svg class="chart-svg" viewBox="0 0 100 100">
            <circle cx="50" cy="50" r="40" fill="none" stroke="#1d4ed8" stroke-width="20" stroke-dasharray="87 100" stroke-dashoffset="25" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#0891b2" stroke-width="20" stroke-dasharray="48 100" stroke-dashoffset="-62" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#8b5cf6" stroke-width="20" stroke-dasharray="12 100" stroke-dashoffset="-110" transform="rotate(-90 50 50)"/>
            <circle cx="50" cy="50" r="40" fill="none" stroke="#ea580c" stroke-width="20" stroke-dasharray="3 100" stroke-dashoffset="-122" transform="rotate(-90 50 50)"/>
          </svg>
          <div class="chart-legend">
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#1d4ed8"></div>Clínica (Alquileres) 58%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#0891b2"></div>Sueldos/Honorarios 32%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#8b5cf6"></div>Obligaciones Leg. 8%</div>
            <div class="chart-legend-item"><div class="chart-legend-color" style="background:#ea580c"></div>Tel/Internet/Var. 2%</div>
          </div>
        </div>
      </div>
    </div>

    <!-- ═══════════════════════════════════════════════════════════════ -->
    <!-- BALANCE CRUZADO -->
    <!-- ═══════════════════════════════════════════════════════════════ -->
    <div class="balance-section">
      <h3>🔄 BALANCE CRUZADO: NEUROTEA ↔ FAMILIA</h3>
      <div class="balance-grid">
        <table class="balance-table">
          <thead>
            <tr>
              <th>Concepto</th>
              <th class="text-right">Este Mes</th>
              <th class="text-right">Acumulado Año</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Préstamo NT → Familia</td>
              <td class="text-right" style="color:#fca5a5">${datos.balanceCruzado.prestamoMes > 0 ? formatearGuaranies(datos.balanceCruzado.prestamoMes) : '-'}</td>
              <td class="text-right font-bold" style="color:#fca5a5">${formatearGuaranies(datos.balanceCruzado.prestamoAcum)}</td>
            </tr>
            <tr>
              <td>Devolución Familia → NT</td>
              <td class="text-right" style="color:#86efac">${datos.balanceCruzado.devolucionMes > 0 ? formatearGuaranies(datos.balanceCruzado.devolucionMes) : '-'}</td>
              <td class="text-right font-bold" style="color:#86efac">${formatearGuaranies(datos.balanceCruzado.devolucionAcum)}</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background:rgba(0,0,0,0.2)">
              <td class="font-bold">SALDO NETO</td>
              <td class="text-right font-bold" style="color:${datos.balanceCruzado.saldoNetoMes > 0 ? '#fca5a5' : '#86efac'}">${formatearGuaranies(datos.balanceCruzado.saldoNetoMes)}</td>
              <td class="text-right font-bold" style="color:${datos.balanceCruzado.saldoNetoAcum > 0 ? '#fca5a5' : '#86efac'}">${formatearGuaranies(datos.balanceCruzado.saldoNetoAcum)}</td>
            </tr>
          </tfoot>
        </table>
        <div class="alert-box">
          ${datos.balanceCruzado.saldoNetoAcum > 0
            ? \`<div class="alert-icon">⚠️</div>
               <div class="alert-title">NT SUBSIDIA A FAMILIA</div>
               <div class="alert-value">Gs. \${formatearGuaranies(datos.balanceCruzado.saldoNetoAcum)}</div>
               <div class="alert-desc">
                 El salario de administrador no está cubriendo los gastos familiares.
               </div>\`
            : \`<div class="alert-icon">✅</div>
               <div class="alert-title">BALANCE EQUILIBRADO</div>
               <div class="alert-value">Gs. \${formatearGuaranies(Math.abs(datos.balanceCruzado.saldoNetoAcum))}</div>
               <div class="alert-desc">
                 Familia no debe a NeuroTEA.
               </div>\`
          }
        </div>
      </div>
    </div>
  </div>

  <!-- ═══════════════════════════════════════════════════════════════ -->
  <!-- FOOTER -->
  <!-- ═══════════════════════════════════════════════════════════════ -->
  <div class="footer">
    <p>Control Financiero ${AÑO} - NeuroTEA & Familia</p>
    <p class="version">Versión ${VERSION}</p>
    <p style="margin-top:5px">✏️ = Campo de ingreso manual | 🔗 = Calculado automáticamente</p>
  </div>

  <script>
    // Formatear números a guaraníes
    function formatGs(num) {
      return new Intl.NumberFormat('es-PY').format(num);
    }

    // Actualizar datos al cambiar mes (placeholder)
    document.getElementById('mes').addEventListener('change', function(e) {
      console.log('Mes seleccionado:', e.target.value);
      // Aquí se llamaría a google.script.run para actualizar datos
    });
  </script>
</body>
</html>`;
}

// Función para obtener datos reales de las hojas
function obtenerDatosDashboard() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const tablero = ss.getSheetByName(NOMBRES_HOJAS.TABLERO);
  const movimiento = ss.getSheetByName(NOMBRES_HOJAS.MOVIMIENTO);

  // Leer mes seleccionado de MOVIMIENTO
  const mesSeleccionado = movimiento ? movimiento.getRange('B3').getValue() : 'Enero';

  // ═══════════════════════════════════════════════════════════════════════════
  // SALDOS EN CUENTAS FAMILIA (filas 8-17)
  // ═══════════════════════════════════════════════════════════════════════════
  const cuentasFamilia = [];
  if (tablero) {
    CUENTAS_FAMILIA.forEach((cuenta, idx) => {
      const fila = 8 + idx;
      cuentasFamilia.push({
        nombre: cuenta,
        esperado: tablero.getRange(fila, 3).getValue() || 0,
        real: tablero.getRange(fila, 4).getValue() || 0,
        diferencia: tablero.getRange(fila, 5).getValue() || 0
      });
    });
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // INDICADORES NT (fila 9 = ingresos/gastos, fila 13 = ganancia/meta)
  // ═══════════════════════════════════════════════════════════════════════════
  let ingresosNT = 0, gastosNT = 0, gananciaNT = 0, metaNT = 0;
  if (tablero) {
    ingresosNT = tablero.getRange('I9').getValue() || 0;
    gastosNT = tablero.getRange('K9').getValue() || 0;
    gananciaNT = tablero.getRange('I13').getValue() || 0;
    metaNT = tablero.getRange('K13').getValue() || 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // DISTRIBUCIÓN DE GANANCIA NT (fila 20: H=Utilidad, I=Emergencia, J-K=Inversión)
  // ═══════════════════════════════════════════════════════════════════════════
  let utilidadDueno = 0, fondoEmergencia = 0, fondoInversion = 0;
  if (tablero) {
    utilidadDueno = tablero.getRange('H20').getValue() || 0;
    fondoEmergencia = tablero.getRange('I20').getValue() || 0;
    fondoInversion = tablero.getRange('J20').getValue() || 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // RESUMEN DEL MES FAMILIA (fila 22=ingresos, 23=egresos, 24=balance)
  // Columna C=Presupuesto, D=Real, E=Estado
  // ═══════════════════════════════════════════════════════════════════════════
  let ingresosFamPres = 0, ingresosFamReal = 0;
  let egresosFamPres = 0, egresosFamReal = 0;
  let balanceFamPres = 0, balanceFamReal = 0;
  if (tablero) {
    ingresosFamPres = tablero.getRange('C22').getValue() || 0;
    ingresosFamReal = tablero.getRange('D22').getValue() || 0;
    egresosFamPres = tablero.getRange('C23').getValue() || 0;
    egresosFamReal = tablero.getRange('D23').getValue() || 0;
    balanceFamPres = tablero.getRange('C24').getValue() || 0;
    balanceFamReal = tablero.getRange('D24').getValue() || 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // SALDOS EN CUENTAS NT (fila 25-27 para 3 cuentas, fila 28=total)
  // Columna I=Saldo, J=Acumulado, K=Estado
  // ═══════════════════════════════════════════════════════════════════════════
  const cuentasNT = [];
  if (tablero) {
    CUENTAS_NT.forEach((cuenta, idx) => {
      const fila = 25 + idx;
      cuentasNT.push({
        nombre: cuenta,
        saldo: tablero.getRange(fila, 9).getValue() || 0,
        acumulado: tablero.getRange(fila, 10).getValue() || 0
      });
    });
  }
  const totalCuentasNT = tablero ? tablero.getRange('I28').getValue() || 0 : 0;

  // ═══════════════════════════════════════════════════════════════════════════
  // LIQUIDEZ FAMILIA (fila 28=caja, 29-31=semanas, 32=saldo final)
  // Columna C=Gastos, D=Saldo, E=Estado
  // ═══════════════════════════════════════════════════════════════════════════
  let cajaDisponibleFam = 0;
  const semanasFam = [];
  let saldoFinalFam = 0, totalGastosFam = 0;
  if (tablero) {
    cajaDisponibleFam = tablero.getRange('D28').getValue() || 0;
    for (let i = 0; i < 3; i++) {
      const fila = 29 + i;
      semanasFam.push({
        nombre: ['Esta semana', 'Próxima semana', '3ra semana'][i],
        gastos: tablero.getRange(fila, 3).getValue() || 0,
        saldo: tablero.getRange(fila, 4).getValue() || 0,
        estado: tablero.getRange(fila, 5).getValue() || ''
      });
    }
    totalGastosFam = tablero.getRange('C32').getValue() || 0;
    saldoFinalFam = tablero.getRange('D32').getValue() || 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // BALANCE CRUZADO (fila ~36-40)
  // ═══════════════════════════════════════════════════════════════════════════
  let prestamoNTMes = 0, prestamoNTAcum = 0;
  let devolucionFamMes = 0, devolucionFamAcum = 0;
  let saldoNetoMes = 0, saldoNetoAcum = 0;
  if (tablero) {
    // Balance cruzado empieza en fila 36 aprox (rowBalance = max(rowFam, rowNT) + 3)
    // Fila 37: Headers, Fila 38: Préstamo, Fila 39: Devolución, Fila 40: Saldo
    prestamoNTMes = tablero.getRange('C38').getValue() || 0;
    prestamoNTAcum = tablero.getRange('D38').getValue() || 0;
    devolucionFamMes = tablero.getRange('C39').getValue() || 0;
    devolucionFamAcum = tablero.getRange('D39').getValue() || 0;
    saldoNetoMes = tablero.getRange('C40').getValue() || 0;
    saldoNetoAcum = tablero.getRange('D40').getValue() || 0;
  }

  // ═══════════════════════════════════════════════════════════════════════════
  // PRESUPUESTO VS REAL POR CATEGORÍAS (desde MOVIMIENTO)
  // ═══════════════════════════════════════════════════════════════════════════
  const presupuestoFamilia = [];
  const presupuestoNT = [];

  if (movimiento) {
    // Leer categorías FAMILIA (filas 9-70 aproximadamente)
    // Estructura: columna A=Concepto, B=Tipo, D=Presupuesto, E=Real
    const datosFam = movimiento.getRange('A9:E70').getValues();
    let currentCategoria = '';
    let categoriaPres = 0, categoriaReal = 0;

    datosFam.forEach((row, idx) => {
      const concepto = row[0];
      const tipo = row[1];
      const presupuesto = row[3] || 0;
      const real = row[4] || 0;

      // Detectar si es header de categoría (comienza con ►)
      if (concepto && concepto.toString().includes('►')) {
        if (currentCategoria) {
          presupuestoFamilia.push({
            categoria: currentCategoria,
            presupuesto: categoriaPres,
            real: categoriaReal
          });
        }
        currentCategoria = concepto.toString().replace('►', '').trim();
        categoriaPres = presupuesto;
        categoriaReal = real;
      }
    });
    // Agregar última categoría
    if (currentCategoria) {
      presupuestoFamilia.push({
        categoria: currentCategoria,
        presupuesto: categoriaPres,
        real: categoriaReal
      });
    }

    // Leer categorías NEUROTEA (filas 73-150 aproximadamente)
    const datosNT = movimiento.getRange('A73:E150').getValues();
    currentCategoria = '';
    categoriaPres = 0;
    categoriaReal = 0;

    datosNT.forEach((row, idx) => {
      const concepto = row[0];
      const tipo = row[1];
      const presupuesto = row[3] || 0;
      const real = row[4] || 0;

      if (concepto && concepto.toString().includes('►')) {
        if (currentCategoria) {
          presupuestoNT.push({
            categoria: currentCategoria,
            presupuesto: categoriaPres,
            real: categoriaReal
          });
        }
        currentCategoria = concepto.toString().replace('►', '').trim();
        categoriaPres = presupuesto;
        categoriaReal = real;
      }
    });
    if (currentCategoria) {
      presupuestoNT.push({
        categoria: currentCategoria,
        presupuesto: categoriaPres,
        real: categoriaReal
      });
    }
  }

  return {
    mes: mesSeleccionado,
    año: AÑO,

    // Cuentas y saldos
    cuentasFamilia: cuentasFamilia,
    cuentasNT: cuentasNT,
    totalCuentasNT: totalCuentasNT,

    // Resumen mensual FAMILIA
    familia: {
      ingresosPres: ingresosFamPres,
      ingresosReal: ingresosFamReal,
      egresosPres: egresosFamPres,
      egresosReal: egresosFamReal,
      balancePres: balanceFamPres,
      balanceReal: balanceFamReal
    },

    // Indicadores NT
    neurotea: {
      ingresos: ingresosNT,
      gastos: gastosNT,
      ganancia: gananciaNT,
      meta: metaNT
    },

    // Distribución de ganancia NT
    distribucion: {
      utilidad: utilidadDueno,
      emergencia: fondoEmergencia,
      inversion: fondoInversion,
      metaTotal: metaNT
    },

    // Presupuesto vs Real por categorías
    presupuestoFamilia: presupuestoFamilia,
    presupuestoNT: presupuestoNT,

    // Liquidez FAMILIA
    liquidezFamilia: {
      cajaDisponible: cajaDisponibleFam,
      semanas: semanasFam,
      totalGastos: totalGastosFam,
      saldoFinal: saldoFinalFam
    },

    // Balance cruzado
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
