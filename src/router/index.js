import Vue from "vue";
import VueRouter from "vue-router";
// import components
import LandingPage from "../components/LandingPage";
import Register from "../components/Register";
import Home from "../components/Home";

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: "/",
      name: "LandingPage",
      component: LandingPage,
    },
    {
      path: "/register",
      name: "register",
      component: Register,
    },
    {
      path: "/home",
      name: "Home",
      component: Home,
    },
  ],
});
