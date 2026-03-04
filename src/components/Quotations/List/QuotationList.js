import React from 'react';
import QuotationsHeader from '../header/QuotationsHeader';
import DashboardQuotations from '../DashboardBody/DashboardQuotations';
import QuotationBody from '../Body/QuotationBody';


function QuotationList() {
  return (
    <div className="QuotationList">
      <QuotationsHeader />

      <DashboardQuotations />

      <QuotationBody />
    </div>
  );
}

export default QuotationList;