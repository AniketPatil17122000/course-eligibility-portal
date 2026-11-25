
import type { RouteInterface } from "../interfaces/interfaces";
import Dashboard from "../pages/Dashboard/Dashboard";
import StudentRegistration from "../pages/StudentRegistration/StudentRegistration";
import SubmissionHistory from "../pages/SubmissionHistory/SubmissionHistory";
import EligibilityResultPage from "../pages/EligibilityResult/EligibilityResult";
import LayoutMain from "../components/layout/MainLayout/MainLayout";

 
export const routeConfig: RouteInterface[] = [
  


  {
    element: <LayoutMain />,
    children: [

      {
        path: "/",
        element: <Dashboard />,
      },
      {
        path: "/register",
        element: <StudentRegistration />,
      },
      {
        path: "/history",
        element: <SubmissionHistory />,
      },
      {
        path: "/result",
        element: <EligibilityResultPage/>,
      }
    ],
  },
];
