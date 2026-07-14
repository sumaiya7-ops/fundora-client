import { useOutletContext } from "react-router-dom";
import CreatorPaymentHistory from "./Creator/PaymentHistory";
import SupporterPaymentHistory from "./Supporter/PaymentHistory";

const PaymentHistory = () => {
  const { dbUser } = useOutletContext();

  if (dbUser?.role === "creator") {
    return <CreatorPaymentHistory />;
  }

  if (dbUser?.role === "supporter") {
    return <SupporterPaymentHistory />;
  }

  return (
    <div className="py-20 text-center text-[#667085]">
      Payment history not available.
    </div>
  );
};

export default PaymentHistory;