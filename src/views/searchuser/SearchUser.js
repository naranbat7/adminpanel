import React, { useState, useEffect } from "react";
import {
  CCol,
  CRow,
  CButton,
  CPagination,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
  CInputGroup,
  CInput,
  CInputGroupAppend,
  CModalBody,
  CLabel,
  CModal,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CFormGroup,
  CInputRadio,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import axios from "axios";
import Constant from "../../constants/CONSTANT";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const fields = ["№", "Дугаар", "IMEI", "Нэр", "Үйлдэл"];
const pageList = [10, 20, 30];

const Tables = () => {
  const [page, setPage] = useState(1);
  const [modal1, setModal1] = useState(false);
  const [body1, setBody1] = useState({});
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    axios({
      method: Constant.userListApi.method,
      url: Constant.userListApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          setUsersData(response.data.data);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [usersData, search]);

  return (
    <>
      <CRow alignVertical="center">
        <CCol xs="1">
          <CDropdown className="m-1">
            <CDropdownToggle color="info">{perPage}-ийг харуул</CDropdownToggle>
            <CDropdownMenu>
              {pageList.map((item, key) => {
                return (
                  <CDropdownItem
                    key={key}
                    disabled={item == perPage}
                    onClick={() => setPerPage(item)}
                  >
                    {item}-ийг харуул
                  </CDropdownItem>
                );
              })}
            </CDropdownMenu>
          </CDropdown>
        </CCol>
        <CCol xs="2">
          <CInputGroup>
            <CInput
              id="input1-group2"
              name="input1-group2"
              placeholder="Сүүлийн 4 орон"
              value={search}
              onChange={(value) => setSearch(value.target.value)}
            />
            <CInputGroupAppend>
              <CButton type="button" color="primary">
                <CIcon name="cil-magnifying-glass" /> Хайх
              </CButton>
            </CInputGroupAppend>
          </CInputGroup>
        </CCol>
      </CRow>
      <CRow>
        <CCol>
          <table className="table table-hover table-outline mb-0 d-none d-sm-table">
            <thead className="thead-light">
              <tr>
                {fields.map((item, idx) => {
                  return (
                    <th key={idx} className="text-center">
                      {item}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {usersData
                .filter((value) => value.telnumber.slice(4, 8).includes(search))
                .slice((page - 1) * perPage, page * perPage)
                .map((item, key) => {
                  return (
                    <tr>
                      <td className="text-center">
                        {(page - 1) * perPage + key + 1}
                      </td>
                      <td className="text-center">
                        {item.telnumber.charAt(0) +
                          item.telnumber.charAt(1) +
                          "**" +
                          item.telnumber.substring(4, 8)}
                      </td>
                      <td className="text-center">{item.imei || "Хоосон"}</td>
                      <td className="text-center">
                        {item.lastname} {item.firstname.toUpperCase()}
                      </td>
                      <td
                        className="text-center"
                        style={
                          item.end_date == null
                            ? { color: "#e55353" }
                            : moment(item.end_date).isBefore(
                                moment().format("YYYY-MM-DD hh:mm:ss")
                              )
                            ? { color: "#f9b115" }
                            : { color: "#2eb85c" }
                        }
                      >
                        {item.end_date == null ? (
                          "Даатгуулаагүй"
                        ) : moment(item.end_date).isBefore(
                            moment().format("YYYY-MM-DD hh:mm:ss")
                          ) ? (
                          moment(
                            item.end_date,
                            "YYYY-MM-DD hh:mm:ss"
                          ).fromNow() + " дууссан"
                        ) : (
                          <CButton
                            active
                            color="success"
                            aria-pressed="true"
                            onClick={() => {
                              setBody1(item);
                              setModal1(true);
                            }}
                          >
                            Хайлт хийх
                          </CButton>
                        )}
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
          <CPagination
            activePage={page}
            pages={Math.ceil(
              usersData.filter((value) =>
                value.telnumber.slice(4, 8).includes(search)
              ).length / perPage
            )}
            onActivePageChange={setPage}
            className="mt-3"
          />
        </CCol>
      </CRow>
      <ModalMap
        modal={modal1}
        setModal={setModal1}
        body={body1}
        setBody1={setBody1}
      />
    </>
  );
};

export default Tables;

const ModalMap = (props) => {
  return (
    <CModal show={props.modal} onClose={() => props.setModal(false)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>Map</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CLabel>Map</CLabel>
      </CModalBody>
    </CModal>
  );
};
