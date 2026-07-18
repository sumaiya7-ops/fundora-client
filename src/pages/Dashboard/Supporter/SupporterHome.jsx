import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import { Coins, HandCoins, Clock3 } from "lucide-react";


const SupporterHome = () => {

    const { user } = useOutletContext();

const [stats, setStats] = useState({
  totalContributions: 0,
  pendingContributions: 0,
  totalAmountContributed: 0,
});

const [approvedContributions, setApprovedContributions] = useState([]);

const [loading, setLoading] = useState(true);

useEffect(() => {
  const token = localStorage.getItem("access-token");

  console.log("Supporter Token:", token);

  if (!user?.email || !token) {
    setLoading(false);
    return;
  }

  const fetchStats = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contributions/supporter-stats/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setStats(data);
      }
    } catch (error) {
      console.error("Supporter stats error:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchApprovedContributions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contributions/approved/${user.email}`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setApprovedContributions(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  fetchStats();
  fetchApprovedContributions();
}, [user?.email]);

const statCards = [
  {
    title: "Total Contributions",
    value: loading ? "..." : stats.totalContributions,
    icon: HandCoins,
  },
  {
    title: "Pending Contributions",
    value: loading ? "..." : stats.pendingContributions,
    icon: Clock3,
  },
  {
    title: "Total Amount Contributed",
    value: loading
      ? "..."
      : `${stats.totalAmountContributed} Credits`,
    icon: Coins,
  },
];

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
        My <span className="text-[#008A5A]">Overview</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Track your contributions, pending requests, and overall support activity.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: index * 0.1 }}
              whileHover={{ y: -6 }}
              className="group rounded-3xl border border-[#E9E7E1] bg-white p-6 shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
            >
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-sm font-semibold text-[#667085]">
                    {stat.title}
                  </p>

                  <p className="mt-4 text-3xl font-extrabold text-[#101828]">
                    {stat.value}
                  </p>
                </div>

                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]">
                  <Icon size={22} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.2 }}
  className="mt-10 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
>
  <div className="border-b border-[#E9E7E1] px-6 py-5">
    <h2 className="text-xl font-bold text-[#101828]">
      Approved Contributions
    </h2>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full min-w-[700px]">
      <thead className="bg-[#F7F6F2]">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Campaign
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Amount
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Creator
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Status
          </th>
        </tr>
      </thead>

      <tbody>
        {approvedContributions.map((contribution) => (
          <tr
            key={contribution._id}
            className="border-t border-[#E9E7E1]"
          >
            <td className="px-6 py-4">
              {contribution.campaign_title}
            </td>

            <td className="px-6 py-4">
              {contribution.contribution_amount}
            </td>

            <td className="px-6 py-4">
              {contribution.creator_name}
            </td>

            <td className="px-6 py-4">
              <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-bold text-green-700">
                {contribution.status}
              </span>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div>
    </motion.section>
  );
};

export default SupporterHome;