import Dashboard from "@material-ui/icons/Dashboard";
// import Person from "@material-ui/icons/Person";
import LocationOn from "@material-ui/icons/LocationOn";
import DashboardPage from "./views/Dashboard";
import Maps from "./views/Maps";

// import UserProfile from "views/UserProfile/UserProfile.js";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: Dashboard,
    component: DashboardPage,
    layout: "/admin",
  },
  // {
  //   path: "/user",
  //   name: "User Profile",
  //   icon: Person,
  //   component: UserProfile,
  //   layout: "/admin",
  // },
  {
    path: "/maps",
    name: "Maps",
    icon: LocationOn,
    component: Maps,
    layout: "/admin",
  },
];

export default dashboardRoutes;
