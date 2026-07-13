import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";
import {
  CircleCheckBig,
  Coins,
  FolderKanban,
   X,
} from "lucide-react";


const CreatorHome = () => {
  const { user } = useOutletContext();

  const [stats, setStats] = useState({
    totalCampaigns: 0,
    activeCampaigns: 0,
    totalAmountRaised: 0,
  });

  const [contributions, setContributions] = useState([]);
   const [selectedContribution, setSelectedContribution] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    const fetchCreatorStats = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/campaigns/creator-stats/${user.email}`
        );

        const data = await response.json();

        if (response.ok) {
          setStats(data);
        }
      } catch (error) {
        console.error("Creator stats fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCreatorStats();
  }, [user?.email]);

  useEffect(() => {
  if (!user?.email) return;

  const fetchPendingContributions = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/contributions/pending/${user.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setContributions(data);
      }
    } catch (error) {
      console.error("Pending contributions fetch error:", error);
    }
  };

  fetchPendingContributions();
}, [user?.email]);

  const statCards = [
  {
    title: "Total Campaigns",
    value: stats.totalCampaigns,
    icon: FolderKanban,
  },
  {
    title: "Active Campaigns",
    value: stats.activeCampaigns,
    icon: CircleCheckBig,
  },
  {
    title: "Total Amount Raised",
    value: `${stats.totalAmountRaised} Credits`,
    icon: Coins,
  },
];

const handleApproveContribution = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/contributions/approve/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (response.ok) {
      setContributions((previousContributions) =>
        previousContributions.filter(
          (contribution) => contribution._id !== id
        )
      );

      setSelectedContribution(null);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Approve contribution error:", error);
  }
};


const handleRejectContribution = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/contributions/reject/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    if (response.ok) {
      setContributions((previousContributions) =>
        previousContributions.filter(
          (contribution) => contribution._id !== id
        )
      );

      setSelectedContribution(null);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Reject contribution error:", error);
  }
};

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Creator Dashboard
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Campaign <span className="text-[#008A5A]">Overview</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Track your campaigns, review contributions, and monitor your funding
        progress.
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
        className="group rounded-3xl border border-[#E9E7E1] bg-white p-6 shadow-[0_12px_35px_rgba(16,24,40,0.05)] transition-shadow duration-300 hover:shadow-[0_18px_45px_rgba(16,24,40,0.09)]"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-semibold text-[#667085]">
              {stat.title}
            </p>

            <p className="mt-4 text-3xl font-extrabold tracking-[-0.04em] text-[#101828]">
              {loading ? "..." : stat.value}
            </p>
          </div>

          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A] transition-transform duration-300 group-hover:scale-110">
            <Icon size={22} strokeWidth={1.8} />
          </div>
        </div>

        <div className="mt-6 h-1.5 overflow-hidden rounded-full bg-[#F0F2F0]">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: "72%" }}
            transition={{ duration: 0.8, delay: 0.25 + index * 0.1 }}
            className="h-full rounded-full bg-[#008A5A]"
          />
        </div>
      </motion.div>
    );
  })}
</div>

<motion.div
  initial={{ opacity: 0, y: 25 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.5, delay: 0.3 }}
  className="mt-10 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
>
  <div className="border-b border-[#E9E7E1] px-5 py-5 sm:px-6">
    <h2 className="text-xl font-bold tracking-[-0.03em] text-[#101828]">
      Contributions To Review
    </h2>

    <p className="mt-1 text-sm text-[#667085]">
      Review pending contributions for your campaigns.
    </p>
  </div>

  <div className="overflow-x-auto">
    <table className="w-full min-w-[760px]">
      <thead className="bg-[#F7F6F2]">
        <tr className="text-left">
          <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            Supporter Name
          </th>

          <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            Campaign Title
          </th>

          <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            Contribution Amount
          </th>

          <th className="px-6 py-4 text-xs font-bold uppercase tracking-[0.08em] text-[#667085]">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#E9E7E1]">
        {contributions.map((contribution) => (
          <tr
            key={contribution._id}
            className="transition-colors duration-300 hover:bg-[#F7FCF9]"
          >
            <td className="px-6 py-5 text-sm font-semibold text-[#101828]">
              {contribution.supporter_name}
            </td>

            <td className="px-6 py-5 text-sm text-[#667085]">
              {contribution.campaign_title}
            </td>

            <td className="px-6 py-5">
              <span className="rounded-full bg-[#E8F5EE] px-3 py-1.5 text-sm font-bold text-[#008A5A]">
                {contribution.contribution_amount} Credits
              </span>
            </td>

            <td className="px-6 py-5">
              <button
                type="button"
                onClick={() => setSelectedContribution(contribution)}
                className="rounded-xl border border-[#DDEDE5] bg-white px-4 py-2 text-sm font-bold text-[#008A5A] transition-all duration-300 hover:-translate-y-0.5 hover:border-[#008A5A] hover:bg-[#E8F5EE]"
              >
                View Contribution
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</motion.div>

{selectedContribution && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="relative w-full max-w-lg rounded-3xl bg-[#FBFAF7] p-6 shadow-2xl sm:p-8"
    >
      <button
        type="button"
        onClick={() => setSelectedContribution(null)}
        className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white text-[#667085] transition hover:bg-[#E8F5EE] hover:text-[#008A5A]"
        aria-label="Close contribution modal"
      >
        <X size={19} />
      </button>

      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Contribution Detail
      </p>

      <h2 className="mt-3 pr-12 text-2xl font-bold tracking-[-0.03em] text-[#101828]">
        {selectedContribution.campaign_title}
      </h2>

      <div className="mt-6 space-y-4">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#98A2B3]">
            Supporter
          </p>

          <p className="mt-1 font-semibold text-[#101828]">
            {selectedContribution.supporter_name}
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#98A2B3]">
            Contribution Amount
          </p>

          <p className="mt-1 font-bold text-[#008A5A]">
            {selectedContribution.contribution_amount} Credits
          </p>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-[0.08em] text-[#98A2B3]">
            Message
          </p>

          <p className="mt-2 rounded-2xl border border-[#E9E7E1] bg-white p-4 text-sm leading-7 text-[#667085]">
            {selectedContribution.message || "No message provided."}
          </p>
        </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    type="button"
    onClick={() =>
      handleApproveContribution(selectedContribution._id)
    }
    className="rounded-xl bg-[#008A5A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#00764D]"
  >
    Approve
  </motion.button>

  <motion.button
    whileHover={{ y: -2 }}
    whileTap={{ scale: 0.97 }}
    type="button"
    onClick={() =>
      handleRejectContribution(selectedContribution._id)
    }
    className="rounded-xl border border-[#FECACA] bg-[#FFF5F5] px-5 py-3 text-sm font-bold text-[#D92D20] transition hover:bg-[#FEE4E2]"
  >
    Reject
  </motion.button>
</div>

      </div>
    </motion.div>
  </div>
)}

    </motion.section>
  );
};

export default CreatorHome;