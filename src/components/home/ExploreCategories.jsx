import { motion } from "framer-motion";
import {
  ArrowUpRight,
  GraduationCap,
  HeartPulse,
  Leaf,
  Palette,
  Cpu,
  Users,
} from "lucide-react";
import { Link } from "react-router-dom";

const categories = [
  {
    title: "Education",
    description: "Ideas creating better learning opportunities.",
    icon: GraduationCap,
  },
  {
    title: "Health",
    description: "Projects improving health and community care.",
    icon: HeartPulse,
  },
  {
    title: "Environment",
    description: "Building a cleaner and greener future.",
    icon: Leaf,
  },
  {
    title: "Technology",
    description: "Bold technology solving real-world problems.",
    icon: Cpu,
  },
  {
    title: "Art & Creative",
    description: "Supporting artists and meaningful creativity.",
    icon: Palette,
  },
  {
    title: "Community",
    description: "People working together to create local impact.",
    icon: Users,
  },
];

const ExploreCategories = () => {
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
            <span className="inline-flex rounded-full bg-[#E8F5EE] px-4 py-2 text-xs font-bold text-[#008A5A]">
              Find your cause
            </span>

            <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828] sm:text-4xl lg:text-[46px]">
              Explore ideas by
              <span className="text-[#008A5A]"> category.</span>
            </h2>

            <p className="mt-4 max-w-xl text-[15px] leading-7 text-[#667085] sm:text-base">
              Discover campaigns around the causes and ideas that matter most
              to you.
            </p>
          </div>

          <Link
            to="/explore-campaigns"
            className="inline-flex items-center gap-2 text-sm font-bold text-[#008A5A]"
          >
            View all campaigns
            <ArrowUpRight size={17} />
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category, index) => {
            const Icon = category.icon;

            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.07,
                }}
              >
                <Link
                  to={`/explore-campaigns?category=${category.title}`}
                  className="group flex h-full items-center gap-5 rounded-[18px] border border-[#E9E7E1] bg-white p-6 shadow-[0_8px_30px_rgba(16,24,40,0.035)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_45px_rgba(16,24,40,0.09)]"
                >
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.06 }}
                    className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]"
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </motion.div>

                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-[#101828] transition-colors group-hover:text-[#008A5A]">
                      {category.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-[#667085]">
                      {category.description}
                    </p>
                  </div>

                  <ArrowUpRight
                    size={19}
                    className="shrink-0 text-[#98A2B3] transition-all duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-[#008A5A]"
                  />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default ExploreCategories;