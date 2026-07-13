import Hero from "../../components/home/Hero";
import TopFundedCampaigns from "../../components/home/TopFundedCampaigns";
import TestimonialSection from "../../components/home/TestimonialSection";
import HowItWorks from "../../components/home/HowItWorks";
import ExploreCategories from "../../components/home/ExploreCategories";
import PlatformImpact from "../../components/home/PlatformImpact";

const Home = () => {
  return (
    <>
      <Hero />
      <TopFundedCampaigns />
       <TestimonialSection />
       <HowItWorks />
       <ExploreCategories />
       <PlatformImpact />
    </>
  );
};

export default Home;