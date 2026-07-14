import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const PaymentHistory = () => {
  const { user } = useOutletContext();

  const [payments, setPayments] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    const fetchPayments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/payments/${user.email}`
        );

        const data = await response.json();

        if (response.ok) {
          setPayments(data);
        }
      } catch (error) {
        console.error("Payment history error:", error);
      }
    };

    fetchPayments();
  }, [user?.email]);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Supporter Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Payment <span className="text-[#008A5A]">History</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        View all your credit purchase transactions.
      </p>

      <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead className="bg-[#F7F6F2]">
              <tr>
                <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                  Date
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                  Credits
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                  Amount
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                  Supporter
                </th>

                <th className="px-6 py-4 text-left text-xs font-bold uppercase">
                  Status
                </th>
              </tr>
            </thead>

            <tbody>
              {payments.map((payment) => (
                <tr
                  key={payment._id}
                  className="border-t border-[#E9E7E1]"
                >
                  <td className="px-6 py-4">
                    {new Date(payment.payment_date).toLocaleDateString()}
                  </td>

                  <td className="px-6 py-4 font-semibold">
                    {payment.credits}
                  </td>

                  <td className="px-6 py-4">
                    ${payment.amount}
                  </td>

                  <td className="px-6 py-4">
                    {payment.supporter_name}
                  </td>

                  <td className="px-6 py-4">
                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                      Success
                    </span>
                  </td>
                </tr>
              ))}

              {payments.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="py-10 text-center text-[#667085]"
                  >
                    No payment history found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </motion.section>
  );
};

export default PaymentHistory;