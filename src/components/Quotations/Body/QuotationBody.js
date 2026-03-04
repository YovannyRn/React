import React, { useEffect, useState } from "react";
import "../quotations-responsive.css";
import SearchIcon from "@mui/icons-material/Search";
import TuneRoundedIcon from "@mui/icons-material/TuneRounded";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TableChartRoundedIcon from "@mui/icons-material/TableChartRounded";
import ViewKanbanRoundedIcon from "@mui/icons-material/ViewKanbanRounded";
import Button from "@mui/material/Button";
import quotationService from "../services/quotationsService";
import QuotationKanban from "./QuotationKanban";
import FilterQuotation from "../Filter/FilterQuotation";
import ActionsModal from "../ActionsTable/ActionsModal";
import ActionsButtonQuotation from "../ActionsButton/ActionsButtonQuotation";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import NewQuotation from "../NewQuotation/NewQuotation";
import PersonIcon from "@mui/icons-material/Person";
import SuplierPortalQuotation from "../SuplierPortal/suplierPortalQuotation";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

function QuotationBody() {
  // Estado para las cotizaciones
  const [quotations, setQuotations] = useState([]);
  // Estado para las cotizaciones filtradas
  const [filteredQuotations, setFilteredQuotations] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  // Vista de tabla o kanban
  const [viewMode, setViewMode] = useState("table");
  const [anchorEl, setAnchorEl] = useState(null);
  // Panel de filtros
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({});
  // Modal de acciones
  const [selectedQuotation, setSelectedQuotation] = useState(null);
  const [showModal, setShowModal] = useState(false);
  //botones de acciones
  const [selectedRows, setSelectedRows] = useState([]);
  const [actionsAnchorEl, setActionsAnchorEl] = useState(null);
  // Estado para el botón de nueva cotización
  const [showNewQuotation, setShowNewQuotation] = useState(false);
  // Estado para la comparación
  const [showComparison, setShowComparison] = useState(false);
  // Estado para el portal del proveedor
  const [showSupplierPortal, setShowSupplierPortal] = useState(false);
  // Estado para el botón de acciones
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 8;

  const fetchQuotations = async () => {
    try {
      const data = await quotationService.getAllQuotations();
      setQuotations(data);
      setFilteredQuotations(data);
    } catch (error) {
      console.error("Error fetching quotations:", error);
      alert(
        "Error al obtener las cotizaciones. Por favor, inténtalo de nuevo más tarde.",
      );
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  const applyFilters = (filters) => {
    setFilters(filters);

    if (
      (!filters.statuses || filters.statuses.length === 0) &&
      !filters.supplierName &&
      !filters.currency &&
      (!filters.valueRange || filters.valueRange.length === 0)
    ) {
      setFilteredQuotations(quotations);
      return;
    }

    const filtered = quotations.filter((quotation) => {
      const matchesStatus =
        !filters.statuses || filters.statuses.includes(quotation.status);

      const matchesSupplierName =
        !filters.supplierName ||
        (quotation.supplierName &&
          quotation.supplierName
            .toLowerCase()
            .includes(filters.supplierName.toLowerCase()));
      const matchesCurrency =
        !filters.currency || quotation.currency === filters.currency;

      const matchesValueRange =
        !filters.valueRange ||
        (quotation.totalAmount &&
          quotation.totalAmount.$numberDecimal &&
          parseFloat(quotation.totalAmount.$numberDecimal) >=
            filters.valueRange[0] &&
          parseFloat(quotation.totalAmount.$numberDecimal) <=
            filters.valueRange[1]);

      const matchesDeliveryTerms =
        !filters.supplierName ||
        (quotation.supplierName &&
          quotation.supplierName
            .toLowerCase()
            .includes(filters.supplierName.toLowerCase()));

      const matchesPaymentTerms =
        !filters.paymentTerms ||
        (quotation.paymentTerms &&
          quotation.paymentTerms
            .toLowerCase()
            .includes(filters.paymentTerms.toLowerCase()));

      return (
        matchesStatus &&
        matchesSupplierName &&
        matchesCurrency &&
        matchesValueRange &&
        matchesDeliveryTerms &&
        matchesPaymentTerms
      );
    });

    setFilteredQuotations(filtered);
  };

  useEffect(() => {
    if (!searchTerm) {
      setFilteredQuotations(quotations);
    } else {
      setFilteredQuotations(
        quotations.filter(
          (q) =>
            q.supplierName &&
            q.supplierName.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      );
    }
  }, [searchTerm, quotations]);

  // Limpia un filtro individual
  const handleRemoveFilter = (key, value) => {
    let newFilters = { ...filters };
    if (Array.isArray(newFilters[key]) && value !== undefined) {
      newFilters[key] = newFilters[key].filter((v) => v !== value);
      if (newFilters[key].length === 0) newFilters[key] = null;
    } else {
      newFilters[key] = null;
    }
    setFilters(newFilters);
    applyFilters(newFilters);
  };

  // Renderiza los chips de filtros activos
  const renderActiveFilters = () => {
    const chips = [];

    if (filters.statuses && filters.statuses.length) {
      filters.statuses.forEach((status) => {
        chips.push(
          <span
            key={`status-${status}`}
            className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
          >
            Status: {status}
            <span
              style={{
                cursor: "pointer",
                marginLeft: 8,
                color: "#dc3545",
                fontWeight: "bold",
              }}
              onClick={() => handleRemoveFilter("statuses", status)}
            >
              ×
            </span>
          </span>,
        );
      });
    }
    if (filters.supplierName) {
      chips.push(
        <span
          key="supplierName"
          className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
        >
          Supplier: {filters.supplierName}
          <span
            style={{
              cursor: "pointer",
              marginLeft: 8,
              color: "#dc3545",
              fontWeight: "bold",
            }}
            onClick={() => handleRemoveFilter("supplierName")}
          >
            ×
          </span>
        </span>,
      );
    }
    if (filters.currency) {
      chips.push(
        <span
          key="currency"
          className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
        >
          Currency: {filters.currency}
          <span
            style={{
              cursor: "pointer",
              marginLeft: 8,
              color: "#dc3545",
              fontWeight: "bold",
            }}
            onClick={() => handleRemoveFilter("currency")}
          >
            ×
          </span>
        </span>,
      );
    }
    if (filters.valueRange && filters.valueRange.length) {
      chips.push(
        <span
          key="valueRange"
          className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
        >
          Quotation: {filters.valueRange[0]} - {filters.valueRange[1]}
          <span
            style={{
              cursor: "pointer",
              marginLeft: 8,
              color: "#dc3545",
              fontWeight: "bold",
            }}
            onClick={() => handleRemoveFilter("valueRange")}
          >
            ×
          </span>
        </span>,
      );
    }
    if (filters.deliveryTerms) {
      chips.push(
        <span
          key="deliveryTerms"
          className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
        >
          Delivery Terms: {filters.deliveryTerms}
          <span
            style={{
              cursor: "pointer",
              marginLeft: 8,
              color: "#dc3545",
              fontWeight: "bold",
            }}
            onClick={() => handleRemoveFilter("deliveryTerms")}
          >
            ×
          </span>
        </span>,
      );
    }
    if (filters.paymentTerms) {
      chips.push(
        <span
          key="paymentTerms"
          className="badge rounded-pill bg-light border me-2 mb-2 my-1 mx-2 text-muted"
        >
          Payment Terms: {filters.paymentTerms}
          <span
            style={{
              cursor: "pointer",
              marginLeft: 8,
              color: " #dc3545",
              fontWeight: "bold",
            }}
            onClick={() => handleRemoveFilter("paymentTerms")}
          >
            ×
          </span>
        </span>,
      );
    }
    return chips.length > 0 ? (
      <div className="mb-2">
        <span className="me-2 fw-bold text-secondary">Active Filters</span>
        {chips}
      </div>
    ) : null;
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleOpenModal = (quotation) => {
    setSelectedQuotation(quotation);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setSelectedQuotation(null);
    setShowModal(false);
  };

  const handleSelectRow = (id) => {
    setSelectedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id],
    );
  };

  // Seleccionar/deseleccionar todas
  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedRows(filteredQuotations.map((q) => q.id));
    } else {
      setSelectedRows([]);
    }
  };

  // Acciones bulk
  const handleBulkAction = (action) => {
    const selectedData = filteredQuotations.filter((q) =>
      selectedRows.includes(q.id),
    );
    alert(
      `Acción: ${action}\nCotizaciones seleccionadas: ${selectedData
        .map((q) => q.quotationNumber)
        .join(", ")}`,
    );
  };
  const handleStatusChange = (id, newStatus) => {
    setQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)),
    );
    setFilteredQuotations((prev) =>
      prev.map((q) => (q.id === id ? { ...q, status: newStatus } : q)),
    );
    // Si tienes un selectedQuotation, actualízalo también:
    setSelectedQuotation((prev) =>
      prev && prev.id === id ? { ...prev, status: newStatus } : prev,
    );
  };

  const handleDeleteQuotation = async (id) => {
    try {
      await quotationService.deleteQuotation(id);
      await fetchQuotations();
      setShowModal(false);
    } catch (error) {
      alert("Error al eliminar la cotización.");
    }
  };

  const handleCreateQuotation = async (newQuotation) => {
    try {
      const toISOStringOrNull = (date) =>
        date ? new Date(date).toISOString() : null;

      const quotationToSend = {
        ...newQuotation,
        supplierName: newQuotation.supplierName || "Proveedor X",
        supplierImage:
          newQuotation.supplierImage ||
          "https://ui-avatars.com/api/?name=" +
            encodeURIComponent(newQuotation.supplierName || "Proveedor"),
        quotationRequestId:
          newQuotation.quotationRequestId || "6650e213618273612312",
        supplierId: newQuotation.supplierId || "6650e21323213123",
        responsibleId: newQuotation.responsibleId || "6650321312321",
        internalNotes: newQuotation.internalNotes || "",
        supplierComments: newQuotation.supplierComments || "",
        transportCost: newQuotation.transportCost || { $numberDecimal: "0" },
        additionalCosts: newQuotation.additionalCosts || [],
        communicationHistory: newQuotation.communicationHistory || [],
        evaluationScore: newQuotation.evaluationScore || {
          $numberDecimal: "0",
        },
        termsAccepted:
          typeof newQuotation.termsAccepted === "boolean"
            ? newQuotation.termsAccepted
            : false,
        competitivePosition:
          typeof newQuotation.competitivePosition === "number"
            ? newQuotation.competitivePosition
            : 0,
        lastReminder: toISOStringOrNull(newQuotation.lastReminder),
        createdBy: newQuotation.createdBy || "Usuario A",
        updatedBy: newQuotation.updatedBy || "Usuario A",
        creationDate:
          toISOStringOrNull(newQuotation.creationDate) ||
          new Date().toISOString(),
        updatedAt:
          toISOStringOrNull(newQuotation.updatedAt) || new Date().toISOString(),
        items:
          newQuotation.items && newQuotation.items.length > 0
            ? newQuotation.items
            : [
                {
                  itemId: Math.random().toString(36).substr(2, 9),
                  description: "",
                  quantity: 1,
                  unitPrice: { $numberDecimal: "0" },
                  taxes: { $numberDecimal: "0" },
                  totalPrice: { $numberDecimal: "0" },
                  discount: { $numberDecimal: "0" },
                },
              ],
        attachments: newQuotation.attachments || [],
        totalAmount: newQuotation.totalAmount || { $numberDecimal: "0" },
        currency: newQuotation.currency || "USD",
        deliveryTime:
          typeof newQuotation.deliveryTime === "number"
            ? newQuotation.deliveryTime
            : 0,
        deliveryTerms: newQuotation.deliveryTerms || "",
        paymentTerms: newQuotation.paymentTerms || "",
        validUntil:
          toISOStringOrNull(newQuotation.validUntil) ||
          new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        status: newQuotation.status || "Draft",
      };
      await quotationService.createQuotation(quotationToSend);
      await fetchQuotations();
      setFilters({});
      setSearchTerm("");
    } catch (error) {
      alert("Error al crear la cotización. Revisa los campos obligatorios.");
    }
  };

  const totalRows = filteredQuotations.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);
  const paginatedQuotations = filteredQuotations.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage,
  );

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredQuotations]);

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.statuses && filters.statuses.length) count++;
    if (filters.supplierName) count++;
    if (filters.currency) count++;
    if (filters.valueRange && filters.valueRange.length) count++;
    if (filters.deliveryTerms) count++;
    if (filters.paymentTerms) count++;
    return count;
  };

  const activeFiltersCount = getActiveFiltersCount();

  return (
    <div className="container-fluid px-3 px-md-5 mt-3 mt-md-4 quotation-main-wrapper">
      <div className="quotation-toolbar d-flex flex-wrap justify-content-between align-items-center mt-1 mb-3 gap-2">
        <div className="quotation-search">
          <div className="input-group">
            <span
              className="input-group-text bg-light border-end-0"
              style={{
                borderRadius: "10px 0 0 10px",
                border: "1px solid #ccc",
              }}
            >
              <SearchIcon
                className="text-muted"
                style={{ fontSize: "1.2rem" }}
              />
            </span>
            <input
              type="text"
              className="form-control border-start-0"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                borderRadius: "0 10px 10px 0",
                backgroundColor: "#f8f9fa",
                border: "1px solid #ccc",
              }}
            />
          </div>
        </div>

        {/* Botones */}
        <div className="quotation-actions d-flex flex-wrap gap-2 align-items-center">
          <ActionsButtonQuotation
            anchorEl={actionsAnchorEl}
            setAnchorEl={setActionsAnchorEl}
            selectedRows={selectedRows}
            handleBulkAction={handleBulkAction}
            showComparison={showComparison}
            setShowComparison={setShowComparison}
            filteredQuotations={filteredQuotations}
          />
          <Button
            className="border-0 shadow-sm"
            variant="outlined"
            style={{
              borderRadius: "10px",
              color: "rgb(47, 54, 53)",
              backgroundColor: "rgba(238, 238, 238, 0.84)",
              textTransform: "none",
            }}
            onClick={(e) => setAnchorEl(e.currentTarget)}
            endIcon={<KeyboardArrowDownIcon />}
          >
            <span className="d-none d-sm-inline">
              {viewMode === "table" ? "Table View" : "Kanban View"}
            </span>
            <span className="d-inline d-sm-none">
              {viewMode === "table" ? (
                <TableChartRoundedIcon fontSize="small" />
              ) : (
                <ViewKanbanRoundedIcon fontSize="small" />
              )}
            </span>
          </Button>
          <Menu
            className="mt-1"
            style={{ borderRadius: "10px", marginLeft: "-7px" }}
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            <MenuItem
              style={{ fontSize: "14px" }}
              onClick={() => {
                setViewMode("table");
                handleMenuClose();
              }}
            >
              <TableChartRoundedIcon className="me-2 fs-6" /> Table View
            </MenuItem>
            <MenuItem
              style={{ fontSize: "14px" }}
              onClick={() => {
                setViewMode("kanban");
                handleMenuClose();
              }}
            >
              <ViewKanbanRoundedIcon className="me-2 fs-6" /> Kanban View
            </MenuItem>
          </Menu>
          <Button
            className="border-0 shadow-sm quotation-filter-btn"
            variant="outlined"
            style={{
              borderRadius: "10px",
              color: "rgb(47, 54, 53)",
              backgroundColor: "rgba(238, 238, 238, 0.84)",
              textTransform: "none",
              position: "relative",
            }}
            startIcon={<TuneRoundedIcon />}
            onClick={() => setShowFilters(true)}
          >
            <span className="d-none d-sm-inline">Filter</span>
            {activeFiltersCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-6px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  width: "20px",
                  height: "20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "11px",
                  fontWeight: "bold",
                  zIndex: 2,
                }}
              >
                {activeFiltersCount}
              </span>
            )}
          </Button>
          <Button
            className="border-1 shadow-sm btn btn-outline-primary"
            variant="outlined"
            style={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
            }}
            startIcon={<PersonIcon />}
            onClick={() => setShowSupplierPortal(true)}
          >
            <span className="d-none d-md-inline">Supplier Portal</span>
          </Button>
          <Button
            className="border-1 shadow-sm btn btn-outline-primary"
            variant="outlined"
            style={{
              borderRadius: "10px",
              textTransform: "none",
              fontWeight: "bold",
            }}
            startIcon={<AddCircleOutlineIcon />}
            onClick={() => setShowNewQuotation(true)}
          >
            <span className="d-none d-sm-inline">New Quotation</span>
            <span className="d-inline d-sm-none">New</span>
          </Button>
        </div>
      </div>

      {renderActiveFilters()}

      {viewMode === "table" ? (
        <>
          <div className="quotation-table-wrapper">
            <table
              className="table mx-auto"
              style={{
                borderCollapse: "separate",
                borderSpacing: "0 8px",
              }}
            >
              <thead
                style={{
                  backgroundColor: "cian",
                  borderTopLeftRadius: "10px",
                  borderBottomLeftRadius: "10px",
                  "--bs-table-accent-bg": "rgba(178, 220, 255, 0.52)",
                }}
              >
                <tr>
                  <th
                    scope="col"
                    style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      paddingLeft: "20px",
                    }}
                  >
                    <input
                      className="form-check-input"
                      type="checkbox"
                      checked={
                        selectedRows.length === filteredQuotations.length &&
                        filteredQuotations.length > 0
                      }
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th
                    scope="col"
                    style={{ padding: "10px" }}
                    className="d-none d-md-table-cell"
                  >
                    Action
                  </th>
                  <th
                    scope="col"
                    style={{ padding: "10px", whiteSpace: "nowrap" }}
                  >
                    Supplier
                  </th>
                  <th
                    scope="col"
                    style={{ padding: "10px", whiteSpace: "nowrap" }}
                    className="d-none d-sm-table-cell"
                  >
                    Delivery Time
                  </th>
                  <th
                    scope="col"
                    style={{ padding: "10px", whiteSpace: "nowrap" }}
                  >
                    Status
                  </th>
                  <th
                    scope="col"
                    style={{ padding: "10px", whiteSpace: "nowrap" }}
                    className="quotation-amount-col"
                  >
                    Quotation
                  </th>
                  <th
                    scope="col"
                    style={{
                      padding: "10px",
                      whiteSpace: "nowrap",
                      borderTopRightRadius: "10px",
                      borderBottomRightRadius: "10px",
                    }}
                    className="d-none d-lg-table-cell"
                  >
                    Payment Terms
                  </th>
                </tr>
              </thead>
              <tbody>
                {paginatedQuotations.map((quotation, index) => (
                  <tr
                    key={quotation.id}
                    style={{
                      "--bs-table-bg": "rgba(238, 238, 238, 0.84)",
                      borderRadius: "10px",
                    }}
                  >
                    <td
                      style={{
                        borderTopLeftRadius: "10px",
                        borderBottomLeftRadius: "10px",
                        paddingTop: "14px",
                        paddingLeft: "20px",
                      }}
                    >
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={selectedRows.includes(quotation.id)}
                        onChange={() => handleSelectRow(quotation.id)}
                      />
                    </td>
                    <td className="d-none d-md-table-cell">
                      <span
                        type="button"
                        className="ms-3 align-items-center d-flex"
                        onClick={() => handleOpenModal(quotation)}
                      >
                        ...
                      </span>
                    </td>
                    <td style={{ padding: "10px" }}>
                      <div className="d-flex align-items-center">
                        <img
                          src={
                            quotation.supplierImage ||
                            `https://ui-avatars.com/api/?name=${encodeURIComponent(
                              quotation.supplierName || "S",
                            )}&background=random&color=fff&bold=true&size=64`
                          }
                          alt={quotation.supplierName || "Supplier"}
                          className="rounded-circle me-2"
                          style={{
                            width: "36px",
                            height: "36px",
                            objectFit: "cover",
                            border: "2px solid #dee2e6",
                          }}
                        />
                        <span style={{ whiteSpace: "nowrap" }}>
                          {quotation.supplierName}
                        </span>
                      </div>
                    </td>
                    <td
                      style={{ padding: "10px", whiteSpace: "nowrap" }}
                      className="d-none d-sm-table-cell"
                    >
                      {quotation.deliveryTime} Days
                    </td>
                    <td style={{ padding: "10px", whiteSpace: "nowrap" }}>
                      <span
                        className={`text-${
                          quotation.status === "Accepted"
                            ? "success"
                            : quotation.status === "Under Review"
                              ? "primary"
                              : quotation.status === "Draft" ||
                                  quotation.status === "Sent" ||
                                  quotation.status === "Received"
                                ? "warning"
                                : quotation.status === "Rejected" ||
                                    quotation.status === "Expired"
                                  ? "danger"
                                  : "secondary"
                        }`}
                      >
                        ● {quotation.status}
                      </span>
                    </td>
                    <td
                      style={{ padding: "10px", whiteSpace: "nowrap" }}
                      className="quotation-amount-col"
                    >
                      {quotation.totalAmount &&
                      quotation.totalAmount.$numberDecimal
                        ? `${quotation.currency} ${parseFloat(
                            quotation.totalAmount.$numberDecimal,
                          ).toFixed(2)}`
                        : "N/A"}
                    </td>
                    <td
                      style={{
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        padding: "10px",
                        whiteSpace: "nowrap",
                      }}
                      className="d-none d-lg-table-cell"
                    >
                      {quotation.paymentTerms || "N/A"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Paginación */}
          <div className="d-flex justify-content-center my-4">
            <Stack spacing={2}>
              <Pagination
                count={totalPages}
                page={currentPage}
                onChange={(_, value) => setCurrentPage(value)}
                color="primary"
                shape="rounded"
                showFirstButton
                showLastButton
              />
            </Stack>
          </div>
        </>
      ) : (
        <QuotationKanban quotations={filteredQuotations} />
      )}

      {/* Panel de Filtros */}
      {showFilters && (
        <>
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)",
              zIndex: 1049,
            }}
            onClick={() => setShowFilters(false)}
          ></div>
          <FilterQuotation
            onClose={() => setShowFilters(false)}
            onApplyFilters={applyFilters}
          />
        </>
      )}
      {/* Modal de Acciones */}
      {showModal && (
        <ActionsModal
          show={showModal}
          onClose={handleCloseModal}
          quotation={selectedQuotation}
          onStatusChange={handleStatusChange}
          onDeleteQuotation={handleDeleteQuotation}
        />
      )}
      {/* Modal de Nueva Cotización */}
      {showNewQuotation && (
        <NewQuotation
          show={showNewQuotation}
          onClose={() => setShowNewQuotation(false)}
          onCreateQuotation={handleCreateQuotation}
        />
      )}
      {/* Modal del Portal del Proveedor */}
      {showSupplierPortal && (
        <SuplierPortalQuotation
          open={showSupplierPortal}
          onClose={() => setShowSupplierPortal(false)}
        />
      )}
    </div>
  );
}

export default QuotationBody;
