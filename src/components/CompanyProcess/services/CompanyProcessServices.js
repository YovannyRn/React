import axios from "axios";
import {
  API_BASE_COMPANYPROCESS_URL,
  API_COMPANYPROCESS_CREATE,
  API_COMPANYPROCESS_DELETE,
  API_COMPANYPROCESS_LIST,
  API_COMPANYPROCESS_UPDATE,
} from "../../../helpers/urlHelper";
import mockCompanyProcess from "../../../data/mockCompanyProcess";

const companyProcessApi = axios.create({
  baseURL: API_BASE_COMPANYPROCESS_URL,
});

companyProcessApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

const companyProcessService = {
  getAllCompanies: async () => {
    try {
      const response = await companyProcessApi.get(API_COMPANYPROCESS_LIST);
      return response.data;
    } catch (error) {
      console.warn("API unavailable, using mock data for company process.");
      return mockCompanyProcess;
    }
  },
  getCompanyById: async (id) => {
    try {
      const response = await companyProcessApi.get(
        `${API_COMPANYPROCESS_LIST}/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching company:", error);
      throw error;
    }
  },
  createCompany: async (companyData) => {
    try {
      const response = await companyProcessApi.post(
        `${API_COMPANYPROCESS_CREATE}/create`,
        companyData,
      );
      return response.data;
    } catch (error) {
      console.error("Error creating company:", error);
      throw error;
    }
  },
  updateCompany: async (id, companyData) => {
    try {
      const response = await companyProcessApi.put(
        `${API_COMPANYPROCESS_UPDATE}/update/${id}`,
        companyData,
      );
      return response.data;
    } catch (error) {
      console.error("Error updating company:", error);
      throw error;
    }
  },
  deleteCompany: async (id) => {
    try {
      const response = await companyProcessApi.delete(
        `${API_COMPANYPROCESS_DELETE}/delete/${id}`,
      );
      return response.data;
    } catch (error) {
      console.error("Error deleting company:", error);
      throw error;
    }
  },
};

export default companyProcessService;
