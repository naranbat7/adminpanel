import React from "react";

const AllUsers = React.lazy(() => import("./views/alluser/Alluser"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: AllUsers },
  { path: "/alluser", name: "User Details", component: AllUsers },
];

export default routes;
