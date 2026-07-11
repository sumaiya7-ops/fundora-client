import { Outlet } from "react-router-dom";
import Navbar from "../components/shared/Navbar";

const BasicLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default BasicLayout;