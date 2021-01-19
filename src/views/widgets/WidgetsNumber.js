import React from "react";
import {
  CCol,
  CRow,
  CWidgetIcon,
  CWidgetDropdown,
  CDropdown,
  CDropdownMenu,
  CDropdownItem,
  CDropdownToggle,
  CWidgetProgressIcon,
  CBadge,
  CButton,
  CButtonGroup,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CProgress,
  CCallout,
} from "@coreui/react";

import { CChart, CChartLine } from "@coreui/react-chartjs";

import CIcon from "@coreui/icons-react";

const WidgetsNumber = () => {
  // render
  return (
    <CRow>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="1.2k"
          text="Шинэ хэрэглэгч"
          color="gradient-info"
        >
          <CIcon name="cil-people" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol sm="6" md="2">
        <CWidgetProgressIcon
          header="45.6k"
          text="Зарагдсан бараа"
          color="gradient-warning"
        >
          <CIcon name="cil-basket" height="36" />
        </CWidgetProgressIcon>
      </CCol>
      <CCol>
        <CCard>
          <CCardBody>
            <CChart
              type="line"
              datasets={line.datasets}
              options={options}
              style={{ height: "150px" }}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  );
};

export default WidgetsNumber;

const line = {
  labels: ["January", "February", "March", "April", "May", "June", "July"],
  datasets: [
    {
      label: "Нийт орлого: $25,960",
      fill: false,
      lineTension: 0.1,
      backgroundColor: "rgba(75,192,192,0.4)",
      borderColor: "rgba(75,192,192,1)",
      borderCapStyle: "butt",
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: "miter",
      pointBorderColor: "rgba(75,192,192,1)",
      pointBackgroundColor: "#fff",
      pointBorderWidth: 1,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: "rgba(75,192,192,1)",
      pointHoverBorderColor: "rgba(220,220,220,1)",
      pointHoverBorderWidth: 2,
      pointRadius: 1,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
  ],
};

const options = {
  // tooltips: {
  //   enabled: false,
  //   custom: customTooltips
  // },
  maintainAspectRatio: false,
  label: false,
};
