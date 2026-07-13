import { motion } from "framer-motion";
import { ArrowUpRight, HeartHandshake, Search } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: Search,
    title: "Discover ideas",
    description:
      "Explore meaningful campaigns and find the ideas that inspire you to create real change.",
  },
  {
    number: "02",
    icon: HeartHandshake,
    title: "Support a vision",
    description:
      "Use your Fundora credits to support creators and projects you genuinely believe in.",
  },
  {
    number: "03",
    icon: ArrowUpRight,
    title: "Create impact",
    description:
      "Follow campaign progress and become part of a community turning bold ideas into reality.",
  },
];

const HowItWorks = () => {
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
            Simple by design
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828] sm:text-4xl lg:text-[46px]">
            From an idea to
            <span className="text-[#008A5A]"> real impact.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#667085] sm:text-base">
            Fundora makes discovering, supporting and growing meaningful ideas
            simple for everyone.
          </p>
        </motion.div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-3">
          <div className="absolute left-[17%] right-[17%] top-12 hidden border-t border-dashed border-[#B7DDCC] md:block" />

          {steps.map((step, index) => {
            const Icon = step.icon;

            return (
              <motion.article
                key={step.number}
                initial={{ opacity: 0, y: 35 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.12,
                }}
                whileHover={{ y: -8 }}
                className="group relative z-10 rounded-[20px] border border-[#E9E7E1] bg-white p-7 shadow-[0_10px_35px_rgba(16,24,40,0.04)] transition-shadow duration-300 hover:shadow-[0_22px_55px_rgba(16,24,40,0.09)]"
              >
                <div className="flex items-center justify-between">
                  <motion.div
                    whileHover={{ rotate: 6, scale: 1.06 }}
                    className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#E8F5EE] text-[#008A5A]"
                  >
                    <Icon size={25} strokeWidth={1.8} />
                  </motion.div>

                  <span className="text-4xl font-bold tracking-[-0.05em] text-[#E4F1EB]">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-8 text-xl font-bold tracking-[-0.02em] text-[#101828] transition-colors group-hover:text-[#008A5A]">
                  {step.title}
                </h3>

                <p className="mt-3 text-[15px] leading-7 text-[#667085]">
                  {step.description}
                </p>

                <div className="mt-7 h-1 w-10 rounded-full bg-[#008A5A] transition-all duration-300 group-hover:w-20" />
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;