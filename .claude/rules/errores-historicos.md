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
