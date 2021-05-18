import Vue from "vue";
import Router from "vue-router";
import store from "../store";

Vue.use(Router);

const original = Router.prototype.push;
Router.prototype.push = function push(location) {
  return original.call(this, location).catch(err => err);
};

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
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "Map" */ "../views/map/Map.vue")
  },
  {
    path: "/energy",
    name: "Energy",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "Energy" */ "../views/energy/Energy.vue")
  },
  {
    path: "/monitor",
    name: "Monitor",
    meta: {
      auth: true
    },
    component: () =>
      import(/* webpackChunkName: "Monitor" */ "../views/monitor/Monitor.vue")
  },
  {
    path: "/environment",
    name: "Environment",
    meta: {
      auth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Environment" */
        "../views/environment/Environment.vue"
      )
  },
  {
    path: "/screen",
    name: "Screen",
    meta: {
      auth: true
    },
    component: () =>
      import(
        /* webpackChunkName: "Screen" */
        "../views/screen/Screen.vue"
      )
  }
];

const router = new Router({ routes });

router.beforeEach((to, from, next) => {
  const token = store.state.token;
  if (to.meta.auth) {
    if (token) {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});

export default router;
