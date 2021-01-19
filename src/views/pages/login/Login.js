import React, { useState } from "react";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CInput,
  CInputGroup,
  CInputGroupPrepend,
  CInputGroupText,
  CRow,
  CImg,
  CAlert,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import CoverImg from "../../../assets/logo.jpg";
import axios from "axios";
import { Redirect } from "react-router-dom";
import Constant from "../../../constants/CONSTANT";

const Login = () => {
  const [body, setBody] = useState({ username: "", password: "" });
  const [alert, setAlert] = useState(false);
  const [message, setMessage] = useState("");
  const [logged, setLogged] = useState(false);
  const formHandler = () => {
    axios({
      method: Constant.loginApi.method,
      url: Constant.loginApi.url,
      data: body,
    })
      .then((response) => {
        if (response.data.success == true) {
          setAlert(false);
          window.localStorage.setItem("authorization", response.data.token);
          console.log(
            "authorization: ",
            window.localStorage.getItem("authorization")
          );
          setLogged(true);
        } else {
          setMessage(response.data.message);
          setAlert(true);
        }
      })
      .catch((err) => {
        console.log("Error: " + err);
      });
  };
  return logged ? (
    <Redirect to="/dashboard" />
  ) : (
    <div className="c-app c-default-layout flex-row align-items-center">
      <CContainer>
        {alert ? (
          <CRow className="justify-content-center">
            <CCol md="8">
              <CAlert color="danger">{message}</CAlert>
            </CCol>
          </CRow>
        ) : null}
        <CRow className="justify-content-center">
          <CCol md="8">
            <CCardGroup>
              <CCard className="p-4">
                <CCardBody>
                  <CForm>
                    <h1>Нэвтрэх</h1>
                    <p className="text-muted">Админ панел руугаа нэвтрэх</p>
                    <CInputGroup className="mb-3">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-user" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="text"
                        placeholder="Нэвтрэх нэр"
                        required={true}
                        value={body.username}
                        onChange={(value) =>
                          setBody({ ...body, username: value.target.value })
                        }
                      />
                    </CInputGroup>
                    <CInputGroup className="mb-4">
                      <CInputGroupPrepend>
                        <CInputGroupText>
                          <CIcon name="cil-lock-locked" />
                        </CInputGroupText>
                      </CInputGroupPrepend>
                      <CInput
                        type="password"
                        placeholder="Нууц үг"
                        value={body.password}
                        onChange={(value) =>
                          setBody({ ...body, password: value.target.value })
                        }
                        required
                      />
                    </CInputGroup>
                    <CRow>
                      <CCol xs="6">
                        <CButton
                          color="primary"
                          className="px-4"
                          disabled={body.username == "" || body.password == ""}
                          onClick={() => {
                            formHandler();
                          }}
                        >
                          Нэвтрэх
                        </CButton>
                      </CCol>
                    </CRow>
                  </CForm>
                </CCardBody>
              </CCard>
              <CCard
                className="text-white bg-primary py-5 d-md-down-none"
                style={{ width: "44%" }}
              >
                <CCardBody className="text-center">
                  <CImg src={CoverImg} fluid className="mb-2" />
                </CCardBody>
              </CCard>
            </CCardGroup>
          </CCol>
        </CRow>
      </CContainer>
    </div>
  );
};

export default Login;
