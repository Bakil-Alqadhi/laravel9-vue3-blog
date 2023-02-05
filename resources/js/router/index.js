import { createRouter, createWebHistory } from "vue-router";
import SingleBlog from "../pages/SingleBlog.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            name: "name",
            component: () => import("../pages/Home.vue"),
        },
        {
            path: "/home",
            name: "Home",
            component: () => import("../pages/Home.vue"),
        },
        {
            path: "/about",
            name: "About",
            component: () => import("../pages/About.vue"),
        },
        {
            path: "/blog",
            name: "Blog",
            component: () => import("../pages/Blog.vue"),
        },
        {
            path: "/blog/:slug",
            name: "SingleBlog",
            component: SingleBlog,
            props: true,
        },
        {
            path: "/contact",
            name: "Contact",
            component: () => import("../pages/Contact.vue"),
        },
        {
            path: "/login",
            name: "Login",
            component: () => import("../pages/Login.vue"),
            meta: { requiresGuest: true },
        },
        {
            path: "/register",
            name: "Register",
            component: () => import("../pages/Register.vue"),
            meta: { requiresGuest: true },
        },
        {
            path: "/dashboard",
            name: "Dashboard",
            component: () => import("../pages/Dashboard.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/categories/create",
            name: "CreateCategories",
            component: () => import("../pages/categories/CreateCategories.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/categories",
            name: "CategoriesList",
            component: () => import("../pages/categories/CategoriesList.vue"),
            meta: { requiresAuth: true },
            props: true,
        },
        {
            path: "/categories/:id/edit",
            name: "EditCategories",
            component: () => import("../pages/categories/EditCategories.vue"),
            meta: { requiresAuth: true },
            props: true,
        },
        {
            path: "/posts/create",
            name: "CreatePosts",
            component: () => import("../pages/posts/CreatePosts.vue"),
            meta: { requiresAuth: true },
        },
        {
            path: "/posts/dashboardPostsList",
            name: "DashboardPostsList",
            component: () => import("../pages/posts/DashboardPostsList.vue"),
            meta: { requiresAuth: true },
            props: true,
        },
        {
            path: "/posts/:slug/edit",
            name: "EditPosts",
            component: () => import("../pages/posts/EditPosts.vue"),
            meta: { requiresAuth: true },
            props: true,
        },
    ],
});

router.beforeEach((to, from) => {
    const authenticated = localStorage.getItem("authenticated");
    if (to.meta.requiresGuest && authenticated) {
        return {
            name: "Dashboard",
        };
    } else if (to.meta.requiresAuth && !authenticated) {
        return {
            name: "Login",
        };
    }
});
export default router;
