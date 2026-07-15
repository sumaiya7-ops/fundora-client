import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import AddCampaign from "../pages/Dashboard/Creator/AddCampaign";
import MyCampaigns from "../pages/Dashboard/Creator/MyCampaigns";
import Withdrawals from "../pages/Dashboard/Creator/Withdrawals";
import PaymentHistory from "../pages/Dashboard/PaymentHistory";
import ExploreCampaigns from "../pages/Dashboard/Supporter/ExploreCampaigns";
import CampaignDetails from "../pages/Dashboard/Supporter/CampaignDetails";
import MyContributions from "../pages/Dashboard/Supporter/MyContributions";
import PurchaseCredit from "../pages/Dashboard/Supporter/PurchaseCredit";
import Payment from "../pages/Dashboard/Supporter/Payment";
import CampaignApprovals from "../pages/Dashboard/Admin/CampaignApprovals";
import ManageUsers from "../pages/Dashboard/Admin/ManageUsers";
import WithdrawalRequests from "../pages/Dashboard/Admin/WithdrawalRequests";
import ManageCampaigns from "../pages/Dashboard/Admin/ManageCampaigns";
import Reports from "../pages/Dashboard/Admin/Reports";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
    children: [
      {
        index: true,
        element: <Home />,
      },
 
       {
        path: "register",
        element: <Register />,
      },
      {
            path: "login",
            element: <Login />,
            },
    ],
  },

   {
    path: "/dashboard",
    element: <DashboardLayout />,
    children: [
    {
  index: true,
  element: <Dashboard />,
},
 {
      path: "campaign-approvals",
      element: <CampaignApprovals />,
    },
    {
  path: "manage-users",
  element: <ManageUsers />,
},
{
  path: "withdrawal-requests",
  element: <WithdrawalRequests />,
},
{
  path: "manage-campaigns",
  element: <ManageCampaigns />,
},
{
  path: "reports",
  element: <Reports />,
},
      {
  path: "add-campaign",
  element: <AddCampaign />,
},
{
  path: "my-campaigns",
  element: <MyCampaigns />,
},
{
  path: "withdrawals",
  element: <Withdrawals />,
},
{
  path: "payment-history",
  element: <PaymentHistory />,
},
{
  path: "explore-campaigns",
  element: <ExploreCampaigns />,
},
{
  path: "campaign/:id",
  element: <CampaignDetails />,
},
{
  path: "my-contributions",
  element: <MyContributions />,
},
{
  path: "purchase-credit",
  element: <PurchaseCredit />,
},
{
  path: "payment/:credits",
  element: <Payment />,
},

    ],
  },

]);

export default router;