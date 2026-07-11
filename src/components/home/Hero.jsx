import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const slides = [
  {
    badge: "Community-powered crowdfunding",
    title: "Bring bold ideas",
    highlight: "to life.",
    description:
      "Fundora connects passionate creators with supporters who believe in meaningful ideas. Discover campaigns, contribute credits, and create real impact together.",
    image:
      "https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=90",
    raised: "8,450",
    goal: "10,000",
    progress: 84,
  },
  {
    badge: "Support ideas that matter",
    title: "Small support.",
    highlight: "Big impact.",
    description:
      "Explore inspiring projects, meaningful causes, and innovative products. Your contribution can help creators turn powerful ideas into reality.",
    image:
      "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1400&q=90",
    raised: "12,800",
    goal: "15,000",
    progress: 85,
  },
  {
    badge: "Create with your community",
    title: "Your vision.",
    highlight: "Backed together.",
    description:
      "Launch your campaign, connect with supporters, share your journey, and build something meaningful with a community that believes in you.",
    image:
      "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=1400&q=90",
    raised: "6,720",
    goal: "8,000",
    progress: 84,
  },
];

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
    },
  },
};

const itemVariants = {
  hidden: {
    opacity: 0,
    y: 25,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.55,
      ease: "easeOut",
    },
  },
};

const Hero = () => {
  return (
    <section className="overflow-hidden bg-[#FBFAF7]">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        loop
        speed={850}
        className="fundora-hero"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.title}>
            <div className="mx-auto grid min-h-[620px] max-w-7xl items-center gap-12 px-5 py-14 md:px-8 lg:grid-cols-2 lg:gap-16 lg:py-20">
              {/* Left Content */}

              <motion.div
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{
                  once: false,
                  amount: 0.3,
                }}
                className="max-w-xl"
              >
                <motion.div
                  variants={itemVariants}
                  className="mb-5 inline-flex items-center gap-2 rounded-full bg-[#E8F5EE] px-3 py-1.5"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#008A5A] text-white">
                    <Check size={12} strokeWidth={3} />
                  </span>

                  <span className="text-xs font-semibold text-[#008A5A]">
                    {slide.badge}
                  </span>
                </motion.div>

                <motion.h1
                  variants={itemVariants}
                  className="text-[42px] font-bold leading-[1.08] tracking-[-0.04em] text-[#101828] sm:text-[52px] lg:text-[64px]"
                >
                  {slide.title}

                  <span className="block text-[#008A5A]">
                    {slide.highlight}
                  </span>
                </motion.h1>

                <motion.p
                  variants={itemVariants}
                  className="mt-6 max-w-lg text-[15px] leading-7 text-[#667085] sm:text-base"
                >
                  {slide.description}
                </motion.p>

                <motion.div
                  variants={itemVariants}
                  className="mt-8 flex flex-col gap-3 sm:flex-row"
                >
                  <motion.div
                    whileHover={{
                      y: -3,
                      scale: 1.02,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to="/explore-campaigns"
                      className="flex items-center justify-center gap-2 rounded-md bg-[#008A5A] px-6 py-3 text-sm font-semibold text-white shadow-[0_8px_20px_rgba(0,138,90,0.18)] transition hover:bg-[#00754C]"
                    >
                      Explore Campaigns

                      <ArrowRight size={17} />
                    </Link>
                  </motion.div>

                  <motion.div
                    whileHover={{
                      y: -3,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to="/register"
                      className="flex items-center justify-center rounded-md border border-[#D0D5DD] bg-white px-6 py-3 text-sm font-semibold text-[#344054] transition hover:border-[#008A5A] hover:text-[#008A5A]"
                    >
                      Start a Campaign
                    </Link>
                  </motion.div>
                </motion.div>

                <motion.div
                  variants={itemVariants}
                  className="mt-10 flex flex-wrap gap-x-10 gap-y-5 border-t border-[#E9E7E1] pt-6"
                >
                  <div>
                    <p className="text-xl font-bold text-[#101828]">2.5K+</p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Campaigns funded
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-[#101828]">18K+</p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Active supporters
                    </p>
                  </div>

                  <div>
                    <p className="text-xl font-bold text-[#101828]">94%</p>

                    <p className="mt-1 text-xs text-[#667085]">
                      Community trust
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              {/* Right Campaign Preview */}

              <motion.div
                initial={{
                  opacity: 0,
                  x: 40,
                  scale: 0.96,
                }}
                whileInView={{
                  opacity: 1,
                  x: 0,
                  scale: 1,
                }}
                viewport={{
                  once: false,
                  amount: 0.25,
                }}
                transition={{
                  duration: 0.7,
                  ease: "easeOut",
                }}
                className="relative mx-auto w-full max-w-[540px]"
              >
                {/* Decorative Circle */}

                <motion.div
                  animate={{
                    y: [0, -10, 0],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -right-6 -top-7 h-24 w-24 rounded-full bg-[#E8F5EE]"
                />

                <motion.div
                  whileHover={{
                    y: -7,
                  }}
                  transition={{
                    duration: 0.3,
                  }}
                  className="relative overflow-hidden rounded-[16px] border border-[#E9E7E1] bg-white p-3 shadow-[0_24px_60px_rgba(16,24,40,0.12)]"
                >
                  <div className="group overflow-hidden rounded-[11px]">
                    <motion.img
                      whileHover={{
                        scale: 1.06,
                      }}
                      transition={{
                        duration: 0.6,
                      }}
                      src={slide.image}
                      alt={slide.title}
                      className="h-[300px] w-full object-cover sm:h-[390px] lg:h-[410px]"
                    />
                  </div>

                  <div className="px-2 pb-3 pt-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <p className="text-xs text-[#667085]">
                          Credits raised
                        </p>

                        <p className="mt-1 text-lg font-bold text-[#101828]">
                          {slide.raised}
                        </p>
                      </div>

                      <div className="text-right">
                        <p className="text-xs text-[#667085]">
                          Funding goal
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#344054]">
                          {slide.goal} credits
                        </p>
                      </div>
                    </div>

                    <div className="mt-4 h-2 overflow-hidden rounded-full bg-[#E8F5EE]">
                      <motion.div
                        initial={{
                          width: 0,
                        }}
                        whileInView={{
                          width: `${slide.progress}%`,
                        }}
                        viewport={{
                          once: false,
                        }}
                        transition={{
                          duration: 1.2,
                          delay: 0.4,
                        }}
                        className="h-full rounded-full bg-[#008A5A]"
                      />
                    </div>

                    <p className="mt-2 text-right text-xs font-semibold text-[#008A5A]">
                      {slide.progress}% funded
                    </p>
                  </div>
                </motion.div>

                {/* Floating Support Card */}

                <motion.div
                  animate={{
                    y: [0, -8, 0],
                  }}
                  transition={{
                    duration: 3.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="absolute -bottom-5 left-3 rounded-lg border border-[#E9E7E1] bg-white px-4 py-3 shadow-[0_12px_30px_rgba(16,24,40,0.12)] sm:-left-7"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#E8F5EE]">
                      <Check size={17} className="text-[#008A5A]" />
                    </div>

                    <div>
                      <p className="text-[11px] text-[#667085]">
                        Community backed
                      </p>

                      <p className="text-sm font-bold text-[#101828]">
                        Growing together
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Hero;