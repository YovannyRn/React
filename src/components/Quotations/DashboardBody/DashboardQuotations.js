import React, { useState, useEffect } from "react";
import "../quotations-responsive.css";
import PieChartIcon from "@mui/icons-material/PieChart";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CancelIcon from "@mui/icons-material/Cancel";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import GroupIcon from "@mui/icons-material/Group";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import SavingsIcon from "@mui/icons-material/Savings";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PendingActionsIcon from "@mui/icons-material/PendingActions";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import quotationService from "../services/quotationsService";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import KeyboardArrowLeftIcon from "@mui/icons-material/KeyboardArrowLeft";

function DashboardQuotations() {
  const [showKPIs, setShowKPIs] = useState(true);
  const [quotations, setQuotations] = useState([]);
  const [kpiPage, setKpiPage] = useState(0);

  const toggleKPIs = () => setShowKPIs(!showKPIs);

  const fetchQuotations = async () => {
    try {
      const data = await quotationService.getAllQuotations();
      setQuotations(data);
    } catch (error) {
      console.error("Error al obtener las cotizaciones:", error);
    }
  };

  useEffect(() => {
    fetchQuotations();
  }, []);

  // KPIs calculados
  const totalQuotations = quotations.length;
  const respondedSuppliers = new Set(
    quotations
      .filter((q) => q.status !== "Draft" && q.status !== "Sent")
      .map((q) => q.supplierId),
  );
  const totalSuppliers = new Set(quotations.map((q) => q.supplierId));
  const responseRate =
    totalSuppliers.size > 0
      ? Math.round((respondedSuppliers.size / totalSuppliers.size) * 100)
      : 0;
  const avgLeadTime =
    quotations.length > 0
      ? (
          quotations
            .filter((q) => typeof q.deliveryTime === "number")
            .reduce((acc, q) => acc + q.deliveryTime, 0) /
          quotations.filter((q) => typeof q.deliveryTime === "number").length
        ).toFixed(1)
      : 0;
  const now = new Date();
  const agingBuckets = { "0-7": 0, "8-14": 0, "15-30": 0, "31+": 0 };
  quotations.forEach((q) => {
    if (q.creationDate) {
      const days = Math.floor(
        (now - new Date(q.creationDate)) / (1000 * 60 * 60 * 24),
      );
      if (days <= 7) agingBuckets["0-7"]++;
      else if (days <= 14) agingBuckets["8-14"]++;
      else if (days <= 30) agingBuckets["15-30"]++;
      else agingBuckets["31+"]++;
    }
  });
  const supplierParticipation = totalSuppliers.size;
  const pendingEvaluation = quotations.filter(
    (q) => q.status === "Under Review",
  ).length;
  const budgetDeviation = "-5%"; // Ficticio
  const bestOfferSavings = "$1,200"; // Ficticio
  const rejectionRate =
    totalQuotations > 0
      ? Math.round(
          (quotations.filter((q) => q.status === "Rejected").length /
            totalQuotations) *
            100,
        )
      : 0;
  const allQuotationValue = quotations.reduce(
    (acc, q) =>
      acc +
      (q.totalAmount && q.totalAmount.$numberDecimal
        ? parseFloat(q.totalAmount.$numberDecimal)
        : 0),
    0,
  );

  const agingDays = quotations
    .filter((q) => q.creationDate)
    .map((q) =>
      Math.floor((now - new Date(q.creationDate)) / (1000 * 60 * 60 * 24)),
    );
  const avgAging =
    agingDays.length > 0
      ? (agingDays.reduce((a, b) => a + b, 0) / agingDays.length).toFixed(1)
      : 0;

  // KPIs para mostrar (en bloques de 4)
  const kpis = [
    {
      icon: <PieChartIcon fontSize="large" className="text-primary me-2" />,
      label: "Total Quotations",
      value: totalQuotations,
    },
    {
      icon: <AccessTimeIcon fontSize="large" className="text-success me-2" />,
      label: "Avg Delivery Time",
      value: `Avg: ${avgLeadTime} Days`,
    },
    {
      icon: <AttachMoneyIcon fontSize="large" className="text-danger me-2" />,
      label: "All Quotation Value",
      value: `$${allQuotationValue.toLocaleString()}`,
    },
    {
      icon: <CancelIcon fontSize="large" className="text-warning me-2" />,
      label: "Rejection Rate",
      value: `${rejectionRate}%`,
    },
    {
      icon: <FolderOpenIcon fontSize="large" className="text-info me-2" />,
      label: "Supplier Participation",
      value: supplierParticipation,
    },
    {
      icon: <GroupIcon fontSize="large" className="text-success me-2" />,
      label: "Response Rate",
      value: `${responseRate}%`,
    },
    {
      icon: <TrendingDownIcon fontSize="large" className="text-danger me-2" />,
      label: "Budget Deviation",
      value: budgetDeviation,
    },
    {
      icon: <SavingsIcon fontSize="large" className="text-info me-2" />,
      label: "Best Offer Savings",
      value: bestOfferSavings,
    },
    {
      icon: <AssessmentIcon fontSize="large" className="text-secondary me-2" />,
      label: "Quote Aging",
      value: `Avg: ${avgAging} days`,
    },
    {
      icon: (
        <PendingActionsIcon fontSize="large" className="text-warning me-2" />
      ),
      label: "Pending Evaluation",
      value: pendingEvaluation,
    },
    {
      icon: <HourglassEmptyIcon fontSize="large" className="text-info me-2" />,
      label: "Expired Quotations",
      value: quotations.filter((q) => q.status === "Expired").length,
    },
    {
      icon: <PieChartIcon fontSize="large" className="text-secondary me-2" />,
      label: "Draft Quotations",
      value: quotations.filter((q) => q.status === "Draft").length,
    },
  ];

  // Paginación de KPIs (4 por página)
  const kpisPerPage = 4;
  const totalPages = Math.ceil(kpis.length / kpisPerPage);
  const currentKpis = kpis.slice(
    kpiPage * kpisPerPage,
    (kpiPage + 1) * kpisPerPage,
  );

  return (
    <div className="container-fluid px-3 px-md-5 mt-2 quotation-main-wrapper">
      <div className="d-flex align-items-center mb-3">
        <h6 className="text-muted mb-0">Dashboard / Campaign</h6>
        <span
          className="btn btn-link text-decoration-none"
          onClick={toggleKPIs}
          style={{ cursor: "pointer" }}
        >
          {showKPIs ? "Hide KPIs" : "Show KPIs"}
          {showKPIs ? (
            <KeyboardArrowUpIcon className="text-primary" />
          ) : (
            <KeyboardArrowDownIcon className="text-primary" />
          )}
        </span>
      </div>

      {showKPIs && (
        <div className="kpi-row-wrapper d-flex align-items-center justify-content-center">
          <KeyboardArrowLeftIcon
            type="button"
            className="kpi-nav-arrow text-primary flex-shrink-0"
            onClick={() =>
              setKpiPage((prev) => (prev - 1 + totalPages) % totalPages)
            }
            title="KPIs anteriores"
          />
          <div className="d-flex align-items-center gap-3">
            {currentKpis.map((kpi, idx) => (
              <div key={idx} className="kpi-card d-flex align-items-center">
                {kpi.icon}
                <div>
                  <span className="text-muted small d-block">{kpi.label}</span>
                  <strong className="d-block mt-1 kpi-value">
                    {kpi.value}
                  </strong>
                </div>
              </div>
            ))}
          </div>
          <KeyboardArrowRightIcon
            type="button"
            className="kpi-nav-arrow text-primary flex-shrink-0"
            onClick={() => setKpiPage((prev) => (prev + 1) % totalPages)}
            title="Siguientes KPIs"
          />
        </div>
      )}
    </div>
  );
}

export default DashboardQuotations;
