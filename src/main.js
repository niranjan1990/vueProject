import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import "./assets/main.css";
import VueResource from "vue-resource";

export const bus = new Vue();

Vue.use(VueResource);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
