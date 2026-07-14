import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyContributions = () => {

  const { user } = useOutletContext();

const [contributions, setContributions] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  if (!user?.email) {
    setLoading(false);
    return;
  }

  const fetchContributions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contributions/supporter/${user.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setContributions(data);
      }
    } catch (error) {
      console.error("My contributions error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchContributions();
}, [user?.email]);

if (loading) {
  return (
    <div className="flex justify-center py-20">
      <p className="text-[#667085]">Loading...</p>
    </div>
  );
}

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
        My <span className="text-[#008A5A]">Contributions</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        View all your contribution history.
      </p>
      <div className="mt-10 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white">
  <div className="overflow-x-auto">
    <table className="min-w-full">
      <thead className="bg-[#F8FAF8]">
        <tr>
          <th className="px-6 py-4 text-left text-sm font-bold text-[#344054]">
            Campaign
          </th>

          <th className="px-6 py-4 text-left text-sm font-bold text-[#344054]">
            Creator
          </th>

          <th className="px-6 py-4 text-left text-sm font-bold text-[#344054]">
            Amount
          </th>

          <th className="px-6 py-4 text-left text-sm font-bold text-[#344054]">
            Date
          </th>

          <th className="px-6 py-4 text-left text-sm font-bold text-[#344054]">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {contributions.length === 0 ? (
          <tr>
            <td
              colSpan="5"
              className="py-10 text-center text-[#667085]"
            >
              No contributions found.
            </td>
          </tr>
        ) : (
          contributions.map((item) => (
            <tr
              key={item._id}
              className="border-t border-[#F2F4F7]"
            >
              <td className="px-6 py-4 font-semibold text-[#101828]">
                {item.campaign_title}
              </td>

              <td className="px-6 py-4 text-[#667085]">
                {item.creator_name}
              </td>

              <td className="px-6 py-4 font-semibold text-[#101828]">
                {item.contribution_amount} Credits
              </td>

              <td className="px-6 py-4 text-[#667085]">
                {new Date(item.current_date).toLocaleDateString()}
              </td>

              <td className="px-6 py-4">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    item.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : item.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }`}
                >
                  {item.status}
                </span>
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

export default MyContributions;