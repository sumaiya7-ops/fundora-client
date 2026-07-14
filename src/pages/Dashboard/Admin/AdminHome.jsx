import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";
import {
  Users,
  UserCheck,
  Coins,
  CreditCard,
} from "lucide-react";

const AdminHome = () => {
  const { user } = useOutletContext();

  const [stats, setStats] = useState({
    totalSupporters: 0,
    totalCreators: 0,
    totalCredits: 0,
    totalPayments: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/users/admin-stats"
        );

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      title: "Total Supporters",
      value: loading ? "..." : stats.totalSupporters,
      icon: Users,
    },
    {
      title: "Total Creators",
      value: loading ? "..." : stats.totalCreators,
      icon: UserCheck,
    },
    {
      title: "Available Credits",
      value: loading ? "..." : stats.totalCredits,
      icon: Coins,
    },
    {
      title: "Payments Processed",
      value: loading ? "..." : stats.totalPayments,
      icon: CreditCard,
    },
  ];

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Admin Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Admin <span className="text-[#008A5A]">Overview</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        Monitor platform statistics and overall activity.
      </p>

      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {statCards.map((stat, index) => {
          const Icon = stat.icon;

          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: index * 0.1,
              }}
              className="rounded-3xl border border-[#E9E7E1] bg-white p-6 shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
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
    </motion.section>
  );
};

export default AdminHome;