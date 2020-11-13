import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

const routes = [
  {
    path: "/",
    name: "Login",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login/Login.vue")
  },
  {
    path: "/map",
    name: "Map",
    component: () =>
      import(/* webpackChunkName: "Map" */ "../views/map/Map.vue")
  },
  {
    path: "/energy",
    name: "Energy",
    component: () =>
      import(/* webpackChunkName: "Energy" */ "../views/energy/Energy.vue")
  },
  {
    path: "/monitor",
    name: "Monitor",
    component: () =>
      import(/* webpackChunkName: "Monitor" */ "../views/monitor/Monitor.vue")
  },
  {
    path: "/environment",
    name: "Environment",
    component: () =>
      import(
        /* webpackChunkName: "Environment" */
        "../views/environment/Environment.vue"
      )
  }
];

const router = new Router({ routes });

export default router;
