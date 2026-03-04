import React, { useState } from "react";
import { Modal, Button, Form, Row, Col, Alert, Spinner } from "react-bootstrap";
import { FaUser, FaBuilding, FaCogs, FaFileAlt } from "react-icons/fa";
import clientFormService from "../services/ClientFormService";
import clientProcessService from "../services/ClientProcessService";

const NewClientForm = ({ show, onHide, onClientCreated }) => {
  const [formData, setFormData] = useState({
    nombre: "",
    email: "",
    telefono: "",
    empresa: "",
    servicio_interes: "",
    descripcion_necesidad: "",
    como_conocio: "",
    presupuesto_estimado: "",
    urgencia: "media",
    canal_contacto: "formulario_web",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const servicios = [
    "Kit Digital",
    "Transformación Digital",
    "Desarrollo Web",
    "E-commerce",
    "SEO/SEM",
    "Automatización de Procesos",
    "Consultoría IT",
    "Otros",
  ];

  const urgenciaOptions = [
    { value: "baja", label: "Baja - Más de 3 meses" },
    { value: "media", label: "Media - 1-3 meses" },
    { value: "alta", label: "Alta - Menos de 1 mes" },
    { value: "urgente", label: "Urgente - Inmediato" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const errors = [];

    if (!formData.nombre.trim()) errors.push("El nombre es obligatorio");
    if (!formData.email.trim()) errors.push("El email es obligatorio");
    if (!formData.empresa.trim()) errors.push("La empresa es obligatoria");
    if (!formData.servicio_interes) errors.push("Debe seleccionar un servicio");

    // Validar formato de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (formData.email && !emailRegex.test(formData.email)) {
      errors.push("Formato de email inválido");
    }

    // Validar formato de teléfono (opcional)
    if (formData.telefono && formData.telefono.length < 9) {
      errors.push("Formato de teléfono inválido");
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setError(validationErrors.join(", "));
      return;
    }

    setLoading(true);
    setError(null);

    try {
      // 1. Crear cliente en estado "interesado"
      const clientData = {
        nombre: formData.nombre,
        email: formData.email,
        telefono: formData.telefono,
        empresa: formData.empresa,
        servicio_interes: formData.servicio_interes,
        estado_kanban: "interesado",
        fecha_registro: new Date().toISOString(),
        formulario_completado: false,
        cita_agendada: false,
        factura_generada: false,
        proyecto_programado: false,
        presupuesto_estimado: formData.presupuesto_estimado,
        urgencia: formData.urgencia,
        canal_contacto: formData.canal_contacto,
        como_conocio: formData.como_conocio,
      };

      const newClient = await clientProcessService.createClient(clientData);

      // 2. Crear formulario asociado
      const formDataToSave = {
        cliente: newClient._id || newClient.id,
        ...formData,
        fecha_creacion: new Date().toISOString(),
        estado: "recibido",
      };

      const newForm = await clientFormService.createForm(formDataToSave);

      setSuccess(true);

      // Notificar al componente padre para actualizar la lista
      if (onClientCreated) {
        onClientCreated(newClient);
      }

      // Limpiar formulario
      setFormData({
        nombre: "",
        email: "",
        telefono: "",
        empresa: "",
        servicio_interes: "",
        descripcion_necesidad: "",
        como_conocio: "",
        presupuesto_estimado: "",
        urgencia: "media",
        canal_contacto: "formulario_web",
      });

      // Cerrar modal después de 2 segundos
      setTimeout(() => {
        setSuccess(false);
        onHide();
      }, 2000);

      console.log("✅ Cliente y formulario creados exitosamente:", {
        client: newClient,
        form: newForm,
      });
    } catch (error) {
      console.error("❌ Error al crear cliente:", error);
      setError(`Error al crear cliente: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setError(null);
      setSuccess(false);
      onHide();
    }
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      size="lg"
      centered
      backdrop={loading ? "static" : true}
    >
      <Modal.Header closeButton={!loading}>
        <Modal.Title>
          <FaUser className="me-2 text-primary" />
          Nuevo Cliente
        </Modal.Title>
      </Modal.Header>

      <Modal.Body>
        {error && (
          <Alert variant="danger" className="mb-3">
            {error}
          </Alert>
        )}

        {success && (
          <Alert variant="success" className="mb-3">
            <div className="d-flex align-items-center">
              <Spinner size="sm" className="me-2" />
              ¡Cliente creado exitosamente! Iniciando flujo de automatización...
            </div>
          </Alert>
        )}

        <Form onSubmit={handleSubmit}>
          {/* Información Personal */}
          <div className="mb-4">
            <h6 className="text-primary mb-3">
              <FaUser className="me-2" />
              Información Personal
            </h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Nombre Completo *</Form.Label>
                  <Form.Control
                    type="text"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    placeholder="Nombre del contacto"
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Email *</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="email@empresa.com"
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Teléfono</Form.Label>
                  <Form.Control
                    type="tel"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    placeholder="+34 612 345 678"
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>¿Cómo nos conoció?</Form.Label>
                  <Form.Select
                    name="como_conocio"
                    value={formData.como_conocio}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    <option value="">Seleccionar...</option>
                    <option value="google">Google</option>
                    <option value="redes_sociales">Redes Sociales</option>
                    <option value="referido">Referido</option>
                    <option value="email">Email Marketing</option>
                    <option value="evento">Evento/Conferencia</option>
                    <option value="otro">Otro</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Información de Empresa */}
          <div className="mb-4">
            <h6 className="text-primary mb-3">
              <FaBuilding className="me-2" />
              Información de Empresa
            </h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Empresa *</Form.Label>
                  <Form.Control
                    type="text"
                    name="empresa"
                    value={formData.empresa}
                    onChange={handleInputChange}
                    placeholder="Nombre de la empresa"
                    required
                    disabled={loading}
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Servicio de Interés *</Form.Label>
                  <Form.Select
                    name="servicio_interes"
                    value={formData.servicio_interes}
                    onChange={handleInputChange}
                    required
                    disabled={loading}
                  >
                    <option value="">Seleccionar servicio...</option>
                    {servicios.map((servicio) => (
                      <option key={servicio} value={servicio}>
                        {servicio}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
          </div>

          {/* Detalles del Proyecto */}
          <div className="mb-4">
            <h6 className="text-primary mb-3">
              <FaCogs className="me-2" />
              Detalles del Proyecto
            </h6>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Presupuesto Estimado</Form.Label>
                  <Form.Select
                    name="presupuesto_estimado"
                    value={formData.presupuesto_estimado}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    <option value="">Seleccionar rango...</option>
                    <option value="< 5.000€">Menos de 5.000€</option>
                    <option value="5.000€ - 15.000€">5.000€ - 15.000€</option>
                    <option value="15.000€ - 30.000€">15.000€ - 30.000€</option>
                    <option value="30.000€ - 50.000€">30.000€ - 50.000€</option>
                    <option value="> 50.000€">Más de 50.000€</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Urgencia del Proyecto</Form.Label>
                  <Form.Select
                    name="urgencia"
                    value={formData.urgencia}
                    onChange={handleInputChange}
                    disabled={loading}
                  >
                    {urgenciaOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Descripción de la Necesidad</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="descripcion_necesidad"
                value={formData.descripcion_necesidad}
                onChange={handleInputChange}
                placeholder="Describa brevemente lo que necesita..."
                disabled={loading}
              />
            </Form.Group>
          </div>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <>
              <Spinner size="sm" className="me-2" />
              Creando Cliente...
            </>
          ) : (
            <>
              <FaFileAlt className="me-2" />
              Crear Cliente
            </>
          )}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewClientForm;
