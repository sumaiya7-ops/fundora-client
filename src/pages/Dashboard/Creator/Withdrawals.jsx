import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";


const Withdrawals = () => {

    const { user } = useOutletContext();

const [earnings, setEarnings] = useState({
  totalCredits: 0,
  withdrawAmount: 0,
});

const [loading, setLoading] = useState(true);

const [withdrawCredits, setWithdrawCredits] = useState("");
const [paymentSystem, setPaymentSystem] = useState("Stripe");
const [accountNumber, setAccountNumber] = useState("");

useEffect(() => {
  if (!user?.email) {
    setLoading(false);
    return;
  }

  const fetchEarnings = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/campaigns/creator-earnings/${user.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setEarnings(data);
      }
    } catch (error) {
      console.error("Creator earnings fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchEarnings();
}, [user?.email]);

const handleWithdraw = async (event) => {
  event.preventDefault();

  const credits = Number(withdrawCredits);

if (credits > earnings.totalCredits) {
  alert("You cannot withdraw more than your available credits.");
  return;
}

if (credits < 200) {
  alert("Minimum withdrawal is 200 credits.");
  return;
}

  const withdrawalData = {
    creator_email: user.email,
    creator_name: user.displayName || "Creator",
    withdrawal_credit: Number(withdrawCredits),
    withdrawal_amount: Number(withdrawCredits) / 20,
    payment_system: paymentSystem,
    account_number: accountNumber,
  };

  try {
    const response = await fetch("http://localhost:5000/withdrawals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(withdrawalData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Withdrawal request submitted:", data);

      setWithdrawCredits("");
      setPaymentSystem("Stripe");
      setAccountNumber("");
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Withdrawal request error:", error);
  }
};


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Creator Workspace
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        <span className="text-[#008A5A]">Withdrawals</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Withdraw your earnings and track payment requests.
      </p>
      <div className="mt-6 rounded-3xl border border-[#E9E7E1] bg-white p-6">
  <p className="text-sm text-[#667085]">
    Total Credits Raised
  </p>

  <h2 className="mt-2 text-3xl font-bold text-[#101828]">
    {loading ? "Loading..." : `${earnings.totalCredits} Credits`}
  </h2>

  <p className="mt-5 text-sm text-[#667085]">
    Available Withdrawal
  </p>

  <h3 className="mt-2 text-2xl font-bold text-[#008A5A]">
    {loading ? "Loading..." : `$${earnings.withdrawAmount}`}
  </h3>
</div>
<motion.form
 onSubmit={handleWithdraw}
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="mt-8 rounded-3xl border border-[#E9E7E1] bg-white p-6 shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
>
  <h2 className="text-xl font-bold text-[#101828]">
    Withdrawal Request
  </h2>

  <div className="mt-6 grid gap-6 md:grid-cols-2">
    <div>
      <label className="text-sm font-bold text-[#344054]">
        Credits To Withdraw
      </label>

      <input
        type="number"
         value={withdrawCredits}
         onChange={(e) => setWithdrawCredits(e.target.value)}
        className="mt-2 w-full rounded-2xl border border-[#E2E8E4] px-4 py-3 outline-none focus:border-[#008A5A]"
        placeholder="200"
      />
    </div>

    <div>
      <label className="text-sm font-bold text-[#344054]">
        Withdraw Amount ($)
      </label>

      <input
        type="number"
        readOnly
        value={withdrawCredits ? withdrawCredits / 20 : ""}
        className="mt-2 w-full rounded-2xl border border-[#E2E8E4] bg-[#F7F7F7] px-4 py-3"
      />
    </div>

    <div>
      <label className="text-sm font-bold text-[#344054]">
        Payment System
      </label>

      <select
      value={paymentSystem}
        onChange={(e) => setPaymentSystem(e.target.value)}
       className="mt-2 w-full rounded-2xl border border-[#E2E8E4] px-4 py-3 outline-none focus:border-[#008A5A]"
       >
        <option>Stripe</option>
        <option>Bkash</option>
        <option>Nagad</option>
        <option>Rocket</option>
      </select>
    </div>

    <div>
      <label className="text-sm font-bold text-[#344054]">
        Account Number
      </label>

      <input
        type="text"
         value={accountNumber}
         onChange={(e) => setAccountNumber(e.target.value)}
        placeholder="017XXXXXXXX"
        className="mt-2 w-full rounded-2xl border border-[#E2E8E4] px-4 py-3 outline-none focus:border-[#008A5A]"
      />
    </div>
  </div>

  {earnings.totalCredits >= 200 ? (
  <button
    type="submit"
    className="mt-8 rounded-2xl bg-[#008A5A] px-8 py-3 font-bold text-white transition hover:bg-[#00764D]"
  >
    Withdraw
  </button>
) : (
  <p className="mt-8 font-semibold text-red-500">
    Insufficient credit
  </p>
)}
</motion.form>
    </motion.section>
  );
};

export default Withdrawals;