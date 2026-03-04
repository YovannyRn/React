import React, { useState, useEffect } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useDroppable,
} from "@dnd-kit/core";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { Card, Badge, Button, Toast, ToastContainer } from "react-bootstrap";
import {
  FaBuilding,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaEdit,
  FaTrash,
  FaEye,
} from "react-icons/fa";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";

const stages = [
  {
    id: "interesado",
    title: "Interesado",
    description: "Clientes que han mostrado interés inicial",
  },
  {
    id: "formulario_recibido",
    title: "Formulario Recibido",
    description: "Clientes que completaron el formulario",
  },
  {
    id: "cita_agendada",
    title: "Cita Agendada",
    description: "Clientes con cita programada",
  },
  {
    id: "facturacion",
    title: "Facturación",
    description: "Presupuesto enviado o factura generada",
  },
  {
    id: "entrega",
    title: "Entrega",
    description: "Proceso de entrega del servicio",
  },
  {
    id: "factura_final",
    title: "Factura Final",
    description: "Proyecto finalizado y facturado",
  },
];

const KanbanCompany = ({ companies = [], clients = [], onClientUpdate }) => {
  const [columns, setColumns] = useState({});
  const [activeCard, setActiveCard] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const showNotification = (message, type = "success") => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, 5000);
  };
  useEffect(() => {
    // Función para mapear estados de la BD a estados del Kanban
    const mapStateToKanban = (estado) => {
      const stateMapping = {
        Interesado: "interesado",
        "Formulario recibido": "formulario_recibido",
        "Cita agendada": "cita_agendada",
        Facturación: "facturacion",
        Entrega: "entrega",
        "Factura final": "factura_final",
      };
      return stateMapping[estado] || estado.toLowerCase().replace(/\s+/g, "_");
    };

    // Organizar clientes por estado_kanban mapeado
    const newColumns = {};

    stages.forEach((stage) => {
      newColumns[stage.id] = clients.filter((client) => {
        const mappedState = mapStateToKanban(client.estado_kanban);
        return mappedState === stage.id;
      });
    });

    setColumns(newColumns);
  }, [clients]);

  const handleDragStart = (event) => {
    const { active } = event;
    const client = clients.find((c) => (c._id || c.id) === active.id);
    setActiveCard(client);
  }; // Permite mover tarjetas entre columnas con validación
  const handleDragEnd = async (event) => {
    const { active, over } = event;

    setActiveCard(null);

    if (!over || active.id === over.id) return;

    const activeClient = clients.find((c) => (c._id || c.id) === active.id);
    const newStatus = over.id;

    // Función para mapear estados del Kanban a estados de la BD
    const mapKanbanToState = (kanbanState) => {
      const kanbanMapping = {
        interesado: "Interesado",
        formulario_recibido: "Formulario recibido",
        cita_agendada: "Cita agendada",
        facturacion: "Facturación",
        entrega: "Entrega",
        factura_final: "Factura final",
      };
      return kanbanMapping[kanbanState] || kanbanState;
    };

    // Solo permitir cambio si es una columna válida
    if (newStatus && activeClient && stages.find((s) => s.id === newStatus)) {
      try {
        showNotification(
          `Actualizando estado de ${activeClient.nombre}...`,
          "info",
        );

        const newStateForDB = mapKanbanToState(newStatus);

        // Actualizar el estado local
        const updatedClients = clients.map((client) =>
          (client._id || client.id) === active.id
            ? { ...client, estado_kanban: newStateForDB }
            : client,
        );

        // Reorganizar las columnas usando la misma función de mapeo
        const mapStateToKanban = (estado) => {
          const stateMapping = {
            Interesado: "interesado",
            "Formulario recibido": "formulario_recibido",
            "Cita agendada": "cita_agendada",
            Facturación: "facturacion",
            Entrega: "entrega",
            "Factura final": "factura_final",
          };
          return (
            stateMapping[estado] || estado.toLowerCase().replace(/\s+/g, "_")
          );
        };

        const newColumns = {};
        stages.forEach((stage) => {
          newColumns[stage.id] = updatedClients.filter((client) => {
            const mappedState = mapStateToKanban(client.estado_kanban);
            return mappedState === stage.id;
          });
        });

        setColumns(newColumns);

        showNotification(
          `✅ ${activeClient.nombre} movido a "${newStatus}"`,
          "success",
        );

        // Log para n8n monitoring
        console.log(`🔄 Cliente ${activeClient.id} actualizado:`, {
          cliente: activeClient.nombre,
          estadoAnterior: activeClient.estado_kanban,
          estadoNuevo: newStateForDB,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error("Error al actualizar estado:", error);
        showNotification(
          `❌ Error al actualizar ${activeClient.nombre}: ${error.message}`,
          "error",
        );
      }
    }
  };
  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="d-flex flex-row overflow-auto mt-0">
          {stages.map((stage) => (
            <KanbanColumn
              key={stage.id}
              columnId={stage.id}
              title={stage.title}
              description={stage.description}
              clients={columns[stage.id] || []}
              activeCard={activeCard}
            />
          ))}
        </div>
        <DragOverlay>
          {activeCard ? (
            <div style={{ cursor: "grabbing" }}>
              <KanbanCard
                id={activeCard._id || activeCard.id}
                client={activeCard}
                isDraggable={true}
              />
            </div>
          ) : null}
        </DragOverlay>
      </DndContext>

      {/* Sistema de notificaciones */}
      <ToastContainer position="top-end" className="p-3">
        {notifications.map((notification) => (
          <Toast
            key={notification.id}
            bg={
              notification.type === "error"
                ? "danger"
                : notification.type === "info"
                  ? "info"
                  : "success"
            }
            text={notification.type === "error" ? "white" : "dark"}
            delay={5000}
            autohide
            show={true}
          >
            <Toast.Body>{notification.message}</Toast.Body>
          </Toast>
        ))}
      </ToastContainer>
    </>
  );
};

