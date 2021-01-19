import React, { useEffect, useState } from "react";
import { Redirect } from "react-router-dom";
import { TheContent, TheSidebar, TheHeader, TheContent2 } from "./index";
import {
  CButton,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
  CCard,
  CCardBody,
  CFormGroup,
  CInput,
  CLabel,
  CCol,
  CInputRadio,
  CToast,
  CToaster,
  CToastBody,
  CToastHeader,
  CRow,
  CBadge,
} from "@coreui/react";
import axios from "axios";
import Constant from "../constants/CONSTANT";
import CIcon from "@coreui/icons-react";

const TheLayout = () => {
  const [data, setData] = useState({});
  const [isLogged, setIsLogged] = useState(true);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [modal4, setModal4] = useState(false);
  const [body, setBody] = useState({
    name: "",
    telNumber: "",
    username: "",
    password: "",
    isFullAdmin: 0,
  });
  const [body2, setBody2] = useState({
    name: "",
    telNumber: "",
    username: "",
    password: "",
    isFullAdmin: 0,
  });
  const [body3, setBody3] = useState({
    id: null,
    name: "",
    telNumber: "",
    username: "",
    password: "",
    isFullAdmin: 0,
  });
  const [admins, setAdmins] = useState([]);
  const [toasts, setToasts] = useState([]);

  const addToast = (title, body, color, backgroundColor) => {
    setToasts([
      ...toasts,
      {
        position: "top-right",
        autohide: 3000,
        closeButton: true,
        fade: true,
        title: title,
        body: body,
        color: color,
        backgroundColor: backgroundColor,
      },
    ]);
  };

  const toasters = (() => {
    return toasts.reduce((toasters, toast) => {
      toasters[toast.position] = toasters[toast.position] || [];
      toasters[toast.position].push(toast);
      return toasters;
    }, {});
  })();

  useEffect(() => {
    axios({
      method: Constant.adminPanelApi.method,
      url: Constant.adminPanelApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          setData(response.data.data);
        } else {
          setIsLogged(false);
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
        setIsLogged(false);
      });
  }, []);

  const addAdminHandler = () => {
    console.log(body);
    if (body.telNumber == "" || !body.telNumber) body.telNumber = undefined;
    setModal1(false);
    axios({
      method: Constant.addAdminApi.method,
      url: Constant.addAdminApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body,
    })
      .then((response) => {
        if (response.data.success == true) {
          addToast("Амжилттай", response.data.message, "#18603a", "#d5f1de");
        } else {
          addToast("Алдаа", response.data.message, "#772b35", "#fadddd");
        }
      })
      .catch((err) => {
        addToast("Алдаа", err.message, "#772b35", "#fadddd");
      });
  };

  const setAdminHandler = () => {
    console.log(body2);
    if (body2.telNumber == "" || !body2.telNumber) body2.telNumber = undefined;
    setModal2(false);
    axios({
      method: Constant.setAdminApi.method,
      url: Constant.setAdminApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body2,
    })
      .then((response) => {
        if (response.data.success == true) {
          addToast("Амжилттай", response.data.message, "#18603a", "#d5f1de");
        } else {
          addToast("Алдаа", response.data.message, "#772b35", "#fadddd");
        }
      })
      .catch((err) => {
        addToast("Алдаа", err.message, "#772b35", "#fadddd");
      });
  };

  const setAdminsInfo = () => {
    console.log(body3);
    if (body3.telNumber == "" || !body3.telNumber) body3.telNumber = undefined;
    setModal2(false);
    axios({
      method: Constant.setOtherAdminApi.method,
      url: Constant.setOtherAdminApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body3,
    })
      .then((response) => {
        if (response.data.success == true) {
          addToast("Амжилттай", response.data.message, "#18603a", "#d5f1de");
        } else {
          addToast("Алдаа", response.data.message, "#772b35", "#fadddd");
        }
      })
      .catch((err) => {
        addToast("Алдаа", err.message, "#772b35", "#fadddd");
      });
  };

  const setInfo = (item) => {
    setBody3(...body3, item);
    setModal3(true);
  };

  return isLogged ? (
    <div className="c-app c-default-layout">
      <TheSidebar isAdmin={data.isFullAdmin} />
      <div className="c-wrapper">
        <TheHeader
          data={data}
          setModal1={setModal1}
          setModal2={setModal2}
          addToast={addToast}
          setBody2={setBody2}
          setModal4={setModal4}
          setAdmins={setAdmins}
        />
        <div className="c-body">
          {data.isFullAdmin == 1 ? <TheContent /> : <TheContent2 />}
        </div>
      </div>
      <ModalForm
        body={body}
        setModal={setModal1}
        modal={modal1}
        setBody={setBody}
        handler={addAdminHandler}
        title="Админ нэмэх"
        btnTitle="Нэмэх"
      />
      <ModalForm
        body={body2}
        setModal={setModal2}
        modal={modal2}
        setBody={setBody2}
        handler={setAdminHandler}
        title="Мэдээллээ өөрчлөх"
        btnTitle="Өөрчлөх"
      />
      <ModalForm
        body={body3}
        setModal={setModal3}
        modal={modal3}
        setBody={setBody3}
        handler={setAdminsInfo}
        title="Админы мэдээлэл өөрчлөх"
        btnTitle="Өөрчлөх"
      />
      <ModalAdminList
        title="Админы жагсаалт"
        admins={admins}
        modal={modal4}
        setModal={setModal4}
        setInfo={setInfo}
        addToast={addToast}
        setModal2={setModal3}
        setBody={setBody3}
      />
      {Object.keys(toasters).map((toasterKey) => (
        <CToaster position={toasterKey} key={"toaster" + toasterKey}>
          {toasters[toasterKey].map((toast, key) => {
            return (
              <CToast
                key={"toast" + key}
                show={true}
                autohide={toast.autohide}
                fade={toast.fade}
                style={{ backgroundColor: toast.backgroundColor }}
              >
                <CToastHeader
                  style={{ color: toast.color }}
                  closeButton={toast.closeButton}
                >
                  {toast.title}
                </CToastHeader>
                <CToastBody style={{ color: toast.color }}>
                  {toast.body}
                </CToastBody>
              </CToast>
            );
          })}
        </CToaster>
      ))}
    </div>
  ) : (
    <Redirect to="/login" />
  );
};

