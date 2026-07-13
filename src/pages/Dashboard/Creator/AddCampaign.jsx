import { motion } from "framer-motion";
import { useOutletContext } from "react-router-dom";



const AddCampaign = () => {
    const { user, dbUser } = useOutletContext();

    const handleAddCampaign = async (event) => {
  event.preventDefault();

  const form = event.target;
  const formData = new FormData(form);

  const campaignData = {
    campaign_title: formData.get("campaign_title"),
    campaign_story: formData.get("campaign_story"),
    category: formData.get("category"),
    funding_goal: Number(formData.get("funding_goal")),
    minimum_Contribution: Number(
      formData.get("minimum_Contribution")
    ),
    deadline: formData.get("deadline"),
    reward_info: formData.get("reward_info"),
    campaign_image_url: formData.get("campaign_image_url"),
    creator_name: dbUser?.name || user?.displayName,
    creator_email: user?.email,
  };

  try {
    const response = await fetch("http://localhost:5000/campaigns", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(campaignData),
    });

    const data = await response.json();

    if (response.ok) {
      console.log("Campaign created:", data);
      form.reset();
    } else {
      console.error(data.message);
    }
  } catch (error) {
    console.error("Add campaign error:", error);
  }
};

  const inputStyle =
    "mt-2 w-full rounded-2xl border border-[#E2E8E4] bg-white px-4 py-3.5 text-sm text-[#101828] outline-none transition duration-300 placeholder:text-[#98A2B3] focus:border-[#008A5A] focus:ring-4 focus:ring-[#008A5A]/10";

  const labelStyle = "text-sm font-bold text-[#344054]";

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
        Add New <span className="text-[#008A5A]">Campaign</span>
      </h1>

      <p className="mt-3 max-w-2xl text-sm leading-7 text-[#667085] sm:text-base">
        Create a campaign and submit it for admin approval.
      </p>

      <motion.form
        onSubmit={handleAddCampaign}
        initial={{ opacity: 0, y: 25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.15 }}
        className="mt-8 rounded-3xl border border-[#E9E7E1] bg-white p-5 shadow-[0_12px_35px_rgba(16,24,40,0.05)] sm:p-8"
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="lg:col-span-2">
            <label className={labelStyle}>Campaign Title</label>
            <input
              name="campaign_title"
              type="text"
               required
              placeholder="Help us build a solar-powered water pump"
              className={inputStyle}
            />
          </div>

          <div className="lg:col-span-2">
            <label className={labelStyle}>Campaign Story</label>
            <textarea
              name="campaign_story"
              rows="6"
               required
              placeholder="Tell supporters about your campaign..."
              className={`${inputStyle} resize-none`}
            />
          </div>

          <div>
            <label className={labelStyle}>Category</label>
            <select name="category" required className={inputStyle}>
              <option value="">Select category</option>
              <option value="Technology">Technology</option>
              <option value="Art">Art</option>
              <option value="Community">Community</option>
              <option value="Health">Health</option>
            </select>
          </div>

          <div>
            <label className={labelStyle}>Funding Goal</label>
            <input
              name="funding_goal"
              type="number"
              required
              placeholder="12000"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Minimum Contribution</label>
            <input
              name="minimum_Contribution"
              type="number"
              required
              placeholder="50"
              className={inputStyle}
            />
          </div>

          <div>
            <label className={labelStyle}>Deadline</label>
            <input name="deadline" required type="date" className={inputStyle} />
          </div>

          <div className="lg:col-span-2">
            <label className={labelStyle}>Reward Information</label>
            <textarea
              name="reward_info"
              rows="4"
              required
              placeholder="What will supporters receive for pledging?"
              className={`${inputStyle} resize-none`}
            />
          </div>

          <div className="lg:col-span-2">
            <label className={labelStyle}>Campaign Image URL</label>
            <input
              name="campaign_image_url"
              type="url"
              required
              placeholder="https://example.com/campaign-image.jpg"
              className={inputStyle}
            />
          </div>
        </div>

        <motion.button
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="mt-8 w-full rounded-2xl bg-[#008A5A] px-6 py-4 text-sm font-bold text-white shadow-lg shadow-[#008A5A]/20 transition hover:bg-[#00764D] sm:w-auto"
        >
          Add Campaign
        </motion.button>
      </motion.form>
    </motion.section>
  );
};

export default AddCampaign;