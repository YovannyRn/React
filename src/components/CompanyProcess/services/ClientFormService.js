import axios from "axios";
import {
  API_BASE_CLIENTFORM_URL,
  API_CLIENTFORM_CREATE,
  API_CLIENTFORM_DELETE,
  API_CLIENTFORM_LIST,
  API_CLIENTFORM_UPDATE,
} from "../../../helpers/urlHelper";
import mockClientForm from "../../../data/mockClientForm";

const clientFormApi = axios.create({
  baseURL: API_BASE_CLIENTFORM_URL,
});

clientFormApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const clientFormService = {
  getAllForms: async () => {
    try {
      const response = await clientFormApi.get(API_CLIENTFORM_LIST);
      return response.data;
    } catch (error) {
      console.warn("API unavailable, using mock data for client forms.");
      return mockClientForm;
    }
  },
  getFormById: async (id) => {
    try {
      const response = await clientFormApi.get(`${API_CLIENTFORM_LIST}/${id}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching form:", error);
      throw error;
    }
  },
  createForm: async (formData) => {
    try {
      const response = await clientFormApi.post(
        `${API_CLIENTFORM_CREATE}/create`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating form:", error);
      throw error;
    }
  },
  updateForm: async (id, formData) => {
    try {
      const response = await clientFormApi.put(
        `${API_CLIENTFORM_UPDATE}/update/${id}`,
        formData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating form:", error);
      throw error;
    }
  },
  deleteForm: async (id) => {
    try {
      const response = await clientFormApi.delete(
        `${API_CLIENTFORM_DELETE}/delete/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting form:", error);
      throw error;
    }
  },
};

export default clientFormService;
