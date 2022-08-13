import { RouteRecordRaw } from 'vue-router';

const routes: Array<RouteRecordRaw> = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/global/views/home/Index.vue'),
        children: []
    }
];

export default routes;
