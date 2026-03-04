import axios from "axios";
import {
  API_BASE_CLIENTPROCESS_URL,
  API_CLIENTPROCESS_CREATE,
  API_CLIENTPROCESS_DELETE,
  API_CLIENTPROCESS_LIST,
  API_CLIENTPROCESS_UPDATE,
} from "../../../helpers/urlHelper";
import mockClientProcess from "../../../data/mockClientProcess";

const clientProcessApi = axios.create({
  baseURL: API_BASE_CLIENTPROCESS_URL,
});

clientProcessApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const clientProcessService = {
  getAllClients: async () => {
    try {
      const response = await clientProcessApi.get(API_CLIENTPROCESS_LIST);
      return response.data;
    } catch (error) {
      console.warn("API unavailable, using mock data for client process.");
      return mockClientProcess;
    }
  },
  getClientById: async (id) => {
    try {
      const response = await clientProcessApi.get(
        `${API_CLIENTPROCESS_LIST}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching client:", error);
      throw error;
    }
  },
  createClient: async (clientData) => {
    try {
      const response = await clientProcessApi.post(
        `${API_CLIENTPROCESS_CREATE}/create`,
        clientData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating client:", error);
      throw error;
    }
  },
  updateClient: async (id, clientData) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/update/${id}`,
        clientData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating client:", error);
      throw error;
    }
  },
  deleteClient: async (id) => {
    try {
      const response = await clientProcessApi.delete(
        `${API_CLIENTPROCESS_DELETE}/delete/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting client:", error);
      throw error;
    }
  },

  // Métodos específicos para actualizaciones de estado automáticas
  updateClientStatus: async (id, newStatus) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/update-status/${id}`,
        {
          estado_kanban: newStatus,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error updating client status:", error);
      throw error;
    }
  },

  // Actualizar estado cuando se recibe formulario
  markFormReceived: async (clientId) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/form-received/${clientId}`,
        {
          estado_kanban: "formulario_recibido",
          formulario_completado: true,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error marking form as received:", error);
      throw error;
    }
  },

  // Actualizar estado cuando se agenda cita
  markAppointmentScheduled: async (clientId, appointmentData) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/appointment-scheduled/${clientId}`,
        {
          estado_kanban: "cita_agendada",
          cita_agendada: true,
          ...appointmentData,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error marking appointment as scheduled:", error);
      throw error;
    }
  },

  // Actualizar estado para facturación
  markBilling: async (clientId, billingData) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/billing/${clientId}`,
        {
          estado_kanban: "facturacion",
          factura_generada: true,
          ...billingData,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error marking billing:", error);
      throw error;
    }
  },

  // Actualizar estado para entrega
  markDelivery: async (clientId, deliveryData) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/delivery/${clientId}`,
        {
          estado_kanban: "entrega",
          proyecto_programado: true,
          ...deliveryData,
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error marking delivery:", error);
      throw error;
    }
  },

  // Actualizar estado para factura final
  markFinalBilling: async (clientId) => {
    try {
      const response = await clientProcessApi.put(
        `${API_CLIENTPROCESS_UPDATE}/final-billing/${clientId}`,
        {
          estado_kanban: "factura_final",
        },
      );
      return response.data;
    } catch (error) {
      console.error("Error marking final billing:", error);
      throw error;
    }
  },

  // Obtener clientes por estado
  getClientsByStatus: async (status) => {
    try {
      const response = await clientProcessApi.get(
        `${API_CLIENTPROCESS_LIST}/by-status/${status}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching clients by status:", error);
      throw error;
    }
  },
};

export default clientProcessService;
