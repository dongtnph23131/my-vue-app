import { createApp } from "vue";
import "./style.css";
import App from "./App.vue";
import { createRouter, createWebHistory } from "vue-router";
import Signup from "./pages/signup.vue";
import Signin from "./pages/signin.vue";
import HomePage from "./pages/home-page.vue";
import AddNews from "./pages/website/news/add.vue";
import LayoutWebsite from "./components/layout/layout-website.vue";
import NewsMyAcount from "./pages/website/news-my-acount.vue";
import { VueQueryPlugin } from "@tanstack/vue-query";
import NewsDetail from "./pages/website/news-detail.vue";
import EditNews from "./pages/website/news/edit.vue";
const app = createApp(App);
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      component: LayoutWebsite,
      children: [
        { path: "", component: HomePage, meta: { requiresAuth: false } },
        {
          path: "create-news",
          component: AddNews,
          meta: { requiresAuth: true },
        },
        {
          path: "news-my-acount",
          component: NewsMyAcount,
          meta: { requiresAuth: true },
        },
        { path: "newss/:id", props: true, component: NewsDetail },
        {
          path: "/newss/:id/edit",
          props: true,
          component: EditNews,
          meta: { requiresAuth: true },
        },
      ],
    },
    { path: "/signup", component: Signup },
    { path: "/signin", component: Signin },
  ],
});
router.beforeEach((to, _, next) => {
  if (to.meta.requiresAuth) {
    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      next({ path: "/signin" });
    }
  }
  next();
});
app.use(router);
app.use(VueQueryPlugin);
app.mount("#app");
