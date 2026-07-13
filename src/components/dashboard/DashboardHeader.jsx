import { Bell, Coins } from "lucide-react";
import { motion } from "framer-motion";

const DashboardHeader = ({
  user,
  dbUser,
  onMenuClick,
}) => {
  return (
    <header className="border-b border-[#E9E7E1] bg-[#FBFAF7]/95 backdrop-blur-xl">
      <div className="flex min-h-20 items-center justify-between gap-4 px-5 py-4 lg:px-8">
        <div>
          <p className="text-sm text-[#667085]">Welcome back,</p>

          <h2 className="mt-1 text-xl font-bold tracking-[-0.03em] text-[#101828]">
            {dbUser?.name || user?.displayName || "Fundora User"}
          </h2>
        </div>

        <div className="flex items-center gap-2 sm:gap-3">
          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-2 rounded-full border border-[#DDEDE5] bg-[#E8F5EE] px-3 py-2.5 sm:px-4"
          >
            <Coins
              size={18}
              strokeWidth={1.8}
              className="text-[#008A5A]"
            />

            <div className="hidden sm:block">
              <p className="text-[10px] font-bold uppercase tracking-[0.1em] text-[#667085]">
                Available Credits
              </p>

              <p className="text-sm font-extrabold text-[#008A5A]">
                {dbUser?.credits || 0} Credits
              </p>
            </div>

            <span className="text-sm font-extrabold text-[#008A5A] sm:hidden">
              {dbUser?.credits || 0}
            </span>
          </motion.div>

          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            type="button"
            className="relative flex h-11 w-11 items-center justify-center rounded-full border border-[#E9E7E1] bg-white text-[#344054] transition hover:border-[#008A5A] hover:text-[#008A5A]"
            aria-label="Notifications"
          >
            <Bell size={19} strokeWidth={1.8} />

            <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-[#008A5A] ring-2 ring-white" />
          </motion.button>

          <motion.div
            whileHover={{ y: -2 }}
            className="flex items-center gap-3 rounded-full border border-[#E9E7E1] bg-white p-1.5 pr-3 sm:pr-4"
          >
            <img
              src={
                dbUser?.photoURL ||
                user?.photoURL ||
                "https://i.pravatar.cc/150?img=47"
              }
              alt={dbUser?.name || user?.displayName || "Fundora user"}
              className="h-10 w-10 rounded-full object-cover"
            />

            <div className="hidden md:block">
              <p className="max-w-36 truncate text-sm font-bold text-[#101828]">
                {dbUser?.name || user?.displayName || "Fundora User"}
              </p>

              <p className="mt-0.5 text-xs font-semibold capitalize text-[#008A5A]">
                {dbUser?.role || "supporter"}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;