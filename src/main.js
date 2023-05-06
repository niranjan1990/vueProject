import Vue from "vue";

import App from "./App.vue";
import router from "./router";
import AboutChild from "./components/AboutChild.vue";
import "./assets/main.css";
import VueResource from "vue-resource";

export const bus = new Vue();

Vue.component("testComp", AboutChild);
Vue.use(VueResource);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
