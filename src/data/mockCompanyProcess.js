// Mock data for Company Process — based on companyProcess.js model
// Fields: id, nombre, responsable, email_contacto, servicios, kanban, fecha_actualizacion

const mockCompanyProcess = [
  {
    _id: "65b2c2000000000000000001",
    id: "CP-001",
    nombre: "Clínica San Rafael",
    responsable: "Yovanny Nunez",
    email_contacto: "gestion@sanrafael.es",
    servicios: ["Consulta general", "Urgencias", "Radiología"],
    kanban: [
      {
        columna: "interesado",
        descripcion: "Primer contacto recibido",
        clientes: [],
      },
      {
        columna: "formulario_recibido",
        descripcion: "Formulario enviado",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Cita programada con dirección",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "En proceso de facturación",
        clientes: [],
      },
      { columna: "entrega", descripcion: "Servicio en entrega", clientes: [] },
      { columna: "factura_final", descripcion: "Cerrado", clientes: [] },
    ],
    fecha_actualizacion: "2026-02-15T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000002",
    id: "CP-002",
    nombre: "Centro Médico Vallecas",
    responsable: "Yovanny Nunez",
    email_contacto: "administracion@cmvallecas.es",
    servicios: ["Pediatría", "Dermatología", "Nutrición"],
    kanban: [
      { columna: "interesado", descripcion: "Lead recibido", clientes: [] },
      {
        columna: "formulario_recibido",
        descripcion: "Documentación completada",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Videollamada agendada",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "Propuesta económica enviada",
        clientes: [],
      },
      { columna: "entrega", descripcion: "Proyecto activo", clientes: [] },
      {
        columna: "factura_final",
        descripcion: "Cerrado y cobrado",
        clientes: [],
      },
    ],
    fecha_actualizacion: "2026-01-28T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000003",
    id: "CP-003",
    nombre: "Hospital Comarcal Norte",
    responsable: "Yovanny Nunez",
    email_contacto: "compras@hcn.sanidad.es",
    servicios: ["Cirugía", "UCI", "Laboratorio", "Farmacia"],
    kanban: [
      {
        columna: "interesado",
        descripcion: "Solicitud de información",
        clientes: [],
      },
      {
        columna: "formulario_recibido",
        descripcion: "Necesidades documentadas",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Reunión con jefatura",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "Contrato en revisión legal",
        clientes: [],
      },
      {
        columna: "entrega",
        descripcion: "Implementación en curso",
        clientes: [],
      },
      { columna: "factura_final", descripcion: "Liquidado", clientes: [] },
    ],
    fecha_actualizacion: "2026-03-01T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000004",
    id: "CP-004",
    nombre: "Clínica Dental Sonrisa",
    responsable: "Yovanny Nunez",
    email_contacto: "info@cds-sonrisa.es",
    servicios: ["Odontología general", "Ortodoncia", "Implantología"],
    kanban: [
      { columna: "interesado", descripcion: "Web lead", clientes: [] },
      {
        columna: "formulario_recibido",
        descripcion: "Formulario recibido",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Cita presencial agendada",
        clientes: [],
      },
      { columna: "facturacion", descripcion: "Oferta aceptada", clientes: [] },
      { columna: "entrega", descripcion: "En servicio", clientes: [] },
      {
        columna: "factura_final",
        descripcion: "Factura emitida",
        clientes: [],
      },
    ],
    fecha_actualizacion: "2026-02-20T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000005",
    id: "CP-005",
    nombre: "Fisioterapia & Rehabilitación MovePro",
    responsable: "Yovanny Nunez",
    email_contacto: "contacto@movepro.es",
    servicios: ["Fisioterapia deportiva", "Rehabilitación neurológica"],
    kanban: [
      { columna: "interesado", descripcion: "Contacto inicial", clientes: [] },
      {
        columna: "formulario_recibido",
        descripcion: "Formulario online completado",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Cita evaluación",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "Presupuesto enviado",
        clientes: [],
      },
      { columna: "entrega", descripcion: "Tratamiento iniciado", clientes: [] },
      { columna: "factura_final", descripcion: "Alta y cierre", clientes: [] },
    ],
    fecha_actualizacion: "2026-02-10T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000006",
    id: "CP-006",
    nombre: "Laboratorio Análisis BioSalud",
    responsable: "Yovanny Nunez",
    email_contacto: "muestras@biosalud-lab.es",
    servicios: ["Análisis clínicos", "PCR", "Genómica"],
    kanban: [
      {
        columna: "interesado",
        descripcion: "Referido por clínica",
        clientes: [],
      },
      {
        columna: "formulario_recibido",
        descripcion: "Alta en sistema",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Extracción programada",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "Resultados entregados, factura pendiente",
        clientes: [],
      },
      { columna: "entrega", descripcion: "Informe enviado", clientes: [] },
      { columna: "factura_final", descripcion: "Cobrado", clientes: [] },
    ],
    fecha_actualizacion: "2026-01-15T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000007",
    id: "CP-007",
    nombre: "Residencia Mayores El Pinar",
    responsable: "Yovanny Nunez",
    email_contacto: "direccion@residencia-elpinar.es",
    servicios: ["Atención geriátrica", "Medicina interna", "Psicología"],
    kanban: [
      {
        columna: "interesado",
        descripcion: "Solicitud por familia",
        clientes: [],
      },
      {
        columna: "formulario_recibido",
        descripcion: "Valoración geriátrica realizada",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Reunión equipo médico",
        clientes: [],
      },
      {
        columna: "facturacion",
        descripcion: "Plan de cuidados aprobado",
        clientes: [],
      },
      { columna: "entrega", descripcion: "Residente ingresado", clientes: [] },
      { columna: "factura_final", descripcion: "Alta/traslado", clientes: [] },
    ],
    fecha_actualizacion: "2026-02-05T10:00:00.000Z",
  },
  {
    _id: "65b2c2000000000000000008",
    id: "CP-008",
    nombre: "Policlínica Mediterráneo",
    responsable: "Yovanny Nunez",
    email_contacto: "recepcion@policlinicamed.es",
    servicios: ["Cardiología", "Neurología", "Endocrinología", "Oftalmología"],
    kanban: [
      {
        columna: "interesado",
        descripcion: "Lead captado en evento",
        clientes: [],
      },
      {
        columna: "formulario_recibido",
        descripcion: "Ficha clínica recibida",
        clientes: [],
      },
      {
        columna: "cita_agendada",
        descripcion: "Primera consulta agendada",
        clientes: [],
      },
      { columna: "facturacion", descripcion: "Seguro validado", clientes: [] },
      { columna: "entrega", descripcion: "Seguimiento activo", clientes: [] },
      {
        columna: "factura_final",
        descripcion: "Expediente cerrado",
        clientes: [],
      },
    ],
    fecha_actualizacion: "2026-03-02T10:00:00.000Z",
  },
];

export default mockCompanyProcess;
