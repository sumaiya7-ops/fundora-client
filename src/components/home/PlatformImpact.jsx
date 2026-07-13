import { motion } from "framer-motion";
import { CircleCheckBig, Heart, Rocket, Users } from "lucide-react";

const impactData = [
  {
    value: "250+",
    label: "Campaigns launched",
    description: "Bold ideas started their journey.",
    icon: Rocket,
  },
  {
    value: "1.2M+",
    label: "Credits raised",
    description: "Community credits creating impact.",
    icon: Heart,
  },
  {
    value: "18K+",
    label: "Active supporters",
    description: "People supporting meaningful ideas.",
    icon: Users,
  },
  {
    value: "92%",
    label: "Positive impact",
    description: "Campaigns building real change.",
    icon: CircleCheckBig,
  },
];

const PlatformImpact = () => {
  return (
    <section className="bg-[#FBFAF7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-[#E8F5EE] px-4 py-2 text-xs font-bold text-[#008A5A]">
            Growing together
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828] sm:text-4xl lg:text-[46px]">
            Small support.
            <span className="text-[#008A5A]"> Meaningful impact.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#667085] sm:text-base">
            Every campaign, contribution and supporter helps Fundora turn
            meaningful ideas into visible progress.
          </p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {impactData.map((item, index) => {
            const Icon = item.icon;

            return (
              <motion.article
                key={item.label}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.1,
                }}
                whileHover={{ y: -8 }}
                className="group rounded-[20px] border border-[#E9E7E1] bg-white p-7 text-center shadow-[0_10px_35px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(16,24,40,0.09)]"
              >
                <motion.div
                  whileHover={{ rotate: 7, scale: 1.08 }}
                  className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]"
                >
                  <Icon size={25} strokeWidth={1.8} />
                </motion.div>

                <h3 className="mt-7 text-4xl font-extrabold tracking-[-0.05em] text-[#101828] transition-colors group-hover:text-[#008A5A]">
                  {item.value}
                </h3>

                <p className="mt-3 text-sm font-bold text-[#344054]">
                  {item.label}
                </p>

                <p className="mt-2 text-sm leading-6 text-[#667085]">
                  {item.description}
                </p>

                <div className="mx-auto mt-6 h-1 w-8 rounded-full bg-[#008A5A] transition-all duration-300 group-hover:w-16" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default PlatformImpact;