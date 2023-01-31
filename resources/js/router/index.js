import { createRouter, createWebHistory } from "vue-router";
import SingleBlog from '../pages/SingleBlog.vue'

const router = createRouter( {
    history:createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'name',
            component: () => import('../pages/Home.vue')
        },
        {
            path: '/home',
            name: 'Home',
            component: () => import('../pages/Home.vue')
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('../pages/About.vue')
        },
        {
            path: '/blog',
            name: 'Blog',
            component: () => import('../pages/Blog.vue')
        },
        {
            path: '/blog/:slug',
            name: 'SingleBlog',
            component: SingleBlog,
            props: true
        },
        {
            path: '/contact',
            name: 'Contact',
            component: () => import('../pages/Contact.vue')
        },
        {
            path: '/login',
            name: 'Login',
            component: () => import('../pages/Login.vue')
        },
        {
            path: '/register',
            name: 'Register',
            component: () => import('../pages/Register.vue')
        },
        {
            path: '/dashboard',
            name: 'Dashboard',
            component: () => import('../pages/Dashboard.vue')
        }

    ]

})

export default router
