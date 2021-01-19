import React from "react";
import CIcon from "@coreui/icons-react";

const _nav = [
  {
    _tag: "CSidebarNavItem",
    name: "Эхлэх",
    to: "/dashboard",
    icon: <CIcon name="cil-home" customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Хайлт хийх"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Хайх",
    to: "/searchuser",
    icon: <CIcon customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "danger",
      text: "4",
    },
  },
  {
    _tag: "CSidebarNavItem",
    name: "Вэб заавар",
    to: "/webguide",
    icon: <CIcon customClasses="c-sidebar-nav-icon" />,
  },
  {
    _tag: "CSidebarNavItem",
    name: "Нийт хэрэглэгч",
    to: "/alluser",
    icon: "cil-check",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Лизинг",
    to: "/lizing",
    icon: "cil-calendar",
  },
  {
    _tag: "CSidebarNavItem",
    name: "Бараа",
    to: "/product",
    icon: <CIcon name="cil-basket" customClasses="c-sidebar-nav-icon" />,
    badge: {
      color: "success",
      text: "NEW",
    },
  },
];

export default _nav;
