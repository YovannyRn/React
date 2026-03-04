import React, { useState, useEffect } from "react";
import { useParams, useLocation } from "react-router-dom";
import BadgeOutlinedIcon from "@mui/icons-material/BadgeOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import GroupOutlinedIcon from "@mui/icons-material/GroupOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import LanguageOutlinedIcon from "@mui/icons-material/LanguageOutlined";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import SmartToyOutlinedIcon from "@mui/icons-material/SmartToyOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import WarningAmberOutlinedIcon from "@mui/icons-material/WarningAmberOutlined";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import QueryBuilderOutlinedIcon from "@mui/icons-material/QueryBuilderOutlined";
import AssignmentTurnedInOutlinedIcon from "@mui/icons-material/AssignmentTurnedInOutlined";
import { API_BASE_CLIENTPROCESS_URL } from "../../../helpers/urlHelper";
import {
  API_CLIENTPROCESS_LIST,
  API_N8N_FORM,
} from "../../../helpers/urlHelper";

// Helper function para validar clientId
const isValidClientId = (id) => {
  if (!id || typeof id !== "string") return false;
  if (id === "undefined" || id.trim() === "") return false;
  const mongoIdRegex = /^[0-9a-fA-F]{24}$/;
  const uuidRegex =
    /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
  const simpleIdRegex = /^[a-zA-Z0-9_-]{3,50}$/; // Permitir IDs simples también
  return mongoIdRegex.test(id) || uuidRegex.test(id) || simpleIdRegex.test(id);
};

const extractClientId = () => {
  // 1. Desde la URL manualmente
  const currentPath = window.location.pathname;
  const pathSegments = currentPath.split("/");
  const urlClientId = pathSegments[pathSegments.length - 1];

  const urlParams = new URLSearchParams(window.location.search);
  const queryClientId = urlParams.get("clientId") || urlParams.get("id");

  const hashClientId = window.location.hash
    ? window.location.hash.substring(1)
    : null;

  const finalClientId =
    urlClientId !== "client-form" ? urlClientId : queryClientId || hashClientId;

  return finalClientId;
};

