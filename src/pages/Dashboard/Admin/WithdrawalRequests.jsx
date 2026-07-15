import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const WithdrawalRequests = () => {
  const [withdrawals, setWithdrawals] = useState([]);

  const fetchWithdrawals = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/withdrawals/pending"
      );

      const data = await response.json();

      if (response.ok) {
        setWithdrawals(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePaymentSuccess = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/withdrawals/approve/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchWithdrawals();
    }
  } catch (error) {
    console.error(error);
  }
};

  useEffect(() => {
    fetchWithdrawals();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Admin Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828]">
        Withdrawal <span className="text-[#008A5A]">Requests</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        Review pending withdrawal requests submitted by creators.
      </p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[900px]">
      <thead className="bg-[#F7F6F2]">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Creator
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Credits
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Amount
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Payment
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Date
          </th>

          <th className="px-6 py-4 text-center text-xs font-bold uppercase">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
        {withdrawals.length === 0 ? (
          <tr>
            <td
              colSpan="6"
              className="px-6 py-10 text-center text-gray-500"
            >
              No pending withdrawal requests.
            </td>
          </tr>
        ) : (
          withdrawals.map((withdrawal) => (
            <tr
              key={withdrawal._id}
              className="border-t border-[#E9E7E1]"
            >
              <td className="px-6 py-4">
                {withdrawal.creator_name}
              </td>

              <td className="px-6 py-4">
                {withdrawal.withdrawal_credit}
              </td>

              <td className="px-6 py-4">
                ${withdrawal.withdrawal_amount}
              </td>

              <td className="px-6 py-4">
                {withdrawal.payment_system}
              </td>

              <td className="px-6 py-4">
                {new Date(
                  withdrawal.withdraw_date
                ).toLocaleDateString()}
              </td>

              <td className="px-6 py-4 text-center">
                <button
                 onClick={() => handlePaymentSuccess(withdrawal._id)}
                  className="rounded-xl bg-[#008A5A] px-4 py-2 text-sm font-bold text-white hover:bg-[#00764D]"
                >
                  Payment Success
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>
    </motion.section>
  );
};

export default WithdrawalRequests;