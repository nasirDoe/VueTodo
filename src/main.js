import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import NProgress from "nprogress";
import "animate.css/animate.min.css";
import "nprogress/nprogress.css";
import VueProgressRouter from "vue-progressbar";

Vue.use(VueProgressRouter, {
  color: "green",
  failedColor: "red",
  height: "2px"
});
Vue.config.productionTip = false;
router.beforeResolve((to, from, next) => {
  if (to.name) {
    NProgress.start();
  }
  next();
});
router.afterEach(() => {
  setTimeout(() => {
    NProgress.done();
  }, 500);
});
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
