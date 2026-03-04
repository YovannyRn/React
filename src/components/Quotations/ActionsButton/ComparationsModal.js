import React, { useMemo, useState, useEffect, useRef } from "react";
import ExcelJS from "exceljs";
import Papa from "papaparse";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import CloseIcon from "@mui/icons-material/Close";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 1200,
  bgcolor: "background.paper",
  borderRadius: 4,
  boxShadow: 24,
  p: 4,
  maxHeight: "90vh",
  overflowY: "auto",
};

function getNumericValue(q, key) {
  // Adaptado a tu modelo
  if (key === "totalAmount")
    return q.totalAmount
      ? parseFloat(q.totalAmount.$numberDecimal || q.totalAmount)
      : null;
  if (key === "deliveryTime")
    return typeof q.deliveryTime === "number" ? q.deliveryTime : null;
  if (key === "evaluationScore")
    return q.evaluationScore
      ? parseFloat(q.evaluationScore.$numberDecimal || q.evaluationScore)
      : null;
  return null;
}

const CRITERIA = [
  { key: "totalAmount", label: "Precio Total", isNumeric: true, better: "min" },
  {
    key: "deliveryTime",
    label: "Tiempo de Entrega (días)",
    isNumeric: true,
    better: "min",
  },
  {
    key: "evaluationScore",
    label: "Puntaje Evaluación",
    isNumeric: true,
    better: "max",
  },
  { key: "paymentTerms", label: "Términos de Pago", isNumeric: false },
];

const DEFAULT_WEIGHTS = {
  totalAmount: 0.5,
  deliveryTime: 0.3,
  evaluationScore: 0.2,
};

function getBestValue(quotations, key, better) {
  const values = quotations.map((q) => {
    if (key === "totalAmount")
      return parseFloat(q.totalAmount?.$numberDecimal || q.totalAmount || 0);
    if (key === "deliveryTime") return parseFloat(q.deliveryTime || 0);
    if (key === "evaluationScore")
      return parseFloat(
        q.evaluationScore?.$numberDecimal || q.evaluationScore || 0,
      );
    return q[key];
  });
  if (better === "min") return Math.min(...values);
  if (better === "max") return Math.max(...values);
  return null;
}

