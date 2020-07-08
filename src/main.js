import Vue from "vue";
import App from "./App";
import router from "./router/index";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import { sync } from "vuex-router-sync";
import store from "./store/store";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";
import { ValidationProvider, extend } from "vee-validate";
import { required } from "vee-validate/dist/rules";

extend("required", {
  ...required,
  message: "This field is required",
});

Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.config.productionTip = false;
sync(store, router);

new Vue({
  render: (h) => h(App),
  router,
  store,
  ValidationProvider,
  data: () => ({
    value: "",
  }),
}).$mount("#app");

// ***** Authenticate User goes here *****???
// authUser = (next) => {}
