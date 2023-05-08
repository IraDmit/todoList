import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import VCalendar from "v-calendar";

//style
import "./assets/style/global.scss";
import "bootstrap/dist/css/bootstrap.css";

Vue.config.productionTip = false;

Vue.use(VCalendar, {
  componentPrefix: "vc", // Use <vc-calendar /> instead of <v-calendar />
});

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