const KanbanColumn = ({
  columnId,
  title,
  description,
  clients,
  activeCard,
  loading,
}) => {
  // Hacemos la columna droppable
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: "214px",
        maxWidth: "260px",
        minHeight: "550px",
        maxHeight: "70vh",
        flex: "1",
        background: isOver ? "#e3f2fd" : "transparent",
        transition: "background 0.2s",
        opacity: loading ? 0.7 : 1,
      }}
    >
      <div
        className="mb-2 p-2 m-2 rounded d-flex flex-column"
        style={{ backgroundColor: "rgba(178, 220, 255, 0.52)" }}
      >
        <div className="d-flex align-items-center mb-1">
          <FolderOutlinedIcon className="me-2" />
          <h6 className="mb-0 flex-grow-1">{title}</h6>
          <Badge bg="secondary">{clients.length}</Badge>
        </div>
        {description && (
          <small className="text-muted" style={{ fontSize: "0.7rem" }}>
            {description}
          </small>
        )}
      </div>
      <SortableContext
        items={clients.map((c) => c._id || c.id)}
        strategy={verticalListSortingStrategy}
      >
        {clients.map(
          (client) =>
            (!activeCard ||
              (activeCard._id || activeCard.id) !==
                (client._id || client.id)) && (
              <KanbanCard
                key={client._id || client.id}
                id={client._id || client.id}
                client={client}
                isDraggable={true}
              />
            ),
        )}
      </SortableContext>
    </div>
  );
};

