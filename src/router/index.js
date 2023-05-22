import Vue from "vue";
import VueRouter from "vue-router";
import TaskView from "../views/TaskView.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "home",
      component: TaskView,
    },
  ],
});

export default router;
