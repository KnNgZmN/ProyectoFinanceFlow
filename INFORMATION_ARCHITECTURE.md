# Arquitectura de Información - FinanceFlow

## 📐 Estructura y Organización

### Jerarquía de Información (3 niveles)

```
FinanceFlow (Root)
│
├── 🏠 Inicio (Panel de Control)
│   ├── KPIs (Balance, Ingresos, Gastos)
│   ├── Gráfico de Tendencias
│   ├── Salud Financiera
│   └── Lista de Transacciones
│
├── 📊 Análisis y Logros
│   ├── Sistema de Logros
│   ├── Progreso Global
│   └── Badges Desbloqueables
│
├── 🎯 Metas de Ahorro
│   ├── Resumen de Metas
│   ├── Progreso Individual
│   └── Proyecciones
│
└── 👤 Perfil y Ajustes
    ├── Configuración
    ├── Preferencias
    └── Notificaciones
```

### Organización de Contenido

#### 1. **Modelo Mental del Usuario**
- **Concepto principal**: "Quiero saber cómo está mi dinero"
- **Flujo mental**: Ver → Agregar → Analizar → Planificar
- **Estructura refleja este flujo**:
  1. Inicio = Ver estado actual
  2. Botón + = Agregar transacción
  3. Análisis = Entender hábitos
  4. Metas = Planificar futuro

#### 2. **Categorización de Información**

**Por tipo de usuario:**
- Principiantes → Inicio (info clara y simple)
- Intermedios → Análisis (métricas avanzadas)
- Expertos → Metas + Exportación (control total)

**Por frecuencia de uso:**
- Alta frecuencia: Agregar transacción (FAB siempre visible)
- Media frecuencia: Ver transacciones (pantalla principal)
- Baja frecuencia: Exportar, ajustes (menús secundarios)

**Por tipo de dato:**
- Datos dinámicos: KPIs, transacciones
- Datos estáticos: Metas, logros
- Datos contextuales: Consejos, ayuda

## 🏷️ Sistema de Etiquetado

### Principios de Etiquetado

#### 1. **Consistencia Lingüística**
- Verbos para acciones: "Agregar", "Exportar", "Eliminar"
- Sustantivos para secciones: "Inicio", "Análisis", "Metas"
- Adjetivos para estados: "Completado", "Pendiente", "Excedido"

#### 2. **Lenguaje del Usuario**
| ❌ Término Técnico | ✅ Término Usuario |
|-------------------|-------------------|
| Dashboard | Inicio / Panel de Control |
| Transactions | Transacciones |
| Budget exceeded | Presupuesto excedido |
| Financial health score | Salud Financiera |
| Achievement unlocked | Logro desbloqueado |

#### 3. **Labels Descriptivos**
```
✅ Bueno:
- "Agregar nueva transacción"
- "Exportar reporte CSV"
- "Eliminar transacción"

❌ Malo:
- "Nueva"
- "Exportar"
- "Borrar"
```

#### 4. **Iconografía Consistente**
- 🏠 Home = Inicio
- 📊 TrendingUp = Análisis
- 🎯 Target = Metas
- 👤 User = Perfil
- ➕ Plus = Agregar
- 🔍 Search = Buscar
- 🌙 Moon = Modo oscuro
- ☀️ Sun = Modo claro

### Etiquetas Semánticas por Color

- 🔵 **Azul**: Información, neutral
- 🟢 **Verde**: Éxito, ingresos, positivo
- 🔴 **Rojo**: Error, alertas, gastos excesivos
- 🟠 **Naranja**: Advertencia, gastos normales
- 🟣 **Morado**: Especial, logros

## 🧭 Sistemas de Navegación

### 1. **Navegación Global (Persistente)**

#### Mobile:
- **Bottom Navigation Bar** (4 tabs principales)
  - Siempre visible
  - Indicador visual de sección activa
  - FAB central para acción principal
  - Zona de pulgar optimizada

#### Desktop:
- **Top Navigation Bar**
  - Header sticky
  - Tabs horizontales
  - Breadcrumbs para contexto
  - Búsqueda global accesible

### 2. **Navegación Local (Contextual)**

#### Breadcrumbs (Solo Desktop)
```
Inicio > Análisis y Logros
Inicio > Metas de Ahorro
```
- Proporciona contexto
- Permite retroceder fácilmente
- Mejora orientación espacial

#### Tabs Secundarias
- Dentro de modales (Agregar: Paso 1/2)
- En filtros (Fecha predefinida vs personalizada)
- En categorías (Gastos vs Ingresos)

### 3. **Navegación Suplementaria**

#### Panel de Ayuda
- Botón flotante inferior derecho
- Panel deslizable lateral
- Contexto según sección activa
- Tips específicos por pantalla

