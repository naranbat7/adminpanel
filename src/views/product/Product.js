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
  CTextarea,
  CInputFile,
} from "@coreui/react";

import axios from "axios";
import Constant from "../../constants/CONSTANT";

import CIcon from "@coreui/icons-react";
import ImageUploader from "react-images-upload";
import moment from "moment";
import "moment/locale/mn";
moment.locale("mn");

const thousandify = require("thousandify");

const fields = [
  "№",
  "Зураг",
  "Утас төрөл",
  "Үнэ",
  "Тоо ширхэг",
  "Сүүлд хийгдсэн",
  "Үйлдэл",
];
const pageList = [10, 20, 30];

const Tables = (props) => {
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [modal1, setModal1] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [modal3, setModal3] = useState(false);
  const [body, setBody] = useState({
    name: "",
    description: "",
    total: 0,
    price: 0,
  });
  const [body1, setBody1] = useState({
    id: 0,
    name: "",
    description: "",
    total: 0,
    price: 0,
  });
  const [body2, setBody2] = useState({ name: "" });
  const [body3, setBody3] = useState({ imgLink: "" });
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
  const [images, setImages] = useState({});
  const [data, setData] = useState([]);

  const onChange = (picture) => {
    setImages(picture);
  };

  const showProductAddModal = () => {
    setModal(true);
  };
  const showProductSetterModal = (item) => {
    setBody1(item);
    setModal1(true);
  };
  const showProductDeleteModal = (item) => {
    setBody2(item);
    setModal2(true);
  };
  const addProduct = () => {
    body.price = parseInt(body.price);
    body.total = parseInt(body.total);
    axios({
      method: Constant.addProductApi.method,
      url: Constant.addProductApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body,
    })
      .then((response) => {
        if (response.data.success == true) {
          fileUploader(response.data.data.id);
        }
        if (response.data.success == false) {
          props.addToast(response.data.message, false);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
        props.addToast(err, false);
      });
    setModal(false);
  };
  const setProduct = () => {
    body1.price = parseInt(body1.price);
    body1.total = parseInt(body1.total);
    axios({
      method: Constant.setProductApi.method,
      url: Constant.setProductApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: body1,
    })
      .then((response) => {
        if (response.data.success == true) {
          console.log("images true: ", images);
          if (images.name) {
            let formData = new FormData();
            formData.append("id", body1.id);
            formData.append("file", images);
            axios({
              method: Constant.uploadImage2Api.method,
              url: Constant.uploadImage2Api.url,
              headers: {
                Authorization:
                  window.localStorage.getItem("authorization") || "null",
                "Content-Type": "multipart/form-data",
              },
              data: formData,
            })
              .then((response) => {
                if (response.data.success == true) {
                  props.addToast(response.data.message, true);
                  window.location.reload(false);
                } else {
                  props.addToast(response.data.message, false);
                }
                setImages({});
              })
              .catch((err) => {
                props.addToast(err, false);
                setImages({});
              });
          } else {
            props.addToast(response.data.message, true);
            getProductList();
          }
        }
        if (response.data.success == false) {
          props.addToast(response.data.message, false);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
        props.addToast(err, false);
      });
    setModal1(false);
  };
  const deleteProduct = () => {
    axios({
      method: Constant.deleteProductApi.method,
      url: Constant.deleteProductApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
      data: { id: body2.id },
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getProductList();
        }
        if (response.data.success == false) {
          props.addToast(response.data.message, false);
        }
      })
      .catch((err) => {
        console.log("Алдаа: ", err);
        props.addToast(err, false);
      });
    setModal2(false);
  };

  const fileUploader = (id) => {
    let formData = new FormData();
    formData.append("id", id);
    formData.append("file", images);
    axios({
      method: Constant.uploadImageApi.method,
      url: Constant.uploadImageApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
        "Content-Type": "multipart/form-data",
      },
      data: formData,
    })
      .then((response) => {
        if (response.data.success == true) {
          props.addToast(response.data.message, true);
          getProductList();
        } else {
          props.addToast(response.data.message, false);
        }
        setImages({});
      })
      .catch((err) => {
        props.addToast(err, false);
        setImages({});
      });
  };

  const getProductList = () => {
    axios({
      method: Constant.productListApi.method,
      url: Constant.productListApi.url,
      headers: {
        Authorization: window.localStorage.getItem("authorization") || "null",
      },
    })
      .then((response) => {
        if (response.data.success == true) {
          setData(response.data.data);
        } else {
          props.addToast("Барааны жагсаалт авахад алдаа гарлаа", false);
        }
      })
      .catch((err) => {
        props.addToast(err, false);
      });
  };

  useEffect(() => {
    getProductList();
  }, []);
  useEffect(() => {
    setPage(1);
  }, [search, data]);

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
        <CCol>
          <CInputGroup>
            <CInput
              id="input1-group2"
              name="input1-group2"
              placeholder="Хайлтын утга"
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
        <CCol xs="1">
          <CButton color="success" onClick={() => showProductAddModal()}>
            Бараа нэмэх
          </CButton>
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
              {data
                .filter((value) =>
                  value.name.toLowerCase().includes(search.toLowerCase())
                )
                .slice((page - 1) * perPage, page * perPage)
                .map((item, key) => {
                  return (
                    <tr>
                      <td className="text-center">
                        {(page - 1) * perPage + key + 1}
                      </td>
                      <td className="text-center">
                        <img
                          style={{ width: 50, height: 50 }}
                          src={item.imgLink}
                        />
                      </td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">
                        {thousandify(item.price)} ₮
                      </td>
                      <td className="text-center">{item.total}</td>
                      <td className="text-center">
                        {moment(item.createdDate).fromNow()}
                      </td>
                      <td className="text-center">
                        <CRow alignHorizontal="center" className="xs-2">
                          <CButton
                            active
                            color="info"
                            aria-pressed="true"
                            onClick={() => {
                              showProductSetterModal(item);
                            }}
                          >
                            <CIcon name="cil-pencil" />
                          </CButton>
                          <CButton
                            className="ml-1"
                            active
                            color="success"
                            aria-pressed="true"
                            onClick={() => {
                              setBody3(item);
                              setModal3(true);
                            }}
                          >
                            <CIcon name="cil-fullscreen" />
                          </CButton>
                          <CButton
                            className="ml-1"
                            active
                            color="danger"
                            aria-pressed="true"
                            onClick={() => {
                              showProductDeleteModal(item);
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
              data.filter((value) => value.name.includes(search)).length /
                perPage
            )}
            onActivePageChange={setPage}
            className="mt-3"
          />
        </CCol>
      </CRow>
      <ModalForm
        title="Бараа нэмэх"
        btnTitle="Нэмэх"
        handler={addProduct}
        body={body}
        setBody={setBody}
        modal={modal}
        setModal={setModal}
        images={images}
        onChange={onChange}
      />
      <ModalForm
        title="Барааны мэдээлэл өөрчлөх"
        btnTitle="Өөрчлөх"
        handler={setProduct}
        body={body1}
        setBody={setBody1}
        modal={modal1}
        setModal={setModal1}
        images={images}
        onChange={onChange}
        imgLink={body1.imgLink}
      />
      <ModalFormDisabled
        title="Барааны мэдээлэл"
        body={body3}
        setBody={setBody3}
        modal={modal3}
        setModal={setModal3}
        imgLink={body3.imgLink}
      />
      <ModalCheck
        title="Бараа устгах"
        btnTitle="Устгах"
        desc={body2.name + " барааг устгах уу?"}
        handler={deleteProduct}
        modal={modal2}
        setModal={setModal2}
        btnColor="danger"
      />
    </>
  );
};

export default Tables;

const ModalForm = (props) => {
  return (
    <CModal
      centered
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            {props.imgLink ? (
              <CFormGroup>
                <CLabel htmlFor="name" className="mr-4">
                  Өмнөх зураг
                </CLabel>
                <img src={props.imgLink} style={{ width: 150, height: 150 }} />
              </CFormGroup>
            ) : null}
            <CFormGroup>
              <CLabel htmlFor="name">
                Барааны нэр <strong style={{ color: "#e55353" }}>*</strong>
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
              <CLabel htmlFor="desc">Нэмэлт мэдээлэл</CLabel>
              <CTextarea
                name="desc"
                id="desc"
                rows="9"
                placeholder="Дэлгэрэнгүй..."
                value={props.body.description}
                onChange={(value) =>
                  props.setBody({
                    ...props.body,
                    description: value.target.value,
                  })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="total">
                Нийт тоо ширхэг <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="total"
                placeholder="Нийт"
                type="number"
                value={props.body.total}
                onChange={(value) =>
                  props.setBody({ ...props.body, total: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="price">
                Барааны үнэ <strong style={{ color: "#e55353" }}>*</strong>
              </CLabel>
              <CInput
                id="price"
                placeholder="Үнэ"
                type="number"
                value={props.body.price}
                onChange={(value) =>
                  props.setBody({ ...props.body, price: value.target.value })
                }
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="img">
                Зураг оруулах{" "}
                {!props.imgLink ? (
                  <strong style={{ color: "#e55353" }}>*</strong>
                ) : (
                  ""
                )}
              </CLabel>
              <ImageUploader
                withIcon={true}
                buttonText="Зургаа сонгоно уу"
                withPreview={true}
                withLabel={true}
                onChange={(event) => props.onChange(event[0])}
                imgExtension={[".jpg", ".png"]}
                accept="image/*"
                maxFileSize={1048576}
                singleImage={true}
                fileSizeError=" файл хэтэрхий том байна."
                label="Оруулах файлын дээд хэмжээ 1mb, .jpg, .png зөвшөөрнө."
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
            props.body.name == "" ||
            props.body.total == "" ||
            props.body.price == ""
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
    <CModal
      centered
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="sm"
    >
      <CModalHeader>
        <CModalTitle style={{ textAlign: "center" }}>{props.desc}</CModalTitle>
      </CModalHeader>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>{" "}
        <CButton
          color={props.btnColor}
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

const ModalFormDisabled = (props) => {
  return (
    <CModal
      centered
      show={props.modal}
      onClose={() => props.setModal(false)}
      size="lg"
    >
      <CModalHeader closeButton>
        <CModalTitle>{props.title}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CCard>
          <CCardBody>
            <CFormGroup>
              <CLabel htmlFor="name">Барааны нэр</CLabel>
              <CInput
                id="name"
                placeholder="Нэрээ оруулна уу"
                value={props.body.name}
                disabled
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="desc">Нэмэлт мэдээлэл</CLabel>
              <CTextarea
                name="desc"
                id="desc"
                rows="9"
                placeholder="Дэлгэрэнгүй..."
                value={props.body.description}
                disabled
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="total">Нийт тоо ширхэг</CLabel>
              <CInput
                id="total"
                placeholder="Нийт"
                type="number"
                value={props.body.total}
                disabled
              />
            </CFormGroup>
            <CFormGroup>
              <CLabel htmlFor="price">Барааны үнэ</CLabel>
              <CInput
                id="price"
                placeholder="Үнэ"
                type="number"
                value={props.body.price}
                disabled
              />
            </CFormGroup>
            <CFormGroup>
              <img src={props.imgLink} style={{ width: 150, height: 150 }} />
            </CFormGroup>
          </CCardBody>
        </CCard>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={() => props.setModal(false)}>
          Болих
        </CButton>
      </CModalFooter>
    </CModal>
  );
};
