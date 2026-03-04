import axios from "axios";
import {
  API_BASE_QUOTATIONS_URL,
  API_QUOTATIONS_CREATE,
  API_QUOTATIONS_DELETE,
  API_QUOTATIONS_LIST,
  API_QUOTATIONS_UPDATE,
} from "../../../helpers/urlHelper";
import mockQuotations from "../../../data/mockQuotations";

const quotationApi = axios.create({
  baseURL: API_BASE_QUOTATIONS_URL,
});

quotationApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const quotationService = {
  getAllQuotations: async () => {
    try {
      const response = await quotationApi.get(API_QUOTATIONS_LIST);
      return response.data;
    } catch (error) {
      console.warn("API unavailable, using mock data for quotations.");
      return mockQuotations;
    }
  },
  createQuotation: async (quotationData) => {
    try {
      const response = await quotationApi.post(
        `${API_QUOTATIONS_CREATE}`,
        quotationData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating quotation:", error);
      throw error;
    }
  },
  updateQuotation: async (id, quotationData) => {
    try {
      const response = await quotationApi.put(
        `${API_QUOTATIONS_UPDATE}${id}`,
        quotationData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating quotation:", error);
      throw error;
    }
  },
  deleteQuotation: async (id) => {
    try {
      const response = await quotationApi.delete(
        `${API_QUOTATIONS_DELETE}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting quotation:", error);
      throw error;
    }
  },
};

export default quotationService;