const KanbanCard = ({ id, client, isDraggable }) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id,
      disabled: !isDraggable,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
    transition,
    opacity: isDraggable ? 1 : 0.7,
    cursor: isDraggable ? "grab" : "not-allowed",
  };
  const getStatusBadge = (estado_kanban) => {
    const statusConfig = {
      interesado: { bg: "primary", text: "Interesado" },
      formulario_recibido: { bg: "info", text: "Formulario Recibido" },
      cita_agendada: { bg: "warning", text: "Cita Agendada" },
      facturacion: { bg: "secondary", text: "Facturación" },
      entrega: { bg: "success", text: "Entrega" },
      factura_final: { bg: "dark", text: "Factura Final" },
    };

    const config = statusConfig[estado_kanban] || {
      bg: "secondary",
      text: estado_kanban,
    };
    return <Badge bg={config.bg}>{config.text}</Badge>;
  };

  const getCompletionBadges = (client) => {
    const badges = [];
    if (client.formulario_completado)
      badges.push(
        <Badge
          key="form"
          bg="success"
          className="me-1"
          style={{ fontSize: "0.6rem" }}
        >
          F
        </Badge>,
      );
    if (client.cita_agendada)
      badges.push(
        <Badge
          key="cita"
          bg="info"
          className="me-1"
          style={{ fontSize: "0.6rem" }}
        >
          C
        </Badge>,
      );
    if (client.factura_generada)
      badges.push(
        <Badge
          key="factura"
          bg="warning"
          className="me-1"
          style={{ fontSize: "0.6rem" }}
        >
          $
        </Badge>,
      );
    if (client.proyecto_programado)
      badges.push(
        <Badge
          key="proyecto"
          bg="primary"
          className="me-1"
          style={{ fontSize: "0.6rem" }}
        >
          P
        </Badge>,
      );
    return badges;
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="mb-2 mx-2"
    >
      <Card className="shadow-sm border-0" style={{ fontSize: "0.85rem" }}>
        <Card.Body className="p-3">
          {/* Header con nombre del cliente */}
          <div className="d-flex align-items-center mb-2">
            <FaUser className="text-primary me-2" />
            <h6 className="mb-0 fw-bold text-truncate">{client.nombre}</h6>
          </div>

          {/* Información de contacto */}
          <div className="mb-2">
            <div className="d-flex align-items-center mb-1">
              <FaBuilding className="text-muted me-2" size="0.8rem" />
              <small className="text-muted">
                {client.empresa || "Sin empresa"}
              </small>
            </div>
            <div className="d-flex align-items-center mb-1">
              <FaEnvelope className="text-muted me-2" size="0.8rem" />
              <small className="text-muted text-truncate">{client.email}</small>
            </div>
            <div className="d-flex align-items-center">
              <FaPhone className="text-muted me-2" size="0.8rem" />
              <small className="text-muted">
                {client.telefono || "Sin teléfono"}
              </small>
            </div>
          </div>

          {/* Servicio de interés */}
          <div className="mb-2">
            <Badge bg="light" text="dark" className="w-100">
              {client.servicio_interes}
            </Badge>
          </div>

          {/* Estado y progreso */}
          <div className="d-flex flex-wrap align-items-center gap-1 mb-2">
            {getStatusBadge(client.estado_kanban)}
            <div className="d-flex">{getCompletionBadges(client)}</div>
          </div>

          {/* Detalle IA si existe */}
          {client.detalle_ia && (
            <div className="mb-2">
              <small className="text-muted" style={{ fontSize: "0.7rem" }}>
                {client.detalle_ia.length > 50
                  ? `${client.detalle_ia.substring(0, 50)}...`
                  : client.detalle_ia}
              </small>
            </div>
          )}

          {/* Fecha */}
          <div className="mb-2">
            <small className="text-muted">
              Registro: {new Date(client.fecha_registro).toLocaleDateString()}
            </small>
          </div>

          {/* Enlaces si existen */}
          <div className="mb-2 d-flex gap-1">
            {client.enlace_pdf && (
              <Badge bg="secondary" style={{ fontSize: "0.6rem" }}>
                PDF
              </Badge>
            )}
            {client.enlace_calendly && (
              <Badge bg="info" style={{ fontSize: "0.6rem" }}>
                CAL
              </Badge>
            )}
          </div>

          {/* Botones de acción */}
          <div className="d-flex justify-content-end gap-1">
            <Button size="sm" variant="outline-info" title="Ver">
              <FaEye size="0.8rem" />
            </Button>
            <Button size="sm" variant="outline-warning" title="Editar">
              <FaEdit size="0.8rem" />
            </Button>
            <Button size="sm" variant="outline-danger" title="Eliminar">
              <FaTrash size="0.8rem" />
            </Button>
          </div>
        </Card.Body>
      </Card>
    </div>
  );
};

export default KanbanCompany;
