const backendHost = "http://45.55.39.15:8080/api";

export default {
  loginApi: {
    method: `post`,
    url: `${backendHost}/login`,
  },
  adminPanelApi: {
    method: `get`,
    url: `${backendHost}/loginAdminPanel`,
  },
  addAdminApi: {
    method: `post`,
    url: `${backendHost}/addAdmin`,
  },
  getAdminInfoByTokenApi: {
    method: `get`,
    url: `${backendHost}/adminInfoByToken`,
  },
  setAdminApi: {
    method: `post`,
    url: `${backendHost}/setAdmin`,
  },
  getAdminListApi: {
    method: `get`,
    url: `${backendHost}/adminList`,
  },
  deleteAdminApi: {
    method: `post`,
    url: `${backendHost}/deleteAdmin`,
  },
  setOtherAdminApi: {
    method: `post`,
    url: `${backendHost}/setOtherAdmin`,
  },
};
