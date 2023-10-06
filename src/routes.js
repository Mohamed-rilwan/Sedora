
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import GenerateTemplate from "views/GenerateTemplate";
import ExistingTemplate from "views/ExitingTemplate";
import CalculateResistance from "views/Resistance/CalculateResistance";
import FrequencyPerItem from "views/Frequency/FrequencyPerItem";

var routes = [
  {
    path: "/generate",
    name: "Generate Template",
    icon: "nc-icon nc-atom",
    component: GenerateTemplate,
    layout: "/admin",
  },
  {
    path: "/resistance",
    name: "Resistance",
    icon: "nc-icon nc-cloud-upload-94",
    component: CalculateResistance,
    layout: "/admin",
  },
  {
    path: "/frequency",
    name: "Frequency Per Item",
    icon: "nc-icon nc-cloud-upload-94",
    component: FrequencyPerItem,
    layout: "/admin",
  },
  {
    path: "/existing",
    name: "Calcaulate",
    icon: "nc-icon nc-cloud-upload-94",
    component: ExistingTemplate,
    layout: "/admin",
  },
  // {
  //   path: "/test",
  //   name: "test",
  //   icon: "nc-icon nc-cloud-upload-94",
  //   component: Test,
  //   layout: "/admin",
  // },

  // {
  //   path: "/dashboard",
  //   name: "Dashboard",
  //   icon: "nc-icon nc-bank",
  //   component: Dashboard,
  //   layout: "/admin",
  // },
  // {
  //   path: "/icons",
  //   name: "Icons",
  //   icon: "nc-icon nc-diamond",
  //   component: Icons,
  //   layout: "/admin",
  // },
  // {
  //   path: "/maps",
  //   name: "Maps",
  //   icon: "nc-icon nc-pin-3",
  //   component: Maps,
  //   layout: "/admin",
  // },
  // {
  //   path: "/notifications",
  //   name: "Notifications",
  //   icon: "nc-icon nc-bell-55",
  //   component: Notifications,
  //   layout: "/admin",
  // },
  {
    path: "/user-page",
    name: "Team",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
  // {
  //   path: "/tables",
  //   name: "Table List",
  //   icon: "nc-icon nc-tile-56",
  //   component: TableList,
  //   layout: "/admin",
  // },
  // {
  //   path: "/typography",
  //   name: "Typography",
  //   icon: "nc-icon nc-caps-small",
  //   component: Typography,
  //   layout: "/admin",
  // },
];
export default routes;
