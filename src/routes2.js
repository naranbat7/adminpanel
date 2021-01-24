import React from "react";

const SearchUser = React.lazy(() => import("./views/searchuser/SearchUser"));

const routes = [
  { path: "/", exact: true, name: "Home" },
  { path: "/dashboard", name: "Dashboard", component: SearchUser },
  { path: "/searchuser", name: "User Details", component: SearchUser },
];

export default routes;
