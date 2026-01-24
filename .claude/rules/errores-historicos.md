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
| FAMILIA | 9-70 | **9-113** |
| NEUROTEA | 73-150 | **119-200** |

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
