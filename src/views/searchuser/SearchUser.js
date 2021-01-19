import React, { useState } from "react";
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
} from "@coreui/react";

import CIcon from "@coreui/icons-react";

const fields = ["№", "Дугаар", "IMEI", "Нэр", "Үйлдэл"];
const pageList = [10, 20, 30];

const Tables = () => {
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [search, setSearch] = useState("");
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
                .filter((value) => value.number.slice(4, 8).includes(search))
                .slice((page - 1) * perPage, page * perPage)
                .map((item, key) => {
                  return (
                    <tr>
                      <td className="text-center">
                        {(page - 1) * perPage + key + 1}
                      </td>
                      <td className="text-center">
                        {item.number.charAt(0) +
                          item.number.charAt(1) +
                          "**" +
                          item.number.substring(4, 8)}
                      </td>
                      <td className="text-center">{item.imei}</td>
                      <td className="text-center">{item.name}</td>
                      <td className="text-center">
                        <CButton active color="success" aria-pressed="true">
                          Хайлт хийх
                        </CButton>
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
                value.number.slice(4, 8).includes(search)
              ).length / perPage
            )}
            onActivePageChange={setPage}
          />
        </CCol>
      </CRow>
    </>
  );
};

export default Tables;

const usersData = [
  {
    id: 1,
    name: "John Doe",
    imei: "1234567890123",
    number: "89551792",
  },
  {
    id: 2,
    name: "Samppa Nori",
    imei: "1234567890123",
    number: "88290338",
  },
  {
    id: 3,
    name: "Estavan Lykos",
    imei: "1234567890123",
    number: "89398924",
  },
  {
    id: 4,
    name: "Chetan Mohamed",
    imei: "1234567890123",
    number: "88089131",
  },
  {
    id: 5,
    name: "Derick Maximinus",
    imei: "1234567890123",
    number: "89715691",
  },
  {
    id: 6,
    name: "Friderik Dávid",
    imei: "1234567890123",
    number: "89368160",
  },
  {
    id: 7,
    name: "Yiorgos Avraamu",
    imei: "1234567890123",
    number: "89232753",
  },
  {
    id: 8,
    name: "Avram Tarasios",
    imei: "1234567890123",
    number: "89371145",
  },
  {
    id: 9,
    name: "Quintin Ed",
    imei: "1234567890123",
    number: "88903713",
  },
  {
    id: 10,
    name: "Enéas Kwadwo",
    imei: "1234567890123",
    number: "88875578",
  },
  {
    id: 11,
    name: "Agapetus Tadeáš",
    imei: "1234567890123",
    number: "89582064",
  },
  {
    id: 12,
    name: "Carwyn Fachtna",
    imei: "1234567890123",
    number: "89532111",
  },
  {
    id: 13,
    name: "Nehemiah Tatius",
    imei: "1234567890123",
    number: "89127644",
  },
  {
    id: 14,
    name: "Ebbe Gemariah",
    imei: "1234567890123",
    number: "89128039",
  },
  {
    id: 15,
    name: "Eustorgios Amulius",
    imei: "1234567890123",
    number: "88704059",
  },
  {
    id: 16,
    name: "Leopold Gáspár",
    imei: "1234567890123",
    number: "88887311",
  },
  {
    id: 17,
    name: "Pompeius René",
    imei: "1234567890123",
    number: "89674131",
  },
  {
    id: 18,
    name: "Paĉjo Jadon",
    imei: "1234567890123",
    number: "88533080",
  },
  {
    id: 19,
    name: "Micheal Mercurius",
    imei: "1234567890123",
    number: "89889679",
  },
  {
    id: 20,
    name: "Ganesha Dubhghall",
    imei: "1234567890123",
    number: "89319031",
  },
  {
    id: 21,
    name: "Hiroto Šimun",
    imei: "1234567890123",
    number: "89651352",
  },
  {
    id: 22,
    name: "Vishnu Serghei",
    imei: "1234567890123",
    number: "89533041",
  },
  {
    id: 23,
    name: "Zbyněk Phoibos",
    imei: "1234567890123",
    number: "89348364",
  },
  {
    id: 24,
    name: "Aulus Agmundr",
    imei: "1234567890123",
    number: "88418023",
  },
  {
    id: 25,
    name: "Ford Prefect",
    imei: "1234567890123",
    number: "89871274",
  },
];
