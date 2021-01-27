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
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CFormGroup,
  CLabel,
  CInputRadio,
  CBadge,
} from "@coreui/react";

import CIcon from "@coreui/icons-react";
import axios from "axios";
import Constant from "../../constants/CONSTANT";
import Tousandify from "thousandify";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const fields = ["№", "Дугаар", "IMEI", "Нэр", "Даатгал", "Үйлдэл"];
const pageList = [10, 20, 30];
const times = [
  { name: "1 сараар", value: 1 },
  { name: "2 сараар", value: 2 },
  { name: "3 сараар", value: 3 },
  { name: "6 сараар", value: 6 },
  { name: "12 сараар", value: 12 },
];

const Tables = (props) => {
  const [page, setPage] = useState(1);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [body, setBody] = useState({
    lastname: "",
    firstname: "",
    telnumber: "",
    email: "",
    imei: "",
  });
  const [body2, setBody2] = useState({
    value: 0,
    item: {
      telnumber: "",
    },
  });
  const [body4, setBody4] = useState({
    value: 0,
    duration: 0,
    price: 0,
    item: {
      telnumber: "",
    },
  });
  const [body3, setBody3] = useState({
    telnumber: "",
  });
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [usersData, setUsersData] = useState([]);
  const [daatgal, setDaatgal] = useState([]);

  const getUserListReq = () => {
    axios({
      method: Constant.userListApi.method,
      url: Constant.userListApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          console.log("success");
          console.log(response.data.data);
          setUsersData(response.data.data);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
      });
  };

  useEffect(() => {
    getUserListReq();
  }, []);

  useEffect(() => {
    axios({
      method: Constant.getDaatgalListApi.method,
      url: Constant.getDaatgalListApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          setDaatgal(response.data.data);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
      });
  }, []);

  useEffect(() => {
    setPage(1);
  }, [usersData, search]);

  const showUserInfoModal = (item) => {
    setBody(item);
    setModal1(true);
  };
  const showDeleteModal = (item) => {
    setBody3(item);
    setModal3(true);
  };
  const setUserHandler = () => {
    body.telnumber = body.telnumber.toString();
    axios({
      method: Constant.setUserApi.method,
      url: Constant.setUserApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body,
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getUserListReq();
        } else {
          props.addToast(response.data.message, false);
        }
        setModal1(false);
      })
      .catch((err) => {
        props.addToast(err.message, false);
        setModal1(false);
      });
  };
  const setUserTime = () => {
    axios({
      method: Constant.changeInsuranceDateApi.method,
      url: Constant.changeInsuranceDateApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: {
        value: body2.value,
        id: body2.item.id,
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getUserListReq();
        } else {
          props.addToast(response.data.message, false);
        }
        setModal2(false);
      })
      .catch((err) => {
        props.addToast(err.message, false);
        setModal2(false);
      });
  };
  const setUserDaatgal = () => {
    axios({
      method: Constant.setUserDaatgalApi.method,
      url: Constant.setUserDaatgalApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: {
        value: body4.value,
        id: body4.item.id,
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getUserListReq();
        } else {
          props.addToast(response.data.message, false);
        }
        setModal4(false);
      })
      .catch((err) => {
        props.addToast(err.message, false);
        setModal4(false);
      });
  };
  const deleteUser = () => {
    axios({
      method: Constant.deleteUserApi.method,
      url: Constant.deleteUserApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: {
        id: body3.id,
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getUserListReq();
        } else {
          props.addToast(response.data.message, false);
        }
        setModal3(false);
      })
      .catch((err) => {
        props.addToast(err.message, false);
        setModal3(false);
      });
  };

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
                      <td className="text-center">
                        <CBadge
                          color={
                            item.end_date == null
                              ? "danger"
                              : moment(item.end_date).isBefore(
                                  moment().format("YYYY-MM-DD hh:mm:ss")
                                )
                              ? "warning"
                              : "success"
                          }
                          className="px-3 py-2"
                        >
                          {item.end_date == null
                            ? "Даатгуулаагүй"
                            : moment(item.end_date).isBefore(
                                moment().format("YYYY-MM-DD hh:mm:ss")
                              )
                            ? moment(
                                item.end_date,
                                "YYYY-MM-DD hh:mm:ss"
                              ).fromNow() + " дууссан"
                            : moment(
                                item.end_date,
                                "YYYY-MM-DD hh:mm:ss"
                              ).fromNow() + " дуусна"}
                        </CBadge>
                      </td>
                      <td className="text-center">
                        <CRow alignHorizontal="center" className="xs-2">
                          <CButton
                            active
                            color="success"
                            aria-pressed="true"
                            onClick={() => {
                              showUserInfoModal(item);
                            }}
                          >
                            Өөрчлөх
                          </CButton>
                          {item.end_date ? (
                            <CDropdown className="ml-2">
                              <CDropdownToggle caret color="info">
                                Хугацаа сунгах
                              </CDropdownToggle>
                              <CDropdownMenu>
                                {times.map((item1, idx) => {
                                  return (
                                    <CDropdownItem
                                      key={idx}
                                      onClick={() => {
                                        setBody2({
                                          value: item1.value,
                                          item: item,
                                        });
                                        setModal2(true);
                                      }}
                                    >
                                      {item1.name}
                                    </CDropdownItem>
                                  );
                                })}
                              </CDropdownMenu>
                            </CDropdown>
                          ) : (
                            <CDropdown className="ml-2">
                              <CDropdownToggle caret color="info">
                                Даатгуулах
                              </CDropdownToggle>
                              <CDropdownMenu>
                                {daatgal.map((item2, idx) => {
                                  return (
                                    <CDropdownItem
                                      key={idx}
                                      onClick={() => {
                                        setBody4({
                                          value: item2.id,
                                          duration: item2.duration,
                                          price: item2.price,
                                          item: item,
                                        });
                                        setModal4(true);
                                      }}
                                    >
                                      {item2.duration} сараар ₮
                                      {Tousandify(item2.price)}
                                    </CDropdownItem>
                                  );
                                })}
                              </CDropdownMenu>
                            </CDropdown>
                          )}
                          <CButton
                            className="ml-1"
                            active
                            color="danger"
                            aria-pressed="true"
                            onClick={() => {
                              showDeleteModal(item);
                            }}
                          >
                            <CIcon name="cil-trash" />
                          </CButton>
                        </CRow>
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
      <ModalForm
        title="Хэрэглэгчийн мэдээлэл өөрчлөх"
        btnTitle="Өөрчлөх"
        handler={setUserHandler}
        body={body}
        setBody={setBody}
        modal={modal1}
        setModal={setModal1}
      />
      <ModalCheck
        btnTitle="Сунгах"
        desc={
          body2.item.telnumber.charAt(0) +
          body2.item.telnumber.charAt(1) +
          "**" +
          body2.item.telnumber.substring(4, 8) +
          " хэрэглэгчийн хугацааг " +
          body2.value +
          " сараар сунгах уу?"
        }
        handler={setUserTime}
        modal={modal2}
        setModal={setModal2}
        btnColor="info"
      />
      <ModalCheck
        title="Хэрэглэгч устгах"
        btnTitle="Устгах"
        desc={
          body3.telnumber.charAt(0) +
          body3.telnumber.charAt(1) +
          "**" +
          body3.telnumber.substring(4, 8) +
          " дугаартай хэрэглэгчийг устгах уу?"
        }
        handler={deleteUser}
        modal={modal3}
        setModal={setModal3}
        btnColor="danger"
      />
      <ModalCheck
        btnTitle="Даатгуулах"
        desc={
          body4.item.telnumber.charAt(0) +
          body4.item.telnumber.charAt(1) +
          "**" +
          body4.item.telnumber.substring(4, 8) +
          " хэрэглэгчийг " +
          body4.duration +
          " сараар ₮" +
          Tousandify(body4.price) +
          " төгрөгөөр даатгуулах уу?"
        }
        handler={setUserDaatgal}
        modal={modal4}
        setModal={setModal4}
        btnColor="info"
      />
    </>
  );
};

