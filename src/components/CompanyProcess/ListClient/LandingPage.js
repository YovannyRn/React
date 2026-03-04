import React, { useState } from "react";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import ShieldOutlinedIcon from "@mui/icons-material/ShieldOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import AutoAwesomeOutlinedIcon from "@mui/icons-material/AutoAwesomeOutlined";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import HandshakeOutlinedIcon from "@mui/icons-material/HandshakeOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import SendOutlinedIcon from "@mui/icons-material/SendOutlined";
import RocketLaunchOutlinedIcon from "@mui/icons-material/RocketLaunchOutlined";
import { API_N8N_CLIENT } from "../../../helpers/urlHelper";

const LandingPage = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    empresa: "",
    servicio_interes: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState("");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    // Generar ID único y preparar datos completos
    const clientData = {
      ...formData,
      id: `client_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      estado_kanban: "interesado",
    };

    try {
      const response = await fetch(API_N8N_CLIENT, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(clientData),
      });

      if (response.ok) {
        const responseData = await response.text();

        setMessage(
          "¡Formulario enviado exitosamente! Recibirás un email pronto con el análisis de IA personalizado y un enlace para agendar una cita.",
        );
        setMessageType("success");

        // Limpiar formulario
        setFormData({
          nombre: "",
          email: "",
          empresa: "",
          servicio_interes: "",
        });
      } else {
        const errorText = await response.text();
        throw new Error(
          `Error del servidor: ${response.status} - ${errorText}`,
        );
      }
    } catch (error) {
      let errorMessage = "Error al enviar el formulario. ";

      if (error.name === "TypeError" && error.message.includes("fetch")) {
        errorMessage +=
          "No se puede conectar con el servidor. Verifica que n8n esté corriendo.";
      } else if (error.message.includes("CORS")) {
        errorMessage +=
          "Error de CORS. Verifica la configuración del servidor.";
      } else {
        errorMessage += `Detalles: ${error.message}`;
      }

      setMessage(errorMessage);
      setMessageType("danger");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <div className="container py-5">
        <div className="row justify-content-center">
          <div className="col-lg-7 col-xl-6">
            {/* Header */}
            <div className="mb-4">
              <div className="d-flex align-items-center gap-2 mb-1">
                <RocketLaunchOutlinedIcon
                  fontSize="small"
                  className="text-primary"
                />
                <span
                  className="text-muted small fw-semibold text-uppercase"
                  style={{ letterSpacing: "0.05em" }}
                >
                  Client Services · MediCore
                </span>
              </div>
              <h2 className="fw-bold mb-1">Impulsa tu Negocio con IA</h2>
              <p className="text-muted mb-0">
                Completa el formulario y recibe un análisis personalizado junto
                con un enlace para agendar tu consulta gratuita.
              </p>
            </div>

            {/* Alert */}
            {message && (
              <div
                className={`alert border-0 rounded-3 d-flex align-items-center gap-2 mb-4 ${
                  messageType === "success"
                    ? "alert-success"
                    : messageType === "danger"
                      ? "alert-danger"
                      : "alert-warning"
                }`}
              >
                {messageType === "success" ? (
                  <CheckCircleOutlineIcon fontSize="small" />
                ) : (
                  <ErrorOutlineIcon fontSize="small" />
                )}
                <span>{message}</span>
              </div>
            )}

            {/* Form Card */}
            <div className="card border-0 shadow-sm rounded-3 mb-4">
              <div className="card-body p-4">
                {/* Section header */}
                <div className="d-flex align-items-center gap-2 mb-4">
                  <PersonOutlinedIcon className="text-primary" />
                  <h6 className="fw-bold mb-0">Información de Contacto</h6>
                </div>

                <form onSubmit={handleSubmit}>
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
                        Email Corporativo *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="tu@empresa.com"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <BusinessOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Empresa / Organización *
                      </label>
                      <input
                        type="text"
                        name="empresa"
                        value={formData.empresa}
                        onChange={handleChange}
                        required
                        placeholder="Nombre de tu empresa"
                        className="form-control"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      />
                    </div>
                    <div className="col-12">
                      <label className="form-label fw-semibold small d-flex align-items-center gap-1">
                        <SettingsOutlinedIcon
                          fontSize="small"
                          className="text-primary"
                        />
                        Servicio de Interés *
                      </label>
                      <select
                        name="servicio_interes"
                        value={formData.servicio_interes}
                        onChange={handleChange}
                        required
                        className="form-select"
                        style={{
                          backgroundColor: "#f8f9fa",
                          borderRadius: "10px",
                          border: "1px solid #dee2e6",
                        }}
                      >
                        <option value="">
                          Selecciona el servicio que necesitas...
                        </option>
                        <option value="Desarrollo Web">Desarrollo Web</option>
                        <option value="Desarrollo Móvil">
                          Desarrollo Móvil
                        </option>
                        <option value="Automatización con IA">
                          Automatización con IA
                        </option>
                        <option value="Análisis de Datos">
                          Análisis de Datos
                        </option>
                        <option value="Consultoría Digital">
                          Consultoría Digital
                        </option>
                        <option value="Sistema de Gestión">
                          Sistema de Gestión
                        </option>
                        <option value="E-commerce">E-commerce</option>
                        <option value="Otro">Otro servicio</option>
                      </select>
                    </div>
                  </div>

                  <hr className="my-4" />

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="btn btn-dark w-100 rounded-3 py-2 d-flex align-items-center justify-content-center gap-2"
                  >
                    {loading ? (
                      <>
                        <span
                          className="spinner-border spinner-border-sm"
                          role="status"
                        />
                        Procesando con IA...
                      </>
                    ) : (
                      <>
                        <SendOutlinedIcon fontSize="small" />
                        Obtener Análisis IA y Agendar Cita Gratuita
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>

            {/* Trust + Features */}
            <div className="row g-3">
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-3 h-100">
                  <div className="card-body p-3 text-center">
                    <ShieldOutlinedIcon className="text-primary mb-2" />
                    <div className="small fw-semibold">Datos 100% Seguros</div>
                    <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                      Información cifrada y confidencial
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-3 h-100">
                  <div className="card-body p-3 text-center">
                    <AutoAwesomeOutlinedIcon className="text-primary mb-2" />
                    <div className="small fw-semibold">
                      Análisis Personalizado
                    </div>
                    <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                      Recomendaciones IA para tu empresa
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-4">
                <div className="card border-0 shadow-sm rounded-3 h-100">
                  <div className="card-body p-3 text-center">
                    <AccessTimeOutlinedIcon className="text-primary mb-2" />
                    <div className="small fw-semibold">Respuesta en 24h</div>
                    <div className="text-muted" style={{ fontSize: "0.78rem" }}>
                      Seguimiento rápido garantizado
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What you get */}
            <div className="card border-0 shadow-sm rounded-3 mt-3">
              <div className="card-body p-4">
                <h6 className="fw-bold mb-3">
                  Qué obtienes al enviar el formulario
                </h6>
                <div className="row g-3">
                  <div className="col-md-4 d-flex align-items-start gap-2">
                    <AutoAwesomeOutlinedIcon
                      fontSize="small"
                      className="text-primary mt-1"
                    />
                    <div>
                      <div className="small fw-semibold">Análisis IA</div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.78rem" }}
                      >
                        Recomendaciones específicas para tu empresa
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
                        Enlace de Calendly
                      </div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.78rem" }}
                      >
                        Agenda tu consulta directamente
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex align-items-start gap-2">
                    <HandshakeOutlinedIcon
                      fontSize="small"
                      className="text-primary mt-1"
                    />
                    <div>
                      <div className="small fw-semibold">Consulta Gratuita</div>
                      <div
                        className="text-muted"
                        style={{ fontSize: "0.78rem" }}
                      >
                        30 minutos sin compromiso
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
