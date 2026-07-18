import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/firebase.config";
import DashboardSidebar from "../components/dashboard/DashboardSidebar";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import DashboardFooter from "../components/dashboard/DashboardFooter";
import { Menu } from "lucide-react";

const DashboardLayout = () => {
  const [user, setUser] = useState(null);
  const [dbUser, setDbUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);

      if (currentUser?.email) {
        try {
         const response = await fetch(
  `http://localhost:5000/users/${currentUser.email}`,
  {
    headers: {
      authorization: `Bearer ${localStorage.getItem("access-token")}`,
    },
  }
);
          const data = await response.json();

          if (response.ok) {
            setDbUser(data);
          }
        } catch (error) {
          console.error("Dashboard user error:", error);
        }
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#FBFAF7]">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-[#DDEDE5] border-t-[#008A5A]" />
      </div>
    );
  }

  return (
  <div className="min-h-screen bg-[#FBFAF7]">
    {sidebarOpen && (
      <button
        type="button"
        aria-label="Close sidebar"
        onClick={() => setSidebarOpen(false)}
        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:hidden"
      />
    )}

    <div
      className={`fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 lg:translate-x-0 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <DashboardSidebar role={dbUser?.role} />
    </div>

    <div className="flex min-h-screen flex-col lg:ml-72">
      <div className="flex items-center border-b border-[#E9E7E1] bg-[#FBFAF7] px-5 pt-4 lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#E9E7E1] bg-white text-[#344054] transition hover:border-[#008A5A] hover:text-[#008A5A]"
          aria-label="Open dashboard navigation"
        >
          <Menu size={21} />
        </button>
      </div>

      <DashboardHeader user={user} dbUser={dbUser} />

      <main className="flex-1 px-5 py-8 lg:px-8">
        <Outlet context={{ user, dbUser }} />
      </main>

      <DashboardFooter />
    </div>
  </div>
); 
};

export default DashboardLayout;