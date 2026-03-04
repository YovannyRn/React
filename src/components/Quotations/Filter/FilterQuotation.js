import React, { useState } from "react";
import { Collapse, TextField, Button, Slider } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import CloseIcon from "@mui/icons-material/Close";
import { Select, MenuItem, InputLabel, FormControl } from "@mui/material";

const FilterQuotation = ({ onClose, onApplyFilters }) => {
  const [expanded, setExpanded] = useState({});
  const [selectedStatuses, setSelectedStatuses] = useState([]);
  const [valueRange, setValueRange] = useState(null);
  const [supplierName, setSupplierName] = useState("");
  const [currency, setCurrency] = useState("");
  const CURRENCIES = ["USD", "EUR", "GBP", "MXN", "JPY"];
  const [deliveryTerms, setDeliveryTerms] = useState("");
  const [paymentTerms, setPaymentTerms] = useState("");
  

  const toggleExpand = (section) => {
    setExpanded((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleStatus = (status) => {
    if (status === "all") {
      setSelectedStatuses((prev) =>
        prev.includes("all") ? [] : ["Accepted", "Under Review", "Rejected", "Draft", "Sent", "Expired"]
      );
    } else {
      setSelectedStatuses((prev) =>
        prev.includes(status)
          ? prev.filter((item) => item !== status) 
          : [...prev, status] 
      );
    }
  }

const applyFilters = () => {
  const filters = {
    statuses: selectedStatuses.length > 0 ? selectedStatuses : null,
    supplierName: supplierName.trim() || null,
    currency: currency.trim() || null,
    valueRange: valueRange || null,
    deliveryTerms: deliveryTerms.trim() || null,
    paymentTerms: paymentTerms.trim() || null,
  };

  if (!filters.statuses && !filters.supplierName && !filters.currency && !filters.valueRange) {
    setValueRange(null); 
  }

  onApplyFilters(filters);
  onClose();
};

  const handleClose = () => {
  setValueRange(null);
  onClose();
  };
  

  return (
    <div
      style={{
        width: "410px",
        backgroundColor: "white",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
        position: "fixed",
        right: 0,
        top: 0,
        height: "100%",
        overflowY: "auto",
        transition: "transform 0.7s ease-in-out",
        transform: "translateX(0)",
        zIndex: 1050,
      }}
    >
      <div className="d-flex justify-content-end align-items-center p-3">
        <CloseIcon style={{ cursor: "pointer" }} onClick={handleClose} />
      </div>

      <div className="my-2 mx-3">
        {/* By Status */}
        <div>
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("status")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="my-3">Status</h5>
            
          </div>       
            <div className=" mt-2" role="group" aria-label="Status">
              <button
                type="button"
                className={`me-2 my-1 btn ${
                  selectedStatuses.length === 6 ? "btn-primary" : "btn-outline-primary"
                }`}
                
                onClick={() => toggleStatus("all")}
              >
                All
              </button>
              <button
                type="button"
                className={`me-2 my-1 btn ${
                  selectedStatuses.includes("Accepted") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Accepted")}
              >
                Accepted
              </button>
              <button
                type="button"
                className={`me-2 my-1 btn ${
                  selectedStatuses.includes("Under Review") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Under Review")}
              >
                Under Review
              </button>
              <button
                type="button"
                className={`me-2 mb-1 btn ${
                  selectedStatuses.includes("Rejected") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Rejected")}
              >
                Rejected
              </button>
              <button
                type="button"
                className={`me-2 mb-1 btn ${
                  selectedStatuses.includes("Draft") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Draft")}
              >
                Draft
              </button>
              <button
                type="button"
                className={`me-2 mb-1 btn ${
                  selectedStatuses.includes("Sent") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Sent")}
              >
                Sent
              </button>
              <button
                type="button"
                className={`me-2 mb-1 btn ${
                  selectedStatuses.includes("Expired") ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => toggleStatus("Expired")}
              >
                Expired
              </button>
            </div>
        </div>

        {/* By Supplier */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("supplier")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Supplier</h5>
          </div>
            <TextField 
              label="Specific Name" 
              fullWidth 
              size="small" 
              className="my-2"
              value={supplierName} 
              onChange={(e) => setSupplierName(e.target.value)}
              />
            <TextField 
              label="Supplier Category"
              fullWidth 
              size="small" 
              className="my-2" 
              />
            <TextField 
              label="Supplier Rating" 
              fullWidth size="small" 
              className=" my-2" 
              />
        </div>

        {/* By Values */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("values")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Values</h5>
          </div>
          <div className="mt-2 mx-3">
            <Slider
                value={valueRange || [0, 10000]}
                onChange={(event, newValue) => setValueRange(newValue)}
                valueLabelDisplay="auto"
                min={0}
                max={10000}
                step={100}
                getAriaLabel={() => "Amount range"}
                getAriaValueText={(value) => `$${value}`}
            />
            <div className="d-flex justify-content-between">
                <span>${(valueRange ? valueRange[0] : 0)}</span>
                <span>${(valueRange ? valueRange[1] : 10000)}</span>
            </div>
          </div>
            <FormControl fullWidth size="small" className="my-3">
              <InputLabel id="currency-label">Currency</InputLabel>
              <Select
                labelId="currency-label"
                value={currency}
                label="Currency"
                onChange={(e) => setCurrency(e.target.value)}
              >
                <MenuItem value="">All</MenuItem>
                {CURRENCIES.map((cur) => (
                  <MenuItem key={cur} value={cur}>{cur}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="aboveBudget" />
              <label className="form-check-label" htmlFor="aboveBudget">
                Above Budget
              </label>
            </div>
            <div className="form-check mb-2">
              <input className="form-check-input" type="checkbox" id="belowBudget" />
              <label className="form-check-label" htmlFor="belowBudget">
                Below Budget
              </label>
            </div>
        </div>

        {/* By Times */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("times")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Times</h5>
            <ExpandMoreIcon />
          </div>
          <Collapse in={expanded.times}>
            <div className="mb-2 mx-3">
              <Slider
                valueLabelDisplay="auto"
                min={0}
                max={60}
                step={1}
                label="Delivery Time (days)"
              />
            </div>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="valid" />
              <label className="form-check-label" htmlFor="valid">
                Valid
              </label>
            </div>
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="expired" />
              <label className="form-check-label" htmlFor="expired">
                Expired
              </label>
            </div>
            <TextField className="my-3" label="Reception Date" fullWidth size="small" />
          </Collapse>
        </div>

        {/* By Terms */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("terms")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Terms</h5>
            <ExpandMoreIcon />
          </div>
          <Collapse in={expanded.terms}>
            <TextField
              label="Delivery Terms"
              fullWidth
              size="small"
              className="mb-3"
              value={deliveryTerms}
              onChange={(e) => setDeliveryTerms(e.target.value)}
            />
            <TextField
              label="Payment Terms"
              fullWidth
              size="small"
              className="mb-3"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
            />
            <div className="form-check">
              <input className="form-check-input" type="checkbox" id="discounts" />
              <label className="form-check-label" htmlFor="discounts">
                With Discounts
              </label>
            </div>
          </Collapse>
        </div>

        {/* By Assignment */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("assignment")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Assignment</h5>
            <ExpandMoreIcon />
          </div>
          <Collapse in={expanded.assignment}>
            <TextField label="Specific Responsible" fullWidth size="small" className="my-3" />
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="myQuotations" />
              <label className="form-check-label" htmlFor="myQuotations">
                My Quotations
              </label>
            </div>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="unassigned" />
              <label className="form-check-label" htmlFor="unassigned">
                Unassigned
              </label>
            </div>
          </Collapse>
        </div>

        {/* Others */}
        <div className="mt-3">
          <div
            className="d-flex justify-content-between align-items-center"
            onClick={() => toggleExpand("others")}
            style={{ cursor: "pointer" }}
          >
            <h5 className="mb-3">Others</h5>
            <ExpandMoreIcon />
          </div>
          <Collapse in={expanded.others}>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="attachedDocs" />
              <label className="form-check-label" htmlFor="attachedDocs">
                With Attached Documents
              </label>
            </div>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="notesComments" />
              <label className="form-check-label" htmlFor="notesComments">
                With Notes/Comments
              </label>
            </div>
            <div className="form-check my-1">
              <input className="form-check-input" type="checkbox" id="bestRated" />
              <label className="form-check-label" htmlFor="bestRated">
                Best Rated
              </label>
            </div>
          </Collapse>
        </div>

        <Button
          variant="contained"
          fullWidth
          className="mt-4 bg-secondary"
          onClick={applyFilters}
        >
          Apply Filters
        </Button>
      </div>
    </div>
  );
};

export default FilterQuotation;