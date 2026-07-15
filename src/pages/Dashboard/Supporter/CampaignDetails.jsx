import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";

const CampaignDetails = () => {

    const { id } = useParams();

const [campaign, setCampaign] = useState(null);
const [loading, setLoading] = useState(true);
const { user, dbUser } = useOutletContext();

const [contributionAmount, setContributionAmount] = useState("");
const [reason, setReason] = useState("");


useEffect(() => {
  const fetchCampaign = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/campaigns/${id}`
      );

      const data = await response.json();

      if (response.ok) {
        setCampaign(data);
      }
    } catch (error) {
      console.error("Campaign details error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchCampaign();
}, [id]);

const handleContribution = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/contributions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

         body: JSON.stringify({
        campaign_id: campaign._id,
        campaign_title: campaign.campaign_title,
        contribution_amount: contributionAmount,
        supporter_email: user.email,
        supporter_name: dbUser.name,
        creator_name: campaign.creator_name,
        creator_email: campaign.creator_email,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setContributionAmount("");
    }
  } catch (error) {
    console.error(error);
  }
};

const handleReport = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch("http://localhost:5000/reports", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reporter_name: dbUser.name,
        reporter_email: user.email,
        campaign_id: campaign._id,
        campaign_title: campaign.campaign_title,
        reason,
      }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      setReason("");
    }
  } catch (error) {
    console.error(error);
  }
};

if (loading) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[#667085]">Loading campaign...</p>
    </div>
  );
}

if (!campaign) {
  return (
    <div className="flex items-center justify-center py-20">
      <p className="text-[#667085]">Campaign not found.</p>
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
        Supporter Workspace
      </p>

      <h1 className="mt-3 text-3xl font-bold tracking-[-0.04em] text-[#101828] sm:text-4xl">
        Campaign <span className="text-[#008A5A]">Details</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        View campaign information and contribute to support this project.
      </p>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">
  <div>
    <img
      src={campaign.campaign_image_url}
      alt={campaign.campaign_title}
      className="h-[420px] w-full rounded-3xl object-cover"
    />
  </div>

  <div>
    <h2 className="text-3xl font-bold text-[#101828]">
      {campaign.campaign_title}
    </h2>

    <p className="mt-5 leading-8 text-[#667085]">
      {campaign.campaign_story}
    </p>

    <div className="mt-8 space-y-4 rounded-3xl border border-[#E9E7E1] bg-white p-6">
      <div className="flex justify-between">
        <span className="font-semibold text-[#667085]">Creator</span>
        <span className="font-bold text-[#101828]">
          {campaign.creator_name}
        </span>
      </div>

      
      <div className="flex justify-between">
        <span className="font-semibold text-[#667085]">Category</span>
        <span className="font-bold text-[#101828]">
          {campaign.category}
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold text-[#667085]">Funding Goal</span>
        <span className="font-bold text-[#101828]">
          {campaign.funding_goal} Credits
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold text-[#667085]">Raised</span>
        <span className="font-bold text-[#008A5A]">
          {campaign.amount_raised} Credits
        </span>
      </div>

      <div className="flex justify-between">
        <span className="font-semibold text-[#667085]">Deadline</span>
        <span className="font-bold text-[#101828]">
          {campaign.deadline}
        </span>
      </div>

      <div>
        <p className="font-semibold text-[#667085]">
          Reward
        </p>

        <p className="mt-2 text-[#101828]">
          {campaign.reward_info}
        </p>
      </div>
    </div>
<form
  onSubmit={handleContribution}
  className="mt-8 rounded-3xl border border-[#E9E7E1] bg-white p-6"
>
  <h3 className="text-xl font-bold text-[#101828]">
    Make a Contribution
  </h3>

  <label className="mt-6 block text-sm font-semibold text-[#344054]">
    Contribution Amount
  </label>

<input
  type="number"
  min={campaign.minimum_Contribution}
  value={contributionAmount}
  onChange={(e) => setContributionAmount(e.target.value)}
  placeholder={`Minimum ${campaign.minimum_Contribution} Credits`}
  className="mt-2 w-full rounded-2xl border border-[#E2E8E4] px-4 py-3 outline-none focus:border-[#008A5A]"
  required
/>

  <button
    type="submit"
    className="mt-6 w-full rounded-2xl bg-[#008A5A] py-3 font-bold text-white transition hover:bg-[#00764D]"
  >
    Contribute Now
  </button>
</form>
<form
  onSubmit={handleReport}
  className="mt-6 rounded-3xl border border-[#E9E7E1] bg-white p-6"
>
  <h3 className="text-xl font-bold text-[#101828]">
    Report Campaign
  </h3>

  <textarea
    value={reason}
    onChange={(e) => setReason(e.target.value)}
    placeholder="Why are you reporting this campaign?"
    required
    className="mt-4 h-28 w-full rounded-2xl border border-[#E2E8E4] px-4 py-3 outline-none focus:border-[#008A5A]"
  />

  <button
    type="submit"
    className="mt-4 w-full rounded-2xl bg-red-500 py-3 font-bold text-white hover:bg-red-600"
  >
    Report Campaign
  </button>
</form>
  </div>
</div>
    </motion.section>
  );
};

export default CampaignDetails;