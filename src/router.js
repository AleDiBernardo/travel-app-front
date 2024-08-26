import { createRouter, createWebHistory } from "vue-router";
import AppMain from "./components/AppMain.vue";
import AppCreate from "./components/AppCreate.vue";

const routes = [
    {
        path: "/",
        name: "Main",
        component: AppMain,
    },
    // TEST
    {
        path: "/create",
        name: "Create",
        component: AppCreate,
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
