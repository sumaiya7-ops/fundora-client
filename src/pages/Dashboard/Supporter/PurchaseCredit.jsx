import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const packages = [
  {
    credits: 100,
    price: 10,
  },
  {
    credits: 300,
    price: 25,
  },
  {
    credits: 800,
    price: 60,
  },
  {
    credits: 1500,
    price: 110,
  },
];

const PurchaseCredit = () => {
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
        Purchase <span className="text-[#008A5A]">Credits</span>
      </h1>

      <p className="mt-3 max-w-2xl text-[#667085]">
        Select a credit package to support more campaigns.
      </p>

      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {packages.map((item) => (
          <motion.div
            key={item.credits}
            whileHover={{ y: -8 }}
            className="rounded-3xl border border-[#E9E7E1] bg-white p-7 shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
          >
            <h2 className="text-4xl font-extrabold text-[#008A5A]">
              {item.credits}
            </h2>

            <p className="mt-2 text-[#667085]">
              Credits
            </p>

            <h3 className="mt-6 text-3xl font-bold text-[#101828]">
              ${item.price}
            </h3>

          <Link
  to={`/dashboard/payment/${item.credits}`}
  className="mt-8 block w-full rounded-2xl bg-[#008A5A] py-3 text-center font-bold text-white transition hover:bg-[#00764D]"
>
  Purchase
</Link>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
};

export default PurchaseCredit;