export default TheLayout;

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
              <CLabel htmlFor="name">
                Нэр <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="name"
                placeholder="Нэрээ оруулна уу"
                value={props.body.name}
                onChange={(value) =>
                  props.setBody({ ...props.body, name: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="phone">Утасны дугаар</CLabel>
              <CInput
                id="phone"
                placeholder="8888-8888"
                type="number"
                value={props.body.telNumber}
                onChange={(value) =>
                  props.setBody({
                    ...props.body,
                    telNumber: value.target.value,
                  })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="username">
                Нэвтрэх нэр <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="username"
                placeholder="Нэвтрэхдээ ашиглах нэр"
                value={props.body.username}
                onChange={(value) =>
                  props.setBody({ ...props.body, username: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="pass">
                Нууц үг <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="pass"
                placeholder="Нууц үг"
                type="password"
                value={props.body.password}
                onChange={(value) =>
                  props.setBody({ ...props.body, password: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup row>
              <CCol md="3">
                <CLabel>
                  Админы төрөл <strong style={{ color: "#e55353" }}>*</strong>
                </CLabel>
              </CCol>
              <CCol md="9">
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio1"
                    name={props.radio}
                    value={0}
                    checked={props.body.isFullAdmin === 0}
                    onClick={(value) =>
                      props.setBody({
                        ...props.body,
                        isFullAdmin: parseInt(value.target.value),
                      })
                    }
                  />
                  <CLabel variant="checkbox" htmlFor="radio1">
                    <strong>Хянагч</strong> (Зөвхөн хайх эрхтэй)
                  </CLabel>
                </CFormGroup>
                <CFormGroup variant="checkbox">
                  <CInputRadio
                    className="form-check-input"
                    id="radio2"
                    name={props.radio}
                    value={1}
                    checked={props.body.isFullAdmin === 1}
                    onClick={(value) =>
                      props.setBody({
                        ...props.body,
                        isFullAdmin: parseInt(value.target.value),
                      })
                    }
                  />
                  <CLabel variant="checkbox" htmlFor="radio2">
                    <strong>Админ</strong> (Бүх боломжийг эзэмшинэ)
                  </CLabel>
                </CFormGroup>
              </CCol>
            </CFormGroup>
            <CLabel>
              Тайлбар: <strong style={{ color: "#e55353" }}>*</strong> - заавал
              бөглөнө
            </CLabel>
          </CCardBody>
        </CCard>
        <CButton
          color="warning"
          size="sm"
          onClick={() =>
            props.setBody(...props.body, {
              name: "",
              telNumber: "",
              username: "",
              password: "",
              isFullAdmin: 0,
            })
          }
        >
          Арилгах
        </CButton>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color="primary"
          onClick={() => props.handler()}
          disabled={
            props.body.name == "" ||
            props.body.password == "" ||
            props.body.username == ""
          }
        >
          {props.btnTitle}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};

const ModalAdminList = (props) => {
  const fields = ["№", "Нэр", "Утас", "Эрх", "Үйлдэл"];
  const deleteAdmin = (id) => {
    axios({
      method: Constant.deleteAdminApi.method,
      url: Constant.deleteAdminApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: { id: id },
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(
            "Амжилттай",
            response.data.message,
            "#18603a",
            "#d5f1de"
          );
        } else {
          props.addToast("Алдаа", response.data.message, "#772b35", "#fadddd");
        }
      })
      .catch((err) => {
        props.addToast("Алдаа", err.message, "#772b35", "#fadddd");
      });
    props.setModal(false);
  };

  const setAdmin = (item) => {
    item.isFullAdmin = item.isfulladmin;
    item.isfulladmin = undefined;
    item.password = item.pass;
    item.pass = undefined;
    item.telNumber = item.telnumber;
    item.telnumber = undefined;
    props.setBody(item);
    props.setModal(false);
    props.setModal2(true);
  };

  return (
    <CModal show={props.modal} onClose={() => props.setModal(false)} size="lg">
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
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
                {props.admins.map((item, key) => {
                  return (
                    <tr>
                      <td className="text-center">{key + 1}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">
                        {item.telNumber
                          ? item.telNumber.charAt(0) +
                            item.telNumber.charAt(1) +
                            "**" +
                            item.telNumber.substring(4, 8)
                          : "-"}
                      </td>
                      <td className="text-center">
                        {item.isfulladmin == 1 ? (
                          <CBadge color="primary" className="px-4 py-2">
                            Админ
                          </CBadge>
                        ) : (
                          <CBadge color="secondary" className="px-4 py-2">
                            Хянагч
                          </CBadge>
                        )}
                      </td>
                      <td className="text-center">
                        <CButton
                          active
                          color="info"
                          aria-pressed="true"
                          className="px-2 py-1"
                          onClick={() => {
                            setAdmin(item);
                          }}
                        >
                          Өөрчлөх
                        </CButton>
                        <CButton
                          active
                          color="danger"
                          aria-pressed="true"
                          className="px-2 py-1 ml-2"
                          onClick={() => {
                            deleteAdmin(item.id);
                          }}
                        >
                          <CIcon name="cil-trash" />
                        </CButton>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </CCol>
        </CRow>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
      </CModalFooter>
    </CModal>
  );
};
