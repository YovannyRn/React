# MediCore — Portal de Gestión

Plataforma de gestión empresarial construida con React 19 como parte de las prácticas en **MediCore**. Integra un módulo de cotizaciones con comparativa inteligente, un CRM visual tipo Kanban, captación de clientes con IA y gestión de formularios.

---

## Módulos

### 1. Gestión de Cotizaciones · `/quotation/list`

El módulo más completo de la plataforma. Permite gestionar todo el ciclo de vida de una cotización con proveedores.

**Vista Lista**

- Tabla completa con todas las cotizaciones: proveedor, monto, moneda, estado, fecha de validez, puntuación de evaluación.
- Búsqueda y filtrado en tiempo real por cualquier campo.
- Creación rápida de nuevas cotizaciones desde un modal con formulario completo: datos del proveedor, ítems de línea, términos de pago y entrega, notas internas, moneda, etc.

**Vista Kanban con Drag & Drop**

- Tablero visual con 6 columnas de estado: `All Quotation → Approved → Confirmed Supplier → Placed Order → Delivered → Payment Done`.
- Arrastra y suelta tarjetas entre columnas para actualizar el estado de la cotización al instante.
- Cada tarjeta muestra avatar del proveedor, monto total y estado visual con colores.

**Comparativa de Cotizaciones (destacado)**

- Selecciona múltiples cotizaciones y ábrelas en un modal de comparación lado a lado.
- Tabla comparativa con resaltado automático del mejor valor en cada criterio (precio, tiempo de entrega, puntuación).
- **Gráfico Radar** (Recharts) para visualizar el equilibrio entre criterios de forma visual e intuitiva.
- **Gráfico de Barras** comparativo por proveedor.
- Sistema de **ponderación ajustable**: ajusta el peso de cada criterio (precio 50%, entrega 30%, evaluación 20% por defecto) y el ranking se recalcula en tiempo real.
- **Exportación en 3 formatos:**
  - **PDF** — captura la tabla, los gráficos y el ranking como imagen de alta resolución (html2canvas + jsPDF).
  - **Excel** — genera un `.xlsx` limpio con todas las filas y cabeceras (ExcelJS).
  - **CSV** — exportación plana compatible con cualquier herramienta.

---

### 2. CRM de Clientes Empresa · `/company-process/list`

CRM ligero y visual pensado para equipos de ventas y atención al cliente. Sin curva de aprendizaje.

**Kanban de pipeline comercial**

- 6 etapas del ciclo de cliente: `Interesado → Formulario Recibido → Cita Agendada → Facturación → Entrega → Factura Final`.
- Drag & drop completo entre etapas — mueve un cliente de fase con un solo gesto.
- Cada tarjeta muestra empresa, contacto, email, teléfono y badges de estado con colores.
- Acciones rápidas directamente en la tarjeta: ver detalle, editar, eliminar.
- Notificaciones toast al mover o actualizar clientes.

**Gestión de empresas y clientes**

- Lista maestra de empresas con filtros.
- Formulario de alta de nuevas empresas y clientes asociados.
- Vista de detalle con toda la información del cliente.

---

### 3. Landing Page de Captación · `/client-form`

Formulario público orientado a captar leads de forma automatizada.

- Formulario sencillo: nombre, empresa, email, servicio de interés.
- Al enviarlo, dispara un webhook a **n8n** que:
  1. Guarda el cliente en base de datos con estado `interesado`.
  2. Genera un **mensaje personalizado con IA** (OpenAI) basado en el servicio solicitado.
  3. Envía automáticamente un **email de respuesta** al cliente con el análisis y un enlace de **Calendly** para agendar cita.
- El cliente queda registrado en el Kanban del CRM de forma automática.

---

### 4. Gestión de Formularios · `/client-form-management`

Panel de administración para gestionar los formularios de clientes recibidos.

- Visualización y edición de los datos de formulario de cada cliente.
- Integrado con el mismo pipeline del CRM.

---

### 5. Dashboard Principal · `/`

Pantalla de inicio con acceso directo a todos los módulos de la plataforma mediante tarjetas visuales.

---

## Pantalla de carga

Al iniciar la aplicación se muestra una pantalla de carga animada (átomo con electrones en cyan sobre fondo oscuro) que permanece hasta que todos los recursos de la página están completamente cargados. Mejora la experiencia percibida especialmente en la primera carga.

---

## Tecnologías principales

| Categoría         | Librerías                                        |
| ----------------- | ------------------------------------------------ |
| UI / Componentes  | React 19, MUI v7, React Bootstrap 2, React Icons |
| Routing           | React Router DOM 7                               |
| Tablas avanzadas  | Material React Table 3                           |
| Drag & Drop       | @dnd-kit/core, @dnd-kit/sortable                 |
| Gráficos          | Recharts 2                                       |
| HTTP              | Axios 1                                          |
| Exportación PDF   | jsPDF 4, html2canvas                             |
| Exportación Excel | ExcelJS                                          |
| Exportación CSV   | Papaparse                                        |
| Fechas            | date-fns                                         |
| Estilos base      | Bootstrap 5                                      |

---

## Instalación

```bash
git clone https://github.com/YovannyRn/React.git
cd React
npm install
npm start     # → http://localhost:3000
```

## Scripts

```bash
npm start         # Modo desarrollo
npm run build     # Build de producción
npm test          # Ejecutar tests
```

---

## Autor

**Yovanny Nunez** — Prácticas MediCore
