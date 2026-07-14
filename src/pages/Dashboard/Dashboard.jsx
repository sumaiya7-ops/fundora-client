import CreatorHome from "./Creator/CreatorHome";
import SupporterHome from "./Supporter/SupporterHome";
import { useOutletContext } from "react-router-dom";
import AdminHome from "./Admin/AdminHome";

const Dashboard = () => {
  const { dbUser } = useOutletContext();

  if (dbUser?.role === "creator") {
    return <CreatorHome />;
  }

  if (dbUser?.role === "admin") {
  return <AdminHome />;
}

  if (dbUser?.role === "supporter") {
    return <SupporterHome />;
  }

  return (
    <div className="text-center py-20 text-[#667085]">
      Dashboard not available.
    </div>
  );
};

export default Dashboard;