const FormClient = () => {
  const { clientId: paramClientId } = useParams();
  const location = useLocation();

  const extractedClientId = extractClientId();
  const clientId = paramClientId || extractedClientId;

  const [clientData, setClientData] = useState(null);
  const [formData, setFormData] = useState({
    cliente: "",
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio_solicitado: "",
    descripcion_necesidad: "",
    tamaño_empresa: "",
    presupuesto_estimado: "",
    campos_adicionales: {
      web_empresa: "",
      sector: "",
    },
  });

  const [loading, setLoading] = useState(false);
  const [loadingClient, setLoadingClient] = useState(true);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");

  // Opciones para los selects
  const serviciosOptions = [
    "Desarrollo Web",
    "Desarrollo Móvil",
    "Automatización con IA",
    "Análisis de Datos",
    "Consultoría Digital",
    "Sistema de Gestión",
    "E-commerce",
    "Otro",
  ];

  const tamañoEmpresaOptions = [
    "Startup (1-10 empleados)",
    "Pequeña (11-50 empleados)",
    "Mediana (51-200 empleados)",
    "Grande (201-1000 empleados)",
    "Corporativo (1000+ empleados)",
  ];

  const presupuestoOptions = [
    "Menos de $1,000 USD",
    "$1,000 - $5,000 USD",
    "$5,000 - $10,000 USD",
    "$10,000 - $25,000 USD",
    "$25,000 - $50,000 USD",
    "$50,000+ USD",
    "Por definir",
  ];

  const sectorOptions = [
    "Tecnología",
    "Salud",
    "Educación",
    "Finanzas",
    "Retail/Comercio",
    "Manufactura",
    "Servicios",
    "Consultoría",
    "Gobierno",
    "Otro",
  ]; // Cargar datos del cliente desde URL o localStorage
  useEffect(() => {
    const loadClientData = async () => {
      if (isValidClientId(clientId)) {
        try {
          // Intentar cargar desde la API primero
          try {
            const response = await fetch(
              `${API_BASE_CLIENTPROCESS_URL} + ${API_CLIENTPROCESS_LIST}/${clientId}`,
            );
            if (response.ok) {
              const clientFromApi = await response.json();
              setClientData(clientFromApi);

              // Pre-rellenar formulario con datos de la API
              setFormData((prev) => ({
                ...prev,
                cliente: clientId,
                nombre: clientFromApi.nombre || "",
                email: clientFromApi.email || "",
                empresa: clientFromApi.empresa || "",
                servicio_solicitado: clientFromApi.servicio_interes || "",
              }));
            }
          } catch (apiError) {
            console.log(
              "Error conectando con API, usando localStorage:",
              apiError,
            );
          }

          // Fallback: usar localStorage si la API no está disponible
          if (!clientData) {
            const basicData = localStorage.getItem(`client_${clientId}`);
            if (basicData) {
              const parsed = JSON.parse(basicData);
              setClientData(parsed);

              // Pre-rellenar formulario con datos básicos
              setFormData((prev) => ({
                ...prev,
                cliente: clientId,
                nombre: parsed.nombre || "",
                email: parsed.email || "",
                empresa: parsed.empresa || "",
                servicio_solicitado: parsed.servicio_interes || "",
              }));
            } else {
              setMessage(
                "No se encontraron datos del cliente. Puedes completar el formulario normalmente.",
              );
              setMessageType("warning");
            }
          }
        } catch (error) {
          console.error("Error cargando cliente:", error);
          setMessage("Error al cargar los datos del cliente");
          setMessageType("danger");
        }
      } else {
        console.log("No hay clientId válido en la URL:", clientId);
        setMessage(
          "Acceso directo detectado. Puedes completar el formulario normalmente.",
        );
        setMessageType("info");
      }
      setLoadingClient(false);
    };
    loadClientData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  // UseEffect adicional para debug más agresivo
  useEffect(() => {
    // Intentar extraer manualmente desde la URL
    const manualExtraction = window.location.pathname.split("/").pop();

    if (
      manualExtraction &&
      manualExtraction !== "client-form" &&
      manualExtraction !== clientId
    ) {
    }
  }, [location.pathname, paramClientId, extractedClientId, clientId]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("campos_adicionales.")) {
      const field = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        campos_adicionales: {
          ...prev.campos_adicionales,
          [field]: value,
        },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      // Preparar datos como FormData para que lleguen como parámetros individuales
      const formDataToSend = new FormData();

      // Agregar campos principales
      formDataToSend.append("cliente", formData.cliente);
      formDataToSend.append("nombre", formData.nombre);
      formDataToSend.append("email", formData.email);
      formDataToSend.append("telefono", formData.telefono);
      formDataToSend.append("empresa", formData.empresa);
      formDataToSend.append(
        "servicio_solicitado",
        formData.servicio_solicitado,
      );
      formDataToSend.append(
        "descripcion_necesidad",
        formData.descripcion_necesidad,
      );
      formDataToSend.append("tamaño_empresa", formData.tamaño_empresa);
      formDataToSend.append(
        "presupuesto_estimado",
        formData.presupuesto_estimado,
      );

      // Agregar campos adicionales
      formDataToSend.append(
        "web_empresa",
        formData.campos_adicionales.web_empresa,
      );
      formDataToSend.append("sector", formData.campos_adicionales.sector);

      // Agregar metadatos
      formDataToSend.append("clientId", clientId || "sin-client-id");
      formDataToSend.append("originalClientId", clientId || "sin-client-id");
      formDataToSend.append("hasClientId", !!clientId ? "true" : "false");
      formDataToSend.append("estado_nuevo", "formulario_recibido");
      formDataToSend.append("fecha_envio", new Date().toISOString());
      formDataToSend.append("accion", "formulario_detallado_completado");

      const response = await fetch(API_N8N_FORM, {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        setMessage(
          "¡Gracias por completar tu información! 🎉 Hemos recibido tus datos y nuestro equipo está preparando una propuesta personalizada para ti. Recibirás un email con los detalles y el enlace para agendar tu consulta gratuita.",
        );
        setMessageType("success");

        // Limpiar formulario después de envío exitoso
        setFormData({
          cliente: clientId,
          nombre: "",
          email: "",
          telefono: "",
          empresa: "",
          servicio_solicitado: "",
          descripcion_necesidad: "",
          tamaño_empresa: "",
          presupuesto_estimado: "",
          campos_adicionales: {
            web_empresa: "",
            sector: "",
          },
        });
      } else {
        console.error(" Error del webhook:", response.status);
        setMessage(
          "Error al enviar el formulario. Por favor, intenta nuevamente.",
        );
        setMessageType("danger");
      }
    } catch (error) {
      setMessage(
        "Error de conexión. Por favor, verifica tu conexión e intenta nuevamente.",
      );
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  if (loadingClient) {
    return (
      <div
        className="min-vh-100 d-flex align-items-center justify-content-center"
        style={{ backgroundColor: "#f8f9fa" }}
      >
        <div className="text-center">
          <div className="spinner-border text-primary mb-3" role="status" />
          <div className="text-muted small">Cargando datos del cliente...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-xl-7">
            {/* Header */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-1">
                <AssignmentTurnedInOutlinedIcon
                  fontSize="small"
                  className="text-primary"
                />
                <span
                  className="text-muted small fw-semibold text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Client Form · MediCore
                </span>
              </div>
              <h2 className="fw-bold mb-1">Completa tu Información</h2>
              <p className="text-muted mb-0">
                {clientData?.nombre ? `Hola, ${clientData.nombre}. ` : ""}
                Para crear una propuesta personalizada, necesitamos conocer más
                sobre tus necesidades específicas.
              </p>
            </div>

            {/* Alerts */}
            {message && (
              <div
                className={`alert border-0 rounded-3 d-flex align-items-center gap-2 mb-4 ${
                  messageType === "success"
                    ? "alert-success"
                    : messageType === "danger"
                      ? "alert-danger"
                      : messageType === "warning"
                        ? "alert-warning"
                        : "alert-info"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircleOutlineIcon fontSize="small" />
                ) : messageType === "danger" ? (
                  <ErrorOutlineIcon fontSize="small" />
                ) : messageType === "warning" ? (
                  <WarningAmberOutlinedIcon fontSize="small" />
                ) : (
                  <InfoOutlinedIcon fontSize="small" />
                )}
                <span>{message}</span>
              </div>
            )}

            {clientData && (
              <div className="alert alert-info border-0 rounded-3 d-flex align-items-center gap-2 mb-4">
                <InfoOutlinedIcon fontSize="small" />
                <span>
                  <strong>Cliente:</strong> {clientData.nombre} &nbsp;|&nbsp;
                  <strong>Empresa:</strong> {clientData.empresa}
                </span>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              {/* Card: Identificación */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <BadgeOutlinedIcon className="text-primary" />
                    <h6 className="fw-bold mb-0">Identificación del Cliente</h6>
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                      <BadgeOutlinedIcon
                        fontSize="small"
                        className="text-primary"
                      />
                      ID Cliente *
                    </label>
                    <input
                      type="text"
                      name="cliente"
                      value={formData.cliente}
                      onChange={handleChange}
                      required
                      placeholder="Pega aquí tu ID de Cliente (del email)"
                      className="form-control"
                      style={{
                        backgroundColor: "#f8f9fa",
                        borderRadius: "10px",
                        fontFamily: "monospace",
                        border: "1px solid #dee2e6",
                      }}
                    />
                    <div className="form-text d-flex align-items-center gap-1 mt-1">
                      <InfoOutlinedIcon
                        style={{ fontSize: "0.85rem" }}
                        className="text-muted"
                      />
                      Copia y pega el ID de Cliente que recibiste en el email
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Información Personal */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <PersonOutlinedIcon className="text-primary" />
                    <h6 className="fw-bold mb-0">Información Personal</h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <PersonOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Nombre Completo *
                      </label>
                      <input
                        type="text"
                        name="nombre"
                        value={formData.nombre}
                        onChange={handleChange}
                        required
                        placeholder="Tu nombre completo"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <EmailOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@email.com"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <PhoneOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Teléfono
                      </label>
                      <input
                        type="tel"
                        name="telefono"
                        value={formData.telefono}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <BusinessOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Empresa
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        placeholder="Nombre de tu empresa"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Información del Proyecto */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <SettingsOutlinedIcon className="text-primary" />
                    <h6 className="fw-bold mb-0">Información del Proyecto</h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-12">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <SettingsOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Servicio Solicitado *
                      </label>
                      <select
                        name="servicio_solicitado"
                        value={formData.servicio_solicitado}
                        onChange={handleChange}
                        required
                        className="form-select"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <option value="">Selecciona un servicio</option>
                        {serviciosOptions.map((servicio, index) => (
                          <option key={index} value={servicio}>
                            {servicio}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <DescriptionOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Descripción de la Necesidad
                      </label>
                      <textarea
                        rows={4}
                        name="descripcion_necesidad"
                        value={formData.descripcion_necesidad}
                        onChange={handleChange}
                        placeholder="Describe detalladamente qué necesitas, objetivos del proyecto, funcionalidades específicas, etc."
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                          resize: "vertical",
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Información de la Empresa */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <BusinessOutlinedIcon className="text-primary" />
                    <h6 className="fw-bold mb-0">Información de la Empresa</h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <GroupOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Tamaño de la Empresa
                      </label>
                      <select
                        name="tamaño_empresa"
                        value={formData.tamaño_empresa}
                        onChange={handleChange}
                        className="form-select"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <option value="">Selecciona el tamaño</option>
                        {tamañoEmpresaOptions.map((t, i) => (
                          <option key={i} value={t}>
                            {t}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <AttachMoneyOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Presupuesto Estimado
                      </label>
                      <select
                        name="presupuesto_estimado"
                        value={formData.presupuesto_estimado}
                        onChange={handleChange}
                        className="form-select"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <option value="">Selecciona un rango</option>
                        {presupuestoOptions.map((p, i) => (
                          <option key={i} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card: Información Adicional */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <div className="d-flex align-items-center gap-2 mb-4">
                    <CategoryOutlinedIcon className="text-primary" />
                    <h6 className="fw-bold mb-0">Información Adicional</h6>
                  </div>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <LanguageOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Sitio Web de la Empresa
                      </label>
                      <input
                        type="url"
                        name="campos_adicionales.web_empresa"
                        value={formData.campos_adicionales.web_empresa}
                        onChange={handleChange}
                        placeholder="https://www.tuempresa.com"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-md-6">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <CategoryOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Sector / Industria
                      </label>
                      <select
                        name="campos_adicionales.sector"
                        value={formData.campos_adicionales.sector}
                        onChange={handleChange}
                        className="form-select"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <option value="">Selecciona un sector</option>
                        {sectorOptions.map((s, i) => (
                          <option key={i} value={s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* What you get */}
              <div className="card border-0 shadow-sm rounded-3 mb-4">
                <div className="card-body p-4">
                  <h6 className="fw-bold mb-3">Qué recibirás después</h6>
                  <div className="row g-3">
                    <div className="col-md-4 d-flex align-items-start gap-2">
                      <SmartToyOutlinedIcon
                        fontSize="small"
                        className="text-primary mt-1"
                      />
                      <div>
                        <div className="small fw-semibold">Análisis IA</div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.78rem" }}
                        >
                          Propuesta personalizada con tecnologías recomendadas
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-start gap-2">
                      <EventOutlinedIcon
                        fontSize="small"
                        className="text-primary mt-1"
                      />
                      <div>
                        <div className="small fw-semibold">
                          Consulta Gratuita
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.78rem" }}
                        >
                          30 minutos con nuestro experto técnico
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 d-flex align-items-start gap-2">
                      <ArticleOutlinedIcon
                        fontSize="small"
                        className="text-primary mt-1"
                      />
                      <div>
                        <div className="small fw-semibold">
                          Cotización Detallada
                        </div>
                        <div
                          className="text-muted"
                          style={{ fontSize: "0.78rem" }}
                        >
                          Precios transparentes y cronograma de trabajo
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="btn btn-dark w-100 rounded-3 py-2 d-flex align-items-center justify-content-center gap-2 mb-2"
              >
                {loading ? (
                  <>
                    <span
                      className="spinner-border spinner-border-sm"
                      role="status"
                    />
                    Creando tu propuesta...
                  </>
                ) : (
                  <>
                    <SendOutlinedIcon fontSize="small" />
                    Recibir mi Propuesta Personalizada
                  </>
                )}
              </button>

              <div className="text-center mt-2 mb-4">
                <small className="text-muted d-flex align-items-center justify-content-center gap-1">
                  <LockOutlinedIcon style={{ fontSize: "0.85rem" }} />
                  Tus datos están 100% seguros y nunca serán compartidos.&nbsp;
                  <QueryBuilderOutlinedIcon style={{ fontSize: "0.85rem" }} />
                  Recibirás tu propuesta en menos de 24 horas.
                </small>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormClient;
