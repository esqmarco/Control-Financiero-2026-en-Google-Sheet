# Proceso Obligatorio para Modificar Código

> **REGLA CRÍTICA**: Este proceso es OBLIGATORIO para CUALQUIER modificación de código.
> Saltarse este proceso puede causar inconsistencias en el sistema.

---

## 1. ANTES DE TOCAR CÓDIGO

### 1.1 Leer Documentación Obligatoria
```
1. CLAUDE.md → Secciones relevantes al cambio
2. DECISIONES.md → Verificar que no se revierta una decisión
3. PRD.md → Entender arquitectura si es cambio estructural
```

### 1.2 Presentar Propuesta al Usuario

**SIEMPRE** antes de modificar código, presentar:

```markdown
## PROPUESTA DE CAMBIO

### Problema identificado:
[Describir el problema o requerimiento]

### Solución propuesta:
[Describir qué se va a cambiar]

### Archivos afectados:
- [ ] archivo1.gs - Descripción del cambio
- [ ] archivo2.gs - Descripción del cambio

### Análisis de impacto:
| Componente | Afectado | Acción Requerida |
|------------|----------|------------------|
| CALCULOS   | Sí/No    | [Descripción]    |
| MOVIMIENTO | Sí/No    | [Descripción]    |
| TABLERO    | Sí/No    | [Descripción]    |
| WebApp     | Sí/No    | [Descripción]    |
| Fórmulas   | Sí/No    | [Descripción]    |

### ¿Procedo con el cambio?
```

**ESPERAR** confirmación del usuario antes de modificar.

---

## 2. ANÁLISIS DE IMPACTO OBLIGATORIO

### 2.1 Verificar TODOS los componentes

Antes de tocar cualquier archivo, analizar impacto en:

#### Backend (Apps Script)
- [ ] Code.gs - Menú, triggers, onEdit
- [ ] Config.gs - Arrays de datos maestros
- [ ] Sheets.gs - Creación de hojas y fórmulas
- [ ] Calculos.gs - Cálculos intermedios
- [ ] Tablero.gs - Dashboard en Sheets
- [ ] WebApp.gs - Dashboard HTML
- [ ] Utils.gs - Funciones utilitarias

#### Hojas de Cálculo
- [ ] CONFIG - Listas, metas, saldos iniciales
- [ ] PRESUPUESTO - Fórmulas de totales
- [ ] GASTOS_FIJOS - Estructura de columnas
- [ ] CARGA_FAMILIA - Validaciones, LINK_ID
- [ ] CARGA_NT - Validaciones, LINK_ID
- [ ] CALCULOS - Secciones 1-7
- [ ] MOVIMIENTO - Fórmulas REAL, rangos
- [ ] TABLERO - Referencias a CALCULOS
- [ ] LIQUIDEZ - Rangos de datos

#### Frontend (Dashboard)
- [ ] Gráficos Chart.js - DATA.* propiedades
- [ ] CSS/HTML - Estructura visual
- [ ] Funciones JS - Cálculos client-side

### 2.2 Preguntas Obligatorias

1. ¿Este cambio afecta las fórmulas de CALCULOS?
2. ¿Este cambio afecta los rangos de filas en MOVIMIENTO?
3. ¿Este cambio afecta las referencias en TABLERO?
4. ¿Este cambio afecta la lectura de datos en WebApp?
5. ¿Este cambio rompe la coherencia entre hojas?

---

## 3. DURANTE LA MODIFICACIÓN

### 3.1 Un cambio a la vez
- Hacer UN solo cambio lógico por commit
- NO mezclar fixes de diferentes issues

### 3.2 Mantener coherencia
- Si cambias una fórmula en un lugar, verificar TODOS los lugares que la usan
- Si cambias un rango, verificar TODAS las referencias a ese rango
- Si cambias una estructura, verificar TODOS los lectores de esa estructura

---

## 4. DESPUÉS DE MODIFICAR

### 4.1 Verificación
```bash
# Ejecutar comando de verificación
/verificar
```

### 4.2 Actualizar Documentación

**OBLIGATORIO** si el cambio es significativo:
- [ ] Actualizar CLAUDE.md con los cambios
- [ ] Agregar entrada a CHANGELOG.md
- [ ] Actualizar PRD.md si cambia arquitectura

### 4.3 Commit con Mensaje Descriptivo
```
tipo(alcance): descripción breve

PROBLEMA:
- Descripción del problema

SOLUCIÓN:
- Descripción de la solución

ARCHIVOS MODIFICADOS:
- archivo1.gs: cambio específico
- archivo2.gs: cambio específico
```

---

## 5. VISIÓN HOLÍSTICA

### Principio Fundamental
```
El sistema es un TODO coherente.
Un cambio en cualquier parte puede afectar otras partes.
NADA debe quedar sin revisar.
```

### Flujo de Datos a Considerar
```
CONFIG → CARGA → CALCULOS → TABLERO → WebApp
           ↓         ↓          ↓
      GASTOS_FIJOS   MOVIMIENTO  LIQUIDEZ
```

### Pregunta Final
> ¿He verificado el impacto de este cambio en TODO el flujo de datos?

---

## RESUMEN: Checklist Obligatorio

- [ ] Leí la documentación relevante
- [ ] Presenté la propuesta al usuario
- [ ] Usuario aprobó el cambio
- [ ] Analicé impacto en TODOS los componentes
- [ ] Verifiqué coherencia del flujo de datos
- [ ] Ejecuté /verificar después del cambio
- [ ] Actualicé la documentación
- [ ] Commit con mensaje descriptivo

---

*Esta regla es OBLIGATORIA y no puede saltarse bajo ninguna circunstancia.*
