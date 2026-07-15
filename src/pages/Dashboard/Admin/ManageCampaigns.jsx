import { motion } from "framer-motion";
import { useEffect, useState } from "react";


const ManageCampaigns = () => {

    const [campaigns, setCampaigns] = useState([]);

    const fetchCampaigns = async () => {
  try {
    const response = await fetch("http://localhost:5000/campaigns");

    const data = await response.json();

    if (response.ok) {
      setCampaigns(data);
    }
  } catch (error) {
    console.error(error);
  }
};

useEffect(() => {
  fetchCampaigns();
}, []);

const handleDelete = async (id) => {
  const confirmDelete = confirm(
    "Are you sure you want to delete this campaign?"
  );

  if (!confirmDelete) return;

  try {
    const response = await fetch(
      `http://localhost:5000/campaigns/${id}`,
      {
        method: "DELETE",
      }
    );

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      fetchCampaigns();
    }
  } catch (error) {
    console.error(error);
  }
};

return (
  <motion.section
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
  >
    <h1 className="text-3xl font-bold">
      Manage Campaigns
    </h1>

    <p>Total Campaigns: {campaigns.length}</p>
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
            Raised
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
            <td className="px-6 py-4">
              {campaign.campaign_title}
            </td>

            <td className="px-6 py-4">
              {campaign.creator_name}
            </td>

            <td className="px-6 py-4">
              {campaign.category}
            </td>

            <td className="px-6 py-4">
              {campaign.amount_raised}
            </td>

            <td className="px-6 py-4">
              {campaign.status}
            </td>

            <td className="px-6 py-4 text-center">
              <button onClick={() => handleDelete(campaign._id)} className="rounded-xl bg-red-500 px-4 py-2 text-sm font-bold text-white hover:bg-red-600">
                Delete
              </button>
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

export default ManageCampaigns;