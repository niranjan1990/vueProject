import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "../views/HomeView.vue";
import AboutView from "../views/AboutView.vue";
import SampleView from "../views/SampleView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: HomeView,
    },
    {
      path: "/level1",
      name: "about",
      component: AboutView,
    },
    {
      path: "/level2",
      name: "test",
      component: SampleView,
    },
  ],
});

export default router;
