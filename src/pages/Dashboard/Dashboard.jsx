import { motion } from "framer-motion";

const Dashboard = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h1 className="text-3xl font-bold tracking-[-0.03em] text-[#101828]">
        Dashboard <span className="text-[#008A5A]">Home</span>
      </h1>

      <p className="mt-3 text-[#667085]">
        Welcome to your Fundora dashboard.
      </p>
    </motion.section>
  );
};

export default Dashboard;