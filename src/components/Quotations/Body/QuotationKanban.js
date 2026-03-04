import React, { useEffect, useState } from "react";
import {
  DndContext,
  closestCenter,
  useDroppable,
  DragOverlay,
} from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import FolderOutlinedIcon from "@mui/icons-material/FolderOutlined";
import DragHandleRoundedIcon from "@mui/icons-material/DragHandleRounded";
import Avatar from "@mui/material/Avatar";

const stages = [
  { id: "all", title: "All Quotation" },
  { id: "approved", title: "Approved Quotation" },
  { id: "confirmed", title: "Confirmed Supplier" },
  { id: "placed", title: "Placed Order" },
  { id: "delivered", title: "Delivered" },
  { id: "payment", title: "Payment Done" },
];

const QuotationKanban = ({ quotations = [] }) => {
  const [columns, setColumns] = useState({});
  const [activeCard, setActiveCard] = useState(null);

  useEffect(() => {
    const grouped = stages.reduce((acc, stage) => {
      acc[stage.id] = quotations.filter((q) => {
        if (q.advancePayment) return stage.id === "payment";
        return mapStatusToStage(q.status) === stage.id;
      });
      return acc;
    }, {});
    setColumns(grouped);
  }, [quotations]);

  const mapStatusToStage = (status) => {
    switch (status) {
      case "Draft":
      case "Sent":
      case "Received":
        return "all";
      case "Accepted":
        return "approved";
      case "Under Review":
        return "confirmed";
      case "Placed Order":
        return "placed";
      case "Delivered":
        return "delivered";
      case "Payment Done":
        return "payment";
      default:
        return "all";
    }
  };

  const handleDragStart = (event) => {
    const { active } = event;
    // Busca la cotización activa
    for (const col in columns) {
      const found = columns[col].find((q) => (q._id || q.id) === active.id);
      if (found) {
        setActiveCard(found);
        break;
      }
    }
  };

  // Permite mover tarjetas entre columnas (excepto las de pago anticipado)
  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || !active) return;

    // Encuentra la cotización arrastrada
    let draggedQuotation;
    let fromColumn;
    for (const col in columns) {
      const found = columns[col].find((q) => (q._id || q.id) === active.id);
      if (found) {
        draggedQuotation = found;
        fromColumn = col;
        break;
      }
    }
    if (!draggedQuotation) return;
    if (draggedQuotation.advancePayment) return;

    // Determina la columna destino
    let overColumn = null;

    // Si soltaste sobre una columna (droppable), over.id será el id de la columna
    if (columns[over.id]) {
      overColumn = over.id;
    } else {
      // Si soltaste sobre una tarjeta, busca a qué columna pertenece esa tarjeta
      for (const col in columns) {
        if (columns[col].some((q) => (q._id || q.id) === over.id)) {
          overColumn = col;
          break;
        }
      }
    }

    if (!overColumn || fromColumn === overColumn) return;

    setColumns((prev) => {
      const newColumns = { ...prev };
      newColumns[fromColumn] = newColumns[fromColumn].filter(
        (q) => (q._id || q.id) !== active.id,
      );
      newColumns[overColumn] = [draggedQuotation, ...newColumns[overColumn]];
      return newColumns;
    });
    setActiveCard(null);
  };

  return (
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
            quotations={columns[stage.id] || []}
          />
        ))}
      </div>
      <DragOverlay>
        {activeCard ? (
          <div style={{ cursor: "grabbing" }}>
            <KanbanCard
              id={activeCard._id || activeCard.id}
              quotation={activeCard}
              isDraggable={true}
            />
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
};

const KanbanColumn = ({ columnId, title, quotations, activeCard }) => {
  // Hacemos la columna droppable
  const { setNodeRef, isOver } = useDroppable({ id: columnId });

  return (
    <div
      ref={setNodeRef}
      style={{
        minWidth: "214px",
        maxWidth: "260px",
        minHeight: "550px",
        maxHeight: "70vh", // Limita el alto de la columna
        flex: "1",
        background: isOver ? " #e3f2fd" : "transparent",
        transition: "background 0.2s",
      }}
    >
      <div
        className="mb-2 p-2 m-2 rounded d-flex align-items-center"
        style={{ backgroundColor: "rgba(178, 220, 255, 0.52)" }}
      >
        <FolderOutlinedIcon className="me-2 " />
        <h6 className="mb-0">{title}</h6>
      </div>
      <SortableContext
        items={quotations.map((q) => q._id || q.id)}
        strategy={verticalListSortingStrategy}
      >
        {quotations.map(
          (quotation) =>
            (!activeCard ||
              (activeCard._id || activeCard.id) !==
                (quotation._id || quotation.id)) && (
              <KanbanCard
                key={quotation._id || quotation.id}
                id={quotation._id || quotation.id}
                quotation={quotation}
                isDraggable={!quotation.advancePayment}
              />
            ),
        )}
      </SortableContext>
    </div>
  );
};

const KanbanCard = ({ id, quotation, isDraggable }) => {
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

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...(isDraggable ? attributes : {})}
      {...(isDraggable ? listeners : {})}
      className="card mb-3 shadow-sm border-0 mx-2 my-2"
    >
      <div
        className="mt-0 border-0 rounded"
        style={{ backgroundColor: "rgba(238, 238, 238, 0.84)" }}
      >
        <div
          className="card-title d-flex justify-content-center rounded-top"
          style={{ backgroundColor: "rgb(201, 203, 204)" }}
        >
          <DragHandleRoundedIcon className="text-muted text-center" />
        </div>
        <div className="d-flex align-items-center mb-2 mx-3">
          <Avatar
            className="me-2"
            src={
              quotation.supplierImage ||
              `https://ui-avatars.com/api/?name=${encodeURIComponent(
                quotation.supplierName || "S",
              )}&background=random&color=fff&bold=true&size=64`
            }
            alt={quotation.supplierName}
          >
            {quotation.supplierName?.charAt(0) || "?"}
          </Avatar>
          <h6 className="mb-0">{quotation.supplierName}</h6>
        </div>
        <p className="mb-1 text-muted mx-3">
          <strong>
            {quotation.currency || "$"}
            {quotation.totalAmount && quotation.totalAmount.$numberDecimal
              ? parseFloat(quotation.totalAmount.$numberDecimal).toFixed(2)
              : quotation.totalAmount
                ? parseFloat(quotation.totalAmount).toFixed(2)
                : "0.00"}
          </strong>
        </p>
        <p className="mb-1 text-muted mx-3">
          <strong>{quotation.deliveryTime} Days</strong>
        </p>
        <p className="mb-1 text-muted mx-3">
          {quotation.deliveryTerms || "No terms provided"}
        </p>
        <p className="mb-1 text-muted mx-3">
          Valid Until:{" "}
          {quotation.validUntil
            ? new Date(quotation.validUntil).toLocaleDateString()
            : "N/A"}
        </p>
        {quotation.advancePayment && (
          <span className="badge bg-warning text-dark mx-3 mb-2">
            Pago anticipado
          </span>
        )}
      </div>
    </div>
  );
};

export default QuotationKanban;
