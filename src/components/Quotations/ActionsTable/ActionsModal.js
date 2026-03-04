import React, {useState} from "react";
import { Offcanvas, Button, Table, Modal } from "react-bootstrap";
import PictureAsPdfRoundedIcon from '@mui/icons-material/PictureAsPdfRounded';
import FileDownloadRoundedIcon from '@mui/icons-material/FileDownloadRounded';
import PrintIcon from '@mui/icons-material/Print';

const ActionsModal = ({ show, onClose, quotation, onStatusChange, onDeleteQuotation }) => {

  const [showConfirm, setShowConfirm] = useState(false);

  if (!quotation) return null;

  // Función para imprimir el detalle en PDF
  const handlePrint = () => {
    const printWindow = window.open('', '_blank', 'width=900,height=700');
    printWindow.document.write(`
      <html>
      <head>
        <title>Quotation Detail</title>
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
        <style>
          body { font-family: 'Segoe UI', Arial, sans-serif; margin: 40px; }
          .title { font-size: 2rem; font-weight: bold; margin-bottom: 1rem; }
          .section-title { font-size: 1.1rem; font-weight: bold; margin-top: 2rem; margin-bottom: 0.5rem; color: #0d6efd; }
          .info-table th { background: #f8f9fa; width: 200px; }
          .info-table td, .info-table th { padding: 8px 16px; }
          .items-table th { background: #e3f2fd; }
          .items-table td, .items-table th { padding: 8px 16px; }
          .attachment { background: #f8f9fa; border-radius: 8px; padding: 10px 16px; display: inline-block; margin-bottom: 1rem; }
          .footer-btns { margin-top: 2rem; }
        </style>
      </head>
      <body>
        <div class="title">Invoice Details</div>
        <div style="font-size:1.3rem; font-weight:bold; color:#0d6efd; margin-bottom:8px;">findel<span style="color:#222">OI</span></div>
        <div style="margin-bottom: 1.5rem;">
          <div style="font-weight:bold;">${quotation.supplierName || "Supplier Name"}</div>
          <div>Address: ${quotation.supplierAddress || "Supplier Address"}</div>
          <div>Email: ${quotation.supplierEmail || "supplier@example.com"}</div>
          <div>Phone: ${quotation.supplierPhone || "+1 234 567 890"}</div>
          <div>Website: ${quotation.supplierWebsite || "www.supplierwebsite.com"}</div>
        </div>
        <div class="section-title">General Information</div>
        <table class="table table-bordered info-table" style="margin-bottom:1.5rem;">
          <tbody>
            <tr"><th class="border border-primary">Quotation Number</th><td>${quotation.quotationNumber || "Q-XXXX"}</td></tr>
            <tr><th class="border border-primary">Status</th><td>${quotation.status || "Draft"}</td></tr>
            <tr><th class="border border-primary">Total Amount</th><td>${quotation.currency || "USD"} ${quotation.totalAmount ? parseFloat(quotation.totalAmount.$numberDecimal).toFixed(2) : "0.00"}</td></tr>
            <tr><th class="border border-primary">Delivery Time</th><td>${quotation.deliveryTime ? `${quotation.deliveryTime} Days` : "N/A"}</td></tr>
            <tr><th class="border border-primary">Payment Terms</th><td>${quotation.paymentTerms || "N/A"}</td></tr>
            <tr><th class="border border-primary">Valid Until</th><td>${quotation.validUntil || "N/A"}</td></tr>
          </tbody>
        </table>
        <div class="section-title">Customer Information</div>
        <div style="margin-bottom: 1.5rem;">
          <div style="font-weight:bold;">${quotation.customerName || "Customer Name"}</div>
          <div>Email: ${quotation.customerEmail || "customer@example.com"}</div>
          <div>Phone: ${quotation.customerPhone || "+1 987 654 321"}</div>
          <!-- Aquí falta llamar datos del modelo de cliente -->
        </div>
        <div class="section-title">Items</div>
        <table class="table table-bordered items-table">
          <thead class="border border-primary">
            <tr>
              <th>Description</th>
              <th>Quantity</th>
              <th>Price</th>
              <th>Tax (IVA)</th>
              <th>Total Amount</th>
            </tr>
          </thead>
          <tbody>
            ${
              quotation.items && quotation.items.length > 0
                ? quotation.items.map(item => `
                  <tr>
                    <td>${item.description || "N/A"}</td>
                    <td>${item.quantity || 0}</td>
                    <td>${quotation.currency || "USD"} ${item.unitPrice ? parseFloat(item.unitPrice.$numberDecimal).toFixed(2) : "0.00"}</td>
                    <td>${item.taxes ? `${parseFloat(item.taxes.$numberDecimal).toFixed(2)}%` : "0%"}</td>
                    <td>${quotation.currency || "USD"} ${item.totalPrice ? parseFloat(item.totalPrice.$numberDecimal).toFixed(2) : "0.00"}</td>
                  </tr>
                `).join("")
                : `<tr><td colspan="5" class="text-center">No items available.</td></tr>`
            }
          </tbody>
        </table>
        <script>
          window.onload = function() { window.print(); }
        </script>
      </body>
      </html>
    `);
    printWindow.document.close();
  };

  const handleDeleteClick = () => setShowConfirm(true);
  const handleConfirmDelete = () => {
    setShowConfirm(false);
    onDeleteQuotation && onDeleteQuotation(quotation._id);
  };
  const handleCancelDelete = () => setShowConfirm(false);


  return (
    <>
    <Offcanvas
      show={show}
      onHide={onClose}
      placement="end"
      style={{
        width: "50%",
        boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        borderLeft: "1px solid #ddd",
      }}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
          Invoice Details
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body style={{ padding: "20px" }}>
        {/* Información del proveedor */}
        <div className="mb-4">
          <h4 className="text-muted mb-3" style={{ fontWeight: "bold", fontSize: "1.5rem" }}>
            findel<span className="fw-bold text-black">OI</span>
          </h4>
          <p className="mb-1 fw-bold">{quotation.supplierName || "Supplier Name"}</p>
          <p className="mb-1">Address: {quotation.supplierAddress || "Supplier Address"}</p>
          <p className="mb-1">Email: {quotation.supplierEmail || "supplier@example.com"}</p>
          <p className="mb-1">Phone: {quotation.supplierPhone || "+1 234 567 890"}</p>
          <p>Website: {quotation.supplierWebsite || "www.supplierwebsite.com"}</p>
        </div>

        {/* Información general */}
        <div className="mb-4">
          <Table bordered style={{ borderRadius: "10px", overflow: "hidden" }}>
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>Quotation Number</th>
                <td>{quotation.quotationNumber || "Q-XXXX"}</td>
              </tr>
              <tr>
                <th>Status</th>
               <td>
                <select
                  className="form-select"
                  style={{ minWidth: 110, fontWeight: "bold" }}
                  value={quotation.status}
                  onChange={e => onStatusChange && onStatusChange(quotation.id, e.target.value)}
                >
                  <option value="Draft">Draft</option>
                  <option value="Sent">Sent</option>
                  <option value="Received">Received</option>
                  <option value="Under Review">Under Review</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                  <option value="Expired">Expired</option>
                </select>
              </td>
              </tr>
              <tr>
                <th>Total Amount</th>
                <td>
                  {quotation.currency || "USD"}{" "}
                  {quotation.totalAmount
                    ? parseFloat(quotation.totalAmount.$numberDecimal).toFixed(2)
                    : "0.00"}
                </td>
              </tr>
              <tr>
                <th>Delivery Time</th>
                <td>{quotation.deliveryTime ? `${quotation.deliveryTime} Days` : "N/A"}</td>
              </tr>
              <tr>
                <th>Payment Terms</th>
                <td>{quotation.paymentTerms || "N/A"}</td>
              </tr>
              <tr>
                <th>Valid Until</th>
                <td>{quotation.validUntil || "N/A"}</td>
              </tr>
            </tbody>
          </Table>
        </div>

        {/* Información del cliente */}
        <div className="mb-4">
          <p className="mb-1 fw-bold">{quotation.customerName || "Customer Name"}</p>
          <p className="mb-1">Email: {quotation.customerEmail || "customer@example.com"}</p>
          <p>Phone: {quotation.customerPhone || "+1 987 654 321"}</p>
          {/* Aquí falta llamar datos del modelo de cliente */}
        </div>

        {/* Archivos adjuntos */}
        <div className="mb-4"
          onClick={handlePrint}>
          {quotation.attachments && quotation.attachments.length > 0 ? (
            <div className="d-flex align-items-center p-2 shadow-sm btn btn-outline-danger" style={{ borderRadius: 8, width: "fit-content"}}>
              <PictureAsPdfRoundedIcon className="me-2 fs-3" />
              <span>{quotation.attachments[0].name}.pdf</span>
              <FileDownloadRoundedIcon className="ms-4" />
            </div>
          ) : (
            <p className="text-danger">No attachments available.</p>
          )}
        </div>

        {/* Tabla de ítems */}
        <div className="mb-4">
          <Table
            className="table"
            style={{
              borderCollapse: "separate",
              borderSpacing: "0 8px",
            }}>
            <thead
              style={{
                backgroundColor: "#e3f2fd",
                borderTopLeftRadius: "10px",
                borderBottomLeftRadius: "10px",
                "--bs-table-accent-bg": "rgba(178, 220, 255, 0.52)"
              }}>
              <tr>
                <th scope="col" style={{ borderTopLeftRadius: "10px", borderBottomLeftRadius: "10px", paddingLeft: "20px" }}>Description</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Tax (IVA)</th>
                <th scope="col" style={{ padding: "10px", borderTopRightRadius: "10px", borderBottomRightRadius: "10px" }}>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {quotation.items && quotation.items.length > 0 ? (
                quotation.items.map((item, index) => (
                  <tr key={index}
                    style={{
                      "--bs-table-bg": "rgba(238, 238, 238, 0.84)",
                      borderRadius: "10px",
                    }}>
                    <td style={{
                      borderTopLeftRadius: "10px",
                      borderBottomLeftRadius: "10px",
                      paddingTop: "14px",
                      paddingLeft: "20px",
                    }}
                    >
                      {item.description || "N/A"}</td>
                    <td>{item.quantity || 0}</td>
                    <td>
                      {quotation.currency || "USD"}{" "}
                      {item.unitPrice
                        ? parseFloat(item.unitPrice.$numberDecimal).toFixed(2)
                        : "0.00"}
                    </td>
                    <td>
                      {item.taxes
                        ? `${parseFloat(item.taxes.$numberDecimal).toFixed(2)}%`
                        : "0%"}
                    </td>
                    <td
                      style={{
                        borderTopRightRadius: "10px",
                        borderBottomRightRadius: "10px",
                        padding: "10px",
                      }}
                    >
                      {quotation.currency || "USD"}{" "}
                      {item.totalPrice
                        ? parseFloat(item.totalPrice.$numberDecimal).toFixed(2)
                        : "0.00"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">
                    No items available.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </div>

        {/* Botones de acciones */}
        <div className="d-flex gap-3">
          <Button
            variant="success"
            className="flex-grow-2"
            style={{ fontWeight: "bold", borderRadius: "10px" }}
          >
            Add to Opportunities
          </Button>
          <Button
            variant="danger"
            className="flex-grow-2"
            style={{ fontWeight: "bold", borderRadius: "10px" }}
            onClick={handleDeleteClick}
          >
            Delete
          </Button>
          <Button
            variant="secondary"
            className="flex-grow-2"
            style={{ fontWeight: "bold", borderRadius: "10px" }}
            onClick={handlePrint}
          >
            <PrintIcon className="me-2" /> Imprimir
          </Button>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
    
    {/* Modal de confirmación */}
      <Modal show={showConfirm} onHide={handleCancelDelete} centered>
        <Modal.Header closeButton>
          <Modal.Title>Confirmar eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          ¿Estás seguro de que deseas eliminar esta cotización? Esta acción no se puede deshacer.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCancelDelete}>
            Cancelar
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ActionsModal;