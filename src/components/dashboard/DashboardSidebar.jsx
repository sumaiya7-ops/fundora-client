import {
  Banknote,
  ChartNoAxesColumnIncreasing,
  CircleDollarSign,
  CreditCard,
  FolderKanban,
  HandCoins,
  House,
  LayoutGrid,
  Plus,
  Users,
  CheckCheck,
} from "lucide-react";
import { NavLink } from "react-router-dom";

const roleMenus = {
  supporter: [
    { label: "Home", path: "/dashboard", icon: House },
   
    {
      label: "Explore Campaigns",
      path: "/dashboard/explore-campaigns",
      icon: LayoutGrid,
    },
    {
      label: "My Contributions",
      path: "/dashboard/my-contributions",
      icon: HandCoins,
    },
    {
      label: "Purchase Credit",
      path: "/dashboard/purchase-credit",
      icon: CircleDollarSign,
    },
    {
      label: "Payment History",
      path: "/dashboard/payment-history",
      icon: CreditCard,
    },
  ],

  creator: [
    { label: "Home", path: "/dashboard", icon: House },
    {
      label: "Add New Campaign",
      path: "/dashboard/add-campaign",
      icon: Plus,
    },
    {
      label: "My Campaigns",
      path: "/dashboard/my-campaigns",
      icon: FolderKanban,
    },
    {
      label: "Withdrawals",
      path: "/dashboard/withdrawals",
      icon: Banknote,
    },
    {
      label: "Payment History",
      path: "/dashboard/payment-history",
      icon: CreditCard,
    },
  ],

  admin: [
    { label: "Home", path: "/dashboard", icon: House },
     {
    label: "Campaign Approvals",
    path: "/dashboard/campaign-approvals",
    icon: CheckCheck,
  },
    {
      label: "Manage Users",
      path: "/dashboard/manage-users",
      icon: Users,
    },
    {
      label: "Manage Campaigns",
      path: "/dashboard/manage-campaigns",
      icon: FolderKanban,
    },
    {
      label: "Withdrawal Requests",
      path: "/dashboard/withdrawal-requests",
      icon: Banknote,
    },
    {
      label: "Reports",
      path: "/dashboard/reports",
      icon: ChartNoAxesColumnIncreasing,
    },
  ],
};

const DashboardSidebar = ({ role = "supporter" }) => {
  const menus = roleMenus[role] || roleMenus.supporter;

  const linkStyle = ({ isActive }) =>
    `group flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition-all duration-300 ${
      isActive
        ? "bg-[#E8F5EE] text-[#008A5A]"
        : "text-[#667085] hover:bg-[#F2F8F5] hover:text-[#008A5A]"
    }`;

  return (
    <aside className="flex h-full w-full flex-col border-r border-[#E9E7E1] bg-[#FBFAF7] px-5 py-6">
      <NavLink to="/" className="flex items-center gap-2.5 px-2">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#008A5A] text-lg font-extrabold text-white">
          F
        </div>

        <span className="text-2xl font-extrabold tracking-tight text-[#101828]">
          Fundora
        </span>
      </NavLink>

      <div className="mt-10">
        <p className="px-4 text-[11px] font-bold uppercase tracking-[0.16em] text-[#98A2B3]">
          Navigation
        </p>

        <nav className="mt-3 space-y-1.5">
          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                end={menu.path === "/dashboard"}
                className={linkStyle}
              >
                <Icon
                  size={19}
                  strokeWidth={1.8}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                <span>{menu.label}</span>
              </NavLink>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto rounded-2xl border border-[#DDEDE5] bg-[#E8F5EE] p-4">
        <p className="text-xs font-bold uppercase tracking-[0.12em] text-[#008A5A]">
          Fundora
        </p>

        <p className="mt-2 text-sm font-semibold leading-6 text-[#344054]">
          Fund ideas. Build impact.
        </p>
      </div>
    </aside>
  );
};

export default DashboardSidebar;