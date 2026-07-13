import { Heart } from "lucide-react";

const DashboardFooter = () => {
  return (
    <footer className="border-t border-[#E9E7E1] bg-[#FBFAF7] px-5 py-5 lg:px-8">
      <div className="flex flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="text-sm text-[#667085]">
          © {new Date().getFullYear()} Fundora. All rights reserved.
        </p>

        <p className="flex items-center gap-1.5 text-sm text-[#667085]">
          Fund ideas with
          <Heart
            size={15}
            className="text-[#008A5A]"
            fill="currentColor"
          />
          build impact.
        </p>
      </div>
    </footer>
  );
};

export default DashboardFooter;