import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavTitle",
    _children: ["Хайлт хийх"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Хайх",
    to: "/alluser",
    icon: <CIcon customClasses="c-sidebar-nav-icon" />,
  },
];

export default _nav;
