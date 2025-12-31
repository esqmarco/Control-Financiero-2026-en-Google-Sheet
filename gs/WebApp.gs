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
            <tr><td>ITAU Marco</td><td class="text-right">2.500.000</td><td class="text-right text-blue font-bold">2.350.000</td><td class="text-right text-red font-bold">-150.000</td></tr>
            <tr><td>Coop. Univ. Marco</td><td class="text-right">1.200.000</td><td class="text-right text-blue font-bold">1.200.000</td><td class="text-right text-gray">-</td></tr>
            <tr><td>ITAU Clara</td><td class="text-right">800.000</td><td class="text-right text-blue font-bold">650.000</td><td class="text-right text-red font-bold">-150.000</td></tr>
            <tr><td>UENO Clara</td><td class="text-right">500.000</td><td class="text-right text-blue font-bold">520.000</td><td class="text-right text-green font-bold">+20.000</td></tr>
            <tr><td>Tarjeta Solar Clara</td><td class="text-right text-red">-1.500.000</td><td class="text-right text-red font-bold">-1.800.000</td><td class="text-right text-red font-bold">-300.000</td></tr>
            <tr><td>Tarjeta ITAU Clara</td><td class="text-right text-red">-800.000</td><td class="text-right text-red font-bold">-950.000</td><td class="text-right text-red font-bold">-150.000</td></tr>
            <tr><td>Tarjeta ITAU Marco</td><td class="text-right">0</td><td class="text-right text-blue font-bold">0</td><td class="text-right text-gray">-</td></tr>
            <tr><td>Gourmed</td><td class="text-right">350.000</td><td class="text-right text-blue font-bold">280.000</td><td class="text-right text-red font-bold">-70.000</td></tr>
            <tr><td>Efectivo</td><td class="text-right">0</td><td class="text-right text-blue font-bold">0</td><td class="text-right text-gray">-</td></tr>
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
            <tr><td class="font-bold">► INGRESOS FAMILIA</td><td class="text-right">15.200.000</td><td class="text-right">14.500.000</td><td class="text-center"><span class="badge badge-yellow">95%</span></td></tr>
            <tr><td class="font-bold">► GASTOS FIJOS</td><td class="text-right">7.250.000</td><td class="text-right">7.100.000</td><td class="text-center"><span class="badge badge-green">98%</span></td></tr>
            <tr><td class="font-bold">► CUOTAS Y PRÉSTAMOS</td><td class="text-right">5.541.000</td><td class="text-right">5.541.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► OBLIGACIONES LEGALES</td><td class="text-right">450.000</td><td class="text-right">380.000</td><td class="text-center"><span class="badge badge-green">84%</span></td></tr>
            <tr><td class="font-bold">► SUSCRIPCIONES</td><td class="text-right">520.000</td><td class="text-right">520.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► VARIABLES</td><td class="text-right">900.000</td><td class="text-right">1.250.000</td><td class="text-center"><span class="badge badge-red">139%</span></td></tr>
            <tr><td class="font-bold">► AHORRO</td><td class="text-right">500.000</td><td class="text-right">0</td><td class="text-center"><span class="badge badge-red">0%</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background: #dcfce7;">
              <td class="font-bold">BALANCE FAMILIA</td>
              <td class="text-right font-bold">39.000</td>
              <td class="text-right font-bold text-red">-291.000</td>
              <td class="text-center"><span class="badge badge-solid-red">DÉFICIT</span></td>
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
            <span class="font-bold text-green">+ 14.500.000</span>
          </div>
          <div class="flujo-item flujo-pagados">
            <span>Egresos Pagados</span>
            <span class="font-bold text-red">- 12.450.000</span>
          </div>
          <div class="flujo-item flujo-pendientes">
            <span>Egresos Pendientes</span>
            <span class="font-bold text-yellow">- 2.341.000</span>
          </div>
          <div class="flujo-balance familia">
            <span>BALANCE</span>
            <span>2.050.000</span>
          </div>
        </div>
      </div>

      <!-- LIQUIDEZ -->
      <div class="card">
        <div class="card-title">📅 LIQUIDEZ - PRÓXIMOS PAGOS</div>
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th class="text-center">Cuotas</th>
              <th class="text-right">Monto</th>
              <th class="text-right">Saldo</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #dcfce7;"><td class="font-bold">Caja disponible</td><td class="text-center">-</td><td class="text-right">-</td><td class="text-right font-bold">2.350.000</td><td class="text-center">-</td></tr>
            <tr style="background: #fef2f2;"><td class="text-red">⚠️ Atrasados</td><td class="text-center font-bold text-red">2</td><td class="text-right text-red">-850.000</td><td class="text-right font-bold">1.500.000</td><td class="text-center"><span class="badge badge-solid-red">PAGAR</span></td></tr>
            <tr><td>Esta semana</td><td class="text-center font-bold">4</td><td class="text-right">-2.100.000</td><td class="text-right font-bold text-red">-600.000</td><td class="text-center"><span class="badge badge-solid-red">FALTA</span></td></tr>
            <tr><td>Próxima semana</td><td class="text-center font-bold">3</td><td class="text-right">-1.800.000</td><td class="text-right font-bold text-red">-2.400.000</td><td class="text-center"><span class="badge badge-solid-red">FALTA</span></td></tr>
            <tr><td>3ra semana</td><td class="text-center font-bold">2</td><td class="text-right">-1.200.000</td><td class="text-right font-bold text-red">-3.600.000</td><td class="text-center"><span class="badge badge-solid-red">FALTA</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background: #f1f5f9;"><td class="font-bold">SALDO FINAL</td><td class="text-center font-bold">11</td><td class="text-right font-bold">-5.950.000</td><td class="text-right font-bold text-red">-3.600.000</td><td class="text-center"><span class="badge badge-solid-red">DÉFICIT</span></td></tr>
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
            <div class="kpi-value text-blue">30.000.000</div>
          </div>
          <div class="kpi-box" style="background:#f3f4f6">
            <div class="kpi-label">GASTOS DEL MES</div>
            <div class="kpi-value">27.300.000</div>
          </div>
          <div class="kpi-box" style="background:#dcfce7">
            <div class="kpi-label">GANANCIA REAL</div>
            <div class="kpi-value text-green">2.700.000</div>
          </div>
          <div class="kpi-box" style="background:#fef3c7">
            <div class="kpi-label">META 7%</div>
            <div class="kpi-value text-yellow">2.100.000</div>
          </div>
        </div>

        <div class="progress-container">
          <div style="display:flex;justify-content:space-between;font-size:0.9em;margin-bottom:8px">
            <span>% Gastos sobre Ingresos</span>
            <span class="font-bold">91% / 93% máx</span>
          </div>
          <div class="progress-bar">
            <div class="progress-fill" style="width:91%"></div>
            <span class="progress-text">91%</span>
          </div>
        </div>

        <div style="text-align:center;margin:15px 0">
          <span class="badge badge-solid-green" style="padding:10px 25px;font-size:1em">✅ META CUMPLIDA - Superávit: 600.000</span>
        </div>

        <div style="border-top:1px solid #e5e7eb;padding-top:15px;margin-top:15px">
          <div class="font-bold" style="margin-bottom:12px">Distribución de Ganancia (7% = 2.100.000)</div>
          <div class="fondos-grid">
            <div class="fondo-box utilidad">
              <div class="fondo-label" style="color:#7c3aed">Utilidad Dueño</div>
              <div class="fondo-meta">700.000</div>
              <div class="fondo-real ok">✓ 580.000</div>
            </div>
            <div class="fondo-box emergencia">
              <div class="fondo-label" style="color:#ea580c">Fondo Emerg.</div>
              <div class="fondo-meta">700.000</div>
              <div class="fondo-real ok">✓ 700.000</div>
            </div>
            <div class="fondo-box inversion">
              <div class="fondo-label" style="color:#0891b2">Fondo Inversión</div>
              <div class="fondo-meta">700.000</div>
              <div class="fondo-real warning">⚠ 420.000</div>
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
            <tr><td class="font-bold">► INGRESOS NT</td><td class="text-right">30.000.000</td><td class="text-right">30.000.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► CLÍNICA</td><td class="text-right">17.630.000</td><td class="text-right">17.630.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► SUELDOS Y HONORARIOS</td><td class="text-right">9.600.000</td><td class="text-right">9.300.000</td><td class="text-center"><span class="badge badge-green">97%</span></td></tr>
            <tr><td class="font-bold">► TELEFONÍA E INTERNET</td><td class="text-right">550.000</td><td class="text-right">550.000</td><td class="text-center"><span class="badge badge-green">100%</span></td></tr>
            <tr><td class="font-bold">► OBLIGACIONES LEGALES</td><td class="text-right">2.300.000</td><td class="text-right">1.850.000</td><td class="text-center"><span class="badge badge-green">80%</span></td></tr>
            <tr><td class="font-bold">► EVENTOS</td><td class="text-right">-</td><td class="text-right">-</td><td class="text-center"><span class="badge badge-blue">-%</span></td></tr>
            <tr><td class="font-bold">► VARIABLES</td><td class="text-right">450.000</td><td class="text-right">670.000</td><td class="text-center"><span class="badge badge-red">149%</span></td></tr>
            <tr><td class="font-bold">► GANANCIA (7%)</td><td class="text-right">2.100.000</td><td class="text-right">2.700.000</td><td class="text-center"><span class="badge badge-green">129%</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background: #dbeafe;">
              <td class="font-bold">BALANCE NEUROTEA</td>
              <td class="text-right font-bold">-530.000</td>
              <td class="text-right font-bold text-green">2.700.000</td>
              <td class="text-center"><span class="badge badge-solid-green">SUPERÁVIT</span></td>
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
            <span class="font-bold text-green">+ 30.000.000</span>
          </div>
          <div class="flujo-item flujo-pagados">
            <span>Egresos Pagados</span>
            <span class="font-bold text-red">- 24.500.000</span>
          </div>
          <div class="flujo-item flujo-pendientes">
            <span>Egresos Pendientes</span>
            <span class="font-bold text-yellow">- 2.800.000</span>
          </div>
          <div class="flujo-balance neurotea">
            <span>BALANCE</span>
            <span>5.500.000</span>
          </div>
        </div>
      </div>

      <!-- LIQUIDEZ NT -->
      <div class="card">
        <div class="card-title">📅 LIQUIDEZ - PRÓXIMOS PAGOS</div>
        <table>
          <thead>
            <tr>
              <th>Concepto</th>
              <th class="text-center">Cuotas</th>
              <th class="text-right">Monto</th>
              <th class="text-right">Saldo</th>
              <th class="text-center">Estado</th>
            </tr>
          </thead>
          <tbody>
            <tr style="background: #dbeafe;"><td class="font-bold">Caja disponible</td><td class="text-center">-</td><td class="text-right">-</td><td class="text-right font-bold">8.500.000</td><td class="text-center">-</td></tr>
            <tr style="background: #dcfce7;"><td class="text-green">✅ Atrasados</td><td class="text-center font-bold text-green">0</td><td class="text-right">-</td><td class="text-right font-bold">8.500.000</td><td class="text-center"><span class="badge badge-solid-green">OK</span></td></tr>
            <tr><td>Esta semana</td><td class="text-center font-bold">2</td><td class="text-right">-4.130.000</td><td class="text-right font-bold text-green">4.370.000</td><td class="text-center"><span class="badge badge-solid-green">ALCANZA</span></td></tr>
            <tr><td>Próxima semana</td><td class="text-center font-bold">3</td><td class="text-right">-2.300.000</td><td class="text-right font-bold text-green">2.070.000</td><td class="text-center"><span class="badge badge-solid-green">ALCANZA</span></td></tr>
            <tr><td>3ra semana</td><td class="text-center font-bold">1</td><td class="text-right">-500.000</td><td class="text-right font-bold text-green">1.570.000</td><td class="text-center"><span class="badge badge-solid-green">ALCANZA</span></td></tr>
          </tbody>
          <tfoot>
            <tr style="background: #f1f5f9;"><td class="font-bold">SALDO FINAL</td><td class="text-center font-bold">6</td><td class="text-right font-bold">-6.930.000</td><td class="text-right font-bold text-green">1.570.000</td><td class="text-center"><span class="badge badge-solid-green">OK</span></td></tr>
          </tfoot>
        </table>
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
              <td class="text-right" style="color:#fca5a5">3.000.000</td>
              <td class="text-right font-bold" style="color:#fca5a5">8.500.000</td>
            </tr>
            <tr>
              <td>Devolución Familia → NT</td>
              <td class="text-right" style="color:#86efac">-</td>
              <td class="text-right font-bold" style="color:#86efac">2.000.000</td>
            </tr>
          </tbody>
          <tfoot>
            <tr style="background:rgba(0,0,0,0.2)">
              <td class="font-bold">SALDO NETO</td>
              <td class="text-right font-bold" style="color:#fca5a5">3.000.000</td>
              <td class="text-right font-bold" style="color:#fca5a5">6.500.000</td>
            </tr>
          </tfoot>
        </table>
        <div class="alert-box">
          <div class="alert-icon">⚠️</div>
          <div class="alert-title">NT SUBSIDIA A FAMILIA</div>
          <div class="alert-value">Gs. 6.500.000</div>
          <div class="alert-desc">
            El salario de administrador (Gs. 5.000.000) no está cubriendo los gastos familiares.<br>
            Déficit mensual promedio: Gs. 2.166.667
          </div>
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
  // Por ahora retorna datos de ejemplo
  // En la implementación completa, esto leerá de las hojas
  return {
    mes: 'Enero',
    año: AÑO,
    familia: {
      ingresos: 14500000,
      egresosPagados: 12450000,
      egresosPendientes: 2341000
    },
    neurotea: {
      ingresos: 30000000,
      gastos: 27300000,
      ganancia: 2700000
    }
  };
}
