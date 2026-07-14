import { motion } from "framer-motion";
import { useOutletContext, useParams } from "react-router-dom";

const prices = {
  100: 10,
  300: 25,
  800: 60,
  1500: 110,
};

const Payment = () => {
  const { credits } = useParams();
  const { user, dbUser } = useOutletContext();


const handlePayment = async () => {
  try {
    const response = await fetch("http://localhost:5000/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        supporter_email: user.email,
        supporter_name: dbUser.name,
        credits: Number(credits),
        amount: prices[credits],
      }),
    });

    const data = await response.json();

    alert(data.message);
  } catch (error) {
    console.error(error);
  }
};


  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Supporter Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold text-[#101828]">
        Complete Payment
      </h1>

      <div className="mt-10 max-w-lg rounded-3xl border border-[#E9E7E1] bg-white p-8">
        <h2 className="text-4xl font-extrabold text-[#008A5A]">
          {credits} Credits
        </h2>

        <p className="mt-5 text-2xl font-bold text-[#101828]">
          ${prices[credits]}
        </p>

        <button
  onClick={handlePayment}
  className="mt-8 w-full rounded-2xl bg-[#008A5A] py-3 font-bold text-white transition hover:bg-[#00764D]"
>
  Pay Now
</button>
      </div>
    </motion.section>
  );
};

export default Payment;