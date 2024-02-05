import api from "./api";

const AuthService = {
  Login(data) {
    return api().post("/api/login/", data);
  },

  getUser() {
    const token = localStorage.getItem("token");
    return api().get("/api/user", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  },
};

export default AuthService;
