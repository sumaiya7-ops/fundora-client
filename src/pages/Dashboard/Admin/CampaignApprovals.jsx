import { motion } from "framer-motion";
import { useEffect, useState } from "react";

const CampaignApprovals = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchPendingCampaigns = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/campaigns/pending"
      );

      const data = await response.json();

      if (response.ok) {
        setCampaigns(data);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  const handleApprove = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/campaigns/approve/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchPendingCampaigns();
    }
  } catch (error) {
    console.error(error);
  }
};

const handleReject = async (id) => {
  try {
    const response = await fetch(
      `http://localhost:5000/campaigns/reject/${id}`,
      {
        method: "PATCH",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchPendingCampaigns();
    }
  } catch (error) {
    console.error(error);
  }
};


  useEffect(() => {
    fetchPendingCampaigns();
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

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Campaign <span className="text-[#008A5A]">Approvals</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        Review pending campaigns submitted by creators.
      </p>
      <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[900px]">
      <thead className="bg-[#F7F6F2]">
        <tr>
          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Campaign
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Creator
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Category
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Goal
          </th>

          <th className="px-6 py-4 text-left text-xs font-bold uppercase">
            Status
          </th>

          <th className="px-6 py-4 text-center text-xs font-bold uppercase">
            Action
          </th>
        </tr>
      </thead>

      <tbody>
   
        {campaigns.map((campaign) => (
          <tr
            key={campaign._id}
            className="border-t border-[#E9E7E1]"
          >
            <td className="px-6 py-4 font-semibold">
              {campaign.campaign_title}
            </td>

            <td className="px-6 py-4">
              {campaign.creator_name}
            </td>

            <td className="px-6 py-4">
              {campaign.category}
            </td>

            <td className="px-6 py-4">
              {campaign.funding_goal} Credits
            </td>

            <td className="px-6 py-4">
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-bold text-yellow-700">
                {campaign.status}
              </span>
            </td>

            <td className="px-6 py-4 text-center">
              <div className="flex justify-center gap-2">
  <button
    onClick={() => handleApprove(campaign._id)}
    className="rounded-xl bg-green-600 px-4 py-2 text-sm font-bold text-white hover:bg-green-700"
  >
    Approve
  </button>

  <button
    onClick={() => handleReject(campaign._id)}
    className="rounded-xl bg-red-600 px-4 py-2 text-sm font-bold text-white hover:bg-red-700"
  >
    Reject
  </button>
</div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
    </motion.section>
  );
};

export default CampaignApprovals;