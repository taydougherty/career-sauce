import Api from "../config/Api";

export default {
  // User Registration
  register(credentials) {
    return Api().post("register", credentials);
  },
  // User Login
  login(credentials) {
    return Api().post("login", credentials);
  },
  logout() {
    return Api().get("logout");
  },
  getUser(id) {
    return Api().get(`/user/${id}`);
  },
  // Delete User & Cascade all Job Applications
  deleteUser(credentials) {
    return Api().delete(`/delete/user/${credentials.id}`);
  },
  // Update User Information
  updateUserInfo(credentials) {
    return Api().put(`/updateInformation/user/${credentials.id}`, credentials);
  },
  // Update User Password
  updateUserPassword(credentials) {
    return Api().put(`updatePassword/user/${credentials.id}`, credentials);
  },
};
