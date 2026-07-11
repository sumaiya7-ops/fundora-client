import { createBrowserRouter } from "react-router-dom";
import BasicLayout from "../layouts/BasicLayout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <BasicLayout />,
  },
]);

export default router;