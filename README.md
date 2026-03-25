# FinanceFlow

**FinanceFlow** es una aplicación web de gestión de finanzas personales construida con React, TypeScript y Tailwind CSS. Permite registrar ingresos y gastos, visualizar tendencias financieras, definir metas de ahorro y monitorear logros.

---

## Características

- **Panel de control** — Balance, ingresos y gastos del período con KPIs en tiempo real
- **Gestión de transacciones** — Agregar, visualizar y eliminar transacciones con categorías predefinidas
- **Gráficos de tendencias** — Historial mensual de ingresos vs gastos con Recharts
- **Salud financiera** — Puntuación automática basada en la relación ingresos/gastos
- **Metas de ahorro** — Define objetivos y monitorea tu progreso
- **Logros (Achievements)** — Sistema de badges que premia buenos hábitos financieros
- **Búsqueda global** — Acceso rápido a transacciones, categorías y secciones (`Ctrl+K`)
- **Filtros y exportación** — Filtra por rango de fechas y exporta tus datos a CSV
- **Modo oscuro** — Soporte completo de tema claro/oscuro persistido
- **Diseño responsivo** — Optimizado para móvil (bottom nav + FAB) y escritorio (sidebar nav)
- **Atajos de teclado** — `Ctrl+N` para agregar, `Ctrl+K` para buscar, `Esc` para cerrar modales

---

## Stack tecnológico

| Tecnología | Uso |
|---|---|
| React 18 | UI y gestión de estado |
| TypeScript | Tipado estático |
| Tailwind CSS v4 | Estilos utilitarios |
| Framer Motion (`motion/react`) | Animaciones y transiciones |
| Recharts | Gráficos financieros |
| Lucide React | Iconografía |
| Vite | Bundler y servidor de desarrollo |

---

## Inicio rápido

### Requisitos previos

- Node.js >= 18
- npm >= 9

### Instalación

```bash
# Clonar el repositorio
git clone <url-del-repositorio>
cd FinanceFlow

# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`.

### Build de producción

```bash
npm run build
```

Los archivos compilados se generan en la carpeta `dist/`.

---

## Estructura del proyecto

```
src/
├── app/
│   ├── App.tsx                  # Componente raíz y lógica principal
│   ├── components/
│   │   ├── TransactionList.tsx  # Lista de transacciones con eliminación
│   │   ├── QuickAddModal.tsx    # Modal de captura rápida (2 pasos)
│   │   ├── ExpenseChart.tsx     # Gráfico de ingresos vs gastos
│   │   ├── FinancialHealth.tsx  # Puntuación de salud financiera
│   │   ├── KPICard.tsx          # Tarjetas de métricas clave
│   │   ├── GoalsView.tsx        # Vista de metas de ahorro
│   │   ├── Achievements.tsx     # Sistema de logros/badges
│   │   ├── GlobalSearch.tsx     # Búsqueda global (Ctrl+K)
│   │   ├── DateFilter.tsx       # Filtros por fecha y exportación CSV
│   │   ├── BottomNav.tsx        # Navegación móvil inferior
│   │   ├── Breadcrumbs.tsx      # Migajas de pan (escritorio)
│   │   ├── HelpPanel.tsx        # Panel de ayuda contextual
│   │   ├── Toast.tsx            # Notificaciones temporales
│   │   └── ConfirmDialog.tsx    # Diálogo de confirmación
│   ├── constants/
│   │   └── categories.ts        # Categorías de transacciones (fuente única)
│   ├── contexts/
│   │   └── ThemeContext.tsx     # Contexto de tema claro/oscuro
│   └── utils/
│       └── currency.ts          # Formateo de moneda (COP)
├── styles/
│   ├── index.css                # Entry point de estilos
│   ├── tailwind.css             # Directivas de Tailwind
│   ├── theme.css                # Variables CSS del tema
│   └── fonts.css                # Carga de fuentes
└── main.tsx                     # Entry point de React
```

---

## Categorías disponibles

### Gastos
`Alimentación` · `Transporte` · `Entretenimiento` · `Compras` · `Servicios` · `Salud`

### Ingresos
`Salario` · `Freelance` · `Inversión`

---

## Atajos de teclado

| Atajo | Acción |
|---|---|
| `Ctrl+N` / `Cmd+N` | Abrir modal de agregar transacción |
| `Ctrl+K` / `Cmd+K` | Abrir búsqueda global |
| `Esc` | Cerrar modal/panel activo |

---

## Decisiones de diseño

- **Moneda**: Pesos colombianos (COP) con formato `es-CO` via `Intl.NumberFormat`
- **Datos**: Estado local en React (sin backend); preparado para integrar una API REST o Supabase
- **Temas**: Implementado con clases `dark:` de Tailwind y persistido en `localStorage`
- **Categorías**: Definidas como fuente única de verdad en `src/app/constants/categories.ts`
- **Exportación**: CSV nativo con `Blob` + `URL.createObjectURL`; PDF planificado para versión futura

---

## Licencia

Este proyecto está basado en el diseño original disponible en [Figma — FinanceFlow](https://www.figma.com/design/ATkBwf2EXUY2SPymBVxDRK/FinanceFlow).
