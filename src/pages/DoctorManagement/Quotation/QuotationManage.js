import React from "react";
import QuotationList from "../../../components/Quotations/List/QuotationList";
import { Link } from "react-router-dom";

const QuotationManage = () => {

  return (
    <div className="quotation-management">
      <Link/>
      <QuotationList />
    </div>
  );
}

export default QuotationManage;
