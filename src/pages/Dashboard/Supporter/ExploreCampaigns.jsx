import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ExploreCampaigns = () => {

    const [campaigns, setCampaigns] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
  const fetchCampaigns = async () => {
    try {
      const response = await fetch("http://localhost:5000/campaigns/explore");

      const data = await response.json();

      if (response.ok) {
        setCampaigns(data);
      }
    } catch (error) {
      console.error("Explore campaigns error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCampaigns();
}, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <p className="text-sm font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Supporter Workspace
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Explore <span className="text-[#008A5A]">Campaigns</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Browse active campaigns and support the ideas that inspire you.
      </p>
      <div className="mt-10">
  {loading ? (
    <p className="text-center text-[#667085]">Loading campaigns...</p>
  ) : campaigns.length === 0 ? (
    <p className="text-center text-[#667085]">
      No active campaigns found.
    </p>
  ) : (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
      {campaigns.map((campaign) => (
        <motion.div
          key={campaign._id}
          whileHover={{ y: -6 }}
          className="overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]"
        >
          <img
            src={campaign.campaign_image_url}
            alt={campaign.campaign_title}
            className="h-56 w-full object-cover"
          />

          <div className="p-6">
            <h2 className="text-xl font-bold text-[#101828]">
              {campaign.campaign_title}
            </h2>

            <p className="mt-2 text-sm text-[#667085]">
              <span className="font-semibold">Creator:</span>{" "}
              {campaign.creator_name}
            </p>

            <p className="mt-2 text-sm text-[#667085]">
              <span className="font-semibold">Deadline:</span>{" "}
              {campaign.deadline}
            </p>

            <p className="mt-2 text-sm text-[#667085]">
              <span className="font-semibold">Funding Goal:</span>{" "}
              {campaign.funding_goal} Credits
            </p>

            <p className="mt-2 text-sm text-[#667085]">
              <span className="font-semibold">Raised:</span>{" "}
              {campaign.amount_raised} Credits
            </p>
<Link
  to={`/dashboard/campaign/${campaign._id}`}
  className="mt-6 block w-full rounded-2xl bg-[#008A5A] py-3 text-center text-sm font-bold text-white transition hover:bg-[#00764D]"
>
  View Details
</Link>
          </div>
        </motion.div>
      ))}
    </div>
  )}
</div>
    </motion.section>
  );
};

export default ExploreCampaigns;