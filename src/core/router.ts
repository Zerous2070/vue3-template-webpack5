import routes from '@/global/routes';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { createRouter, createWebHistory } from 'vue-router';

// 拦截器
import * as routerGuard from '@/configs/router-guard';

NProgress.configure({ showSpinner: false });

const router = createRouter({
    history: createWebHistory(),
    routes
});

router.beforeEach((to, from, next) => {
    NProgress.start();
    if (routerGuard.beforeEach) {
        routerGuard.beforeEach(to, from, next);
    } else {
        next();
    }
});

router.afterEach((to, from) => {
    routerGuard.afterEach && routerGuard.afterEach(to, from);
    NProgress.done();
});

export default router;
