import React, { lazy, useState } from "react";
import {
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CProgress,
  CRow,
  CCallout,
  CWidgetProgressIcon,
  CCardGroup,
  CDropdown,
  CDropdownToggle,
  CDropdownItem,
  CDropdownMenu,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";

import MainChartExample from "../charts/MainChartExample.js";
import MainChartExampleWeek from "../charts/MainChartExampleWeek";

import WidgetsNumber from "../widgets/WidgetsNumber";

const Dashboard = () => {
  const [isGraph, setIsGraph] = useState(0);
  return (
    <>
      <WidgetsNumber />
      <CCard>
        <CCardBody>
          <CRow>
            <CCol sm="5">
              <h4 id="traffic" className="card-title mb-0">
                Худалдан авалтын хураангуй
              </h4>
              <div className="small text-muted">
                {isGraph === 0
                  ? "2020 оны 12 сараас - 2021 оны 1 сар"
                  : "1 сарын 12 - 1 сарын 18"}
              </div>
            </CCol>
            <CCol sm="7" className="d-none d-md-block">
              <CButtonGroup className="float-right mr-3">
                {["Сараар", "7 хоногоор"].map((value, idx) => (
                  <CButton
                    color="outline-secondary"
                    key={idx}
                    className="mx-0"
                    active={idx === isGraph}
                    onClick={() => setIsGraph(idx)}
                  >
                    {value}
                  </CButton>
                ))}
              </CButtonGroup>
            </CCol>
          </CRow>
          {isGraph == 0 ? (
            <MainChartExample style={{ height: "300px", marginTop: "40px" }} />
          ) : (
            <MainChartExampleWeek
              style={{ height: "300px", marginTop: "40px" }}
            />
          )}
        </CCardBody>
        <CCardFooter>
          <CRow className="text-center">
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Утас</div>
              <strong>+$150.70</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="info"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Headphone (30 мин өмнө)</div>
              <strong>+$150.70</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="warning"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">iPhone (2 цаг өмнө)</div>
              <strong>+$590</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="danger"
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0 d-md-down-none">
              <div className="text-muted">Macbook (1 өдөр өмнө)</div>
              <strong>+$1.2k</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                value={40}
              />
            </CCol>
            <CCol md sm="12" className="mb-sm-2 mb-0">
              <div className="text-muted">Нийт</div>
              <strong>$82,950.96</strong>
              <CProgress
                className="progress-xs mt-2"
                precision={1}
                color="success"
                value={40}
              />
            </CCol>
          </CRow>
        </CCardFooter>
      </CCard>

      <CCardGroup className="mb-4">
        <CDropdown className="m-1">
          <CDropdownToggle color="info">2021</CDropdownToggle>
          <CDropdownMenu>
            <CDropdownItem disabled>2021</CDropdownItem>
            <CDropdownItem>2020</CDropdownItem>
            <CDropdownItem>2019</CDropdownItem>
          </CDropdownMenu>
        </CDropdown>
        <CWidgetProgressIcon
          header="10.6k (+1.2k)"
          text="Нийт бараа"
          color="gradient-info"
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="26M (+39.4k)"
          text="Нийт худалдан авалт"
          color="gradient-success"
        >
          <CIcon name="cil-userFollow" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="15.89M (+43.5k)"
          text="Нийт орлого"
          color="gradient-warning"
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
        <CWidgetProgressIcon
          header="1.25B (Нийт барааны үнэ)"
          text="Нийт зарлага"
        >
          <CIcon name="cil-chartPie" height="36" />
        </CWidgetProgressIcon>
      </CCardGroup>

      <CRow>
        <CCol>
          <CCard>
            <CCardHeader>
              <h5>Хамгийн эрэлттэй байгаа бараа</h5>
            </CCardHeader>
            <CCardBody>
              <CRow>
                <CCol xs="12" md="6" xl="6">
                  <CRow>
                    <CCol sm="6">
                      <CCallout color="warning">
                        <small className="text-muted">May 12, 2019</small>
                        <br />
                        <strong className="h4">
                          25,756{" "}
                          <span style={{ color: "#2eb85c" }}>(+16.2%)</span>
                        </strong>
                      </CCallout>
                    </CCol>
                    <CCol sm="6">
                      <CCallout color="success">
                        <small className="text-muted">Jul 26, 2019</small>
                        <br />
                        <strong className="h4">
                          5,352{" "}
                          <span style={{ color: "#e55353" }}>(-4.9%)</span>
                        </strong>
                      </CCallout>
                    </CCol>
                  </CRow>
                </CCol>
              </CRow>

              <br />

              <table className="table table-hover table-outline mb-0 d-none d-sm-table">
                <thead className="thead-light">
                  <tr>
                    <th>Campaign</th>
                    <th className="text-center">Growth</th>
                    <th className="text-center">Charges</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <div>iPhone XR</div>
                    </td>
                    <td className="text-center">30%</td>
                    <td className="text-center">$5,536</td>
                    <td className="text-center">
                      <strong style={{ color: "#2eb85c" }}>Active</strong>
                    </td>
                    <td className="text-center"></td>
                  </tr>
                  <tr>
                    <td>
                      <div>Samsung S9</div>
                    </td>
                    <td className="text-center">15.5%</td>
                    <td className="text-center">$1,569</td>
                    <td className="text-center">
                      <strong style={{ color: "#2eb85c" }}>Active</strong>
                    </td>
                    <td className="text-center">
                      <CIcon
                        name="cil-chevron-bottom"
                        style={{ color: "#e55353" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <div>iPhone earphone</div>
                    </td>
                    <td className="text-center">70.30%</td>
                    <td className="text-center">$23,859</td>
                    <td className="text-center">
                      <strong style={{ color: "#e55353" }}>Closed</strong>
                    </td>
                    <td className="text-center"></td>
                  </tr>
                  <tr>
                    <td>
                      <div>Oneplus 7 pro</div>
                    </td>
                    <td className="text-center">10.4%</td>
                    <td className="text-center">$9,523</td>
                    <td className="text-center">
                      <strong style={{ color: "#2eb85c" }}>Active</strong>
                    </td>
                    <td className="text-center"></td>
                  </tr>
                  <tr>
                    <td>
                      <div>Google Pixel 4 xl</div>
                    </td>
                    <td className="text-center">62.38%</td>
                    <td className="text-center">$12,897</td>
                    <td className="text-center">
                      <strong style={{ color: "#e55353" }}>Closed</strong>
                    </td>
                    <td className="text-center">
                      <CIcon
                        name="cil-chevron-bottom"
                        style={{ color: "#e55353" }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </>
  );
};

export default Dashboard;
