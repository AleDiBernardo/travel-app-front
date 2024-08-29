import { createRouter, createWebHistory } from "vue-router";
import AppMain from "./components/AppMain.vue";
import AppCreate from "./components/AppCreate.vue";
import AppEditStage from "./components/AppEditStage.vue";

const routes = [
    {
        path: "/",
        name: "Main",
        component: AppMain,
    },
    {
        path: "/create/:id",
        name: "Create",
        component: AppCreate,
    },
    {
        path: "/edit/:id",
        name: "Edit",
        component: AppEditStage,
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
