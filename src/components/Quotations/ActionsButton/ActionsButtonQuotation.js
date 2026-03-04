import React, { useState, useRef } from "react";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import SendIcon from "@mui/icons-material/Send";
import ReminderIcon from "@mui/icons-material/NotificationsActive";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import CompareIcon from "@mui/icons-material/Compare";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import FlagIcon from "@mui/icons-material/Flag";
import PersonIcon from "@mui/icons-material/Person";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CloseIcon from "@mui/icons-material/Close";
import ArchiveIcon from "@mui/icons-material/Archive";
import ComparisonModal from "./ComparationsModal";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import {
  DEFAULT_WEIGHTS,
  CRITERIA,
  getBestValue,
  getNumericValue,
  ComparisonContent,
} from "./ComparationsModal";

const ActionsButtonQuotation = ({
  anchorEl,
  setAnchorEl,
  selectedRows,
  handleBulkAction,
  showComparison,
  setShowComparison,
  filteredQuotations,
}) => {
  const [exportMenuAnchor, setExportMenuAnchor] = useState(null);
  const [showHiddenExport, setShowHiddenExport] = useState(false);
  const hiddenExportRef = useRef();

  // --- Cálculo de datos igual que en el modal ---
  const weights = DEFAULT_WEIGHTS;

  const selectedQuotations = filteredQuotations.filter((q) =>
    selectedRows.includes(q.id)
  );

  const scores = selectedQuotations.map((q) => {
    let score = 0;
    let totalWeight = 0;
    for (const crit of CRITERIA) {
      if (!crit.isNumeric || !weights[crit.key]) continue;
      const value = parseFloat(q[crit.key]?.$numberDecimal || q[crit.key] || 0);
      let normalized = 0;
      const best = getBestValue(selectedQuotations, crit.key, crit.better);
      if (crit.better === "min") {
        normalized = best / (value || 1);
      } else if (crit.better === "max") {
        normalized = (value || 0) / (best || 1);
      }
      score += (weights[crit.key] || 0) * normalized;
      totalWeight += weights[crit.key] || 0;
    }
    return { ...q, totalScore: totalWeight ? score / totalWeight : 0 };
  });

  const ranked = [...scores].sort((a, b) => b.totalScore - a.totalScore);

  const radarData = CRITERIA.filter((c) => c.isNumeric).map((crit) => ({
    criterion: crit.label,
    ...Object.fromEntries(
      selectedQuotations.map((q) => [
        q.supplierName,
        parseFloat(q[crit.key]?.$numberDecimal || q[crit.key] || 0),
      ])
    ),
  }));

  const barData = selectedQuotations.map((q) => ({
    name: q.supplierName,
    Precio: parseFloat(q.totalAmount?.$numberDecimal || q.totalAmount || 0),
    Entrega: parseFloat(q.deliveryTime || 0),
  }));

  // --- Exportación PDF desde menú ---
  const handleExport = async (type) => {
    if (type === "pdf") {
      setShowHiddenExport(true);
      setTimeout(async () => {
        if (hiddenExportRef.current) {
          const html2canvas = (await import("html2canvas")).default;
          const jsPDF = (await import("jspdf")).default;
          const canvas = await html2canvas(hiddenExportRef.current, {
            backgroundColor: "#fff",
            scale: 2,
            useCORS: true,
          });
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF({
            orientation:
              canvas.width > canvas.height ? "landscape" : "portrait",
            unit: "px",
            format: [canvas.width, canvas.height],
          });
          pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
          pdf.save("comparacion_cotizaciones.pdf");
        }
        setShowHiddenExport(false);
      }, 500);
    } else {
      window.dispatchEvent(
        new CustomEvent("exportComparison", {
          detail: {
            type,
            quotations: selectedQuotations,
          },
        })
      );
    }
    setExportMenuAnchor(null);
    setAnchorEl(null);
  };

  const handleMenuClose = () => setAnchorEl(null);

  return (
    <>
      <Button
        className="border-0 shadow-sm"
        variant="outlined"
        style={{
          borderRadius: "10px",
          color: "rgb(47, 54, 53)",
          backgroundColor: "rgba(238, 238, 238, 0.84)",
          textTransform: "none",
        }}
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        Actions
      </Button>
      <Menu
        className="mt-1"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          style: {
            borderRadius: 12,
            minWidth: 260,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          },
        }}
      >
        <div
          style={{ padding: "8px 16px", fontWeight: "bold", color: "#6c757d" }}
        >
          Bulk Actions
        </div>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("bulkSendRFQ")}
        >
          <SendIcon fontSize="small" className="me-2" /> Bulk Send RFQ
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("sendReminder")}
        >
          <ReminderIcon fontSize="small" className="me-2" /> Send Reminder
        </MenuItem>
        <div
          style={{ padding: "8px 16px", fontWeight: "bold", color: "#6c757d" }}
        >
          Export Options
        </div>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={(e) => setExportMenuAnchor(e.currentTarget)}
          aria-haspopup="true"
        >
          <FileDownloadIcon fontSize="small" className="me-2" />
          Export Selected
          <ChevronRightIcon style={{ marginLeft: "auto" }} />
        </MenuItem>
        {/* Submenú de exportación */}
        <Menu
          anchorEl={exportMenuAnchor}
          open={Boolean(exportMenuAnchor)}
          onClose={() => setExportMenuAnchor(null)}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "left" }}
        >
          <MenuItem onClick={() => handleExport("excel")}>
            Exportar a Excel
          </MenuItem>
          <MenuItem onClick={() => handleExport("csv")}>
            Exportar a CSV
          </MenuItem>
          <MenuItem onClick={() => handleExport("pdf")}>
            Exportar a PDF
          </MenuItem>
        </Menu>
        {/* ...resto del menú... */}
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => {
            setShowComparison(true);
            handleMenuClose();
          }}
        >
          <CompareIcon fontSize="small" className="me-2" />
          Generate Comparison
        </MenuItem>
        <div
          style={{ padding: "8px 16px", fontWeight: "bold", color: "#6c757d" }}
        >
          Other Actions
        </div>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("moveToNextStage")}
        >
          <ArrowForwardIcon fontSize="small" className="me-2" /> Move to Next
          Stage
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("flagForReview")}
        >
          <FlagIcon fontSize="small" className="me-2" /> Flag for Review
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("changeResponsible")}
        >
          <PersonIcon fontSize="small" className="me-2" /> Change Responsible
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("extendDeadline")}
        >
          <AccessTimeIcon fontSize="small" className="me-2" /> Extend Deadline
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("closeRFQ")}
        >
          <CloseIcon fontSize="small" className="me-2" /> Close RFQ Process
        </MenuItem>
        <MenuItem
          disabled={selectedRows.length === 0}
          onClick={() => handleBulkAction("archiveSelected")}
        >
          <ArchiveIcon fontSize="small" className="me-2" /> Archive Selected
        </MenuItem>
      </Menu>

      {showHiddenExport && (
        <div
          ref={hiddenExportRef}
          style={{
            position: "absolute",
            left: "-9999px",
            top: 0,
            width: 1200, // igual que el modal
            background: "#fff",
            padding: 24,
            zIndex: -1,
          }}
        >
          <ComparisonContent
            quotations={selectedQuotations}
            CRITERIA={CRITERIA}
            getBestValue={getBestValue}
            getNumericValue={getNumericValue}
            radarData={radarData}
            barData={barData}
            weights={weights}
            setWeights={() => {}}
            ranked={ranked}
          />
        </div>
      )}

      <ComparisonModal
        open={showComparison}
        onClose={() => setShowComparison(false)}
        quotations={filteredQuotations.filter((q) =>
          selectedRows.includes(q.id)
        )}
      />
    </>
  );
};

export default ActionsButtonQuotation;
