import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router";
import Archive from "../views/Archive.vue";
import Gallery from "../views/Gallery.vue";
import Single from "../views/single.vue";
import About from "../views/About.vue";
import Home from "../views/Home.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
		meta: { scrollToTop: true },
  },
  {
    path: "/about",
    name: "About",
    component: About,
		meta: { scrollToTop: true },
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
  {
    path: "/gallery",
    name: "gallery",
    component: Gallery,
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
	scrollBehavior(to, from, savedPosition) {
		if (savedPosition) {
			return savedPosition;
		} else if (to.hash) {
			console.log(to.hash);
			return { el: to.hash, behavior: 'smooth', }
		} else {
				return {top: 0}
			}
	}
});

export default router;
