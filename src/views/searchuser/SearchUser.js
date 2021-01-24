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

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet/dist/leaflet";
import popIcon from "../../assets/marker-icon.png";
import CIcon from "@coreui/icons-react";
import axios from "axios";
import Constant from "../../constants/CONSTANT";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const fields = ["№", "Дугаар", "IMEI", "Нэр", "Үйлдэл"];
const pageList = [10, 20, 30];

const Tables = (props) => {
  const [page, setPage] = useState(1);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [body2, setBody2] = useState({
    telnumber: "",
  });
  const [code, setCode] = useState(null);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");

  const [usersData, setUsersData] = useState([]);
  const [locationData, setLocationData] = useState([]);

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

  const checkCode = () => {
    console.log(body2.id, code);
    axios({
      method: Constant.getUserLastLocationApi.method,
      url: Constant.getUserLastLocationApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: {
        id: body2.id,
        code: code,
      },
    })
      .then((response) => {
        setModal2(false);
        if (response.data.success == true) {
          props.addToast("Амжилттай нэвтэрлээ.", true);
          setLocationData(response.data.data);
          setModal1(true);
        } else {
          props.addToast(response.data.message, false);
        }
        setCode(null);
      })
      .catch((err) => {
        setModal2(false);
        props.addToast("Алдаа гарлаа: " + err, false);
        console.log("Алдаа: ", err);
        setCode(null);
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
                              setBody2(item);
                              setModal2(true);
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
        body={locationData}
        title={
          body2.telnumber.charAt(0) +
          body2.telnumber.charAt(1) +
          "**" +
          body2.telnumber.substring(4, 8) +
          " дугаартай хэрэглэгчийн " +
          locationData.length +
          " өгөгдөл байна."
        }
      />
      <ModalCheckCode
        modal={modal2}
        setModal={setModal2}
        desc={
          body2.telnumber.charAt(0) +
          body2.telnumber.charAt(1) +
          "**" +
          body2.telnumber.substring(4, 8) +
          " дугаартай хэрэглэгчийн нууц кодыг оруулна уу"
        }
        btnTitle="Үргэлжлүүлэх"
        btnColor="success"
        code={code}
        setCode={setCode}
        handler={checkCode}
      />
    </>
  );
};

export default Tables;

const ModalMap = (props) => {
  const [position, setPosition] = useState([
    {
      lat: 47.92123,
      long: 106.918556,
      date: "2021-1-21 12:27:01",
    },
    {
      lat: 47.93123,
      long: 106.921556,
      date: "2021-1-21 13:05:01",
    },
    {
      lat: 47.94123,
      long: 106.938556,
      date: "2021-1-21 14:00:01",
    },
  ]);
  const icon = L.icon({
    iconUrl: popIcon,
    shadowUrl: null,
    iconSize: [25, 41],
    shadowSize: null,
    iconAnchor: [0, 0],
    shadowAnchor: null,
    popupAnchor: [11, 0],
  });
  return (
    <CModal
      show={props.modal}
      size="lg"
      onClose={() => props.setModal(false)}
      style={{
        height: "90vh",
        position: "absolute",
      }}
    >
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <MapContainer
          style={{ height: "100%" }}
          center={[position[0].lat, position[0].long]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {position.map((item, key) => {
            return (
              <Marker position={[item.lat, item.long]} icon={icon}>
                <Popup>Огноо: {item.date}</Popup>
              </Marker>
            );
          })}
        </MapContainer>
      </CModalBody>
    </CModal>
  );
};

const ModalCheckCode = (props) => {
  return (
    <CModal
      centered
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="sm"
    >
      <CModalHeader>
        <CModalTitle style={{ textAlign: "center" }}>{props.desc}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormGroup>
          <CLabel htmlFor="code">Нууц код</CLabel>
          <CInput
            id="code"
            placeholder="8 оронтой тоо"
            value={props.code || ""}
            type="password"
            maxLength={8}
            onChange={(value) => {
              props.setCode(value.target.value);
            }}
          />
        </CFormGroup>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color={props.btnColor}
          disabled={!props.code || props.code.length != 8}
          onClick={() => {
            props.handler();
          }}
        >
          {props.btnTitle}
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