function ComparisonContent({
  quotations,
  CRITERIA,
  getBestValue,
  getNumericValue,
  radarData,
  barData,
  weights,
  setWeights,
  ranked,
}) {
  return (
    <>
      {/* Tabla comparativa */}
      <Table size="small" sx={{ mb: 3 }}>
        <TableHead>
          <TableRow>
            <TableCell>Criterio</TableCell>
            {quotations.map((q) => (
              <TableCell key={q._id || q.id} align="center">
                {q.supplierName}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {CRITERIA.map((crit) => {
            const best = crit.isNumeric
              ? getBestValue(quotations, crit.key, crit.better)
              : null;
            return (
              <TableRow key={crit.key}>
                <TableCell>{crit.label}</TableCell>
                {quotations.map((q) => {
                  let value = crit.isNumeric
                    ? getNumericValue(q, crit.key)
                    : q[crit.key];
                  const isBest =
                    crit.isNumeric && value !== null && value === best;
                  return (
                    <TableCell
                      key={q._id || q.id}
                      align="center"
                      sx={
                        isBest
                          ? { backgroundColor: "#d1e7dd", fontWeight: "bold" }
                          : {}
                      }
                    >
                      {crit.isNumeric
                        ? value !== null
                          ? value
                          : "N/A"
                        : value || "-"}
                    </TableCell>
                  );
                })}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>

      {/* Gráfico Radar */}
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="criterion" />
            <PolarRadiusAxis />
            {quotations.map((q) => (
              <Radar
                key={q._id || q.id}
                name={q.supplierName}
                dataKey={q.supplierName}
                stroke="#1976d2"
                fill="#1976d2"
                fillOpacity={0.2}
              />
            ))}
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Gráfico de barras */}
      <div style={{ width: "100%", height: 250, marginTop: 24 }}>
        <ResponsiveContainer>
          <BarChart data={barData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="Precio" fill="#1976d2" />
            <Bar dataKey="Entrega" fill="#ffc107" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Matriz de decisión */}
      <div className="mt-4">
        <h6>Ponderación de Criterios</h6>
        {CRITERIA.filter((c) => c.isNumeric).map((crit) => (
          <div key={crit.key} className="d-flex align-items-center mb-2">
            <span style={{ width: 180 }}>{crit.label}</span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.05}
              value={weights[crit.key] || 0}
              onChange={(e) =>
                setWeights((w) => ({
                  ...w,
                  [crit.key]: parseFloat(e.target.value),
                }))
              }
              style={{ flex: 1, margin: "0 12px" }}
            />
            <span style={{ width: 40 }}>
              {(weights[crit.key] * 100).toFixed(0)}%
            </span>
          </div>
        ))}
      </div>
      <div className="mt-3">
        <h6>Ranking de Ofertas</h6>
        <ol>
          {ranked.map((q) => (
            <li key={q._id || q.id}>
              {q.supplierName}{" "}
              <span className="text-muted">
                ({(q.totalScore * 100).toFixed(1)} pts)
              </span>
            </li>
          ))}
        </ol>
      </div>
    </>
  );
}

const ComparisonModal = ({ open, onClose, quotations }) => {
  const [weights, setWeights] = useState(DEFAULT_WEIGHTS);
  const modalRef = useRef();
  const exportRef = useRef();

  const handleExportPDF = async () => {
    if (!exportRef.current) return;

    // Espera a que todo se renderice
    await new Promise((res) => setTimeout(res, 300));

    // Captura solo el contenido exportable (sin maxHeight, ni centrar)
    const canvas = await html2canvas(exportRef.current, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
    });

    const imgData = canvas.toDataURL("image/png");

    // Usa el tamaño real del canvas para el PDF
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });

    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("comparacion_cotizaciones.pdf");
  };

  // Exporta todo el modal como imagen
  const exportFullModalToPDF = async () => {
    if (!modalRef.current) return;
    const canvas = await html2canvas(modalRef.current, {
      backgroundColor: "#fff",
      scale: 2,
      useCORS: true,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: canvas.width > canvas.height ? "landscape" : "portrait",
      unit: "px",
      format: [canvas.width, canvas.height],
    });
    pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
    pdf.save("comparacion_cotizaciones.pdf");
  };

  // Escucha el evento global para exportar
  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.type === "pdf") {
        exportFullModalToPDF();
      }
    };
    window.addEventListener("exportComparison", handler);
    return () => window.removeEventListener("exportComparison", handler);
  }, [quotations]);

  // Cálculo de puntuaciones ponderadas
  const scores = useMemo(() => {
    return quotations.map((q) => {
      let score = 0;
      let totalWeight = 0;
      for (const crit of CRITERIA) {
        if (!crit.isNumeric || !weights[crit.key]) continue;
        const value = parseFloat(
          q[crit.key]?.$numberDecimal || q[crit.key] || 0,
        );
        let normalized = 0;
        const best = getBestValue(quotations, crit.key, crit.better);
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
  }, [quotations, weights]);

  const ranked = [...scores].sort((a, b) => b.totalScore - a.totalScore);

  const radarData = CRITERIA.filter((c) => c.isNumeric).map((crit) => ({
    criterion: crit.label,
    ...Object.fromEntries(
      quotations.map((q) => [
        q.supplierName,
        parseFloat(q[crit.key]?.$numberDecimal || q[crit.key] || 0),
      ]),
    ),
  }));

  const barData = quotations.map((q) => ({
    name: q.supplierName,
    Precio: parseFloat(q.totalAmount?.$numberDecimal || q.totalAmount || 0),
    Entrega: parseFloat(q.deliveryTime || 0),
  }));

  const exportTable = async (type) => {
    const headers = ["Criterio", ...quotations.map((q) => q.supplierName)];
    const rows = CRITERIA.map((crit) => [
      crit.label,
      ...quotations.map((q) => {
        let value = crit.isNumeric ? getNumericValue(q, crit.key) : q[crit.key];
        return crit.isNumeric ? (value !== null ? value : "N/A") : value || "-";
      }),
    ]);

    if (type === "pdf") {
      const doc = new jsPDF("l", "pt", "a4");
      let y = 40;

      // Título
      doc.setFontSize(18);
      doc.text("Comparación de Cotizaciones", 40, y);
      y += 20;

      // Captura la tabla como imagen
      const tableElement = document.getElementById("comparison-table");
      if (tableElement) {
        const tableCanvas = await html2canvas(tableElement, {
          backgroundColor: "#fff",
          scale: 2,
        });
        const tableImg = tableCanvas.toDataURL("image/png");
        doc.addImage(tableImg, "PNG", 40, y, 750, 90);
        y += 100;
      }

      // Captura el radar chart
      const radarElement = document.getElementById("radar-chart");
      if (radarElement) {
        const radarCanvas = await html2canvas(radarElement, {
          backgroundColor: "#fff",
          scale: 2,
        });
        const radarImg = radarCanvas.toDataURL("image/png");
        doc.text("Gráfico Radar", 40, y + 20);
        doc.addImage(radarImg, "PNG", 40, y + 30, 300, 200);
      }

      // Captura el bar chart
      const barElement = document.getElementById("bar-chart");
      if (barElement) {
        const barCanvas = await html2canvas(barElement, {
          backgroundColor: "#fff",
          scale: 2,
        });
        const barImg = barCanvas.toDataURL("image/png");
        doc.text("Gráfico de Barras", 400, y + 20);
        doc.addImage(barImg, "PNG", 400, y + 30, 350, 200);
        y += 240;
      }

      // Ponderación de criterios
      doc.setFontSize(14);
      doc.text("Ponderación de Criterios", 40, y + 30);
      let ponderacionY = y + 50;
      CRITERIA.filter((c) => c.isNumeric).forEach((crit, idx) => {
        doc.text(
          `${crit.label}: ${(weights[crit.key] * 100).toFixed(0)}%`,
          60,
          ponderacionY + idx * 20,
        );
      });
      y = ponderacionY + CRITERIA.filter((c) => c.isNumeric).length * 20 + 10;

      // Ranking de ofertas
      doc.setFontSize(14);
      doc.text("Ranking de Ofertas", 40, y + 30);
      ranked.forEach((q, idx) => {
        doc.text(
          `${idx + 1}. ${q.supplierName} (${(q.totalScore * 100).toFixed(
            1,
          )} pts)`,
          60,
          y + 50 + idx * 18,
        );
      });

      doc.save("comparacion_cotizaciones.pdf");
    } else if (type === "excel") {
      const workbook = new ExcelJS.Workbook();
      const worksheet = workbook.addWorksheet("Comparación");
      [headers, ...rows].forEach((row) => worksheet.addRow(row));
      const buffer = await workbook.xlsx.writeBuffer();
      const blob = new Blob([buffer], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "comparacion_cotizaciones.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } else if (type === "csv") {
      const csv = Papa.unparse([headers, ...rows]);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "comparacion_cotizaciones.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  useEffect(() => {
    const handler = (e) => {
      if (e.detail && e.detail.type) {
        exportTable(e.detail.type);
      }
    };
    window.addEventListener("exportComparison", handler);
    return () => window.removeEventListener("exportComparison", handler);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quotations, weights]);

  return (
    <>
      <div
        ref={exportRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: 0,
          width: 900,
          background: "#fff",
          padding: 24,
          zIndex: -1,
        }}
      >
        <ComparisonContent
          quotations={quotations}
          CRITERIA={CRITERIA}
          getBestValue={getBestValue}
          getNumericValue={getNumericValue}
          radarData={radarData}
          barData={barData}
          weights={weights}
          setWeights={setWeights}
          ranked={ranked}
        />
      </div>
      <Modal open={open} onClose={onClose}>
        <Box sx={style} ref={modalRef}>
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h4>Comparación de Cotizaciones</h4>
            <IconButton onClick={onClose}>
              <CloseIcon />
            </IconButton>
          </div>
          <ComparisonContent
            quotations={quotations}
            CRITERIA={CRITERIA}
            getBestValue={getBestValue}
            getNumericValue={getNumericValue}
            radarData={radarData}
            barData={barData}
            weights={weights}
            setWeights={setWeights}
            ranked={ranked}
          />
          <Button onClick={handleExportPDF}>Exportar PDF</Button>
        </Box>
      </Modal>
    </>
  );
};

export {
  DEFAULT_WEIGHTS,
  CRITERIA,
  getBestValue,
  getNumericValue,
  ComparisonContent,
};
export default ComparisonModal;
