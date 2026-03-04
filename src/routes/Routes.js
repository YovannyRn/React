/* eslint-disable */
import GlobalDashboard from "../pages/Dashboard/GlobalDashboard";
import QuotationManage from "../pages/DoctorManagement/Quotation/QuotationManage";
import CompanyProcessManage from "../pages/DoctorManagement/CompanyProcess/CompanyProcessManage";
import LandingPage from "../components/CompanyProcess/ListClient/LandingPage";
import FormClientManagement from "../pages/DoctorManagement/clientListest/FormClientManagement";

/*========= public routes =============*/
const publicRoutes = [
  { path: "/quotation/list", component: QuotationManage },
  { path: "/company-process/list", component: CompanyProcessManage },
  { path: "/client-form", component: LandingPage },
  { path: "/client-form-management", component: FormClientManagement },
  { path: "/", component: GlobalDashboard },
];

/*======= protected route start =======*/
const protectedRoutes = [
  {
    path: "/admin/dashboard",
    component: GlobalDashboard,
  },
];
/*======= protected route end =======*/

export { publicRoutes, protectedRoutes };
