import { Outlet } from "react-router-dom";
import Footer from "../components/shared/Footer";
import Navbar from "../components/shared/Navbar";

const BasicLayout = () => {
  return (
    <div className="min-h-screen bg-[#FAF9F6]">
      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default BasicLayout;