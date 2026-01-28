---
paths:
  - "gs/*.gs"
---

# ERRORES HISTORICOS - NO REPETIR

> Estos bugs ya fueron resueltos. Si ves código que los reintroduce, DETENTE.

---

## BUG 1: Rangos incorrectos en MOVIMIENTO

| Entidad | INCORRECTO | CORRECTO |
|---------|------------|----------|
| FAMILIA | 9-70 | **9-116** |
| NEUROTEA | 73-150 | **122-206** |

**Impacto:** Egresos incompletos, NEUROTEA incluía SUSCRIPCIONES de FAMILIA.

---

## BUG 2: SUMIFS con MONTH()/YEAR()

```
INCORRECTO: =SUMIFS(rango; MONTH(fechas); mes)
CORRECTO:   =SUMPRODUCT((condicion)*(MONTH(fechas)=mes)*valores)
```

**Razón:** SUMIFS no acepta funciones como criterios en locale español.

---

## BUG 3: Number() sin limpiarMonto()

```javascript
// INCORRECTO
const monto = Number(valor);

// CORRECTO
const monto = limpiarMonto(valor);
```

**Razón:** Formato paraguayo usa puntos como separador de miles (5.000.000).

---

## BUG 4: setAllowInvalid(false) bloquea auto-creación

```javascript
// INCORRECTO - Rechaza tipos auto-creados
.setAllowInvalid(false)

// CORRECTO - Permite valores programáticos
.setAllowInvalid(true)
```

**Razón:** "Préstamo Familia" y "Devolución NeuroTEA" no están en dropdown pero se crean automáticamente.

---

## BUG 5: Auto-creación sin verificar todos los campos

```javascript
// INCORRECTO - Dispara solo con monto
if (monto > 0) autoCrear();

// CORRECTO - Verifica TODO
if (fecha && tipo === 'Egreso Familiar' && categoria === 'VARIABLES'
    && esPrestamoODevolucion && monto >= 10000 && cuenta) {
  autoCrear();
}
```

**Campos requeridos:** FECHA, TIPO, CATEGORÍA, SUBCATEGORÍA, MONTO, CUENTA

---

## BUG 6: DISPONIBLE calculado independientemente

```javascript
// INCORRECTO - Cálculo separado
DISPONIBLE = SALDO_INICIAL + INGRESOS - EGRESOS

// CORRECTO - Referencia directa
DISPONIBLE = TOTAL_DISPONIBLE (suma de cuentas)
```

**Razón:** Garantiza coherencia entre cuentas individuales y total.

---

## BUG 7: Fórmulas complejas para distribución ganancia

```
// INCORRECTO - Porcentajes configurables
=IFERROR(H21*VALUE(CONFIG!$B$42)/100;0)

// CORRECTO - Simple división
=IF(H21>0;H21/3;0)
```

**Razón:** Si hay ganancia, dividir entre 3. No necesita más.

---

## BUG 8: Auto-creación no retrigerea en TODOS los campos

```javascript
// INCORRECTO - Solo SUBCAT, MONTO, CUENTA reintentan
if (col === 4 || col === 6 || col === 7) intentarAutoCreacion();

// CORRECTO - TODOS los campos reintentan
if (col === 1 || col === 2 || col === 3 || col === 4 || col === 6 || col === 7) {
  intentarAutoCreacion();
}
```

**Razón:** Si el usuario completa FECHA, TIPO o CATEGORÍA después de SUBCATEGORÍA, la auto-creación nunca se dispara.

---

## BUG 9: Validación no retorna resultado al caller

```javascript
// INCORRECTO - Limpia celda pero no avisa
function validarPrestamo(sheet, row, valor) {
  if (bloqueado) sheet.getRange(row, 4).setValue('');
  // No retorna nada, código sigue ejecutando
}
validarPrestamo(...);
intentarAutoCreacion(); // Se ejecuta con celda vacía

// CORRECTO - Retorna boolean y caller hace return
function validarPrestamo(sheet, row, valor) {
  if (bloqueado) { sheet.getRange(row, 4).setValue(''); return true; }
  return false;
}
if (validarPrestamo(...)) return;
intentarAutoCreacion(); // Solo si no fue bloqueado
```

**Razón:** Sin return, la auto-creación lee la celda ya vacía y sale silenciosamente.

---

## BUG 10: setValue('-') sin clearDataValidations()

```javascript
// INCORRECTO - "-" no está en requireValueInRange(CONFIG)
sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO);
// → Google Sheets muestra "No válido" en la celda

// CORRECTO - Limpiar validación antes de poner "-"
sheet.getRange(row, 4).setValue('-').setBackground(COLORES.GRIS_FONDO).clearDataValidations();
```

**Razón:** `requireValueInRange(CONFIG)` no incluye "-". Al asignar "-" a celdas con esta validación activa, Google Sheets muestra error visual. Aplica a TODAS las ramas donde se setea "-": Ingreso (cols 3+4), Ahorro (col 4), CATEGORÍA no-VARIABLES (col 4), auto-creación (cols 3+4).

---

## BUG 11: Validación no restaurada al cambiar de Ingreso a Egreso

```javascript
// INCORRECTO - Limpia validaciones al ir a Ingreso, pero no las restaura al volver a Egreso
if (esIngreso) {
  sheet.getRange(row, 3).clearDataValidations();
} else {
  sheet.getRange(row, 3).setBackground(COLORES.BLANCO);
  // ← Falta setDataValidation() → dropdown desaparece permanentemente
}

// CORRECTO - Restaurar dropdown completo al cambiar a Egreso
if (esIngreso) {
  sheet.getRange(row, 3).clearDataValidations();
} else {
  sheet.getRange(row, 3).setBackground(COLORES.BLANCO).setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['-', ...CARGA_CATEGORIAS_*, ...CATEGORIAS_AHORRO_*], true)
      .setAllowInvalid(false)
      .build()
  );
}
```

