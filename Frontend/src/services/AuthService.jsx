import api from "./api";

const AuthService = {
  Login(data) {
    return api().post("/api/login/", data);
  },
  getUser() {
    return api().get("/api/user");
  },
  Register(data) {
    console.log(data);
    return api().post("/api/register/", data);
  },
  refreshToken() {
    return api().post("/api/refresh_token");
  }
};

export default AuthService;
