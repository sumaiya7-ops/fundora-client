import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useOutletContext } from "react-router-dom";

const MyCampaigns = () => {

    const { user } = useOutletContext();

const [campaigns, setCampaigns] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedCampaign, setSelectedCampaign] = useState(null);

useEffect(() => {
  if (!user?.email) {
    setLoading(false);
    return;
  }

  const fetchMyCampaigns = async () => {
    try {
      const response = await fetch(
        `http://localhost:5000/campaigns/creator/${user.email}`
      );

      const data = await response.json();

      if (response.ok) {
        setCampaigns(data);
      }
    } catch (error) {
      console.error("My campaigns fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  fetchMyCampaigns();
}, [user?.email]);


const handleUpdateCampaign = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const updatedCampaign = {
    campaign_title: formData.get("campaign_title"),
    campaign_story: formData.get("campaign_story"),
    reward_info: formData.get("reward_info"),
  };

  try {
    const response = await fetch(
      `http://localhost:5000/campaigns/${selectedCampaign._id}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCampaign),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setCampaigns((previousCampaigns) =>
        previousCampaigns.map((campaign) =>
          campaign._id === selectedCampaign._id
            ? { ...campaign, ...updatedCampaign }
            : campaign
        )
      );

      setSelectedCampaign(null);
      console.log("Campaign updated:", data);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Update campaign error:", error);
  }
};

const handleDeleteCampaign = async (id) => {
  const isConfirmed = window.confirm(
    "Are you sure you want to delete this campaign?"
  );

  if (!isConfirmed) return;

  try {
    const response = await fetch(
      `http://localhost:5000/campaigns/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    if (response.ok) {
      setCampaigns((previousCampaigns) =>
        previousCampaigns.filter(
          (campaign) => campaign._id !== id
        )
      );

      console.log("Campaign deleted:", data);
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Delete campaign error:", error);
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
        My <span className="text-[#008A5A]">Campaigns</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Manage, update, and review all campaigns you have created.
      </p>
  <div className="mt-8 overflow-hidden rounded-3xl border border-[#E9E7E1] bg-white shadow-[0_12px_35px_rgba(16,24,40,0.05)]">
  <div className="overflow-x-auto">
    <table className="w-full min-w-[900px]">
      <thead className="bg-[#F7F6F2]">
        <tr className="text-left">
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Campaign
          </th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Goal
          </th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Raised
          </th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Deadline
          </th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Status
          </th>
          <th className="px-6 py-4 text-xs font-bold uppercase text-[#667085]">
            Action
          </th>
        </tr>
      </thead>

      <tbody className="divide-y divide-[#E9E7E1]">
        {loading ? (
          <tr>
            <td
              colSpan="6"
              className="px-6 py-10 text-center text-sm text-[#667085]"
            >
              Loading campaigns...
            </td>
          </tr>
        ) : campaigns.length === 0 ? (
          <tr>
            <td
              colSpan="6"
              className="px-6 py-10 text-center text-sm text-[#667085]"
            >
              No campaigns found.
            </td>
          </tr>
        ) : (
          campaigns.map((campaign) => (
            <tr
              key={campaign._id}
              className="transition hover:bg-[#F7FCF9]"
            >
              <td className="px-6 py-5">
                <p className="max-w-[240px] font-bold text-[#101828]">
                  {campaign.campaign_title}
                </p>
                <p className="mt-1 text-xs text-[#667085]">
                  {campaign.category}
                </p>
              </td>

              <td className="px-6 py-5 text-sm font-semibold text-[#344054]">
                {campaign.funding_goal} Credits
              </td>

              <td className="px-6 py-5 text-sm font-bold text-[#008A5A]">
                {campaign.amount_raised} Credits
              </td>

              <td className="px-6 py-5 text-sm text-[#667085]">
                {campaign.deadline}
              </td>

              <td className="px-6 py-5">
                <span className="rounded-full bg-[#E8F5EE] px-3 py-1.5 text-xs font-bold capitalize text-[#008A5A]">
                  {campaign.status}
                </span>
              </td>

              <td className="px-6 py-5">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                     onClick={() => setSelectedCampaign(campaign)}
                    className="rounded-xl border border-[#DDEDE5] px-4 py-2 text-sm font-bold text-[#008A5A] transition hover:bg-[#E8F5EE]"
                  >
                    Update
                  </button>

                  <button
                    type="button"
                      onClick={() => handleDeleteCampaign(campaign._id)}
                    className="rounded-xl border border-red-200 px-4 py-2 text-sm font-bold text-red-500 transition hover:bg-red-50"
                  >
                    Delete
                  </button>
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

{selectedCampaign && (
  <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      className="w-full max-w-xl rounded-3xl bg-[#FBFAF7] p-6 shadow-2xl sm:p-8"
    >
      <p className="text-xs font-bold uppercase tracking-[0.14em] text-[#008A5A]">
        Update Campaign
      </p>

      <h2 className="mt-3 text-2xl font-bold text-[#101828]">
        Edit Campaign Details
      </h2>

      <form
       onSubmit={handleUpdateCampaign}
       className="mt-6 space-y-5"
          >
        <div>
          <label className="text-sm font-bold text-[#344054]">
            Campaign Title
          </label>

          <input
            name="campaign_title"
            type="text"
            required
            defaultValue={selectedCampaign.campaign_title}
            className="mt-2 w-full rounded-2xl border border-[#E2E8E4] bg-white px-4 py-3 text-sm outline-none focus:border-[#008A5A]"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-[#344054]">
            Campaign Story
          </label>

          <textarea
            name="campaign_story"
            required
            rows="5"
            defaultValue={selectedCampaign.campaign_story}
            className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8E4] bg-white px-4 py-3 text-sm outline-none focus:border-[#008A5A]"
          />
        </div>

        <div>
          <label className="text-sm font-bold text-[#344054]">
            Reward Information
          </label>

          <textarea
            name="reward_info"
            required
            rows="3"
            defaultValue={selectedCampaign.reward_info}
            className="mt-2 w-full resize-none rounded-2xl border border-[#E2E8E4] bg-white px-4 py-3 text-sm outline-none focus:border-[#008A5A]"
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <button
            type="submit"
            className="flex-1 rounded-xl bg-[#008A5A] px-5 py-3 text-sm font-bold text-white transition hover:bg-[#00764D]"
          >
            Save Changes
          </button>

          <button
            type="button"
            onClick={() => setSelectedCampaign(null)}
            className="flex-1 rounded-xl border border-[#E9E7E1] bg-white px-5 py-3 text-sm font-bold text-[#667085] transition hover:bg-[#F7F6F2]"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  </div>
)}

    </motion.section>
  );
};

export default MyCampaigns;