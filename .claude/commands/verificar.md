# Verificar Sistema de Control Financiero

Realiza una verificación completa del sistema:

1. **Verificar Code.gs:**
   - Revisar que CONFIG contenga todas las listas del Plan Maestro
   - Verificar que las 7 hojas estén definidas (CONFIG, PRESUPUESTO, GASTOS_FIJOS, CARGA_FAMILIA, CARGA_NT, MOVIMIENTO, TABLERO)
   - Verificar validaciones Anti-Burro

2. **Verificar consistencia con Plan Maestro:**
   - Comparar TIPOS_INGRESO_FAMILIA con sección 3.3
   - Comparar TIPOS_INGRESO_NT con sección 3.4
   - Comparar CUENTAS con secciones 3.5 y 3.6
   - Comparar CATEGORÍAS con secciones 3.7 y 3.9
   - Comparar SUBCATEGORÍAS con secciones 3.8 y 3.10
   - Verificar los 16 EVENTOS_NT (6 definidos + 10 reservas)

3. **Verificar lógica de negocio:**
   - Ganancia NT = Ingresos - Egresos (meta 7%)
   - Distribución: 33.33% Utilidad, 33.33% Emergencia, 33.33% Inversión
   - GASTOS_FIJOS usa último valor (arrastre de BASE)
   - Liquidez 3 semanas basada en DÍA VENC

Reporta cualquier inconsistencia encontrada.
