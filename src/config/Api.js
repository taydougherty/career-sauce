import axios from "axios";
import store from "../store/store";

let serverAPI = "";
if (process.env.NODE_ENV === "production") {
  serverAPI = process.env.PORT;
} else {
  serverAPI = "http://localhost:3000";
}

export default () => {
  return axios.create({
    baseURL: serverAPI,
    headers: {
      Authorization: `Bearer ${store.state.token}`,
    },
  });
};
