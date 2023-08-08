import { createBrowserRouter } from "react-router-dom";
import HomeComponent from "../Pages/Home";
import NotFound from "../Pages/NotFound";
import TrainingSessions from "../Pages/Board";
const router = createBrowserRouter([
    {
      path: "/",
      element: <HomeComponent/>,
      errorElement: <NotFound/>
    },
    {
      path: "training-sessions",
      element: <TrainingSessions/>,
      errorElement: <NotFound/>
    }
  ]);

export default router