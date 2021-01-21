import React, { useState } from "react";
import {
  CBadge,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CImg,
} from "@coreui/react";
import { Redirect } from "react-router-dom";
import CIcon from "@coreui/icons-react";
import Constant from "../constants/CONSTANT";
import axios from "axios";

const TheHeaderDropdown = (props) => {
  const [logout, setLogout] = useState(false);
  const handleLogOut = () => {
    window.localStorage.removeItem("authorization");
    setLogout(true);
  };

  const setAdminData = async () => {
    await axios({
      method: Constant.getAdminInfoByTokenApi.method,
      url: Constant.getAdminInfoByTokenApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        props.setBody2(response.data.data);
        props.setModal2(true);
      })
      .catch((err) => {
        props.addToast(err.message, false);
      });
  };

  const getAdminsData = async () => {
    await axios({
      method: Constant.getAdminListApi.method,
      url: Constant.getAdminListApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        props.setAdmins(response.data.data);
        props.setModal4(true);
      })
      .catch((err) => {
        props.addToast(err.message, false);
      });
  };

  return logout ? (
    <Redirect to="/login" />
  ) : (
    <CDropdown inNav className="c-header-nav-items mx-2" direction="down">
      <CDropdownToggle className="c-header-nav-link" caret={false}>
        <div className="c-avatar">
          <CImg
            src={props.data.imgLink || "avatars/user.png"}
            className="c-avatar-img"
            alt="admin@bootstrapmaster.com"
          />
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem header tag="div" color="light" className="text-center">
          <strong>Тохиргоо</strong>
        </CDropdownItem>
        <CDropdownItem
          onClick={() => {
            setAdminData();
          }}
        >
          <CIcon name="cil-user" className="mfe-2" />
          Мэдээллээ өөрчлөх
        </CDropdownItem>
        {props.data.isFullAdmin == 1 && (
          <CDropdownItem
            onClick={() => {
              props.setModal1(true);
            }}
          >
            <CIcon name="cil-task" className="mfe-2" />
            Админ нэмэх
          </CDropdownItem>
        )}
        {props.data.isFullAdmin == 1 && (
          <CDropdownItem
            onClick={() => {
              getAdminsData();
            }}
          >
            <CIcon name="cil-settings" className="mfe-2" />
            Админ өөрчлөх
          </CDropdownItem>
        )}
        <CDropdownItem divider />
        <CDropdownItem
          onClick={() => {
            handleLogOut();
          }}
        >
          <CIcon name="cil-lock-locked" className="mfe-2" />
          Гарах
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default TheHeaderDropdown;
