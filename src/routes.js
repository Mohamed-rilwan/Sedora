
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
import { HomePage } from "views/Home/Homepage";

var routes = [

  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-globe",
    component: HomePage,
    layout: "/admin",
  },

  {
    path: "/global",
    name: "Global Information",
    icon: "nc-icon nc-atom",
    component: GenerateTemplate,
    layout: "/admin",
  },
  {
    path: "/resistance",
    name: "Resistance",
    icon: "nc-icon nc-spaceship",
    component: CalculateResistance,
    layout: "/admin",
  },
  {
    path: "/frequency",
    name: "Frequency Per Item",
    icon: "nc-icon nc-ruler-pencil",
    component: FrequencyPerItem,
    layout: "/admin",
  },
  {
    path: "/user-page",
    name: "Team",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    disabled: true,
  },
];
export default routes;