**Razón:** `clearDataValidations()` elimina permanentemente el dropdown. Si el usuario cambia de Ingreso a Egreso, el dropdown de CATEGORÍA ya no aparece y no puede seleccionar nada.

---

## BUG 12: SUMPRODUCT muere con UNA fecha texto/malformada

```
INCORRECTO: =IFERROR(SUMPRODUCT((B=tipo)*(MONTH(A)=mes)*(YEAR(A)=año)*(F));0)
// Si UNA celda en A tiene texto, MONTH(A) produce error en ESA celda,
// que contamina TODA la multiplicación de arrays → SUMPRODUCT = error → IFERROR → 0

CORRECTO: =IFERROR(SUMPRODUCT((B=tipo)*(IFERROR(MONTH(A);0)=mes)*(IFERROR(YEAR(A);0)=año)*(F));0)
// IFERROR DENTRO del SUMPRODUCT: solo esa celda da 0 (no matchea ningún mes)
// Las demás filas siguen funcionando
```

**Razón:** MONTH() y YEAR() sobre texto producen error. En un SUMPRODUCT, un error en cualquier elemento mata toda la multiplicación de arrays. El IFERROR externo captura TODO el SUMPRODUCT como error y retorna 0 para TODOS los conceptos.

---

## BUG 13: requireValueInRange no reconoce datos pegados desde otro Google Sheet

```javascript
// INCORRECTO - Pegar texto "Supermercado" desde otro sheet muestra warning
.requireValueInRange(configSheet.getRange(21, 3, length, 1), true)
// requireValueInRange valida contra celdas del rango, pero el texto pegado
// puede no coincidir exactamente (encoding, whitespace invisible)

// CORRECTO - Lista de strings para matching exacto
.requireValueInList(VARIABLES_FAMILIA, true)
// requireValueInList valida contra strings directos
// Texto pegado que coincide exactamente se acepta sin warnings
```

**Razón:** `requireValueInRange(CONFIG)` referencia un rango de celdas. Los valores pegados desde otro Google Sheet pueden no coincidir exactamente con los valores del rango (diferencias invisibles de encoding/whitespace). `requireValueInList` compara strings directos, más confiable para datos pegados.

---

## BUG 14: getLastRow() con ARRAYFORMULA (v7.31)

```javascript
// INCORRECTO - ARRAYFORMULA en columna J extiende a fila 500
var ultimaFila = sheet.getLastRow(); // Retorna 500
var filaVacia = ultimaFila + 1; // Fila 501, FUERA del rango SUMPRODUCT

// CORRECTO - Escanear columna A (FECHA) para encontrar datos reales
var fechas = sheet.getRange('A4:A500').getValues();
for (var i = 0; i < fechas.length; i++) {
  if (!fechas[i][0] || fechas[i][0] === '') return i + 4;
}
```

**Razón:** `getLastRow()` incluye filas con ARRAYFORMULA aunque no tengan datos. Transacciones escritas fuera del rango SUMPRODUCT (A4:A500) se ignoran silenciosamente.

---

## BUG 15: obtenerReferenciaReserva sin entidad (v7.33)

```javascript
// INCORRECTO - Siempre busca en FAMILIA primero
function obtenerReferenciaReserva(concepto) {
  const idx = VARIABLES_FAMILIA.indexOf(concepto); // "Reserva Var. 4" existe aquí
  if (idx >= 0) return '=CONFIG!$C${21+idx}'; // Siempre columna C
}
// Para NT, "Reserva Var. 4" retorna =CONFIG!$C$38 (que apunta a METAS, no a la reserva NT)

// CORRECTO - Pasar entidad para desambiguar
function obtenerReferenciaReserva(concepto, entidad) {
  if (entidad === 'NEUROTEA') {
    const idx = VARIABLES_NT.indexOf(concepto);
    if (idx >= 0) return '=CONFIG!$G${21+idx}'; // Columna G para NT
  } else {
    const idx = VARIABLES_FAMILIA.indexOf(concepto);
    if (idx >= 0) return '=CONFIG!$C${21+idx}'; // Columna C para FAMILIA
  }
}
```

**Razón:** "Reserva Var. 1-5" existen en AMBOS arrays. Sin el parámetro entidad, NT obtiene referencias a columna C (FAMILIA) que pueden apuntar a celdas METAS en lugar de VARIABLES_NT.

---

## BUG 16: getUi() desde editor de Apps Script (v7.33)

```javascript
// INCORRECTO - getUi() solo funciona desde menú del spreadsheet
function reinicializarSistema() {
  const ui = SpreadsheetApp.getUi();
  ui.alert('Confirmación...'); // ERROR desde editor
  crearTodasLasHojas();
}

// CORRECTO - Usar try/catch para detectar contexto
function reinicializarSistema() {
  try {
    const ui = SpreadsheetApp.getUi();
    // Código con UI aquí (confirmaciones, etc.)
    if (ui.alert('¿Confirmar?') === ui.Button.YES) {
      _crearTodasLasHojas();
    }
  } catch (e) {
    // Desde editor: ejecutar sin UI
    console.log('Ejecutando desde editor...');
    _crearTodasLasHojas();
  }
}

function _crearTodasLasHojas() {
  // Lógica sin UI
}
```

**Razón:** `SpreadsheetApp.getUi()` lanza error "Cannot call SpreadsheetApp.getUi() from this context" cuando se ejecuta desde el editor de Apps Script. Usar try/catch permite detectar el contexto y ejecutar sin UI cuando es necesario.
