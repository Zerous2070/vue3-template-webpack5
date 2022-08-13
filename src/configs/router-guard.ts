import { NavigationGuardNext, RouteLocationNormalized } from 'vue-router';

export const beforeEach = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
): void => {
    next();
};

export const afterEach = (to: RouteLocationNormalized, from: RouteLocationNormalized): void => {};
