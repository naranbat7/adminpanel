const backendHost = "http://45.55.39.15:8080/api/admin";
//const backendHost = "http://localhost:8080/api/admin";

export default {
  baseUrl: "http://localhost:8080",
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
  userListApi: {
    method: `get`,
    url: `${backendHost}/userList`,
  },
  deleteUserApi: {
    method: `post`,
    url: `${backendHost}/deleteUser`,
  },
  changeInsuranceDateApi: {
    method: `post`,
    url: `${backendHost}/changeInsuranceDate`,
  },
  setUserApi: {
    method: `post`,
    url: `${backendHost}/setUser`,
  },
  uploadImageApi: {
    method: `post`,
    url: `${backendHost}/uploadImage`,
  },
  uploadImage2Api: {
    method: `post`,
    url: `${backendHost}/uploadImage2`,
  },
  addProductApi: {
    method: `post`,
    url: `${backendHost}/addProduct`,
  },
  productListApi: {
    method: `get`,
    url: `${backendHost}/productList`,
  },
  deleteProductApi: {
    method: `post`,
    url: `${backendHost}/deleteProduct`,
  },
  setProductApi: {
    method: `post`,
    url: `${backendHost}/setProduct`,
  },
  getUserLastLocationApi: {
    method: `post`,
    url: `${backendHost}/userLastLocation`,
  },
};
