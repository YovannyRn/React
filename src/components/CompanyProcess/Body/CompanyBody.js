import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  ButtonGroup,
  Table,
  Form,
} from "react-bootstrap";
import {
  FaTable,
  FaThLarge,
  FaEdit,
  FaTrash,
  FaEye,
  FaPlus,
} from "react-icons/fa";
import KanbanCompany from "./KanbanCompany";
import NewClientForm from "../Forms/NewClientForm";
// Importar servicios para ClientProcess y CompanyProcess
import companyProcessService from "../services/CompanyProcessServices";
import clientProcessService from "../services/ClientProcessService";

function CompanyBody() {
  // Estado para los procesos de empresa (CompanyProcess)
  const [companies, setCompanies] = useState([]);
  // Estado para los clientes (ClientProcess)
  const [clients, setClients] = useState([]);
  // Estado para los clientes filtrados
  const [filteredClients, setFilteredClients] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Vista de tabla o kanban
  const [viewMode, setViewMode] = useState("table");
  // Estado para la selección de filas
  const [selectedRows, setSelectedRows] = useState([]); // Estado para paginación
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;
  // Estado para el modal del nuevo cliente
  const [showNewClientModal, setShowNewClientModal] = useState(false);
  const fetchData = async () => {
    try {
      // Obtener empresas (CompanyProcess)
      const companiesData = await companyProcessService.getAllCompanies();
      setCompanies(companiesData);

      // Obtener clientes (ClientProcess)
      const clientsData = await clientProcessService.getAllClients();
      setClients(clientsData);
      setFilteredClients(clientsData);
    } catch (error) {
      console.error("Error fetching data:", error);
      // Mock data para desarrollo
      const mockClients = [
        {
          _id: "6836049577d0921b78ea2975",
          id: "CL-12345",
          nombre: "Juan Pérez",
          email: "juan.perez@email.com",
          telefono: "+34612345678",
          empresa: "Tecnología Avanzada S.L.",
          servicio_interes: "Kit Digital",
          estado_kanban: "interesado",
          fecha_registro: "2025-05-20T00:00:00.000Z",
          detalle_ia:
            "Cliente interesado en digitalización de procesos internos.",
          formulario_completado: true,
          cita_agendada: false,
          factura_generada: false,
          proyecto_programado: false,
        },
        {
          _id: "6836049577d0921b78ea2976",
          id: "CL-12346",
          nombre: "María García",
          email: "maria.garcia@empresa.com",
          telefono: "+34612345679",
          empresa: "Innovación Digital S.A.",
          servicio_interes: "Transformación Digital",
          estado_kanban: "formulario_recibido",
          fecha_registro: "2025-05-21T00:00:00.000Z",
          detalle_ia: "Necesita automatización de procesos de RRHH.",
          formulario_completado: true,
          cita_agendada: true,
          factura_generada: false,
          proyecto_programado: false,
        },
      ];
      setClients(mockClients);
      setFilteredClients(mockClients);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Filtrar por término de búsqueda
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredClients(clients);
    } else {
      const filtered = clients.filter(
        (client) =>
          client.nombre?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.empresa?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          client.servicio_interes
            ?.toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          client.estado_kanban?.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredClients(filtered);
    }
  }, [searchTerm, clients]);

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  // Seleccionar/deseleccionar todas
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      const allIds = paginatedClients.map((client) => client._id || client.id);
      setSelectedRows(allIds);
    } else {
      setSelectedRows([]);
    }
  };
  const handleDeleteClient = async (id) => {
    try {
      await clientProcessService.deleteClient(id);
      setClients((prev) =>
        prev.filter((client) => (client._id || client.id) !== id)
      );
    } catch (error) {
      console.error("Error deleting client:", error);
      // Para desarrollo, eliminar del estado local
      setClients((prev) =>
        prev.filter((client) => (client._id || client.id) !== id)
      );
    }
  };

  // Manejar la creación exitosa de un nuevo cliente
  const handleClientCreated = (newClient) => {
    setClients((prev) => [...prev, newClient]);
    setShowNewClientModal(false);
  };

  // Cálculos de paginación
  const totalRows = filteredClients.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedClients = filteredClients.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  // Reiniciar página cuando cambian los filtros
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredClients]);
  const getStatusBadge = (estado_kanban) => {
    const statusConfig = {
      interesado: { bg: "primary", text: "Interesado" },
      formulario_recibido: { bg: "info", text: "Formulario Recibido" },
      cita_agendada: { bg: "warning", text: "Cita Agendada" },
      facturacion: { bg: "secondary", text: "Facturación" },
      entrega: { bg: "success", text: "Entrega" },
      "Factura final": { bg: "dark", text: "Factura final" },
    };

    const config = statusConfig[estado_kanban] || {
      bg: "secondary",
      text: estado_kanban,
    };
    return <span className={`badge bg-${config.bg}`}>{config.text}</span>;
  };

  const getCompletionBadges = (client) => {
    const badges = [];
    if (client.formulario_completado)
      badges.push(
        <span key="form" className="badge bg-success me-1">
          Form
        </span>
      );
    if (client.cita_agendada)
      badges.push(
        <span key="cita" className="badge bg-info me-1">
          Cita
        </span>
      );
    if (client.factura_generada)
      badges.push(
        <span key="factura" className="badge bg-warning me-1">
          Factura
        </span>
      );
    if (client.proyecto_programado)
      badges.push(
        <span key="proyecto" className="badge bg-primary me-1">
          Proyecto
        </span>
      );
    return badges.length > 0 ? (
      badges
    ) : (
      <span className="badge bg-light text-dark">Ninguno</span>
    );
  };

  return (
    <Container fluid className="mt-5">
      <Row className="mb-3">
        <Col>
          <Card>
            {" "}
            <Card.Header className="d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Gestión de Clientes por Empresa</h5>
              <div className="d-flex align-items-center gap-3">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => setShowNewClientModal(true)}
                  className="d-flex align-items-center"
                >
                  <FaPlus className="me-2" />
                  Agregar Cliente
                </Button>
                <Form.Control
                  type="text"
                  placeholder="Buscar clientes..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  style={{ width: "250px" }}
                />
                <ButtonGroup size="sm">
                  <Button
                    variant={
                      viewMode === "table" ? "primary" : "outline-primary"
                    }
                    onClick={() => setViewMode("table")}
                  >
                    <FaTable className="me-1" />
                    Tabla
                  </Button>
                  <Button
                    variant={
                      viewMode === "kanban" ? "primary" : "outline-primary"
                    }
                    onClick={() => setViewMode("kanban")}
                  >
                    <FaThLarge className="me-1" />
                    Kanban
                  </Button>
                </ButtonGroup>
              </div>
            </Card.Header>
            <Card.Body className="p-0">
              {viewMode === "table" ? (
                <>
                  <Table responsive hover className="mb-0">
                    <thead className="table-light">
                      <tr>
                        <th width="40">
                          <Form.Check
                            type="checkbox"
                            onChange={handleSelectAll}
                            checked={
                              selectedRows.length === paginatedClients.length &&
                              paginatedClients.length > 0
                            }
                          />
                        </th>
                        <th>Cliente</th>
                        <th>Email</th>
                        <th>Teléfono</th>
                        <th>Empresa</th>
                        <th>Servicio</th>
                        <th>Estado Kanban</th>
                        <th>Progreso</th>
                        <th>Fecha Registro</th>
                        <th width="120">Acciones</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginatedClients.map((client) => (
                        <tr key={client._id || client.id}>
                          <td>
                            <Form.Check
                              type="checkbox"
                              checked={selectedRows.includes(
                                client._id || client.id
                              )}
                              onChange={() =>
                                handleSelectRow(client._id || client.id)
                              }
                            />
                          </td>
                          <td className="fw-bold">{client.nombre}</td>
                          <td>{client.email}</td>
                          <td>{client.telefono}</td>
                          <td>{client.empresa}</td>
                          <td>
                            <span className="badge bg-light text-dark">
                              {client.servicio_interes}
                            </span>
                          </td>
                          <td>{getStatusBadge(client.estado_kanban)}</td>
                          <td>{getCompletionBadges(client)}</td>
                          <td>
                            {new Date(
                              client.fecha_registro
                            ).toLocaleDateString()}
                          </td>
                          <td>
                            <div className="d-flex gap-1">
                              <Button
                                size="sm"
                                variant="outline-info"
                                title="Ver"
                              >
                                <FaEye />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-warning"
                                title="Editar"
                              >
                                <FaEdit />
                              </Button>
                              <Button
                                size="sm"
                                variant="outline-danger"
                                title="Eliminar"
                                onClick={() =>
                                  handleDeleteClient(client._id || client.id)
                                }
                              >
                                <FaTrash />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                  {totalPages > 1 && (
                    <div className="d-flex justify-content-between align-items-center p-3 border-top">
                      <div className="text-muted">
                        Mostrando {(currentPage - 1) * rowsPerPage + 1} a{" "}
                        {Math.min(currentPage * rowsPerPage, totalRows)} de{" "}
                        {totalRows} clientes
                      </div>
                      <div className="d-flex gap-1">
                        <Button
                          size="sm"
                          variant="outline-primary"
                          disabled={currentPage === 1}
                          onClick={() => setCurrentPage(currentPage - 1)}
                        >
                          Anterior
                        </Button>
                        {[...Array(totalPages)].map((_, index) => (
                          <Button
                            key={index + 1}
                            size="sm"
                            variant={
                              currentPage === index + 1
                                ? "primary"
                                : "outline-primary"
                            }
                            onClick={() => setCurrentPage(index + 1)}
                          >
                            {index + 1}
                          </Button>
                        ))}
                        <Button
                          size="sm"
                          variant="outline-primary"
                          disabled={currentPage === totalPages}
                          onClick={() => setCurrentPage(currentPage + 1)}
                        >
                          Siguiente
                        </Button>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <KanbanCompany
                  companies={companies}
                  clients={filteredClients}
                />
              )}
            </Card.Body>{" "}
          </Card>
        </Col>
      </Row>

      {/* Modal para agregar nuevo cliente */}
      <NewClientForm
        show={showNewClientModal}
        onHide={() => setShowNewClientModal(false)}
        onClientCreated={handleClientCreated}
      />
    </Container>
  );
}

export default CompanyBody;
