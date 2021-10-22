import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Single from "../views/single.vue";
import Archive from "../views/Archive.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/About.vue"),
  },
  {
    path: "/post/:id/:title",
    name: "Post",
    component: Single,
  },
  {
    path: "/post/archive",
    name: "archive",
    component: Archive,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
	scrollBehavior (to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			console.log(to.hash);
			return {
				selector: to.hash,
				behavior: 'smooth',
			}
		}
	}
});

export default router;
