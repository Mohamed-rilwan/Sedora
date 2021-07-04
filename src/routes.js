/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import GenerateTemplate from "views/GenerateTemplate";
import ExistingTemplate from "views/ExitingTemplate";
import test from "views/test";

var routes = [
  {
    path: "/generate",
    name: "Generate Template",
    icon: "nc-icon nc-atom",
    component: GenerateTemplate,
    layout: "/admin",
  },
  {
    path: "/exiting",
    name: "Calcaulate",
    icon: "nc-icon nc-cloud-upload-94",
    component: ExistingTemplate,
    layout: "/admin",
  },

  {
    path: "/user-page",
    name: "Team",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
  },
];
export default routes;
