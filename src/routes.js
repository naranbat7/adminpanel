import React from "react";

const Dashboard = React.lazy(() => import("./views/dashboard/Dashboard"));
const AllUsers = React.lazy(() => import("./views/alluser/Alluser"));
const WebGuide = React.lazy(() => import("./views/webguide/WebGuide"));
const Lizing = React.lazy(() => import("./views/lizing/Lizing"));
const Product = React.lazy(() => import("./views/product/Product"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: Dashboard },
  { path: "/alluser", name: "User Details", component: AllUsers },
  { path: "/webguide", name: "User Details", component: WebGuide },
  { path: "/lizing", name: "Lizing", component: Lizing },
  { path: "/product", name: "Product", component: Product },
];

export default routes;
