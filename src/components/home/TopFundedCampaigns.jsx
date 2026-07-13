import { motion } from "framer-motion";
import { ArrowRight, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TopFundedCampaigns = () => {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:5000/campaigns/top-funded")
      .then((res) => res.json())
      .then((data) => {
        setCampaigns(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Top funded campaigns error:", error);
        setLoading(false);
      });
  }, []);

  return (
    <section className="bg-[#FBFAF7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between"
        >
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 rounded-full bg-[#E8F5EE] px-3 py-1.5">
              <TrendingUp size={14} className="text-[#008A5A]" />

              <span className="text-xs font-semibold text-[#008A5A]">
                Community favourites
              </span>
            </div>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828] sm:text-4xl lg:text-[46px]">
              Top funded campaigns
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#667085] sm:text-base">
              Discover the ideas receiving incredible support from the Fundora
              community.
            </p>
          </div>

          <motion.div
            whileHover={{ x: 4 }}
            transition={{ duration: 0.2 }}
          >
            <Link
              to="/explore-campaigns"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#008A5A]"
            >
              Explore all campaigns
              <ArrowRight size={17} />
            </Link>
          </motion.div>
        </motion.div>

        {loading ? (
          <div className="grid gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <div
                key={item}
                className="overflow-hidden rounded-[16px] border border-[#E9E7E1] bg-white p-3"
              >
                <div className="h-56 animate-pulse rounded-[11px] bg-[#F0EEE9]" />

                <div className="px-2 py-5">
                  <div className="h-4 w-24 animate-pulse rounded bg-[#F0EEE9]" />
                  <div className="mt-4 h-6 animate-pulse rounded bg-[#F0EEE9]" />
                  <div className="mt-3 h-6 w-3/4 animate-pulse rounded bg-[#F0EEE9]" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid gap-6 pt-12 sm:grid-cols-2 lg:grid-cols-3">
            {campaigns.map((campaign, index) => {
              const progress = Math.min(
                Math.round(
                  (campaign.amount_raised / campaign.funding_goal) * 100,
                ),
                100,
              );

              return (
                <motion.article
                  key={campaign._id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -8 }}
                  className="group overflow-hidden rounded-[16px] border border-[#E9E7E1] bg-white p-3 shadow-[0_10px_30px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_22px_50px_rgba(16,24,40,0.10)]"
                >
                  <div className="relative overflow-hidden rounded-[11px]">
                    <motion.img
                      src={campaign.campaign_image_url}
                      alt={campaign.campaign_title}
                      whileHover={{ scale: 1.06 }}
                      transition={{ duration: 0.55 }}
                      className="h-56 w-full object-cover"
                    />

                    <span className="absolute left-4 top-4 rounded-full bg-white/95 px-3 py-1.5 text-[11px] font-semibold text-[#008A5A] shadow-sm backdrop-blur">
                      {campaign.category}
                    </span>
                  </div>

                  <div className="px-2 pb-3 pt-5">
                    <h3 className="min-h-[56px] text-xl font-bold leading-7 tracking-[-0.02em] text-[#101828] transition group-hover:text-[#008A5A]">
                      {campaign.campaign_title}
                    </h3>

                    <div className="mt-5 flex items-end justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#667085]">
                          Total raised
                        </p>

                        <p className="mt-1 text-xl font-bold text-[#101828]">
                          {campaign.amount_raised?.toLocaleString()}{" "}
                          <span className="text-sm font-semibold text-[#008A5A]">
                            credits
                          </span>
                        </p>
                      </div>

                      <p className="text-sm font-bold text-[#008A5A]">
                        {progress}%
                      </p>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8F5EE]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${progress}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 1,
                          delay: 0.2 + index * 0.08,
                        }}
                        className="h-full rounded-full bg-[#008A5A]"
                      />
                    </div>

                    <div className="mt-5 flex items-center justify-between border-t border-[#F0EEE9] pt-4">
                      <p className="text-xs text-[#667085]">
                        by{" "}
                        <span className="font-semibold text-[#344054]">
                          {campaign.creator_name}
                        </span>
                      </p>

                      <motion.div whileHover={{ x: 3 }}>
                        <Link
                          to={`/campaigns/${campaign._id}`}
                          className="inline-flex items-center gap-1.5 text-xs font-bold text-[#008A5A]"
                        >
                          View campaign
                          <ArrowRight size={14} />
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
};

export default TopFundedCampaigns;