#### Atajos de Teclado
- `Ctrl/Cmd + K` → Búsqueda global
- `Ctrl/Cmd + N` → Agregar transacción
- `ESC` → Cerrar modales

## 🔍 Sistema de Búsqueda

### Búsqueda Global (Ctrl/Cmd + K)

#### Alcance de Búsqueda:
1. **Transacciones**
   - Por descripción
   - Por categoría
   - Por monto
   - Por fecha

2. **Categorías**
   - Todas las categorías
   - Con totales agregados
   - Número de transacciones

3. **Secciones**
   - Inicio, Análisis, Metas, Perfil
   - Por palabras clave sinónimas
   - Por contexto

4. **Acciones Rápidas**
   - "Agregar gasto"
   - "Exportar datos"
   - "Ver metas"

#### Características:
- **Búsqueda instantánea** (sin delay perceptible)
- **Resultados categorizados** por tipo
- **Historial de búsquedas** (últimas 5)
- **Sugerencias contextuales**
- **Indicadores visuales** por tipo de resultado

#### UX de Búsqueda:
```
[Icono] Título
        Subtítulo
                    Metadata →
```

Ejemplo:
```
💵 Supermercado
   Alimentación
                    $250.500 • 15 Feb →
```

### Filtros Avanzados

#### Modal de Filtro y Exportación:
1. **Filtros Rápidos** (1 clic)
   - Hoy
   - Esta semana
   - Este mes
   - Últimos 30 días

2. **Rango Personalizado**
   - Fecha inicio
   - Fecha fin
   - Vista previa de resultados

3. **Resumen Filtrado**
   - Número de transacciones
   - Total ingresos
   - Total gastos

4. **Exportación**
   - Formato CSV
   - Formato PDF (próximamente)

## 📱 Responsive Information Architecture

### Adaptación por Dispositivo

#### Mobile (< 640px)
- **Prioridad**: Acciones rápidas
- **Navegación**: Bottom nav
- **Info**: Compacta, vertical
- **Breadcrumbs**: No visibles
- **Headers**: Contextuales por sección

#### Tablet (640px - 1024px)
- **Prioridad**: Balance info/acción
- **Navegación**: Bottom nav + top header
- **Info**: Grid de 2 columnas
- **Breadcrumbs**: Opcionales
- **Headers**: Completos

#### Desktop (> 1024px)
- **Prioridad**: Máxima información
- **Navegación**: Top nav completa
- **Info**: Grid de 3+ columnas
- **Breadcrumbs**: Siempre visibles
- **Headers**: Full con subtítulos

## ✅ Heurísticas de Usabilidad Aplicadas

### 1. **Visibilidad del Estado del Sistema**
- Breadcrumbs muestran ubicación
- Tab activo destacado visualmente
- Progress bars en modales
- Toasts para confirmaciones
- Loading states

### 2. **Prevención de Errores**
- Validación en tiempo real
- Confirmaciones antes de eliminar
- Límites en inputs
- Feedback visual de errores

### 3. **Control y Libertad del Usuario**
- ESC cierra cualquier modal
- Botón "Cancelar" siempre visible
- Deshacer eliminaciones (en toast)
- Navegación libre entre secciones

### 4. **Consistencia y Estándares**
- Mismo color para mismas acciones
- Iconos consistentes
- Posición fija de elementos
- Lenguaje uniforme

### 5. **Reconocimiento vs Recordar**
- Categorías con emojis (reconocer)
- Búsquedas recientes guardadas
- Filtros rápidos predefinidos
- Atajos mostrados en UI

### 6. **Flexibilidad y Eficiencia**
- Atajos de teclado para expertos
- FAB para acceso rápido
- Búsqueda global omnisciente
- Filtros rápidos vs personalizados

### 7. **Ayuda y Documentación**
- Panel de ayuda contextual
- Tips por sección
- Placeholder text descriptivo
- Tooltips informativos

## 🎯 Mejoras de Arquitectura Implementadas

### Antes → Después

| Aspecto | ❌ Antes | ✅ Después |
|---------|---------|-----------|
| **Navegación** | Sin estructura clara | 4 secciones bien definidas |
| **Búsqueda** | Solo filtro de transacciones | Búsqueda global multi-tipo |
| **Orientación** | No hay indicadores | Breadcrumbs + headers contextuales |
| **Ayuda** | Inexistente | Panel lateral contextual |
| **Etiquetado** | Inconsistente | Lenguaje del usuario |
| **Jerarquía** | Plana | 3 niveles claros |
| **Mobile** | Diseño adaptado | Mobile-first nativo |

---

**Resultado**: Arquitectura de información completa que cumple con los 4 pilares fundamentales: **Organización**, **Etiquetado**, **Navegación** y **Búsqueda**.
