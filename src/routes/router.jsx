import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";
import Home from "../pages/Home/Home";
import Register from "../pages/Auth/Register";
import Login from "../pages/Auth/Login";
import DashboardLayout from "../layouts/DashboardLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CreatorHome from "../pages/Dashboard/Creator/CreatorHome";
import AddCampaign from "../pages/Dashboard/Creator/AddCampaign";
import MyCampaigns from "../pages/Dashboard/Creator/MyCampaigns";
import Withdrawals from "../pages/Dashboard/Creator/Withdrawals";
import PaymentHistory from "../pages/Dashboard/Creator/PaymentHistory";


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
         element: <CreatorHome />,
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
}

    ],
  },

]);

export default router;