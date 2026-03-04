import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import ChatIcon from "@mui/icons-material/Chat";
import HistoryIcon from "@mui/icons-material/History";
import PersonIcon from '@mui/icons-material/Person';
import SendIcon from "@mui/icons-material/Send";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600,
  bgcolor: "background.paper",
  borderRadius: 8,
  boxShadow: 24,
  p: 4,
  maxHeight: "100vh",
  overflowY: "auto",
};

const SuplierPortalQuotation = ({ open, onClose }) => {
  const [form, setForm] = useState({
    quotationNumber: "",
    totalAmount: "",
    currency: "USD",
    deliveryTime: "",
    deliveryTerms: "",
    paymentTerms: "",
    attachments: [],
    supplierComments: "",
  });

  // Simulated history and messages
  const history = [
    { date: "2024-05-01", status: "Sent" },
    { date: "2024-05-03", status: "Under Review" },
    { date: "2024-05-06", status: "Accepted" },
  ];
  const messages = [
    { from: "Buyer", text: "Can you improve the delivery time?" },
    { from: "Supplier", text: "We can deliver in 10 days." },
  ];

  // Handle file uploads
  const handleFileChange = (e) => {
    setForm({ ...form, attachments: Array.from(e.target.files) });
  };

  // Handle form changes
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Submit quotation (simulated)
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Quotation submitted successfully.");
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose}>
      <Box sx={style}>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <h4>
            <PersonIcon className="me-2 mb-1 text-primary" />
            Supplier Response Portal
          </h4>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </div>
        <form onSubmit={handleSubmit}>
          {/* Main fields */}
          <div className="mb-3">
            <label className="form-label fw-bold">Quotation Number</label>
            <input
              className="form-control"
              name="quotationNumber"
              value={form.quotationNumber}
              onChange={handleChange}
              required
            />
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Total Amount</label>
              <input
                className="form-control"
                name="totalAmount"
                type="number"
                value={form.totalAmount}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Currency</label>
              <select
                className="form-select"
                name="currency"
                value={form.currency}
                onChange={handleChange}
                required
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
                <option value="MXN">MXN</option>
                <option value="JPY">JPY</option>
              </select>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <label className="form-label fw-bold">Delivery Time (days)</label>
              <input
                className="form-control"
                name="deliveryTime"
                type="number"
                value={form.deliveryTime}
                onChange={handleChange}
                required
              />
            </div>
            <div className="col">
              <label className="form-label fw-bold">Delivery Terms</label>
              <input
                className="form-control"
                name="deliveryTerms"
                value={form.deliveryTerms}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="mb-3">
            <label className="form-label fw-bold">Payment Terms</label>
            <input
              className="form-control"
              name="paymentTerms"
              value={form.paymentTerms}
              onChange={handleChange}
            />
          </div>
          {/* Attachments */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Attach Quotation Document <CloudUploadIcon className="ms-1" />
            </label>
            <input
              className="form-control"
              type="file"
              multiple
              onChange={handleFileChange}
            />
            {form.attachments.length > 0 && (
              <ul className="mt-2">
                {form.attachments.map((file, idx) => (
                  <li key={idx}>{file.name}</li>
                ))}
              </ul>
            )}
          </div>
          {/* Comments */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Comments / Questions <ChatIcon className="ms-1" />
            </label>
            <textarea
              className="form-control"
              name="supplierComments"
              value={form.supplierComments}
              onChange={handleChange}
              rows={2}
            />
          </div>
          {/* Status and history */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Current Status: <span className="badge bg-info">Under Review</span>
            </label>
            <div className="mt-2">
              <HistoryIcon className="me-2 text-secondary" />
              <span className="fw-bold">History:</span>
              <ul className="mb-0">
                {history.map((h, idx) => (
                  <li key={idx}>
                    {h.date} - {h.status}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* Messages */}
          <div className="mb-3">
            <label className="form-label fw-bold">
              Direct Communication <ChatIcon className="ms-1" />
            </label>
            <ul className="mb-0">
              {messages.map((m, idx) => (
                <li key={idx}>
                  <span className={m.from === "Supplier" ? "text-success" : "text-primary"}>
                    {m.from}:
                  </span>{" "}
                  {m.text}
                </li>
              ))}
            </ul>
          </div>
          <div className="d-flex justify-content-end">
            <Button
              variant="contained"
              color="primary"
              type="submit"
              startIcon={<SendIcon />}
              style={{ borderRadius: 8 }}
            >
              Submit Quotation
            </Button>
          </div>
        </form>
      </Box>
    </Modal>
  );
};

export default SuplierPortalQuotation;