export default Tables;

const ModalForm = (props) => {
  return (
    <CModal show={props.modal} onClose={() => props.setModal(false)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="lastname">
                Овог <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="lastname"
                placeholder="Овгоо оруулна уу"
                value={props.body.lastname}
                onChange={(value) =>
                  props.setBody({ ...props.body, lastname: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="firstname">
                Нэр <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="firstname"
                placeholder="Нэрээ оруулна уу"
                value={props.body.firstname}
                onChange={(value) =>
                  props.setBody({
                    ...props.body,
                    firstname: value.target.value,
                  })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="phone">
                Утасны дугаар <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="phone"
                placeholder="8888-8888"
                type="number"
                value={props.body.telnumber}
                onChange={(value) =>
                  props.setBody({
                    ...props.body,
                    telnumber: value.target.value,
                  })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="email">
                И-мэйл <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="email"
                placeholder="Цахим шуудан"
                value={props.body.email}
                onChange={(value) =>
                  props.setBody({ ...props.body, email: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="imei">Imei</CLabel>
              <CInput
                id="imei"
                placeholder="Imei"
                type="text"
                value={props.body.imei}
                onChange={(value) =>
                  props.setBody({ ...props.body, imei: value.target.value })
                }
              />
            </CFormGroup>
            <CLabel>
              Тайлбар: <strong style={{ color: "#e55353" }}>*</strong> - заавал
              бөглөнө
            </CLabel>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color="primary"
          onClick={() => props.handler()}
          disabled={
            props.body.lastname == "" ||
            props.body.firstname == "" ||
            props.body.email == "" ||
            props.body.telnumber == ""
          }
        >
          {props.btnTitle}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const ModalCheck = (props) => {
  return (
    <CModal show={props.modal} onClose={() => props.setModal(false)} size="sm">
      <CModalHeader>
        <CModalTitle style={{ textAlign: "center" }}>{props.desc}</CModalTitle>
      </CModalHeader>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton color={props.btnColor} onClick={() => props.handler()}>
          {props.btnTitle}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
