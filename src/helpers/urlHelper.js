// This file contains the base URL and API endpoints for the application.
// All URLs are loaded from environment variables (.env file).
// Never hardcode real URLs or secrets here.

// --- Base URLs ---
export const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001/api/";

// --- Auth ---
export const API_LOGIN = "/auth/login";

// --- Quotations ---
export const API_BASE_QUOTATIONS_URL =
  process.env.REACT_APP_API_BASE_QUOTATIONS_URL || "http://localhost:5001/api";
export const API_QUOTATIONS_LIST = "/quotation";
export const API_QUOTATIONS_CREATE = "/quotation";
export const API_QUOTATIONS_UPDATE = "/quotation";
export const API_QUOTATIONS_DELETE = "/quotation";

// --- Client Process ---
export const API_BASE_CLIENTPROCESS_URL =
  process.env.REACT_APP_API_BASE_CLIENTPROCESS_URL ||
  "http://localhost:5001/api";
export const API_CLIENTPROCESS_LIST = "/clientProcess";
export const API_CLIENTPROCESS_CREATE = "/clientProcess";
export const API_CLIENTPROCESS_UPDATE = "/clientProcess";
export const API_CLIENTPROCESS_DELETE = "/clientProcess";
export const API_CLIENTPROCESS_SEARCH_EMAIL = "/clientProcess/search/email";

// --- Company Process ---
export const API_BASE_COMPANYPROCESS_URL =
  process.env.REACT_APP_API_BASE_COMPANYPROCESS_URL ||
  "http://localhost:5001/api";
export const API_COMPANYPROCESS_LIST = "/companyProcess";
export const API_COMPANYPROCESS_CREATE = "/companyProcess";
export const API_COMPANYPROCESS_UPDATE = "/companyProcess";
export const API_COMPANYPROCESS_DELETE = "/companyProcess";

// --- Client Form ---
export const API_BASE_CLIENTFORM_URL =
  process.env.REACT_APP_API_BASE_CLIENTFORM_URL || "http://localhost:5001/api";
export const API_CLIENTFORM_LIST = "/clientForm";
export const API_CLIENTFORM_CREATE = "/clientForm";
export const API_CLIENTFORM_UPDATE = "/clientForm";
export const API_CLIENTFORM_DELETE = "/clientForm";

// --- File Uploads ---
export const API_FILE_UPLOAD_SINGLE = "/uploads/single";
export const API_FILE_UPLOAD_MULTIPLE = "/uploads/multiple";

// --- n8n Webhooks ---
export const API_N8N_CLIENT =
  process.env.REACT_APP_N8N_WEBHOOK_CLIENT ||
  "http://localhost:5678/webhook-test/webhook/client-form-completed";
export const API_N8N_FORM =
  process.env.REACT_APP_N8N_WEBHOOK_FORM ||
  "http://localhost:5678/webhook-test/calendly-appointments/webhook";
export const API_N8N_CALENDLY =
  process.env.REACT_APP_N8N_WEBHOOK_CALENDLY ||
  "http://localhost:5678/webhook-test/webhook/calendly-scheduled";
