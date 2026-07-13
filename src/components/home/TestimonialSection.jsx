import { motion } from "framer-motion";
import { Quote, Star } from "lucide-react";
import { Autoplay, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Nadia Rahman",
    role: "Campaign Supporter",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    quote:
      "Fundora made supporting meaningful ideas feel simple and transparent. I always know where my contribution is making an impact.",
  },
  {
    name: "Arif Hasan",
    role: "Project Creator",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    quote:
      "Launching my campaign felt effortless. Fundora helped me connect with people who genuinely believed in my vision.",
  },
  {
    name: "Sara Ahmed",
    role: "Campaign Supporter",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    quote:
      "I love discovering creative projects here. The experience feels friendly, modern and built around real communities.",
  },
  {
    name: "Rayhan Karim",
    role: "Project Creator",
    image: "https://randomuser.me/api/portraits/men/75.jpg",
    quote:
      "From contributions to campaign updates, everything feels organized. Fundora gives creators the tools they actually need.",
  },
];

const TestimonialSection = () => {
  return (
    <section className="overflow-hidden bg-[#FBFAF7] py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.55 }}
          className="mx-auto max-w-2xl text-center"
        >
          <span className="inline-flex rounded-full bg-[#E8F5EE] px-4 py-2 text-xs font-bold text-[#008A5A]">
            Community stories
          </span>

          <h2 className="mt-5 text-3xl font-bold tracking-[-0.035em] text-[#101828] sm:text-4xl lg:text-[46px]">
            Loved by people who make
            <span className="text-[#008A5A]"> impact happen.</span>
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-7 text-[#667085] sm:text-base">
            Hear from creators and supporters building meaningful ideas
            together through Fundora.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="mt-12"
        >
          <Swiper
            modules={[Autoplay, Pagination]}
            spaceBetween={24}
            slidesPerView={1}
            loop={true}
            autoplay={{
              delay: 3500,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
            className="fundora-testimonial-swiper !pb-14"
          >
            {testimonials.map((testimonial) => (
              <SwiperSlide key={testimonial.name} className="h-auto">
                <motion.article
                  whileHover={{ y: -7 }}
                  transition={{ duration: 0.25 }}
                  className="relative h-full rounded-[20px] border border-[#E9E7E1] bg-white p-7 shadow-[0_10px_35px_rgba(16,24,40,0.04)]"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex gap-1 text-[#008A5A]">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          fill="currentColor"
                        />
                      ))}
                    </div>

                    <Quote
                      size={34}
                      strokeWidth={1.5}
                      className="text-[#CDEBDE]"
                    />
                  </div>

                  <p className="mt-7 min-h-[120px] text-[15px] leading-7 text-[#475467]">
                    “{testimonial.quote}”
                  </p>

                  <div className="mt-7 flex items-center gap-4 border-t border-[#F0EEE9] pt-5">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="h-12 w-12 rounded-full object-cover ring-4 ring-[#E8F5EE]"
                    />

                    <div>
                      <h3 className="font-bold text-[#101828]">
                        {testimonial.name}
                      </h3>

                      <p className="mt-1 text-xs font-medium text-[#667085]">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>
                </motion.article>
              </SwiperSlide>
            ))}
          </Swiper>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;